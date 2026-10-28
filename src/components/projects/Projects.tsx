'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { PROJECTS_DATA, ProjectItem } from '@/utils/constants';
import { ProjectsHighwayHeader } from './ProjectsHighwayHeader';
import { ProjectsHighwayCanvas } from './ProjectsHighwayCanvas';
import { ProjectDestinationDock } from './ProjectDestinationDock';

const Projects: React.FC = () => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const projects = PROJECTS_DATA.projects as readonly ProjectItem[];
  const total = projects.length;

  const handleSelectProject = useCallback((index: number) => {
    setActiveProjectIndex(index);
  }, []);

  // Keyboard navigation for cruising along the highway (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only process when not typing in an input/textarea
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      if (e.key === 'ArrowRight') {
        setActiveProjectIndex((prev) => (prev + 1) % total);
      } else if (e.key === 'ArrowLeft') {
        setActiveProjectIndex((prev) => (prev - 1 + total) % total);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [total]);

  return (
    <section
      id="work"
      className="relative py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-black text-white overflow-hidden border-t border-white/10 selection:bg-primary selection:text-black"
      aria-labelledby="projects-heading"
    >
      {/* Background Cyberpunk Ambient Lighting */}
      <div
        className="absolute top-1/3 left-1/5 w-96 h-96 rounded-full bg-primary/5 blur-[130px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/5 w-96 h-96 rounded-full bg-accent-cyan/5 blur-[130px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* ── 1. TELEMETRY HEADER ── */}
        <ProjectsHighwayHeader />

        {/* ── 2. LIVING NEON HIGHWAY CANVAS ── */}
        <ProjectsHighwayCanvas
          activeProjectIndex={activeProjectIndex}
          onSelectProject={handleSelectProject}
        />

        {/* ── 3. CONTEXTUAL PROJECT DESTINATION DOCK ── */}
        <ProjectDestinationDock
          activeProjectIndex={activeProjectIndex}
          onSelectProject={handleSelectProject}
        />
      </div>
    </section>
  );
};

export default Projects;
