/**
 * Particle Assembly Engine for Selected Work Abstract Project Illustrations
 *
 * Samples pixel data from source images and renders Canvas 2D particle assembly animations.
 * Features project-specific movement behaviors:
 *  - soundmade: flowing audio waveforms and sinusoidal frequency pulses
 *  - kiibee: floating editorial sheets and drifting document planes
 *  - foodime: structured orthogonal convergence and operational grid pulses
 */

export type ProjectParticleVariant = 'soundmade' | 'kiibee' | 'foodime';

export interface Particle {
  // Normalized destination coordinates [0, 1]
  readonly targetU: number;
  readonly targetV: number;
  // Normalized initial scattered coordinates
  readonly startU: number;
  readonly startV: number;
  // Visual traits
  readonly r: number;
  readonly g: number;
  readonly b: number;
  readonly a: number;
  readonly size: number;
  readonly shape: 'circle' | 'square' | 'rect';
  // Staggered timing
  readonly delay: number;
  readonly duration: number;
  // Breathing/floating traits
  readonly floatPhase: number;
  readonly floatSpeed: number;
  readonly floatAmpX: number;
  readonly floatAmpY: number;
  readonly initialAngle: number;
}

export interface ParticleEngineState {
  particles: Particle[];
  startTime: number | null;
  assembled: boolean;
  overallProgress: number;
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

/**
 * Creates particles from sampled pixel data with project-specific scattering logic.
 */
export function createProjectParticles(
  sampledPixels: Array<{ u: number; v: number; r: number; g: number; b: number; a: number; brightness: number }>,
  variant: ProjectParticleVariant
): Particle[] {
  const particles: Particle[] = [];
  const count = sampledPixels.length;

  for (let i = 0; i < count; i++) {
    const p = sampledPixels[i];
    const { u, v, r, g, b, a, brightness } = p;

    let startU = u;
    let startV = v;
    let shape: 'circle' | 'square' | 'rect' = 'circle';
    let baseSize = 2 + brightness * 2;
    let delay = (i / count) * 0.35 + Math.random() * 0.15;
    let duration = 1.3 + Math.random() * 0.4;
    let initialAngle = 0;
    let floatSpeed = 1.5 + Math.random() * 1.2;
    let floatAmpX = 1.2 + Math.random() * 1.0;
    let floatAmpY = 1.8 + Math.random() * 1.4;

    switch (variant) {
      case 'soundmade': {
        // Sound frequencies & flowing audio waveforms:
        // Scatter along harmonic sine waves with sinusoidal vertical offsets
        shape = 'circle';
        baseSize = 1.8 + brightness * 2.2;
        const waveAngle = (u * 6 + Math.sin(v * 4)) * Math.PI;
        const waveDispersion = 0.35 + Math.random() * 0.3;
        startU = clamp(u + Math.cos(waveAngle) * waveDispersion, -0.15, 1.15);
        startV = clamp(v + Math.sin(waveAngle) * waveDispersion + Math.sin(u * 10) * 0.15, -0.2, 1.2);
        delay = (u * 0.35) + (Math.random() * 0.15); // Wave sweep from left to right
        duration = 1.4 + Math.random() * 0.35;
        floatSpeed = 2.0 + Math.random() * 1.0;
        floatAmpY = 2.5 + Math.random() * 1.5;
        floatAmpX = 1.2;
        break;
      }

      case 'kiibee': {
        // Editorial & digital publishing:
        // Layered document sheets drifting in from diagonal planes
        shape = 'rect';
        baseSize = 2.0 + brightness * 2.4;
        const driftAngle = -Math.PI / 4; // Isometric diagonal angle
        const driftDist = 0.3 + Math.random() * 0.35;
        startU = clamp(u + Math.cos(driftAngle) * driftDist + (Math.random() - 0.5) * 0.15, -0.2, 1.2);
        startV = clamp(v + Math.sin(driftAngle) * driftDist - 0.12, -0.25, 1.15);
        initialAngle = (Math.random() - 0.5) * 0.6; // Subtle paper tilt
        delay = (v * 0.3) + Math.random() * 0.15; // Top-to-bottom cascading sheets
        duration = 1.5 + Math.random() * 0.4;
        floatSpeed = 1.2 + Math.random() * 0.8;
        floatAmpY = 2.0 + Math.random() * 1.0;
        floatAmpX = 1.6 + Math.random() * 0.8;
        break;
      }

      case 'foodime': {
        // Restaurant operations & POS:
        // Structured orthogonal matrix lines (receipt feed & terminal bus)
        shape = 'square';
        baseSize = 2.0 + brightness * 2.0;
        const isHorizontalFeed = i % 2 === 0;
        if (isHorizontalFeed) {
          startU = i % 4 === 0 ? -0.15 : 1.15;
          startV = clamp(v + (Math.random() - 0.5) * 0.1, 0, 1);
        } else {
          startU = clamp(u + (Math.random() - 0.5) * 0.1, 0, 1);
          startV = i % 4 === 1 ? -0.15 : 1.15;
        }
        delay = ((u + v) * 0.25) + Math.random() * 0.12; // Grid-aligned sequential arrival
        duration = 1.35 + Math.random() * 0.3;
        floatSpeed = 2.8;
        floatAmpY = 1.2;
        floatAmpX = 1.0;
        break;
      }
    }

    particles.push({
      targetU: u,
      targetV: v,
      startU,
      startV,
      r,
      g,
      b,
      a,
      size: baseSize,
      shape,
      delay,
      duration,
      floatPhase: Math.random() * Math.PI * 2,
      floatSpeed,
      floatAmpX,
      floatAmpY,
      initialAngle,
    });
  }

  return particles;
}

/**
 * Samples non-background pixels from an HTMLImageElement using an offscreen canvas.
 */
export function sampleImagePixels(
  img: HTMLImageElement,
  sampleWidth = 140,
  sampleHeight = 78,
  step = 3
): Array<{ u: number; v: number; r: number; g: number; b: number; a: number; brightness: number }> {
  if (typeof document === 'undefined') return [];

  const offscreen = document.createElement('canvas');
  offscreen.width = sampleWidth;
  offscreen.height = sampleHeight;
  const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
  if (!offCtx) return [];

  offCtx.drawImage(img, 0, 0, sampleWidth, sampleHeight);
  const imgData = offCtx.getImageData(0, 0, sampleWidth, sampleHeight);
  const data = imgData.data;

  const samples: Array<{ u: number; v: number; r: number; g: number; b: number; a: number; brightness: number }> = [];

  for (let y = 0; y < sampleHeight; y += step) {
    for (let x = 0; x < sampleWidth; x += step) {
      const idx = (y * sampleWidth + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3] / 255;

      // Calculate perceived luminance
      const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;

      // Filter out dark/empty background pixels so particles focus on vibrant artwork features
      if (a > 0.15 && brightness > 0.08) {
        samples.push({
          u: x / sampleWidth,
          v: y / sampleHeight,
          r,
          g,
          b,
          a,
          brightness,
        });
      }
    }
  }

  // Cap samples to ~1,100 points for optimal 60fps rendering across all viewports
  if (samples.length > 1100) {
    const stride = samples.length / 1100;
    const reduced: typeof samples = [];
    for (let i = 0; i < 1100; i++) {
      reduced.push(samples[Math.floor(i * stride)]);
    }
    return reduced;
  }

  return samples;
}

/**
 * Renders a single frame of the particle assembly animation onto the provided Canvas 2D context.
 * Returns overall progress [0, 1] and whether assembly is complete.
 */
export function renderParticleFrame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  particles: Particle[],
  variant: ProjectParticleVariant,
  elapsedSec: number
): { progress: number; isAssembled: boolean; imageOpacity: number } {
  ctx.clearRect(0, 0, width, height);

  // Maximum assembly completion time across all particles
  const totalAssemblyTime = 2.1;
  const overallProgress = clamp(elapsedSec / totalAssemblyTime, 0, 1);
  const isAssembled = overallProgress >= 1;

  // Reveal the underlying high-resolution illustration smoothly as particles converge
  // From progress 0.65 to 1.0, original image fades from 0 to 1
  const imageOpacity = clamp((overallProgress - 0.65) / 0.35, 0, 1);

  // Particles remain vibrant during assembly; once assembled, their opacity softly settles
  // to allow the crisp high-res image to take center stage while preserving a gentle breathing shimmer
  const canvasParticleAlpha = isAssembled ? 0.38 : clamp(1 - (imageOpacity * 0.5), 0.45, 1);

  const particleCount = particles.length;

  for (let i = 0; i < particleCount; i++) {
    const p = particles[i];

    // Local normalized assembly progress for this particle
    const localT = clamp((elapsedSec - p.delay) / p.duration, 0, 1);
    const easedT = easeOutCubic(localT);

    // Target coordinates in current canvas dimensions
    const targetX = p.targetU * width;
    const targetY = p.targetV * height;

    // Start scattered coordinates
    const startX = p.startU * width;
    const startY = p.startV * height;

    // Linear interpolation
    let currentX = lerp(startX, targetX, easedT);
    let currentY = lerp(startY, targetY, easedT);

    // Apply project-specific trajectory dynamics during convergence
    if (!isAssembled) {
      const convergenceResidual = 1 - easedT;

      if (variant === 'soundmade') {
        // Harmonic wave oscillation that dampens as particles dock
        const wave = Math.sin(localT * Math.PI * 2 + p.targetU * 8 + elapsedSec * 3) * convergenceResidual * 16;
        currentY += wave;
      } else if (variant === 'kiibee') {
        // Document sheet curvature during descent
        const lift = Math.sin(localT * Math.PI) * convergenceResidual * 12;
        currentY -= lift;
      } else if (variant === 'foodime') {
        // Grid-guided alignment with subtle damping
        const stepProgress = easeInOutQuad(localT);
        currentX = lerp(startX, targetX, stepProgress);
        currentY = lerp(startY, targetY, stepProgress);
      }
    }

    // Apply post-assembly ambient floating / breathing effect
    if (localT >= 0.85) {
      const floatInfluence = easeOutCubic(clamp((localT - 0.85) / 0.15, 0, 1));
      const time = elapsedSec * p.floatSpeed + p.floatPhase;

      if (variant === 'soundmade') {
        // Sound frequency oscillation
        currentY += Math.sin(time) * p.floatAmpY * floatInfluence;
        currentX += Math.cos(time * 0.8) * p.floatAmpX * floatInfluence;
      } else if (variant === 'kiibee') {
        // Gentle editorial buoyancy
        currentY += Math.sin(time) * p.floatAmpY * floatInfluence;
        currentX += Math.sin(time * 0.7) * p.floatAmpX * floatInfluence;
      } else if (variant === 'foodime') {
        // Synchronized operational grid pulse
        const gridPulse = Math.sin(elapsedSec * 2.5 + (p.targetU + p.targetV) * 5) * p.floatAmpY * floatInfluence;
        currentY += gridPulse;
      }
    }

    // Final particle alpha
    const alpha = p.a * canvasParticleAlpha;
    ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${alpha})`;

    // Draw particle based on project visual shape
    if (p.shape === 'circle') {
      ctx.beginPath();
      ctx.arc(currentX, currentY, p.size * 0.5, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.shape === 'rect') {
      const rectW = p.size * 1.3;
      const rectH = p.size * 0.9;
      ctx.fillRect(currentX - rectW * 0.5, currentY - rectH * 0.5, rectW, rectH);
    } else {
      // square
      const s = p.size;
      ctx.fillRect(currentX - s * 0.5, currentY - s * 0.5, s, s);
    }
  }

  return {
    progress: overallProgress,
    isAssembled,
    imageOpacity,
  };
}

