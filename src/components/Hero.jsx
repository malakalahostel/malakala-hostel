import React from 'react';

export default function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/mal1.jpg"
          alt="Malkala Hostel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center p-8 md:p-12 max-w-4xl mx-auto glass rounded-3xl animate-float" data-aos="fade-up">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Welcome to <br className="md:hidden" />
          <span className="text-secondary font-extrabold uppercase tracking-wider drop-shadow-md">Malkala Hostel</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
          A home away from home. Fostering education, discipline, and community founded by Malkala Shivaramaiah Setty Venkatamma Dharmasamsthe.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="/apply" className="bg-primary hover:bg-secondary hover:text-gray-900 text-white font-bold px-8 py-3 rounded-full transition-all duration-300 shadow-xl hover-glow">
            Apply Now
          </a>
          <a href="#contact" className="bg-transparent border-2 border-secondary text-secondary hover:bg-secondary hover:text-gray-900 font-bold px-8 py-3 rounded-full transition-all duration-300 shadow-xl hover-glow">
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
