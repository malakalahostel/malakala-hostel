import React, { useState, useEffect } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaSpinner } from 'react-icons/fa';
import axios from 'axios';

export default function Contact() {
  const [settings, setSettings] = useState({
    secretary_name: 'Vishnu S O',
    secretary_phone: '+91 8217495728',
    cashier_name: 'Raveesh Kalyani',
    cashier_phone: '+91 8431457138'
  });

  const VITE_API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:5000');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(`${VITE_API_URL}/api/settings`);
        if (res.data && res.data.secretary_name) {
          setSettings(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch settings", err);
      }
    };
    fetchSettings();
  }, [VITE_API_URL]);

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4 drop-shadow-md">Contact Us</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8" data-aos="fade-right">
            <h3 className="text-2xl font-bold text-white">Get in Touch</h3>
            <p className="text-gray-300">We are here to help and answer any questions you might have. We look forward to hearing from you.</p>
            
            <div className="space-y-6 mt-8">
              <div className="flex items-start space-x-4">
                <div className="glass p-3 rounded-full text-secondary">
                  <FaPhoneAlt size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-secondary">Phone</h4>
                  <p className="text-gray-300">Secretary {settings.secretary_name}: {settings.secretary_phone}</p>
                  <p className="text-gray-300">Cashier {settings.cashier_name}: {settings.cashier_phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="glass p-3 rounded-full text-secondary">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-secondary">Email</h4>
                  <p className="text-gray-300"><a href="mailto:malkalahostel1956@gmail.com" className="hover:text-primary transition-colors">malkalahostel1956@gmail.com</a></p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="glass p-3 rounded-full text-secondary">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-secondary">Address</h4>
                  <p className="text-gray-300">#2, 3rd cross, Gavipuram extension,<br/>Basavangudi, Bengaluru-560019</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="h-[400px] glass rounded-2xl overflow-hidden shadow-lg border border-gray-800 placeholder-map hover-glow" data-aos="fade-left">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.384666065538!2d77.56708781482811!3d12.947231490870933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15edf5aab6ab%3A0xe54d9229fcaad7d!2sGavipuram%20Extention%2C%20Kempegowda%20Nagar%2C%20Bengaluru%2C%20Karnataka%20560019!5e0!3m2!1sen!2sin!4v1683238914104!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Malkala Hostel Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
