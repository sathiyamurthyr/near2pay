import path from "path";
import fs from "fs";
import { MIGRATIONS } from "./migrations";
import { seedInitialData } from "./seed";

declare const __non_webpack_require__: any;

function getDatabaseSyncClass() {
  const req = typeof __non_webpack_require__ !== "undefined" ? __non_webpack_require__ : eval("require");
  return req("node:sqlite").DatabaseSync;
}

let dbInstance: any = null;

export function getDatabasePath(): string {
  if (process.env.TEST_DB_PATH) {
    return process.env.TEST_DB_PATH;
  }
  const dbDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  return path.join(dbDir, "near4you.db");
}

export function initDatabase(dbPath?: string): any {
  const DatabaseSync = getDatabaseSyncClass();
  const targetPath = dbPath || getDatabasePath();
  const db = new DatabaseSync(targetPath);

  // Enable WAL mode and foreign keys for high performance and integrity
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec("PRAGMA foreign_keys = ON;");
  db.exec("PRAGMA busy_timeout = 5000;");

  // Create migrations table
  db.exec(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      applied_at INTEGER NOT NULL
    );
  `);

  // Apply pending migrations
  const getApplied = db.prepare("SELECT id FROM _migrations");
  const appliedRows = getApplied.all() as { id: string }[];
  const appliedIds = new Set(appliedRows.map((r) => r.id));

  const insertMigration = db.prepare(`
    INSERT INTO _migrations (id, name, applied_at) VALUES (?, ?, ?)
  `);

  for (const migration of MIGRATIONS) {
    if (!appliedIds.has(migration.id)) {
      db.exec(migration.up);
      insertMigration.run(migration.id, migration.name, Date.now());
    }
  }

  // Seed initial sample data if tables are fresh
  seedInitialData(db);

  return db;
}

export function getDb(): any {
  if (!dbInstance) {
    dbInstance = initDatabase();
  }
  return dbInstance;
}

/**
 * Reverts the most recently applied migration (for reversible migration testing)
 */
export function rollbackLastMigration(db: any): string | null {
  const lastApplied = db.prepare("SELECT id, name FROM _migrations ORDER BY applied_at DESC LIMIT 1").get() as
    | { id: string; name: string }
    | undefined;

  if (!lastApplied) {
    return null;
  }

  const migration = MIGRATIONS.find((m) => m.id === lastApplied.id);
  if (!migration) {
    throw new Error(`Migration ${lastApplied.id} definition not found`);
  }

  db.exec(migration.down);
  db.prepare("DELETE FROM _migrations WHERE id = ?").run(lastApplied.id);
  return migration.id;
}

/**
 * Reset test db in memory or custom file
 */
export function createTestDb(): any {
  const DatabaseSync = getDatabaseSyncClass();
  const db = new DatabaseSync(":memory:");
  db.exec("PRAGMA foreign_keys = ON;");
  db.exec(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      applied_at INTEGER NOT NULL
    );
  `);
  for (const migration of MIGRATIONS) {
    db.exec(migration.up);
  }
  seedInitialData(db);
  return db;
}
