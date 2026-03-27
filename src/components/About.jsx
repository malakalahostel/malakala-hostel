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
              Malakala Hostel is proudly founded and supported by the <strong>'Malakala Shivaramaiah Shetty Venkatamma Charities'</strong>. We are dedicated to providing a supportive, secure, and nurturing environment for students pursuing their academic dreams.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="font-bold text-primary mb-3">Key Donors</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Sri Malakala Shivaramaiah Shetty</li>
                  <li>Smt. Venkatamma</li>
                  <li>Sri Malakala Ramachandra Setty</li>
                  <li>Sri Malakala Ayodhyaramaiah Setty</li>
                  <li>Sri Malakala Dasaratharama Setty</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="font-bold text-primary mb-3">Current Trustees</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Sri M.A Jayaprakash</li>
                  <li>Sri M.S Sathyanarayana Shetty</li>
                  <li>Sri M.K Prasad</li>
                  <li>Sri J. Ramachandra Murthy</li>
                  <li>And 6 other esteemed members</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
