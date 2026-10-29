'use client';

import React from 'react';
import { SKILLS_DATA, LivingSkillGroup, LivingSkillItem } from '@/utils/constants';
import styles from './LivingSkills.module.css';

interface LivingSkillsRosterProps {
  activeGroupId: 'frontend' | 'backend' | 'database' | 'tools';
  activeTechName: string | null;
  onSelectGroup: (groupId: 'frontend' | 'backend' | 'database' | 'tools') => void;
  onSelectTech: (groupId: 'frontend' | 'backend' | 'database' | 'tools', techName: string) => void;
}

export const LivingSkillsRoster: React.FC<LivingSkillsRosterProps> = ({
  activeGroupId,
  activeTechName,
  onSelectGroup,
  onSelectTech,
}) => {
  const categories = SKILLS_DATA.categories as readonly LivingSkillGroup[];

  return (
    <div className="w-full bg-black/95">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 lg:divide-x divide-white/10">
        {categories.map((group) => {
          const isGroupActive = activeGroupId === group.id;

          // Color tokens mapped for this station
          const accentColorClass =
            group.id === 'frontend'
              ? 'text-primary'
              : group.id === 'backend'
              ? 'text-accent-cyan'
              : group.id === 'database'
              ? 'text-window-amber'
              : 'text-finish-gold';

          const accentBorderClass =
            group.id === 'frontend'
              ? 'border-primary'
              : group.id === 'backend'
              ? 'border-accent-cyan'
              : group.id === 'database'
              ? 'border-window-amber'
              : 'border-finish-gold';

          const accentBgClass =
            group.id === 'frontend'
              ? 'bg-primary'
              : group.id === 'backend'
              ? 'bg-accent-cyan'
              : group.id === 'database'
              ? 'bg-window-amber'
              : 'bg-finish-gold';

          const accentGlowClass =
            group.id === 'frontend'
              ? styles.cardGlowFrontend
              : group.id === 'backend'
              ? styles.cardGlowBackend
              : group.id === 'database'
              ? styles.cardGlowDatabase
              : styles.cardGlowTools;

          const activeGradient =
            group.id === 'frontend'
              ? 'from-primary/10 via-primary/[0.02] to-transparent'
              : group.id === 'backend'
              ? 'from-accent-cyan/10 via-accent-cyan/[0.02] to-transparent'
              : group.id === 'database'
              ? 'from-window-amber/10 via-window-amber/[0.02] to-transparent'
              : 'from-finish-gold/10 via-finish-gold/[0.02] to-transparent';

          return (
            <div
              key={group.id}
              onMouseEnter={() => onSelectGroup(group.id)}
              className={`flex flex-col justify-between p-6 sm:p-7 relative transition-all duration-300 ${
                isGroupActive
                  ? `bg-gradient-to-b ${activeGradient} opacity-100`
                  : 'bg-transparent opacity-85 hover:opacity-100'
              }`}
            >
              {/* ── TOP BOULEVARD CONNECTOR FEED ── */}
              <div className="absolute top-0 left-0 right-0 h-1 pointer-events-none" aria-hidden="true">
                <div
                  className={`w-full h-full transition-all duration-300 ${
                    isGroupActive ? `${accentBgClass} ${accentGlowClass}` : 'bg-transparent'
                  }`}
                />
              </div>


              <div className="space-y-4">

                <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] tracking-widest text-secondary-dim/70">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rotate-45 transition-colors ${
                        isGroupActive ? `${accentBgClass} animate-pulse` : 'bg-white/20'
                      }`}
                      aria-hidden="true"
                    />
                    <span className="font-bold uppercase tracking-wider">{group.code}</span>
                  </div>


                  <span
                    className={`w-6 h-6 flex items-center justify-center font-bold text-xs border transition-all ${
                      isGroupActive
                        ? `${accentBorderClass} ${accentColorClass} bg-black ${accentGlowClass}`
                        : 'border-white/10 text-secondary-dim/60 bg-white/[0.02]'
                    }`}
                  >
                    {group.stationSymbol}
                  </span>
                </div>


                <button
                  type="button"
                  onClick={() => onSelectGroup(group.id)}
                  onFocus={() => onSelectGroup(group.id)}
                  className="w-full text-left group/btn focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary cursor-pointer"
                  aria-label={`Select ${group.title} station`}
                >
                  <h3
                    className={`text-2xl font-headline font-black uppercase tracking-tight transition-colors duration-150 ${
                      isGroupActive ? accentColorClass : 'text-white group-hover/btn:text-white'
                    }`}
                  >
                    {group.title}
                  </h3>

                  <p className="text-xs font-mono text-secondary-dim/70 leading-relaxed mt-1">
                    {group.subtitle}
                  </p>
                </button>


                <div
                  className={`flex items-center gap-2 px-2.5 py-1 text-[10px] font-mono border transition-all ${
                    isGroupActive
                      ? `${accentBorderClass} ${accentColorClass} bg-black/60 font-bold`
                      : 'border-white/5 text-secondary-dim/40 bg-white/[0.01]'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isGroupActive ? `${accentBgClass} animate-ping` : 'bg-white/20'
                    }`}
                    aria-hidden="true"
                  />
                  <span>
                    {isGroupActive ? '[STATION ACTIVE // PATROL ENGAGED]' : '[STANDBY // PATROL READY]'}
                  </span>
                </div>
              </div>

       
              <div className="space-y-3.5 pt-6 pb-6">
                {group.skills.map((skill: LivingSkillItem, skillIndex: number) => {
                  const isTechActive = activeTechName === skill.name;
                  const prevSubcategory =
                    skillIndex > 0 ? group.skills[skillIndex - 1]?.subcategory : undefined;
                  const showSubcategoryHeader =
                    Boolean(skill.subcategory) && skill.subcategory !== prevSubcategory;

                  return (
                    <React.Fragment key={skill.id}>
                      {showSubcategoryHeader && (
                        <div className="flex items-center gap-2 pt-3 pb-1 text-[10px] font-mono tracking-widest text-secondary-dim/80">
                          <span
                            className={`w-1.5 h-1.5 ${
                              group.id === 'database' ? 'bg-window-amber' : 'bg-primary'
                            } rotate-45 inline-block shrink-0`}
                            aria-hidden="true"
                          />
                          <span className="font-bold text-white uppercase tracking-widest">
                            {skill.subcategory}
                          </span>
                          <span className="h-px bg-white/10 flex-grow" />
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          onSelectGroup(group.id);
                          onSelectTech(group.id, skill.name);
                        }}
                        onMouseEnter={() => {
                          onSelectGroup(group.id);
                          onSelectTech(group.id, skill.name);
                        }}
                        onFocus={() => {
                          onSelectGroup(group.id);
                          onSelectTech(group.id, skill.name);
                        }}
                        className={`w-full text-left p-3 transition-all duration-150 border-l-2 bg-transparent cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                          isTechActive
                            ? `${accentBorderClass} bg-white/[0.05] shadow-[inset_0_0_12px_rgba(255,255,255,0.03)]`
                            : 'border-white/10 hover:border-white/40 hover:bg-white/[0.02]'
                        }`}
                        aria-label={`Inspect ${skill.name} in ${group.title}`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`font-mono text-sm font-bold transition-colors ${
                              isTechActive ? accentColorClass : 'text-white'
                            }`}
                          >
                            {skill.name}
                          </span>

                          <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 border border-white/10 text-secondary-dim/80 bg-black/40">
                            {skill.badge}
                          </span>
                        </div>

                        <p className="text-xs text-secondary-dim/80 font-sans mt-1.5 leading-relaxed">
                          {skill.spec}
                        </p>
                      </button>
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Station Landmark Node Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-secondary-dim/50 uppercase tracking-widest">
                <span>NODE // {group.stationName}</span>
                <span className={isGroupActive ? accentColorClass : 'text-white/20'}>➔</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
