'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { HERO_DATA, COLOR_TOKENS } from '@/utils/constants';
import { useReducedMotion } from '@/utils/useReducedMotion';
import {
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

interface UseHeroSimulationOptions {
  readonly onLocationTrigger: (locId: string) => void;
  readonly isWarping: boolean;
  readonly activeModal: string | null;
  readonly onCloseModal: () => void;
}

export function useHeroSimulation({
  onLocationTrigger,
  isWarping,
  activeModal,
  onCloseModal,
}: UseHeroSimulationOptions) {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);

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

  const [nearbyLocationId, setNearbyLocationId] = useState<string | null>(null);
  const [hoveredLocationId, setHoveredLocationId] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState<string>(HERO_DATA.announcementInitial);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const prefersReducedMotion = useReducedMotion();

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

  // Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeModal && e.key === 'Escape') {
        onCloseModal();
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
          onLocationTrigger(nearbyLocationId);
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
  }, [activeModal, isFocused, nearbyLocationId, onLocationTrigger, onCloseModal]);

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
        onLocationTrigger('endpoint');
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

      // DRAW CANVAS LAYERS
      ctx.save();
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, width, height);

      // Background Sky
      ctx.fillStyle = COLOR_TOKENS.surfaceLowest;
      ctx.fillRect(0, 0, width, height);

      ctx.scale(scale, scale);
      ctx.translate(0, HERO_DATA.gameWorldOffsetY);

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

      ctx.restore();

      // Warp Flash
      if (isWarping) {
        ctx.fillStyle = COLOR_TOKENS.primaryNeon;
        ctx.globalAlpha = 0.4;
        ctx.fillRect(0, 0, width, height);
        ctx.globalAlpha = 1.0;
      }

      ctx.restore();

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [prefersReducedMotion, isWarping, hoveredLocationId, nearbyLocationId, onLocationTrigger]);

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
      const worldClickY = (e.clientY - rect.top) / scale - HERO_DATA.gameWorldOffsetY;

      const hitId = detectLocationAtCoord(worldClickX, worldClickY, HERO_DATA.locations);
      if (hitId) {
        onLocationTrigger(hitId);
      }
    },
    [onLocationTrigger]
  );

  // Canvas Hover Detection
  const handleCanvasMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scale = canvas.height / (HERO_DATA.worldHeight * (window.devicePixelRatio || 1));
    const cameraX = cameraXRef.current;

    const worldX = (e.clientX - rect.left) / scale + cameraX;
    const worldY = (e.clientY - rect.top) / scale - HERO_DATA.gameWorldOffsetY;

    const hoverId = detectLocationAtCoord(worldX, worldY, HERO_DATA.locations);
    setHoveredLocationId(hoverId);
  }, []);

  const handleCanvasMouseLeave = useCallback(() => {
    setHoveredLocationId(null);
  }, []);

  return {
    containerRef,
    canvasRef,
    keysRef,
    nearbyLocationId,
    announcement,
    isFocused,
    setIsFocused,
    handleCanvasPointer,
    handleCanvasMouseMove,
    handleCanvasMouseLeave,
  };
}
