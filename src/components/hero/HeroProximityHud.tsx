import React from 'react';
import { HERO_DATA } from '@/utils/constants';

interface HeroProximityHudProps {
  readonly nearbyLocationId: string | null;
  readonly onLocationTrigger: (locId: string) => void;
}

export const HeroProximityHud: React.FC<HeroProximityHudProps> = ({
  nearbyLocationId,
  onLocationTrigger,
}) => {
  if (!nearbyLocationId) return null;

  const loc = HERO_DATA.locations.find((l) => l.id === nearbyLocationId);
  if (!loc) return null;

  return (
    <div className="absolute top-60 sm:top-64 md:top-72 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
      <button
        type="button"
        onClick={() => onLocationTrigger(loc.id)}
        className="group flex items-center gap-3 px-4 py-2 border border-primary bg-black/90 backdrop-blur-md text-white font-mono shadow-[0_0_20px_rgba(255,45,117,0.3)] hover:bg-primary/20 transition-all cursor-pointer"
      >
        <span className="w-2 h-2 bg-primary animate-ping" />
        <span className="text-xs tracking-wider font-bold text-white group-hover:text-primary">
          {loc.title}
        </span>
        <span className="text-[10px] tracking-widest text-primary font-semibold">
          {HERO_DATA.interactKeyHint}
        </span>
      </button>
    </div>
  );
};

HeroProximityHud.displayName = 'HeroProximityHud';
export default HeroProximityHud;
