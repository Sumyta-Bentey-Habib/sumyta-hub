'use client';

import React from 'react';
import { ProjectsHeader } from './ProjectsHeader';
import { DevLabMonitor } from './DevLabMonitor';
import { DevLabConsoleDock } from './DevLabConsoleDock';
import { DevLabTechnicalReadout } from './DevLabTechnicalReadout';
import { useProjectWorkstation } from './useProjectWorkstation';
import styles from './DevLab.module.css';

const Projects: React.FC = () => {
  const {
    activeProjectIndex,
    isAutoPlaying,
    prefersReducedMotion,
    handleSelectProject,
    handleToggleAuto,
    sectionRef,
  } = useProjectWorkstation();

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
        <div className={styles.workstationRig}>

          <div className="flex flex-col lg:flex-row items-stretch lg:items-start justify-between gap-5 lg:gap-6 relative z-10">

            <div className="w-full lg:w-[65%] flex flex-col gap-3">

              <DevLabMonitor
                activeProjectIndex={activeProjectIndex}
                isAutoPlaying={isAutoPlaying}
                prefersReducedMotion={prefersReducedMotion}
              />


              <DevLabConsoleDock
                activeProjectIndex={activeProjectIndex}
                onSelectProject={handleSelectProject}
                isAutoPlaying={isAutoPlaying}
                onToggleAuto={handleToggleAuto}
              />
            </div>

        
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
