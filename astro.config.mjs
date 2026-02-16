import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';

export default defineConfig({
  site: 'https://pirlotv.velcuri.io',
  build: { format: 'directory' },
  output: 'static',
  trailingSlash: 'always',
  integrations: [compress()]
});
