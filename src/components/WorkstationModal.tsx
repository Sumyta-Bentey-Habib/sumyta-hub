'use client';

import React from 'react';
import { HERO_DATA, COLOR_TOKENS } from '@/utils/constants';

interface WorkstationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WorkstationModal({ isOpen, onClose }: WorkstationModalProps) {
  if (!isOpen) return null;

  const loc = HERO_DATA.locations.find((l) => l.id === 'xiia');
  if (!loc || !('role' in loc)) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={HERO_DATA.modalId}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md pointer-events-auto"
      onClick={onClose}
    >
      <div
        style={{ backgroundColor: COLOR_TOKENS.surfaceContainer }}
        className="w-full max-w-lg border-2 border-primary p-6 md:p-8 font-mono shadow-[0_0_50px_rgba(255,45,117,0.4)] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-outlineVariant/50 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 bg-primary animate-pulse" />
            <div>
              <h2 id={HERO_DATA.modalId} className="text-sm md:text-base font-black tracking-wider text-white uppercase leading-none">
                {HERO_DATA.modalRoleHeading}
              </h2>
              <span className="text-[10px] text-outline font-semibold tracking-widest uppercase mt-1 block">
                {HERO_DATA.modalDossierTag}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={HERO_DATA.closeModalAria}
            className="px-2.5 py-1 text-xs border border-outlineVariant/70 text-secondary hover:text-black hover:bg-primary hover:border-primary transition-all cursor-pointer font-bold"
          >
            ✕ {HERO_DATA.closeModalLabel}
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-4 text-xs md:text-sm">
          <div className="flex items-center justify-between py-1 border-b border-outlineVariant/20">
            <span className="text-outline uppercase text-[11px]">{HERO_DATA.modalCompanyLabel}:</span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white uppercase tracking-wider">{loc.company}</span>
              <span className="px-2 py-0.5 border border-primary/40 text-[9px] text-primary bg-primary/10 tracking-widest uppercase font-bold">
                {HERO_DATA.modalVerifiedBadge}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-outlineVariant/20">
            <span className="text-outline uppercase text-[11px]">{HERO_DATA.modalRoleLabel}:</span>
            <span className="font-bold text-primary uppercase tracking-wider">{loc.role}</span>
          </div>

          <div className="py-2 border-b border-outlineVariant/20">
            <span className="text-outline uppercase text-[11px] block mb-1.5">{HERO_DATA.modalScopeLabel}:</span>
            <p className="text-secondary leading-relaxed bg-black/40 p-3 border border-outlineVariant/30">
              {loc.desc}
            </p>
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 border border-outlineVariant/60 text-secondary hover:text-white hover:border-white uppercase text-xs transition-colors cursor-pointer"
            >
              {HERO_DATA.modalDismissAction}
            </button>
            <a
              href={HERO_DATA.modalActionHref}
              onClick={onClose}
              className="w-full sm:w-auto text-center px-5 py-2.5 bg-primary text-black font-black uppercase text-xs hover:bg-white transition-all shadow-[0_0_20px_rgba(255,45,117,0.35)]"
            >
              {HERO_DATA.modalActionLabel}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
