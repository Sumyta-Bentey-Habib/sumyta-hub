import React from 'react';
import { COLOR_TOKENS } from '@/utils/constants';
import styles from './FooterSkyline.module.css';

export const FooterSkyline: React.FC = () => {
  return (
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
          className={styles.footerBeaconDot}
        />

        {/* Subtle Amber Window Lights (Breathing Night Atmosphere) */}
        <rect x="160" y="48" width="3" height="3" fill={COLOR_TOKENS.windowAmber} className={styles.footerWindowAmber} />
        <rect x="172" y="48" width="3" height="3" fill={COLOR_TOKENS.windowAmber} className={styles.footerWindowAmber} />
        <rect x="350" y="44" width="3" height="3" fill={COLOR_TOKENS.windowAmber} className={styles.footerWindowAmber} />
        <rect x="362" y="54" width="3" height="3" fill={COLOR_TOKENS.windowAmber} className={styles.footerWindowAmber} />
        <rect x="575" y="42" width="3" height="3" fill={COLOR_TOKENS.windowAmber} className={styles.footerWindowAmber} />
        <rect x="588" y="42" width="3" height="3" fill={COLOR_TOKENS.windowAmber} className={styles.footerWindowAmber} />
        <rect x="815" y="46" width="3" height="3" fill={COLOR_TOKENS.windowAmber} className={styles.footerWindowAmber} />
        <rect x="1045" y="48" width="3" height="3" fill={COLOR_TOKENS.windowAmber} className={styles.footerWindowAmber} />

        {/* Subtle Cyan Window Lights */}
        <rect x="160" y="58" width="3" height="3" fill={COLOR_TOKENS.accentCyan} className={styles.footerWindowCyan} />
        <rect x="575" y="52" width="3" height="3" fill={COLOR_TOKENS.accentCyan} className={styles.footerWindowCyan} />
        <rect x="830" y="54" width="3" height="3" fill={COLOR_TOKENS.accentCyan} className={styles.footerWindowCyan} />
        <rect x="1060" y="58" width="3" height="3" fill={COLOR_TOKENS.accentCyan} className={styles.footerWindowCyan} />

        {/* Rooftop Pixel Neon Sign: [ TERMINUS ] with Gentle Flicker */}
        <g className={styles.footerNeonSign}>
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

  );
};

FooterSkyline.displayName = 'FooterSkyline';
