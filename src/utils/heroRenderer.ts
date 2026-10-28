import { COLOR_TOKENS } from './constants';
import { PlayerState, RainParticle, WindowLight, PlatformRect, LocationHub } from './heroTypes';

/**
 * Draw Layer 1: Distant Skyline with blinking antenna beacons and glowing pixel windows
 */
export function drawSkyline(
  ctx: CanvasRenderingContext2D,
  tick: number,
  cameraX: number,
  worldWidth: number,
  worldHeight: number,
  windows: readonly WindowLight[]
): void {
  const parallaxX = cameraX * 0.18;
  ctx.save();
  ctx.translate(-parallaxX, 0);

  // Far skyline building blocks
  ctx.fillStyle = COLOR_TOKENS.skylineFar;
  for (let bx = -100; bx < worldWidth + 200; bx += 70) {
    const bHeight = 220 + ((bx * 9301 + 49297) % 180);
    const bWidth = 50 + ((bx * 1337) % 30);
    const bY = worldHeight - bHeight;
    ctx.fillRect(bx, bY, bWidth, bHeight);

    // Antenna tower on top of some buildings
    if (bx % 140 === 0) {
      ctx.strokeStyle = COLOR_TOKENS.shadowDark;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(bx + bWidth / 2, bY);
      ctx.lineTo(bx + bWidth / 2, bY - 40);
      ctx.stroke();

      // Blinking antenna beacon light
      const blink = Math.sin(tick * 0.06 + bx) > 0.3;
      ctx.fillStyle = blink ? COLOR_TOKENS.primaryNeon : COLOR_TOKENS.surfaceContainer;
      ctx.fillRect(bx + bWidth / 2 - 2, bY - 42, 4, 4);
    }
  }

  // Distant window lights
  for (const win of windows) {
    const flicker = Math.sin(tick * win.flickerRate + win.flickerOffset) > -0.2;
    if (flicker) {
      ctx.fillStyle = win.color;
      ctx.fillRect(win.x, win.y, 4, 4);
    }
  }
  ctx.restore();
}

/**
 * Draw Layer 2: Midground Silhouettes with neon trim
 */
export function drawMidground(
  ctx: CanvasRenderingContext2D,
  cameraX: number,
  worldWidth: number,
  worldHeight: number
): void {
  const parallaxMidX = cameraX * 0.4;
  ctx.save();
  ctx.translate(-parallaxMidX, 0);
  ctx.fillStyle = COLOR_TOKENS.skylineMid;

  for (let mx = -60; mx < worldWidth + 150; mx += 110) {
    const mHeight = 150 + ((mx * 311) % 120);
    const mWidth = 75 + ((mx * 73) % 25);
    const mY = worldHeight - mHeight;
    ctx.fillRect(mx, mY, mWidth, mHeight);

    // Neon outline roof trim
    ctx.fillStyle = COLOR_TOKENS.skylineNear;
    ctx.fillRect(mx, mY, mWidth, 3);
  }
  ctx.restore();
}

/**
 * Draw Layer 3: Solid Rooftops and Connective Catwalks
 */
export function drawRooftopsAndCatwalks(
  ctx: CanvasRenderingContext2D,
  rooftops: readonly PlatformRect[],
  catwalks: readonly PlatformRect[]
): void {
  // Rooftops
  for (const roof of rooftops) {
    // Main Rooftop Body
    ctx.fillStyle = COLOR_TOKENS.rooftopBody;
    ctx.fillRect(roof.x, roof.y, roof.w, roof.h);

    // Top Surface Edge
    ctx.fillStyle = COLOR_TOKENS.rooftopTop;
    ctx.fillRect(roof.x, roof.y, roof.w, 4);

    // Subtle Neon Puddle Reflection on Top Surface
    ctx.fillStyle = COLOR_TOKENS.neonReflection;
    ctx.fillRect(roof.x + 15, roof.y + 1, roof.w - 30, 2);

    // Architectural Details: Wall vertical seams
    ctx.fillStyle = COLOR_TOKENS.shadowPurple;
    for (let seamX = roof.x + 40; seamX < roof.x + roof.w - 20; seamX += 60) {
      ctx.fillRect(seamX, roof.y + 6, 2, roof.h - 10);
    }

    // HVAC ventilation unit on some roofs
    if (roof.w > 300) {
      ctx.fillStyle = COLOR_TOKENS.surfaceHigh;
      ctx.fillRect(roof.x + roof.w - 60, roof.y - 18, 36, 18);
      ctx.fillStyle = COLOR_TOKENS.primaryNeon;
      ctx.fillRect(roof.x + roof.w - 56, roof.y - 12, 4, 4);
    }
  }

  // Catwalks Connecting Rooftops
  for (const cat of catwalks) {
    // Catwalk beam base
    ctx.fillStyle = COLOR_TOKENS.catwalkBeam;
    ctx.fillRect(cat.x, cat.y, cat.w, cat.h);

    // Handrail top
    ctx.fillStyle = COLOR_TOKENS.catwalkRail;
    ctx.fillRect(cat.x, cat.y - 6, cat.w, 2);

    // Handrail vertical struts
    for (let sx = cat.x + 6; sx < cat.x + cat.w; sx += 12) {
      ctx.fillRect(sx, cat.y - 6, 2, 6);
    }

    // Support diagonal truss underneath
    ctx.strokeStyle = COLOR_TOKENS.catwalkBeam;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let tx = cat.x; tx < cat.x + cat.w - 14; tx += 16) {
      ctx.moveTo(tx, cat.y + cat.h);
      ctx.lineTo(tx + 8, cat.y);
      ctx.lineTo(tx + 16, cat.y + cat.h);
    }
    ctx.stroke();
  }
}

/**
 * Draw Layer 4: The 4 Distinct Interactive City Locations
 */
export function drawLocationHubs(
  ctx: CanvasRenderingContext2D,
  tick: number,
  locations: readonly LocationHub[],
  hoveredId: string | null,
  nearbyId: string | null,
  interactSymbol: string
): void {
  for (const loc of locations) {
    const isHovered = hoveredId === loc.id;
    const isNearby = nearbyId === loc.id;
    const isHighlighted = isHovered || isNearby;

    if (loc.id === 'xiia') {
      // --- XIIA WORKSTATION SILHOUETTE ---
      // Desk Base
      ctx.fillStyle = COLOR_TOKENS.surfaceHigh;
      ctx.fillRect(loc.x + 8, loc.y + 22, 48, 30);
      ctx.fillStyle = COLOR_TOKENS.rooftopTop;
      ctx.fillRect(loc.x + 4, loc.y + 20, 56, 4);

      // Dual Monitored Terminal
      ctx.fillStyle = COLOR_TOKENS.surfaceContainer;
      ctx.fillRect(loc.x + 10, loc.y + 2, 22, 18);
      ctx.fillRect(loc.x + 34, loc.y + 4, 22, 16);

      // Monitor screens glowing with code
      ctx.fillStyle = isHighlighted ? COLOR_TOKENS.accentCyan : COLOR_TOKENS.shadowPurple;
      ctx.fillRect(loc.x + 12, loc.y + 4, 18, 14);
      ctx.fillRect(loc.x + 36, loc.y + 6, 18, 12);

      // Green/Cyan code lines on monitor
      ctx.fillStyle = COLOR_TOKENS.white;
      ctx.fillRect(loc.x + 14, loc.y + 6, 12, 1);
      ctx.fillRect(loc.x + 14, loc.y + 9, 8, 1);
      ctx.fillRect(loc.x + 14, loc.y + 12, 14, 1);

      // Blinking Server Rack beside desk
      ctx.fillStyle = COLOR_TOKENS.surfaceLowest;
      ctx.fillRect(loc.x + 58, loc.y + 14, 14, 38);
      const ledBlink = Math.sin(tick * 0.1) > 0;
      ctx.fillStyle = ledBlink ? COLOR_TOKENS.primaryNeon : COLOR_TOKENS.accentCyan;
      ctx.fillRect(loc.x + 62, loc.y + 18, 6, 2);
      ctx.fillStyle = !ledBlink ? COLOR_TOKENS.accentCyan : COLOR_TOKENS.windowAmber;
      ctx.fillRect(loc.x + 62, loc.y + 24, 6, 2);
    } else if (loc.id === 'github') {
      // --- GITHUB TERMINAL SILHOUETTE ---
      // Arcade / Kiosk Housing
      ctx.fillStyle = COLOR_TOKENS.surfaceHigh;
      ctx.fillRect(loc.x + 8, loc.y + 8, 36, 46);
      ctx.fillStyle = COLOR_TOKENS.surfaceContainer;
      ctx.fillRect(loc.x + 4, loc.y + 4, 44, 8);

      // CRT Terminal Screen
      ctx.fillStyle = COLOR_TOKENS.surfaceLowest;
      ctx.fillRect(loc.x + 12, loc.y + 14, 28, 22);

      // CRT Glowing Green/Pink Phosphor Screen
      ctx.fillStyle = isHighlighted ? COLOR_TOKENS.primaryNeon : COLOR_TOKENS.shadowPurple;
      ctx.fillRect(loc.x + 14, loc.y + 16, 24, 18);

      // Terminal Prompt ">_"
      ctx.fillStyle = COLOR_TOKENS.white;
      ctx.fillRect(loc.x + 16, loc.y + 20, 6, 2);
      ctx.fillRect(loc.x + 16, loc.y + 24, 4, 2);
      if (Math.sin(tick * 0.15) > 0) {
        ctx.fillStyle = COLOR_TOKENS.accentCyan;
        ctx.fillRect(loc.x + 22, loc.y + 24, 4, 2);
      }
    } else if (loc.id === 'linkedin') {
      // --- LINKEDIN SIGNAL TOWER SILHOUETTE ---
      // Steel Lattice Mast
      ctx.strokeStyle = isHighlighted ? COLOR_TOKENS.primaryNeon : COLOR_TOKENS.catwalkRail;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(loc.x + 10, loc.y + loc.h);
      ctx.lineTo(loc.x + loc.w / 2, loc.y + 10);
      ctx.lineTo(loc.x + loc.w - 10, loc.y + loc.h);
      ctx.stroke();

      // Cross braces
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(loc.x + 14, loc.y + 70);
      ctx.lineTo(loc.x + loc.w - 14, loc.y + 70);
      ctx.moveTo(loc.x + 18, loc.y + 40);
      ctx.lineTo(loc.x + loc.w - 18, loc.y + 40);
      ctx.stroke();

      // Transmitter Tip Bulb
      const pulsePhase = (tick * 0.05) % 1;
      const bulbBlink = Math.sin(tick * 0.12) > 0;
      ctx.fillStyle = bulbBlink ? COLOR_TOKENS.primaryNeon : COLOR_TOKENS.accentCyan;
      ctx.fillRect(loc.x + loc.w / 2 - 4, loc.y + 6, 8, 8);

      // Radiating Signal Wave Arcs
      ctx.strokeStyle = COLOR_TOKENS.primaryNeon;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(loc.x + loc.w / 2, loc.y + 10, 10 + pulsePhase * 24, -Math.PI * 0.75, -Math.PI * 0.25);
      ctx.stroke();
    } else if (loc.id === 'portal') {
      // --- PROJECTS PORTAL SILHOUETTE ---
      // Heavy Gateway Arch
      ctx.fillStyle = COLOR_TOKENS.surfaceHigh;
      ctx.fillRect(loc.x + 4, loc.y + 6, 10, loc.h - 6);
      ctx.fillRect(loc.x + loc.w - 14, loc.y + 6, 10, loc.h - 6);
      ctx.fillRect(loc.x + 4, loc.y + 2, loc.w - 8, 8);

      // Neon Gate Conduit Coils
      ctx.fillStyle = COLOR_TOKENS.primaryNeon;
      ctx.fillRect(loc.x + 2, loc.y + 16, 4, 4);
      ctx.fillRect(loc.x + 2, loc.y + 36, 4, 4);
      ctx.fillRect(loc.x + loc.w - 6, loc.y + 16, 4, 4);
      ctx.fillRect(loc.x + loc.w - 6, loc.y + 36, 4, 4);

      // Swirling Vortex Aperture
      const vortexCenter = { x: loc.x + loc.w / 2, y: loc.y + loc.h / 2 + 4 };
      const spin = tick * 0.08;
      ctx.save();
      ctx.translate(vortexCenter.x, vortexCenter.y);
      ctx.rotate(spin);

      ctx.fillStyle = COLOR_TOKENS.portalVortexOuter;
      ctx.fillRect(-12, -12, 24, 24);
      ctx.rotate(-spin * 2);
      ctx.fillStyle = COLOR_TOKENS.portalVortexInner;
      ctx.fillRect(-6, -6, 12, 12);
      ctx.restore();
    }

    // --- Holographic Location Label / Indicator ---
    ctx.save();
    const labelX = loc.x + loc.w / 2;
    const labelY = loc.y - 12;

    // Subtle floating bounce
    const bob = Math.sin(tick * 0.08 + loc.x) * 2;

    if (isHighlighted) {
      // Pulsing marker tag
      ctx.fillStyle = COLOR_TOKENS.primaryNeon;
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${interactSymbol} ${loc.title}`, labelX, labelY + bob);
    } else {
      // Compact discreet location tag
      ctx.fillStyle = COLOR_TOKENS.outline;
      ctx.font = '8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(loc.sublabel, labelX, labelY + bob);
    }
    ctx.restore();
  }
}

/**
 * Draw Layer 5: Animated Pixel Character (Protagonist) with Player Pointer
 */
export function drawCharacterSprite(
  ctx: CanvasRenderingContext2D,
  char: PlayerState,
  tick: number,
  pointerLabel: string
): void {
  const cx = Math.round(char.x);
  const cy = Math.round(char.y);
  const charCenterX = cx + 8;
  const charFeetY = cy + 24;

  // 1. Neon ground presence beneath character
  ctx.fillStyle = COLOR_TOKENS.neonReflection;
  ctx.beginPath();
  ctx.ellipse(charCenterX, charFeetY, 9, 2.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // 2. Character Sprite
  ctx.save();
  if (char.facing === 'left') {
    ctx.translate(cx + 16, cy);
    ctx.scale(-1, 1);
  } else {
    ctx.translate(cx, cy);
  }

  // Idle breathing offset
  const idleBob = !char.isMoving && char.isGrounded ? (char.animFrame === 1 ? 1 : 0) : 0;

  // Character Pixel Art Sprites
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

  // Legs / Boots Animation
  ctx.fillStyle = COLOR_TOKENS.characterBoots;
  if (!char.isGrounded) {
    // Airborne jumping pose
    ctx.fillRect(3, 17, 3, 5);
    ctx.fillRect(8, 18, 4, 4);
  } else if (char.isMoving) {
    // 4-frame stride
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
    // Idle standing stance
    ctx.fillRect(4, 18 + idleBob, 3, 6);
    ctx.fillRect(9, 18 + idleBob, 3, 6);
  }

  ctx.restore();

  // 3. Animated Neon Pointer to the Person
  const pointerBob = Math.sin(tick * 0.12) * 3;
  const pointerY = cy - 14 + pointerBob;

  // Downward pointer arrow triangle
  ctx.fillStyle = COLOR_TOKENS.primaryNeon;
  ctx.beginPath();
  ctx.moveTo(charCenterX - 4, pointerY + 2);
  ctx.lineTo(charCenterX + 4, pointerY + 2);
  ctx.lineTo(charCenterX, pointerY + 7);
  ctx.closePath();
  ctx.fill();

  // Pointer badge box
  ctx.fillStyle = COLOR_TOKENS.surfaceContainer;
  ctx.fillRect(charCenterX - 14, pointerY - 11, 28, 12);
  ctx.strokeStyle = COLOR_TOKENS.primaryNeon;
  ctx.lineWidth = 1;
  ctx.strokeRect(charCenterX - 14, pointerY - 11, 28, 12);

  // Pointer text label
  ctx.fillStyle = COLOR_TOKENS.white;
  ctx.font = 'bold 8px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(pointerLabel, charCenterX, pointerY - 5);
}

/**
 * Draw Layer 6: Cyber Rain & Ambient Particles
 */
export function drawRainStreaks(ctx: CanvasRenderingContext2D, particles: readonly RainParticle[]): void {
  ctx.fillStyle = COLOR_TOKENS.rainParticle;
  for (const pt of particles) {
    ctx.fillRect(pt.x, pt.y, 1, pt.length);
  }
}
