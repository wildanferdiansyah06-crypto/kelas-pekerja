"use client";

import { useState, useEffect } from "react";

export function useNavScroll() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 8);
      
      // Hide if scrolling down and past 160px
      if (y > lastY && y > 160) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      
      lastY = y;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial check
    onScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { isScrolled, isHidden };
}
