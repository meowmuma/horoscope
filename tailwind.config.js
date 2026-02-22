/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          200: '#E8D4F8',
        },
        pink: {
          200: '#F5CAE8',
          300: '#FFCDE1',
          500: '#E8B5D8',
        },
      },
    },
  },
  plugins: [],
};
