-- Database schema replacing the old `applicants` table

CREATE TABLE IF NOT EXISTS applicants (
  id SERIAL PRIMARY KEY,
  applicant_name VARCHAR(150) NOT NULL,
  guardian_name VARCHAR(150) NOT NULL,
  dob DATE NOT NULL,
  blood_group VARCHAR(10),
  gothram VARCHAR(100),
  annual_income VARCHAR(50),
  expected_college VARCHAR(150) NOT NULL,
  course_intended VARCHAR(150) NOT NULL,
  
  -- Academic History array of objects: { sl_no, year, institution, course, marks }
  academic_history JSONB NOT NULL,
  
  hobbies TEXT,
  achievements TEXT,
  address TEXT NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone_number VARCHAR(20) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,

  -- Yes/No Questions and optional details
  receives_help BOOLEAN DEFAULT FALSE,
  help_details TEXT,
  
  has_scholarship BOOLEAN DEFAULT FALSE,
  scholarship_details TEXT,
  
  old_border BOOLEAN DEFAULT FALSE,
  old_border_details TEXT,
  
  relative_in_hostel BOOLEAN DEFAULT FALSE,
  relative_details TEXT,
  
  applied_other_hostel BOOLEAN DEFAULT FALSE,
  other_hostel_details TEXT,
  
  contagious_disease BOOLEAN DEFAULT FALSE,
  disease_details TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
