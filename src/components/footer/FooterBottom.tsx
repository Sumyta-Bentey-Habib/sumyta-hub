import React from 'react';
import { CONTACT_DATA } from '@/utils/constants';
import BrandLogo from '../BrandLogo';

interface FooterBottomProps {
  readonly currentYear: number;
  readonly onBackToTop: () => void;
}

export const FooterBottom: React.FC<FooterBottomProps> = ({ currentYear, onBackToTop }) => {
  return (
    <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 font-mono text-xs">
      <div className="flex flex-wrap items-center gap-3 text-secondary/60">
        <div className="inline-flex items-center gap-2">
          <BrandLogo size={18} showWordmark={false} />
          <span className="font-bold text-white tracking-widest">{CONTACT_DATA.footer.monogram}</span>
        </div>
        <span className="text-white/20 select-none">/</span>
        <span>{`© ${currentYear} SUMYTA BENTEY HABIB. ALL RIGHTS RESERVED.`}</span>
      </div>

      {/* Simple Back-to-Top Button */}
      <button
        type="button"
        onClick={onBackToTop}
        aria-label={CONTACT_DATA.footer.backToTopAria}
        className="group inline-flex items-center gap-2 px-3 py-1.5 border border-white/15 bg-white/[0.02] hover:border-primary hover:bg-primary/10 text-white font-mono text-xs uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
      >
        <span className="text-primary transform group-hover:-translate-y-0.5 transition-transform" aria-hidden="true">
          ▲
        </span>
        <span className="font-bold group-hover:text-primary transition-colors">
          {CONTACT_DATA.footer.backToTopLabel}
        </span>
      </button>
    </div>
  );
};

FooterBottom.displayName = 'FooterBottom';
