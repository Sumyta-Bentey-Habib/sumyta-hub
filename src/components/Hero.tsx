'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {
  const bgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        scale: 1.1,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-surface-container-lowest">
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dim/20 to-transparent mix-blend-overlay"></div>
        <img
          ref={bgRef}
          className="w-full h-full object-cover"
          alt="abstract dark 3d geometric shapes with vibrant red glowing accents and sharp shadows in a minimalist digital void"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOpnc0tRezqAG7S_6rx8UQF7GjaYvKEQWe5ATFcw5N66s1FM3pv64FJ1aO2GdgFis4TrBY3Jn-vi5xHytu-TysKrDojZtaJW1vn1_5NzECpK_8O5TBBc9V2Ygk0WY_ZeenGwElAldsdUDkzhd6_QbiWFsu7dp_GbU1RMfjOHC_-ujnoUWnXa0HRdI5ZSJmbQY_5wgrafiLp67RDXPxdu4WJhqrELRtOJZRT84of0kxfYcZdp6bHaKv2XJMluDeuV_v8T34gfPqS2c"
        />
      </div>
      <div className="relative z-10 w-full px-6 md:px-12 mt-20">
        <h1 className="text-6xl md:text-[12rem] font-headline font-black tracking-tighter leading-[0.85] text-white mix-blend-difference">
          SUMYTA<br />
          BENTEY<br />
          <span className="text-primary">HABIB</span>
        </h1>
        <div className="mt-12 md:mt-24 flex flex-col md:flex-row items-end justify-between gap-8">
          <p className="max-w-md text-xl md:text-2xl font-light text-secondary uppercase tracking-tight font-body">
            Junior Web Developer pushing the boundaries of the MERN ecosystem with surgical precision.
          </p>
          <div className="flex items-center gap-4 text-primary animate-pulse">
            <span className="font-headline font-bold tracking-widest text-sm">SCROLL FOR IMPACT</span>
            <span className="material-symbols-outlined">arrow_downward</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
