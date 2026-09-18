"use client";

import { useEffect } from "react";

export function usePreloader() {
  useEffect(() => {
    // Only run once per full page load
    if ((window as any).__kp_pre_done) {
      return;
    }
    
    (window as any).__kp_pre_done = true;
    
    const fill = document.getElementById("pre-fill");
    const pctEl = document.getElementById("pre-pct");
    const pre = document.getElementById("pre");
    
    if (!fill || !pctEl || !pre) {
      return;
    }

    let pct = 0;
    const timer = setInterval(() => {
      pct = Math.min(96, pct + (96 - pct) * 0.1 + 0.6);
      fill.style.width = pct + "%";
      pctEl.innerText = Math.floor(pct).toString();
      
      // if almost done (waiting for NextJS hydrate)
      if (pct > 95) {
        clearInterval(timer);
        finishPreload();
      }
    }, 40);

    const finishPreload = () => {
      fill.style.width = "100%";
      pctEl.innerText = "100";
      setTimeout(() => {
        pre.classList.add("out");
        setTimeout(() => {
          pre.style.display = "none";
        }, 1200);
      }, 400);
    };

    // Failsafe 4s
    const failSafe = setTimeout(() => {
      clearInterval(timer);
      finishPreload();
    }, 4000);

    return () => {
      clearInterval(timer);
      clearTimeout(failSafe);
    };
  }, []);
}
