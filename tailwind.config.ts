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
      // ==========================================
      // COLORS - Kelas Pekerja Palette
      // ==========================================
      colors: {
        // Background layers
        kp: {
          bg: "#0f0e0c",           // Deep dark background
          "bg-light": "#1a1816",    // Card/surface background
          "bg-lighter": "#252320",  // Elevated surfaces
        },
        // Text colors
        text: {
          primary: "#f5f0e8",       // Main headings
          secondary: "#e8e0d5",     // Body text
          muted: "#a09080",         // Secondary text
          subtle: "#8b7355",        // Accents, labels
          dim: "#6b5a45",           // Footer, captions
        },
        // Accent (warm brown/coffee tones)
        accent: {
          DEFAULT: "#8b7355",       // Primary accent
          light: "#a08060",         // Hover states
          lighter: "#c4b5a0",       // Highlights
          dark: "#6b5635",          // Pressed states
        },
        // Utility
        border: {
          DEFAULT: "#8b7355",
          subtle: "rgba(139, 115, 85, 0.1)",
          light: "rgba(139, 115, 85, 0.2)",
          medium: "rgba(139, 115, 85, 0.3)",
        },
      },

      // ==========================================
      // TYPOGRAPHY
      // ==========================================
      fontFamily: {
        serif: [
          "Georgia",
          "Cambria",
          '"Times New Roman"',
          "Times",
          "serif",
        ],
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
      },
      fontSize: {
        "2xs": "0.625rem", // 10px for small labels
      },
      letterSpacing: {
        wider: "0.1em",
        widest: "0.2em",
      },
      lineHeight: {
        relaxed: "1.75",
        loose: "1.9",
      },

      // ==========================================
      // ANIMATIONS
      // ==========================================
      animation: {
        "fade-in": "fadeIn 1s ease-out",
        "fade-in-up": "fadeInUp 0.8s ease-out",
        "fade-in-slow": "fadeIn 1.5s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "bounce-slow": "bounceSlow 2s infinite",
        "pulse-soft": "pulseSoft 3s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(40px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        bounceSlow: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
        pulseSoft: {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.7",
          },
        },
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
      },

      // ==========================================
      // SPACING & LAYOUT
      // ==========================================
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      maxWidth: {
        "prose": "65ch",
        "prose-lg": "75ch",
      },

      // ==========================================
      // BORDER RADIUS
      // ==========================================
      borderRadius: {
        "4xl": "2rem",
      },

      // ==========================================
      // BACKGROUND IMAGE
      // ==========================================
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-overlay": "linear-gradient(to bottom, rgba(15, 14, 12, 0.8), rgba(15, 14, 12, 0.9), rgba(15, 14, 12, 1))",
      },
    },
  },
  plugins: [
    // Custom plugin for line-clamp (since Tailwind 3.3+ moved it to core)
    function({ addUtilities }: { addUtilities: Function }) {
      addUtilities({
        ".line-clamp-2": {
          display: "-webkit-box",
          "-webkit-line-clamp": "2",
          "-webkit-box-orient": "vertical",
          overflow: "hidden",
        },
        ".line-clamp-3": {
          display: "-webkit-box",
          "-webkit-line-clamp": "3",
          "-webkit-box-orient": "vertical",
          overflow: "hidden",
        },
        ".line-clamp-4": {
          display: "-webkit-box",
          "-webkit-line-clamp": "4",
          "-webkit-box-orient": "vertical",
          overflow: "hidden",
        },
        ".text-balance": {
          "text-wrap": "balance",
        },
        // Hide scrollbar but keep functionality
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    },
  ],
};

export default config;
