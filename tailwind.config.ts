import type { Config } from 'tailwindcss';

const spacing = {
  0: '0',
  2: '2px',
  4: '4px',
  6: '6px',
  8: '8px',
  10: '10px',
  12: '12px',
  14: '14px',
  16: '16px',
  18: '18px',
  20: '20px',
  24: '24px',
  32: '32px',
  40: '40px',
  48: '48px',
  56: '56px',
  60: '60px',
  64: '64px',
  72: '72px',
  80: '80px',
  96: '96px',
  100: '100px',
  108: '108px',
  120: '120px',
  140: '140px',
  150: '150px',
  160: '160px',
  180: '180px',
  200: '200px',
  240: '240px',
  250: '250px',
  267: '267px',
  300: '300px',
  350: '350px',
  360: '360px',
  400: '400px',
  450: '450px',
  480: '480px',
  500: '500px',
  650: '650px',
  700: '700px',
  720: '720px',
  840: '840px'
};

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    spacing
  },
  plugins: []
};

export default config;
