'use client';

import React from 'react';
import { HERO_DATA } from '@/utils/constants';

interface MobileControlsProps {
  readonly onLeftStart: () => void;
  readonly onLeftEnd: () => void;
  readonly onRightStart: () => void;
  readonly onRightEnd: () => void;
  readonly onJump: () => void;
  readonly onInteract: () => void;
  readonly nearbyLocationId: string | null;
}

export default function MobileControls({
  onLeftStart,
  onLeftEnd,
  onRightStart,
  onRightEnd,
  onJump,
  onInteract,
  nearbyLocationId,
}: MobileControlsProps) {
  return (
    <div className="md:hidden absolute bottom-3 left-3 right-3 z-20 flex flex-col items-center gap-2 pointer-events-none">
      {/* Main Touch Controls Bar */}
      <div className="w-full flex items-center justify-between gap-2 pointer-events-none">
        {/* Directional Pad */}
        <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-md p-1 border border-outlineVariant/40 pointer-events-auto shadow-md">
          <button
            type="button"
            onTouchStart={onLeftStart}
            onTouchEnd={onLeftEnd}
            onMouseDown={onLeftStart}
            onMouseUp={onLeftEnd}
            aria-label={HERO_DATA.moveLeftAria}
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center font-mono font-bold text-sm border border-outlineVariant/40 active:bg-primary active:text-black text-white select-none touch-manipulation"
          >
            {HERO_DATA.leftButtonLabel}
          </button>
          <button
            type="button"
            onTouchStart={onRightStart}
            onTouchEnd={onRightEnd}
            onMouseDown={onRightStart}
            onMouseUp={onRightEnd}
            aria-label={HERO_DATA.moveRightAria}
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center font-mono font-bold text-sm border border-outlineVariant/40 active:bg-primary active:text-black text-white select-none touch-manipulation"
          >
            {HERO_DATA.rightButtonLabel}
          </button>
        </div>

        {/* Center: View Work CTA */}
        <div className="pointer-events-auto">
          <a
            href={HERO_DATA.viewWorkAction.href}
            aria-label={HERO_DATA.viewWorkAction.ariaLabel}
            className="flex items-center gap-1 px-3 py-2 bg-primary text-black font-mono font-black text-[11px] sm:text-xs tracking-wider uppercase active:bg-white transition-colors shadow-[0_0_12px_rgba(255,45,117,0.4)] whitespace-nowrap"
          >
            <span>{HERO_DATA.viewWorkAction.label}</span>
          </a>
        </div>

        {/* Jump & Action Buttons */}
        <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-md p-1 border border-outlineVariant/40 pointer-events-auto shadow-md">
          {nearbyLocationId && (
            <button
              type="button"
              onClick={onInteract}
              aria-label={HERO_DATA.interactAria}
              className="px-2.5 h-9 sm:h-10 flex items-center justify-center font-mono font-bold text-[11px] bg-primary text-black active:bg-white select-none touch-manipulation animate-pulse"
            >
              {HERO_DATA.interactButtonLabel}
            </button>
          )}
          <button
            type="button"
            onClick={onJump}
            aria-label={HERO_DATA.jumpAria}
            className="w-11 h-9 sm:w-12 sm:h-10 flex items-center justify-center font-mono font-bold text-xs border border-primary text-primary active:bg-primary active:text-black select-none touch-manipulation"
          >
            {HERO_DATA.jumpButtonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
