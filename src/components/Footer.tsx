"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const footerLinks = {
  bacaan: [
    { label: "Semua Buku", href: "/buku" },
    { label: "Kategori Refleksi", href: "/buku?category=refleksi" },
    { label: "Kategori Kehidupan", href: "/buku?category=kehidupan" },
    { label: "Kategori Filosofi", href: "/buku?category=filosofi" },
  ],
  eksplorasi: [
    { label: "Quote Acak", href: "/quotes" },
    { label: "Koleksi Tersimpan", href: "/bookmark" },
    { label: "Tentang Kami", href: "/tentang" },
  ],
};

const socialLinks = [
  {
    label: "WhatsApp",
    href: "https://wa.me/6281234567890", // Ganti dengan nomor WhatsApp kamu
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.851L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.373l-.36-.214-3.724.972.993-3.624-.235-.373A9.818 9.818 0 1112 21.818z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/iamwildan", // Ganti dengan username Instagram kamu
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [networkStatus, setNetworkStatus] = useState<{
    text: string;
    color: string;
    dotColor: string;
  }>({
    text: "Memeriksa koneksi...",
    color: "text-gray-500",
    dotColor: "bg-gray-500",
  });

  // Network detection
  useEffect(() => {
    const updateNetworkStatus = () => {
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;

      if (!connection) {
        setNetworkStatus({
          text: "Koneksi stabil",
          color: "text-green-500",
          dotColor: "bg-green-500",
        });
        return;
      }

      const effectiveType = connection.effectiveType;
      const downlink = connection.downlink;

      if (!navigator.onLine) {
        setNetworkStatus({
          text: "Koneksi terputus",
          color: "text-red-500",
          dotColor: "bg-red-500",
        });
      } else if (effectiveType === 'slow-2g' || effectiveType === '2g' || downlink < 0.5) {
        setNetworkStatus({
          text: "Koneksi lambat",
          color: "text-red-500",
          dotColor: "bg-red-500",
        });
      } else if (effectiveType === '3g' || (downlink >= 0.5 && downlink < 2)) {
        setNetworkStatus({
          text: "Koneksi sedang",
          color: "text-yellow-500",
          dotColor: "bg-yellow-500",
        });
      } else if (effectiveType === '4g' || downlink >= 2) {
        setNetworkStatus({
          text: "Koneksi cepat",
          color: "text-green-500",
          dotColor: "bg-green-500",
        });
      } else {
        setNetworkStatus({
          text: "Koneksi stabil",
          color: "text-green-500",
          dotColor: "bg-green-500",
        });
      }
    };

    updateNetworkStatus();

    // Listen for network changes
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    if (connection) {
      connection.addEventListener('change', updateNetworkStatus);
    }

    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
      if (connection) {
        connection.removeEventListener('change', updateNetworkStatus);
      }
    };
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setNewsletterStatus("error");
      setNewsletterMessage("Email tidak valid");
      return;
    }

    setNewsletterStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setNewsletterStatus("success");
        setNewsletterMessage(data.message || "Terima kasih!");
        setEmail("");
      } else {
        setNewsletterStatus("error");
        setNewsletterMessage(data.error || "Gagal mengirim");
      }
    } catch (error) {
      setNewsletterStatus("error");
      setNewsletterMessage("Terjadi kesalahan");
    }
  };

  return (
    <footer
      className="
        relative overflow-hidden
        bg-[#fdf0e0] dark:bg-[#110d08]
        border-t border-[#e2cdb0] dark:border-[#2a1f14]
      "
    >
      {/* ── Dekoratif: garis gradasi di paling atas ── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#a0714f]/50 to-transparent dark:via-[#c9915a]/30" />

      {/* ── Dekoratif: noise/grain texture overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 container mx-auto max-w-6xl px-6 md:px-10 lg:px-12">

        {/* ══════════════════════════════════
            TOP SECTION
        ══════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pt-16 pb-12">

          {/* — Kolom 1: Brand — */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-4">
              <span className="text-2xl">☕</span>
              <span
                className="
                  font-serif text-2xl font-bold tracking-tight
                  text-[#2c1e0f] dark:text-[#f2e8d5]
                "
              >
                Kelas Pekerja
              </span>
            </div>

            {/* Deskripsi */}
            <p
              className="
                text-sm leading-relaxed max-w-xs
                text-[#6b4c2a] dark:text-[#9c7a5a]
              "
            >
              Bacaan ringan untuk jiwa yang lelah. Ditulis di sela-sela waktu kerja,
              ditemani kopi yang tak pernah sempat habis.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="
                    flex items-center justify-center w-9 h-9 rounded-full
                    bg-[#e8d5b7] dark:bg-[#231c14]
                    text-[#6b4c2a] dark:text-[#c9915a]
                    border border-[#d4bc99] dark:border-[#2e2018]
                    hover:bg-[#a0714f] hover:text-white dark:hover:bg-[#c9915a] dark:hover:text-[#0f0b07]
                    hover:border-transparent hover:scale-110
                    transition-all duration-200
                  "
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* — Kolom 2: Bacaan — */}
          <div>
            <h4
              className="
                font-serif font-semibold text-sm uppercase tracking-widest mb-5
                text-[#a0714f] dark:text-[#c9915a]
              "
            >
              Bacaan
            </h4>
            <ul className="space-y-3">
              {footerLinks.bacaan.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="
                      text-sm
                      text-[#6b4c2a] dark:text-[#9c7a5a]
                      hover:text-[#a0714f] dark:hover:text-[#c9915a]
                      hover:translate-x-1
                      transition-all duration-150
                      inline-block
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* — Kolom 3: Eksplorasi — */}
          <div>
            <h4
              className="
                font-serif font-semibold text-sm uppercase tracking-widest mb-5
                text-[#a0714f] dark:text-[#c9915a]
              "
            >
              Eksplorasi
            </h4>
            <ul className="space-y-3">
              {footerLinks.eksplorasi.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="
                      text-sm
                      text-[#6b4c2a] dark:text-[#9c7a5a]
                      hover:text-[#a0714f] dark:hover:text-[#c9915a]
                      hover:translate-x-1
                      transition-all duration-150
                      inline-block
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter mini */}
            <div className="mt-8">
              <p className="text-xs text-[#9c7a55] dark:text-[#7a6248] mb-2">
                Dapat notifikasi cerita baru:
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="emailmu@..."
                  className="
                    flex-1 min-w-0 px-3 py-2 rounded-lg text-xs
                    bg-white dark:bg-[#1a1410]
                    border border-[#e2cdb0] dark:border-[#2e2018]
                    text-[#2c1e0f] dark:text-[#f2e8d5]
                    placeholder:text-[#c9a97a] dark:placeholder:text-[#4a3828]
                    focus:outline-none focus:ring-2 focus:ring-[#a0714f]/30
                    focus:border-[#a0714f] dark:focus:border-[#c9915a]
                    transition-all duration-200
                  "
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === "loading"}
                  className="
                    px-3 py-2 rounded-lg text-xs font-semibold shrink-0
                    bg-[#a0714f] dark:bg-[#c9915a]
                    text-white dark:text-[#0f0b07]
                    hover:bg-[#7c5230] dark:hover:bg-[#e0a96a]
                    active:scale-95
                    transition-all duration-200
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                >
                  {newsletterStatus === "loading" ? "..." : "Ikuti →"}
                </button>
              </form>
              {newsletterMessage && (
                <p
                  className={`text-xs mt-2 ${
                    newsletterStatus === "success"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {newsletterMessage}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════
            MIDDLE SECTION — Quote Divider
        ══════════════════════════════════ */}
        <div
          className="
            relative py-8 my-2
            border-t border-b border-dashed
            border-[#d4bc99] dark:border-[#2a1f14]
          "
        >
          {/* Ornamen lingkaran di tengah */}
          <div
            className="
              absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
              w-8 h-8 rounded-full flex items-center justify-center
              bg-[#fdf0e0] dark:bg-[#110d08]
              border border-dashed border-[#d4bc99] dark:border-[#2a1f14]
              text-base
            "
          >
            ☕
          </div>

          <p
            className="
              text-center font-serif italic text-base md:text-lg
              text-[#6b4c2a] dark:text-[#9c7a5a]
              px-8 md:px-24 lg:px-48
              leading-relaxed
            "
          >
            "Hari ini mungkin berat, tapi kamu sudah sampai di sini — dan itu sudah lebih dari cukup."
          </p>
        </div>

        {/* ══════════════════════════════════
            BOTTOM BAR
        ══════════════════════════════════ */}
        <div
          className="
            flex flex-col sm:flex-row items-center justify-between
            gap-3 py-8
            text-xs
            text-[#9c7a55] dark:text-[#5a4535]
          "
        >
          {/* Kiri: Copyright */}
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-[#6b4c2a] dark:text-[#7a6248] font-medium">
              Kelas Pekerja
            </span>
            {" "}— Hak cipta dilindungi.
          </p>

          {/* Tengah: Status dot */}
          <div className="flex items-center gap-2">
            <span
              className={`w-1.5 h-1.5 rounded-full animate-pulse ${networkStatus.dotColor}`}
            />
            <span className={networkStatus.color}>{networkStatus.text}</span>
          </div>

          {/* Kanan: Made with */}
          <p>
            Dibuat dengan{" "}
            <span className="text-[#a0714f] dark:text-[#c9915a]">☕</span>
            {" & "}
            <span className="text-rose-400 dark:text-rose-300">♥</span>
            {" "}di malam yang sunyi
          </p>
        </div>
      </div>

      {/* ── Dekoratif: gradasi bawah ── */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#a0714f]/30 to-transparent dark:via-[#c9915a]/20" />
    </footer>
  );
}
