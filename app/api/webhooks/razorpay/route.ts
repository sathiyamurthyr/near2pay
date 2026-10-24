import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyRazorpayWebhookSignature } from "@/lib/payments/razorpay";
import { randomBytes } from "crypto";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    // Cryptographic signature check
    const isValid = verifyRazorpayWebhookSignature(rawBody, signature);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid webhook signature." },
        { status: 400 }
      );
    }

    const payload = JSON.parse(rawBody);
    const eventId = payload.event_id || payload.id || `evt-${randomBytes(8).toString("hex")}`;
    const eventType = payload.event;

    const db = getDb();

    // Idempotency check: Has this event already been processed?
    const existingLog = db.prepare(
      "SELECT id, status FROM webhook_logs WHERE event_id = ?"
    ).get(eventId) as { id: string; status: string } | undefined;

    if (existingLog) {
      return NextResponse.json({
        success: true,
        message: "Duplicate webhook event acknowledged without re-processing.",
      });
    }

    const logId = "wh-" + randomBytes(16).toString("hex");
    const now = Date.now();

    // Process event types
    db.exec("BEGIN TRANSACTION");
    try {
      if (eventType === "payment.captured" || eventType === "order.paid") {
        const paymentEntity = payload.payload?.payment?.entity;
        const rzpOrderId = paymentEntity?.order_id || payload.payload?.order?.entity?.id;
        const rzpPaymentId = paymentEntity?.id;

        if (rzpOrderId) {
          const payment = db.prepare(`
            SELECT id, order_id, status FROM payments WHERE gateway_order_id = ?
          `).get(rzpOrderId) as any;

          if (payment) {
            db.prepare(`
              UPDATE payments
              SET status = 'SUCCESS',
                  gateway_payment_id = COALESCE(?, gateway_payment_id),
                  verified_at = ?,
                  updated_at = ?
              WHERE id = ?
            `).run(rzpPaymentId, now, now, payment.id);

            db.prepare(`
              UPDATE orders SET status = 'PAID', updated_at = ? WHERE id = ?
            `).run(now, payment.order_id);
          }
        }
      } else if (eventType === "payment.failed") {
        const paymentEntity = payload.payload?.payment?.entity;
        const rzpOrderId = paymentEntity?.order_id;
        const errDesc = paymentEntity?.error_description || "Payment failed via gateway";

        if (rzpOrderId) {
          db.prepare(`
            UPDATE payments
            SET status = 'FAILED', error_description = ?, updated_at = ?
            WHERE gateway_order_id = ? AND status != 'SUCCESS'
          `).run(errDesc, now, rzpOrderId);
        }
      }

      // Record in webhook logs
      db.prepare(`
        INSERT INTO webhook_logs (id, gateway, event_id, event_type, payload, status, created_at)
        VALUES (?, 'razorpay', ?, ?, ?, 'PROCESSED', ?)
      `).run(logId, eventId, eventType, rawBody, now);

      db.exec("COMMIT");
    } catch (err) {
      db.exec("ROLLBACK");
      throw err;
    }

    return NextResponse.json({ success: true, processed: true });
  } catch (error: any) {
    console.error("Razorpay webhook handling error:", error);
    return NextResponse.json(
      { error: "Webhook execution failed." },
      { status: 500 }
    );
  }
}
