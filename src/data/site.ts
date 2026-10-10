export const site = {
  name: 'ACES CUSAT',
  fullName: 'Association of Computer Engineering Students',
  url: 'https://acescusat.tech',
  description:
    'ACES CUSAT is the student association of the Division of Computer Engineering, School of Engineering, Cochin University of Science and Technology. Workshops, talks, hackathons and placement prep, run by students for 400+ students.',
  founded: 2006,
  members: '400+',
  locale: 'en_IN',
  address: {
    venue: 'Software Block',
    campus: 'School of Engineering, CUSAT',
    city: 'Kochi',
    region: 'Kerala',
    country: 'IN',
    pin: '682022',
  },
  social: {
    instagram: 'https://www.instagram.com/aces_cusat/',
    linkedin: 'https://www.linkedin.com/company/aces-cusat/',
  },
  /** Join link (WhatsApp community) */
  join: 'https://chat.whatsapp.com/BxtGNlqh1IJBP1W5qXcQ2o',
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Achievements', href: '/achievements' },
    { label: 'Events', href: '/events' },
    { label: 'Materials', href: '/materials' },
    { label: 'Placements', href: '/placements' },
    { label: 'Newsletter', href: '/newsletter' },
    { label: 'Team', href: '/team' },
  ],
} as const;
