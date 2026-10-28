'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { PROJECTS_DATA, ProjectItem } from '@/utils/constants';
import {
  initHighwayScene,
  updateHighwayScene,
  renderHighwayScene,
  HighwaySceneState,
  HighwayCruiser,
  HIGHWAY_CANVAS_WIDTH,
  HIGHWAY_CANVAS_HEIGHT,
  HIGHWAY_ROAD_Y,
  HIGHWAY_DESTINATIONS_X,
} from '@/utils/highwayRenderer';

interface ProjectsHighwayCanvasProps {
  activeProjectIndex: number;
  onSelectProject: (index: number) => void;
}

export const ProjectsHighwayCanvas: React.FC<ProjectsHighwayCanvasProps> = ({
  activeProjectIndex,
  onSelectProject,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const sceneStateRef = useRef<HighwaySceneState | null>(null);
  const cruiserRef = useRef<HighwayCruiser>({
    x: HIGHWAY_DESTINATIONS_X[activeProjectIndex] ?? 190,
    y: HIGHWAY_ROAD_Y + 22,
    targetX: HIGHWAY_DESTINATIONS_X[activeProjectIndex] ?? 190,
    speed: 0,
    isCruising: false,
    activeDestinationIndex: activeProjectIndex,
  });

  // Sync target when activeProjectIndex changes
  useEffect(() => {
    const targetX = HIGHWAY_DESTINATIONS_X[activeProjectIndex];
    if (typeof targetX === 'number' && cruiserRef.current) {
      cruiserRef.current.targetX = targetX;
      cruiserRef.current.activeDestinationIndex = activeProjectIndex;
    }
  }, [activeProjectIndex]);

  // Main 60fps animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    if (!sceneStateRef.current) {
      sceneStateRef.current = initHighwayScene();
    }

    let animationFrameId: number;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;

    const loop = () => {
      const scene = sceneStateRef.current;
      const cruiser = cruiserRef.current;

      if (scene && cruiser) {
        if (!prefersReducedMotion) {
          updateHighwayScene(scene, cruiser);
        } else {
          cruiser.x = cruiser.targetX;
          cruiser.isCruising = false;
        }

        renderHighwayScene(ctx, scene, cruiser, activeProjectIndex);
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeProjectIndex]);

  // Handle canvas click to cruise to clicked destination
  const handleCanvasClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const scaleX = HIGHWAY_CANVAS_WIDTH / rect.width;
      const clickVirtualX = (e.clientX - rect.left) * scaleX;

      let closestIndex = 0;
      let minDistance = Infinity;

      HIGHWAY_DESTINATIONS_X.forEach((destX, idx) => {
        const dist = Math.abs(destX - clickVirtualX);
        if (dist < minDistance) {
          minDistance = dist;
          closestIndex = idx;
        }
      });

      if (minDistance < 140) {
        onSelectProject(closestIndex);
      }
    },
    [onSelectProject]
  );

  const projects = PROJECTS_DATA.projects as readonly ProjectItem[];
  const activeProject = projects[activeProjectIndex];

  return (
    <div
      ref={containerRef}
      className="relative w-full border border-white/10 bg-black/80 overflow-hidden shadow-2xl backdrop-blur-sm"
    >
      {/* ── TOP HUD TELEMETRY BAR ── */}
      <div className="flex items-center justify-between px-4 py-2 bg-surface-container/90 border-b border-white/10 text-xs font-mono text-secondary-dim">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
          <span className="tracking-wider uppercase font-semibold text-white">
            {PROJECTS_DATA.kicker}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[11px]">
          <span className="text-secondary-dim/70">{PROJECTS_DATA.cruisingSpeed}</span>
          <span className="text-accent-cyan font-bold">
            {activeProject ? `DOCKED // ${activeProject.exitCode}: ${activeProject.title.toUpperCase()}` : ''}
          </span>
        </div>
      </div>

      {/* ── MAIN HIGHWAY PIXEL-ART CANVAS CONTAINER ── */}
      <div className="relative w-full aspect-[1200/380] max-h-[460px] min-h-[220px] bg-black">
        <canvas
          ref={canvasRef}
          width={HIGHWAY_CANVAS_WIDTH}
          height={HIGHWAY_CANVAS_HEIGHT}
          onClick={handleCanvasClick}
          className="w-full h-full object-cover block cursor-crosshair [image-rendering:pixelated]"
          aria-label="Interactive Pixel-Art Highway Traveling Through Neon City Projects"
        />

        {/* Ambient Corner Crosshairs (matching Hero game aesthetic) */}
        <div className="absolute top-2 left-2 pointer-events-none text-white/30 font-mono text-[9px]">
          [+ HWY 01]
        </div>
        <div className="absolute top-2 right-2 pointer-events-none text-white/30 font-mono text-[9px]">
          [+ HWY 02]
        </div>

        {/* Bottom Highway Exit Switches Overlay */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 pointer-events-auto">
            {projects.map((proj, idx) => {
              const isCurrent = activeProjectIndex === idx;
              return (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => onSelectProject(idx)}
                  className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider transition-all duration-150 border ${
                    isCurrent
                      ? 'bg-primary text-black font-bold border-primary shadow-[0_0_12px_rgba(255,45,117,0.5)]'
                      : 'bg-black/60 text-secondary-dim/80 border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                  aria-label={`Cruise cyber vehicle to ${proj.title} destination`}
                >
                  <span className="mr-1">{proj.exitCode}</span>
                  <span className="hidden md:inline">{proj.title}</span>
                </button>
              );
            })}
          </div>

          {/* Interaction Instruction */}
          <div className="hidden lg:block text-[10px] font-mono text-secondary-dim/70 bg-black/70 px-2 py-0.5 border border-white/10">
            {PROJECTS_DATA.interactionHint}
          </div>
        </div>
      </div>

      {/* ── BOTTOM HUD WAYPOINT STRIP ── */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2 bg-surface-container/60 border-t border-white/10 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-secondary-dim/60 font-semibold">WAYPOINT //</span>
          <span className="text-accent-cyan font-bold uppercase tracking-wider">
            {activeProject?.waypointLabel}
          </span>
          <span className="text-white/30">{'//'}</span>
          <span className="text-primary font-bold uppercase">{activeProject?.landmarkTitle}</span>
        </div>

        <div className="text-[11px] text-secondary-dim/60 hidden sm:block">
          DISTRICT: {activeProject?.districtType}
        </div>
      </div>
    </div>
  );
};
