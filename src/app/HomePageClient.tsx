"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import BookCover, { getCoverFallbackClass } from "../components/BookCover";
import { FALLBACK_BOOKS } from "../lib/constants";

interface HomePageClientProps {
  featuredBooks: any[];
  latestBooks: any[];
  allBooks?: any[];
}

export default function HomePageClient({
  featuredBooks = [],
  latestBooks = [],
  allBooks = [],
}: HomePageClientProps) {
  const featured = featuredBooks.length > 0 ? featuredBooks[0] : null;
  const recent = latestBooks.slice(0, 5);

  return (
    <>
      {/* ============================================================ hero */}
      <section className="hero" id="hero" data-cam="0">
        <div className="hero-top">
          <div className="greet" data-rv="fade">
            <span className="dot"></span>
            <span id="greet">Selamat malam</span> &mdash; dari layar yang masih menyala.
          </div>
          <h1 className="h1">
            <span className="mask" data-rv="fade"><span>Tulisan sunyi</span></span>
            <span className="mask" data-rv="fade"><span>dari mereka yang</span></span>
            <span className="mask" data-rv="fade"><span>tetap bekerja.</span></span>
          </h1>
          <p className="lead hero-sub" data-rv="up">
            Kelas Pekerja adalah arsip cerita, refleksi, dan tulisan pendek &mdash; ditulis oleh dan untuk mereka yang menghabiskan sebagian besar hidupnya bekerja.
          </p>
          <div className="hero-cta" data-rv="up">
            <Link className="btn btn-p" href="/buku" data-cursor>Mulai Membaca</Link>
            <Link className="btn btn-s" href="/tentang" data-cursor>Tentang Kami</Link>
          </div>
          <div className="stat-row" data-rv="up">
            <div className="stat"><b className="mono-num">{allBooks.length > 0 ? allBooks.length : 10}</b><span>Tulisan Tersimpan</span></div>
            <div className="stat"><b className="mono-num">3</b><span>Kategori Arsip</span></div>
            <div className="stat"><b>Wildan F.</b><span>Penulis &amp; Pengelola</span></div>
          </div>
        </div>

        <div className="hero-spacer"></div>

        {/* Featured peek card di hero */}
        <Link
          className="peek"
          href={featured ? `/buku/${featured.slug}` : "/buku/sayap-sayap-patah-di-gedung-kaca"}
          data-rv="fade"
          data-cursor
          data-tilt
          aria-label="Buku Pilihan"
        >
          <BookCover
            cover={featured?.cover}
            category={featured?.category}
            className="peek-cov"
          >
            <span className="peek-tag">Sedang Dipilih</span>
            <span className="peek-tt">{featured ? featured.title : "Sayap-Sayap Patah di Gedung Kaca"}</span>
          </BookCover>
          <div className="peek-meta"><b>{featured ? featured.category : "renungan"}</b><i>{featured?.readTime || "10 menit"}</i></div>
        </Link>

        <div className="hero-foot">
          <div className="cats" data-rv="up">
            <Link className="cat-chip" href="/buku?category=refleksi" data-cursor>
              <b>Refleksi</b><p>Perenungan singkat tentang hari-hari yang dijalani sambil bekerja.</p>
            </Link>
            <Link className="cat-chip" href="/buku?category=kehidupan" data-cursor>
              <b>Kehidupan</b><p>Cerita tentang hidup di luar jam kerja &mdash; dan bagaimana keduanya bertaut.</p>
            </Link>
            <Link className="cat-chip" href="/buku?category=filosofi" data-cursor>
              <b>Filosofi</b><p>Pertanyaan-pertanyaan panjang yang muncul di tengah pekerjaan yang sama setiap hari.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ about */}
      <section className="sec" id="tentang" data-cam="1">
        <div className="sec-inner about-grid">
          <h2 className="h2" data-rv="up">Catatan yang diseduh perlahan, bukan dikejar tenggat.</h2>
          <div className="about-copy">
            <p className="lead" data-rv="up">
              Kelas Pekerja adalah arsip cerita, refleksi, dan tulisan pendek tentang dunia kerja dan kehidupan &mdash; ditulis pelan-pelan, untuk dibaca pelan-pelan juga.
            </p>
            <p className="body-text" data-rv="up" style={{ marginTop: "16px" }}>
              Tidak ada jadwal terbit dan tidak ada target pembaca di sini. Hanya ruang untuk menulis hal-hal yang biasanya disimpan sendiri.
            </p>
            <Link className="arrow" href="/tentang" data-rv="fade" data-cursor>
              <span>Baca tentang kami selengkapnya</span>
              <svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.3" /></svg>
            </Link>
            <div className="about-stats">
              <div className="about-stat" data-rv="up"><b className="mono-num">{allBooks.length > 0 ? allBooks.length : 10}</b><span>Tulisan sudah diarsipkan sejauh ini &mdash; masing-masing ditulis tanpa buru-buru.</span></div>
              <div className="about-stat" data-rv="up"><b>3</b><span>Kategori: Refleksi, Kehidupan, dan Filosofi.</span></div>
              <div className="about-stat" data-rv="up"><b style={{ fontSize: "18px" }}>Wildan Ferdiansyah</b><span>Menulis dan mengelola Kelas Pekerja dari Indonesia.</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ katalog */}
      <section className="sec" id="buku" data-cam="2">
        <div className="sec-inner">
          <div className="kat-head">
            <div>
              <h2 className="h2" data-rv="up">Rak buku yang selalu terbuka.</h2>
              <p className="lead" data-rv="up">Refleksi, cerita, dan filosofi dari perspektif kelas pekerja.</p>
            </div>
            <div className="pills" data-rv="fade">
              <Link className="pill on" href="/buku" data-cursor>Semua Buku</Link>
              <Link className="pill" href="/buku?category=refleksi" data-cursor>Refleksi</Link>
              <Link className="pill" href="/buku?category=kehidupan" data-cursor>Kehidupan</Link>
              <Link className="pill" href="/buku?category=filosofi" data-cursor>Filosofi</Link>
            </div>
          </div>

          {/* Featured book */}
          <div className="featured" data-rv="up">
            <Link
              className={`featured-cov ${getCoverFallbackClass(featured?.category)}`}
              data-tilt
              href={featured ? `/buku/${featured.slug}` : "/buku/sayap-sayap-patah-di-gedung-kaca"}
              data-cursor
              style={{ position: "relative", overflow: "hidden" }}
            >
              {featured?.cover && (
                <Image
                  src={featured.cover}
                  alt={featured.title}
                  fill
                  sizes="(max-width:900px) 100vw, 50vw"
                  className="book-cov-img"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  unoptimized
                />
              )}
              <div className="book-cov-overlay" style={{ background: "linear-gradient(to top, rgba(10,9,8,0.85) 0%, rgba(10,9,8,0.3) 60%, transparent 100%)" }} />
              <span className="featured-tag">Pilihan &middot; {featured ? featured.category : "Renungan"}</span>
              <span className="featured-tt">{featured ? featured.title : "Sayap-Sayap Patah di Gedung Kaca"}</span>
            </Link>
            <div className="featured-info">
              <div className="featured-eyebrow">
                <span>{featured ? featured.category : "Renungan"}</span>
                <span className="sep"></span>
                <span>{featured?.readTime || "10 menit baca"}</span>
              </div>
              <h3>{featured ? featured.title : "Sayap-Sayap Patah di Gedung Kaca"}</h3>
              <p className="body-text">
                {featured?.excerpt || "Sebuah elegi tentang harga diri, penindasan birokrasi, dan keberanian kelas pekerja untuk merebut kembali kemerdekaannya dari meja kerja yang mengekang."}
              </p>
              <Link className="arrow" href={featured ? `/buku/${featured.slug}` : "/buku/sayap-sayap-patah-di-gedung-kaca"} data-cursor>
                <span>Baca tulisan ini</span>
                <svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.3" /></svg>
              </Link>
            </div>
          </div>

          {/* Book grid */}
          <div className="grid-books">
            {recent.length > 0 ? (
              recent.map((book) => (
                <article key={book.id} className="book" data-rv="up" data-tilt data-cursor>
                  <Link href={`/buku/${book.slug}`}>
                    <BookCover cover={book.cover} category={book.category} className="book-cov">
                      <span className="book-tag">{book.category || "Renungan"}</span>
                    </BookCover>
                    <h4>{book.title}</h4>
                    <p>{(book.excerpt || "").substring(0, 90)}{book.excerpt?.length > 90 ? "..." : ""}</p>
                    <div className="book-meta"><span>{book.category || "renungan"}</span><span>{book.readTime || "15 menit"}</span></div>
                  </Link>
                </article>
              ))
            ) : (
              /* Fallback dari konstanta jika data kosong */
              FALLBACK_BOOKS.map((book) => (
                <article key={book.slug} className="book" data-rv="up" data-tilt data-cursor>
                  <Link href={`/buku/${book.slug}`}>
                    <BookCover cover={book.cover} category={book.category} className="book-cov">
                      <span className="book-tag">{book.category}</span>
                    </BookCover>
                    <h4>{book.title}</h4>
                    <p>{book.excerpt}</p>
                    <div className="book-meta"><span>{book.category}</span><span>{book.readTime}</span></div>
                  </Link>
                </article>
              ))
            )}
          </div>

          <div className="kat-more" data-rv="fade">
            <Link className="btn btn-s" href="/buku" data-cursor>Lihat Semua Tulisan</Link>
          </div>
        </div>
      </section>

      {/* ============================================================ quote */}
      <section className="q-sec" id="kutipan" data-cam="3">
        <div className="sec-inner">
          <span className="eyebrow" data-rv="fade">Catatan Mingguan</span>
          <div className="q-mark" data-rv="fade" aria-hidden="true">&ldquo;</div>
          <p className="q-txt" data-rv="up">Malam adalah tempat penyimpanan hal-hal yang tak berani kita katakan di siang hari.</p>
          <div className="q-foot" data-rv="fade">
            <span className="q-attr">&mdash; Kelas Pekerja</span>
            <Link className="arrow" href="/quotes" data-cursor>
              <span>Lihat kutipan lainnya</span>
              <svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ cta */}
      <section className="cta-sec" id="tulis" data-cam="4">
        <div className="sec-inner cta-grid">
          <h2 className="h2" data-rv="up">Punya cerita yang belum sempat diceritakan?</h2>
          <div className="cta-copy">
            <p className="lead" data-rv="up">Kalau kamu punya tulisan soal kerja, hidup, atau hal-hal yang jarang dibicarakan &mdash; tulis saja di sini. Tidak perlu sempurna, yang penting jujur.</p>
            <Link className="btn btn-p" href="/tulis" data-rv="up" data-cursor>Tulis Sesuatu</Link>
          </div>
        </div>
      </section>
    </>
  );
}
