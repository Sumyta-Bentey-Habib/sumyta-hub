'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { SKILLS_DATA, LivingSkillGroup } from '@/utils/constants';
import { useReducedMotion } from '@/utils/useReducedMotion';
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
import styles from './LivingSkills.module.css';

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

const STATION_ORDER: Array<'frontend' | 'backend' | 'database' | 'tools'> = [
  'frontend',
  'backend',
  'database',
  'tools',
];

export const LivingSkillsCanvas: React.FC<LivingSkillsCanvasProps> = ({
  activeGroupId,
  activeTechName,
  onSelectGroup,
}) => {
  const prefersReducedMotion = useReducedMotion();
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
  const lastInteractionRef = useRef<number>(0);
  const isHoveredRef = useRef<boolean>(false);
  const pauseTicksRef = useRef<number>(0);

  // Sync character & marker targets when activeGroupId changes externally
  useEffect(() => {
    const target = STATION_X_COORDINATES[activeGroupId];
    if (typeof target === 'number') {
      if (characterRef.current) {
        // If character is not already at this station, walk toward it
        if (Math.abs(characterRef.current.x - target) > 4) {
          characterRef.current.targetX = target;
          pauseTicksRef.current = 0;
          lastInteractionRef.current = Date.now();
        }
        characterRef.current.inspectingStation = activeGroupId;
        characterRef.current.inspectingTech = activeTechName;
      }
      if (sceneStateRef.current) {
        sceneStateRef.current.targetMarkerX = target;
      }
    }
  }, [activeGroupId, activeTechName]);

  // Main 60fps animation loop: handles continuous boulevard walking & station inspection
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    if (!sceneStateRef.current) {
      sceneStateRef.current = initLivingStreetScene();
      sceneStateRef.current.markerX = STATION_X_COORDINATES[activeGroupId] || 192;
      sceneStateRef.current.targetMarkerX = STATION_X_COORDINATES[activeGroupId] || 192;
    }

    if (lastInteractionRef.current === 0) {
      lastInteractionRef.current = Date.now();
    }

    let animationFrameId: number;

    const loop = () => {
      const scene = sceneStateRef.current;
      const char = characterRef.current;


      if (scene && char) {
        if (!prefersReducedMotion) {
          updateLivingStreetScene(scene);
          updateCharacterMovement(char, scene.tick);


          if (!char.isMoving) {

            const reachedStation = STATION_ORDER.find(
              (key) => Math.abs(STATION_X_COORDINATES[key] - char.x) <= 4
            );

            if (reachedStation) {

              if (reachedStation !== activeGroupId) {
                onSelectGroup(reachedStation);
              }


              pauseTicksRef.current += 1;
              const INSPECTION_PAUSE_DURATION = 160;


              const isUserBusy =
                isHoveredRef.current ||
                (lastInteractionRef.current > 0 && Date.now() - lastInteractionRef.current < 3500);


              if (!isUserBusy && pauseTicksRef.current >= INSPECTION_PAUSE_DURATION) {
                pauseTicksRef.current = 0;
                const currentStationIdx = STATION_ORDER.indexOf(reachedStation);
                const nextStationIdx = (currentStationIdx + 1) % STATION_ORDER.length;
                const nextStation = STATION_ORDER[nextStationIdx];

                char.targetX = STATION_X_COORDINATES[nextStation];
                char.inspectingStation = nextStation;
                scene.targetMarkerX = STATION_X_COORDINATES[nextStation];
              }
            }
          } else {

            pauseTicksRef.current = 0;
          }
        } else {

          char.x = char.targetX;
          char.isMoving = false;
          scene.markerX = scene.targetMarkerX;
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
  }, [activeGroupId, activeTechName, onSelectGroup, prefersReducedMotion]);


  const handleCanvasClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      lastInteractionRef.current = Date.now();
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const scaleX = LIVING_WORLD_WIDTH / rect.width;
      const clickVirtualX = (e.clientX - rect.left) * scaleX;


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


      if (minDistance < 140) {
        onSelectGroup(closestGroup);
      } else {

        characterRef.current.targetX = Math.max(40, Math.min(LIVING_WORLD_WIDTH - 40, clickVirtualX));
        pauseTicksRef.current = 0;
      }
    },
    [onSelectGroup]
  );

  const handleCanvasMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    lastInteractionRef.current = Date.now();
    isHoveredRef.current = true;
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

  const handleCanvasMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
    lastInteractionRef.current = Date.now();
  }, []);

  const handleCanvasMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    lastInteractionRef.current = Date.now();
    setHoveredStation(null);
  }, []);

  const categories = SKILLS_DATA.categories as readonly LivingSkillGroup[];

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleCanvasMouseEnter}
      onMouseLeave={handleCanvasMouseLeave}
      className="relative w-full bg-black/90 overflow-hidden"
    >
    
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
          aria-label="Interactive Living Pixel-Art Cyberpunk Scene with auto-patrolling character"
        />

        {/* Ambient Corner Crosshairs (matching Hero game aesthetic) */}
        <div className="absolute top-2 left-2 pointer-events-none text-white/30 font-mono text-[9px]">
          [+ 01]
        </div>
        <div className="absolute top-2 right-2 pointer-events-none text-white/30 font-mono text-[9px]">
          [+ 02]
        </div>

        {/* Quick Station Dispatch Controls on Canvas */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 pointer-events-auto">
            {categories.map((cat) => {
              const isCurrent = activeGroupId === cat.id;
              const isHovered = hoveredStation === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    lastInteractionRef.current = Date.now();
                    onSelectGroup(cat.id);
                  }}
                  className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider transition-all duration-150 border cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                    isCurrent
                      ? `bg-primary text-black font-bold border-primary ${styles.activeButtonGlow}`
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

      {/* ── INTEGRATED BOULEVARD CONNECTOR PORTS (BRIDGING CANVAS TO ROSTER) ── */}
      <div className="relative w-full border-t border-white/10 bg-surface-container/80 text-xs font-mono">
        {/* Status Telemetry Strip */}
        <div className="flex flex-wrap items-center justify-between px-4 py-2 text-[11px] border-b border-white/5">
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

          <div className="flex items-center gap-2 text-secondary-dim/60">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
            <span>STATION: {categories.find((c) => c.id === activeGroupId)?.stationName}</span>
          </div>
        </div>

        {/* 4 Downward Station Conduits visually flowing to categories */}
        <div className="hidden lg:grid grid-cols-4 w-full h-4 divide-x divide-white/10 pointer-events-none relative" aria-hidden="true">
          {categories.map((cat) => {
            const isCatActive = activeGroupId === cat.id;
            const accentBg =
              cat.id === 'frontend'
                ? 'bg-primary'
                : cat.id === 'backend'
                ? 'bg-accent-cyan'
                : cat.id === 'database'
                ? 'bg-window-amber'
                : 'bg-finish-gold';

            const accentGlow =
              cat.id === 'frontend'
                ? styles.glowFrontend
                : cat.id === 'backend'
                ? styles.glowBackend
                : cat.id === 'database'
                ? styles.glowDatabase
                : styles.glowTools;

            return (
              <div key={cat.id} className="relative h-full flex items-center justify-center">
                {/* Center Connector Spine */}
                <div
                  className={`w-0.5 h-full transition-all duration-300 ${
                    isCatActive ? `${accentBg} ${accentGlow}` : 'bg-white/10'
                  }`}
                />

                {/* Downward Pulse Node */}
                {isCatActive && (
                  <span
                    className={`absolute bottom-0 w-2 h-2 rotate-45 ${accentBg} transition-all`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
