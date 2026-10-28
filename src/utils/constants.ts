export const HERO_DATA = {
  name: 'SUMYTA',
  role: 'SOFTWARE DEVELOPER',
  explorePrompt: 'EXPLORE CITY',
  viewWorkAction: {
    label: 'VIEW WORK ↗',
    href: '#work',
    ariaLabel: 'Navigate to selected projects and casework',
  },
  topNav: [
    { label: 'WORK', href: '#work', isExternal: false, ariaLabel: 'Navigate to selected projects' },
    { label: 'GITHUB', href: 'https://github.com/Sumyta-Bentey-Habib', isExternal: true, ariaLabel: 'Open GitHub profile in a new tab' },
    { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/sumytabenteyhabib/', isExternal: true, ariaLabel: 'Open LinkedIn profile in a new tab' },
  ] as const,
  worldWidth: 1600,
  worldHeight: 520,
  modalRoleHeading: 'VERIFIED ROLE // PRODUCTION',
  modalDossierTag: 'SEC // XIIA-PROD-01',
  modalVerifiedBadge: 'VERIFIED REMOTE ROLE',
  modalDismissAction: 'DISMISS [ESC]',
  modalCompanyLabel: 'ORGANIZATION',
  modalRoleLabel: 'TITLE',
  modalScopeLabel: 'ENGINEERING FOCUS',
  modalActionLabel: 'VIEW IN EXPERIENCE SECTION ↗',
  modalActionHref: '#experience',
  moveLeftAria: 'Move character left',
  moveRightAria: 'Move character right',
  jumpAria: 'Jump character',
  interactAria: 'Interact with current location',
  canvasAriaLabel: 'Interactive pixel-art cyberpunk city explorer navigation',
  closeModalAria: 'Close role details modal',
  interactKeyHint: '[SPACE / ENTER / CLICK]',
  nearbyPrompt: 'INTERACT',
  announcementInitial: 'Interactive pixel city loaded. Use A/D or arrows to move, Space or W to jump. Click locations or top navigation to explore.',
  announcementWarp: 'Entering projects portal, navigating to work section.',
  announcementWorkstation: 'Opened XIIA verified role workstation.',
  announcementJump: 'Character jumped.',
  announcementNavigated: 'Navigated to destination link.',
  announcementLocationNearbyPrefix: 'Near ',
  controlsHintDesktop: 'A / D / ← → MOVE · SPACE / W JUMP · CLICK LOCATIONS TO INTERACT',
  controlsHintMobile: 'TAP LOCATIONS OR USE CONTROLS',
  jumpButtonLabel: 'JUMP',
  leftButtonLabel: '◀',
  rightButtonLabel: '▶',
  interactButtonLabel: 'ENGAGE',
  statusOnline: 'SYS // ONLINE',
  closeModalLabel: 'CLOSE [ESC]',
  heroNavAria: 'Hero navigation',
  bottomNavAria: 'Quick social and document navigation',
  playerPointerLabel: 'YOU',
  playerPointerSymbol: '▼',
  bottomLinks: [
    { label: 'GITHUB ↗', href: 'https://github.com/Sumyta-Bentey-Habib', isExternal: true, ariaLabel: 'Open GitHub profile in a new tab' },
    { label: 'LINKEDIN ↗', href: 'https://www.linkedin.com/in/sumytabenteyhabib/', isExternal: true, ariaLabel: 'Open LinkedIn profile in a new tab' },
    { label: 'RESUME ↗', href: '/resume.pdf', isExternal: true, ariaLabel: 'Open Resume in a new tab' },
  ] as const,
  interactSymbol: '▲',
  modalId: 'modal-role-title',
  locations: [
    {
      id: 'xiia',
      title: 'XIIA WORKSTATION',
      sublabel: 'PROD RUNTIME',
      company: 'XIIA',
      role: 'Junior Software Developer',
      desc: 'Contributing to production web and mobile applications at XIIA. Focused on UI implementation, frontend feature development, refactoring existing UI components, debugging frontend issues, and building responsive interfaces.',
      actionType: 'reveal',
      x: 200,
      y: 298,
      w: 64,
      h: 52,
    },
    {
      id: 'github',
      title: 'GITHUB TERMINAL',
      sublabel: 'CODE ARCHIVE',
      href: 'https://github.com/Sumyta-Bentey-Habib',
      actionType: 'link',
      x: 550,
      y: 236,
      w: 52,
      h: 54,
    },
    {
      id: 'linkedin',
      title: 'LINKEDIN SIGNAL TOWER',
      sublabel: 'NETWORK BEACON',
      href: 'https://www.linkedin.com/in/sumytabenteyhabib/',
      actionType: 'link',
      x: 900,
      y: 130,
      w: 48,
      h: 100,
    },
    {
      id: 'portal',
      title: 'PROJECTS PORTAL',
      sublabel: 'CASEWORK GATEWAY',
      href: '#work',
      actionType: 'portal',
      x: 1260,
      y: 270,
      w: 58,
      h: 70,
    },
    {
      id: 'endpoint',
      title: 'EXTRACTION PAD',
      sublabel: 'END POINT',
      actionType: 'ending',
      x: 1370,
      y: 318,
      w: 64,
      h: 22,
    },
  ] as const,
  endingModalId: 'ending-modal-title',
  endingHeading: 'MISSION COMPLETE // LEVEL CLEARED',
  endingSubheading: 'CITY NAVIGATION CONCLUDED',
  endingDescription: 'You explored the neon city rooftops and reached the ending extraction point. Sumyta’s developer casework and engineering dossiers are ready for inspection.',
  endingScoreLabel: 'SECTOR HUBS',
  endingScoreValue: '4 / 4 SYNCHRONIZED',
  endingRoleLabel: 'VERIFIED OPERATOR',
  endingRoleValue: 'Junior Software Developer @ XIIA',
  endingPrimaryAction: 'VIEW PROJECTS & CASEWORK ↗',
  endingSecondaryAction: 'KEEP ROAMING CITY ↺',
  endingAriaLabel: 'Mission complete dialogue',
  endingBeaconSymbol: '★',
  endingBeaconLabel: 'END POINT',
  announcementEnding: 'Ending point reached! Mission accomplished. City navigation completed.',
  rooftops: [
    { x: 40, y: 350, w: 320, h: 140 },
    { x: 420, y: 290, w: 290, h: 200 },
    { x: 770, y: 230, w: 300, h: 260 },
    { x: 1130, y: 340, w: 340, h: 150 },
  ] as const,
  catwalks: [
    { x: 340, y: 330, w: 95, h: 14 },
    { x: 695, y: 270, w: 90, h: 14 },
    { x: 1055, y: 290, w: 90, h: 14 },
  ] as const,
} as const;

export const COLOR_TOKENS = {
  primary: '#ff8d90',
  primaryDim: '#e31c40',
  primaryNeon: '#ff2d75',
  primaryContainer: '#ff757b',
  onPrimary: '#640014',
  secondary: '#e5e2e1',
  secondaryDim: '#d7d4d3',
  surfaceLowest: '#050508',
  surfaceNight: '#0a0812',
  surfaceContainer: '#120f1c',
  surfaceHigh: '#1c162b',
  shadowPurple: '#160d24',
  shadowDark: '#0e0817',
  outline: '#757575',
  outlineVariant: '#484848',
  white: '#ffffff',
  black: '#000000',
  accentCyan: '#00f2fe',
  accentYellow: '#ffd200',
  windowAmber: '#ffb86c',
  finishGold: '#ffd200',
  finishGlow: 'rgba(255, 210, 0, 0.22)',
  skylineFar: '#0c0817',
  skylineMid: '#120c24',
  skylineNear: '#1a1033',
  rooftopTop: '#241646',
  rooftopBody: '#0f091f',
  catwalkBeam: '#2c1c4f',
  catwalkRail: '#4b3080',
  rainParticle: 'rgba(255, 45, 117, 0.35)',
  neonReflection: 'rgba(255, 45, 117, 0.08)',
  characterCoat: '#140f24',
  characterSkin: '#ffc599',
  characterVisor: '#ff2d75',
  characterBoots: '#ff8d90',
  portalVortexOuter: '#ff2d75',
  portalVortexInner: '#00f2fe',
  asphaltDark: '#0b0914',
  asphaltLight: '#141024',
  laneMarking: 'rgba(255, 255, 255, 0.45)',
  headlightBeam: 'rgba(0, 242, 254, 0.18)',
  taillightBeam: 'rgba(255, 45, 117, 0.28)',
  amberGlow: 'rgba(255, 184, 108, 0.25)',
  trafficCarWhite: '#e5e2e1',
  trafficCarCyan: '#00f2fe',
  trafficCarPink: '#ff2d75',
  guardrailBeam: '#261b42',
} as const;

export const PRELOADER_DATA = {
  initializingTag: 'INITIALIZING SYSTEM',
  completeTag: 'SYSTEM READY',
} as const;

export const NAVBAR_DATA = {
  monogram: 'S.B.H.',
  navLinks: [
    { label: 'Work', href: '#work' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ] as const,
  connectLabel: 'Connect',
} as const;

export const SOCIAL_LINKS = {
  github: 'https://github.com/Sumyta-Bentey-Habib',
  linkedin: 'https://www.linkedin.com/in/sumytabenteyhabib/',
  email: 'mailto:sumytabenteyhabib@gmail.com',
  resume: '/resume.pdf',
} as const;

export const ABOUT_DATA = {
  sectionId: 'about',
  sectionTag: '01 // PERSPECTIVE',
  title: 'BEHIND THE INTERFACE',
  titleAccent: '.',
  subtitle: 'FULL-STACK DEVELOPER // FRONTEND EXPERIENCES & BACKEND SYSTEMS',
  statusTag: 'SEC // DEV-PROFILE',
  statusOnline: 'SYS // ONLINE',
  portraitCaption: {
    name: 'SUMYTA BENTEY HABIB',
    role: 'FULL-STACK DEVELOPER',
    organization: 'XIIA & INDEPENDENT',
    degree: 'CSE GRADUATE',
    location: 'BAGERHAT, BANGLADESH',
    status: 'ACTIVE IN PRODUCTION',
  },
  headline: {
    prefix: 'I am a Full-Stack Developer crafting',
    highlight: 'responsive, interactive web applications',
    suffix: 'and resilient backend systems.',
    full: 'I am a Full-Stack Developer crafting responsive, interactive web applications and resilient backend systems.',
  },
  paragraphs: [
    'I build responsive, interactive web applications with a strong focus on intuitive user experiences and practical functionality. Working across both professional codebases at XIIA and self-directed projects, I develop frontend interfaces and modular, reusable component systems that keep codebases clean, maintainable, and accessible.',
    'On the backend, I engineer RESTful APIs, implement secure authentication flows, and handle database integration across MongoDB and Firebase, bringing real-time features to life with Socket.io. I care deeply about maintainable code and the total user experience, continually learning and expanding my engineering capabilities through production delivery and independent exploration.',
  ],
  metadataGrid: [
    {
      index: '01',
      label: 'DEVELOPER IDENTITY',
      value: 'Full-Stack Developer bridging user experiences & server architecture',
      accentColor: 'border-l-primary',
    },
    {
      index: '02',
      label: 'FRONTEND CRAFT',
      value: 'Responsive web apps, interactive UI & reusable component systems',
      accentColor: 'border-l-accent-cyan',
    },
    {
      index: '03',
      label: 'BACKEND & DATA',
      value: 'RESTful APIs, authentication, MongoDB, Firebase & Socket.io',
      accentColor: 'border-l-primary-neon',
    },
    {
      index: '04',
      label: 'ENGINEERING VALUES',
      value: 'Maintainable code, practical functionality & continuous learning',
      accentColor: 'border-l-window-amber',
    },
  ],
  specs: [
    { label: 'IDENTITY', value: 'FULL-STACK DEVELOPER' },
    { label: 'ENGINEERING', value: 'FRONTEND & BACKEND' },
    { label: 'LOCATION', value: 'BAGERHAT, BANGLADESH' },
    { label: 'STATUS', value: 'EMPLOYED // XIIA' },
  ],
  trajectoryAction: {
    label: 'EXPLORE EXPERIENCE TIMELINE ↗',
    href: '#experience',
    ariaLabel: 'Jump to experience timeline section',
  },
  image: '/images/user_portrait.jpeg',
  imageAlt: 'Sumyta Bentey Habib — Full-Stack Developer',
} as const;

export interface LivingSkillItem {
  readonly id: string;
  readonly name: string;
  readonly spec: string;
  readonly category: 'frontend' | 'backend' | 'database' | 'tools';
  readonly badge: string;
  readonly subcategory?: 'NoSQL' | 'SQL';
}

export interface LivingSkillGroup {
  readonly id: 'frontend' | 'backend' | 'database' | 'tools';
  readonly code: string;
  readonly title: string;
  readonly subtitle: string;
  readonly accent: 'primary' | 'accentCyan' | 'windowAmber' | 'finishGold';
  readonly stationName: string;
  readonly stationSymbol: string;
  readonly stationXPercent: number;
  readonly skills: readonly LivingSkillItem[];
}

export const SKILLS_DATA = {
  sectionId: 'skills',
  sectionTag: '03 // LIVING PIXEL SCENE',
  title: 'CORE EXPERTISE',
  titleAccent: '.',
  kicker: 'LIVING CYBERPUNK BOULEVARD // REAL-TIME TECH SCENE',
  description:
    'I build full-stack web applications, combining responsive frontend experiences with backend logic, API integration, authentication, and database-driven functionality.',
  subtitle:
    'A living full-stack environment where interfaces, servers, databases, and deployment platforms operate continuously across the cyberpunk streetscape.',
  patrolStatus: 'PATROLLING CYBERWAY 03',
  liveStatus: '60 FPS LIVING SCENE',
  interactionHint: 'CLICK OR HOVER ANY TECH / STATION TO DISPATCH SUMYTA',
  playerPointerLabel: 'YOU',
  inspectingLabel: 'INSPECTING // ',
  activeTargetPrefix: 'TARGET // ',
  categories: [
    {
      id: 'frontend',
      code: '01 // FRONTEND',
      title: 'FRONTEND',
      subtitle: 'Client Interface Runtimes & Reactive Systems',
      accent: 'primary',
      stationName: 'REACT & NEXT INTERFACE HUB',
      stationSymbol: '⚛',
      stationXPercent: 0.16,
      skills: [
        {
          id: 'react',
          name: 'React',
          spec: 'Component architecture, reactive state synchronization, custom hooks & virtual DOM optimization',
          category: 'frontend',
          badge: 'UI CORE',
        },
        {
          id: 'nextjs',
          name: 'Next.js',
          spec: 'App Router, hybrid server-side rendering (SSR), static page generation & client hydration',
          category: 'frontend',
          badge: 'HYBRID SSR',
        },
        {
          id: 'javascript',
          name: 'JavaScript',
          spec: 'Modern ES6+ syntax, asynchronous event loop, promises, closures & browser DOM performance',
          category: 'frontend',
          badge: 'LANGUAGE',
        },
        {
          id: 'typescript',
          name: 'TypeScript',
          spec: 'Strict type systems, interface contracts, compile-time validation & codebase maintainability',
          category: 'frontend',
          badge: 'TYPING',
        },
        {
          id: 'tailwind',
          name: 'Tailwind CSS',
          spec: 'Utility-first styling, design token systems, dark theme architectures & fluid responsive layouts',
          category: 'frontend',
          badge: 'CSS ENGINE',
        },
      ],
    },
    {
      id: 'backend',
      code: '02 // BACKEND',
      title: 'BACKEND',
      subtitle: 'Server Infrastructure & RESTful API Architecture',
      accent: 'accentCyan',
      stationName: 'NODE & EXPRESS POWER SUBSTATION',
      stationSymbol: '⬢',
      stationXPercent: 0.40,
      skills: [
        {
          id: 'nodejs',
          name: 'Node.js',
          spec: 'Asynchronous event-driven JavaScript server runtime & high-concurrency request pipelines',
          category: 'backend',
          badge: 'RUNTIME',
        },
        {
          id: 'express',
          name: 'Express.js',
          spec: 'RESTful routing architecture, middleware orchestration, request pipelines & controllers',
          category: 'backend',
          badge: 'FRAMEWORK',
        },
        {
          id: 'rest-apis',
          name: 'REST APIs',
          spec: 'Structured JSON resource endpoints, HTTP protocol verbs, error schemas & payload validation',
          category: 'backend',
          badge: 'API CONTRACT',
        },
      ],
    },
    {
      id: 'database',
      code: '03 // DATABASE',
      title: 'DATABASE',
      subtitle: 'NoSQL Document Stores & Relational SQL',
      accent: 'windowAmber',
      stationName: 'DATA PERSISTENCE SILO',
      stationSymbol: '🗄',
      stationXPercent: 0.65,
      skills: [
        {
          id: 'mongodb',
          name: 'MongoDB',
          spec: 'Document-oriented NoSQL schemas, indexing strategies, aggregation pipelines & Mongoose modeling',
          category: 'database',
          badge: 'NOSQL',
          subcategory: 'NoSQL',
        },
        {
          id: 'firestore',
          name: 'Firebase Firestore',
          spec: 'Real-time NoSQL cloud database with live listeners, subcollection modeling & Firebase Auth integration',
          category: 'database',
          badge: 'NOSQL',
          subcategory: 'NoSQL',
        },
        {
          id: 'postgresql',
          name: 'PostgreSQL',
          spec: 'Relational SQL database with structured schemas, foreign keys, transactions & query optimization',
          category: 'database',
          badge: 'SQL',
          subcategory: 'SQL',
        },
      ],
    },
    {
      id: 'tools',
      code: '04 // TOOLS & PLATFORMS',
      title: 'TOOLS & PLATFORMS',
      subtitle: 'Version Control, Testing & Cloud Hosting',
      accent: 'finishGold',
      stationName: 'GIT & VERCEL DEPLOYMENT DOCK',
      stationSymbol: '▲',
      stationXPercent: 0.88,
      skills: [
        {
          id: 'git',
          name: 'Git',
          spec: 'Distributed version control, branch lifecycles, rebasing & repository state tracking',
          category: 'tools',
          badge: 'VERSION CONTROL',
        },
        {
          id: 'github',
          name: 'GitHub',
          spec: 'Collaborative code reviews, team pull requests, release tagging & continuous integration',
          category: 'tools',
          badge: 'COLLABORATION',
        },
        {
          id: 'postman',
          name: 'Postman',
          spec: 'REST endpoint validation, payload inspection, response benchmarks & integration tests',
          category: 'tools',
          badge: 'API TOOLING',
        },
        {
          id: 'vercel',
          name: 'Vercel',
          spec: 'Production deployments, edge network caching, continuous branch preview builds & DNS setup',
          category: 'tools',
          badge: 'DEPLOYMENT',
        },
      ],
    },
  ] as readonly LivingSkillGroup[],
} as const;

export interface ExperienceSector {
  readonly id: string;
  readonly number: string;
  readonly sectorCode: string;
  readonly districtTitle: string;
  readonly districtSub: string;
  readonly beaconColor: 'primary' | 'accentCyan';
  readonly period: string;
  readonly role: string;
  readonly company: string;
  readonly location: string;
  readonly active: boolean;
  readonly statusLabel: string;
  readonly statusSublabel: string;
  readonly description: string;
  readonly focusCategory: string;
  readonly focusItems: readonly string[];
  readonly techCategory: string;
  readonly technologies: readonly string[];
}

export const EXPERIENCE_DATA = {
  sectionId: 'experience',
  sectionTag: '02 // EXPERIENCE',
  title: 'EXPERIENCE',
  titleAccent: '.',
  subtitle: 'PRODUCTION SOFTWARE ENGINEERING & FULL-STACK SYSTEM DEVELOPMENT',
  cityRegion: 'SECTOR 02 // CHRONOLOGY',
  signalOnline: 'VERIFIED // PRODUCTION',
  archivePeriod: '2024 — PRESENT',
  archiveLabel: 'TIMELINE',
  labels: {
    deliverablesSuffix: 'KEY RESPONSIBILITIES',
    techSpecificationsSuffix: 'CORE TECHNOLOGIES',
    recordPrefix: 'EXP_',
    indexPrefix: 'TRACK // ',
    liveNode: 'PRODUCTION ROLE',
    researchNode: 'SELF-DIRECTED ARCHITECTURE',
    caseworkPrompt: 'VIEW FEATURED PROJECTS ↗',
    caseworkHref: '#work',
    verificationNote:
      'Verified production engineering at XIIA distinguished from self-directed casework.',
  },
  experiences: [
    {
      id: '01',
      number: '01',
      sectorCode: 'SEC: 02 // XIIA_TOWER',
      districtTitle: 'XIIA CORPORATE COMPLEX',
      districtSub: 'PRODUCTION ENGINEERING DISTRICT',
      beaconColor: 'primary',
      period: '2026 — PRESENT',
      role: 'Junior Software Developer',
      company: 'XIIA',
      location: 'Copenhagen, Denmark',
      active: true,
      statusLabel: 'Currently Active',
      statusSublabel: 'Production Deployment',
      description:
        'Contributing to production web and mobile applications, primarily focused on frontend implementation, feature development, component refactoring, debugging, and UI polish across platforms.',
      focusCategory: 'Production Responsibilities',
      focusItems: [
        'Implementing UI from product designs and Figma requirements',
        'Developing modular frontend features across web and mobile interfaces',
        'Refactoring existing UI components for clarity and maintainability',
        'Debugging frontend issues across screens and user flows',
        'Engineering responsive interfaces across diverse viewports',
        'Collaborating with developers and designers using Git-based workflows',
      ],
      techCategory: 'Production Technologies',
      technologies: ['React', 'React Native', 'Next.js', 'JavaScript', 'TypeScript', 'Git'],
    },
    {
      id: '02',
      number: '02',
      sectorCode: 'SEC: 03 // LAB_INDEPENDENT',
      districtTitle: 'INDEPENDENT RESEARCH LABS',
      districtSub: 'FULL-STACK ARCHITECTURE DISTRICT',
      beaconColor: 'accentCyan',
      period: '2024 — PRESENT',
      role: 'Full-Stack Developer',
      company: 'Independent Projects',
      location: 'Self-Directed / Remote Lab',
      active: false,
      statusLabel: 'Self-Directed Track',
      statusSublabel: 'Continuous Exploration',
      description:
        'Architecting full-stack applications independently to explore distributed system patterns, API design, database schemas, authentication, and real-time synchronization.',
      focusCategory: 'Architectural Scope',
      focusItems: [
        'Building responsive React and Next.js client applications',
        'Designing RESTful backend APIs and middleware with Node.js and Express',
        'Document modeling, indexing, and persistence with MongoDB',
        'Implementing secure authentication and Firebase integration',
        'Bi-directional real-time messaging and events using Socket.io',
        'Building comprehensive administrative suites and CRUD workflows',
        'Deploying and maintaining production applications on cloud hosting',
      ],
      techCategory: 'Full-Stack Stack',
      technologies: [
        'React',
        'Next.js',
        'Node.js',
        'Express',
        'MongoDB',
        'Firebase',
        'Socket.io',
        'Tailwind CSS',
        'Vite',
        'REST APIs',
      ],
    },
  ],
} as const;

export interface ProjectItem {
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly subtitle: string;
  readonly category: string;
  readonly isGroupProject: boolean;
  readonly groupBadge?: string;
  readonly role: string;
  readonly description: string;
  readonly technologies: readonly string[];
  readonly image: string;
  readonly imageAlt: string;
  readonly links: {
    readonly demo?: string;
    readonly github?: string;
  };
  readonly layoutVariant?: 'default' | 'offset-top' | 'offset-bottom' | 'split-reverse';
  readonly exitCode: string;
  readonly waypointLabel: string;
  readonly landmarkTitle: string;
  readonly districtType: string;
  readonly themeAccent: 'primary' | 'windowAmber' | 'accentCyan' | 'finishGold';
}

export const PROJECTS_DATA = {
  sectionTag: '04 // NEON HIGHWAY JOURNEY',
  title: 'SELECTED CASEWORK',
  titleAccent: '.',
  subtitle: 'A LIVING CYBERPUNK HIGHWAY THROUGH VERIFIED PRODUCTION APPLICATIONS & BENCHMARKS',
  kicker: 'ROUTE 101 // NEON EXPRESSWAY',
  highwayStatus: 'HIGHWAY ACTIVE // 4 DESTINATIONS ONLINE',
  cruisingSpeed: 'CRUISING SPEED: 120 KM/H',
  interactionHint: 'CLICK ANY HIGHWAY EXIT OR DESTINATION TO CRUISE',
  period: '2024 — 2026',
  indexPrefix: 'EXIT // ',
  roleLabel: 'ROLE / ARCHITECTURE',
  techLabel: 'TECH STACK SPECIFICATIONS',
  demoButtonText: 'LIVE DEMO ↗',
  githubButtonText: 'SOURCE CODE ↗',
  groupProjectBadge: 'GROUP PROJECT',
  archiveTermination: '// ARCHIVE TERMINATION',
  repositoryArchive: '// REPOSITORY ARCHIVE',
  viewProjectLabel: 'EXPLORE INTERFACE',
  leftWorldTag: 'DEVELOPER SPECIFICATION',
  rightWorldTag: 'RUNTIME INTERFACE',
  scrollProgressLabel: 'HIGHWAY PROGRESSION',
  assemblySequenceLabel: 'DESTINATION DOCKED',
  statusAssembled: 'DOCKING COMPLETE',
  statusAssembling: 'CRUISING HIGHWAY...',
  projects: [
    {
      id: '01',
      number: '01',
      title: 'Quadra',
      subtitle: 'Real-Time Social Media Platform',
      category: 'Full-Stack Web Application',
      isGroupProject: true,
      groupBadge: 'GROUP PROJECT',
      role: 'Frontend Architecture, Real-Time Sync & Responsive UI',
      description:
        'A modern, full-stack social media application providing a comprehensive social networking experience with real-time messaging, post interactions, and instant notifications.',
      technologies: ['React', 'Next.js', 'Node.js', 'Express', 'Socket.io', 'Tailwind CSS'],
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBgfgH26KGWetiguqmMF27CcsqRSNoFn0nkZ8UZWsOL6tBs37L7F-0vfUPdAKb3ZXbeFHM49orQDRpIO_UzGb1lCUzgK8EudKjCrh9vCp6FwsSoSSu46JfKhU7eZwusOkOniIObJadhl5MDHgCTU39YpI724wg3NAJmV3LFTX0x8bZhoIrZldEnBwe1LPYDc9LXANJUVJSZQPh_jhCIuVlhY2Bi1KfxqCi1OGWPQ6TjHXvx3JN-wuz1KCSEoBgAqEyVH_gBCXhTH10',
      imageAlt: 'Quadra Social Media Platform interface',
      links: {
        demo: 'https://quadra-blush.vercel.app/',
        github: 'https://github.com/Sumyta-Bentey-Habib/Quadra',
      },
      layoutVariant: 'default',
      exitCode: 'EXIT 01',
      waypointLabel: 'KM 1.4 // SOCIAL BROADCAST SECTOR',
      landmarkTitle: 'QUADRA COMMUNICATIONS NEXUS',
      districtType: 'Communications & Real-Time Sync District',
      themeAccent: 'primary',
    },
    {
      id: '02',
      number: '02',
      title: 'Espresso Emporium',
      subtitle: 'Curated Coffee Marketplace & Discovery',
      category: 'E-Commerce Platform',
      isGroupProject: false,
      role: 'Full-Stack Development, Firebase Integration & Catalog Flow',
      description:
        'A premium coffee platform where enthusiasts browse and review specialty roasts, while verified sellers showcase curated offerings with real-time catalog updates.',
      technologies: ['React', 'Firebase', 'Tailwind CSS', 'Socket.io'],
      image: '/images/espresso.png',
      imageAlt: 'Luxury coffee branding and e-commerce interface',
      links: {
        demo: 'https://espresso-emporium-8d4f7.web.app/',
        github: 'https://github.com/Sumyta-Bentey-Habib/Espresso-Emporium',
      },
      layoutVariant: 'offset-top',
      exitCode: 'EXIT 02',
      waypointLabel: 'KM 3.8 // COMMERCE DISTRICT',
      landmarkTitle: 'ESPRESSO ROASTERY & MARKET',
      districtType: 'Curated E-Commerce & Specialty Roastery',
      themeAccent: 'windowAmber',
    },
    {
      id: '03',
      number: '03',
      title: 'Studify',
      subtitle: 'MERN Learning Management & Admin Platform',
      category: 'Educational Platform',
      isGroupProject: false,
      role: 'Full-Stack Architecture, JWT Authentication & Role-Based Access Control',
      description:
        'A robust MERN-stack educational platform with role-based access control and a comprehensive admin suite for user oversight, course lifecycle, and role management.',
      technologies: ['React', 'Firebase', 'JWT', 'Tailwind CSS', 'DaisyUI'],
      image: '/images/studify.png',
      imageAlt: 'Modern education platform interface with admin suite',
      links: {
        demo: 'https://studify-749d1.web.app/',
        github: 'https://github.com/Sumyta-Bentey-Habib/Studify',
      },
      layoutVariant: 'offset-bottom',
      exitCode: 'EXIT 03',
      waypointLabel: 'KM 6.2 // ACADEMIC CITADEL',
      landmarkTitle: 'STUDIFY LEARNING CITADEL',
      districtType: 'Academic Tech & Role-Based Governance District',
      themeAccent: 'accentCyan',
    },
    {
      id: '04',
      number: '04',
      title: 'GoAthlete',
      subtitle: 'Sports Event Discovery & Participation Hub',
      category: 'Event Platform',
      isGroupProject: false,
      role: 'Frontend Engineering, Client-Side Routing & Event Workflows',
      description:
        'A dedicated sports event platform empowering athletes to explore, create, and manage athletic competitions and events with seamless client-side interactions.',
      technologies: ['React', 'Firebase', 'React Router', 'DaisyUI'],
      image: '/images/goathlete.png',
      imageAlt: 'GoAthlete sports event platform interface',
      links: {
        demo: 'https://goathlete.web.app/',
        github: 'https://github.com/Sumyta-Bentey-Habib/GoAthlete-',
      },
      layoutVariant: 'split-reverse',
      exitCode: 'EXIT 04',
      waypointLabel: 'KM 8.9 // ATHLETIC ARENA',
      landmarkTitle: 'GOATHLETE SPORTS COMPLEX',
      districtType: 'Athletic Competitions & Event Operations Complex',
      themeAccent: 'finishGold',
    },
  ] as readonly ProjectItem[],
} as const;

export const CONTACT_DATA = {
  sectionId: 'contact',
  kicker: 'READY TO EVOLVE?',
  signal: {
    tag: 'SIGNAL // TERMINAL DIRECTORY',
    status: 'TRANSMISSION ACTIVE',
  },
  statement: {
    line1: "LET'S",
    line2: 'BUILD',
    line3: 'SOMETHING.',
  },
  action: {
    label: 'CONNECT',
    href: 'mailto:sumytabenteyhabib@gmail.com',
    ariaLabel: 'Initiate contact via email',
  },
  channels: {
    email: {
      label: 'EMAIL',
      address: 'sumytabenteyhabib@gmail.com',
      href: 'mailto:sumytabenteyhabib@gmail.com',
      ariaLabel: 'Send email to sumytabenteyhabib@gmail.com',
    },
    socialsLabel: 'DIRECTORY',
    socials: [
      {
        id: 'linkedin',
        label: 'LINKEDIN',
        href: 'https://www.linkedin.com/in/sumytabenteyhabib/',
        isExternal: true,
        ariaLabel: 'Visit Sumyta Bentey Habib on LinkedIn',
      },
      {
        id: 'github',
        label: 'GITHUB',
        href: 'https://github.com/Sumyta-Bentey-Habib',
        isExternal: true,
        ariaLabel: 'Visit Sumyta Bentey Habib on GitHub',
      },
    ],
  },
  footer: {
    monogram: 'S.B.H.',
    copyright: '© 2026 SUMYTA BENTEY HABIB.',
    tagline: 'ENGINEERED FOR IMPACT.',
  },
} as const;

