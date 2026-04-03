import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          
          <div>
            <h2 className="text-2xl font-bold mb-4 text-primary">Malkala Hostel</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Serving the community since 1956. Fostering education, discipline, and community through our well-equipped hostel facilities.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-3 mt-4">
              <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#facilities" className="text-gray-400 hover:text-white transition-colors">Facilities</a></li>
              <li><a href="#events" className="text-gray-400 hover:text-white transition-colors">Events</a></li>
              <li><a href="https://forms.infinityfreeapp.com/print.html" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noreferrer">Acknowledgement</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Malkala Hostel by Malkala Shivaramaiah Setty Venkatamma Dharmasamsthe. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
