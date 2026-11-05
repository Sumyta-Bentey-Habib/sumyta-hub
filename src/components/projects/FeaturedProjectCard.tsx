'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ProjectItem, PROJECTS_DATA } from '@/utils/constants';
import styles from './EditorialProjects.module.css';

interface FeaturedProjectCardProps {
  readonly project: ProjectItem;
}

export const FeaturedProjectCard: React.FC<FeaturedProjectCardProps> = ({ project }) => {
  const [imageError, setImageError] = useState(false);
  const primaryLaunchUrl = project.links.demo || project.links.github;

  return (
    <article
      className={`relative rounded-2xl border border-white/15 bg-black/60 backdrop-blur-md overflow-hidden p-6 sm:p-8 lg:p-10 mb-20 md:mb-28 ${styles.featuredGlow}`}
      aria-labelledby={`featured-title-${project.id}`}
    >
      {/* ── TOP BADGE ROW ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8 font-mono text-[11px] tracking-wider uppercase">
        <div className="flex items-center gap-2.5">
          <span className="text-accent-cyan font-bold text-sm tracking-widest">
            [{project.number}]
          </span>
          <span className="px-3 py-1 rounded-full bg-primary/15 text-primary border border-primary/30 font-bold">
            {PROJECTS_DATA.featuredBadge}
          </span>
          <span className="hidden sm:inline-block text-white/30" aria-hidden="true">/</span>
          <span className="hidden sm:inline-block text-white/60 tracking-wider">
            {PROJECTS_DATA.featuredKicker}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30 font-bold">
            {project.ownershipType}
          </span>
        </div>
      </div>

      {/* ── 2-COLUMN EDITORIAL SHOWCASE ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Large Prominent Image Showcase (7 Cols on LG) */}
        <div className="lg:col-span-7 w-full">
          <div className={`relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/15 ${styles.previewFrame} group`}>
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
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  onError={() => setImageError(true)}
                  className="object-cover object-top filter contrast-[1.03] brightness-95 group-hover:brightness-105 group-hover:scale-[1.025] transition-all duration-700 ease-out"
                />

                {/* Floating Quick-Launch Pill */}
                {project.links.demo && (
                  <div className="absolute bottom-3 left-3 z-20 font-mono text-[10px] text-white/90 bg-black/80 hover:bg-black px-3 py-1.5 rounded-full border border-white/20 hover:border-accent-cyan transition-all duration-200 backdrop-blur-md flex items-center gap-2 group-hover:border-accent-cyan">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan shrink-0 animate-pulse" aria-hidden="true" />
                    <span className="font-bold tracking-wider">{PROJECTS_DATA.quickPreviewBadge}</span>
                  </div>
                )}
              </a>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-black/80">
                <span className="text-primary font-mono text-xs uppercase tracking-widest mb-2">
                  [{project.number}]
                </span>
                <h4 className="text-2xl font-headline font-bold text-white uppercase">
                  {project.title}
                </h4>
                <p className="text-xs text-secondary-dim/70 max-w-sm mt-2">
                  {project.subtitle}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Content & Technical Readout Column (5 Cols on LG) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          {/* Identity */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-accent-cyan block">
              {project.category}
            </span>
            <h3
              id={`featured-title-${project.id}`}
              className="text-3xl sm:text-4xl md:text-5xl font-headline font-black uppercase text-white tracking-tight leading-none"
            >
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm font-mono text-secondary-dim/80">
              {project.subtitle}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm font-sans text-secondary-dim/90 leading-relaxed">
            {project.description}
          </p>

          {/* Contribution Highlights */}
          <div className="p-4 rounded-lg bg-white/[0.03] border border-white/10 space-y-1.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary block">
              {PROJECTS_DATA.myContributionLabel}
            </span>
            <p className="text-xs font-sans text-white/90 leading-relaxed">
              {project.role}
            </p>
          </div>

          {/* Grouped Tech Stack */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block">
              {PROJECTS_DATA.techStackLabel}
            </span>
            <div className="space-y-2">
              {project.techGroups.map((group) => (
                <div key={group.category} className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono text-accent-cyan uppercase tracking-wider shrink-0 min-w-[100px]">
                    {group.category}:
                  </span>
                  <div className={styles.chipGroup}>
                    {group.items.map((item) => (
                      <span key={item} className={styles.chipItem}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Actions */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${PROJECTS_DATA.launchProjectAria}: ${project.title} (${PROJECTS_DATA.externalLinkAria})`}
                className="px-5 py-2.5 rounded-md bg-accent-cyan text-black text-xs font-headline font-bold tracking-wider uppercase hover:bg-white transition-all duration-200 inline-flex items-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]"
              >
                <span>{PROJECTS_DATA.openLiveDemo}</span>
                <span className="transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">
                  ↗
                </span>
              </a>
            )}

            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${PROJECTS_DATA.githubProjectAria}: ${project.title} (${PROJECTS_DATA.externalLinkAria})`}
                className="px-4 py-2.5 rounded-md bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-white/40 text-xs font-headline font-bold tracking-wider uppercase transition-all duration-200 inline-flex items-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>{project.links.isMonorepo ? PROJECTS_DATA.openSourceCode : PROJECTS_DATA.openSourceCode}</span>
                <span className="transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">
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

