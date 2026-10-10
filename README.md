# ACES CUSAT — website

Static Astro site for the Association of Computer Engineering Students, SOE CUSAT. Dark-first, GSAP + Lenis for motion, View Transitions with a curtain wipe. No frameworks on the client, no tracking, ~60 KB gzipped JS total.

## Run

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run preview
```

Node 22+.

## Edit content

Everything editable lives in `src/data/`:

| File | What |
| --- | --- |
| `events.ts` | Events. Add an object at the top, drop the poster in `src/assets/events/`. Upcoming vs past is computed from `start` at build time. |
| `achievements.ts` | Wins. Photo in `src/assets/achievements/`. Categories drive the filter chips. `stats` = the four big numbers. |
| `materials.ts` | Drive links per scheme/semester. Empty string = "not yet". |
| `placements.ts` | Headline numbers, recruiters (+ offer counts), testimonials, brochure path. |
| `newsletter.ts` | Issues. One image per page in `src/assets/newsletter/`, optional `pdf` in `public/docs/`. |
| `team.ts` | Core team (roles are a TODO: confirm), `groups` (media, content, sponsorship…) and faculty. Photos in `src/assets/team/`, `focus` = crop position. |
| `site.ts` | Name, socials, WhatsApp join link, address, nav. |

Logo: `src/components/Logo.astro` = traced ACES mark (`src/assets/brand/aces-mark.svg`) + "CUSAT" as live text. Swap the SVG when you have a vector logo.

Rebuild after editing. Images are optimised by Astro at build.

## Motion (src/scripts/app.ts)

Attribute-driven; add to any element:

- `data-reveal="lines"` — masked line reveal on scroll (`"hero"` = played after loader / transition)
- `data-scrub` — words light up as you scroll
- `data-fade`, `data-fade-group` — fade-up (group staggers children)
- `data-img-reveal` — clip reveal + settle scale on `.media`
- `data-parallax` — slow drift for the `img` inside
- `data-count="52"` — counts up
- `data-theme="light|dark"` on a section — page background switches when it hits mid-viewport
- `data-hscroll` / `data-hscroll-track` — pinned horizontal scroll (desktop; native scroll-snap on mobile)
- `data-hlist` / `data-hlist-item` / `data-hlist-preview` — hover list with the image following the cursor
- `data-magnetic` — magnetic pull (round buttons)
- `data-cursor="link|view|drag|open"` — custom cursor state
- `data-lightbox-open`, `data-filter-bar`, `data-tabs`, `data-acc`, `data-reader` — small UI helpers

Reduced-motion users get everything static. Loader runs once per session (`sessionStorage: aces-seen`).

## Deploy

`npm run build`, upload `dist/` anywhere static (Netlify, Vercel, Cloudflare Pages, GitHub Pages). Pretty URLs are on (`/events` not `/events.html`); most hosts do this by default. Set `site` in `astro.config.mjs` if the domain changes. `/docs/` holds the placement brochure PDF.
