import React from 'react';
import { HERO_DATA } from '@/utils/constants';

export const HeroBrand: React.FC = () => {
  return (
    <div className="absolute top-20 sm:top-22 md:top-24 left-4 sm:left-6 md:left-12 z-20 pointer-events-auto max-w-[88vw] sm:max-w-md md:max-w-lg">
      {/* Status indicator */}
      <div className="flex items-center gap-2 sm:gap-3 mb-1.5">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-outline uppercase">
          {HERO_DATA.statusOnline}
        </span>
      </div>

      {/* Name */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase font-mono leading-none text-white break-words">
        {HERO_DATA.name}
      </h1>

      {/* Title */}
      <p className="text-[11px] sm:text-xs md:text-sm font-mono tracking-widest text-primary font-semibold mt-1.5 uppercase">
        {HERO_DATA.role}
      </p>

      {/* Short introduction */}
      <p className="text-xs sm:text-sm font-sans text-secondary/85 leading-relaxed mt-2.5 max-w-sm sm:max-w-md">
        {HERO_DATA.bio}
      </p>

      {/* Compact technology list */}
      <div className="flex flex-wrap items-center gap-1.5 mt-3 font-mono text-[10px] sm:text-[11px] text-white/70">
        <span className="text-secondary/50 font-semibold tracking-wider select-none">
          {HERO_DATA.techStackLabel}
        </span>
        {HERO_DATA.techStack.map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 border border-white/10 bg-white/[0.03] text-white/80 rounded-xs tracking-wide"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

HeroBrand.displayName = 'HeroBrand';
export default HeroBrand;
