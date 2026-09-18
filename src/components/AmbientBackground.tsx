"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function AmbientBackground() {
  const pathname = usePathname();
  // Simpan observer aktif agar bisa di-disconnect saat navigasi
  const revealIORef = useRef<IntersectionObserver | null>(null);

  /* ═══════════════════════════════════════════════════════════════════
     EFFECT 1: Jalankan SETIAP kali pathname berubah
     Tugasnya: bersihkan lock body + setup ulang reveal observer
     untuk elemen DOM yang baru di-render oleh halaman baru.
  ═══════════════════════════════════════════════════════════════════ */
  useEffect(() => {
    // Pastikan body tidak pernah terkunci akibat preloader lama
    document.body.classList.remove("is-locked");

    // Disconnect observer lama supaya tidak memory leak
    if (revealIORef.current) {
      revealIORef.current.disconnect();
      revealIORef.current = null;
    }

    // Beri waktu 120ms untuk React selesai commit DOM baru
    // (penting: elemen [data-rv] di halaman baru belum ada sebelum ini)
    const timer = setTimeout(() => {
      const REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const els = Array.from(document.querySelectorAll("[data-rv]"));

      if (!els.length) return;

      // Jika motion reduced atau tidak ada IO support → langsung tampilkan semua
      if (!("IntersectionObserver" in window) || REDUCE) {
        els.forEach((el) => el.classList.add("rv-in"));
        return;
      }

      // Reset ke state awal terlebih dulu
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
      // Bersihkan observer saat unmount / navigasi berikutnya
      if (revealIORef.current) {
        revealIORef.current.disconnect();
        revealIORef.current = null;
      }
    };
  }, [pathname]);

  /* ═══════════════════════════════════════════════════════════════════
     EFFECT 2: Hanya berjalan SEKALI saat pertama mount
     Tugasnya: preloader, custom cursor, Three.js 3D scene
  ═══════════════════════════════════════════════════════════════════ */
  useEffect(() => {
    const REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const FINE = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const damp = (cur: number, to: number, rate: number, dt: number) =>
      lerp(cur, to, 1 - Math.exp(-rate * dt));

    function mulberry32(seed: number) {
      return function () {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }

    /* ── preloader (sekali saja) ─────────────────────────────────── */
    if (!(window as any).__kp_pre_done) {
      (window as any).__kp_pre_done = true;
      document.body.classList.add("is-locked");
      const fill = document.getElementById("pre-fill");
      const pctEl = document.getElementById("pre-pct");
      const pre = document.getElementById("pre");
      let pct = 0;
      const timer = setInterval(() => {
        pct = Math.min(96, pct + (96 - pct) * 0.1 + 0.6);
        if (fill) fill.style.right = 100 - pct + "%";
        if (pctEl) pctEl.textContent = Math.floor(pct).toString();
      }, 90);
      const finish = () => {
        clearInterval(timer);
        if (fill) fill.style.right = "0%";
        if (pctEl) pctEl.textContent = "100";
        setTimeout(() => {
          if (pre) pre.classList.add("done");
          document.body.classList.remove("is-locked");
        }, 340);
      };
      if (document.readyState === "complete") setTimeout(finish, 500);
      else window.addEventListener("load", () => setTimeout(finish, 400));
      setTimeout(finish, 2600);
    } else {
      // Navigasi berikutnya: sembunyikan preloader seketika
      const pre = document.getElementById("pre");
      if (pre) pre.classList.add("done");
    }

    /* ── custom cursor (sekali saja) ─────────────────────────────── */
    if (!(window as any).__kp_cursor_init && FINE && !REDUCE) {
      (window as any).__kp_cursor_init = true;
      const cur = document.getElementById("cursor");
      if (cur) {
        cur.classList.add("on");
        window.addEventListener(
          "mousemove",
          (e: MouseEvent) => {
            cur.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
          },
          { passive: true }
        );
        // Cursor big state untuk elemen interaktif
        document.addEventListener("mouseover", (e: MouseEvent) => {
          if ((e.target as Element)?.closest("[data-cursor]")) {
            cur.classList.add("big");
          } else {
            cur.classList.remove("big");
          }
        });
      }
    }

    /* ── Three.js 3D Scene (sekali saja) ─────────────────────────── */
    if ((window as any).__kp_gl_init) return;
    
    let glInitRetries = 0;
    const initGL = () => {
      const canvas = document.getElementById("gl") as HTMLCanvasElement;
      const THREE = (window as any).THREE;
      
      if (!canvas || !THREE) {
        if (glInitRetries < 20) {
          glInitRetries++;
          setTimeout(initGL, 100);
        }
        return;
      }
      
      (window as any).__kp_gl_init = true;

    let W = innerWidth, H = innerHeight;
    let lastT = performance.now();
    let mxTarget = 0, myTarget = 0, mx = 0, my = 0;

    /* ── canvas textures ─────────────────────────────────────────── */
    function makePaperTexture(rnd: () => number) {
      const c = document.createElement("canvas");
      c.width = 512; c.height = 700;
      const ctx = c.getContext("2d")!;
      const bg = ctx.createLinearGradient(0, 0, 0, 700);
      bg.addColorStop(0, "#0e0b07");
      bg.addColorStop(1, "#120f0a");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, 512, 700);
      ctx.lineWidth = 0.7;
      for (let y = 56; y < 680; y += 26) {
        ctx.strokeStyle = `rgba(201,144,63,${0.06 + rnd() * 0.07})`;
        ctx.beginPath();
        ctx.moveTo(48, y);
        ctx.lineTo(490, y);
        ctx.stroke();
      }
      ctx.strokeStyle = "rgba(209,96,47,0.16)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(48, 0);
      ctx.lineTo(48, 700);
      ctx.stroke();
      for (let row = 56; row < 650; row += 26) {
        if (rnd() < 0.55) continue;
        let x = 56;
        while (x < 460) {
          const w = 6 + rnd() * 18;
          ctx.strokeStyle = `rgba(190,160,110,${0.04 + rnd() * 0.06})`;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.moveTo(x, row + 1);
          ctx.lineTo(x + w, row + 1);
          ctx.stroke();
          x += w + 3 + rnd() * 8;
        }
      }
      for (let i = 0; i < 12000; i++) {
        ctx.fillStyle = `rgba(210,185,140,${rnd() * 0.018})`;
        ctx.fillRect(rnd() * 512, rnd() * 700, 1, 1);
      }
      const tex = new THREE.CanvasTexture(c);
      tex.needsUpdate = true;
      return tex;
    }

    function makeGlowTexture() {
      const c = document.createElement("canvas");
      c.width = c.height = 128;
      const ctx = c.getContext("2d")!;
      const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.3, "rgba(255,200,120,0.6)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 128, 128);
      const tex = new THREE.CanvasTexture(c);
      tex.needsUpdate = true;
      return tex;
    }

    function makeDotTexture() {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const ctx = c.getContext("2d")!;
      const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(255,230,180,1)");
      g.addColorStop(0.5, "rgba(220,180,100,0.4)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 64, 64);
      const tex = new THREE.CanvasTexture(c);
      tex.needsUpdate = true;
      return tex;
    }

    /* ── renderer ────────────────────────────────────────────────── */
    try {
      const renderer = new THREE.WebGLRenderer({
        canvas, antialias: true, alpha: true, powerPreference: "low-power",
        premultipliedAlpha: false,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
      renderer.setSize(W, H);
      renderer.setClearColor(0x000000, 0); // transparan
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;

      const scene = new THREE.Scene();
      scene.background = null; // biarkan canvas transparan
      scene.fog = new THREE.FogExp2(0x0a0908, 0.022); // fog lebih ringan

      const camera = new THREE.PerspectiveCamera(42, W / H, 0.05, 60);
      camera.position.set(0, 0, 10);

      /* lights */
      const warmLight = new THREE.PointLight(0xd4843a, REDUCE ? 1.5 : 2.8, 30);
      warmLight.position.set(0, 2, 5);
      scene.add(warmLight);
      const coolLight = new THREE.PointLight(0x2a3d5a, 0.6, 28);
      coolLight.position.set(-8, -3, -2);
      scene.add(coolLight);
      scene.add(new THREE.AmbientLight(0x140e09, 0.45));

      /* paper planes */
      const rndP = mulberry32(42);
      const paperTex = makePaperTexture(rndP);
      const papers: any[] = [];
      const PAPER_COUNT = REDUCE ? 8 : 18;

      for (let i = 0; i < PAPER_COUNT; i++) {
        const w = 1.1 + rndP() * 2.2;
        const h = w * (1.28 + rndP() * 0.18);
        const opacity = 0.08 + rndP() * 0.72;
        const mat = new THREE.MeshStandardMaterial({
          map: paperTex, roughness: 0.96, metalness: 0,
          transparent: true, opacity, side: THREE.DoubleSide,
          depthWrite: opacity > 0.45,
        });
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
        const zDepth = -1.5 - rndP() * 16;
        mesh.position.set((rndP() - 0.5) * 18, (rndP() - 0.5) * 11 - 0.5, zDepth);
        mesh.rotation.set((rndP() - 0.5) * 0.5, (rndP() - 0.5) * 0.7, (rndP() - 0.5) * 0.35);
        const rs = 1 - Math.abs(zDepth) / 20;
        mesh.userData = {
          baseY: mesh.position.y, baseX: mesh.position.x,
          rotVX: (rndP() - 0.5) * 0.0004 * rs,
          rotVY: (rndP() - 0.5) * 0.0006 * rs,
          rotVZ: (rndP() - 0.5) * 0.0003 * rs,
          floatSpeed: 0.15 + rndP() * 0.3,
          floatPhase: rndP() * Math.PI * 2,
          driftX: (rndP() - 0.5) * 0.12,
          driftPhase: rndP() * Math.PI * 2,
        };
        scene.add(mesh);
        papers.push(mesh);
      }

      /* dust particles */
      const rndD = mulberry32(77);
      const DUST_N = REDUCE ? 80 : 260;
      const dustGeo = new THREE.BufferGeometry();
      const dPos = new Float32Array(DUST_N * 3);
      const dSpd = new Float32Array(DUST_N);
      const dOpa = new Float32Array(DUST_N);
      for (let i = 0; i < DUST_N; i++) {
        dPos[i * 3] = (rndD() - 0.5) * 28;
        dPos[i * 3 + 1] = (rndD() - 0.5) * 16 - 4;
        dPos[i * 3 + 2] = -rndD() * 20 - 0.5;
        dSpd[i] = 0.12 + rndD() * 0.45;
        dOpa[i] = rndD();
      }
      dustGeo.setAttribute("position", new THREE.BufferAttribute(dPos, 3));
      const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
        size: REDUCE ? 0.06 : 0.08, map: makeDotTexture(), color: 0xe8c98a,
        transparent: true, opacity: 0.42, depthWrite: false,
        blending: THREE.AdditiveBlending, sizeAttenuation: true,
      }));
      scene.add(dust);

      /* bokeh sprites */
      const rndB = mulberry32(13);
      const bokehGroup = new THREE.Group();
      const glowTex = makeGlowTexture();
      const BOKEH_N = REDUCE ? 10 : 28;
      const bokehCols = [0xc9903f, 0xd1602f, 0xece3d3, 0x3a5068, 0x8a6030];
      for (let i = 0; i < BOKEH_N; i++) {
        const mat = new THREE.SpriteMaterial({
          map: glowTex, color: new THREE.Color(bokehCols[i % bokehCols.length]),
          transparent: true, opacity: 0.02 + rndB() * 0.12,
          depthWrite: false, blending: THREE.AdditiveBlending,
        });
        const spr = new THREE.Sprite(mat);
        const s = 2.2 + rndB() * 6.5;
        spr.scale.set(s, s, 1);
        spr.position.set((rndB() - 0.5) * 30, (rndB() - 0.5) * 18 - 2, -rndB() * 24 - 1);
        spr.userData = {
          baseY: spr.position.y, baseX: spr.position.x,
          speed: 0.2 + rndB() * 0.5, phase: rndB() * Math.PI * 2,
        };
        bokehGroup.add(spr);
      }
      scene.add(bokehGroup);

      /* grid depth cue */
      if (!REDUCE) {
        const gridMat = new THREE.LineBasicMaterial({
          color: 0xc9903f, transparent: true, opacity: 0.025,
          blending: THREE.AdditiveBlending,
        });
        for (let g = -6; g <= 4; g++) {
          const gGeo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-18, g, -8), new THREE.Vector3(18, g, -8),
          ]);
          scene.add(new THREE.Line(gGeo, gridMat));
        }
      }

      /* events */
      if (FINE && !REDUCE) {
        window.addEventListener("mousemove", (e) => {
          mxTarget = (e.clientX / W - 0.5) * 2;
          myTarget = (e.clientY / H - 0.5) * 2;
        }, { passive: true });
      }
      window.addEventListener("resize", () => {
        W = innerWidth; H = innerHeight;
        renderer.setSize(W, H);
        camera.aspect = W / H;
        camera.updateProjectionMatrix();
      });

      /* animate */
      function animate(now: number) {
        requestAnimationFrame(animate);
        const dt = clamp((now - lastT) / 1000, 0, 0.05);
        lastT = now;
        const t = now * 0.001;

        mx = damp(mx, mxTarget, 2.2, dt);
        my = damp(my, myTarget, 2.2, dt);

        camera.position.x = damp(camera.position.x, mx * -1.4, 1.2, dt);
        camera.position.y = damp(camera.position.y, my * 0.7, 1.2, dt);
        camera.rotation.y = mx * -0.04;
        camera.rotation.x = my * 0.025;

        warmLight.position.x = damp(warmLight.position.x, mx * 7, 1.8, dt);
        warmLight.position.y = damp(warmLight.position.y, -my * 4 + 2, 1.8, dt);

        for (const p of papers) {
          const d = p.userData;
          p.rotation.x += d.rotVX;
          p.rotation.y += d.rotVY;
          p.rotation.z += d.rotVZ;
          p.position.y = d.baseY + Math.sin(t * d.floatSpeed + d.floatPhase) * 0.32;
          p.position.x = d.baseX + Math.cos(t * d.driftX + d.driftPhase) * 0.22;
        }

        for (const spr of bokehGroup.children as any[]) {
          const d = spr.userData;
          spr.position.y = d.baseY + Math.sin(t * d.speed + d.phase) * 0.55;
          spr.position.x = d.baseX + Math.cos(t * d.speed * 0.6 + d.phase) * 0.38;
        }

        if (!REDUCE) {
          const arr = dustGeo.attributes.position.array as Float32Array;
          for (let k = 0; k < arr.length; k += 3) {
            arr[k + 1] += dt * 0.1 * (0.5 + dSpd[k / 3]);
            arr[k] += dt * (dOpa[k / 3] - 0.5) * 0.04;
            if (arr[k + 1] > 9) arr[k + 1] = -9;
          }
          dustGeo.attributes.position.needsUpdate = true;
          dust.rotation.y += dt * 0.006;
        }

        renderer.render(scene, camera);
      }
      requestAnimationFrame(animate);
    } catch (e) {
      console.error("WebGL init error:", e);
      const canvas = document.getElementById("gl");
      if (canvas) canvas.style.display = "none";
    }
  };
  
  // Mulai inisialisasi WebGL
  initGL();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
