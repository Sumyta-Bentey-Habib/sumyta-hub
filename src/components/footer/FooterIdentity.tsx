import React from 'react';
import { CONTACT_DATA } from '@/utils/constants';

export const FooterIdentity: React.FC = () => {
  return (
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
  );
};

FooterIdentity.displayName = 'FooterIdentity';
