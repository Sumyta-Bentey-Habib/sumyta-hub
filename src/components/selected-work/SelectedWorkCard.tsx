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

      <div className="space-y-4">
        {/* ── CARD TOP BEZEL: INDEX & PRODUCTION NODE ── */}
        <div className="flex items-center justify-between pb-2 border-b border-white/10 font-mono text-xs">
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

        {/* ── VISUAL PROMINENCE: 16:9 ABSTRACT COMPOSITION ── */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm border border-white/10 bg-black/90">
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
        <div className="space-y-2 pt-1">
          <h3
            id={`selected-work-${project.id}`}
            className="text-2xl sm:text-3xl font-headline font-black uppercase text-white tracking-tight"
          >
            {project.name}
          </h3>

          <p className="font-sans text-xs sm:text-sm text-secondary/85 leading-relaxed min-h-[44px]">
            {project.description}
          </p>
        </div>

        {/* ── CONTRIBUTION EDITORIAL BLOCK ── */}
        <div className="space-y-1.5 pt-2">
          <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-secondary/60">
            {`${SELECTED_WORK_DATA.labels.contributionLabel} //`}
          </div>

          <div
            className={`font-mono text-xs sm:text-sm font-semibold text-white/95 bg-white/[0.03] p-3 border-l-2 ${accent.leftBar} rounded-r-xs`}
          >
            {project.contribution}
          </div>
        </div>
      </div>

      {/* ── VERIFIED TECHNOLOGIES PILL STRIP ── */}
      <div className="space-y-2 pt-4 mt-4 border-t border-white/10">
        <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-secondary/60">
          {`${SELECTED_WORK_DATA.labels.technologiesLabel} //`}
        </div>

        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[11px] px-2.5 py-1 border border-white/10 bg-white/[0.02] text-white/85 rounded-xs hover:border-white/30 transition-colors uppercase tracking-wider"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

SelectedWorkCard.displayName = 'SelectedWorkCard';

