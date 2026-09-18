"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useNavScroll } from "../hooks/useNavScroll";

export default function Navbar() {
  const { isScrolled, isHidden } = useNavScroll();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Sync mobile sheet state with body locking
  useEffect(() => {
    if (isMobileOpen) {
      document.body.classList.add("is-locked");
    } else {
      document.body.classList.remove("is-locked");
    }
  }, [isMobileOpen]);

  const closeMobile = () => setIsMobileOpen(false);

  return (
    <>
      <header className={`nav ${isScrolled ? "stuck" : ""} ${isHidden ? "hide" : ""}`} id="nav">
        <Link href="/" className="brand" data-cursor onClick={closeMobile}>
          <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
            <path d="M13 19h18l-2.6 12.4a2 2 0 0 1-2 1.6H17.6a2 2 0 0 1-2-1.6L13 19Z" stroke="#ece3d3" strokeWidth="1.5" />
            <path d="M31 21c4 0 5.6 2 5.6 4.6S35 30 31 29.6" stroke="#c9903f" strokeWidth="1.5" />
            <path d="M18 15c-1.6-1.6-1.6-3 0-4.6M23 15c-1.6-1.6-1.6-3 0-4.6" stroke="#d1602f" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <span className="brand-tx">
            <b>KELAS PEKERJA</b>
            <i>ARSIP SUNYI YANG TETAP BEKERJA</i>
          </span>
        </Link>
        <nav className="nav-links">
          <Link href="/" className="nav-link" data-cursor>Beranda</Link>
          <div className="nav-item">
            <Link href="/buku" className="nav-link" data-cursor>
              Katalog
              <svg className="care" viewBox="0 0 10 6" fill="none">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </Link>
            <div className="drop">
              <Link href="/buku" data-cursor>Semua Buku</Link>
              <Link href="/buku?category=refleksi" data-cursor>Kategori Refleksi</Link>
              <Link href="/buku?category=kehidupan" data-cursor>Kategori Kehidupan</Link>
              <Link href="/buku?category=filosofi" data-cursor>Kategori Filosofi</Link>
            </div>
          </div>
          <Link href="/quotes" className="nav-link" data-cursor>Quote Acak</Link>
          <Link href="/bookmark" className="nav-link" data-cursor>Koleksi Tersimpan</Link>
          <Link href="/tentang" className="nav-link" data-cursor>Tentang</Link>
        </nav>
        <Link href="/tulis" className="nav-cta" data-cursor>Tulis Sesuatu</Link>
        <button
          className={`nav-burger ${isMobileOpen ? "on" : ""}`}
          id="burger"
          aria-label="Menu"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <i></i>
          <i></i>
          <i></i>
        </button>
      </header>

      {/* Mobile Sheet */}
      <div className={`sheet ${isMobileOpen ? "open" : ""}`} id="sheet">
        <div className="sheet-links">
          <Link href="/" data-cursor onClick={closeMobile}>Beranda</Link>
          <Link href="/buku" data-cursor onClick={closeMobile}>Katalog</Link>
          <Link href="/quotes" data-cursor onClick={closeMobile}>Quote Acak</Link>
          <Link href="/tentang" data-cursor onClick={closeMobile}>Tentang</Link>
          <Link href="/tulis" data-cursor onClick={closeMobile}>Tulis Sesuatu</Link>
        </div>
        <div className="sheet-sub">
          <b>Katalog</b>
          <Link href="/buku?category=refleksi" data-cursor onClick={closeMobile}>Refleksi</Link>
          <Link href="/buku?category=kehidupan" data-cursor onClick={closeMobile}>Kehidupan</Link>
          <Link href="/buku?category=filosofi" data-cursor onClick={closeMobile}>Filosofi</Link>
          <Link href="/bookmark" data-cursor style={{ marginTop: "8px" }} onClick={closeMobile}>Koleksi Tersimpan</Link>
        </div>
        <div className="sheet-social">
          <a href="https://wa.me/6289636357091" target="_blank" rel="noopener noreferrer" data-cursor aria-label="WhatsApp">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 20l1.4-4.1A8 8 0 1 1 9 18.4L4 20Z" stroke="#ece3d3" strokeWidth="1.3" />
              <path d="M8.5 9.5c0 4 3 6.7 6.7 6.7.6 0 1-.5.9-1l-.2-1.1a.9.9 0 0 0-.7-.7l-1.6-.3a.9.9 0 0 0-.8.3l-.5.5a5.6 5.6 0 0 1-2.6-2.6l.5-.5a.9.9 0 0 0 .3-.8l-.3-1.6a.9.9 0 0 0-.7-.7L8.5 7.6c-.5 0-1 .4-1 .9" fill="#ece3d3" />
            </svg>
          </a>
          <a href="https://instagram.com/_iamwildan_" target="_blank" rel="noopener noreferrer" data-cursor aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="4" y="4" width="16" height="16" rx="5" stroke="#ece3d3" strokeWidth="1.3" />
              <circle cx="12" cy="12" r="3.6" stroke="#ece3d3" strokeWidth="1.3" />
              <circle cx="16.6" cy="7.4" r="1" fill="#ece3d3" />
            </svg>
          </a>
          <a href="https://github.com/wildanferdiansyah06-crypto" target="_blank" rel="noopener noreferrer" data-cursor aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 3.5a8.5 8.5 0 0 0-2.7 16.6c.4.1.6-.2.6-.4v-1.6c-2.4.5-2.9-1.1-2.9-1.1-.4-1-1-1.2-1-1.2-.8-.6.1-.6.1-.6.9.1 1.4.9 1.4.9.8 1.4 2.1 1 2.6.7.1-.6.3-1 .6-1.2-1.9-.2-3.9-1-3.9-4.3 0-1 .3-1.7.9-2.3-.1-.2-.4-1.1.1-2.3 0 0 .7-.2 2.4.9a8 8 0 0 1 4.4 0c1.7-1.1 2.4-.9 2.4-.9.5 1.2.2 2.1.1 2.3.6.6.9 1.4.9 2.3 0 3.3-2 4-3.9 4.3.3.3.6.8.6 1.7v2.5c0 .2.2.5.6.4A8.5 8.5 0 0 0 12 3.5Z" stroke="#ece3d3" strokeWidth="1.1" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}
