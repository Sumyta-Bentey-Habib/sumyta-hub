'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCE_DATA } from '@/utils/constants';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (!sectionRef.current) return;

      // Section header reveal animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 36, opacity: 0 },
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
      }

      // Experience cards reveal animations
      const cards = sectionRef.current.querySelectorAll('.experience-card');
      cards.forEach((card) => {
        const leftPane = card.querySelector('.exp-left-pane');
        const rightPane = card.querySelector('.exp-right-pane');
        const rows = card.querySelectorAll('.exp-row');
        const tags = card.querySelectorAll('.exp-tech-tag');

        if (leftPane) {
          gsap.fromTo(
            leftPane,
            { x: -32, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 82%',
              },
            }
          );
        }

        if (rightPane) {
          gsap.fromTo(
            rightPane,
            { y: 28, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
              },
            }
          );
        }

        if (rows.length > 0) {
          gsap.fromTo(
            rows,
            { y: 16, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.05,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: rightPane || card,
                start: 'top 75%',
              },
            }
          );
        }

        if (tags.length > 0) {
          gsap.fromTo(
            tags,
            { scale: 0.9, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              stagger: 0.03,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: rightPane || card,
                start: 'top 68%',
              },
            }
          );
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-labelledby="experience-heading"
      className="py-32 md:py-44 bg-surface-container-lowest text-secondary relative overflow-hidden border-t border-outline/10"
    >
      {/* ── SECTION HEADER ── */}
      <div ref={headerRef} className="experience-header px-6 md:px-12 mb-20 md:mb-32">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-2 bg-primary rotate-45 inline-block shrink-0" aria-hidden="true" />
          <p className="text-xs font-mono font-bold text-primary tracking-[0.4em] uppercase">
            {EXPERIENCE_DATA.sectionTag}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-outline/10">
          <h2
            id="experience-heading"
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-headline font-black uppercase tracking-tighter leading-[0.85] text-white hover:text-primary transition-colors duration-700 cursor-default select-none break-words"
          >
            {EXPERIENCE_DATA.title}
          </h2>
          <div className="flex flex-col items-start lg:items-end gap-2 font-mono">
            <span className="text-xs md:text-sm tracking-[0.25em] uppercase text-secondary/70">
              {EXPERIENCE_DATA.subtitle}
            </span>
            <span className="text-[0.65rem] tracking-[0.35em] text-primary/80 uppercase">
              {`${EXPERIENCE_DATA.archivePeriod} // ${EXPERIENCE_DATA.archiveLabel}`}
            </span>
          </div>
        </div>
      </div>

      {/* ── EXPERIENCE ENTRIES ── */}
      <div className="flex flex-col">
        {EXPERIENCE_DATA.experiences.map((exp) => (
          <article
            key={exp.id}
            aria-labelledby={`exp-role-${exp.id}`}
            className="experience-card group relative px-6 md:px-12 py-20 md:py-28 border-b border-outline/10 transition-colors duration-500 hover:bg-white/[0.015]"
          >
            {/* Top accent line animation on hover */}
            <div
              className="absolute top-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-left pointer-events-none"
              aria-hidden="true"
            />

            {/* Brutalist Record Marker */}
            <div
              className="absolute top-6 right-6 md:right-12 font-mono text-[0.65rem] tracking-[0.3em] text-outline/30 uppercase select-none pointer-events-none"
              aria-hidden="true"
            >
              {EXPERIENCE_DATA.labels.recordPrefix}{exp.number}
            </div>

            {/* Asymmetric Desktop 2-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* ── LEFT COLUMN: Sticky Role Identity & Timing ── */}
              <div className="exp-left-pane lg:col-span-5 lg:sticky lg:top-28 self-start flex flex-col gap-8">
                
                {/* Number & Date Header */}
                <div className="flex items-baseline justify-between gap-4 border-b border-outline/10 pb-4">
                  <span
                    className="exp-num text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-headline font-black tracking-tighter text-outline/25 group-hover:text-primary transition-all duration-500 group-hover:-translate-y-1.5 select-none leading-none inline-block"
                    aria-hidden="true"
                  >
                    {exp.number}
                  </span>
                  <div className="text-right">
                    <span className="exp-period block font-mono text-sm sm:text-base font-bold tracking-[0.25em] text-outline/80 group-hover:text-white transition-colors duration-300 uppercase">
                      {exp.period}
                    </span>
                    <span className="font-mono text-[0.6rem] tracking-[0.3em] text-outline/40 uppercase block mt-1">
                      {exp.statusSublabel}
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                <div>
                  {exp.active ? (
                    <span className="inline-flex items-center gap-2.5 px-3.5 py-1.5 border border-primary/40 bg-primary/5 text-primary text-[0.65rem] font-mono font-bold tracking-[0.25em] uppercase">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                      </span>
                      {exp.statusLabel}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2.5 px-3.5 py-1.5 border border-outline/20 bg-surface-container/50 text-outline/70 text-[0.65rem] font-mono font-bold tracking-[0.25em] uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-outline/50" />
                      {exp.statusLabel}
                    </span>
                  )}
                </div>

                {/* Role Title & Company Hierarchy */}
                <div className="space-y-2">
                  <h3
                    id={`exp-role-${exp.id}`}
                    className="text-3xl sm:text-4xl md:text-5xl font-headline font-black uppercase tracking-tight text-white leading-[1.05] group-hover:translate-x-1.5 transition-transform duration-500"
                  >
                    {exp.role}
                  </h3>
                  {exp.company && (
                    <p className="font-headline font-bold text-xl uppercase tracking-widest text-primary">
                      {exp.company}
                    </p>
                  )}
                </div>

                {/* Narrative Description */}
                <p className="font-body text-secondary/80 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
                  {exp.description}
                </p>

                {/* Section Deliverables Counter */}
                <div className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-outline/50 flex items-center gap-2 pt-2">
                  <span className="w-1.5 h-1.5 bg-primary/60 inline-block" aria-hidden="true" />
                  <span>
                    {exp.focusItems.length} {EXPERIENCE_DATA.labels.deliverablesSuffix}
                  </span>
                </div>
              </div>

              {/* ── RIGHT COLUMN: Editorial Focus Rows & Tech Matrix ── */}
              <div className="exp-right-pane lg:col-span-7 flex flex-col gap-10">
                
                {/* Focus Category Header */}
                <div className="flex items-center justify-between border-b border-outline/15 pb-4">
                  <h4 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                    <span className="text-outline/40 select-none" aria-hidden="true">/</span>
                    {exp.focusCategory}
                  </h4>
                  <span className="text-[0.65rem] font-mono tracking-widest text-outline/40 uppercase">
                    {EXPERIENCE_DATA.labels.indexPrefix}{exp.number}
                  </span>
                </div>

                {/* Responsibilities / Capabilities List */}
                <ul className="divide-y divide-outline/10 list-none p-0 m-0">
                  {exp.focusItems.map((item, idx) => (
                    <li
                      key={idx}
                      className="exp-row group/row py-4 sm:py-5 flex items-start gap-4 sm:gap-6 -mx-3 px-3 hover:bg-white/[0.025] border-l-2 border-transparent hover:border-primary transition-all duration-300"
                    >
                      <span
                        className="font-mono text-xs text-primary/70 group-hover/row:text-primary transition-colors shrink-0 pt-0.5 select-none"
                        aria-hidden="true"
                      >
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      <p className="font-body text-sm sm:text-base text-secondary/90 group-hover/row:text-white group-hover/row:translate-x-1 transition-all duration-300 leading-relaxed m-0">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>

                {/* Technology Matrix */}
                <div className="pt-6 border-t border-outline/15">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-[0.65rem] font-mono font-bold tracking-[0.35em] uppercase text-outline/60">
                      {exp.techCategory}
                    </h5>
                    <span className="font-mono text-[0.6rem] tracking-[0.2em] text-outline/40 uppercase">
                      {exp.technologies.length} {EXPERIENCE_DATA.labels.techSpecificationsSuffix}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="exp-tech-tag inline-block px-3 py-1.5 text-xs font-mono tracking-wider border border-outline/25 text-secondary/80 bg-surface-container-low/70 hover:border-primary hover:text-white hover:bg-primary/10 transition-all duration-300 hover:-translate-y-0.5 select-none"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Experience;
