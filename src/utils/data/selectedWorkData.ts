export interface SelectedWorkProject {
  readonly id: string;
  readonly number: string;
  readonly name: string;
  readonly category: string;
  readonly description: string;
  readonly contributionLabel: string;
  readonly contribution: string;
  readonly technologies: readonly string[];
  readonly image: string;
  readonly imageAlt: string;
  readonly accent: 'primary' | 'windowAmber' | 'accentCyan';
  readonly clientLabel: string;
}

export const SELECTED_WORK_DATA = {
  sectionId: 'selected-work',
  sectionTag: '03 // SELECTED WORK',
  title: 'SELECTED WORK',
  titleAccent: '.',
  subtitle: 'PRODUCTION SYSTEMS & COMMERCIAL APPLICATION ENGINEERING AT XIIA',
  cityRegion: 'The XIIA Collection // SECTOR 03 // COMMERCIAL DEPLOYMENTS',
  signalOnline: 'PRODUCTION VERIFIED',
  archivePeriod: '2025 — PRESENT',
  archiveLabel: 'COMMERCIAL WORK',
  kicker: 'XIIA PRODUCTION REPERTOIRE',
  confidentialityNote:
    'Commercial product interfaces protected. Original abstract 3D visual representations created under NDA guidelines.',
  labels: {
    clientAffiliation: 'XIIA PROFESSIONAL ENGAGEMENT',
    categoryLabel: 'PLATFORM CATEGORY',
    contributionLabel: 'KEY CONTRIBUTION',
    technologiesLabel: 'CORE TECHNOLOGIES',
    abstractNotice: 'ABSTRACT VISUALIZATION',
    indexPrefix: 'TRACK // ',
    ndaNotice: 'NDA PROTECTED // PROPRIETARY IP PRESERVED',
    caseworkPrompt: 'VIEW FEATURED WORKSTATION ↗',
    caseworkHref: '#work',
  },
  projects: [
    {
      id: 'soundmade',
      number: '01',
      name: 'Soundmade',
      category: 'Mobile Music Platform',
      description:
        'A cross-platform music application connecting artists and fans through music discovery and artist-focused experiences.',
      contributionLabel: 'Key Contribution',
      contribution: 'Mobile Application Development',
      technologies: ['React Native', 'Expo', 'TypeScript', 'REST APIs', 'iOS', 'Android'],
      image: '/images/selected-work/soundmade-visual.png',
      imageAlt:
        'Soundmade abstract music technology visualization with audio waveforms, equalizer bars, and neon frequencies',
      accent: 'primary',
      clientLabel: 'XIIA // PRODUCTION',
    },
    {
      id: 'kiibee',
      number: '02',
      name: 'Kiibee',
      category: 'Digital Content & Commerce Platform',
      description: 'A platform combining digital publishing, content discovery, and commerce.',
      contributionLabel: 'Key Contribution',
      contribution: 'Frontend & Product Interface Development',
      technologies: ['React', 'Next.js', 'TypeScript', 'REST APIs', 'CMS Integration'],
      image: '/images/selected-work/kiibee-visual.png',
      imageAlt:
        'Kiibee abstract digital publishing and content-commerce visualization with layered editorial cards',
      accent: 'windowAmber',
      clientLabel: 'XIIA // PRODUCTION',
    },
    {
      id: 'foodime',
      number: '03',
      name: 'Foodime',
      category: 'Restaurant POS & Management Platform',
      description: 'A restaurant operations platform supporting POS, admin, and manager workflows.',
      contributionLabel: 'Key Contribution',
      contribution: 'Application Interface & Feature Development',
      technologies: ['React', 'Next.js', 'TypeScript', 'REST APIs'],
      image: '/images/selected-work/foodime-visual.png',
      imageAlt:
        'Foodime abstract restaurant POS and operations visualization with geometric terminal elements and receipt shapes',
      accent: 'accentCyan',
      clientLabel: 'XIIA // PRODUCTION',
    },
  ] as const satisfies readonly SelectedWorkProject[],
} as const;

