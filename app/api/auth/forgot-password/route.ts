import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { isValidEmail } from "@/lib/auth/validation";
import { randomBytes } from "crypto";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { message: "If an account with that email exists, password reset instructions have been generated." },
        { status: 200 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const db = getDb();
    const user = db.prepare("SELECT id FROM users WHERE email = ?").get(normalizedEmail) as
      | { id: string }
      | undefined;

    if (user) {
      const resetToken = randomBytes(32).toString("hex");
      const id = "rst-" + randomBytes(16).toString("hex");
      const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour

      db.prepare(`
        INSERT INTO password_resets (id, user_id, token, expires_at, used, created_at)
        VALUES (?, ?, ?, ?, 0, ?)
      `).run(id, user.id, resetToken, expiresAt, Date.now());

      // In production, an email is dispatched. In sandbox/dev, provide token in logs/development response
      const isDev = process.env.NODE_ENV !== "production";
      return NextResponse.json({
        message: "If an account with that email exists, password reset instructions have been generated.",
        ...(isDev ? { devResetToken: resetToken } : {}),
      });
    }

    return NextResponse.json({
      message: "If an account with that email exists, password reset instructions have been generated.",
    });
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { message: "If an account with that email exists, password reset instructions have been generated." },
      { status: 200 }
    );
  }
}
