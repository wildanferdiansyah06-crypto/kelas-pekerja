import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",

  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  safelist: [
    "bg-blue-500",
    "bg-amber-500",
    "bg-red-500",
    "bg-purple-500",
    "bg-neutral-800",
    "bg-neutral-900",
  ],

  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 1s ease-out",
      },

      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
    },
  },

  plugins: [],
};

export default config;
