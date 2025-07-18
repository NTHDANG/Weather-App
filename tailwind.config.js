/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
  },

  plugins: [daisyui],

  daisyui: {
    themes: ["light", "dark"],
  },
};
