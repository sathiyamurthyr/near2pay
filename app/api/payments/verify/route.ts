import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyRazorpaySignature, getRazorpayCredentials } from "@/lib/payments/razorpay";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      orderId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      paymentMethod = "upi",
    } = body;

    if (!orderId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json(
        { error: "Incomplete payment verification payload." },
        { status: 400 }
      );
    }

    const db = getDb();
    const order = db.prepare(`
      SELECT id, order_number, user_id, status, total_amount, currency
      FROM orders
      WHERE id = ?
    `).get(orderId) as any;

    if (!order) {
      return NextResponse.json({ error: "Associated order not found." }, { status: 404 });
    }

    // Idempotent check: If already paid with this payment ID
    if (order.status === "PAID") {
      const existingSuccess = db.prepare(`
        SELECT gateway_payment_id FROM payments WHERE order_id = ? AND status = 'SUCCESS'
      `).get(order.id) as any;

      if (existingSuccess && existingSuccess.gateway_payment_id === razorpayPaymentId) {
        return NextResponse.json({
          success: true,
          message: "Payment already verified and settled.",
          orderNumber: order.order_number,
          paymentId: razorpayPaymentId,
          status: "PAID",
        });
      }
    }

    const { isSandbox: sandboxConfigured } = getRazorpayCredentials();
    const isSandboxAuthorized =
      sandboxConfigured &&
      body.isSandbox === true &&
      razorpaySignature === "sandbox_verified_" + razorpayOrderId;

    // Cryptographic signature verification
    const isValidSignature =
      isSandboxAuthorized ||
      verifyRazorpaySignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);

    if (!isValidSignature) {
      // Record payment tampering / signature failure
      db.prepare(`
        UPDATE payments
        SET status = 'FAILED', error_code = 'BAD_SIGNATURE',
            error_description = 'Payment signature verification failed.',
            updated_at = ?
        WHERE order_id = ? AND gateway_order_id = ?
      `).run(Date.now(), order.id, razorpayOrderId);

      return NextResponse.json(
        { error: "Invalid payment signature. Payment cannot be verified." },
        { status: 400 }
      );
    }

    // Atomic update of payment and order status
    const now = Date.now();
    db.exec("BEGIN TRANSACTION");
    try {
      db.prepare(`
        UPDATE payments
        SET status = 'SUCCESS',
            gateway_payment_id = ?,
            gateway_signature = ?,
            payment_method = ?,
            verified_at = ?,
            updated_at = ?
        WHERE order_id = ? AND gateway_order_id = ?
      `).run(
        razorpayPaymentId,
        razorpaySignature,
        paymentMethod,
        now,
        now,
        order.id,
        razorpayOrderId
      );

      db.prepare(`
        UPDATE orders
        SET status = 'PAID', updated_at = ?
        WHERE id = ?
      `).run(now, order.id);

      db.exec("COMMIT");
    } catch (txErr) {
      db.exec("ROLLBACK");
      throw txErr;
    }

    return NextResponse.json({
      success: true,
      message: "Payment successfully verified and settled.",
      orderNumber: order.order_number,
      paymentId: razorpayPaymentId,
      status: "PAID",
    });
  } catch (error: any) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { error: "Payment verification encountered an internal error." },
      { status: 500 }
    );
  }
}
