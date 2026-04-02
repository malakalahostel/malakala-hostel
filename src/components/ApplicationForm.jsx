import React, { useState } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    applicant_name: '',
    guardian_name: '',
    dob: '',
    blood_group: '',
    gothram: '',
    annual_income: '',
    expected_college: '',
    course_intended: '',
    academic_history: [
      { year: '', institution: '', course: '', marks: '' },
      { year: '', institution: '', course: '', marks: '' },
      { year: '', institution: '', course: '', marks: '' }
    ],
    hobbies: '',
    achievements: '',
    address: '',
    email: '',
    phone_number: '',
    password: '',
    receives_help: false,
    help_details: '',
    has_scholarship: false,
    scholarship_details: '',
    old_border: false,
    old_border_details: '',
    relative_in_hostel: false,
    relative_details: '',
    applied_other_hostel: false,
    other_hostel_details: '',
    contagious_disease: false,
    disease_details: '',
    agreed_to_terms: false
  });
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const VITE_API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:5000');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'radio') {
      setFormData({ ...formData, [name]: value === 'true' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAcademicChange = (index, field, value) => {
    const newHistory = [...formData.academic_history];
    newHistory[index][field] = value;
    setFormData({ ...formData, academic_history: newHistory });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreed_to_terms) {
      setError('You must agree to the Terms & Conditions before submitting.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await axios.post(`${VITE_API_URL}/api/applications`, formData);
      if (res.data.success) {
        setSubmitted(true);
      }
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
          <p className="text-gray-600 mb-8">Thank you, {formData.applicant_name}. We have received your hostel application.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-5xl py-8" data-aos="fade-up">
      <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-12 shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Official Hostel Application</h2>
          <p className="text-gray-600 mb-8">Please fill out the following comprehensive details carefully.</p>
          
          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6 text-left max-w-3xl mx-auto shadow-sm">
            <h3 className="text-lg font-bold text-primary mb-3 flex items-center">
              <span className="bg-blue-100 text-blue-600 p-1.5 rounded mr-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </span>
              Eligibility Criteria
            </h3>
            <ul className="list-disc pl-11 space-y-2 text-sm text-gray-700">
              <li>Admission is strictly provided only to students above the 2nd PUC academic level.</li>
              <li>Priority admission is granted to economically weaker students who have secured a high academic percentage.</li>
              <li>Eligible applicants must be pursuing a degree from Bangalore University, or other recognized deemed universities, located specifically within Bangalore City limits.</li>
            </ul>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* SECTION 1: Personal Details */}
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <h3 className="text-xl font-semibold mb-6 border-b pb-2 text-primary">1. Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Applicant Full Name</label>
                <input type="text" name="applicant_name" value={formData.applicant_name} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Father/Guardian Name</label>
                <input type="text" name="guardian_name" value={formData.guardian_name} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                <input type="text" name="blood_group" value={formData.blood_group} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="e.g. O+" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gothram</label>
                <input type="text" name="gothram" value={formData.gothram} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Annual Family Income</label>
                <input type="text" name="annual_income" value={formData.annual_income} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="e.g. 5,00,000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Residential Address</label>
                <textarea name="address" value={formData.address} onChange={handleChange} required rows="2" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"></textarea>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} required pattern="^[0-9]{10}$" title="Must be a valid 10-digit phone number" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email ID</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
              </div>
            </div>
          </div>

          {/* SECTION 2: Academic Details */}
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <h3 className="text-xl font-semibold mb-6 border-b pb-2 text-primary">2. Academic Information</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expected College</label>
                <input type="text" name="expected_college" value={formData.expected_college} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Intended to Join</label>
                <input type="text" name="course_intended" value={formData.course_intended} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
              </div>
            </div>

            <label className="block text-sm font-medium text-gray-700 mb-4">Academic Details of Past 3 Years</label>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2 w-12 text-center">Sl No</th>
                    <th className="border border-gray-300 p-2">Year</th>
                    <th className="border border-gray-300 p-2">Institution</th>
                    <th className="border border-gray-300 p-2">Course</th>
                    <th className="border border-gray-300 p-2">% of Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {[0, 1, 2].map((idx) => (
                    <tr key={idx}>
                      <td className="border border-gray-300 p-2 text-center bg-gray-50">{idx + 1}</td>
                      <td className="border border-gray-300 p-0"><input type="text" className="w-full p-2 outline-none" value={formData.academic_history[idx].year} onChange={(e) => handleAcademicChange(idx, 'year', e.target.value)} /></td>
                      <td className="border border-gray-300 p-0"><input type="text" className="w-full p-2 outline-none" value={formData.academic_history[idx].institution} onChange={(e) => handleAcademicChange(idx, 'institution', e.target.value)} /></td>
                      <td className="border border-gray-300 p-0"><input type="text" className="w-full p-2 outline-none" value={formData.academic_history[idx].course} onChange={(e) => handleAcademicChange(idx, 'course', e.target.value)} /></td>
                      <td className="border border-gray-300 p-0"><input type="text" className="w-full p-2 outline-none" value={formData.academic_history[idx].marks} onChange={(e) => handleAcademicChange(idx, 'marks', e.target.value)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hobbies</label>
                <textarea name="hobbies" value={formData.hobbies} onChange={handleChange} rows="2" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Achievements</label>
                <textarea name="achievements" value={formData.achievements} onChange={handleChange} rows="2" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"></textarea>
              </div>
            </div>
          </div>

          {/* SECTION 3: Additional Questionnaire */}
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <h3 className="text-xl font-semibold mb-6 border-b pb-2 text-primary">3. Additional Details</h3>
            
            <div className="space-y-6">
              {/* Q1 */}
              <div>
                <label className="block font-medium text-gray-800 mb-2">Does applicant receive any help from any other source?</label>
                <div className="flex gap-4 mb-2">
                  <label className="flex items-center"><input type="radio" name="receives_help" value="true" checked={formData.receives_help === true} onChange={handleChange} className="mr-2" /> Yes</label>
                  <label className="flex items-center"><input type="radio" name="receives_help" value="false" checked={formData.receives_help === false} onChange={handleChange} className="mr-2" /> No</label>
                </div>
                {formData.receives_help && <input type="text" name="help_details" value={formData.help_details} onChange={handleChange} placeholder="Please provide details..." className="w-full px-4 py-2 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none" />}
              </div>

              {/* Q2 */}
              <div>
                <label className="block font-medium text-gray-800 mb-2">Has applicant been held any fee concession or scholarship?</label>
                <div className="flex gap-4 mb-2">
                  <label className="flex items-center"><input type="radio" name="has_scholarship" value="true" checked={formData.has_scholarship === true} onChange={handleChange} className="mr-2" /> Yes</label>
                  <label className="flex items-center"><input type="radio" name="has_scholarship" value="false" checked={formData.has_scholarship === false} onChange={handleChange} className="mr-2" /> No</label>
                </div>
                {formData.has_scholarship && <input type="text" name="scholarship_details" value={formData.scholarship_details} onChange={handleChange} placeholder="Please provide details..." className="w-full px-4 py-2 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none" />}
              </div>

              {/* Q3 */}
              <div>
                <label className="block font-medium text-gray-800 mb-2">Was applicant old border of this hostel?</label>
                <div className="flex gap-4 mb-2">
                  <label className="flex items-center"><input type="radio" name="old_border" value="true" checked={formData.old_border === true} onChange={handleChange} className="mr-2" /> Yes</label>
                  <label className="flex items-center"><input type="radio" name="old_border" value="false" checked={formData.old_border === false} onChange={handleChange} className="mr-2" /> No</label>
                </div>
                {formData.old_border && <input type="text" name="old_border_details" value={formData.old_border_details} onChange={handleChange} placeholder="If yes, which years?" className="w-full px-4 py-2 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none" />}
              </div>

              {/* Q4 */}
              <div>
                <label className="block font-medium text-gray-800 mb-2">Is anyone of the closest relatives given seat in this hostel?</label>
                <div className="flex gap-4 mb-2">
                  <label className="flex items-center"><input type="radio" name="relative_in_hostel" value="true" checked={formData.relative_in_hostel === true} onChange={handleChange} className="mr-2" /> Yes</label>
                  <label className="flex items-center"><input type="radio" name="relative_in_hostel" value="false" checked={formData.relative_in_hostel === false} onChange={handleChange} className="mr-2" /> No</label>
                </div>
                {formData.relative_in_hostel && <input type="text" name="relative_details" value={formData.relative_details} onChange={handleChange} placeholder="Please provide relation details..." className="w-full px-4 py-2 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none" />}
              </div>

              {/* Q5 */}
              <div>
                <label className="block font-medium text-gray-800 mb-2">Has applicant applied to any other hostel in Bangalore?</label>
                <div className="flex gap-4 mb-2">
                  <label className="flex items-center"><input type="radio" name="applied_other_hostel" value="true" checked={formData.applied_other_hostel === true} onChange={handleChange} className="mr-2" /> Yes</label>
                  <label className="flex items-center"><input type="radio" name="applied_other_hostel" value="false" checked={formData.applied_other_hostel === false} onChange={handleChange} className="mr-2" /> No</label>
                </div>
                {formData.applied_other_hostel && <input type="text" name="other_hostel_details" value={formData.other_hostel_details} onChange={handleChange} placeholder="Please name the hostel..." className="w-full px-4 py-2 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none" />}
              </div>

              {/* Q6 */}
              <div>
                <label className="block font-medium text-gray-800 mb-2">Whether applicant has suffered from any contagious diseases?</label>
                <div className="flex gap-4 mb-2">
                  <label className="flex items-center"><input type="radio" name="contagious_disease" value="true" checked={formData.contagious_disease === true} onChange={handleChange} className="mr-2" /> Yes</label>
                  <label className="flex items-center"><input type="radio" name="contagious_disease" value="false" checked={formData.contagious_disease === false} onChange={handleChange} className="mr-2" /> No</label>
                </div>
                {formData.contagious_disease && <input type="text" name="disease_details" value={formData.disease_details} onChange={handleChange} placeholder="Please state details..." className="w-full px-4 py-2 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none" />}
              </div>
            </div>
          </div>

          {/* SECTION 4: Terms & Conditions */}
          <div className="bg-white border-2 border-primary/20 p-6 md:p-8 rounded-2xl shadow-inner">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Declaration</h3>
            <p className="font-semibold text-gray-800 mb-4">To M. S. S. V. Dharmasamsthe, Bengaluru-560019. Sir,</p>
            <p className="text-gray-700 mb-4">Father/Guardian of the applicant and the applicant request you to allot a:</p>
            <ol className="list-decimal pl-6 space-y-3 text-gray-700 text-sm mb-6">
              <li>Seat to the applicant in your Hostel for this academic year.</li>
              <li>We assure you that the applicant will abide by all the rules and regulations of the Hostel that are in force or that may come into force.</li>
              <li>We hear by solemnly declare that the information furnished by us in the application is true to the best of our knowledge and information.</li>
              <li>We know that if any information is furnished by us in the application is found to be untrue, I am prepared to indemnify MSSV Dharmasamsthe, and I shall reimburse all the amounts spent on applicant together with interest there on @21% per annum, also pay damages determined by the trustees and the trustees will be entitled to recover the same either jointly or severally from us.</li>
              <li>I also know that the applicant will be dismissed by you for the breach of faith and to the Rules and Regulations of the Hostel.</li>
            </ol>
            
            <div className="flex items-start bg-blue-50 p-4 rounded-xl border border-blue-100">
              <input type="checkbox" name="agreed_to_terms" checked={formData.agreed_to_terms} onChange={handleChange} required id="terms" className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary mt-0.5" />
              <label htmlFor="terms" className="ml-3 text-sm font-medium text-gray-800">
                I acknowledge and agree to all the terms and conditions outlined above. I confirm all provided information is accurate.
              </label>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">Create Application Password (Required for later access)</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-blue-700 disabled:opacity-70 text-white font-bold py-4 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex justify-center items-center h-14 text-lg">
            {loading ? <FaSpinner className="animate-spin text-2xl" /> : 'Submit Final Application'}
          </button>
        </form>
      </div>
    </div>
  );
}
