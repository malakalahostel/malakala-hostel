import React from 'react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Us</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <img 
              src="/images/hos img.jpeg" 
              alt="Hostel Building" 
              className="rounded-2xl shadow-2xl object-cover w-full h-[400px]"
            />
          </div>
          
          <div data-aos="fade-left" className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800">Our Heritage</h3>
            <p className="text-gray-600 leading-relaxed">
              Malakala Hostel is proudly founded and  Managed by  by the 'Malakala Shivaramaiah Setty Venkatamma Dharmasamsthe'. Since 1956 (Now and earlier)We are dedicated to providing a supportive, secure, and nurturing environment for students pursuing their academic dreams.
            </p>
          </div>
        </div>

        {/* Donors & Trustees Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8" data-aos="fade-up">
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
            <h4 className="font-bold text-primary mb-4 text-center text-lg border-b pb-2">Donors</h4>
            <ul className="text-sm text-gray-700 space-y-2 text-center">
              <li>Sri Malakala Shivaramaiah Setty</li>
              <li>Smt.Venkatamma</li>
              <li>Sri Malakala Ramachandra Setty</li>
              <li>Sri Malakala Ayodhyaramaiah Setty</li>
              <li>Sri Malakala Dasaratharama Setty</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
            <h4 className="font-bold text-primary mb-4 text-center text-lg border-b pb-2">Past Trustees</h4>
            <ul className="text-sm text-gray-700 space-y-2 text-center">
              <li>Sri M.R Anandarama Setty</li>
              <li>Sri M.A Premkumar</li>
              <li>Sri Hema Chandrashekaraiah Setty</li>
              <li>Sri C.P Subbaraju Setty</li>
              <li>Sri Malakala Shankaranaryana Setty</li>
              <li>Sri Malakala Ramlakshman</li>
              <li>Sri Malakala Kashiviswanath Setty</li>
              <li>Sri Malakala Jayaram</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
            <h4 className="font-bold text-primary mb-4 text-center text-lg border-b pb-2">Trustees</h4>
            <ul className="text-sm text-gray-700 space-y-2 text-center">
              <li>Sri M.A Jayaprakash</li>
              <li>Sri M.S Sathyanarayana Setty</li>
              <li>Sri M.K Prasad</li>
              <li>Sri M.R Prabhuram</li>
              <li>Sri M.P Shivram Kumar</li>
              <li>Sri P.S Venkatesh babu</li>
              <li>Sri M J Ramachandra Murthy</li>
              <li>Sri M S Kumar</li>
              <li>Sri P V Darshan</li>
              <li>Sri M P Rahul</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
