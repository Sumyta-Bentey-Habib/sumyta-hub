export const HERO_DATA = {
  name: {
    first: 'SUMYTA',
    middle: 'BENTEY',
    last: 'HABIB',
  },
  headline: {
    line1: 'I BUILD',
    line2: 'WEB & MOBILE',
    line3: 'INTERFACES.',
  },
  role: 'Junior Software Developer',
  company: 'XIIA',
  techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] as const,
  techStackFormatted: 'React · Next.js · TypeScript · Tailwind CSS',
  currentStatus: {
    statement: 'Building production web & mobile interfaces at',
    company: 'XIIA',
    fullText: 'Building production web & mobile interfaces at XIIA.',
  },
  metaBadges: [
    { label: 'OPERATOR', value: 'XIIA_DEV' },
    { label: 'ROLE', value: 'JR SOFTWARE DEV' },
    { label: 'FOCUS', value: 'FRONTEND UI' },
    { label: 'RADAR', value: '2D VECTOR HUD' },
  ] as const,
  actions: [
    {
      label: 'VIEW CASEWORK',
      href: '#work',
      isExternal: false,
      icon: 'arrow_downward',
      primary: true,
      ariaLabel: 'Scroll down to selected casework and projects',
    },
    {
      label: 'EXPERIENCE',
      href: '#experience',
      isExternal: false,
      icon: 'history',
      primary: false,
      ariaLabel: 'Jump to professional experience timeline at XIIA',
    },
    {
      label: 'GITHUB',
      href: 'https://github.com/Sumyta-Bentey-Habib',
      isExternal: true,
      icon: 'arrow_outward',
      primary: false,
      ariaLabel: 'View GitHub profile in a new tab',
    },
    {
      label: 'RESUME',
      href: '/resume.pdf',
      isExternal: true,
      icon: 'description',
      primary: false,
      ariaLabel: 'Open resume PDF in a new tab',
    },
  ] as const,
  scrollText: 'SCROLL FOR IMPACT',
  locationStatus: 'Based in Bangladesh · Available for opportunities',
  gameHud: {
    systemTag: 'OPERATOR HUD // 2D TACTICAL GRID',
    statusTag: 'STATUS: ACTIVE',
    scoreLabel: 'TARGETS ACQUIRED',
    maxTargets: 5,
    radarMode: '2D VECTOR RADAR',
    controlsHintDesktop: 'PILOT: [W][A][S][D] / MOUSE · ENGAGE: [SPACE] / CLICK',
    controlsHintMobile: 'PILOT: DRAG RETICLE · ENGAGE: TAP NODE',
    resetAction: 'RESET RADAR',
    simulationActive: 'RADAR ACTIVE',
    simulationPaused: 'RADAR PAUSED',
    telemetryPrefix: 'TELEMETRY // ',
    allTargetsAcquired: 'ALL NODES SYNCHRONIZED — SYSTEM OPTIMAL',
    nodes: [
      { id: 'n1', label: 'UI_ARCHITECTURE', tech: 'REACT 19 / NEXT.JS', xPercent: 22, yPercent: 28 },
      { id: 'n2', label: 'PRODUCTION_DEV', tech: 'XIIA FRONTEND', xPercent: 76, yPercent: 24 },
      { id: 'n3', label: 'COMPONENT_SYS', tech: 'REFACTORED & DRY', xPercent: 82, yPercent: 74 },
      { id: 'n4', label: 'RESPONSIVE_EXP', tech: 'WEB & MOBILE UI', xPercent: 24, yPercent: 78 },
      { id: 'n5', label: 'FULLSTACK_CORE', tech: 'MERN + REALTIME', xPercent: 50, yPercent: 52 },
    ] as const,
  },
} as const;

export const COLOR_TOKENS = {
  primary: '#ff8d90',
  primaryDim: '#e31c40',
  primaryContainer: '#ff757b',
  onPrimary: '#640014',
  secondary: '#e5e2e1',
  secondaryDim: '#d7d4d3',
  surfaceLowest: '#000000',
  surfaceContainer: '#191919',
  surfaceHigh: '#1f1f1f',
  outline: '#757575',
  outlineVariant: '#484848',
  white: '#ffffff',
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
  sectionTag: '01. Perspective',
  headline: {
    prefix: 'I build modern web solutions powered by',
    highlight: 'precision engineering',
    suffix: 'and immersive interfaces.',
    full: 'I build modern web solutions powered by precision engineering and immersive interfaces.',
  },
  paragraphs: [
    'I specialize in the MERN stack and Next.js, transforming complex technical requirements into high-performing, hyper-responsive web applications.',
    'From securing JWT integrations to designing brutalist UI interactions, my goal is to eliminate unnecessary complexity and craft digital spaces that just work perfectly.',
  ],
  image: '/images/user_portrait.png',
  imageAlt: 'Sumyta Bentey Habib',
} as const;

export const SKILLS_DATA = {
  sectionTag: '01. Skill Set',
  title: 'Core Expertise',
  subtitle:
    'I leverage a modern, full-stack ecosystem to build scalable, high-performance web applications, spanning from hyper-responsive frontends to robust backend infrastructures.',
  marqueeItems: [
    'NEXT.JS',
    'REACT',
    'TYPESCRIPT',
    'NODE.JS',
    'MONGODB',
    'POSTGRESQL',
    'TAILWIND',
    'DOCKER',
    'FIREBASE',
    'VERCEL',
  ],
  categories: [
    {
      num: '01',
      title: 'Frontend Architecture',
      desc: 'Building hyper-responsive, accessible interfaces with modern React frameworks.',
      icon: 'web',
      highlight: false,
      groups: [
        { label: 'Core', items: ['Next.js', 'React.js'] },
        { label: 'Languages', items: ['TypeScript', 'JavaScript (ES6+)'] },
        { label: 'Styling & UI', items: ['Tailwind CSS', 'DaisyUI'] },
        { label: 'Animation', items: ['GSAP'] },
      ],
    },
    {
      num: '02',
      title: 'Backend & Database Engineering',
      desc: 'Architecting secure, scalable APIs and optimizing complex database schemas.',
      icon: 'storage',
      highlight: true,
      groups: [
        { label: 'Server-side', items: ['Node.js', 'Express.js', 'PHP', 'Laravel'] },
        { label: 'Databases', items: ['MongoDB (NoSQL)', 'PostgreSQL (SQL)'] },
        { label: 'Data Tools', items: ['Prisma ORM'] },
      ],
    },
    {
      num: '03',
      title: 'DevOps & Tooling',
      desc: 'Streamlining CI/CD pipelines and managing scalable monorepo architectures.',
      icon: 'settings_suggest',
      highlight: false,
      groups: [
        { label: 'Version Control', items: ['Git', 'GitHub'] },
        { label: 'Architecture', items: ['Turborepo', 'pnpm', 'Docker'] },
        { label: 'Cloud & Deploy', items: ['Vercel', 'Firebase','Netlify','Render'] },
      ],
    },
  ],
} as const;

export const EXPERIENCE_DATA = {
  sectionTag: '02. Trajectory',
  title: 'EXPERIENCE',
  subtitle: 'Production Frontend Engineering & Independent Full-Stack Development',
  archivePeriod: '2023 — 2026',
  archiveLabel: 'ARCHIVE',
  labels: {
    deliverablesSuffix: 'CORE DELIVERABLES',
    techSpecificationsSuffix: 'TECH SPECIFICATIONS',
    recordPrefix: 'REC_',
    indexPrefix: 'INDEX // ',
  },
  experiences: [
    {
      id: '01',
      number: '01',
      period: '2026 — PRESENT',
      role: 'Junior Software Developer',
      company: 'XIIA',
      active: true,
      statusLabel: 'Currently Active',
      statusSublabel: 'Active Engagement',
      description:
        'Contributing to production web and mobile applications, primarily focused on frontend implementation, feature development, refactoring, debugging, and UI improvements.',
      focusCategory: 'Professional Focus',
      focusItems: [
        'Implementing UI from product designs and requirements',
        'Developing frontend features',
        'Refactoring existing UI components and code',
        'Debugging frontend issues across screens and user flows',
        'Working on responsive interfaces',
        'Working across web and mobile interfaces',
        'Collaborating with other developers and designers',
        'Using Git-based development workflows',
      ],
      techCategory: 'Professional Technologies',
      technologies: [
        'React',
        'React Native',
        'Next.js',
        'JavaScript',
        'TypeScript',
        'Git',
      ],
    },
    {
      id: '02',
      number: '02',
      period: '2024 — PRESENT',
      role: 'Independent Development',
      company: null,
      active: false,
      statusLabel: 'Self-Directed Track',
      statusSublabel: 'Continuous Exploration',
      description:
        'Building full-stack applications independently to strengthen practical software development skills and explore different technologies.',
      focusCategory: 'Experience Includes',
      focusItems: [
        'Building responsive React applications',
        'Building full-stack applications with Next.js',
        'Developing Node.js and Express backends',
        'Working with MongoDB',
        'Implementing authentication',
        'Working with Firebase',
        'Implementing real-time functionality with Socket.io',
        'Building dashboards and CRUD workflows',
        'Deploying applications using modern hosting platforms',
      ],
      techCategory: 'Technologies',
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
}

export const PROJECTS_DATA = {
  sectionTag: '03. Casework',
  title: 'SELECTED CASEWORK',
  subtitle: 'PRODUCTION APPLICATIONS & TECHNICAL BENCHMARKS',
  period: '2024 — 2026',
  indexPrefix: 'CASE // ',
  scrollHint: 'SCROLL TO NAVIGATE',
  roleLabel: 'ROLE / FOCUS',
  techLabel: 'SPECIFICATIONS',
  demoButtonText: 'LIVE DEMO',
  githubButtonText: 'SOURCE',
  groupProjectBadge: 'GROUP PROJECT',
  archiveTermination: '// ARCHIVE TERMINATION',
  repositoryArchive: '// REPOSITORY ARCHIVE',
  viewProjectLabel: 'EXPLORE INTERFACE',
  leftWorldTag: 'DEVELOPER SPECIFICATION',
  rightWorldTag: 'RUNTIME INTERFACE',
  scrollProgressLabel: 'CASE PROGRESSION',
  assemblySequenceLabel: 'CONSTRUCTION SEQUENCE',
  statusAssembled: 'COMPOSITION COMPLETE',
  statusAssembling: 'ASSEMBLING STRUCTURE',
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

