'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useReducedMotion } from '@/utils/useReducedMotion';
import {
  ProjectParticleVariant,
  Particle,
  createProjectParticles,
  sampleImagePixels,
  renderParticleFrame,
} from '@/utils/selected-work';

interface SelectedWorkParticleImageProps {
  readonly src: string;
  readonly alt: string;
  readonly variant: ProjectParticleVariant;
  readonly priority?: boolean;
}

export const SelectedWorkParticleImage: React.FC<SelectedWorkParticleImageProps> = ({
  src,
  alt,
  variant,
  priority = false,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [imageOpacity, setImageOpacity] = useState<number>(0);
  const [isCanvasActive, setIsCanvasActive] = useState<boolean>(false);
  const [hasFallback, setHasFallback] = useState<boolean>(false);

  const isReduced = prefersReducedMotion || hasFallback;

  // Manage animation & dimensions via refs to avoid re-renders during 60fps loop
  const particlesRef = useRef<Particle[] | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const pausedElapsedRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);
  const isIntersectingRef = useRef<boolean>(false);
  const dimensionsRef = useRef<{ width: number; height: number; dpr: number }>({
    width: 0,
    height: 0,
    dpr: 1,
  });

  const updateCanvasDimensions = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const rect = container.getBoundingClientRect();
    const width = Math.round(rect.width);
    const height = Math.round(rect.height);

    if (width === 0 || height === 0) return;

    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    dimensionsRef.current = { width, height, dpr };

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    let isMounted = true;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    function stopAnimationLoop() {
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
    }

    function step() {
      if (!isIntersectingRef.current || !isMounted) return;

      const currentCanvas = canvasRef.current;
      if (!currentCanvas) return;

      const ctx = currentCanvas.getContext('2d');
      if (!ctx) return;

      const particles = particlesRef.current;
      if (!particles || particles.length === 0) return;

      const { width, height, dpr } = dimensionsRef.current;
      if (width === 0 || height === 0) {
        updateCanvasDimensions();
      }

      const now = performance.now();
      if (startTimeRef.current === null) {
        startTimeRef.current = now - pausedElapsedRef.current;
      }

      const elapsedSec = (now - startTimeRef.current) / 1000;
      pausedElapsedRef.current = now - startTimeRef.current;


      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const frameResult = renderParticleFrame(
        ctx,
        width,
        height,
        particles,
        variant,
        elapsedSec
      );

      setImageOpacity(frameResult.imageOpacity);


      animFrameIdRef.current = requestAnimationFrame(step);
    }


    const sourceImage = new window.Image();
    sourceImage.crossOrigin = 'anonymous';

    sourceImage.onload = () => {
      if (!isMounted) return;

      try {
        const samples = sampleImagePixels(sourceImage, 140, 78, 3);
        if (samples.length === 0) {
          setHasFallback(true);
          return;
        }

        particlesRef.current = createProjectParticles(samples, variant);
        setIsCanvasActive(true);
        updateCanvasDimensions();

        // If card is already in viewport, start animation immediately
        if (isIntersectingRef.current && animFrameIdRef.current === null) {
          animFrameIdRef.current = requestAnimationFrame(step);
        }
      } catch {
        setHasFallback(true);
      }
    };

    sourceImage.onerror = () => {
      if (isMounted) {
        setHasFallback(true);
      }
    };

    sourceImage.src = src;

    // Viewport IntersectionObserver to start and pause animation
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          isIntersectingRef.current = true;
          if (particlesRef.current && animFrameIdRef.current === null) {
            updateCanvasDimensions();
            animFrameIdRef.current = requestAnimationFrame(step);
          }
        } else {
          isIntersectingRef.current = false;
          stopAnimationLoop();
          startTimeRef.current = null;
        }
      },
      {
        root: null,
        threshold: 0.15,
      }
    );

    intersectionObserver.observe(container);

    // ResizeObserver to adapt to container layout changes
    const resizeObserver = new ResizeObserver(() => {
      if (!isMounted) return;
      updateCanvasDimensions();
    });

    resizeObserver.observe(container);

    return () => {
      isMounted = false;
      stopAnimationLoop();
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [src, variant, prefersReducedMotion, updateCanvasDimensions]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-black/90">
      {/* ── HIGH-RESOLUTION BASE ILLUSTRATION ── */}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 33vw"
        style={{
          opacity: isReduced ? 1 : imageOpacity,
        }}
        className="object-cover filter contrast-[1.03] brightness-95 group-hover:scale-105 group-hover:brightness-105 transition-all duration-500 ease-out pointer-events-none"
      />

      {/* ── CANVAS 2D PARTICLE ASSEMBLY OVERLAY ── */}
      {!isReduced && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full pointer-events-none z-10 transition-opacity duration-300 ${
            isCanvasActive ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
};

SelectedWorkParticleImage.displayName = 'SelectedWorkParticleImage';
