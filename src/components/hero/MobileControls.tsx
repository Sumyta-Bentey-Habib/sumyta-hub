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
    <div className="md:hidden absolute bottom-24 left-4 right-4 z-20 flex items-center justify-between pointer-events-auto">
      {/* Directional Pad */}
      <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md p-1 border border-outlineVariant/40">
        <button
          type="button"
          onTouchStart={onLeftStart}
          onTouchEnd={onLeftEnd}
          onMouseDown={onLeftStart}
          onMouseUp={onLeftEnd}
          aria-label={HERO_DATA.moveLeftAria}
          className="w-10 h-10 flex items-center justify-center font-mono font-bold text-sm border border-outlineVariant/40 active:bg-primary active:text-black text-white"
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
          className="w-10 h-10 flex items-center justify-center font-mono font-bold text-sm border border-outlineVariant/40 active:bg-primary active:text-black text-white"
        >
          {HERO_DATA.rightButtonLabel}
        </button>
      </div>

      {/* Jump & Action Buttons */}
      <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md p-1 border border-outlineVariant/40">
        {nearbyLocationId && (
          <button
            type="button"
            onClick={onInteract}
            aria-label={HERO_DATA.interactAria}
            className="px-3 h-10 flex items-center justify-center font-mono font-bold text-xs bg-primary text-black active:bg-white"
          >
            {HERO_DATA.interactButtonLabel}
          </button>
        )}
        <button
          type="button"
          onClick={onJump}
          aria-label={HERO_DATA.jumpAria}
          className="w-12 h-10 flex items-center justify-center font-mono font-bold text-xs border border-primary text-primary active:bg-primary active:text-black"
        >
          {HERO_DATA.jumpButtonLabel}
        </button>
      </div>
    </div>
  );
}
