import type { Config } from 'tailwindcss';

const viewports = {
  '10vw': '10vw',
  '20vw': '20vw',
  '30vw': '30vw',
  '40vw': '40vw',
  '50vw': '50vw',
  '60vw': '60vw',
  '70vw': '70vw',
  '80vw': '80vw',
  '90vw': '90vw',
  '100vw': '100vw',
  '10vh': '10vh',
  '20vh': '20vh',
  '30vh': '30vh',
  '40vh': '40vh',
  '50vh': '50vh',
  '60vh': '60vh',
  '70vh': '70vh',
  '80vh': '80vh',
  '90vh': '90vh',
  '100vh': '100vh'
};

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
  108: '108px',
  112: '112px',
  120: '120px',
  140: '140px',
  160: '160px',
  180: '180px',
  200: '200px',
  240: '240px',
  300: '300px',
  320: '320px',
  360: '360px',
  400: '400px',
  460: '460px',
  480: '480px',
  500: '500px',
  560: '560px',
  600: '600px',
  640: '640px',
  720: '720px',
  800: '800px',
  960: '960px',
  1000: '1000px',
  1200: '1200px',
  ...viewports
};

const config: Config = {
  darkMode: 'class',
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    'node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}'
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
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-7deg)" },
          "50%": { transform: "rotate(7deg)" }
        },
        growAndShrink: {
          "0%, 100%": { transform: "scale(1)" },
          "20%, 40%": { transform: "scale(1.2)" }
        },
        singlePing: {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(3)" },
        },
        popoverRightIn: {
          "0%": { opacity: "0", transform: "scale(0)" },
          "80%": { opacity: "1", transform: "scale(1.1)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        popoverRightOut: {
          "0%": { opacity: "0", transform: "scale(0)" },
          "80%": { opacity: "1", transform: "scale(1.1)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        }
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out",
        growAndShrink: "growAndShrink 400ms ease-in-out",
        singlePing: "singlePing 400ms",
        popIn: "popIn 400ms ease-in-out"
      },
    }
  },
  plugins: [
  ]
};

export default config;
