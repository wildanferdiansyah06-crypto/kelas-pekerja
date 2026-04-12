import { useMemo } from 'react';

/**
 * Hook to detect if user prefers reduced motion
 * Automatically disables animations for better performance and accessibility
 */
export function useReducedMotion() {
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  }, []);

  // On mobile, prefer reduced motion for better performance
  return prefersReducedMotion || isMobile;
}

/**
 * Hook to get animation settings based on device and preferences
 */
export function useAnimationSettings() {
  const reducedMotion = useReducedMotion();
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  }, []);

  return {
    disabled: reducedMotion,
    // Slower animations on mobile for better performance
    duration: reducedMotion ? 0 : (isMobile ? 0.3 : 0.5),
    // Reduce complexity on mobile
    staggerChildren: reducedMotion ? 0 : (isMobile ? 0.05 : 0.1),
    // Simpler transitions on mobile
    transition: reducedMotion ? { duration: 0 } : {
      type: "spring",
      stiffness: isMobile ? 300 : 400,
      damping: isMobile ? 30 : 25,
    },
  };
}
