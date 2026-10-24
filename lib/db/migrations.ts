/**
 * Reversible database migrations for Near4You (Near2Pay / Sathus Technology Pvt. Ltd.)
 */

export interface Migration {
  id: string;
  name: string;
  up: string;
  down: string;
}

export const MIGRATIONS: Migration[] = [
  {
    id: "001_initial_schema",
    name: "Initial schema for users, auth, institutions, students, fees, orders, and payments",
    up: `
      -- Users & Customer Accounts
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL COLLATE NOCASE,
        phone TEXT,
        name TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'customer',
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

      -- User Sessions
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        token TEXT UNIQUE NOT NULL,
        expires_at INTEGER NOT NULL,
        created_at INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
      CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);

      -- Password Reset Tokens
      CREATE TABLE IF NOT EXISTS password_resets (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        token TEXT UNIQUE NOT NULL,
        expires_at INTEGER NOT NULL,
        used INTEGER NOT NULL DEFAULT 0,
        created_at INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE INDEX IF NOT EXISTS idx_password_resets_token ON password_resets(token);

      -- Educational Institutions
      CREATE TABLE IF NOT EXISTS institutions (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        code TEXT UNIQUE NOT NULL,
        type TEXT NOT NULL, -- 'School', 'College', 'Coaching Centre'
        location TEXT NOT NULL,
        board TEXT NOT NULL,
        created_at INTEGER NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_institutions_code ON institutions(code);

      -- Students
      CREATE TABLE IF NOT EXISTS students (
        id TEXT PRIMARY KEY,
        institution_id TEXT NOT NULL,
        admission_number TEXT UNIQUE NOT NULL COLLATE NOCASE,
        roll_number TEXT,
        name TEXT NOT NULL,
        grade_class TEXT NOT NULL,
        parent_name TEXT,
        parent_phone TEXT,
        parent_email TEXT,
        academic_session TEXT NOT NULL,
        user_id TEXT,
        created_at INTEGER NOT NULL,
        FOREIGN KEY (institution_id) REFERENCES institutions(id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      );

      CREATE INDEX IF NOT EXISTS idx_students_adm ON students(admission_number);
      CREATE INDEX IF NOT EXISTS idx_students_institution ON students(institution_id);

      -- Fee Catalog (Mandatory & Optional Services)
      CREATE TABLE IF NOT EXISTS fee_items (
        id TEXT PRIMARY KEY,
        institution_id TEXT NOT NULL,
        code TEXT NOT NULL,
        name TEXT NOT NULL,
        description TEXT,
        amount INTEGER NOT NULL, -- In INR whole units (e.g. 18500)
        is_mandatory INTEGER NOT NULL DEFAULT 1, -- 1 = mandatory, 0 = optional
        category TEXT NOT NULL, -- 'tuition', 'lab', 'exam', 'transport', 'sports', 'other'
        is_active INTEGER NOT NULL DEFAULT 1,
        created_at INTEGER NOT NULL,
        FOREIGN KEY (institution_id) REFERENCES institutions(id),
        UNIQUE(institution_id, code)
      );

      CREATE INDEX IF NOT EXISTS idx_fee_items_inst ON fee_items(institution_id);

      -- Orders (Authoritative Total Calculated on Server)
      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        order_number TEXT UNIQUE NOT NULL,
        user_id TEXT,
        student_id TEXT NOT NULL,
        institution_id TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'CREATED', -- 'CREATED', 'PENDING', 'PAID', 'FAILED', 'CANCELLED'
        currency TEXT NOT NULL DEFAULT 'INR',
        subtotal_mandatory INTEGER NOT NULL,
        subtotal_optional INTEGER NOT NULL,
        total_amount INTEGER NOT NULL,
        total_amount_paise INTEGER NOT NULL,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (student_id) REFERENCES students(id),
        FOREIGN KEY (institution_id) REFERENCES institutions(id)
      );

      CREATE INDEX IF NOT EXISTS idx_orders_number ON orders(order_number);
      CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
      CREATE INDEX IF NOT EXISTS idx_orders_student ON orders(student_id);

      -- Order Items (Snapshot of selected services and prices at creation)
      CREATE TABLE IF NOT EXISTS order_items (
        id TEXT PRIMARY KEY,
        order_id TEXT NOT NULL,
        fee_item_id TEXT NOT NULL,
        fee_name TEXT NOT NULL,
        fee_category TEXT NOT NULL,
        is_mandatory INTEGER NOT NULL,
        amount INTEGER NOT NULL,
        created_at INTEGER NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (fee_item_id) REFERENCES fee_items(id)
      );

      CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);

      -- Payments & Transactions
      CREATE TABLE IF NOT EXISTS payments (
        id TEXT PRIMARY KEY,
        order_id TEXT NOT NULL,
        user_id TEXT,
        gateway TEXT NOT NULL DEFAULT 'razorpay',
        gateway_order_id TEXT UNIQUE,
        gateway_payment_id TEXT UNIQUE,
        gateway_signature TEXT,
        amount INTEGER NOT NULL,
        currency TEXT NOT NULL DEFAULT 'INR',
        status TEXT NOT NULL DEFAULT 'CREATED', -- 'CREATED', 'PENDING', 'SUCCESS', 'FAILED', 'CANCELLED'
        payment_method TEXT, -- 'upi', 'card', 'netbanking'
        error_code TEXT,
        error_description TEXT,
        raw_response TEXT,
        verified_at INTEGER,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      );

      CREATE INDEX IF NOT EXISTS idx_payments_order ON payments(order_id);
      CREATE INDEX IF NOT EXISTS idx_payments_gateway_order ON payments(gateway_order_id);
      CREATE INDEX IF NOT EXISTS idx_payments_gateway_payment ON payments(gateway_payment_id);

      -- Webhook Event Logs (Idempotency and Audit)
      CREATE TABLE IF NOT EXISTS webhook_logs (
        id TEXT PRIMARY KEY,
        gateway TEXT NOT NULL,
        event_id TEXT UNIQUE NOT NULL,
        event_type TEXT NOT NULL,
        payload TEXT NOT NULL,
        status TEXT NOT NULL, -- 'PROCESSED', 'IGNORED', 'ERROR'
        created_at INTEGER NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_webhook_logs_event_id ON webhook_logs(event_id);

      -- Rate Limiting
      CREATE TABLE IF NOT EXISTS rate_limits (
        key TEXT PRIMARY KEY,
        hits INTEGER NOT NULL DEFAULT 1,
        reset_at INTEGER NOT NULL
      );
    `,
    down: `
      DROP TABLE IF EXISTS rate_limits;
      DROP TABLE IF EXISTS webhook_logs;
      DROP TABLE IF EXISTS payments;
      DROP TABLE IF EXISTS order_items;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS fee_items;
      DROP TABLE IF EXISTS students;
      DROP TABLE IF EXISTS institutions;
      DROP TABLE IF EXISTS password_resets;
      DROP TABLE IF EXISTS sessions;
      DROP TABLE IF EXISTS users;
    `,
  },
];
