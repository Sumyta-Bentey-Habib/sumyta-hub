import { COLOR_TOKENS } from '@/utils/tokens';

export const VIRTUAL_WIDTH = 360;
export const VIRTUAL_HEIGHT = 240;

interface Star {
  x: number;
  y: number;
  color: string;
  twinkleRate: number;
  twinkleOffset: number;
  isCluster?: boolean;
}

interface Hovercar {
  x: number;
  y: number;
  speed: number;
  color: string;
  tailColor: string;
}

const STARS: readonly Star[] = [
  { x: 18, y: 14, color: '#ffffff', twinkleRate: 0.05, twinkleOffset: 0.2 },
  { x: 42, y: 32, color: '#00f2fe', twinkleRate: 0.08, twinkleOffset: 1.1, isCluster: true },
  { x: 75, y: 18, color: '#ffb86c', twinkleRate: 0.04, twinkleOffset: 2.3 },
  { x: 98, y: 45, color: '#ffffff', twinkleRate: 0.06, twinkleOffset: 0.7 },
  { x: 124, y: 12, color: '#ff2d75', twinkleRate: 0.09, twinkleOffset: 3.4 },
  { x: 156, y: 38, color: '#ffffff', twinkleRate: 0.03, twinkleOffset: 1.8 },
  { x: 182, y: 22, color: '#00f2fe', twinkleRate: 0.07, twinkleOffset: 4.1, isCluster: true },
  { x: 210, y: 48, color: '#ffffff', twinkleRate: 0.05, twinkleOffset: 2.9 },
  { x: 236, y: 16, color: '#ffb86c', twinkleRate: 0.04, twinkleOffset: 0.5 },
  { x: 265, y: 34, color: '#ffffff', twinkleRate: 0.08, twinkleOffset: 1.6 },
  { x: 305, y: 15, color: '#ff2d75', twinkleRate: 0.06, twinkleOffset: 3.1 },
  { x: 332, y: 42, color: '#00f2fe', twinkleRate: 0.07, twinkleOffset: 2.0 },
  { x: 28, y: 65, color: '#ffffff', twinkleRate: 0.04, twinkleOffset: 4.5 },
  { x: 62, y: 78, color: '#ffffff', twinkleRate: 0.05, twinkleOffset: 1.3 },
  { x: 110, y: 72, color: '#00f2fe', twinkleRate: 0.06, twinkleOffset: 0.9 },
  { x: 144, y: 60, color: '#ffb86c', twinkleRate: 0.03, twinkleOffset: 3.8 },
  { x: 198, y: 68, color: '#ffffff', twinkleRate: 0.07, twinkleOffset: 2.5 },
  { x: 245, y: 55, color: '#ffffff', twinkleRate: 0.05, twinkleOffset: 1.0 },
  { x: 320, y: 75, color: '#ffb86c', twinkleRate: 0.06, twinkleOffset: 4.2 },
  { x: 348, y: 62, color: '#ffffff', twinkleRate: 0.04, twinkleOffset: 0.8 },
];

export interface PreloaderSceneState {
  tick: number;
  bloomAlpha: number;
  hovercars: Hovercar[];
}

export function initPreloaderScene(): PreloaderSceneState {
  return {
    tick: 0,
    bloomAlpha: 0,
    hovercars: [
      { x: -20, y: 48, speed: 0.45, color: '#ffffff', tailColor: '#00f2fe' },
      { x: VIRTUAL_WIDTH + 10, y: 76, speed: -0.35, color: '#ffffff', tailColor: '#ff2d75' },
      { x: 80, y: 102, speed: 0.25, color: '#ffffff', tailColor: '#ffd200' },
    ],
  };
}


export function updatePreloaderScene(scene: PreloaderSceneState, loadPercent: number): void {
  scene.tick += 1;


  for (const car of scene.hovercars) {
    car.x += car.speed;
    if (car.speed > 0 && car.x > VIRTUAL_WIDTH + 40) {
      car.x = -40;
    } else if (car.speed < 0 && car.x < -40) {
      car.x = VIRTUAL_WIDTH + 40;
    }
  }


  if (loadPercent >= 100) {
    if (scene.bloomAlpha < 0.28) {
      scene.bloomAlpha = Math.min(0.28, scene.bloomAlpha + 0.03);
    }
  } else {
    scene.bloomAlpha = 0;
  }
}


export function renderPreloaderScene(
  ctx: CanvasRenderingContext2D,
  scene: PreloaderSceneState,
  loadPercent: number
): void {
  const { tick, bloomAlpha } = scene;


  ctx.fillStyle = '#04020a';
  ctx.fillRect(0, 0, VIRTUAL_WIDTH, VIRTUAL_HEIGHT);


  drawSkyBands(ctx);


  drawStars(ctx, tick);
  drawCyberMoon(ctx, tick);

  if (loadPercent >= 15) {
    drawHovercars(ctx, scene);
  }


  drawFarSkyline(ctx, tick, loadPercent);


  drawMidgroundCity(ctx, tick, loadPercent);


  drawForegroundRooftop(ctx, tick, loadPercent);


  drawCharacter(ctx, tick, loadPercent);


  drawAtmosphericMotes(ctx, tick);


  if (bloomAlpha > 0) {
    ctx.fillStyle = `rgba(0, 242, 254, ${bloomAlpha * 0.5})`;
    ctx.fillRect(0, 0, VIRTUAL_WIDTH, VIRTUAL_HEIGHT);
    ctx.fillStyle = `rgba(255, 45, 117, ${bloomAlpha * 0.5})`;
    ctx.fillRect(0, 100, VIRTUAL_WIDTH, VIRTUAL_HEIGHT - 100);
  }
}

/**
 * 1. Pixel-Stepped Night Sky Gradient
 */
function drawSkyBands(ctx: CanvasRenderingContext2D): void {
  const bands = [
    { y: 0, h: 35, color: '#04020a' },
    { y: 35, h: 30, color: '#070312' },
    { y: 65, h: 30, color: '#0c051e' },
    { y: 95, h: 35, color: '#13082a' },
    { y: 130, h: 35, color: '#1a0b38' },
    { y: 165, h: 45, color: '#230e46' },
    { y: 210, h: 30, color: '#120526' },
  ];

  for (const band of bands) {
    ctx.fillStyle = band.color;
    ctx.fillRect(0, band.y, VIRTUAL_WIDTH, band.h);
  }
}

/**
 * 2. Twinkling Pixel Stars
 */
function drawStars(ctx: CanvasRenderingContext2D, tick: number): void {
  for (const star of STARS) {
    const twinkle = Math.sin(tick * star.twinkleRate + star.twinkleOffset);
    if (twinkle > -0.4) {
      ctx.fillStyle = star.color;
      ctx.fillRect(star.x, star.y, 1, 1);

      if (star.isCluster && twinkle > 0.6) {
        ctx.fillStyle = star.color;
        ctx.fillRect(star.x - 1, star.y, 1, 1);
        ctx.fillRect(star.x + 1, star.y, 1, 1);
        ctx.fillRect(star.x, star.y - 1, 1, 1);
        ctx.fillRect(star.x, star.y + 1, 1, 1);
      }
    }
  }
}

/**
 * 2b. Retro Cyber Moon Orb
 */
function drawCyberMoon(ctx: CanvasRenderingContext2D, tick: number): void {
  const mx = 278;
  const my = 34;

  ctx.fillStyle = 'rgba(0, 242, 254, 0.08)';
  ctx.fillRect(mx - 4, my - 4, 20, 20);

  ctx.fillStyle = '#fce4c8';
  ctx.fillRect(mx + 3, my, 6, 12);
  ctx.fillRect(mx + 1, my + 2, 10, 8);
  ctx.fillRect(mx, my + 3, 12, 6);

  ctx.fillStyle = '#080414';
  ctx.fillRect(mx + 4, my + 1, 7, 10);
  ctx.fillRect(mx + 2, my + 3, 8, 6);

  const ringPulse = Math.sin(tick * 0.08) > 0;
  ctx.fillStyle = ringPulse ? '#00f2fe' : '#ff2d75';
  ctx.fillRect(mx - 8, my + 6, 28, 1);
}

/**
 * 3. Flying Hovercar Traffic
 */
function drawHovercars(ctx: CanvasRenderingContext2D, scene: PreloaderSceneState): void {
  for (const car of scene.hovercars) {
    const cx = Math.round(car.x);
    const cy = car.y;

    if (car.speed > 0) {
      ctx.fillStyle = car.tailColor;
      ctx.fillRect(cx - 3, cy, 3, 1);
      ctx.fillStyle = car.color;
      ctx.fillRect(cx, cy, 2, 1);
    } else {
      ctx.fillStyle = car.color;
      ctx.fillRect(cx - 2, cy, 2, 1);
      ctx.fillStyle = car.tailColor;
      ctx.fillRect(cx, cy, 3, 1);
    }
  }
}

/**
 * 4. Layer 1: Far Skyline Silhouettes & Antenna Beacons
 */
function drawFarSkyline(
  ctx: CanvasRenderingContext2D,
  tick: number,
  loadPercent: number
): void {
  const farBuildings = [
    { x: 10, w: 26, h: 90 },
    { x: 42, w: 22, h: 110, spire: true },
    { x: 72, w: 32, h: 75 },
    { x: 112, w: 24, h: 130, spire: true },
    { x: 144, w: 36, h: 85 },
    { x: 188, w: 28, h: 120, spire: true },
    { x: 224, w: 34, h: 95 },
    { x: 266, w: 26, h: 140, spire: true },
    { x: 300, w: 30, h: 100 },
    { x: 338, w: 26, h: 115 },
  ];

  ctx.fillStyle = '#090514';
  for (const b of farBuildings) {
    const by = VIRTUAL_HEIGHT - b.h;
    ctx.fillRect(b.x, by, b.w, b.h);

    if (b.spire) {
      const spireX = b.x + Math.floor(b.w / 2);
      ctx.fillStyle = '#160d26';
      ctx.fillRect(spireX, by - 16, 1, 16);

      const blink = Math.sin(tick * 0.1 + b.x) > 0.2;
      ctx.fillStyle = blink ? '#ff2d75' : '#1a0d30';
      ctx.fillRect(spireX - 1, by - 18, 3, 2);
    }
  }

  // Windows illuminate progressively as loadPercent increases
  if (loadPercent >= 20) {
    for (let wx = 15; wx < VIRTUAL_WIDTH - 15; wx += 24) {
      const threshold = 20 + ((wx * 7) % 60);
      if (loadPercent >= threshold) {
        const flicker = Math.sin(tick * 0.04 + wx) > -0.3;
        if (flicker) {
          ctx.fillStyle = (wx % 48 === 0) ? '#00f2fe' : '#ffb86c';
          ctx.fillRect(wx, 150 + ((wx * 17) % 40), 1, 1);
          ctx.fillRect(wx + 3, 158 + ((wx * 19) % 35), 1, 1);
        }
      }
    }
  }
}

/**
 * 5. Layer 2: Midground Megastructures & Gradual Illumination
 */
function drawMidgroundCity(
  ctx: CanvasRenderingContext2D,
  tick: number,
  loadPercent: number
): void {
  const midBuildings = [
    { x: 24, w: 38, h: 135 },
    { x: 70, w: 44, h: 155, neonSign: 'verticalPink' },
    { x: 122, w: 36, h: 120, skybridge: true },
    { x: 166, w: 52, h: 165, neonSign: 'chevrons' },
    { x: 226, w: 46, h: 145, neonSign: 'billboard' },
    { x: 280, w: 42, h: 170, neonSign: 'verticalCyan' },
    { x: 330, w: 35, h: 130 },
  ];

  for (const b of midBuildings) {
    const by = VIRTUAL_HEIGHT - b.h;

    // Building structure
    ctx.fillStyle = '#170f2e';
    ctx.fillRect(b.x, by, b.w, b.h);

    // Architectural roof edge trim
    ctx.fillStyle = '#2b194f';
    ctx.fillRect(b.x, by, b.w, 2);

    // Roof edge neon glow turns on as loadPercent reaches 30%
    if (loadPercent >= 30) {
      ctx.fillStyle = (b.x % 2 === 0) ? '#00f2fe' : '#ff2d75';
      ctx.fillRect(b.x + 2, by, b.w - 4, 1);
    }

    // Windows illuminate gradually across the towers
    for (let r = by + 12; r < VIRTUAL_HEIGHT - 20; r += 9) {
      for (let c = b.x + 4; c < b.x + b.w - 6; c += 7) {
        const hash = (r * 31 + c * 17) % 100;
        // Window activation threshold mapped directly to loadPercent
        const windowThreshold = hash * 0.9;
        if (loadPercent >= windowThreshold && hash > 35) {
          const isFlickering = Math.sin(tick * 0.05 + hash) > -0.2;
          if (isFlickering) {
            ctx.fillStyle = hash > 75 ? '#00f2fe' : hash > 55 ? '#ff2d75' : '#ffb86c';
            ctx.fillRect(c, r, 2, 3);
          }
        }
      }
    }

    // ── Midground Neon Signs (Awaken with loading) ──
    if (b.neonSign === 'verticalPink') {
      const signX = b.x + 6;
      const signY = by + 18;
      const signH = 42;

      ctx.fillStyle = '#0a0515';
      ctx.fillRect(signX, signY, 8, signH);

      if (loadPercent >= 40) {
        ctx.strokeStyle = '#ff2d75';
        ctx.lineWidth = 1;
        ctx.strokeRect(signX, signY, 8, signH);

        const signGlow = Math.sin(tick * 0.1) > -0.3;
        ctx.fillStyle = signGlow ? '#ff2d75' : '#640014';
        ctx.fillRect(signX + 2, signY + 4, 4, 4);
        ctx.fillRect(signX + 2, signY + 12, 4, 4);
        ctx.fillRect(signX + 2, signY + 20, 4, 4);
        ctx.fillRect(signX + 2, signY + 28, 4, 4);
        ctx.fillRect(signX + 2, signY + 34, 4, 3);
      }
    } else if (b.neonSign === 'chevrons') {
      const signX = b.x + 8;
      const signY = by + 16;

      ctx.fillStyle = '#0a0515';
      ctx.fillRect(signX - 2, signY - 2, 28, 10);

      if (loadPercent >= 55) {
        const phase = Math.floor(tick / 8) % 3;
        for (let i = 0; i < 3; i++) {
          const active = i === phase;
          ctx.fillStyle = active ? '#00f2fe' : '#073642';
          const chX = signX + i * 8;
          ctx.fillRect(chX, signY, 1, 1);
          ctx.fillRect(chX + 1, signY + 1, 1, 1);
          ctx.fillRect(chX + 2, signY + 2, 1, 1);
          ctx.fillRect(chX + 1, signY + 3, 1, 1);
          ctx.fillRect(chX, signY + 4, 1, 1);
        }
      }
    } else if (b.neonSign === 'billboard') {
      const bbX = b.x + 4;
      const bbY = by + 22;
      const bbW = 34;
      const bbH = 18;

      ctx.fillStyle = '#070310';
      ctx.fillRect(bbX, bbY, bbW, bbH);

      if (loadPercent >= 65) {
        ctx.strokeStyle = '#00f2fe';
        ctx.lineWidth = 1;
        ctx.strokeRect(bbX, bbY, bbW, bbH);

        const scanY = bbY + 2 + (Math.floor(tick * 0.5) % (bbH - 4));
        ctx.fillStyle = 'rgba(0, 242, 254, 0.4)';
        ctx.fillRect(bbX + 1, scanY, bbW - 2, 1);

        // "SBH" Logo on billboard
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(bbX + 5, bbY + 6, 6, 2);
        ctx.fillRect(bbX + 14, bbY + 6, 6, 2);
        ctx.fillRect(bbX + 23, bbY + 6, 6, 2);

        // Bottom neon bar reflects loadPercent
        const barFillW = Math.max(1, Math.floor(((bbW - 4) * loadPercent) / 100));
        ctx.fillStyle = '#ff2d75';
        ctx.fillRect(bbX + 2, bbY + bbH - 3, barFillW, 1);
      }
    } else if (b.neonSign === 'verticalCyan') {
      const signX = b.x + b.w - 10;
      const signY = by + 28;
      const signH = 36;

      ctx.fillStyle = '#0a0515';
      ctx.fillRect(signX, signY, 6, signH);

      if (loadPercent >= 75) {
        ctx.fillStyle = (tick % 30 < 25) ? '#00f2fe' : '#033b45';
        for (let sy = signY + 3; sy < signY + signH - 3; sy += 6) {
          ctx.fillRect(signX + 1, sy, 4, 3);
        }
      }
    }

    if (b.skybridge) {
      const bridgeY = by + 35;
      ctx.fillStyle = '#110924';
      ctx.fillRect(b.x + b.w, bridgeY, 20, 8);

      if (loadPercent >= 50) {
        ctx.fillStyle = '#00f2fe';
        ctx.fillRect(b.x + b.w, bridgeY + 7, 20, 1);
        const blink = Math.sin(tick * 0.15) > 0;
        ctx.fillStyle = blink ? '#ffd200' : '#4e3f00';
        ctx.fillRect(b.x + b.w + 4, bridgeY + 2, 2, 2);
        ctx.fillRect(b.x + b.w + 14, bridgeY + 2, 2, 2);
      }
    }
  }
}

/**
 * 6. Layer 3: Foreground High-Tech Rooftop Architecture
 */
function drawForegroundRooftop(
  ctx: CanvasRenderingContext2D,
  tick: number,
  loadPercent: number
): void {
  const roofTopY = 172;
  const roofRightX = 185;

  ctx.fillStyle = '#0a0515';
  ctx.fillRect(0, roofTopY, roofRightX, VIRTUAL_HEIGHT - roofTopY);

  ctx.fillStyle = '#080310';
  ctx.fillRect(roofRightX, roofTopY + 12, 14, VIRTUAL_HEIGHT - (roofTopY + 12));
  ctx.fillRect(roofRightX + 14, roofTopY + 28, 12, VIRTUAL_HEIGHT - (roofTopY + 28));

  ctx.fillStyle = '#261546';
  ctx.fillRect(0, roofTopY, roofRightX, 3);
  ctx.fillStyle = '#3d226f';
  ctx.fillRect(0, roofTopY, roofRightX, 1);

  // Surface Neon Puddle Reflection (Grows brighter as city illuminates)
  const puddleX = 35;
  const puddleY = roofTopY + 4;
  const puddleW = 100;
  const puddleAlpha = Math.max(0.08, (loadPercent / 100) * 0.28);

  ctx.fillStyle = `rgba(255, 45, 117, ${puddleAlpha})`;
  ctx.fillRect(puddleX, puddleY, puddleW, 3);
  ctx.fillStyle = `rgba(0, 242, 254, ${puddleAlpha})`;
  ctx.fillRect(puddleX + 20, puddleY + 1, puddleW - 40, 2);

  // Industrial HVAC Unit
  const hvacX = 18;
  const hvacY = roofTopY - 22;
  const hvacW = 34;
  const hvacH = 22;

  ctx.fillStyle = '#1c1236';
  ctx.fillRect(hvacX, hvacY, hvacW, hvacH);
  ctx.fillStyle = '#2f1f58';
  ctx.fillRect(hvacX, hvacY, hvacW, 2);

  ctx.fillStyle = '#0b0617';
  ctx.fillRect(hvacX + 4, hvacY + 5, 12, 12);

  const fanFrame = Math.floor(tick / 3) % 4;
  ctx.fillStyle = '#00f2fe';
  if (fanFrame === 0 || fanFrame === 2) {
    ctx.fillRect(hvacX + 5, hvacY + 10, 10, 2);
  } else {
    ctx.fillRect(hvacX + 9, hvacY + 6, 2, 10);
  }

  ctx.fillStyle = '#0b0617';
  for (let ly = hvacY + 5; ly <= hvacY + 15; ly += 3) {
    ctx.fillRect(hvacX + 19, ly, 11, 1);
  }

  const ledBlink = Math.sin(tick * 0.12) > 0;
  ctx.fillStyle = ledBlink ? '#00f2fe' : '#033e46';
  ctx.fillRect(hvacX + hvacW - 4, hvacY + 3, 2, 2);

  // Safety Railing
  ctx.fillStyle = '#2f1f58';
  ctx.fillRect(roofRightX - 28, roofTopY - 14, 28, 2);
  ctx.fillRect(roofRightX - 26, roofTopY - 14, 2, 14);
  ctx.fillRect(roofRightX - 14, roofTopY - 14, 2, 14);
  ctx.fillRect(roofRightX - 2, roofTopY - 14, 2, 14);

  // Cables along roof
  ctx.fillStyle = '#ff2d75';
  ctx.fillRect(55, roofTopY + 1, 40, 1);
  ctx.fillStyle = '#00f2fe';
  ctx.fillRect(98, roofTopY + 2, 50, 1);
}

/**
 * 7. Protagonist Standing on Rooftop Watching the Skyline
 */
function drawCharacter(
  ctx: CanvasRenderingContext2D,
  tick: number,
  loadPercent: number
): void {
  const charX = 135;
  const feetY = 172;

  // Subtle breathing idle bob
  const bob = Math.floor(tick / 30) % 2 === 0 ? 0 : 1;
  const topY = feetY - 24 + bob;

  // Ground shadow
  const shadowAlpha = Math.max(0.15, (loadPercent / 100) * 0.35);
  ctx.fillStyle = `rgba(255, 45, 117, ${shadowAlpha})`;
  ctx.fillRect(charX - 2, feetY, 14, 2);

  // Cyber Trenchcoat Body
  ctx.fillStyle = '#140f24';
  ctx.fillRect(charX + 2, topY + 7, 7, 10);

  // Trenchcoat inner lining
  ctx.fillStyle = '#ff8d90';
  ctx.fillRect(charX + 7, topY + 8, 1, 9);

  // Wind flutter on coat-tail
  const coatFlutter = Math.floor(tick / 15) % 2;
  ctx.fillStyle = '#ff2d75';
  if (coatFlutter === 0) {
    ctx.fillRect(charX - 2, topY + 15, 4, 3);
    ctx.fillRect(charX - 4, topY + 17, 3, 2);
  } else {
    ctx.fillRect(charX - 3, topY + 14, 5, 3);
    ctx.fillRect(charX - 5, topY + 16, 3, 2);
  }

  // Hair & Face
  ctx.fillStyle = '#1e1135';
  ctx.fillRect(charX + 2, topY + 1, 6, 3);
  ctx.fillRect(charX + 1, topY + 2, 2, 4);

  ctx.fillStyle = COLOR_TOKENS.characterSkin;
  ctx.fillRect(charX + 3, topY + 3, 5, 4);

  // Cyber Visor: lights up as the city awakens
  if (loadPercent >= 35) {
    ctx.fillStyle = '#ff2d75';
    ctx.fillRect(charX + 5, topY + 4, 4, 2);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(charX + 7, topY + 4, 1, 1);
  } else {
    ctx.fillStyle = '#3a0c1e';
    ctx.fillRect(charX + 5, topY + 4, 4, 2);
  }

  // Boots
  ctx.fillStyle = '#0c0717';
  ctx.fillRect(charX + 3, topY + 17, 2, 4);
  ctx.fillRect(charX + 7, topY + 17, 2, 4);

  ctx.fillStyle = '#ff8d90';
  ctx.fillRect(charX + 3, topY + 21, 3, 3);
  ctx.fillRect(charX + 7, topY + 21, 3, 3);
  ctx.fillStyle = '#00f2fe';
  ctx.fillRect(charX + 4, topY + 23, 1, 1);
  ctx.fillRect(charX + 8, topY + 23, 1, 1);
}

/**
 * 8. Ambient Atmospheric Cyber Particles
 */
function drawAtmosphericMotes(ctx: CanvasRenderingContext2D, tick: number): void {
  for (let i = 0; i < 18; i++) {
    const px = (i * 37 + tick * 0.4) % VIRTUAL_WIDTH;
    const py = (i * 53 + tick * 0.6) % VIRTUAL_HEIGHT;
    ctx.fillStyle = i % 2 === 0 ? 'rgba(0, 242, 254, 0.35)' : 'rgba(255, 45, 117, 0.35)';
    ctx.fillRect(Math.floor(px), Math.floor(py), 1, 1);
  }
}
