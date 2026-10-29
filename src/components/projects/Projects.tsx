'use client';

import React, { useState, useEffect, useCallback, useRef, useSyncExternalStore } from 'react';
import { PROJECTS_DATA, ProjectItem } from '@/utils/constants';
import { ProjectsHeader } from './ProjectsHeader';
import { DevLabMonitor } from './DevLabMonitor';
import { DevLabConsoleDock } from './DevLabConsoleDock';
import { DevLabTechnicalReadout } from './DevLabTechnicalReadout';

// SSR-safe subscription to prefers-reduced-motion
const subscribeReducedMotion = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {};
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
};

const getReducedMotionSnapshot = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const getReducedMotionServerSnapshot = () => false;

const Projects: React.FC = () => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [userAutoPreference, setUserAutoPreference] = useState<boolean | null>(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);

  const sectionRef = useRef<HTMLElement | null>(null);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const activeIndexRef = useRef(activeProjectIndex);

  useEffect(() => {
    activeIndexRef.current = activeProjectIndex;
  }, [activeProjectIndex]);

  const projects = PROJECTS_DATA.projects as readonly ProjectItem[];
  const total = projects.length;

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  // If user hasn't explicitly toggled, auto-rotation defaults to disabled on reduced motion
  const isAutoEnabled = userAutoPreference !== null ? userAutoPreference : !prefersReducedMotion;

  // Active state of auto-cycling: true only when enabled, section visible, tab visible, and user idle
  const isAutoPlaying =
    isAutoEnabled &&
    isSectionVisible &&
    isTabVisible &&
    !isUserInteracting;

  // Manual project selection: pauses auto rotation and starts idle timer
  const handleSelectProject = useCallback((index: number) => {
    setActiveProjectIndex(index);
    setIsUserInteracting(true);

    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }
    idleTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, PROJECTS_DATA.idleResumeDelayMs);
  }, []);

  // Explicit user toggle for auto/manual mode
  const handleToggleAuto = useCallback(() => {
    setUserAutoPreference((prev) => {
      const current = prev !== null ? prev : !prefersReducedMotion;
      const next = !current;
      if (next) {
        setIsUserInteracting(false);
      }
      return next;
    });
  }, [prefersReducedMotion]);

  // IntersectionObserver to pause when section leaves viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsSectionVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, []);

  // Document tab visibility listener
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Automatic cycle timer (single timer, only active when isAutoPlaying)
  useEffect(() => {
    if (!isAutoPlaying) return;

    const intervalId = setInterval(() => {
      setActiveProjectIndex((prev) => (prev + 1) % total);
    }, PROJECTS_DATA.autoIntervalMs);

    return () => {
      clearInterval(intervalId);
    };
  }, [isAutoPlaying, total]);

  // Clean up idle timeout on unmount
  useEffect(() => {
    return () => {
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
    };
  }, []);

  // Global keyboard navigation (ArrowLeft / ArrowRight) with defaultPrevented check
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented) return;

      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if (e.key === 'ArrowRight') {
        handleSelectProject((activeIndexRef.current + 1) % total);
      } else if (e.key === 'ArrowLeft') {
        handleSelectProject((activeIndexRef.current - 1 + total) % total);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSelectProject, total]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative py-20 md:py-28 px-4 sm:px-6 md:px-10 lg:px-14 bg-black text-white overflow-hidden border-t border-white/10 selection:bg-primary selection:text-black"
      aria-labelledby="projects-heading"
    >
      {/* Background Cyberpunk Ambient Lighting & Subtle Grid Depth */}
      <div
        className="absolute top-1/4 left-1/10 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[160px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/10 w-[500px] h-[500px] rounded-full bg-accent-cyan/5 blur-[160px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        {/* ── 1. WORKSTATION TELEMETRY HEADER ── */}
        <ProjectsHeader />

        {/* ── 2. UNIFIED WORKSTATION RIG (ONE CONNECTED ENVIRONMENT) ── */}
        <div className="relative w-full rounded-sm border border-white/10 bg-[#06040d] p-3 sm:p-5 md:p-6 lg:p-7 shadow-2xl">
          {/* Workstation Rig Asymmetric Arrangement */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-start justify-between gap-5 lg:gap-6 relative z-10">
            {/* Primary Visual Column: Dominant Monitor + Connected Tactile Console Dock */}
            <div className="w-full lg:w-[65%] flex flex-col gap-3">
              {/* Dominant Monitor */}
              <DevLabMonitor
                activeProjectIndex={activeProjectIndex}
                isAutoPlaying={isAutoPlaying}
                prefersReducedMotion={prefersReducedMotion}
              />

              {/* Integrated Tactile Project Console Dock */}
              <DevLabConsoleDock
                activeProjectIndex={activeProjectIndex}
                onSelectProject={handleSelectProject}
                isAutoPlaying={isAutoPlaying}
                onToggleAuto={handleToggleAuto}
              />
            </div>

            {/* Diagnostics Column: Dedicated Integrated Technical Readout */}
            <div className="w-full lg:w-[35%] flex flex-col">
              <DevLabTechnicalReadout
                activeProjectIndex={activeProjectIndex}
                onSelectProject={handleSelectProject}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
