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
      className="relative z-20"
      style={{
        backgroundColor: 'var(--kp-bg-invert)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 tablet:px-12 py-12 laptop:py-16">
        <div
          className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 gap-8 laptop:gap-10 pb-8 border-b"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          {/* Kolom 1: Brand */}
          <div className="col-span-1">
            <div
              className="font-display text-xl laptop:text-2xl mb-3"
              style={{ color: 'var(--kp-text-on-dark)' }}
            >
              {config?.title || "Kelas Pekerja"}
            </div>
            <p
              className="font-body text-sm leading-relaxed mb-5"
              style={{ color: 'rgba(245,240,232,0.45)' }}
            >
              {config?.description ||
                "Catatan tentang malam, kopi, dan kehidupan. Arsip sunyi orang-orang yang tetap bekerja."}
            </p>
            <div className="flex gap-2.5">
              <a
                href="https://wa.me/6289636357091"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8.5 h-8.5 rounded-md border flex items-center justify-center transition-colors duration-200"
                style={{
                  borderColor: 'rgba(255,255,255,0.12)',
                  color: 'rgba(245,240,232,0.5)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                }}
              >
                📱
              </a>
              <a
                href="mailto:wildanferdiansyah06@gmail.com"
                className="w-8.5 h-8.5 rounded-md border flex items-center justify-center transition-colors duration-200"
                style={{
                  borderColor: 'rgba(255,255,255,0.12)',
                  color: 'rgba(245,240,232,0.5)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                }}
              >
                ✉️
              </a>
              <a
                href="https://instagram.com/_iamwildan_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8.5 h-8.5 rounded-md border flex items-center justify-center transition-colors duration-200"
                style={{
                  borderColor: 'rgba(255,255,255,0.12)',
                  color: 'rgba(245,240,232,0.5)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                }}
              >
                📷
              </a>
            </div>
          </div>

          {/* Kolom 2: Jelajahi */}
          <div className="col-span-1">
            <div
              className="font-ui text-xs font-medium tracking-widest uppercase mb-4"
              style={{ color: 'rgba(245,240,232,0.4)' }}
            >
              Jelajahi
            </div>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href="/"
                  className="font-ui text-sm transition-colors duration-200"
                  style={{ color: 'rgba(245,240,232,0.55)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--kp-text-on-dark)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(245,240,232,0.55)';
                  }}
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/buku"
                  className="font-ui text-sm transition-colors duration-200"
                  style={{ color: 'rgba(245,240,232,0.55)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--kp-text-on-dark)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(245,240,232,0.55)';
                  }}
                >
                  Buku
                </Link>
              </li>
              <li>
                <Link
                  href="/tulisan"
                  className="font-ui text-sm transition-colors duration-200"
                  style={{ color: 'rgba(245,240,232,0.55)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--kp-text-on-dark)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(245,240,232,0.55)';
                  }}
                >
                  Tulisan
                </Link>
              </li>
              <li>
                <Link
                  href="/tentang"
                  className="font-ui text-sm transition-colors duration-200"
                  style={{ color: 'rgba(245,240,232,0.55)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--kp-text-on-dark)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(245,240,232,0.55)';
                  }}
                >
                  Tentang
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Komunitas */}
          <div className="col-span-1">
            <div
              className="font-ui text-xs font-medium tracking-widest uppercase mb-4"
              style={{ color: 'rgba(245,240,232,0.4)' }}
            >
              Komunitas
            </div>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href="/auth/signin"
                  className="font-ui text-sm transition-colors duration-200"
                  style={{ color: 'rgba(245,240,232,0.55)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--kp-text-on-dark)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(245,240,232,0.55)';
                  }}
                >
                  Tulis Cerita
                </Link>
              </li>
              <li>
                <Link
                  href="/bookmark"
                  className="font-ui text-sm transition-colors duration-200"
                  style={{ color: 'rgba(245,240,232,0.55)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--kp-text-on-dark)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(245,240,232,0.55)';
                  }}
                >
                  Tersimpan
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="font-ui text-sm transition-colors duration-200"
                  style={{ color: 'rgba(245,240,232,0.55)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--kp-text-on-dark)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(245,240,232,0.55)';
                  }}
                >
                  Pikiran Kopi
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Kontak */}
          <div className="col-span-1">
            <div
              className="font-ui text-xs font-medium tracking-widest uppercase mb-4"
              style={{ color: 'rgba(245,240,232,0.4)' }}
            >
              Kontak
            </div>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href="https://wa.me/6289636357091"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-ui text-sm transition-colors duration-200"
                  style={{ color: 'rgba(245,240,232,0.55)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--kp-text-on-dark)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(245,240,232,0.55)';
                  }}
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:wildanferdiansyah06@gmail.com"
                  className="font-ui text-sm transition-colors duration-200"
                  style={{ color: 'rgba(245,240,232,0.55)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--kp-text-on-dark)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(245,240,232,0.55)';
                  }}
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/_iamwildan_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-ui text-sm transition-colors duration-200"
                  style={{ color: 'rgba(245,240,232,0.55)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--kp-text-on-dark)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(245,240,232,0.55)';
                  }}
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col tablet:flex-row justify-between items-center pt-5 laptop:pt-5">
          <div
            className="font-ui text-xs"
            style={{ color: 'rgba(245,240,232,0.3)' }}
          >
            © {new Date().getFullYear()} Kelas Pekerja
          </div>
          <div
            className="font-ui text-xs flex items-center gap-1.5 mt-2 tablet:mt-0"
            style={{ color: 'rgba(245,240,232,0.25)' }}
          >
            Dibuat dengan <span style={{ color: 'var(--kp-accent-light)' }}>☕</span> dan ❤️
          </div>
        </div>
      </div>
    </footer>
  );
}
