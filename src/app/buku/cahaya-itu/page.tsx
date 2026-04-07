'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Moon, Sun, BookOpen, Flame, ChevronRight, X, Compass, Heart, Wind, Quote, Feather } from 'lucide-react';
import { useTheme } from "@/src/components/ThemeProvider";
import Link from 'next/link';

export default function CahayaItuPage() {
  const { theme: globalTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

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

  // TEMA: "Ashes & Embers" — untuk tulisan tentang cahaya yang padam
  // Warm undertone seperti "Kami Menulis Pelan" tapi lebih gelap, lebih melancholic
  const theme = darkMode ? {
    // Dark mode: Ruang yang hanya diterangi sisa api
    bg: 'bg-[#0f0d0c]', // Charcoal warm
    text: 'text-[#e5e0db]', // Warm white dengan ash undertone
    textMuted: 'text-[#8b7d6b]', // Ash brown
    textHeading: 'text-[#f0ebe5]', // Bright warm white
    textSubheading: 'text-[#a89f91]', // Soft taupe
    
    border: 'border-[#2a2520]', // Dark wood
    accent: 'text-[#c9a66b]', // Ember gold — seperti bara yang masih menyala
    accentBg: 'bg-[#1a1612]', // Slightly lighter charcoal
    accentBorder: 'border-[#3d3428]', // Warm bronze border
    
    sidebar: 'bg-[#0a0807]', // Almost black warm
    highlight: 'bg-[#2a2420]/50', // Warm ash translucent
    card: 'bg-[#1a1612]/80', // Charcoal dengan transparency
    
    float: 'bg-[#1c1814]/95', // Floating elements
    gradientFrom: 'from-[#2a2420]/30', // Warm ash gradient
    gradientTo: 'to-[#0f0d0c]/10',
    
    quoteBorder: 'border-[#c9a66b]/40',
    quoteBg: 'bg-[#1a1612]/60',
    
    romanColor: 'text-[#5c4d3c]', // Deep umber
    ember: 'text-[#8b4513]', // Burnt sienna untuk highlight emosional
  } : {
    // Light mode: Kertas yang terbakar di tepinya
    bg: 'bg-[#f5f0e8]', // Aged parchment
    text: 'text-[#2c241b]', // Soft black
    textMuted: 'text-[#6b5d4d]', // Medium brown
    textHeading: 'text-[#1a1612]', // Deep charcoal
    textSubheading: 'text-[#4a3f32]', // Dark taupe
    
    border: 'border-[#d4cfc4]', // Soft gray-brown
    accent: 'text-[#8b4513]', // Burnt sienna — seperti bekas bakar
    accentBg: 'bg-[#ebe5d8]', // Darker cream
    accentBorder: 'border-[#c4b8a3]', // Tan border
    
    sidebar: 'bg-[#ebe5d8]', // Darker cream
    highlight: 'bg-[#d9d0c1]/60', // Warm gray translucent
    card: 'bg-[#ebe5d8]/80',
    
    float: 'bg-[#f5f0e8]/95',
    gradientFrom: 'from-[#d9d0c1]/40',
    gradientTo: 'to-[#f5f0e8]/20',
    
    quoteBorder: 'border-[#8b4513]/40',
    quoteBg: 'bg-[#ebe5d8]/60',
    
    romanColor: 'text-[#a89b8c]', // Light taupe
    ember: 'text-[#a0522d]', // Sienna
  };

  const chapters = [
    { num: 0, title: "Pembuka", subtitle: "Badan Bau Keringat" },
    { num: 1, title: "01", subtitle: "Bocah Itu" },
    { num: 2, title: "02", subtitle: "Yang Menawan" },
    { num: 3, title: "03", subtitle: "Pisau Itu" },
    { num: 4, title: "04", subtitle: "Malam Itu" },
    { num: 5, title: "05", subtitle: "Ratapan Itu" },
    { num: 6, title: "Penutup", subtitle: "Jangan Jadi Cahaya" },
  ];

  const isChapterCompleted = (num: number) => completedChapters.includes(num);

  const fadeIn = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.12, delayChildren: 0.15 }
    }
  };

  const lineReveal = {
    hidden: { opacity: 0, x: -20, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      x: 0, 
      filter: "blur(0px)", 
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-1000 selection:${theme.accent} selection:bg-current`}>
      
      {/* Aesthetic Background Layers */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Gradient base */}
        <div className={`absolute inset-0 bg-gradient-to-b ${theme.gradientFrom} ${theme.gradientTo} opacity-60`} />
        
        {/* Ash/Ember particles */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -30, 0], 
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 8 + i * 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 1.5
              }}
              className={`absolute rounded-full ${darkMode ? 'bg-[#c9a66b]/20' : 'bg-[#8b4513]/10'}`}
              style={{
                width: `${100 + i * 50}px`,
                height: `${100 + i * 50}px`,
                left: `${10 + i * 20}%`,
                top: `${20 + i * 15}%`,
                filter: 'blur(60px)'
              }}
            />
          ))}
        </div>

        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }} />
      </div>

      {/* Reading Progress Bar */}
      <div className={`fixed top-0 left-0 right-0 h-[2px] z-50 ${darkMode ? 'bg-[#2a2520]' : 'bg-[#d4cfc4]'}`}>
        <motion.div 
          className={`h-full ${darkMode ? 'bg-[#c9a66b]' : 'bg-[#8b4513]'}`}
          style={{ width: `${readingProgress}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
        />
      </div>

      {/* Floating Navigation */}
      <AnimatePresence>
        {showFloatingMenu && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { x: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className={`fixed bottom-4 sm:bottom-8 left-4 sm:left-8 z-40 flex flex-col gap-2 sm:gap-3`}
          >
            <motion.button
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              onClick={() => setSidebarOpen(true)}
              className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-full ${theme.float} backdrop-blur-md border ${theme.border} shadow-xl ${theme.accent} font-serif tracking-wide text-sm sm:text-base`}
            >
              <BookOpen size={16} className="sm:size-5" strokeWidth={1.5} />
              <span className="hidden xs:inline sm:inline font-medium">Daftar Isi</span>
              <div className={`flex items-center gap-1 sm:gap-2 ml-1 sm:ml-2 pl-2 sm:pl-3 border-l ${theme.border}`}>
                <span className={`text-xs font-serif ${theme.textMuted}`}>
                  {String(activeChapter).padStart(2, '0')}/{chapters.length - 1}
                </span>
              </div>
            </motion.button>

            <div className={`flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-full ${theme.float} backdrop-blur-md border ${theme.border} shadow-xl w-fit`}>
              <motion.button
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                onClick={toggleTheme}
                className={`p-2 sm:p-3 rounded-full ${darkMode ? 'hover:bg-[#2a2520]' : 'hover:bg-[#e0d9cc]'} transition-colors duration-300`}
              >
                {darkMode ? <Sun size={16} className={`sm:size-5 ${theme.accent}`} strokeWidth={1.5} /> : <Moon size={16} className={`sm:size-5 ${theme.accent}`} strokeWidth={1.5} />}
              </motion.button>
              <div className={`w-px h-3 sm:h-4 ${darkMode ? 'bg-[#3d3428]' : 'bg-[#c4b8a3]'}`} />
              <motion.a
                href="#pembuka"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                className={`p-2 sm:p-3 rounded-full ${darkMode ? 'hover:bg-[#2a2520]' : 'hover:bg-[#e0d9cc]'} transition-colors duration-300`}
              >
                <Compass size={16} className={`sm:size-5 ${theme.textMuted}`} strokeWidth={1.5} />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
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
              className={`fixed left-0 top-0 bottom-0 w-full xs:w-80 sm:w-[420px] ${theme.sidebar} z-50 overflow-y-auto shadow-2xl`}
            >
              <div className="pt-16 sm:pt-24 md:pt-28 p-4 sm:p-6 md:p-8 lg:p-10">
                <div className="flex items-center justify-between mb-6 sm:mb-10">
                  <div className="flex items-center gap-2 sm:gap-4">
                    <div className={`p-2 sm:p-3 rounded-full border ${theme.accentBorder} ${theme.accentBg}`}>
                      <Flame size={18} className={`sm:size-6 ${theme.accent}`} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h2 className={`font-serif font-bold text-lg sm:text-xl ${theme.textHeading}`}>Daftar Isi</h2>
                      <p className={`text-xs sm:text-sm ${theme.textMuted} font-serif italic`}>Tentang yang Terbakar</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSidebarOpen(false)}
                    className={`p-2 sm:p-3 rounded-full ${darkMode ? 'hover:bg-[#2a2520]' : 'hover:bg-[#d4cfc4]'} transition-colors duration-300`}
                  >
                    <X size={18} className={`sm:size-6 ${theme.textMuted}`} strokeWidth={1.5} />
                  </button>
                </div>

                <div className={`mb-6 sm:mb-8 p-3 sm:p-5 rounded-xl sm:rounded-2xl ${theme.card} border ${theme.border}`}>
                  <div className="flex justify-between items-center mb-2 sm:mb-3">
                    <span className={`text-xs sm:text-sm ${theme.textMuted} font-serif`}>Progress Membaca</span>
                    <span className={`text-xs sm:text-sm font-serif ${theme.accent}`}>
                      {Math.round((completedChapters.length / chapters.length) * 100)}%
                    </span>
                  </div>
                  <div className={`w-full h-[3px] rounded-full ${darkMode ? 'bg-[#2a2520]' : 'bg-[#d4cfc4]'}`}>
                    <motion.div 
                      className={`h-full rounded-full ${darkMode ? 'bg-[#c9a66b]' : 'bg-[#8b4513]'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(completedChapters.length / chapters.length) * 100}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <nav className="space-y-1 pb-16 sm:pb-20">
                  {chapters.map((chapter, idx) => {
                    const isCompleted = isChapterCompleted(chapter.num);
                    const isActive = activeChapter === chapter.num;
                    
                    return (
                      <motion.a
                        key={chapter.num}
                        href={chapter.num === 0 ? "#pembuka" : chapter.num === 6 ? "#penutup" : `#bab-${chapter.num}`}
                        onClick={() => setSidebarOpen(false)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05, type: "spring", stiffness: 100 }}
                        className={`group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl text-xs sm:text-sm transition-all duration-300 ${
                          isActive 
                            ? `${theme.accentBg} ${theme.accent} font-semibold border ${theme.accentBorder}` 
                            : isCompleted
                              ? `${theme.card} ${theme.text} border ${theme.border}`
                              : `${theme.textMuted} hover:${theme.text} hover:bg-[${darkMode ? '#2a2520' : '#e0d9cc'}]`
                        }`}
                      >
                        <span className={`text-base sm:text-lg font-serif font-bold flex-shrink-0 w-6 sm:w-8 text-center ${
                          isCompleted 
                            ? theme.accent
                            : isActive 
                              ? theme.accent 
                              : theme.textMuted
                        }`}>
                          {isCompleted ? <Feather size={14} className="sm:size-5" strokeWidth={2} /> : chapter.num === 0 ? 'P' : chapter.num === 6 ? 'E' : ['I', 'II', 'III', 'IV', 'V'][chapter.num - 1]}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className={`font-serif font-medium text-sm sm:text-base truncate ${isActive ? theme.textHeading : isCompleted ? theme.textHeading : theme.text}`}>
                            {chapter.title}
                          </p>
                          <p className={`text-xs mt-1 truncate ${theme.textMuted} font-serif italic`}>{chapter.subtitle}</p>
                        </div>
                        {isActive && <ChevronRight size={16} className="sm:size-5" strokeWidth={2} />}
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
      <main className="min-h-screen pt-0 pb-24 sm:pb-32 font-serif antialiased relative z-10">
        
        {/* HERO SECTION */}
        <motion.section 
          id="pembuka"
          data-chapter={0}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className={`relative flex items-center justify-center px-4 sm:px-6 lg:px-12 ${theme.bg} border-b ${theme.border} min-h-screen`}
        >
          <div className={`absolute inset-0 bg-gradient-to-b ${theme.gradientFrom} ${theme.gradientTo} opacity-60`} />
          
          <div className="max-w-3xl mx-auto w-full pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-24 relative z-10 text-center">
            <motion.div 
              initial={prefersReducedMotion ? { scale: 1 } : { scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="mb-16"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full ${theme.accentBg} border ${theme.accentBorder} mb-8 sm:mb-10`}>
                <Flame size={24} className={`sm:size-8 ${theme.accent}`} strokeWidth={1} />
              </div>
              
              <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${theme.textHeading} mb-6 sm:mb-8 tracking-tight leading-[1.1] font-serif`}>
                CAHAYA<br />
                <span className={`${theme.ember} italic font-light`}>ITU</span>
              </h1>
              
              <p className={`text-lg sm:text-xl md:text-2xl ${theme.textSubheading} italic mb-8 sm:mb-10 font-serif font-light tracking-wide max-w-2xl mx-auto leading-relaxed`}>
                Sebuah Pengakuan tentang yang Terbakar hingga Padam
              </p>

              <div className={`w-24 sm:w-32 h-[1px] mx-auto ${darkMode ? 'bg-[#c9a66b]/50' : 'bg-[#8b4513]/50'} mb-8 sm:mb-10`} />
              
              <p className={`text-base sm:text-lg ${theme.textMuted} max-w-2xl mx-auto leading-[1.8] font-serif`}>
                "Badan bau keringat. Dia pulang jam dua. Bukan karena lembur. 
                Tapi karena di rumahnya, tidak ada yang menunggu."
              </p>
            </motion.div>

            <motion.div 
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <button
                onClick={() => setSidebarOpen(true)}
                className={`inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full ${theme.accentBg} ${theme.accent} font-serif border ${theme.accentBorder} hover:shadow-lg transition-all duration-500 tracking-wide text-xs sm:text-sm uppercase`}
              >
                <BookOpen size={16} className="sm:size-5" strokeWidth={1.5} />
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
              <div className={`w-[2px] h-2 rounded-full ${darkMode ? 'bg-[#c9a66b]' : 'bg-[#8b4513]'}`} />
            </div>
          </motion.div>
        </motion.section>

        {/* Content Container */}
        <div className="px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="max-w-2xl mx-auto py-16 sm:py-20 md:py-24">
            
            {/* PEMBUKA */}
            <motion.section 
              id="pembuka"
              data-chapter={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="mb-40 scroll-mt-24"
            >
              <div className={`mb-12 sm:mb-16 pb-6 sm:pb-8 border-b ${theme.border}`}>
                <span className={`text-xs font-bold tracking-[0.3em] ${theme.accent} uppercase font-serif`}>Pembuka</span>
                <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${theme.textHeading} mt-4 font-serif leading-tight`}>Badan Bau Keringat</h2>
              </div>

              <motion.div variants={staggerContainer} className="space-y-6 sm:space-y-8">
                <motion.p variants={lineReveal} className={`${theme.text} text-base sm:text-lg leading-[1.8] sm:leading-[1.9] first-letter:text-4xl sm:first-letter:text-6xl first-letter:${theme.accent} first-letter:font-bold first-letter:mr-3 sm:first-letter:mr-4 first-letter:float-left first-letter:leading-none first-letter:mt-2`}>
                  Badan bau keringat. Dia pulang jam dua. Bukan karena lembur. Tapi karena di rumahnya, tidak ada yang menunggu.
                </motion.p>
                
                <motion.p variants={lineReveal} className={`${theme.text} text-lg leading-[1.9]`}>
                  Meja penuh berkas. Kopi dingin. Dia tidak minum. Dia hanya memandanginya, berpikir: setidaknya aku berguna untuk sesuatu.
                </motion.p>

                {/* Quote Block */}
                <motion.div variants={fadeIn} className={`my-12 sm:my-16 p-6 sm:p-8 ${theme.quoteBg} border-l-4 ${theme.quoteBorder} relative`}>
                  <Quote size={32} className="sm:size-10 ${theme.accent} opacity-20 absolute top-3 sm:top-4 right-3 sm:right-4" />
                  <p className={`${theme.textHeading} text-xl sm:text-2xl md:text-3xl font-serif italic leading-relaxed text-center`}>
                    "Aku baik-baik saja."
                  </p>
                </motion.div>

                <motion.p variants={lineReveal} className={`${theme.text} text-lg leading-[1.9]`}>
                  Lututnya bergetar. Tapi getaran itu tidak terlihat. Dia sudah terlalu ahli menjadi fondasi. Terlalu lama berlatih menjadi dinding yang tidak berhak retak.
                </motion.p>
              </motion.div>
            </motion.section>

            {/* BAB I — BOCAH ITU */}
            <motion.section 
              id="bab-1"
              data-chapter={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="mb-40 scroll-mt-24"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6 mb-12 sm:mb-16 pb-6 sm:pb-8 border-b ${theme.border}`}>
                <span className={`text-6xl sm:text-8xl md:text-9xl font-black ${theme.romanColor} opacity-40 leading-none font-serif`}>I</span>
                <div className="flex-1">
                  <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${theme.textHeading} mb-2 sm:mb-3 font-serif leading-tight`}>Bocah Itu</h2>
                  <p className={`text-base sm:text-lg ${theme.textMuted} italic font-serif`}>Tentang yang Tidak Pernah Jatuh Cinta</p>
                </div>
              </div>

              <motion.div variants={staggerContainer} className="space-y-8">
                <motion.p variants={lineReveal} className={`${theme.text} text-lg leading-[1.9]`}>
                  Dia tidak pernah jatuh cinta.
                </motion.p>

                <motion.p variants={lineReveal} className={`${theme.text} text-lg leading-[1.9]`}>
                  Bukan karena tidak ada yang suka. Tapi karena waktu seseorang mendekat dengan lembut, dia panik. Dia pikir, kalau aku berbaring di pelukanmu, siapa yang akan menjaga pintu? Siapa yang akan menahan langit supaya tidak runtuh menimpa semua orang yang kita cintai?
                </motion.p>

                <motion.p variants={lineReveal} className={`${theme.text} text-lg leading-[1.9]`}>
                  Jadi dia tolak dengan senyum yang terlalu ramah. Dengan alasan yang terlalu masuk akal. Lalu kembali ke kamarnya yang kecil. Meja penuh masalah orang lain. Kopi sudah dingin. Dia tidak minum. Dia hanya memandanginya, berpikir: setidaknya aku berguna untuk sesuatu. Setidaknya aku masih dibutuhkan.
                </motion.p>

                {/* Highlight Card */}
                <motion.div variants={fadeIn} className={`my-8 sm:my-12 p-4 sm:p-6 ${theme.accentBg} ${theme.accentBorder} border-2 rounded-lg`}>
                  <p className={`${theme.text} text-base sm:text-lg leading-[1.7] sm:leading-[1.8] font-serif italic`}>
                    Cinta adalah kemewahan yang tidak bisa dia bayar. Seluruh tabungannya habis untuk membeli ketenangan bagi orang-orang yang tidak pernah bertanya, <span className={theme.accent}>bagaimana denganmu?</span>
                  </p>
                </motion.div>

                <motion.p variants={lineReveal} className={`${theme.text} text-lg leading-[1.9]`}>
                  Orang-orang yang menerima cahayanya dengan nyaman, tanpa pernah melihat bagaimana api itu memakan dirinya sendiri.
                </motion.p>

                <motion.p variants={lineReveal} className={`${theme.text} text-lg leading-[1.9]`}>
                  Dia belajar bahwa dicintai berarti harus bisa memberi. Dan dia sudah tidak punya apa-apa selain tulang-tulangnya yang dipaksa berdiri. Jadi dia menolak cinta. Bukan karena tidak menginginkannya, tapi karena dia tahu, dengan kepastian yang menghancurkan, bahwa dia tidak punya apa-apa untuk diberikan. Dia sudah memberikan segalanya kepada mereka, kepada rakyatnya, kepada tujuan yang lebih besar, kepada mimpi siang bolong yang haus akan pengorbanan.
                </motion.p>
              </motion.div>
            </motion.section>

            {/* BAB II — YANG MENAWAN */}
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
                  <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${theme.textHeading} mb-3 font-serif leading-tight`}>Yang Menawan</h2>
                  <p className={`text-lg ${theme.textMuted} italic font-serif`}>Estetika dalam Kehancuran</p>
                </div>
              </div>

              <motion.div variants={staggerContainer} className="space-y-8">
                <motion.div variants={lineReveal} className={`p-6 ${theme.card} border ${theme.border} rounded-lg`}>
                  <p className={`${theme.textHeading} text-xl font-serif italic`}>
                    Kamu bilang dia menginspirasi?
                  </p>
                </motion.div>

                <motion.p variants={lineReveal} className={`${theme.text} text-lg leading-[1.9]`}>
                  Dia menawan karena sudah mati di bagian dalam. Tapi cahaya dari bangkai itu membuatnya tampak hidup. Berkilau. Pahlawan. Seolah-olah kehancuran yang teratur adalah bentuk seni yang paling tinggi.
                </motion.p>

                <motion.p variants={lineReveal} className={`${theme.text} text-lg leading-[1.9]`}>
                  Kamu duduk di sekitarnya untuk menghangatkan tangan. Kamu membaca buku tentang filsafat penderitaan. Kamu tidak sadar bahwa kayu bakar itu adalah tulang-tulangnya sendiri. Kamu tidak sadar bahwa setiap tawa yang kamu dengar darinya adalah bunyi dari balok-balok fondasi yang sedang patah.
                </motion.p>

                {/* Brutal Quote */}
                <motion.div variants={fadeIn} className={`my-12 p-8 ${darkMode ? 'bg-[#1a1612]' : 'bg-white'} border-2 ${theme.border} shadow-xl rounded-lg relative overflow-hidden`}>
                  <div className={`absolute -left-1 top-0 bottom-0 w-1 ${darkMode ? 'bg-[#c9a66b]/60' : 'bg-[#8b4513]/60'}`} />
                  <p className={`${theme.textMuted} text-sm uppercase tracking-widest mb-4`}>Yang Tidak Tersadari</p>
                  <p className={`${theme.textHeading} text-xl md:text-2xl font-serif leading-relaxed`}>
                    Ada estetika dalam keterbatasan yang heroik. Ada romansa dalam penderitaan yang disangkal. Kita menyukai melihat sesuatu yang indah sedang hancur karena itu memvalidasi kerapuhan kita sendiri.
                  </p>
                </motion.div>

                <motion.p variants={lineReveal} className={`${theme.text} text-lg leading-[1.9]`}>
                  Ketika seseorang yang begitu sempurna, begitu kuat, begitu terang, akhirnya menunjukkan retakannya, kita merasa lega. <em>Ah, jadi dia juga manusia.</em>
                </motion.p>

                <motion.p variants={lineReveal} className={`${theme.text} text-lg leading-[1.9] ${theme.ember} font-medium`}>
                  Tapi bagi yang sedang hancur, validasi ini adalah penghinaan terakhir. Dia tidak hancur untuk menjadi objek estetika. Dia hancur karena dia habis. Dan fakta bahwa kehancurannya indah hanya menunjukkan betapa salahnya dunia, bahwa bahkan penderitaan pun harus diproduksi dengan cara yang menarik untuk dikonsumsi.
                </motion.p>

                <motion.p variants={lineReveal} className={`${theme.text} text-lg leading-[1.9]`}>
                  Paling sakit bukan saat dia padam. Paling sakit saat kita baru sadar setelah dia dingin. Saat kita menemukan draft-draft email yang tidak pernah terkirim. Saat kita menemukan kertas-kertas di saku jaketnya yang bau rokok dan kopi dingin. Saat kita baru mengerti bahwa senyumnya yang terlalu ramah itu adalah bentuk terakhir dari seseorang yang sudah lupa cara menjadi tidak ramah.
                </motion.p>
              </motion.div>
            </motion.section>

            {/* BAB III — PISAU ITU */}
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
                  <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${theme.textHeading} mb-3 font-serif leading-tight`}>Pisau Itu</h2>
                  <p className={`text-lg ${theme.textMuted} italic font-serif`}>Idealisme yang Mengiris</p>
                </div>
              </div>

              <motion.div variants={staggerContainer} className="space-y-8">
                <motion.p variants={lineReveal} className={`${theme.text} text-lg leading-[1.9]`}>
                  Setiap pagi dia bangun. Mengiris sedikit demi sedikit. Impiannya yang pernah ingin jadi anak biasa. Yang pernah ingin nangis tanpa malu. Yang pernah ingin jatuh cinta seperti orang gila tanpa hitung-hitungan dampak sosial.
                </motion.p>

                <motion.p variants={lineReveal} className={`${theme.text} text-lg leading-[1.9]`}>
                  Sekarang, sisa-sisa irisan itu habis. Yang tersisa hanya tulang. Cahaya yang menyilaukan tapi membekukan. Struktur yang kokoh tapi kosong.
                </motion.p>

                {/* Poetic Block */}
                <motion.div variants={fadeIn} className={`my-12 pl-8 border-l-2 ${theme.quoteBorder}`}>
                  <p className={`${theme.textMuted} text-lg leading-[1.9] italic font-serif`}>
                    Dia bilang, aku memikul langit demi rakyatku. Tapi tidak ada yang memintanya. Tidak ada yang menuntutnya. Dia yang menuntut dari dirinya sendiri. Dia yang menetapkan standar yang mustahil. Dia yang menjadi penjaga dan tahanan dalam penjara yang dia bangun sendiri, dengan kunci yang dia lempar ke lautan yang tidak pernah dia kunjungi karena terlalu sibuk menahan langit.
                  </p>
                </motion.div>

                <motion.p variants={lineReveal} className={`${theme.text} text-lg leading-[1.9]`}>
                  Idealismenya adalah pisau dapur yang tumpul. Bukan membunuh cepat. Tapi mengiris sedikit demi sedikit. Setiap hari. Setiap pagi. Setiap kali dia berkata <em>aku baik-baik saja</em> sambil mengabaikan getaran di lututnya. Setiap kali dia menelan kata-kata yang seharusnya keluar. Setiap kali dia memilih untuk menjadi fondasi lagi, lagi, dan lagi.
                </motion.p>

                <motion.div variants={fadeIn} className={`p-8 ${theme.accentBg} ${theme.accentBorder} border-2 rounded-lg my-12`}>
                  <p className={`${theme.textHeading} text-lg leading-[1.8] font-serif`}>
                    Ada keadilan pahit di sini. Pembangun ini, mereka yang mengorbankan integritas emosional demi struktur fisik, mereka sering kali tidak hidup cukup lama untuk melihat kota selesai dibangun. Mereka mati di tengah proyek, di tengah jalan, di tengah usaha. Bukan karena mereka lemah. Tapi karena mereka telah menukarkan semua hidup mereka dengan fungsi.
                  </p>
                </motion.div>
              </motion.div>
            </motion.section>

            {/* BAB IV — MALAM ITU */}
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
                  <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${theme.textHeading} mb-3 font-serif leading-tight`}>Malam Itu</h2>
                  <p className={`text-lg ${theme.textMuted} italic font-serif`}>Draft yang Tidak Terkirim</p>
                </div>
              </div>

              <motion.div variants={staggerContainer} className="space-y-8">
                <motion.p variants={lineReveal} className={`${theme.text} text-lg leading-[1.9]`}>
                  Dia sendirian. Tidak ada yang mengirim pesan. Semua orang mengira dia sedang menyelamatkan dunia lagi. Dan dia memang sedang menyelamatkan, tapi kali ini, dirinya yang tenggelam di antara draft email yang tidak pernah terkirim.
                </motion.p>

                {/* Draft Emails Visual */}
                <motion.div variants={fadeIn} className={`my-12 space-y-4`}>
                  {[
                    { text: "Maaf, aku lelah.", deleted: true },
                    { text: "Bolehkah aku berhenti sejenak?", deleted: true },
                    { text: "Ada yang mencintaiku tanpa harus aku jadi pahlawan?", deleted: true }
                  ].map((draft, idx) => (
                    <motion.div 
                      key={idx}
                      variants={lineReveal}
                      className={`p-6 ${theme.card} border ${theme.border} rounded-lg relative overflow-hidden`}
                    >
                      <p className={`${theme.textMuted} text-lg italic ${draft.deleted ? 'line-through opacity-50' : ''}`}>
                        {draft.text}
                      </p>
                      <span className={`absolute top-2 right-2 text-xs ${theme.accent} uppercase tracking-wider`}>Draft</span>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.p variants={lineReveal} className={`${theme.text} text-lg leading-[1.9]`}>
                  Dia simpan semua draft itu di folder bernama <span className={theme.accent}>sampah</span>. Karena memang itulah dirinya di mata dunianya: sampah yang berguna. Sampah yang bersinar. Sampah yang tidak boleh berhenti bersinar karena gelapnya terlalu mencekam kalau dia padam.
                </motion.p>

                <motion.p variants={lineReveal} className={`${theme.text} text-lg leading-[1.9]`}>
                  Malam itu panjang. Bukan karena waktu berjalan lambat. Tapi karena dia terlalu sibuk menghitung. Menghitung berapa banyak orang yang masih membutuhkannya. Menghitung berapa lama lagi dia bisa bertahan sebelum tulang-tulangnya benar-benar patah. Menghitung apakah ada yang akan sadar kalau dia tidak bangun besok.
                </motion.p>

                <motion.p variants={lineReveal} className={`${theme.text} text-lg leading-[1.9] ${theme.ember}`}>
                  Dia tidak menemukan jawaban. Dia hanya menemukan keheningan yang begitu berat, seolah-olah udara di kamarnya sudah menjadi cairan yang membuatnya sulit bernapas.
                </motion.p>

                <motion.p variants={lineReveal} className={`${theme.text} text-lg leading-[1.9]`}>
                  Dia berdiri di depan cermin. Melihat wajah yang begitu asing. Wajah yang terlatih begitu rapi untuk menjadi tenang, menjadi kuat, menjadi pahlawan. Wajah yang tidak lagi mengenal dirinya sendiri. Dia mencoba menangis. Otot-ototnya bekerja. Tapi air mata tidak keluar. Sudah terlalu lama sumur itu dikeringkan untuk menyiram kebun orang lain.
                </motion.p>
              </motion.div>
            </motion.section>

            {/* BAB V — RATAPAN ITU */}
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
                  <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${theme.textHeading} mb-3 font-serif leading-tight`}>Ratapan Itu</h2>
                  <p className={`text-lg ${theme.textMuted} italic font-serif`}>Saat Dunia Baru Sadar</p>
                </div>
              </div>

              <motion.div variants={staggerContainer} className="space-y-8">
                <motion.p variants={lineReveal} className={`${theme.text} text-lg leading-[1.9]`}>
                  Di saat-saat terakhir, bukan air mata biasa yang keluar.
                </motion.p>

                <motion.p variants={lineReveal} className={`${theme.text} text-lg leading-[1.9] ${theme.ember} font-medium`}>
                  Tapi segala sesuatu yang telah dia tahan selama bertahun-tahun. Air mata yang keluar bersama darah. Bersama usus. Bersama kehancuran total dari seseorang yang telah menjadi terlalu banyak orang, hingga dirinya asli adalah orang asing.
                </motion.p>

                <motion.div variants={fadeIn} className={`my-12 text-center p-10 ${theme.accentBg} ${theme.accentBorder} border-2 rounded-lg`}>
                  <p className={`${theme.textHeading} text-2xl md:text-3xl font-serif italic leading-relaxed mb-4`}>
                    Dunia baru sadar.
                  </p>
                  <p className={`${theme.accent} text-xl font-serif italic`}>
                    Oh. Dia ternyata manusia.
                  </p>
                </motion.div>

                <motion.p variants={lineReveal} className={`${theme.text} text-lg leading-[1.9]`}>
                  Tapi sudah terlambat. Cahaya itu sudah padam. Dan sekarang kamu duduk di kegelapan yang ditinggalkannya, menyesali kenapa tidak bertanya lebih keras waktu dia bilang, <em>aku baik-baik saja</em>. Kenapa tidak tarik lengannya dan bilang, <span className={theme.accent}>tidak, kamu tidak baik-baik saja, dan itu tidak apa-apa. Jatuhlah. Biarkan langit itu runtuh. Biarkan kami hancur bersamamu. Tapi tolong, tolong jangan jadi cahaya lagi.</span>
                </motion.p>

                <motion.p variants={lineReveal} className={`${theme.text} text-lg leading-[1.9]`}>
                  Di penguburannya, orang-orang berkata, <em>dia adalah orang baik.</em> Bukan, dia adalah orang yang pernah ketawa terbahak-bahak. Bukan, dia pernah jatuh cinta seperti orang bodoh. Tapi, <span className={theme.textMuted}>dia adalah orang baik.</span> Seolah kebaikan adalah satu-satunya identitas yang tersisa dari seseorang yang telah menjual seluruh dirinya untuk menjadi pupuk bagi kehidupan orang lain.
                </motion.p>
              </motion.div>
            </motion.section>

            {/* PENUTUP */}
            <motion.section 
              id="penutup"
              data-chapter={6}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="mb-40 scroll-mt-24"
            >
              <div className={`mb-16 pb-8 border-b ${theme.border}`}>
                <span className={`text-xs font-bold tracking-[0.3em] ${theme.accent} uppercase font-serif`}>Penutup</span>
                <h2 className={`text-4xl sm:text-5xl font-bold ${theme.textHeading} mt-4 font-serif leading-tight`}>Jangan Jadi Cahaya</h2>
              </div>

              <motion.div variants={staggerContainer} className="space-y-10">
                <motion.p variants={lineReveal} className={`${theme.text} text-xl md:text-2xl leading-[1.8] font-serif text-center`}>
                  Jangan jadi cahaya.
                </motion.p>

                <motion.p variants={lineReveal} className={`${theme.text} text-lg leading-[1.9] text-center max-w-2xl mx-auto`}>
                  Jadi saja lilin yang berkedip-kedip. Yang getir. Yang hampir padam tiap angin. Tapi hangat. Hangat di tangan yang dekat. Jadi saja lampu tidur yang redup. Yang cukup untuk satu kamar saja. Untuk satu tubuh saja. Untuk satu hati saja.
                </motion.p>

                <motion.div variants={fadeIn} className={`my-16 p-10 ${theme.highlight} border-2 ${theme.accentBorder} rounded-xl text-center`}>
                  <p className={`${theme.textHeading} text-2xl md:text-3xl font-serif italic leading-relaxed mb-6`}>
                    Jangan menyangga langit.
                  </p>
                  <p className={`${theme.accent} text-xl font-serif italic mb-6`}>
                    Biarkan runtuh.
                  </p>
                  <div className={`w-24 h-px ${darkMode ? 'bg-[#c9a66b]/50' : 'bg-[#8b4513]/50'} mx-auto`} />
                </motion.div>

                <motion.p variants={lineReveal} className={`${theme.text} text-lg leading-[1.9] text-center max-w-2xl mx-auto`}>
                  Sebab yang seharusnya kita pikul bukan langit. Tapi hanya diri kita sendiri, dan itu sudah cukup berat. <span className={`${theme.accent} font-medium text-xl`}>Itu sudah cukup. Sudah cukup. Sudah cukup.</span>
                </motion.p>

                {/* Final Note */}
                <motion.div variants={fadeIn} className={`mt-20 pt-12 border-t-2 ${theme.border} ${theme.accentBorder}`}>
                  <div className="max-w-xl mx-auto">
                    <p className={`${theme.textMuted} text-sm leading-[1.9] mb-6`}>
                      Di saku jaket bekasnya, kertas bau rokok dan kopi dingin. Tulisannya tidak rapi. Ada noda yang mungkin air, mungkin sesuatu yang lain.
                    </p>
                    
                    <div className={`p-6 ${theme.card} border ${theme.border} rounded-lg mb-6`}>
                      <p className={`${theme.textMuted} text-sm italic mb-4`}>Di baliknya, gambar kecil: bocah kecil sedang berdiri di bawah hujan, memegang payung besar untuk orang lain, sementara dirinya sendiri basah kuyup.</p>
                      <p className={`${theme.textMuted} text-xs uppercase tracking-wider`}>Di pojok, tulisan yang lebih tidak rapi lagi:</p>
                    </div>

                    <blockquote className={`${theme.ember} text-lg md:text-xl font-serif italic leading-relaxed text-center border-l-4 ${theme.quoteBorder} pl-6 py-4`}>
                      "Aku lelah jadi pelita. Aku ingin jadi abu saja. Abu yang hangat sebentar, lalu dingin, lalu pergi, tanpa harus menerangi siapa-siapa lagi."
                    </blockquote>

                    <div className="mt-10 text-center">
                      <p className={`${theme.accent} text-sm uppercase tracking-[0.3em]`}>Selesai</p>
                    </div>
                  </div>
                </motion.div>

                {/* Author Note */}
                <motion.div variants={fadeIn} className={`mt-16 pt-8 border-t ${theme.border} text-center`}>
                  <Wind size={24} className={`${theme.accent} mx-auto mb-4 opacity-50`} />
                  <p className={`${theme.textMuted} text-sm italic leading-[1.8]`}>
                    Ditulis setelah melihat seseorang padam, di malam yang tidak yakin ingin dihabiskan, oleh tubuh yang ingin rebah tapi masih memaksa mengingat.
                  </p>
                </motion.div>
              </motion.div>
            </motion.section>

          </div>
        </div>
      </main>
    </div>
  );
}
