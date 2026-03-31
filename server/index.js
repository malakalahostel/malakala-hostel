import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const { Pool } = pkg;
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Create Application
app.post('/api/applications', async (req, res) => {
  try {
    const { 
      applicant_name, guardian_name, dob, blood_group, gothram, annual_income, expected_college, 
      course_intended, academic_history, hobbies, achievements, address, email, 
      phone_number, password, 
      receives_help, help_details, has_scholarship, scholarship_details,
      old_border, old_border_details, relative_in_hostel, relative_details,
      applied_other_hostel, other_hostel_details, contagious_disease, disease_details
    } = req.body;

    // Check if phone number already exists
    const userCheck = await pool.query('SELECT * FROM applicants WHERE phone_number = $1 OR email = $2', [phone_number, email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: 'This Phone Number or Email already exists with us.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Insert into DB
    const newApplicant = await pool.query(
      `INSERT INTO applicants 
        (applicant_name, guardian_name, dob, blood_group, gothram, annual_income, expected_college, course_intended, 
         academic_history, hobbies, achievements, address, email, phone_number, password_hash,
         receives_help, help_details, has_scholarship, scholarship_details, old_border, old_border_details,
         relative_in_hostel, relative_details, applied_other_hostel, other_hostel_details, contagious_disease, disease_details) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27) RETURNING id`,
      [applicant_name, guardian_name, dob, blood_group, gothram, annual_income, expected_college, course_intended, 
       JSON.stringify(academic_history), hobbies, achievements, address, email, phone_number, passwordHash,
       receives_help, help_details, has_scholarship, scholarship_details, old_border, old_border_details,
       relative_in_hostel, relative_details, applied_other_hostel, other_hostel_details, contagious_disease, disease_details]
    );

    res.status(201).json({ success: true, id: newApplicant.rows[0].id });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error while processing application' });
  }
});

// Admin Panel Fetch
app.get('/api/applications', async (req, res) => {
  try {
    const allApplicants = await pool.query('SELECT id, applicant_name, guardian_name, dob, blood_group, gothram, annual_income, expected_college, course_intended, academic_history, hobbies, achievements, address, email, phone_number, receives_help, help_details, has_scholarship, scholarship_details, old_border, old_border_details, relative_in_hostel, relative_details, applied_other_hostel, other_hostel_details, contagious_disease, disease_details, created_at FROM applicants ORDER BY created_at DESC');
    res.json(allApplicants.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error while fetching applications' });
  }
});

if (process.env.NODE_ENV === 'production') {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  
  app.use(express.static(path.join(__dirname, '../dist')));
  
  app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
