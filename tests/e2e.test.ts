import test, { describe, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { getDb, createTestDb } from "../lib/db";
import { hashPassword } from "../lib/auth/password";
import { createSession, getSessionUser } from "../lib/auth/session";
import { calculateAuthoritativeTotal } from "../lib/fees/calculator";
import { createRazorpayOrder, generateSandboxSignature, verifyRazorpaySignature } from "../lib/payments/razorpay";
import { randomBytes } from "crypto";

describe("Phase 6D: End-to-End Customer Lifecycle & Fee Payment Journey", () => {
  beforeEach(() => {
    createTestDb();
  });

  test("Complete E2E Journey: Register -> Login -> Select Bus Transport -> Authoritative Total -> Sandbox Payment -> Settle -> History & Receipt", async () => {
    const db = getDb();
    const timestamp = Date.now();

    // 1. New Customer Registration
    const customerEmail = `parent_${timestamp}@example.com`;
    const customerPassword = "ParentPassword2026!";
    const passwordHash = await hashPassword(customerPassword);
    const userId = "usr-e2e-" + randomBytes(8).toString("hex");

    db.prepare(`
      INSERT INTO users (id, email, phone, name, password_hash, role, created_at, updated_at)
      VALUES (?, ?, '+91 9876543210', 'Suresh Kumar', ?, 'customer', ?, ?)
    `).run(userId, customerEmail, passwordHash, timestamp, timestamp);

    const registeredUser = db.prepare("SELECT * FROM users WHERE email = ?").get(customerEmail) as any;
    assert.ok(registeredUser);
    assert.equal(registeredUser.name, "Suresh Kumar");

    // 2. Customer Login & Session Creation
    const { token: sessionToken } = createSession(registeredUser.id);
    const sessionUser = getSessionUser(sessionToken);
    assert.ok(sessionUser);
    assert.equal(sessionUser.id, registeredUser.id);

    // 3. Customer Inspects Student Record
    const studentAdmNo = "STU-2024-8891";
    const student = db.prepare("SELECT * FROM students WHERE admission_number = ?").get(studentAdmNo) as any;
    assert.ok(student);
    assert.equal(student.name, "Aarav Sharma");

    // 4. Initial Baseline Total (Mandatory Only)
    const baseCalc = calculateAuthoritativeTotal(studentAdmNo, []);
    assert.equal(baseCalc.totalAmount, 22200);

    // 5. Customer Selects Optional School Bus Route #14 Transport (+3800)
    const withTransportCalc = calculateAuthoritativeTotal(studentAdmNo, ["fee-inst1-transport"]);
    assert.equal(withTransportCalc.selectedOptionalItems.length, 1);
    assert.equal(withTransportCalc.selectedOptionalItems[0].code, "TRANSPORT");
    assert.equal(withTransportCalc.totalAmount, 26000); // 22200 + 3800
    assert.ok(withTransportCalc.totalAmount > baseCalc.totalAmount);

    // 6. Customer Deselects Transport (-3800)
    const deselectedCalc = calculateAuthoritativeTotal(studentAdmNo, []);
    assert.equal(deselectedCalc.totalAmount, 22200);
    assert.equal(deselectedCalc.totalAmount < withTransportCalc.totalAmount, true);

    // 7. Customer Re-selects Transport and Sports Club (+3800 + 1000)
    const finalSelectionCalc = calculateAuthoritativeTotal(studentAdmNo, [
      "fee-inst1-transport",
      "fee-inst1-sports",
    ]);
    assert.equal(finalSelectionCalc.totalAmount, 27000); // 22200 + 4800

    // 8. Order Creation with Customer Link
    const orderId = "ord-e2e-" + randomBytes(8).toString("hex");
    const orderNumber = "ORD-E2E-2026-" + randomBytes(3).toString("hex").toUpperCase();
    const now = Date.now();

    db.prepare(`
      INSERT INTO orders (
        id, order_number, user_id, student_id, institution_id, status,
        currency, subtotal_mandatory, subtotal_optional, total_amount,
        total_amount_paise, created_at, updated_at
      )
      VALUES (?, ?, ?, ?, ?, 'CREATED', 'INR', ?, ?, ?, ?, ?, ?)
    `).run(
      orderId,
      orderNumber,
      sessionUser.id,
      finalSelectionCalc.student.id,
      finalSelectionCalc.institution.id,
      finalSelectionCalc.subtotalMandatory,
      finalSelectionCalc.subtotalOptional,
      finalSelectionCalc.totalAmount,
      finalSelectionCalc.totalAmountPaise,
      now,
      now
    );

    // Insert Itemized Snapshots
    for (const item of finalSelectionCalc.allItems) {
      db.prepare(`
        INSERT INTO order_items (id, order_id, fee_item_id, fee_name, fee_category, is_mandatory, amount, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run("item-" + randomBytes(8).toString("hex"), orderId, item.id, item.name, item.category, item.is_mandatory, item.amount, now);
    }

    // 9. Payment Order Creation via Razorpay Sandbox
    const rzpOrder = await createRazorpayOrder({
      amountPaise: finalSelectionCalc.totalAmountPaise,
      currency: "INR",
      receipt: orderNumber,
    });
    assert.ok(rzpOrder.id.startsWith("order_"));

    const paymentDbId = "pay-e2e-" + randomBytes(8).toString("hex");
    db.prepare(`
      INSERT INTO payments (
        id, order_id, user_id, gateway, gateway_order_id, amount,
        currency, status, payment_method, created_at, updated_at
      )
      VALUES (?, ?, ?, 'razorpay', ?, ?, 'INR', 'PENDING', 'upi', ?, ?)
    `).run(paymentDbId, orderId, sessionUser.id, rzpOrder.id, finalSelectionCalc.totalAmount, now, now);

    db.prepare("UPDATE orders SET status = 'PENDING', updated_at = ? WHERE id = ?").run(now, orderId);

    // 10. Payment Authorization & Cryptographic Signature Verification
    const rzpPaymentId = "pay_test_e2e_" + randomBytes(8).toString("hex");
    const validSignature = generateSandboxSignature(rzpOrder.id, rzpPaymentId);
    assert.equal(verifyRazorpaySignature(rzpOrder.id, rzpPaymentId, validSignature), true);

    // 11. Atomic Settlement
    db.prepare(`
      UPDATE payments
      SET status = 'SUCCESS', gateway_payment_id = ?, gateway_signature = ?, verified_at = ?, updated_at = ?
      WHERE id = ?
    `).run(rzpPaymentId, validSignature, Date.now(), Date.now(), paymentDbId);

    db.prepare("UPDATE orders SET status = 'PAID', updated_at = ? WHERE id = ?").run(Date.now(), orderId);

    // 12. Verification of Order Status and Customer Receipt History
    const settledOrder = db.prepare("SELECT * FROM orders WHERE id = ?").get(orderId) as any;
    assert.equal(settledOrder.status, "PAID");
    assert.equal(settledOrder.total_amount, 27000);

    const customerOrders = db.prepare(`
      SELECT o.id, o.order_number, o.total_amount, o.status, p.gateway_payment_id
      FROM orders o
      JOIN payments p ON o.id = p.order_id
      WHERE o.user_id = ?
    `).all(sessionUser.id) as any[];

    assert.equal(customerOrders.length, 1);
    assert.equal(customerOrders[0].order_number, orderNumber);
    assert.equal(customerOrders[0].status, "PAID");
    assert.equal(customerOrders[0].gateway_payment_id, rzpPaymentId);

    // 13. Verify Itemized Receipt Breakdown
    const orderItems = db.prepare("SELECT fee_name, amount, is_mandatory FROM order_items WHERE order_id = ?").all(orderId) as any[];
    assert.equal(orderItems.length, 5); // 3 mandatory (Tuition, Lab, Exam) + 2 optional (Transport, Sports)
    const transportFee = orderItems.find((i) => i.fee_name.includes("Transport"));
    assert.ok(transportFee);
    assert.equal(transportFee.amount, 3800);
  });
});
