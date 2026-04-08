import React from 'react';

const Skills = () => {
  const skills = [
    { num: '01', title: 'Frontend Architecture', desc: 'Building hyper-responsive interfaces with React and GSAP.', high: false },
    { num: '02', title: 'API Engineering', desc: 'Securing data flow with Express, Node.js, and JWT integration.', high: true },
    { num: '03', title: 'Database Strategy', desc: 'Optimizing NoSQL schemas with MongoDB for lightning speed.', high: false },
    { num: '04', title: 'UI Interaction', desc: 'Designing high-end brutalist experiences that defy norms.', high: true },
  ];

  return (
    <section className="py-40 bg-surface-container-lowest overflow-hidden border-t border-white/5" id="skills">
      <div className="px-6 md:px-12 mb-20 animate-fade-in">
        <h2 className="text-sm font-headline font-bold text-primary tracking-[0.4em] uppercase mb-4">01. Skill Set</h2>
        <h3 className="text-4xl md:text-6xl font-headline font-black uppercase tracking-tighter">My Core Expertise</h3>
      </div>
      
      <div className="flex flex-col gap-24">
        {/* Marquee */}
        <div className="flex overflow-hidden select-none gap-12 group cursor-pointer hover:bg-white/5 transition-colors duration-700 py-12">
          <div className="flex flex-nowrap shrink-0 items-center gap-12 text-6xl sm:text-7xl md:text-9xl lg:text-[14rem] font-headline font-black uppercase text-bleed text-white/5 group-hover:text-primary transition-colors duration-500 animate-marquee [text-shadow:_0_0_1px_rgba(255,255,255,0.3)]">
            <span>MERN STACK</span>
            <span>NEXT.JS</span>
            <span>FIREBASE</span>
            <span>SOCKET.IO</span>
            <span>JWT</span>
            <span>DAISYUI</span>
            <span>VITE</span>
          </div>
          <div className="flex flex-nowrap shrink-0 items-center gap-12 text-6xl sm:text-7xl md:text-9xl lg:text-[14rem] font-headline font-black uppercase text-bleed text-white/5 group-hover:text-primary transition-colors duration-500 animate-marquee [text-shadow:_0_0_1px_rgba(255,255,255,0.3)]">
            <span>MERN STACK</span>
            <span>NEXT.JS</span>
            <span>FIREBASE</span>
            <span>SOCKET.IO</span>
            <span>JWT</span>
            <span>DAISYUI</span>
            <span>VITE</span>
          </div>
        </div>

        {/* Brutalist Grid */}
        <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-1">
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`p-12 ${
                skill.high ? 'bg-surface-container-high' : 'bg-surface-container'
              } hover:bg-primary-dim transition-all duration-500 group relative overflow-hidden cursor-crosshair`}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <span className="text-sm font-bold text-primary group-hover:text-on-primary-fixed mb-8 block font-headline">
                {skill.num}
              </span>
              <h4 className="text-3xl font-headline font-bold mb-4 group-hover:text-on-primary-fixed uppercase tracking-tight transform group-hover:translate-x-2 transition-transform duration-500">
                {skill.title}
              </h4>
              <p className="text-secondary group-hover:text-on-primary-fixed/80 font-body transition-colors duration-500">
                {skill.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
