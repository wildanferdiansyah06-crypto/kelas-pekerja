'use client';



import { useState, useEffect } from 'react';

import Image from 'next/image';

import Link from 'next/link';

import { Mail, MapPin, Coffee, Code, Book, Clock, ExternalLink, Github, Instagram, User, MessageCircle } from 'lucide-react';

import { useTheme } from "@/src/components/ThemeProvider";



export default function TentangPage() {

  const { theme: globalTheme } = useTheme();

  const [mounted, setMounted] = useState(false);



  useEffect(() => {

    setMounted(true);

  }, []);



  if (!mounted) return null;



  const books = [

    {

      title: "Cahaya Itu",

      subtitle: "Sebuah Pengakuan tentang yang Terbakar hingga Padam",

      year: "2026",

      genre: "Filsafat",

      link: "/buku/cahaya-itu"

    },

    {

      title: "Kami Menulis Pelan",

      subtitle: "Tentang Menjadi Terlalu Baik",

      year: "2026", 

      genre: "Fiksi",

      link: "/buku/kami-menulis-pelan"

    },

    {

      title: "Soal Kopi",

      subtitle: "Akademis Tentang Kehidupan Barista",

      year: "2026",

      genre: "Akademis",

      link: "/buku/soal-kopi"

    },

    {

      title: "Malam Pertama",

      subtitle: "Tentang Ketakutan dan Harapan",

      year: "2026",

      genre: "Puisi",

      link: "/buku/malam-pertama"

    },

    {

      title: "Ruang Kosong",

      subtitle: "Mencari Makna di Antara Baris Kode",

      year: "2026",

      genre: "Refleksi",

      link: "/buku/ruang-kosong"

    },

    {

      title: "Dua Puluh Lima",

      subtitle: "Tentang Usia dan Pertanyaan",

      year: "2026",

      genre: "Fiksi",

      link: "/buku/dua-puluh-lima"

    }

  ];



  return (

    <div className="transition-colors duration-500" style={{ backgroundColor: 'var(--kp-bg-base)', color: 'var(--kp-text-primary)' }}>

      {/* Background */}

      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">

        <div className="absolute inset-0 opacity-40" style={{ background: 'linear-gradient(to bottom right, var(--kp-bg-surface), transparent)' }} />

      </div>



      {/* Main Content */}

      <main className="relative z-10">

        {/* Hero Section - Desktop: Photo Left, Text Right / Mobile: Stacked Center */}

        <section className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 border-b" style={{ borderColor: 'var(--kp-border)' }}>

          <div className="max-w-6xl mx-auto">

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">



              {/* Left Side - Profile Photo (Center on mobile, Left on desktop) */}
              <div className="flex flex-col items-center md:items-center lg:items-center">
                <div className="relative">

                  {/* Circular Photo Container - Force perfect circle */}
                  <div className="relative w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-52 lg:h-52 rounded-full overflow-hidden border-4 shadow-2xl"
                       style={{ borderColor: 'var(--kp-border)', aspectRatio: '1/1', objectFit: 'cover' }}>
                    <Image
                      src="/images/wildan.png"
                      alt="Wildan Ferdiansyah"
                      fill
                      className="object-cover rounded-full"
                      priority
                      sizes="(max-width: 640px) 160px, (max-width: 768px) 176px, (max-width: 1024px) 192px, 208px"
                      style={{objectFit: 'cover'}}
                    />
                  </div>
                  {/* Decorative ring - Perfect Circle */}
                  <div className="absolute inset-0 rounded-full border-2 opacity-50 pointer-events-none"
                       style={{ borderColor: 'var(--kp-border)', boxShadow: 'inset 0 0 0 999px rgba(124,92,58,0.1)' }}></div>
                </div>



                {/* Social Links - Below Photo */}

                <div className="flex gap-4 mt-8">

                  <a
                    href="https://github.com/wildanferdiansyah06-crypto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full backdrop-blur-sm border transition-all duration-300 hover:scale-110 shadow-md"
                    style={{
                      backgroundColor: 'var(--kp-bg-surface)',
                      borderColor: 'var(--kp-border)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--kp-bg-base)';
                      e.currentTarget.style.borderColor = 'var(--kp-accent)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--kp-bg-surface)';
                      e.currentTarget.style.borderColor = 'var(--kp-border)';
                    }}
                    aria-label="GitHub"
                  >
                    <Github size={22} style={{ color: 'var(--kp-accent)' }} />
                  </a>

                  <a
                    href="https://instagram.com/_iamwildan_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full backdrop-blur-sm border transition-all duration-300 hover:scale-110 shadow-md"
                    style={{
                      backgroundColor: 'var(--kp-bg-surface)',
                      borderColor: 'var(--kp-border)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--kp-bg-base)';
                      e.currentTarget.style.borderColor = 'var(--kp-accent)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--kp-bg-surface)';
                      e.currentTarget.style.borderColor = 'var(--kp-border)';
                    }}
                    aria-label="Instagram"
                  >
                    <Instagram size={22} style={{ color: 'var(--kp-accent)' }} />
                  </a>

                  <a
                    href="https://wa.me/6289636357091"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full backdrop-blur-sm border transition-all duration-300 hover:scale-110 shadow-md"
                    style={{
                      backgroundColor: 'var(--kp-bg-surface)',
                      borderColor: 'var(--kp-border)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--kp-bg-base)';
                      e.currentTarget.style.borderColor = 'var(--kp-accent)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--kp-bg-surface)';
                      e.currentTarget.style.borderColor = 'var(--kp-border)';
                    }}
                    aria-label="WhatsApp"
                  >
                    <MessageCircle size={22} style={{ color: 'var(--kp-accent)' }} />
                  </a>

                </div>

              </div>



              {/* Right Side - Profile Info (Center on mobile, Left on desktop) */}

              <div className="text-center md:text-left lg:text-center">

                <h1 className="font-display text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight" style={{ color: 'var(--kp-text-primary)' }}>
                  Wildan Ferdiansyah
                </h1>



                <p className="font-body text-lg sm:text-xl md:text-xl lg:text-2xl mb-5 italic" style={{ color: 'var(--kp-text-muted)' }}>
                  Bukan Penulis, Bukan Motivator
                </p>



                <p className="font-body text-sm sm:text-base md:text-base lg:text-lg leading-relaxed mb-6 max-w-lg mx-auto lg:mx-0" style={{ color: 'var(--kp-text-secondary)' }}>
                  Seseorang yang mencoba memahami hidupnya melalui kata kata. Pernah menjadi barista, pernah menjadi muralis, sekarang menulis dan develop web di sela-sela waktu - bukan untuk menjadi terkenal, tetapi untuk tetap waras.
                </p>



                {/* Location & Email */}

                <div className="flex flex-wrap gap-3 justify-center md:justify-start lg:justify-center">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border"
                       style={{ backgroundColor: 'var(--kp-bg-surface)', borderColor: 'var(--kp-border)' }}>
                    <MapPin size={16} style={{ color: 'var(--kp-accent)' }} />
                    <span className="font-ui text-sm sm:text-base" style={{ color: 'var(--kp-text-primary)' }}>Bali, Ubud</span>
                  </div>

                  <a
                    href="mailto:wildanferdiansyah06@gmail.com"
                    className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border transition-colors"
                    style={{ backgroundColor: 'var(--kp-bg-surface)', borderColor: 'var(--kp-border)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--kp-bg-base)';
                      e.currentTarget.style.borderColor = 'var(--kp-accent)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--kp-bg-surface)';
                      e.currentTarget.style.borderColor = 'var(--kp-border)';
                    }}
                  >
                    <Mail size={16} style={{ color: 'var(--kp-accent)' }} />
                    <span className="font-ui text-sm sm:text-base" style={{ color: 'var(--kp-text-primary)' }}>wildanferdiansyah06@gmail.com</span>
                  </a>

                </div>

              </div>

            </div>

          </div>

        </section>



        {/* Developer Section */}

        <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 border-b" style={{ borderColor: 'var(--kp-border)' }}>

          <div className="max-w-6xl mx-auto">

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">

              {/* Web Developer */}

              <div className="border rounded-xl p-6 sm:p-8"
                   style={{ backgroundColor: 'var(--kp-bg-surface)', borderColor: 'var(--kp-border)' }}>

                <div className="flex items-center gap-3 mb-4 sm:mb-6">

                  <Code size={22} style={{ color: 'var(--kp-accent)' }} />

                  <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: 'var(--kp-text-primary)' }}>

                    Web Developer

                  </h2>

                </div>



                <p className="font-body text-sm sm:text-base leading-relaxed mb-4 sm:mb-6" style={{ color: 'var(--kp-text-secondary)' }}>

                  Pengembang web independent yang fokus pada menciptakan platform untuk karya sastra dan konten digital. Spesialisasi dalam membangun platform yang bermakna.

                </p>



                <div className="space-y-4">

                  <div>

                    <h3 className="font-ui font-semibold mb-2 text-sm sm:text-base" style={{ color: 'var(--kp-text-primary)' }}>Tech Stack</h3>

                    <div className="flex flex-wrap gap-2">

                      {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Sanity', 'Framer Motion'].map((tech) => (

                        <span key={tech} className="font-ui px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm border"
                              style={{ backgroundColor: 'var(--kp-bg-base)', color: 'var(--kp-accent)', borderColor: 'var(--kp-border)' }}>

                          {tech}

                        </span>

                      ))}

                    </div>

                  </div>

                  <div>

                    <h3 className="font-ui font-semibold mb-2 text-sm sm:text-base" style={{ color: 'var(--kp-text-primary)' }}>Tools & Workflow</h3>

                    <div className="flex flex-wrap gap-2">

                      {['Git', 'ESLint', 'Jest', 'Playwright', 'Vercel', 'GitHub Actions'].map((tool) => (

                        <span key={tool} className="font-ui px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm border"
                              style={{ backgroundColor: 'var(--kp-bg-base)', color: 'var(--kp-accent)', borderColor: 'var(--kp-border)' }}>

                          {tool}

                        </span>

                      ))}

                    </div>

                  </div>

                  <div>

                    <h3 className="font-ui font-semibold mb-2 text-sm sm:text-base" style={{ color: 'var(--kp-text-primary)' }}>Portfolio</h3>

                    <a

                      href="https://kelaspekerja.site"

                      target="_blank"

                      rel="noopener noreferrer"

                      className="inline-flex items-center gap-2 font-ui text-sm sm:text-base hover:underline"

                      style={{ color: 'var(--kp-accent)' }}

                    >

                      <ExternalLink size={14} className="sm:w-4 sm:h-4" />

                      kelaspekerja.site

                    </a>

                  </div>

                </div>

              </div>



              {/* Writer */}

              <div className="border rounded-xl p-6 sm:p-8"
                   style={{ backgroundColor: 'var(--kp-bg-surface)', borderColor: 'var(--kp-border)' }}>

                <div className="flex items-center gap-3 mb-4 sm:mb-6">

                  <Book size={22} style={{ color: 'var(--kp-accent)' }} />

                  <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: 'var(--kp-text-primary)' }}>

                    Penulis

                  </h2>

                </div>



                <p className="font-body text-sm sm:text-base leading-relaxed mb-4 sm:mb-6" style={{ color: 'var(--kp-text-secondary)' }}>

                  Menulis sebagai cara untuk memahami hidup dan menjaga kewarasan. Setiap kata adalah upaya untuk tetap hadir di dunia yang terus berubah.

                </p>

                <div className="space-y-4">

                  <div>

                    <h3 className="font-ui font-semibold mb-2 text-sm sm:text-base" style={{ color: 'var(--kp-text-primary)' }}>Genre Karya</h3>

                    <div className="flex flex-wrap gap-2">

                      {['Fiksi', 'Puisi', 'Filsafat', 'Refleksi', 'Akademis'].map((genre) => (

                        <span key={genre} className="font-ui px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm border"
                              style={{ backgroundColor: 'var(--kp-bg-base)', color: 'var(--kp-accent)', borderColor: 'var(--kp-border)' }}>

                          {genre}

                        </span>

                      ))}

                    </div>

                  </div>

                  <div>

                    <h3 className="font-ui font-semibold mb-2 text-sm sm:text-base" style={{ color: 'var(--kp-text-primary)' }}>Tools Menulis</h3>

                    <div className="flex flex-wrap gap-2">

                      {['Notion', 'Obsidian', 'Typora', 'VS Code'].map((tool) => (

                        <span key={tool} className="font-ui px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm border"
                              style={{ backgroundColor: 'var(--kp-bg-base)', color: 'var(--kp-accent)', borderColor: 'var(--kp-border)' }}>

                          {tool}

                        </span>

                      ))}

                    </div>

                  </div>

                  <div className="border rounded-lg p-4 sm:p-6"
                       style={{ backgroundColor: 'var(--kp-bg-base)', borderColor: 'var(--kp-border)' }}>

                    <div className="flex items-center gap-3 mb-3 sm:mb-4">

                      <Coffee size={18} style={{ color: 'var(--kp-accent)' }} />

                      <h3 className="font-ui font-semibold text-sm sm:text-base" style={{ color: 'var(--kp-text-primary)' }}>Proses Menulis</h3>

                    </div>

                    <p className="font-body leading-relaxed text-xs sm:text-sm" style={{ color: 'var(--kp-text-muted)' }}>

                      Menulis sambil menunggu senja dan minum kopi sampai fajar terbit. Setiap kata lahir dari keheningan malam dan aroma kopi yang menemani.

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>



        {/* Books Section */}

        <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 border-b" style={{ borderColor: 'var(--kp-border)' }}>

          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-8 sm:mb-12">

              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4" style={{ color: 'var(--kp-text-primary)' }}>

                Karya

              </h2>

              <p className="font-body text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2 sm:px-4" style={{ color: 'var(--kp-text-muted)' }}>

                Enam buku yang lahir dari proses mencari makna dalam setiap halaman

              </p>

            </div>



            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">

              {books.map((book, index) => (

                <Link

                  key={index}

                  href={book.link}

                  className="group block border rounded-xl p-4 sm:p-6 hover:shadow-xl transition-all duration-200"

                  style={{ backgroundColor: 'var(--kp-bg-surface)', borderColor: 'var(--kp-border)' }}

                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--kp-bg-base)';
                    e.currentTarget.style.borderColor = 'var(--kp-border-medium)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--kp-bg-surface)';
                    e.currentTarget.style.borderColor = 'var(--kp-border)';
                  }}
                >

                  <div className="flex justify-between items-start mb-3 sm:mb-4">

                    <span className="font-ui text-xs sm:text-sm font-bold tracking-widest uppercase" style={{ color: 'var(--kp-accent)' }}>

                      {book.genre}

                    </span>

                    <span className="font-ui text-xs sm:text-sm" style={{ color: 'var(--kp-text-muted)' }}>

                      {book.year}

                    </span>

                  </div>



                  <h3 className="font-display text-lg sm:text-xl font-bold mb-2 group-hover:opacity-70 transition-opacity" style={{ color: 'var(--kp-text-primary)' }}>

                    {book.title}

                  </h3>



                  <p className="font-body text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2" style={{ color: 'var(--kp-text-muted)' }}>

                    {book.subtitle}

                  </p>



                  <div className="flex items-center gap-2 font-ui text-xs sm:text-sm font-medium" style={{ color: 'var(--kp-accent)' }}>

                    <span>Baca</span>

                    <ExternalLink size={12} className="sm:w-3.5 sm:h-3.5" />

                  </div>

                </Link>

              ))}

            </div>

          </div>

        </section>



        {/* Philosophy Section */}

        <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 border-b" style={{ borderColor: 'var(--kp-border)' }}>

          <div className="max-w-4xl mx-auto text-center px-2 sm:px-4">

            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border mb-6 sm:mb-8"
                 style={{ backgroundColor: 'var(--kp-bg-surface)', borderColor: 'var(--kp-border)' }}>

              <Coffee size={20} style={{ color: 'var(--kp-accent)' }} />

            </div>



            <blockquote className="font-display text-xl sm:text-2xl md:text-3xl italic leading-relaxed mb-6 sm:mb-8 px-2 sm:px-4" style={{ color: 'var(--kp-text-primary)' }}>

              "Aku menulis untuk hadir, bukan untuk memukau."

            </blockquote>



            <p className="font-body text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto px-2 sm:px-4" style={{ color: 'var(--kp-text-muted)' }}>

              Ini bukan tentang menjadi terkenal atau diakui. Ini tentang menjaga kewarasan diri di tengah dunia yang terus bergerak. Setiap kata adalah jangkar yang menahan agar tidak hanyut dalam arus waktu.

            </p>

          </div>

        </section>



        {/* Contact Section */}

        <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 border-b" style={{ borderColor: 'var(--kp-border)' }}>

          <div className="max-w-4xl mx-auto text-center">

            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8" style={{ color: 'var(--kp-text-primary)' }}>

              Terhubung

            </h2>



            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">

              <a

                href="mailto:wildanferdiansyah06@gmail.com"

                className="group border rounded-xl p-6 sm:p-8 hover:shadow-xl transition-all duration-200"

                style={{ backgroundColor: 'var(--kp-bg-surface)', borderColor: 'var(--kp-border)' }}

                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--kp-bg-base)';
                  e.currentTarget.style.borderColor = 'var(--kp-border-medium)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--kp-bg-surface)';
                  e.currentTarget.style.borderColor = 'var(--kp-border)';
                }}
              >

                <Mail size={24} className="mx-auto mb-3 sm:mb-4" style={{ color: 'var(--kp-accent)' }} />

                <h3 className="font-ui text-lg sm:text-xl font-semibold mb-2" style={{ color: 'var(--kp-text-primary)' }}>

                  Email

                </h3>

                <p className="font-ui text-xs sm:text-sm group-hover:opacity-100 transition-colors break-all" style={{ color: 'var(--kp-text-muted)', opacity: 0.7 }}>

                  wildanferdiansyah06@gmail.com

                </p>

              </a>



              <a

                href="https://wa.me/6289636357091"

                target="_blank"

                rel="noopener noreferrer"

                className="group border rounded-xl p-6 sm:p-8 hover:shadow-xl transition-all duration-200"

                style={{ backgroundColor: 'var(--kp-bg-surface)', borderColor: 'var(--kp-border)' }}

                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--kp-bg-base)';
                  e.currentTarget.style.borderColor = 'var(--kp-border-medium)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--kp-bg-surface)';
                  e.currentTarget.style.borderColor = 'var(--kp-border)';
                }}
              >

                <MessageCircle size={24} className="mx-auto mb-3 sm:mb-4" style={{ color: 'var(--kp-accent)' }} />

                <h3 className="font-ui text-lg sm:text-xl font-semibold mb-2" style={{ color: 'var(--kp-text-primary)' }}>

                  WhatsApp

                </h3>

                <p className="font-ui text-xs sm:text-sm group-hover:opacity-100 transition-colors" style={{ color: 'var(--kp-text-muted)', opacity: 0.7 }}>

                  089636357091

                </p>

              </a>



              <a

                href="https://kelaspekerja.site"

                target="_blank"

                rel="noopener noreferrer"

                className="group border rounded-xl p-6 sm:p-8 hover:shadow-xl transition-all duration-200 sm:col-span-2 lg:col-span-1"

                style={{ backgroundColor: 'var(--kp-bg-surface)', borderColor: 'var(--kp-border)' }}

                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--kp-bg-base)';
                  e.currentTarget.style.borderColor = 'var(--kp-border-medium)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--kp-bg-surface)';
                  e.currentTarget.style.borderColor = 'var(--kp-border)';
                }}
              >

                <ExternalLink size={24} className="mx-auto mb-3 sm:mb-4" style={{ color: 'var(--kp-accent)' }} />

                <h3 className="font-ui text-lg sm:text-xl font-semibold mb-2" style={{ color: 'var(--kp-text-primary)' }}>

                  Website

                </h3>

                <p className="font-ui text-xs sm:text-sm group-hover:opacity-100 transition-colors" style={{ color: 'var(--kp-text-muted)', opacity: 0.7 }}>

                  kelaspekerja.site

                </p>

              </a>

            </div>

          </div>

        </section>

      </main>

    </div>

  );
}

