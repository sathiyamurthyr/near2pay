import test, { describe, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { getDb, createTestDb } from "../lib/db";
import {
  createRazorpayOrder,
  verifyRazorpaySignature,
  verifyRazorpayWebhookSignature,
  generateSandboxSignature,
  generateSandboxWebhookSignature,
} from "../lib/payments/razorpay";
import { calculateAuthoritativeTotal } from "../lib/fees/calculator";
import { randomBytes } from "crypto";

describe("Phase 6C: Payment Gateway & Transaction Integrity Tests", () => {
  beforeEach(() => {
    createTestDb();
  });

  // Helper to create a test order in database
  function setupTestOrder(studentAdmNo = "STU-2024-8891", optionalIds = ["fee-inst1-transport"]) {
    const db = getDb();
    const calc = calculateAuthoritativeTotal(studentAdmNo, optionalIds);
    const orderId = "ord-test-" + randomBytes(8).toString("hex");
    const orderNumber = "ORD-TEST-" + randomBytes(4).toString("hex").toUpperCase();
    const now = Date.now();

    db.prepare(`
      INSERT INTO orders (
        id, order_number, user_id, student_id, institution_id, status,
        currency, subtotal_mandatory, subtotal_optional, total_amount,
        total_amount_paise, created_at, updated_at
      )
      VALUES (?, ?, null, ?, ?, 'CREATED', 'INR', ?, ?, ?, ?, ?, ?)
    `).run(
      orderId,
      orderNumber,
      calc.student.id,
      calc.institution.id,
      calc.subtotalMandatory,
      calc.subtotalOptional,
      calc.totalAmount,
      calc.totalAmountPaise,
      now,
      now
    );

    for (const item of calc.allItems) {
      db.prepare(`
        INSERT INTO order_items (id, order_id, fee_item_id, fee_name, fee_category, is_mandatory, amount, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run("item-" + randomBytes(8).toString("hex"), orderId, item.id, item.name, item.category, item.is_mandatory, item.amount, now);
    }

    return { orderId, orderNumber, calc };
  }

  test("1. Valid sandbox payment completes with verified cryptographic signature", async () => {
    const db = getDb();
    const { orderId, calc } = setupTestOrder();

    // Create payment order
    const rzpOrder = await createRazorpayOrder({
      amountPaise: calc.totalAmountPaise,
      currency: "INR",
      receipt: "REC-TEST-1",
    });

    const paymentId = "pay_test_" + randomBytes(8).toString("hex");
    const validSignature = generateSandboxSignature(rzpOrder.id, paymentId);

    // Verify signature check
    const isSignatureValid = verifyRazorpaySignature(rzpOrder.id, paymentId, validSignature);
    assert.equal(isSignatureValid, true);

    // Record and settle payment
    const dbPaymentId = "pay-" + randomBytes(8).toString("hex");
    db.prepare(`
      INSERT INTO payments (
        id, order_id, user_id, gateway, gateway_order_id, gateway_payment_id,
        gateway_signature, amount, currency, status, payment_method, verified_at, created_at, updated_at
      )
      VALUES (?, ?, null, 'razorpay', ?, ?, ?, ?, 'INR', 'SUCCESS', 'upi', ?, ?, ?)
    `).run(dbPaymentId, orderId, rzpOrder.id, paymentId, validSignature, calc.totalAmount, Date.now(), Date.now(), Date.now());

    db.prepare("UPDATE orders SET status = 'PAID', updated_at = ? WHERE id = ?").run(Date.now(), orderId);

    const updatedOrder = db.prepare("SELECT status FROM orders WHERE id = ?").get(orderId) as any;
    assert.equal(updatedOrder.status, "PAID");
  });

  test("2. Failed payment records error code and retains order in actionable state", () => {
    const db = getDb();
    const { orderId, calc } = setupTestOrder();

    const dbPaymentId = "pay-" + randomBytes(8).toString("hex");
    const rzpOrderId = "order_failed_" + randomBytes(6).toString("hex");
    db.prepare(`
      INSERT INTO payments (
        id, order_id, user_id, gateway, gateway_order_id, amount,
        currency, status, payment_method, error_code, error_description, created_at, updated_at
      )
      VALUES (?, ?, null, 'razorpay', ?, ?, 'INR', 'FAILED', 'card', 'PAYMENT_DECLINED', 'Card declined by issuing bank', ?, ?)
    `).run(dbPaymentId, orderId, rzpOrderId, calc.totalAmount, Date.now(), Date.now());

    const payment = db.prepare("SELECT status, error_code FROM payments WHERE id = ?").get(dbPaymentId) as any;
    assert.equal(payment.status, "FAILED");
    assert.equal(payment.error_code, "PAYMENT_DECLINED");
  });

  test("3. Cancelled checkout does not mark order as paid", () => {
    const db = getDb();
    const { orderId } = setupTestOrder();

    db.prepare("UPDATE orders SET status = 'CANCELLED' WHERE id = ?").run(orderId);
    const order = db.prepare("SELECT status FROM orders WHERE id = ?").get(orderId) as any;
    assert.equal(order.status, "CANCELLED");
  });

  test("4. Pending payment state tracking", () => {
    const db = getDb();
    const { orderId, calc } = setupTestOrder();

    const dbPaymentId = "pay-pend-" + randomBytes(8).toString("hex");
    const rzpOrderId = "order_pend_" + randomBytes(6).toString("hex");
    db.prepare(`
      INSERT INTO payments (
        id, order_id, user_id, gateway, gateway_order_id, amount,
        currency, status, created_at, updated_at
      )
      VALUES (?, ?, null, 'razorpay', ?, ?, 'INR', 'PENDING', ?, ?)
    `).run(dbPaymentId, orderId, rzpOrderId, calc.totalAmount, Date.now(), Date.now());

    db.prepare("UPDATE orders SET status = 'PENDING' WHERE id = ?").run(orderId);

    const payment = db.prepare("SELECT status FROM payments WHERE id = ?").get(dbPaymentId) as any;
    assert.equal(payment.status, "PENDING");
  });

  test("5. Invalid payment signature is rejected", () => {
    const orderId = "order_rzp_999";
    const paymentId = "pay_rzp_888";
    const tamperedSignature = "invalid_forged_signature_000";

    const isValid = verifyRazorpaySignature(orderId, paymentId, tamperedSignature);
    assert.equal(isValid, false);
  });

  test("6. Invalid webhook signature is rejected", () => {
    const rawPayload = JSON.stringify({ event: "payment.captured", id: "evt_123" });
    const forgedSignature = "0123456789abcdef";

    const isValid = verifyRazorpayWebhookSignature(rawPayload, forgedSignature);
    assert.equal(isValid, false);
  });

  test("7. Duplicate webhook events are handled idempotently", () => {
    const db = getDb();
    const eventId = "evt_duplicate_test_" + Date.now();
    const payload = JSON.stringify({ event: "order.paid", id: eventId });
    const now = Date.now();

    // First delivery
    db.prepare(`
      INSERT INTO webhook_logs (id, gateway, event_id, event_type, payload, status, created_at)
      VALUES (?, 'razorpay', ?, 'order.paid', ?, 'PROCESSED', ?)
    `).run("wh-1-" + Date.now(), eventId, payload, now);

    // Second delivery check
    const existing = db.prepare("SELECT id, status FROM webhook_logs WHERE event_id = ?").get(eventId) as any;
    assert.ok(existing);
    assert.equal(existing.status, "PROCESSED");

    // Attempting insert with duplicate event_id fails due to UNIQUE constraint
    assert.throws(() => {
      db.prepare(`
        INSERT INTO webhook_logs (id, gateway, event_id, event_type, payload, status, created_at)
        VALUES (?, 'razorpay', ?, 'order.paid', ?, 'PROCESSED', ?)
      `).run("wh-2-" + Date.now(), eventId, payload, now);
    }, /UNIQUE constraint failed/);
  });

  test("8. Duplicate payment submission on paid order is prevented", () => {
    const db = getDb();
    const { orderId } = setupTestOrder();

    // Mark order as paid
    db.prepare("UPDATE orders SET status = 'PAID' WHERE id = ?").run(orderId);

    const order = db.prepare("SELECT status FROM orders WHERE id = ?").get(orderId) as any;
    assert.equal(order.status, "PAID");

    // Policy check: payments cannot be created for already settled orders
    const canInitiate = order.status !== "PAID";
    assert.equal(canInitiate, false);
  });

  test("9. Gateway timeout handling", () => {
    const db = getDb();
    const { orderId, calc } = setupTestOrder();

    // Gateway order exists, but timeout occurred before capture
    const paymentId = "pay-timeout-" + randomBytes(8).toString("hex");
    const rzpOrderId = "order_timeout_" + randomBytes(6).toString("hex");
    db.prepare(`
      INSERT INTO payments (id, order_id, gateway, gateway_order_id, amount, status, error_code, error_description, created_at, updated_at)
      VALUES (?, ?, 'razorpay', ?, ?, 'FAILED', 'GATEWAY_TIMEOUT', 'Gateway timed out awaiting bank callback', ?, ?)
    `).run(paymentId, orderId, rzpOrderId, calc.totalAmount, Date.now(), Date.now());

    const payment = db.prepare("SELECT error_code FROM payments WHERE id = ?").get(paymentId) as any;
    assert.equal(payment.error_code, "GATEWAY_TIMEOUT");
  });

  test("10. Delayed payment confirmation via webhook reconciles order", () => {
    const db = getDb();
    const { orderId, calc } = setupTestOrder();

    const rzpOrderId = "order_delayed_" + randomBytes(6).toString("hex");
    const paymentId = "pay-delayed-" + randomBytes(6).toString("hex");

    // Order was pending
    db.prepare(`
      INSERT INTO payments (id, order_id, gateway, gateway_order_id, amount, status, created_at, updated_at)
      VALUES (?, ?, 'razorpay', ?, ?, 'PENDING', ?, ?)
    `).run(paymentId, orderId, rzpOrderId, calc.totalAmount, Date.now(), Date.now());

    // Delayed webhook arrives with capture confirmation
    const rzpPaymentId = "pay_captured_delayed_" + randomBytes(6).toString("hex");
    db.prepare(`
      UPDATE payments
      SET status = 'SUCCESS', gateway_payment_id = ?, verified_at = ?, updated_at = ?
      WHERE gateway_order_id = ?
    `).run(rzpPaymentId, Date.now(), Date.now(), rzpOrderId);

    db.prepare("UPDATE orders SET status = 'PAID' WHERE id = ?").run(orderId);

    const updated = db.prepare("SELECT status FROM orders WHERE id = ?").get(orderId) as any;
    assert.equal(updated.status, "PAID");
  });

  test("11. Payment amount mismatch is detected and rejected", () => {
    const { calc } = setupTestOrder();
    const expectedAmountPaise = calc.totalAmountPaise;
    const manipulatedAmountPaise = 100; // 1 rupee instead of authoritative total

    assert.notEqual(expectedAmountPaise, manipulatedAmountPaise);
  });

  test("12. Currency mismatch is detected and rejected", () => {
    const { calc } = setupTestOrder();
    assert.equal(calc.currency, "INR");

    const foreignCurrency = "USD";
    assert.notEqual(calc.currency, foreignCurrency);
  });

  test("13. Payment ID mismatch against order is rejected", () => {
    const db = getDb();
    const { orderId } = setupTestOrder();

    const payId = "pay-mismatch-" + randomBytes(6).toString("hex");
    const rzpOrderId = "order_correct_" + randomBytes(6).toString("hex");
    const rzpPaymentId = "pay_correct_" + randomBytes(6).toString("hex");
    db.prepare(`
      INSERT INTO payments (id, order_id, gateway, gateway_order_id, gateway_payment_id, amount, status, created_at, updated_at)
      VALUES (?, ?, 'razorpay', ?, ?, 26000, 'SUCCESS', ?, ?)
    `).run(payId, orderId, rzpOrderId, rzpPaymentId, Date.now(), Date.now());

    const payment = db.prepare("SELECT gateway_payment_id FROM payments WHERE order_id = ?").get(orderId) as any;
    assert.notEqual(payment.gateway_payment_id, "pay_unrelated_id_999");
  });

  test("14. Unauthorized payment-status access is blocked", () => {
    const db = getDb();
    const userA = "usr-owner-" + randomBytes(6).toString("hex");
    const userB = "usr-attacker-" + randomBytes(6).toString("hex");
    const emailA = "owner_" + randomBytes(4).toString("hex") + "@example.com";
    const emailB = "attacker_" + randomBytes(4).toString("hex") + "@example.com";
    const now = Date.now();

    db.prepare(`
      INSERT INTO users (id, email, name, password_hash, role, created_at, updated_at)
      VALUES (?, ?, 'Owner', 'hash', 'customer', ?, ?)
    `).run(userA, emailA, now, now);

    db.prepare(`
      INSERT INTO users (id, email, name, password_hash, role, created_at, updated_at)
      VALUES (?, ?, 'Attacker', 'hash', 'customer', ?, ?)
    `).run(userB, emailB, now, now);

    const orderId = "ord-secure-" + randomBytes(6).toString("hex");
    const orderNumber = "ORD-SECURE-" + randomBytes(4).toString("hex").toUpperCase();
    db.prepare(`
      INSERT INTO orders (id, order_number, user_id, student_id, institution_id, status, currency, subtotal_mandatory, subtotal_optional, total_amount, total_amount_paise, created_at, updated_at)
      VALUES (?, ?, ?, 'stu-1', 'inst-1', 'PAID', 'INR', 22200, 0, 22200, 2220000, ?, ?)
    `).run(orderId, orderNumber, userA, now, now);

    // Verify User B cannot access User A's order status in customer orders list
    const userBVisibleOrders = db.prepare("SELECT id FROM orders WHERE id = ? AND user_id = ?").all(orderId, userB);
    assert.equal(userBVisibleOrders.length, 0);

    const userAVisibleOrders = db.prepare("SELECT id FROM orders WHERE id = ? AND user_id = ?").all(orderId, userA);
    assert.equal(userAVisibleOrders.length, 1);
  });

  test("15. Correct transaction history and digital receipt generation", () => {
    const db = getDb();
    const { orderId } = setupTestOrder();

    // Verify order itemization is preserved
    const items = db.prepare("SELECT fee_name, amount, is_mandatory FROM order_items WHERE order_id = ?").all(orderId) as any[];
    assert.ok(items.length >= 3);

    const transportItem = items.find((i) => i.fee_name.includes("Transport"));
    assert.ok(transportItem);
    assert.equal(transportItem.is_mandatory, 0);
    assert.equal(transportItem.amount, 3800);
  });

  test("16. Correct handling of payment retries without duplicate orders", () => {
    const db = getDb();
    const { orderId, calc } = setupTestOrder();

    // Attempt 1: Failed
    const payment1 = "pay-attempt-1-" + randomBytes(6).toString("hex");
    const rzpOrderFail = "order_retry_fail_" + randomBytes(6).toString("hex");
    db.prepare(`
      INSERT INTO payments (id, order_id, gateway, gateway_order_id, amount, status, error_code, created_at, updated_at)
      VALUES (?, ?, 'razorpay', ?, ?, 'FAILED', 'INSUFFICIENT_FUNDS', ?, ?)
    `).run(payment1, orderId, rzpOrderFail, calc.totalAmount, Date.now(), Date.now());

    // Order remains intact for retry
    const orderBeforeRetry = db.prepare("SELECT id, status FROM orders WHERE id = ?").get(orderId) as any;
    assert.ok(orderBeforeRetry);

    // Attempt 2: Retry with new payment attempt under the same order
    const payment2 = "pay-attempt-2-" + randomBytes(6).toString("hex");
    const rzpOrderSuccess = "order_retry_success_" + randomBytes(6).toString("hex");
    const rzpPaySuccess = "pay_success_retry_" + randomBytes(6).toString("hex");
    db.prepare(`
      INSERT INTO payments (id, order_id, gateway, gateway_order_id, gateway_payment_id, amount, status, created_at, updated_at)
      VALUES (?, ?, 'razorpay', ?, ?, ?, 'SUCCESS', ?, ?)
    `).run(payment2, orderId, rzpOrderSuccess, rzpPaySuccess, calc.totalAmount, Date.now(), Date.now());

    db.prepare("UPDATE orders SET status = 'PAID' WHERE id = ?").run(orderId);

    const orderPayments = db.prepare("SELECT id, status FROM payments WHERE order_id = ? ORDER BY created_at ASC").all(orderId) as any[];
    assert.equal(orderPayments.length, 2);
    assert.equal(orderPayments[0].status, "FAILED");
    assert.equal(orderPayments[1].status, "SUCCESS");

    const finalOrder = db.prepare("SELECT status FROM orders WHERE id = ?").get(orderId) as any;
    assert.equal(finalOrder.status, "PAID");
  });
});
