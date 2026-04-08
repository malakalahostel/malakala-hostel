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
  ssl: { rejectUnauthorized: false } // Keeping same as original for safety if needed
});

async function migrate() {
  console.log("Running migrations...");
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS settings (
        id SERIAL PRIMARY KEY,
        key VARCHAR(100) UNIQUE NOT NULL,
        value TEXT NOT NULL
      );
    `);
    
    // Insert initial values if they don't exist
    await pool.query(`
      INSERT INTO settings (key, value) VALUES 
      ('secretary_name', 'Vishnu S O'),
      ('secretary_phone', '+91 8217495728'),
      ('cashier_name', 'Raveesh Kalyani'),
      ('cashier_phone', '+91 8431457138')
      ON CONFLICT (key) DO NOTHING;
    `);

    console.log("Migration successful");
  } catch (e) {
    console.error("Migration failed:", e);
  } finally {
    await pool.end();
  }
}

migrate();
