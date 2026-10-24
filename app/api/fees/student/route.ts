import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const admNo = searchParams.get("admNo");

    if (!admNo || typeof admNo !== "string") {
      return NextResponse.json(
        { error: "Admission or enrollment number is required." },
        { status: 400 }
      );
    }

    const db = getDb();
    const student = db.prepare(`
      SELECT 
        s.id, 
        s.admission_number, 
        s.roll_number, 
        s.name, 
        s.grade_class, 
        s.parent_name, 
        s.parent_phone, 
        s.parent_email, 
        s.academic_session,
        s.institution_id,
        i.name as institution_name,
        i.type as institution_type,
        i.location as institution_location,
        i.board as institution_board
      FROM students s
      JOIN institutions i ON s.institution_id = i.id
      WHERE s.admission_number = ?
    `).get(admNo.trim()) as any;

    if (!student) {
      return NextResponse.json(
        { error: `No student record found matching admission number "${admNo}".` },
        { status: 404 }
      );
    }

    // Fetch fee catalog for this institution
    const feeItems = db.prepare(`
      SELECT id, code, name, description, amount, is_mandatory, category
      FROM fee_items
      WHERE institution_id = ? AND is_active = 1
      ORDER BY is_mandatory DESC, amount DESC
    `).all(student.institution_id);

    return NextResponse.json({
      success: true,
      student: {
        id: student.id,
        admission_number: student.admission_number,
        roll_number: student.roll_number,
        name: student.name,
        grade_class: student.grade_class,
        parent_name: student.parent_name,
        parent_phone: student.parent_phone,
        academic_session: student.academic_session,
        institution: {
          id: student.institution_id,
          name: student.institution_name,
          type: student.institution_type,
          location: student.institution_location,
          board: student.institution_board,
        },
      },
      feeItems,
    });
  } catch (error: any) {
    console.error("Student fee lookup error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve student fee breakdown." },
      { status: 500 }
    );
  }
}
