import React from 'react';
import { PROJECTS_DATA } from '@/utils/constants';

export const ProjectsHeader: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto mb-6 md:mb-10 relative z-10">
      {/* Telemetry Sector Tag & Signal Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 font-mono text-[11px] tracking-widest uppercase">
        <div className="flex items-center gap-3 text-primary">
          <span className="w-2 h-2 bg-primary rotate-45 inline-block shrink-0" aria-hidden="true" />
          <span className="font-bold tracking-[0.35em]">{PROJECTS_DATA.sectionTag}</span>
          <span className="text-white/20 select-none">/</span>
          <span className="text-secondary/60">{PROJECTS_DATA.kicker}</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 border border-primary/30 bg-primary/5 text-primary text-[10px]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span>{PROJECTS_DATA.highwayStatus}</span>
        </div>
      </div>

      {/* Main Section Headline & Description */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4">
        <div className="max-w-3xl">
          <h2
            id="projects-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-headline font-black tracking-tighter uppercase text-white leading-none hover:text-primary transition-colors duration-500 cursor-default"
          >
            {PROJECTS_DATA.title}
            <span className="text-primary">{PROJECTS_DATA.titleAccent}</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm font-sans text-secondary-dim/90 leading-relaxed max-w-2xl">
            {PROJECTS_DATA.subtitle}
          </p>
        </div>

        <div className="flex flex-col items-start lg:items-end gap-1 font-mono shrink-0">
          <span className="text-xs tracking-[0.25em] text-white uppercase font-bold">
            {PROJECTS_DATA.scrollProgressLabel}
          </span>
          <span className="text-[10px] tracking-[0.3em] text-primary/80 uppercase">
            {PROJECTS_DATA.period}
          </span>
        </div>
      </div>

      {/* Cyberpunk Workstation Divider Conduit */}
      <div className="w-full h-px bg-gradient-to-r from-primary via-accent-cyan/40 to-transparent opacity-80" />
    </div>
  );
};
