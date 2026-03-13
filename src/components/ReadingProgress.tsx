'use client';

import { useState, useEffect } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateProgress = () => {
      const doc = document.documentElement;

      if (!doc) return;

      const scrollHeight = doc.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY || window.pageYOffset;

      if (scrollHeight <= 0) {
        setProgress(0);
        return;
      }

      const value = (scrolled / scrollHeight) * 100;
      setProgress(value);
    };

    updateProgress();

    window.addEventListener('scroll', updateProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-[#8b7355]/10">
      <div
        className="h-full bg-[#8b7355] transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
