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
