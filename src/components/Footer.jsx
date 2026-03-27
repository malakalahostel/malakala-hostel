import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          
          <div>
            <h2 className="text-2xl font-bold mb-4 text-primary">Malakala Hostel</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Serving the community since 1956. Fostering education, discipline, and community through our well-equipped hostel facilities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <FaFacebookF />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <FaTwitter />
              </a>
            </div>
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

          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2 inline-block">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates and events.</p>
            <form className="flex rounded-lg overflow-hidden" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-2 bg-gray-800 text-white focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button 
                type="submit" 
                className="bg-primary hover:bg-blue-700 px-6 font-semibold transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Malakala Hostel by Malakala Shivaramaiah Shetty Venkatamma Charities. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
