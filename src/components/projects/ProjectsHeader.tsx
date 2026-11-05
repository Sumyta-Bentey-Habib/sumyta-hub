'use client';

import React from 'react';
import { PROJECTS_DATA } from '@/utils/constants';

export const ProjectsHeader: React.FC = () => {
  const projectCount = `${String(PROJECTS_DATA.projects.length).padStart(2, '0')} ${PROJECTS_DATA.projectCountSuffix}`;

  return (
    <header className="mb-14 md:mb-20">
      {/* ── SECTION OVERLINE & METRICS ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 font-mono text-[11px] tracking-widest uppercase">
        <div className="flex items-center gap-3 text-accent-cyan">
          <span className="w-2 h-2 bg-accent-cyan rotate-45 inline-block shrink-0" aria-hidden="true" />
          <span className="font-bold tracking-[0.3em]">{PROJECTS_DATA.sectionTag}</span>
        </div>

        {/* Dynamic Project Count Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan text-[11px] font-bold font-mono tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" aria-hidden="true" />
          <span>{projectCount}</span>
        </div>
      </div>

      {/* ── MAIN SECTION HEADLINE & SUBTITLE ── */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6">
        <div className="max-w-3xl space-y-3">
          <h2
            id="projects-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-headline font-black tracking-tight uppercase text-white leading-none cursor-default"
          >
            {PROJECTS_DATA.title}
            <span className="text-accent-cyan">{PROJECTS_DATA.titleAccent}</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg font-sans text-secondary-dim/90 leading-relaxed max-w-2xl">
            {PROJECTS_DATA.subtitle}
          </p>
        </div>
      </div>

      {/* ── EDITORIAL DIVIDER ── */}
      <div
        className="w-full h-px bg-gradient-to-r from-accent-cyan/60 via-primary/40 to-transparent opacity-80"
        aria-hidden="true"
      />
    </header>
  );
};
