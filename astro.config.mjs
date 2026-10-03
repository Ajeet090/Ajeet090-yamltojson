// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://yamltojson.net',
  integrations: [tailwind()],
  build: {
    inlineStylesheets: 'always'
  }
});






