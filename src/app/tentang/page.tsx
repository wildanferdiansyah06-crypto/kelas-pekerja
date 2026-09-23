'use client';

export const dynamic = 'force-dynamic';

import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin, ExternalLink, Github, Instagram, MessageCircle, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/src/contexts/LanguageContext';
import BookCover from '@/src/components/BookCover';

export default function TentangPage() {
  const { language } = useLanguage();

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

  const projects = [
    {
      title: 'Kelas Pekerja Digital Platform',
      role: language === 'en' ? 'Full-stack Developer & Creator' : 'Full-stack Developer & Kreator',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
      desc: language === 'en'
        ? 'Developed an independent platform for digital publishing. Integrated AI tools for content creation and self-published multiple e-books.'
        : 'Membangun platform mandiri untuk publikasi digital. Mengintegrasikan AI untuk pembuatan konten dan mempublikasikan e-book secara independen.',
      stack: ['Next.js', 'React', 'AI Tools', 'TypeScript'],
      link: 'https://kelaspekerja.site',
    },
    {
      title: 'Hidden Bens Roastery',
      role: language === 'en' ? 'Founder & Operations' : 'Founder & Operasional',
      image: 'https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?q=80&w=800&auto=format&fit=crop',
      desc: language === 'en'
        ? 'Built a coffee roastery from the ground up, managing supply chain, business operations, and navigating natural disaster crises.'
        : 'Membangun bisnis roastery kopi dari nol, mengelola rantai pasok, operasional, dan menavigasi krisis saat bencana alam.',
      stack: ['Supply Chain', 'Crisis Management', 'Business Ops'],
    },
    {
      title: 'Independent Construction',
      role: language === 'en' ? 'Project Manager' : 'Manajer Proyek',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop',
      desc: language === 'en'
        ? 'Managed end-to-end planning and execution of villa and public facility constructions in collaboration with local government.'
        : 'Mengelola perencanaan dan eksekusi pembangunan villa serta fasilitas umum bekerja sama dengan pemerintah daerah.',
      stack: ['Project Planning', 'Logistics', 'Gov Coordination'],
    },
    {
      title: 'OPPO Campus Event',
      role: language === 'en' ? 'Event PIC & Coordinator' : 'PIC & Koordinator Event',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop',
      desc: language === 'en'
        ? 'Led and coordinated major "Goes to Campus" promotional events, handling bureaucracy and cross-team negotiation.'
        : 'Memimpin dan mengoordinasikan acara promosi skala kampus, menangani birokrasi internal maupun eksternal.',
      stack: ['Event Management', 'Negotiation', 'Leadership'],
    },
    {
      title: 'Hidden Space Ubud Caffe',
      role: language === 'en' ? 'Head Bar & Back Up Management' : 'Head Bar & Back Up Manajemen',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop',
      desc: language === 'en'
        ? 'Supported strategic decisions, managed team scheduling, and maintained operational smoothness during high volume hours.'
        : 'Mendukung operasional harian, mengatur shift tim, dan menjaga kelancaran kafe saat jam-jam bervolume pelanggan tinggi.',
      stack: ['Operations', 'Team Leadership', 'Customer Service'],
    },
    {
      title: 'Swardana Art Mural',
      role: language === 'en' ? 'Muralist' : 'Muralis',
      image: '/images/mural-dummy.jpg',
      desc: language === 'en'
        ? 'Executed visual mural art projects, honing aesthetic creativity foundational for digital content creation.'
        : 'Mengerjakan proyek seni visual mural untuk mengasah kreativitas estetika yang fundamental dalam content creation.',
      stack: ['Visual Art', 'Aesthetic Design', 'Creativity'],
    }
  ];

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
            HERO — Creative & Tech Portfolio Intro
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
                    src="/images/wildan.jpg"
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
                  className="font-ui text-sm tracking-[0.06em] mb-4 animate-fade-in-up delay-100 uppercase font-medium"
                  style={{ color: 'var(--kp-accent)' }}
                >
                  {language === 'en' ? 'Creator, Manager & Developer' : 'Kreator, Manajer & Developer'}
                </p>
                <h1
                  className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.12] mb-7 animate-fade-in-up delay-200"
                  style={{ color: 'var(--kp-text-primary)' }}
                >
                  Wildan Ferdiansyah Muchtar
                </h1>
                <p
                  className="font-body text-lg leading-[1.85] max-w-xl mx-auto md:mx-0 mb-7 animate-fade-in-up delay-300"
                  style={{ color: 'var(--kp-text-secondary)' }}
                >
                  {language === 'en'
                    ? 'Building platforms, managing operations, and brewing ideas. A highly adaptable individual blending a strong track record in operational management with advanced tech-literacy (Linux, Web Dev, AI).'
                    : 'Membangun platform, mengelola operasional, dan meramu ide. Individu adaptif yang memadukan rekam jejak kuat dalam manajemen dengan penguasaan teknologi tingkat lanjut (Linux, Web Dev, AI).'}
                </p>
                <div
                  className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 font-ui text-sm animate-fade-in-up delay-300"
                  style={{ color: 'var(--kp-text-muted)' }}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={13} style={{ color: 'var(--kp-accent)' }} /> Jakarta
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
            SELECTED WORKS / PORTFOLIO GRID
        ═══════════════════════════════ */}
        <section className="px-6 lg:px-12 py-16 sm:py-24" style={{ backgroundColor: 'var(--kp-bg-surface)' }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl mb-4" style={{ color: 'var(--kp-text-primary)' }}>
                  {language === 'en' ? 'Selected Works' : 'Proyek Pilihan'}
                </h2>
                <p className="font-body text-lg max-w-xl" style={{ color: 'var(--kp-text-secondary)' }}>
                  {language === 'en' 
                    ? 'A showcase of my recent projects, blending technology, business management, and creative direction.'
                    : 'Kumpulan proyek terbaru yang memadukan teknologi, manajemen bisnis, dan eksekusi kreatif.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {projects.map((proj, i) => (
                <div 
                  key={i} 
                  className="group flex flex-col rounded-xl overflow-hidden border transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(212,165,116,0.15)] hover:border-[rgba(212,165,116,0.5)]"
                  style={{ borderColor: 'var(--kp-border-medium)', backgroundColor: 'var(--kp-bg-base)' }}
                >
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                    <Image 
                      src={proj.image}
                      alt={proj.title}
                      fill
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />
                  </div>
                  
                  <div className="p-6 sm:p-8 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-display text-xl sm:text-2xl" style={{ color: 'var(--kp-text-primary)' }}>
                        {proj.title}
                      </h3>
                      {proj.link && (
                        <a 
                          href={proj.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 rounded-full border transition-colors duration-300 hover:bg-[rgba(212,165,116,0.1)]"
                          style={{ borderColor: 'var(--kp-border-medium)', color: 'var(--kp-text-primary)' }}
                          aria-label={`Visit ${proj.title}`}
                        >
                          <ArrowUpRight size={16} />
                        </a>
                      )}
                    </div>
                    
                    <p className="font-ui text-sm font-semibold mb-4" style={{ color: 'var(--kp-accent)' }}>
                      {proj.role}
                    </p>
                    
                    <p className="font-body text-[15px] leading-relaxed flex-grow mb-6" style={{ color: 'var(--kp-text-secondary)' }}>
                      {proj.desc}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t" style={{ borderColor: 'var(--kp-border-subtle)' }}>
                      {proj.stack.map(s => (
                        <span 
                          key={s} 
                          className="px-2.5 py-1 text-[11px] font-ui tracking-wide uppercase rounded bg-[rgba(212,165,116,0.05)] border"
                          style={{ color: 'var(--kp-text-muted)', borderColor: 'var(--kp-border-medium)' }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            SKILLS MARQUEE / BADGES
        ═══════════════════════════════ */}
        <section className="px-6 lg:px-12 py-12 sm:py-16 border-y" style={{ borderColor: 'var(--kp-border-medium)', backgroundColor: 'var(--kp-bg-base)' }}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <div className="flex-shrink-0">
              <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: 'var(--kp-text-muted)' }}>
                {language === 'en' ? 'Core Arsenal' : 'Keahlian Utama'}
              </span>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {[
                'Arch Linux & NixOS', 'Web Development', 'AI Integration', 
                'Operational Planning', 'Crisis Management', 'Team Leadership', 'Project Execution'
              ].map(skill => (
                <span 
                  key={skill}
                  className="px-4 py-2 rounded-full font-ui text-xs sm:text-sm border transition-colors duration-300 hover:border-[rgba(212,165,116,0.5)]"
                  style={{ color: 'var(--kp-text-secondary)', borderColor: 'var(--kp-border-medium)' }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            BOOKS — Kept for consistency
        ═══════════════════════════════ */}
        <section className="px-6 lg:px-12 py-20 sm:py-28">
          <div className="max-w-6xl mx-auto">
            <div className="kat-head" style={{ marginBottom: '32px' }}>
              <div>
                <h2 className="h2">{language === 'en' ? 'Books & Writings' : 'Koleksi Karya'}</h2>
                <p className="lead">
                  {language === 'en' 
                    ? 'Apart from professional projects, I publish digital books about life and reflection.' 
                    : 'Selain pekerjaan profesional, saya juga mempublikasikan buku digital seputar kehidupan.'}
                </p>
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
            CONTACT
        ═══════════════════════════════ */}
        <section className="px-6 lg:px-12 pb-20 sm:pb-28">
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
