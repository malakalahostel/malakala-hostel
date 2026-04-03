import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import About from '../components/About';
import Facilities from '../components/Facilities';
import Events from '../components/Events';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Malkala Hostel | Best Student Boarding in Bengaluru</title>
        <meta name="description" content="Serving the Bengaluru student community since 1956 with premium facilities, strict discipline, and quality boarding education." />
      </Helmet>
      <Hero />
      <About />
      <Facilities />
      <Events />
      <Contact />
    </>
  );
}
