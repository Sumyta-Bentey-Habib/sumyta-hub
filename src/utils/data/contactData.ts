export const CONTACT_DATA = {
  sectionId: 'contact',
  kicker: '05 // END OF JOURNEY',
  signal: {
    tag: 'FINAL SCENE // NIGHTFALL',
    status: 'CITY AT REST',
  },
  branding: {
    name: 'SUMYTA BENTEY HABIB',
    role: 'Full-Stack Developer',
    closingLine:
      'Full-Stack Developer focused on building reactive frontend interfaces, reliable APIs, and maintainable web applications.',
    invitation:
      'Available for full-time engineering roles, remote software teams, and collaborative product engineering.',
  },
  action: {
    label: 'START A CONVERSATION',
    href: 'mailto:sumytabenteyhabib@gmail.com',
    ariaLabel: 'Send email to Sumyta Bentey Habib',
  },
  channels: {
    email: {
      label: 'EMAIL',
      address: 'sumytabenteyhabib@gmail.com',
      href: 'mailto:sumytabenteyhabib@gmail.com',
      ariaLabel: 'Send email to sumytabenteyhabib@gmail.com',
    },
    socialsLabel: 'DIRECT CHANNELS',
    socials: [
      {
        id: 'github',
        label: 'GITHUB',
        handle: 'Sumyta-Bentey-Habib',
        href: 'https://github.com/Sumyta-Bentey-Habib',
        isExternal: true,
        ariaLabel: 'Visit Sumyta Bentey Habib on GitHub',
      },
      {
        id: 'linkedin',
        label: 'LINKEDIN',
        handle: 'sumytabenteyhabib',
        href: 'https://www.linkedin.com/in/sumytabenteyhabib/',
        isExternal: true,
        ariaLabel: 'Visit Sumyta Bentey Habib on LinkedIn',
      },
      {
        id: 'resume',
        label: 'RESUME',
        handle: 'Google Drive',
        href: 'https://drive.google.com/file/d/1MB4ag-8obYWNby-78QHPxxxGPkNFzkHP/view?usp=sharing',
        isExternal: true,
        ariaLabel: 'Open Sumyta Bentey Habib Resume on Google Drive',
      },
    ],
  },
  footer: {
    monogram: 'S.B.H.',
    backToTopLabel: 'BACK TO TOP',
    backToTopAria: 'Scroll back to the top of the portfolio',
    tagline: 'NEON CITY EXPLORER // JOURNEY COMPLETE',
  },
} as const;
