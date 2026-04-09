'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Moon, Sun, BookOpen, Coffee, ChevronRight, X, BookMarked, Compass, Check, ArrowRight, PenLine } from 'lucide-react';
import { useTheme } from "@/src/components/ThemeProvider";
import Link from 'next/link';

export default function CoffeeBookPage() {
  const { theme: globalTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState(1);
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);
  
  // FIX: Hooks di top level
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
      let currentChapter = 1;
      const newlyCompleted: number[] = [];
      
      chapters.forEach((chapter, index) => {
        const rect = chapter.getBoundingClientRect();
        const chapterNum = Number(chapter.getAttribute('data-chapter'));
        
        if (rect.top < window.innerHeight * 0.5) {
          newlyCompleted.push(chapterNum);
        }
        
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentChapter = chapterNum;
        }
      });
      
      setActiveChapter(currentChapter);
      // ✅ FIX: Gunakan Array.from() untuk convert Set ke array
      setCompletedChapters(prev => Array.from(new Set([...prev, ...newlyCompleted])));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mounted]);

  if (!mounted) return null;

  const darkMode = globalTheme === 'dark';

  const theme = darkMode ? {
    bg: 'bg-[#0a0a0a]',
    text: 'text-neutral-300',
    textMuted: 'text-neutral-500',
    textHeading: 'text-neutral-100',
    textSubheading: 'text-neutral-400',
    border: 'border-neutral-800',
    accent: 'text-amber-500',
    accentBg: 'bg-amber-950/30',
    accentBorder: 'border-amber-800/50',
    sidebar: 'bg-[#0f0f0f]',
    code: 'bg-neutral-900',
    highlight: 'bg-amber-950/20',
    card: 'bg-neutral-900/40',
    float: 'bg-neutral-900/90'
  } : {
    bg: 'bg-[#fafaf9]',
    text: 'text-stone-700',
    textMuted: 'text-stone-500',
    textHeading: 'text-stone-900',
    textSubheading: 'text-stone-600',
    border: 'border-stone-200',
    accent: 'text-amber-700',
    accentBg: 'bg-amber-100/60',
    accentBorder: 'border-amber-300',
    sidebar: 'bg-white',
    code: 'bg-stone-100',
    highlight: 'bg-amber-50/80',
    card: 'bg-white',
    float: 'bg-white/90'
  };

  const chapters = [
    { num: 1, title: "Coffee Species", subtitle: "Arabica vs Robusta, Genus Coffea" },
    { num: 2, title: "Coffee Processing", subtitle: "Washed, Natural, Honey, Fermentasi" },
    { num: 3, title: "Roast Level & Flavor", subtitle: "Maillard, Karamelisasi, Crack" },
    { num: 4, title: "Grind Size & Extraction", subtitle: "Partikel, Fines, Boulders" },
    { num: 5, title: "Espresso Fundamentals", subtitle: "9 Bar, 25-30s, 1:2 Ratio" },
    { num: 6, title: "Taste & Sensory Science", subtitle: "Taste, Smell, Mouthfeel" },
    { num: 7, title: "Manual Brew Methods", subtitle: "V60, French Press, Aeropress" },
    { num: 8, title: "Water Chemistry", subtitle: "TDS, Magnesium, Kalsium" },
    { num: 9, title: "Extraction Yield", subtitle: "EY 18-22%, TDS Control" },
    { num: 10, title: "Milk Science", subtitle: "Protein, Microfoam, Latte Art" },
    { num: 11, title: "Cafe Workflow", subtitle: "Speed, Consistency, Multi-tasking" },
    { num: 12, title: "Professional Mindset", subtitle: "Etika, Dedikasi, Manifesto Barista" },
  ];

  const fadeIn = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const isChapterCompleted = (num: number) => completedChapters.includes(num);

  return (
    <div className={`${theme.bg} ${theme.text} transition-colors duration-500`}>
      
      {/* Reading Progress Bar - Top */}
      <div className={`fixed top-0 left-0 right-0 h-1 z-40 ${darkMode ? 'bg-neutral-800' : 'bg-stone-200'}`}>
        <motion.div 
          className={`h-full ${theme.accent.replace('text-', 'bg-')}`}
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Floating Bottom Left Navigation */}
      <AnimatePresence>
        {showFloatingMenu && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { x: -100, opacity: 0 }}
            className={`fixed bottom-6 left-6 z-40 flex flex-col gap-3`}
          >
            <motion.button
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              onClick={() => setSidebarOpen(true)}
              className={`flex items-center gap-3 px-5 py-3 rounded-2xl ${theme.float} backdrop-blur-xl border ${theme.border} shadow-2xl ${theme.accent} font-medium`}
            >
              <BookMarked size={20} />
              <span className="hidden sm:inline">Daftar Isi</span>
              <span className="sm:hidden">Menu</span>
              <div className={`flex items-center gap-2 ml-2 pl-2 border-l ${theme.border}`}>
                <span className={`text-xs font-mono ${theme.textMuted}`}>
                  {String(activeChapter).padStart(2, '0')}/{chapters.length}
                </span>
              </div>
            </motion.button>

            <div className={`flex items-center gap-2 p-2 rounded-2xl ${theme.float} backdrop-blur-xl border ${theme.border} shadow-2xl w-fit`}>
              <motion.button
                whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                onClick={toggleTheme}
                className={`p-3 rounded-xl ${darkMode ? 'hover:bg-neutral-800' : 'hover:bg-stone-200'} transition-colors`}
              >
                {darkMode ? <Sun size={20} className={theme.accent} /> : <Moon size={20} className={theme.accent} />}
              </motion.button>

              <div className={`w-px h-6 ${darkMode ? 'bg-neutral-700' : 'bg-stone-300'}`} />

              <motion.a
                href="#bab-1"
                whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                className={`p-3 rounded-xl ${darkMode ? 'hover:bg-neutral-800' : 'hover:bg-stone-200'} transition-colors`}
              >
                <Compass size={20} className={theme.textMuted} />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Navigation dengan Progress & Checkmarks */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`fixed left-0 top-0 bottom-0 w-full sm:w-[480px] ${theme.sidebar} z-50 overflow-y-auto shadow-2xl`}
            >
              <div className="pt-28 sm:pt-32 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${theme.accentBg} border ${theme.accentBorder}`}>
                      <Coffee size={24} className={theme.accent} />
                    </div>
                    <div>
                      <h2 className={`font-bold text-lg ${theme.textHeading}`}>Daftar Isi</h2>
                      <p className={`text-sm ${theme.textMuted}`}>{chapters.length} Bab Lengkap</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSidebarOpen(false)}
                    className={`p-3 rounded-xl ${darkMode ? 'hover:bg-neutral-800' : 'hover:bg-stone-100'} transition-colors`}
                  >
                    <X size={24} className={theme.textMuted} />
                  </button>
                </div>

                {/* Progress Overview */}
                <div className={`mb-6 p-4 rounded-xl ${theme.card} border ${theme.border}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm ${theme.textMuted}`}>Progress Membaca</span>
                    <span className={`text-sm font-bold ${theme.accent}`}>
                      {Math.round((completedChapters.length / chapters.length) * 100)}%
                    </span>
                  </div>
                  <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-neutral-800' : 'bg-stone-200'}`}>
                    <div 
                      className={`h-full rounded-full ${theme.accent.replace('text-', 'bg-')}`}
                      style={{ width: `${(completedChapters.length / chapters.length) * 100}%` }}
                    />
                  </div>
                </div>

                <nav className="space-y-2 pb-20">
                  {chapters.map((chapter, idx) => {
                    const isCompleted = isChapterCompleted(chapter.num);
                    const isActive = activeChapter === chapter.num;
                    
                    return (
                      <motion.a
                        key={chapter.num}
                        href={`#bab-${chapter.num}`}
                        onClick={() => setSidebarOpen(false)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`group flex items-center gap-4 p-4 rounded-xl text-sm transition-all duration-300 ${
                          isActive 
                            ? `${theme.accentBg} ${theme.accent} font-semibold border ${theme.accentBorder}` 
                            : isCompleted
                              ? `${darkMode ? 'bg-green-950/20' : 'bg-green-50'} ${darkMode ? 'text-green-400' : 'text-green-700'} border ${darkMode ? 'border-green-900/30' : 'border-green-200'}`
                              : `${darkMode ? 'hover:bg-neutral-800/50' : 'hover:bg-stone-100'} ${theme.textMuted} hover:text-current`
                        }`}
                      >
                        <span className={`text-lg font-mono font-bold flex-shrink-0 w-8 text-center ${
                          isCompleted 
                            ? 'text-green-500' 
                            : isActive 
                              ? theme.accent 
                              : theme.textMuted
                        }`}>
                          {isCompleted ? <Check size={20} /> : String(chapter.num).padStart(2, '0')}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium text-base truncate ${isActive ? theme.textHeading : isCompleted ? theme.textHeading : theme.text}`}>
                            {chapter.title}
                          </p>
                          <p className={`text-xs mt-1 truncate ${theme.textMuted}`}>{chapter.subtitle}</p>
                        </div>
                        {isActive && (
                          <motion.div layoutId="activeIndicator">
                            <ChevronRight size={20} />
                          </motion.div>
                        )}
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
      <main className="pt-0 pb-20">
        {/* Hero Section dengan Human Touch */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className={`relative flex items-center justify-center px-6 sm:px-8 lg:px-12 ${theme.bg} border-b ${theme.border}`}
        >
          <div className="max-w-7xl mx-auto w-full pt-16 sm:pt-20 pb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.div 
                  initial={prefersReducedMotion ? { scale: 1 } : { scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${theme.accentBg} border ${theme.accentBorder} mb-8 shadow-xl`}
                >
                  <Coffee size={40} className={theme.accent} />
                </motion.div>
                
                <motion.h1 
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold ${theme.textHeading} mb-6 tracking-tight leading-[0.9]`}
                >
                  Coffee from<br />
                  <span className={theme.accent}>Bean to Cup</span>
                </motion.h1>
                
                <motion.p 
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className={`text-2xl sm:text-3xl ${theme.textSubheading} italic mb-4 font-light`}
                >
                  A Serious Guide
                </motion.p>
                
                <motion.p 
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className={`text-lg ${theme.textMuted} italic mb-4 max-w-xl leading-relaxed`}
                >
                  "Gue dulu mikir kopi cuma pahit. Sampai akhirnya ngerti — setiap cangkir punya cerita, dan setiap cerita punya makna."
                </motion.p>

                <motion.p 
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className={`text-lg ${theme.accent} font-medium mb-6 max-w-xl leading-relaxed`}
                >
                  Ini bukan cuma tentang kopi. Ini tentang cara lo melihat pekerjaan, dedikasi, dan makna di balik setiap hal kecil.
                </motion.p>
                
                <motion.p 
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className={`text-lg ${theme.textMuted} mb-8`}
                >
                  oleh <span className={`font-semibold ${theme.textHeading}`}>Wildan Ferdiansyah</span>
                </motion.p>

                <motion.div 
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className={`p-6 sm:p-8 rounded-2xl ${theme.card} border ${theme.border} shadow-lg max-w-2xl`}
                >
                  <p className={`text-lg leading-relaxed ${theme.text}`}>
                    Buku ini adalah panduan komprehensif tentang sains kopi, mulai dari biologi tanaman hingga teknik ekstraksi. 
                    Ditujukan untuk barista, roaster, dan pecinta kopi yang ingin memahami logika di balik setiap cangkir.
                  </p>
                </motion.div>

                <motion.div 
                  initial={prefersReducedMotion ? {} : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-12 flex items-center gap-4"
                >
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full ${theme.accentBg} ${theme.accent} font-semibold border ${theme.accentBorder} hover:shadow-lg transition-all`}
                  >
                    <BookOpen size={20} />
                    Mulai Membaca
                  </button>
                  <span className={`text-sm ${theme.textMuted}`}>atau scroll ke bawah</span>
                </motion.div>
              </div>

              <motion.div 
                initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="hidden lg:block relative"
              >
                <div className={`aspect-square rounded-3xl ${theme.card} border ${theme.border} p-8 shadow-2xl relative overflow-hidden`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${darkMode ? 'from-amber-500/10 to-transparent' : 'from-amber-200/50 to-transparent'}`} />
                  <div className="relative z-10 grid grid-cols-2 gap-4 h-full">
                    <div className={`rounded-2xl ${theme.code} p-6 flex flex-col justify-center`}>
                      <p className={`text-4xl font-bold ${theme.accent} mb-2`}>120+</p>
                      <p className={`text-sm ${theme.textMuted}`}>Spesies Coffea</p>
                    </div>
                    <div className={`rounded-2xl ${theme.code} p-6 flex flex-col justify-center`}>
                      <p className={`text-4xl font-bold ${theme.accent} mb-2`}>9 Bar</p>
                      <p className={`text-sm ${theme.textMuted}`}>Tekanan Espresso</p>
                    </div>
                    <div className={`rounded-2xl ${theme.code} p-6 flex flex-col justify-center`}>
                      <p className={`text-4xl font-bold ${theme.accent} mb-2`}>18-22%</p>
                      <p className={`text-sm ${theme.textMuted}`}>Extraction Yield</p>
                    </div>
                    <div className={`rounded-2xl ${theme.code} p-6 flex flex-col justify-center`}>
                      <p className={`text-4xl font-bold ${theme.accent} mb-2`}>93°C</p>
                      <p className={`text-sm ${theme.textMuted}`}>Suhu Ideal</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div 
            animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`absolute bottom-8 left-1/2 -translate-x-1/2 ${theme.textMuted}`}
          >
            <div className={`w-6 h-10 rounded-full border-2 ${theme.border} flex justify-center pt-2`}>
              <div className={`w-1 h-2 rounded-full ${theme.accent.replace('text-', 'bg-')}`} />
            </div>
          </motion.div>
        </motion.section>

        {/* Content Container */}
        <div className="px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-7xl mx-auto py-20">
            
            {/* Ringkasan Materi */}
            <motion.section 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="mb-32"
            >
              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${theme.textHeading} mb-12 pb-6 border-b-2 ${theme.border}`}>
                Ringkasan Materi Utama
              </h2>
              
              <div className="grid lg:grid-cols-3 gap-8">
                <motion.div variants={fadeIn} className={`p-8 rounded-2xl ${theme.card} border ${theme.border} shadow-lg hover:shadow-xl transition-all duration-300 group`}>
                  <div className={`w-14 h-14 rounded-xl ${theme.accentBg} ${theme.accent} flex items-center justify-center text-2xl font-bold mb-6 group-hover:scale-110 transition-transform`}>
                    1
                  </div>
                  <h3 className={`font-bold text-xl ${theme.accent} mb-5`}>Fondasi Biologis</h3>
                  <ul className={`space-y-4 text-base ${theme.text}`}>
                    <li className="flex items-start gap-3">
                      <ChevronRight size={20} className={`mt-1 ${theme.accent} flex-shrink-0`} />
                      <span>Spesies utama: <strong className={theme.textHeading}>Arabica</strong> (manis, kompleks) dan <strong className={theme.textHeading}>Robusta</strong> (pahit, body tebal)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight size={20} className={`mt-1 ${theme.accent} flex-shrink-0`} />
                      <span>Altitude tinggi → metabolisme lambat → akumulasi gula tinggi → rasa kompleks</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight size={20} className={`mt-1 ${theme.accent} flex-shrink-0`} />
                      <span>Varietas penting: Typica, Bourbon, Geisha</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div variants={fadeIn} className={`p-8 rounded-2xl ${theme.card} border ${theme.border} shadow-lg hover:shadow-xl transition-all duration-300 group`}>
                  <div className={`w-14 h-14 rounded-xl ${theme.accentBg} ${theme.accent} flex items-center justify-center text-2xl font-bold mb-6 group-hover:scale-110 transition-transform`}>
                    2
                  </div>
                  <h3 className={`font-bold text-xl ${theme.accent} mb-5`}>Pasca-Panen & Roasting</h3>
                  <ul className={`space-y-4 text-base ${theme.text}`}>
                    <li className="flex items-start gap-3">
                      <ChevronRight size={20} className={`mt-1 ${theme.accent} flex-shrink-0`} />
                      <span><strong className={theme.textHeading}>Washed:</strong> clean, acidity cerah</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight size={20} className={`mt-1 ${theme.accent} flex-shrink-0`} />
                      <span><strong className={theme.textHeading}>Natural:</strong> fruity, body tebal</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight size={20} className={`mt-1 ${theme.accent} flex-shrink-0`} />
                      <span><strong className={theme.textHeading}>Honey:</strong> sweet, balance</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight size={20} className={`mt-1 ${theme.accent} flex-shrink-0`} />
                      <span>Maillard reaction → cokelat/kacang; karamelisasi → manis</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div variants={fadeIn} className={`p-8 rounded-2xl ${theme.card} border ${theme.border} shadow-lg hover:shadow-xl transition-all duration-300 group`}>
                  <div className={`w-14 h-14 rounded-xl ${theme.accentBg} ${theme.accent} flex items-center justify-center text-2xl font-bold mb-6 group-hover:scale-110 transition-transform`}>
                    3
                  </div>
                  <h3 className={`font-bold text-xl ${theme.accent} mb-5`}>Sains Ekstraksi & Air</h3>
                  <ul className={`space-y-4 text-base ${theme.text}`}>
                    <li className="flex items-start gap-3">
                      <ChevronRight size={20} className={`mt-1 ${theme.accent} flex-shrink-0`} />
                      <span>Extraction Yield ideal: <strong className={theme.textHeading}>18–22%</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight size={20} className={`mt-1 ${theme.accent} flex-shrink-0`} />
                      <span>TDS mengukur kekuatan seduhan</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight size={20} className={`mt-1 ${theme.accent} flex-shrink-0`} />
                      <span>Air ideal: 75–150 ppm; magnesium bantu ekstraksi; bicarbonate buffer acidity</span>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </motion.section>

            {/* === BAB 1: COFFEE SPECIES === */}
            <motion.section 
              id="bab-1"
              data-chapter={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }}
              variants={fadeIn}
              className="mb-32 scroll-mt-16"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-6 mb-12 pb-6 border-b-2 ${theme.border}`}>
                <span className={`text-8xl sm:text-9xl font-black ${theme.accent} opacity-20 leading-none`}>01</span>
                <div className="flex-1">
                  <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${theme.textHeading} mb-3`}>Coffee Species</h2>
                  <p className={`text-xl ${theme.textMuted}`}>Arabica vs Robusta, Genus Coffea</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className={`p-8 lg:p-12 rounded-3xl ${theme.highlight} border ${theme.border} shadow-lg`}>
                  <h3 className={`font-bold text-2xl lg:text-3xl ${theme.textHeading} mb-6`}>Genus Coffea</h3>
                  <p className={`${theme.text} text-lg lg:text-xl leading-relaxed mb-6`}>
                    Tanaman kopi berasal dari genus <em className={theme.accent}>Coffea</em>, sebuah genus tumbuhan berbunga dalam famili Rubiaceae. 
                    Hingga saat ini, lebih dari <strong className={theme.textHeading}>120 spesies Coffea</strong> telah diidentifikasi oleh para botanis.
                  </p>
                  <p className={`${theme.text} text-lg lg:text-xl leading-relaxed`}>
                    Spesies-spesies ini tumbuh liar di Afrika, Madagaskar, dan sebagian Asia tropis. Namun, 
                    seluruh industri kopi modern secara praktis hanya bergantung pada <strong className={theme.textHeading}>dua spesies utama</strong>: 
                    <span className={`${theme.accent} font-semibold`}> Coffea arabica</span> dan 
                    <span className={`${theme.accent} font-semibold`}> Coffea canephora (Robusta)</span>.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className={`p-8 rounded-2xl ${theme.card} border ${theme.border} shadow-lg hover:shadow-xl transition-all duration-300`}>
                    <h4 className={`font-bold text-xl ${theme.accent} mb-6 flex items-center gap-2`}>
                      🌿 Arabica
                    </h4>
                    <ul className={`space-y-4 text-base ${theme.text}`}>
                      <li className="flex justify-between border-b border-dashed border-current/20 pb-3">
                        <span className={theme.textMuted}>Ketinggian</span>
                        <span className="font-semibold">900–2,000 mdpl</span>
                      </li>
                      <li className="flex justify-between border-b border-dashed border-current/20 pb-3">
                        <span className={theme.textMuted}>Suhu</span>
                        <span className="font-semibold">15–24°C</span>
                      </li>
                      <li className="flex justify-between border-b border-dashed border-current/20 pb-3">
                        <span className={theme.textMuted}>Kafein</span>
                        <span className="font-semibold">1.2–1.5%</span>
                      </li>
                      <li className="pt-2">
                        <span className={theme.textMuted}>Karakter:</span>
                        <span className="font-semibold ml-2">Manis, kompleks, acidity cerah</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className={`p-8 rounded-2xl ${theme.card} border ${theme.border} shadow-lg hover:shadow-xl transition-all duration-300`}>
                    <h4 className={`font-bold text-xl ${theme.accent} mb-6 flex items-center gap-2`}>
                      ☕ Robusta
                    </h4>
                    <ul className={`space-y-4 text-base ${theme.text}`}>
                      <li className="flex justify-between border-b border-dashed border-current/20 pb-3">
                        <span className={theme.textMuted}>Ketinggian</span>
                        <span className="font-semibold">200–800 mdpl</span>
                      </li>
                      <li className="flex justify-between border-b border-dashed border-current/20 pb-3">
                        <span className={theme.textMuted}>Suhu</span>
                        <span className="font-semibold">24–30°C</span>
                      </li>
                      <li className="flex justify-between border-b border-dashed border-current/20 pb-3">
                        <span className={theme.textMuted}>Kafein</span>
                        <span className="font-semibold">2.2–2.7%</span>
                      </li>
                      <li className="pt-2">
                        <span className={theme.textMuted}>Karakter:</span>
                        <span className="font-semibold ml-2">Pahit, body tebal, earthy</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <blockquote className={`pl-8 border-l-4 ${theme.accentBorder} italic ${theme.textSubheading} text-xl lg:text-2xl leading-relaxed`}>
                  "Arabica tidak otomatis enak dan Robusta tidak otomatis buruk. 
                  Kualitas akhir ditentukan oleh keseluruhan rantai produksi."
                </blockquote>
              </div>
            </motion.section>

            {/* === BAB 2: COFFEE PROCESSING === */}
            <motion.section 
              id="bab-2"
              data-chapter={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }}
              variants={fadeIn}
              className="mb-32 scroll-mt-16"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-6 mb-12 pb-6 border-b-2 ${theme.border}`}>
                <span className={`text-8xl sm:text-9xl font-black ${theme.accent} opacity-20 leading-none`}>02</span>
                <div className="flex-1">
                  <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${theme.textHeading} mb-3`}>Coffee Processing</h2>
                  <p className={`text-xl ${theme.textMuted}`}>Washed, Natural, Honey, Fermentasi</p>
                </div>
              </div>

              <div className="space-y-8">
                <p className={`${theme.text} leading-relaxed text-xl lg:text-2xl`}>
                  <strong className={`text-2xl lg:text-3xl ${theme.textHeading}`}>Anatomi Buah Kopi</strong> — Buah kopi secara botani disebut <em className={theme.accent}>coffee cherry</em>. 
                  Ia terdiri dari beberapa lapisan: kulit luar (exocarp), daging buah (mesocarp), 
                  mucilage (lendir kaya gula), kulit tanduk (parchment), dan biji kopi.
                </p>

                <div className="grid gap-4">
                  {[
                    { name: 'Washed / Fully Washed', desc: 'Clean, acidity cerah, clarity tinggi', color: 'bg-blue-500' },
                    { name: 'Honey Process', desc: 'Sweet, balance, body medium', color: 'bg-amber-500' },
                    { name: 'Natural Process', desc: 'Fruity, winey, body tebal', color: 'bg-red-500' },
                    { name: 'Anaerobic', desc: 'Kompleksitas ekstrem, rasa unik', color: 'bg-purple-500' }
                  ].map((process, idx) => (
                    <motion.div 
                      key={process.name} 
                      initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className={`p-6 rounded-2xl ${theme.card} border ${theme.border} shadow-md flex items-center justify-between group hover:shadow-lg transition-all duration-300`}
                    >
                      <div>
                        <h4 className={`font-bold text-xl ${theme.textHeading} group-hover:${theme.accent} transition-colors`}>{process.name}</h4>
                        <p className={`text-base ${theme.textMuted} mt-1`}>{process.desc}</p>
                      </div>
                      <div className={`w-4 h-16 rounded-full ${process.color} shadow-lg`} />
                    </motion.div>
                  ))}
                </div>

                <div className={`p-8 lg:p-12 rounded-3xl ${theme.highlight} border ${theme.border} shadow-lg`}>
                  <h3 className={`font-bold text-2xl lg:text-3xl ${theme.textHeading} mb-6`}>Apa Itu Fermentasi?</h3>
                  <p className={`${theme.text} text-lg lg:text-xl leading-relaxed`}>
                    Fermentasi dalam kopi adalah proses metabolisme mikroorganisme—terutama ragi dan bakteri asam laktat—
                    yang memakan gula dalam mucilage dan menghasilkan asam organik, alkohol, dan senyawa aroma. 
                    Proses ini bukan sekadar 'membusukkan' kopi, tetapi <strong className={theme.textHeading}>mengontrol pembentukan senyawa rasa</strong>.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* === BAB 3: ROAST LEVEL === */}
            <motion.section 
              id="bab-3"
              data-chapter={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }}
              variants={fadeIn}
              className="mb-32 scroll-mt-16"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-6 mb-12 pb-6 border-b-2 ${theme.border}`}>
                <span className={`text-8xl sm:text-9xl font-black ${theme.accent} opacity-20 leading-none`}>03</span>
                <div className="flex-1">
                  <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${theme.textHeading} mb-3`}>Roast Level & Flavor</h2>
                  <p className={`text-xl ${theme.textMuted}`}>Maillard, Karamelisasi, First & Second Crack</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className={`p-8 lg:p-12 rounded-3xl ${darkMode ? 'bg-neutral-900/60' : 'bg-stone-100'} border ${theme.border} shadow-lg`}>
                  <h3 className={`font-bold text-2xl lg:text-3xl ${theme.textHeading} mb-10 text-center`}>Spektrum Roast Level</h3>
                  <div className="space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="w-24 text-right">
                        <span className="text-sm font-bold text-green-600 block">LIGHT</span>
                        <span className="text-xs text-green-600/70">Cinnamon</span>
                      </div>
                      <div className="flex-1 h-16 rounded-2xl bg-gradient-to-r from-green-300 via-yellow-400 via-orange-500 to-amber-900 relative shadow-inner overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-around text-sm font-bold text-black/60 px-4">
                          <span className="bg-white/30 px-3 py-1 rounded-full backdrop-blur-sm">Acidity</span>
                          <span className="bg-white/30 px-3 py-1 rounded-full backdrop-blur-sm">Origin</span>
                          <span className="bg-black/30 text-white/90 px-3 py-1 rounded-full backdrop-blur-sm">Bitter</span>
                        </div>
                      </div>
                      <div className="w-24">
                        <span className="text-sm font-bold text-amber-900 block">DARK</span>
                        <span className="text-xs text-amber-900/70">French</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between px-32 text-xs font-mono text-neutral-500">
                      <span>196°C</span>
                      <span>210°C</span>
                      <span>225°C</span>
                      <span>240°C</span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className={`p-8 rounded-2xl ${theme.card} border ${theme.border} shadow-lg hover:shadow-xl transition-shadow`}>
                    <h4 className={`font-bold text-xl ${theme.accent} mb-4`}>Maillard Reaction (140–165°C)</h4>
                    <p className={`text-lg ${theme.text} leading-relaxed`}>
                      Reaksi antara asam amino dan gula pereduksi menghasilkan ratusan senyawa aroma: 
                      cokelat, kacang, roti panggang, karamel.
                    </p>
                  </div>
                  <div className={`p-8 rounded-2xl ${theme.card} border ${theme.border} shadow-lg hover:shadow-xl transition-shadow`}>
                    <h4 className={`font-bold text-xl ${theme.accent} mb-4`}>Karamelisasi (&gt;160°C)</h4>
                    <p className={`text-lg ${theme.text} leading-relaxed`}>
                      Gula terurai pada suhu tinggi menghasilkan rasa manis, caramel, toffee, dan burnt sugar.
                    </p>
                  </div>
                </div>

                <div className={`p-8 rounded-2xl ${theme.code} border ${theme.border}`}>
                  <h4 className={`font-bold text-xl ${theme.textHeading} mb-6`}>First Crack vs Second Crack</h4>
                  <div className="space-y-4 text-base">
                    <div className={`flex items-start gap-4 p-5 rounded-xl ${darkMode ? 'bg-neutral-800' : 'bg-white'} shadow-sm`}>
                      <span className={`font-mono font-bold text-lg ${theme.accent} min-w-[100px]`}>1st CRACK</span>
                      <span className={`${theme.text} text-lg leading-relaxed`}>Tekanan uap dan gas menyebabkan struktur sel pecah. Transisi endothermic → exothermic. Titik kritis untuk light roast.</span>
                    </div>
                    <div className={`flex items-start gap-4 p-5 rounded-xl ${darkMode ? 'bg-neutral-800' : 'bg-white'} shadow-sm`}>
                      <span className={`font-mono font-bold text-lg ${theme.accent} min-w-[100px]`}>2nd CRACK</span>
                      <span className={`${theme.text} text-lg leading-relaxed`}>Degradasi struktur sel, pelepasan minyak ke permukaan. Rasa pahit dan smoky mulai dominan.</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* === BAB 4: GRIND SIZE === */}
            <motion.section 
              id="bab-4"
              data-chapter={4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }}
              variants={fadeIn}
              className="mb-32 scroll-mt-16"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-6 mb-12 pb-6 border-b-2 ${theme.border}`}>
                <span className={`text-8xl sm:text-9xl font-black ${theme.accent} opacity-20 leading-none`}>04</span>
                <div className="flex-1">
                  <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${theme.textHeading} mb-3`}>Grind Size & Extraction</h2>
                  <p className={`text-xl ${theme.textMuted}`}>Partikel, Fines, Boulders</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className={`p-8 lg:p-12 rounded-3xl ${theme.highlight} border ${theme.border} shadow-lg`}>
                  <h3 className={`font-bold text-2xl lg:text-3xl ${theme.textHeading} mb-6`}>Apa Itu Ekstraksi?</h3>
                  <p className={`${theme.text} text-xl lg:text-2xl leading-relaxed`}>
                    Ekstraksi kopi adalah proses pelarutan senyawa kimia dari partikel kopi ke dalam air panas. 
                    Tujuan ekstraksi bukan mengambil semua senyawa, tetapi mengambilnya dalam 
                    <strong className={theme.textHeading}> proporsi yang seimbang</strong>.
                  </p>
                </div>

                <div className={`p-8 rounded-2xl ${theme.card} border ${theme.border} shadow-lg`}>
                  <h4 className={`font-bold text-xl ${theme.textHeading} mb-6`}>Urutan Pelarutan Senyawa</h4>
                  <div className="space-y-4">
                    {[
                      { phase: '0-20%', compound: 'Asam & Aromatik', taste: 'Acidity', color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
                      { phase: '20-60%', compound: 'Gula & Manis', taste: 'Sweetness', color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
                      { phase: '60-100%', compound: 'Pahit & Astringent', taste: 'Bitterness', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/30' },
                    ].map((item) => (
                      <div key={item.phase} className={`flex items-center gap-6 p-5 rounded-xl ${item.bg} border ${item.border}`}>
                        <span className={`font-mono text-2xl font-bold ${item.color} w-24`}>{item.phase}</span>
                        <div className="flex-1">
                          <p className={`font-bold text-lg ${theme.textHeading}`}>{item.compound}</p>
                          <p className={`text-base ${theme.textMuted}`}>{item.taste}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`p-8 rounded-2xl ${theme.code} border ${theme.border}`}>
                  <h4 className={`font-bold text-xl ${theme.textHeading} mb-6`}>Fines vs Boulders</h4>
                  <div className="grid md:grid-cols-2 gap-6 text-lg">
                    <div className={`p-6 rounded-xl border ${theme.border} ${darkMode ? 'bg-red-950/20' : 'bg-red-50'} shadow-lg`}>
                      <p className={`font-bold text-red-600 mb-3 text-xl`}>FINES ⚠️</p>
                      <p className={`${theme.text} leading-relaxed`}>Partikel sangat halus (&lt;100μm) yang mengekstraksi sangat cepat dan mudah over-extract.</p>
                    </div>
                    <div className={`p-6 rounded-xl border ${theme.border} ${darkMode ? 'bg-blue-950/20' : 'bg-blue-50'} shadow-lg`}>
                      <p className={`font-bold text-blue-600 mb-3 text-xl`}>BOULDERS ⚠️</p>
                      <p className={`${theme.text} leading-relaxed`}>Partikel besar (&gt;800μm) yang mengekstraksi sangat lambat dan mudah under-extract.</p>
                    </div>
                  </div>
                </div>

                <blockquote className={`pl-8 border-l-4 ${theme.accentBorder} ${theme.accent} font-semibold text-2xl lg:text-3xl leading-relaxed`}>
                  "Grind size adalah kenop utama untuk mengontrol rasa kopi. 
                  Ia menghubungkan fisika, kimia, dan sensorik dalam satu variabel."
                </blockquote>
              </div>
            </motion.section>

            {/* === BAB 5: ESPRESSO FUNDAMENTALS === */}
            <motion.section 
              id="bab-5"
              data-chapter={5}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }}
              variants={fadeIn}
              className="mb-32 scroll-mt-16"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-6 mb-12 pb-6 border-b-2 ${theme.border}`}>
                <span className={`text-8xl sm:text-9xl font-black ${theme.accent} opacity-20 leading-none`}>05</span>
                <div className="flex-1">
                  <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${theme.textHeading} mb-3`}>Espresso Fundamentals</h2>
                  <p className={`text-xl ${theme.textMuted}`}>9 Bar, 25-30s, 1:2 Ratio</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className={`p-8 lg:p-12 rounded-3xl ${theme.highlight} border ${theme.border} shadow-lg`}>
                  <h3 className={`font-bold text-2xl lg:text-3xl ${theme.textHeading} mb-8 text-center`}>Definisi Ilmiah Espresso</h3>
                  <p className={`${theme.text} text-xl lg:text-2xl leading-relaxed mb-10 text-center max-w-4xl mx-auto`}>
                    Espresso adalah metode ekstraksi kopi menggunakan <strong className={theme.textHeading}>air panas bertekanan tinggi</strong> yang dipaksa 
                    melewati bed kopi yang dipadatkan.
                  </p>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: 'Tekanan', value: '9 bar', desc: '~130 psi', icon: '⚡' },
                      { label: 'Suhu', value: '90–96°C', desc: 'Ideal: 93°C', icon: '🌡️' },
                      { label: 'Waktu', value: '25–30s', desc: 'Golden zone', icon: '⏱️' },
                      { label: 'Rasio', value: '1:2', desc: 'Kopi:Liquid', icon: '⚖️' },
                    ].map((param) => (
                      <div key={param.label} className={`p-6 rounded-xl ${theme.card} border ${theme.border} text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
                        <div className="text-3xl mb-2">{param.icon}</div>
                        <p className={`text-sm ${theme.textMuted} uppercase tracking-wider font-semibold`}>{param.label}</p>
                        <p className={`text-3xl font-black ${theme.accent} my-2`}>{param.value}</p>
                        <p className={`text-sm ${theme.textMuted}`}>{param.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`p-8 rounded-2xl ${theme.code} border ${theme.border}`}>
                  <h4 className={`font-bold text-xl ${theme.textHeading} mb-5`}>Crema Science</h4>
                  <p className={`${theme.text} text-lg leading-relaxed mb-6`}>
                    Crema adalah <strong className={theme.textHeading}>emulsi gas CO2, minyak kopi, dan air</strong>. 
                    Crema bukan indikator rasa enak, tetapi indikator kesegaran kopi dan tekanan ekstraksi.
                  </p>
                  <div className={`flex items-center justify-center gap-3 text-base ${theme.textMuted} flex-wrap`}>
                    <span className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-neutral-800' : 'bg-stone-200'} font-mono`}>CO2</span>
                    <span className="text-2xl">+</span>
                    <span className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-neutral-800' : 'bg-stone-200'} font-mono`}>Minyak Kopi</span>
                    <span className="text-2xl">+</span>
                    <span className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-neutral-800' : 'bg-stone-200'} font-mono`}>Air</span>
                    <span className="text-2xl">=</span>
                    <span className={`px-6 py-3 rounded-lg ${theme.accentBg} ${theme.accent} font-bold text-lg shadow-lg`}>Crema</span>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* === BAB 6: TASTE & SENSORY === */}
            <motion.section 
              id="bab-6"
              data-chapter={6}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }}
              variants={fadeIn}
              className="mb-32 scroll-mt-16"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-6 mb-12 pb-6 border-b-2 ${theme.border}`}>
                <span className={`text-8xl sm:text-9xl font-black ${theme.accent} opacity-20 leading-none`}>06</span>
                <div className="flex-1">
                  <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${theme.textHeading} mb-3`}>Taste & Sensory Science</h2>
                  <p className={`text-xl ${theme.textMuted}`}>Taste, Smell, Mouthfeel</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className={`p-8 lg:p-12 rounded-3xl ${theme.highlight} border ${theme.border} shadow-lg`}>
                  <h3 className={`font-bold text-2xl lg:text-3xl ${theme.textHeading} mb-6`}>Tiga Pilar Persepsi Rasa</h3>
                  <p className={`${theme.text} text-xl lg:text-2xl leading-relaxed mb-8`}>
                    Persepsi rasa kopi adalah hasil integrasi antara <strong className={theme.textHeading}>indera pengecap (taste)</strong>, 
                    <strong className={theme.textHeading}> penciuman (smell)</strong>, dan <strong className={theme.textHeading}>sensasi taktil di mulut (mouthfeel)</strong>.
                    Sebagian besar kompleksitas rasa kopi sebenarnya berasal dari aroma yang terdeteksi oleh hidung melalui jalur retronasal.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className={`p-6 rounded-xl ${theme.card} border ${theme.border} text-center`}>
                      <div className="text-4xl mb-4">👅</div>
                      <h4 className={`font-bold text-lg ${theme.accent} mb-2`}>Taste</h4>
                      <p className={`text-sm ${theme.textMuted}`}>Manis, asam, pahit, asin, umami — terdeteksi oleh lidah</p>
                    </div>
                    <div className={`p-6 rounded-xl ${theme.card} border ${theme.border} text-center`}>
                      <div className="text-4xl mb-4">👃</div>
                      <h4 className={`font-bold text-lg ${theme.accent} mb-2`}>Smell</h4>
                      <p className={`text-sm ${theme.textMuted}`}>Aroma kompleks — 80% dari "rasa" kopi</p>
                    </div>
                    <div className={`p-6 rounded-xl ${theme.card} border ${theme.border} text-center`}>
                      <div className="text-4xl mb-4">💋</div>
                      <h4 className={`font-bold text-lg ${theme.accent} mb-2`}>Mouthfeel</h4>
                      <p className={`text-sm ${theme.textMuted}`}>Body, tekstur, astringensi — sensasi fisik</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* === BAB 7: MANUAL BREW === */}
            <motion.section 
              id="bab-7"
              data-chapter={7}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }}
              variants={fadeIn}
              className="mb-32 scroll-mt-16"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-6 mb-12 pb-6 border-b-2 ${theme.border}`}>
                <span className={`text-8xl sm:text-9xl font-black ${theme.accent} opacity-20 leading-none`}>07</span>
                <div className="flex-1">
                  <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${theme.textHeading} mb-3`}>Manual Brew Methods</h2>
                  <p className={`text-xl ${theme.textMuted}`}>V60, French Press, Aeropress</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className={`p-8 rounded-2xl ${theme.card} border ${theme.border} shadow-lg`}>
                    <h4 className={`font-bold text-xl ${theme.accent} mb-4`}>☕ V60 (Pour Over)</h4>
                    <ul className={`space-y-3 text-base ${theme.text}`}>
                      <li>• <strong>Metode:</strong> Percolation</li>
                      <li>• <strong>Grind:</strong> Medium-fine</li>
                      <li>• <strong>Waktu:</strong> 2:30–3:00</li>
                      <li>• <strong>Karakter:</strong> Clean, bright, clarity tinggi</li>
                    </ul>
                  </div>
                  <div className={`p-8 rounded-2xl ${theme.card} border ${theme.border} shadow-lg`}>
                    <h4 className={`font-bold text-xl ${theme.accent} mb-4`}>🫖 French Press</h4>
                    <ul className={`space-y-3 text-base ${theme.text}`}>
                      <li>• <strong>Metode:</strong> Immersion</li>
                      <li>• <strong>Grind:</strong> Coarse</li>
                      <li>• <strong>Waktu:</strong> 4:00</li>
                      <li>• <strong>Karakter:</strong> Full body, rich, oily</li>
                    </ul>
                  </div>
                  <div className={`p-8 rounded-2xl ${theme.card} border ${theme.border} shadow-lg`}>
                    <h4 className={`font-bold text-xl ${theme.accent} mb-4`}>🔧 Aeropress</h4>
                    <ul className={`space-y-3 text-base ${theme.text}`}>
                      <li>• <strong>Metode:</strong> Pressure + Immersion</li>
                      <li>• <strong>Grind:</strong> Medium</li>
                      <li>• <strong>Waktu:</strong> 1:30–2:00</li>
                      <li>• <strong>Karakter:</strong> Versatile, clean, strong</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* === BAB 8: WATER CHEMISTRY === */}
            <motion.section 
              id="bab-8"
              data-chapter={8}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }}
              variants={fadeIn}
              className="mb-32 scroll-mt-16"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-6 mb-12 pb-6 border-b-2 ${theme.border}`}>
                <span className={`text-8xl sm:text-9xl font-black ${theme.accent} opacity-20 leading-none`}>08</span>
                <div className="flex-1">
                  <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${theme.textHeading} mb-3`}>Water Chemistry</h2>
                  <p className={`text-xl ${theme.textMuted}`}>TDS, Magnesium, Kalsium, Bicarbonate</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className={`p-8 lg:p-12 rounded-3xl ${theme.highlight} border ${theme.border} shadow-lg`}>
                  <h3 className={`font-bold text-2xl lg:text-3xl ${theme.textHeading} mb-6`}>Air: Pelarut Terpenting</h3>
                  <p className={`${theme.text} text-xl lg:text-2xl leading-relaxed mb-6`}>
                    Lebih dari <strong className={theme.textHeading}>98% isi secangkir kopi adalah air</strong>. 
                    Mineral terlarut berfungsi sebagai ion yang berinteraksi dengan senyawa rasa.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className={`p-6 rounded-xl ${theme.card} border ${theme.border}`}>
                      <h4 className={`font-bold text-lg ${theme.accent} mb-2`}>Magnesium (Mg²⁺)</h4>
                      <p className={`text-base ${theme.textMuted}`}>Meningkatkan sweetness dan extraction efficiency</p>
                    </div>
                    <div className={`p-6 rounded-xl ${theme.card} border ${theme.border}`}>
                      <h4 className={`font-bold text-lg ${theme.accent} mb-2`}>Kalsium (Ca²⁺)</h4>
                      <p className={`text-base ${theme.textMuted}`}>Berkontribusi terhadap body dan mouthfeel</p>
                    </div>
                    <div className={`p-6 rounded-xl ${theme.card} border ${theme.border}`}>
                      <h4 className={`font-bold text-lg ${theme.accent} mb-2`}>Bicarbonate (HCO₃⁻)</h4>
                      <p className={`text-base ${theme.textMuted}`}>Buffer acidity, stabilkan pH ekstraksi</p>
                    </div>
                  </div>
                </div>

                <div className={`p-8 rounded-2xl ${theme.code} border ${theme.border} text-center`}>
                  <p className={`text-lg ${theme.textMuted} mb-4`}>Total Dissolved Solids (TDS) Ideal</p>
                  <p className={`text-6xl font-black ${theme.accent} mb-4`}>75–150 ppm</p>
                  <p className={`text-base ${theme.text}`}>Terlalu rendah = under-extract. Terlalu tinggi = over-extract & scale.</p>
                </div>
              </div>
            </motion.section>

            {/* === BAB 9: EXTRACTION YIELD === */}
            <motion.section 
              id="bab-9"
              data-chapter={9}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }}
              variants={fadeIn}
              className="mb-32 scroll-mt-16"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-6 mb-12 pb-6 border-b-2 ${theme.border}`}>
                <span className={`text-8xl sm:text-9xl font-black ${theme.accent} opacity-20 leading-none`}>09</span>
                <div className="flex-1">
                  <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${theme.textHeading} mb-3`}>Extraction Yield</h2>
                  <p className={`text-xl ${theme.textMuted}`}>EY 18-22%, TDS Control</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className={`p-8 lg:p-12 rounded-3xl ${theme.highlight} border ${theme.border} shadow-lg text-center`}>
                  <h3 className={`font-bold text-2xl lg:text-3xl ${theme.textHeading} mb-8`}>Golden Zone Ekstraksi</h3>
                  
                  <div className={`inline-block p-12 rounded-3xl ${theme.card} border ${theme.border} shadow-2xl mb-8`}>
                    <p className={`text-lg ${theme.textMuted} mb-4`}>Extraction Yield Target</p>
                    <p className={`text-8xl font-black ${theme.accent} mb-4`}>18–22%</p>
                    <p className={`text-base ${theme.text}`}>Persentase massa kopi yang berhasil diekstraksi</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    <div className={`p-6 rounded-xl border ${theme.border} ${darkMode ? 'bg-yellow-950/20' : 'bg-yellow-50'}`}>
                      <p className={`font-bold text-yellow-600 mb-2`}>Under-extracted (&lt;18%)</p>
                      <p className={`text-sm ${theme.textMuted}`}>Asam, kurang manis, kurang body, "kurang matang"</p>
                    </div>
                    <div className={`p-6 rounded-xl border ${theme.border} ${darkMode ? 'bg-red-950/20' : 'bg-red-50'}`}>
                      <p className={`font-bold text-red-600 mb-2`}>Over-extracted (&gt;22%)</p>
                      <p className={`text-sm ${theme.textMuted}`}>Pahit, astringent, "terbakar", tidak enak</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
            
                        {/* === BAB 10: MILK SCIENCE (LANJUTAN) === */}
            <motion.section 
              id="bab-10"
              data-chapter={10}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }}
              variants={fadeIn}
              className="mb-32 scroll-mt-16"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-6 mb-12 pb-6 border-b-2 ${theme.border}`}>
                <span className={`text-8xl sm:text-9xl font-black ${theme.accent} opacity-20 leading-none`}>10</span>
                <div className="flex-1">
                  <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${theme.textHeading} mb-3`}>Milk Science</h2>
                  <p className={`text-xl ${theme.textMuted}`}>Protein, Microfoam, Latte Art</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className={`p-8 rounded-2xl ${theme.card} border ${theme.border} shadow-lg`}>
                    <h4 className={`font-bold text-xl ${theme.accent} mb-4`}>🥛 Komposisi Susu</h4>
                    <ul className={`space-y-3 text-base ${theme.text}`}>
                      <li>• <strong>Air:</strong> ~87%</li>
                      <li>• <strong>Laktosa:</strong> ~5% (manis alami)</li>
                      <li>• <strong>Lemak:</strong> ~3-4% (body, creamy)</li>
                      <li>• <strong>Protein:</strong> ~3% (casein & whey)</li>
                    </ul>
                  </div>
                  <div className={`p-8 rounded-2xl ${theme.card} border ${theme.border} shadow-lg`}>
                    <h4 className={`font-bold text-xl ${theme.accent} mb-4`}>🫧 Microfoam</h4>
                    <ul className={`space-y-3 text-base ${theme.text}`}>
                      <li>• <strong>Steaming:</strong> 55–65°C ideal</li>
                      <li>• <strong>Protein denaturasi:</strong> 60°C+</li>
                      <li>• <strong>Velvet texture:</strong> bubble halus & silky</li>
                      <li>• <strong>Latte art:</strong> requires proper foam density</li>
                    </ul>
                  </div>
                </div>

                <div className={`p-8 rounded-2xl ${theme.code} border ${theme.border}`}>
                  <h4 className={`font-bold text-xl ${theme.textHeading} mb-5`}>Teknik Steaming yang Benar</h4>
                  <div className="space-y-4">
                    <div className={`flex items-start gap-4 p-4 rounded-xl ${darkMode ? 'bg-neutral-800' : 'bg-white'} shadow-sm`}>
                      <span className={`font-bold ${theme.accent}`}>1</span>
                      <span className={`${theme.text}`}>Purging wand untuk buang air kondensasi</span>
                    </div>
                    <div className={`flex items-start gap-4 p-4 rounded-xl ${darkMode ? 'bg-neutral-800' : 'bg-white'} shadow-sm`}>
                      <span className={`font-bold ${theme.accent}`}>2</span>
                      <span className={`${theme.text}`}>Position tip di surface milk untuk stretching (bikin foam)</span>
                    </div>
                    <div className={`flex items-start gap-4 p-4 rounded-xl ${darkMode ? 'bg-neutral-800' : 'bg-white'} shadow-sm`}>
                      <span className={`font-bold ${theme.accent}`}>3</span>
                      <span className={`${theme.text}`}>Submerge tip untuk heating setelah cukup foam</span>
                    </div>
                    <div className={`flex items-start gap-4 p-4 rounded-xl ${darkMode ? 'bg-neutral-800' : 'bg-white'} shadow-sm`}>
                      <span className={`font-bold ${theme.accent}`}>4</span>
                      <span className={`${theme.text}`}>Stop di 55–65°C, tap & swirl untuk polish</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* === BAB 11: CAFE WORKFLOW === */}
            <motion.section 
              id="bab-11"
              data-chapter={11}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }}
              variants={fadeIn}
              className="mb-32 scroll-mt-16"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-6 mb-12 pb-6 border-b-2 ${theme.border}`}>
                <span className={`text-8xl sm:text-9xl font-black ${theme.accent} opacity-20 leading-none`}>11</span>
                <div className="flex-1">
                  <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${theme.textHeading} mb-3`}>Cafe Workflow</h2>
                  <p className={`text-xl ${theme.textMuted}`}>Speed, Consistency, Multi-tasking</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className={`p-8 lg:p-12 rounded-3xl ${theme.highlight} border ${theme.border} shadow-lg`}>
                  <h3 className={`font-bold text-2xl lg:text-3xl ${theme.textHeading} mb-6`}>Efisiensi di Balik Bar</h3>
                  <p className={`${theme.text} text-xl lg:text-2xl leading-relaxed mb-8`}>
                    Workflow yang baik bukan cuma soal <strong className={theme.textHeading}>cepat</strong>, tapi 
                    <strong className={theme.textHeading}> konsisten</strong> dan <strong className={theme.textHeading}>sustainable</strong>. 
                    Barista yang baik bisa mengelola multiple order tanpa mengorbankan kualitas.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className={`p-6 rounded-xl ${theme.card} border ${theme.border} text-center`}>
                      <div className={`text-4xl mb-4 ${theme.accent}`}>⚡</div>
                      <h4 className={`font-bold text-lg mb-2`}>Speed</h4>
                      <p className={`text-sm ${theme.textMuted}`}>Waktu respon cepat, gerakan efisien, minimal waste motion</p>
                    </div>
                    <div className={`p-6 rounded-xl ${theme.card} border ${theme.border} text-center`}>
                      <div className={`text-4xl mb-4 ${theme.accent}`}>🎯</div>
                      <h4 className={`font-bold text-lg mb-2`}>Consistency</h4>
                      <p className={`text-sm ${theme.textMuted}`}>Setiap cangkir sama kualitasnya, regardless siapa yang bikin</p>
                    </div>
                    <div className={`p-6 rounded-xl ${theme.card} border ${theme.border} text-center`}>
                      <div className={`text-4xl mb-4 ${theme.accent}`}>🧠</div>
                      <h4 className={`font-bold text-lg mb-2`}>Multi-tasking</h4>
                      <p className={`text-sm ${theme.textMuted}`}>Brew sambil steam, prep sambil extract, komunikasi tim</p>
                    </div>
                  </div>
                </div>

                <div className={`p-8 rounded-2xl ${theme.code} border ${theme.border}`}>
                  <h4 className={`font-bold text-xl ${theme.textHeading} mb-5`}>Sequence Ideal (Single Order)</h4>
                  <div className="flex flex-wrap items-center justify-center gap-3 text-base">
                    <span className={`px-4 py-2 rounded-lg ${theme.accentBg} ${theme.accent} font-semibold`}>Grind</span>
                    <ArrowRight size={16} className={theme.textMuted} />
                    <span className={`px-4 py-2 rounded-lg ${theme.accentBg} ${theme.accent} font-semibold`}>Dose & Tamp</span>
                    <ArrowRight size={16} className={theme.textMuted} />
                    <span className={`px-4 py-2 rounded-lg ${theme.accentBg} ${theme.accent} font-semibold`}>Extract</span>
                    <ArrowRight size={16} className={theme.textMuted} />
                    <span className={`px-4 py-2 rounded-lg ${theme.accentBg} ${theme.accent} font-semibold`}>Steam Milk</span>
                    <ArrowRight size={16} className={theme.textMuted} />
                    <span className={`px-4 py-2 rounded-lg ${theme.accentBg} ${theme.accent} font-semibold`}>Pour</span>
                    <ArrowRight size={16} className={theme.textMuted} />
                    <span className={`px-4 py-2 rounded-lg ${theme.accentBg} ${theme.accent} font-semibold`}>Serve</span>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* === BAB 12: PROFESSIONAL MINDSET === */}
            <motion.section 
              id="bab-12"
              data-chapter={12}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }}
              variants={fadeIn}
              className="mb-32 scroll-mt-16"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-6 mb-12 pb-6 border-b-2 ${theme.border}`}>
                <span className={`text-8xl sm:text-9xl font-black ${theme.accent} opacity-20 leading-none`}>12</span>
                <div className="flex-1">
                  <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${theme.textHeading} mb-3`}>Professional Mindset</h2>
                  <p className={`text-xl ${theme.textMuted}`}>Etika, Dedikasi, Manifesto Barista</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className={`p-8 lg:p-12 rounded-3xl ${theme.highlight} border ${theme.border} shadow-lg`}>
                  <h3 className={`font-bold text-2xl lg:text-3xl ${theme.textHeading} mb-6`}>Manifesto Seorang Barista</h3>
                  <p className={`${theme.text} text-xl lg:text-2xl leading-relaxed mb-8`}>
                    Menjadi barista berarti memilih jalan <strong className={theme.textHeading}>presisi</strong>, 
                    <strong className={theme.textHeading}> kerendahan hati</strong>, dan 
                    <strong className={theme.textHeading}> dedikasi seumur hidup</strong> terhadap kualitas. 
                    Profesionalisme berarti melakukan hal yang benar bahkan ketika tidak ada yang melihat.
                  </p>

                  <div className={`p-8 rounded-2xl ${theme.card} border ${theme.border} shadow-lg`}>
                    <ul className={`space-y-4 text-lg ${theme.text}`}>
                      <li className="flex items-start gap-4">
                        <span className={`text-2xl ${theme.accent}`}>◆</span>
                        <span>Saya menghormati setiap biji kopi yang telah melewati perjalanan panjang dari petani ke cangkir.</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <span className={`text-2xl ${theme.accent}`}>◆</span>
                        <span>Saya berkomitmen untuk belajar terus-menerus, karena ilmu kopi tidak pernah berakhir.</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <span className={`text-2xl ${theme.accent}`}>◆</span>
                        <span>Saya mengutamakan konsistensi di atas ego — teknik yang benar lebih penting dari gaya pribadi.</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <span className={`text-2xl ${theme.accent}`}>◆</span>
                        <span>Saya memperlakukan setiap pelanggan dengan hormat, karena mereka mempercayai saya untuk hari mereka.</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <span className={`text-2xl ${theme.accent}`}>◆</span>
                        <span>Saya ingat bahwa di balik setiap order, ada manusia dengan cerita dan kebutuhan mereka sendiri.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <blockquote className={`pl-8 border-l-4 ${theme.accentBorder} italic ${theme.textSubheading} text-2xl lg:text-3xl leading-relaxed`}>
                  "Kopi yang bagus tidak datang dari mesin yang mahal. 
                  Ia datang dari tangan yang peduli, pikiran yang fokus, dan hati yang menghormati prosesnya."
                </blockquote>
              </div>
            </motion.section>

                        {/* === LANJUT BACA: PENGALAMAN NYATA === */}
            <motion.section
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`mt-32 py-20 ${theme.accentBg} ${theme.accentBorder} border-y-2`}
            >
              <div className="max-w-4xl mx-auto px-6 text-center">
                <h3 className={`text-3xl sm:text-4xl font-bold ${theme.textHeading} mb-6 italic`}>
                  Lanjut Baca: Pengalaman Nyata di Balik Kopi
                </h3>
                <p className={`${theme.textMuted} text-lg mb-12 max-w-2xl mx-auto`}>
                  Ilmu penting, tapi pengalaman manusia yang bikin kita mengerti. 
                  <span className={`${theme.textHeading} font-medium block mt-2`}>
                    Dari teori ke praktik, dari praktik ke makna hidup.
                  </span>
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { 
                      title: "Di Balik Bar", 
                      desc: "Capek yang tidak terlihat, senyum yang dipaksakan, dan kebanggaan kecil yang tidak ada yang lihat.",
                      link: "/buku/di-balik-bar",  // ✅ FIX: dari /cerita/ ke /buku/
                      highlight: "Capeknya bukan di tangan. Capeknya di kepala."
                    },
                    { 
                      title: "Di Ujung Shift", 
                      desc: "Jam-jam terakhir ketika kaki sudah tidak merasa, tapi senyum harus tetap ada.",
                      link: "/cerita/di-ujung-shift",  // ✅ SUDAH BENAR
                      highlight: "Delapan jam berdiri. Delapan jam tersenyum."
                    },
                    { 
                      title: "Racikan Pertama", 
                      desc: "Ketika kopi pertama yang lo buat bukan untuk pelanggan, tapi untuk nenek yang tidak pernah datang lagi.",
                      link: "/cerita/racikan-pertama",  // ✅ SUDAH BENAR
                      highlight: "Setiap racikan adalah doa yang tidak kita sadari."
                    }
                  ].map((story, idx) => (
                    <Link href={story.link} key={story.title}>
                      <motion.div
                        whileHover={prefersReducedMotion ? {} : { y: -8 }}
                        className={`group p-6 ${theme.card} border ${theme.border} rounded-2xl text-left shadow-lg hover:shadow-xl transition-all h-full`}
                      >
                        <h4 className={`font-bold text-xl ${theme.accent} mb-3 group-hover:underline`}>
                          {story.title}
                        </h4>
                        <p className={`${theme.textMuted} text-sm mb-4 leading-relaxed`}>
                          {story.desc}
                        </p>
                        <div className={`pt-4 border-t ${theme.border} mt-auto`}>
                          <p className={`${theme.accent} text-xs italic`}>
                            "{story.highlight}"
                          </p>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* === CTA SECTION === */}
            <motion.section
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-32 mb-20 text-center"
            >
              <div className={`inline-block p-12 rounded-3xl ${theme.card} border ${theme.border} shadow-2xl max-w-2xl w-full mx-4`}>
                <PenLine size={48} className={`${theme.accent} mx-auto mb-6`} />
                <h3 className={`text-2xl sm:text-3xl font-bold ${theme.textHeading} mb-4`}>
                  Punya pengalaman kerja sendiri?
                </h3>
                <p className={`${theme.textMuted} mb-8 leading-relaxed`}>
                  Ilmu ini penting, tapi cerita lo juga berharga. 
                  Bagikan pengalaman di balik bar, di dapur, atau di tempat kerja lo.
                </p>
                <Link 
                  href="/tulis" 
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-full ${theme.accentBg} ${theme.accent} font-bold border ${theme.accentBorder} hover:shadow-lg transition-all`}
                >
                  <span>Tulis Cerita Lo</span>
                  <ChevronRight size={20} />
                </Link>
              </div>
            </motion.section>

          </div>
        </div>
      </main>
    </div>
  );
}
