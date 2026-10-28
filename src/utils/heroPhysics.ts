import { PlayerState, HeroKeys, RainParticle, WindowLight, PlatformRect, LocationHub } from './heroTypes';

/**
 * Generate randomized rain particles across world coordinates
 */
export function createRainParticles(count: number, worldWidth: number, worldHeight: number): RainParticle[] {
  const particles: RainParticle[] = [];
  for (let i = 0; i < count; i += 1) {
    particles.push({
      x: Math.random() * worldWidth,
      y: Math.random() * worldHeight,
      speed: 3 + Math.random() * 4,
      length: 6 + Math.random() * 8,
    });
  }
  return particles;
}

/**
 * Generate glowing window lights for distant skyline
 */
export function createWindowLights(
  worldWidth: number,
  worldHeight: number,
  palette: readonly string[]
): WindowLight[] {
  const windows: WindowLight[] = [];
  for (let bx = 0; bx < worldWidth; bx += 32) {
    const towerHeight = 160 + (Math.sin(bx * 0.05) * 80 + 80);
    const startY = worldHeight - towerHeight;
    for (let wy = startY + 20; wy < worldHeight - 80; wy += 14) {
      for (let wx = bx + 4; wx < bx + 28; wx += 8) {
        if (Math.random() > 0.35) {
          windows.push({
            x: wx,
            y: wy,
            color: palette[Math.floor(Math.random() * palette.length)],
            flickerRate: 0.02 + Math.random() * 0.04,
            flickerOffset: Math.random() * 100,
          });
        }
      }
    }
  }
  return windows;
}

/**
 * Calculate player movement, collisions with rooftops/catwalks, and physics
 */
export function updatePlayerPhysics(
  p: PlayerState,
  keys: HeroKeys,
  platforms: readonly PlatformRect[],
  worldWidth: number,
  worldHeight: number,
  tick: number,
  onJump?: () => void
): void {
  // Horizontal acceleration
  if (keys.left) {
    p.vx = Math.max(p.vx - 0.7, -4.5);
    p.facing = 'left';
    p.isMoving = true;
  } else if (keys.right) {
    p.vx = Math.min(p.vx + 0.7, 4.5);
    p.facing = 'right';
    p.isMoving = true;
  } else {
    p.vx *= 0.78;
    if (Math.abs(p.vx) < 0.1) {
      p.vx = 0;
      p.isMoving = false;
    }
  }

  // Jump impulse
  if (keys.jump && p.isGrounded) {
    p.vy = -10.5;
    p.isGrounded = false;
    if (onJump) onJump();
  }

  // Gravity
  p.vy = Math.min(p.vy + 0.55, 12);

  // Position updates
  p.x += p.vx;
  p.x = Math.max(20, Math.min(worldWidth - 40, p.x));
  p.y += p.vy;

  // Platform collision
  const charW = 16;
  const charH = 24;
  let groundedThisFrame = false;

  for (const plat of platforms) {
    const charFeet = p.y + charH;
    const prevFeet = charFeet - p.vy;
    const isWithinX = p.x + charW > plat.x && p.x < plat.x + plat.w;

    if (isWithinX && prevFeet <= plat.y + 4 && charFeet >= plat.y) {
      p.y = plat.y - charH;
      p.vy = 0;
      p.isGrounded = true;
      groundedThisFrame = true;
      break;
    }
  }

  if (!groundedThisFrame && p.y + charH < worldHeight + 50) {
    p.isGrounded = false;
  }

  // Pit recovery
  if (p.y > worldHeight + 20) {
    p.x = 120;
    p.y = 326;
    p.vx = 0;
    p.vy = 0;
    p.isGrounded = true;
  }

  // Animation cycle
  if (p.isMoving) {
    p.animFrame = Math.floor(tick / 5) % 4;
  } else {
    p.animFrame = Math.floor(tick / 16) % 2;
  }
}

/**
 * Step rain particles animation
 */
export function updateRainParticles(
  particles: RainParticle[],
  worldWidth: number,
  worldHeight: number
): void {
  for (const pt of particles) {
    pt.y += pt.speed;
    pt.x -= 0.6;
    if (pt.y > worldHeight) {
      pt.y = -10;
      pt.x = Math.random() * worldWidth;
    }
    if (pt.x < 0) pt.x = worldWidth;
  }
}

/**
 * Proximity query: detect if character is near an interactive hub
 */
export function detectNearbyLocation(
  playerX: number,
  playerY: number,
  locations: readonly LocationHub[],
  threshold = 65
): string | null {
  for (const loc of locations) {
    const centerX = loc.x + loc.w / 2;
    const centerY = loc.y + loc.h / 2;
    const dx = playerX + 8 - centerX;
    const dy = playerY + 12 - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < threshold) {
      return loc.id;
    }
  }
  return null;
}

/**
 * Pointer collision query: detect if a click/tap landed inside an interactive hub
 */
export function detectLocationAtCoord(
  worldX: number,
  worldY: number,
  locations: readonly LocationHub[]
): string | null {
  for (const loc of locations) {
    if (
      worldX >= loc.x - 10 &&
      worldX <= loc.x + loc.w + 10 &&
      worldY >= loc.y - 20 &&
      worldY <= loc.y + loc.h + 10
    ) {
      return loc.id;
    }
  }
  return null;
}
