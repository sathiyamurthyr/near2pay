import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyPassword } from "@/lib/auth/password";
import { createSession, setSessionCookie } from "@/lib/auth/session";
import { checkRateLimit, clearRateLimit } from "@/lib/auth/rate-limit";
import { isValidEmail } from "@/lib/auth/validation";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown-ip";
    const normalizedEmail = (email && typeof email === "string") ? email.trim().toLowerCase() : "";
    const rateLimitKey = `login:${ip}:${normalizedEmail || "empty"}`;

    // Rate limit check
    const rateCheck = checkRateLimit(rateLimitKey, 5, 15 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Too many failed login attempts. Please try again in ${rateCheck.retryAfterSeconds} seconds.`,
        },
        {
          status: 429,
          headers: { "Retry-After": String(rateCheck.retryAfterSeconds) },
        }
      );
    }

    if (!isValidEmail(normalizedEmail) || !password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const db = getDb();
    const userRow = db.prepare(`
      SELECT id, email, name, phone, password_hash, role
      FROM users
      WHERE email = ?
    `).get(normalizedEmail) as
      | { id: string; email: string; name: string; phone: string | null; password_hash: string; role: string }
      | undefined;

    if (!userRow) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, userRow.password_hash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Success: clear rate limit, create session
    clearRateLimit(rateLimitKey);
    const { token, expiresAt } = createSession(userRow.id);
    setSessionCookie(token, expiresAt);

    return NextResponse.json({
      success: true,
      user: {
        id: userRow.id,
        name: userRow.name,
        email: userRow.email,
        phone: userRow.phone,
        role: userRow.role,
      },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during login. Please try again." },
      { status: 500 }
    );
  }
}
