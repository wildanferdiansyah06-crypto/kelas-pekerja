"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function useScrollReveal() {
  const pathname = usePathname();
  const revealIORef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Pastikan body tidak pernah terkunci akibat preloader lama
    document.body.classList.remove("is-locked");

    if (revealIORef.current) {
      revealIORef.current.disconnect();
      revealIORef.current = null;
    }

    const timer = setTimeout(() => {
      const REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const els = Array.from(document.querySelectorAll("[data-rv]"));

      if (!els.length) return;

      if (!("IntersectionObserver" in window) || REDUCE) {
        els.forEach((el) => el.classList.add("rv-in"));
        return;
      }

      els.forEach((el) => el.classList.remove("rv-in"));

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add("rv-in");
              io.unobserve(en.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -4% 0px" }
      );

      els.forEach((el) => io.observe(el));
      revealIORef.current = io;
    }, 120);

    return () => {
      clearTimeout(timer);
      if (revealIORef.current) {
        revealIORef.current.disconnect();
        revealIORef.current = null;
      }
    };
  }, [pathname]);
}
