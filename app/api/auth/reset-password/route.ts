import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";
import { validatePasswordStrength } from "@/lib/auth/validation";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, newPassword } = body;

    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "Invalid or missing reset token." }, { status: 400 });
    }

    const passwordValidation = validatePasswordStrength(newPassword);
    if (!passwordValidation.valid) {
      return NextResponse.json({ error: passwordValidation.message }, { status: 400 });
    }

    const db = getDb();
    const now = Date.now();

    const resetRow = db.prepare(`
      SELECT id, user_id, expires_at, used
      FROM password_resets
      WHERE token = ?
    `).get(token) as { id: string; user_id: string; expires_at: number; used: number } | undefined;

    if (!resetRow || resetRow.used === 1 || now > resetRow.expires_at) {
      return NextResponse.json(
        { error: "This password reset link is invalid or has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Hash new password
    const passwordHash = await hashPassword(newPassword);

    // Update password, mark token used, invalidate all active sessions
    db.prepare("UPDATE users SET password_hash = ?, updated_at = ? WHERE id = ?").run(
      passwordHash,
      now,
      resetRow.user_id
    );
    db.prepare("UPDATE password_resets SET used = 1 WHERE id = ?").run(resetRow.id);
    db.prepare("DELETE FROM sessions WHERE user_id = ?").run(resetRow.user_id);

    return NextResponse.json({
      success: true,
      message: "Password has been successfully updated. You may now log in with your new password.",
    });
  } catch (error: any) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Failed to reset password. Please try again." },
      { status: 500 }
    );
  }
}
