import React from 'react';
import { HERO_DATA } from '@/utils/constants';

export const HeroBrand: React.FC = () => {
  return (
    <div className="absolute top-24 md:top-28 left-6 md:left-12 z-20 pointer-events-auto">
      <div className="flex items-center gap-3 mb-1">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-[10px] font-mono tracking-widest text-outline uppercase">
          {HERO_DATA.statusOnline}
        </span>
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase font-mono leading-none text-white">
        {HERO_DATA.name}
      </h1>
      <p className="text-xs md:text-sm font-mono tracking-widest text-primary font-semibold mt-1 uppercase">
        {HERO_DATA.role}
      </p>
    </div>
  );
};

HeroBrand.displayName = 'HeroBrand';
export default HeroBrand;
