import { getDb } from "@/lib/db";

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

/**
 * Enterprise rate limiter using SQLite store
 */
export function checkRateLimit(
  key: string,
  maxHits = 5,
  windowMs = 15 * 60 * 1000 // 15 minutes window
): RateLimitResult {
  const db = getDb();
  const now = Date.now();

  const getStmt = db.prepare("SELECT hits, reset_at FROM rate_limits WHERE key = ?");
  const row = getStmt.get(key) as { hits: number; reset_at: number } | undefined;

  if (!row || now > row.reset_at) {
    // New or expired window
    const resetAt = now + windowMs;
    const upsertStmt = db.prepare(`
      INSERT INTO rate_limits (key, hits, reset_at)
      VALUES (?, 1, ?)
      ON CONFLICT(key) DO UPDATE SET hits = 1, reset_at = ?
    `);
    upsertStmt.run(key, resetAt, resetAt);

    return {
      allowed: true,
      remaining: maxHits - 1,
      retryAfterSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (row.hits >= maxHits) {
    const retryAfterSeconds = Math.max(1, Math.ceil((row.reset_at - now) / 1000));
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds,
    };
  }

  // Increment hits
  const updateStmt = db.prepare("UPDATE rate_limits SET hits = hits + 1 WHERE key = ?");
  updateStmt.run(key);

  return {
    allowed: true,
    remaining: maxHits - (row.hits + 1),
    retryAfterSeconds: Math.ceil((row.reset_at - now) / 1000),
  };
}

export function clearRateLimit(key: string): void {
  const db = getDb();
  const stmt = db.prepare("DELETE FROM rate_limits WHERE key = ?");
  stmt.run(key);
}
