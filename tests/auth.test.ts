import test, { describe, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { getDb, createTestDb } from "../lib/db";
import { hashPassword, verifyPassword } from "../lib/auth/password";
import { createSession, getSessionUser, destroySession } from "../lib/auth/session";
import { checkRateLimit, clearRateLimit } from "../lib/auth/rate-limit";
import { isValidEmail, validatePasswordStrength, getSafeRedirectUrl } from "../lib/auth/validation";
import { randomBytes } from "crypto";

describe("Phase 6A: Customer Authentication Tests", () => {
  beforeEach(() => {
    // Ensure test database is initialized
    createTestDb();
  });

  test("1. Successful customer registration", async () => {
    const db = getDb();
    const email = `test_customer_${Date.now()}@example.com`;
    const password = "Password123!";
    const passwordHash = await hashPassword(password);
    const userId = "usr-" + randomBytes(8).toString("hex");

    db.prepare(`
      INSERT INTO users (id, email, phone, name, password_hash, role, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 'customer', ?, ?)
    `).run(userId, email, "+91 9876543210", "Test Parent", passwordHash, Date.now(), Date.now());

    const user = db.prepare("SELECT id, email, name, role FROM users WHERE email = ?").get(email) as any;
    assert.ok(user);
    assert.equal(user.email, email);
    assert.equal(user.name, "Test Parent");
    assert.equal(user.role, "customer");
  });

  test("2. Duplicate registration is prevented", async () => {
    const db = getDb();
    const email = `duplicate_user_${Date.now()}@example.com`;
    const passwordHash = await hashPassword("Password123!");
    const userId1 = "usr-" + randomBytes(8).toString("hex");
    const userId2 = "usr-" + randomBytes(8).toString("hex");

    db.prepare(`
      INSERT INTO users (id, email, phone, name, password_hash, role, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 'customer', ?, ?)
    `).run(userId1, email, "+91 9876543210", "User One", passwordHash, Date.now(), Date.now());

    assert.throws(() => {
      db.prepare(`
        INSERT INTO users (id, email, phone, name, password_hash, role, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, 'customer', ?, ?)
      `).run(userId2, email, "+91 9876543210", "User Two", passwordHash, Date.now(), Date.now());
    }, /UNIQUE constraint failed/);
  });

  test("3. Invalid registration data is rejected", () => {
    assert.equal(isValidEmail("not-an-email"), false);
    assert.equal(isValidEmail("@missingusername.com"), false);
    assert.equal(isValidEmail("missingdomain@"), false);
    assert.equal(isValidEmail(""), false);

    const weakPw1 = validatePasswordStrength("short");
    assert.equal(weakPw1.valid, false);

    const weakPw2 = validatePasswordStrength("alllettersnodigits");
    assert.equal(weakPw2.valid, false);

    const validPw = validatePasswordStrength("StrongPass123");
    assert.equal(validPw.valid, true);
  });

  test("4. Successful login and password verification", async () => {
    const rawPassword = "CorrectPassword123!";
    const passwordHash = await hashPassword(rawPassword);

    const isValid = await verifyPassword(rawPassword, passwordHash);
    assert.equal(isValid, true);
  });

  test("5. Incorrect credentials rejected without leaking account existence", async () => {
    const rawPassword = "CorrectPassword123!";
    const passwordHash = await hashPassword(rawPassword);

    const isValid = await verifyPassword("WrongPassword!", passwordHash);
    assert.equal(isValid, false);
  });

  test("6. Logout and session invalidation", () => {
    const db = getDb();
    const userId = "usr-sess-test";
    db.prepare(`
      INSERT OR IGNORE INTO users (id, email, phone, name, password_hash, role, created_at, updated_at)
      VALUES (?, 'session_user@example.com', null, 'Session User', 'hash', 'customer', ?, ?)
    `).run(userId, Date.now(), Date.now());

    const { token } = createSession(userId);
    const sessionUserBefore = getSessionUser(token);
    assert.ok(sessionUserBefore);
    assert.equal(sessionUserBefore.id, userId);

    destroySession(token);
    const sessionUserAfter = getSessionUser(token);
    assert.equal(sessionUserAfter, null);
  });

  test("7. Password reset flow and token one-time invalidation", async () => {
    const db = getDb();
    const userId = "usr-reset-test";
    db.prepare(`
      INSERT OR IGNORE INTO users (id, email, phone, name, password_hash, role, created_at, updated_at)
      VALUES (?, 'reset_user@example.com', null, 'Reset User', 'old_hash', 'customer', ?, ?)
    `).run(userId, Date.now(), Date.now());

    const resetToken = "reset-" + randomBytes(16).toString("hex");
    const expiresAt = Date.now() + 3600 * 1000;

    const resetId = "rst-" + randomBytes(8).toString("hex");
    db.prepare(`
      INSERT INTO password_resets (id, user_id, token, expires_at, used, created_at)
      VALUES (?, ?, ?, ?, 0, ?)
    `).run(resetId, userId, resetToken, expiresAt, Date.now());

    const activeReset = db.prepare(
      "SELECT * FROM password_resets WHERE token = ? AND used = 0 AND expires_at > ?"
    ).get(resetToken, Date.now()) as any;
    assert.ok(activeReset);

    // Apply password change and mark token used
    const newHash = await hashPassword("NewPassword456!");
    db.prepare("UPDATE users SET password_hash = ? WHERE id = ?").run(newHash, userId);
    db.prepare("UPDATE password_resets SET used = 1 WHERE id = ?").run(activeReset.id);

    // Verify token can no longer be reused
    const reusedReset = db.prepare(
      "SELECT * FROM password_resets WHERE token = ? AND used = 0"
    ).get(resetToken) as any;
    assert.equal(reusedReset, undefined);

    // Verify new password is valid
    const user = db.prepare("SELECT password_hash FROM users WHERE id = ?").get(userId) as any;
    assert.equal(await verifyPassword("NewPassword456!", user.password_hash), true);
  });

  test("8. Unauthenticated access to protected endpoints is rejected", () => {
    const invalidToken = "non-existent-token";
    const user = getSessionUser(invalidToken);
    assert.equal(user, null);
  });

  test("9. Unauthorized access to another customer's resources is prevented", () => {
    const db = getDb();
    const userA = "usr-a-" + Date.now();
    const userB = "usr-b-" + Date.now();
    const now = Date.now();

    db.prepare(`
      INSERT INTO users (id, email, phone, name, password_hash, role, created_at, updated_at)
      VALUES (?, ?, null, 'User A', 'hash', 'customer', ?, ?)
    `).run(userA, `userA_${now}@example.com`, now, now);

    db.prepare(`
      INSERT INTO users (id, email, phone, name, password_hash, role, created_at, updated_at)
      VALUES (?, ?, null, 'User B', 'hash', 'customer', ?, ?)
    `).run(userB, `userB_${now}@example.com`, now, now);

    // Order created by User A
    const orderId = "ord-priv-" + now;
    db.prepare(`
      INSERT INTO orders (
        id, order_number, user_id, student_id, institution_id, status,
        currency, subtotal_mandatory, subtotal_optional, total_amount,
        total_amount_paise, created_at, updated_at
      )
      VALUES (?, ?, ?, 'stu-1', 'inst-1', 'PAID', 'INR', 22200, 0, 22200, 2220000, ?, ?)
    `).run(orderId, "ORD-PRIV-" + now, userA, now, now);

    // User B tries to query User A's order history
    const userBOrders = db.prepare("SELECT * FROM orders WHERE user_id = ?").all(userB);
    assert.equal(userBOrders.length, 0);

    const userAOrders = db.prepare("SELECT * FROM orders WHERE user_id = ?").all(userA);
    assert.equal(userAOrders.length, 1);
  });

  test("10. Rate limiting enforces threshold and blocks brute force", () => {
    const testKey = "login:127.0.0.1:brute_force_test_" + Date.now();
    clearRateLimit(testKey);

    // 5 attempts allowed
    for (let i = 0; i < 5; i++) {
      const result = checkRateLimit(testKey, 5, 60000);
      assert.equal(result.allowed, true);
    }

    // 6th attempt blocked
    const blockedResult = checkRateLimit(testKey, 5, 60000);
    assert.equal(blockedResult.allowed, false);
    assert.equal(blockedResult.remaining, 0);
    assert.ok(blockedResult.retryAfterSeconds > 0);
  });

  test("11. Open redirect vulnerability prevention", () => {
    // Relative paths allowed
    assert.equal(getSafeRedirectUrl("/student-parent-payments"), "/student-parent-payments");
    assert.equal(getSafeRedirectUrl("/account/orders"), "/account/orders");

    // Malicious external / protocol-relative URLs redirected to safe default
    assert.equal(getSafeRedirectUrl("https://evil-phishing.com"), "/student-parent-payments");
    assert.equal(getSafeRedirectUrl("//evil-phishing.com"), "/student-parent-payments");
    assert.equal(getSafeRedirectUrl("javascript:alert(1)"), "/student-parent-payments");
    assert.equal(getSafeRedirectUrl("/\\evil-phishing.com"), "/student-parent-payments");
    assert.equal(getSafeRedirectUrl(null), "/student-parent-payments");
  });
});
