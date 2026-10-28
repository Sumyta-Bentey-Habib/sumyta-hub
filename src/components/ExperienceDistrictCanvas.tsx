'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { COLOR_TOKENS } from '@/utils/constants';
import { RainParticle, WindowLight } from '@/utils/heroTypes';
import { createRainParticles, createWindowLights, updateRainParticles } from '@/utils/heroPhysics';
import { drawRainStreaks } from '@/utils/heroRenderer';
import { drawCareerSkyline, drawCareerStructures } from '@/utils/careerDistrictRenderer';

interface ExperienceDistrictCanvasProps {
  readonly activeSector: 'xiia' | 'independent';
  readonly onSelectSector: (sector: 'xiia' | 'independent') => void;
}

export const ExperienceDistrictCanvas: React.FC<ExperienceDistrictCanvasProps> = ({
  activeSector,
  onSelectSector,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<RainParticle[]>([]);
  const windowsRef = useRef<WindowLight[]>([]);

  const [hoveredSector, setHoveredSector] = useState<'xiia' | 'independent' | null>(null);

  const worldWidth = 1200;
  const worldHeight = 380;

  // Initialize rain particles and window lights
  useEffect(() => {
    particlesRef.current = createRainParticles(45, worldWidth, worldHeight);
    windowsRef.current = createWindowLights(worldWidth, worldHeight, [
      COLOR_TOKENS.windowAmber,
      COLOR_TOKENS.primaryNeon,
      COLOR_TOKENS.accentCyan,
      COLOR_TOKENS.shadowDark,
    ]);
  }, []);

  // Main Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let tick = 0;
    let isVisible = true;

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const render = () => {
      if (!isVisible) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      tick += 1;

      const width = canvas.width;
      const height = canvas.height;
      const scale = height / worldHeight;

      if (!prefersReducedMotion) {
        updateRainParticles(particlesRef.current, worldWidth, worldHeight);
      }

      ctx.save();
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, width, height);

      // Background Base Sky
      ctx.fillStyle = COLOR_TOKENS.surfaceLowest;
      ctx.fillRect(0, 0, width, height);

      ctx.scale(scale, scale);

      // Layer 1: Distant City Skyline & Windows
      drawCareerSkyline(ctx, tick, worldWidth, worldHeight, windowsRef.current);

      // Layer 2: Career District Architectural Complexes
      drawCareerStructures(ctx, tick, activeSector, hoveredSector);

      // Layer 3: Cyber Rain
      if (!prefersReducedMotion) {
        drawRainStreaks(ctx, particlesRef.current);
      }

      ctx.restore();

      if (!prefersReducedMotion) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      observer.disconnect();
    };
  }, [activeSector, hoveredSector]);

  // Handle Resize of Canvas
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = rect.width * dpr;
      canvas.height = Math.min(rect.width * (worldHeight / worldWidth), 420) * dpr;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pointer Interaction Handler: Detect clicks on XIIA Tower or Independent Labs
  const handlePointer = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const scale = canvas.height / (worldHeight * (window.devicePixelRatio || 1));
      const worldX = (e.clientX - rect.left) / scale;

      // XIIA Corporate Complex is on the left half (x: 60 - 440)
      if (worldX < 500) {
        onSelectSector('xiia');
      } else {
        // Independent Labs is on the right half (x: 680 - 1100)
        onSelectSector('independent');
      }
    },
    [onSelectSector]
  );

  // Mouse Move Detection for Cursor & Highlight
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scale = canvas.height / (worldHeight * (window.devicePixelRatio || 1));
    const worldX = (e.clientX - rect.left) / scale;

    if (worldX < 500) {
      setHoveredSector('xiia');
    } else if (worldX > 650) {
      setHoveredSector('independent');
    } else {
      setHoveredSector(null);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[12/4] max-h-[420px] mb-12 border-2 border-white/20 bg-surface-container shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden group select-none"
    >
      {/* Visual Corner Pixel Brackets */}
      <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-primary z-20 pointer-events-none" aria-hidden="true" />
      <span className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-primary z-20 pointer-events-none" aria-hidden="true" />
      <span className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-primary z-20 pointer-events-none" aria-hidden="true" />
      <span className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-primary z-20 pointer-events-none" aria-hidden="true" />

      {/* Interactive Canvas */}
      <canvas
        ref={canvasRef}
        onClick={handlePointer}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredSector(null)}
        className="w-full h-full block cursor-pointer"
        aria-label="Interactive Neon City Career District skyline showing XIIA Corporate Complex on the left and Independent Research Labs on the right"
      />

      {/* Top Banner Telemetry HUD */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between font-mono text-[10px] tracking-widest uppercase pointer-events-none z-20">
        <div className="flex items-center gap-2 px-2.5 py-1 bg-black/80 border border-primary/40 text-primary">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span>NEON CITY // DISTRICT 02: CAREER SECTORS</span>
        </div>

        <div className="hidden sm:flex items-center gap-3 px-2.5 py-1 bg-black/80 border border-white/20 text-secondary/70">
          <span>INTERACTION // CLICK LOCATIONS TO INSPECT DOSSIER</span>
        </div>
      </div>

      {/* Bottom Sector Selection Prompts */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[10px] tracking-wider uppercase pointer-events-none z-20">
        <button
          type="button"
          onClick={() => onSelectSector('xiia')}
          style={
            activeSector === 'xiia'
              ? {
                  backgroundColor: COLOR_TOKENS.primary,
                  borderColor: COLOR_TOKENS.primary,
                  color: COLOR_TOKENS.black,
                }
              : undefined
          }
          className={`pointer-events-auto px-3 py-1.5 border transition-all cursor-pointer ${
            activeSector === 'xiia'
              ? 'border-primary bg-primary text-black font-bold shadow-[0_0_15px_rgba(255,45,117,0.4)]'
              : 'border-white/20 bg-black/80 text-white hover:border-primary hover:text-primary'
          }`}
        >
          ★ SECTOR 01: XIIA TOWER
        </button>

        <button
          type="button"
          onClick={() => onSelectSector('independent')}
          style={
            activeSector === 'independent'
              ? {
                  backgroundColor: COLOR_TOKENS.accentCyan,
                  borderColor: COLOR_TOKENS.accentCyan,
                  color: COLOR_TOKENS.black,
                }
              : undefined
          }
          className={`pointer-events-auto px-3 py-1.5 border transition-all cursor-pointer ${
            activeSector === 'independent'
              ? 'border-accent-cyan bg-accent-cyan text-black font-bold shadow-[0_0_15px_rgba(0,242,254,0.4)]'
              : 'border-white/20 bg-black/80 text-white hover:border-accent-cyan hover:text-accent-cyan'
          }`}
        >
          ⚡ SECTOR 02: INDEPENDENT LABS
        </button>
      </div>
    </div>
  );
};
