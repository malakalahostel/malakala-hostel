import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8" data-aos="fade-right">
            <h3 className="text-2xl font-bold text-gray-800">Get in Touch</h3>
            <p className="text-gray-600">We are here to help and answer any questions you might have. We look forward to hearing from you.</p>
            
            <div className="space-y-6 mt-8">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-50 p-3 rounded-full text-primary">
                  <FaPhoneAlt size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Phone</h4>
                  <p className="text-gray-600">Secretary Vishnu S O: +91 8217495728</p>
                  <p className="text-gray-600">Cashier Raveesh Kalyani: +91 8431457138</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-50 p-3 rounded-full text-primary">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Email</h4>
                  <p className="text-gray-600"><a href="mailto:malkalahostel1956@gmail.com" className="hover:text-primary transition-colors">malkalahostel1956@gmail.com</a></p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-50 p-3 rounded-full text-primary">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Address</h4>
                  <p className="text-gray-600">#2, 3rd cross, Gavipuram extension,<br/>Basavangudi, Bengaluru-560019</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="h-[400px] bg-gray-200 rounded-2xl overflow-hidden shadow-lg border border-gray-100 placeholder-map" data-aos="fade-left">
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
