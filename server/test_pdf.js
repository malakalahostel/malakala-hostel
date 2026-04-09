import { generateApplicationPDF } from './pdfGenerator.js';

try {
  const dummyData = {
    applicant_name: "Test",
    guardian_name: "Test Guid",
    dob: "2000-01-01",
    blood_group: "O+",
    gothram: "S",
    annual_income: "10000",
    expected_college: "RVCE",
    course_intended: "BE",
    phone_number: "1234567890",
    email: "test@test.com",
    address: "Bangalore",
    academic_history: JSON.stringify([{year: '2020', institution: 'XYZ', course: 'PUC', marks: '90'}]),
    utr_number: "UTR123"
  };
  const buf = generateApplicationPDF(dummyData);
  console.log("PDF generation successful, size:", buf.length);
} catch (e) {
  console.error("PDF generation failed:", e);
}
