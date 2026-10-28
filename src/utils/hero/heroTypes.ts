export interface PlayerState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  isGrounded: boolean;
  facing: 'left' | 'right';
  animFrame: number;
  isMoving: boolean;
}

export interface HeroKeys {
  left: boolean;
  right: boolean;
  jump: boolean;
}

export interface RainParticle {
  x: number;
  y: number;
  speed: number;
  length: number;
}

export interface WindowLight {
  x: number;
  y: number;
  color: string;
  flickerRate: number;
  flickerOffset: number;
}

export interface PlatformRect {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
}

export interface LocationHub {
  readonly id: string;
  readonly title: string;
  readonly sublabel: string;
  readonly actionType: string;
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
  readonly href?: string;
  readonly company?: string;
  readonly role?: string;
  readonly desc?: string;
}
