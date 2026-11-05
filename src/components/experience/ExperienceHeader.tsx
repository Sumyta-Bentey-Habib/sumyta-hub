import React from 'react';
import { EXPERIENCE_DATA } from '@/utils/constants';

export const ExperienceHeader: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto mb-16 md:mb-20 relative z-10">
      {/* Editorial Overline & Period */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 font-mono text-[11px] tracking-widest uppercase">
        <div className="flex items-center gap-2.5 text-primary">
          <span className="w-1.5 h-1.5 bg-primary inline-block shrink-0" aria-hidden="true" />
          <span className="font-bold tracking-[0.25em]">{EXPERIENCE_DATA.sectionTag}</span>
        </div>

        <div className="px-2.5 py-1 border border-white/10 text-white/70 text-[10px] tracking-widest">
          <span>{EXPERIENCE_DATA.archivePeriod}</span>
        </div>
      </div>

      {/* Main Section Headline */}
      <div className="pb-6">
        <h2
          id="experience-heading"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-headline font-black tracking-tight uppercase text-white leading-none cursor-default"
        >
          {EXPERIENCE_DATA.title}
          <span className="text-primary">{EXPERIENCE_DATA.titleAccent}</span>
        </h2>
        <p className="mt-4 text-xs md:text-sm font-mono tracking-wider text-secondary/70 uppercase max-w-2xl leading-relaxed">
          {EXPERIENCE_DATA.subtitle}
        </p>
      </div>

      {/* Editorial Hairline Divider */}
      <div className="w-full h-px bg-white/10 mt-2" aria-hidden="true" />
    </div>
  );
};

ExperienceHeader.displayName = 'ExperienceHeader';
