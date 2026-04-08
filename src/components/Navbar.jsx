import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'About', href: '/#about' },
    { name: 'Facilities', href: '/#facilities' },
    { name: 'Events', href: '/#events' },
    { name: 'Application', href: '/apply' },
    { name: 'Contact', href: '/#contact' },
    { name: 'Login', href: '/login' },
  ];

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'glass-header py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="/#home" className={`text-2xl font-bold transition-colors ${scrolled ? 'text-secondary' : 'text-white'}`}>
          Malkala Hostel
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className={`font-medium transition-colors hover:text-secondary ${scrolled ? 'text-gray-200' : 'text-gray-200'}`}>
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes className={scrolled ? 'text-white' : 'text-white'} /> : <FaBars className={scrolled ? 'text-white' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-gray-800 absolute w-full left-0 top-full pt-2 pb-6 px-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-gray-200 hover:text-secondary font-medium border-b border-gray-700 pb-2">
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
