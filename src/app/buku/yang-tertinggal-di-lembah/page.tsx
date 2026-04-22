'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Mountain, ChevronRight, X, Compass, Check, Wind, Heart, Quote } from 'lucide-react';
import { useTheme } from "@/src/components/ThemeProvider";

export default function YangTertinggalDiLembahPage() {
  const { theme: globalTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(progress);
      setShowFloatingMenu(scrollTop > 300);
      
      const chapters = document.querySelectorAll('[data-chapter]');
      let currentChapter = 0;
      const newlyCompleted: number[] = [];
      
      chapters.forEach((chapter) => {
        const rect = chapter.getBoundingClientRect();
        const chapterNum = Number(chapter.getAttribute('data-chapter'));
        
        if (rect.top < window.innerHeight * 0.5) {
          newlyCompleted.push(chapterNum);
          currentChapter = chapterNum;
        }
      });
      
      setActiveChapter(currentChapter);
      setCompletedChapters(prev => Array.from(new Set([...prev, ...newlyCompleted])));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  if (!mounted) return null;

  const darkMode = globalTheme === 'dark';

  // TEMA BARU: "Midnight Ink & Aged Parchment"
  // Lebih dalam, earthy, timeless, seperti buku filosofi mahal
  const theme = darkMode ? {
    // Dark mode: Midnight Ink - seperti membaca di ruang perpustakaan gelap dengan lampu warm
    bg: 'bg-[#12100e]', // Warm black, seperti kayu mahoni tua
    text: 'text-[#e8e4df]', // Warm white, seperti kertas tua under low light
    textMuted: 'text-[#8b7e6f]', // Muted bronze/taupe
    textHeading: 'text-[#f5f1ea]', // Cream white untuk heading
    textSubheading: 'text-[#a89b8c]', // Soft tan
    
    border: 'border-[#2a2622]', // Very dark brown border
    accent: 'text-[#c9a86c]', // Muted gold/amber seperti tinta emas tua
    accentBg: 'bg-[#1a1714]', // Slightly lighter warm black
    accentBorder: 'border-[#3d352b]', // Bronze border
    
    sidebar: 'bg-[#0d0b09]', // Almost black warm
    code: 'bg-[#1c1915]',
    highlight: 'bg-[#2a2420]/50', // Warm brown translucent
    card: 'bg-[#1a1714]/80', // Warm dark with transparency
    
    float: 'bg-[#1c1915]/95', // Floating elements
    gradientFrom: 'from-[#2a2420]/30', // Warm brown gradient
    gradientTo: 'to-[#12100e]/10',
    
    // Special accents untuk quotes dan highlights
    quoteBorder: 'border-[#c9a86c]/40',
    quoteBg: 'bg-[#1a1714]/60',
    
    // Roman numerals and decorative
    romanColor: 'text-[#5c4d3c]', // Deep umber
  } : {
    // Light mode: Aged Parchment - seperti buku tua bersejarah
    bg: 'bg-[#f5f1e8]', // True aged paper cream
    text: 'text-[#2c241b]', // Soft black dengan warm undertone
    textMuted: 'text-[#6b5d4d]', // Medium brown
    textHeading: 'text-[#1a1612]', // Deep charcoal brown
    textSubheading: 'text-[#4a3f32]', // Dark taupe
    
    border: 'border-[#d4cfc4]', // Soft gray-brown
    accent: 'text-[#7d5a3c]', // Deep rust/umber
    accentBg: 'bg-[#e8e2d5]', // Darker cream
    accentBorder: 'border-[#c4b8a3]', // Tan border
    
    sidebar: 'bg-[#ebe5d8]', // Slightly darker cream
    code: 'bg-[#e0d9cc]',
    highlight: 'bg-[#d9d0c1]/60', // Warm gray translucent
    card: 'bg-[#ebe5d8]/80',
    
    float: 'bg-[#f5f1e8]/95',
    gradientFrom: 'from-[#d9d0c1]/40',
    gradientTo: 'to-[#f5f1e8]/20',
    
    quoteBorder: 'border-[#7d5a3c]/40',
    quoteBg: 'bg-[#e8e2d5]/60',
    
    romanColor: 'text-[#a89b8c]', // Light taupe
  };

  const chapters = [
    { num: 0, title: "Prolog", subtitle: "Bukit yang Menipu" },
    { num: 1, title: "Bab I", subtitle: "Geografi Jiwa" },
    { num: 2, title: "Bab II", subtitle: "Ontologi Janji" },
    { num: 3, title: "Bab III", subtitle: "Fenomenologi Lemah" },
    { num: 4, title: "Bab IV", subtitle: "Arkeologi Teman" },
    { num: 5, title: "Bab V", subtitle: "Etika dalam Kesetiaan" },
    { num: 6, title: "Bab VI", subtitle: "Topografi Kehilangan" },
    { num: 7, title: "Bab VII", subtitle: "Komunitas sebagai Perlawanan" },
    { num: 8, title: "Bab VIII", subtitle: "Mistika Kegelapan" },
    { num: 9, title: "Bab IX", subtitle: "Genealogi Janji" },
    { num: 10, title: "Bab X", subtitle: "Praktik Kehadiran" },
    { num: 11, title: "Epilog", subtitle: "Bukit yang Terlupakan" },
  ];

  const isChapterCompleted = (num: number) => completedChapters.includes(num);

  const fadeIn = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] } // Smoother, more elegant ease
    }
  };

  return (
    <div className={`${theme.bg} ${theme.text} transition-colors duration-1000 selection:${theme.accent} selection:bg-current w-full`}>
      
      {/* Reading Progress Bar - lebih subtle dan elegant */}
      <div className={`fixed top-0 left-0 right-0 h-[2px] z-50 ${darkMode ? 'bg-[#2a2622]' : 'bg-[#d4cfc4]'}`}>
        <motion.div 
          className={`h-full ${darkMode ? 'bg-[#c9a86c]' : 'bg-[#7d5a3c]'}`}
          style={{ width: `${readingProgress}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
        />
      </div>

      {/* Floating Navigation - lebih minimalis dan "deep" */}
      <AnimatePresence>
        {showFloatingMenu && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { x: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className={`fixed bottom-8 left-8 z-40 flex flex-col gap-3`}
          >
            <motion.button
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              onClick={() => setSidebarOpen(true)}
              className={`flex items-center gap-3 px-6 py-4 rounded-full ${theme.float} backdrop-blur-md border ${theme.border} shadow-xl ${theme.accent} font-serif tracking-wide`}
            >
              <BookOpen size={18} strokeWidth={1.5} />
              <span className="hidden sm:inline font-medium">Daftar Isi</span>
              <div className={`flex items-center gap-2 ml-2 pl-3 border-l ${theme.border}`}>
                <span className={`text-xs font-serif ${theme.textMuted}`}>
                  {String(activeChapter).padStart(2, '0')}/{chapters.length - 1}
                </span>
              </div>
            </motion.button>

            <div className={`flex items-center gap-2 p-2 rounded-full ${theme.float} backdrop-blur-md border ${theme.border} shadow-xl w-fit`}>
              <div className={`w-px h-4 ${darkMode ? 'bg-[#3d352b]' : 'bg-[#c4b8a3]'}`} />
              <motion.a
                href="#prolog"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                className={`p-3 rounded-full ${darkMode ? 'hover:bg-[#2a2622]' : 'hover:bg-[#e0d9cc]'} transition-colors duration-300`}
              >
                <Compass size={18} strokeWidth={1.5} className={theme.textMuted} />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar - lebih seperti "table of contents" buku mahal */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`fixed left-0 top-0 bottom-0 w-full sm:w-[420px] ${theme.sidebar} z-50 overflow-y-auto shadow-2xl`}
            >
              <div className="pt-24 sm:pt-28 p-8 sm:p-10">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full border ${theme.accentBorder} ${theme.accentBg}`}>
                      <Mountain size={22} strokeWidth={1.5} className={theme.accent} />
                    </div>
                    <div>
                      <h2 className={`font-serif font-bold text-xl ${theme.textHeading}`}>Daftar Isi</h2>
                      <p className={`text-sm ${theme.textMuted} font-serif italic`}>Perjalanan Melalui Lembah</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSidebarOpen(false)}
                    className={`p-3 rounded-full ${darkMode ? 'hover:bg-[#2a2622]' : 'hover:bg-[#d4cfc4]'} transition-colors duration-300`}
                  >
                    <X size={22} strokeWidth={1.5} className={theme.textMuted} />
                  </button>
                </div>

                <div className={`mb-8 p-5 rounded-2xl ${theme.card} border ${theme.border}`}>
                  <div className="flex justify-between items-center mb-3">
                    <span className={`text-sm ${theme.textMuted} font-serif`}>Progress Membaca</span>
                    <span className={`text-sm font-serif ${theme.accent}`}>
                      {Math.round((completedChapters.length / chapters.length) * 100)}%
                    </span>
                  </div>
                  <div className={`w-full h-[3px] rounded-full ${darkMode ? 'bg-[#2a2622]' : 'bg-[#d4cfc4]'}`}>
                    <motion.div 
                      className={`h-full rounded-full ${darkMode ? 'bg-[#c9a86c]' : 'bg-[#7d5a3c]'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(completedChapters.length / chapters.length) * 100}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <nav className="space-y-1 pb-20">
                  {chapters.map((chapter, idx) => {
                    const isCompleted = isChapterCompleted(chapter.num);
                    const isActive = activeChapter === chapter.num;
                    
                    return (
                      <motion.a
                        key={chapter.num}
                        href={chapter.num === 0 ? "#prolog" : `#bab-${chapter.num}`}
                        onClick={() => setSidebarOpen(false)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05, type: "spring", stiffness: 100 }}
                        className={`group flex items-center gap-4 p-4 rounded-xl text-sm transition-all duration-300 ${
                          isActive 
                            ? `${theme.accentBg} ${theme.accent} font-semibold border ${theme.accentBorder}` 
                            : isCompleted
                              ? `${theme.card} ${theme.text} border ${theme.border}`
                              : `${theme.textMuted} hover:${theme.text} hover:bg-[${darkMode ? '#2a2622' : '#e0d9cc'}]`
                        }`}
                      >
                        <span className={`text-lg font-serif font-bold flex-shrink-0 w-8 text-center ${
                          isCompleted 
                            ? theme.accent
                            : isActive 
                              ? theme.accent 
                              : theme.textMuted
                        }`}>
                          {isCompleted ? <Check size={18} strokeWidth={2} /> : chapter.num === 0 ? 'P' : chapter.num === 11 ? 'E' : ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][chapter.num - 1]}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className={`font-serif font-medium text-base truncate ${isActive ? theme.textHeading : isCompleted ? theme.textHeading : theme.text}`}>
                            {chapter.title}
                          </p>
                          <p className={`text-xs mt-1 truncate ${theme.textMuted} font-serif italic`}>{chapter.subtitle}</p>
                        </div>
                        {isActive && <ChevronRight size={18} strokeWidth={2} />}
                      </motion.a>
                    );
                  })}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-0 pb-32 font-serif antialiased">
        
        {/* Hero Section - lebih dramatic dan "deep" */}
        <motion.section
          id="prolog"
          data-chapter={0}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className={`relative flex items-center justify-center px-6 sm:px-8 lg:px-12 ${theme.bg} border-b ${theme.border}`}
        >
          <div className={`absolute inset-0 bg-gradient-to-b ${theme.gradientFrom} ${theme.gradientTo} opacity-60`} />
          
          <div className="max-w-3xl mx-auto w-full pt-20 sm:pt-24 pb-24 relative z-10 text-center">
            <motion.div 
              initial={prefersReducedMotion ? { scale: 1 } : { scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="mb-16"
            >
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${theme.accentBg} border ${theme.accentBorder} mb-10`}>
                <Wind size={32} strokeWidth={1} className={theme.accent} />
              </div>
              
              <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold ${theme.textHeading} mb-8 tracking-tight leading-[1.1] font-serif`}>
                YANG TERTINGGAL<br />
                <span className={`${theme.accent} italic font-light`}>DI LEMBAH</span>
              </h1>
              
              <p className={`text-xl sm:text-2xl ${theme.textSubheading} italic mb-10 font-serif font-light tracking-wide max-w-2xl mx-auto leading-relaxed`}>
                Sebuah Tafsiran tentang Janji, Kehilangan, dan Arti Sebuah Perjalanan
              </p>

              <div className={`w-32 h-[1px] mx-auto ${darkMode ? 'bg-[#c9a86c]/50' : 'bg-[#7d5a3c]/50'} mb-10`} />
              
              <p className={`text-lg ${theme.textMuted} max-w-2xl mx-auto leading-[1.8] font-serif`}>
                "Kita selalu diajarkan untuk mendaki. Tapi ada kebohongan yang lebih sunyi: 
                bahwa perjalanan yang sesungguhnya tidak terjadi saat kita berdiri di atas, 
                bersorak, tetapi saat kita merangkak di dasar lembah."
              </p>
            </motion.div>

            <motion.div 
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <button
                onClick={() => setSidebarOpen(true)}
                className={`inline-flex items-center gap-3 px-8 py-4 rounded-full ${theme.accentBg} ${theme.accent} font-serif border ${theme.accentBorder} hover:shadow-lg transition-all duration-500 tracking-wide text-sm uppercase`}
              >
                <BookOpen size={18} strokeWidth={1.5} />
                Mulai Membaca
              </button>
            </motion.div>
          </div>

          <motion.div 
            animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute bottom-12 left-1/2 -translate-x-1/2 ${theme.textMuted}`}
          >
            <div className={`w-6 h-10 rounded-full border ${theme.border} flex justify-center pt-2`}>
              <div className={`w-[2px] h-2 rounded-full ${darkMode ? 'bg-[#c9a86c]' : 'bg-[#7d5a3c]'}`} />
            </div>
          </motion.div>
        </motion.section>

        {/* Content Container - lebih narrow untuk readability yang lebih intimate */}
        <div className="px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-2xl mx-auto py-24">
            
            {/* PROLOG */}
            <motion.section 
              id="prolog"
              data-chapter={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="mb-40 scroll-mt-24"
            >
              <div className={`mb-16 pb-8 border-b ${theme.border}`}>
                <span className={`text-xs font-bold tracking-[0.3em] ${theme.accent} uppercase font-serif`}>Prolog</span>
                <h2 className={`text-4xl sm:text-5xl font-bold ${theme.textHeading} mt-4 font-serif leading-tight`}>Bukit yang Menipu</h2>
              </div>

              <div className="space-y-8">
                <p className={`${theme.text} text-lg leading-[1.9] first-letter:text-6xl first-letter:${theme.accent} first-letter:font-bold first-letter:mr-4 first-letter:float-left first-letter:leading-none first-letter:mt-2`}>
                  Kita selalu diajarkan untuk mendaki. Sejak kecil, kita dibesarkan dengan mitos-mitos tentang puncak: 
                  bahwa kebahagiaan adalah pemandangan dari atas, bahwa kesuksesan adalah udara yang lebih encer di ketinggian, 
                  bahwa hidup yang bermakna adalah hidup yang berhasil "menaklukkan."
                </p>
                
                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Tapi ada kebohongan yang lebih sunyi yang jarang dibicarakan: bahwa bukit yang terang sering kali sunyi. 
                  Bahwa puncak adalah tempat yang sepi. Dan bahwa perjalanan yang sesungguhnya—yang mengukir siapa kita—tidak terjadi saat kita berdiri di atas, bersorak, tetapi saat kita merangkak di dasar lembah, ketika napas sesak dan kegelapan mengaburkan arah pulang.
                </p>

                <blockquote className={`pl-8 border-l-2 ${theme.quoteBorder} italic ${theme.textSubheading} text-2xl leading-[1.6] my-16 py-4 font-serif`}>
                  Buku ini bukan tentang cara mencapai puncak. Ini tentang mereka yang tetap berada di lembah bersamamu ketika semua orang sudah berlari menuju cahaya.
                </blockquote>
              </div>
            </motion.section>

            {/* BAB I */}
            <motion.section 
              id="bab-1"
              data-chapter={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="mb-40 scroll-mt-24"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-6 mb-16 pb-8 border-b ${theme.border}`}>
                <span className={`text-8xl sm:text-9xl font-black ${theme.romanColor} opacity-40 leading-none font-serif`}>I</span>
                <div className="flex-1">
                  <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${theme.textHeading} mb-3 font-serif leading-tight`}>Geografi Jiwa</h2>
                  <p className={`text-lg ${theme.textMuted} italic font-serif`}>Tentang Letak Sebenarnya dari Kehidupan</p>
                </div>
              </div>

              <div className="space-y-8">
                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Setiap manusia membawa peta di dalam dadanya. Sejak lahir, kita sudah diprogram untuk menganggap hidup adalah garis lurus yang menanjak: lahir, sekolah, sukses, bahagia. Puncaknya adalah rumah besar, jabatan tinggi, atau pencapaian yang diakui dunia.
                </p>
                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Tapi jiwa tidak mengenal GPS. Jiwa mengenal lembah-lembah yang gelap, yang tidak pernah muncul di peta manapun.
                </p>

                <div className="space-y-6 mt-12">
                  <h3 className={`text-2xl font-bold ${theme.textHeading} font-serif mb-6`}>Tiga Jenis Tempat dalam Geografi Batin Manusia:</h3>
                  
                  {[
                    { title: "Pegunungan Pesta", desc: "Tempat kita berpose untuk kamera. Di sinilah kita bertemu banyak orang, bertukar kartu nama, tersenyum lebar. Cahayanya terang, tapi dingin. Semua orang ingin berfoto, tapi tidak ada yang ingin tinggal terlalu lama." },
                    { title: "Hutan Kebiasaan", desc: "Tempat kita berjalan sendirian, monoton, tidak terlalu bahagia tapi juga tidak menderita. Kita bisa bertemu orang di sini, tapi pertemuan itu dangkal, seperti daun-daun yang berserakan tanpa akar." },
                    { title: "Lembah Kelam", desc: "Inilah tempat yang paling jujur. Di sini, topeng terlepas. Di sini, kita tidak bisa berpura-pura kuat karena kita benar-benar jatuh. Dan di sinilah—hanya di sinilah—kita bisa tahu siapa yang benar-benar berjalan bersama kita, bukan karena mereka butuh sesuatu dari kita, tapi karena mereka sudah berjanji pada sesuatu yang lebih dalam dari kontrak sosial: mereka berjanji pada kita." }
                  ].map((item, idx) => (
                    <motion.div 
                      key={item.title}
                      initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15, duration: 0.6 }}
                      className={`p-8 rounded-2xl ${theme.card} border ${theme.border} shadow-sm hover:shadow-md transition-shadow duration-300`}
                    >
                      <h4 className={`font-bold text-xl ${theme.accent} mb-4 font-serif`}>{item.title}</h4>
                      <p className={`${theme.text} leading-[1.8]`}>{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* BAB II */}
            <motion.section 
              id="bab-2"
              data-chapter={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="mb-40 scroll-mt-24"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-6 mb-16 pb-8 border-b ${theme.border}`}>
                <span className={`text-8xl sm:text-9xl font-black ${theme.romanColor} opacity-40 leading-none font-serif`}>II</span>
                <div className="flex-1">
                  <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${theme.textHeading} mb-3 font-serif leading-tight`}>Ontologi Janji</h2>
                  <p className={`text-lg ${theme.textMuted} italic font-serif`}>Mengapa Kata-Kata Menjadi Berat</p>
                </div>
              </div>

              <div className="space-y-8">
                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Janji bukanlah sekadar rangkaian kata. Dalam dimensi yang lebih dalam, janji adalah materi yang mengokohkan realitas. Ketika seseorang berkata, "Aku tidak akan membiarkanmu sendirian," ia tidak sedang berbicara tentang fisik. Ia sedang menawarkan dirinya sebagai benteng melawan kehancuran ontologis—the ketakutan bahwa kita tidak ada, bahwa kita tidak berarti, bahwa kita bisa hilang tanpa jejak di tengah kegelapan.
                </p>

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Ada tipe janji dalam sejarah peradaban:
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-12">
                  <div className={`p-8 rounded-2xl ${theme.card} border ${theme.border} shadow-sm`}>
                    <h4 className={`font-bold text-sm ${theme.textMuted} mb-6 uppercase tracking-widest font-serif`}>Janji Kontrakual</h4>
                    <p className={`${theme.text} leading-[1.8] mb-6 font-serif`}>
                      "Aku akan membayarmu."<br/>
                      "Aku akan datang pukul tiga."
                    </p>
                    <p className={`text-sm ${theme.textMuted} leading-relaxed`}>
                      Ini adalah janji duniawi, yang bisa dihukum jika dilanggar. Terikat oleh hukum dan konvensi sosial.
                    </p>
                  </div>
                  
                  <div className={`p-8 rounded-2xl ${theme.accentBg} border ${theme.accentBorder} shadow-sm`}>
                    <h4 className={`font-bold text-sm ${theme.accent} mb-6 uppercase tracking-widest font-serif`}>Janji Eksistensial</h4>
                    <p className={`${theme.text} leading-[1.8] mb-6 font-serif`}>
                      "Aku akan ada."<br/>
                      "Aku tidak akan pergi."
                    </p>
                    <p className={`text-sm ${theme.accent} leading-relaxed opacity-90`}>
                      Ini adalah janji yang tidak tertulis di kertas, tapi tertoreh di ruang-ruang di antara detak jantung. Ini adalah jenis janji yang dibahas dalam buku ini.
                    </p>
                  </div>
                </div>

                <blockquote className={`pl-8 border-l-2 ${theme.quoteBorder} italic ${theme.textSubheading} text-xl leading-[1.7] my-16 py-2 font-serif`}>
                  Janji eksistensial tidak memiliki saksi—kecuali Tuhan, atau jagat raya, atau keheningan dini hari. Ketika seseorang mengingkari janji jenis ini, tidak ada pengadilan yang bisa memvonisnya. Hanya luka yang diam-diam menganga di dada si penerima, seperti gua yang terlupakan.
                </blockquote>
              </div>
            </motion.section>

            {/* BAB III */}
            <motion.section 
              id="bab-3"
              data-chapter={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="mb-40 scroll-mt-24"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-6 mb-16 pb-8 border-b ${theme.border}`}>
                <span className={`text-8xl sm:text-9xl font-black ${theme.romanColor} opacity-40 leading-none font-serif`}>III</span>
                <div className="flex-1">
                  <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${theme.textHeading} mb-3 font-serif leading-tight`}>Fenomenologi Lemah</h2>
                  <p className={`text-lg ${theme.textMuted} italic font-serif`}>Ketika Kita Tidak Bisa Berdiri</p>
                </div>
              </div>

              <div className="space-y-8">
                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Filosofi modern sangat peduli dengan kekuatan. Nietzsche dan para eksistensialis memuja <em>Ubermensch</em>, manusia yang mampu menciptakan maknanya sendiri. Psikologi positif mengajarkan <em>resilience</em>, kemampuan bangkit dari keterpurukan.
                </p>

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Tapi ada kebijaksanaan yang lebih tua, yang lebih lembut: kebijaksanaan tentang <strong className={theme.textHeading}>ketidakmampuan</strong>.
                </p>

                <div className={`p-10 lg:p-14 rounded-3xl ${theme.quoteBg} border ${theme.border} shadow-sm my-12`}>
                  <p className={`${theme.text} text-lg leading-[1.9] mb-6 font-serif`}>
                    Di lembah yang gelap, kita tidak kuat. Kita tidak tangguh. Kita tidak "positive thinking." Kita hanyalah manusia yang terluka, yang mungkin sedang menangis tanpa suara, yang mungkin lupa cara berjalan, yang mungkin ingin berhenti saja.
                  </p>
                  <p className={`${theme.text} text-lg leading-[1.9] font-serif`}>
                    Dan di saat itulah janji menunjukkan wujudnya yang sebenarnya.
                  </p>
                </div>

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Seseorang yang berjanji untuk menemanimu bukanlah orang yang menarikmu paksa ke atas dengan kata-kata motivasi. Bukan. Orang itu adalah yang duduk di lumpur bersamamu. Yang bilang, "Kalau kau ingin berhenti sejenak, aku akan berhenti juga." Yang menganggap kelemahanmu bukan sebagai beban, tapi sebagai bagian dari dirimu yang juga berharga dihormati.
                </p>
              </div>
            </motion.section>

            {/* BAB IV */}
            <motion.section 
              id="bab-4"
              data-chapter={4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="mb-40 scroll-mt-24"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-6 mb-16 pb-8 border-b ${theme.border}`}>
                <span className={`text-8xl sm:text-9xl font-black ${theme.romanColor} opacity-40 leading-none font-serif`}>IV</span>
                <div className="flex-1">
                  <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${theme.textHeading} mb-3 font-serif leading-tight`}>Arkeologi Teman</h2>
                  <p className={`text-lg ${theme.textMuted} italic font-serif`}>Menggali yang Tersisa</p>
                </div>
              </div>

              <div className="space-y-8">
                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Sejarah peradaban manusia dipenuhi dengan kisah-kisah pertempuran, penaklukan, dan pencapaian. Tapi arkeolog yang cerdas akan mencari yang lain: jejak-jejak peradaban dari barang-barang kecil yang ditinggalkan bersama.
                </p>

                <div className={`my-12 space-y-6 ${theme.text} text-lg leading-[1.9] font-serif`}>
                  <p>Dua cangkir teh yang masih tersisa di meja, meski sudah dingin.</p>
                  <p>Sepatu yang dipinjam karena kakimu lecet.</p>
                  <p>Surat-surat yang tidak pernah dikirim, tapi ditulis hanya untuk mengatakan, "Aku masih di sini."</p>
                </div>

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Teman sejati adalah arkeolog yang setia. Mereka tidak datang saat museummu sedang ramai pengunjung. Mereka datang saat reruntuhanmu terbakar, dan mereka mengais dengan tangan telanjang, bukan mencari harta, tapi mencari <em>kau</em>—yang mungkin terkubur di bawah puing-puing ego, rasa malu, dan kehancuran.
                </p>
              </div>
            </motion.section>

            {/* BAB V */}
            <motion.section 
              id="bab-5"
              data-chapter={5}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="mb-40 scroll-mt-24"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-6 mb-16 pb-8 border-b ${theme.border}`}>
                <span className={`text-8xl sm:text-9xl font-black ${theme.romanColor} opacity-40 leading-none font-serif`}>V</span>
                <div className="flex-1">
                  <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${theme.textHeading} mb-3 font-serif leading-tight`}>Etika dalam Kesetiaan</h2>
                  <p className={`text-lg ${theme.textMuted} italic font-serif`}>Kapan Berjuang dan Kapan Melepas</p>
                </div>
              </div>

              <div className="space-y-8">
                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Ada kebingungan moral yang sering muncul: jika seseorang berjanji untuk menemani, apakah itu berarti mereka harus bertahan meski hubungan itu merusak? Apakah kesetiaan adalah penjara?
                </p>

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Bab ini membahas perbedaan antara:
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-12">
                  <div className={`p-8 rounded-2xl border ${theme.border} ${darkMode ? 'bg-[#2a1f1f]/30' : 'bg-[#f0e6e6]'} shadow-sm`}>
                    <h4 className={`font-bold text-lg text-[#8b5e5e] mb-4 font-serif`}>Kesetiaan Konsumtif</h4>
                    <p className={`${theme.text} leading-[1.8] text-base`}>
                      Bertahan karena takut sendiri, karena butuh diterima, karena ego. Ini adalah penjara berlapis emas.
                    </p>
                  </div>
                  
                  <div className={`p-8 rounded-2xl border ${theme.accentBorder} ${theme.accentBg} shadow-sm`}>
                    <h4 className={`font-bold text-lg ${theme.accent} mb-4 font-serif`}>Kesetiaan Eksistensial</h4>
                    <p className={`${theme.text} leading-[1.8] text-base`}>
                      Bertahan karena melihat keberadaan si lain sebagai intrinsik berharga, terpisah dari fungsinya bagi kita. Ini adalah kebebasan yang dipilih.
                    </p>
                  </div>
                </div>

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Kunci dari kesetiaan yang sehat adalah <strong className={theme.textHeading}>kehadiran yang tidak memiliki</strong>. Kita ada untuk mereka, tapi kita tidak memiliki mereka. Kita menemani, tapi kita tidak mengendalikan. Kita berjanji, tapi kita membebaskan.
                </p>
              </div>
            </motion.section>

            {/* BAB VI */}
            <motion.section 
              id="bab-6"
              data-chapter={6}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="mb-40 scroll-mt-24"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-6 mb-16 pb-8 border-b ${theme.border}`}>
                <span className={`text-8xl sm:text-9xl font-black ${theme.romanColor} opacity-40 leading-none font-serif`}>VI</span>
                <div className="flex-1">
                  <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${theme.textHeading} mb-3 font-serif leading-tight`}>Topografi Kehilangan</h2>
                  <p className={`text-lg ${theme.textMuted} italic font-serif`}>Ketika Janji Diingkari</p>
                </div>
              </div>

              <div className="space-y-8">
                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Tidak semua janji tertepati. Itu adalah fakta pahit yang harus kita telan sebelum bisa dewasa.
                </p>

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Bab ini adalah tentang duka atas janji-janji yang rusak. Tentang teman yang berkata, "Aku tak akan pergi," lalu pergi. Tentang kekasih yang berjanji setia di tengah hubungan yang sedang kalian bangun dengan tulus, lalu menghilang bagai kabut pagi yang menyingsing. Tentang orang tua yang berkata, "Rumah ini selalu terbuka untukmu," tapi menguncinya saat kau pulang dengan kegagalan.
                </p>

                <div className={`p-10 rounded-2xl ${theme.highlight} border ${theme.border} shadow-sm my-12`}>
                  <p className={`${theme.text} text-lg leading-[1.9] italic font-serif`}>
                    Kehilangan janji adalah sejenis kematian. Maka dukalah seperti orang berduka. Jangan buru-buru memaafkan jika hatimu belum siap. Jangan buru-buru mengatakan, "Mungkin ada hikmahnya," jika luka itu masih berdarah.
                  </p>
                </div>

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Tapi pelajaran yang bisa diambil: jika seseorang pergi, itu bukan berarti janji itu tidak pernah nyata. Pada saat diucapkan, mungkin ia sungguh-sungguh. Manusia berubah. Dan janji, seperti segala sesuatu yang hidup, bisa mati.
                </p>

                <p className={`${theme.text} text-lg leading-[1.9] font-semibold ${theme.accent} font-serif`}>
                  Yang penting adalah: pernahkah kau menjadi tempat yang aman bagi orang lain? Itulah yang lebih penting dari apakah orang lain pernah aman bagimu.
                </p>
              </div>
            </motion.section>

            {/* BAB VII */}
            <motion.section 
              id="bab-7"
              data-chapter={7}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="mb-40 scroll-mt-24"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-6 mb-16 pb-8 border-b ${theme.border}`}>
                <span className={`text-8xl sm:text-9xl font-black ${theme.romanColor} opacity-40 leading-none font-serif`}>VII</span>
                <div className="flex-1">
                  <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${theme.textHeading} mb-3 font-serif leading-tight`}>Komunitas sebagai Perlawanan</h2>
                  <p className={`text-lg ${theme.textMuted} italic font-serif`}>Melawan Mitos Individualisme</p>
                </div>
              </div>

              <div className="space-y-8">
                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Zaman ini mengagungkan <em>self-made man</em>. Kita dipaksa percaya bahwa kitalah kapten dari kapal kita sendiri, bahwa kita tidak butuh siapapun, bahwa ketergantungan adalah kelemahan.
                </p>

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Tapi itu adalah kebohongan kapitalis yang membuat kita terisolasi dan lebih mudah dikendalikan.
                </p>

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Sejarah menunjukkan: manusia selalu bertahan karena <strong className={theme.textHeading}>kita</strong>. Klan. Suku. Komunitas. Perkumpulan rahasia. Geng jalanan. Keluarga pilihan.
                </p>

                <blockquote className={`pl-8 border-l-2 ${theme.quoteBorder} italic ${theme.textSubheading} text-xl leading-[1.7] my-16 py-2 font-serif`}>
                  Janji untuk tidak membiarkan seseorang berjalan sendiri adalah bentuk paling radikal dari perlawanan melawan sistem yang ingin kita terpecah-pecah, saling curiga, dan saling bersaing.
                </blockquote>

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Ketika kau berkata pada seseorang, "Kau tidak sendiri," kau sedang memberontak melawan seluruh tatanan yang ingin kau percaya bahwa kau hanyalah atom yang terasing.
                </p>
              </div>
            </motion.section>

            {/* BAB VIII */}
            <motion.section 
              id="bab-8"
              data-chapter={8}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="mb-40 scroll-mt-24"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-6 mb-16 pb-8 border-b ${theme.border}`}>
                <span className={`text-8xl sm:text-9xl font-black ${theme.romanColor} opacity-40 leading-none font-serif`}>VIII</span>
                <div className="flex-1">
                  <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${theme.textHeading} mb-3 font-serif leading-tight`}>Mistika Kegelapan</h2>
                  <p className={`text-lg ${theme.textMuted} italic font-serif`}>Apa yang Ditemukan Saat Tidak Ada Cahaya</p>
                </div>
              </div>

              <div className="space-y-8">
                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Orang-orang spiritual sering takut pada "malam gelap jiwa"—periode di mana Tuhan terasa menjauh, di mana doa menjadi kosong, di mana makna hilang.
                </p>

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Tapi ada keindahan yang hanya bisa dilihat dalam gelap: bintang-bintang, misalnya. Atau api yang hangat. Atau wajah seseorang yang diterangi oleh lilin, bukan lampu neon.
                </p>

                <div className={`p-10 rounded-2xl ${theme.card} border ${theme.border} shadow-sm my-12`}>
                  <p className={`${theme.text} text-lg leading-[1.9] font-serif`}>
                    Di lembah yang gelap, kita belajar untuk melihat dengan cara lain. Kita belajar bahwa cahaya bukanlah satu-satunya sumber keindahan. <strong className={theme.textHeading}>Kegelapan punya kedalaman yang cahaya tidak punya.</strong> Kegelapan punya kelembutan yang menenangkan. Dan di kegelapan, janji seseorang menjadi bintang yang tidak silau, tapi setia.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* BAB IX */}
            <motion.section 
              id="bab-9"
              data-chapter={9}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="mb-40 scroll-mt-24"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-6 mb-16 pb-8 border-b ${theme.border}`}>
                <span className={`text-8xl sm:text-9xl font-black ${theme.romanColor} opacity-40 leading-none font-serif`}>IX</span>
                <div className="flex-1">
                  <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${theme.textHeading} mb-3 font-serif leading-tight`}>Genealogi Janji</h2>
                  <p className={`text-lg ${theme.textMuted} italic font-serif`}>Dari Mana Datangnya Komitmen?</p>
                </div>
              </div>

              <div className="space-y-8">
                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Mengapa sebagian orang bisa berjanji dan menepati, sementara yang lain tidak?
                </p>

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Ini bukan tentang moralitas sederhana. Ini tentang sejarah: apakah seseorang pernah <em>dijanjikan</em> dengan tulus? Apakah mereka pernah ditinggal di lembah sendirian saat kecil? Apakah mereka belajar bahwa dunia adalah tempat yang tidak aman, sehingga janji adalah sesuatu yang harus dihindari karena pasti akan mengecewakan?
                </p>

                <div className={`p-10 rounded-2xl ${theme.accentBg} border ${theme.accentBorder} shadow-sm my-12`}>
                  <p className={`${theme.text} text-lg leading-[1.9] font-serif`}>
                    Orang yang bisa berjanji dengan sungguh-sungguh adalah orang yang pernah menerima janji yang sungguh-sungguh. Mereka adalah <strong className={theme.textHeading}>batu yang mengalir</strong>—keras karena pengalaman, tapi mengalir karena kasih.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* BAB X */}
            <motion.section 
              id="bab-10"
              data-chapter={10}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="mb-40 scroll-mt-24"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-6 mb-16 pb-8 border-b ${theme.border}`}>
                <span className={`text-8xl sm:text-9xl font-black ${theme.romanColor} opacity-40 leading-none font-serif`}>X</span>
                <div className="flex-1">
                  <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${theme.textHeading} mb-3 font-serif leading-tight`}>Praktik Kehadiran</h2>
                  <p className={`text-lg ${theme.textMuted} italic font-serif`}>Cara Menjadi Orang yang Tidak Pergi</p>
                </div>
              </div>

              <div className="space-y-8">
                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Bab ini adalah manual praktis, tapi bukan manual teknis. Ini adalah seni:
                </p>

                <div className="space-y-4 my-12">
                  {[
                    { title: "Kehadiran tanpa solusi", desc: "Kadang orang tidak butuh solusi. Mereka butuh telinga yang tidak menghakimi." },
                    { title: "Diam yang penuh", desc: "Tidak semua keheningan harus diisi. Ada kekuatan dalam duduk bersama tanpa kata." },
                    { title: "Janji kecil yang konsisten", desc: "'Aku akan menelepon besok.' 'Aku akan datang jam tujuh.' Janji kecil yang ditepati membangun fondasi untuk janji besar." },
                    { title: "Melihat yang tidak terlihat", desc: "Mengenali tanda-tanda bahwa seseorang sedang di lembah, meski mereka tersenyum." }
                  ].map((item, idx) => (
                    <motion.div 
                      key={item.title}
                      initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.5 }}
                      className={`flex items-start gap-5 p-6 rounded-2xl ${theme.card} border ${theme.border} shadow-sm hover:shadow-md transition-shadow duration-300`}
                    >
                      <span className={`text-xl ${theme.accent} font-serif mt-1`}>◆</span>
                      <div>
                        <h4 className={`font-bold text-lg ${theme.textHeading} mb-2 font-serif`}>{item.title}</h4>
                        <p className={`${theme.text} text-base leading-relaxed`}>{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* EPILOG */}
            <motion.section 
              id="bab-11"
              data-chapter={11}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="mb-40 scroll-mt-24"
            >
              <div className={`mb-16 pb-8 border-b ${theme.border}`}>
                <span className={`text-xs font-bold tracking-[0.3em] ${theme.accent} uppercase font-serif`}>Epilog</span>
                <h2 className={`text-4xl sm:text-5xl font-bold ${theme.textHeading} mt-4 font-serif leading-tight`}>Bukit yang Terlupakan</h2>
              </div>

              <div className="space-y-10">
                <p className={`${theme.text} text-xl leading-[1.8] font-serif`}>
                  Di akhir hidupmu—jika kau beruntung untuk sampai di sana dengan kesadaran masih utuh—kau akan melihat ke belakang. Dan kau akan sadar: yang kau ingat bukanlah puncak-puncak yang kau daki dengan susah payah.
                </p>
                
                <div className="space-y-6 my-16">
                  <p className={`${theme.text} text-lg leading-[1.9] border-l-2 ${theme.quoteBorder} pl-8 font-serif`}>
                    Yang kau ingat adalah tangan yang memegang tanganmu saat kau terjatuh.
                  </p>
                  <p className={`${theme.text} text-lg leading-[1.9] border-l-2 ${theme.quoteBorder} pl-8 font-serif`}>
                    Yang kau ingat adalah suara yang berkata, "Aku di sini," saat kau terbangun karena mimpi buruk.
                  </p>
                  <p className={`${theme.text} text-lg leading-[1.9] border-l-2 ${theme.quoteBorder} pl-8 font-serif`}>
                    Yang kau ingat adalah mereka yang berjanji, dan menepati, bahwa ketika lembah tampak tak bertepi, kau tidak akan pernah berjalan sendirian.
                  </p>
                </div>

                <p className={`${theme.text} text-lg leading-[1.9] italic font-serif`}>
                  Bukit yang terang? Itu hanyalah bonus. Itu hanyalah pemandangan sementara di perjalanan pulang.
                </p>

                <div className={`p-10 lg:p-14 rounded-3xl ${theme.highlight} border ${theme.border} shadow-sm mt-16`}>
                  <p className={`${theme.text} text-lg leading-[1.9] mb-6 font-serif`}>
                    Yang sebenarnya membuatmu sampai di rumah—di rumah yang sesungguhnya, di dalam diri sendiri—adalah mereka yang berjalan bersamamu di tempat-tempat gelap, yang rela kotor oleh lumpurmu, yang menganggap janji mereka bukan sebagai beban, tapi sebagai hakikat dari menjadi manusia.
                  </p>
                  <p className={`${theme.text} text-lg leading-[1.9] font-serif`}>
                    Maka jika kau sedang di lembah sekarang, lihatlah sekelilingmu. Jika ada yang duduk di sana, di lumpur, bersamamu—peluklah mereka dengan pikiranmu. Mereka adalah milik surgamu di bumi.
                  </p>
                </div>

                <p className={`${theme.text} text-lg leading-[1.9] mt-10 font-serif`}>
                  Dan jika kau sedang di bukit yang terang, jangan lupa melihat ke bawah. Ada yang membutuhkan janji. Ada yang membutuhkan seseorang untuk berkata, <em>"Aku tidak akan membiarkanmu berjalan sendirian."</em>
                </p>

                <p className={`${theme.text} text-lg leading-[1.9] italic mt-10 font-serif`}>
                  Karena pada akhirnya, bukit itu akan redup. Tapi janji yang ditepati di kegelapan? Itu akan bersinar, bahkan setelah kita semua telah pergi.
                </p>
              </div>
            </motion.section>

            {/* TENTANG BUKU INI */}
            <motion.section 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className={`mt-40 pt-20 border-t-2 ${theme.border} ${theme.accentBorder}`}
            >
              <div className="max-w-2xl mx-auto text-center mb-16">
                <Quote size={40} strokeWidth={1} className={`${theme.accent} mx-auto mb-6 opacity-40`} />
                <h3 className={`text-2xl sm:text-3xl font-bold ${theme.textHeading} mb-8 font-serif`}>
                  Tentang Buku Ini
                </h3>
              </div>

              <div className={`p-10 lg:p-14 rounded-3xl ${theme.card} border ${theme.border} shadow-sm`}>
                <p className={`${theme.text} text-lg leading-[1.9] mb-8 text-center font-serif`}>
                  Buku ini adalah invitasi untuk meredefinisi kesuksesan hidup. Bukan tentang seberapa tinggi kau naik, tapi tentang seberapa dalam kau mampu berada bersama orang lain. Bukan tentang seberapa terang puncakmu, tapi tentang seberapa setia engkau berada di lembah orang lain.
                </p>
                
                <div className={`w-24 h-[1px] ${darkMode ? 'bg-[#3d352b]' : 'bg-[#c4b8a3]'} mx-auto my-10`} />
                
                <p className={`${theme.textMuted} text-base leading-[1.8] text-center italic font-serif`}>
                  "Sebuah perjalanan memang tentang bukit yang terang—tapi hanya agar kita punya cerita untuk diceritakan saat kita turun kembali, ke tempat yang sebenarnya: ke pelukan sesama manusia, di tempat yang gelap tapi hangat, yang bernama rumah."
                </p>
              </div>

              <motion.div 
                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-20 text-center"
              >
                <Heart size={28} strokeWidth={1} className={`${theme.accent} mx-auto mb-4`} />
                <p className={`${theme.textMuted} text-sm font-serif italic`}>Sebuah tafsiran tentang yang tertinggal</p>
              </motion.div>
            </motion.section>

          </div>
        </div>
      </main>
    </div>
  );
}
