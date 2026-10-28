import { COLOR_TOKENS } from './constants';
import { WindowLight } from './heroTypes';

/**
 * Procedural Skyline Renderer for Career District
 * Reuses the exact visual language, scale, and color tokens from the Hero section.
 */
export function drawCareerSkyline(
  ctx: CanvasRenderingContext2D,
  tick: number,
  worldWidth: number,
  worldHeight: number,
  windows: readonly WindowLight[]
): void {
  // Far skyline building blocks
  ctx.fillStyle = COLOR_TOKENS.skylineFar;
  for (let bx = -60; bx < worldWidth + 80; bx += 70) {
    const bHeight = 160 + ((bx * 9301 + 49297) % 140);
    const bWidth = 50 + ((bx * 1337) % 30);
    const bY = worldHeight - bHeight;
    ctx.fillRect(bx, bY, bWidth, bHeight);

    // Antenna tower on top of some buildings
    if (bx % 140 === 0) {
      ctx.strokeStyle = COLOR_TOKENS.shadowDark;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(bx + bWidth / 2, bY);
      ctx.lineTo(bx + bWidth / 2, bY - 35);
      ctx.stroke();

      // Blinking antenna beacon light
      const blink = Math.sin(tick * 0.06 + bx) > 0.3;
      ctx.fillStyle = blink ? COLOR_TOKENS.primaryNeon : COLOR_TOKENS.surfaceContainer;
      ctx.fillRect(bx + bWidth / 2 - 2, bY - 37, 4, 4);
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

  // Midground Silhouettes with neon roof edge
  ctx.fillStyle = COLOR_TOKENS.skylineMid;
  for (let mx = -40; mx < worldWidth + 80; mx += 110) {
    const mHeight = 110 + ((mx * 311) % 90);
    const mWidth = 75 + ((mx * 73) % 25);
    const mY = worldHeight - mHeight;
    ctx.fillRect(mx, mY, mWidth, mHeight);

    // Neon outline roof trim
    ctx.fillStyle = COLOR_TOKENS.skylineNear;
    ctx.fillRect(mx, mY, mWidth, 2);
  }
}

/**
 * Draws the Pixel-Art Career District Architecture:
 * 1. XIIA Corporate Production Tower (Hot-Pink Neon & Workstation)
 * 2. Connecting Industrial Catwalk & Neon Conduit Lines
 * 3. Independent Full-Stack Research Labs (Cyan Neon & Terminal)
 */
export function drawCareerStructures(
  ctx: CanvasRenderingContext2D,
  tick: number,
  activeSector: 'xiia' | 'independent' | null,
  hoveredSector: 'xiia' | 'independent' | null
): void {
  // ── 1. XIIA CORPORATE COMPLEX (LEFT BUILDING) ──
  const xiiaX = 60;
  const xiiaY = 140;
  const xiiaW = 380;
  const xiiaH = 220;
  const isXiiaHovered = hoveredSector === 'xiia' || activeSector === 'xiia';

  // Main Building Body
  ctx.fillStyle = COLOR_TOKENS.rooftopBody;
  ctx.fillRect(xiiaX, xiiaY, xiiaW, xiiaH);

  // Roof Surface Edge
  ctx.fillStyle = isXiiaHovered ? COLOR_TOKENS.primary : COLOR_TOKENS.rooftopTop;
  ctx.fillRect(xiiaX, xiiaY, xiiaW, 4);

  // Neon Puddle Reflection on Roof
  ctx.fillStyle = COLOR_TOKENS.neonReflection;
  ctx.fillRect(xiiaX + 20, xiiaY + 1, xiiaW - 40, 2);

  // Building Vertical Seam Lines
  ctx.fillStyle = COLOR_TOKENS.shadowPurple;
  for (let sx = xiiaX + 30; sx < xiiaX + xiiaW - 20; sx += 50) {
    ctx.fillRect(sx, xiiaY + 6, 2, xiiaH - 10);
  }

  // Rooftop HVAC Unit & Red Indicator
  ctx.fillStyle = COLOR_TOKENS.surfaceHigh;
  ctx.fillRect(xiiaX + 30, xiiaY - 18, 36, 18);
  ctx.fillStyle = COLOR_TOKENS.primaryNeon;
  ctx.fillRect(xiiaX + 34, xiiaY - 12, 4, 4);

  // Antenna Mast on XIIA Tower
  ctx.strokeStyle = isXiiaHovered ? COLOR_TOKENS.primaryNeon : COLOR_TOKENS.catwalkRail;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(xiiaX + 100, xiiaY);
  ctx.lineTo(xiiaX + 100, xiiaY - 45);
  ctx.stroke();
  const xiiaBeaconBlink = Math.sin(tick * 0.1) > 0;
  ctx.fillStyle = xiiaBeaconBlink ? COLOR_TOKENS.primaryNeon : COLOR_TOKENS.surfaceContainer;
  ctx.fillRect(xiiaX + 98, xiiaY - 47, 5, 5);

  // ── ILLUMINATED ROOFTOP NEON SIGN: XIIA CORP ──
  const signX = xiiaX + 180;
  const signY = xiiaY - 32;
  const signW = 160;
  const signH = 26;

  // Support Struts
  ctx.strokeStyle = COLOR_TOKENS.catwalkBeam;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(signX + 20, xiiaY);
  ctx.lineTo(signX + 20, signY + signH);
  ctx.moveTo(signX + signW - 20, xiiaY);
  ctx.lineTo(signX + signW - 20, signY + signH);
  ctx.stroke();

  // Sign Box Frame
  ctx.fillStyle = COLOR_TOKENS.surfaceContainer;
  ctx.fillRect(signX, signY, signW, signH);
  ctx.strokeStyle = isXiiaHovered ? COLOR_TOKENS.primaryNeon : COLOR_TOKENS.primary;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(signX, signY, signW, signH);

  // Sign Text: "XIIA CORP // PROD"
  ctx.fillStyle = isXiiaHovered ? COLOR_TOKENS.white : COLOR_TOKENS.primaryNeon;
  ctx.font = 'bold 10px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('★ XIIA CORP // PROD', signX + signW / 2, signY + 16);

  // ── WORKSTATION WINDOW CUTAWAY (Inside XIIA Tower) ──
  const winX = xiiaX + 40;
  const winY = xiiaY + 30;
  const winW = 120;
  const winH = 80;

  // Office Window Frame
  ctx.fillStyle = COLOR_TOKENS.surfaceLowest;
  ctx.fillRect(winX, winY, winW, winH);
  ctx.strokeStyle = isXiiaHovered ? COLOR_TOKENS.primaryNeon : COLOR_TOKENS.surfaceHigh;
  ctx.lineWidth = 2;
  ctx.strokeRect(winX, winY, winW, winH);

  // Dual Monitored Workstation Terminal inside office
  ctx.fillStyle = COLOR_TOKENS.surfaceHigh;
  ctx.fillRect(winX + 20, winY + 45, 40, 24); // Desk base
  ctx.fillStyle = COLOR_TOKENS.rooftopTop;
  ctx.fillRect(winX + 16, winY + 43, 48, 3); // Desk top

  // Dual Screens
  ctx.fillStyle = COLOR_TOKENS.surfaceContainer;
  ctx.fillRect(winX + 20, winY + 28, 18, 14);
  ctx.fillRect(winX + 40, winY + 30, 18, 12);
  ctx.fillStyle = isXiiaHovered ? COLOR_TOKENS.accentCyan : COLOR_TOKENS.primaryNeon;
  ctx.fillRect(winX + 22, winY + 30, 14, 10);
  ctx.fillRect(winX + 42, winY + 32, 14, 8);

  // Green/Cyan Code Lines
  ctx.fillStyle = COLOR_TOKENS.white;
  ctx.fillRect(winX + 24, winY + 32, 10, 1);
  ctx.fillRect(winX + 24, winY + 35, 7, 1);
  ctx.fillRect(winX + 24, winY + 37, 9, 1);

  // Blinking Server Rack beside desk
  ctx.fillStyle = COLOR_TOKENS.surfaceLowest;
  ctx.fillRect(winX + 70, winY + 24, 16, 45);
  const serverBlink = Math.sin(tick * 0.12) > 0;
  ctx.fillStyle = serverBlink ? COLOR_TOKENS.primaryNeon : COLOR_TOKENS.accentCyan;
  ctx.fillRect(winX + 74, winY + 28, 8, 2);
  ctx.fillStyle = !serverBlink ? COLOR_TOKENS.accentCyan : COLOR_TOKENS.windowAmber;
  ctx.fillRect(winX + 74, winY + 34, 8, 2);

  // ── 2. CONNECTING INDUSTRIAL CATWALK & NEON CONDUIT ──
  const catX = xiiaX + xiiaW;
  const catY = 230;
  const catW = 180;
  const catH = 14;

  // Catwalk Beam Base
  ctx.fillStyle = COLOR_TOKENS.catwalkBeam;
  ctx.fillRect(catX, catY, catW, catH);

  // Handrail Top
  ctx.fillStyle = COLOR_TOKENS.catwalkRail;
  ctx.fillRect(catX, catY - 6, catW, 2);

  // Handrail Vertical Struts
  for (let hx = catX + 6; hx < catX + catW; hx += 14) {
    ctx.fillRect(hx, catY - 6, 2, 6);
  }

  // Diagonal Support Truss Underneath
  ctx.strokeStyle = COLOR_TOKENS.catwalkBeam;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let tx = catX; tx < catX + catW - 14; tx += 16) {
    ctx.moveTo(tx, catY + catH);
    ctx.lineTo(tx + 8, catY);
    ctx.lineTo(tx + 16, catY + catH);
  }
  ctx.stroke();

  // Suspended Overhead Neon Cables with Flowing Data Packet
  ctx.strokeStyle = isXiiaHovered ? COLOR_TOKENS.primaryNeon : COLOR_TOKENS.catwalkRail;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(xiiaX + xiiaW, xiiaY + 60);
  ctx.quadraticCurveTo(catX + catW / 2, xiiaY + 90, catX + catW, 190);
  ctx.stroke();

  // Flowing Data Packet along the cable
  const packetT = (tick * 0.015) % 1;
  const packetX = catX + packetT * catW;
  const packetY = xiiaY + 60 + Math.sin(packetT * Math.PI) * 20;
  ctx.fillStyle = COLOR_TOKENS.accentCyan;
  ctx.fillRect(packetX - 2, packetY - 2, 4, 4);

  // ── 3. INDEPENDENT FULL-STACK LABS (RIGHT BUILDING) ──
  const indepX = catX + catW;
  const indepY = 160;
  const indepW = 380;
  const indepH = 200;
  const isIndepHovered = hoveredSector === 'independent' || activeSector === 'independent';

  // Main Building Body
  ctx.fillStyle = COLOR_TOKENS.rooftopBody;
  ctx.fillRect(indepX, indepY, indepW, indepH);

  // Roof Surface Edge
  ctx.fillStyle = isIndepHovered ? COLOR_TOKENS.accentCyan : COLOR_TOKENS.rooftopTop;
  ctx.fillRect(indepX, indepY, indepW, 4);

  // Neon Puddle Reflection on Roof
  ctx.fillStyle = COLOR_TOKENS.neonReflection;
  ctx.fillRect(indepX + 20, indepY + 1, indepW - 40, 2);

  // Building Vertical Seam Lines
  ctx.fillStyle = COLOR_TOKENS.shadowPurple;
  for (let sx = indepX + 30; sx < indepX + indepW - 20; sx += 50) {
    ctx.fillRect(sx, indepY + 6, 2, indepH - 10);
  }

  // Rooftop Satellite Uplink Dish
  ctx.fillStyle = COLOR_TOKENS.surfaceContainer;
  ctx.beginPath();
  ctx.arc(indepX + 60, indepY - 14, 14, Math.PI, 0, false);
  ctx.fill();
  ctx.strokeStyle = isIndepHovered ? COLOR_TOKENS.accentCyan : COLOR_TOKENS.catwalkRail;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = COLOR_TOKENS.accentCyan;
  ctx.fillRect(indepX + 58, indepY - 28, 4, 6);

  // ── ILLUMINATED ROOFTOP NEON SIGN: INDEP LABS ──
  const indepSignX = indepX + 160;
  const indepSignY = indepY - 32;
  const indepSignW = 180;
  const indepSignH = 26;

  // Support Struts
  ctx.strokeStyle = COLOR_TOKENS.catwalkBeam;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(indepSignX + 20, indepY);
  ctx.lineTo(indepSignX + 20, indepSignY + indepSignH);
  ctx.moveTo(indepSignX + indepSignW - 20, indepY);
  ctx.lineTo(indepSignX + indepSignW - 20, indepSignY + indepSignH);
  ctx.stroke();

  // Sign Box Frame
  ctx.fillStyle = COLOR_TOKENS.surfaceContainer;
  ctx.fillRect(indepSignX, indepSignY, indepSignW, indepSignH);
  ctx.strokeStyle = isIndepHovered ? COLOR_TOKENS.accentCyan : COLOR_TOKENS.windowAmber;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(indepSignX, indepSignY, indepSignW, indepSignH);

  // Sign Text: "INDEP LABS // FULLSTACK"
  ctx.fillStyle = isIndepHovered ? COLOR_TOKENS.white : COLOR_TOKENS.accentCyan;
  ctx.font = 'bold 10px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('⚡ INDEP LABS // FULLSTACK', indepSignX + indepSignW / 2, indepSignY + 16);

  // ── R&D LABORATORY TERMINAL WINDOW (Inside Independent Labs) ──
  const rWinX = indepX + 40;
  const rWinY = indepY + 30;
  const rWinW = 120;
  const rWinH = 80;

  // Window Frame
  ctx.fillStyle = COLOR_TOKENS.surfaceLowest;
  ctx.fillRect(rWinX, rWinY, rWinW, rWinH);
  ctx.strokeStyle = isIndepHovered ? COLOR_TOKENS.accentCyan : COLOR_TOKENS.surfaceHigh;
  ctx.lineWidth = 2;
  ctx.strokeRect(rWinX, rWinY, rWinW, rWinH);

  // CRT Terminal inside Lab
  ctx.fillStyle = COLOR_TOKENS.surfaceContainer;
  ctx.fillRect(rWinX + 24, rWinY + 26, 32, 26);
  ctx.fillStyle = isIndepHovered ? COLOR_TOKENS.accentCyan : COLOR_TOKENS.shadowPurple;
  ctx.fillRect(rWinX + 26, rWinY + 28, 28, 20);

  // Prompt ">_"
  ctx.fillStyle = COLOR_TOKENS.white;
  ctx.fillRect(rWinX + 30, rWinY + 34, 6, 2);
  ctx.fillRect(rWinX + 30, rWinY + 38, 4, 2);
  if (Math.sin(tick * 0.15) > 0) {
    ctx.fillStyle = COLOR_TOKENS.accentCyan;
    ctx.fillRect(rWinX + 36, rWinY + 38, 4, 2);
  }

  // Laboratory Specimen Tank / Cylinder glowing with cyan liquid
  ctx.fillStyle = COLOR_TOKENS.surfaceLowest;
  ctx.fillRect(rWinX + 74, rWinY + 22, 22, 48);
  ctx.fillStyle = isIndepHovered ? 'rgba(0, 242, 254, 0.4)' : 'rgba(0, 242, 254, 0.15)';
  ctx.fillRect(rWinX + 76, rWinY + 24, 18, 44);
  const bubbleY = rWinY + 58 - ((tick * 0.8) % 30);
  ctx.fillStyle = COLOR_TOKENS.white;
  ctx.fillRect(rWinX + 84, bubbleY, 2, 2);

  // ── 4. PROTAGONIST CHARACTER ON OBSERVATION CATWALK ──
  const charX = catX + 80;
  const charY = catY - 24;
  const idleBob = Math.sin(tick * 0.08) > 0 ? 1 : 0;

  // Neon Ground presence ellipse
  ctx.fillStyle = COLOR_TOKENS.neonReflection;
  ctx.beginPath();
  ctx.ellipse(charX + 8, charY + 24, 9, 2.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Cyber Trenchcoat Body
  ctx.fillStyle = COLOR_TOKENS.characterCoat;
  ctx.fillRect(charX + 4, charY + 6 + idleBob, 8, 12);

  // Flowing coat-tail in wind
  ctx.fillStyle = COLOR_TOKENS.primaryNeon;
  ctx.fillRect(charX + 2, charY + 16 + idleBob, 3, 4);

  // Head & Neon Visor
  ctx.fillStyle = COLOR_TOKENS.characterSkin;
  ctx.fillRect(charX + 5, charY + 2 + idleBob, 6, 5);
  ctx.fillStyle = COLOR_TOKENS.characterVisor;
  ctx.fillRect(charX + 7, charY + 3 + idleBob, 5, 2);

  // Boots
  ctx.fillStyle = COLOR_TOKENS.characterBoots;
  ctx.fillRect(charX + 4, charY + 18 + idleBob, 3, 6);
  ctx.fillRect(charX + 9, charY + 18 + idleBob, 3, 6);

  // Downward pointer arrow triangle
  const pointerBob = Math.sin(tick * 0.12) * 3;
  const pointerY = charY - 14 + pointerBob;
  ctx.fillStyle = COLOR_TOKENS.primaryNeon;
  ctx.beginPath();
  ctx.moveTo(charX + 4, pointerY + 2);
  ctx.lineTo(charX + 12, pointerY + 2);
  ctx.lineTo(charX + 8, pointerY + 7);
  ctx.closePath();
  ctx.fill();

  // Pointer Label: [ YOU ]
  ctx.font = 'bold 8px monospace';
  ctx.fillStyle = COLOR_TOKENS.white;
  ctx.textAlign = 'center';
  ctx.fillText('YOU', charX + 8, pointerY - 1);
}
