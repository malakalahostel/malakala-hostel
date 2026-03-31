import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    console.log("Connecting to Supabase...");
    const res = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'applicants'");
    if (res.rows.length === 0) {
      console.log("ERROR: Table 'applicants' does not exist in the database!");
    } else {
      console.log("Table 'applicants' exists. Columns:", res.rows.map(r => r.column_name).join(", "));
    }
  } catch (e) {
    console.error("Database connection or query failed:", e.message);
  } finally {
    pool.end();
  }
}

run();
