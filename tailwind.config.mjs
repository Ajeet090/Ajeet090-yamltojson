/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        canvas: '#fafafa',
        'canvas-elevated': '#ffffff',
        ink: '#171717',
        body: '#4d4d4d',
        mute: '#666666',
        faint: '#6e6e6e',
        hairline: '#ebebeb',
        'hairline-soft': '#f2f2f2',
        link: {
          DEFAULT: '#0070f3',
          deep: '#0761d1',
          soft: '#d3e5ff',
        },
        error: '#ee0000',
        warning: '#f5a623',
      },
    },
  },
  plugins: [],
}
