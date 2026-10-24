import { NextRequest, NextResponse } from "next/server";
import { destroySession, clearSessionCookie, SESSION_COOKIE_NAME } from "@/lib/auth/session";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (sessionToken) {
      destroySession(sessionToken);
    }
    clearSessionCookie();
    return NextResponse.json({ success: true, message: "Logged out successfully" });
  } catch (error: any) {
    console.error("Logout error:", error);
    clearSessionCookie();
    return NextResponse.json({ success: true });
  }
}
