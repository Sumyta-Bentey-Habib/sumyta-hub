'use client';

import React, { useState } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-primary selection:text-on-primary-fixed">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Footer />
      </div>
    </>
  );
}
