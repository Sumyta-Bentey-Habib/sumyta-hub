'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCE_DATA } from '@/utils/constants';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Role pane slides in from left
      const panes = sectionRef.current?.querySelectorAll('.role-pane');
      panes?.forEach((pane) => {
        gsap.fromTo(
          pane,
          { x: -30, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: pane, start: 'top 82%' },
          }
        );
      });

      // Responsibility rows slide up with stagger
      const groups = sectionRef.current?.querySelectorAll('.resp-group');
      groups?.forEach((group) => {
        const rows = group.querySelectorAll('.resp-row');
        gsap.fromTo(
          rows,
          { y: 24, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: group, start: 'top 78%' },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-surface-container-lowest" id="experience">
      {/* Section tag */}
      <div className="px-6 md:px-12 mb-20">
        <h2 className="text-sm font-headline font-bold text-primary tracking-[0.4em] uppercase">
          {EXPERIENCE_DATA.sectionTag}
        </h2>
      </div>

      <div className="flex flex-col divide-y divide-outline/10">
        {EXPERIENCE_DATA.experiences.map((exp, index) => (
          <div key={index} className="px-6 md:px-12 py-16 md:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

              {/* ── LEFT: Sticky role identity pane ── */}
              <div className="role-pane lg:col-span-4 lg:sticky lg:top-32 self-start flex flex-col gap-6">
                {/* Index */}
                <span className="text-[0.6rem] font-mono text-outline/50 tracking-[0.4em] uppercase">
                  {String(index + 1).padStart(2, '0')} / Experience
                </span>

                {/* Role title */}
                <h3
                  className={`text-4xl md:text-5xl font-headline font-black uppercase tracking-tighter leading-none ${
                    exp.active ? 'text-white' : 'text-white/30'
                  }`}
                >
                  {exp.title}
                </h3>

                {/* Company */}
                <p
                  className={`font-headline font-bold text-xl uppercase tracking-widest ${
                    exp.active ? 'text-primary' : 'text-outline/40'
                  }`}
                >
                  {exp.company}
                </p>

                {/* Period */}
                <p className="font-mono text-sm text-outline/50 tracking-wider -mt-2">
                  {exp.period}
                </p>

                {/* Status badge */}
                <div>
                  {exp.active ? (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-primary/30 text-primary text-[0.65rem] font-headline font-bold tracking-[0.3em] uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping absolute" />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary relative" />
                      Currently Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-outline/15 text-outline/40 text-[0.65rem] font-headline font-bold tracking-[0.3em] uppercase">
                      Completed
                    </span>
                  )}
                </div>

                {/* Responsibility count */}
                <p className={`text-xs font-mono tracking-widest mt-2 ${exp.active ? 'text-outline/50' : 'text-outline/25'}`}>
                  {exp.responsibilities.length} contributions
                </p>
              </div>

              {/* ── RIGHT: Responsibilities as typographic rows ── */}
              <div className="resp-group lg:col-span-8 flex flex-col border-t border-outline/10">
                {exp.responsibilities.map((item, rIdx) => (
                  <div
                    key={rIdx}
                    className={`resp-row group flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 py-8 border-b border-outline/10 transition-colors duration-300 ${
                      exp.active ? 'hover:bg-white/[0.02]' : ''
                    }`}
                  >
                    {/* Index number */}
                    <span
                      className={`shrink-0 text-[0.6rem] font-mono tracking-[0.3em] pt-1 ${
                        exp.active ? 'text-primary/60' : 'text-outline/25'
                      }`}
                    >
                      {String(rIdx + 1).padStart(2, '0')}
                    </span>

                    {/* Label */}
                    <h4
                      className={`shrink-0 sm:w-44 text-xs font-headline font-bold uppercase tracking-[0.2em] leading-snug pt-0.5 transition-colors duration-300 ${
                        exp.active
                          ? 'text-white/80 group-hover:text-primary'
                          : 'text-outline/30'
                      }`}
                    >
                      {item.label}
                    </h4>

                    {/* Separator */}
                    <div className={`hidden sm:block shrink-0 w-px self-stretch ${exp.active ? 'bg-outline/15' : 'bg-outline/8'}`} />

                    {/* Description */}
                    <p
                      className={`font-body text-sm md:text-base leading-relaxed ${
                        exp.active ? 'text-secondary/60' : 'text-secondary/20'
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
