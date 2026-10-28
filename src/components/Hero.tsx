'use client';

import React, { useEffect, useRef, useState, useCallback, useSyncExternalStore } from 'react';
import { HERO_DATA, COLOR_TOKENS } from '@/utils/constants';
import {
  subscribeReducedMotion,
  getReducedMotionSnapshot,
  getReducedMotionServerSnapshot,
} from '@/utils/heroMotion';
import { PlayerState, HeroKeys, RainParticle, WindowLight } from '@/utils/heroTypes';
import {
  createRainParticles,
  createWindowLights,
  updatePlayerPhysics,
  updateRainParticles,
  detectNearbyLocation,
  detectLocationAtCoord,
} from '@/utils/heroPhysics';
import {
  drawSkyline,
  drawMidground,
  drawRooftopsAndCatwalks,
  drawLocationHubs,
  drawCharacterSprite,
  drawRainStreaks,
} from '@/utils/heroRenderer';
import WorkstationModal from './WorkstationModal';
import MobileControls from './MobileControls';
import EndingModal from './EndingModal';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Gameplay simulation state
  const playerRef = useRef<PlayerState>({
    x: 120,
    y: 326,
    vx: 0,
    vy: 0,
    isGrounded: true,
    facing: 'right',
    animFrame: 0,
    isMoving: false,
  });

  const keysRef = useRef<HeroKeys>({
    left: false,
    right: false,
    jump: false,
  });

  const cameraXRef = useRef<number>(0);
  const particlesRef = useRef<RainParticle[]>([]);
  const windowsRef = useRef<WindowLight[]>([]);
  const hasTriggeredEndingRef = useRef<boolean>(false);

  // UI & Interaction State
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [nearbyLocationId, setNearbyLocationId] = useState<string | null>(null);
  const [hoveredLocationId, setHoveredLocationId] = useState<string | null>(null);
  const [isWarping, setIsWarping] = useState<boolean>(false);
  const [announcement, setAnnouncement] = useState<string>(HERO_DATA.announcementInitial);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  // Initialize atmospheric particles and skyline windows
  useEffect(() => {
    particlesRef.current = createRainParticles(70, HERO_DATA.worldWidth, HERO_DATA.worldHeight);
    windowsRef.current = createWindowLights(HERO_DATA.worldWidth, HERO_DATA.worldHeight, [
      COLOR_TOKENS.windowAmber,
      COLOR_TOKENS.primaryNeon,
      COLOR_TOKENS.accentCyan,
      COLOR_TOKENS.shadowDark,
    ]);
  }, []);

  // Location Interaction Handler
  const handleLocationTrigger = useCallback((locId: string) => {
    const loc = HERO_DATA.locations.find((l) => l.id === locId);
    if (!loc) return;

    if (loc.actionType === 'reveal') {
      setActiveModal(loc.id);
      setAnnouncement(HERO_DATA.announcementWorkstation);
    } else if (loc.actionType === 'ending') {
      setActiveModal('ending');
      setAnnouncement(HERO_DATA.announcementEnding);
    } else if (loc.actionType === 'link' && 'href' in loc && loc.href) {
      window.open(loc.href, '_blank', 'noopener,noreferrer');
      setAnnouncement(HERO_DATA.announcementNavigated);
    } else if (loc.actionType === 'portal') {
      setIsWarping(true);
      setAnnouncement(HERO_DATA.announcementWarp);
      setTimeout(() => {
        const target = document.getElementById('work');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
        setIsWarping(false);
      }, 350);
    }
  }, []);

  // Warp to casework from ending sequence
  const handleNavigateWork = useCallback(() => {
    setActiveModal(null);
    setIsWarping(true);
    setAnnouncement(HERO_DATA.announcementWarp);
    setTimeout(() => {
      const target = document.getElementById('work');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      setIsWarping(false);
    }, 350);
  }, []);

  // Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeModal && e.key === 'Escape') {
        setActiveModal(null);
        return;
      }

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysRef.current.left = true;
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysRef.current.right = true;
      } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === ' ') {
        if (isFocused || document.activeElement === containerRef.current) {
          e.preventDefault();
        }
        keysRef.current.jump = true;
      } else if (e.key === 'e' || e.key === 'E' || (e.key === 'Enter' && isFocused)) {
        if (nearbyLocationId) {
          handleLocationTrigger(nearbyLocationId);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysRef.current.left = false;
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysRef.current.right = false;
      } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === ' ') {
        keysRef.current.jump = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [activeModal, isFocused, nearbyLocationId, handleLocationTrigger]);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let tick = 0;
    const platforms = [...HERO_DATA.rooftops, ...HERO_DATA.catwalks];

    const render = () => {
      tick += 1;

      const width = canvas.width;
      const height = canvas.height;
      const scale = height / HERO_DATA.worldHeight;
      const visibleWorldWidth = width / scale;

      const p = playerRef.current;
      const keys = keysRef.current;

      // Physics update when motion is enabled
      if (!prefersReducedMotion) {
        updatePlayerPhysics(
          p,
          keys,
          platforms,
          HERO_DATA.worldWidth,
          HERO_DATA.worldHeight,
          tick,
          () => setAnnouncement(HERO_DATA.announcementJump)
        );
        updateRainParticles(particlesRef.current, HERO_DATA.worldWidth, HERO_DATA.worldHeight);
      }

      // Proximity detection
      const detectedLocation = detectNearbyLocation(p.x, p.y, HERO_DATA.locations, 65);

      // Auto-trigger ending sequence when stepping directly on the extraction pad
      if (p.x >= 1365 && p.x <= 1445 && p.isGrounded && !hasTriggeredEndingRef.current) {
        hasTriggeredEndingRef.current = true;
        handleLocationTrigger('endpoint');
      }
      setNearbyLocationId((prev) => {
        if (prev !== detectedLocation) {
          if (detectedLocation) {
            const loc = HERO_DATA.locations.find((l) => l.id === detectedLocation);
            if (loc) {
              setAnnouncement(`${HERO_DATA.announcementLocationNearbyPrefix}${loc.title}. ${HERO_DATA.interactKeyHint}`);
            }
          }
          return detectedLocation;
        }
        return prev;
      });

      // Camera horizontal lerp
      const targetCamX = p.x - visibleWorldWidth / 2;
      const maxCamX = Math.max(0, HERO_DATA.worldWidth - visibleWorldWidth);
      const clampedTarget = Math.max(0, Math.min(maxCamX, targetCamX));
      cameraXRef.current += (clampedTarget - cameraXRef.current) * 0.08;
      const cameraX = cameraXRef.current;

      // ----------------------------------------------------
      // DRAW CANVAS LAYERS
      // ----------------------------------------------------
      ctx.save();
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, width, height);

      // Background Sky
      ctx.fillStyle = COLOR_TOKENS.surfaceLowest;
      ctx.fillRect(0, 0, width, height);

      ctx.scale(scale, scale);

      // Layer 1: Distant Skyline
      drawSkyline(ctx, tick, cameraX, HERO_DATA.worldWidth, HERO_DATA.worldHeight, windowsRef.current);

      // Layer 2: Midground Silhouettes
      drawMidground(ctx, cameraX, HERO_DATA.worldWidth, HERO_DATA.worldHeight);

      // Layer 3: Foreground Rooftops & Catwalks
      ctx.save();
      ctx.translate(-cameraX, 0);
      drawRooftopsAndCatwalks(ctx, HERO_DATA.rooftops, HERO_DATA.catwalks);

      // Layer 4: Interactive City Locations
      drawLocationHubs(
        ctx,
        tick,
        HERO_DATA.locations,
        hoveredLocationId,
        nearbyLocationId,
        HERO_DATA.interactSymbol
      );

      // Layer 5: Character with Pointer
      drawCharacterSprite(ctx, p, tick, HERO_DATA.playerPointerLabel);

      // Layer 6: Cyber Rain
      if (!prefersReducedMotion) {
        drawRainStreaks(ctx, particlesRef.current);
      }

      ctx.restore(); // Restore world translation

      // Warp Flash
      if (isWarping) {
        ctx.fillStyle = COLOR_TOKENS.primaryNeon;
        ctx.globalAlpha = 0.4;
        ctx.fillRect(0, 0, width, height);
        ctx.globalAlpha = 1.0;
      }

      ctx.restore(); // Restore root canvas scale

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [prefersReducedMotion, isWarping, hoveredLocationId, nearbyLocationId, handleLocationTrigger]);

  // Handle Resize of Canvas
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Direct Click/Tap on Canvas for Interactive Hubs
  const handleCanvasPointer = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const scale = canvas.height / (HERO_DATA.worldHeight * (window.devicePixelRatio || 1));
      const cameraX = cameraXRef.current;

      const worldClickX = (e.clientX - rect.left) / scale + cameraX;
      const worldClickY = (e.clientY - rect.top) / scale;

      const hitId = detectLocationAtCoord(worldClickX, worldClickY, HERO_DATA.locations);
      if (hitId) {
        handleLocationTrigger(hitId);
      }
    },
    [handleLocationTrigger]
  );

  // Canvas Hover Detection
  const handleCanvasMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scale = canvas.height / (HERO_DATA.worldHeight * (window.devicePixelRatio || 1));
    const cameraX = cameraXRef.current;

    const worldX = (e.clientX - rect.left) / scale + cameraX;
    const worldY = (e.clientY - rect.top) / scale;

    const hoverId = detectLocationAtCoord(worldX, worldY, HERO_DATA.locations);
    setHoveredLocationId(hoverId);
  }, []);

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
        onMouseLeave={() => setHoveredLocationId(null)}
        className="absolute inset-0 w-full h-full cursor-pointer z-0 touch-none"
      />

      {/* COMPOSITION: UPPER-LEFT BRAND IDENTITY (Positioned cleanly below Navbar) */}
      <div className="absolute top-24 md:top-28 left-6 md:left-12 z-20 pointer-events-auto">
        <div className="flex items-center gap-3 mb-1">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest text-outline uppercase">
            {HERO_DATA.statusOnline}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase font-mono leading-none text-white">
          {HERO_DATA.name}
        </h1>
        <p className="text-xs md:text-sm font-mono tracking-widest text-primary font-semibold mt-1 uppercase">
          {HERO_DATA.role}
        </p>
      </div>

      {/* PROXIMITY HUD CARD (When character is standing near an interactive hub) */}
      {nearbyLocationId && (
        <div className="absolute top-44 md:top-48 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
          {(() => {
            const loc = HERO_DATA.locations.find((l) => l.id === nearbyLocationId);
            if (!loc) return null;
            return (
              <button
                type="button"
                onClick={() => handleLocationTrigger(loc.id)}
                className="group flex items-center gap-3 px-4 py-2 border border-primary bg-black/90 backdrop-blur-md text-white font-mono shadow-[0_0_20px_rgba(255,45,117,0.3)] hover:bg-primary/20 transition-all cursor-pointer"
              >
                <span className="w-2 h-2 bg-primary animate-ping" />
                <span className="text-xs tracking-wider font-bold text-white group-hover:text-primary">
                  {loc.title}
                </span>
                <span className="text-[10px] tracking-widest text-primary font-semibold">
                  {HERO_DATA.interactKeyHint}
                </span>
              </button>
            );
          })()}
        </div>
      )}

      {/* COMPOSITION: BOTTOM STATUS, NAME, GITHUB, LINKEDIN, RESUME & PERSISTENT LINK */}
      <div className="absolute bottom-6 left-4 right-4 sm:left-6 sm:right-6 md:bottom-8 md:left-12 md:right-12 z-20 flex flex-col lg:flex-row items-center justify-between gap-3 pointer-events-none">
        {/* Bottom-Left: Name, Role & Explore Prompt */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <span className="font-mono font-black text-xs md:text-sm tracking-tight text-white uppercase">
            {HERO_DATA.name}
          </span>
          <span className="text-[10px] md:text-xs font-mono tracking-widest text-primary font-semibold uppercase">
            {'//'} {HERO_DATA.role}
          </span>
          <span className="hidden sm:inline-block w-1.5 h-3 bg-primary animate-pulse ml-1" />
          <span className="hidden sm:inline text-xs font-mono font-bold tracking-widest text-secondary uppercase">
            {HERO_DATA.explorePrompt}
          </span>
        </div>

        {/* Bottom-Center: GitHub, LinkedIn, Resume & Control Hint */}
        <div className="flex flex-wrap items-center justify-center gap-2 pointer-events-auto">
          <nav aria-label={HERO_DATA.bottomNavAria} className="flex items-center gap-2">
            {HERO_DATA.bottomLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.isExternal ? '_blank' : undefined}
                rel={item.isExternal ? 'noopener noreferrer' : undefined}
                aria-label={item.ariaLabel}
                className="px-2.5 py-1.5 md:px-3 md:py-1.5 text-[11px] md:text-xs font-mono font-bold tracking-wider uppercase border border-outlineVariant/50 bg-black/70 backdrop-blur-sm text-secondary hover:text-white hover:border-primary hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary shadow-sm"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden xl:flex items-center px-3 py-1.5 border border-outlineVariant/40 bg-black/50 backdrop-blur-sm text-[10px] font-mono tracking-widest text-outline uppercase">
            <span>{HERO_DATA.controlsHintDesktop}</span>
          </div>
        </div>

        {/* Bottom-Right: Persistent VIEW WORK Link */}
        <div className="pointer-events-auto">
          <a
            href={HERO_DATA.viewWorkAction.href}
            aria-label={HERO_DATA.viewWorkAction.ariaLabel}
            className="group flex items-center gap-2 px-4 py-2 bg-primary text-black font-mono font-black text-xs md:text-sm tracking-wider uppercase hover:bg-white hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-[0_0_15px_rgba(255,45,117,0.4)]"
          >
            <span>{HERO_DATA.viewWorkAction.label}</span>
          </a>
        </div>
      </div>

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
      <WorkstationModal isOpen={activeModal === 'xiia'} onClose={() => setActiveModal(null)} />

      {/* Ending Point Modal Dialog */}
      <EndingModal
        isOpen={activeModal === 'ending'}
        onClose={() => setActiveModal(null)}
        onNavigateWork={handleNavigateWork}
      />
    </section>
  );
}
