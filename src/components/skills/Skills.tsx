'use client';

import React, { useState } from 'react';
import { LivingSkillsHeader } from './LivingSkillsHeader';
import { LivingSkillsCanvas } from './LivingSkillsCanvas';
import { LivingSkillsRoster } from './LivingSkillsRoster';

const Skills: React.FC = () => {
  const [activeGroupId, setActiveGroupId] = useState<'frontend' | 'backend' | 'database' | 'tools'>('frontend');
  const [activeTechName, setActiveTechName] = useState<string | null>('React');

  const handleSelectGroup = (groupId: 'frontend' | 'backend' | 'database' | 'tools') => {
    setActiveGroupId(groupId);
    // Set a default tech for the group
    if (groupId === 'frontend') setActiveTechName('React');
    else if (groupId === 'backend') setActiveTechName('Node.js');
    else if (groupId === 'database') setActiveTechName('MongoDB');
    else if (groupId === 'tools') setActiveTechName('Git');
  };

  const handleSelectTech = (groupId: 'frontend' | 'backend' | 'database' | 'tools', techName: string) => {
    setActiveGroupId(groupId);
    setActiveTechName(techName);
  };

  return (
    <section
      id="skills"
      className="relative py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-black text-white overflow-hidden border-t border-white/10 selection:bg-primary selection:text-black"
      aria-labelledby="skills-heading"
    >
      {/* Background Ambient Cyberpunk Lighting */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent-cyan/5 blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* ── 1. TELEMETRY HEADER ── */}
        <LivingSkillsHeader />

        {/* ── 2. LIVING PIXEL-ART SCENE CANVAS ── */}
        <LivingSkillsCanvas
          activeGroupId={activeGroupId}
          activeTechName={activeTechName}
          onSelectGroup={handleSelectGroup}
        />

        {/* ── 3. STRUCTURED TYPOGRAPHIC SKILLS ROSTER (NO CARDS) ── */}
        <LivingSkillsRoster
          activeGroupId={activeGroupId}
          activeTechName={activeTechName}
          onSelectGroup={handleSelectGroup}
          onSelectTech={handleSelectTech}
        />
      </div>
    </section>
  );
};

export default Skills;
