import { NextRequest, NextResponse } from "next/server";
import { getSessionUser, SESSION_COOKIE_NAME } from "@/lib/auth/session";
import { getDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    const user = getSessionUser(sessionToken);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    const db = getDb();

    // Fetch user's orders strictly filtered by authenticated user.id
    const ordersStmt = db.prepare(`
      SELECT 
        o.id, 
        o.order_number, 
        o.status, 
        o.currency, 
        o.subtotal_mandatory, 
        o.subtotal_optional, 
        o.total_amount, 
        o.created_at,
        s.name as student_name,
        s.admission_number,
        s.grade_class,
        i.name as institution_name
      FROM orders o
      JOIN students s ON o.student_id = s.id
      JOIN institutions i ON o.institution_id = i.id
      WHERE o.user_id = ?
      ORDER BY o.created_at DESC
    `);

    const orders = ordersStmt.all(user.id) as any[];

    // Fetch order items and payment details for each order
    const getItemsStmt = db.prepare(`
      SELECT fee_name, fee_category, is_mandatory, amount
      FROM order_items
      WHERE order_id = ?
    `);

    const getPaymentStmt = db.prepare(`
      SELECT gateway_payment_id, status, payment_method, verified_at, amount
      FROM payments
      WHERE order_id = ?
      ORDER BY created_at DESC LIMIT 1
    `);

    const enrichedOrders = orders.map((order) => {
      const items = getItemsStmt.all(order.id);
      const payment = getPaymentStmt.get(order.id) as any;
      return {
        ...order,
        items,
        payment: payment || null,
      };
    });

    return NextResponse.json({ success: true, orders: enrichedOrders });
  } catch (error: any) {
    console.error("Order history error:", error);
    return NextResponse.json(
      { error: "Failed to fetch order history." },
      { status: 500 }
    );
  }
}
