import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateIndividualPDF = (app) => {
    const doc = new jsPDF('portrait');
    
    // --- PAGE 1: APPLICANT DETAILS ---
    doc.setFontSize(22);
    doc.setTextColor(108, 99, 255);
    doc.text('Malkala Hostel', 105, 20, { align: 'center' });
    
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
