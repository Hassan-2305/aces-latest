import type { ImageMetadata } from 'astro';
import p1 from '../assets/newsletter/2025-10-p1.jpeg';
import p2 from '../assets/newsletter/2025-10-p2.jpeg';

export interface Issue {
  slug: string;
  number: number;
  title: string;
  date: string; // YYYY-MM-DD
  blurb: string;
  pages: ImageMetadata[];
  /** Optional downloadable PDF in /public */
  pdf?: string;
}

// Newest first. Add pages as images (one per page) and, if you have it, the PDF.
export const issues: Issue[] = [
  {
    slug: 'issue-01-october-2025',
    number: 1,
    title: 'VS Code DevDays, placement updates',
    date: '2025-10-15',
    blurb:
      'The first issue. Inside: the VS Code DevDays session with Microsoft, and the 2025 placement roll across EY, FoodHub, IBM, Lifesight and Salescode.',
    pages: [p1, p2],
  },
];
