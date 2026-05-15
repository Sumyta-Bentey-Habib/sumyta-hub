'use client';
import React, { useRef, useEffect } from 'react';

const Skills = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const skills = [
    { num: '01', title: 'Frontend Architecture', desc: 'Building hyper-responsive interfaces with React, Next.js, and complex GSAP animations. Pixel-perfect execution and avant-garde visuals.', span: 'md:col-span-2 md:row-span-2', high: true },
    { num: '02', title: 'API Engineering', desc: 'Securing data flow with Express, Node.js, and robust JWT integration.', span: 'md:col-span-1', high: false },
    { num: '03', title: 'Database Strategy', desc: 'Optimizing NoSQL schemas with MongoDB for lightning speed and massive scale.', span: 'md:col-span-1', high: false },
    { num: '04', title: 'UI Interaction & Design', desc: 'Designing high-end brutalist experiences that defy norms. Seamless integration of glassmorphism and minimal aesthetics.', span: 'md:col-span-3', high: true },
  ];

  return (
    <section className="py-40 bg-[#050505] overflow-hidden border-t border-white/5 relative" id="skills">
      <div className="px-6 md:px-12 mb-20 relative z-20">
        <h2 className="text-sm font-headline font-bold text-primary tracking-[0.4em] uppercase mb-4 drop-shadow-[0_0_10px_rgba(255,90,120,0.8)]">01. Skill Set</h2>
        <h3 className="text-4xl md:text-6xl lg:text-7xl font-headline font-black uppercase tracking-tighter text-white">My Core Expertise</h3>
      </div>
      
      <div className="relative">
        {/* Background Marquee */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full overflow-hidden select-none pointer-events-none opacity-10 z-0">
          <div className="flex flex-nowrap shrink-0 gap-12 text-[14rem] md:text-[20rem] font-headline font-black uppercase text-white animate-marquee">
            <span className="whitespace-nowrap">MERN STACK • NEXT.JS • FIREBASE • SOCKET.IO •</span>
            <span className="whitespace-nowrap">MERN STACK • NEXT.JS • FIREBASE • SOCKET.IO •</span>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="relative z-10 px-6 md:px-12 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`p-10 md:p-14 rounded-3xl ${skill.span} ${
                skill.high ? 'bg-white/[0.03]' : 'bg-white/[0.01]'
              } border border-white/[0.05] hover:border-white/[0.15] transition-colors duration-500 group relative overflow-hidden backdrop-blur-xl shadow-2xl`}
            >
              {/* Spotlight overlay */}
              <div 
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                style={{
                  background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%)'
                }}
              ></div>
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-12 border border-primary/20 text-primary font-bold font-mono text-xl shadow-[0_0_15px_rgba(255,90,120,0.2)]">
                  {skill.num}
                </div>
                <div>
                  <h4 className="text-3xl lg:text-4xl font-headline font-bold mb-6 uppercase tracking-tight group-hover:text-primary transition-colors duration-500 text-white">
                    {skill.title}
                  </h4>
                  <p className="text-secondary/70 font-body text-lg leading-relaxed group-hover:text-secondary transition-colors duration-500">
                    {skill.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
