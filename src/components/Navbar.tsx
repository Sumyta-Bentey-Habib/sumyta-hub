import React from 'react';
import { NAVBAR_DATA } from '@/utils/constants';
import BrandLogo from './BrandLogo';

const Navbar = () => {
  return (
    <nav 
      aria-label="Main Navigation"
      className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/5 flex justify-between items-center px-6 md:px-12 py-4"
    >
      <a 
        href="#" 
        aria-label={`${NAVBAR_DATA.brandName} - Home`}
        className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-xs"
      >
        <BrandLogo size={28} />
      </a>
      <div className="hidden md:flex items-center gap-8 font-headline font-bold uppercase text-xs tracking-widest">
        {NAVBAR_DATA.navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-secondary/80 hover:text-primary transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary px-1 py-1"
          >
            {link.label}
          </a>
        ))}
      </div>
      <a 
        href={NAVBAR_DATA.resumeHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={NAVBAR_DATA.resumeAriaLabel}
        className="px-5 py-2.5 bg-primary text-black font-headline font-bold text-xs uppercase tracking-widest border border-primary hover:bg-white hover:text-black hover:border-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-[0_0_15px_rgba(255,45,117,0.3)] inline-flex items-center gap-1.5"
      >
        <span>{NAVBAR_DATA.resumeLabel}</span>
        <span className="text-xs" aria-hidden="true">↗</span>
      </a>
    </nav>
  );
};

export default Navbar;
