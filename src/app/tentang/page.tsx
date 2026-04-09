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



  const darkMode = globalTheme === 'dark';  

  const theme = darkMode ? {

    bg: 'bg-[#0f0d0c]',

    text: 'text-[#e5e0db]',

    textMuted: 'text-[#8b7d6b]',

    textHeading: 'text-[#f0ebe5]',

    border: 'border-[#2a2520]',

    accent: 'text-[#c9a66b]',

    accentBg: 'bg-[#1a1612]',

    accentBorder: 'border-[#3d3428]',

    card: 'bg-[#1a1612]/80',

    highlight: 'bg-[#2a2420]/50',

    gradientFrom: 'from-[#2a2420]/30',

    gradientTo: 'to-[#0f0d0c]/10',

  } : {

    bg: 'bg-gradient-to-br from-[#2c1810] via-[#3d2817] to-[#1a0e08]',

    text: 'text-[#d4a574]',

    textMuted: 'text-[#8b7355]',

    textHeading: 'text-[#f4e4d4]',

    border: 'border-[#8b4513]/30',

    accent: 'text-[#d4a574]',

    accentBg: 'bg-[#3d2817]/60 backdrop-blur-sm',

    accentBorder: 'border-[#8b4513]/30',

    card: 'bg-[#3d2817]/60 backdrop-blur-sm',

    highlight: 'bg-[#8b4513]/20',

    gradientFrom: 'from-[#3d2817]/20',

    gradientTo: 'to-[#2c1810]/20',

  };



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

    <div className={`${theme.bg} ${theme.text} transition-colors duration-500`}>

      {/* Background */}

      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">

        <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradientFrom} ${theme.gradientTo} opacity-40`} />

      </div>



      {/* Main Content */}

      <main className="relative z-10">

        {/* Hero Section - Desktop: Photo Left, Text Right / Mobile: Stacked Center */}

        <section className={`relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 ${theme.border} border-b`}>

          <div className="max-w-6xl mx-auto">

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">

              

              {/* Left Side - Profile Photo (Center on mobile, Left on desktop) */}
              <div className="flex flex-col items-center md:items-center lg:items-center">
                <div className="relative">

                  {/* Circular Photo Container - Force perfect circle */}
                  <div className={`relative w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-52 lg:h-52 rounded-full overflow-hidden ${theme.accentBorder} border-4 shadow-2xl`} 
                       style={{aspectRatio: '1/1', objectFit: 'cover'}}>
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
                  <div className={`absolute inset-0 rounded-full ${theme.accentBorder} border-2 opacity-50 pointer-events-none`} 
                       style={{boxShadow: `inset 0 0 0 999px ${darkMode ? 'rgba(201, 166, 107, 0.1)' : 'rgba(139, 69, 19, 0.1)'}`}}></div>
                </div>

                

                {/* Social Links - Below Photo */}

                <div className="flex gap-4 mt-8">

                  <a 

                    href="https://github.com/wildanferdiansyah06-crypto" 

                    target="_blank"

                    rel="noopener noreferrer"

                    className={`p-3 rounded-full ${theme.accentBg} backdrop-blur-sm ${theme.accentBorder} border hover:${theme.card} transition-all duration-300 hover:scale-110 shadow-md`}

                    aria-label="GitHub"

                  >

                    <Github size={22} className={theme.accent} />

                  </a>

                  <a 

                    href="https://instagram.com/_iamwildan_" 

                    target="_blank"

                    rel="noopener noreferrer"

                    className={`p-3 rounded-full ${theme.accentBg} backdrop-blur-sm ${theme.accentBorder} border hover:${theme.card} transition-all duration-300 hover:scale-110 shadow-md`}

                    aria-label="Instagram"

                  >

                    <Instagram size={22} className={theme.accent} />

                  </a>

                  <a 

                    href="https://wa.me/6289636357091"

                    target="_blank"

                    rel="noopener noreferrer"

                    className={`p-3 rounded-full ${theme.accentBg} backdrop-blur-sm ${theme.accentBorder} border hover:${theme.card} transition-all duration-300 hover:scale-110 shadow-md`}

                    aria-label="WhatsApp"

                  >

                    <MessageCircle size={22} className={theme.accent} />

                  </a>

                </div>

              </div>



              {/* Right Side - Profile Info (Center on mobile, Left on desktop) */}

              <div className="text-center md:text-left lg:text-center">

                <h1 className={`text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold ${theme.textHeading} mb-4 font-serif leading-tight`}>

                  Wildan Ferdiansyah

                </h1>

                

                <p className={`text-lg sm:text-xl md:text-xl lg:text-2xl ${theme.textMuted} mb-5 font-serif italic`}>

                  Bukan Penulis, Bukan Motivator

                </p>



                <p className={`text-sm sm:text-base md:text-base lg:text-lg leading-relaxed ${theme.textMuted} mb-6 max-w-lg mx-auto lg:mx-0`}>

                  Seseorang yang mencoba memahami hidupnya melalui kata kata. Pernah menjadi barista, pernah menjadi muralis, sekarang menulis dan develop web di sela-sela waktu - bukan untuk menjadi terkenal, tetapi untuk tetap waras.

                </p>



                {/* Location & Email */}

                <div className="flex flex-wrap gap-3 justify-center md:justify-start lg:justify-center">

                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${theme.accentBg} backdrop-blur-sm ${theme.accentBorder} border`}>

                    <MapPin size={16} className={theme.accent} />

                    <span className={`font-medium ${theme.text} text-sm sm:text-base`}>Bali, Ubud</span>

                  </div>

                  <a 

                    href="mailto:wildanferdiansyah06@gmail.com"

                    className={`flex items-center gap-2 px-4 py-2 rounded-full ${theme.accentBg} backdrop-blur-sm ${theme.accentBorder} border hover:${theme.card} transition-colors`}

                  >

                    <Mail size={16} className={theme.accent} />

                    <span className={`${theme.text} text-sm sm:text-base`}>wildanferdiansyah06@gmail.com</span>

                  </a>

                </div>

              </div>

            </div>

          </div>

        </section>



        {/* Developer Section */}

        <section className={`px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 ${theme.border} border-b`}>

          <div className="max-w-6xl mx-auto">

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">

              {/* Web Developer */}

              <div className={`${theme.card} ${theme.border} border rounded-xl p-6 sm:p-8`}>

                <div className="flex items-center gap-3 mb-4 sm:mb-6">

                  <Code size={22} className={theme.accent} />

                  <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold ${theme.textHeading} font-serif`}>

                    Web Developer

                  </h2>

                </div>

                

                <p className={`${theme.text} text-sm sm:text-base leading-relaxed mb-4 sm:mb-6`}>

                  Pengembang web independent yang fokus pada menciptakan platform untuk karya sastra dan konten digital. Spesialisasi dalam membangun platform yang bermakna.

                </p>



                <div className="space-y-4">

                  <div>

                    <h3 className={`font-semibold ${theme.textHeading} mb-2 text-sm sm:text-base`}>Tech Stack</h3>

                    <div className="flex flex-wrap gap-2">

                      {['Java', 'Python', 'JavaScript', 'React', 'Next.js', 'TypeScript'].map((tech) => (

                        <span key={tech} className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs sm:text-sm ${theme.accentBg} ${theme.accent} ${theme.accentBorder} border`}>

                          {tech}

                        </span>

                      ))}

                    </div>

                  </div>

                  

                  <div>

                    <h3 className={`font-semibold ${theme.textHeading} mb-2 text-sm sm:text-base`}>Portfolio</h3>

                    <a 

                      href="https://kelaspekerja.site" 

                      target="_blank"

                      rel="noopener noreferrer"

                      className={`inline-flex items-center gap-2 ${theme.accent} hover:underline text-sm sm:text-base`}

                    >

                      <ExternalLink size={14} className="sm:w-4 sm:h-4" />

                      kelaspekerja.site

                    </a>

                  </div>

                </div>

              </div>



              {/* Writer */}

              <div className={`${theme.card} ${theme.border} border rounded-xl p-6 sm:p-8`}>

                <div className="flex items-center gap-3 mb-4 sm:mb-6">

                  <Book size={22} className={theme.accent} />

                  <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold ${theme.textHeading} font-serif`}>

                    Penulis

                  </h2>

                </div>

                

                <p className={`${theme.text} text-sm sm:text-base leading-relaxed mb-4 sm:mb-6`}>

                  Menulis sebagai cara untuk memahami hidup dan menjaga kewarasan. Setiap kata adalah upaya untuk tetap hadir di dunia yang terus berubah.

                </p>



                <div className={`${theme.accentBg} ${theme.accentBorder} border rounded-lg p-4 sm:p-6`}>

                  <div className="flex items-center gap-3 mb-3 sm:mb-4">

                    <Coffee size={18} className={theme.accent} />

                    <h3 className={`font-semibold ${theme.textHeading} text-sm sm:text-base`}>Proses Menulis</h3>

                  </div>

                  <p className={`${theme.textMuted} leading-relaxed text-xs sm:text-sm`}>

                    Menulis sambil menunggu senja dan minum kopi sampai fajar terbit. Setiap kata lahir dari keheningan malam dan aroma kopi yang menemani.

                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>



        {/* Books Section */}

        <section className={`px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 ${theme.border} border-b`}>

          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-8 sm:mb-12">

              <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${theme.textHeading} mb-3 sm:mb-4 font-serif`}>

                Karya

              </h2>

              <p className={`${theme.textMuted} text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2 sm:px-4`}>

                Enam buku yang lahir dari proses mencari makna dalam setiap halaman

              </p>

            </div>



            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">

              {books.map((book, index) => (

                <Link

                  key={index}

                  href={book.link}

                  className={`group block ${theme.card} ${theme.border} border rounded-xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:${theme.accentBg}`}

                >

                  <div className="flex justify-between items-start mb-3 sm:mb-4">

                    <span className={`text-xs sm:text-sm font-bold tracking-wider ${theme.accent} uppercase`}>

                      {book.genre}

                    </span>

                    <span className={`text-xs sm:text-sm ${theme.textMuted}`}>

                      {book.year}

                    </span>

                  </div>

                  

                  <h3 className={`text-lg sm:text-xl font-bold ${theme.textHeading} mb-2 font-serif group-hover:${theme.accent} transition-colors`}>

                    {book.title}

                  </h3>

                  

                  <p className={`${theme.textMuted} text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2`}>

                    {book.subtitle}

                  </p>

                  

                  <div className={`flex items-center gap-2 ${theme.accent} text-xs sm:text-sm font-medium`}>

                    <span>Baca</span>

                    <ExternalLink size={12} className="sm:w-3.5 sm:h-3.5" />

                  </div>

                </Link>

              ))}

            </div>

          </div>

        </section>



        {/* Philosophy Section */}

        <section className={`px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 ${theme.border} border-b`}>

          <div className="max-w-4xl mx-auto text-center px-2 sm:px-4">

            <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full ${theme.accentBg} ${theme.accentBorder} border mb-6 sm:mb-8`}>

              <Coffee size={20} className={theme.accent} />

            </div>

            

            <blockquote className={`${theme.textHeading} text-xl sm:text-2xl md:text-3xl font-serif italic leading-relaxed mb-6 sm:mb-8 px-2 sm:px-4`}>

              "Aku menulis untuk hadir, bukan untuk memukau."

            </blockquote>

            

            <p className={`${theme.textMuted} text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto px-2 sm:px-4`}>

              Ini bukan tentang menjadi terkenal atau diakui. Ini tentang menjaga kewarasan diri di tengah dunia yang terus bergerak. Setiap kata adalah jangkar yang menahan agar tidak hanyut dalam arus waktu.

            </p>

          </div>

        </section>



        {/* Contact Section */}

        <section className={`px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 ${theme.border} border-b`}>

          <div className="max-w-4xl mx-auto text-center">

            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${theme.textHeading} mb-6 sm:mb-8 font-serif`}>

              Terhubung

            </h2>

            

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">

              <a 

                href="mailto:wildanferdiansyah06@gmail.com"

                className={`group ${theme.card} ${theme.border} border rounded-xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:${theme.accentBg}`}

              >

                <Mail size={24} className={`${theme.accent} mx-auto mb-3 sm:mb-4`} />

                <h3 className={`text-lg sm:text-xl font-semibold ${theme.textHeading} mb-2`}>

                  Email

                </h3>

                <p className={`${theme.textMuted} text-xs sm:text-sm group-hover:${theme.text} transition-colors break-all`}>

                  wildanferdiansyah06@gmail.com

                </p>

              </a>

              

              <a 

                href="https://wa.me/6289636357091"

                target="_blank"

                rel="noopener noreferrer"

                className={`group ${theme.card} ${theme.border} border rounded-xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:${theme.accentBg}`}

              >

                <MessageCircle size={24} className={`${theme.accent} mx-auto mb-3 sm:mb-4`} />

                <h3 className={`text-lg sm:text-xl font-semibold ${theme.textHeading} mb-2`}>

                  WhatsApp

                </h3>

                <p className={`${theme.textMuted} text-xs sm:text-sm group-hover:${theme.text} transition-colors`}>

                  089636357091

                </p>

              </a>

              

              <a 

                href="https://kelaspekerja.site"

                target="_blank"

                rel="noopener noreferrer"

                className={`group ${theme.card} ${theme.border} border rounded-xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:${theme.accentBg} sm:col-span-2 lg:col-span-1`}

              >

                <ExternalLink size={24} className={`${theme.accent} mx-auto mb-3 sm:mb-4`} />

                <h3 className={`text-lg sm:text-xl font-semibold ${theme.textHeading} mb-2`}>

                  Website

                </h3>

                <p className={`${theme.textMuted} text-xs sm:text-sm group-hover:${theme.text} transition-colors`}>

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

