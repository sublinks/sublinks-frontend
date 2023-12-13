import type { Config } from 'tailwindcss';

const spacing = {
  0: '0',
  2: '2px',
  4: '4px',
  8: '8px',
  12: '12px',
  16: '16px',
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
  120: '120px',
  140: '140px',
  160: '160px',
  180: '180px',
  200: '200px',
  240: '240px',
  300: '300px',
  360: '360px',
  400: '400px',
  480: '480px',
  500: '500px'
};

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    'node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    spacing,
    maxHeight: {
      ...spacing,
      full: '100%'
    },
    maxWidth: {
      ...spacing,
      full: '100%'
    },
    minHeight: {
      ...spacing,
      full: '100%'
    },
    minWidth: {
      ...spacing,
      full: '100%'
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: '#8e4d63',
          dark: '#f8c234'
        },
        primary: {
          DEFAULT: '#ffffff',
          dark: '#374151'
        },
        secondary: {
          DEFAULT: '#f3f4f6',
          dark: '#111827'
        },
        hover: {
          DEFAULT: '#d1d5db',
          dark: '#4b5563',
          'md-editor': '#58a6ff'
        }
      }
    }
  },
  plugins: []
};

export default config;
