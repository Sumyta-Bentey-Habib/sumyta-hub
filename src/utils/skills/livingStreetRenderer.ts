import { COLOR_TOKENS } from '@/utils/constants';
import { RainParticle, WindowLight } from '@/utils/hero';

export const LIVING_WORLD_WIDTH = 1200;
export const LIVING_WORLD_HEIGHT = 380;
export const LIVING_WALKWAY_SURFACE_Y = 320;
export const LIVING_CHAR_Y = LIVING_WALKWAY_SURFACE_Y - 24;

export interface Hovercar {
  x: number;
  y: number;
  speed: number;
  length: number;
  height: number;
  bodyColor: string;
  glowColor: string;
  headlightColor: string;
  direction: 'left' | 'right';
}

export interface StreetPuddle {
  x: number;
  w: number;
  h: number;
  reflectionColor: string;
}

export interface FloatingCodeSymbol {
  x: number;
  baseY: number;
  offsetY: number;
  speed: number;
  symbol: string;
  color: string;
  alpha: number;
}

export interface LivingStreetSceneState {
  tick: number;
  cars: Hovercar[];
  rain: RainParticle[];
  windows: WindowLight[];
  puddles: StreetPuddle[];
  symbols: FloatingCodeSymbol[];
}

export interface LivingCharacter {
  x: number;
  y: number;
  targetX: number;
  facing: 'left' | 'right';
  isMoving: boolean;
  animFrame: number;
  inspectingStation: string | null;
  inspectingTech: string | null;
}

/**
 * Initialize all persistent visual entities in the living street scene
 */
export function initLivingStreetScene(): LivingStreetSceneState {
  // 1. Initial Traffic: 5 hovercars running on background flyover
  const cars: Hovercar[] = [
    {
      x: 120,
      y: 206,
      speed: 3.2,
      length: 44,
      height: 12,
      bodyColor: COLOR_TOKENS.characterCoat,
      glowColor: COLOR_TOKENS.accentCyan,
      headlightColor: COLOR_TOKENS.white,
      direction: 'right',
    },
    {
      x: 540,
      y: 206,
      speed: 2.8,
      length: 36,
      height: 11,
      bodyColor: COLOR_TOKENS.surfaceHigh,
      glowColor: COLOR_TOKENS.primaryNeon,
      headlightColor: COLOR_TOKENS.windowAmber,
      direction: 'right',
    },
    {
      x: 980,
      y: 206,
      speed: 3.6,
      length: 48,
      height: 13,
      bodyColor: COLOR_TOKENS.catwalkBeam,
      glowColor: COLOR_TOKENS.accentCyan,
      headlightColor: COLOR_TOKENS.white,
      direction: 'right',
    },
    {
      x: 380,
      y: 222,
      speed: 3.0,
      length: 40,
      height: 11,
      bodyColor: COLOR_TOKENS.surfaceContainer,
      glowColor: COLOR_TOKENS.primaryNeon,
      headlightColor: COLOR_TOKENS.accentYellow,
      direction: 'left',
    },
    {
      x: 820,
      y: 222,
      speed: 2.5,
      length: 46,
      height: 12,
      bodyColor: COLOR_TOKENS.shadowDark,
      glowColor: COLOR_TOKENS.accentCyan,
      headlightColor: COLOR_TOKENS.white,
      direction: 'left',
    },
  ];

  // 2. Distant Windows
  const windowPalette = [
    COLOR_TOKENS.windowAmber,
    COLOR_TOKENS.accentCyan,
    COLOR_TOKENS.primaryNeon,
    COLOR_TOKENS.secondaryDim,
  ];
  const windows: WindowLight[] = [];
  for (let bx = 10; bx < LIVING_WORLD_WIDTH; bx += 28) {
    const towerH = 140 + Math.sin(bx * 0.08) * 50;
    const startY = 190 - towerH;
    for (let wy = Math.max(20, startY + 16); wy < 185; wy += 12) {
      for (let wx = bx + 3; wx < bx + 24; wx += 7) {
        if (Math.random() > 0.45) {
          windows.push({
            x: wx,
            y: wy,
            color: windowPalette[Math.floor(Math.random() * windowPalette.length)],
            flickerRate: 0.02 + Math.random() * 0.03,
            flickerOffset: Math.random() * 100,
          });
        }
      }
    }
  }

  // 3. Cyber Rain Particles
  const rain: RainParticle[] = [];
  for (let i = 0; i < 48; i += 1) {
    rain.push({
      x: Math.random() * LIVING_WORLD_WIDTH,
      y: Math.random() * LIVING_WORLD_HEIGHT,
      speed: 3.5 + Math.random() * 3.5,
      length: 6 + Math.random() * 7,
    });
  }

  // 4. Ground Rain Puddles positioned near tech stations
  const puddles: StreetPuddle[] = [
    { x: 170, w: 60, h: 6, reflectionColor: COLOR_TOKENS.primaryNeon },
    { x: 450, w: 75, h: 7, reflectionColor: COLOR_TOKENS.accentCyan },
    { x: 755, w: 65, h: 6, reflectionColor: COLOR_TOKENS.windowAmber },
    { x: 1030, w: 70, h: 7, reflectionColor: COLOR_TOKENS.finishGold },
  ];

  // 5. Floating code symbols near stations
  const symbols: FloatingCodeSymbol[] = [
    { x: 185, baseY: 280, offsetY: 0, speed: 0.6, symbol: '</>', color: COLOR_TOKENS.primaryNeon, alpha: 0.8 },
    { x: 215, baseY: 275, offsetY: 15, speed: 0.5, symbol: 'TS', color: COLOR_TOKENS.accentCyan, alpha: 0.7 },
    { x: 470, baseY: 280, offsetY: 5, speed: 0.7, symbol: '{ }', color: COLOR_TOKENS.accentCyan, alpha: 0.8 },
    { x: 505, baseY: 270, offsetY: 20, speed: 0.4, symbol: '=>', color: COLOR_TOKENS.primaryNeon, alpha: 0.6 },
    { x: 775, baseY: 280, offsetY: 8, speed: 0.5, symbol: 'db', color: COLOR_TOKENS.windowAmber, alpha: 0.8 },
    { x: 1045, baseY: 280, offsetY: 12, speed: 0.6, symbol: 'git', color: COLOR_TOKENS.finishGold, alpha: 0.8 },
    { x: 1080, baseY: 275, offsetY: 25, speed: 0.5, symbol: '▲', color: COLOR_TOKENS.white, alpha: 0.7 },
  ];

  return { tick: 0, cars, rain, windows, puddles, symbols };
}

/**
 * Step environmental simulation forward
 */
export function updateLivingStreetScene(state: LivingStreetSceneState): void {
  state.tick += 1;

  // Move Hovercars
  for (const car of state.cars) {
    if (car.direction === 'right') {
      car.x += car.speed;
      if (car.x > LIVING_WORLD_WIDTH + 80) {
        car.x = -60;
      }
    } else {
      car.x -= car.speed;
      if (car.x < -80) {
        car.x = LIVING_WORLD_WIDTH + 60;
      }
    }
  }

  // Update rain
  for (const drop of state.rain) {
    drop.y += drop.speed;
    drop.x -= 0.6; // subtle wind angle
    if (drop.y > LIVING_WORLD_HEIGHT) {
      drop.y = -10;
      drop.x = Math.random() * LIVING_WORLD_WIDTH;
    }
    if (drop.x < 0) {
      drop.x = LIVING_WORLD_WIDTH;
    }
  }

  // Update floating symbols
  for (const sym of state.symbols) {
    sym.offsetY += sym.speed;
    if (sym.offsetY > 40) {
      sym.offsetY = 0;
    }
  }
}

/**
 * Update character position smoothly toward targetX
 */
export function updateCharacterMovement(char: LivingCharacter): void {
  const dist = char.targetX - char.x;
  const speed = 2.4;

  if (Math.abs(dist) > 2) {
    char.isMoving = true;
    char.facing = dist > 0 ? 'right' : 'left';
    char.x += Math.sign(dist) * Math.min(speed, Math.abs(dist));

    // Stride animation frame cycling every 6 ticks
    if (Math.random() < 0.2) {
      char.animFrame = (char.animFrame + 1) % 4;
    }
  } else {
    char.isMoving = false;
    char.animFrame = 0;
  }
}

/**
 * Main Render function for the entire Living Pixel Scene
 */
export function renderLivingStreet(
  ctx: CanvasRenderingContext2D,
  scene: LivingStreetSceneState,
  char: LivingCharacter,
  activeGroupId: string | null,
  activeTechName: string | null,
  inspectingPrefix: string,
  playerPointerLabel: string
): void {
  const { tick, cars, rain, windows, puddles, symbols } = scene;

  ctx.imageSmoothingEnabled = false;

  // ── LAYER 1: Cyber Sky & Atmospheric Background ──
  const skyGrad = ctx.createLinearGradient(0, 0, 0, LIVING_WORLD_HEIGHT);
  skyGrad.addColorStop(0, COLOR_TOKENS.surfaceLowest);
  skyGrad.addColorStop(0.55, COLOR_TOKENS.shadowDark);
  skyGrad.addColorStop(1, COLOR_TOKENS.shadowPurple);
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, LIVING_WORLD_WIDTH, LIVING_WORLD_HEIGHT);

  // Distant Skyline Silhouettes (Far layer)
  ctx.fillStyle = COLOR_TOKENS.skylineFar;
  for (let bx = 0; bx < LIVING_WORLD_WIDTH; bx += 40) {
    const h = 170 + Math.sin(bx * 0.04) * 60;
    ctx.fillRect(bx, 190 - h, 36, h);
    // Rooftop antenna tower
    if (bx % 80 === 0) {
      ctx.fillRect(bx + 16, 190 - h - 18, 2, 18);
      // Blinking warning beacon on antenna tip
      const blink = Math.floor(tick / 24) % 2 === 0;
      ctx.fillStyle = blink ? COLOR_TOKENS.primaryNeon : COLOR_TOKENS.skylineFar;
      ctx.fillRect(bx + 15, 190 - h - 20, 4, 3);
      ctx.fillStyle = COLOR_TOKENS.skylineFar;
    }
  }

  // Mid-ground Skyline
  ctx.fillStyle = COLOR_TOKENS.skylineMid;
  for (let bx = 16; bx < LIVING_WORLD_WIDTH; bx += 32) {
    const h = 130 + Math.sin(bx * 0.06 + 1) * 45;
    ctx.fillRect(bx, 195 - h, 28, h);
  }

  // Illuminated Pixel Windows
  for (const win of windows) {
    const flicker = Math.sin(tick * win.flickerRate + win.flickerOffset) > 0.05;
    if (flicker) {
      ctx.fillStyle = win.color;
      ctx.fillRect(win.x, win.y, 4, 5);
    }
  }

  // Near City Edge Layer
  ctx.fillStyle = COLOR_TOKENS.skylineNear;
  for (let bx = 0; bx < LIVING_WORLD_WIDTH; bx += 56) {
    const h = 90 + Math.cos(bx * 0.05) * 35;
    ctx.fillRect(bx, 200 - h, 48, h);
  }

  // ── LAYER 2: Suspended Neon Transit Highway & Passing Hovercars ──
  // Highway Structural Deck
  ctx.fillStyle = COLOR_TOKENS.catwalkBeam;
  ctx.fillRect(0, 202, LIVING_WORLD_WIDTH, 26);
  // Upper & Lower Luminous Traffic Rails
  ctx.fillStyle = COLOR_TOKENS.catwalkRail;
  ctx.fillRect(0, 200, LIVING_WORLD_WIDTH, 2);
  ctx.fillRect(0, 228, LIVING_WORLD_WIDTH, 2);

  // Continuous Highway Stanchion Pillars
  ctx.fillStyle = COLOR_TOKENS.surfaceHigh;
  for (let px = 80; px < LIVING_WORLD_WIDTH; px += 180) {
    ctx.fillRect(px, 228, 14, 32);
    // Support pillar hazard stripes
    ctx.fillStyle = COLOR_TOKENS.accentYellow;
    ctx.fillRect(px + 2, 236, 10, 2);
    ctx.fillRect(px + 2, 244, 10, 2);
    ctx.fillStyle = COLOR_TOKENS.surfaceHigh;
  }

  // Animated Hovercars with Glowing Trails & Headlights
  for (const car of cars) {
    const cx = Math.round(car.x);
    const cy = Math.round(car.y);

    // Repulsor undercarriage glow
    ctx.fillStyle = car.glowColor;
    ctx.fillRect(cx + 4, cy + car.height - 1, car.length - 8, 3);

    // Aerodynamic Chassis Body
    ctx.fillStyle = car.bodyColor;
    ctx.fillRect(cx, cy + 3, car.length, car.height - 3);
    // Cabin roof taper
    ctx.fillRect(cx + 8, cy, car.length - 16, 4);

    // Windshield visor
    ctx.fillStyle = COLOR_TOKENS.accentCyan;
    if (car.direction === 'right') {
      ctx.fillRect(cx + car.length - 12, cy + 2, 8, 3);
      // Headlights casting forward beam
      ctx.fillStyle = car.headlightColor;
      ctx.fillRect(cx + car.length, cy + 5, 3, 4);
      // Tail thruster glow
      ctx.fillStyle = car.glowColor;
      ctx.fillRect(cx - 6, cy + 5, 6, 3);
    } else {
      ctx.fillRect(cx + 4, cy + 2, 8, 3);
      // Headlights casting forward beam
      ctx.fillStyle = car.headlightColor;
      ctx.fillRect(cx - 3, cy + 5, 3, 4);
      // Tail thruster glow
      ctx.fillStyle = car.glowColor;
      ctx.fillRect(cx + car.length, cy + 5, 6, 3);
    }
  }

  // ── LAYER 3: Street Promenade Pavement & Boulevard ──
  // Promenade Foundation
  ctx.fillStyle = COLOR_TOKENS.rooftopBody;
  ctx.fillRect(0, 255, LIVING_WORLD_WIDTH, LIVING_WORLD_HEIGHT - 255);

  // Surface Top Edge
  ctx.fillStyle = COLOR_TOKENS.rooftopTop;
  ctx.fillRect(0, 255, LIVING_WORLD_WIDTH, 4);

  // Pavement Grid Perspective Tiles
  ctx.fillStyle = COLOR_TOKENS.shadowPurple;
  for (let x = 0; x < LIVING_WORLD_WIDTH; x += 36) {
    ctx.fillRect(x, 260, 1, LIVING_WORLD_HEIGHT - 260);
  }
  for (let y = 275; y < LIVING_WORLD_HEIGHT; y += 22) {
    ctx.fillRect(0, y, LIVING_WORLD_WIDTH, 1);
  }

  // Curbside Edge Hazard Stripe at Top of Promenade
  ctx.fillStyle = COLOR_TOKENS.accentYellow;
  for (let hx = 0; hx < LIVING_WORLD_WIDTH; hx += 30) {
    ctx.fillRect(hx, 258, 14, 2);
  }

  // Neon Rain Puddles with Dynamic Colored Glow
  for (const pud of puddles) {
    ctx.fillStyle = COLOR_TOKENS.neonReflection;
    ctx.fillRect(pud.x, 314, pud.w, pud.h);
    // Subtle inner reflection line
    ctx.fillStyle = pud.reflectionColor;
    const wave = Math.sin(tick * 0.05 + pud.x) * 2;
    ctx.fillRect(pud.x + 8 + wave, 316, pud.w - 16, 2);
  }

  // ── LAYER 4: The 4 Distinct Interactive Tech Stations ──
  drawFrontendHub(ctx, tick, activeGroupId === 'frontend', activeTechName);
  drawBackendSubstation(ctx, tick, activeGroupId === 'backend', activeTechName);
  drawDatabaseSilo(ctx, tick, activeGroupId === 'database', activeTechName);
  drawToolsDock(ctx, tick, activeGroupId === 'tools', activeTechName);

  // Floating Code Symbols
  for (const sym of symbols) {
    const sy = sym.baseY - sym.offsetY;
    const waveX = sym.x + Math.sin(tick * 0.08 + sym.baseY) * 4;
    ctx.fillStyle = sym.color;
    ctx.font = 'bold 8px monospace';
    ctx.fillText(sym.symbol, waveX, sy);
  }

  // ── LAYER 5: The Protagonist (Sumyta) ──
  drawLivingCharacter(
    ctx,
    char,
    tick,
    playerPointerLabel,
    inspectingPrefix,
    activeTechName
  );

  // ── LAYER 6: Cyber Rain & Ambient Air Dust ──
  ctx.fillStyle = COLOR_TOKENS.rainParticle;
  for (const drop of rain) {
    ctx.fillRect(drop.x, drop.y, 1, drop.length);
  }

  // Subtle perimeter vignette / frame line
  ctx.strokeStyle = COLOR_TOKENS.catwalkBeam;
  ctx.lineWidth = 1;
  ctx.strokeRect(0, 0, LIVING_WORLD_WIDTH, LIVING_WORLD_HEIGHT);
}

// ─────────────────────────────────────────────────────────────────────────────
// TECH STATION 1: Frontend Hub (x: 192) — React Atom Hologram & Next.js Marquee
// ─────────────────────────────────────────────────────────────────────────────
function drawFrontendHub(
  ctx: CanvasRenderingContext2D,
  tick: number,
  isActive: boolean,
  activeTech: string | null
): void {
  const cx = 192;
  const baseY = 255;

  // Station Platform Base
  ctx.fillStyle = COLOR_TOKENS.surfaceContainer;
  ctx.fillRect(cx - 40, baseY, 80, 50);
  ctx.fillStyle = isActive ? COLOR_TOKENS.primaryNeon : COLOR_TOKENS.catwalkRail;
  ctx.fillRect(cx - 42, baseY, 84, 4);

  // Holographic Projection Pedestal
  ctx.fillStyle = COLOR_TOKENS.surfaceHigh;
  ctx.fillRect(cx - 20, baseY - 24, 40, 24);
  ctx.fillStyle = COLOR_TOKENS.primaryNeon;
  ctx.fillRect(cx - 16, baseY - 20, 32, 2);

  // Ground Emitter Glow Flare
  const flareWidth = isActive ? 70 : 40;
  ctx.fillStyle = COLOR_TOKENS.neonReflection;
  ctx.fillRect(cx - flareWidth / 2, baseY - 2, flareWidth, 4);

  // Hologram Center Coordinates
  const holoY = baseY - 62 + Math.sin(tick * 0.08) * 3;

  // React Hologram: Core & Orbiting Rings
  ctx.save();
  ctx.translate(cx, holoY);

  // Pulsing central atom nucleus
  const corePulse = 3 + Math.sin(tick * 0.15) * 1.5;
  ctx.fillStyle = isActive ? COLOR_TOKENS.white : COLOR_TOKENS.primaryNeon;
  ctx.beginPath();
  ctx.arc(0, 0, corePulse, 0, Math.PI * 2);
  ctx.fill();

  // 3 Rotated elliptical orbital rings
  const ringColor = isActive ? COLOR_TOKENS.primary : COLOR_TOKENS.primaryNeon;
  ctx.strokeStyle = ringColor;
  ctx.lineWidth = 1.2;

  for (let i = 0; i < 3; i += 1) {
    ctx.save();
    const rot = (i * Math.PI) / 3 + tick * 0.03;
    ctx.rotate(rot);
    ctx.beginPath();
    ctx.ellipse(0, 0, 22, 8, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Orbiting electron particle
    const eAngle = tick * 0.06 + i * 2;
    const ex = Math.cos(eAngle) * 22;
    const ey = Math.sin(eAngle) * 8;
    ctx.fillStyle = COLOR_TOKENS.accentCyan;
    ctx.fillRect(ex - 1.5, ey - 1.5, 3, 3);
    ctx.restore();
  }
  ctx.restore();

  // Floating Station Header / Banner
  ctx.fillStyle = COLOR_TOKENS.surfaceContainer;
  ctx.fillRect(cx - 48, baseY - 96, 96, 16);
  ctx.strokeStyle = isActive ? COLOR_TOKENS.primaryNeon : COLOR_TOKENS.outlineVariant;
  ctx.lineWidth = 1;
  ctx.strokeRect(cx - 48, baseY - 96, 96, 16);

  ctx.fillStyle = isActive ? COLOR_TOKENS.primary : COLOR_TOKENS.secondary;
  ctx.font = 'bold 9px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('01 // FRONTEND', cx, baseY - 88);

  // If this station is active and inspecting a specific tech, show floating tech tag
  if (isActive && activeTech) {
    ctx.fillStyle = COLOR_TOKENS.primaryNeon;
    ctx.fillRect(cx - 36, baseY - 110, 72, 12);
    ctx.fillStyle = COLOR_TOKENS.black;
    ctx.font = 'bold 8px monospace';
    ctx.fillText(activeTech.toUpperCase(), cx, baseY - 104);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// TECH STATION 2: Backend Substation (x: 480) — Node.js Hex & Express Signals
// ─────────────────────────────────────────────────────────────────────────────
function drawBackendSubstation(
  ctx: CanvasRenderingContext2D,
  tick: number,
  isActive: boolean,
  activeTech: string | null
): void {
  const cx = 480;
  const baseY = 255;

  // Station Platform Base
  ctx.fillStyle = COLOR_TOKENS.surfaceContainer;
  ctx.fillRect(cx - 44, baseY, 88, 50);
  ctx.fillStyle = isActive ? COLOR_TOKENS.accentCyan : COLOR_TOKENS.catwalkRail;
  ctx.fillRect(cx - 46, baseY, 92, 4);

  // Power Conduit Pipes on Platform
  ctx.fillStyle = COLOR_TOKENS.catwalkBeam;
  ctx.fillRect(cx - 36, baseY + 6, 8, 38);
  ctx.fillRect(cx + 28, baseY + 6, 8, 38);

  // Central Substation Housing
  ctx.fillStyle = COLOR_TOKENS.surfaceHigh;
  ctx.fillRect(cx - 24, baseY - 28, 48, 28);
  ctx.fillStyle = COLOR_TOKENS.accentCyan;
  ctx.fillRect(cx - 20, baseY - 24, 40, 2);

  // Hexagonal Reactor Core Coordinates
  const reactorY = baseY - 64 + Math.cos(tick * 0.08) * 2;

  // Hexagon Outline & Pulsing Plasma
  ctx.save();
  ctx.translate(cx, reactorY);

  const hexRadius = 18;
  ctx.beginPath();
  for (let i = 0; i < 6; i += 1) {
    const angle = (i * Math.PI) / 3 + tick * 0.02;
    const hx = Math.cos(angle) * hexRadius;
    const hy = Math.sin(angle) * hexRadius;
    if (i === 0) ctx.moveTo(hx, hy);
    else ctx.lineTo(hx, hy);
  }
  ctx.closePath();
  ctx.strokeStyle = isActive ? COLOR_TOKENS.accentCyan : COLOR_TOKENS.accentYellow;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Internal glowing core
  const plasmaSize = 6 + Math.sin(tick * 0.2) * 3;
  ctx.fillStyle = isActive ? COLOR_TOKENS.white : COLOR_TOKENS.accentCyan;
  ctx.beginPath();
  ctx.arc(0, 0, plasmaSize, 0, Math.PI * 2);
  ctx.fill();

  // Traveling data packet pulses along conduits
  const packetPhase = (tick * 0.1) % 1;
  const packetY = 16 + packetPhase * 24;
  ctx.fillStyle = COLOR_TOKENS.accentCyan;
  ctx.fillRect(-2, packetY, 4, 3);

  ctx.restore();

  // Station Header Tag
  ctx.fillStyle = COLOR_TOKENS.surfaceContainer;
  ctx.fillRect(cx - 48, baseY - 96, 96, 16);
  ctx.strokeStyle = isActive ? COLOR_TOKENS.accentCyan : COLOR_TOKENS.outlineVariant;
  ctx.lineWidth = 1;
  ctx.strokeRect(cx - 48, baseY - 96, 96, 16);

  ctx.fillStyle = isActive ? COLOR_TOKENS.accentCyan : COLOR_TOKENS.secondary;
  ctx.font = 'bold 9px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('02 // BACKEND', cx, baseY - 88);

  // If this station is active and inspecting a specific tech, show floating tech tag
  if (isActive && activeTech) {
    ctx.fillStyle = COLOR_TOKENS.accentCyan;
    ctx.fillRect(cx - 36, baseY - 110, 72, 12);
    ctx.fillStyle = COLOR_TOKENS.black;
    ctx.font = 'bold 8px monospace';
    ctx.fillText(activeTech.toUpperCase(), cx, baseY - 104);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// TECH STATION 3: Database Silo (x: 780) — MongoDB Liquid Document Chamber
// ─────────────────────────────────────────────────────────────────────────────
function drawDatabaseSilo(
  ctx: CanvasRenderingContext2D,
  tick: number,
  isActive: boolean,
  activeTech: string | null
): void {
  const cx = 780;
  const baseY = 255;

  // Station Platform Base
  ctx.fillStyle = COLOR_TOKENS.surfaceContainer;
  ctx.fillRect(cx - 40, baseY, 80, 50);
  ctx.fillStyle = isActive ? COLOR_TOKENS.windowAmber : COLOR_TOKENS.catwalkRail;
  ctx.fillRect(cx - 42, baseY, 84, 4);

  // Glass Viewing Cylinder Housing
  const siloW = 34;
  const siloH = 50;
  const siloX = cx - siloW / 2;
  const siloY = baseY - siloH;

  // Metal Base & Top Caps
  ctx.fillStyle = COLOR_TOKENS.surfaceHigh;
  ctx.fillRect(siloX - 4, siloY + siloH - 8, siloW + 8, 8);
  ctx.fillRect(siloX - 4, siloY, siloW + 8, 8);
  ctx.fillStyle = COLOR_TOKENS.windowAmber;
  ctx.fillRect(siloX, siloY + 2, siloW, 2);

  // Glass Column Chamber Body
  ctx.fillStyle = COLOR_TOKENS.shadowDark;
  ctx.fillRect(siloX, siloY + 8, siloW, siloH - 16);
  ctx.strokeStyle = isActive ? COLOR_TOKENS.windowAmber : COLOR_TOKENS.outlineVariant;
  ctx.lineWidth = 1;
  ctx.strokeRect(siloX, siloY + 8, siloW, siloH - 16);

  // Internal Bubbling Coolant & Document Nodes
  const bubbleCount = 4;
  for (let b = 0; b < bubbleCount; b += 1) {
    const bubblePhase = (tick * 0.05 + b * 0.25) % 1;
    const by = siloY + siloH - 14 - bubblePhase * (siloH - 24);
    const bx = siloX + 6 + (b * 6 + (tick % 5));
    ctx.fillStyle = isActive ? COLOR_TOKENS.windowAmber : COLOR_TOKENS.accentYellow;
    ctx.fillRect(bx, by, 3, 3);
  }

  // MongoDB Leaf Emblem on Cap
  ctx.fillStyle = COLOR_TOKENS.windowAmber;
  ctx.beginPath();
  ctx.ellipse(cx, siloY + 4, 6, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Pressure Gauge Meter on Right
  ctx.fillStyle = COLOR_TOKENS.surfaceHigh;
  ctx.fillRect(siloX + siloW + 4, siloY + 16, 8, 20);
  const gaugeH = 4 + (Math.sin(tick * 0.1) * 3 + 3);
  ctx.fillStyle = COLOR_TOKENS.primaryNeon;
  ctx.fillRect(siloX + siloW + 6, siloY + 34 - gaugeH, 4, gaugeH);

  // Station Header Tag
  ctx.fillStyle = COLOR_TOKENS.surfaceContainer;
  ctx.fillRect(cx - 48, baseY - 78, 96, 16);
  ctx.strokeStyle = isActive ? COLOR_TOKENS.windowAmber : COLOR_TOKENS.outlineVariant;
  ctx.lineWidth = 1;
  ctx.strokeRect(cx - 48, baseY - 78, 96, 16);

  ctx.fillStyle = isActive ? COLOR_TOKENS.windowAmber : COLOR_TOKENS.secondary;
  ctx.font = 'bold 9px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('03 // DATABASE', cx, baseY - 70);

  // If this station is active and inspecting a specific tech, show floating tech tag
  if (isActive && activeTech) {
    ctx.fillStyle = COLOR_TOKENS.windowAmber;
    ctx.fillRect(cx - 36, baseY - 92, 72, 12);
    ctx.fillStyle = COLOR_TOKENS.black;
    ctx.font = 'bold 8px monospace';
    ctx.fillText(activeTech.toUpperCase(), cx, baseY - 86);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// TECH STATION 4: Tools & Platforms Dock (x: 1056) — Git Tree & Vercel Beacon
// ─────────────────────────────────────────────────────────────────────────────
function drawToolsDock(
  ctx: CanvasRenderingContext2D,
  tick: number,
  isActive: boolean,
  activeTech: string | null
): void {
  const cx = 1056;
  const baseY = 255;

  // Station Platform Base
  ctx.fillStyle = COLOR_TOKENS.surfaceContainer;
  ctx.fillRect(cx - 40, baseY, 80, 50);
  ctx.fillStyle = isActive ? COLOR_TOKENS.finishGold : COLOR_TOKENS.catwalkRail;
  ctx.fillRect(cx - 42, baseY, 84, 4);

  // Terminal Base Console
  ctx.fillStyle = COLOR_TOKENS.surfaceHigh;
  ctx.fillRect(cx - 24, baseY - 24, 48, 24);
  ctx.fillStyle = COLOR_TOKENS.finishGold;
  ctx.fillRect(cx - 18, baseY - 20, 36, 2);

  // Elevated Holographic Git Branch Tree
  const treeY = baseY - 58;
  ctx.strokeStyle = isActive ? COLOR_TOKENS.finishGold : COLOR_TOKENS.accentCyan;
  ctx.lineWidth = 1.5;

  // Main branch trunk
  ctx.beginPath();
  ctx.moveTo(cx - 10, treeY + 22);
  ctx.lineTo(cx - 10, treeY);
  ctx.lineTo(cx + 12, treeY - 8);
  ctx.lineTo(cx + 12, treeY - 20);
  ctx.stroke();

  // Secondary branch
  ctx.beginPath();
  ctx.moveTo(cx - 10, treeY + 12);
  ctx.lineTo(cx - 10, treeY - 14);
  ctx.stroke();

  // Git Commit Nodes (Circled Dots)
  const commitNodes = [
    { x: cx - 10, y: treeY + 18 },
    { x: cx - 10, y: treeY + 4 },
    { x: cx - 10, y: treeY - 10 },
    { x: cx + 12, y: treeY - 6 },
    { x: cx + 12, y: treeY - 18 },
  ];
  for (const node of commitNodes) {
    ctx.fillStyle = COLOR_TOKENS.white;
    ctx.fillRect(node.x - 2, node.y - 2, 4, 4);
  }

  // Vercel Apex Delta Pyramid atop the dock
  const apexY = treeY - 32 + Math.sin(tick * 0.08) * 2;
  ctx.fillStyle = isActive ? COLOR_TOKENS.white : COLOR_TOKENS.finishGold;
  ctx.beginPath();
  ctx.moveTo(cx, apexY);
  ctx.lineTo(cx - 8, apexY + 12);
  ctx.lineTo(cx + 8, apexY + 12);
  ctx.closePath();
  ctx.fill();

  // Radio Waves Pulse from Beacon
  if (isActive) {
    const waveRadius = 14 + (tick % 16);
    ctx.strokeStyle = COLOR_TOKENS.finishGold;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, apexY + 6, waveRadius, Math.PI, Math.PI * 2);
    ctx.stroke();
  }

  // Station Header Tag
  ctx.fillStyle = COLOR_TOKENS.surfaceContainer;
  ctx.fillRect(cx - 48, baseY - 96, 96, 16);
  ctx.strokeStyle = isActive ? COLOR_TOKENS.finishGold : COLOR_TOKENS.outlineVariant;
  ctx.lineWidth = 1;
  ctx.strokeRect(cx - 48, baseY - 96, 96, 16);

  ctx.fillStyle = isActive ? COLOR_TOKENS.finishGold : COLOR_TOKENS.secondary;
  ctx.font = 'bold 8px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('04 // TOOLS & PLATFORMS', cx, baseY - 88);

  // If this station is active and inspecting a specific tech, show floating tech tag
  if (isActive && activeTech) {
    ctx.fillStyle = COLOR_TOKENS.finishGold;
    ctx.fillRect(cx - 36, baseY - 110, 72, 12);
    ctx.fillStyle = COLOR_TOKENS.black;
    ctx.font = 'bold 8px monospace';
    ctx.fillText(activeTech.toUpperCase(), cx, baseY - 104);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// CHARACTER SPRITE: Exact Pixel-Art Protagonist (Sumyta) with Head Pointer
// ─────────────────────────────────────────────────────────────────────────────
function drawLivingCharacter(
  ctx: CanvasRenderingContext2D,
  char: LivingCharacter,
  tick: number,
  pointerLabel: string,
  inspectingPrefix: string,
  activeTechName: string | null
): void {
  const cx = Math.round(char.x);
  const cy = Math.round(char.y);
  const charCenterX = cx + 8;
  const charFeetY = cy + 24;

  // Ground Neon Shadow beneath boots
  ctx.fillStyle = COLOR_TOKENS.neonReflection;
  ctx.beginPath();
  ctx.ellipse(charCenterX, charFeetY, 10, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Character Sprite Flip & Position
  ctx.save();
  if (char.facing === 'left') {
    ctx.translate(cx + 16, cy);
    ctx.scale(-1, 1);
  } else {
    ctx.translate(cx, cy);
  }

  // Idle breathing offset
  const idleBob = !char.isMoving ? (Math.floor(tick / 20) % 2 === 0 ? 1 : 0) : 0;

  // Cyber Trenchcoat Body
  ctx.fillStyle = COLOR_TOKENS.characterCoat;
  ctx.fillRect(4, 6 + idleBob, 8, 12);

  // Flowing coat-tail / rim
  ctx.fillStyle = COLOR_TOKENS.primaryNeon;
  ctx.fillRect(3, 16 + idleBob, 2, 4);

  // Head & Neon Visor
  ctx.fillStyle = COLOR_TOKENS.characterSkin;
  ctx.fillRect(5, 2 + idleBob, 6, 5);
  ctx.fillStyle = COLOR_TOKENS.characterVisor;
  ctx.fillRect(7, 3 + idleBob, 5, 2);

  // Legs / Boots Walking Stride
  ctx.fillStyle = COLOR_TOKENS.characterBoots;
  if (char.isMoving) {
    if (char.animFrame === 0) {
      ctx.fillRect(3, 18, 4, 6);
      ctx.fillRect(9, 18, 4, 6);
    } else if (char.animFrame === 1) {
      ctx.fillRect(1, 18, 4, 5);
      ctx.fillRect(10, 17, 4, 6);
    } else if (char.animFrame === 2) {
      ctx.fillRect(4, 18, 4, 6);
      ctx.fillRect(8, 18, 4, 6);
    } else {
      ctx.fillRect(8, 17, 4, 6);
      ctx.fillRect(2, 18, 4, 5);
    }
  } else {
    // Idle Standing Stance
    ctx.fillRect(4, 18 + idleBob, 3, 6);
    ctx.fillRect(9, 18 + idleBob, 3, 6);
  }

  ctx.restore();

  // Floating Pointer or Inspection Tag above character
  const pointerBob = Math.sin(tick * 0.12) * 2.5;
  const pointerY = cy - 14 + pointerBob;

  if (activeTechName) {
    // Holographic inspection balloon
    const labelText = `${inspectingPrefix}${activeTechName.toUpperCase()}`;
    const boxW = Math.max(90, labelText.length * 6.5);
    const boxH = 14;

    ctx.fillStyle = COLOR_TOKENS.surfaceContainer;
    ctx.fillRect(charCenterX - boxW / 2, pointerY - boxH, boxW, boxH);
    ctx.strokeStyle = COLOR_TOKENS.primaryNeon;
    ctx.lineWidth = 1;
    ctx.strokeRect(charCenterX - boxW / 2, pointerY - boxH, boxW, boxH);

    // Pointer tick below box
    ctx.fillStyle = COLOR_TOKENS.primaryNeon;
    ctx.beginPath();
    ctx.moveTo(charCenterX - 4, pointerY);
    ctx.lineTo(charCenterX + 4, pointerY);
    ctx.lineTo(charCenterX, pointerY + 4);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = COLOR_TOKENS.white;
    ctx.font = 'bold 8px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(labelText, charCenterX, pointerY - boxH / 2);
  } else {
    // Standard [YOU] pointer
    ctx.fillStyle = COLOR_TOKENS.primaryNeon;
    ctx.beginPath();
    ctx.moveTo(charCenterX - 4, pointerY + 2);
    ctx.lineTo(charCenterX + 4, pointerY + 2);
    ctx.lineTo(charCenterX, pointerY + 7);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = COLOR_TOKENS.surfaceContainer;
    ctx.fillRect(charCenterX - 14, pointerY - 11, 28, 12);
    ctx.strokeStyle = COLOR_TOKENS.primaryNeon;
    ctx.lineWidth = 1;
    ctx.strokeRect(charCenterX - 14, pointerY - 11, 28, 12);

    ctx.fillStyle = COLOR_TOKENS.white;
    ctx.font = 'bold 8px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(pointerLabel, charCenterX, pointerY - 5);
  }
}
