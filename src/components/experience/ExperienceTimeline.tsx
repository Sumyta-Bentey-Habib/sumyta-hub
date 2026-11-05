import React from 'react';
import { EXPERIENCE_DATA, ExperienceSector } from '@/utils/constants';

export const ExperienceTimeline: React.FC = () => {
  const experiences = EXPERIENCE_DATA.experiences as readonly ExperienceSector[];

  return (
    <div className="relative w-full max-w-5xl mx-auto py-4">
      <div className="relative">
        <div
          className="absolute top-3 bottom-8 left-3.5 sm:left-4 md:left-6 -translate-x-1/2 w-px bg-gradient-to-b from-primary via-accent-cyan/60 to-white/10"
          aria-hidden="true"
        />

        {/* Milestones Flow */}
        <div className="space-y-16 md:space-y-24">
          {experiences.map((sector) => {
            const isPrimary = sector.beaconColor === 'primary';
            const accentText = isPrimary ? 'text-primary' : 'text-accent-cyan';
            const accentBorder = isPrimary ? 'border-primary' : 'border-accent-cyan';
            const accentBg = isPrimary ? 'bg-primary' : 'bg-accent-cyan';

            return (
              <article
                key={sector.id}
                id={`milestone-${sector.id}`}
                className="experience-milestone relative flex items-start pl-10 sm:pl-14 md:pl-20"
                aria-labelledby={`role-${sector.id}`}
              >
                {/* ── INTEGRATED TIMELINE NODE (PIXEL-ART DIAMOND MARKER) ── */}
                <div
                  className="absolute left-3.5 sm:left-4 md:left-6 -translate-x-1/2 top-1.5 z-10 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <div className="relative w-5 h-5 flex items-center justify-center">
                    {/* Diamond Frame */}
                    <span
                      className={`w-3.5 h-3.5 rotate-45 border-2 ${accentBorder} bg-black transition-all ${
                        sector.active ? 'shadow-[0_0_16px_rgba(255,45,117,0.45)]' : ''
                      }`}
                    />

                    {/* Center Core */}
                    <span className={`absolute w-1.5 h-1.5 rotate-45 ${accentBg}`} />

                    {/* Active Ping for Currently Active Role */}
                    {sector.active && (
                      <span className="animate-ping absolute inset-0 rotate-45 border border-primary opacity-60" />
                    )}
                  </div>
                </div>

                {/* ── MILESTONE CONTENT ── */}
                <div className="w-full space-y-5">
                  {/* Metadata Row: Period & Status Badge */}
                  <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
                    <span
                      className={`font-bold tracking-widest text-[11px] px-2.5 py-0.5 border ${
                        isPrimary
                          ? 'border-primary/40 text-primary bg-primary/5'
                          : 'border-accent-cyan/40 text-accent-cyan bg-accent-cyan/5'
                      }`}
                    >
                      {sector.period}
                    </span>

                    <span className="text-white/20 select-none">/</span>

                    <span
                      className={`text-[10px] sm:text-[11px] tracking-wider uppercase font-semibold flex items-center gap-1.5 ${
                        sector.active ? 'text-primary' : 'text-secondary/70'
                      }`}
                    >
                      {sector.active && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
                      )}
                      {sector.statusLabel}
                    </span>

                    <span className="text-white/20 select-none hidden sm:inline">/</span>

                    <span className="text-[10px] tracking-widest uppercase font-mono text-secondary/50 hidden sm:inline">
                      {sector.sectorCode}
                    </span>
                  </div>

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

        {/* ── TIMELINE TERMINATION & VERIFICATION FOOTER ── */}
        <div className="relative pt-12 pl-10 sm:pl-14 md:pl-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10 mt-16 font-mono text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-[11px]">
              <span className="w-1.5 h-1.5 bg-primary rotate-45 inline-block" aria-hidden="true" />
              <span>TIMELINE VERIFIED // PRODUCTION RECORD</span>
            </div>
            <p className="text-secondary/60 text-xs">
              {EXPERIENCE_DATA.labels.verificationNote}
            </p>
          </div>

          <a
            href={EXPERIENCE_DATA.labels.caseworkHref}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-white hover:text-primary transition-colors uppercase tracking-wider shrink-0"
          >
            <span>{EXPERIENCE_DATA.labels.caseworkPrompt}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

ExperienceTimeline.displayName = 'ExperienceTimeline';
