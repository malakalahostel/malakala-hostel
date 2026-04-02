import pkg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const { Pool } = pkg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function migrate() {
  console.log("Adding columns to applicants table...");
  try {
    await pool.query(`
      ALTER TABLE applicants
      ADD COLUMN IF NOT EXISTS order_id VARCHAR(255),
      ADD COLUMN IF NOT EXISTS payment_id VARCHAR(255),
      ADD COLUMN IF NOT EXISTS payment_status VARCHAR(50) DEFAULT 'pending';
    `);
    console.log("Migration successful");
  } catch (e) {
    console.error("Migration failed:", e);
  } finally {
    await pool.end();
  }
}

migrate();
