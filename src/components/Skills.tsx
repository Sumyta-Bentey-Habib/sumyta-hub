'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SKILLS_DATA } from '@/utils/constants';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header fade-up animation
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          },
        }
      );

      // Cards stagger animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.skill-card');
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
            },
          }
        );

        // Tech pill reveal inside each card
        const pills = cardsRef.current.querySelectorAll('.tech-pill');
        gsap.fromTo(
          pills,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            stagger: 0.04,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 70%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Duplicate marquee items for infinite feel
  const marqueeRow = [...SKILLS_DATA.marqueeItems, ...SKILLS_DATA.marqueeItems];

  return (
    <section
      ref={sectionRef}
      className="py-40 bg-surface-container-lowest overflow-hidden border-t border-white/5"
      id="skills"
    >
      {/* Header */}
      <div ref={headerRef} className="px-6 md:px-12 mb-8">
        <h2 className="text-sm font-headline font-bold text-primary tracking-[0.4em] uppercase mb-4">
          {SKILLS_DATA.sectionTag}
        </h2>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h3 className="text-4xl md:text-6xl font-headline font-black uppercase tracking-tighter text-white">
            {SKILLS_DATA.title}
          </h3>
          <p className="max-w-md text-secondary/70 text-sm md:text-base font-body leading-relaxed md:text-right">
            {SKILLS_DATA.subtitle}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-20">
        {/* Marquee */}
        <div className="flex overflow-hidden select-none gap-12 group cursor-pointer hover:bg-white/5 transition-colors duration-700 py-10">
          <div className="flex flex-nowrap shrink-0 items-center gap-12 text-6xl sm:text-7xl md:text-9xl lg:text-[13rem] font-headline font-black uppercase text-bleed text-white/5 group-hover:text-primary transition-colors duration-500 animate-marquee [text-shadow:_0_0_1px_rgba(255,255,255,0.3)]">
            {marqueeRow.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
          <div className="flex flex-nowrap shrink-0 items-center gap-12 text-6xl sm:text-7xl md:text-9xl lg:text-[13rem] font-headline font-black uppercase text-bleed text-white/5 group-hover:text-primary transition-colors duration-500 animate-marquee [text-shadow:_0_0_1px_rgba(255,255,255,0.3)]">
            {marqueeRow.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        </div>

        {/* Skill Cards Grid */}
        <div
          ref={cardsRef}
          className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-1"
        >
          {SKILLS_DATA.categories.map((category) => (
            <div
              key={category.num}
              className={`skill-card relative overflow-hidden p-10 md:p-12 group cursor-crosshair transition-all duration-500 ${
                category.highlight
                  ? 'bg-surface-container-high'
                  : 'bg-surface-container'
              } hover:bg-primary-dim`}
            >
              {/* Top accent line — slides in from left on hover */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Corner decoration */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                <span className="material-symbols-outlined text-4xl text-white">
                  {category.icon}
                </span>
              </div>

              {/* Card number */}
              <span className="text-xs font-bold text-primary group-hover:text-on-primary-fixed/60 mb-6 block font-headline tracking-[0.3em]">
                {category.num}
              </span>

              {/* Title */}
              <h4 className="text-2xl md:text-3xl font-headline font-bold uppercase tracking-tight mb-3 group-hover:text-on-primary-fixed transition-colors duration-500 group-hover:translate-x-1.5 transform">
                {category.title}
              </h4>

              {/* One-liner desc */}
              <p className="text-secondary/70 group-hover:text-on-primary-fixed/70 font-body text-sm leading-relaxed mb-8 transition-colors duration-500">
                {category.desc}
              </p>

              {/* Divider */}
              <div className="w-12 h-[1px] bg-outline/30 group-hover:bg-on-primary-fixed/20 mb-8 transition-colors duration-500" />

              {/* Skill Groups */}
              <div className="flex flex-col gap-5">
                {category.groups.map((group) => (
                  <div key={group.label}>
                    <span className="text-[0.65rem] font-headline font-bold tracking-[0.35em] uppercase text-outline group-hover:text-on-primary-fixed/40 block mb-2 transition-colors duration-500">
                      {group.label}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="tech-pill inline-block px-2.5 py-1 text-xs font-headline font-semibold border border-outline/20 group-hover:border-on-primary-fixed/20 text-secondary group-hover:text-on-primary-fixed/80 transition-all duration-300 hover:border-primary group-hover:hover:border-on-primary-fixed/50"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
