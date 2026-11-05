'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ProjectItem, PROJECTS_DATA } from '@/utils/constants';
import styles from './EditorialProjects.module.css';

interface EditorialProjectRowProps {
  readonly project: ProjectItem;
  readonly isReversed?: boolean;
}

export const EditorialProjectRow: React.FC<EditorialProjectRowProps> = ({
  project,
  isReversed = false,
}) => {
  const [imageError, setImageError] = useState(false);
  const primaryLaunchUrl =
    project.links.demo || project.links.frontend || project.links.github;

  return (
    <article
      className="relative group/row"
      aria-labelledby={`project-heading-${project.id}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* ── IMAGE COLUMN ── */}
        <div
          className={`w-full lg:col-span-7 ${
            isReversed ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          <div
            className={`relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/10 ${styles.previewFrame} group/img shadow-xl`}
          >
            {!imageError ? (
              <a
                href={primaryLaunchUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${PROJECTS_DATA.launchProjectAria}: ${project.title} (${PROJECTS_DATA.externalLinkAria})`}
                className="block w-full h-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
              >
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  onError={() => setImageError(true)}
                  className="object-cover object-top filter contrast-[1.03] brightness-95 group-hover/img:brightness-105 group-hover/img:scale-[1.025] transition-all duration-700 ease-out"
                />

                {/* Floating Quick-Launch Pill on Hover */}
                {project.links.demo && (
                  <div className="absolute bottom-3 left-3 z-20 font-mono text-[10px] text-white/90 bg-black/80 hover:bg-black px-3 py-1.5 rounded-full border border-white/20 hover:border-accent-cyan transition-all duration-200 backdrop-blur-md flex items-center gap-2 group-hover/img:border-accent-cyan">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-accent-cyan shrink-0 animate-pulse"
                      aria-hidden="true"
                    />
                    <span className="font-bold tracking-wider">
                      {PROJECTS_DATA.quickPreviewBadge}
                    </span>
                  </div>
                )}
              </a>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-black/80">
                <span className="text-primary font-mono text-xs uppercase tracking-widest mb-1">
                  [{project.number}]
                </span>
                <h4 className="text-xl font-headline font-bold text-white uppercase">
                  {project.title}
                </h4>
                <p className="text-xs text-secondary-dim/70 max-w-sm mt-2">
                  {project.subtitle}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── CONTENT & TECHNICAL READOUT COLUMN ── */}
        <div
          className={`w-full lg:col-span-5 flex flex-col justify-center space-y-5 ${
            isReversed ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          {/* Identification Badges */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-wider uppercase">
            <span className="text-accent-cyan font-bold text-base tracking-widest">
              [{project.number}]
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-white/80 border border-white/10">
              {project.category}
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full font-bold tracking-wider ${
                project.isGroupProject
                  ? 'bg-primary/15 text-primary border border-primary/30'
                  : 'bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30'
              }`}
            >
              {project.ownershipType}
            </span>
          </div>

          {/* Project Titles */}
          <div className="space-y-1">
            <h3
              id={`project-heading-${project.id}`}
              className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold uppercase text-white tracking-tight group-hover/row:text-accent-cyan transition-colors duration-300"
            >
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm font-mono text-secondary-dim/70">
              {project.subtitle}
            </p>
          </div>

          {/* Concise Description */}
          <p className="text-xs sm:text-sm font-sans text-secondary-dim/90 leading-relaxed">
            {project.description}
          </p>

          {/* Contribution Callout Box */}
          <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/10 space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary block">
              {PROJECTS_DATA.myContributionLabel}
            </span>
            <p className="text-xs font-sans text-white/90 leading-relaxed">
              {project.role}
            </p>
          </div>

          {/* Grouped Tech Stack */}
          <div className="space-y-2.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block">
              {PROJECTS_DATA.techStackLabel}
            </span>
            <div className="space-y-2">
              {project.techGroups && project.techGroups.length > 0 ? (
                project.techGroups.map((group) => (
                  <div key={group.category} className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono text-accent-cyan/90 uppercase tracking-wider shrink-0 min-w-[90px]">
                      {group.category}:
                    </span>
                    <div className={styles.chipGroup}>
                      {group.items.map((tech) => (
                        <span key={tech} className={styles.chipItem}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.chipGroup}>
                  {project.technologies.map((tech) => (
                    <span key={tech} className={styles.chipItem}>
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Project Action Links */}
          <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2.5">
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${PROJECTS_DATA.launchProjectAria}: ${project.title} (${PROJECTS_DATA.externalLinkAria})`}
                className="px-4 py-2 rounded-md bg-accent-cyan text-black text-xs font-headline font-bold tracking-wider uppercase hover:bg-white transition-all duration-200 inline-flex items-center gap-1.5 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan shadow-[0_0_15px_rgba(0,242,254,0.25)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
              >
                <span>{PROJECTS_DATA.openLiveDemo}</span>
                <span
                  className="transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>
            )}

            {/* Separate Frontend Client Repo */}
            {project.links.frontend && (
              <a
                href={project.links.frontend}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${PROJECTS_DATA.githubProjectAria}: ${project.title} Frontend (${PROJECTS_DATA.externalLinkAria})`}
                className="px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-accent-cyan hover:text-accent-cyan text-xs font-headline font-bold tracking-wider uppercase transition-all duration-200 inline-flex items-center gap-1 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
              >
                <span>{PROJECTS_DATA.openClientRepo}</span>
                <span
                  className="transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>
            )}

            {/* Separate Backend Server Repo */}
            {project.links.backend && (
              <a
                href={project.links.backend}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${PROJECTS_DATA.githubProjectAria}: ${project.title} Backend (${PROJECTS_DATA.externalLinkAria})`}
                className="px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-primary hover:text-primary text-xs font-headline font-bold tracking-wider uppercase transition-all duration-200 inline-flex items-center gap-1 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span>{PROJECTS_DATA.openServerRepo}</span>
                <span
                  className="transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>
            )}

            {/* Single repo / Monorepo when not split into frontend & backend */}
            {!project.links.frontend &&
              !project.links.backend &&
              project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${PROJECTS_DATA.githubProjectAria}: ${project.title} (${PROJECTS_DATA.externalLinkAria})`}
                  className="px-3.5 py-2 rounded-md bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-white/40 text-xs font-headline font-bold tracking-wider uppercase transition-all duration-200 inline-flex items-center gap-1.5 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>
                    {project.links.isMonorepo
                      ? PROJECTS_DATA.openMonorepo
                      : PROJECTS_DATA.openSourceCode}
                  </span>
                  <span
                    className="transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </a>
              )}
          </div>
        </div>
      </div>
    </article>
  );
};

