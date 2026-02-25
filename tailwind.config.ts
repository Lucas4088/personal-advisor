import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          500: '#6b7280',
          950: '#030712',
        },
        red: {
          50: '#fef2f2',
          700: '#b91c1c',
          800: '#991b1b',
        },
      },
      fontFamily: {
        // Add custom fonts here if needed
      },
    },
  },
  plugins: [],
};

export default config;

