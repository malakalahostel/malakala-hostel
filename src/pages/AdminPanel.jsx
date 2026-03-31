import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FaFilePdf, FaUsers, FaSpinner } from 'react-icons/fa';

export default function AdminPanel() {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const VITE_API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:5000');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${VITE_API_URL}/api/applications`);
      setApplicants(res.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch applications. Note: Ensure the PostgreSQL backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF('landscape');
    
    doc.setFontSize(18);
    doc.text('Malakala Hostel - Applicants Report', 14, 22);
    
    doc.setFontSize(11);
    doc.text(`Total Applications: ${applicants.length}`, 14, 30);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 36);

    const tableColumn = ["Name", "Guardian", "DOB", "Blood", "Phone", "Email", "Applied On"];
    const tableRows = [];

    applicants.forEach(app => {
      const appData = [
        app.applicant_name,
        app.guardian_name,
        new Date(app.dob).toLocaleDateString(),
        app.blood_group || 'N/A',
        app.phone_number,
        app.email,
        new Date(app.created_at).toLocaleDateString()
      ];
      tableRows.push(appData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 45,
      theme: 'grid',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [108, 99, 255] }
    });

    doc.save(`malakala_hostel_applicants_${new Date().getTime()}.pdf`);
  };

  const generateIndividualPDF = (app) => {
    const doc = new jsPDF('portrait');
    
    // --- PAGE 1: APPLICANT DETAILS ---
    doc.setFontSize(22);
    doc.setTextColor(108, 99, 255);
    doc.text('Malakala Hostel', 105, 20, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setTextColor(100, 100, 100);
    doc.text('Official Application Form', 105, 28, { align: 'center' });
    
    doc.setLineWidth(0.5);
    doc.setDrawColor(200, 200, 200);
    doc.line(14, 35, 196, 35);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    const formatData = [
      [{ content: 'Personal Information', colSpan: 2, styles: { fillColor: [240, 240, 240], fontStyle: 'bold', textColor: [108, 99, 255] } }],
      ['Full Name', app.applicant_name],
      ['Parent / Guardian', app.guardian_name],
      ['Date of Birth', new Date(app.dob).toLocaleDateString()],
      ['Blood Group & Gothram', `${app.blood_group || 'N/A'} | ${app.gothram || 'N/A'}`],
      ['Annual Income', app.annual_income || 'N/A'],
      
      [{ content: 'Contact Information', colSpan: 2, styles: { fillColor: [240, 240, 240], fontStyle: 'bold', textColor: [108, 99, 255] } }],
      ['Phone Number', app.phone_number],
      ['Email Address', app.email],
      ['Residential Address', app.address],
      
      [{ content: 'Additional Responses', colSpan: 2, styles: { fillColor: [240, 240, 240], fontStyle: 'bold', textColor: [108, 99, 255] } }],
      ['Receives outside help?', app.receives_help ? `Yes. (${app.help_details || ''})` : 'No'],
      ['Has fee concession/scholarship?', app.has_scholarship ? `Yes. (${app.scholarship_details || ''})` : 'No'],
      ['Was old border?', app.old_border ? `Yes. (${app.old_border_details || ''})` : 'No'],
      ['Relative in hostel?', app.relative_in_hostel ? `Yes. (${app.relative_details || ''})` : 'No'],
      ['Applied to other hostel?', app.applied_other_hostel ? `Yes. (${app.other_hostel_details || ''})` : 'No'],
      ['Contagious diseases?', app.contagious_disease ? `Yes. (${app.disease_details || ''})` : 'No'],

      [{ content: 'Misc', colSpan: 2, styles: { fillColor: [240, 240, 240], fontStyle: 'bold', textColor: [108, 99, 255] } }],
      ['Hobbies', app.hobbies || 'None specified'],
      ['Achievements', app.achievements || 'None specified'],
      ['Application Date', new Date(app.created_at).toLocaleDateString()]
    ];

    autoTable(doc, {
      startY: 42,
      theme: 'grid',
      body: formatData,
      styles: { fontSize: 10, cellPadding: 4 },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 65, fillColor: [250, 250, 250] },
        1: { cellWidth: 115 }
      }
    });

    let finalY = doc.lastAutoTable.finalY + 15;

    // ACADEMIC HISTORY TABLE
    doc.setFontSize(12);
    doc.setTextColor(108, 99, 255);
    doc.text('Academic History (Past 3 Years)', 14, finalY);
    
    // Parse jsonb array
    let historyRows = [];
    if(app.academic_history) {
      const historyArr = typeof app.academic_history === 'string' ? JSON.parse(app.academic_history) : app.academic_history;
      historyRows = historyArr.map((row, i) => [
        i + 1, 
        row.year || '-', 
        row.institution || '-', 
        row.course || '-', 
        row.marks ? `${row.marks}%` : '-'
      ]);
    }

    autoTable(doc, {
      startY: finalY + 5,
      head: [['Sl No', 'Year', 'Institution', 'Course', '% Marks']],
      body: historyRows.length > 0 ? historyRows : [['-', '-', '-', '-', '-']],
      theme: 'grid',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [108, 99, 255] }
    });
    
    finalY = doc.lastAutoTable.finalY + 15;
    
    // Check if we need a new page for Terms
    if (finalY > 210) {
      doc.addPage();
      finalY = 20;
    }

    // --- PAGE 2: TERMS & CONDITIONS ---
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text('DECLARATION', 105, finalY, { align: 'center' });
    
    finalY += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('To M. S. S. V. Dharmasamsthe, Bengaluru-560019. Sir,', 14, finalY);
    finalY += 8;
    doc.text('Father/Guardian of the applicant and the applicant request you to allot a:', 14, finalY);
    
    finalY += 8;
    const terms = [
      "1) Seat to the applicant in your Hostel for this academic year.",
      "2) We assure you that the applicant will abide by all the rules and regulations of the Hostel that are in force or that may come into force.",
      "3) We hear by solemnly declare that the information furnished by us in the application is true to the best of our knowledge and information.",
      "4) We know that if any information is furnished by us in the application is found to be untrue, I am prepared to indemnify MSSV Dharmasamsthe, and I shall reimburse all the amounts spent on applicant together with interest there on @21% per annum, also pay damages determined by the trustees and the trustees will be entitled to recover the same either jointly or severally from us.",
      "5) I also know that the applicant will be dismissed by you for the breach of faith and to the Rules and Regulations of the Hostel."
    ];

    terms.forEach(term => {
      const splitText = doc.splitTextToSize(term, 180);
      doc.text(splitText, 14, finalY);
      finalY += (splitText.length * 5) + 3;
    });

    finalY += 15;
    doc.text('Place: _________________', 14, finalY);
    doc.text('Date:  _________________', 14, finalY + 8);
    
    doc.text('_______________________', 80, finalY + 20, { align: 'center' });
    doc.text('Applicant Signature', 80, finalY + 26, { align: 'center' });
    
    doc.text('_______________________', 160, finalY + 20, { align: 'center' });
    doc.text('Signature of the parent/Guardian', 160, finalY + 26, { align: 'center' });

    finalY += 45;
    if (finalY > 260) {
      doc.addPage();
      finalY = 20;
    }

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(108, 99, 255);
    doc.text('Documents required along with application:', 14, finalY);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    
    const docsList = [
      "i. Applicant's AADHAR Card.",
      "ii. 10th and 12th Marks card.",
      "iii. KCET or COMEDK Rank card.",
      "iv. Income Certificate.",
      "v. Arya vysya mandali letter."
    ];
    
    finalY += 8;
    docsList.forEach(txt => {
      doc.text(txt, 20, finalY);
      finalY += 6;
    });

    finalY += 4;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(200, 0, 0);
    doc.text('NOTE: ALL THE COPIES SHOULD BE ATTESTED BY GAZETTED OFFICER', 14, finalY);

    doc.save(`Application_${app.applicant_name}.pdf`);
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-50 pb-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="bg-primary/10 p-3 rounded-full text-primary">
              <FaUsers size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-500">Manage hostel applications</p>
            </div>
          </div>
          
          <button 
            onClick={generatePDF}
            disabled={applicants.length === 0}
            className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md transform hover:-translate-y-1"
          >
            <FaFilePdf />
            <span>Download Summary Report</span>
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded shadow-sm">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 border-b border-gray-200">
                  <th className="py-4 px-6 font-semibold">Name & Guardian</th>
                  <th className="py-4 px-6 font-semibold">Academics</th>
                  <th className="py-4 px-6 font-semibold">Contact Info</th>
                  <th className="py-4 px-6 font-semibold">DOB & Blood</th>
                  <th className="py-4 px-6 font-semibold">Applied On</th>
                  <th className="py-4 px-6 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-gray-500">
                      <FaSpinner className="animate-spin text-primary text-3xl mx-auto mb-4" />
                      Loading applicants...
                    </td>
                  </tr>
                ) : applicants.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-gray-500">
                      No applications found.
                    </td>
                  </tr>
                ) : (
                  applicants.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-semibold text-gray-800">{app.applicant_name}</div>
                        <div className="text-xs text-gray-500">G: {app.guardian_name}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-800 font-medium">{app.expected_college}</div>
                        <div className="text-xs text-gray-500">{app.course_intended}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-800">{app.phone_number}</div>
                        <div className="text-xs text-blue-600">{app.email}</div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        <div className="text-sm">{new Date(app.dob).toLocaleDateString()}</div>
                        <div className="text-xs text-red-500 font-medium">{app.blood_group || 'N/A'}</div>
                      </td>
                      <td className="py-4 px-6 text-gray-500 text-sm">
                        {new Date(app.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button 
                          onClick={() => generateIndividualPDF(app)}
                          className="bg-primary/10 text-primary hover:bg-primary hover:text-white p-2 rounded-lg transition-colors group"
                          title="Generate Detailed Application PDF"
                        >
                          <FaFilePdf size={18} className="group-hover:scale-110 transition-transform" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
