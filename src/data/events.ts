import type { ImageMetadata } from 'astro';
import cyber from '../assets/events/intro-to-cybersecurity.png';
import foundry from '../assets/events/foundry.jpeg';
import ignite from '../assets/events/ignite-ideas.png';
import uiux from '../assets/events/intro-uiux.png';
import devops from '../assets/events/demystifying-devops.png';
import vscode from '../assets/events/vscode-devdays-2025.webp';
import gitWorkshop from '../assets/events/git-workshop.webp';
import gitGithub from '../assets/events/git-github-session.png';
import hireup from '../assets/events/hireup-25.png';
import chitchat from '../assets/events/chit-chat.png';
import responsibleAi from '../assets/events/responsible-ai.png';

export type EventKind = 'workshop' | 'talk' | 'session' | 'placement' | 'ideathon' | 'hackathon';

export interface AcesEvent {
  slug: string;
  name: string;
  /** ISO local date-time */
  start: string;
  location: string;
  kind: EventKind;
  summary: string;
  poster: ImageMetadata;
  posterAlt: string;
  by?: string[];
  with?: string[];
  registerUrl?: string;
}

// Newest first. Upcoming vs past is decided at build time from `start`.
export const events: AcesEvent[] = [
  {
    slug: 'intro-to-cybersecurity',
    name: 'Intro to Cybersecurity',
    start: '2026-08-06T16:00',
    location: 'Software Block',
    kind: 'workshop',
    summary:
      'Learn, secure, defend. How attacks actually work, how defenders think, and where to start if you want in.',
    poster: cyber,
    posterAlt: 'Intro to Cybersecurity poster: a hooded figure at three monitors in a neon-lit city.',
  },
  {
    slug: 'foundry',
    name: 'Foundry',
    start: '2026-04-04T10:00',
    location: 'Seminar Hall, NLB and online',
    kind: 'hackathon',
    summary:
      'A three-week, hybrid product hunt. Not a 24-hour sprint: thoughtful ideation, guided execution and real-world validation.',
    poster: foundry,
    posterAlt: 'Foundry poster.',
    registerUrl: 'https://foundry.acescusat.tech',
  },
  {
    slug: 'ignite-ideas',
    name: 'Ignite Ideas',
    start: '2026-02-11T16:00',
    location: 'Seminar Hall, NLB',
    kind: 'ideathon',
    summary:
      'Team up, brainstorm, pitch. Solutions that spark impact, judged against the brightest in the building. A ₹5,000 prize pool.',
    poster: ignite,
    posterAlt: 'Ignite Ideas poster.',
  },
  {
    slug: 'intro-to-ui-ux',
    name: 'Introduction to UI/UX Designing',
    start: '2026-02-09T16:00',
    location: 'Seminar Hall, NLB',
    kind: 'session',
    summary:
      'What makes an interface feel right. Led by Kailas D S, Systems Engineer at TCS and 2023 alumnus of the department.',
    poster: uiux,
    posterAlt: 'Introduction to UI/UX Designing poster.',
    by: ['Kailas D S'],
  },
  {
    slug: 'demystifying-devops',
    name: 'Demystifying DevOps',
    start: '2026-01-28T14:00',
    location: 'CS 01',
    kind: 'talk',
    summary:
      'Key DevOps concepts and the way real teams ship. Led by Ajnas N B, founder of Cognify.co and 2024 alumnus of the department.',
    poster: devops,
    posterAlt: 'Demystifying DevOps poster.',
    by: ['Ajnas N B'],
  },
  {
    slug: 'vs-code-devdays-2025',
    name: 'VS Code DevDays 2025',
    start: '2025-09-26T14:00',
    location: 'Seminar Hall, NLB',
    kind: 'workshop',
    summary:
      'Engineers from Microsoft and Orion Innovation on getting more out of VS Code: GitHub Copilot, integrations, and a hands-on lab.',
    poster: vscode,
    posterAlt: 'VS Code DevDays 2025 poster.',
    with: ['Microsoft', 'Orion Innovation'],
  },
  {
    slug: 'git-workshop',
    name: 'Git Workshop',
    start: '2025-08-20T10:00',
    location: 'Seminar Hall',
    kind: 'workshop',
    summary:
      'Version control from zero: commits, branches, merges, and the collaborative workflows every team ends up using.',
    poster: gitWorkshop,
    posterAlt: 'Git Workshop poster.',
    by: ['Durga Sumesh', 'Sebin Thomas', 'Ishika Ishani', 'Devika'],
  },
  {
    slug: 'git-and-github-session',
    name: 'Git and GitHub Session',
    start: '2025-08-20T16:00',
    location: 'CS 01',
    kind: 'session',
    summary: 'The evening follow-up: GitHub, pull requests, and working on one repo without breaking it.',
    poster: gitGithub,
    posterAlt: 'Git and GitHub session poster.',
  },
  {
    slug: 'hireup-25',
    name: "HireUp '25",
    start: '2025-08-13T19:00',
    location: 'Online',
    kind: 'placement',
    summary:
      'The annual placement-prep session: a resume that survives a 30-second screen, with every SOE association.',
    poster: hireup,
    posterAlt: "HireUp '25 poster.",
    with: ['IEEE CUSAT SB', 'CESA', 'ECSA', 'EESA', 'MESAC', 'SAIT', 'ASFE'],
  },
  {
    slug: 'chit-chat',
    name: 'Chit Chat',
    start: '2025-08-13T16:00',
    location: 'Seminar Hall',
    kind: 'session',
    summary: 'An open session for first-years with seniors. No slides, no agenda. Bring questions.',
    poster: chitchat,
    posterAlt: 'Chit Chat poster.',
  },
  {
    slug: 'responsible-ai',
    name: 'Responsible AI: Safety and Best Practices',
    start: '2025-05-30T18:00',
    location: 'Online',
    kind: 'talk',
    summary:
      'PII masking, choosing compliant APIs, and prompt-hijacking risks in enterprise LLMs, from people who ship them.',
    poster: responsibleAi,
    posterAlt: 'Responsible AI poster.',
  },
];

export const kindLabel: Record<EventKind, string> = {
  workshop: 'Workshop',
  talk: 'Talk',
  session: 'Session',
  placement: 'Placement prep',
  ideathon: 'Ideathon',
  hackathon: 'Hackathon',
};

const now = new Date();
export const upcoming = events.filter((e) => new Date(e.start) >= now).sort((a, b) => +new Date(a.start) - +new Date(b.start));
export const past = events.filter((e) => new Date(e.start) < now).sort((a, b) => +new Date(b.start) - +new Date(a.start));

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
export const fmtTime = (iso: string) =>
  new Date(iso).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' });
