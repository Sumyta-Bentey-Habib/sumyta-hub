import React, { forwardRef } from 'react';
import { ABOUT_DATA } from '@/utils/constants';

export const AboutHeader = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="max-w-7xl mx-auto mb-16 md:mb-24 relative z-10">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-2 h-2 bg-primary rotate-45 inline-block shrink-0" aria-hidden="true" />
        <span className="text-xs font-mono font-bold tracking-[0.35em] text-primary uppercase">
          {ABOUT_DATA.sectionTag}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6">
        <div>
          <h2
            id="about-heading"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-headline font-black tracking-tighter uppercase text-white leading-none"
          >
            {ABOUT_DATA.title}
            <span className="text-primary">{ABOUT_DATA.titleAccent}</span>
          </h2>
          <p className="mt-4 text-xs md:text-sm font-mono tracking-widest text-secondary/60 uppercase max-w-2xl leading-relaxed">
            {ABOUT_DATA.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-4 font-mono text-[10px] tracking-widest text-outline uppercase shrink-0">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {ABOUT_DATA.statusOnline}
          </span>
          <span className="text-white/20">|</span>
          <span>{ABOUT_DATA.statusTag}</span>
        </div>
      </div>

      {/* Thin Brutalist Rule */}
      <div className="w-full h-px bg-gradient-to-r from-primary/60 via-white/15 to-transparent mt-2" />
    </div>
  );
});

AboutHeader.displayName = 'AboutHeader';
