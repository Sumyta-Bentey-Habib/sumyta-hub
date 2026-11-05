export interface TechGroup {
  readonly category: string;
  readonly items: readonly string[];
}

export interface ProjectItem {
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly subtitle: string;
  readonly category: string;
  readonly ownershipType: 'Personal Project' | 'Team Project' | 'Professional Contribution';
  readonly isGroupProject: boolean;
  readonly groupBadge?: string;
  readonly isFeatured?: boolean;
  readonly role: string;
  readonly description: string;
  readonly technologies: readonly string[];
  readonly techGroups: readonly TechGroup[];
  readonly image: string;
  readonly imageAlt: string;
  readonly links: {
    readonly demo?: string;
    readonly github?: string;
    readonly frontend?: string;
    readonly backend?: string;
    readonly isMonorepo?: boolean;
    readonly serverGithub?: string;
  };
  readonly layoutVariant?: 'default' | 'offset-top' | 'offset-bottom' | 'split-reverse';
  readonly exitCode: string;
  readonly waypointLabel: string;
  readonly landmarkTitle: string;
  readonly districtType: string;
  readonly themeAccent: 'primary' | 'windowAmber' | 'accentCyan' | 'finishGold';
}

export const PROJECTS_DATA = {
  sectionId: 'work',
  sectionTag: '04 // SELECTED WORKS',
  title: 'SELECTED WORKS',
  titleAccent: '.',
  subtitle:
    "A collection of applications and digital experiences I've built, explored, and contributed to.",
  projectCountSuffix: 'PROJECTS',
  featuredBadge: 'FEATURED PROJECT',
  featuredKicker: 'SPOTLIGHT // MONOREPO ARCHITECTURE',
  myContributionLabel: 'MY CONTRIBUTION',
  techStackLabel: 'TECHNOLOGY STACK',
  actionsLabel: 'EXPLORE REPOSITORY & DEPLOYMENT',
  openLiveDemo: 'LIVE DEMO',
  openSourceCode: 'SOURCE CODE',
  openClientRepo: 'CLIENT REPO',
  openServerRepo: 'SERVER REPO',
  openMonorepo: 'REPOSITORY',
  viewProjectAria: 'Open live preview for',
  externalLinkAria: 'opens in a new window',
  quickPreviewBadge: 'LIVE PREVIEW ↗',
  allProjectsArchivedNotice: 'End of selected works showcase. All repositories and live deployments are verified.',

  /* Backward compatibility labels */
  kicker: 'EDITORIAL SHOWCASE // SECTOR 04',
  highwayStatus: 'SHOWCASE ACTIVE // 6 PRODUCTION REPOSITORIES',
  period: '2024 — 2026',
  scrollProgressLabel: 'EDITORIAL DOSSIER',
  demoButtonText: 'LIVE DEMO ↗',
  githubButtonText: 'SOURCE CODE ↗',
  frontendButtonText: 'CLIENT REPO ↗',
  backendButtonText: 'SERVER REPO ↗',
  monorepoButtonText: 'REPOSITORY ↗',
  clientGithubButtonText: 'CLIENT REPO ↗',
  serverGithubButtonText: 'SERVER REPO ↗',
  openPreviewBadge: 'OPEN PREVIEW ↗',
  groupProjectBadge: 'TEAM PROJECT',
  roleLabel: 'MY CONTRIBUTION',
  techLabel: 'TECH STACK SPECIFICATIONS',
  launchProjectAria: 'Launch live demo in new window',
  githubProjectAria: 'View source code on GitHub in new window',
  terminalHeader: '~/projects',
  terminalPath: '~/projects',
  repositoryArchive: '// REPOSITORY ARCHIVE',
  infoPanelHeaderTag: 'PROJECT SPECIFICATION',
  activeRuntimeTag: 'ACTIVE',
  standbyRuntimeTag: 'STANDBY',
  keyboardHint: '[← / →] KEYS TO SWITCH',
  prevRuntimeLabel: '◀ PREV',
  nextRuntimeLabel: 'NEXT ▶',
  autoModeActive: 'AUTO [CYCLE]',
  autoModePaused: 'MANUAL [IDLE]',
  autoToggleAria: 'Toggle automatic project cycle',
  autoCycleLabel: 'AUTO-CYCLE',
  autoIntervalMs: 6000,
  idleResumeDelayMs: 12000,
  rightWorldTag: 'PROJECT SHOWCASE',

  projects: [
    {
      id: '01',
      number: '01',
      title: 'Path to Peace',
      subtitle: 'Full-Stack Meditative Editorial & Sanctuary',
      category: 'Meditative Platform',
      ownershipType: 'Personal Project',
      isGroupProject: false,
      isFeatured: true,
      role: 'Monorepo Architecture, Better Auth ,PostgreSQL, SSLCommerz & Express API',
      description:
        'A digital sanctuary designed as a meditative editorial, featuring emotional feeling tools, distraction-free Quran explorer, digital course portal, and SSLCommerz payment integration.',
      technologies: [
        'Next.js 16',
        'Express.js',
        'PostgreSQL',
        'Prisma ORM',
        'Better Auth',
        'Tailwind CSS',
        'TypeScript',
      ],
      techGroups: [
        {
          category: 'Frontend',
          items: ['Next.js 16', 'Tailwind CSS', 'TypeScript'],
        },
        {
          category: 'Backend & Data',
          items: ['Express.js', 'PostgreSQL','Prisma ORM'],
        },
        {
          category: 'Auth & Payments',
          items: ['Better Auth', 'SSLCommerz'],
        },
      ],
      image: '/projects/Path to Peace Website.png',
      imageAlt: 'Path to Peace Meditative Editorial platform interface',
      links: {
        demo: 'https://path-to-peace.vercel.app/',
        github: 'https://github.com/Sumyta-Bentey-Habib/path-to-peace',
        isMonorepo: true,
      },
      layoutVariant: 'split-reverse',
      exitCode: 'EXIT 01',
      waypointLabel: 'KM 1.0 // MEDITATIVE EDITORIAL',
      landmarkTitle: 'PATH TO PEACE SANCTUARY',
      districtType: 'Meditative Sanctuary & E-Learning District',
      themeAccent: 'accentCyan',
    },
    {
      id: '02',
      number: '02',
      title: 'Operix',
      subtitle: 'Pharmaceutical Operations & Governance Platform',
      category: 'Enterprise Web Platform',
      ownershipType: 'Team Project',
      isGroupProject: true,
      groupBadge: 'TEAM PROJECT',
      role: 'Role-Based Access Control, Admin & Team Workflows, Better Auth Session Management',
      description:
        'A pharmaceutical operations platform for managing teams, tasks, submissions, and role-based workflows with robust permission structures.',
      technologies: ['Next.js', 'React', 'TypeScript', 'CSS Modules', 'Better Auth', 'Vitest'],
      techGroups: [
        {
          category: 'Frontend',
          items: ['Next.js', 'React', 'TypeScript', 'CSS Modules'],
        },
        {
          category: 'Auth & Testing',
          items: ['Better Auth', 'Vitest'],
        },
        {
          category: 'Governance',
          items: ['Role-Based Access Control', 'Workflow Submissions'],
        },
      ],
      image: '/projects/Operix Pharmaceutical Operations & Governance Platform.png',
      imageAlt: 'Operix Pharmaceutical Operations Platform interface',
      links: {
        demo: 'https://operix-frontend-avi.vercel.app/',
        frontend: 'https://github.com/Sumyta-Bentey-Habib/Operix-Frontend',
        backend: 'https://github.com/Sumyta-Bentey-Habib/Operix-Backend',
        github: 'https://github.com/Sumyta-Bentey-Habib/Operix-Frontend',
      },
      layoutVariant: 'default',
      exitCode: 'EXIT 02',
      waypointLabel: 'KM 2.5 // PHARMA OPERATIONS SECTOR',
      landmarkTitle: 'OPERIX PHARMACEUTICAL PLATFORM',
      districtType: 'Pharmaceutical Operations & Governance District',
      themeAccent: 'primary',
    },
    {
      id: '03',
      number: '03',
      title: 'Quadra',
      subtitle: 'Real-Time Social Media Platform',
      category: 'Full-Stack Web Application',
      ownershipType: 'Team Project',
      isGroupProject: true,
      groupBadge: 'TEAM PROJECT',
      role: 'Frontend Architecture, Real-Time Sync & Responsive UI',
      description:
        'A modern, full-stack social media application providing a comprehensive social networking experience with real-time messaging, post interactions, and instant notifications.',
      technologies: ['React', 'Next.js', 'Node.js', 'Express', 'Socket.io', 'Tailwind CSS'],
      techGroups: [
        {
          category: 'Frontend',
          items: ['React', 'Next.js', 'Tailwind CSS'],
        },
        {
          category: 'Backend & Real-Time',
          items: ['Node.js', 'Express', 'Socket.io'],
        },
      ],
      image: '/projects/Quadra Social Connect.png',
      imageAlt: 'Quadra Social Media Platform interface',
      links: {
        demo: 'https://quadra-blush.vercel.app/',
        frontend: 'https://github.com/Sumyta-Bentey-Habib/Quadra',
        backend: 'https://github.com/Sumyta-Bentey-Habib/Quadra-Server',
        github: 'https://github.com/Sumyta-Bentey-Habib/Quadra',
      },
      layoutVariant: 'offset-top',
      exitCode: 'EXIT 03',
      waypointLabel: 'KM 4.4 // SOCIAL BROADCAST SECTOR',
      landmarkTitle: 'QUADRA COMMUNICATIONS NEXUS',
      districtType: 'Communications & Real-Time Sync District',
      themeAccent: 'accentCyan',
    },
    {
      id: '04',
      number: '04',
      title: 'Espresso Emporium',
      subtitle: 'Curated Coffee Marketplace & Discovery',
      category: 'E-Commerce Platform',
      ownershipType: 'Personal Project',
      isGroupProject: false,
      role: 'Full-Stack Development, Firebase Integration & Catalog Flow',
      description:
        'A premium coffee platform where enthusiasts browse and review specialty roasts, while verified sellers showcase curated offerings with real-time catalog updates.',
      technologies: [
        'React',
        'Firebase',
        'Tailwind CSS',
        'Socket.io',
        'MongoDB',
        'Stripe Payment',
      ],
      techGroups: [
        {
          category: 'Frontend',
          items: ['React', 'Tailwind CSS'],
        },
        {
          category: 'Backend & Real-Time',
          items: ['Firebase', 'Socket.io'],
        },
      ],
      image: '/projects/Espresso Emporium Website.png',
      imageAlt: 'Luxury coffee branding and e-commerce interface',
      links: {
        demo: 'https://espresso-emporium-8d4f7.web.app/',
        frontend: 'https://github.com/Sumyta-Bentey-Habib/Espresso-Emporium',
        backend: 'https://github.com/Sumyta-Bentey-Habib/Espresso-Emporium-Server',
        github: 'https://github.com/Sumyta-Bentey-Habib/Espresso-Emporium',
      },
      layoutVariant: 'offset-bottom',
      exitCode: 'EXIT 04',
      waypointLabel: 'KM 5.8 // SPECIALTY COMMERCE SECTOR',
      landmarkTitle: 'ESPRESSO ROASTERY & MARKET',
      districtType: 'Curated E-Commerce & Specialty Roastery',
      themeAccent: 'accentCyan',
    },
    {
      id: '05',
      number: '05',
      title: 'CholoBuddy',
      subtitle: 'Bilingual Travel & Tour Booking Platform',
      category: 'Travel & Tour Platform',
      ownershipType: 'Personal Project',
      isGroupProject: false,
      role: 'Turborepo Monorepo, Styled-Components, Framer Motion, Better Auth & Firestore',
      description:
        'A full-stack bilingual travel portal for exploring and booking curated tours across Bangladesh, featuring real-time wishlists, user leveling, and mobile banking payment workflows.',
      technologies: [
        'Next.js 15',
        'Express.js',
        'TypeScript',
        'Firebase Firestore',
        'Better Auth',
        'Styled-Components',
      ],
      techGroups: [
        {
          category: 'Frontend',
          items: ['Next.js 15', 'TypeScript', 'Styled-Components'],
        },
        {
          category: 'Backend & Data',
          items: ['Express.js', 'Firebase Firestore', 'Better Auth'],
        },
      ],
      image: '/projects/cholobuddy.png',
      imageAlt: 'CholoBuddy Travel and Tour Booking platform interface',
      links: {
        demo: 'https://cholobuddy-web.vercel.app/',
        github: 'https://github.com/Sumyta-Bentey-Habib/cholobuddy',
        isMonorepo: true,
      },
      layoutVariant: 'default',
      exitCode: 'EXIT 05',
      waypointLabel: 'KM 7.5 // TRAVEL EXPEDITION SECTOR',
      landmarkTitle: 'CHOLOBUDDY TRAVEL EXPEDITION',
      districtType: 'Tour Operations & Travel Expedition District',
      themeAccent: 'primary',
    },
    {
      id: '06',
      number: '06',
      title: 'Studify',
      subtitle: 'MERN Learning Management & Admin Platform',
      category: 'Educational Platform',
      ownershipType: 'Personal Project',
      isGroupProject: false,
      role: 'Full-Stack Architecture, JWT Authentication & Role-Based Access Control',
      description:
        'A robust MERN-stack educational platform with role-based access control and a comprehensive admin suite for user oversight, course lifecycle, and role management.',
      technologies: ['React', 'Firebase', 'JWT', 'Tailwind CSS', 'DaisyUI'],
      techGroups: [
        {
          category: 'Frontend',
          items: ['React', 'Tailwind CSS', 'DaisyUI'],
        },
        {
          category: 'Backend & Security',
          items: ['Firebase', 'JWT Authentication'],
        },
      ],
      image: '/projects/studify.png',
      imageAlt: 'Modern education platform interface with admin suite',
      links: {
        demo: 'https://studify-749d1.web.app/',
        frontend: 'https://github.com/Sumyta-Bentey-Habib/Studify',
        backend: 'https://github.com/Sumyta-Bentey-Habib/Studify-Server',
        github: 'https://github.com/Sumyta-Bentey-Habib/Studify',
      },
      layoutVariant: 'offset-top',
      exitCode: 'EXIT 06',
      waypointLabel: 'KM 9.2 // ACADEMIC CITADEL',
      landmarkTitle: 'STUDIFY LEARNING CITADEL',
      districtType: 'Academic Tech & Role-Based Governance District',
      themeAccent: 'primary',
    },
  ] as readonly ProjectItem[],
} as const;

