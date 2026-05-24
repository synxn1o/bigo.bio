// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://bigo.bio',
  output: 'server',
  adapter: cloudflare(),
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    routing: {
        prefixDefaultLocale: false
    }
  },
  image: {
    domains: ['cdn.bigo.bio'],
  }
});
