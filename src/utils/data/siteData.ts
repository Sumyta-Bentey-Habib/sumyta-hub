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
  resume: 'https://drive.google.com/file/d/1MB4ag-8obYWNby-78QHPxxxGPkNFzkHP/view?usp=sharing',
} as const;
