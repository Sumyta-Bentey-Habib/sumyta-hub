'use client';

import React from 'react';
import { PROJECTS_DATA, ProjectItem } from '@/utils/constants';

interface DevLabConsoleDockProps {
  activeProjectIndex: number;
  onSelectProject: (index: number) => void;
  isAutoPlaying: boolean;
  onToggleAuto: () => void;
}

export const DevLabConsoleDock: React.FC<DevLabConsoleDockProps> = ({
  activeProjectIndex,
  onSelectProject,
  isAutoPlaying,
  onToggleAuto,
}) => {
  const projects = PROJECTS_DATA.projects as readonly ProjectItem[];
  const total = projects.length;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      e.stopPropagation();
      const nextIndex = (currentIndex + 1) % total;
      onSelectProject(nextIndex);
      const nextBtn = document.getElementById(`project-tab-${projects[nextIndex].id}`);
      nextBtn?.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      e.stopPropagation();
      const prevIndex = (currentIndex - 1 + total) % total;
      onSelectProject(prevIndex);
      const prevBtn = document.getElementById(`project-tab-${projects[prevIndex].id}`);
      prevBtn?.focus();
    }
  };

  return (
    <div
      className="w-full rounded-sm border border-white/15 bg-[#090714] p-2.5 sm:p-3 font-mono text-xs relative"
      role="region"
      aria-label={PROJECTS_DATA.terminalHeader}
    >
      {/* ── CONSOLE TITLEBAR: TERMINAL PROMPT & AUTO/MANUAL TOGGLE ── */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2.5 border-b border-white/10 select-none">
        <div className="flex items-center gap-2">
          {/* Subtle Terminal Rivets */}
          <div className="flex items-center gap-1" aria-hidden="true">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-neon/80" />
            <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow/80" />
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan/80" />
          </div>

          <span className="text-primary font-bold text-xs tracking-wider">
            {PROJECTS_DATA.terminalPath}
            <span className="inline-block animate-pulse text-accent-cyan font-normal ml-0.5">_</span>
          </span>
        </div>

        <div className="flex items-center gap-2 text-[10px]">
          {/* Compact Accessible Dual-Mode Toggle */}
          <button
            type="button"
            onClick={onToggleAuto}
            aria-pressed={isAutoPlaying}
            aria-label={PROJECTS_DATA.autoToggleAria}
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm border font-mono text-[9px] uppercase tracking-wider transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan ${
              isAutoPlaying
                ? 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/40 hover:bg-accent-cyan/20'
                : 'bg-black/50 text-white/50 border-white/15 hover:border-white/30 hover:text-white/80'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isAutoPlaying ? 'bg-accent-cyan animate-pulse' : 'bg-white/40'
              }`}
              aria-hidden="true"
            />
            <span>{isAutoPlaying ? PROJECTS_DATA.autoModeActive : PROJECTS_DATA.autoModePaused}</span>
          </button>

          <span className="text-secondary-dim/50 hidden md:inline-block">
            {PROJECTS_DATA.keyboardHint}
          </span>
        </div>
      </div>

      {/* ── 6 TACTILE LAUNCHER KEYS ── */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 gap-2"
        role="tablist"
        aria-label={PROJECTS_DATA.repositoryArchive}
      >
        {projects.map((item, index) => {
          const isActive = index === activeProjectIndex;

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`project-panel-${item.id}`}
              id={`project-tab-${item.id}`}
              onClick={() => onSelectProject(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`text-left p-2.5 rounded-sm transition-all duration-200 cursor-pointer border relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan ${
                isActive
                  ? 'bg-primary/10 border-primary text-white shadow-[0_0_15px_rgba(255,45,117,0.2)]'
                  : 'bg-black/50 border-white/10 text-secondary-dim hover:bg-white/[0.04] hover:border-white/25'
              }`}
            >
              {/* Active Neon Accent Top Line */}
              {isActive && (
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent-cyan to-primary"
                  aria-hidden="true"
                />
              )}

              {/* Number & Selection Marker */}
              <div className="flex items-center justify-between gap-1 mb-1 font-mono text-[10px]">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`font-bold transition-colors ${
                      isActive ? 'text-accent-cyan' : 'text-white/40 group-hover:text-white/70'
                    }`}
                  >
                    {isActive ? '▶' : '·'}
                  </span>
                  <span className={`font-bold ${isActive ? 'text-primary' : 'text-white/60'}`}>
                    {item.number}
                  </span>
                </div>

                <span
                  className={`text-[9px] px-1 py-0.2 rounded-sm uppercase tracking-wider font-bold ${
                    isActive
                      ? 'bg-primary text-black'
                      : 'bg-white/5 text-white/40'
                  }`}
                >
                  {isActive ? PROJECTS_DATA.activeRuntimeTag : PROJECTS_DATA.standbyRuntimeTag}
                </span>
              </div>

              {/* Project Name */}
              <div
                className={`font-headline font-bold text-xs sm:text-sm tracking-tight truncate ${
                  isActive ? 'text-white' : 'text-white/80 group-hover:text-white'
                }`}
              >
                {item.title}
              </div>

              {/* Compact Category */}
              <div className="text-[10px] text-white/50 truncate font-sans mt-0.5">
                {item.category}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
