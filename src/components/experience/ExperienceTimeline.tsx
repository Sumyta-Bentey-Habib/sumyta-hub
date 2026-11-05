import React from 'react';
import { EXPERIENCE_DATA } from '@/utils/constants';

export const ExperienceTimeline: React.FC = () => {
  const { stationXiia, independentProjects } = EXPERIENCE_DATA;

  return (
    <div className="w-full space-y-12 md:space-y-16">
      {/* ── 1.  XIIA ENTRY ── */}
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
                  {/* Role Title & Organization / Progression */}
                  {sector.positions && sector.positions.length > 0 ? (
                    <div className="space-y-4">
                      {/* Organization & Location Header */}
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3
                            id={`role-${sector.id}`}
                            className="text-2xl sm:text-3xl md:text-4xl font-headline font-black uppercase text-white tracking-tight leading-tight"
                          >
                            {sector.company}
                          </h3>
                          {sector.progressionBadge && (
                            <span className="font-mono text-[10px] tracking-widest uppercase font-bold px-2 py-0.5 border border-primary/40 text-primary bg-primary/10">
                              {sector.progressionBadge}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2 font-mono text-xs sm:text-sm text-secondary/80">
                          <span className={`${accentText} uppercase text-xs tracking-wider font-semibold`}>
                            {sector.location}
                          </span>
                          <span className="text-white/20 select-none hidden md:inline">/</span>
                          <span className="text-secondary/60 uppercase text-xs tracking-wider hidden md:inline">
                            {sector.districtSub}
                          </span>
                          {sector.totalTenure && (
                            <>
                              <span className="text-white/20 select-none hidden sm:inline">/</span>
                              <span className="text-secondary/60 uppercase text-xs tracking-wider hidden sm:inline">
                                {sector.totalTenure}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Progression Path */}
                      <div className="relative pl-5 sm:pl-6 border-l border-white/15 space-y-4 pt-1 pb-1">
                        {sector.positions.map((pos, pIdx) => (
                          <div key={pos.title} className="relative space-y-1">
                            {/* Inner Node */}
                            <span
                              className={`absolute -left-[25px] sm:-left-[29px] top-1.5 w-2 h-2 rotate-45 border ${
                                pos.isPromoted
                                  ? `${accentBorder} ${accentBg} shadow-sm shadow-primary/50`
                                  : 'border-white/40 bg-white/20'
                              }`}
                              aria-hidden="true"
                            />

                            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                              <h4 className="text-lg sm:text-xl font-headline font-bold uppercase text-white tracking-tight">
                                {pos.title}
                              </h4>
                              <div className="flex items-center gap-2 font-mono text-xs shrink-0">
                                <span
                                  className={`text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 border ${
                                    pos.isPromoted
                                      ? 'border-primary/50 text-primary bg-primary/5'
                                      : 'border-white/20 text-secondary/70 bg-white/5'
                                  }`}
                                >
                                  {pos.roleBadge}
                                </span>
                                <span className="text-secondary/80 text-[11px] sm:text-xs font-semibold">
                                  {pos.period}
                                </span>
                              </div>
                            </div>

                            {/* Progression indicator between positions */}
                            {pIdx === 0 && sector.progressionNote && (
                              <div className="pt-1 flex items-center gap-1.5 font-mono text-[11px] text-primary/80">
                                <span className={`${accentText} font-bold`} aria-hidden="true">
                                  ↑
                                </span>
                                <span>{sector.progressionNote}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Standard Single Role Title & Organization */
                    <div className="space-y-1.5">
                      <h3
                        id={`role-${sector.id}`}
                        className="text-2xl sm:text-3xl md:text-4xl font-headline font-black uppercase text-white tracking-tight leading-tight"
                      >
                        {sector.role}
                      </h3>

                      <div className="flex flex-wrap items-center gap-2 font-mono text-xs sm:text-sm text-secondary/80">
                        <span className="font-bold text-white uppercase tracking-wider">
                          {sector.company}
                        </span>
                        <span className="text-white/20 select-none">/</span>
                        <span className={`${accentText} uppercase text-xs tracking-wider font-semibold`}>
                          {sector.location}
                        </span>
                        <span className="text-white/20 select-none hidden md:inline">/</span>
                        <span className="text-secondary/60 uppercase text-xs tracking-wider hidden md:inline">
                          {sector.districtSub}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Role Summary Narrative */}
                  <div className="border-l-2 border-white/10 pl-3.5 sm:pl-4 py-1 max-w-3xl">
                    <p className="text-xs sm:text-sm font-sans text-secondary/80 leading-relaxed">
                      {sector.description}
                    </p>
                  </div>

                  {/* Key Responsibilities */}
                  <div className="space-y-3 pt-1">
                    <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-secondary/70 font-semibold flex items-center gap-2">
                      <span>{`${sector.focusCategory} //`}</span>
                      <span className="h-px flex-1 max-w-[80px] bg-white/10" aria-hidden="true" />
                    </div>

                    <ul className="space-y-2.5 font-sans text-xs sm:text-sm max-w-3xl">
                      {sector.focusItems.map((item, idx) => {
                        const isStructured = typeof item === 'object' && item !== null;
                        return (
                          <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                            <span
                              className={`${accentText} font-mono text-xs shrink-0 select-none mt-0.5`}
                              aria-hidden="true"
                            >
                              ▸
                            </span>
                            {isStructured ? (
                              <p className="leading-relaxed">
                                <span className="font-semibold text-white">
                                  {item.lead}{' '}
                                </span>
                                <span className="text-secondary/80">
                                  {item.body}
                                </span>
                              </p>
                            ) : (
                              <span className="text-secondary/90 leading-relaxed">{item}</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Verified Technologies Pill Strip */}
                  <div className="space-y-2.5 pt-3 border-t border-white/10 max-w-3xl">
                    <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-secondary/60">
                      {`${sector.techCategory} //`}
                    </div>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {sector.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[11px] px-2.5 py-1 border border-white/10 bg-white/[0.02] text-white/90 hover:border-white/30 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
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
