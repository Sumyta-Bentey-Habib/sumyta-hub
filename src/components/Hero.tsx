'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HERO_DATA } from '@/utils/constants';

const Hero = () => {
  const bgRef = useRef<HTMLImageElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
        scale: 1.25,
        opacity: 0.85,
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

      if (auraRef.current) {
        gsap.to(auraRef.current, {
          x: xPos * 1.5,
          y: yPos * 1.5,
          duration: 1,
          ease: 'power2.out',
        });
      }

      if (bgRef.current) {
        gsap.to(bgRef.current, {
          x: -xPos * 0.5,
          y: -yPos * 0.5,
          duration: 1.5,
          ease: 'power2.out',
        });
      }

      if (nameRef.current) {
        gsap.to(nameRef.current, {
          x: xPos * 0.25,
          y: yPos * 0.25,
          duration: 0.8,
          ease: 'power2.out',
        });
      }

      if (contentRef.current) {
        gsap.to(contentRef.current, {
          x: -xPos * 0.15,
          y: -yPos * 0.15,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-surface-container-lowest pt-28 pb-16 md:pt-36 md:pb-20">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 opacity-40 select-none pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dim/20 to-transparent mix-blend-overlay"></div>
        <img
          ref={bgRef}
          className="w-full h-full object-cover"
          alt={HERO_DATA.bgImageAlt}
          src={HERO_DATA.bgImage}
        />
      </div>

      {/* Radiant Aura / Spotlight */}
      <div
        ref={auraRef}
        className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-primary/20 blur-[160px] rounded-full pointer-events-none mix-blend-screen z-1"
        style={{ transform: 'translate(-50%, -50%)' }}
      ></div>

      <div className="relative z-10 w-full px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-between">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Big Typographic Name */}
          <div className="lg:col-span-6 xl:col-span-7">
            <h1
              ref={nameRef}
              className="text-5xl sm:text-6xl md:text-8xl lg:text-[7.2rem] xl:text-[8.5rem] font-headline font-black tracking-tighter leading-[0.85] text-white mix-blend-difference select-none"
            >
              {HERO_DATA.name.first}
              <br />
              {HERO_DATA.name.middle}
              <br />
              <span className="text-primary">{HERO_DATA.name.last}</span>
            </h1>
          </div>

          {/* Right Column: Statement, Subheading, Status & CTAs */}
          <div
            ref={contentRef}
            className="lg:col-span-6 xl:col-span-5 flex flex-col justify-between h-full pt-2 lg:pt-4"
          >
            <div>
              {/* Main Headline Statement */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-headline font-black tracking-tighter uppercase leading-[0.9] text-white">
                {HERO_DATA.headline.line1}
                <br />
                {HERO_DATA.headline.line2}
                <br />
                <span className="text-primary">{HERO_DATA.headline.line3}</span>
              </h2>

              {/* Role & Tech Stack */}
              <div className="mt-8 space-y-2">
                <h3 className="text-xl md:text-2xl font-headline font-bold text-white tracking-tight">
                  {HERO_DATA.role}
                </h3>
                <p className="text-primary font-mono text-sm md:text-base font-semibold tracking-wide">
                  {HERO_DATA.techStackFormatted}
                </p>
              </div>

              {/* Current Status / Experience */}
              <div className="mt-6 flex items-start gap-3 p-4 bg-surface-container/60 border border-white/5 backdrop-blur-md">
                <span className="relative flex h-3 w-3 mt-1 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                <p className="text-secondary/90 text-sm md:text-base font-body leading-relaxed">
                  {HERO_DATA.currentStatus.statement}{' '}
                  <span className="text-white font-bold tracking-wide">
                    {HERO_DATA.currentStatus.company}
                  </span>
                  .
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-3 md:gap-4">
              {HERO_DATA.actions.map((action, index) => (
                <a
                  key={index}
                  href={action.href}
                  target={action.isExternal ? '_blank' : undefined}
                  rel={action.isExternal ? 'noopener noreferrer' : undefined}
                  className={`px-5 py-3 md:px-6 md:py-3.5 font-headline font-bold text-xs md:text-sm uppercase tracking-widest transition-all duration-300 flex items-center gap-2 group ${
                    action.primary
                      ? 'bg-primary text-on-primary-fixed border border-primary hover:bg-white hover:border-white hover:text-black hover:scale-105 active:scale-95 shadow-lg shadow-primary/10'
                      : 'bg-surface-container-high/80 border border-outline/30 text-white hover:border-primary hover:text-primary hover:scale-105 active:scale-95 backdrop-blur-sm'
                  }`}
                >
                  <span>{action.label}</span>
                  <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-0.5">
                    {action.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Status and Scroll Indicator */}
        <div className="mt-16 md:mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-xs font-mono text-outline uppercase tracking-wider">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span>{HERO_DATA.locationStatus}</span>
          </div>

          <a
            href="#work"
            className="flex items-center gap-3 text-primary hover:text-white transition-colors duration-300 text-xs font-headline font-bold tracking-widest uppercase group"
          >
            <span>{HERO_DATA.scrollText}</span>
            <span className="material-symbols-outlined text-sm group-hover:translate-y-1 transition-transform animate-pulse">
              arrow_downward
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
