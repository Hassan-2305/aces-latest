import type { ImageMetadata } from 'astro';
import sudheep from '../assets/team/sudheep-elayidom.jpeg';
import damodaran from '../assets/team/v-damodaran.jpeg';
import afnash from '../assets/team/afnash-ali-p.png';
import layana from '../assets/team/layana-v-m.jpg';
import sajad from '../assets/team/sajad-hussain-malla.jpg';
import jyothikrishna from '../assets/team/jyothikrishna-s.jpg';
import ruvais from '../assets/team/ruvais-p.jpg';
import adith from '../assets/team/adith-r-lal.jpg';
import hassan from '../assets/team/mohammed-hassan.jpg';
import devikaKumar from '../assets/team/devika-s-kumar.jpg';
import devika from '../assets/team/devika-s.jpg';
import uditya from '../assets/team/uditya-krishna.jpg';
import amal from '../assets/team/amal-vinayan.jpg';
import adwaitha from '../assets/team/adwaitha-bini.jpg';
import nandana from '../assets/team/nandana-p-s.jpg';
import shibily from '../assets/team/shibily-p.jpg';
import lena from '../assets/team/lena-elizabeth-minto.jpg';
import ardrasankar from '../assets/team/ardrasankar.jpg';
import enosh from '../assets/team/enosh-antony.jpg';
import liya from '../assets/team/liya-ferasha-a-p.jpg';
import aman from '../assets/team/aman-zahi.jpg';
import sanjana from '../assets/team/sanjana-bejoy.jpg';
import irene from '../assets/team/irene-sara-philipose.jpg';
import thanusree from '../assets/team/thanusree-s-n.jpg';
import answar from '../assets/team/muhammed-answar-c-k.jpg';
import leena from '../assets/team/leena-hasoon-m.jpg';
import fiza from '../assets/team/fiza-fathima-p-p.jpg';
import thejas from '../assets/team/thejas-v.jpg';

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

// Roles as announced on the 2026–27 execom poster.
export const core: Member[] = [
  { name: 'Afnash Ali P', role: 'Chairperson', photo: afnash },
  { name: 'Layana V M', role: 'Vice Chairperson', photo: layana },
  { name: 'Sajad Hussain Malla', role: 'Secretary', photo: sajad },
  { name: 'Jyothikrishna S', role: 'Joint Secretary', photo: jyothikrishna },
  { name: 'Ruvais P', role: 'Treasurer', photo: ruvais },
  { name: 'Devika S Kumar', role: 'Co-Treasurer', photo: devikaKumar },
];

export const groups: Group[] = [
  {
    name: 'Tech',
    blurb: 'This website, the forms, the things that break.',
    members: [
      { name: 'Adith R Lal', role: 'Tech lead', photo: adith },
      { name: 'Mohammed Hassan', role: 'Tech co-lead', photo: hassan, focus: '50% 38%' },
    ],
  },
  {
    name: 'Events',
    blurb: 'Rooms, schedules and everything on the day.',
    members: [
      { name: 'Devika S', role: 'Event lead', photo: devika },
      { name: 'Uditya Krishna', role: 'Event co-lead', photo: uditya },
    ],
  },
  {
    name: 'Media',
    blurb: 'Posters, reels, the photos on this site.',
    members: [
      { name: 'Amal Vinayan', role: 'Media lead', photo: amal },
      { name: 'Adwaitha Bini', role: 'Media co-lead', photo: adwaitha },
    ],
  },
  {
    name: 'Content',
    blurb: 'Captions, the newsletter, whatever needs words.',
    members: [
      { name: 'Nandana P S', role: 'Content lead', photo: nandana },
      { name: 'Shibily P', role: 'Content co-lead', photo: shibily },
    ],
  },
  {
    name: 'Sponsorship',
    blurb: 'The people who make the events free.',
    members: [
      { name: 'Lena Elizabeth Minto', role: 'Sponsorship lead', photo: lena },
      { name: 'Ardrasankar T Praveen', role: 'Sponsorship co-lead', photo: ardrasankar },
    ],
  },
  {
    name: 'Outreach',
    blurb: 'Other colleges, other associations, the WhatsApp groups.',
    members: [
      { name: 'Enosh Antony', role: 'Outreach lead', photo: enosh },
      { name: 'Liya Ferasha A P', role: 'Outreach co-lead', photo: liya, focus: '50% 30%' },
    ],
  },
  {
    name: 'Alumni',
    blurb: 'Keeping the graduates one message away.',
    members: [
      { name: 'Aman Zahi', role: 'Alumni coordinator', photo: aman },
      { name: 'Sanjana Bejoy', role: 'Asst. alumni coordinator', photo: sanjana },
    ],
  },
  {
    name: 'Extracurricular',
    blurb: 'Everything that is not a laptop.',
    members: [
      { name: 'Irene Sara Philipose', role: 'Extracurricular lead', photo: irene },
      { name: 'Thanusree S N', role: 'Extracurricular co-lead', photo: thanusree },
    ],
  },
  {
    name: 'Executive members',
    blurb: 'Wherever an extra pair of hands is needed.',
    members: [
      { name: 'Muhammed Answar C K', role: 'Executive member', photo: answar },
      { name: 'Leena Hasoon M', role: 'Executive member', photo: leena },
      { name: 'Fiza Fathima P P', role: 'Executive member', photo: fiza },
      { name: 'Thejas V', role: 'Executive member', photo: thejas },
    ],
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
    name: 'Mr. V. Damodaran',
    role: 'Head of Division',
    photo: damodaran,
  },
];

export const headcount = core.length + groups.reduce((n, g) => n + g.members.length, 0);
