"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="foot" id="kontak">
      <div className="sec-inner">
        <div className="foot-top">
          <div className="foot-brand">
            <Link href="/" className="brand" data-cursor>
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
            <p>Catatan harian, cerita pendek, dan perenungan tentang dunia kerja dan kehidupan yang diseduh perlahan.</p>
            <div className="foot-social">
              <a href="https://wa.me/6289636357091" target="_blank" rel="noopener noreferrer" data-cursor aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M4 20l1.4-4.1A8 8 0 1 1 9 18.4L4 20Z" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M8.5 9.5c0 4 3 6.7 6.7 6.7.6 0 1-.5.9-1l-.2-1.1a.9.9 0 0 0-.7-.7l-1.6-.3a.9.9 0 0 0-.8.3l-.5.5a5.6 5.6 0 0 1-2.6-2.6l.5-.5a.9.9 0 0 0 .3-.8l-.3-1.6a.9.9 0 0 0-.7-.7L8.5 7.6c-.5 0-1 .4-1 .9" fill="currentColor" />
                </svg>
              </a>
              <a href="https://instagram.com/_iamwildan_" target="_blank" rel="noopener noreferrer" data-cursor aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="1.3" />
                  <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.3" />
                  <circle cx="16.6" cy="7.4" r="1" fill="currentColor" />
                </svg>
              </a>
              <a href="https://github.com/wildanferdiansyah06-crypto" target="_blank" rel="noopener noreferrer" data-cursor aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 3.5a8.5 8.5 0 0 0-2.7 16.6c.4.1.6-.2.6-.4v-1.6c-2.4.5-2.9-1.1-2.9-1.1-.4-1-1-1.2-1-1.2-.8-.6.1-.6.1-.6.9.1 1.4.9 1.4.9.8 1.4 2.1 1 2.6.7.1-.6.3-1 .6-1.2-1.9-.2-3.9-1-3.9-4.3 0-1 .3-1.7.9-2.3-.1-.2-.4-1.1.1-2.3 0 0 .7-.2 2.4.9a8 8 0 0 1 4.4 0c1.7-1.1 2.4-.9 2.4-.9.5 1.2.2 2.1.1 2.3.6.6.9 1.4.9 2.3 0 3.3-2 4-3.9 4.3.3.3.6.8.6 1.7v2.5c0 .2.2.5.6.4A8.5 8.5 0 0 0 12 3.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
          <div className="foot-col">
            <b>Katalog</b>
            <ul>
              <li><Link href="/buku">Semua Buku</Link></li>
              <li><Link href="/buku?category=refleksi">Refleksi</Link></li>
              <li><Link href="/buku?category=kehidupan">Kehidupan</Link></li>
              <li><Link href="/buku?category=filosofi">Filosofi</Link></li>
            </ul>
          </div>
          <div className="foot-col">
            <b>Lebih Jauh</b>
            <ul>
              <li><Link href="/quotes">Quote Acak</Link></li>
              <li><Link href="/bookmark">Koleksi Tersimpan</Link></li>
              <li><Link href="/tentang">Tentang Kami</Link></li>
              <li><Link href="/tulis">Tulis Sesuatu</Link></li>
            </ul>
          </div>
        </div>
        <p className="foot-quote">&ldquo;Malam adalah tempat penyimpanan hal-hal yang tak berani kita katakan di siang hari.&rdquo;</p>
        <div className="foot-bottom">
          <span>Dibuat dengan cinta &amp; kopi di Indonesia.</span>
          <span>&copy; {new Date().getFullYear()} Kelas Pekerja. Hak Cipta Dilindungi.</span>
        </div>
      </div>
    </footer>
  );
}
