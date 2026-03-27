import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Facilities from '../components/Facilities';
import Events from '../components/Events';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Facilities />
      <Events />
      <Contact />
    </>
  );
}
