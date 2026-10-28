'use client';

import React, { useEffect, useRef } from 'react';
import { EXPERIENCE_DATA } from '@/utils/constants';
import { initExperienceScrollAnimations } from '@/utils/experienceMotion';
import { ExperienceHeader } from './ExperienceHeader';
import { ExperienceTimeline } from './ExperienceTimeline';

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanup = initExperienceScrollAnimations({
      section: sectionRef.current,
      header: headerRef.current,
      container: containerRef.current,
      footer: null,
    });

    return cleanup;
  }, []);

  return (
    <section
      ref={sectionRef}
      id={EXPERIENCE_DATA.sectionId}
      aria-labelledby="experience-heading"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-black text-white overflow-hidden border-t border-white/10 selection:bg-primary selection:text-black"
    >
      
      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 via-transparent to-transparent blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-12 right-12 w-[500px] h-[500px] bg-gradient-to-tl from-accent-cyan/5 via-transparent to-transparent blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      {/* ── TOP SECTION BANNER ── */}
      <ExperienceHeader ref={headerRef} />

      <div ref={containerRef} className="max-w-6xl mx-auto relative z-10">
        <ExperienceTimeline />
      </div>
    </section>
  );
}
