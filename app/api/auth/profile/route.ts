import { NextRequest, NextResponse } from "next/server";
import { getSessionUser, SESSION_COOKIE_NAME } from "@/lib/auth/session";
import { getDb } from "@/lib/db";

export const runtime = "nodejs";

export async function PUT(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    const user = getSessionUser(sessionToken);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    const body = await req.json();
    const { name, phone } = body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Full name must be at least 2 characters." },
        { status: 400 }
      );
    }

    const db = getDb();
    const now = Date.now();
    const updateStmt = db.prepare(`
      UPDATE users
      SET name = ?, phone = ?, updated_at = ?
      WHERE id = ?
    `);

    updateStmt.run(name.trim(), phone ? String(phone).trim() : null, now, user.id);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: name.trim(),
        phone: phone ? String(phone).trim() : null,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile. Please try again." },
      { status: 500 }
    );
  }
}
