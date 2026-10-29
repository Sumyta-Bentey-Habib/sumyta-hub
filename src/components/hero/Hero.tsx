'use client';

import React, { useState } from 'react';
import { HERO_DATA } from '@/utils/constants';
import HeroBrand from './HeroBrand';
import HeroProximityHud from './HeroProximityHud';
import HeroBottomNav from './HeroBottomNav';
import WorkstationModal from './WorkstationModal';
import MobileControls from './MobileControls';
import EndingModal from './EndingModal';
import { useHeroSimulation } from './useHeroSimulation';
import { useHeroInteractions } from './useHeroInteractions';

export default function Hero() {
  const [announcement, setAnnouncement] = useState<string>(HERO_DATA.announcementInitial);

  const {
    activeModal,
    isWarping,
    handleLocationTrigger,
    handleNavigateWork,
    handleCloseModal,
  } = useHeroInteractions(setAnnouncement);

  const {
    containerRef,
    canvasRef,
    keysRef,
    nearbyLocationId,
    setIsFocused,
    handleCanvasPointer,
    handleCanvasMouseMove,
    handleCanvasMouseLeave,
  } = useHeroSimulation({
    onLocationTrigger: handleLocationTrigger,
    isWarping,
    activeModal,
    onCloseModal: handleCloseModal,
  });

  return (
    <section
      ref={containerRef}
      id="hero"
      tabIndex={0}
      aria-label={HERO_DATA.canvasAriaLabel}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className="relative w-full h-[100svh] min-h-[600px] max-h-[1080px] bg-black text-white overflow-hidden select-none outline-none focus-visible:ring-1 focus-visible:ring-primary"
    >
      {/* Screen Reader Live Telemetry */}
      <div aria-live="polite" role="status" className="sr-only">
        {announcement}
      </div>

      {/* 2D Cyberpunk Pixel Art Canvas */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasPointer}
        onMouseMove={handleCanvasMouseMove}
        onMouseLeave={handleCanvasMouseLeave}
        className="absolute inset-0 w-full h-full cursor-pointer z-0 touch-pan-y"
      />

      {/* Brand Identity */}
      <HeroBrand />

      {/* Proximity HUD Card */}
      <HeroProximityHud
        nearbyLocationId={nearbyLocationId}
        onLocationTrigger={handleLocationTrigger}
      />

      {/* Bottom Status, Socials & Navigation */}
      <HeroBottomNav />

      {/* Mobile Compact Touch Controls */}
      <MobileControls
        onLeftStart={() => {
          keysRef.current.left = true;
        }}
        onLeftEnd={() => {
          keysRef.current.left = false;
        }}
        onRightStart={() => {
          keysRef.current.right = true;
        }}
        onRightEnd={() => {
          keysRef.current.right = false;
        }}
        onJump={() => {
          keysRef.current.jump = true;
          setTimeout(() => {
            keysRef.current.jump = false;
          }, 150);
        }}
        onInteract={() => {
          if (nearbyLocationId) {
            handleLocationTrigger(nearbyLocationId);
          }
        }}
        nearbyLocationId={nearbyLocationId}
      />

      {/* XIIA Workstation Modal Dialog */}
      <WorkstationModal isOpen={activeModal === 'xiia'} onClose={handleCloseModal} />

      {/* Ending Point Modal Dialog */}
      <EndingModal
        isOpen={activeModal === 'ending'}
        onClose={handleCloseModal}
        onNavigateWork={handleNavigateWork}
      />
    </section>
  );
}
