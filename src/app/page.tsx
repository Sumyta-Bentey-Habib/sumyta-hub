'use client';

import React, { useState } from 'react';
import Hero from '../components/hero';
import About from '../components/about';
import Experience from '../components/experience';
import SelectedWork from '../components/selected-work';
import Projects from '../components/projects';
import Skills from '../components/skills';
import Footer from '../components/footer';
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
        <SelectedWork />
        <Projects />
        <Skills />
        <Footer />
      </div>
    </>
  );
}
