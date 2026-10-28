import React, { forwardRef } from 'react';
import Image from 'next/image';
import { ABOUT_DATA } from '@/utils/constants';

export const AboutPortrait = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="lg:col-span-5 space-y-6">
      <div className="relative group overflow-hidden border border-white/20 bg-surface-container-low/70 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-sm">
        {/* Neon Accent Corner Brackets */}
        <span
          className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-primary z-20 pointer-events-none"
          aria-hidden="true"
        />
        <span
          className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-primary z-20 pointer-events-none"
          aria-hidden="true"
        />
        <span
          className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-primary z-20 pointer-events-none"
          aria-hidden="true"
        />
        <span
          className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-primary z-20 pointer-events-none"
          aria-hidden="true"
        />

        {/* Portrait Image Container */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-container">
          <Image
            src={ABOUT_DATA.image}
            alt={ABOUT_DATA.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
            priority={false}
          />
          <div
            className="absolute inset-0 bg-primary/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-700 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {/* Integrated Portrait Footer Caption */}
        <div className="p-4 sm:p-5 bg-surface-container border-t border-white/10 font-mono text-[11px] space-y-2">
          <div className="flex items-center justify-between text-white font-bold tracking-wider uppercase">
            <span>{ABOUT_DATA.portraitCaption.name}</span>
            <span className="flex items-center gap-1.5 text-primary text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              {ABOUT_DATA.portraitCaption.status}
            </span>
          </div>
          <div className="flex items-center justify-between text-secondary/70 text-[10px] tracking-wider uppercase">
            <span>{ABOUT_DATA.portraitCaption.role}</span>
            <span className="text-primary font-semibold">{ABOUT_DATA.portraitCaption.organization}</span>
          </div>
          <div className="flex items-center justify-between text-secondary/50 text-[9px] tracking-widest uppercase pt-1 border-t border-white/5">
            <span>{ABOUT_DATA.portraitCaption.degree}</span>
            <span>{ABOUT_DATA.portraitCaption.location}</span>
          </div>
        </div>
      </div>

      {/* Quick Specs Strip */}
      <div className="grid grid-cols-2 gap-2 font-mono text-[10px]">
        {ABOUT_DATA.specs.map((spec) => (
          <div
            key={spec.label}
            className="p-3 border border-white/10 bg-surface-container-low/40 backdrop-blur-xs flex flex-col gap-1"
          >
            <span className="text-secondary/50 uppercase tracking-widest">{spec.label}</span>
            <span className="text-white font-bold uppercase tracking-wider">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

AboutPortrait.displayName = 'AboutPortrait';
