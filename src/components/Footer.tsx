"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Mail, ArrowRight, Github, Instagram, MessageCircle, Sparkles } from "lucide-react";

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
    href: "https://wa.me/6289636357091", 
    icon: <MessageCircle size={18} />,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/_iamwildan_", 
    icon: <Instagram size={18} />,
  },
  {
    label: "GitHub",
    href: "https://github.com/wildanferdiansyah06-crypto", 
    icon: <Github size={18} />,
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [networkStatus, setNetworkStatus] = useState<{
    text: string;
    dotColor: string;
  }>({
    text: "Memeriksa koneksi...",
    dotColor: "bg-[var(--kp-text-muted)]",
  });

  // Network detection
  useEffect(() => {
    const updateNetworkStatus = () => {
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;

      if (!connection) {
        setNetworkStatus({
          text: "Terhubung",
          dotColor: "bg-[var(--kp-accent)]",
        });
        return;
      }

      const effectiveType = connection.effectiveType;
      const downlink = connection.downlink;

      if (!navigator.onLine) {
        setNetworkStatus({
          text: "Koneksi terputus",
          dotColor: "bg-red-500",
        });
      } else if (effectiveType === 'slow-2g' || effectiveType === '2g' || downlink < 0.5) {
        setNetworkStatus({
          text: "Koneksi lambat",
          dotColor: "bg-amber-600",
        });
      } else if (effectiveType === '3g' || (downlink >= 0.5 && downlink < 2)) {
        setNetworkStatus({
          text: "Koneksi sedang",
          dotColor: "bg-[var(--kp-accent)]",
        });
      } else if (effectiveType === '4g' || downlink >= 2) {
        setNetworkStatus({
          text: "Koneksi stabil",
          dotColor: "bg-[var(--kp-accent)] glow-amber",
        });
      } else {
        setNetworkStatus({
          text: "Koneksi stabil",
          dotColor: "bg-[var(--kp-accent)] glow-amber",
        });
      }
    };

    updateNetworkStatus();

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
    } catch {
      setNewsletterStatus("error");
      setNewsletterMessage("Terjadi kesalahan");
    }
  };

  return (
    <footer
      className="relative overflow-hidden border-t"
      style={{
        backgroundColor: 'var(--kp-bg-invert)',
        borderColor: 'var(--kp-border)',
      }}
    >
      {/* Decorative Top Glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,165,116,0.3)] to-transparent" />
      
      {/* Background Star Constellation Element */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(212,165,116,0.05),transparent_50%)] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-12">

        {/* ══════════════════════════════════
            TOP SECTION
        ══════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pt-20 pb-16">

          {/* — Brand & Bio — */}
          <div className="lg:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <span className="text-3xl font-display font-light tracking-wider transition-all duration-300 group-hover:text-glow" style={{ color: 'var(--kp-accent)' }}>
                Kelas Pekerja
              </span>
            </Link>

            <p className="font-body text-base lg:text-lg leading-relaxed max-w-md opacity-80 mb-8 text-balance" style={{ color: 'var(--kp-text-secondary)' }}>
              Merekam jejak keheningan di akhir hari. Secangkir demi secangkir, kata demi kata.
            </p>

            <div className="flex items-center gap-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 group"
                  style={{
                    borderColor: 'rgba(212, 165, 116, 0.2)',
                    background: 'rgba(212, 165, 116, 0.05)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212, 165, 116, 0.5)';
                    e.currentTarget.style.background = 'rgba(212, 165, 116, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(212, 165, 116, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212, 165, 116, 0.2)';
                    e.currentTarget.style.background = 'rgba(212, 165, 116, 0.05)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="transition-colors duration-300 group-hover:text-[var(--kp-text-primary)]" style={{ color: 'var(--kp-text-muted)' }}>
                    {s.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* — Links: Bacaan — */}
          <div className="lg:col-span-2 lg:col-start-7 flex flex-col items-center md:items-start">
            <h4 className="font-ui text-xs font-semibold uppercase tracking-[0.2em] mb-6 glow-amber inline-block" style={{ color: 'var(--kp-accent)' }}>
              Katalog
            </h4>
            <ul className="space-y-4 text-center md:text-left">
              {footerLinks.bacaan.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-ui text-sm transition-all duration-300 hover:text-[var(--kp-text-primary)] inline-block hover:translate-x-1"
                    style={{ color: 'var(--kp-text-muted)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* — Links: Eksplorasi — */}
          <div className="lg:col-span-3 lg:col-start-10 flex flex-col items-center md:items-start">
            <h4 className="font-ui text-xs font-semibold uppercase tracking-[0.2em] mb-6 glow-amber inline-block" style={{ color: 'var(--kp-accent)' }}>
              Lebih Jauh
            </h4>
            <ul className="space-y-4 text-center md:text-left mb-10">
              {footerLinks.eksplorasi.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-ui text-sm transition-all duration-300 hover:text-[var(--kp-text-primary)] inline-block hover:translate-x-1"
                    style={{ color: 'var(--kp-text-muted)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter mini */}
            <div className="w-full max-w-xs">
              <p className="font-ui text-xs font-medium tracking-wide mb-3 flex items-center gap-2" style={{ color: 'var(--kp-text-muted)' }}>
                <Sparkles size={12} style={{ color: 'var(--kp-accent)' }} />
                Catatan mingguan
              </p>
              <form onSubmit={handleNewsletterSubmit} className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alamat email..."
                  className="w-full pl-4 pr-12 py-3 rounded-xl font-ui text-sm glass outline-none transition-all duration-300 focus:border-[rgba(212,165,116,0.5)] focus:bg-[rgba(212,165,116,0.05)] placeholder-[var(--kp-border-strong)]"
                  style={{ color: 'var(--kp-text-primary)' }}
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === "loading"}
                  className="absolute right-1 top-1 bottom-1 aspect-square rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-[rgba(212,165,116,0.1)] disabled:opacity-50"
                  style={{ color: 'var(--kp-accent)' }}
                >
                  {newsletterStatus === "loading" ? (
                    <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--kp-accent) transparent var(--kp-accent) var(--kp-accent)' }} />
                  ) : (
                    <ArrowRight size={16} />
                  )}
                </button>
              </form>
              {newsletterMessage && (
                <p className={`font-ui text-xs mt-3 text-center md:text-left transition-opacity duration-300 ${
                    newsletterStatus === "success" ? "text-emerald-400" : "text-red-400"
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
        <div className="relative py-12 flex flex-col items-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(212,165,116,0.2)] to-transparent" />
          </div>
          
          <div className="relative z-10 glass-card px-8 py-4 rounded-full flex flex-col items-center max-w-2xl text-center">
            <p className="font-display italic text-lg md:text-xl text-glow" style={{ color: 'var(--kp-text-primary)' }}>
              "Malam adalah tempat penyimpanan hal-hal yang tak berani kita katakan di siang hari."
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════
            BOTTOM BAR
        ══════════════════════════════════ */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-8 border-t border-dashed" style={{ borderColor: 'rgba(212,165,116,0.1)' }}>
          <p className="font-ui text-xs opacity-70" style={{ color: 'var(--kp-text-muted)' }}>
            © {new Date().getFullYear()}{" "}
            <span className="font-medium tracking-wide" style={{ color: 'var(--kp-accent)' }}>
              Kelas Pekerja
            </span>
            . Semua hak cipta dilindungi.
          </p>

          <div className="flex items-center gap-3 font-ui text-xs glass px-4 py-2 rounded-full border border-[rgba(212,165,116,0.1)]">
            <span className={`w-2 h-2 rounded-full ${networkStatus.dotColor} ${networkStatus.text === 'Koneksi stabil' ? 'animate-pulse' : ''}`} />
            <span style={{ color: 'var(--kp-text-muted)' }}>{networkStatus.text}</span>
          </div>
          
          <p className="font-ui text-xs flex items-center gap-1.5 opacity-70" style={{ color: 'var(--kp-text-muted)' }}>
            Diseduh dengan
            <span className="text-red-400 animate-pulse">♥</span>
            di keheningan malam
          </p>
        </div>
      </div>
    </footer>
  );
}
