import React from 'react';
import { NAVBAR_DATA } from '@/utils/constants';

interface BrandLogoProps {
  readonly className?: string;
  readonly showWordmark?: boolean;
  readonly size?: number;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  showWordmark = true,
  size = 28,
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Concept 2: The Sigma Aperture Standalone Symbol */}
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
      >
        {/* Outer Precision Plate */}
        <rect
          x="10"
          y="10"
          width="80"
          height="80"
          rx="8"
          stroke="currentColor"
          strokeWidth="3"
          strokeOpacity="0.4"
          className="transition-colors group-hover:stroke-primary"
        />

        {/* Top Architectural L-Block */}
        <path
          d="M 18 18 L 82 18 L 82 42 L 54 42 L 54 32 L 36 32 L 36 46 L 70 54 L 70 48 L 82 48 L 82 18 Z"
          fill="currentColor"
          className="text-white group-hover:text-primary transition-colors"
        />

        {/* Bottom Architectural L-Block */}
        <path
          d="M 82 82 L 18 82 L 18 58 L 46 58 L 46 68 L 64 68 L 64 54 L 30 46 L 30 52 L 18 52 L 18 82 Z"
          fill="currentColor"
          className="text-white group-hover:text-primary transition-colors"
        />

        {/* Negative Space Conduit: Precision Cyan Diamond Aperture */}
        <polygon
          points="50,42 58,50 50,58 42,50"
          className="fill-accent-cyan transition-transform duration-300 group-hover:scale-110"
          style={{ transformOrigin: '50px 50px' }}
        />

        {/* Reference Alignment Pips */}
        <circle cx="26" cy="26" r="2.5" className="fill-accent-cyan opacity-80" />
        <circle cx="74" cy="74" r="2.5" className="fill-accent-cyan opacity-80" />
      </svg>

      {/* SUMYTA Wordmark */}
      {showWordmark && (
        <span className="font-headline font-black text-xl tracking-wider text-white uppercase group-hover:text-primary transition-colors inline-flex items-center">
          {NAVBAR_DATA.brandName}
          <span className="inline-block w-1.5 h-1.5 bg-accent-cyan ml-1.5 rotate-45 transform group-hover:rotate-90 transition-transform duration-300" />
        </span>
      )}
    </div>
  );
};

BrandLogo.displayName = 'BrandLogo';
export default BrandLogo;

