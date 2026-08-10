'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin, Coffee, Book, ExternalLink, Github, Instagram, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '@/src/contexts/LanguageContext';

export default function TentangPage() {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  const books = [
    {
      title: "Masa yang Tak Pernah Bertanya Izin",
      subtitle: "Tentang Waktu yang Berlalu Tanpa Permisi",
      year: "2026",
      genre: "Refleksi",
      link: "/buku/masa-yang-tak-pernah-bertanya-izin"
    },
    {
      title: "Cahaya Itu",
      subtitle: "Sebuah Pengakuan tentang yang Terbakar hingga Padam",
      year: "2026",
      genre: "Refleksi",
      link: "/buku/cahaya-itu"
    },
    {
      title: "Yang Tertinggal di Lembah",
      subtitle: "Sebuah Tafsiran tentang Janji, Kehilangan, dan Perjalanan",
      year: "2026",
      genre: "Filosofi",
      link: "/buku/yang-tertinggal-di-lembah"
    },
    {
      title: "Kami Menulis Pelan",
      subtitle: "Kumpulan tulisan yang lahir dari kesabaran",
      year: "2026",
      genre: "Proses",
      link: "/buku/kami-menulis-pelan"
    },
    {
      title: "Di Atas Cangkir Yang Sama",
      subtitle: "Panduan akademis dan konsistensi",
      year: "2026",
      genre: "Renungan",
      link: "/buku/di-atas-cangkir-yang-sama"
    },
    {
      title: "Di Balik Bar",
      subtitle: "Cerita-cerita dari balik meja bar",
      year: "2026",
      genre: "Cerita",
      link: "/buku/di-balik-bar"
    },
    {
      title: "Seni Menyeduh Kehidupan",
      subtitle: "Menyikapi hidup dengan cara yang lebih gentle",
      year: "2026",
      genre: "Kehidupan",
      link: "/buku/seni-menyeduh-kehidupan"
    }
  ];

  const socialLinks = [
    {
      label: "GitHub",
      href: "https://github.com/wildanferdiansyah06-crypto/kelas-pekerja",
      icon: <Github size={20} />,
      description: "Source code"
    },
    {
      label: "Instagram",
      href: "https://instagram.com/_iamwildan_",
      icon: <Instagram size={20} />,
      description: "@_iamwildan_"
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/6289636357091",
      icon: <MessageCircle size={20} />,
      description: "Chat langsung"
    },
  ];

  if (!mounted) return null;

  return (
    <div
      className="antialiased"
      style={{
        backgroundColor: 'var(--kp-bg-base)',
        color: 'var(--kp-text-primary)',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}
    >

      {/* Background Ambient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_top_right,rgba(212,165,116,0.04),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,165,116,0.03),transparent_60%)]" />
      </div>

      <main className="relative z-10">

        {/* ═══════════════════════════════
            HERO - Profile Section
        ═══════════════════════════════ */}
        <section className="relative px-6 lg:px-12 pt-28 sm:pt-32 pb-20 sm:pb-28 overflow-hidden">
          {/* Background decorative line */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[rgba(212,165,116,0.15)] to-transparent" />

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-5 gap-12 lg:gap-20 items-center">

              {/* Left — Photo & Socials */}
              <div className="md:col-span-2 flex flex-col items-center">
                {/* Photo with ambient glow */}
                <div className="relative mb-8 group">
                  <div
                    className="relative w-44 h-44 sm:w-52 sm:h-52 lg:w-60 lg:h-60 rounded-full overflow-hidden border-2 transition-all duration-500"
                    style={{
                      borderColor: 'rgba(212, 165, 116, 0.2)',
                      boxShadow: '0 0 40px rgba(212, 165, 116, 0.08), 0 8px 32px rgba(0, 0, 0, 0.4)',
                    }}
                  >
                    <Image
                      src="/images/wildan.png"
                      alt="Wildan Ferdiansyah"
                      fill
                      className="object-cover rounded-full transition-transform duration-700 group-hover:scale-105"
                      priority
                      sizes="(max-width: 640px) 176px, (max-width: 1024px) 208px, 240px"
                    />
                  </div>
                  {/* Outer glow ring */}
                  <div
                    className="absolute -inset-3 rounded-full border opacity-40 pointer-events-none animate-glow-pulse"
                    style={{ borderColor: 'rgba(212, 165, 116, 0.1)' }}
                  />
                </div>

                {/* Social Links */}
                <div className="flex gap-3">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-300 group/social"
                      style={{
                        borderColor: 'rgba(212, 165, 116, 0.15)',
                        background: 'rgba(212, 165, 116, 0.04)',
                        color: 'var(--kp-text-muted)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(212, 165, 116, 0.5)';
                        e.currentTarget.style.background = 'rgba(212, 165, 116, 0.1)';
                        e.currentTarget.style.color = 'var(--kp-accent)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(212, 165, 116, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(212, 165, 116, 0.15)';
                        e.currentTarget.style.background = 'rgba(212, 165, 116, 0.04)';
                        e.currentTarget.style.color = 'var(--kp-text-muted)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Right — Bio */}
              <div className="md:col-span-3 text-center md:text-left">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-ui text-sm font-medium tracking-wider uppercase mb-6 glass"
                  style={{ color: 'var(--kp-accent)', borderColor: 'rgba(212, 165, 116, 0.2)' }}
                >
                  <Sparkles size={13} />
                  {language === 'en' ? 'About Author' : 'Tentang Penulis'}
                </div>

                <h1
                  className="typography-h1 mb-4 animate-fade-in-up"
                  style={{ color: 'var(--kp-text-primary)' }}
                >
                  Wildan Ferdiansyah
                </h1>

                <p
                  className="font-display text-2xl sm:text-3xl italic mb-6 animate-fade-in-up delay-100 leading-relaxed"
                  style={{ color: 'var(--kp-text-muted)' }}
                >
                  {language === 'en' ? 'Not a Writer, Not a Motivator' : 'Bukan Penulis, Bukan Motivator'}
                </p>

                <p
                  className="font-body text-lg sm:text-xl leading-[1.85] mb-8 max-w-lg mx-auto md:mx-0 animate-fade-in-up delay-200"
                  style={{ color: 'var(--kp-text-secondary)' }}
                >
                  {language === 'en'
                    ? 'Just someone trying to understand life through words. Formerly a barista, formerly a mural artist, now writing—not to be famous, but to stay sane.'
                    : 'Seseorang yang mencoba memahami hidupnya melalui kata-kata. Pernah menjadi barista, pernah menjadi muralis, sekarang menulis — bukan untuk menjadi terkenal, tetapi untuk tetap waras.'}
                </p>

                {/* Location & Email pills */}
                <div className="flex flex-wrap gap-3 justify-center md:justify-start animate-fade-in-up delay-300">
                  <div
                    className="flex items-center gap-2 px-4 py-2 rounded-full glass font-ui text-sm"
                  >
                    <MapPin size={14} style={{ color: 'var(--kp-accent)' }} />
                    <span style={{ color: 'var(--kp-text-primary)' }}>Bali, Ubud</span>
                  </div>
                  <a
                    href="mailto:wildanferdiansyah06@gmail.com"
                    className="flex items-center gap-2 px-4 py-2 rounded-full glass font-ui text-sm transition-all duration-300 hover:border-[rgba(212,165,116,0.3)]"
                  >
                    <Mail size={14} style={{ color: 'var(--kp-accent)' }} />
                    <span style={{ color: 'var(--kp-text-primary)' }}>wildanferdiansyah06@gmail.com</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            WRITER PROFILE - Process & Tools
        ═══════════════════════════════ */}
        <section className="px-6 lg:px-12 py-20 sm:py-28 relative" style={{ backgroundColor: 'var(--kp-bg-surface)' }}>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">

              {/* Left card - The Writer */}
              <div className="glass-card rounded-2xl p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(212, 165, 116, 0.1)', border: '1px solid rgba(212, 165, 116, 0.2)' }}
                  >
                    <Book size={18} style={{ color: 'var(--kp-accent)' }} />
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl" style={{ color: 'var(--kp-text-primary)' }}>
                    {language === 'en' ? 'The Writer' : 'Penulis'}
                  </h2>
                </div>

                <p className="font-body text-lg leading-[1.85] mb-8" style={{ color: 'var(--kp-text-secondary)' }}>
                  {language === 'en'
                    ? 'Writing as a way to understand life and preserve sanity. Every word is an attempt to remain present in an ever-shifting world.'
                    : 'Menulis sebagai cara untuk memahami hidup dan menjaga kewarasan. Setiap kata adalah upaya untuk tetap hadir di dunia yang terus berubah.'}
                </p>

                <div className="mb-6">
                  <h3 className="font-ui text-sm font-semibold tracking-[0.15em] uppercase mb-4" style={{ color: 'var(--kp-accent)' }}>
                    {language === 'en' ? 'Genres & Themes' : 'Genre Karya'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(language === 'en'
                      ? ['Fiction', 'Poetry', 'Philosophy', 'Reflection', 'Academic']
                      : ['Fiksi', 'Puisi', 'Filsafat', 'Refleksi', 'Akademis']
                    ).map((genre) => (
                      <span
                        key={genre}
                        className="font-ui px-3.5 py-1.5 rounded-full text-sm border"
                        style={{
                          color: 'var(--kp-accent)',
                          borderColor: 'rgba(212, 165, 116, 0.2)',
                          background: 'rgba(212, 165, 116, 0.05)',
                        }}
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-ui text-sm font-semibold tracking-[0.15em] uppercase mb-4" style={{ color: 'var(--kp-accent)' }}>
                    {language === 'en' ? 'Writing Tools' : 'Tools Menulis'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['Notion', 'Obsidian', 'Typora', 'VS Code'].map((tool) => (
                      <span
                        key={tool}
                        className="font-ui px-3.5 py-1.5 rounded-full text-sm border"
                        style={{
                          color: 'var(--kp-text-muted)',
                          borderColor: 'var(--kp-border-medium)',
                          background: 'rgba(19, 17, 16, 0.5)',
                        }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right card - The Process */}
              <div className="glass-card rounded-2xl p-8 lg:p-10 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(212, 165, 116, 0.1)', border: '1px solid rgba(212, 165, 116, 0.2)' }}
                  >
                    <Coffee size={18} style={{ color: 'var(--kp-accent)' }} />
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl" style={{ color: 'var(--kp-text-primary)' }}>
                    {language === 'en' ? 'Writing Process' : 'Proses Menulis'}
                  </h2>
                </div>

                <p className="font-body text-lg leading-[1.85] mb-8 flex-1" style={{ color: 'var(--kp-text-secondary)' }}>
                  {language === 'en'
                    ? 'Writing while awaiting dusk and sipping coffee until dawn breaks. Every sentence is born from night quietness and warm coffee aroma.'
                    : 'Menulis sambil menunggu senja dan minum kopi sampai fajar terbit. Setiap kata lahir dari keheningan malam dan aroma kopi yang menemani.'}
                </p>

                {/* Visual process steps */}
                <div className="space-y-4">
                  {(language === 'en'
                    ? [
                        { time: 'Evening', desc: 'Gathering fragmented thoughts' },
                        { time: 'Night', desc: 'Pouring into quiet sentences' },
                        { time: 'Midnight', desc: 'Refining in deep silence' },
                        { time: 'Dawn', desc: 'Releasing to be read' },
                      ]
                    : [
                        { time: 'Sore', desc: 'Mengumpulkan serpihan pikiran' },
                        { time: 'Malam', desc: 'Menuang ke dalam kata-kata' },
                        { time: 'Dini Hari', desc: 'Menyempurnakan dalam sunyi' },
                        { time: 'Fajar', desc: 'Merelakan untuk dibaca' },
                      ]
                  ).map((step, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="relative">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: 'var(--kp-accent)', boxShadow: '0 0 8px rgba(212, 165, 116, 0.4)' }}
                        />
                        {i < 3 && (
                          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[1px] h-8" style={{ background: 'linear-gradient(to bottom, rgba(212, 165, 116, 0.3), transparent)' }} />
                        )}
                      </div>
                      <div>
                        <span className="font-ui text-sm font-semibold tracking-wider uppercase" style={{ color: 'var(--kp-accent)' }}>
                          {step.time}
                        </span>
                        <p className="font-body text-base mt-0.5" style={{ color: 'var(--kp-text-muted)' }}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            BOOKS - Karya
        ═══════════════════════════════ */}
        <section className="px-6 lg:px-12 py-20 sm:py-28 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[rgba(212,165,116,0.15)] to-transparent" />

          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="font-ui text-sm font-medium tracking-[0.25em] uppercase mb-4" style={{ color: 'var(--kp-text-muted)' }}>
                {language === 'en' ? 'Works Archive' : 'Koleksi Karya'}
              </div>
              <h2 className="typography-h2 mb-4" style={{ color: 'var(--kp-text-primary)' }}>
                {language === 'en' ? 'Books & Writings' : 'Karya'}
              </h2>
              <p className="font-body text-lg sm:text-xl max-w-2xl mx-auto opacity-80 leading-relaxed" style={{ color: 'var(--kp-text-secondary)' }}>
                {language === 'en'
                  ? 'Six books born from the search for meaning on every page'
                  : 'Enam buku yang lahir dari proses mencari makna dalam setiap halaman'}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book, index) => (
                <Link
                  key={index}
                  href={book.link}
                  className="group block glass-card rounded-2xl p-7 relative overflow-hidden"
                >
                  {/* Hover glow */}
                  <div className="absolute -inset-20 bg-[radial-gradient(circle_at_center,rgba(212,165,116,0.08)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-5">
                      <span
                        className="font-ui text-xs font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full border"
                        style={{
                          color: 'var(--kp-accent)',
                          borderColor: 'rgba(212, 165, 116, 0.2)',
                          background: 'rgba(212, 165, 116, 0.05)',
                        }}
                      >
                        {book.genre}
                      </span>
                      <span className="font-ui text-sm" style={{ color: 'var(--kp-text-subtle)' }}>
                        {book.year}
                      </span>
                    </div>

                    <h3
                      className="font-display text-2xl sm:text-3xl mb-3 group-hover:text-glow transition-all duration-300 leading-snug"
                      style={{ color: 'var(--kp-text-primary)' }}
                    >
                      {book.title}
                    </h3>

                    <p className="font-body text-base leading-relaxed line-clamp-2 mb-6" style={{ color: 'var(--kp-text-muted)' }}>
                      {book.subtitle}
                    </p>

                    <div className="flex items-center gap-2 font-ui text-sm font-medium" style={{ color: 'var(--kp-accent)' }}>
                      <span className="group-hover:text-glow transition-all">Baca</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            PHILOSOPHY - Quote Block
        ═══════════════════════════════ */}
        <section className="px-6 lg:px-12 py-24 sm:py-32 relative overflow-hidden" style={{ backgroundColor: 'var(--kp-bg-surface)' }}>
          {/* Ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[rgba(212,165,116,0.04)] rounded-full blur-[80px] pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <div
              className="w-14 h-14 mx-auto mb-8 rounded-full border flex items-center justify-center glow-amber"
              style={{ borderColor: 'rgba(212, 165, 116, 0.3)' }}
            >
              <Coffee size={22} style={{ color: 'var(--kp-accent)' }} />
            </div>

            <blockquote
              className="font-display text-3xl sm:text-4xl md:text-5xl italic leading-relaxed mb-10 text-glow"
              style={{ color: 'var(--kp-text-primary)' }}
            >
              &ldquo;Aku menulis untuk hadir, bukan untuk memukau.&rdquo;
            </blockquote>

            <p className="font-body text-lg sm:text-xl leading-[1.85] max-w-2xl mx-auto text-balance" style={{ color: 'var(--kp-text-muted)' }}>
              Ini bukan tentang menjadi terkenal atau diakui. Ini tentang menjaga kewarasan diri di tengah dunia yang terus bergerak. Setiap kata adalah jangkar yang menahan agar tidak hanyut dalam arus waktu.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════
            CONTACT
        ═══════════════════════════════ */}
        <section className="px-6 lg:px-12 py-20 sm:py-28">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="font-ui text-sm font-medium tracking-[0.25em] uppercase mb-4" style={{ color: 'var(--kp-text-muted)' }}>
                Jalin Koneksi
              </div>
              <h2 className="typography-h2 mb-4" style={{ color: 'var(--kp-text-primary)' }}>
                Terhubung
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  icon: <Mail size={24} />,
                  title: "Email",
                  desc: "wildanferdiansyah06@gmail.com",
                  href: "mailto:wildanferdiansyah06@gmail.com",
                  external: false,
                },
                {
                  icon: <MessageCircle size={24} />,
                  title: "WhatsApp",
                  desc: "089636357091",
                  href: "https://wa.me/6289636357091",
                  external: true,
                },
                {
                  icon: <ExternalLink size={24} />,
                  title: "Website",
                  desc: "kelaspekerja.site",
                  href: "https://kelaspekerja.site",
                  external: true,
                },
              ].map((contact) => (
                <a
                  key={contact.title}
                  href={contact.href}
                  target={contact.external ? "_blank" : undefined}
                  rel={contact.external ? "noopener noreferrer" : undefined}
                  className="group glass-card rounded-2xl p-8 text-center flex flex-col items-center"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-5 transition-all duration-300 group-hover:glow-amber"
                    style={{
                      background: 'rgba(212, 165, 116, 0.08)',
                      border: '1px solid rgba(212, 165, 116, 0.15)',
                      color: 'var(--kp-accent)',
                    }}
                  >
                    {contact.icon}
                  </div>
                  <h3 className="font-ui text-xl font-semibold mb-2" style={{ color: 'var(--kp-text-primary)' }}>
                    {contact.title}
                  </h3>
                  <p className="font-ui text-base break-all transition-colors duration-300 group-hover:text-[var(--kp-text-primary)]" style={{ color: 'var(--kp-text-muted)' }}>
                    {contact.desc}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
