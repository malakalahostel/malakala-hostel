import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { FaLock, FaEye, FaEyeSlash, FaSpinner, FaUserCircle, FaFilePdf, FaEnvelope } from 'react-icons/fa';
import { generateIndividualPDF } from '../utils/pdfGenerator.client';

export default function ApplicantDashboard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [applicantData, setApplicantData] = useState(null);

  const VITE_API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:5000');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post(`${VITE_API_URL}/api/auth/applicant`, { email, password });
      if (res.data.success) {
        setApplicantData(res.data.applicant);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to authenticate. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (applicantData) {
      generateIndividualPDF(applicantData);
    }
  };

  const handleLogout = () => {
    setApplicantData(null);
    setEmail('');
    setPassword('');
  };

  if (!applicantData) {
    return (
      <div className="pt-24 min-h-screen relative flex items-center justify-center p-4">
        <Helmet>
          <title>Applicant Login | Malkala Hostel</title>
        </Helmet>
        
        <div className="glass p-8 rounded-3xl shadow-2xl max-w-md w-full text-center hover-glow transition-all">
          <div className="glass-red w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaLock className="text-secondary text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Applicant Portal</h2>
          <p className="text-gray-300 mb-8 text-sm">Please log in to view and download your submitted hostel application form.</p>
          
          <form onSubmit={handleLogin} className="space-y-6 text-left">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Registered Email</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..." 
                  className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-black/50 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none pl-10"
                  required
                />
                <FaEnvelope className="absolute left-3.5 top-4 text-gray-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Application Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password..." 
                  className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-black/50 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-secondary transition-colors focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

            {error && <p className="text-primary text-sm font-medium text-center bg-primary/10 p-2 rounded">{error}</p>}
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary hover:bg-secondary hover:text-black text-white font-bold py-3 rounded-xl shadow-lg transition-all flex justify-center items-center h-12 hover-glow"
            >
              {loading ? <FaSpinner className="animate-spin text-xl" /> : 'Secure Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen relative pb-12">
      <Helmet>
        <title>My Application | Malkala Hostel</title>
      </Helmet>
      
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 glass p-6 rounded-2xl shadow-sm border border-gray-800">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="glass-red p-3 rounded-full text-secondary">
              <FaUserCircle size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-secondary">Welcome, {applicantData.applicant_name}</h1>
              <p className="text-gray-400 text-sm">Review your application status and documents</p>
            </div>
          </div>
          
          <button onClick={handleLogout} className="text-sm text-gray-400 hover:text-white transition-colors underline">
            Log out
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Main Download Card */}
          <div className="glass p-8 rounded-3xl text-center hover-glow transition-all" data-aos="fade-up">
            <div className="bg-green-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
              <FaFilePdf className="text-green-500 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Formal Application Form</h3>
            <p className="text-gray-400 mb-8 text-sm px-4">Download the generated PDF format of your successfully submitted application. This contains all your inputted data and the declaration.</p>
            
            <button 
              onClick={handleDownloadPDF}
              className="w-full bg-primary hover:bg-secondary hover:text-black text-white font-bold py-4 rounded-xl shadow-lg transition-all flex justify-center items-center space-x-2 hover-glow"
            >
              <FaFilePdf size={20} />
              <span>Download PDF Copy</span>
            </button>
          </div>

          {/* Quick Info Card */}
          <div className="glass p-8 rounded-3xl" data-aos="fade-up" data-aos-delay="100">
            <h3 className="text-xl font-bold text-secondary mb-6 border-b border-gray-800 pb-2">Quick Overview</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex justify-between border-b border-gray-800 pb-2">
                <span className="font-semibold text-gray-400">Status</span>
                <span className="text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">Under Review</span>
              </li>
              <li className="flex justify-between border-b border-gray-800 pb-2">
                <span className="font-semibold text-gray-400">Application Date</span>
                <span>{new Date(applicantData.created_at).toLocaleDateString()}</span>
              </li>
              <li className="flex justify-between border-b border-gray-800 pb-2">
                <span className="font-semibold text-gray-400">Intended Course</span>
                <span>{applicantData.course_intended}</span>
              </li>
              <li className="flex justify-between border-b border-gray-800 pb-2">
                <span className="font-semibold text-gray-400">Guardian</span>
                <span>{applicantData.guardian_name}</span>
              </li>
            </ul>
            <div className="mt-8 pt-4 border-t border-gray-800">
              <p className="text-xs text-gray-500 leading-relaxed text-center">
                If you find any mistakes in your application, please reach out to the hostel administration immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
