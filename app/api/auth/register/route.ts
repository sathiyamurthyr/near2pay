import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";
import { createSession, setSessionCookie } from "@/lib/auth/session";
import { isValidEmail, validatePasswordStrength } from "@/lib/auth/validation";
import { randomBytes } from "crypto";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, password } = body;

    // Validate inputs
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Full name must be at least 2 characters." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: passwordValidation.message },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const db = getDb();

    // Check duplicate account
    const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(normalizedEmail);
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email address already exists. Please log in." },
        { status: 409 }
      );
    }

    // Hash password & create user
    const passwordHash = await hashPassword(password);
    const userId = "usr-" + randomBytes(16).toString("hex");
    const now = Date.now();

    const insertStmt = db.prepare(`
      INSERT INTO users (id, email, phone, name, password_hash, role, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 'customer', ?, ?)
    `);
    insertStmt.run(userId, normalizedEmail, phone ? String(phone).trim() : null, name.trim(), passwordHash, now, now);

    // Create session and set cookie
    const { token, expiresAt } = createSession(userId);
    setSessionCookie(token, expiresAt);

    return NextResponse.json(
      {
        success: true,
        user: {
          id: userId,
          name: name.trim(),
          email: normalizedEmail,
          phone: phone ? String(phone).trim() : null,
          role: "customer",
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during registration. Please try again." },
      { status: 500 }
    );
  }
}
