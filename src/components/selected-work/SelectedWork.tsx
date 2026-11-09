'use client';

import React, { useEffect, useRef } from 'react';
import { SELECTED_WORK_DATA, SelectedWorkProject } from '@/utils/constants';
import { initSelectedWorkScrollAnimations } from '@/utils/selected-work';
import { SelectedWorkHeader } from './SelectedWorkHeader';
import { SelectedWorkCard } from './SelectedWorkCard';

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanup = initSelectedWorkScrollAnimations({
      section: sectionRef.current,
      header: headerRef.current,
      cardsContainer: cardsContainerRef.current,
    });

    return cleanup;
  }, []);

  const projects = SELECTED_WORK_DATA.projects as readonly SelectedWorkProject[];

  return (
    <section
      ref={sectionRef}
      id={SELECTED_WORK_DATA.sectionId}
      aria-labelledby="selected-work-heading"
      className="relative py-16 md:py-24 px-6 md:px-10 lg:px-12 bg-black text-white overflow-hidden border-t border-white/10 selection:bg-primary selection:text-black"
    >
      {/* Background Cyberpunk Ambient Glows */}
      <div
        className="absolute top-1/4 right-1/4 w-[550px] h-[550px] bg-gradient-to-bl from-primary/5 via-transparent to-transparent blur-[150px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-12 left-12 w-[550px] h-[550px] bg-gradient-to-tr from-accent-cyan/5 via-transparent to-transparent blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      {/* ── 1. SECTION TELEMETRY HEADER ── */}
      <SelectedWorkHeader ref={headerRef} />

      {/* ── 2. DEDICATED SELECTED WORK CARDS GRID ── */}
      <div
        ref={cardsContainerRef}
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 relative z-10"
      >
        {projects.map((project, idx) => (
          <SelectedWorkCard
            key={project.id}
            project={project}
            priority={idx === 0}
          />
        ))}
      </div>
    </section>
  );
}

SelectedWork.displayName = 'SelectedWork';
