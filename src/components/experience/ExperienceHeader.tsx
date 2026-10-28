import React, { forwardRef } from 'react';
import { EXPERIENCE_DATA } from '@/utils/constants';

export const ExperienceHeader = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="max-w-7xl mx-auto mb-16 md:mb-24 relative z-10">
      {/* City District Breadcrumb & Signal */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 font-mono text-[11px] tracking-widest uppercase">
        <div className="flex items-center gap-3 text-primary">
          <span className="w-2 h-2 bg-primary rotate-45 inline-block shrink-0" aria-hidden="true" />
          <span className="font-bold tracking-[0.35em]">{EXPERIENCE_DATA.sectionTag}</span>
          <span className="text-white/20 select-none">/</span>
          <span className="text-secondary/60">{EXPERIENCE_DATA.cityRegion}</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 border border-primary/30 bg-primary/5 text-primary text-[10px]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span>{EXPERIENCE_DATA.signalOnline}</span>
        </div>
      </div>

      {/* Main Section Headline */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6">
        <div>
          <h2
            id="experience-heading"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-headline font-black tracking-tighter uppercase text-white leading-none hover:text-primary transition-colors duration-500 cursor-default"
          >
            {EXPERIENCE_DATA.title}
            <span className="text-primary">{EXPERIENCE_DATA.titleAccent}</span>
          </h2>
          <p className="mt-4 text-xs md:text-sm font-mono tracking-widest text-secondary/70 uppercase max-w-2xl leading-relaxed">
            {EXPERIENCE_DATA.subtitle}
          </p>
        </div>

        <div className="flex flex-col items-start lg:items-end gap-1 font-mono shrink-0">
          <span className="text-xs md:text-sm tracking-[0.25em] text-white uppercase font-bold">
            {EXPERIENCE_DATA.archivePeriod}
          </span>
          <span className="text-[10px] tracking-[0.3em] text-primary/80 uppercase">
            {EXPERIENCE_DATA.archiveLabel}
          </span>
        </div>
      </div>

      {/* Cyberpunk Neon Divider Rule */}
      <div className="w-full h-px bg-gradient-to-r from-primary via-accent-cyan/40 to-transparent mt-2 opacity-80" />
    </div>
  );
});

ExperienceHeader.displayName = 'ExperienceHeader';
