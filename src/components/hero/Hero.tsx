'use client';

import React, { useEffect, useRef, useState, useCallback, useSyncExternalStore } from 'react';
import { HERO_DATA, COLOR_TOKENS } from '@/utils/constants';
import {
  subscribeReducedMotion,
  getReducedMotionSnapshot,
  getReducedMotionServerSnapshot,
  PlayerState,
  HeroKeys,
  RainParticle,
  WindowLight,
  createRainParticles,
  createWindowLights,
  updatePlayerPhysics,
  updateRainParticles,
  detectNearbyLocation,
  detectLocationAtCoord,
  drawSkyline,
  drawMidground,
  drawRooftopsAndCatwalks,
  drawLocationHubs,
  drawCharacterSprite,
  drawRainStreaks,
} from '@/utils/hero';
import HeroBrand from './HeroBrand';
import HeroProximityHud from './HeroProximityHud';
import HeroBottomNav from './HeroBottomNav';
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
