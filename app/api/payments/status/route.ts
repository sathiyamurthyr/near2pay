import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");
    const orderNumber = searchParams.get("orderNumber");

    if (!orderId && !orderNumber) {
      return NextResponse.json(
        { error: "orderId or orderNumber is required." },
        { status: 400 }
      );
    }

    const db = getDb();
    const query = orderId
      ? "SELECT id, order_number, status, total_amount, currency FROM orders WHERE id = ?"
      : "SELECT id, order_number, status, total_amount, currency FROM orders WHERE order_number = ?";

    const param = orderId || orderNumber;
    const order = db.prepare(query).get(param) as any;

    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    const payment = db.prepare(`
      SELECT gateway_order_id, gateway_payment_id, status, payment_method, verified_at, error_description
      FROM payments
      WHERE order_id = ?
      ORDER BY created_at DESC LIMIT 1
    `).get(order.id) as any;

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.order_number,
        status: order.status,
        totalAmount: order.total_amount,
        currency: order.currency,
      },
      payment: payment || null,
    });
  } catch (error: any) {
    console.error("Payment status check error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve payment status." },
      { status: 500 }
    );
  }
}
