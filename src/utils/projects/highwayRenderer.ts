import { COLOR_TOKENS } from '@/utils/constants';

export const HIGHWAY_CANVAS_WIDTH = 1200;
export const HIGHWAY_CANVAS_HEIGHT = 380;
export const HIGHWAY_ROAD_Y = 270;

export const HIGHWAY_DESTINATIONS_X = [190, 480, 770, 1060] as const;

export interface HighwayParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

export interface HighwayTrafficCar {
  x: number;
  y: number;
  speed: number;
  color: string;
  headlightColor: string;
  taillightColor: string;
  length: number;
}

export interface HighwayCruiser {
  x: number;
  y: number;
  targetX: number;
  speed: number;
  isCruising: boolean;
  activeDestinationIndex: number;
}

export interface HighwaySceneState {
  tick: number;
  traffic: HighwayTrafficCar[];
  exhaust: HighwayParticle[];
  steamParticles: HighwayParticle[];
  stars: Array<{ x: number; y: number; size: number; flickerRate: number }>;
}

export function initHighwayScene(): HighwaySceneState {
  // Initialize ambient traffic on upper lane
  const traffic: HighwayTrafficCar[] = [
    {
      x: 100,
      y: HIGHWAY_ROAD_Y - 26,
      speed: -2.4,
      color: COLOR_TOKENS.surfaceHigh,
      headlightColor: COLOR_TOKENS.accentCyan,
      taillightColor: COLOR_TOKENS.primaryNeon,
      length: 24,
    },
    {
      x: 520,
      y: HIGHWAY_ROAD_Y - 26,
      speed: -3.0,
      color: COLOR_TOKENS.shadowPurple,
      headlightColor: COLOR_TOKENS.white,
      taillightColor: COLOR_TOKENS.primaryNeon,
      length: 28,
    },
    {
      x: 950,
      y: HIGHWAY_ROAD_Y - 26,
      speed: -2.1,
      color: COLOR_TOKENS.surfaceHigh,
      headlightColor: COLOR_TOKENS.accentCyan,
      taillightColor: COLOR_TOKENS.primaryNeon,
      length: 22,
    },
  ];

  // Distant stars
  const stars: Array<{ x: number; y: number; size: number; flickerRate: number }> = [];
  for (let i = 0; i < 45; i += 1) {
    stars.push({
      x: (i * 97 + 23) % HIGHWAY_CANVAS_WIDTH,
      y: (i * 43 + 11) % 110,
      size: i % 3 === 0 ? 2 : 1,
      flickerRate: 0.04 + (i % 5) * 0.02,
    });
  }

  return {
    tick: 0,
    traffic,
    exhaust: [],
    steamParticles: [],
    stars,
  };
}

export function updateHighwayScene(
  scene: HighwaySceneState,
  cruiser: HighwayCruiser
): void {
  scene.tick += 1;

  // Update passing traffic
  for (const car of scene.traffic) {
    car.x += car.speed;
    if (car.x < -60) {
      car.x = HIGHWAY_CANVAS_WIDTH + 60;
    }
  }

  // Smooth lerp cruiser towards active destination targetX
  const dx = cruiser.targetX - cruiser.x;
  if (Math.abs(dx) > 1.2) {
    cruiser.isCruising = true;
    cruiser.x += dx * 0.08;

    // Spawn exhaust glow particles while cruising
    if (scene.tick % 2 === 0) {
      scene.exhaust.push({
        x: cruiser.x - 14,
        y: cruiser.y + 11 + (Math.random() * 4 - 2),
        vx: -1.5 - Math.random() * 1.5,
        vy: (Math.random() - 0.5) * 0.8,
        life: 0,
        maxLife: 16,
        color: COLOR_TOKENS.primaryNeon,
      });
    }
  } else {
    cruiser.x = cruiser.targetX;
    cruiser.isCruising = false;
  }

  // Update exhaust particles
  for (let i = scene.exhaust.length - 1; i >= 0; i -= 1) {
    const p = scene.exhaust[i];
    p.life += 1;
    p.x += p.vx;
    p.y += p.vy;
    if (p.life >= p.maxLife) {
      scene.exhaust.splice(i, 1);
    }
  }

  // Spawn and update steam particles from Espresso Roastery vents (x: 480)
  if (scene.tick % 4 === 0) {
    scene.steamParticles.push({
      x: 480 + 16 + (Math.random() * 4 - 2),
      y: HIGHWAY_ROAD_Y - 95,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -0.8 - Math.random() * 0.6,
      life: 0,
      maxLife: 32,
      color: COLOR_TOKENS.amberGlow,
    });
  }

  for (let i = scene.steamParticles.length - 1; i >= 0; i -= 1) {
    const s = scene.steamParticles[i];
    s.life += 1;
    s.x += s.vx;
    s.y += s.vy;
    if (s.life >= s.maxLife) {
      scene.steamParticles.splice(i, 1);
    }
  }
}

export function renderHighwayScene(
  ctx: CanvasRenderingContext2D,
  scene: HighwaySceneState,
  cruiser: HighwayCruiser,
  activeProjectIndex: number
): void {
  const { tick } = scene;

  // 1. Clear background
  ctx.fillStyle = COLOR_TOKENS.surfaceLowest;
  ctx.fillRect(0, 0, HIGHWAY_CANVAS_WIDTH, HIGHWAY_CANVAS_HEIGHT);

  // 2. Midnight Sky Gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, HIGHWAY_ROAD_Y);
  skyGrad.addColorStop(0, COLOR_TOKENS.surfaceLowest);
  skyGrad.addColorStop(0.55, COLOR_TOKENS.skylineFar);
  skyGrad.addColorStop(1, COLOR_TOKENS.shadowPurple);
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, HIGHWAY_CANVAS_WIDTH, HIGHWAY_ROAD_Y);

  // 3. Twinkling Night Stars
  for (const star of scene.stars) {
    const flicker = Math.sin(tick * star.flickerRate) > 0;
    if (flicker) {
      ctx.fillStyle = COLOR_TOKENS.white;
      ctx.fillRect(star.x, star.y, star.size, star.size);
    }
  }

  // 4. Distant Cyber Skyline & Antennas
  drawDistantSkyline(ctx, tick);

  // 5. The 4 Distinct Project Destination Landmarks
  drawDestinationQuadra(ctx, tick, activeProjectIndex === 0);
  drawDestinationEspresso(ctx, tick, activeProjectIndex === 1, scene.steamParticles);
  drawDestinationStudify(ctx, tick, activeProjectIndex === 2);
  drawDestinationGoAthlete(ctx, tick, activeProjectIndex === 3);

  // 6. The Elevated Highway Viaduct & Road Deck
  drawHighwayDeck(ctx, tick);

  // 7. Overhead Exit Gantries spanning the road
  drawExitGantries(ctx, tick, activeProjectIndex);

  // 8. Passing Traffic on upper lane
  drawPassingTraffic(ctx, scene.traffic);

  // 9. Cruiser Exhaust Particles
  drawExhaustParticles(ctx, scene.exhaust);

  // 10. The Player's Cyber-Cruiser
  drawCyberCruiser(ctx, cruiser, tick, activeProjectIndex);

  // 11. Atmospheric Rain & Foreground Neon Bloom
  drawAtmosphericRain(ctx, tick);
}

function drawDistantSkyline(ctx: CanvasRenderingContext2D, tick: number): void {
  ctx.fillStyle = COLOR_TOKENS.skylineFar;
  for (let bx = -40; bx < HIGHWAY_CANVAS_WIDTH + 80; bx += 85) {
    const bHeight = 120 + ((bx * 9301 + 49297) % 80);
    const bWidth = 60 + ((bx * 1337) % 25);
    const bY = HIGHWAY_ROAD_Y - bHeight;
    ctx.fillRect(bx, bY, bWidth, bHeight);

    // Blinking antenna towers
    if (bx % 170 === 0) {
      ctx.strokeStyle = COLOR_TOKENS.surfaceHigh;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(bx + bWidth / 2, bY);
      ctx.lineTo(bx + bWidth / 2, bY - 32);
      ctx.stroke();

      const blink = Math.sin(tick * 0.08 + bx) > 0.2;
      ctx.fillStyle = blink ? COLOR_TOKENS.primaryNeon : COLOR_TOKENS.surfaceHigh;
      ctx.fillRect(bx + bWidth / 2 - 2, bY - 34, 4, 4);
    }
  }

  // Midground skyline silhouette
  ctx.fillStyle = COLOR_TOKENS.skylineMid;
  for (let mx = 10; mx < HIGHWAY_CANVAS_WIDTH + 60; mx += 130) {
    const mHeight = 85 + ((mx * 311) % 65);
    const mWidth = 90 + ((mx * 73) % 30);
    const mY = HIGHWAY_ROAD_Y - mHeight;
    ctx.fillRect(mx, mY, mWidth, mHeight);

    // Subtle glowing neon roofline
    ctx.fillStyle = COLOR_TOKENS.skylineNear;
    ctx.fillRect(mx, mY, mWidth, 2);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// DESTINATION 1: Quadra Communications Spire (x: 190)
// ─────────────────────────────────────────────────────────────────────────────
function drawDestinationQuadra(
  ctx: CanvasRenderingContext2D,
  tick: number,
  isActive: boolean
): void {
  const cx = HIGHWAY_DESTINATIONS_X[0];
  const baseY = HIGHWAY_ROAD_Y;

  // Main Communications Tower Tower Body
  const towerW = 76;
  const towerH = 150;
  const towerX = cx - towerW / 2;
  const towerY = baseY - towerH;

  ctx.fillStyle = COLOR_TOKENS.surfaceHigh;
  ctx.fillRect(towerX, towerY, towerW, towerH);

  // Tower Glass Windows
  ctx.fillStyle = COLOR_TOKENS.shadowDark;
  ctx.fillRect(towerX + 8, towerY + 30, towerW - 16, towerH - 40);

  // Window grid with neon pink & cyan active transmissions
  for (let r = 0; r < 5; r += 1) {
    for (let c = 0; c < 3; c += 1) {
      const lit = (tick + r * 3 + c) % 4 === 0 || isActive;
      ctx.fillStyle = lit
        ? isActive
          ? COLOR_TOKENS.primaryNeon
          : COLOR_TOKENS.accentCyan
        : COLOR_TOKENS.catwalkBeam;
      ctx.fillRect(towerX + 14 + c * 18, towerY + 38 + r * 18, 12, 10);
    }
  }

  // Spire & Satellite Dish on top
  ctx.fillStyle = COLOR_TOKENS.catwalkBeam;
  ctx.fillRect(cx - 3, towerY - 35, 6, 35);

  // Satellite dish
  ctx.strokeStyle = isActive ? COLOR_TOKENS.primaryNeon : COLOR_TOKENS.outlineVariant;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx - 16, towerY - 14, 14, Math.PI * 1.2, Math.PI * 1.8);
  ctx.stroke();

  // Floating Holographic Social Chat Bubbles above Spire
  const bubbleY = towerY - 42 + Math.sin(tick * 0.1) * 3;
  ctx.fillStyle = isActive ? COLOR_TOKENS.primaryNeon : COLOR_TOKENS.primary;
  ctx.fillRect(cx - 16, bubbleY, 32, 14);
  // Bubble tail
  ctx.beginPath();
  ctx.moveTo(cx - 4, bubbleY + 14);
  ctx.lineTo(cx + 4, bubbleY + 14);
  ctx.lineTo(cx, bubbleY + 18);
  ctx.closePath();
  ctx.fill();

  // Speech bubble dots
  ctx.fillStyle = COLOR_TOKENS.black;
  ctx.fillRect(cx - 8, bubbleY + 5, 3, 3);
  ctx.fillRect(cx - 1, bubbleY + 5, 3, 3);
  ctx.fillRect(cx + 6, bubbleY + 5, 3, 3);

  // Neon Landmark Tag
  ctx.fillStyle = COLOR_TOKENS.surfaceContainer;
  ctx.fillRect(cx - 44, towerY + 8, 88, 15);
  ctx.strokeStyle = isActive ? COLOR_TOKENS.primaryNeon : COLOR_TOKENS.outlineVariant;
  ctx.lineWidth = 1;
  ctx.strokeRect(cx - 44, towerY + 8, 88, 15);

  ctx.fillStyle = isActive ? COLOR_TOKENS.primaryNeon : COLOR_TOKENS.secondary;
  ctx.font = 'bold 8px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('QUADRA NEXUS', cx, towerY + 16);
}

// ─────────────────────────────────────────────────────────────────────────────
// DESTINATION 2: Espresso Emporium Roastery (x: 480)
// ─────────────────────────────────────────────────────────────────────────────
function drawDestinationEspresso(
  ctx: CanvasRenderingContext2D,
  tick: number,
  isActive: boolean,
  steam: HighwayParticle[]
): void {
  const cx = HIGHWAY_DESTINATIONS_X[1];
  const baseY = HIGHWAY_ROAD_Y;

  const bldgW = 84;
  const bldgH = 110;
  const bldgX = cx - bldgW / 2;
  const bldgY = baseY - bldgH;

  // Brick & Dark Steel Roastery facade
  ctx.fillStyle = COLOR_TOKENS.surfaceHigh;
  ctx.fillRect(bldgX, bldgY, bldgW, bldgH);

  // Warm amber illuminated arched windows
  ctx.fillStyle = COLOR_TOKENS.shadowDark;
  ctx.fillRect(bldgX + 10, bldgY + 28, bldgW - 20, bldgH - 35);

  for (let c = 0; c < 3; c += 1) {
    ctx.fillStyle = isActive ? COLOR_TOKENS.windowAmber : COLOR_TOKENS.catwalkBeam;
    ctx.fillRect(bldgX + 16 + c * 20, bldgY + 36, 12, 38);
    // Arched top
    ctx.beginPath();
    ctx.arc(bldgX + 22 + c * 20, bldgY + 36, 6, Math.PI, 0);
    ctx.fill();
  }

  // Industrial Copper Pipe Smokestack on Right
  ctx.fillStyle = COLOR_TOKENS.catwalkBeam;
  ctx.fillRect(cx + 14, bldgY - 30, 8, 30);
  ctx.fillStyle = COLOR_TOKENS.windowAmber;
  ctx.fillRect(cx + 12, bldgY - 32, 12, 3);

  // Render Steam Particles from Smokestack
  for (const s of steam) {
    const alpha = 1 - s.life / s.maxLife;
    ctx.fillStyle = `rgba(255, 184, 108, ${alpha * 0.45})`;
    ctx.fillRect(s.x, s.y, 4, 4);
  }

  // Neon Coffee Mug Glyph on Rooftop Sign
  const signY = bldgY - 26;
  ctx.fillStyle = COLOR_TOKENS.surfaceContainer;
  ctx.fillRect(cx - 24, signY, 32, 20);
  ctx.strokeStyle = isActive ? COLOR_TOKENS.windowAmber : COLOR_TOKENS.outlineVariant;
  ctx.lineWidth = 1;
  ctx.strokeRect(cx - 24, signY, 32, 20);

  // Glowing coffee cup silhouette
  ctx.fillStyle = isActive ? COLOR_TOKENS.windowAmber : COLOR_TOKENS.accentYellow;
  ctx.fillRect(cx - 16, signY + 6, 12, 10);
  // Mug handle
  ctx.fillRect(cx - 4, signY + 8, 3, 6);

  // Rising steam lines above cup
  const steamWave = Math.sin(tick * 0.15) * 2;
  ctx.fillStyle = COLOR_TOKENS.windowAmber;
  ctx.fillRect(cx - 13 + steamWave, signY + 2, 2, 3);
  ctx.fillRect(cx - 9 - steamWave, signY + 1, 2, 4);

  // Roastery District Tag
  ctx.fillStyle = COLOR_TOKENS.surfaceContainer;
  ctx.fillRect(cx - 44, bldgY + 6, 88, 15);
  ctx.strokeStyle = isActive ? COLOR_TOKENS.windowAmber : COLOR_TOKENS.outlineVariant;
  ctx.lineWidth = 1;
  ctx.strokeRect(cx - 44, bldgY + 6, 88, 15);

  ctx.fillStyle = isActive ? COLOR_TOKENS.windowAmber : COLOR_TOKENS.secondary;
  ctx.font = 'bold 8px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('ESPRESSO ROASTERY', cx, bldgY + 14);
}

// ─────────────────────────────────────────────────────────────────────────────
// DESTINATION 3: Studify Academic Citadel (x: 770)
// ─────────────────────────────────────────────────────────────────────────────
function drawDestinationStudify(
  ctx: CanvasRenderingContext2D,
  tick: number,
  isActive: boolean
): void {
  const cx = HIGHWAY_DESTINATIONS_X[2];
  const baseY = HIGHWAY_ROAD_Y;

  const citadelW = 86;
  const citadelH = 135;
  const citadelX = cx - citadelW / 2;
  const citadelY = baseY - citadelH;

  // Modernist Geometric Tech Campus structure
  ctx.fillStyle = COLOR_TOKENS.surfaceHigh;
  ctx.fillRect(citadelX, citadelY, citadelW, citadelH);

  // Stepped geometric tiers
  ctx.fillStyle = COLOR_TOKENS.shadowDark;
  ctx.fillRect(citadelX + 12, citadelY + 24, citadelW - 24, citadelH - 30);

  // Digital Book / Library Atrium vertical data bands
  for (let c = 0; c < 4; c += 1) {
    const pulse = Math.sin(tick * 0.1 + c * 0.8) > 0 || isActive;
    ctx.fillStyle = pulse ? COLOR_TOKENS.accentCyan : COLOR_TOKENS.catwalkBeam;
    ctx.fillRect(citadelX + 18 + c * 14, citadelY + 34, 8, 65);
  }

  // Floating Holographic Book / Laurel Glyph on Top
  const bookY = citadelY - 28 + Math.sin(tick * 0.12) * 2.5;
  ctx.fillStyle = COLOR_TOKENS.surfaceContainer;
  ctx.fillRect(cx - 20, bookY, 40, 22);
  ctx.strokeStyle = isActive ? COLOR_TOKENS.accentCyan : COLOR_TOKENS.outlineVariant;
  ctx.lineWidth = 1;
  ctx.strokeRect(cx - 20, bookY, 40, 22);

  // Open book holographic wings
  ctx.fillStyle = isActive ? COLOR_TOKENS.accentCyan : COLOR_TOKENS.white;
  // Left page
  ctx.beginPath();
  ctx.moveTo(cx - 2, bookY + 16);
  ctx.lineTo(cx - 14, bookY + 14);
  ctx.lineTo(cx - 14, bookY + 6);
  ctx.lineTo(cx - 2, bookY + 8);
  ctx.closePath();
  ctx.fill();
  // Right page
  ctx.beginPath();
  ctx.moveTo(cx + 2, bookY + 16);
  ctx.lineTo(cx + 14, bookY + 14);
  ctx.lineTo(cx + 14, bookY + 6);
  ctx.lineTo(cx + 2, bookY + 8);
  ctx.closePath();
  ctx.fill();

  // Academic District Tag
  ctx.fillStyle = COLOR_TOKENS.surfaceContainer;
  ctx.fillRect(cx - 44, citadelY + 6, 88, 15);
  ctx.strokeStyle = isActive ? COLOR_TOKENS.accentCyan : COLOR_TOKENS.outlineVariant;
  ctx.lineWidth = 1;
  ctx.strokeRect(cx - 44, citadelY + 6, 88, 15);

  ctx.fillStyle = isActive ? COLOR_TOKENS.accentCyan : COLOR_TOKENS.secondary;
  ctx.font = 'bold 8px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('STUDIFY CITADEL', cx, citadelY + 14);
}

// ─────────────────────────────────────────────────────────────────────────────
// DESTINATION 4: GoAthlete Sports Arena (x: 1060)
// ─────────────────────────────────────────────────────────────────────────────
function drawDestinationGoAthlete(
  ctx: CanvasRenderingContext2D,
  tick: number,
  isActive: boolean
): void {
  const cx = HIGHWAY_DESTINATIONS_X[3];
  const baseY = HIGHWAY_ROAD_Y;

  const domeW = 96;
  const domeH = 95;
  const domeX = cx - domeW / 2;
  const domeY = baseY - domeH;

  // Curved Futuristic Sports Dome Base
  ctx.fillStyle = COLOR_TOKENS.surfaceHigh;
  ctx.fillRect(domeX, domeY + 25, domeW, domeH - 25);

  // Dome Roof Arch
  ctx.fillStyle = COLOR_TOKENS.shadowDark;
  ctx.beginPath();
  ctx.ellipse(cx, domeY + 25, domeW / 2, 28, 0, Math.PI, 0);
  ctx.fill();
  ctx.strokeStyle = isActive ? COLOR_TOKENS.finishGold : COLOR_TOKENS.catwalkBeam;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Sweeping Night Stadium Floodlight Beams
  const sweepAngle = Math.sin(tick * 0.04) * 0.35;
  ctx.save();
  ctx.translate(cx, domeY + 4);
  ctx.rotate(sweepAngle);
  const beamGrad = ctx.createLinearGradient(0, 0, 0, -110);
  beamGrad.addColorStop(0, isActive ? 'rgba(255, 210, 0, 0.45)' : 'rgba(0, 242, 254, 0.25)');
  beamGrad.addColorStop(1, 'rgba(0, 242, 254, 0)');
  ctx.fillStyle = beamGrad;
  ctx.beginPath();
  ctx.moveTo(-6, 0);
  ctx.lineTo(-35, -110);
  ctx.lineTo(35, -110);
  ctx.lineTo(6, 0);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Stadium Scoreboard Beacon / Runner Silhouette
  ctx.fillStyle = COLOR_TOKENS.surfaceContainer;
  ctx.fillRect(cx - 24, domeY + 36, 48, 18);
  ctx.strokeStyle = isActive ? COLOR_TOKENS.finishGold : COLOR_TOKENS.outlineVariant;
  ctx.lineWidth = 1;
  ctx.strokeRect(cx - 24, domeY + 36, 48, 18);

  // Runner icon dots
  ctx.fillStyle = isActive ? COLOR_TOKENS.finishGold : COLOR_TOKENS.white;
  // Head
  ctx.fillRect(cx - 2, domeY + 39, 3, 3);
  // Torso
  ctx.fillRect(cx - 3, domeY + 43, 5, 5);
  // Legs
  ctx.fillRect(cx - 6, domeY + 48, 3, 4);
  ctx.fillRect(cx + 2, domeY + 48, 4, 3);

  // Arena Tag
  ctx.fillStyle = COLOR_TOKENS.surfaceContainer;
  ctx.fillRect(cx - 44, domeY + 62, 88, 15);
  ctx.strokeStyle = isActive ? COLOR_TOKENS.finishGold : COLOR_TOKENS.outlineVariant;
  ctx.lineWidth = 1;
  ctx.strokeRect(cx - 44, domeY + 62, 88, 15);

  ctx.fillStyle = isActive ? COLOR_TOKENS.finishGold : COLOR_TOKENS.secondary;
  ctx.font = 'bold 8px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('GOATHLETE ARENA', cx, domeY + 70);
}

// ─────────────────────────────────────────────────────────────────────────────
// HIGHWAY VIADUCT & ROAD DECK
// ─────────────────────────────────────────────────────────────────────────────
function drawHighwayDeck(ctx: CanvasRenderingContext2D, tick: number): void {
  const roadY = HIGHWAY_ROAD_Y;
  const roadH = 68;

  // Massive Highway Concrete Support Pillars
  for (let px = 80; px < HIGHWAY_CANVAS_WIDTH; px += 260) {
    ctx.fillStyle = COLOR_TOKENS.surfaceHigh;
    ctx.fillRect(px - 14, roadY + roadH, 28, HIGHWAY_CANVAS_HEIGHT - (roadY + roadH));
    ctx.fillStyle = COLOR_TOKENS.shadowDark;
    ctx.fillRect(px - 10, roadY + roadH, 20, HIGHWAY_CANVAS_HEIGHT - (roadY + roadH));
  }

  // Neon Underglow along viaduct belly
  ctx.fillStyle = COLOR_TOKENS.neonReflection;
  ctx.fillRect(0, roadY + roadH, HIGHWAY_CANVAS_WIDTH, 12);

  // Highway Viaduct Steel Girder Body
  ctx.fillStyle = COLOR_TOKENS.guardrailBeam;
  ctx.fillRect(0, roadY + roadH - 8, HIGHWAY_CANVAS_WIDTH, 8);

  // Main Asphalt Road Deck
  ctx.fillStyle = COLOR_TOKENS.asphaltDark;
  ctx.fillRect(0, roadY, HIGHWAY_CANVAS_WIDTH, roadH);

  // Upper Lane Surface (Oncoming)
  ctx.fillStyle = COLOR_TOKENS.asphaltLight;
  ctx.fillRect(0, roadY + 4, HIGHWAY_CANVAS_WIDTH, 26);

  // Center Concrete Divider Barrier
  ctx.fillStyle = COLOR_TOKENS.surfaceHigh;
  ctx.fillRect(0, roadY + 31, HIGHWAY_CANVAS_WIDTH, 4);

  // Divider Reflectors
  for (let rx = 15; rx < HIGHWAY_CANVAS_WIDTH; rx += 45) {
    ctx.fillStyle = rx % 90 === 0 ? COLOR_TOKENS.primaryNeon : COLOR_TOKENS.accentYellow;
    ctx.fillRect(rx, roadY + 32, 4, 2);
  }

  // Upper Lane Dashed Center Markings (moving left with traffic)
  const upperOffset = (tick * 2.8) % 36;
  ctx.fillStyle = COLOR_TOKENS.laneMarking;
  for (let ux = -36; ux < HIGHWAY_CANVAS_WIDTH + 36; ux += 36) {
    ctx.fillRect(ux - upperOffset, roadY + 16, 16, 2);
  }

  // Lower Lane Dashed Center Markings (Cruising Lane, moving right)
  const lowerOffset = (tick * 3.2) % 40;
  for (let lx = -40; lx < HIGHWAY_CANVAS_WIDTH + 40; lx += 40) {
    ctx.fillRect(lx + lowerOffset, roadY + 48, 18, 2);
  }

  // Bottom Highway Guardrail with glowing neon line
  ctx.fillStyle = COLOR_TOKENS.rooftopTop;
  ctx.fillRect(0, roadY + roadH - 2, HIGHWAY_CANVAS_WIDTH, 4);
  ctx.fillStyle = COLOR_TOKENS.accentCyan;
  ctx.fillRect(0, roadY + roadH, HIGHWAY_CANVAS_WIDTH, 1);

  // Top Roadside Curb with neon magenta line
  ctx.fillStyle = COLOR_TOKENS.catwalkRail;
  ctx.fillRect(0, roadY, HIGHWAY_CANVAS_WIDTH, 2);
  ctx.fillStyle = COLOR_TOKENS.primaryNeon;
  ctx.fillRect(0, roadY - 1, HIGHWAY_CANVAS_WIDTH, 1);
}

// ─────────────────────────────────────────────────────────────────────────────
// OVERHEAD HIGHWAY EXIT GANTRIES
// ─────────────────────────────────────────────────────────────────────────────
function drawExitGantries(
  ctx: CanvasRenderingContext2D,
  _tick: number,
  activeIdx: number
): void {
  const exitNames = ['01: QUADRA', '02: ESPRESSO', '03: STUDIFY', '04: GOATHLETE'];

  for (let i = 0; i < HIGHWAY_DESTINATIONS_X.length; i += 1) {
    const gx = HIGHWAY_DESTINATIONS_X[i];
    const gy = HIGHWAY_ROAD_Y - 48;
    const isTarget = i === activeIdx;

    // Steel Gantry Support Legs
    ctx.fillStyle = COLOR_TOKENS.surfaceHigh;
    ctx.fillRect(gx - 46, gy, 4, 52);
    ctx.fillRect(gx + 42, gy, 4, 52);

    // Crossbeam
    ctx.fillRect(gx - 48, gy - 2, 94, 4);

    // Illuminated Exit Sign Board
    ctx.fillStyle = COLOR_TOKENS.surfaceContainer;
    ctx.fillRect(gx - 42, gy + 2, 84, 18);
    ctx.strokeStyle = isTarget ? COLOR_TOKENS.accentCyan : COLOR_TOKENS.outlineVariant;
    ctx.lineWidth = 1;
    ctx.strokeRect(gx - 42, gy + 2, 84, 18);

    // Exit indicator arrow & text
    ctx.fillStyle = isTarget ? COLOR_TOKENS.accentCyan : COLOR_TOKENS.secondaryDim;
    ctx.font = 'bold 8px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`▲ EXIT ${exitNames[i]}`, gx, gy + 11);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PASSING TRAFFIC (UPPER LANE)
// ─────────────────────────────────────────────────────────────────────────────
function drawPassingTraffic(
  ctx: CanvasRenderingContext2D,
  traffic: HighwayTrafficCar[]
): void {
  for (const car of traffic) {
    // Car Body
    ctx.fillStyle = car.color;
    ctx.fillRect(car.x, car.y, car.length, 10);

    // Canopy
    ctx.fillStyle = COLOR_TOKENS.surfaceContainer;
    ctx.fillRect(car.x + 4, car.y - 4, car.length - 8, 4);

    // Headlights (Facing Left)
    ctx.fillStyle = car.headlightColor;
    ctx.fillRect(car.x - 2, car.y + 2, 3, 3);
    ctx.fillRect(car.x - 2, car.y + 6, 3, 3);

    // Headlight Light Beam Cone
    ctx.fillStyle = COLOR_TOKENS.headlightBeam;
    ctx.beginPath();
    ctx.moveTo(car.x, car.y + 4);
    ctx.lineTo(car.x - 38, car.y - 4);
    ctx.lineTo(car.x - 38, car.y + 14);
    ctx.closePath();
    ctx.fill();

    // Taillights (Facing Right)
    ctx.fillStyle = car.taillightColor;
    ctx.fillRect(car.x + car.length, car.y + 2, 2, 6);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// CRUISER EXHAUST PARTICLES
// ─────────────────────────────────────────────────────────────────────────────
function drawExhaustParticles(
  ctx: CanvasRenderingContext2D,
  exhaust: HighwayParticle[]
): void {
  for (const p of exhaust) {
    const alpha = 1 - p.life / p.maxLife;
    ctx.fillStyle = `rgba(255, 45, 117, ${alpha * 0.7})`;
    ctx.fillRect(p.x, p.y, 3, 3);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PLAYER CYBER-CRUISER VEHICLE
// ─────────────────────────────────────────────────────────────────────────────
function drawCyberCruiser(
  ctx: CanvasRenderingContext2D,
  cruiser: HighwayCruiser,
  tick: number,
  activeIdx: number
): void {
  const cx = Math.round(cruiser.x);
  const cy = cruiser.y;

  // Car Shadow on Asphalt
  ctx.fillStyle = COLOR_TOKENS.shadowDark;
  ctx.beginPath();
  ctx.ellipse(cx + 16, cy + 16, 26, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Neon Underglow Reflection
  ctx.fillStyle = COLOR_TOKENS.neonReflection;
  ctx.fillRect(cx - 4, cy + 14, 40, 4);

  // Wedge Sports Car Body
  ctx.fillStyle = COLOR_TOKENS.characterCoat;
  ctx.fillRect(cx, cy + 4, 34, 10);

  // Aerodynamic nose cone (facing right)
  ctx.beginPath();
  ctx.moveTo(cx + 34, cy + 7);
  ctx.lineTo(cx + 40, cy + 12);
  ctx.lineTo(cx + 34, cy + 14);
  ctx.closePath();
  ctx.fill();

  // Cockpit Tinted Glass Canopy
  ctx.fillStyle = COLOR_TOKENS.shadowPurple;
  ctx.fillRect(cx + 6, cy - 3, 18, 7);
  ctx.fillStyle = COLOR_TOKENS.accentCyan;
  ctx.fillRect(cx + 12, cy - 1, 8, 2);

  // Dual Headlights (Facing Right)
  ctx.fillStyle = COLOR_TOKENS.accentCyan;
  ctx.fillRect(cx + 38, cy + 7, 2, 3);
  ctx.fillRect(cx + 38, cy + 11, 2, 3);

  // Forward Headlight Light Cones onto Road
  ctx.fillStyle = COLOR_TOKENS.headlightBeam;
  ctx.beginPath();
  ctx.moveTo(cx + 40, cy + 9);
  ctx.lineTo(cx + 95, cy - 2);
  ctx.lineTo(cx + 95, cy + 22);
  ctx.closePath();
  ctx.fill();

  // Rear Hot-Pink Neon Taillight Bar
  ctx.fillStyle = COLOR_TOKENS.primaryNeon;
  ctx.fillRect(cx - 2, cy + 5, 3, 7);

  // Taillight trailing flare
  ctx.fillStyle = COLOR_TOKENS.taillightBeam;
  ctx.fillRect(cx - 16, cy + 6, 14, 5);

  // Wheels / Cyber Rims
  const wheelBob = cruiser.isCruising ? Math.sin(tick * 0.4) * 0.5 : 0;
  ctx.fillStyle = COLOR_TOKENS.surfaceLowest;
  ctx.fillRect(cx + 4, cy + 11 + wheelBob, 7, 5);
  ctx.fillRect(cx + 24, cy + 11 + wheelBob, 7, 5);

  ctx.fillStyle = COLOR_TOKENS.primary;
  ctx.fillRect(cx + 6, cy + 13 + wheelBob, 3, 2);
  ctx.fillRect(cx + 26, cy + 13 + wheelBob, 3, 2);

  // Floating Status HUD above Cruiser
  const hudY = cy - 20 + Math.sin(tick * 0.1) * 2;
  const projectExits = ['EXIT 01: QUADRA', 'EXIT 02: ESPRESSO', 'EXIT 03: STUDIFY', 'EXIT 04: GOATHLETE'];
  const statusText = cruiser.isCruising
    ? 'CRUISING ➔'
    : `DOCKED // ${projectExits[activeIdx]}`;

  ctx.fillStyle = COLOR_TOKENS.surfaceContainer;
  const tagW = Math.max(80, statusText.length * 6.5);
  ctx.fillRect(cx + 16 - tagW / 2, hudY - 10, tagW, 14);
  ctx.strokeStyle = COLOR_TOKENS.primaryNeon;
  ctx.lineWidth = 1;
  ctx.strokeRect(cx + 16 - tagW / 2, hudY - 10, tagW, 14);

  // Pointer tick
  ctx.fillStyle = COLOR_TOKENS.primaryNeon;
  ctx.beginPath();
  ctx.moveTo(cx + 12, hudY + 4);
  ctx.lineTo(cx + 20, hudY + 4);
  ctx.lineTo(cx + 16, hudY + 8);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = COLOR_TOKENS.white;
  ctx.font = 'bold 8px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(statusText, cx + 16, hudY - 3);
}

// ─────────────────────────────────────────────────────────────────────────────
// ATMOSPHERIC CYBERPUNK RAIN
// ─────────────────────────────────────────────────────────────────────────────
function drawAtmosphericRain(ctx: CanvasRenderingContext2D, tick: number): void {
  ctx.strokeStyle = COLOR_TOKENS.rainParticle;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let r = 0; r < 24; r += 1) {
    const rx = ((r * 67 + tick * 4) % (HIGHWAY_CANVAS_WIDTH + 80)) - 40;
    const ry = (r * 31 + tick * 8) % HIGHWAY_CANVAS_HEIGHT;
    ctx.moveTo(rx, ry);
    ctx.lineTo(rx - 3, ry + 10);
  }
  ctx.stroke();
}
