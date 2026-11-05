import React from 'react';
import { EXPERIENCE_DATA } from '@/utils/constants';
import { ExperienceHeader } from './ExperienceHeader';
import { ExperienceTimeline } from './ExperienceTimeline';

export default function Experience() {
  return (
    <section
      id={EXPERIENCE_DATA.sectionId}
      aria-labelledby="experience-heading"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-black text-white overflow-hidden border-t border-white/10 selection:bg-primary selection:text-black"
    >
      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 via-transparent to-transparent blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-12 right-12 w-[500px] h-[500px] bg-gradient-to-tl from-accent-cyan/5 via-transparent to-transparent blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      {/* ── TOP SECTION BANNER ── */}
      <ExperienceHeader />

      <div className="max-w-6xl mx-auto relative z-10">
        <ExperienceTimeline />
      </div>
    </section>
  );
}
