export const HERO_DATA = {
  name: {
    first: 'SUMYTA',
    middle: 'BENTEY',
    last: 'HABIB',
  },
  headline: {
    line1: 'I BUILD',
    line2: 'WEB',
    line3: 'APPLICATIONS.',
  },
  role: 'Junior Full-Stack Developer',
  techStack: ['React', 'Next.js', 'Node.js', 'MongoDB'] as const,
  techStackFormatted: 'React · Next.js · Node.js · MongoDB',
  currentStatus: {
    statement: 'Currently building production applications at',
    company: 'XIIA',
    fullText: 'Currently building production applications at XIIA.',
  },
  actions: [
    {
      label: 'VIEW WORK',
      href: '#work',
      isExternal: false,
      icon: 'arrow_downward',
      primary: true,
    },
    {
      label: 'GITHUB',
      href: 'https://github.com/Sumyta-Bentey-Habib',
      isExternal: true,
      icon: 'arrow_outward',
      primary: false,
    },
    {
      label: 'RESUME',
      href: '/resume.pdf',
      isExternal: true,
      icon: 'description',
      primary: false,
    },
  ],
  scrollText: 'SCROLL FOR IMPACT',
  locationStatus: 'Based in Bangladesh · Available for opportunities',
  bgImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBOpnc0tRezqAG7S_6rx8UQF7GjaYvKEQWe5ATFcw5N66s1FM3pv64FJ1aO2GdgFis4TrBY3Jn-vi5xHytu-TysKrDojZtaJW1vn1_5NzECpK_8O5TBBc9V2Ygk0WY_ZeenGwElAldsdUDkzhd6_QbiWFsu7dp_GbU1RMfjOHC_-ujnoUWnXa0HRdI5ZSJmbQY_5wgrafiLp67RDXPxdu4WJhqrELRtOJZRT84of0kxfYcZdp6bHaKv2XJMluDeuV_v8T34gfPqS2c',
  bgImageAlt: 'abstract dark 3d geometric shapes with vibrant red glowing accents',
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
