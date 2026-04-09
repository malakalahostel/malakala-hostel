import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import path from 'path';
import { generateApplicationPDF } from './pdfGenerator.js';
import { fileURLToPath } from 'url';

dotenv.config();

const { Pool } = pkg;

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
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
      applied_other_hostel, other_hostel_details, contagious_disease, disease_details,
      utr_number
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
         relative_in_hostel, relative_details, applied_other_hostel, other_hostel_details, contagious_disease, disease_details,
         payment_id, payment_status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29) RETURNING id`,
      [applicant_name, guardian_name, dob, blood_group, gothram, annual_income, expected_college, course_intended, 
       JSON.stringify(academic_history), hobbies, achievements, address, email, phone_number, passwordHash,
       receives_help, help_details, has_scholarship, scholarship_details, old_border, old_border_details,
       relative_in_hostel, relative_details, applied_other_hostel, other_hostel_details, contagious_disease, disease_details,
       utr_number || null, 'pending']
    );

    const applicationId = newApplicant.rows[0].id;

    // Send Confirmation Email
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const mailOptions = {
          from: `"Malkala Hostel" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: 'Application Submitted & Payment Pending Verification - Malkala Hostel',
          html: `
            <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f6f9; padding: 40px 20px; margin: 0; text-align: center;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); text-align: left;">
                
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 30px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1px;">MALAKALA HOSTEL</h1>
                  <p style="color: #bfdbfe; margin: 10px 0 0 0; font-size: 14px;">M. S. S. V. Dharmasamsthe</p>
                </div>

                <!-- Body -->
                <div style="padding: 40px 30px;">
                  <h2 style="color: #1e293b; font-size: 22px; margin-top: 0; margin-bottom: 20px;">Application Received! 🎉</h2>
                  <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                    Dear <strong style="color: #1e293b;">${applicant_name}</strong>,<br><br>
                    Thank you for choosing Malakala Hostel. Your official application has been successfully recorded within our system. Our trustees will review your details shortly.
                  </p>

                  <!-- Details Card -->
                  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                    <h3 style="color: #0f172a; font-size: 16px; margin-top: 0; margin-bottom: 15px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Application Summary</h3>
                    <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-weight: 500; width: 40%;">Applicant:</td>
                        <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${applicant_name}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Guardian Name:</td>
                        <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${guardian_name}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Expected College:</td>
                        <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${expected_college}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Intended Course:</td>
                        <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${course_intended}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Phone Number:</td>
                        <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${phone_number}</td>
                      </tr>
                    </table>
                  </div>

                  <p style="color: #475569; font-size: 16px; line-height: 1.6;">
                    We will notify you directly regarding the next steps, including seat allotment procedures. If you have any questions, feel free to contact the administration.
                  </p>

                </div>

                <!-- Footer -->
                <div style="background-color: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
                  <p style="margin: 0; color: #64748b; font-size: 13px;">
                    <strong>Malakala Hostel Administration</strong><br>
                    Bengaluru-560019
                  </p>
                </div>

              </div>
            </div>
          `,
          attachments: [
            {
              filename: `Application_${applicant_name.replace(/\s+/g, '_')}.pdf`,
              content: generateApplicationPDF(req.body)
            }
          ]
        };
        await transporter.sendMail(mailOptions);
      }
    } catch (mailErr) {
      console.error('Email failed to send:', mailErr.message);
    }

    res.status(201).json({ 
      success: true, 
      id: applicationId
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error while processing application' });
  }
});


// Applicant Authentication
app.post('/api/auth/applicant', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and Password are required.' });
    }

    const { rows } = await pool.query('SELECT * FROM applicants WHERE email = $1', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials. Record not found.' });
    }

    const applicant = rows[0];
    const isMatch = await bcrypt.compare(password, applicant.password_hash);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials. Incorrect password.' });
    }

    // Remove password hash before sending back
    delete applicant.password_hash;
    
    res.json({ success: true, applicant });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Server error while authenticating' });
  }
});
// Admin Panel Fetch
app.get('/api/applications', async (req, res) => {
  const adminKey = req.headers['x-admin-key'];
  const masterKey = process.env.ADMIN_PASSWORD || 'malkala123';
  const donorKey = process.env.DONOR_PASSWORD || 'donor123';
  
  if (adminKey === masterKey) {
    try {
      const allApplicants = await pool.query('SELECT *, payment_status, payment_id, created_at FROM applicants ORDER BY created_at DESC');
      return res.json({ role: 'admin', data: allApplicants.rows });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Server error' });
    }
  } else if (adminKey === donorKey) {
    try {
      const allApplicants = await pool.query("SELECT * FROM applicants WHERE selection_status IN ('sent_to_donor', 'selected_by_donor', 'rejected_by_donor') ORDER BY created_at DESC");
      return res.json({ role: 'donor', data: allApplicants.rows });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Server error' });
    }
  } else {
    return res.status(401).json({ error: 'Unauthorized access. Incorrect Password.' });
  }
});

// Admin Panel Delete Application
app.delete('/api/applications/:id', async (req, res) => {
  const masterKey = process.env.ADMIN_PASSWORD || 'malkala123';
  if (req.headers['x-admin-key'] !== masterKey) {
    return res.status(401).json({ error: 'Unauthorized access.' });
  }

  try {
    const { id } = req.params;
    await pool.query('DELETE FROM applicants WHERE id = $1', [id]);
    res.json({ success: true, message: 'Application deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error while deleting application' });
  }
});

// Status Update Route
app.put('/api/applications/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const key = req.headers['x-admin-key'];
  
  try {
    if (key === (process.env.ADMIN_PASSWORD || 'malkala123') && status === 'sent_to_donor') {
      await pool.query("UPDATE applicants SET selection_status = $1 WHERE id = $2", [status, id]);
      res.json({ success: true, status });
    } 
    else if (key === (process.env.DONOR_PASSWORD || 'donor123') && (status === 'selected_by_donor' || status === 'rejected_by_donor')) {
      const result = await pool.query("UPDATE applicants SET selection_status = $1 WHERE id = $2 RETURNING *", [status, id]);
      const appData = result.rows[0];
      
      // dispatch email
      try {
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
          const isSelected = status === 'selected_by_donor';
          const subjectText = isSelected ? 'Application Selected! - Malkala Hostel' : 'Update regarding your Application - Malkala Hostel';
          const htmlContent = isSelected 
          ? `
              <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f6f9; padding: 40px 20px; text-align: center;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); text-align: left; padding: 40px 30px;">
                  <h2 style="color: #1e293b; font-size: 22px; margin-top: 0; margin-bottom: 20px;">Congratulations, ${appData.applicant_name}! 🌟</h2>
                  <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                    We are thrilled to inform you that your application has been successfully selected by our donors for admission to Malkala Hostel!
                  </p>
                  <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                    The administration will reach out to you very soon with your official check-in instructions and requirements. We look forward to welcoming you to the hostel.
                  </p>
                </div>
              </div>`
          : `
              <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f6f9; padding: 40px 20px; text-align: center;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); text-align: left; padding: 40px 30px;">
                  <h2 style="color: #1e293b; font-size: 22px; margin-top: 0; margin-bottom: 20px;">Application Update</h2>
                  <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                    Dear ${appData.applicant_name},
                  </p>
                  <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                    We sincerely thank you for applying to Malkala Hostel. After careful consideration, we regret to inform you that we cannot offer you a seat at this time due to limited availability.
                  </p>
                  <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                    We wish you the very best in your academic journey.
                  </p>
                </div>
              </div>`;

          const mailOptions = {
            from: `"Malkala Hostel" <${process.env.EMAIL_USER}>`,
            to: appData.email,
            subject: subjectText,
            html: htmlContent
          };
          await transporter.sendMail(mailOptions);
        }
      } catch (e) {
        console.error('Failed to send status update email:', e);
      }
      
      res.json({ success: true, status });
    }
    else {
      res.status(401).json({ error: 'Unauthorized to perform this action.' });
    }
  } catch(e) {
    console.error(e.message);
    res.status(500).json({ error: 'Server error updating status' });
  }
});

// Get Settings (Dynamic Secretary and Cashier Details)
app.get('/api/settings', async (req, res) => {
  try {
    const result = await pool.query('SELECT key, value FROM settings');
    const settings = {};
    result.rows.forEach(row => settings[row.key] = row.value);
    
    // Default values if empty
    if (Object.keys(settings).length === 0) {
      return res.json({
        secretary_name: 'Vishnu S O',
        secretary_phone: '+91 8217495728',
        cashier_name: 'Raveesh Kalyani',
        cashier_phone: '+91 8431457138'
      });
    }
    res.json(settings);
  } catch (err) {
    if (err.code === '42P01') { // table doesn't exist
      try {
        await pool.query('CREATE TABLE settings (id SERIAL PRIMARY KEY, key VARCHAR(100) UNIQUE NOT NULL, value TEXT NOT NULL)');
        await pool.query("INSERT INTO settings (key, value) VALUES ('secretary_name', 'Vishnu S O'), ('secretary_phone', '+91 8217495728'), ('cashier_name', 'Raveesh Kalyani'), ('cashier_phone', '+91 8431457138') ON CONFLICT (key) DO NOTHING");
        return res.json({
          secretary_name: 'Vishnu S O',
          secretary_phone: '+91 8217495728',
          cashier_name: 'Raveesh Kalyani',
          cashier_phone: '+91 8431457138'
        });
      } catch (innerErr) {
        console.error('Failed to create settings table:', innerErr.message);
      }
    }
    console.error('Error fetching settings:', err.message);
    // Graceful fallback
    res.json({
      secretary_name: 'Vishnu S O',
      secretary_phone: '+91 8217495728',
      cashier_name: 'Raveesh Kalyani',
      cashier_phone: '+91 8431457138'
    });
  }
});

// Update Settings
app.post('/api/settings', async (req, res) => {
  const masterKey = process.env.ADMIN_PASSWORD || 'malkala123';
  if (req.headers['x-admin-key'] !== masterKey) {
    return res.status(401).json({ error: 'Unauthorized access.' });
  }

  try {
    const settings = req.body; // expected: { secretary_name: '...', ... }
    for (const [key, value] of Object.entries(settings)) {
      await pool.query('INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value', [key, value]);
    }
    res.json({ success: true, message: 'Settings updated successfully' });
  } catch (err) {
    console.error('Error updating settings:', err.message);
    res.status(500).json({ error: 'Server error while updating settings' });
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

pool.query("ALTER TABLE applicants ADD COLUMN IF NOT EXISTS selection_status VARCHAR(50) DEFAULT 'pending'")
  .then(() => console.log("Schema check passed: selection_status column available"))
  .catch((err) => console.log("DB Schema Check Exception:", err.message));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
