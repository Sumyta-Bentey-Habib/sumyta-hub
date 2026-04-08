'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <main className={`min-h-screen bg-black text-white overflow-x-hidden selection:bg-primary selection:text-on-primary-fixed ${loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}`}>
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Footer />
      </main>
    </>
  );
}
