import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getSessionUser, SESSION_COOKIE_NAME } from "@/lib/auth/session";
import { createRazorpayOrder, getRazorpayCredentials } from "@/lib/payments/razorpay";
import { randomBytes } from "crypto";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, paymentMethod = "upi" } = body;

    if (!orderId || typeof orderId !== "string") {
      return NextResponse.json({ error: "Order ID is required." }, { status: 400 });
    }

    const db = getDb();
    const order = db.prepare(`
      SELECT id, order_number, user_id, status, total_amount, total_amount_paise, currency
      FROM orders
      WHERE id = ?
    `).get(orderId) as any;

    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    if (order.status === "PAID") {
      return NextResponse.json(
        { error: "This order has already been paid and settled." },
        { status: 400 }
      );
    }

    // Check existing pending payment to avoid duplicate external charges
    const existingPayment = db.prepare(`
      SELECT id, gateway_order_id, status
      FROM payments
      WHERE order_id = ? AND status = 'PENDING'
      ORDER BY created_at DESC LIMIT 1
    `).get(order.id) as any;

    const { keyId } = getRazorpayCredentials();

    if (existingPayment && existingPayment.gateway_order_id) {
      return NextResponse.json({
        success: true,
        gatewayOrderId: existingPayment.gateway_order_id,
        amount: order.total_amount_paise,
        currency: order.currency,
        keyId,
        orderNumber: order.order_number,
      });
    }

    // Create order with payment provider
    const rzpOrder = await createRazorpayOrder({
      amountPaise: order.total_amount_paise,
      currency: order.currency,
      receipt: order.order_number,
      notes: { orderId: order.id, orderNumber: order.order_number },
    });

    const paymentId = "pay-" + randomBytes(16).toString("hex");
    const now = Date.now();

    db.prepare(`
      INSERT INTO payments (
        id, order_id, user_id, gateway, gateway_order_id, amount,
        currency, status, payment_method, created_at, updated_at
      )
      VALUES (?, ?, ?, 'razorpay', ?, ?, ?, 'PENDING', ?, ?, ?)
    `).run(
      paymentId,
      order.id,
      order.user_id,
      rzpOrder.id,
      order.total_amount,
      order.currency,
      paymentMethod,
      now,
      now
    );

    db.prepare("UPDATE orders SET status = 'PENDING', updated_at = ? WHERE id = ?").run(
      now,
      order.id
    );

    return NextResponse.json({
      success: true,
      gatewayOrderId: rzpOrder.id,
      amount: order.total_amount_paise,
      currency: order.currency,
      keyId,
      orderNumber: order.order_number,
    });
  } catch (error: any) {
    console.error("Payment order creation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to initiate payment gateway order." },
      { status: 500 }
    );
  }
}
