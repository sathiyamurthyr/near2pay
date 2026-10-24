import { randomBytes } from "crypto";
import { getDb } from "@/lib/db";
import { cookies } from "next/headers";

import { SESSION_COOKIE_NAME, SESSION_DURATION_MS } from "./constants";
export { SESSION_COOKIE_NAME, SESSION_DURATION_MS };

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  role: string;
}

export function createSession(userId: string): { token: string; expiresAt: number } {
  const db = getDb();
  const token = randomBytes(32).toString("hex");
  const id = "sess-" + randomBytes(16).toString("hex");
  const expiresAt = Date.now() + SESSION_DURATION_MS;

  const stmt = db.prepare(`
    INSERT INTO sessions (id, user_id, token, expires_at, created_at)
    VALUES (?, ?, ?, ?, ?)
  `);
  stmt.run(id, userId, token, expiresAt, Date.now());

  return { token, expiresAt };
}

export function getSessionUser(token: string | null | undefined): SessionUser | null {
  if (!token) return null;
  const db = getDb();
  const now = Date.now();

  const stmt = db.prepare(`
    SELECT u.id, u.email, u.name, u.phone, u.role, s.expires_at
    FROM sessions s
    JOIN users u ON s.user_id = u.id
    WHERE s.token = ? AND s.expires_at > ?
  `);

  const row = stmt.get(token, now) as (SessionUser & { expires_at: number }) | undefined;
  if (!row) return null;

  return {
    id: row.id,
    email: row.email,
    name: row.name,
    phone: row.phone,
    role: row.role,
  };
}

export function destroySession(token: string): void {
  const db = getDb();
  const stmt = db.prepare("DELETE FROM sessions WHERE token = ?");
  stmt.run(token);
}

export function setSessionCookie(token: string, expiresAt: number) {
  const cookieStore = cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(expiresAt),
  });
}

export function clearSessionCookie() {
  const cookieStore = cookies();
  cookieStore.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });
}

export function getCurrentUser(): SessionUser | null {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return getSessionUser(sessionToken);
}
