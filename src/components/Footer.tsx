import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full min-h-[614px] flex flex-col justify-end p-6 md:p-12 bg-surface-dim" id="contact">
      <div className="w-full flex flex-col items-start">
        <div className="mb-24 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div>
            <h2 className="text-sm font-headline font-bold text-primary tracking-[0.4em] uppercase mb-8">
              Ready to evolve?
            </h2>
            <a
              className="text-5xl md:text-8xl font-headline font-black tracking-tighter text-white hover:text-primary transition-colors duration-400 break-all"
              href="mailto:sumytabenteyhabib@gmail.com"
            >
              sumytabenteyhabib@gmail.com
            </a>
          </div>
          <div className="flex gap-12 font-headline text-[0.875rem] uppercase tracking-widest">
            <a
              className="text-secondary hover:line-through hover:text-primary transition-all duration-400"
              href="https://www.linkedin.com/in/sumytabenteyhabib/"
            >
              LinkedIn
            </a>
            <a
              className="text-secondary hover:line-through hover:text-primary transition-all duration-400"
              href="https://github.com/Sumyta-Bentey-Habib"
            >
              GitHub
            </a>
            <a
              className="text-secondary hover:line-through hover:text-primary transition-all duration-400"
              href="mailto:sumytabenteyhabib@gmail.com"
            >
              Email
            </a>
          </div>
        </div>
        <div className="w-full border-t border-outline/10 pt-12 mt-12 flex flex-col md:flex-row justify-between gap-8">
          <div className="text-4xl font-black text-primary mb-8 font-headline tracking-tighter uppercase leading-none">
            S.B.H.
          </div>
          <p className="text-secondary font-headline text-[0.875rem] uppercase tracking-widest md:max-w-xs text-left md:text-right">
            © 2026 SUMYTA BENTEY HABIB. ENGINEERED FOR IMPACT.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
