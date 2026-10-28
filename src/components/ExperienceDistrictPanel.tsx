import React from 'react';
import { EXPERIENCE_DATA, COLOR_TOKENS, ExperienceSector } from '@/utils/constants';

interface ExperienceDistrictPanelProps {
  readonly activeSector: 'xiia' | 'independent';
  readonly onSelectSector: (sector: 'xiia' | 'independent') => void;
}

export const ExperienceDistrictPanel: React.FC<ExperienceDistrictPanelProps> = ({
  activeSector,
  onSelectSector,
}) => {
  return (
    <div className="space-y-12 relative z-10">
      {/* ── SECTOR NAVIGATION TABS (MATCHING GAME UI) ── */}
      <div className="flex items-center gap-2 p-1.5 border border-white/20 bg-surface-container-low max-w-xl mx-auto font-mono text-xs">
        <button
          type="button"
          onClick={() => onSelectSector('xiia')}
          style={
            activeSector === 'xiia'
              ? {
                  backgroundColor: COLOR_TOKENS.primary,
                  color: COLOR_TOKENS.black,
                }
              : undefined
          }
          className={`flex-1 py-2.5 px-3 text-center uppercase tracking-wider font-bold transition-all cursor-pointer ${
            activeSector === 'xiia'
              ? 'bg-primary text-black shadow-[0_0_20px_rgba(255,45,117,0.4)]'
              : 'text-secondary/70 hover:text-white hover:bg-white/5'
          }`}
        >
          ★ 01 // XIIA TOWER (PRODUCTION)
        </button>

        <button
          type="button"
          onClick={() => onSelectSector('independent')}
          style={
            activeSector === 'independent'
              ? {
                  backgroundColor: COLOR_TOKENS.accentCyan,
                  color: COLOR_TOKENS.black,
                }
              : undefined
          }
          className={`flex-1 py-2.5 px-3 text-center uppercase tracking-wider font-bold transition-all cursor-pointer ${
            activeSector === 'independent'
              ? 'bg-accent-cyan text-black shadow-[0_0_20px_rgba(0,242,254,0.4)]'
              : 'text-secondary/70 hover:text-white hover:bg-white/5'
          }`}
        >
          ⚡ 02 // INDEPENDENT LABS (R&D)
        </button>
      </div>

      {/* ── SECTOR DOSSIER PANELS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {EXPERIENCE_DATA.experiences.map((sector: ExperienceSector) => {
          const isXiia = sector.id === '01';
          const isCurrentActive = (isXiia && activeSector === 'xiia') || (!isXiia && activeSector === 'independent');
          const borderStyle = isXiia ? 'border-primary' : 'border-accent-cyan';
          const accentTextColor = isXiia ? 'text-primary' : 'text-accent-cyan';
          const accentBgColor = isXiia ? 'bg-primary' : 'bg-accent-cyan';
          const shadowGlow = isXiia
            ? 'shadow-[0_0_40px_rgba(255,45,117,0.25)]'
            : 'shadow-[0_0_40px_rgba(0,242,254,0.25)]';

          return (
            <article
              key={sector.id}
              id={`sector-dossier-${sector.id}`}
              style={{
                backgroundColor: COLOR_TOKENS.surfaceContainer,
                borderColor: isXiia ? COLOR_TOKENS.primaryNeon : COLOR_TOKENS.accentCyan,
              }}
              className={`relative border-2 ${borderStyle} p-6 sm:p-8 font-mono transition-all duration-500 ${
                isCurrentActive ? `${shadowGlow} scale-[1.01]` : 'opacity-85 hover:opacity-100'
              }`}
            >
              {/* Corner Accent Brackets */}
              <span
                style={{ borderColor: isXiia ? COLOR_TOKENS.primaryNeon : COLOR_TOKENS.accentCyan }}
                className={`absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 ${borderStyle} pointer-events-none`}
                aria-hidden="true"
              />
              <span
                style={{ borderColor: isXiia ? COLOR_TOKENS.primaryNeon : COLOR_TOKENS.accentCyan }}
                className={`absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 ${borderStyle} pointer-events-none`}
                aria-hidden="true"
              />
              <span
                style={{ borderColor: isXiia ? COLOR_TOKENS.primaryNeon : COLOR_TOKENS.accentCyan }}
                className={`absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 ${borderStyle} pointer-events-none`}
                aria-hidden="true"
              />
              <span
                style={{ borderColor: isXiia ? COLOR_TOKENS.primaryNeon : COLOR_TOKENS.accentCyan }}
                className={`absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 ${borderStyle} pointer-events-none`}
                aria-hidden="true"
              />

              {/* Dossier Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <span
                    style={{ backgroundColor: isXiia ? COLOR_TOKENS.primaryNeon : COLOR_TOKENS.accentCyan }}
                    className={`w-2.5 h-2.5 ${accentBgColor} animate-pulse`}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-sm sm:text-base font-black tracking-wider text-white uppercase leading-none">
                      {sector.districtTitle}
                    </h3>
                    <span className="text-[10px] text-secondary/50 font-semibold tracking-widest uppercase mt-1 block">
                      {sector.sectorCode}
                    </span>
                  </div>
                </div>

                <span
                  style={{
                    borderColor: isXiia ? COLOR_TOKENS.primaryDim : COLOR_TOKENS.accentCyan,
                    color: isXiia ? COLOR_TOKENS.primaryNeon : COLOR_TOKENS.accentCyan,
                  }}
                  className={`px-2.5 py-1 text-[9px] border ${
                    isXiia
                      ? 'border-primary/40 text-primary bg-primary/10'
                      : 'border-accent-cyan/40 text-accent-cyan bg-accent-cyan/10'
                  } tracking-widest uppercase font-bold`}
                >
                  {sector.statusLabel}
                </span>
              </div>

              {/* Dossier Metadata Strip */}
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center justify-between py-1.5 border-b border-white/10">
                  <span className="text-secondary/50 uppercase text-[11px]">ORGANIZATION:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white uppercase tracking-wider">{sector.company}</span>
                    <span className="text-[10px] text-secondary/40 font-mono">({sector.location})</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-white/10">
                  <span className="text-secondary/50 uppercase text-[11px]">ROLE / TITLE:</span>
                  <span
                    style={{ color: isXiia ? COLOR_TOKENS.primaryNeon : COLOR_TOKENS.accentCyan }}
                    className={`font-bold uppercase tracking-wider ${accentTextColor}`}
                  >
                    {sector.role}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-white/10">
                  <span className="text-secondary/50 uppercase text-[11px]">DURATION:</span>
                  <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    {sector.period}
                  </span>
                </div>

                {/* Scope & Responsibilities Narrative */}
                <div className="py-2.5 border-b border-white/10">
                  <span className="text-secondary/50 uppercase text-[11px] block mb-2">
                    MISSION SCOPE:
                  </span>
                  <p className="text-secondary/90 leading-relaxed bg-black/50 p-3.5 border border-white/10 text-xs sm:text-sm">
                    {sector.description}
                  </p>
                </div>

                {/* Verified Deliverables List */}
                <div className="pt-2 pb-1">
                  <span className="text-secondary/50 uppercase text-[11px] block mb-2.5">
                    {sector.focusCategory}:
                  </span>
                  <ul className="space-y-2 list-none p-0 m-0">
                    {sector.focusItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-secondary/90">
                        <span
                          style={{ color: isXiia ? COLOR_TOKENS.primaryNeon : COLOR_TOKENS.accentCyan }}
                          className={`${accentTextColor} shrink-0 select-none font-bold`}
                          aria-hidden="true"
                        >
                          › [{String(idx + 1).padStart(2, '0')}]
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Verified Production Technologies Matrix */}
                <div className="pt-3 border-t border-white/10">
                  <span className="text-secondary/50 uppercase text-[10px] tracking-widest block mb-2">
                    {sector.techCategory}:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {sector.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-[11px] font-mono border border-white/15 bg-black/40 text-secondary hover:border-primary hover:text-white transition-colors"
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

      {/* ── FOOTER TRAVEL LINK ── */}
      <div className="p-6 border-2 border-white/20 bg-surface-container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono shadow-[0_0_30px_rgba(0,0,0,0.8)]">
        <div className="space-y-1">
          <span className="text-[10px] tracking-widest text-primary uppercase font-bold block">
            {EXPERIENCE_DATA.labels.recordPrefix}VERIFIED // NODE AUTHENTICATED
          </span>
          <p className="text-xs text-secondary/75">
            {EXPERIENCE_DATA.labels.verificationNote}
          </p>
        </div>

        <a
          href={EXPERIENCE_DATA.labels.caseworkHref}
          style={{
            backgroundColor: COLOR_TOKENS.primary,
            color: COLOR_TOKENS.black,
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-black font-black uppercase text-xs hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(255,45,117,0.35)] shrink-0"
        >
          {EXPERIENCE_DATA.labels.caseworkPrompt}
        </a>
      </div>
    </div>
  );
};
