import React from 'react';
import { CONTACT_DATA } from '@/utils/constants';

export const FooterChannels: React.FC = () => {
  return (
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
  );
};

FooterChannels.displayName = 'FooterChannels';
