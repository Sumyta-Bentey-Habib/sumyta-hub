'use client';

import React from 'react';
import { SKILLS_DATA, LivingSkillGroup, LivingSkillItem } from '@/utils/constants';

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
    <div className="w-full space-y-6">
      {/* ── 4 STRUCTURED TYPOGRAPHIC DISTRICTS (NO CARDS, CLEAN PIXEL RULES) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-white/10 border-y border-white/10 py-8">
        {categories.map((group) => {
          const isGroupActive = activeGroupId === group.id;

          // Color accents based on group token
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

          return (
            <div
              key={group.id}
              className={`flex flex-col justify-between space-y-6 lg:px-6 first:pl-0 last:pr-0 transition-opacity duration-200 ${
                isGroupActive ? 'opacity-100' : 'opacity-85 hover:opacity-100'
              }`}
            >
              {/* District Group Header */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => onSelectGroup(group.id)}
                  className="w-full text-left group/btn focus:outline-none"
                  aria-label={`Select ${group.title} group`}
                >
                  <div className="flex items-center justify-between font-mono text-[11px] tracking-widest text-secondary-dim/70">
                    <span>{group.code}</span>
                    <span className="font-bold text-xs">{group.stationSymbol}</span>
                  </div>

                  <h3
                    className={`text-xl font-bold tracking-tight mt-1 transition-colors duration-150 ${
                      isGroupActive ? accentColorClass : 'text-white group-hover/btn:text-white'
                    }`}
                  >
                    {group.title}
                  </h3>

                  <p className="text-xs font-mono text-secondary-dim/70 leading-relaxed mt-0.5">
                    {group.subtitle}
                  </p>
                </button>
              </div>

              {/* Verified Technical Items List */}
              <div className="space-y-4 pt-2">
                {group.skills.map((skill: LivingSkillItem, skillIndex: number) => {
                  const isTechActive = activeTechName === skill.name;
                  const prevSubcategory =
                    skillIndex > 0 ? group.skills[skillIndex - 1]?.subcategory : undefined;
                  const showSubcategoryHeader =
                    Boolean(skill.subcategory) && skill.subcategory !== prevSubcategory;

                  return (
                    <React.Fragment key={skill.id}>
                      {showSubcategoryHeader && (
                        <div className="flex items-center gap-2 pt-2 pb-0.5 text-[10px] font-mono tracking-widest text-secondary-dim/80">
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
                        onClick={() => onSelectTech(group.id, skill.name)}
                        onMouseEnter={() => onSelectTech(group.id, skill.name)}
                        className={`w-full text-left p-2.5 transition-all duration-150 border-l-2 bg-transparent focus:outline-none ${
                          isTechActive
                            ? `${accentBorderClass} bg-white/[0.04]`
                            : 'border-white/10 hover:border-white/40 hover:bg-white/[0.02]'
                        }`}
                        aria-label={`Inspect ${skill.name} in ${group.title}`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`font-mono text-sm font-semibold transition-colors ${
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

              {/* Station Landmark Tag */}
              <div className="pt-4 border-t border-white/5 font-mono text-[10px] text-secondary-dim/50 uppercase tracking-widest">
                NODE // {group.stationName}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
