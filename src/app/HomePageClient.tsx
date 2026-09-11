"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, PenLine } from "lucide-react";
import { useLanguage } from "@/src/contexts/LanguageContext";

/* ─── Kage iframe helpers ────────────────────────────────────────────
   KageLandingPage internally renders an <iframe src="/landing-pages/kage.html">
   sandboxed. Since importing @designcodeio/threeui causes webpack to fail
   (the package uses Vite-specific ?raw imports incompatible with Next.js webpack),
   we replicate what LandingPageFrame does: serve the same HTML via a plain iframe.
   The result is byte-identical to the component — same sandbox, same src.
   ──────────────────────────────────────────────────────────────────────── */

function getRelativeTime(dateString: string, lang: 'id' | 'en' = 'id'): string {
  try {
    if (!dateString) return lang === 'en' ? "Unknown date" : "Tanggal tidak diketahui";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return lang === 'en' ? "Invalid date" : "Tanggal tidak valid";
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diffInDays === 0) return lang === 'en' ? "Today" : "Hari ini";
    if (diffInDays === 1) return lang === 'en' ? "Yesterday" : "Kemarin";
    if (diffInDays < 7) return lang === 'en' ? `${diffInDays} days ago` : `${diffInDays} hari lalu`;
    if (diffInDays < 30) return lang === 'en' ? `${Math.floor(diffInDays / 7)} weeks ago` : `${Math.floor(diffInDays / 7)} minggu lalu`;
    return lang === 'en' ? `${Math.floor(diffInDays / 30)} months ago` : `${Math.floor(diffInDays / 30)} bulan lalu`;
  } catch {
    return lang === 'en' ? "Unknown date" : "Tanggal tidak diketahui";
  }
}

interface HomePageClientProps {
  featuredBooks: any[];
  latestBooks: any[];
  mostRelatable: any[];
  allBooks?: any[];
}

function getSimpleGreeting(hour: number, lang: 'id' | 'en'): string {
  if (lang === 'en') {
    if (hour >= 4 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 17) return 'Good afternoon';
    if (hour >= 17 && hour < 21) return 'Good evening';
    return 'Late night?';
  }
  if (hour >= 4 && hour < 12) return 'Selamat pagi';
  if (hour >= 12 && hour < 17) return 'Selamat siang';
  if (hour >= 17 && hour < 21) return 'Selamat sore';
  return 'Masih terjaga?';
}

/* ─── KageHero ─────────────────────────────────────────────────────────
   Renders /landing-pages/kage.html in a sandboxed iframe (same as what
   LandingPageFrame does internally) and overlays our own reading copy.
   ──────────────────────────────────────────────────────────────────────── */
function KageHero({
  greeting,
  totalBooks,
  id,
  t,
}: {
  greeting: string;
  totalBooks: number;
  id: boolean;
  t: any;
}) {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100svh",
        minHeight: 600,
        overflow: "hidden",
      }}
    >
      {/* ── Background Image ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background: "#05070a",
        }}
      >
        <Image
          src="/images/hero-bg.jpg"
          alt="Late night commute"
          fill
          priority
          style={{
            objectFit: "cover",
            opacity: 0.6,
            filter: "contrast(1.1) brightness(0.7)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 73% 17%, rgba(224,35,28,0.2) 0%, rgba(120,12,12,0.1) 40%, transparent 62%), " +
              "radial-gradient(120% 80% at 50% 0%, rgba(120,150,158,0.05), transparent 60%)",
          }}
        />
      </div>

      {/* ── Bottom-to-top fade so content flows into next section ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, rgba(5,7,10,0.55) 0%, rgba(5,7,10,0.12) 46%, rgba(5,7,10,0.80) 88%, rgba(5,7,10,1) 100%)",
        }}
      />
      {/* Left vignette to hold reading copy legible */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          pointerEvents: "none",
          background:
            "linear-gradient(to right, rgba(5,7,10,0.82) 0%, rgba(5,7,10,0.50) 36%, rgba(5,7,10,0) 58%)",
        }}
        className="hidden md:block"
      />

      {/* ── Our copy layer ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          pointerEvents: "none",
        }}
      >
        {/* Greeting badge (top-left) */}
        <div
          style={{ padding: "0 3rem", paddingTop: "calc(84px + 2rem)" }}
          className="px-6 lg:px-12"
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              pointerEvents: "auto",
            }}
          >
            <span
              style={{
                display: "block",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#e0231c",
                boxShadow: "0 0 10px #e0231c",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-ui, system-ui)",
                fontSize: 10,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "#aab4ad",
              }}
            >
              {greeting}
            </span>
          </div>
        </div>

        {/* Main copy (bottom-left) */}
        <div
          className="px-6 lg:px-12"
          style={{
            paddingBottom: "clamp(2rem, 5vh, 3.5rem)",
            maxWidth: 640,
            pointerEvents: "auto",
          }}
        >
          <h1
            className="font-serif"
            style={{
              fontSize: "clamp(32px, 4.8vw, 66px)",
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              color: "#fff",
              textShadow: "0 2px 34px rgba(3,6,8,0.72)",
              marginBottom: "1.5rem",
            }}
          >
            {id
              ? "Tulisan sunyi dari mereka yang tetap bekerja."
              : "Silent writings from those who keep working."}
          </h1>

          <p
            className="font-body"
            style={{
              fontSize: "clamp(14px, 1.1vw, 17px)",
              lineHeight: 1.72,
              color: "#aab4ad",
              textShadow: "0 1px 20px rgba(3,6,8,0.88)",
              maxWidth: "46ch",
              marginBottom: "2.5rem",
            }}
          >
            {id
              ? "Kelas Pekerja adalah arsip cerita, refleksi, dan tulisan pendek — ditulis oleh dan untuk mereka yang menghabiskan sebagian besar hidupnya bekerja."
              : "Kelas Pekerja is an archive of stories, reflections, and short writings — written by and for those who spend most of their lives working."}
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "2.5rem",
            }}
          >
            <Link
              href="/buku"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "0.75rem 1.75rem",
                borderRadius: 9999,
                fontFamily: "var(--font-ui, system-ui)",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 500,
                background: "linear-gradient(135deg, #e0231c, #a71813)",
                color: "#fff",
                boxShadow: "0 4px 16px rgba(224,35,28,0.28)",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
            >
              {t.booksPage.startReading}
              <ArrowRight size={13} />
            </Link>

            <Link
              href="/tentang"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.75rem 1.75rem",
                borderRadius: 9999,
                fontFamily: "var(--font-ui, system-ui)",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 500,
                border: "1px solid rgba(223,231,224,0.18)",
                color: "#aab4ad",
                transition: "border-color 0.3s, color 0.3s",
              }}
            >
              {t.nav.about}
            </Link>
          </div>

          {/* Stat strip */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              paddingTop: "1.25rem",
              borderTop: "1px solid rgba(223,231,224,0.08)",
            }}
          >
            <div>
              <span
                className="font-serif"
                style={{
                  display: "block",
                  fontSize: "clamp(22px, 2.2vw, 32px)",
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                  color: "#dfe7e0",
                }}
              >
                {totalBooks || "—"}
              </span>
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-ui, system-ui)",
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#78837c",
                }}
              >
                {id ? "tulisan tersimpan" : "writings archived"}
              </span>
            </div>
            <div
              style={{ width: 1, height: 40, background: "rgba(223,231,224,0.08)" }}
            />
            <p
              className="font-body"
              style={{
                fontSize: 13,
                lineHeight: 1.5,
                color: "#78837c",
                maxWidth: "32ch",
              }}
            >
              {id
                ? "Refleksi, cerita, filosofi dari perspektif kelas pekerja."
                : "Reflections, stories, philosophy from the working class perspective."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Main export ───────────────────────────────────────────────────── */
export default function HomePageClient({
  featuredBooks = [],
  latestBooks = [],
  mostRelatable = [],
  allBooks = [],
}: HomePageClientProps) {
  const { language, t } = useLanguage();
  const id = language === "id";

  const greeting = React.useMemo(
    () => getSimpleGreeting(new Date().getHours(), language),
    [language]
  );

  const totalBooks =
    allBooks.length ||
    featuredBooks.length + latestBooks.length + mostRelatable.length;

  if (!featuredBooks.length && !latestBooks.length) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
          background: "#05070a",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            borderRadius: "1rem",
            border: "1px solid rgba(223,231,224,0.06)",
          }}
        >
          <p style={{ color: "#f87171", marginBottom: "1rem" }}>
            Terjadi kesalahan pada halaman
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "0.6rem 1.5rem",
              borderRadius: 9999,
              background: "#e0231c",
              color: "#fff",
              border: 0,
              cursor: "pointer",
              fontFamily: "var(--font-ui, system-ui)",
              fontSize: 13,
            }}
          >
            Muat Ulang
          </button>
        </div>
      </div>
    );
  }

  /* Shared palette tokens */
  const ink = "#05070a";
  const inkSurface = "#080b0f";
  const bone = "#dfe7e0";
  const boneDim = "#aab4ad";
  const muted = "#78837c";
  const vermilion = "#e0231c";
  const line = "rgba(223,231,224,0.08)";
  const lineSoft = "rgba(223,231,224,0.05)";

  return (
    <div style={{ background: ink, color: bone, minHeight: "100vh" }}>

      {/* ══ HERO ══ */}
      <KageHero greeting={greeting} totalBooks={totalBooks} id={id} t={t} />

      {/* ══ FEATURED ══ */}
      {featuredBooks.length > 0 && (
        <section
          style={{ background: inkSurface, padding: "6rem 1.5rem" }}
          className="lg:px-12"
        >
          <div style={{ maxWidth: 1152, margin: "0 auto" }}>
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "1rem",
                borderBottom: `1px solid ${line}`,
                paddingBottom: 20,
                marginBottom: "4rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-ui, system-ui)",
                  fontSize: 10,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: muted,
                }}
              >
                {id ? "— Pilihan" : "— Featured"}
              </span>
              <span style={{ flex: 1, height: 1, background: lineSoft }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {featuredBooks.map((book, index) => (
                <article key={book?.id || `featured-${index}`}>
                  <Link href={`/buku/${book?.slug || "#"}`} style={{ display: "block" }}>
                    <div
                      className="group"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2rem",
                        padding: "2.5rem",
                        borderRadius: "1.25rem",
                        border: `1px solid ${line}`,
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)",
                        transition: "border-color 0.5s, transform 0.5s",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          pointerEvents: "none",
                          background:
                            "radial-gradient(ellipse at 20% 50%, rgba(224,35,28,0.07) 0%, transparent 60%)",
                          opacity: 0,
                          transition: "opacity 0.6s",
                        }}
                        className="group-hover:!opacity-100"
                      />

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "3rem",
                          flexWrap: "wrap",
                        }}
                      >
                        {book?.cover && (
                          <div
                            style={{
                              position: "relative",
                              flexShrink: 0,
                              width: 200,
                              aspectRatio: "3/4",
                              borderRadius: "0.75rem",
                              overflow: "hidden",
                              background: inkSurface,
                            }}
                          >
                            <Image
                              src={book.cover}
                              alt={book?.title || "Book cover"}
                              fill
                              sizes="200px"
                              style={{
                                objectFit: "cover",
                                transition: "transform 0.3s",
                              }}
                              className="group-hover:scale-105"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          </div>
                        )}

                        <div
                          style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "1rem",
                              marginBottom: "1.25rem",
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "var(--font-ui, system-ui)",
                                fontSize: 10,
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                color: vermilion,
                              }}
                            >
                              {book?.category || "Umum"}
                            </span>
                            <span
                              style={{
                                width: 4,
                                height: 4,
                                borderRadius: "50%",
                                background: line,
                              }}
                            />
                            <span
                              style={{
                                fontFamily: "var(--font-ui, system-ui)",
                                fontSize: 10,
                                letterSpacing: "0.16em",
                                textTransform: "uppercase",
                                color: muted,
                              }}
                            >
                              {book?.readTime || "5 menit"}
                            </span>
                          </div>

                          <h3
                            className="font-serif"
                            style={{
                              fontSize: "clamp(22px, 2.8vw, 38px)",
                              lineHeight: 1.1,
                              letterSpacing: "-0.01em",
                              color: "#fff",
                              marginBottom: "1rem",
                            }}
                          >
                            {book?.title || "Tanpa Judul"}
                          </h3>

                          <p
                            className="font-body line-clamp-3"
                            style={{
                              fontSize: 15,
                              lineHeight: 1.7,
                              color: boneDim,
                              marginBottom: "2rem",
                            }}
                          >
                            {book?.subtitle ||
                              book?.excerpt ||
                              "Tidak ada deskripsi tersedia."}
                          </p>

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.75rem",
                              fontFamily: "var(--font-ui, system-ui)",
                              fontSize: 11,
                              letterSpacing: "0.2em",
                              textTransform: "uppercase",
                              color: muted,
                            }}
                          >
                            <span>{id ? "Baca" : "Read"}</span>
                            <ArrowRight size={13} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ LATEST & MOST READ ══ */}
      <section style={{ padding: "6rem 1.5rem" }} className="lg:px-12">
        <div
          style={{
            maxWidth: 1152,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "4rem",
          }}
          className="lg:grid-cols-2 lg:gap-24"
        >
          {/* Latest */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "1rem",
                borderBottom: `1px solid ${line}`,
                paddingBottom: 20,
                marginBottom: "3rem",
              }}
            >
              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(24px, 3vw, 38px)",
                  color: bone,
                  fontWeight: 400,
                }}
              >
                {id ? "Terbaru" : "Latest"}
              </h2>
              <span style={{ flex: 1, height: 1, background: lineSoft }} />
              <Link
                href="/buku"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "var(--font-ui, system-ui)",
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: muted,
                  transition: "color 0.3s",
                }}
              >
                {id ? "Semua" : "All"} <ArrowRight size={11} />
              </Link>
            </div>

            <div style={{ borderTop: `1px solid ${lineSoft}` }}>
              {latestBooks.map((book, index) => (
                <article
                  key={book?.id || `latest-${index}`}
                  style={{ borderBottom: `1px solid ${lineSoft}` }}
                >
                  <Link
                    href={`/buku/${book?.slug || "#"}`}
                    className="group"
                    style={{ display: "block", padding: "1.25rem 0" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: "1rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <h3
                        className="font-serif"
                        style={{
                          fontSize: "clamp(16px, 1.6vw, 20px)",
                          color: bone,
                          lineHeight: 1.3,
                          transition: "color 0.2s",
                        }}
                      >
                        {book?.title || "Tanpa Judul"}
                      </h3>
                      <ArrowRight
                        size={14}
                        style={{
                          flexShrink: 0,
                          marginTop: 4,
                          color: muted,
                          opacity: 0,
                          transform: "translateX(-4px)",
                          transition: "opacity 0.3s, transform 0.3s",
                        }}
                        className="group-hover:!opacity-50 group-hover:!translate-x-0"
                      />
                    </div>
                    <p
                      className="font-body line-clamp-1"
                      style={{ fontSize: 13, color: muted, marginBottom: "0.75rem" }}
                    >
                      {book?.excerpt || ""}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-ui, system-ui)",
                          fontSize: 9,
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: vermilion,
                        }}
                      >
                        {book?.category || "Umum"}
                      </span>
                      <span
                        style={{
                          width: 3,
                          height: 3,
                          borderRadius: "50%",
                          background: lineSoft,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "var(--font-ui, system-ui)",
                          fontSize: 9,
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          color: muted,
                        }}
                      >
                        {getRelativeTime(
                          book?.publishedAt || new Date().toISOString(),
                          language
                        )}
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>

          {/* Most Read */}
          {mostRelatable.length > 0 && (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "1rem",
                  borderBottom: `1px solid ${line}`,
                  paddingBottom: 20,
                  marginBottom: "3rem",
                }}
              >
                <h2
                  className="font-serif"
                  style={{
                    fontSize: "clamp(24px, 3vw, 38px)",
                    color: bone,
                    fontWeight: 400,
                  }}
                >
                  {id ? "Sering Dibaca" : "Most Read"}
                </h2>
                <span style={{ flex: 1, height: 1, background: lineSoft }} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {mostRelatable.slice(0, 5).map((book, index) => (
                  <article key={book?.id || `relatable-${index}`}>
                    <Link
                      href={`/buku/${book?.slug || "#"}`}
                      className="group"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1.5rem",
                        padding: "1.25rem",
                        borderRadius: "0.75rem",
                        border: `1px solid ${lineSoft}`,
                        transition: "border-color 0.4s",
                      }}
                    >
                      <span
                        className="font-serif group-hover:!text-[#e0231c]/40"
                        style={{
                          flexShrink: 0,
                          width: 32,
                          textAlign: "center",
                          fontSize: "clamp(26px, 2.5vw, 36px)",
                          fontWeight: 300,
                          letterSpacing: "-0.02em",
                          color: "rgba(223,231,224,0.15)",
                          transition: "color 0.4s",
                        }}
                      >
                        {index + 1}
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3
                          className="font-serif"
                          style={{
                            fontSize: "clamp(15px, 1.4vw, 19px)",
                            color: bone,
                            marginBottom: "0.25rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            transition: "color 0.3s",
                          }}
                        >
                          {book?.title || "Tanpa Judul"}
                        </h3>
                        <p
                          style={{
                            fontFamily: "var(--font-ui, system-ui)",
                            fontSize: 10,
                            letterSpacing: "0.16em",
                            textTransform: "uppercase",
                            color: muted,
                          }}
                        >
                          {book?.category || "Umum"} · {book?.readTime || "5 menit"}
                        </p>
                      </div>
                      <ArrowRight
                        size={14}
                        style={{
                          flexShrink: 0,
                          color: bone,
                          opacity: 0,
                          transform: "translateX(-4px)",
                          transition: "opacity 0.4s, transform 0.4s",
                        }}
                        className="group-hover:!opacity-40 group-hover:!translate-x-0"
                      />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section
        style={{
          padding: "8rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          background: inkSurface,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Vermilion glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 420,
            height: 260,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse at center bottom, rgba(224,35,28,0.12) 0%, transparent 70%)",
          }}
        />

        <div style={{ maxWidth: 520, position: "relative", zIndex: 1 }}>
          <PenLine
            size={28}
            style={{ margin: "0 auto 2rem", color: "rgba(223,231,224,0.2)" }}
          />

          <h2
            className="font-serif"
            style={{
              fontSize: "clamp(30px, 4.5vw, 56px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#fff",
              marginBottom: "1.25rem",
            }}
          >
            {id ? "Punya cerita?" : "Got a story?"}
          </h2>

          <p
            className="font-body"
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              color: boneDim,
              maxWidth: "40ch",
              margin: "0 auto 3rem",
            }}
          >
            {id
              ? "Kalau kamu punya tulisan soal kerja, hidup, atau apa pun yang jarang dibicarakan — tulis di sini. Nggak perlu bagus, yang penting jujur."
              : "If you have something to write about work, life, or anything rarely talked about — write it here. It doesn't have to be good, just honest."}
          </p>

          <Link
            href="/tulis"
            className="group"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "1rem 2rem",
              borderRadius: 9999,
              fontFamily: "var(--font-ui, system-ui)",
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 500,
              border: "1px solid rgba(223,231,224,0.18)",
              color: bone,
              transition: "border-color 0.4s, color 0.4s",
            }}
          >
            <PenLine size={13} style={{ opacity: 0.7 }} />
            {id ? "Tulis Sesuatu" : "Write Something"}
            <ArrowRight size={13} style={{ opacity: 0.5 }} />
          </Link>
        </div>
      </section>
    </div>
  );
}
