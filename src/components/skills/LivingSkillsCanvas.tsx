'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { SKILLS_DATA, LivingSkillGroup } from '@/utils/constants';
import {
  initLivingStreetScene,
  updateLivingStreetScene,
  updateCharacterMovement,
  renderLivingStreet,
  LivingStreetSceneState,
  LivingCharacter,
  LIVING_WORLD_WIDTH,
  LIVING_WORLD_HEIGHT,
  LIVING_CHAR_Y,
} from '@/utils/skills';

interface LivingSkillsCanvasProps {
  activeGroupId: 'frontend' | 'backend' | 'database' | 'tools';
  activeTechName: string | null;
  onSelectGroup: (groupId: 'frontend' | 'backend' | 'database' | 'tools') => void;
}

const STATION_X_COORDINATES: Record<'frontend' | 'backend' | 'database' | 'tools', number> = {
  frontend: 192,
  backend: 480,
  database: 780,
  tools: 1056,
};

export const LivingSkillsCanvas: React.FC<LivingSkillsCanvasProps> = ({
  activeGroupId,
  activeTechName,
  onSelectGroup,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const sceneStateRef = useRef<LivingStreetSceneState | null>(null);
  const characterRef = useRef<LivingCharacter>({
    x: STATION_X_COORDINATES[activeGroupId] || 192,
    y: LIVING_CHAR_Y,
    targetX: STATION_X_COORDINATES[activeGroupId] || 192,
    facing: 'right',
    isMoving: false,
    animFrame: 0,
    inspectingStation: activeGroupId,
    inspectingTech: activeTechName,
  });

  const [hoveredStation, setHoveredStation] = useState<string | null>(null);

  // Sync character target when activeGroupId changes externally (e.g. from roster hover/click)
  useEffect(() => {
    const target = STATION_X_COORDINATES[activeGroupId];
    if (typeof target === 'number' && characterRef.current) {
      characterRef.current.targetX = target;
      characterRef.current.inspectingStation = activeGroupId;
      characterRef.current.inspectingTech = activeTechName;
    }
  }, [activeGroupId, activeTechName]);

  // Main 60fps animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    if (!sceneStateRef.current) {
      sceneStateRef.current = initLivingStreetScene();
    }

    let animationFrameId: number;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;

    const loop = () => {
      const scene = sceneStateRef.current;
      const char = characterRef.current;

      if (scene && char) {
        if (!prefersReducedMotion) {
          updateLivingStreetScene(scene);
          updateCharacterMovement(char);
        } else {
          char.x = char.targetX;
          char.isMoving = false;
        }

        renderLivingStreet(
          ctx,
          scene,
          char,
          activeGroupId,
          activeTechName,
          SKILLS_DATA.inspectingLabel,
          SKILLS_DATA.playerPointerLabel
        );
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeGroupId, activeTechName]);

  // Handle click on canvas: move character or select station
  const handleCanvasClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const scaleX = LIVING_WORLD_WIDTH / rect.width;
      const clickVirtualX = (e.clientX - rect.left) * scaleX;

      // Find closest station
      let closestGroup: 'frontend' | 'backend' | 'database' | 'tools' = 'frontend';
      let minDistance = Infinity;

      (Object.keys(STATION_X_COORDINATES) as Array<'frontend' | 'backend' | 'database' | 'tools'>).forEach(
        (groupId) => {
          const dist = Math.abs(STATION_X_COORDINATES[groupId] - clickVirtualX);
          if (dist < minDistance) {
            minDistance = dist;
            closestGroup = groupId;
          }
        }
      );

      // If clicked reasonably close to a station (within 140px), dispatch to station
      if (minDistance < 140) {
        onSelectGroup(closestGroup);
      } else {
        // Otherwise just walk freely to the clicked spot
        characterRef.current.targetX = Math.max(40, Math.min(LIVING_WORLD_WIDTH - 40, clickVirtualX));
      }
    },
    [onSelectGroup]
  );

  // Handle pointer hover across canvas to detect stations
  const handleCanvasMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = LIVING_WORLD_WIDTH / rect.width;
    const hoverVirtualX = (e.clientX - rect.left) * scaleX;

    let found: string | null = null;
    (Object.keys(STATION_X_COORDINATES) as Array<'frontend' | 'backend' | 'database' | 'tools'>).forEach(
      (groupId) => {
        const dist = Math.abs(STATION_X_COORDINATES[groupId] - hoverVirtualX);
        if (dist < 60) {
          found = groupId;
        }
      }
    );
    setHoveredStation(found);
  }, []);

  const handleCanvasMouseLeave = useCallback(() => {
    setHoveredStation(null);
  }, []);

  // Quick navigation buttons to dispatch Sumyta across the 4 stations
  const categories = SKILLS_DATA.categories as readonly LivingSkillGroup[];

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-none border border-white/10 bg-black/80 overflow-hidden shadow-2xl backdrop-blur-sm"
    >
      {/* ── TOP HUD TELEMETRY BAR ── */}
      <div className="flex items-center justify-between px-4 py-2 bg-surface-container/90 border-b border-white/10 text-xs font-mono text-secondary-dim">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
          <span className="tracking-wider uppercase font-semibold text-white">
            {SKILLS_DATA.kicker}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[11px]">
          <span className="text-secondary-dim/70">
            {SKILLS_DATA.liveStatus}
          </span>
          <span className="text-primary font-bold">
            {SKILLS_DATA.patrolStatus}
          </span>
        </div>
      </div>

      {/* ── MAIN PIXEL-ART CANVAS CONTAINER ── */}
      <div className="relative w-full aspect-[1200/380] max-h-[460px] min-h-[220px] bg-black">
        <canvas
          ref={canvasRef}
          width={LIVING_WORLD_WIDTH}
          height={LIVING_WORLD_HEIGHT}
          onClick={handleCanvasClick}
          onMouseMove={handleCanvasMouseMove}
          onMouseLeave={handleCanvasMouseLeave}
          className="w-full h-full object-cover block cursor-crosshair [image-rendering:pixelated]"
          aria-label="Interactive Living Pixel-Art Cyberpunk Scene"
        />

        {/* Ambient Corner Crosshairs (matching Hero game aesthetic) */}
        <div className="absolute top-2 left-2 pointer-events-none text-white/30 font-mono text-[9px]">
          [+ 01]
        </div>
        <div className="absolute top-2 right-2 pointer-events-none text-white/30 font-mono text-[9px]">
          [+ 02]
        </div>

        {/* Bottom Station Quick Links Overlay for Touch / Direct Navigation */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 pointer-events-auto">
            {categories.map((cat) => {
              const isCurrent = activeGroupId === cat.id;
              const isHovered = hoveredStation === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectGroup(cat.id)}
                  className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider transition-all duration-150 border ${
                    isCurrent
                      ? 'bg-primary text-black font-bold border-primary shadow-[0_0_10px_rgba(255,45,117,0.5)]'
                      : isHovered
                      ? 'bg-white/10 text-white border-white/40'
                      : 'bg-black/60 text-secondary-dim/80 border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                  aria-label={`Dispatch character to ${cat.title} station`}
                >
                  <span className="mr-1">{cat.stationSymbol}</span>
                  <span className="hidden md:inline">{cat.title}</span>
                  <span className="md:hidden">{cat.id.slice(0, 3).toUpperCase()}</span>
                </button>
              );
            })}
          </div>

          {/* Interaction Telemetry Instruction */}
          <div className="hidden lg:block text-[10px] font-mono text-secondary-dim/70 bg-black/70 px-2 py-0.5 border border-white/10">
            {SKILLS_DATA.interactionHint}
          </div>
        </div>
      </div>

      {/* ── BOTTOM HUD STATUS STRIP ── */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2 bg-surface-container/60 border-t border-white/10 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-secondary-dim/60 font-semibold">{SKILLS_DATA.activeTargetPrefix}</span>
          <span className="text-accent-cyan font-bold uppercase tracking-wider">
            {activeGroupId}
          </span>
          {activeTechName && (
            <>
              <span className="text-white/30">{'//'}</span>
              <span className="text-primary font-bold uppercase">{activeTechName}</span>
            </>
          )}
        </div>

        <div className="text-[11px] text-secondary-dim/60">
          STATION: {categories.find((c) => c.id === activeGroupId)?.stationName}
        </div>
      </div>
    </div>
  );
};
