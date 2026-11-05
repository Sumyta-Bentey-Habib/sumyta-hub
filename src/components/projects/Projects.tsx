'use client';

import React from 'react';
import { PROJECTS_DATA, ProjectItem } from '@/utils/constants';
import { ProjectsHeader } from './ProjectsHeader';
import { FeaturedProjectCard } from './FeaturedProjectCard';
import { EditorialProjectRow } from './EditorialProjectRow';

const Projects: React.FC = () => {
  const projects = PROJECTS_DATA.projects as readonly ProjectItem[];
  const featuredProject = projects.find((p) => p.isFeatured) || projects[0];
  const editorialProjects = projects.filter((p) => p.id !== featuredProject.id);

  return (
    <section
      id="work"
      className="relative py-24 md:py-32 px-4 sm:px-6 md:px-10 lg:px-14 bg-black text-white overflow-hidden border-t border-white/10 selection:bg-accent-cyan selection:text-black"
      aria-labelledby="projects-heading"
    >
      {/* ── AMBIENT EDITORIAL LIGHTING ── */}
      <div
        className="absolute top-1/4 left-1/12 w-[600px] h-[600px] rounded-full bg-accent-cyan/5 blur-[180px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/12 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[180px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        {/* ── 1. EDITORIAL HEADER ── */}
        <ProjectsHeader />

        {/* ── 2. PROJECT 01 — FEATURED PROJECT SHOWCASE ── */}
        <FeaturedProjectCard project={featuredProject} />

        {/* ── 3. PROJECTS 02–06 — EDITORIAL PROJECT PRESENTATIONS ── */}
        <div className="space-y-16 md:space-y-24">
          {editorialProjects.map((project, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <React.Fragment key={project.id}>
                <EditorialProjectRow
                  project={project}
                  isReversed={isReversed}
                />
                {index < editorialProjects.length - 1 && (
                  <div
                    className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-16 md:my-24"
                    aria-hidden="true"
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
