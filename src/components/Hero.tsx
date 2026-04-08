'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {
  const bgRef = useRef<HTMLImageElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Background Image Scaling
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        scale: 1.15,
        duration: 30,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    // Aura Pulsation
    if (auraRef.current) {
      gsap.to(auraRef.current, {
        scale: 1.2,
        opacity: 0.8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }

    // Mouse Tracking Parallax
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 40;
      const yPos = (clientY / window.innerHeight - 0.5) * 40;

      gsap.to(auraRef.current, {
        x: xPos * 1.5,
        y: yPos * 1.5,
        duration: 1,
        ease: 'power2.out',
      });

      gsap.to(bgRef.current, {
        x: -xPos * 0.5,
        y: -yPos * 0.5,
        duration: 1.5,
        ease: 'power2.out',
      });

      if (nameRef.current) {
        gsap.to(nameRef.current, {
          x: xPos * 0.3,
          y: yPos * 0.3,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-surface-container-lowest">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dim/20 to-transparent mix-blend-overlay"></div>
        <img
          ref={bgRef}
          className="w-full h-full object-cover"
          alt="abstract dark 3d geometric shapes with vibrant red glowing accents"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOpnc0tRezqAG7S_6rx8UQF7GjaYvKEQWe5ATFcw5N66s1FM3pv64FJ1aO2GdgFis4TrBY3Jn-vi5xHytu-TysKrDojZtaJW1vn1_5NzECpK_8O5TBBc9V2Ygk0WY_ZeenGwElAldsdUDkzhd6_QbiWFsu7dp_GbU1RMfjOHC_-ujnoUWnXa0HRdI5ZSJmbQY_5wgrafiLp67RDXPxdu4WJhqrELRtOJZRT84of0kxfYcZdp6bHaKv2XJMluDeuV_v8T34gfPqS2c"
        />
      </div>

      {/* Radiant Aura / Spotlight */}
      <div
        ref={auraRef}
        className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen z-1 blur-[180px]"
        style={{ transform: 'translate(-50%, -50%)' }}
      ></div>

      <div className="relative z-10 w-full px-6 md:px-12 mt-20">
        <h1 
          ref={nameRef}
          className="text-5xl sm:text-6xl md:text-8xl lg:text-[12rem] font-headline font-black tracking-tighter leading-[0.85] text-white mix-blend-difference"
        >
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
