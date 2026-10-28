'use client';

import React from 'react';
import { PROJECTS_DATA, ProjectItem } from '@/utils/constants';

interface ProjectDestinationDockProps {
  activeProjectIndex: number;
  onSelectProject: (index: number) => void;
}

export const ProjectDestinationDock: React.FC<ProjectDestinationDockProps> = ({
  activeProjectIndex,
  onSelectProject,
}) => {
  const projects = PROJECTS_DATA.projects as readonly ProjectItem[];
  const project = projects[activeProjectIndex];

  if (!project) return null;

  const total = projects.length;
  const prevIndex = (activeProjectIndex - 1 + total) % total;
  const nextIndex = (activeProjectIndex + 1) % total;

  const accentColorClass =
    project.themeAccent === 'primary'
      ? 'text-primary'
      : project.themeAccent === 'windowAmber'
      ? 'text-window-amber'
      : project.themeAccent === 'accentCyan'
      ? 'text-accent-cyan'
      : 'text-finish-gold';

  const accentBorderClass =
    project.themeAccent === 'primary'
      ? 'border-primary'
      : project.themeAccent === 'windowAmber'
      ? 'border-window-amber'
      : project.themeAccent === 'accentCyan'
      ? 'border-accent-cyan'
      : 'border-finish-gold';

  const accentBgClass =
    project.themeAccent === 'primary'
      ? 'bg-primary'
      : project.themeAccent === 'windowAmber'
      ? 'bg-window-amber'
      : project.themeAccent === 'accentCyan'
      ? 'bg-accent-cyan'
      : 'bg-finish-gold';

  return (
    <div className="w-full space-y-6">
      {/* ── HIGHWAY STATION DOCK CONTROLS ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className={`w-2 h-2 ${accentBgClass} rotate-45 inline-block shrink-0`} aria-hidden="true" />
          <span className="text-secondary-dim/70">DESTINATION //</span>
          <span className="font-bold text-white uppercase tracking-wider">
            {project.exitCode} OF {total.toString().padStart(2, '0')}
          </span>
          <span className="text-white/20 select-none">/</span>
          <span className={`${accentColorClass} font-semibold uppercase tracking-wider`}>
            {project.landmarkTitle}
          </span>
        </div>

        {/* Prev / Next Highway Jump Navigation */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onSelectProject(prevIndex)}
            className="px-3 py-1.5 border border-white/15 bg-surface-container hover:border-white/40 hover:text-white text-secondary-dim/80 transition-colors uppercase tracking-wider text-[11px] focus:outline-none"
            aria-label={`Cruise back to ${projects[prevIndex].title}`}
          >
            ◀ PREV EXIT
          </button>

          <span className="text-secondary-dim/40 px-1">
            {project.number} / {total.toString().padStart(2, '0')}
          </span>

          <button
            type="button"
            onClick={() => onSelectProject(nextIndex)}
            className="px-3 py-1.5 border border-white/15 bg-surface-container hover:border-white/40 hover:text-white text-secondary-dim/80 transition-colors uppercase tracking-wider text-[11px] focus:outline-none"
            aria-label={`Cruise forward to ${projects[nextIndex].title}`}
          >
            NEXT EXIT ▶
          </button>
        </div>
      </div>

      {/* ── MAIN DESTINATION SHOWCASE STAGE (SPLIT VIEW) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-2">
        {/* Left Column: Project Specifications & Real Role Breakdown */}
        <div className="lg:col-span-6 space-y-6">
          {/* Waypoint Meta Header */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider border ${accentBorderClass} ${accentColorClass} bg-black/60`}>
                {project.exitCode}
              </span>

              <span className="font-mono text-[11px] tracking-wider text-secondary-dim/70 uppercase">
                {project.waypointLabel}
              </span>

              {project.isGroupProject && project.groupBadge && (
                <span className="px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider border border-white/20 text-white/90 bg-white/5">
                  {project.groupBadge}
                </span>
              )}
            </div>

            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-black uppercase tracking-tight text-white mt-1">
              {project.title}
            </h3>

            <p className="text-base font-sans font-medium text-secondary-dim/90">
              {project.subtitle}
            </p>
          </div>

          {/* Role / Focus Statement */}
          <div className={`p-3.5 border-l-2 bg-surface-container/60 ${accentBorderClass}`}>
            <div className="font-mono text-[10px] uppercase tracking-widest text-secondary-dim/70 mb-1">
              {PROJECTS_DATA.roleLabel}
            </div>
            <div className="text-sm font-sans font-semibold text-white leading-relaxed">
              {project.role}
            </div>
          </div>

          {/* Genuine Narrative Description */}
          <p className="text-sm font-sans text-secondary-dim/90 leading-relaxed">
            {project.description}
          </p>

          {/* Verified Technologies Used */}
          <div className="space-y-2.5 pt-1">
            <div className="font-mono text-[10px] uppercase tracking-widest text-secondary-dim/70">
              {PROJECTS_DATA.techLabel}
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[11px] px-2.5 py-1 border border-white/10 bg-black/50 text-white/90 hover:border-white/30 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Verified Action Links: Live Demo & Source Code */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${accentBorderClass} ${accentColorClass} bg-transparent hover:bg-white hover:text-black hover:border-white shadow-[0_0_15px_rgba(255,255,255,0.1)]`}
                aria-label={`Open live demo for ${project.title}`}
              >
                <span>{PROJECTS_DATA.demoButtonText}</span>
              </a>
            )}

            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-secondary-dim hover:text-white border border-white/20 bg-surface-container/80 hover:border-white/50 transition-all duration-200"
                aria-label={`Open source code repository for ${project.title}`}
              >
                <span>{PROJECTS_DATA.githubButtonText}</span>
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Verified Project Screenshot Preview & Interface Screen */}
        <div className="lg:col-span-6">
          <div className="relative border border-white/10 bg-black/90 p-2 shadow-2xl group overflow-hidden">
            {/* Top Monitor Bar */}
            <div className="flex items-center justify-between px-3 py-1.5 bg-surface-container/80 border-b border-white/10 font-mono text-[10px] text-secondary-dim/70 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" aria-hidden="true" />
                <span className="uppercase tracking-wider">INTERFACE PREVIEW // {project.number}</span>
              </div>
              <span className="tracking-widest uppercase">{project.category}</span>
            </div>

            {/* Genuine Screenshot Visual */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-lowest border border-white/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={project.imageAlt}
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] filter contrast-[1.05]"
              />

              {/* CRT Scanline Overlay Effect */}
              <div
                className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-black/[0.04] to-black/20"
                aria-hidden="true"
              />

              {/* Corner Pixel Crosshairs */}
              <div className="absolute top-2 left-2 font-mono text-[9px] text-white/40 pointer-events-none">
                [+ PREVIEW]
              </div>
              <div className="absolute bottom-2 right-2 font-mono text-[9px] text-white/40 pointer-events-none">
                [SYS_LIVE]
              </div>
            </div>

            {/* Bottom Interface Telemetry Strip */}
            <div className="flex items-center justify-between px-3 py-2 mt-2 bg-surface-container/50 border-t border-white/5 font-mono text-[10px] text-secondary-dim/60">
              <span>PLATFORM: {project.category.toUpperCase()}</span>
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline uppercase"
                >
                  VISIT DEPLOYMENT ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
