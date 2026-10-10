import type { ImageMetadata } from 'astro';
import joel from '../assets/achievements/joel-benoy-hackrush.jpg';
import aditya from '../assets/achievements/aditya-anand-iitm.jpg';
import sankalp from '../assets/achievements/sankalp-suman-flipkart.jpg';
import binil from '../assets/achievements/binil-george-flipkart.jpg';
import eshani from '../assets/achievements/eshani-kathaprasangam.jpg';
import chess from '../assets/achievements/irene-devika-chess.jpg';
import kseb from '../assets/achievements/irene-kseb-quiz.jpg';
import spaceday from '../assets/achievements/irene-ann-spaceday.jpg';
import abhitha from '../assets/achievements/abhitha-agritech.jpg';
import hft from '../assets/achievements/hft-hackathon.jpg';
import aleena1 from '../assets/achievements/aleena-ieee-ideathon.jpg';
import aleena2 from '../assets/achievements/aleena-kireap.jpg';
import aman from '../assets/achievements/aman-sanjay-fisat.jpg';
import lumora from '../assets/achievements/lumora-hackathon.jpg';
import japan from '../assets/achievements/japan-internship.jpg';
import kalari from '../assets/achievements/code-kalari.jpg';
import ayisha from '../assets/achievements/ayisha-gdg.jpg';

export type Category = 'Hackathon' | 'Ideathon' | 'Internship' | 'Quiz' | 'Sports' | 'Arts' | 'Community';

export interface Achievement {
  people: string[];
  title: string;
  detail: string;
  category: Category;
  when: string; // YYYY-MM
  image: ImageMetadata;
  alt: string;
  /** Batch / semester at the time */
  batch?: string;
}

export const achievements: Achievement[] = [
  {
    people: ['Joel Benoy'],
    title: "Winner, HackRush '26",
    detail:
      'MGM College of Engineering, Pampakuda. Built Terra, an indoor plant tracking platform on React and Firebase: watering reminders, weather-aware recommendations, and an AI plant doctor with voice playback.',
    category: 'Hackathon',
    when: '2026-02',
    image: joel,
    alt: 'Joel Benoy receiving the HackRush award.',
    batch: 'S4',
  },
  {
    people: ['Aditya Anand'],
    title: 'First prize, Winter School hackathon, IIT Madras',
    detail: 'Winter School on Decentralised Trust and Blockchains, run by cyStar, the centre for cybersecurity, trust and reliability at IIT Madras.',
    category: 'Hackathon',
    when: '2025-12',
    image: aditya,
    alt: 'Aditya Anand at IIT Madras.',
    batch: 'S6',
  },
  {
    people: ['Sankalp Suman'],
    title: 'National semi-finalist, Flipkart GRiD 7.0',
    detail: "Flipkart's national engineering competition.",
    category: 'Hackathon',
    when: '2025-10',
    image: sankalp,
    alt: 'Sankalp Suman.',
    batch: 'S6',
  },
  {
    people: ['Binil George'],
    title: 'National semi-finalist, Flipkart GRiD 7.0',
    detail: "Flipkart's national engineering competition.",
    category: 'Hackathon',
    when: '2025-10',
    image: binil,
    alt: 'Binil George.',
    batch: 'S6',
  },
  {
    people: ['Jayadev Narayanan', 'Ebin Amson', 'Gowrishankar S Menon', 'Binil George'],
    title: 'Hack For Tomorrow',
    detail: 'Team placement at the Hack For Tomorrow hackathon.',
    category: 'Hackathon',
    when: '2025-11',
    image: hft,
    alt: 'The Hack For Tomorrow team.',
  },
  {
    people: ['Rajkumar', 'Ruth Dominic', 'Rohith V P'],
    title: 'Lumora hackathon',
    detail: 'Team placement at Lumora.',
    category: 'Hackathon',
    when: '2025-11',
    image: lumora,
    alt: 'The Lumora hackathon team.',
  },
  {
    people: ['Ebin', 'Jayadev', 'Keerthana', 'Ajnas (alumnus)'],
    title: "Code Kalari, IIIT Kottayam's official hackathon",
    detail: 'Team placement at Code Kalari.',
    category: 'Hackathon',
    when: '2025-11',
    image: kalari,
    alt: 'The Code Kalari team.',
  },
  {
    people: ['Nandana S', 'Nidhin Jyothi', 'Ashwin Menon', 'Nandagopal S B'],
    title: 'Indian Internship Programme 2026, Japan',
    detail: 'Selected for the Lake Nakaumi, Lake Shinji and Mt. Daisen Indian Internship Programme.',
    category: 'Internship',
    when: '2026-01',
    image: japan,
    alt: 'Students selected for the Japan internship programme.',
  },
  {
    people: ['Aleena Jaison'],
    title: 'First, IEEE CAS and RAS SBC CUSAT ideathon',
    detail: 'Ideathon conducted by IEEE CAS SBC CUSAT and IEEE RAS SBC CUSAT.',
    category: 'Ideathon',
    when: '2025-10',
    image: aleena1,
    alt: 'Aleena Jaison receiving the ideathon prize.',
  },
  {
    people: ['Aleena Jaison'],
    title: 'Second, Ideathon 2025 (KIREAP)',
    detail: 'Organised by EOC and SOCE, CUSAT.',
    category: 'Ideathon',
    when: '2025-10',
    image: aleena2,
    alt: 'Aleena Jaison at Ideathon 2025.',
  },
  {
    people: ['Aman Zahi', 'Sanjay Subhash'],
    title: 'Second, idea pitching at Forum, FISAT',
    detail: "Ideathon at FISAT's national fest.",
    category: 'Ideathon',
    when: '2025-11',
    image: aman,
    alt: 'Aman Zahi and Sanjay Subhash.',
  },
  {
    people: ['Irene Sara Philipose', 'Ann Evelin Vincent'],
    title: 'First, Space Day Ideathon by IRES SEDS',
    detail: 'Space Day ideathon organised by IRES SEDS.',
    category: 'Ideathon',
    when: '2025-08',
    image: spaceday,
    alt: 'Irene Sara Philipose and Ann Evelin Vincent at the Space Day ideathon.',
    batch: 'S4',
  },
  {
    people: ['Abhitha Abhilash'],
    title: 'AgriTech Ideathon',
    detail: 'Placement at the AgriTech Ideathon.',
    category: 'Ideathon',
    when: '2025-09',
    image: abhitha,
    alt: 'Abhitha Abhilash.',
  },
  {
    people: ['Irene Sara Philipose'],
    title: 'Second at district level, KSEB Engineers Quiz',
    detail: 'Representing CUSAT.',
    category: 'Quiz',
    when: '2025-09',
    image: kseb,
    alt: 'Irene Sara Philipose at the KSEB quiz.',
    batch: 'S4',
  },
  {
    people: ['Irene Sara Philipose', 'Devika Manoj'],
    title: 'SOE Sports chess champions',
    detail: 'School of Engineering chess championship.',
    category: 'Sports',
    when: '2025-10',
    image: chess,
    alt: 'Irene Sara Philipose and Devika Manoj with the chess trophy.',
    batch: 'S4, S6',
  },
  {
    people: ['Eshani S Nair'],
    title: 'Third, Kathaprasangam at Sargam',
    detail: "CUSAT's arts fest.",
    category: 'Arts',
    when: '2025-11',
    image: eshani,
    alt: 'Eshani S Nair performing.',
    batch: 'S6',
  },
  {
    people: ['Ayishathul Rinsha P'],
    title: 'Organiser, Google Developer Groups on Campus',
    detail: 'Selected as GDG on Campus organiser for CUSAT.',
    category: 'Community',
    when: '2025-09',
    image: ayisha,
    alt: 'Ayishathul Rinsha P.',
  },
];

export const categories = [...new Set(achievements.map((a) => a.category))];

export const stats = [
  { value: 50, suffix: '+', label: 'Hackathon wins and finals' },
  { value: 12, suffix: '', label: 'Research papers' },
  { value: 150, suffix: '+', label: 'Certifications earned' },
  { value: 20, suffix: '+', label: 'Project grants' },
];
