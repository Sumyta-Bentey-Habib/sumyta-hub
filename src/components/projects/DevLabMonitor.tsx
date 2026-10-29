'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PROJECTS_DATA, ProjectItem } from '@/utils/constants';
import styles from './DevLab.module.css';

interface DevLabMonitorProps {
  readonly activeProjectIndex: number;
  readonly isAutoPlaying: boolean;
  readonly prefersReducedMotion?: boolean;
}

export const DevLabMonitor: React.FC<DevLabMonitorProps> = ({
  activeProjectIndex,
  isAutoPlaying,
  prefersReducedMotion = false,
}) => {
  const projects = PROJECTS_DATA.projects as readonly ProjectItem[];
  const activeProject = projects[activeProjectIndex] || projects[0];
  const primaryLaunchUrl = activeProject.links.demo || activeProject.links.frontend || activeProject.links.github;

  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="w-full flex flex-col items-center relative">
      {/* ── WORKSTATION MONITOR CHASSIS ── */}
      <div className={styles.monitorChassis}>
        {/* Stepped Pixel Corner Accent Brackets */}
        <div className="absolute -top-0.5 -left-0.5 w-2 h-2 bg-primary pointer-events-none" aria-hidden="true" />
        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-accent-cyan pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-0.5 -left-0.5 w-2 h-2 bg-accent-cyan pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-primary pointer-events-none" aria-hidden="true" />

        {/* Bezel Top Bar: Status Beacon & Exit Code */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 font-mono text-[10px] sm:text-xs">
          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-black/60 border border-white/10 text-accent-cyan">
              <span className="relative flex h-2 w-2">
                <span
                  className={`absolute inline-flex h-full w-full rounded-full bg-accent-cyan ${
                    isAutoPlaying ? 'animate-ping opacity-75' : 'opacity-0'
                  }`}
                />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan" />
              </span>
              <span className="tracking-wider uppercase font-bold text-[10px]">
                {isAutoPlaying ? PROJECTS_DATA.autoModeActive : PROJECTS_DATA.autoModePaused}
              </span>
            </span>

            <span className="hidden sm:inline-block text-white/30 text-[10px]" aria-hidden="true">|</span>
            <span className="hidden sm:inline-block text-secondary-dim/70 tracking-widest uppercase text-[10px]">
              {PROJECTS_DATA.rightWorldTag}
            </span>
          </div>

          {/* Genuine Exit Code */}
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-sm bg-black/50 border border-white/10 text-primary font-bold text-[10px] tracking-wider">
              {activeProject.exitCode}
            </span>
          </div>
        </div>

        {/* ── MONITOR SCREEN VIEWPORT (16:10 FIXED ASPECT RATIO) ── */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-black border border-white/10">
          {/* Pre-mounted stacked screenshots for seamless crossfading without layout shift */}
          {projects.map((item, index) => {
            const isActive = index === activeProjectIndex;
            const hasFailed = failedImages[item.id];

            return (
              <div
                key={item.id}
                className={`absolute inset-0 ${
                  prefersReducedMotion
                    ? 'transition-opacity duration-75'
                    : 'transition-opacity duration-300 ease-in-out'
                } ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
                }`}
                aria-hidden={!isActive}
              >
                {!hasFailed ? (
                  <a
                    href={item.links.demo || item.links.frontend || item.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${PROJECTS_DATA.launchProjectAria}: ${item.title}`}
                    className="group/preview block w-full h-full cursor-pointer focus-visible:outline-none relative"
                  >
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 65vw"
                      priority={index === 0}
                      onError={() => handleImageError(item.id)}
                      className="object-cover object-top filter contrast-[1.03] brightness-95 group-hover/preview:brightness-105 transition-all duration-300"
                    />
                    {/* Subtle quick-launch cue on hover */}
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/preview:opacity-100 transition-opacity duration-200 pointer-events-none flex items-center justify-center">
                      <span className="px-3 py-1 rounded-sm bg-black/90 border border-primary/50 text-primary font-mono text-[10px] tracking-widest uppercase shadow-[0_0_15px_rgba(255,45,117,0.3)]">
                        {PROJECTS_DATA.openPreviewBadge}
                      </span>
                    </div>
                  </a>
                ) : (
                  /* Graceful Authentic Fallback */
                  <div className={`w-full h-full ${styles.chassis} flex flex-col items-center justify-center p-6 text-center border border-white/10`}>
                    <span className="text-primary font-mono text-xs tracking-widest uppercase mb-1">
                      {item.exitCode}
                    </span>
                    <h4 className="text-xl font-headline font-bold uppercase text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-secondary-dim/70 max-w-sm mb-3">
                      {item.subtitle}
                    </p>
                    <span className="px-2 py-0.5 rounded-sm bg-white/5 border border-white/10 text-[10px] font-mono text-accent-cyan">
                      {item.category}
                    </span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Restrained CRT Scanline & Phosphor Vignette Overlays */}
          <div className={styles.crtScanlines} aria-hidden="true" />
          <div className={styles.phosphorVignette} aria-hidden="true" />

          {/* Genuine Exit Code Badge */}
          <div className="absolute top-2.5 left-2.5 z-30 font-mono text-[9px] sm:text-[10px] text-accent-cyan bg-black/85 px-2 py-0.5 rounded-sm border border-accent-cyan/30 pointer-events-none backdrop-blur-sm">
            <span>[RUNTIME: {activeProject.exitCode}]</span>
          </div>

          {/* Real Live URL Preview Pill (Clickable) */}
          {primaryLaunchUrl && (
            <a
              href={primaryLaunchUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${PROJECTS_DATA.launchProjectAria}: ${activeProject.title}`}
              className="absolute bottom-2.5 left-2.5 z-30 max-w-[80%] sm:max-w-[85%] truncate font-mono text-[9px] sm:text-[10px] text-white/85 hover:text-white bg-black/85 hover:bg-black px-2.5 py-1 rounded-sm border border-white/20 hover:border-accent-cyan hover:shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all duration-200 backdrop-blur-sm flex items-center gap-1.5 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan shrink-0 animate-pulse" aria-hidden="true" />
              <span className="truncate">{primaryLaunchUrl}</span>
              <span className="text-accent-cyan text-[10px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">
                ↗
              </span>
            </a>
          )}
        </div>

        {/* ── LOWER BEZEL BAR: PROJECT IDENTITY & LAUNCH ACTION ── */}
        <div className="mt-2 pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold tracking-wider text-[11px] sm:text-xs uppercase">
              {activeProject.title}
            </span>
            <span className="text-white/20">/</span>
            <span className="text-secondary-dim/70 text-[10px] sm:text-xs">
              {activeProject.category}
            </span>
            {activeProject.isGroupProject && (
              <span className="px-1.5 py-0.5 rounded-sm bg-primary/15 text-primary border border-primary/30 text-[9px] font-bold tracking-wider uppercase">
                {PROJECTS_DATA.groupProjectBadge}
              </span>
            )}
          </div>

          {primaryLaunchUrl && (
            <a
              href={primaryLaunchUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${PROJECTS_DATA.launchProjectAria}: ${activeProject.title}`}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-primary/10 hover:bg-primary/20 text-primary border border-primary/40 hover:border-primary transition-all duration-200 text-[10px] sm:text-xs font-bold tracking-wider group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
            >
              <span>{PROJECTS_DATA.demoButtonText}</span>
              <span className="transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
