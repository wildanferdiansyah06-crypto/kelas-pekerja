"use client";

import { useEffect } from "react";

export function useCustomCursor() {
  useEffect(() => {
    const FINE = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
    if (!FINE) return; // Only apply on non-touch devices

    const cur = document.getElementById("cursor");
    if (!cur) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let curX = mouseX;
    let curY = mouseY;
    let isHovering = false;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t?.closest && t.closest("a, button, [data-cursor]")) {
        isHovering = true;
      }
    };

    const out = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t?.closest && t.closest("a, button, [data-cursor]")) {
        isHovering = false;
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", over, { passive: true });
    document.addEventListener("mouseout", out, { passive: true });

    let rafId: number;
    const loop = () => {
      curX = lerp(curX, mouseX, 0.2);
      curY = lerp(curY, mouseY, 0.2);
      
      cur.style.transform = `translate(${curX}px, ${curY}px)`;
      
      if (isHovering) {
        cur.style.width = "48px";
        cur.style.height = "48px";
        cur.style.margin = "-24px 0 0 -24px";
        cur.style.opacity = "0.5";
      } else {
        cur.style.width = "8px";
        cur.style.height = "8px";
        cur.style.margin = "-4px 0 0 -4px";
        cur.style.opacity = "1";
      }
      
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      cancelAnimationFrame(rafId);
    };
  }, []);
}
