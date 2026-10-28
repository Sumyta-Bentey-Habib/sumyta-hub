'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { HERO_DATA, COLOR_TOKENS } from '@/utils/constants';

interface GameNode {
  readonly id: string;
  readonly label: string;
  readonly tech: string;
  readonly xPercent: number;
  readonly yPercent: number;
}

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [acquiredNodeIds, setAcquiredNodeIds] = useState<string[]>([]);
  const [isSimActive, setIsSimActive] = useState<boolean>(true);
  const [announcement, setAnnouncement] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Position and trajectory state for reticle (in relative percentages 0..100)
  const reticlePos = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 50,
    y: 50,
    targetX: 50,
    targetY: 50,
  });

  const radarAngle = useRef<number>(0);
  const pulseRings = useRef<Array<{ x: number; y: number; r: number; alpha: number; color: string }>>([]);
  const animFrameId = useRef<number | null>(null);

  // Toggle or acquire a node
  const acquireNode = useCallback((node: GameNode) => {
    setAcquiredNodeIds((prev) => {
      if (prev.includes(node.id)) return prev;
      const next = [...prev, node.id];
      setAnnouncement(`Target synchronized: ${node.label} (${node.tech})`);
      return next;
    });

    // Add visual shockwave pulse ring
    const canvas = canvasRef.current;
    if (canvas) {
      const px = (node.xPercent / 100) * canvas.width;
      const py = (node.yPercent / 100) * canvas.height;
      pulseRings.current.push({
        x: px,
        y: py,
        r: 6,
        alpha: 1,
        color: COLOR_TOKENS.primary,
      });
    }
  }, []);

  const resetRadar = useCallback(() => {
    setAcquiredNodeIds([]);
    setAnnouncement(HERO_DATA.gameHud.resetAction);
  }, []);

  // Keyboard navigation for 2D Game Reticle
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      const step = 4;
      let handled = false;
      const current = reticlePos.current;

      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        current.targetY = Math.max(5, current.targetY - step);
        handled = true;
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        current.targetY = Math.min(95, current.targetY + step);
        handled = true;
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        current.targetX = Math.max(5, current.targetX - step);
        handled = true;
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        current.targetX = Math.min(95, current.targetX + step);
        handled = true;
      } else if (e.key === ' ' || e.key === 'Enter') {
        // Engage nearest node to reticle
        const nodes = HERO_DATA.gameHud.nodes;
        let nearest: GameNode | null = null;
        let minDist = Infinity;
        nodes.forEach((n) => {
          const dx = n.xPercent - current.x;
          const dy = n.yPercent - current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < minDist) {
            minDist = dist;
            nearest = n;
          }
        });
        if (nearest && minDist < 20) {
          acquireNode(nearest);
        }
        handled = true;
      }

      if (handled) {
        e.preventDefault();
      }
    },
    [acquireNode]
  );

  // Mouse / Pointer handler
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    reticlePos.current.targetX = Math.max(2, Math.min(98, xPct));
    reticlePos.current.targetY = Math.max(2, Math.min(98, yPct));
  }, []);

  const handlePointerDown = useCallback(() => {
    // Check if clicked near any node
    const current = reticlePos.current;
    const nodes = HERO_DATA.gameHud.nodes;
    nodes.forEach((node) => {
      const dx = node.xPercent - current.targetX;
      const dy = node.yPercent - current.targetY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 12) {
        acquireNode(node);
      }
    });
  }, [acquireNode]);

  // Main 2D Canvas Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const width = parent.clientWidth;
      const height = parent.clientHeight;

      ctx.clearRect(0, 0, width, height);

      // Smooth interpolation for reticle position
      const rp = reticlePos.current;
      rp.x += (rp.targetX - rp.x) * 0.12;
      rp.y += (rp.targetY - rp.y) * 0.12;

      const reticlePx = (rp.x / 100) * width;
      const reticlePy = (rp.y / 100) * height;

      // ── 1. DRAW SUBTLE 2D BACKGROUND TACTICAL GRID ──
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
      ctx.lineWidth = 1;

      const gridSize = 64;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Small crosshairs at grid intersections
      ctx.strokeStyle = 'rgba(255, 141, 144, 0.15)';
      const crossSize = 3;
      for (let x = gridSize; x < width; x += gridSize * 2) {
        for (let y = gridSize; y < height; y += gridSize * 2) {
          ctx.beginPath();
          ctx.moveTo(x - crossSize, y);
          ctx.lineTo(x + crossSize, y);
          ctx.moveTo(x, y - crossSize);
          ctx.lineTo(x, y + crossSize);
          ctx.stroke();
        }
      }
      ctx.restore();

      // ── 2. DRAW 2D RADAR SWEEP (Center of canvas) ──
      if (isSimActive && !prefersReducedMotion) {
        radarAngle.current = (radarAngle.current + 0.015) % (Math.PI * 2);
      }

      const centerX = width * 0.5;
      const centerY = height * 0.48;
      const radarRadius = Math.min(width, height) * 0.45;

      ctx.save();
      // Radar outer concentric vector rings
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radarRadius * 0.4, 0, Math.PI * 2);
      ctx.arc(centerX, centerY, radarRadius * 0.7, 0, Math.PI * 2);
      ctx.arc(centerX, centerY, radarRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Radar rotating beam sweep
      if (isSimActive && !prefersReducedMotion) {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(radarAngle.current);
        const sweepGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, radarRadius);
        sweepGrad.addColorStop(0, 'rgba(255, 141, 144, 0.25)');
        sweepGrad.addColorStop(1, 'rgba(255, 141, 144, 0)');
        ctx.fillStyle = sweepGrad;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radarRadius, -0.25, 0);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = COLOR_TOKENS.primary;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(radarRadius, 0);
        ctx.stroke();
        ctx.restore();
      }
      ctx.restore();

      // ── 3. DRAW TACTICAL NODES & CONNECTORS ──
      const nodes = HERO_DATA.gameHud.nodes;
      nodes.forEach((node) => {
        const nx = (node.xPercent / 100) * width;
        const ny = (node.yPercent / 100) * height;
        const isAcquired = acquiredNodeIds.includes(node.id);

        // Distance to reticle
        const dx = reticlePx - nx;
        const dy = reticlePy - ny;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const isProximity = dist < 70;

        // Auto-lock when reticle moves right onto the node
        if (dist < 18 && !isAcquired) {
          acquireNode(node);
        }

        // Draw dotted vector line from node to reticle if close
        if (isProximity) {
          ctx.save();
          ctx.setLineDash([3, 4]);
          ctx.strokeStyle = isAcquired ? COLOR_TOKENS.primary : 'rgba(255, 141, 144, 0.4)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(nx, ny);
          ctx.lineTo(reticlePx, reticlePy);
          ctx.stroke();
          ctx.restore();
        }

        // Node Diamond & Bracket
        ctx.save();
        const markerSize = isAcquired ? 8 : 6;
        ctx.strokeStyle = isAcquired ? COLOR_TOKENS.primary : COLOR_TOKENS.outline;
        ctx.fillStyle = isAcquired ? COLOR_TOKENS.primary : 'rgba(25, 25, 25, 0.9)';
        ctx.lineWidth = 1.5;

        // Diamond icon
        ctx.beginPath();
        ctx.moveTo(nx, ny - markerSize);
        ctx.lineTo(nx + markerSize, ny);
        ctx.lineTo(nx, ny + markerSize);
        ctx.lineTo(nx - markerSize, ny);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Pulsing halo if acquired
        if (isAcquired && !prefersReducedMotion) {
          ctx.strokeStyle = 'rgba(255, 141, 144, 0.4)';
          ctx.beginPath();
          ctx.arc(nx, ny, markerSize * 2, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Tactical Label Text
        ctx.font = '10px monospace';
        ctx.fillStyle = isAcquired ? COLOR_TOKENS.white : COLOR_TOKENS.secondaryDim;
        ctx.fillText(`[${node.label}]`, nx + 12, ny - 4);

        ctx.font = '9px monospace';
        ctx.fillStyle = isAcquired ? COLOR_TOKENS.primary : COLOR_TOKENS.outline;
        ctx.fillText(node.tech, nx + 12, ny + 8);
        ctx.restore();
      });

      // ── 4. DRAW SHOCKWAVE PULSE RINGS ──
      for (let i = pulseRings.current.length - 1; i >= 0; i--) {
        const ring = pulseRings.current[i];
        ring.r += 2.2;
        ring.alpha -= 0.025;

        if (ring.alpha <= 0) {
          pulseRings.current.splice(i, 1);
        } else {
          ctx.save();
          ctx.strokeStyle = `rgba(255, 141, 144, ${ring.alpha})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
      }

      // ── 5. DRAW PLAYER-CONTROLLED 2D RETICLE ──
      ctx.save();
      const reticleColor = COLOR_TOKENS.primary;
      ctx.strokeStyle = reticleColor;
      ctx.lineWidth = 1.5;

      // Outer targeting brackets
      const rSize = 14;
      const corner = 4;
      // Top-Left
      ctx.beginPath();
      ctx.moveTo(reticlePx - rSize, reticlePy - rSize + corner);
      ctx.lineTo(reticlePx - rSize, reticlePy - rSize);
      ctx.lineTo(reticlePx - rSize + corner, reticlePy - rSize);
      // Top-Right
      ctx.moveTo(reticlePx + rSize - corner, reticlePy - rSize);
      ctx.lineTo(reticlePx + rSize, reticlePy - rSize);
      ctx.lineTo(reticlePx + rSize, reticlePy - rSize + corner);
      // Bottom-Left
      ctx.moveTo(reticlePx - rSize, reticlePy + rSize - corner);
      ctx.lineTo(reticlePx - rSize, reticlePy + rSize);
      ctx.lineTo(reticlePx - rSize + corner, reticlePy + rSize);
      // Bottom-Right
      ctx.moveTo(reticlePx + rSize - corner, reticlePy + rSize);
      ctx.lineTo(reticlePx + rSize, reticlePy + rSize);
      ctx.lineTo(reticlePx + rSize, reticlePy + rSize - corner);
      ctx.stroke();

      // Center crosshair
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 141, 144, 0.7)';
      ctx.beginPath();
      ctx.moveTo(reticlePx - 6, reticlePy);
      ctx.lineTo(reticlePx + 6, reticlePy);
      ctx.moveTo(reticlePx, reticlePy - 6);
      ctx.lineTo(reticlePx, reticlePy + 6);
      ctx.stroke();

      // Coordinate readout next to reticle
      ctx.font = '9px monospace';
      ctx.fillStyle = COLOR_TOKENS.primary;
      const coordStr = `X:${Math.round(rp.x)} Y:${Math.round(rp.y)}`;
      ctx.fillText(coordStr, reticlePx + rSize + 4, reticlePy + 3);
      ctx.restore();

      if (!prefersReducedMotion) {
        animFrameId.current = requestAnimationFrame(render);
      }
    };

    if (prefersReducedMotion) {
      render();
    } else {
      animFrameId.current = requestAnimationFrame(render);
    }

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [acquiredNodeIds, isSimActive, acquireNode]);

  // Entrance animations for typography
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (nameRef.current) {
        gsap.fromTo(
          nameRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
        );
      }
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, delay: 0.15, ease: 'power3.out' }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const totalNodes = HERO_DATA.gameHud.nodes.length;
  const isAllAcquired = acquiredNodeIds.length === totalNodes;

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-label="Hero Introduction and Interactive 2D Operator Grid"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-surface-container-lowest pt-28 pb-12 md:pt-32 md:pb-16 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40 select-none"
    >
      {/* ── INTERACTIVE 2D VECTOR RADAR CANVAS (GAME LAYER) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="w-full h-full block"
        />
      </div>

      {/* ── TACTICAL HUD TOP TELEMETRY STRIP ── */}
      <div className="relative z-10 w-full px-6 md:px-12 max-w-7xl mx-auto mb-8">
        <div className="border border-white/10 bg-black/60 backdrop-blur-md p-3 md:p-4 flex flex-wrap items-center justify-between gap-4">
          {/* System Mode & Operator */}
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
              {HERO_DATA.gameHud.systemTag}
            </span>
            <span className="hidden sm:inline-block font-mono text-[0.65rem] tracking-wider text-outline">
              {'//'} {HERO_DATA.role} @ {HERO_DATA.company}
            </span>
          </div>

          {/* Target Sync Counter & Controls */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-secondary/70 tracking-wider">
                {HERO_DATA.gameHud.scoreLabel}:
              </span>
              <span className="text-white font-bold px-2 py-0.5 border border-primary/30 bg-primary/10">
                {acquiredNodeIds.length} / {totalNodes}
              </span>
            </div>

            {/* Radar Simulation Toggle */}
            <button
              type="button"
              onClick={() => setIsSimActive((prev) => !prev)}
              aria-label={isSimActive ? HERO_DATA.gameHud.simulationPaused : HERO_DATA.gameHud.simulationActive}
              className="text-[0.65rem] font-mono tracking-wider px-2.5 py-1 border border-outline/30 hover:border-primary text-secondary hover:text-white transition-colors"
            >
              {isSimActive ? HERO_DATA.gameHud.simulationActive : HERO_DATA.gameHud.simulationPaused}
            </button>

            {/* Reset Radar */}
            {acquiredNodeIds.length > 0 && (
              <button
                type="button"
                onClick={resetRadar}
                aria-label={HERO_DATA.gameHud.resetAction}
                className="text-[0.65rem] font-mono tracking-wider px-2.5 py-1 border border-primary/40 bg-primary/10 text-primary hover:bg-primary hover:text-black transition-all"
              >
                {HERO_DATA.gameHud.resetAction}
              </button>
            )}
          </div>
        </div>

        {/* Synchronization Completion Banner */}
        {isAllAcquired && (
          <div className="mt-2 p-2.5 border border-primary bg-primary/10 text-primary font-mono text-xs uppercase tracking-widest text-center animate-pulse">
            ★ {HERO_DATA.gameHud.allTargetsAcquired} ★
          </div>
        )}
      </div>

      {/* ── MAIN EDITORIAL / BRUTALIST CONTENT LAYER ── */}
      <div className="relative z-10 w-full px-6 md:px-12 max-w-7xl mx-auto flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Monolithic Editorial Name */}
          <div className="lg:col-span-6 xl:col-span-7">
            <div className="flex items-center gap-2 font-mono text-[0.65rem] sm:text-xs text-primary tracking-[0.3em] uppercase mb-4">
              <span className="w-2 h-2 bg-primary inline-block" aria-hidden="true" />
              <span>{HERO_DATA.role}</span>
              <span className="text-outline">/</span>
              <span className="text-white font-bold">{HERO_DATA.company}</span>
            </div>

            <h1
              ref={nameRef}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.75rem] font-headline font-black tracking-tighter leading-[0.82] text-white select-none break-words"
            >
              {HERO_DATA.name.first}
              <br />
              {HERO_DATA.name.middle}
              <br />
              <span className="text-primary">{HERO_DATA.name.last}</span>
            </h1>

            {/* Micro Metadata Badges */}
            <div className="mt-8 flex flex-wrap gap-2 font-mono text-[0.65rem] tracking-wider uppercase">
              {HERO_DATA.metaBadges.map((badge, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 border border-white/10 bg-black/40 text-secondary/80 backdrop-blur-sm"
                >
                  <span className="text-outline/60 mr-1.5">{badge.label}:</span>
                  <span className="text-white font-bold">{badge.value}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Statement, Production Engagement & CTAs */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-between pt-2">
            <div>
              {/* Main Headline Statement */}
              <h2
                ref={headlineRef}
                className="text-3xl sm:text-4xl md:text-5xl font-headline font-black tracking-tight uppercase leading-[0.92] text-white"
              >
                {HERO_DATA.headline.line1}
                <br />
                {HERO_DATA.headline.line2}
                <br />
                <span className="text-primary">{HERO_DATA.headline.line3}</span>
              </h2>

              {/* Verified Professional Role & Capabilities */}
              <div className="mt-6 space-y-3">
                <p className="font-body text-secondary/90 text-sm md:text-base leading-relaxed">
                  {HERO_DATA.currentStatus.statement}{' '}
                  <span className="text-white font-bold tracking-wide">
                    {HERO_DATA.currentStatus.company}
                  </span>
                  . Focused on UI implementation, feature development, component refactoring, debugging, and responsive web & mobile interfaces.
                </p>
                <p className="text-primary font-mono text-xs md:text-sm font-semibold tracking-wide">
                  {HERO_DATA.techStackFormatted}
                </p>
              </div>

              {/* Interactive Telemetry Node Directory (Accessible Click Targets) */}
              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-outline mb-2">
                  {HERO_DATA.gameHud.telemetryPrefix}ACTIVE RADAR NODES
                </p>
                <div className="flex flex-wrap gap-2">
                  {HERO_DATA.gameHud.nodes.map((node) => {
                    const isAcquired = acquiredNodeIds.includes(node.id);
                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => acquireNode(node)}
                        className={`px-2.5 py-1 text-[0.65rem] font-mono tracking-wider border transition-all text-left ${
                          isAcquired
                            ? 'border-primary bg-primary/20 text-white font-bold'
                            : 'border-white/10 bg-black/40 text-secondary/70 hover:border-primary/60 hover:text-white'
                        }`}
                        aria-label={`Target node: ${node.label}, status: ${isAcquired ? 'synchronized' : 'unlocked'}`}
                      >
                        {isAcquired ? '✓ ' : '+ '}
                        {node.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3 md:gap-4">
              {HERO_DATA.actions.map((action, index) => (
                <a
                  key={index}
                  href={action.href}
                  target={action.isExternal ? '_blank' : undefined}
                  rel={action.isExternal ? 'noopener noreferrer' : undefined}
                  aria-label={action.ariaLabel}
                  className={`px-5 py-3 md:px-6 md:py-3.5 font-headline font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 group ${
                    action.primary
                      ? 'bg-primary text-black border border-primary hover:bg-white hover:border-white hover:text-black hover:scale-105 active:scale-95 shadow-lg shadow-primary/10'
                      : 'bg-surface-container/60 border border-outline/30 text-white hover:border-primary hover:text-primary hover:scale-105 active:scale-95 backdrop-blur-sm'
                  }`}
                >
                  <span>{action.label}</span>
                  <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-0.5">
                    {action.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── BOTTOM TACTICAL BAR: CONTROLS & SCROLL TELEMETRY ── */}
      <div className="relative z-10 w-full px-6 md:px-12 max-w-7xl mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
        {/* Game Pilot Controls Hint */}
        <div className="flex items-center gap-2 text-outline text-[0.7rem] uppercase tracking-wider">
          <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          <span className="hidden md:inline">{HERO_DATA.gameHud.controlsHintDesktop}</span>
          <span className="md:hidden">{HERO_DATA.gameHud.controlsHintMobile}</span>
        </div>

        {/* Scroll Action Hint */}
        <a
          href="#work"
          className="flex items-center gap-3 text-primary hover:text-white transition-colors duration-300 font-headline font-bold text-xs tracking-widest uppercase group"
          aria-label="Scroll down to casework section"
        >
          <span>{HERO_DATA.scrollText}</span>
          <span className="material-symbols-outlined text-sm group-hover:translate-y-1 transition-transform">
            arrow_downward
          </span>
        </a>
      </div>

      {/* Screen Reader Live Region for Game Updates */}
      <div className="sr-only" aria-live="polite">
        {announcement}
        {isFocused && ' Interactive 2D tactical radar active. Use W, A, S, D or arrow keys to steer reticle. Press Space to engage nodes.'}
      </div>
    </section>
  );
};

export default Hero;
