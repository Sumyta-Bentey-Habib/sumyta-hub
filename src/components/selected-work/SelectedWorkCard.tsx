'use client';

import React from 'react';
import { SELECTED_WORK_DATA, SelectedWorkProject } from '@/utils/constants';
import { SelectedWorkParticleImage } from './SelectedWorkParticleImage';
import { ProjectParticleVariant } from '@/utils/selected-work';

interface SelectedWorkCardProps {
  readonly project: SelectedWorkProject;
  readonly priority?: boolean;
}

const getAccentClasses = (accent: 'primary' | 'windowAmber' | 'accentCyan') => {
  switch (accent) {
    case 'accentCyan':
      return {
        text: 'text-accent-cyan',
        border: 'border-accent-cyan/40',
        bg: 'bg-accent-cyan',
        leftBar: 'border-l-accent-cyan',
        badgeBg: 'bg-accent-cyan/10',
        badgeBorder: 'border-accent-cyan/30',
        glow: 'hover:shadow-[0_0_24px_rgba(0,242,254,0.14)]',
        button:
          'text-accent-cyan hover:text-black bg-accent-cyan/10 hover:bg-accent-cyan border-accent-cyan/30 hover:border-accent-cyan shadow-[0_0_12px_rgba(0,242,254,0.15)] hover:shadow-[0_0_20px_rgba(0,242,254,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan',
      };
    case 'windowAmber':
      return {
        text: 'text-window-amber',
        border: 'border-window-amber/40',
        bg: 'bg-window-amber',
        leftBar: 'border-l-window-amber',
        badgeBg: 'bg-window-amber/10',
        badgeBorder: 'border-window-amber/30',
        glow: 'hover:shadow-[0_0_24px_rgba(255,184,108,0.14)]',
        button:
          'text-window-amber hover:text-black bg-window-amber/10 hover:bg-window-amber border-window-amber/30 hover:border-window-amber shadow-[0_0_12px_rgba(255,184,108,0.15)] hover:shadow-[0_0_20px_rgba(255,184,108,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-window-amber',
      };
    case 'primary':
    default:
      return {
        text: 'text-primary',
        border: 'border-primary/40',
        bg: 'bg-primary',
        leftBar: 'border-l-primary',
        badgeBg: 'bg-primary/10',
        badgeBorder: 'border-primary/30',
        glow: 'hover:shadow-[0_0_24px_rgba(255,45,117,0.14)]',
        button:
          'text-primary hover:text-black bg-primary/10 hover:bg-primary border-primary/30 hover:border-primary shadow-[0_0_12px_rgba(255,45,117,0.15)] hover:shadow-[0_0_20px_rgba(255,45,117,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
      };
  }
};

export const SelectedWorkCard: React.FC<SelectedWorkCardProps> = ({ project, priority = false }) => {
  const accent = getAccentClasses(project.accent);

  return (
    <article
      className={`selected-work-card group relative flex flex-col justify-between rounded-sm border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] p-4 sm:p-5 transition-all duration-300 hover:border-white/25 ${accent.glow}`}
      aria-labelledby={`selected-work-${project.id}`}
    >
      {/* ── STEPPED PIXEL CORNER BRACKETS ── */}
      <span
        className={`absolute -top-0.5 -left-0.5 w-2 h-2 ${accent.bg} opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
        aria-hidden="true"
      />
      <span
        className={`absolute -top-0.5 -right-0.5 w-2 h-2 ${accent.bg} opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
        aria-hidden="true"
      />
      <span
        className={`absolute -bottom-0.5 -left-0.5 w-2 h-2 ${accent.bg} opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
        aria-hidden="true"
      />
      <span
        className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 ${accent.bg} opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
        aria-hidden="true"
      />

      {/* ── CARD UPPER SECTION ── */}
      <div className="flex flex-col flex-1">
        {/* ── CARD TOP BEZEL: INDEX & PRODUCTION NODE ── */}
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className={`${accent.text} font-bold tracking-widest text-[11px]`}>
              {`${SELECTED_WORK_DATA.labels.indexPrefix}${project.number}`}
            </span>
            <span className="text-white/20 select-none">{'/'}</span>
            <span className="text-secondary/60 text-[10px] tracking-wider uppercase">
              {project.clientLabel}
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-xs bg-black/60 border border-white/10">
            <span className={`w-1.5 h-1.5 rounded-full ${accent.bg} animate-pulse`} aria-hidden="true" />
            <span className="text-[9px] font-mono uppercase tracking-wider text-secondary/70">
              {SELECTED_WORK_DATA.labels.abstractNotice}
            </span>
          </div>
        </div>

        {/* ── VISUAL PROMINENCE: STANDARDIZED 16:9 ABSTRACT COMPOSITION ── */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xs border border-white/10 bg-black/90 mb-3.5">
          <SelectedWorkParticleImage
            src={project.image}
            alt={project.imageAlt}
            variant={project.id as ProjectParticleVariant}
            priority={priority}
          />

          {/* Restrained phosphor vignette overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10 pointer-events-none z-20"
            aria-hidden="true"
          />

          {/* Category Pill Tag Overlay */}
          <div className="absolute top-2.5 left-2.5 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-black/85 border border-white/15 backdrop-blur-sm font-mono text-[10px] uppercase tracking-wider text-white">
            <span className={`w-1.5 h-1.5 rounded-full ${accent.bg}`} aria-hidden="true" />
            <span>{project.category}</span>
          </div>
        </div>

        {/* ── PROJECT IDENTITY & DESCRIPTION ── */}
        <div className="space-y-1.5">
          <h3
            id={`selected-work-${project.id}`}
            className="text-xl sm:text-2xl font-headline font-black uppercase text-white tracking-tight"
          >
            {project.name}
          </h3>

          <p className="font-sans text-xs sm:text-[13px] text-secondary/80 leading-relaxed min-h-[3.6rem] sm:min-h-[3.8rem] flex items-start">
            {project.description}
          </p>
        </div>

        {/* ── CONTRIBUTION EDITORIAL CALLOUT ── */}
        {project.contribution && (
          <div className="mt-3 space-y-1.5">
            <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-secondary/60">
              {`${project.contributionLabel || SELECTED_WORK_DATA.labels.contributionLabel} //`}
            </div>

            <div
              className={`font-mono text-xs sm:text-[13px] text-white/95 bg-white/[0.03] px-3 py-2 sm:py-2.5 border-l-2 ${accent.leftBar} rounded-r-xs flex items-center min-h-[44px] sm:min-h-[48px] leading-snug`}
            >
              {project.contribution}
            </div>
          </div>
        )}
      </div>

      {/* ── VERIFIED TECHNOLOGIES & PRODUCT ACTION ── */}
      <div className="mt-3.5 pt-3 border-t border-white/10 space-y-3">
        <div className="space-y-1.5">
          <div className="font-mono text-[10px] uppercase tracking-widest text-secondary/60">
            {`${SELECTED_WORK_DATA.labels.technologiesLabel} //`}
          </div>

          <div className="flex flex-wrap gap-1.5 min-h-[48px] sm:min-h-[52px] items-start">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[11px] px-2.5 py-0.5 border border-white/10 bg-white/[0.02] text-white/85 rounded-xs hover:border-white/30 transition-colors uppercase tracking-wider"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ── OFFICIAL PRODUCT WEBSITE LINK ── */}
        <div className="pt-0.5">
          <a
            href={project.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${SELECTED_WORK_DATA.labels.visitProductAriaPrefix} ${project.name}`}
            className={`w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xs font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 border cursor-pointer group/link ${accent.button}`}
          >
            <span>{SELECTED_WORK_DATA.labels.visitProduct}</span>
          </a>
        </div>
      </div>
    </article>
  );
};

SelectedWorkCard.displayName = 'SelectedWorkCard';
