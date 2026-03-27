import React, { useState } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    fathername: '',
    Mothername: '',
    Address: '',
    SSLC_Percentage: '',
    IIPUC_Percentage: '',
    email: '',
    password: '',
    number: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const VITE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post(`${VITE_API_URL}/api/applications`, formData);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-6 max-w-2xl py-20 text-center" data-aos="zoom-in">
        <div className="bg-white rounded-3xl p-12 shadow-2xl flex flex-col items-center">
          <FaCheckCircle className="text-6xl text-green-500 mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted Successfully</h2>
          <p className="text-gray-600 mb-8">Thank you, {formData.firstName}. We have received your hostel application. You can print the details or keep checking for updates.</p>
          <button 
            type="button" 
            onClick={() => window.print()}
            className="bg-primary hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all"
          >
            Print Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 max-w-4xl" data-aos="fade-up">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Registration Form</h2>
          <p className="text-gray-600">Please fill out all the details carefully to apply for Malakala Hostel.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="John" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="Doe" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Father Name</label>
              <input type="text" name="fathername" value={formData.fathername} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mother Name</label>
              <input type="text" name="Mothername" value={formData.Mothername} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <textarea name="Address" value={formData.Address} onChange={handleChange} required rows="3" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="Full residential address"></textarea>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SSLC Percentage (CGPA)</label>
              <input type="text" name="SSLC_Percentage" value={formData.SSLC_Percentage} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="e.g. 95%" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">IIPUC Percentage (CGPA)</label>
              <input type="text" name="IIPUC_Percentage" value={formData.IIPUC_Percentage} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="e.g. 92%" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="example@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input type="tel" name="number" value={formData.number} onChange={handleChange} required pattern="^[0-9]{10}$" title="Must be a valid 10-digit phone number" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="10-digit mobile number" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Set The Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="Secure password" />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-blue-700 disabled:opacity-70 text-white font-bold py-4 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex justify-center items-center h-14">
            {loading ? <FaSpinner className="animate-spin text-2xl" /> : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
}
