import React from 'react';
import { NAVBAR_DATA, SOCIAL_LINKS } from '@/utils/constants';

const Navbar = () => {
  return (
    <nav 
      aria-label="Main Navigation"
      className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/5 flex justify-between items-center px-6 md:px-12 py-5"
    >
      <a 
        href="#" 
        aria-label="Sumyta Bentey Habib Home"
        className="text-2xl font-black tracking-tighter text-primary font-headline uppercase leading-none hover:text-white transition-colors duration-300"
      >
        {NAVBAR_DATA.monogram}
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
        href={SOCIAL_LINKS.email}
        className="px-5 py-2.5 bg-primary-dim text-white font-headline font-bold text-xs uppercase tracking-widest border border-primary/30 hover:bg-white hover:text-black hover:border-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {NAVBAR_DATA.connectLabel}
      </a>
    </nav>
  );
};

export default Navbar;
