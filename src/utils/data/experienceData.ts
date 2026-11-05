export interface EmploymentRole {
  readonly title: string;
export interface ExperienceFocusItem {
  readonly lead: string;
  readonly body: string;
}

export interface ExperiencePosition {
  readonly title: string;
  readonly period: string;
  readonly roleBadge: string;
  readonly isPromoted?: boolean;
}

export interface ExperienceSector {
  readonly id: string;
  readonly number: string;
  readonly sectorCode: string;
  readonly districtTitle: string;
  readonly districtSub: string;
  readonly beaconColor: 'primary' | 'accentCyan';
  readonly period: string;
}

export interface CompanyExperience {
  readonly id: string;
  readonly company: string;
  readonly location: string;
  readonly roles: readonly EmploymentRole[];
  readonly promotionLabel: string;
  readonly responsibilitiesLabel: string;
  readonly responsibilities: readonly string[];
  readonly technologiesLabel: string;
  readonly technologies: readonly string[];
}

export interface IndependentExperience {
  readonly id: string;
  readonly company: string;
  readonly location: string;
  readonly title: string;
  readonly period: string;
  readonly description: string;
  readonly technologiesLabel: string;
  readonly totalTenure?: string;
  readonly active: boolean;
  readonly statusLabel: string;
  readonly statusSublabel: string;
  readonly progressionBadge?: string;
  readonly progressionNote?: string;
  readonly positions?: readonly ExperiencePosition[];
  readonly description: string;
  readonly focusCategory: string;
  readonly focusItems: readonly (string | ExperienceFocusItem)[];
  readonly techCategory: string;
  readonly technologies: readonly string[];
}

export interface ExperienceData {
  readonly sectionId: string;
  readonly sectionTag: string;
  readonly title: string;
  readonly titleAccent: string;
  readonly subtitle: string;
  readonly archivePeriod: string;
  readonly stationXiia: CompanyExperience;
  readonly independentProjects: IndependentExperience;
}

export const EXPERIENCE_DATA: ExperienceData = {
  sectionId: 'experience',
  sectionTag: '02 // EXPERIENCE',
  title: 'EXPERIENCE',
  titleAccent: '.',
  subtitle:
    'Professional software engineering at STATION XIIA and independent full-stack technical development.',
  archivePeriod: '2024 — PRESENT',

  /* ── 1. STATION XIIA ── */
  stationXiia: {
    id: 'station-xiia',
    company: 'XIIA',
    location: 'Copenhagen, Denmark',
    roles: [
      {
        title: 'Junior Software Developer',
        period: 'March 2026 – November 2026',
      },
      {
        title: 'Web Developer Intern',
        period: 'November 2025 – February 2026',
      },
    ],
    promotionLabel: 'INTERNAL PROMOTION',
    responsibilitiesLabel: 'KEY RESPONSIBILITIES',
    responsibilities: [
      'Implemented responsive interfaces based on Figma designs and product requirements.',
      'Developed and enhanced frontend features across React.js, Next.js, and React Native applications.',
      'Integrated existing backend APIs into frontend features and workflows.',
      'Worked on payment-related interfaces and workflows, including payment methods, DM subscriptions, and Stripe-based payout functionality.',
      'Co-developed protected content access flows using password and email verification.',
      'Refactored reusable components and resolved functional issues and UI defects.',
      'Collaborated with developers and designers through Git-based workflows.',
    ],
    technologiesLabel: 'TECHNOLOGIES',
    technologies: ['React.js', 'Next.js', 'React Native', 'TypeScript', 'JavaScript', 'Git'],
  },

  /* ── 2. Independent Projects ── */
  independentProjects: {
    id: 'independent-projects',
    company: 'Independent Projects',
    location: 'Self-Directed',
    title: 'Full-Stack Developer — Independent Projects',
    period: '2024 – Present',
    description:
      'Independent development involving frontend applications, REST APIs, databases, authentication, role-based access control, real-time functionality, and deployment.',
    technologiesLabel: 'TECHNOLOGIES',
    technologies: [
      'React.js',
      'Next.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'PostgreSQL',
      'Firebase Firestore',
      'Socket.io',
      'Better Auth',
    ],
  },
  experiences: [
    {
      id: '01',
      number: '01',
      sectorCode: 'SEC: 02 // XIIA_TOWER',
      districtTitle: 'XIIA CORPORATE COMPLEX',
      districtSub: 'PRODUCTION ENGINEERING DISTRICT',
      beaconColor: 'primary',
      period: 'NOV 2025 — NOV 2026',
      totalTenure: '1 YEAR TOTAL',
      role: 'Junior Software Developer',
      company: 'XIIA',
      location: 'Copenhagen, Denmark',
      active: false,
      statusLabel: 'Production Record',
      statusSublabel: 'Production Deployment',
      progressionBadge: 'CAREER PROGRESSION',
      progressionNote: 'Promoted to Junior Software Developer following internship',
      positions: [
        {
          title: 'Junior Software Developer',
          period: 'March 2026 – November 2026',
          roleBadge: 'PROMOTED ↗',
          isPromoted: true,
        },
        {
          title: 'Web Developer Intern',
          period: 'November 2025 – February 2026',
          roleBadge: 'INTERNSHIP',
          isPromoted: false,
        },
      ],
      description:
        'Contributed to the development and maintenance of production web and mobile applications, focusing primarily on frontend implementation, feature development, API integration, component refactoring, debugging, and UI improvements across platforms.',
      focusCategory: 'Production Responsibilities',
      focusItems: [
        {
          lead: 'Implemented responsive user interfaces',
          body: 'based on Figma designs and product requirements.',
        },
        {
          lead: 'Developed and enhanced frontend features',
          body: 'across React.js, Next.js, and React Native applications.',
        },
        {
          lead: 'Integrated existing backend APIs',
          body: 'to support application features and user workflows.',
        },
        {
          lead: 'Contributed to payment-related features,',
          body: 'including payment method interfaces, DM subscriptions, and Stripe-based payout workflows.',
        },
        {
          lead: 'Co-developed protected content access flows',
          body: 'using password and email verification.',
        },
        {
          lead: 'Refactored reusable components',
          body: 'to improve code organization and maintainability.',
        },
        {
          lead: 'Investigated and resolved functional issues,',
          body: 'UI defects, and inconsistencies across application screens and user flows.',
        },
        {
          lead: 'Collaborated with developers and designers',
          body: 'through Git-based development workflows.',
        },
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
        'React Native',
        'Node.js',
        'Express',
        'PostgreSQL',
        'Prisma ORM',
        'Better Auth',
        'MongoDB',
        'Firebase',
        'Firestore',
        'Socket.io',
        'Tailwind CSS',
        'Vite',
        'REST APIs',
        'SSLCommerz',
        'Stripe Payment'
      ],
    },
  ],
} as const;
