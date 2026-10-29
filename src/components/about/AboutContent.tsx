import React, { forwardRef } from 'react';
import { ABOUT_DATA } from '@/utils/constants';

interface AboutContentProps {
  readonly metadataRef: React.RefObject<HTMLDivElement | null>;
}

export const AboutContent = forwardRef<HTMLDivElement, AboutContentProps>(({ metadataRef }, ref) => {
  return (
    <div ref={ref} className="lg:col-span-7 space-y-10">
      {/* Headline Statement */}
      <div className="space-y-6">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-white leading-snug">
          {ABOUT_DATA.headline.prefix}{' '}
          <span className="text-primary underline decoration-primary/40 underline-offset-8">
            {ABOUT_DATA.headline.highlight}
          </span>{' '}
          {ABOUT_DATA.headline.suffix}
        </h3>

        {/* Paragraphs */}
        <div className="space-y-5 text-secondary/80 font-body text-base md:text-lg leading-relaxed">
          {ABOUT_DATA.paragraphs.map((paragraph, idx) => (
            <p
              key={idx}
              className="border-l-2 border-white/10 pl-5 hover:border-primary/60 transition-colors duration-300"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* METADATA GRID (Verified Facts & Capabilities) */}
      <div ref={metadataRef} className="pt-4 border-t border-white/10">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ABOUT_DATA.metadataGrid.map((item) => (
            <div
              key={item.index}
              className={`meta-card p-4 sm:p-5 border border-white/10 bg-surface-container-low/50 hover:bg-white/[0.03] transition-all duration-300 border-l-2 ${item.accentColor}`}
            >
              <dt className="flex items-center justify-between text-[10px] font-mono tracking-widest text-primary uppercase font-bold mb-2">
                <span>{item.label}</span>
                <span className="text-secondary/40 font-normal">[{item.index}]</span>
              </dt>
              <dd className="font-mono text-xs sm:text-sm font-semibold text-white tracking-wide">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* SECTION TRANSITION CALLOUT */}
      <div className="pt-2 flex items-center justify-start">
        <a
          href={ABOUT_DATA.trajectoryAction.href}
          aria-label={ABOUT_DATA.trajectoryAction.ariaLabel}
          className="group inline-flex items-center gap-3 px-6 py-3.5 border border-white/20 bg-white/[0.02] hover:border-primary hover:bg-primary/10 text-white font-mono text-xs tracking-wider uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary shadow-sm"
        >
          <span className="w-1.5 h-1.5 bg-primary group-hover:scale-125 transition-transform" />
          <span className="font-bold group-hover:text-primary transition-colors">
            {ABOUT_DATA.trajectoryAction.label}
          </span>
        </a>
      </div>
    </div>
  );
});

AboutContent.displayName = 'AboutContent';
