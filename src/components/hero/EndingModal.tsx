'use client';

import React from 'react';
import { HERO_DATA } from '@/utils/constants';
import styles from './HeroModals.module.css';

interface EndingModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onNavigateWork: () => void;
}

export default function EndingModal({ isOpen, onClose, onNavigateWork }: EndingModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={HERO_DATA.endingModalId}
      className={styles.backdrop}
      onClick={onClose}
    >
      <div
        className={`${styles.dialog} ${styles.endingDialog}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── STEPPED PIXEL CORNER BRACKETS ── */}
        <span className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-accent-yellow pointer-events-none" aria-hidden="true" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent-yellow pointer-events-none" aria-hidden="true" />
        <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-accent-yellow pointer-events-none" aria-hidden="true" />
        <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-accent-yellow pointer-events-none" aria-hidden="true" />

        {/* ── TOP NEON EDGE GLOW ACCENT ── */}
        <div
          className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-accent-yellow/80 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
              <span className="w-3 h-3 rotate-45 border border-accent-yellow bg-accent-yellow/20 animate-pulse" />
              <span className="absolute w-1.5 h-1.5 rotate-45 bg-accent-yellow" />
            </div>
            <div>
              <h2 id={HERO_DATA.endingModalId} className="text-sm md:text-base font-black tracking-wider text-white uppercase leading-none font-headline">
                {HERO_DATA.endingHeading}
              </h2>
              <span className="font-mono text-[10px] text-accent-yellow/80 tracking-widest uppercase block mt-0.5">
                {HERO_DATA.endingSubheading}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={HERO_DATA.closeModalAria}
            className="group relative flex items-center justify-center w-8 h-8 rounded-xs border border-white/15 bg-white/[0.03] text-secondary/80 hover:text-white hover:border-accent-yellow/60 hover:bg-accent-yellow/10 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-yellow shrink-0"
          >
            <span className="sr-only">{HERO_DATA.closeModalAria}</span>
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-90"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-xs md:text-sm">
          <p className="text-secondary/90 leading-relaxed bg-black/50 p-4 border border-white/10 border-l-2 border-l-accent-yellow font-sans">
            {HERO_DATA.endingDescription}
          </p>

          <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/10 bg-white/[0.02] px-4 font-mono">
            <div>
              <span className="block text-[10px] text-secondary/50 uppercase tracking-widest">{HERO_DATA.endingScoreLabel}</span>
              <span className="font-bold text-accent-yellow uppercase tracking-wider text-xs sm:text-sm">
                {HERO_DATA.endingScoreValue}
              </span>
            </div>
            <div>
              <span className="block text-[10px] text-secondary/50 uppercase tracking-widest">{HERO_DATA.endingRoleLabel}</span>
              <span className="font-bold text-white uppercase tracking-wider text-xs sm:text-sm">{HERO_DATA.endingRoleValue}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-3 mt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 border border-white/15 bg-white/[0.02] text-secondary/70 hover:text-white hover:border-white/40 uppercase text-xs font-mono transition-colors cursor-pointer"
            >
              {HERO_DATA.endingSecondaryAction}
            </button>
            <button
              type="button"
              onClick={onNavigateWork}
              className={`w-full sm:w-auto px-6 py-2.5 font-headline font-black uppercase text-xs tracking-wider border border-accent-yellow cursor-pointer ${styles.endingAction}`}
            >
              {HERO_DATA.endingPrimaryAction}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
