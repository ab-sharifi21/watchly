import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js, ts, jsx, tsx, mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#df2144',
        'secondary-color': '#ffd600',
        'primary-bg-color': '#000000',
        'secondary-bg-color': '#202020',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.5s forwards',
      },
    },
    rotate: {
      '180deg': '180deg',
    },
  },
  plugins: [],
};
export default config;
