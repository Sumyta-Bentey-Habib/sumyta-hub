'use client';

import React from 'react';
import { HERO_DATA, COLOR_TOKENS } from '@/utils/constants';

interface EndingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateWork: () => void;
}

export default function EndingModal({ isOpen, onClose, onNavigateWork }: EndingModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={HERO_DATA.endingModalId}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md pointer-events-auto"
      onClick={onClose}
    >
      <div
        style={{ backgroundColor: COLOR_TOKENS.surfaceContainer }}
        className="w-full max-w-lg border-2 border-accentYellow p-6 md:p-8 font-mono shadow-[0_0_60px_rgba(255,210,0,0.35)] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-outlineVariant/50 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 bg-accentYellow animate-pulse" />
            <h2 id={HERO_DATA.endingModalId} className="text-sm md:text-base font-black tracking-wider text-white uppercase leading-none">
              {HERO_DATA.endingHeading}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={HERO_DATA.closeModalAria}
            className="px-2.5 py-1 text-xs border border-outlineVariant/70 text-secondary hover:text-black hover:bg-accentYellow hover:border-accentYellow transition-all cursor-pointer font-bold"
          >
            ✕ {HERO_DATA.closeModalLabel}
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-xs md:text-sm">
          <p className="text-secondary leading-relaxed bg-black/40 p-3 border border-outlineVariant/30">
            {HERO_DATA.endingDescription}
          </p>

          <div className="grid grid-cols-2 gap-3 py-3 border-y border-outlineVariant/20 bg-black/40 px-3">
            <div>
              <span className="block text-[10px] text-outline uppercase">{HERO_DATA.endingScoreLabel}</span>
              <span className="font-bold text-accentYellow uppercase tracking-wider">{HERO_DATA.endingScoreValue}</span>
            </div>
            <div>
              <span className="block text-[10px] text-outline uppercase">{HERO_DATA.endingRoleLabel}</span>
              <span className="font-bold text-white uppercase tracking-wider">{HERO_DATA.endingRoleValue}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 border border-outlineVariant/60 text-secondary hover:text-white hover:border-white uppercase text-xs transition-colors cursor-pointer"
            >
              {HERO_DATA.endingSecondaryAction}
            </button>
            <button
              type="button"
              onClick={onNavigateWork}
              className="w-full sm:w-auto px-5 py-2.5 bg-accentYellow text-black font-black uppercase text-xs hover:bg-white transition-all shadow-[0_0_20px_rgba(255,210,0,0.4)] cursor-pointer"
            >
              {HERO_DATA.endingPrimaryAction}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
