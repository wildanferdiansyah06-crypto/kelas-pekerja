"use client";

import React, { useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, PenLine } from "lucide-react";
import { useLanguage } from "@/src/contexts/LanguageContext";

/* ─── Kelas Pekerja iframe helpers ────────────────────────────────────────────
   KelasPekerjaHero internally renders an <iframe src="/landing-pages/kelas-pekerja.html">
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

/* ─── KelasPekerjaHero ─────────────────────────────────────────────────────────
  Hosts the complete authored Kelas Pekerja document in a same-origin iframe.
  ──────────────────────────────────────────────────────────────────────── */
function KelasPekerjaHero({ totalBooks = 0 }: { totalBooks?: number }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleLoad = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage(
      { type: "KP_STATS", totalBooks },
      window.location.origin
    );
  }, [totalBooks]);

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
      <iframe
        ref={iframeRef}
        title="Kelas Pekerja experience"
        src="/landing-pages/kelas-pekerja.html"
        allow="autoplay; fullscreen; gamepad"
        sandbox="allow-forms allow-modals allow-downloads allow-popups allow-scripts allow-same-origin"
        onLoad={handleLoad}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          border: 0,
        }}
      />
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
  const { language } = useLanguage();
  const id = language === "id";

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
      <KelasPekerjaHero totalBooks={allBooks.length} />

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
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60vw",
            height: "60vw",
            background: "radial-gradient(circle, rgba(224,35,28,0.03) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 640 }}>
          <h2
            className="font-serif"
            style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              color: "#fff",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              marginBottom: "1.5rem",
            }}
          >
            {id ? "Jadilah bagian dari tulisan kelas pekerja" : "Be part of the working class writings"}
          </h2>
          <p
            className="font-body"
            style={{
              fontSize: 16,
              color: boneDim,
              lineHeight: 1.6,
              marginBottom: "3rem",
            }}
          >
            {id
              ? "Punya cerita, refleksi, atau keluh kesah dari balik meja kerjamu? Bagikan, dan biarkan dunia membacanya."
              : "Have a story, reflection, or grievance from behind your desk? Share it, and let the world read it."}
          </p>
          <Link
            href="/tulis"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "1rem 2.5rem",
              borderRadius: 9999,
              fontFamily: "var(--font-ui, system-ui)",
              fontSize: 12,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 500,
              background: "#fff",
              color: ink,
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <PenLine size={15} />
            {id ? "Tulis Ceritamu" : "Write Your Story"}
          </Link>
        </div>
      </section>
    </div>
  );
}
