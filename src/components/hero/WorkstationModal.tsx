'use client';

import React from 'react';
import { HERO_DATA } from '@/utils/constants';
import styles from './HeroModals.module.css';

interface WorkstationModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
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
      className={styles.backdrop}
      onClick={onClose}
    >
      <div
        className={`${styles.dialog} ${styles.workstationDialog}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── STEPPED PIXEL CORNER BRACKETS ── */}
        <span className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-primary pointer-events-none" aria-hidden="true" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary pointer-events-none" aria-hidden="true" />
        <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-primary pointer-events-none" aria-hidden="true" />
        <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-primary pointer-events-none" aria-hidden="true" />

        {/* ── TOP NEON EDGE GLOW ACCENT ── */}
        <div
          className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* ── MODAL HEADER ── */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
              <span className="w-3 h-3 rotate-45 border border-primary bg-primary/20 animate-pulse" />
              <span className="absolute w-1.5 h-1.5 rotate-45 bg-primary" />
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-widest uppercase text-primary font-bold">
                {HERO_DATA.modalRoleHeading}
              </div>
              <span className="font-mono text-[10px] text-secondary/50 tracking-widest uppercase block mt-0.5">
                {HERO_DATA.modalDossierTag}
              </span>
            </div>
          </div>

          {/* Clean cross close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label={HERO_DATA.closeModalAria}
            className="group relative flex items-center justify-center w-8 h-8 rounded-xs border border-white/15 bg-white/[0.03] text-secondary/80 hover:text-white hover:border-primary/60 hover:bg-primary/10 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary shrink-0"
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

        {/* ── MODAL BODY ── */}
        <div className="space-y-4">
          {/* Organization & Role Hero Dossier Panel */}
          <div className="rounded-sm border border-white/10 bg-white/[0.02] p-4 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-secondary/60">
                {HERO_DATA.modalCompanyLabel} {'//'}
              </span>
              <span className="px-2 py-0.5 border border-primary/40 text-[9px] text-primary bg-primary/10 tracking-widest uppercase font-mono font-bold rounded-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
                {HERO_DATA.modalVerifiedBadge}
              </span>
            </div>

            <div className="space-y-0.5">
              <h3 className="text-2xl sm:text-3xl font-headline font-black text-white uppercase tracking-tight">
                {loc.company}
              </h3>
              <p id={HERO_DATA.modalId} className="font-mono text-xs sm:text-sm font-bold text-primary uppercase tracking-wider">
                {loc.role}
              </p>
            </div>

            <div className="pt-2 border-t border-white/5 font-mono text-[10px] text-secondary/50 uppercase tracking-wider">
              {HERO_DATA.modalLocationLabel}
            </div>
          </div>

          {/* Engineering Scope Panel */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-secondary/60">
              <span>{HERO_DATA.modalScopeLabel} {'//'}</span>
              <span className="text-[9px] text-accent-cyan tracking-wider">PRODUCTION SCOPE</span>
            </div>

            <div className="rounded-sm border border-white/10 bg-black/60 p-3.5 sm:p-4 border-l-2 border-l-primary font-sans text-xs sm:text-sm text-secondary/90 leading-relaxed shadow-inner">
              {loc.desc}
            </div>
          </div>

          {/* Production Technologies Pill Strip */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {HERO_DATA.modalTechScope.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] px-2.5 py-0.5 border border-white/10 bg-white/[0.02] text-white/80 rounded-xs uppercase tracking-wider"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* ── MODAL FOOTER ACTIONS (CLEAN, NO REDUNDANT CLOSE BUTTON) ── */}
          <div className="pt-3 mt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="font-mono text-[10px] text-secondary/40 tracking-wider hidden sm:flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded-xs bg-white/5 border border-white/10 text-[9px] text-secondary/60">
                ESC
              </kbd>
              <span>{HERO_DATA.modalEscHint}</span>
            </div>

            <a
              href={HERO_DATA.modalActionHref}
              onClick={onClose}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 font-headline font-black uppercase text-xs tracking-wider border border-primary cursor-pointer group ${styles.workstationAction}`}
            >
              <span>{HERO_DATA.modalActionLabel}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
