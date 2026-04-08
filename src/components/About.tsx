import React from 'react';

const About = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-surface-container-low" id="about">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        <div className="md:col-span-4 sticky top-32">
          <h2 className="text-sm font-headline font-bold text-primary tracking-[0.4em] uppercase mb-8">
            01. Perspective
          </h2>
          <div className="aspect-[3/4] bg-surface-container flex items-center justify-center p-8 border border-white/5">
            <span className="text-8xl font-headline font-black text-outline/10 select-none">SBH</span>
          </div>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <h3 className="text-4xl md:text-7xl font-headline font-bold leading-tight mb-12">
            I build digital monoliths that command attention through{' '}
            <span className="text-primary italic">raw performance</span> and avant-garde aesthetics.
          </h3>
          <div className="space-y-8 text-secondary/80 text-lg leading-relaxed max-w-2xl font-body">
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
