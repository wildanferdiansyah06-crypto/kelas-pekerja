import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

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
    screens: {
      // Mobile breakpoints - based on common device widths
      'xs': '375px',   // iPhone SE, small phones
      'sm': '390px',   // iPhone 12/13/14, standard mobile
      'md': '414px',   // iPhone Max, larger phones
      'lg': '428px',   // iPhone 14 Pro Max, largest phones
      
      // Tablet breakpoints
      'tablet': '768px',    // iPad mini, small tablets
      'laptop': '1024px',   // iPad Pro, small laptops
      
      // Desktop breakpoints
      'xl': '1280px',   // MacBook Air 13", standard desktop
      '2xl': '1440px',  // MacBook Air 15", larger desktops
      '3xl': '1536px',  // MacBook Pro 14", high-res desktops
      '4xl': '1728px',  // MacBook Pro 16", ultra-wide
      
      // Custom breakpoints for specific device ranges
      'mobile-only': { 'max': '767px' },
      'tablet-only': { 'min': '768px', 'max': '1023px' },
      'desktop-only': { 'min': '1024px' },
    },
    extend: {
      // ==========================================
      // COLORS - Kelas Pekerja Light Mode Palette
      // ==========================================
      colors: {
        kp: {
          // Backgrounds
          'bg-base':     '#faf7f2',
          'bg-surface':  '#f3ede4',
          'bg-elevated': '#ede5d8',
          'bg-invert':   '#1c1410',

          // Text
          'text-primary':   '#1c1410',
          'text-secondary': '#4a3728',
          'text-muted':     '#8a7060',
          'text-subtle':    '#b8a898',
          'text-on-dark':   '#f5f0e8',

          // Accent
          'accent':       '#7c5c3a',
          'accent-hover': '#5e4428',
          'accent-light': '#c4a882',
          'accent-faint': '#f0e8dc',
        },
      },

      // ==========================================
      // TYPOGRAPHY
      // ==========================================
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'Georgia', 'serif'],
        ui:      ['var(--font-ui)', 'system-ui', 'sans-serif'],
        serif: [
          "'Lora'",
          "Georgia",
          "serif",
        ],
        sans: [
          "'DM Sans'",
          "system-ui",
          "sans-serif",
        ],
      },
      typography: ({ theme }: { theme: any }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('fontFamily.body'),
            '--tw-prose-headings': theme('fontFamily.display'),
            '--tw-prose-lead': theme('fontFamily.body'),
            '--tw-prose-links': theme('colors.kp.accent'),
            '--tw-prose-bold': theme('colors.kp.text-primary'),
            '--tw-prose-counters': theme('colors.kp.accent'),
            '--tw-prose-bullets': theme('colors.kp.accent'),
            '--tw-prose-hr': theme('colors.kp.border'),
            '--tw-prose-quotes': theme('colors.kp.text-primary'),
            '--tw-prose-quote-borders': theme('colors.kp.accent'),
            '--tw-prose-captions': theme('colors.kp.text-muted'),
            '--tw-prose-code': theme('colors.kp.text-primary'),
            '--tw-prose-pre-code': theme('colors.kp.text-muted'),
            '--tw-prose-pre-bg': theme('colors.kp.bg-surface'),
            '--tw-prose-th-borders': theme('colors.kp.border'),
            '--tw-prose-td-borders': theme('colors.kp.border'),
          },
        },
      }),
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
      // BOX SHADOW
      // ==========================================
      boxShadow: {
        'kp-sm': '0 1px 8px rgba(50, 30, 10, 0.06)',
        'kp-md': '0 4px 20px rgba(50, 30, 10, 0.08)',
        'kp-lg': '0 8px 40px rgba(50, 30, 10, 0.12)',
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
    typography,
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
