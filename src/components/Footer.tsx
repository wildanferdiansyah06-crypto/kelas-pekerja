"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getConfig } from "@/src/lib/api";

export default function Footer() {
  const [config, setConfig] = useState<any>({});

  useEffect(() => {
    getConfig()
      .then((data) => setConfig(data))
      .catch((error) => console.error("Failed to load config:", error));
  }, []);

  return (
    <footer
      className="relative z-20 mt-24"
      style={{
        backgroundColor: 'var(--kp-bg-surface)',
        borderTop: '1px solid var(--kp-border)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-16">
        {/* Logo + tagline */}
        <div className="mb-12">
          <h2
            className="font-display text-2xl font-bold mb-2"
            style={{ color: 'var(--kp-text-primary)' }}
          >
            ☕ Kelas Pekerja
          </h2>
          <p
            className="font-ui text-sm max-w-xs"
            style={{ color: 'var(--kp-text-muted)' }}
          >
            Dibuat dengan ☕ dan ❤️ di malam yang sunyi.
          </p>
        </div>

        {/* Divider */}
        <div
          className="pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 font-ui text-sm"
          style={{ borderTop: '1px solid var(--kp-border)', color: 'var(--kp-text-muted)' }}
        >
          <span>© {new Date().getFullYear()} Kelas Pekerja</span>
          <span>Made with quiet nights & warm coffee</span>
        </div>
      </div>
    </footer>
  );
}
