'use client';

import React from 'react';
import { CONTACT_DATA, COLOR_TOKENS } from '@/utils/constants';

const Footer: React.FC = () => {
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
      {/* ── SCOPED ENVIRONMENTAL CSS KEYFRAMES ── */}
      <style>{`
        @keyframes footerNeonFlicker {
          0%, 100% { opacity: 1; filter: drop-shadow(0 0 4px ${COLOR_TOKENS.primaryNeon}); }
          42% { opacity: 1; filter: drop-shadow(0 0 4px ${COLOR_TOKENS.primaryNeon}); }
          43% { opacity: 0.45; filter: none; }
          44% { opacity: 0.95; filter: drop-shadow(0 0 3px ${COLOR_TOKENS.primaryNeon}); }
          79% { opacity: 1; filter: drop-shadow(0 0 4px ${COLOR_TOKENS.primaryNeon}); }
          80% { opacity: 0.6; filter: none; }
          81% { opacity: 1; filter: drop-shadow(0 0 4px ${COLOR_TOKENS.primaryNeon}); }
        }
        @keyframes footerWindowBreathe {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 0.35; }
        }
        @keyframes footerBeaconPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
        .footer-neon-sign {
          animation: footerNeonFlicker 6.5s infinite ease-in-out;
        }
        .footer-window-amber {
          animation: footerWindowBreathe 4.2s infinite ease-in-out;
        }
        .footer-window-cyan {
          animation: footerWindowBreathe 5.5s infinite ease-in-out 1.2s;
        }
        .footer-beacon-dot {
          animation: footerBeaconPulse 2.6s infinite ease-in-out;
        }
        @media (prefers-reduced-motion: reduce) {
          .footer-neon-sign,
          .footer-window-amber,
          .footer-window-cyan,
          .footer-beacon-dot {
            animation: none !important;
            opacity: 0.85 !important;
          }
        }
      `}</style>

      {/* ── AMBIENT CYBERPUNK NIGHTTIME LIGHTING ── */}
      <div
        className="absolute top-0 left-1/3 w-[500px] h-[350px] bg-gradient-to-b from-primary/5 via-transparent to-transparent blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-[450px] h-[300px] bg-gradient-to-t from-accent-cyan/5 via-transparent to-transparent blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      {/* ── 1. SUBTLE ENVIRONMENTAL PIXEL SKYLINE HORIZON (CITY AT REST) ── */}
      <div
        className="relative w-full h-16 sm:h-20 bg-gradient-to-b from-black via-surface-lowest to-surface-night overflow-hidden border-b border-white/10"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          className="w-full h-full [image-rendering:pixelated]"
          shapeRendering="crispEdges"
        >
          {/* Distant Layer Silhouettes */}
          <rect x="0" y="42" width="120" height="38" fill={COLOR_TOKENS.skylineFar} />
          <rect x="110" y="30" width="85" height="50" fill={COLOR_TOKENS.skylineFar} />
          <rect x="185" y="48" width="95" height="32" fill={COLOR_TOKENS.skylineFar} />
          <rect x="270" y="24" width="130" height="56" fill={COLOR_TOKENS.skylineFar} />
          <rect x="390" y="40" width="110" height="40" fill={COLOR_TOKENS.skylineFar} />
          <rect x="490" y="18" width="140" height="62" fill={COLOR_TOKENS.skylineFar} />
          <rect x="620" y="36" width="90" height="44" fill={COLOR_TOKENS.skylineFar} />
          <rect x="700" y="28" width="120" height="52" fill={COLOR_TOKENS.skylineFar} />
          <rect x="810" y="44" width="130" height="36" fill={COLOR_TOKENS.skylineFar} />
          <rect x="930" y="22" width="115" height="58" fill={COLOR_TOKENS.skylineFar} />
          <rect x="1035" y="38" width="85" height="42" fill={COLOR_TOKENS.skylineFar} />
          <rect x="1110" y="32" width="90" height="48" fill={COLOR_TOKENS.skylineFar} />

          {/* Near Layer Stepped Buildings */}
          <rect x="40" y="52" width="90" height="28" fill={COLOR_TOKENS.skylineMid} />
          <rect x="145" y="42" width="110" height="38" fill={COLOR_TOKENS.skylineNear} />
          <rect x="240" y="56" width="80" height="24" fill={COLOR_TOKENS.skylineMid} />
          <rect x="330" y="36" width="105" height="44" fill={COLOR_TOKENS.skylineNear} />
          <rect x="450" y="50" width="85" height="30" fill={COLOR_TOKENS.skylineMid} />
          <rect x="550" y="32" width="120" height="48" fill={COLOR_TOKENS.skylineNear} />
          <rect x="685" y="46" width="95" height="34" fill={COLOR_TOKENS.skylineMid} />
          <rect x="790" y="38" width="110" height="42" fill={COLOR_TOKENS.skylineNear} />
          <rect x="915" y="48" width="95" height="32" fill={COLOR_TOKENS.skylineMid} />
          <rect x="1020" y="40" width="100" height="40" fill={COLOR_TOKENS.skylineNear} />

          {/* Antennas & Communication Masts */}
          <line x1="382" y1="20" x2="382" y2="36" stroke={COLOR_TOKENS.catwalkRail} strokeWidth="1" />
          <line x1="610" y1="12" x2="610" y2="32" stroke={COLOR_TOKENS.catwalkRail} strokeWidth="1" />
          <line x1="845" y1="18" x2="845" y2="38" stroke={COLOR_TOKENS.catwalkRail} strokeWidth="1" />

          {/* Glowing Beacon on Central Mast */}
          <circle
            cx="610"
            cy="11"
            r="1.5"
            fill={COLOR_TOKENS.primaryNeon}
            className="footer-beacon-dot"
          />

          {/* Subtle Amber Window Lights (Breathing Night Atmosphere) */}
          <rect x="160" y="48" width="3" height="3" fill={COLOR_TOKENS.windowAmber} className="footer-window-amber" />
          <rect x="172" y="48" width="3" height="3" fill={COLOR_TOKENS.windowAmber} className="footer-window-amber" />
          <rect x="350" y="44" width="3" height="3" fill={COLOR_TOKENS.windowAmber} className="footer-window-amber" />
          <rect x="362" y="54" width="3" height="3" fill={COLOR_TOKENS.windowAmber} className="footer-window-amber" />
          <rect x="575" y="42" width="3" height="3" fill={COLOR_TOKENS.windowAmber} className="footer-window-amber" />
          <rect x="588" y="42" width="3" height="3" fill={COLOR_TOKENS.windowAmber} className="footer-window-amber" />
          <rect x="815" y="46" width="3" height="3" fill={COLOR_TOKENS.windowAmber} className="footer-window-amber" />
          <rect x="1045" y="48" width="3" height="3" fill={COLOR_TOKENS.windowAmber} className="footer-window-amber" />

          {/* Subtle Cyan Window Lights */}
          <rect x="160" y="58" width="3" height="3" fill={COLOR_TOKENS.accentCyan} className="footer-window-cyan" />
          <rect x="575" y="52" width="3" height="3" fill={COLOR_TOKENS.accentCyan} className="footer-window-cyan" />
          <rect x="830" y="54" width="3" height="3" fill={COLOR_TOKENS.accentCyan} className="footer-window-cyan" />
          <rect x="1060" y="58" width="3" height="3" fill={COLOR_TOKENS.accentCyan} className="footer-window-cyan" />

          {/* Rooftop Pixel Neon Sign: [ TERMINUS ] with Gentle Flicker */}
          <g className="footer-neon-sign">
            <rect x="348" y="28" width="56" height="7" fill={COLOR_TOKENS.surfaceContainer} stroke={COLOR_TOKENS.primaryNeon} strokeWidth="0.75" />
            <text
              x="376"
              y="33.5"
              fill={COLOR_TOKENS.primaryNeon}
              fontSize="4.5"
              fontFamily="monospace"
              fontWeight="bold"
              textAnchor="middle"
              letterSpacing="1"
            >
              TERMINUS
            </text>
          </g>
        </svg>
      </div>

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
          {/* Identity & Closing Statement */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="font-mono text-xs tracking-widest text-primary uppercase font-bold flex items-center gap-2">
                <span>{CONTACT_DATA.branding.role}</span>
                <span className="text-white/20 select-none">{'//'}</span>
                <span className="text-secondary/60">SECTOR 05</span>
              </div>

              <h2
                id="footer-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-headline font-black uppercase text-white tracking-tight leading-none"
              >
                {CONTACT_DATA.branding.name}
              </h2>
            </div>

            {/* Short, Natural Closing Line Reflecting Full-Stack Developer Identity */}
            <p className="font-sans text-sm sm:text-base text-secondary/90 leading-relaxed max-w-xl">
              {CONTACT_DATA.branding.closingLine}
            </p>

            <p className="font-sans text-xs sm:text-sm text-secondary/60 leading-relaxed max-w-xl">
              {CONTACT_DATA.branding.invitation}
            </p>

            {/* Primary Action Button */}
            <div className="pt-2">
              <a
                href={CONTACT_DATA.action.href}
                aria-label={CONTACT_DATA.action.ariaLabel}
                className="group inline-flex items-center gap-3 px-6 py-3 border border-primary bg-primary/10 hover:bg-primary text-white hover:text-black font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(255,45,117,0.2)] hover:shadow-[0_0_30px_rgba(255,45,117,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <span className="w-1.5 h-1.5 bg-primary group-hover:bg-black rotate-45 transition-colors" aria-hidden="true" />
                <span>{CONTACT_DATA.action.label}</span>
                <span className="transform group-hover:translate-x-1 transition-transform" aria-hidden="true">
                  ➔
                </span>
              </a>
            </div>
          </div>

          {/* Direct Communication Channels */}
          <div className="lg:col-span-5 space-y-6 lg:pl-6 lg:border-l lg:border-white/10">
            {/* Email Channel */}
            <div className="space-y-2">
              <div className="font-mono text-[10px] tracking-widest text-secondary/50 uppercase">
                {`${CONTACT_DATA.channels.email.label} //`}
              </div>
              <a
                href={CONTACT_DATA.channels.email.href}
                aria-label={CONTACT_DATA.channels.email.ariaLabel}
                className="group block font-mono text-base sm:text-lg text-white hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary break-all"
              >
                <span className="border-b border-white/20 group-hover:border-primary transition-colors pb-0.5">
                  {CONTACT_DATA.channels.email.address}
                </span>
              </a>
            </div>

            {/* Social Channels Strip */}
            <div className="space-y-2.5 pt-2">
              <div className="font-mono text-[10px] tracking-widest text-secondary/50 uppercase">
                {`${CONTACT_DATA.channels.socialsLabel} //`}
              </div>
              <div className="flex flex-wrap gap-3">
                {CONTACT_DATA.channels.socials.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.ariaLabel} (opens in new tab)`}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-white/10 bg-white/[0.02] hover:border-primary hover:text-white text-secondary/80 font-mono text-xs uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                  >
                    <span>{social.label}</span>
                    <span className="text-primary text-[10px] select-none" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Badge */}
            <div className="p-3 border border-white/10 bg-surface-lowest/70 font-mono text-xs text-secondary/70 flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-accent-cyan shrink-0 animate-pulse" aria-hidden="true" />
              <span>Available for remote engineering & global roles</span>
            </div>
          </div>
        </div>

        {/* ── 3. BASELINE: COPYRIGHT & BACK-TO-TOP ACTION ── */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 font-mono text-xs">
          <div className="flex flex-wrap items-center gap-3 text-secondary/60">
            <span className="font-bold text-white tracking-widest">{CONTACT_DATA.footer.monogram}</span>
            <span className="text-white/20 select-none">/</span>
            <span>{`© ${currentYear} SUMYTA BENTEY HABIB. ALL RIGHTS RESERVED.`}</span>
          </div>

          {/* Simple Back-to-Top Button */}
          <button
            type="button"
            onClick={handleBackToTop}
            aria-label={CONTACT_DATA.footer.backToTopAria}
            className="group inline-flex items-center gap-2 px-3 py-1.5 border border-white/15 bg-white/[0.02] hover:border-primary hover:bg-primary/10 text-white font-mono text-xs uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span className="text-primary transform group-hover:-translate-y-0.5 transition-transform" aria-hidden="true">
              ▲
            </span>
            <span className="font-bold group-hover:text-primary transition-colors">
              {CONTACT_DATA.footer.backToTopLabel}
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
