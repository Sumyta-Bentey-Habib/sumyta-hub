import React from 'react';
import { HERO_DATA } from '@/utils/constants';

export const HeroBottomNav: React.FC = () => {
  return (
    <div className="hidden md:flex absolute md:bottom-8 md:left-12 md:right-12 z-20 flex-row items-center justify-between gap-3 pointer-events-none">
      {/* Bottom-Left: Name, Role & Explore Prompt */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <span className="font-mono font-black text-xs md:text-sm tracking-tight text-white uppercase">
          {HERO_DATA.name}
        </span>
        <span className="text-[10px] md:text-xs font-mono tracking-widest text-primary font-semibold uppercase">
          {'//'} {HERO_DATA.role}
        </span>
        <span className="hidden sm:inline-block w-1.5 h-3 bg-primary animate-pulse ml-1" />
        <span className="hidden sm:inline text-xs font-mono font-bold tracking-widest text-secondary uppercase">
          {HERO_DATA.explorePrompt}
        </span>
      </div>

      {/* Bottom-Center: Control Hint */}
      <div className="flex items-center justify-center pointer-events-auto">
        <div className="flex items-center px-3 py-1.5 border border-outlineVariant/40 bg-black/50 backdrop-blur-sm text-[10px] font-mono tracking-widest text-outline uppercase">
          <span>{HERO_DATA.controlsHintDesktop}</span>
        </div>
      </div>

      {/* Bottom-Right: Persistent VIEW WORK Link */}
      <div className="pointer-events-auto">
        <a
          href={HERO_DATA.viewWorkAction.href}
          aria-label={HERO_DATA.viewWorkAction.ariaLabel}
          className="group flex items-center gap-2 px-4 py-2 bg-primary text-black font-mono font-black text-xs md:text-sm tracking-wider uppercase hover:bg-white hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-[0_0_15px_rgba(255,45,117,0.4)]"
        >
          <span>{HERO_DATA.viewWorkAction.label}</span>
        </a>
      </div>
    </div>
  );
};

HeroBottomNav.displayName = 'HeroBottomNav';
export default HeroBottomNav;
