import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);
gsap.defaults({ ease: 'expo.out', duration: 1 });

const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];

/* =========================================================================
   persistent layer: smooth scroll, cursor, curtain, loader
   ========================================================================= */
let lenis: Lenis | null = null;

function initSmooth() {
  if (REDUCE || lenis) return;
  lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.9 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

function lock(on: boolean) {
  document.body.classList.toggle('is-locked', on);
  if (lenis) on ? lenis.stop() : lenis.start();
}

function initCursor() {
  if (!FINE || REDUCE) return;
  const dot = $('[data-cursor-dot]');
  const ring = $('[data-cursor-ring]');
  if (!dot || !ring) return;
  const label = ring.querySelector('span')!;
  document.documentElement.classList.add('has-cursor');
  gsap.set([dot, ring], { xPercent: 0, yPercent: 0, opacity: 0 });
  let shown = false;
  const dx = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' });
  const dy = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' });
  const rx = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3' });
  const ry = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3' });
  const words: Record<string, string> = { view: 'View', drag: 'Drag', open: 'Open' };

  window.addEventListener(
    'pointermove',
    (e) => {
      if (!shown) {
        shown = true;
        gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
        gsap.to([dot, ring], { opacity: 1, duration: 0.4 });
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    },
    { passive: true },
  );
  document.addEventListener('pointerover', (e) => {
    const t = (e.target as Element).closest<HTMLElement>('[data-cursor]');
    if (!t) return;
    const s = t.dataset.cursor || 'link';
    ring.dataset.state = s;
    label.textContent = words[s] ?? '';
  });
  document.addEventListener('pointerout', (e) => {
    const t = (e.target as Element).closest<HTMLElement>('[data-cursor]');
    if (t && !t.contains(e.relatedTarget as Node)) delete ring.dataset.state;
  });
  document.addEventListener('mouseleave', () => (ring.dataset.state = 'hide'));
  document.addEventListener('mouseenter', () => delete ring.dataset.state);
}

const curtain = () => $('[data-curtain]');

function curtainIn() {
  const c = curtain();
  if (!c || REDUCE) return Promise.resolve();
  const mark = c.querySelector('.curtain-mark');
  return new Promise<void>((res) => {
    gsap
      .timeline({ onComplete: res })
      .to(c, { yPercent: 0, duration: 0.75, ease: 'expo.inOut' })
      .to(mark, { opacity: 1, duration: 0.3 }, '-=0.25');
  });
}

function curtainOut() {
  const c = curtain();
  if (!c || REDUCE) return;
  const mark = c.querySelector('.curtain-mark');
  gsap
    .timeline()
    .to(mark, { opacity: 0, duration: 0.2 })
    .to(c, { yPercent: -115, duration: 0.8, ease: 'expo.inOut' }, 0.05)
    .set(c, { yPercent: 115 });
}

function seen() {
  try {
    if (sessionStorage.getItem('aces-seen')) return true;
    sessionStorage.setItem('aces-seen', '1');
  } catch {}
  return false;
}

/** Resolves on window load, or after `max` ms, whichever comes first. */
function pageLoaded(max: number) {
  if (document.readyState === 'complete') return Promise.resolve();
  return new Promise<void>((res) => {
    window.addEventListener('load', () => res(), { once: true });
    setTimeout(res, max);
  });
}

function runLoader(): Promise<void> {
  const loader = $('[data-loader]');
  const done = () => document.documentElement.classList.remove('is-loading');
  if (!loader || REDUCE || seen()) {
    done();
    return Promise.resolve();
  }
  loader.classList.add('is-on');
  lock(true);
  const num = $('[data-loader-num]', loader)!;
  const bar = $('.loader-bar', loader)!;
  const mark = $('.loader-mark', loader)!;
  const tag = $('.loader-tag', loader)!;
  const glow = $('.loader-glow', loader)!;
  const foot = $('.loader-foot', loader)!;
  const n = { v: 0 };
  const draw = () => {
    num.textContent = String(Math.round(n.v));
    gsap.set(bar, { scaleX: n.v / 100 });
  };

  return new Promise((res) => {
    // intro: mark wipes up, tagline and glow follow, count runs to ~85 while assets load
    const intro = gsap
      .timeline()
      .to(mark, { clipPath: 'inset(0% 0 0 0)', duration: 1.1, ease: 'expo.inOut' }, 0)
      .fromTo(mark, { y: 24 }, { y: 0, duration: 1.4 }, 0.1)
      .to(glow, { opacity: 1, duration: 1.6, ease: 'power2.out' }, 0.2)
      .fromTo(tag, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.9 }, 0.6)
      .to(n, { v: 85, duration: 1.3, ease: 'power2.out', onUpdate: draw }, 0);

    Promise.all([intro.then(), pageLoaded(3500)]).then(() => {
      gsap
        .timeline({
          onComplete: () => {
            loader.classList.remove('is-on');
            gsap.set(loader, { yPercent: 0, visibility: 'hidden' });
            done();
            lock(false);
          },
        })
        .to(n, { v: 100, duration: 0.45, ease: 'power2.inOut', onUpdate: draw })
        .to([tag, foot], { opacity: 0, y: -12, duration: 0.4, ease: 'power2.in' }, '+=0.1')
        .to(mark, { y: -40, opacity: 0, duration: 0.6, ease: 'power3.in' }, '<')
        .to(glow, { opacity: 0, scale: 1.3, duration: 0.6 }, '<')
        .add(res, '-=0.1')
        .to(loader, { yPercent: -115, duration: 1.05, ease: 'expo.inOut' }, '<');
    });
  });
}

/* =========================================================================
   per-page layer
   ========================================================================= */
let mm: gsap.MatchMedia | null = null;
let ac = new AbortController();
const splits: SplitText[] = [];

function heroIntro(scope: ParentNode) {
  const tl = gsap.timeline();
  $$('[data-reveal="hero"]', scope).forEach((el, i) => {
    const lines = $$('.line', el);
    if (!lines.length) return;
    tl.to(lines, { yPercent: 0, duration: 1.4, stagger: 0.09 }, i * 0.1);
  });
  $$('[data-hero-fade]', scope).forEach((el, i) => {
    tl.to(el, { opacity: 1, y: 0, duration: 1.2 }, 0.45 + i * 0.1);
  });
  const bg = $('[data-hero-bg] img', scope);
  if (bg) tl.to(bg, { scale: 1.04, duration: 2.4, ease: 'power2.out' }, 0);
  $$('[data-hero-img]', scope).forEach((el, i) => {
    tl.to(el, { clipPath: 'inset(0% 0 0 0)', duration: 1.6 }, 0.3 + i * 0.12).to(
      el.querySelector('img'),
      { scale: 1, duration: 1.8 },
      '<',
    );
  });
  return tl;
}

function splitLines(scope: ParentNode) {
  $$('[data-reveal]', scope).forEach((el) => {
    const s = new SplitText(el, { type: 'lines', linesClass: 'line', mask: 'lines' });
    splits.push(s);
    el.classList.add('is-split');
    if (el.dataset.reveal === 'hero') {
      gsap.set(s.lines, { yPercent: 110 });
      return;
    }
    gsap.from(s.lines, {
      yPercent: 110,
      duration: 1.3,
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });
}

function scrubWords(scope: ParentNode) {
  $$('[data-scrub]', scope).forEach((el) => {
    const s = new SplitText(el, { type: 'words', wordsClass: 'word' });
    splits.push(s);
    gsap.to(s.words, {
      opacity: 1,
      stagger: 0.04,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 48%', scrub: true },
    });
  });
}

function fades(scope: ParentNode) {
  $$('[data-fade]', scope).forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1.1,
      delay: Number(el.dataset.fade || 0),
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
    });
  });
  $$('[data-fade-group]', scope).forEach((g) => {
    const kids = [...g.children];
    gsap.set(kids, { opacity: 0, y: 24 });
    gsap.to(kids, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.07,
      scrollTrigger: { trigger: g, start: 'top 88%', once: true },
    });
  });
}

function imageReveals(scope: ParentNode) {
  $$('[data-img-reveal]', scope).forEach((el) => {
    if (el.hasAttribute('data-hero-img')) {
      gsap.set(el, { clipPath: 'inset(100% 0 0 0)' });
      gsap.set(el.querySelector('img'), { scale: 1.25 });
      return;
    }
    gsap
      .timeline({ scrollTrigger: { trigger: el, start: 'top 86%', once: true } })
      .to(el, { clipPath: 'inset(0% 0 0 0)', duration: 1.4 })
      .to(el.querySelector('img'), { scale: 1, duration: 1.6 }, 0);
  });
  $$('[data-parallax]', scope).forEach((el) => {
    const img = el.querySelector('img');
    if (!img) return;
    gsap.fromTo(
      img,
      { yPercent: -8 },
      { yPercent: 8, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
    );
  });
}

function heroBg(scope: ParentNode, fine: boolean) {
  const bg = $('[data-hero-bg]', scope);
  if (!bg) return;
  const hero = bg.parentElement!;
  gsap.to(bg, {
    yPercent: 22,
    ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
  });
  if (!fine) return;
  const xTo = gsap.quickTo(bg, 'x', { duration: 1.2, ease: 'power2' });
  const yTo = gsap.quickTo(bg, 'y', { duration: 1.2, ease: 'power2' });
  hero.addEventListener(
    'pointermove',
    (e) => {
      xTo(((e.clientX / window.innerWidth) - 0.5) * -24);
      yTo(((e.clientY / window.innerHeight) - 0.5) * -16);
    },
    { passive: true, signal: ac.signal },
  );
}

function counters(scope: ParentNode) {
  $$('[data-count]', scope).forEach((el) => {
    const end = Number(el.dataset.count);
    const n = { v: 0 };
    el.textContent = '0';
    gsap.to(n, {
      v: end,
      duration: 1.8,
      onUpdate: () => (el.textContent = String(Math.round(n.v))),
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });
}

function themes(scope: ParentNode) {
  const secs = $$('main [data-theme], footer[data-theme]', scope);
  if (!secs.length) return;
  const fallback = document.body.dataset.theme || 'dark';
  const active = new Set<HTMLElement>();
  // Light bands win any overlap, and their window is wider than the dark ones,
  // so the page flips to light early and holds it until the band has mostly left.
  const apply = () => {
    const on = [...active];
    const theme = on.some((s) => s.dataset.theme === 'light') ? 'light' : (on[on.length - 1]?.dataset.theme ?? fallback);
    document.body.dataset.theme = theme;
  };
  secs.forEach((sec) => {
    const light = sec.dataset.theme === 'light';
    ScrollTrigger.create({
      trigger: sec,
      start: light ? 'top 85%' : 'top 50%',
      end: light ? 'bottom 20%' : 'bottom 50%',
      onToggle: (self) => {
        if (self.isActive) active.add(sec);
        else active.delete(sec);
        apply();
      },
    });
  });
}

function marqueeSkew(scope: ParentNode) {
  const tracks = $$('[data-marquee] .marquee-track', scope);
  if (!tracks.length) return;
  const setters = tracks.map((t) => gsap.quickTo(t, 'skewX', { duration: 0.5, ease: 'power3' }));
  ScrollTrigger.create({
    onUpdate: (self) => {
      const v = gsap.utils.clamp(-6, 6, self.getVelocity() / -350);
      setters.forEach((s) => s(v));
    },
  });
}

function horizontal(scope: ParentNode) {
  $$('[data-hscroll]', scope).forEach((sec) => {
    const track = $('[data-hscroll-track]', sec);
    if (!track) return;
    const dist = () => track.scrollWidth - window.innerWidth;
    gsap.to(track, {
      x: () => -dist(),
      ease: 'none',
      scrollTrigger: {
        trigger: sec,
        pin: true,
        scrub: 0.4,
        start: 'top top',
        end: () => `+=${dist()}`,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });
    const bar = $('[data-hscroll-bar]', sec);
    if (bar) {
      gsap.to(bar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: sec, start: 'top top', end: () => `+=${dist()}`, scrub: true },
      });
    }
  });
}

function hoverLists(scope: ParentNode) {
  $$('[data-hlist]', scope).forEach((list) => {
    const preview = $('[data-hlist-preview]', list);
    if (!preview) return;
    const imgs = $$('img', preview);
    const items = $$('[data-hlist-item]', list);
    gsap.set(preview, { xPercent: -50, yPercent: -50 });
    gsap.set(imgs, { clipPath: 'inset(100% 0 0 0)' });
    const xTo = gsap.quickTo(preview, 'x', { duration: 0.55, ease: 'power3' });
    const yTo = gsap.quickTo(preview, 'y', { duration: 0.55, ease: 'power3' });
    const rTo = gsap.quickTo(preview, 'rotation', { duration: 0.6, ease: 'power3' });
    let lastX = 0;
    let z = 1;
    let active = -1;
    list.addEventListener(
      'pointermove',
      (e) => {
        xTo(e.clientX);
        yTo(e.clientY);
        rTo(gsap.utils.clamp(-8, 8, (e.clientX - lastX) * 0.4));
        lastX = e.clientX;
      },
      { passive: true },
    );
    items.forEach((it, i) => {
      it.addEventListener('pointerenter', () => {
        preview.classList.add('is-on');
        const img = imgs[i];
        if (!img) return;
        img.style.zIndex = String(++z);
        gsap.fromTo(
          img,
          { clipPath: 'inset(100% 0 0 0)', scale: 1.2 },
          { clipPath: 'inset(0% 0 0 0)', scale: 1, duration: 0.7, overwrite: true },
        );
        if (active >= 0 && active !== i) gsap.to(imgs[active], { clipPath: 'inset(0 0 100% 0)', duration: 0.5, delay: 0.1 });
        active = i;
      });
    });
    list.addEventListener('pointerleave', () => {
      preview.classList.remove('is-on');
      gsap.to(imgs, { clipPath: 'inset(100% 0 0 0)', duration: 0.4, overwrite: true });
      active = -1;
    });
  });
}

function magnetic(scope: ParentNode) {
  $$('[data-magnetic]', scope).forEach((el) => {
    const inner = el.querySelector<HTMLElement>('span');
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });
    const ixTo = inner ? gsap.quickTo(inner, 'x', { duration: 0.6, ease: 'power3' }) : null;
    const iyTo = inner ? gsap.quickTo(inner, 'y', { duration: 0.6, ease: 'power3' }) : null;
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      xTo(x * 0.35);
      yTo(y * 0.35);
      ixTo?.(x * 0.18);
      iyTo?.(y * 0.18);
    });
    el.addEventListener('pointerleave', () => {
      xTo(0);
      yTo(0);
      ixTo?.(0);
      iyTo?.(0);
    });
  });
}

function navHide() {
  const nav = $('[data-nav]');
  if (!nav) return;
  const show = gsap.quickTo(nav, 'yPercent', { duration: 0.5, ease: 'power3' });
  ScrollTrigger.create({
    start: 'top -120',
    end: 'max',
    onUpdate: (self) => show(self.direction === 1 && self.getVelocity() > 400 ? -160 : 0),
    onLeaveBack: () => show(0),
  });
}

/* ---------- things that must work without motion ---------- */
function menu() {
  const btn = $('[data-menu-btn]');
  const panel = $('[data-menu]');
  if (!btn || !panel) return;
  const set = (open: boolean) => {
    btn.setAttribute('aria-expanded', String(open));
    panel.toggleAttribute('data-open', open);
    lock(open);
  };
  btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
  panel.addEventListener('click', (e) => {
    if ((e.target as Element).closest('a')) set(false);
  });
  window.addEventListener('keydown', (e) => e.key === 'Escape' && set(false), { signal: ac.signal });
}

function anchors(scope: ParentNode) {
  $$('a[href^="#"]', scope).forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = decodeURIComponent(a.getAttribute('href')!.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -40 });
      else target.scrollIntoView({ behavior: 'smooth' });
    });
  });
  $('[data-to-top]')?.addEventListener('click', () => (lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' })));
}

function lightbox(scope: ParentNode) {
  const dlg = $<HTMLDialogElement>('[data-lightbox]');
  if (!dlg) return;
  const img = dlg.querySelector('img')!;
  const cap = dlg.querySelector('figcaption')!;
  $$('[data-lightbox-open]', scope).forEach((el) => {
    el.addEventListener('click', () => {
      const src = el.dataset.src || el.querySelector('img')?.currentSrc;
      if (!src) return;
      img.src = src;
      img.alt = el.dataset.alt || '';
      cap.textContent = el.dataset.caption || '';
      dlg.showModal();
      lock(true);
      gsap.fromTo(dlg, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.5 });
    });
  });
  dlg.addEventListener('click', (e) => {
    if (e.target === dlg) dlg.close();
  });
  dlg.addEventListener('close', () => lock(false));
}

function filters(scope: ParentNode) {
  const bar = $('[data-filter-bar]', scope);
  if (!bar) return;
  const items = $$('[data-filter-item]', scope);
  bar.addEventListener('click', (e) => {
    const b = (e.target as Element).closest<HTMLButtonElement>('[data-filter]');
    if (!b) return;
    const v = b.dataset.filter!;
    $$('[data-filter]', bar).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    items.forEach((it) => (it.hidden = v !== 'all' && it.dataset.category !== v));
    const visible = items.filter((it) => !it.hidden);
    gsap.fromTo(visible, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.04 });
    ScrollTrigger.refresh();
  });
}

function tabs(scope: ParentNode) {
  $$('[data-tabs]', scope).forEach((root) => {
    const btns = $$('[data-tab]', root);
    const panels = $$('[data-tab-panel]', root);
    btns.forEach((b) =>
      b.addEventListener('click', () => {
        const v = b.dataset.tab;
        btns.forEach((x) => x.setAttribute('aria-selected', String(x === b)));
        panels.forEach((p) => (p.hidden = p.dataset.tabPanel !== v));
        const on = panels.find((p) => !p.hidden);
        if (on) gsap.fromTo(on.children, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.04 });
        ScrollTrigger.refresh();
      }),
    );
  });
}

function accordions(scope: ParentNode) {
  $$('[data-acc]', scope).forEach((item) => {
    const btn = $('[data-acc-btn]', item);
    const body = $('[data-acc-body]', item);
    if (!btn || !body) return;
    gsap.set(body, { height: 0, overflow: 'hidden' });
    btn.addEventListener('click', () => {
      const open = item.toggleAttribute('data-open');
      btn.setAttribute('aria-expanded', String(open));
      gsap.to(body, {
        height: open ? 'auto' : 0,
        duration: 0.7,
        ease: 'expo.inOut',
        onUpdate: () => ScrollTrigger.update(),
        onComplete: () => ScrollTrigger.refresh(),
      });
    });
  });
}

function reader(scope: ParentNode) {
  $$('[data-reader]', scope).forEach((r) => {
    const strip = $('[data-reader-strip]', r)!;
    const pos = $('[data-reader-pos]', r);
    const pages = strip.children.length;
    const go = (d: number) => strip.scrollBy({ left: d * strip.clientWidth, behavior: 'smooth' });
    $('[data-reader-prev]', r)?.addEventListener('click', () => go(-1));
    $('[data-reader-next]', r)?.addEventListener('click', () => go(1));
    strip.addEventListener(
      'scroll',
      () => {
        if (pos) pos.textContent = `${Math.round(strip.scrollLeft / strip.clientWidth) + 1} / ${pages}`;
      },
      { passive: true },
    );
  });
}

/* =========================================================================
   lifecycle
   ========================================================================= */
let first = true;

async function initPage() {
  const scope = document;
  menu();
  anchors(scope);
  lightbox(scope);
  filters(scope);
  tabs(scope);
  accordions(scope);
  reader(scope);

  await document.fonts.ready;

  mm = gsap.matchMedia();
  mm.add(
    {
      motion: '(prefers-reduced-motion: no-preference)',
      fine: '(hover: hover) and (pointer: fine)',
      wide: '(min-width: 900px)',
    },
    (ctx) => {
      const { motion, fine, wide } = ctx.conditions!;
      if (!motion) return;
      if (wide) horizontal(scope); // pins first: they change the layout below them
      splitLines(scope);
      scrubWords(scope);
      fades(scope);
      imageReveals(scope);
      heroBg(scope, !!fine);
      counters(scope);
      themes(scope);
      marqueeSkew(scope);
      navHide();
      if (fine) {
        hoverLists(scope);
        magnetic(scope);
      }
      return () => {
        splits.forEach((s) => s.revert());
        splits.length = 0;
      };
    },
  );

  if (REDUCE) return;
  if (first) {
    first = false;
    await runLoader();
    heroIntro(scope);
  } else {
    curtainOut();
    gsap.delayedCall(0.35, () => heroIntro(scope));
  }
  ScrollTrigger.refresh();
}

function teardown() {
  ac.abort();
  ac = new AbortController();
  mm?.revert();
  mm = null;
  ScrollTrigger.getAll().forEach((t) => t.kill());
  document.body.classList.remove('is-locked');
}

initSmooth();
initCursor();
{
  const c = curtain();
  if (c) gsap.set(c, { y: 0, yPercent: 115 });
}

document.addEventListener('astro:before-preparation', (ev) => {
  const load = (ev as any).loader as () => Promise<void>;
  (ev as any).loader = async () => {
    lenis?.stop();
    await curtainIn();
    await load();
  };
});
document.addEventListener('astro:before-swap', (ev) => {
  // Astro replaces every attribute on <html> during the swap; carry over the
  // runtime classes (js, has-cursor, lenis*) or the next page loses them.
  const keep = [...document.documentElement.classList].filter((c) => c !== 'is-loading');
  (ev as any).newDocument.documentElement.classList.add(...keep);
  teardown();
});
document.addEventListener('astro:after-swap', () => {
  window.scrollTo(0, 0);
  lenis?.scrollTo(0, { immediate: true, force: true });
  lenis?.start();
});
document.addEventListener('astro:page-load', () => void initPage());

console.log(
  '%cACES CUSAT%c\nReading the source? Come to Software Block after 4. We have chai.\nhttps://www.instagram.com/aces_cusat/',
  'font: 600 20px/1.4 "Stack Sans Notch Variable", sans-serif; color: #007FFF;',
  'font: 13px/1.5 system-ui; color: #56657a;',
);
