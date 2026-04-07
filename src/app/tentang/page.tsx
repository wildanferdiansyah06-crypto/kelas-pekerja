'use client';

import { useState, useEffect } from 'react';
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
    bg: 'bg-[#f5f0e8]',
    text: 'text-[#2c241b]',
    textMuted: 'text-[#6b5d4d]',
    textHeading: 'text-[#1a1612]',
    border: 'border-[#d4cfc4]',
    accent: 'text-[#8b4513]',
    accentBg: 'bg-[#ebe5d8]',
    accentBorder: 'border-[#c4b8a3]',
    card: 'bg-[#ebe5d8]/80',
    highlight: 'bg-[#d9d0c1]/50',
    gradientFrom: 'from-[#d9d0c1]/40',
    gradientTo: 'to-[#f5f0e8]/20',
  };

  const books = [
    {
      title: "Cahaya Itu",
      subtitle: "Sebuah Pengakuan tentang yang Terbakar hingga Padam",
      year: "2024",
      genre: "Filsafat",
      link: "/buku/cahaya-itu"
    },
    {
      title: "Kami Menulis Pelan",
      subtitle: "Tentang Menjadi Terlalu Baik",
      year: "2024", 
      genre: "Fiksi",
      link: "/buku/kami-menulis-pelan"
    },
    {
      title: "Soal Kopi",
      subtitle: "Akademis Tentang Kehidupan Barista",
      year: "2023",
      genre: "Akademis",
      link: "/buku/soal-kopi"
    },
    {
      title: "Malam Pertama",
      subtitle: "Tentang Ketakutan dan Harapan",
      year: "2023",
      genre: "Puisi",
      link: "/buku/malam-pertama"
    },
    {
      title: "Ruang Kosong",
      subtitle: "Mencari Makna di Antara Baris Kode",
      year: "2022",
      genre: "Refleksi",
      link: "/buku/ruang-kosong"
    },
    {
      title: "Dua Puluh Lima",
      subtitle: "Tentang Usia dan Pertanyaan",
      year: "2022",
      genre: "Fiksi",
      link: "/buku/dua-puluh-lima"
    }
  ];

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-500`}>
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradientFrom} ${theme.gradientTo} opacity-40`} />
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className={`relative px-6 py-20 md:py-32 ${theme.border} border-b`}>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Profile Image */}
              <div className="relative">
                <div className={`relative rounded-2xl overflow-hidden ${theme.card} border ${theme.border} shadow-2xl`}>
                  <div className="aspect-[3/4] relative">
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2a2420] to-[#0f0d0c]">
                      <svg 
                        width="200" 
                        height="267" 
                        viewBox="0 0 400 533" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full max-w-full"
                      >
                        {/* Background */}
                        <rect width="400" height="533" fill="#F5F0E8"/>
                        {/* Wooden bookshelf background */}
                        <rect x="0" y="300" width="400" height="233" fill="#8B4513" opacity="0.1"/>
                        <rect x="50" y="320" width="300" height="180" fill="#8B4513" opacity="0.2"/>
                        <rect x="75" y="340" width="250" height="140" fill="#8B4513" opacity="0.3"/>
                        {/* Books on shelf */}
                        <rect x="80" y="360" width="40" height="100" fill="#D4CFC4" stroke="#A89B8C" strokeWidth="1"/>
                        <rect x="130" y="370" width="35" height="90" fill="#D4CFC4" stroke="#A89B8C" strokeWidth="1"/>
                        <rect x="175" y="350" width="45" height="110" fill="#D4CFC4" stroke="#A89B8C" strokeWidth="1"/>
                        <rect x="230" y="355" width="40" height="105" fill="#D4CFC4" stroke="#A89B8C" strokeWidth="1"/>
                        {/* Typewriter */}
                        <rect x="250" y="420" width="80" height="60" fill="#2C241B" rx="3"/>
                        <rect x="260" y="430" width="60" height="40" fill="#F5F0E8" rx="2"/>
                        <circle cx="290" cy="450" r="2" fill="#8B4513"/>
                        {/* Wall decorations */}
                        <circle cx="50" cy="80" r="15" fill="#E5E0DB" opacity="0.3"/>
                        <circle cx="350" cy="100" r="20" fill="#C9A66B" opacity="0.2"/>
                        <rect x="320" y="60" width="30" height="40" fill="#8B4513" opacity="0.2" rx="2"/>
                        {/* Table */}
                        <ellipse cx="200" cy="280" rx="60" ry="8" fill="#D4CFC4"/>
                        <rect x="140" y="288" width="120" height="4" fill="#A89B8C"/>
                        {/* Coffee cup and saucer */}
                        <ellipse cx="200" cy="270" rx="15" ry="3" fill="#FFFFFF"/>
                        <ellipse cx="200" cy="275" rx="20" ry="4" fill="#FFFFFF" opacity="0.8"/>
                        <path d="M185 265 Q200 260 215 265" fill="#6B5D4D"/>
                        <path d="M185 265 Q200 260 215 265" fill="none" stroke="#4A3F32" strokeWidth="2"/>
                        {/* Book in hand */}
                        <g transform="translate(120, 180)">
                          {/* Book cover */}
                          <rect x="0" y="0" width="60" height="80" fill="#8B4513" rx="2"/>
                          <rect x="5" y="5" width="50" height="70" fill="#D4CFC4" rx="1"/>
                          {/* Book spine */}
                          <rect x="0" y="0" width="8" height="80" fill="#8B4513"/>
                          {/* Book lines */}
                          <line x1="10" y1="15" x2="50" y2="15" stroke="#A89B8C" strokeWidth="1"/>
                          <line x1="10" y1="25" x2="50" y2="25" stroke="#A89B8C" strokeWidth="1"/>
                          <line x1="10" y1="35" x2="50" y2="35" stroke="#A89B8C" strokeWidth="1"/>
                          <line x1="10" y1="45" x2="50" y2="45" stroke="#A89B8C" strokeWidth="1"/>
                          <line x1="10" y1="55" x2="50" y2="55" stroke="#A89B8C" strokeWidth="1"/>
                        </g>
                        {/* Person silhouette */}
                        <g transform="translate(200, 120)">
                          {/* Head */}
                          <circle cx="0" cy="0" r="25" fill="#2C241B"/>
                          {/* Hair */}
                          <path d="M-25 -10 Q-25 -25 -15 -30 Q-5 -35 0 -30 Q5 -25 25 -10 Q25 -5 25 5 Q15 0 0 -10" fill="#1A1612"/>
                          {/* Face */}
                          <circle cx="-8" cy="-5" r="2" fill="#E5E0DB"/>
                          <circle cx="8" cy="-5" r="2" fill="#E5E0DB"/>
                          {/* Mustache */}
                          <path d="M-15 5 Q-10 8 -5 8 Q0 8 5 8 Q10 8 15 5 Q10 2 15 0 Q10 -2 5 0 Q0 -2 -5 0 Q-10 2 -15 0 Q-10 2 -15 5" fill="#1A1612"/>
                          {/* Body */}
                          <rect x="-30" y="25" width="60" height="80" fill="#4A7C59" rx="5"/>
                          {/* Shirt */}
                          <rect x="-30" y="25" width="60" height="40" fill="#5A8A5A" rx="5"/>
                          {/* Arms */}
                          <rect x="-40" y="30" width="15" height="50" fill="#4A7C59" rx="5" transform="rotate(-20 -32.5 55)"/>
                          <rect x="25" y="30" width="15" height="50" fill="#4A7C59" rx="5" transform="rotate(20 32.5 55)"/>
                          {/* Hand holding book */}
                          <rect x="10" y="60" width="40" height="50" fill="#F5E6D9" rx="3" transform="rotate(10 30 85)"/>
                        </g>
                        {/* Decorative elements */}
                        <circle cx="30" cy="200" r="3" fill="#C9A66B" opacity="0.4"/>
                        <circle cx="370" cy="150" r="4" fill="#8B4513" opacity="0.3"/>
                        <rect x="360" y="200" width="25" height="3" fill="#C9A66B" opacity="0.2" rx="1"/>
                      </svg>
                    </div>
                  </div>
                  {/* Decorative overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${darkMode ? 'from-[#0f0d0c]/60' : 'from-[#f5f0e8]/60'} to-transparent`} />
                </div>
              </div>

              {/* Profile Info */}
              <div className="text-center md:text-left">
                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${theme.textHeading} mb-4 font-serif leading-tight`}>
                  Wildan Ferdiansyah
                </h1>
                
                <p className={`text-xl md:text-2xl ${theme.textMuted} mb-6 font-serif italic`}>
                  Bukan Penulis, Bukan Motivator
                </p>

                <p className={`text-lg leading-relaxed ${theme.text} mb-8 max-w-lg`}>
                  Seseorang yang mencoba memahami hidupnya melalui kata kata. Pernah menjadi barista, pernah menjadi muralis, sekarang menulis di sela sela waktu dan develop web di sela sela waktu — bukan untuk menjadi terkenal tetapi untuk tetap waras "aku menulis untuk hadir bukan untuk memukau".
                </p>

                <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-8">
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${theme.accentBg} ${theme.accent} ${theme.accentBorder} border`}>
                    <MapPin size={16} />
                    <span className="text-sm font-medium">Bali, Ubud</span>
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${theme.card} ${theme.border} border`}>
                    <Mail size={16} />
                    <span className="text-sm">wildanferdiansyah06@gmail.com</span>
                  </div>
                </div>

                <div className="flex gap-3 justify-center md:justify-start">
                  <a 
                    href="https://github.com/wildanferdiansyah06-crypto" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full ${theme.card} ${theme.border} border hover:${theme.accentBg} transition-colors duration-300`}
                  >
                    <Github size={20} className={theme.textMuted} />
                  </a>
                  <a 
                    href="https://instagram.com/_iamwildan_" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full ${theme.card} ${theme.border} border hover:${theme.accentBg} transition-colors duration-300`}
                  >
                    <Instagram size={20} className={theme.textMuted} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Developer Section */}
        <section className={`px-6 py-20 ${theme.border} border-b`}>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Code size={24} className={theme.accent} />
                  <h2 className={`text-2xl md:text-3xl font-bold ${theme.textHeading} font-serif`}>
                    Web Developer
                  </h2>
                </div>
                
                <p className={`${theme.text} text-lg leading-relaxed mb-6`}>
                  Pengembang web independent yang fokus pada menciptakan platform untuk karya sastra dan konten digital. Spesialisasi dalam membangun platform yang bermakna.
                </p>

                <div className="space-y-4">
                  <div>
                    <h3 className={`font-semibold ${theme.textHeading} mb-2`}>Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Java', 'Python', 'JavaScript', 'React', 'Next.js', 'TypeScript'].map((tech) => (
                        <span key={tech} className={`px-3 py-1 rounded-lg text-sm ${theme.accentBg} ${theme.accent} ${theme.accentBorder} border`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className={`font-semibold ${theme.textHeading} mb-2`}>Portfolio</h3>
                    <a 
                      href="https://kelaspekerja.site" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 ${theme.accent} hover:underline`}
                    >
                      <ExternalLink size={16} />
                      kelaspekerja.site
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Book size={24} className={theme.accent} />
                  <h2 className={`text-2xl md:text-3xl font-bold ${theme.textHeading} font-serif`}>
                    Penulis
                  </h2>
                </div>
                
                <p className={`${theme.text} text-lg leading-relaxed mb-6`}>
                  Menulis sebagai cara untuk memahami hidup dan menjaga kewarasan. Setiap kata adalah upaya untuk tetap hadir di dunia yang terus berubah.
                </p>

                <div className={`${theme.card} ${theme.border} border rounded-lg p-6`}>
                  <div className="flex items-center gap-3 mb-4">
                    <Coffee size={20} className={theme.accent} />
                    <h3 className={`font-semibold ${theme.textHeading}`}>Proses Menulis</h3>
                  </div>
                  <p className={`${theme.textMuted} leading-relaxed`}>
                    Menulis sambil menunggu senja dan minum kopi sampai fajar terbit. Setiap kata lahir dari keheningan malam dan aroma kopi yang menemani.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Books Section */}
        <section className={`px-6 py-20 ${theme.border} border-b`}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold ${theme.textHeading} mb-4 font-serif`}>
                Karya
              </h2>
              <p className={`${theme.textMuted} text-lg max-w-2xl mx-auto`}>
                Enam buku yang lahir dari proses mencari makna dalam setiap halaman
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.map((book, index) => (
                <Link
                  key={index}
                  href={book.link}
                  className={`group block ${theme.card} ${theme.border} border rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:${theme.accentBg}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-xs font-bold tracking-wider ${theme.accent} uppercase`}>
                      {book.genre}
                    </span>
                    <span className={`text-sm ${theme.textMuted}`}>
                      {book.year}
                    </span>
                  </div>
                  
                  <h3 className={`text-xl font-bold ${theme.textHeading} mb-2 font-serif group-hover:${theme.accent} transition-colors`}>
                    {book.title}
                  </h3>
                  
                  <p className={`${theme.textMuted} text-sm leading-relaxed mb-4`}>
                    {book.subtitle}
                  </p>
                  
                  <div className={`flex items-center gap-2 ${theme.accent} text-sm font-medium`}>
                    <span>Baca</span>
                    <ExternalLink size={14} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className={`px-6 py-20 ${theme.border} border-b`}>
          <div className="max-w-4xl mx-auto text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${theme.accentBg} ${theme.accentBorder} border mb-8`}>
              <Coffee size={24} className={theme.accent} />
            </div>
            
            <blockquote className={`${theme.textHeading} text-2xl md:text-3xl font-serif italic leading-relaxed mb-8`}>
              "Aku menulis untuk hadir, bukan untuk memukau."
            </blockquote>
            
            <p className={`${theme.textMuted} text-lg leading-relaxed max-w-2xl mx-auto`}>
              Ini bukan tentang menjadi terkenal atau diakui. Ini tentang menjaga kewarasan diri di tengah dunia yang terus bergerak. Setiap kata adalah jangkar yang menahan agar tidak hanyut dalam arus waktu.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className={`px-6 py-20 ${theme.border} border-b`}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-3xl md:text-4xl font-bold ${theme.textHeading} mb-8 font-serif`}>
              Terhubung
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <a 
                href="mailto:wildanferdiansyah06@gmail.com"
                className={`group ${theme.card} ${theme.border} border rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:${theme.accentBg}`}
              >
                <Mail size={32} className={`${theme.accent} mx-auto mb-4`} />
                <h3 className={`text-xl font-semibold ${theme.textHeading} mb-2`}>
                  Email
                </h3>
                <p className={`${theme.textMuted} group-hover:${theme.text} transition-colors`}>
                  wildanferdiansyah06@gmail.com
                </p>
              </a>
              
              <a 
                href="https://wa.me/6289636357091"
                target="_blank"
                rel="noopener noreferrer"
                className={`group ${theme.card} ${theme.border} border rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:${theme.accentBg}`}
              >
                <div className={`${theme.accent} mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center`}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.09-.632-.277-.876-.483-.243-.565-.424-.946-.379-.783-.325-1.213-.589-1.705-.298-1.936-.834-1.232-2.368-1.724-3.489-.462-1.157-1.011-2.391-.575-1.341-1.233-2.98-1.913-4.659-1.654-1.593-2.435-1.255-2.448-1.925-2.478-2.335-3.13-2.98-3.493-3.658-1.331-1.594-2.823-2.329-3.179-2.212-4.226-2.09-3.62-.957-1.698-1.61-2.378-1.305-2.65-1.953-.426-.752-1.679-1.492-2.209-1.233-2.389-1.85-3.179-1.991-2.798-2.299-3.75-1.983-4.443-1.722-4.238-2.615-4.5-3.063-4.665-3.522-4.925-4.842-5.5-4.9-6.3-5.6-6.6-8.8-3.6-3.8-4.6-5.2-6.7-6.5-8.5-2.8-2.8-5.2-4.2-8.8z"/>
                  </svg>
                </div>
                <h3 className={`text-xl font-semibold ${theme.textHeading} mb-2`}>
                  WhatsApp
                </h3>
                <p className={`${theme.textMuted} group-hover:${theme.text} transition-colors`}>
                  089636357091
                </p>
              </a>
              
              <a 
                href="https://kelaspekerja.site"
                target="_blank"
                rel="noopener noreferrer"
                className={`group ${theme.card} ${theme.border} border rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:${theme.accentBg}`}
              >
                <ExternalLink size={32} className={`${theme.accent} mx-auto mb-4`} />
                <h3 className={`text-xl font-semibold ${theme.textHeading} mb-2`}>
                  Website
                </h3>
                <p className={`${theme.textMuted} group-hover:${theme.text} transition-colors`}>
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
