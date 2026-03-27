import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FaFilePdf, FaUsers, FaSpinner } from 'react-icons/fa';

export default function AdminPanel() {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const VITE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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

    const tableColumn = ["First Name", "Last Name", "Phone", "Email", "SSLC %", "PUC %", "City/Address"];
    const tableRows = [];

    applicants.forEach(app => {
      const appData = [
        app.first_name,
        app.last_name,
        app.phone_number,
        app.email,
        app.sslc_percentage,
        app.puc_percentage,
        app.address.substring(0, 25) + '...'
      ];
      tableRows.push(appData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 45,
      theme: 'grid',
      styles: { fontSize: 9 },
      headStyles: { fillColor: [108, 99, 255] }
    });

    doc.save(`malakala_hostel_applicants_${new Date().getTime()}.pdf`);
  };

  const generateIndividualPDF = (app) => {
    const doc = new jsPDF('portrait');
    
    doc.setFontSize(22);
    doc.setTextColor(108, 99, 255);
    doc.text('Malakala Hostel Application', 105, 20, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Applicant Details', 20, 40);

    autoTable(doc, {
      startY: 45,
      theme: 'grid',
      head: [['Field', 'Details']],
      body: [
        ['First Name', app.first_name],
        ['Last Name', app.last_name],
        ['Father Name', app.father_name],
        ['Mother Name', app.mother_name],
        ['Phone Number', app.phone_number],
        ['Email Address', app.email],
        ['Address', app.address],
        ['SSLC Percentage', `${app.sslc_percentage}%`],
        ['PUC Percentage', `${app.puc_percentage}%`],
        ['Application Date', new Date(app.created_at).toLocaleDateString()]
      ],
      styles: { fontSize: 11, cellPadding: 5 },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 50 },
        1: { cellWidth: 130 }
      },
      headStyles: { fillColor: [108, 99, 255] }
    });

    doc.save(`Application_${app.first_name}_${app.last_name}.pdf`);
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
            <span>Download PDF Report</span>
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
                  <th className="py-4 px-6 font-semibold">Name</th>
                  <th className="py-4 px-6 font-semibold">Phone</th>
                  <th className="py-4 px-6 font-semibold">Email</th>
                  <th className="py-4 px-6 font-semibold">SSLC / PUC</th>
                  <th className="py-4 px-6 font-semibold">Address</th>
                  <th className="py-4 px-6 font-semibold">Applied On</th>
                  <th className="py-4 px-6 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-gray-500">
                      <FaSpinner className="animate-spin text-primary text-3xl mx-auto mb-4" />
                      Loading applicants...
                    </td>
                  </tr>
                ) : applicants.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-gray-500">
                      No applications found.
                    </td>
                  </tr>
                ) : (
                  applicants.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-semibold text-gray-800">{app.first_name} {app.last_name}</div>
                        <div className="text-xs text-gray-500">P/M: {app.father_name} / {app.mother_name}</div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{app.phone_number}</td>
                      <td className="py-4 px-6 text-gray-600">{app.email}</td>
                      <td className="py-4 px-6 text-gray-600">
                        <span className="font-medium text-blue-600">{app.sslc_percentage}%</span> / <span className="font-medium text-green-600">{app.puc_percentage}%</span>
                      </td>
                      <td className="py-4 px-6 text-gray-500 text-sm max-w-xs truncate" title={app.address}>
                        {app.address}
                      </td>
                      <td className="py-4 px-6 text-gray-500 text-sm">
                        {new Date(app.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button 
                          onClick={() => generateIndividualPDF(app)}
                          className="bg-primary/10 text-primary hover:bg-primary hover:text-white p-2 rounded-lg transition-colors group"
                          title="Download Application PDF"
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
