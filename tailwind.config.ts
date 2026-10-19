import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#F2F7F4',
          100: '#E1EDE6',
          200: '#C2DBCB',
          300: '#99C1AA',
          400: '#6FA485',
          500: '#4B8863',
          600: '#346C4C',
          700: '#26543A',
          800: '#1B382B', // primary brand forest
          900: '#12261D',
          950: '#0A1510',
        },
        sage: {
          50: '#F6F8F6',
          100: '#EBF1EB',
          200: '#D7E3D8',
          300: '#BACFBC',
          400: '#9AB89D',
          500: '#7E9987', // primary sage
          600: '#637E6B',
          700: '#4D6254',
          800: '#3D4E43',
          900: '#334037',
        },
        sand: {
          50: '#FAF8F5', // warm off-white canvas
          100: '#F5F2EB', // secondary subtle background
          200: '#EBE5D8',
          300: '#DFD7C4',
          400: '#D0C4AC',
          500: '#BEAD91',
          600: '#A99577',
          700: '#8C7A60',
          800: '#6F614C',
          900: '#564C3B',
        },
        gold: {
          50: '#FBF9F2',
          100: '#F6F1E0',
          200: '#ECE2C0',
          300: '#DFCFA0',
          400: '#D1BB7D',
          500: '#C5A880', // restrained gold accent
          600: '#B09062',
          700: '#8F7249',
          800: '#6F5737',
          900: '#524029',
        },
        charcoal: {
          50: '#F7F8F8',
          100: '#EEF0F0',
          200: '#D8DBDB',
          300: '#B8BEBE',
          400: '#909A99',
          500: '#6B7675',
          600: '#535E5D',
          700: '#404B4A',
          800: '#2F3737',
          900: '#1C2421', // primary rich dark body
          950: '#0E1312',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 1px 3px rgba(28, 36, 33, 0.05)',
        'soft': '0 4px 14px rgba(28, 36, 33, 0.06)',
        'soft-md': '0 6px 20px rgba(28, 36, 33, 0.08)',
        'soft-lg': '0 12px 32px rgba(28, 36, 33, 0.10)',
      },
    },
  },
  plugins: [],
};

export default config;
