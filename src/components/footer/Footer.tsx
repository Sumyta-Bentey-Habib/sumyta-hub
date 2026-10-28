'use client';

import React from 'react';
import { CONTACT_DATA } from '@/utils/constants';
import { FooterSkyline } from './FooterSkyline';
import { FooterIdentity } from './FooterIdentity';
import { FooterChannels } from './FooterChannels';
import { FooterBottom } from './FooterBottom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer
      id={CONTACT_DATA.sectionId}
      role="contentinfo"
      aria-labelledby="footer-heading"
      className="relative w-full bg-black text-white overflow-hidden border-t border-white/10 selection:bg-primary selection:text-black"
    >
      {/* ── AMBIENT CYBERPUNK NIGHTTIME LIGHTING ── */}
      <div
        className="absolute top-0 left-1/3 w-[500px] h-[350px] bg-gradient-to-b from-primary/5 via-transparent to-transparent blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-[450px] h-[300px] bg-gradient-to-t from-accent-cyan/5 via-transparent to-transparent blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      {/* ── 1. ENVIRONMENTAL PIXEL SKYLINE HORIZON ── */}
      <FooterSkyline />

      {/* ── 2. FOOTER CONTENT CONTAINER ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 pt-12 md:pt-16 pb-12 relative z-10 space-y-12">
        {/* Telemetry Status Line */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 font-mono text-xs">
          <div className="flex items-center gap-3 text-primary">
            <span className="w-2 h-2 bg-primary rotate-45 inline-block shrink-0" aria-hidden="true" />
            <span className="font-bold tracking-[0.25em] uppercase">{CONTACT_DATA.kicker}</span>
            <span className="text-white/20 select-none">/</span>
            <span className="text-secondary/60 uppercase">{CONTACT_DATA.signal.tag}</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 border border-primary/30 bg-primary/5 text-primary text-[10px] tracking-wider uppercase font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span>{CONTACT_DATA.signal.status}</span>
          </div>
        </div>

        {/* Main Grid: Identity & Statement (Left) vs. Direct Transmission & Channels (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <FooterIdentity />
          <FooterChannels />
        </div>

        {/* ── 3. BASELINE: COPYRIGHT & BACK-TO-TOP ACTION ── */}
        <FooterBottom currentYear={currentYear} onBackToTop={handleBackToTop} />
      </div>
    </footer>
  );
}
