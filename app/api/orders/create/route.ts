import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getSessionUser, SESSION_COOKIE_NAME } from "@/lib/auth/session";
import { calculateAuthoritativeTotal } from "@/lib/fees/calculator";
import { randomBytes } from "crypto";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentAdmissionNumber, selectedOptionalItemIds } = body;

    if (!studentAdmissionNumber || typeof studentAdmissionNumber !== "string") {
      return NextResponse.json(
        { error: "Student admission number is required." },
        { status: 400 }
      );
    }

    // Identify customer if authenticated
    const sessionToken = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    const sessionUser = getSessionUser(sessionToken);

    // Calculate authoritative totals directly on server
    const calc = calculateAuthoritativeTotal(
      studentAdmissionNumber,
      selectedOptionalItemIds || []
    );

    const db = getDb();
    const orderId = "ord-" + randomBytes(16).toString("hex");
    const orderNumber = `ORD-2026-${randomBytes(4).toString("hex").toUpperCase()}`;
    const now = Date.now();

    // Insert order in transaction
    const insertOrder = db.prepare(`
      INSERT INTO orders (
        id, order_number, user_id, student_id, institution_id, status,
        currency, subtotal_mandatory, subtotal_optional, total_amount,
        total_amount_paise, created_at, updated_at
      )
      VALUES (?, ?, ?, ?, ?, 'CREATED', 'INR', ?, ?, ?, ?, ?, ?)
    `);

    const insertItem = db.prepare(`
      INSERT INTO order_items (id, order_id, fee_item_id, fee_name, fee_category, is_mandatory, amount, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    db.exec("BEGIN TRANSACTION");
    try {
      insertOrder.run(
        orderId,
        orderNumber,
        sessionUser ? sessionUser.id : null,
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
        const itemId = "item-" + randomBytes(16).toString("hex");
        insertItem.run(
          itemId,
          orderId,
          item.id,
          item.name,
          item.category,
          item.is_mandatory,
          item.amount,
          now
        );
      }
      db.exec("COMMIT");
    } catch (txErr) {
      db.exec("ROLLBACK");
      throw txErr;
    }

    return NextResponse.json({
      success: true,
      order: {
        id: orderId,
        orderNumber,
        studentName: calc.student.name,
        admissionNumber: calc.student.admission_number,
        institutionName: calc.institution.name,
        subtotalMandatory: calc.subtotalMandatory,
        subtotalOptional: calc.subtotalOptional,
        totalAmount: calc.totalAmount,
        totalAmountPaise: calc.totalAmountPaise,
        currency: "INR",
        items: calc.allItems,
      },
    });
  } catch (error: any) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create order." },
      { status: 400 }
    );
  }
}
