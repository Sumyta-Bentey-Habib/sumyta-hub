'use client';

import React from 'react';
import { HERO_DATA } from '@/utils/constants';

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm pointer-events-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-surfaceContainer border border-primary p-6 md:p-8 font-mono shadow-[0_0_40px_rgba(255,45,117,0.35)] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-outlineVariant/40 pb-4 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-primary" />
            <h2 id={HERO_DATA.modalId} className="text-sm md:text-base font-black tracking-wider text-white uppercase">
              {HERO_DATA.modalRoleHeading}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={HERO_DATA.closeModalAria}
            className="px-2 py-1 text-xs border border-outlineVariant/60 text-secondary hover:text-white hover:border-primary transition-colors cursor-pointer"
          >
            {HERO_DATA.closeModalLabel}
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-4 text-xs md:text-sm">
          <div className="grid grid-cols-3 gap-2 py-2 border-b border-outlineVariant/20">
            <span className="text-outline uppercase">{HERO_DATA.modalCompanyLabel}:</span>
            <span className="col-span-2 font-bold text-white uppercase">{loc.company}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 py-2 border-b border-outlineVariant/20">
            <span className="text-outline uppercase">{HERO_DATA.modalRoleLabel}:</span>
            <span className="col-span-2 font-bold text-primary uppercase">{loc.role}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 py-2 border-b border-outlineVariant/20">
            <span className="text-outline uppercase">{HERO_DATA.modalScopeLabel}:</span>
            <p className="col-span-2 text-secondary leading-relaxed">{loc.desc}</p>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <a
              href={HERO_DATA.modalActionHref}
              onClick={onClose}
              className="px-4 py-2 bg-primary text-black font-black uppercase text-xs hover:bg-white transition-colors"
            >
              {HERO_DATA.modalActionLabel}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
