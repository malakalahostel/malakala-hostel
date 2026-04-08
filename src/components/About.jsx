import React from 'react';

export default function About() {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4 drop-shadow-md">About Us</h2>
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
            <h3 className="text-2xl font-semibold text-secondary">Our Heritage</h3>
            <p className="text-gray-300 leading-relaxed">
              Malkala Hostel is proudly founded and  Managed by  the family members of  Malkala Shivaramaiah Setty Venkatamma . Since 1956 We are dedicated to providing a supportive, secure, and nurturing environment for students pursuing their academic dreams.
            </p>
          </div>
        </div>

        {/* Founders Section */}
        <div className="mt-16 max-w-4xl mx-auto rounded-3xl overflow-hidden glass-red hover-glow transition-all" data-aos="zoom-in">
          <div className="md:flex">
            <div className="md:shrink-0 flex items-center justify-center p-6 md:w-2/5">
              <img
                src="/images/malkala%20founders.png"
                alt="Our Founders - Sri Malkala Shivaramaiah Setty and Smt. Venkatamma"
                className="w-full h-auto max-h-72 object-contain drop-shadow-md rounded-lg"
              />
            </div>
            <div className="p-8 md:w-3/5 flex flex-col justify-center">
              <div className="uppercase tracking-wide text-sm text-secondary font-bold mb-1">Visionaries</div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Honorable Founders</h3>
              <p className="text-gray-300 leading-relaxed">
                <strong>Sri Malkala Shivaramaiah Setty</strong> and <strong>Smt. Venkatamma</strong> established the Dharmasamsthe with a noble vision of supporting education and uplifting students. Their enduring legacy and philanthropic spirit continue to serve as the guiding light for our institution benefiting generations of scholars since 1956.
              </p>
            </div>
          </div>
        </div>

        {/* Donors & Trustees Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8" data-aos="fade-up">
          <div className="glass p-6 rounded-xl hover-glow transition-all">
            <h4 className="font-bold text-secondary mb-4 text-center text-lg border-b border-gray-700 pb-2">Founders</h4>
            <ul className="text-sm text-gray-300 space-y-2 text-center">
              <li>Sri Malkala Shivaramaiah Setty</li>
              <li>Smt.Venkatamma</li>
            </ul>
          </div>

          <div className="glass p-6 rounded-xl hover-glow transition-all">
            <h4 className="font-bold text-secondary mb-4 text-center text-lg border-b border-gray-700 pb-2">Past Trustees</h4>
            <ul className="text-sm text-gray-300 space-y-2 text-center">
              <li>Sri M.R Anandarama Setty</li>
              <li>Sri M.A Premkumar</li>
              <li>Sri Hema Chandrashekaraiah Setty</li>
              <li>Sri C.P Subbaraju Setty</li>
              <li>Sri Malkala Shankaranaryana Setty</li>
              <li>Sri Malkala Ramlakshman</li>
              <li>Sri Malkala Kashiviswanath Setty</li>
              <li>Sri Malkala Jayaram</li>
              <li>Sri Malkala Ramachandra Setty</li>
              <li>Sri Malkala Ayodhyaramaiah Setty</li>
              <li>Sri Malkala Dasaratharama Setty</li>
            </ul>
          </div>

          <div className="glass p-6 rounded-xl hover-glow transition-all">
            <h4 className="font-bold text-secondary mb-4 text-center text-lg border-b border-gray-700 pb-2">Present Trustees</h4>
            <ul className="text-sm text-gray-300 space-y-2 text-center">
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
