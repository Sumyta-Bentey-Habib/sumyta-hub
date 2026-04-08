import React from 'react';

const About = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-surface-container-low overflow-hidden" id="about">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        <div className="md:col-span-4 lg:col-span-4 sticky top-32">
          <h2 className="text-sm font-headline font-bold text-primary tracking-[0.4em] uppercase mb-8">
            01. Perspective
          </h2>
          <div className="aspect-[3/4] bg-surface-container relative overflow-hidden border border-white/10 group">
            <img 
              src="/images/user_portrait.png" 
              alt="Sumyta Bentey Habib" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-700"></div>
            <div className="absolute inset-0 border-2 border-primary/20 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700 pointer-events-none"></div>
          </div>
        </div>
        <div className="md:col-span-8 md:col-start-5 lg:col-span-7 lg:col-start-6">
          <h3 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold leading-tight mb-12">
            I build digital monoliths that command attention through{' '}
            <span className="text-primary italic">raw performance</span> and avant-garde aesthetics.
          </h3>
          <div className="space-y-8 text-secondary/80 text-lg md:text-xl leading-relaxed max-w-2xl font-body">
            <p>
              Architecture matters. Whether it's the sleek efficiency of a React component or the robust infrastructure
              of a Node backend, I approach every line of code as a piece of digital engineering.
            </p>
            <p>
              My philosophy is rooted in minimalism: removing the noise until only the impact remains. No borders, no
              clutter—just pure experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
