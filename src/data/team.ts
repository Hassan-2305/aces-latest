import type { ImageMetadata } from 'astro';
import sebin from '../assets/team/sebin-thomas.png';
import durga from '../assets/team/durga-sumesh.png';
import ishika from '../assets/team/ishika-ishani.jpg';
import sudheep from '../assets/team/sudheep-elayidom.jpeg';
import pramod from '../assets/team/pramod-pavithran.png';
import rayhan from '../assets/team/rayhan-k-n.jpg';
import lena from '../assets/team/lena-elizabeth-minto.jpg';
import ardrasankar from '../assets/team/ardrasankar.jpg';
import nandana from '../assets/team/nandana-p-s.jpg';
import shibily from '../assets/team/shibily-p.jpg';
import jose from '../assets/team/jose-mathew-moolayil.jpg';
import gouri from '../assets/team/gouri-a.jpg';
import sreelakshmi from '../assets/team/sreelakshmi-s.jpg';
import marvan from '../assets/team/marvan-k-k.jpg';
import alfaaz from '../assets/team/alfaaz-abdul-jaleel-k.jpg';
import aman from '../assets/team/aman-zahi.jpg';
import sanjana from '../assets/team/sanjana-bejoy.jpg';
import irene from '../assets/team/irene-sara-philipose.jpg';
import thanusree from '../assets/team/thanusree-s-n.jpg';
import liya from '../assets/team/liya-ferasha-a-p.jpg';
import adith from '../assets/team/adith-r-lal.jpg';

export interface Member {
  name: string;
  role: string;
  photo?: ImageMetadata;
  /** CSS object-position for the crop */
  focus?: string;
  note?: string;
}

export interface Group {
  name: string;
  blurb: string;
  members: Member[];
}

export const year = '2026–27';

// TODO: confirm the three core roles.
export const core: Member[] = [
  {
    name: 'Sebin Thomas',
    role: 'Chairperson',
    photo: sebin,
    focus: '50% 15%',
    note: 'The education and experience I received from SOE’s CS Department laid the cornerstone for my career development. From helping me develop my technical and communication skills to helping me grow my professional network, my student life under the CS Department has impacted me immensely.',
  },
  { name: 'Durga Sumesh', role: 'Convenor', photo: durga, focus: '50% 40%' },
  { name: 'Ishika Ishani', role: 'Secretary', photo: ishika, focus: '50% 50%' },
];

export const groups: Group[] = [
  {
    name: 'Media',
    blurb: 'Posters, reels, the photos on this site.',
    members: [
      { name: 'Gouri A', role: 'Media', photo: gouri, focus: '50% 30%' },
      { name: 'Sreelakshmi S', role: 'Media', photo: sreelakshmi, focus: '50% 25%' },
      { name: 'Marvan K K', role: 'Media', photo: marvan, focus: '50% 40%' },
      { name: 'Alfaaz Abdul Jaleel K', role: 'Media', photo: alfaaz, focus: '50% 30%' },
    ],
  },
  {
    name: 'Content',
    blurb: 'Captions, the newsletter, whatever needs words.',
    members: [
      { name: 'Nandana P S', role: 'Content', photo: nandana, focus: '50% 30%' },
      { name: 'Shibily P', role: 'Content', photo: shibily, focus: '50% 30%' },
      { name: 'Jose Mathew Moolayil', role: 'Content', photo: jose, focus: '50% 40%' },
    ],
  },
  {
    name: 'Sponsorship',
    blurb: 'The people who make the events free.',
    members: [
      { name: 'Rayhan K N', role: 'Sponsorship', photo: rayhan, focus: '50% 30%' },
      { name: 'Lena Elizabeth Minto', role: 'Sponsorship', photo: lena, focus: '50% 28%' },
      { name: 'Ardrasankar', role: 'Sponsorship', photo: ardrasankar, focus: '50% 25%' },
    ],
  },
  {
    name: 'Alumni',
    blurb: 'Keeping the graduates one message away.',
    members: [
      { name: 'Aman Zahi', role: 'Alumni coordinator', photo: aman, focus: '50% 25%' },
      { name: 'Sanjana Bejoy', role: 'Alumni coordinator', photo: sanjana, focus: '50% 30%' },
    ],
  },
  {
    name: 'Extracurricular',
    blurb: 'Everything that is not a laptop.',
    members: [
      { name: 'Irene Sara Philipose', role: 'Extracurricular', photo: irene, focus: '50% 30%' },
      { name: 'Thanusree S N', role: 'Extracurricular', photo: thanusree, focus: '50% 12%' },
    ],
  },
  {
    name: 'Outreach',
    blurb: 'Other colleges, other associations, the WhatsApp groups.',
    members: [{ name: 'Liya Ferasha A P', role: 'Outreach', photo: liya, focus: '50% 30%' }],
  },
  {
    name: 'Tech',
    blurb: 'This website, the forms, the things that break.',
    members: [{ name: 'Adith R Lal', role: 'Tech', photo: adith, focus: '50% 30%' }],
  },
];

export const faculty: Member[] = [
  {
    name: 'Dr. M. Sudheep Elayidom',
    role: 'Faculty Coordinator',
    photo: sudheep,
    note: 'ACES is a great platform for B.Tech Computer Engineering students to gather knowledge from expert talks, seminars and hackathons. Alumni from top MNCs find time to share knowledge with current students, offer internships and guide them to great placements.',
  },
  {
    name: 'Dr. Pramod Pavithran',
    role: 'Head of Division',
    photo: pramod,
    note: 'The involvement of our alumni in mentoring students and offering internships is truly appreciable. ACES creates opportunities for every student to participate and showcase their talents through well-organised technical events.',
  },
];

export const headcount = core.length + groups.reduce((n, g) => n + g.members.length, 0);
