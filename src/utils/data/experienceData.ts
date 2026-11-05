export interface EmploymentRole {
  readonly title: string;
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
} as const;
