// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://acescusat.tech',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      lastmod: new Date(),
    }),
  ],
  vite: {
    build: { sourcemap: false },
  },
});
