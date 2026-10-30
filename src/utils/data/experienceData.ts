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
      period: '2025 — PRESENT',
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
