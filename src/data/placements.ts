import type { ImageMetadata } from 'astro';
import tcs from '../assets/companies/tcs.png';
import ibm from '../assets/companies/ibm.png';
import ey from '../assets/companies/ey.png';
import infosys from '../assets/companies/infosys.png';
import foodhub from '../assets/companies/foodhub.png';
import ust from '../assets/companies/ust.png';
import cdac from '../assets/companies/cdac.png';
import lifesight from '../assets/companies/lifesight.png';
import reliance from '../assets/companies/reliance.png';
import salescode from '../assets/companies/salescode.png';
import quantiphi from '../assets/companies/quantiphi.png';
import kyndryl from '../assets/companies/kyndryl.png';
import cognizant from '../assets/companies/cognizant.png';
import visteon from '../assets/companies/visteon.png';
import durga from '../assets/team/durga-sumesh.png';
import harsh from '../assets/people/harsh-dubey.png';
import sheethal from '../assets/people/sheethal-joshy-thomas.png';

export const headline = [
  { value: 29, prefix: '₹', suffix: ' LPA', label: 'Highest package' },
  { value: 50, prefix: '#', suffix: '', label: 'NIRF rank, Govt. of India' },
  { value: 52, prefix: '', suffix: '', label: 'Offers in the 2025 season' },
];

export const accreditation = 'NBA Tier 1 accredited, outcome-based education';

export interface Recruiter {
  name: string;
  logo: ImageMetadata;
  /** Offers in the 2025 season, when known */
  offers?: number;
  /** Logo is dark-on-transparent; needs a light plate */
  dark?: boolean;
}

export const recruiters: Recruiter[] = [
  { name: 'EY', logo: ey, offers: 17, dark: true },
  { name: 'IBM', logo: ibm, offers: 10 },
  { name: 'UST', logo: ust, offers: 8 },
  { name: 'Infosys', logo: infosys, offers: 4 },
  { name: 'CDAC', logo: cdac, offers: 4 },
  { name: 'Lifesight', logo: lifesight, offers: 4 },
  { name: 'FoodHub', logo: foodhub, offers: 2 },
  { name: 'Reliance', logo: reliance, offers: 1 },
  { name: 'Salescode.ai', logo: salescode, offers: 1 },
  { name: 'Quantiphi', logo: quantiphi, offers: 1 },
  { name: 'TCS', logo: tcs },
  { name: 'Kyndryl', logo: kyndryl },
  { name: 'Cognizant', logo: cognizant },
  { name: 'Visteon', logo: visteon },
];

export const testimonials = [
  {
    name: 'Durga Sumesh',
    company: 'FoodHub',
    photo: durga,
    quote:
      'The placement support and faculty guidance helped me secure my dream job. The exposure, training, and mentorship were top-notch.',
  },
  {
    name: 'Harsh Dubey',
    company: 'Reliance Industries',
    photo: harsh,
    quote:
      'Mock interviews, resume reviews, and constant mentoring made the placement journey smooth and confidence-building.',
  },
  {
    name: 'Sheethal Joshy Thomas',
    company: 'Salescode.ai',
    photo: sheethal,
    quote: 'The curriculum and placement training prepared me perfectly for real-world industry expectations.',
  },
];

export const brochure = {
  title: 'Placement Brochure 2025–26',
  href: '/docs/cse-placement-brochure-2025-26.pdf',
  size: '15 MB PDF',
};
