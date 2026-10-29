'use client';

import React from 'react';
import { PROJECTS_DATA, ProjectItem } from '@/utils/constants';

interface DevLabTechnicalReadoutProps {
  activeProjectIndex: number;
  onSelectProject: (index: number) => void;
}

export const DevLabTechnicalReadout: React.FC<DevLabTechnicalReadoutProps> = ({
  activeProjectIndex,
  onSelectProject,
}) => {
  const projects = PROJECTS_DATA.projects as readonly ProjectItem[];
  const project = projects[activeProjectIndex] || projects[0];
  const total = projects.length;

  const prevIndex = (activeProjectIndex - 1 + total) % total;
  const nextIndex = (activeProjectIndex + 1) % total;

  return (
    <div
      id={`project-panel-${project.id}`}
      role="tabpanel"
      aria-labelledby={`project-tab-${project.id}`}
      className="w-full min-h-[440px] sm:min-h-[420px] rounded-sm border border-white/15 bg-[#090714] shadow-lg p-3.5 sm:p-5 space-y-4 font-mono text-xs relative overflow-hidden"
    >
      {/* ── TOP DOSSIER BAR: HEADER & STATUS ── */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-white/10 select-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-primary rotate-45 inline-block shrink-0" aria-hidden="true" />
          <span className="text-secondary-dim/70 uppercase tracking-widest text-[10px]">
            {PROJECTS_DATA.infoPanelHeaderTag}
          </span>
          <span className="text-white/20 select-none">/</span>
          <span className="text-white font-bold tracking-wider text-[11px]">
            {project.exitCode}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {project.isGroupProject ? (
            <span className="px-2 py-0.5 rounded-sm bg-primary/10 text-primary border border-primary/30 text-[9px] font-bold tracking-widest uppercase">
              {PROJECTS_DATA.groupProjectBadge}
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-sm bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30 text-[9px] font-bold tracking-widest uppercase">
              SOLO ARCHITECTURE
            </span>
          )}

          <span className="text-white/40 text-[10px]">
            [{String(activeProjectIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}]
          </span>
        </div>
      </div>

      {/* ── PROJECT TITLE & SUBTITLE ── */}
      <div>
        <div className="flex flex-wrap items-baseline gap-2 mb-1">
          <h3 className="text-xl sm:text-2xl font-headline font-bold uppercase text-white tracking-tight">
            {project.title}
          </h3>
          <span className="text-[11px] text-accent-cyan tracking-wider uppercase">
            {'//'} {project.category}
          </span>
        </div>
        <p className="text-xs sm:text-sm font-sans text-secondary-dim/80 leading-snug">
          {project.subtitle}
        </p>
      </div>

      {/* ── ROLE / ARCHITECTURE FOCUS BOX ── */}
      <div className="p-2.5 rounded-sm bg-black/60 border border-white/10 space-y-1">
        <span className="text-[10px] text-primary uppercase tracking-widest font-bold block">
          {PROJECTS_DATA.roleLabel}
        </span>
        <p className="text-xs text-white/90 leading-relaxed font-sans">
          {project.role}
        </p>
      </div>

      {/* ── CONCISE PROJECT SUMMARY DESCRIPTION ── */}
      <p className="text-xs sm:text-sm font-sans text-secondary-dim/90 leading-relaxed">
        {project.description}
      </p>

      {/* ── TECH STACK SPECIFICATIONS ── */}
      <div className="space-y-1.5">
        <span className="text-[10px] uppercase tracking-widest text-secondary-dim/70 block">
          {PROJECTS_DATA.techLabel}
        </span>
        <div className="flex flex-wrap gap-1.5" aria-label={PROJECTS_DATA.techLabel}>
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-sm bg-black/60 border border-white/10 text-white/90 text-[10px] sm:text-[11px] tracking-wide hover:border-primary/50 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* ── ACTION BUTTONS & STEPPERS ── */}
      <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-2">
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${PROJECTS_DATA.launchProjectAria}: ${project.title}`}
              className="px-3.5 py-1.5 rounded-sm bg-primary text-black text-xs font-bold tracking-wider hover:bg-primary-neon hover:shadow-[0_0_15px_rgba(255,45,117,0.35)] transition-all duration-200 inline-flex items-center gap-1.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
            >
              <span>{PROJECTS_DATA.demoButtonText}</span>
              <span className="transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
          )}

          {/* Frontend Repository */}
          {(project.links.frontend || (project.links.serverGithub && project.links.github)) && (
            <a
              href={project.links.frontend || project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${PROJECTS_DATA.githubProjectAria}: ${project.title} Frontend`}
              className="px-2.5 py-1.5 rounded-sm bg-black/60 text-white border border-white/20 text-xs font-bold tracking-wider hover:bg-white/10 hover:border-accent-cyan hover:text-accent-cyan transition-all duration-200 inline-flex items-center gap-1 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
            >
              <span>{PROJECTS_DATA.frontendButtonText}</span>
              <span className="transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
          )}

          {/* Backend Repository */}
          {(project.links.backend || project.links.serverGithub) && (
            <a
              href={project.links.backend || project.links.serverGithub}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${PROJECTS_DATA.githubProjectAria}: ${project.title} Backend`}
              className="px-2.5 py-1.5 rounded-sm bg-black/60 text-white border border-white/20 text-xs font-bold tracking-wider hover:bg-white/10 hover:border-primary hover:text-primary transition-all duration-200 inline-flex items-center gap-1 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
            >
              <span>{PROJECTS_DATA.backendButtonText}</span>
              <span className="transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
          )}

          {/* Monorepo / Single Repo (when not split into frontend & backend) */}
          {!project.links.frontend && !project.links.backend && !project.links.serverGithub && project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${PROJECTS_DATA.githubProjectAria}: ${project.title}`}
              className="px-3 py-1.5 rounded-sm bg-black/60 text-white border border-white/20 text-xs font-bold tracking-wider hover:bg-white/10 hover:border-white/40 transition-all duration-200 inline-flex items-center gap-1.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
            >
              <span>{project.links.isMonorepo ? PROJECTS_DATA.monorepoButtonText : PROJECTS_DATA.githubButtonText}</span>
              <span className="transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
          )}
        </div>

        {/* Stepper Controls */}
        <div className="flex items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => onSelectProject(prevIndex)}
            aria-label={`${PROJECTS_DATA.prevRuntimeLabel}: ${projects[prevIndex].title}`}
            className="px-2.5 py-1 rounded-sm bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:border-white/30 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {PROJECTS_DATA.prevRuntimeLabel}
          </button>
          <button
            type="button"
            onClick={() => onSelectProject(nextIndex)}
            aria-label={`${PROJECTS_DATA.nextRuntimeLabel}: ${projects[nextIndex].title}`}
            className="px-2.5 py-1 rounded-sm bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:border-white/30 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {PROJECTS_DATA.nextRuntimeLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
