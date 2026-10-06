'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTACT_DATA } from '@/utils/constants';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const signalLineRef = useRef<HTMLDivElement>(null);
  const statementLine1Ref = useRef<HTMLSpanElement>(null);
  const statementLine2Ref = useRef<HTMLSpanElement>(null);
  const statementLine3Ref = useRef<HTMLSpanElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);
  const channelsRef = useRef<HTMLDivElement>(null);
  const footerBaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (!sectionRef.current) return;

      const statementLines = [
        statementLine1Ref.current,
        statementLine2Ref.current,
        statementLine3Ref.current,
      ].filter(Boolean);

      // Set initial states for scroll entrance
      if (kickerRef.current) {
        gsap.set(kickerRef.current, { opacity: 0, y: 18 });
      }
      if (signalLineRef.current) {
        gsap.set(signalLineRef.current, { scaleX: 0, transformOrigin: 'left center' });
      }
      if (statementLines.length > 0) {
        gsap.set(statementLines, { yPercent: 110, opacity: 0 });
      }
      if (actionRef.current) {
        gsap.set(actionRef.current, { opacity: 0, y: 24 });
      }
      if (channelsRef.current) {
        gsap.set(channelsRef.current, { opacity: 0, y: 20 });
      }
      if (footerBaseRef.current) {
        gsap.set(footerBaseRef.current, { opacity: 0 });
      }

      // Editorial scroll-driven sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      // 1. Kicker & signal metadata enter
      if (kickerRef.current) {
        tl.to(kickerRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        });
      }

      // 2. Signal line travels across
      if (signalLineRef.current) {
        tl.to(
          signalLineRef.current,
          {
            scaleX: 1,
            duration: 0.9,
            ease: 'power2.inOut',
          },
          '-=0.3'
        );
      }

      // 3. Main statement emerges from masked boundary
      if (statementLines.length > 0) {
        tl.to(
          statementLines,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: 'power4.out',
          },
          '-=0.45'
        );
      }

      // 4. Primary CONNECT action control reveals
      if (actionRef.current) {
        tl.to(
          actionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
          },
          '-=0.3'
        );
      }

      // 5. Contact channels & directory reveal
      if (channelsRef.current) {
        tl.to(
          channelsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
          },
          '-=0.35'
        );
      }

      // 6. Minimal footer settles
      if (footerBaseRef.current) {
        tl.to(
          footerBaseRef.current,
          {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.3'
        );
      }
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      if (kickerRef.current) gsap.set(kickerRef.current, { opacity: 1, y: 0 });
      if (signalLineRef.current) gsap.set(signalLineRef.current, { scaleX: 1 });
      const statementLines = [
        statementLine1Ref.current,
        statementLine2Ref.current,
        statementLine3Ref.current,
      ].filter(Boolean);
      if (statementLines.length > 0) {
        gsap.set(statementLines, { yPercent: 0, opacity: 1 });
      }
      if (actionRef.current) gsap.set(actionRef.current, { opacity: 1, y: 0 });
      if (channelsRef.current) gsap.set(channelsRef.current, { opacity: 1, y: 0 });
      if (footerBaseRef.current) gsap.set(footerBaseRef.current, { opacity: 1 });
    });

    return () => mm.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      id={CONTACT_DATA.sectionId}
      role="contentinfo"
      aria-labelledby="contact-kicker-heading"
      className="w-full min-h-screen flex flex-col justify-between pt-24 sm:pt-32 md:pt-40 pb-12 px-6 sm:px-10 md:px-16 lg:px-24 bg-surface-container-lowest text-secondary relative overflow-hidden border-t border-outline/10"
    >
      {/* ── TOP ZONE: SIGNAL KICKER & METADATA ── */}
      <div className="w-full">
        <div
          ref={kickerRef}
          className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8"
        >
          <h2
            id="contact-kicker-heading"
            className="text-xs sm:text-sm font-headline font-bold text-primary tracking-[0.35em] uppercase"
          >
            {CONTACT_DATA.kicker}
          </h2>

          <div className="flex items-center gap-2.5 font-mono text-[0.65rem] sm:text-xs text-outline tracking-widest uppercase">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span>{CONTACT_DATA.signal.tag}</span>
            <span className="hidden sm:inline text-outline/40">/</span>
            <span className="hidden sm:inline text-primary/80">{CONTACT_DATA.signal.status}</span>
          </div>
        </div>

        {/* ── VISUAL DETAIL: SIGNAL LINE ── */}
        <div className="relative w-full h-[1px] bg-white/10 mb-16 sm:mb-20 md:mb-24 overflow-hidden">
          <div
            ref={signalLineRef}
            className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary via-primary/80 to-primary/20 will-change-transform"
          />
        </div>

        {/* ── STATEMENT & PRIMARY ACTION ── */}
        <div className="w-full flex flex-col lg:flex-row lg:items-end justify-between gap-12 lg:gap-16 mb-24 sm:mb-32">
          {/* Masked Editorial Closing Statement */}
          <div className="flex-1">
            <h3
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[9rem] font-headline font-black tracking-tighter uppercase leading-[0.84] text-white"
              aria-label={`${CONTACT_DATA.statement.line1} ${CONTACT_DATA.statement.line2} ${CONTACT_DATA.statement.line3}`}
            >
              <span className="block overflow-hidden py-1">
                <span ref={statementLine1Ref} className="block will-change-transform">
                  {CONTACT_DATA.statement.line1}
                </span>
              </span>
              <span className="block overflow-hidden py-1">
                <span ref={statementLine2Ref} className="block will-change-transform">
                  {CONTACT_DATA.statement.line2}
                </span>
              </span>
              <span className="block overflow-hidden py-1">
                <span
                  ref={statementLine3Ref}
                  className="block text-primary will-change-transform"
                >
                  {CONTACT_DATA.statement.line3}
                </span>
              </span>
            </h3>
          </div>

          {/* CONNECT Action Control */}
          <div ref={actionRef} className="lg:mb-4 shrink-0">
            <a
              href={CONTACT_DATA.action.href}
              aria-label={CONTACT_DATA.action.ariaLabel}
              className="group relative inline-flex flex-col items-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-black"
            >
              <div className="inline-flex items-center gap-3 sm:gap-4 text-3xl sm:text-4xl md:text-5xl font-headline font-black tracking-tight text-white group-hover:text-primary transition-colors duration-400">
                <span className="tracking-wider uppercase transform group-hover:translate-x-1 transition-transform duration-400">
                  {CONTACT_DATA.action.label}
                </span>
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-primary transition-transform duration-400 ease-out transform group-hover:translate-x-2 group-hover:-translate-y-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
              <div className="w-full h-[2px] bg-primary/30 mt-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-out origin-left" />
              </div>
            </a>
          </div>
        </div>

        {/* ── CONTACT CHANNELS & SOCIAL DIRECTORY ── */}
        <div
          ref={channelsRef}
          className="w-full border-t border-outline/10 pt-12 sm:pt-16 pb-16 sm:pb-24 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8"
        >
          {/* Email Channel */}
          <div className="md:col-span-7 flex flex-col items-start">
            <span className="font-headline font-bold text-xs uppercase tracking-[0.3em] text-outline mb-3">
              {CONTACT_DATA.channels.email.label}
            </span>
            <a
              href={CONTACT_DATA.channels.email.href}
              aria-label={CONTACT_DATA.channels.email.ariaLabel}
              className="group inline-flex items-center gap-3 text-xl sm:text-2xl md:text-3xl font-headline font-semibold text-white/90 hover:text-primary transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-black break-all"
            >
              <span className="relative transform group-hover:translate-x-1.5 transition-transform duration-300">
                {CONTACT_DATA.channels.email.address}
                <span className="absolute left-0 -bottom-1 w-full h-[1px] bg-outline/40 group-hover:bg-primary transition-colors duration-300" />
              </span>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

          {/* Social Directory */}
          <div className="md:col-span-5 flex flex-col items-start md:items-end">
            <span className="font-headline font-bold text-xs uppercase tracking-[0.3em] text-outline mb-4">
              {CONTACT_DATA.channels.socialsLabel}
            </span>
            <div className="flex flex-wrap md:flex-col items-start md:items-end gap-5 md:gap-4 font-headline text-sm sm:text-base md:text-lg font-bold uppercase tracking-widest">
              {CONTACT_DATA.channels.socials.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className="group inline-flex items-center gap-2.5 text-secondary hover:text-primary transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                >
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                    {social.label}
                  </span>
                  <svg
                    className="w-4 h-4 text-outline/60 group-hover:text-primary transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── BASE FOOTER: MONOGRAM & TAGLINE ── */}
      <div
        ref={footerBaseRef}
        className="w-full border-t border-outline/10 pt-8 sm:pt-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
      >
        <div className="text-3xl sm:text-4xl font-black text-primary font-headline tracking-tighter uppercase leading-none">
          {CONTACT_DATA.footer.monogram}
        </div>
        <p className="text-secondary/70 font-headline text-xs sm:text-sm uppercase tracking-widest text-left sm:text-right">
          <span>{CONTACT_DATA.footer.copyright}</span>{' '}
          <span className="text-white/90 font-medium">{CONTACT_DATA.footer.tagline}</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
