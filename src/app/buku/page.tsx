@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-serif: 'Playfair Display', serif;
  --font-sans: 'Inter', sans-serif;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    font-feature-settings: "liga" 1, "calt" 1;
  }

  ::selection {
    background-color: rgba(139, 115, 85, 0.3);
  }
}

@layer components {
  .font-serif {
    font-family: var(--font-serif);
  }

  .font-sans {
    font-family: var(--font-sans);
  }
}

@layer utilities {
  /* Animations */
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slide-in-right {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes breathe {
    0%, 100% { transform: scale(1.05); }
    50% { transform: scale(1.08); }
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(-25%);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: translateY(0);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  /* Animation Classes */
  .animate-breathe {
    animation: breathe 20s ease-in-out infinite;
  }

  .animate-fade-in {
    animation: fade-in 0.6s ease-out forwards;
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out forwards;
  }

  .animate-slide-in-right {
    animation: slide-in-right 0.5s ease-out forwards;
  }

  .animate-bounce {
    animation: bounce 1s infinite;
  }

  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .animate-shimmer {
    background: linear-gradient(
      90deg,
      rgba(139, 115, 85, 0.1) 25%,
      rgba(139, 115, 85, 0.2) 50%,
      rgba(139, 115, 85, 0.1) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }

  /* Delays */
  .delay-75 { animation-delay: 75ms; }
  .delay-100 { animation-delay: 100ms; }
  .delay-150 { animation-delay: 150ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-500 { animation-delay: 500ms; }
  .delay-700 { animation-delay: 700ms; }
  .delay-1000 { animation-delay: 1000ms; }

  /* Line Clamp */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Scrollbar Hide */
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  /* Grain Overlay */
  .grain-overlay {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    opacity: 0.015;
    mix-blend-mode: multiply;
    background-image: url("https://www.transparenttextures.com/patterns/cream-paper.png");
  }

  /* Prose Custom */
  .prose-custom {
    font-size: 18px;
    line-height: 1.85;
  }

  /* Focus Ring */
  .focus-ring {
    outline: none;
    box-shadow: 0 0 0 2px rgba(139, 115, 85, 0.5);
  }

  /* Transitions */
  .transition-transform {
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  .transition-colors {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  .transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  /* Scale */
  .hover\:scale-102:hover { transform: scale(1.02); }
  .hover\:scale-105:hover { transform: scale(1.05); }
  .active\:scale-95:active { transform: scale(0.95); }
  .active\:scale-98:active { transform: scale(0.98); }

  /* Skeleton */
  .skeleton {
    animation: shimmer 2s infinite;
    border-radius: 0.25rem;
  }

  /* Loading Dots */
  .loading-dots {
    display: flex;
    gap: 4px;
  }

  .loading-dots > div {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: currentColor;
    animation: bounce 0.6s infinite alternate;
  }

  .loading-dots > div:nth-child(2) { animation-delay: 0.15s; }
  .loading-dots > div:nth-child(3) { animation-delay: 0.3s; }
}

/* Global Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(139, 115, 85, 0.3);
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(139, 115, 85, 0.5);
}
