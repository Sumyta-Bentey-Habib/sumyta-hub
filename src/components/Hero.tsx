'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {
  const bgRef = useRef<HTMLImageElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const nameLine1Ref = useRef<HTMLDivElement>(null);
  const nameLine2Ref = useRef<HTMLDivElement>(null);
  const nameLine3Ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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
      
      const lines = [nameLine1Ref.current, nameLine2Ref.current, nameLine3Ref.current];
      lines.forEach((line, index) => {
        if (line) {
           gsap.to(line, {
            x: xPos * (0.3 - index * 0.05),
            y: yPos * (0.3 - index * 0.05),
            duration: 0.8 + index * 0.1,
            ease: 'power2.out',
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Initial Reveal Animations (Staggered)
    const tl = gsap.timeline({ delay: 0.2 });
    
    tl.fromTo(
      [nameLine1Ref.current, nameLine2Ref.current, nameLine3Ref.current],
      { y: 100, opacity: 0, rotationX: -20, scale: 0.95 },
      { y: 0, opacity: 1, rotationX: 0, scale: 1, duration: 1.2, stagger: 0.2, ease: 'power4.out' }
    );

    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { scale: 0.8, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 1, ease: 'back.out(1.7)' },
        "-=0.6"
      );
    }

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#050505]">
      {/* Background Layer with Modern Grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-10"></div>
        <img
          ref={bgRef}
          className="w-full h-full object-cover opacity-30 mix-blend-luminosity grayscale"
          alt="abstract dark 3d geometric shapes with vibrant red glowing accents"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOpnc0tRezqAG7S_6rx8UQF7GjaYvKEQWe5ATFcw5N66s1FM3pv64FJ1aO2GdgFis4TrBY3Jn-vi5xHytu-TysKrDojZtaJW1vn1_5NzECpK_8O5TBBc9V2Ygk0WY_ZeenGwElAldsdUDkzhd6_QbiWFsu7dp_GbU1RMfjOHC_-ujnoUWnXa0HRdI5ZSJmbQY_5wgrafiLp67RDXPxdu4WJhqrELRtOJZRT84of0kxfYcZdp6bHaKv2XJMluDeuV_v8T34gfPqS2c"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10"></div>
      </div>

      {/* Radiant Aura / Spotlight */}
      <div
        ref={auraRef}
        className="absolute top-1/2 left-1/3 w-[800px] h-[800px] bg-primary/20 blur-[140px] rounded-full pointer-events-none mix-blend-screen z-10"
        style={{ transform: 'translate(-50%, -50%)' }}
      ></div>

      <div className="relative z-20 w-full px-6 md:px-12 mt-20">
        <div className="text-6xl sm:text-8xl md:text-9xl lg:text-[14rem] font-headline font-black tracking-tighter leading-[0.75] flex flex-col items-start select-none relative group mix-blend-screen">
          <div 
            ref={nameLine1Ref} 
            className="relative z-30 text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] transition-all duration-700 ease-out group-hover:translate-x-8 group-hover:skew-x-2"
          >
            SUMYTA
          </div>
          <div 
            ref={nameLine2Ref} 
            className="relative z-20 -mt-[6%] ml-[8%] text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-orange-500 bg-[length:300%_auto] drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] transition-all duration-700 ease-out group-hover:-translate-x-4 group-hover:-skew-x-2"
            style={{ animation: 'gradientFlow 6s linear infinite' }}
          >
            BENTEY
          </div>
          <div 
            ref={nameLine3Ref} 
            className="relative z-10 -mt-[6%] ml-[16%] text-transparent transition-all duration-700 ease-out group-hover:translate-x-6 group-hover:text-white/10"
            style={{ WebkitTextStroke: '2px rgba(255,255,255,0.9)' }}
          >
            HABIB
          </div>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes gradientFlow {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}} />
        </div>

        <div className="mt-16 md:mt-24 flex flex-col md:flex-row items-end justify-between gap-8">
          <div className="hidden md:block"></div> {/* Spacer */}
          <div 
            ref={ctaRef} 
            className="group flex items-center gap-4 px-8 py-4 bg-white/5 border border-white/10 rounded-full backdrop-blur-md text-primary cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-xl"
          >
            <span className="font-headline font-bold tracking-widest text-xs md:text-sm uppercase">Scroll for Impact</span>
            <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform duration-300">arrow_downward</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
