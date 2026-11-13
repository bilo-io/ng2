import type { Config } from 'tailwindcss';
import midnite from './src/vendor/midnite-ui/tailwind.config';

// The midnite-ui theme (token colours, radii, `.dark` class), scanning this app's templates.
const config: Config = {
  darkMode: midnite.darkMode,
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      ...midnite.theme?.extend,
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
    },
  },
};

export default config;
