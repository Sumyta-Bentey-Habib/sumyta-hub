# Sumyta Bentey Habib — Software Engineer Portfolio

<p align="center">
  <img src="public/branding/sumyta-logo.svg" alt="Sumyta Symbol" width="72" height="72" />
</p>

<p align="center">
  <strong>High-performance, cyberpunk-engineered digital portfolio showcasing production web applications, commercial systems, and interactive Canvas 2D simulations.</strong>
</p>

<p align="center">
  <a href="https://github.com/Sumyta-Bentey-Habib/sumyta-hub">
    <img src="https://img.shields.io/badge/Status-Production%20Verified-00f2fe?style=flat-square&logo=visualstudiocode&logoColor=black" alt="Status" />
  </a>
  <a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/Next.js-16.4.5%20(Turbopack)-black?style=flat-square&logo=next.js" alt="Next.js" />
  </a>
  <a href="https://react.dev/">
    <img src="https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind%20CSS-v4.3-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  </a>
  <a href="https://greensock.com/gsap/">
    <img src="https://img.shields.io/badge/Motion-GSAP%203.15-88CE02?style=flat-square&logo=greensock&logoColor=white" alt="GSAP" />
  </a>
</p>

<p align="center">
  <a href="https://www.linkedin.com/in/sumytabenteyhabib/">LinkedIn</a> •
  <a href="https://github.com/Sumyta-Bentey-Habib">GitHub</a> •
  <a href="mailto:sumytabenteyhabib@gmail.com">Email</a> •
  <a href="https://drive.google.com/file/d/1rf0GaKZ3mka4FoaDJb-bCU04_xOQwNd7/view?usp=sharing">Resume</a>
</p>

---

## ⚡ Overview

This repository powers the personal engineering portfolio of **Sumyta Bentey Habib**, Junior Software Developer at **XIIA** (Copenhagen, Denmark). 

Built with **Next.js 16** (Turbopack), **React 19**, **TypeScript**, and **Tailwind CSS v4**, this portfolio combines avant-garde dark sci-fi aesthetics with robust software engineering:
- **Interactive Canvas Simulations**: Real-time 2D physics engines, particle assembly systems, and procedural cityscapes.
- **Production Systems Showcase**: The **XIIA Collection**, detailing commercial contributions across high-traffic web and mobile applications.
- **Disciplined Design Architecture**: Strict design token system, zero hardcoded magic numbers, responsive layouts, and full `prefers-reduced-motion` accessibility compliance.

---

## 🎮 Key Systems & Interactive Architecture

### 1. Hero Workstation & Skyline Simulator (`/hero`)
- **Procedural Canvas 2D Engine**: Dynamic cyberpunk skyline rendering with multi-layer parallax, vehicle headlights, weather particles, and reactive rooftop catwalk lighting.
- **Interactive Physics Character**: Kinematic physics simulation with gravity, ground collision, velocity damping, and keyboard/touch navigation across rooftop sectors.
- **Proximity HUD & Diagnostics**: Real-time HUD displaying coordinates, velocity telemetry, and workstation trigger zones.
- **Interactive Modals**: Workstation Terminal Modal (displaying developer dossier and credentials) and Sector Exit Modal.

### 2. The XIIA Collection (`/selected-work`)
Commercial applications engineered during professional engagement at **XIIA** (Copenhagen, Denmark):

| Project | Sector / Track | Category | Focus Areas |
| :--- | :--- | :--- | :--- |
| **Soundmade** | `TRACK // 01` | Mobile Music Platform | Web playback, mobile UI, payment workflows (`React Native`, `Expo`, `TypeScript`, `iOS`, `Android`) |
| **Kiibee** | `TRACK // 02` | Digital Content & Commerce | Protected content access, CMS integration (`React`, `Next.js`, `TypeScript`, `REST APIs`) |
| **Foodime** | `TRACK // 03` | Restaurant POS & Operations | POS admin workflows, add-on features, Twilio integration (`React`, `Next.js`, `TypeScript`) |
| **Wewaive** | `TRACK // 04` | Royalty-Free Music Platform | Curated catalogues, playlists, subscription streaming (`React Native`, `Expo`, `TypeScript`, `iOS`, `Android`) |

#### Particle Assembly Engine (`selectedWorkParticleEngine.ts`)
Each project card features an interactive Canvas 2D particle simulation that samples high-resolution artwork pixels and animates them using project-specific physics:
- **Soundmade**: Sinusoidal harmonic waveforms with frequency pulse oscillations.
- **Kiibee**: Layered editorial document sheets cascading from diagonal planes.
- **Foodime**: Orthogonal matrix convergence mimicking receipt paper and terminal buses.
- **Wewaive**: Radial spiral trajectory blending vinyl groove dispersion and wave oscillation.

### 3. Living Skills Street (`/skills`)
- **Procedural Street Simulation**: Interactive Canvas 2D scene featuring autonomous pedestrian AI, daytime/nighttime lighting cycles, and glowing neon storefront signage.
- **Technical Competency Roster**: Categorized technical stacks spanning Frontend, Mobile, Backend, and Tooling.

### 4. Full-Stack Editorial Projects Archive (`/projects`)
- Comprehensive case studies detailing architectural choices, monorepo setups, and key deliverables for full-stack applications (Studify, GoAthlete, Quadra Social Connect, etc.).

### 5. Custom Systems & Accessibility
- **Custom Cursor Engine**: GSAP-driven trailing cursor with contextual hover states (`CustomCursor.tsx`).
- **Telemetry Preloader**: Hardware-accelerated clip-path loading sequence (`Preloader.tsx`).
- **Accessibility Engine**: Full support for `prefers-reduced-motion` with graceful degradation to crisp static illustrations.

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 16.4.5 | Server/Client App Router, Turbopack bundler, edge-ready architecture |
| **UI Library** | React 19.2.4 | Concurrent rendering, modern hooks, and refactored component lifecycles |
| **Language** | TypeScript 5.9.3 | Strict end-to-end type safety, readonly immutable data contracts |
| **Styling** | Tailwind CSS v4.3.4 | Utility-first styling with `@tailwindcss/postcss` and CSS design tokens |
| **Animation & Motion**| GSAP 3.15.1 + ScrollTrigger | High-performance timeline animations, matchMedia responsiveness |
| **Graphics** | HTML5 Canvas 2D | Custom physics loops, particle rasterization, and skyline rendering |
| **Package Manager**| pnpm | Fast, disk-efficient dependency management (`pnpm-lock.yaml`) |

---

## 📁 Project Structure

```
sumyta-hub/
├── public/
│   ├── branding/                  # SVG logos, monograms, and avatars
│   ├── images/
│   │   ├── selected-work/         # XIIA collection 1200x669 3D illustrations
│   │   │   ├── soundmade-visual.png
│   │   │   ├── kiibee-visual.png
│   │   │   ├── foodime-visual.png
│   │   │   └── wewaive-visual.png
│   │   └── user_portrait.jpeg
│   └── projects/                  # Editorial project screenshots
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout with font configuration & metadata
│   │   ├── page.tsx               # Single-page portfolio orchestration
│   │   └── globals.css            # Base stylesheet with Tailwind v4 directives
│   ├── components/
│   │   ├── hero/                  # City skyline canvas & character physics workstation
│   │   ├── about/                 # Technical profile & status telemetry
│   │   ├── experience/            # STATION XIIA timeline & employment milestones
│   │   ├── selected-work/         # XIIA 2-column cards grid & particle assembly
│   │   ├── projects/              # Full-stack editorial project showcase
│   │   ├── skills/                # Living Skills Street canvas & tech roster
│   │   ├── footer/                # Skyline footer & communication relay channels
│   │   ├── CustomCursor.tsx       # GSAP-driven laser trailing cursor
│   │   └── Preloader.tsx          # Initialization sequence
│   └── utils/
│       ├── tokens.ts              # Global color token constants (COLOR_TOKENS)
│       ├── constants.ts           # Re-exported constants and domain configurations
│       ├── useReducedMotion.ts    # Accessibility hook for motion preferences
│       ├── data/                  # Immutable readonly project data models
│       ├── hero/                  # Hero physics, renderer, and simulation loops
│       ├── selected-work/         # Particle engine and scroll motion triggers
│       └── skills/                # Living street pedestrian AI and canvas engine
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed locally:
- **Node.js**: `v20.0.0` or higher
- **pnpm**: `v9.0.0` or higher (`npm install -g pnpm`)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Sumyta-Bentey-Habib/sumyta-hub.git
   cd sumyta-hub
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Launch the development server**:
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Quality & Verification

Run verification scripts to ensure code health:

```bash
# Typecheck TypeScript codebase
npx tsc --noEmit

# Run ESLint linter
pnpm lint

# Production build
pnpm build
```

---

## 🎨 Design Philosophy & Coding Standards

- **Zero Hardcoded Magic Values**: All colors and theme attributes reference canonical tokens from [`src/utils/tokens.ts`](file:///Users/sumytabenteyhabib/Developer/sumyta-hub/src/utils/tokens.ts).
- **Performance Budget**: Canvas loops decouple physics calculations from DOM re-renders using `useRef` and `requestAnimationFrame`. Offscreen canvases sample imagery without UI thread blocking.
- **Responsive Layout**: Designed mobile-first, supporting seamless viewing across smartphones, tablets, laptops, and ultra-wide displays.
- **Accessibility First**: Interactive canvas elements feature aria labels, screen-reader descriptions, and reduced-motion fallbacks.

---

## 📬 Contact & Connect

- **Engineer**: Sumyta Bentey Habib
- **Role**: Junior Software Developer @ XIIA
- **Location**: Copenhagen, Denmark / Remote
- **Email**: [sumytabenteyhabib@gmail.com](mailto:sumytabenteyhabib@gmail.com)
- **LinkedIn**: [linkedin.com/in/sumytabenteyhabib](https://www.linkedin.com/in/sumytabenteyhabib/)
- **GitHub**: [github.com/Sumyta-Bentey-Habib](https://github.com/Sumyta-Bentey-Habib)

---

<p align="center">
  <sub>© 2025–2026 Sumyta Bentey Habib. Crafted with Next.js, React, Tailwind CSS, and GSAP.</sub>
</p>
