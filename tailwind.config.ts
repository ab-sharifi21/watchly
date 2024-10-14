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
        'primary-color': '#df2144',
        'secondary-color': '#ffd600',
        'primary-bg-color': '#303030',
        'secondary-bg-color': '#202020',
      },
    },
    rotate: {
      '180deg': '180deg',
    },
  },
  plugins: [],
};
export default config;
