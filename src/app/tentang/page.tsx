'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin, Coffee, ExternalLink, Github, Instagram, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/src/contexts/LanguageContext';
import BookCover from '@/src/components/BookCover';




export default function TentangPage() {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const books = [
    {
      title: 'Sunyi yang Kutinggali',
      excerpt: 'Gambaran tentang keadaan hati yang, untuk sesaat, berhenti menjadi ramai — dan bagaimana sunyi bisa menjadi rumah.',
      category: 'renungan',
      readTime: '18 menit',
      slug: 'sunyi-yang-kutinggali',
      cover: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'Masa yang Tak Pernah Bertanya Izin',
      excerpt: 'Masa itu tidak pernah bertanya izin. Dia datang, lewat, dan pergi begitu saja, meninggalkan kita dengan tumpukan kenangan.',
      category: 'refleksi',
      readTime: '40 menit',
      slug: 'masa-yang-tak-pernah-bertanya-izin',
      cover: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'Cahaya Itu',
      excerpt: 'Tentang mereka yang menjadi cahaya untuk orang lain hingga api mereka sendiri padam.',
      category: 'refleksi',
      readTime: '35 menit',
      slug: 'cahaya-itu',
      cover: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'Yang Tertinggal di Lembah',
      excerpt: 'Kita selalu diajarkan untuk mendaki. Tapi ada kebohongan yang lebih sunyi: bahwa perjalanan yang sesungguhnya terjadi di dasar lembah.',
      category: 'filosofi',
      readTime: '45 menit',
      slug: 'yang-tertinggal-di-lembah',
      cover: 'https://images.pexels.com/photos/236412/pexels-photo-236412.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Kami Menulis Pelan',
      excerpt: 'Tulisan-tulisan yang tidak buru-buru. Yang mengalir seperti air, yang hadir seperti napas.',
      category: 'proses',
      readTime: '22 menit',
      slug: 'kami-menulis-pelan',
      cover: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'Di Atas Cangkir Yang Sama',
      excerpt: 'Panduan akademik konsistensi, kehadiran, dan menemukan keindahan dalam pengulangan yang tampak monoton.',
      category: 'renungan',
      readTime: '30 menit',
      slug: 'di-atas-cangkir-yang-sama',
      cover: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'Di Balik Bar',
      excerpt: 'Kumpulan cerita pendek dari sudut pandang seorang barista. Tentang orang-orang yang datang dan pergi.',
      category: 'cerita',
      readTime: '20 menit',
      slug: 'di-balik-bar',
      cover: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'Seni Menyeduh Kehidupan',
      excerpt: 'Catatan-catatan personal yang jujur tentang bagaimana kita bisa menyikapi hari-hari berat dengan lebih lembut.',
      category: 'kehidupan',
      readTime: '25 menit',
      slug: 'seni-menyeduh-kehidupan',
      cover: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
    },
  ];

  const socialLinks = [
    {
      label: 'GitHub',
      href: 'https://github.com/wildanferdiansyah06-crypto/kelas-pekerja',
      icon: <Github size={17} />,
    },
    {
      label: 'Instagram',
      href: 'https://instagram.com/_iamwildan_',
      icon: <Instagram size={17} />,
    },
    {
      label: 'WhatsApp',
      href: 'https://wa.me/6289636357091',
      icon: <MessageCircle size={17} />,
    },
  ];

  const processSteps =
    language === 'en'
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
      {/* Background ambient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_top_right,rgba(212,165,116,0.04),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,165,116,0.03),transparent_60%)]" />
      </div>

      <main className="relative z-10">
        {/* ═══════════════════════════════
            HERO — editorial opening, not a profile card
        ═══════════════════════════════ */}
        <section className="relative px-6 lg:px-12 pt-28 sm:pt-36 pb-20 sm:pb-28">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-[auto,1fr] gap-10 lg:gap-20 items-start">
              {/* Photo + socials */}
              <div className="flex flex-col items-center md:items-start animate-fade-in-up">
                <div
                  className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border transition-shadow duration-500 hover:glow-amber"
                  style={{ borderColor: 'rgba(212, 165, 116, 0.25)' }}
                >
                  <Image
                    src="/images/wildan.png"
                    alt="Wildan Ferdiansyah"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 640px) 128px, 160px"
                  />
                </div>
                <div className="flex gap-2.5 mt-6">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(212,165,116,0.5)] hover:text-[var(--kp-accent)]"
                      style={{ borderColor: 'rgba(212, 165, 116, 0.15)', color: 'var(--kp-text-muted)' }}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Statement */}
              <div className="text-center md:text-left">
                <p
                  className="font-ui text-sm tracking-[0.06em] mb-4 animate-fade-in-up delay-100"
                  style={{ color: 'var(--kp-text-muted)' }}
                >
                  Wildan Ferdiansyah &mdash; Bali, Ubud
                </p>
                <h1
                  className="font-display italic text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.12] mb-7 animate-fade-in-up delay-200"
                  style={{ color: 'var(--kp-text-primary)' }}
                >
                  {language === 'en' ? 'Not a writer, not a motivator.' : 'Bukan penulis, bukan motivator.'}
                </h1>
                <p
                  className="font-body text-lg leading-[1.85] max-w-xl mx-auto md:mx-0 mb-7 animate-fade-in-up delay-300"
                  style={{ color: 'var(--kp-text-secondary)' }}
                >
                  {language === 'en'
                    ? 'Just someone trying to understand life through words. Formerly a barista, formerly a mural artist, now writing—not to be famous, but to stay sane.'
                    : 'Seseorang yang mencoba memahami hidupnya melalui kata-kata. Pernah menjadi barista, pernah menjadi muralis, sekarang menulis — bukan untuk menjadi terkenal, tetapi untuk tetap waras.'}
                </p>
                <div
                  className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 font-ui text-sm animate-fade-in-up delay-300"
                  style={{ color: 'var(--kp-text-muted)' }}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={13} style={{ color: 'var(--kp-accent)' }} /> Bali, Ubud
                  </span>
                  <a
                    href="mailto:wildanferdiansyah06@gmail.com"
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--kp-text-primary)]"
                  >
                    <Mail size={13} style={{ color: 'var(--kp-accent)' }} /> wildanferdiansyah06@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            WRITER — process, in one unhurried frame
        ═══════════════════════════════ */}
        <section className="px-6 lg:px-12 py-16 sm:py-20" style={{ backgroundColor: 'var(--kp-bg-surface)' }}>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <p className="font-body text-lg leading-[1.85] mb-8" style={{ color: 'var(--kp-text-secondary)' }}>
                {language === 'en'
                  ? 'Writing as a way to understand life and preserve sanity. Every word is an attempt to remain present in an ever-shifting world.'
                  : 'Menulis sebagai cara untuk memahami hidup dan menjaga kewarasan. Setiap kata adalah upaya untuk tetap hadir di dunia yang terus berubah.'}
              </p>

              <p className="font-ui text-xs font-medium tracking-[0.14em] uppercase mb-3" style={{ color: 'var(--kp-accent)' }}>
                {language === 'en' ? 'Genres' : 'Genre'}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-7 font-body text-sm" style={{ color: 'var(--kp-text-muted)' }}>
                {(language === 'en'
                  ? ['Fiction', 'Poetry', 'Philosophy', 'Reflection', 'Academic']
                  : ['Fiksi', 'Puisi', 'Filsafat', 'Refleksi', 'Akademis']
                ).map((genre, i, arr) => (
                  <span key={genre}>
                    {genre}
                    {i < arr.length - 1 && <span style={{ color: 'var(--kp-border-medium)' }}> &middot;</span>}
                  </span>
                ))}
              </div>

              <p className="font-ui text-xs font-medium tracking-[0.14em] uppercase mb-3" style={{ color: 'var(--kp-accent)' }}>
                {language === 'en' ? 'Tools' : 'Tools Menulis'}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 font-body text-sm" style={{ color: 'var(--kp-text-muted)' }}>
                {['Notion', 'Obsidian', 'Typora', 'VS Code'].map((tool, i, arr) => (
                  <span key={tool}>
                    {tool}
                    {i < arr.length - 1 && <span style={{ color: 'var(--kp-border-medium)' }}> &middot;</span>}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2.5 mb-7">
                <Coffee size={16} style={{ color: 'var(--kp-accent)' }} />
                <h2 className="font-display text-2xl" style={{ color: 'var(--kp-text-primary)' }}>
                  {language === 'en' ? 'Writing Process' : 'Proses Menulis'}
                </h2>
              </div>
              <div className="space-y-5">
                {processSteps.map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="relative flex-shrink-0 pt-1.5">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: 'var(--kp-accent)' }}
                      />
                      {i < processSteps.length - 1 && (
                        <div
                          className="absolute top-3.5 left-1/2 -translate-x-1/2 w-px h-9"
                          style={{ background: 'linear-gradient(to bottom, rgba(212,165,116,.3), transparent)' }}
                        />
                      )}
                    </div>
                    <div>
                      <span className="font-ui text-xs font-semibold tracking-[0.12em] uppercase" style={{ color: 'var(--kp-accent)' }}>
                        {step.time}
                      </span>
                      <p className="font-body text-[15px] mt-0.5" style={{ color: 'var(--kp-text-muted)' }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            BOOKS — same card style as beranda
        ═══════════════════════════════ */}
        <section className="px-6 lg:px-12 py-20 sm:py-28">
          <div className="max-w-6xl mx-auto">
            <div className="kat-head" style={{ marginBottom: '32px' }}>
              <div>
                <h2 className="h2">{language === 'en' ? 'Books & Writings' : 'Koleksi Karya'}</h2>
                <p className="lead">{language === 'en' ? 'Eight books born from the search for meaning.' : 'Delapan buku yang lahir dari proses mencari makna.'}</p>
              </div>
              <div className="pills">
                <Link className="pill on" href="/buku">{language === 'en' ? 'All Books' : 'Semua Buku'}</Link>
                <Link className="pill" href="/buku?category=refleksi">{language === 'en' ? 'Reflection' : 'Refleksi'}</Link>
                <Link className="pill" href="/buku?category=renungan">{language === 'en' ? 'Meditation' : 'Renungan'}</Link>
                <Link className="pill" href="/buku?category=filosofi">{language === 'en' ? 'Philosophy' : 'Filosofi'}</Link>
              </div>
            </div>

            <div className="grid-books">
              {books.map((book, index) => (
                <article key={index} className="book" data-tilt>
                  <Link href={`/buku/${book.slug}`}>
                    <BookCover cover={book.cover} category={book.category} className="book-cov">
                      <span className="book-tag">{book.category}</span>
                    </BookCover>
                    <h4>{book.title}</h4>
                    <p>{(book.excerpt || '').substring(0, 90)}{(book.excerpt?.length ?? 0) > 90 ? '...' : ''}</p>
                    <div className="book-meta">
                      <span>{book.category}</span>
                      <span>{book.readTime}</span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            <div className="kat-more">
              <Link className="btn btn-s" href="/buku">
                {language === 'en' ? 'See All Writings' : 'Lihat Semua Tulisan'}
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            PHILOSOPHY — the one loud moment on the page
        ═══════════════════════════════ */}
        <section
          className="px-6 lg:px-12 py-24 sm:py-32 relative overflow-hidden"
          style={{ backgroundColor: 'var(--kp-bg-surface)' }}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty('--qx', `${((e.clientX - r.left) / r.width) * 100}%`);
            e.currentTarget.style.setProperty('--qy', `${((e.clientY - r.top) / r.height) * 100}%`);
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: 'radial-gradient(480px circle at var(--qx,50%) var(--qy,40%), rgba(212,165,116,.06), transparent 65%)',
            }}
          />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <Coffee size={22} className="mx-auto mb-8" style={{ color: 'var(--kp-accent)' }} />
            <blockquote
              className="font-display text-3xl sm:text-4xl md:text-5xl italic leading-[1.3] mb-10 text-glow"
              style={{ color: 'var(--kp-text-primary)' }}
            >
              &ldquo;Aku menulis untuk hadir, bukan untuk memukau.&rdquo;
            </blockquote>
            <p
              className="font-body text-lg leading-[1.85] max-w-2xl mx-auto"
              style={{ color: 'var(--kp-text-muted)' }}
            >
              {language === 'en'
                ? "This isn't about fame or recognition. It's about staying sane in a world that keeps moving. Every word is an anchor against drifting with time."
                : 'Ini bukan tentang menjadi terkenal atau diakui. Ini tentang menjaga kewarasan diri di tengah dunia yang terus bergerak. Setiap kata adalah jangkar yang menahan agar tidak hanyut dalam arus waktu.'}
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════
            CONTACT
        ═══════════════════════════════ */}
        <section className="px-6 lg:px-12 py-20 sm:py-28">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl mb-12 text-center" style={{ color: 'var(--kp-text-primary)' }}>
              {language === 'en' ? 'Get in touch' : 'Terhubung'}
            </h2>

            <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x" style={{ borderColor: 'var(--kp-border-medium)' }}>
              {[
                {
                  icon: <Mail size={18} />,
                  title: 'Email',
                  desc: 'wildanferdiansyah06@gmail.com',
                  href: 'mailto:wildanferdiansyah06@gmail.com',
                  external: false,
                },
                {
                  icon: <MessageCircle size={18} />,
                  title: 'WhatsApp',
                  desc: '089636357091',
                  href: 'https://wa.me/6289636357091',
                  external: true,
                },
                {
                  icon: <ExternalLink size={18} />,
                  title: 'Website',
                  desc: 'kelaspekerja.site',
                  href: 'https://kelaspekerja.site',
                  external: true,
                },
              ].map((contact) => (
                <a
                  key={contact.title}
                  href={contact.href}
                  target={contact.external ? '_blank' : undefined}
                  rel={contact.external ? 'noopener noreferrer' : undefined}
                  className="group flex flex-col items-center text-center gap-3 py-8 sm:py-4 px-6 transition-colors duration-300"
                >
                  <span className="transition-colors duration-300" style={{ color: 'var(--kp-accent)' }}>
                    {contact.icon}
                  </span>
                  <span className="font-ui text-sm font-medium" style={{ color: 'var(--kp-text-primary)' }}>
                    {contact.title}
                  </span>
                  <span
                    className="font-ui text-sm break-all transition-colors duration-300 group-hover:text-[var(--kp-text-primary)]"
                    style={{ color: 'var(--kp-text-muted)' }}
                  >
                    {contact.desc}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
