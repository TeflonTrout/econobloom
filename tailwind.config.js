import { Config } from 'tailwindcss';
const colors = require("tailwindcss/colors")

/**
 * @type {Config}
 */

const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    colors: {
      'primary-green': '#4CAF50',
      'accent-green': '#81C784',
      'dark-green': '#388E3C',
      'sunset-orange': '#FF9800',
      'sky-blue': '#03A9F4',
      'neutral-gray': '#E0E0E0',
      'white': '#FFFFFF', // Usually defined by default, included here for completeness
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      blue: colors.blue,
      green: colors.green
    },
  },
  plugins: [],
};

export default config;
