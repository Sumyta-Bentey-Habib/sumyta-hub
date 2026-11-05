import React from 'react';
import { EXPERIENCE_DATA } from '@/utils/constants';

export const ExperienceTimeline: React.FC = () => {
  const { stationXiia, independentProjects } = EXPERIENCE_DATA;

  return (
    <div className="w-full space-y-12 md:space-y-16">
      {/* ── 1. STATION XIIA ENTRY ── */}
      <article
        id={`experience-${stationXiia.id}`}
        aria-labelledby={`heading-${stationXiia.id}`}
        className="relative flex flex-col md:flex-row items-start"
      >
        {/* Mobile Timeline Track */}
        <div
          className="md:hidden absolute left-2.5 top-2.5 bottom-0 w-px bg-white/15"
          aria-hidden="true"
        >
          <div className="w-2.5 h-2.5 rounded-full border-2 border-primary bg-black absolute top-0 -left-[4px]" />
        </div>

        {/* LEFT COLUMN: Company Name & Location (Compact) */}
        <div className="w-full md:w-56 lg:w-64 shrink-0 pl-8 md:pl-0 md:pr-8 md:text-right space-y-1">
          <h3
            id={`heading-${stationXiia.id}`}
            className="text-xl sm:text-2xl font-headline font-black text-white uppercase tracking-tight"
          >
            {stationXiia.company}
          </h3>
          <p className="text-xs font-mono uppercase tracking-wider text-secondary/70">
            {stationXiia.location}
          </p>
        </div>

        {/* DESKTOP TIMELINE CONNECTOR RAIL & NODE */}
        <div
          className="hidden md:flex flex-col items-center self-stretch shrink-0 relative px-4"
          aria-hidden="true"
        >
          <div className="w-3.5 h-3.5 rounded-full border-2 border-primary bg-black z-10 mt-1.5 shrink-0" />
          <div className="w-px flex-1 bg-white/15 my-3" />
        </div>

        {/* RIGHT COLUMN: Detailed Experience Card */}
        <div className="w-full flex-1 min-w-0 pl-8 md:pl-0 mt-4 md:mt-0">
          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6 md:p-8 space-y-6">
            {/* Both Roles with Internal Promotion Indicator */}
            <div className="space-y-3">
              {/* Junior Software Developer */}
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                <h4 className="text-lg sm:text-xl font-headline font-bold text-white tracking-tight">
                  {stationXiia.roles[0].title}
                </h4>
                <span className="font-mono text-xs text-primary font-bold shrink-0">
                  {stationXiia.roles[0].period}
                </span>
              </div>

              {/* Internal Promotion Connecting Element */}
              <div className="flex items-center gap-3 py-1 pl-1">
                <div className="w-px h-5 bg-primary/40 ml-1" aria-hidden="true" />
                <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-primary px-2 py-0.5 border border-primary/30 bg-primary/10 rounded-full">
                  {stationXiia.promotionLabel}
                </span>
              </div>

              {/* Web Developer Intern */}
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                <h4 className="text-base sm:text-lg font-headline font-bold text-white/90 tracking-tight">
                  {stationXiia.roles[1].title}
                </h4>
                <span className="font-mono text-xs text-secondary/70 shrink-0">
                  {stationXiia.roles[1].period}
                </span>
              </div>
            </div>

            {/* Subtle Divider */}
            <div className="w-full h-px bg-white/10" aria-hidden="true" />

            {/* Responsibilities */}
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-secondary/60 font-semibold block">
                {stationXiia.responsibilitiesLabel}
              </span>

              <ul className="space-y-2.5">
                {stationXiia.responsibilities.map((resp, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-xs sm:text-sm font-sans text-secondary/90 leading-relaxed"
                  >
                    <span
                      className="text-primary font-mono text-xs shrink-0 select-none mt-0.5"
                      aria-hidden="true"
                    >
                      ―
                    </span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="space-y-3 pt-2">
              <span className="font-mono text-[11px] uppercase tracking-widest text-secondary/60 block">
                {stationXiia.technologiesLabel}
              </span>

              <div className="flex flex-wrap gap-2">
                {stationXiia.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-2.5 py-1 border border-white/10 bg-white/[0.03] text-white/90 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* ── 2. INDEPENDENT PROJECTS ENTRY ── */}
      <article
        id={`experience-${independentProjects.id}`}
        aria-labelledby={`heading-${independentProjects.id}`}
        className="relative flex flex-col md:flex-row items-start"
      >
        {/* Mobile Timeline Track */}
        <div
          className="md:hidden absolute left-2.5 top-2.5 bottom-0 w-px bg-white/15"
          aria-hidden="true"
        >
          <div className="w-2.5 h-2.5 rounded-full border-2 border-accent-cyan bg-black absolute top-0 -left-[4px]" />
        </div>

        {/* LEFT COLUMN: Entity & Context (Compact) */}
        <div className="w-full md:w-56 lg:w-64 shrink-0 pl-8 md:pl-0 md:pr-8 md:text-right space-y-1">
          <h3
            id={`heading-${independentProjects.id}`}
            className="text-xl sm:text-2xl font-headline font-black text-white uppercase tracking-tight"
          >
            {independentProjects.company}
          </h3>
          <p className="text-xs font-mono uppercase tracking-wider text-secondary/70">
            {independentProjects.location}
          </p>
        </div>

        {/* DESKTOP TIMELINE CONNECTOR RAIL & NODE */}
        <div
          className="hidden md:flex flex-col items-center self-stretch shrink-0 relative px-4"
          aria-hidden="true"
        >
          <div className="w-3.5 h-3.5 rounded-full border-2 border-accent-cyan bg-black z-10 mt-1.5 shrink-0" />
          <div className="w-px flex-1 bg-white/15 my-3" />
        </div>

        {/* RIGHT COLUMN: Detailed Experience Card */}
        <div className="w-full flex-1 min-w-0 pl-8 md:pl-0 mt-4 md:mt-0">
          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6 md:p-8 space-y-6">
            {/* Title & Dates */}
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              <h4 className="text-lg sm:text-xl font-headline font-bold text-white tracking-tight">
                {independentProjects.title}
              </h4>
              <span className="font-mono text-xs text-accent-cyan font-bold shrink-0">
                {independentProjects.period}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm font-sans text-secondary/85 leading-relaxed">
              {independentProjects.description}
            </p>

            {/* Technologies */}
            <div className="space-y-3 pt-2">
              <span className="font-mono text-[11px] uppercase tracking-widest text-secondary/60 block">
                {independentProjects.technologiesLabel}
              </span>

              <div className="flex flex-wrap gap-2">
                {independentProjects.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-2.5 py-1 border border-white/10 bg-white/[0.03] text-white/90 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

ExperienceTimeline.displayName = 'ExperienceTimeline';
