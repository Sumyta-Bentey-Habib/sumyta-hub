'use client';

import React, { useEffect, useRef } from 'react';
import { ABOUT_DATA } from '@/utils/constants';
import { initAboutScrollAnimations } from '@/utils/about';
import { AboutHeader } from './AboutHeader';
import { AboutPortrait } from './AboutPortrait';
import { AboutContent } from './AboutContent';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanup = initAboutScrollAnimations({
      section: sectionRef.current,
      header: headerRef.current,
      portrait: portraitRef.current,
      content: contentRef.current,
      metadata: metadataRef.current,
    });

    return cleanup;
  }, []);

  return (
    <section
      ref={sectionRef}
      id={ABOUT_DATA.sectionId}
      aria-labelledby="about-heading"
      className="relative py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-black text-white overflow-hidden border-t border-white/10 selection:bg-primary selection:text-black"
    >
      {/* Ambient Cyberpunk Lighting */}
      <div
        className="absolute top-0 left-1/4 w-[650px] h-[650px] bg-gradient-to-br from-primary/10 via-[#4b3080]/15 to-transparent blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-12 right-12 w-[550px] h-[550px] bg-gradient-to-tl from-[#00f2fe]/8 via-[#160d24]/30 to-transparent blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <AboutHeader ref={headerRef} />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
        <AboutPortrait ref={portraitRef} />
        <AboutContent ref={contentRef} metadataRef={metadataRef} />
      </div>
    </section>
  );
}
