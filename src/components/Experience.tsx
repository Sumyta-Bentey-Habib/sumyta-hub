'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { EXPERIENCE_DATA } from '@/utils/constants';
import { initExperienceScrollAnimations } from '@/utils/experienceMotion';
import { ExperienceHeader } from './ExperienceHeader';
import { ExperienceDistrictCanvas } from './ExperienceDistrictCanvas';
import { ExperienceDistrictPanel } from './ExperienceDistrictPanel';

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [activeSector, setActiveSector] = useState<'xiia' | 'independent'>('xiia');

  useEffect(() => {
    const cleanup = initExperienceScrollAnimations({
      section: sectionRef.current,
      header: headerRef.current,
      container: containerRef.current,
      footer: footerRef.current,
    });

    return cleanup;
  }, []);

  const handleSelectSector = useCallback((sector: 'xiia' | 'independent') => {
    setActiveSector(sector);
    // Smooth scroll to the corresponding dossier panel if needed
    const target = document.getElementById(
      sector === 'xiia' ? 'sector-dossier-01' : 'sector-dossier-02'
    );
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id={EXPERIENCE_DATA.sectionId}
      aria-labelledby="experience-heading"
      className="relative py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-black text-white overflow-hidden border-t border-white/10 selection:bg-primary selection:text-black"
    >
      {/* ── AMBIENT CYBERPUNK HORIZON LIGHTING ── */}
      <div
        className="absolute top-0 left-1/4 w-[650px] h-[650px] bg-gradient-to-br from-primary/10 via-[#4b3080]/15 to-transparent blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-12 right-12 w-[550px] h-[550px] bg-gradient-to-tl from-[#00f2fe]/8 via-[#160d24]/30 to-transparent blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      {/* ── TOP SECTION BANNER ── */}
      <ExperienceHeader ref={headerRef} />

      <div ref={containerRef} className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* ── CAREER DISTRICT INTERACTIVE 2D PIXEL CANVAS ── */}
        <ExperienceDistrictCanvas
          activeSector={activeSector}
          onSelectSector={handleSelectSector}
        />

        {/* ── INTEGRATED ARCHITECTURAL WORKSTATION DOSSIERS ── */}
        <div ref={footerRef}>
          <ExperienceDistrictPanel
            activeSector={activeSector}
            onSelectSector={handleSelectSector}
          />
        </div>
      </div>
    </section>
  );
}
