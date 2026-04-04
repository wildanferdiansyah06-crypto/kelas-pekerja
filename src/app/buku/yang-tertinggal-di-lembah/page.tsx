'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Moon, Sun, BookOpen, Mountain, ChevronRight, X, Compass, Check, Feather, Wind, Heart, Quote } from 'lucide-react';
import { useTheme } from "@/src/components/ThemeProvider";
import Link from 'next/link';

export default function YangTertinggalDiLembahPage() {
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

  const theme = darkMode ? {
    bg: 'bg-[#0c0d12]',
    text: 'text-slate-300',
    textMuted: 'text-slate-500',
    textHeading: 'text-slate-100',
    textSubheading: 'text-slate-400',
    border: 'border-slate-800',
    accent: 'text-indigo-400',
    accentBg: 'bg-indigo-950/30',
    accentBorder: 'border-indigo-800/50',
    sidebar: 'bg-[#0f1117]',
    code: 'bg-slate-900/50',
    highlight: 'bg-slate-900/40',
    card: 'bg-slate-900/30',
    float: 'bg-slate-900/90',
    gradientFrom: 'from-indigo-900/20',
    gradientTo: 'to-purple-900/10'
  } : {
    bg: 'bg-[#f5f3f0]',
    text: 'text-stone-700',
    textMuted: 'text-stone-500',
    textHeading: 'text-stone-900',
    textSubheading: 'text-stone-600',
    border: 'border-stone-200',
    accent: 'text-emerald-700',
    accentBg: 'bg-emerald-100/60',
    accentBorder: 'border-emerald-300',
    sidebar: 'bg-[#fafaf8]',
    code: 'bg-stone-100',
    highlight: 'bg-stone-100/80',
    card: 'bg-white/60',
    float: 'bg-white/90',
    gradientFrom: 'from-emerald-100/50',
    gradientTo: 'to-teal-50/30'
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
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] } 
    }
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-700 selection:${theme.accent} selection:bg-current`}>
      
      {/* Reading Progress Bar */}
      <div className={`fixed top-0 left-0 right-0 h-1 z-40 ${darkMode ? 'bg-slate-900' : 'bg-stone-200'}`}>
        <motion.div 
          className={`h-full ${darkMode ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 'bg-gradient-to-r from-emerald-600 to-teal-500'}`}
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Floating Navigation */}
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
              <BookOpen size={20} />
              <span className="hidden sm:inline">Daftar Isi</span>
              <div className={`flex items-center gap-2 ml-2 pl-2 border-l ${theme.border}`}>
                <span className={`text-xs font-mono ${theme.textMuted}`}>
                  {String(activeChapter).padStart(2, '0')}/{chapters.length - 1}
                </span>
              </div>
            </motion.button>

            <div className={`flex items-center gap-2 p-2 rounded-2xl ${theme.float} backdrop-blur-xl border ${theme.border} shadow-2xl w-fit`}>
              <motion.button
                whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                onClick={toggleTheme}
                className={`p-3 rounded-xl ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-stone-200'} transition-colors`}
              >
                {darkMode ? <Sun size={20} className={theme.accent} /> : <Moon size={20} className={theme.accent} />}
              </motion.button>
              <div className={`w-px h-6 ${darkMode ? 'bg-slate-700' : 'bg-stone-300'}`} />
              <motion.a
                href="#prolog"
                whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                className={`p-3 rounded-xl ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-stone-200'} transition-colors`}
              >
                <Compass size={20} className={theme.textMuted} />
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
                      <Mountain size={24} className={theme.accent} />
                    </div>
                    <div>
                      <h2 className={`font-bold text-lg ${theme.textHeading}`}>Daftar Isi</h2>
                      <p className={`text-sm ${theme.textMuted}`}>Perjalanan Melalui Lembah</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSidebarOpen(false)}
                    className={`p-3 rounded-xl ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-stone-100'} transition-colors`}
                  >
                    <X size={24} className={theme.textMuted} />
                  </button>
                </div>

                <div className={`mb-6 p-4 rounded-xl ${theme.card} border ${theme.border}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm ${theme.textMuted}`}>Progress Membaca</span>
                    <span className={`text-sm font-bold ${theme.accent}`}>
                      {Math.round((completedChapters.length / chapters.length) * 100)}%
                    </span>
                  </div>
                  <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-slate-800' : 'bg-stone-200'}`}>
                    <div 
                      className={`h-full rounded-full ${darkMode ? 'bg-indigo-500' : 'bg-emerald-600'}`}
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
                        href={chapter.num === 0 ? "#prolog" : `#bab-${chapter.num}`}
                        onClick={() => setSidebarOpen(false)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`group flex items-center gap-4 p-4 rounded-xl text-sm transition-all duration-300 ${
                          isActive 
                            ? `${theme.accentBg} ${theme.accent} font-semibold border ${theme.accentBorder}` 
                            : isCompleted
                              ? `${darkMode ? 'bg-indigo-950/20' : 'bg-emerald-50'} ${darkMode ? 'text-indigo-300' : 'text-emerald-700'} border ${darkMode ? 'border-indigo-900/30' : 'border-emerald-200'}`
                              : `${darkMode ? 'hover:bg-slate-800/50' : 'hover:bg-stone-100'} ${theme.textMuted} hover:text-current`
                        }`}
                      >
                        <span className={`text-lg font-serif font-bold flex-shrink-0 w-8 text-center ${
                          isCompleted 
                            ? (darkMode ? 'text-indigo-400' : 'text-emerald-600')
                            : isActive 
                              ? theme.accent 
                              : theme.textMuted
                        }`}>
                          {isCompleted ? <Check size={20} /> : chapter.num === 0 ? 'P' : chapter.num === 11 ? 'E' : ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][chapter.num - 1]}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className={`font-serif font-medium text-base truncate ${isActive ? theme.textHeading : isCompleted ? theme.textHeading : theme.text}`}>
                            {chapter.title}
                          </p>
                          <p className={`text-xs mt-1 truncate ${theme.textMuted}`}>{chapter.subtitle}</p>
                        </div>
                        {isActive && <ChevronRight size={20} />}
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
      <main className="min-h-screen pt-0 pb-20 font-serif">
        
        {/* Hero Section */}
        <motion.section 
          id="prolog"
          data-chapter={0}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className={`relative flex items-center justify-center px-6 sm:px-8 lg:px-12 ${theme.bg} border-b ${theme.border} min-h-screen`}
        >
          <div className={`absolute inset-0 bg-gradient-to-b ${theme.gradientFrom} ${theme.gradientTo} opacity-50`} />
          
          <div className="max-w-4xl mx-auto w-full pt-16 sm:pt-20 pb-20 relative z-10 text-center">
            <motion.div 
              initial={prefersReducedMotion ? { scale: 1 } : { scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="mb-12"
            >
              <div className={`inline-block p-6 rounded-full ${theme.accentBg} border ${theme.accentBorder} mb-8`}>
                <Wind size={40} className={theme.accent} />
              </div>
              
              <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold ${theme.textHeading} mb-6 tracking-tight leading-tight font-serif`}>
                YANG TERTINGGAL<br />
                <span className={theme.accent}>DI LEMBAH</span>
              </h1>
              
              <p className={`text-xl sm:text-2xl ${theme.textSubheading} italic mb-8 font-light max-w-2xl mx-auto`}>
                Sebuah Tafsiran tentang Janji, Kehilangan, dan Arti Sebuah Perjalanan
              </p>

              <div className={`w-24 h-1 mx-auto ${darkMode ? 'bg-indigo-500' : 'bg-emerald-600'} mb-8`} />
              
              <p className={`text-lg ${theme.textMuted} max-w-2xl mx-auto leading-relaxed`}>
                "Kita selalu diajarkan untuk mendaki. Tapi ada kebohongan yang lebih sunyi: 
                bahwa perjalanan yang sesungguhnya tidak terjadi saat kita berdiri di atas, 
                bersorak, tetapi saat kita merangkak di dasar lembah."
              </p>
            </motion.div>

            <motion.div 
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <button
                onClick={() => setSidebarOpen(true)}
                className={`inline-flex items-center gap-2 px-8 py-4 rounded-full ${theme.accentBg} ${theme.accent} font-semibold border ${theme.accentBorder} hover:shadow-lg transition-all`}
              >
                <BookOpen size={20} />
                Mulai Membaca
              </button>
            </motion.div>
          </div>

          <motion.div 
            animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className={`absolute bottom-8 left-1/2 -translate-x-1/2 ${theme.textMuted}`}
          >
            <div className={`w-6 h-10 rounded-full border-2 ${theme.border} flex justify-center pt-2`}>
              <div className={`w-1 h-2 rounded-full ${darkMode ? 'bg-indigo-400' : 'bg-emerald-600'}`} />
            </div>
          </motion.div>
        </motion.section>

        {/* Content Container */}
        <div className="px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-3xl mx-auto py-20">
            
            {/* PROLOG */}
            <motion.section 
              id="prolog"
              data-chapter={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }}
              variants={fadeIn}
              className="mb-32 scroll-mt-16"
            >
              <div className={`mb-12 pb-6 border-b ${theme.border}`}>
                <span className={`text-sm font-bold tracking-widest ${theme.accent} uppercase`}>Prolog</span>
                <h2 className={`text-4xl sm:text-5xl font-bold ${theme.textHeading} mt-2 font-serif`}>Bukit yang Menipu</h2>
              </div>

              <div className="space-y-6">
                <p className={`${theme.text} text-xl leading-relaxed first-letter:text-5xl first-letter:${theme.accent} first-letter:font-bold first-letter:mr-3 first-letter:float-left`}>
                  Kita selalu diajarkan untuk mendaki. Sejak kecil, kita dibesarkan dengan mitos-mitos tentang puncak: 
                  bahwa kebahagiaan adalah pemandangan dari atas, bahwa kesuksesan adalah udara yang lebih encer di ketinggian, 
                  bahwa hidup yang bermakna adalah hidup yang berhasil "menaklukkan."
                </p>
                
                <p className={`${theme.text} text-lg leading-loose`}>
                  Tapi ada kebohongan yang lebih sunyi yang jarang dibicarakan: bahwa bukit yang terang sering kali sunyi. 
                  Bahwa puncak adalah tempat yang sepi. Dan bahwa perjalanan yang sesungguhnya—yang mengukir siapa kita—tidak terjadi saat kita berdiri di atas, bersorak, tetapi saat kita merangkak di dasar lembah, ketika napas sesak dan kegelapan mengaburkan arah pulang.
                </p>

                <blockquote className={`pl-8 border-l-4 ${theme.accentBorder} italic ${theme.textSubheading} text-2xl leading-relaxed my-12 py-4`}>
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
              viewport={{ once: true, margin: "-150px" }}
              variants={fadeIn}
              className="mb-32 scroll-mt-16"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-4 mb-12 pb-6 border-b ${theme.border}`}>
                <span className={`text-7xl sm:text-8xl font-black ${theme.accent} opacity-20 leading-none font-serif`}>I</span>
                <div className="flex-1">
                  <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${theme.textHeading} mb-2 font-serif`}>Geografi Jiwa</h2>
                  <p className={`text-lg ${theme.textMuted} italic`}>Tentang Letak Sebenarnya dari Kehidupan</p>
                </div>
              </div>

              <div className="space-y-8">
                <p className={`${theme.text} text-lg leading-relaxed`}>
                  Setiap manusia membawa peta di dalam dadanya. Sejak lahir, kita sudah diprogram untuk menganggap hidup adalah garis lurus yang menanjak: lahir, sekolah, sukses, bahagia. Puncaknya adalah rumah besar, jabatan tinggi, atau pencapaian yang diakui dunia.
                </p>
                <p className={`${theme.text} text-lg leading-relaxed`}>
                  Tapi jiwa tidak mengenal GPS. Jiwa mengenal lembah-lembah yang gelap, yang tidak pernah muncul di peta manapun.
                </p>

                <div className="space-y-6 mt-8">
                  <h3 className={`text-2xl font-bold ${theme.textHeading} font-serif`}>Tiga Jenis Tempat dalam Geografi Batin Manusia:</h3>
                  
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
                      transition={{ delay: idx * 0.1 }}
                      className={`p-6 rounded-xl ${theme.card} border ${theme.border} shadow-md`}
                    >
                      <h4 className={`font-bold text-xl ${theme.accent} mb-3 font-serif`}>{item.title}</h4>
                      <p className={`${theme.text} leading-relaxed`}>{item.desc}</p>
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
              viewport={{ once: true, margin: "-150px" }}
              variants={fadeIn}
              className="mb-32 scroll-mt-16"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-4 mb-12 pb-6 border-b ${theme.border}`}>
                <span className={`text-7xl sm:text-8xl font-black ${theme.accent} opacity-20 leading-none font-serif`}>II</span>
                <div className="flex-1">
                  <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${theme.textHeading} mb-2 font-serif`}>Ontologi Janji</h2>
                  <p className={`text-lg ${theme.textMuted} italic`}>Mengapa Kata-Kata Menjadi Berat</p>
                </div>
              </div>

              <div className="space-y-6">
                <p className={`${theme.text} text-lg leading-relaxed`}>
                  Janji bukanlah sekadar rangkaian kata. Dalam dimensi yang lebih dalam, janji adalah materi yang mengokohkan realitas. Ketika seseorang berkata, "Aku tidak akan membiarkanmu sendirian," ia tidak sedang berbicara tentang fisik. Ia sedang menawarkan dirinya sebagai benteng melawan kehancuran ontologis—the ketakutan bahwa kita tidak ada, bahwa kita tidak berarti, bahwa kita bisa hilang tanpa jejak di tengah kegelapan.
                </p>

                <p className={`${theme.text} text-lg leading-relaxed`}>
                  Ada tipe janji dalam sejarah peradaban:
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className={`p-8 rounded-2xl ${theme.card} border ${theme.border} shadow-lg`}>
                    <h4 className={`font-bold text-lg ${theme.textMuted} mb-4 uppercase tracking-wider`}>Janji Kontrakual</h4>
                    <p className={`${theme.text} leading-relaxed mb-4`}>
                      "Aku akan membayarmu."<br/>
                      "Aku akan datang pukul tiga."
                    </p>
                    <p className={`text-sm ${theme.textMuted}`}>
                      Ini adalah janji duniawi, yang bisa dihukum jika dilanggar. Terikat oleh hukum dan konvensi sosial.
                    </p>
                  </div>
                  
                  <div className={`p-8 rounded-2xl ${theme.accentBg} border ${theme.accentBorder} shadow-lg`}>
                    <h4 className={`font-bold text-lg ${theme.accent} mb-4 uppercase tracking-wider`}>Janji Eksistensial</h4>
                    <p className={`${theme.text} leading-relaxed mb-4`}>
                      "Aku akan ada."<br/>
                      "Aku tidak akan pergi."
                    </p>
                    <p className={`text-sm ${theme.accent}`}>
                      Ini adalah janji yang tidak tertulis di kertas, tapi tertoreh di ruang-ruang di antara detak jantung. Ini adalah jenis janji yang dibahas dalam buku ini.
                    </p>
                  </div>
                </div>

                <blockquote className={`pl-8 border-l-4 ${theme.accentBorder} italic ${theme.textSubheading} text-xl leading-relaxed my-12`}>
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
              viewport={{ once: true, margin: "-150px" }}
              variants={fadeIn}
              className="mb-32 scroll-mt-16"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-4 mb-12 pb-6 border-b ${theme.border}`}>
                <span className={`text-7xl sm:text-8xl font-black ${theme.accent} opacity-20 leading-none font-serif`}>III</span>
                <div className="flex-1">
                  <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${theme.textHeading} mb-2 font-serif`}>Fenomenologi Lemah</h2>
                  <p className={`text-lg ${theme.textMuted} italic`}>Ketika Kita Tidak Bisa Berdiri</p>
                </div>
              </div>

              <div className="space-y-6">
                <p className={`${theme.text} text-lg leading-relaxed`}>
                  Filosofi modern sangat peduli dengan kekuatan. Nietzsche dan para eksistensialis memuja <em>Ubermensch</em>, manusia yang mampu menciptakan maknanya sendiri. Psikologi positif mengajarkan <em>resilience</em>, kemampuan bangkit dari keterpurukan.
                </p>

                <p className={`${theme.text} text-lg leading-relaxed`}>
                  Tapi ada kebijaksanaan yang lebih tua, yang lebih lembut: kebijaksanaan tentang <strong className={theme.textHeading}>ketidakmampuan</strong>.
                </p>

                <div className={`p-8 lg:p-12 rounded-3xl ${darkMode ? 'bg-indigo-950/20' : 'bg-emerald-50/50'} border ${theme.border} shadow-lg my-8`}>
                  <p className={`${theme.text} text-lg leading-relaxed mb-6`}>
                    Di lembah yang gelap, kita tidak kuat. Kita tidak tangguh. Kita tidak "positive thinking." Kita hanyalah manusia yang terluka, yang mungkin sedang menangis tanpa suara, yang mungkin lupa cara berjalan, yang mungkin ingin berhenti saja.
                  </p>
                  <p className={`${theme.text} text-lg leading-relaxed`}>
                    Dan di saat itulah janji menunjukkan wujudnya yang sebenarnya.
                  </p>
                </div>

                <p className={`${theme.text} text-lg leading-relaxed`}>
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
              viewport={{ once: true, margin: "-150px" }}
              variants={fadeIn}
              className="mb-32 scroll-mt-16"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-4 mb-12 pb-6 border-b ${theme.border}`}>
                <span className={`text-7xl sm:text-8xl font-black ${theme.accent} opacity-20 leading-none font-serif`}>IV</span>
                <div className="flex-1">
                  <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${theme.textHeading} mb-2 font-serif`}>Arkeologi Teman</h2>
                  <p className={`text-lg ${theme.textMuted} italic`}>Menggali yang Tersisa</p>
                </div>
              </div>

              <div className="space-y-6">
                <p className={`${theme.text} text-lg leading-relaxed`}>
                  Sejarah peradaban manusia dipenuhi dengan kisah-kisah pertempuran, penaklukan, dan pencapaian. Tapi arkeolog yang cerdas akan mencari yang lain: jejak-jejak peradaban dari barang-barang kecil yang ditinggalkan bersama.
                </p>

                <div className={`my-8 space-y-4 ${theme.text} text-lg leading-relaxed`}>
                  <p>Dua cangkir teh yang masih tersisa di meja, meski sudah dingin.</p>
                  <p>Sepatu yang dipinjam karena kakimu lecet.</p>
                  <p>Surat-surat yang tidak pernah dikirim, tapi ditulis hanya untuk mengatakan, "Aku masih di sini."</p>
                </div>

                <p className={`${theme.text} text-lg leading-relaxed`}>
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
              viewport={{ once: true, margin: "-150px" }}
              variants={fadeIn}
              className="mb-32 scroll-mt-16"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-4 mb-12 pb-6 border-b ${theme.border}`}>
                <span className={`text-7xl sm:text-8xl font-black ${theme.accent} opacity-20 leading-none font-serif`}>V</span>
                <div className="flex-1">
                  <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${theme.textHeading} mb-2 font-serif`}>Etika dalam Kesetiaan</h2>
                  <p className={`text-lg ${theme.textMuted} italic`}>Kapan Berjuang dan Kapan Melepas</p>
                </div>
              </div>

              <div className="space-y-6">
                <p className={`${theme.text} text-lg leading-relaxed`}>
                  Ada kebingungan moral yang sering muncul: jika seseorang berjanji untuk menemani, apakah itu berarti mereka harus bertahan meski hubungan itu merusak? Apakah kesetiaan adalah penjara?
                </p>

                <p className={`${theme.text} text-lg leading-relaxed`}>
                  Bab ini membahas perbedaan antara:
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className={`p-6 rounded-xl border ${theme.border} ${darkMode ? 'bg-red-950/20' : 'bg-red-50'}`}>
                    <h4 className={`font-bold text-lg text-red-600 mb-3`}>Kesetiaan Konsumtif</h4>
                    <p className={`${theme.text} text-base`}>
                      Bertahan karena takut sendiri, karena butuh diterima, karena ego. Ini adalah penjara berlapis emas.
                    </p>
                  </div>
                  
                  <div className={`p-6 rounded-xl border ${theme.accentBorder} ${theme.accentBg}`}>
                    <h4 className={`font-bold text-lg ${theme.accent} mb-3`}>Kesetiaan Eksistensial</h4>
                    <p className={`${theme.text} text-base`}>
                      Bertahan karena melihat keberadaan si lain sebagai intrinsik berharga, terpisah dari fungsinya bagi kita. Ini adalah kebebasan yang dipilih.
                    </p>
                  </div>
                </div>

                <p className={`${theme.text} text-lg leading-relaxed`}>
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
              viewport={{ once: true, margin: "-150px" }}
              variants={fadeIn}
              className="mb-32 scroll-mt-16"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-4 mb-12 pb-6 border-b ${theme.border}`}>
                <span className={`text-7xl sm:text-8xl font-black ${theme.accent} opacity-20 leading-none font-serif`}>VI</span>
                <div className="flex-1">
                  <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${theme.textHeading} mb-2 font-serif`}>Topografi Kehilangan</h2>
                  <p className={`text-lg ${theme.textMuted} italic`}>Ketika Janji Diingkari</p>
                </div>
              </div>

              <div className="space-y-6">
                <p className={`${theme.text} text-lg leading-relaxed`}>
                  Tidak semua janji tertepati. Itu adalah fakta pahit yang harus kita telan sebelum bisa dewasa.
                </p>

                <p className={`${theme.text} text-lg leading-relaxed`}>
                  Bab ini adalah tentang duka atas janji-janji yang rusak. Tentang teman yang berkata, "Aku tak akan pergi," lalu pergi. Tentang kekasih yang berjanji setia di tengah hubungan yang sedang kalian bangun dengan tulus, lalu menghilang bagai kabut pagi yang menyingsing. Tentang orang tua yang berkata, "Rumah ini selalu terbuka untukmu," tapi menguncinya saat kau pulang dengan kegagalan.
                </p>

                <div className={`p-8 rounded-2xl ${theme.highlight} border ${theme.border} my-8`}>
                  <p className={`${theme.text} text-lg leading-relaxed italic`}>
                    Kehilangan janji adalah sejenis kematian. Maka dukalah seperti orang berduka. Jangan buru-buru memaafkan jika hatimu belum siap. Jangan buru-buru mengatakan, "Mungkin ada hikmahnya," jika luka itu masih berdarah.
                  </p>
                </div>

                <p className={`${theme.text} text-lg leading-relaxed`}>
                  Tapi pelajaran yang bisa diambil: jika seseorang pergi, itu bukan berarti janji itu tidak pernah nyata. Pada saat diucapkan, mungkin ia sungguh-sungguh. Manusia berubah. Dan janji, seperti segala sesuatu yang hidup, bisa mati.
                </p>

                <p className={`${theme.text} text-lg leading-relaxed font-semibold ${theme.accent}`}>
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
              viewport={{ once: true, margin: "-150px" }}
              variants={fadeIn}
              className="mb-32 scroll-mt-16"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-4 mb-12 pb-6 border-b ${theme.border}`}>
                <span className={`text-7xl sm:text-8xl font-black ${theme.accent} opacity-20 leading-none font-serif`}>VII</span>
                <div className="flex-1">
                  <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${theme.textHeading} mb-2 font-serif`}>Komunitas sebagai Perlawanan</h2>
                  <p className={`text-lg ${theme.textMuted} italic`}>Melawan Mitos Individualisme</p>
                </div>
              </div>

              <div className="space-y-6">
                <p className={`${theme.text} text-lg leading-relaxed`}>
                  Zaman ini mengagungkan <em>self-made man</em>. Kita dipaksa percaya bahwa kitalah kapten dari kapal kita sendiri, bahwa kita tidak butuh siapapun, bahwa ketergantungan adalah kelemahan.
                </p>

                <p className={`${theme.text} text-lg leading-relaxed`}>
                  Tapi itu adalah kebohongan kapitalis yang membuat kita terisolasi dan lebih mudah dikendalikan.
                </p>

                <p className={`${theme.text} text-lg leading-relaxed`}>
                  Sejarah menunjukkan: manusia selalu bertahan karena <strong className={theme.textHeading}>kita</strong>. Klan. Suku. Komunitas. Perkumpulan rahasia. Geng jalanan. Keluarga pilihan.
                </p>

                <blockquote className={`pl-8 border-l-4 ${theme.accentBorder} italic ${theme.textSubheading} text-xl leading-relaxed my-12`}>
                  Janji untuk tidak membiarkan seseorang berjalan sendiri adalah bentuk paling radikal dari perlawanan melawan sistem yang ingin kita terpecah-pecah, saling curiga, dan saling bersaing.
                </blockquote>

                <p className={`${theme.text} text-lg leading-relaxed`}>
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
              viewport={{ once: true, margin: "-150px" }}
              variants={fadeIn}
              className="mb-32 scroll-mt-16"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-4 mb-12 pb-6 border-b ${theme.border}`}>
                <span className={`text-7xl sm:text-8xl font-black ${theme.accent} opacity-20 leading-none font-serif`}>VIII</span>
                <div className="flex-1">
                  <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${theme.textHeading} mb-2 font-serif`}>Mistika Kegelapan</h2>
                  <p className={`text-lg ${theme.textMuted} italic`}>Apa yang Ditemukan Saat Tidak Ada Cahaya</p>
                </div>
              </div>

              <div className="space-y-6">
                <p className={`${theme.text} text-lg leading-relaxed`}>
                  Orang-orang spiritual sering takut pada "malam gelap jiwa"—periode di mana Tuhan terasa menjauh, di mana doa menjadi kosong, di mana makna hilang.
                </p>

                <p className={`${theme.text} text-lg leading-relaxed`}>
                  Tapi ada keindahan yang hanya bisa dilihat dalam gelap: bintang-bintang, misalnya. Atau api yang hangat. Atau wajah seseorang yang diterangi oleh lilin, bukan lampu neon.
                </p>

                <div className={`p-8 rounded-2xl ${theme.card} border ${theme.border} my-8`}>
                  <p className={`${theme.text} text-lg leading-relaxed`}>
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
              viewport={{ once: true, margin: "-150px" }}
              variants={fadeIn}
              className="mb-32 scroll-mt-16"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-4 mb-12 pb-6 border-b ${theme.border}`}>
                <span className={`text-7xl sm:text-8xl font-black ${theme.accent} opacity-20 leading-none font-serif`}>IX</span>
                <div className="flex-1">
                  <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${theme.textHeading} mb-2 font-serif`}>Genealogi Janji</h2>
                  <p className={`text-lg ${theme.textMuted} italic`}>Dari Mana Datangnya Komitmen?</p>
                </div>
              </div>

              <div className="space-y-6">
                <p className={`${theme.text} text-lg leading-relaxed`}>
                  Mengapa sebagian orang bisa berjanji dan menepati, sementara yang lain tidak?
                </p>

                <p className={`${theme.text} text-lg leading-relaxed`}>
                  Ini bukan tentang moralitas sederhana. Ini tentang sejarah: apakah seseorang pernah <em>dijanjikan</em> dengan tulus? Apakah mereka pernah ditinggal di lembah sendirian saat kecil? Apakah mereka belajar bahwa dunia adalah tempat yang tidak aman, sehingga janji adalah sesuatu yang harus dihindari karena pasti akan mengecewakan?
                </p>

                <div className={`p-8 rounded-2xl ${theme.accentBg} border ${theme.accentBorder} my-8`}>
                  <p className={`${theme.text} text-lg leading-relaxed`}>
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
              viewport={{ once: true, margin: "-150px" }}
              variants={fadeIn}
              className="mb-32 scroll-mt-16"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-4 mb-12 pb-6 border-b ${theme.border}`}>
                <span className={`text-7xl sm:text-8xl font-black ${theme.accent} opacity-20 leading-none font-serif`}>X</span>
                <div className="flex-1">
                  <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${theme.textHeading} mb-2 font-serif`}>Praktik Kehadiran</h2>
                  <p className={`text-lg ${theme.textMuted} italic`}>Cara Menjadi Orang yang Tidak Pergi</p>
                </div>
              </div>

              <div className="space-y-6">
                <p className={`${theme.text} text-lg leading-relaxed`}>
                  Bab ini adalah manual praktis, tapi bukan manual teknis. Ini adalah seni:
                </p>

                <div className="space-y-4 my-8">
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
                      transition={{ delay: idx * 0.1 }}
                      className={`flex items-start gap-4 p-6 rounded-xl ${theme.card} border ${theme.border}`}
                    >
                      <span className={`text-2xl ${theme.accent} font-bold`}>◆</span>
                      <div>
                        <h4 className={`font-bold text-lg ${theme.textHeading} mb-1`}>{item.title}</h4>
                        <p className={`${theme.text} text-base`}>{item.desc}</p>
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
              viewport={{ once: true, margin: "-150px" }}
              variants={fadeIn}
              className="mb-32 scroll-mt-16"
            >
              <div className={`mb-12 pb-6 border-b ${theme.border}`}>
                <span className={`text-sm font-bold tracking-widest ${theme.accent} uppercase`}>Epilog</span>
                <h2 className={`text-4xl sm:text-5xl font-bold ${theme.textHeading} mt-2 font-serif`}>Bukit yang Terlupakan</h2>
              </div>

              <div className="space-y-8">
                <p className={`${theme.text} text-xl leading-relaxed`}>
                  Di akhir hidupmu—jika kau beruntung untuk sampai di sana dengan kesadaran masih utuh—kau akan melihat ke belakang. Dan kau akan sadar: yang kau ingat bukanlah puncak-puncak yang kau daki dengan susah payah.
                </p>
                
                <div className="space-y-6 my-12">
                  <p className={`${theme.text} text-lg leading-relaxed border-l-4 ${theme.accentBorder} pl-6`}>
                    Yang kau ingat adalah tangan yang memegang tanganmu saat kau terjatuh.
                  </p>
                  <p className={`${theme.text} text-lg leading-relaxed border-l-4 ${theme.accentBorder} pl-6`}>
                    Yang kau ingat adalah suara yang berkata, "Aku di sini," saat kau terbangun karena mimpi buruk.
                  </p>
                  <p className={`${theme.text} text-lg leading-relaxed border-l-4 ${theme.accentBorder} pl-6`}>
                    Yang kau ingat adalah mereka yang berjanji, dan menepati, bahwa ketika lembah tampak tak bertepi, kau tidak akan pernah berjalan sendirian.
                  </p>
                </div>

                <p className={`${theme.text} text-lg leading-relaxed italic`}>
                  Bukit yang terang? Itu hanyalah bonus. Itu hanyalah pemandangan sementara di perjalanan pulang.
                </p>

                <div className={`p-8 lg:p-12 rounded-3xl ${theme.highlight} border ${theme.border} shadow-lg mt-12`}>
                  <p className={`${theme.text} text-lg leading-relaxed mb-6`}>
                    Yang sebenarnya membuatmu sampai di rumah—di rumah yang sesungguhnya, di dalam diri sendiri—adalah mereka yang berjalan bersamamu di tempat-tempat gelap, yang rela kotor oleh lumpurmu, yang menganggap janji mereka bukan sebagai beban, tapi sebagai hakikat dari menjadi manusia.
                  </p>
                  <p className={`${theme.text} text-lg leading-relaxed`}>
                    Maka jika kau sedang di lembah sekarang, lihatlah sekelilingmu. Jika ada yang duduk di sana, di lumpur, bersamamu—peluklah mereka dengan pikiranmu. Mereka adalah milik surgamu di bumi.
                  </p>
                </div>

                <p className={`${theme.text} text-lg leading-relaxed mt-8`}>
                  Dan jika kau sedang di bukit yang terang, jangan lupa melihat ke bawah. Ada yang membutuhkan janji. Ada yang membutuhkan seseorang untuk berkata, <em>"Aku tidak akan membiarkanmu berjalan sendirian."</em>
                </p>

                <p className={`${theme.text} text-lg leading-relaxed italic mt-8`}>
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
              className={`mt-32 pt-16 border-t-2 ${theme.border} ${theme.accentBorder}`}
            >
              <div className="max-w-3xl mx-auto text-center mb-12">
                <Quote size={32} className={`${theme.accent} mx-auto mb-4 opacity-50`} />
                <h3 className={`text-2xl sm:text-3xl font-bold ${theme.textHeading} mb-6 font-serif`}>
                  Tentang Buku Ini
                </h3>
              </div>

              <div className={`p-8 lg:p-12 rounded-3xl ${theme.card} border ${theme.border} shadow-lg`}>
                <p className={`${theme.text} text-lg leading-relaxed mb-6 text-center`}>
                  Buku ini adalah invitasi untuk meredefinisi kesuksesan hidup. Bukan tentang seberapa tinggi kau naik, tapi tentang seberapa dalam kau mampu berada bersama orang lain. Bukan tentang seberapa terang puncakmu, tapi tentang seberapa setia engkau berada di lembah orang lain.
                </p>
                
                <div className={`w-16 h-px ${darkMode ? 'bg-slate-700' : 'bg-stone-300'} mx-auto my-8`} />
                
                <p className={`${theme.textMuted} text-base leading-relaxed text-center italic`}>
                  "Sebuah perjalanan memang tentang bukit yang terang—tapi hanya agar kita punya cerita untuk diceritakan saat kita turun kembali, ke tempat yang sebenarnya: ke pelukan sesama manusia, di tempat yang gelap tapi hangat, yang bernama rumah."
                </p>
              </div>

              <motion.div 
                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-16 text-center"
              >
                <Heart size={32} className={`${theme.accent} mx-auto mb-4`} />
                <p className={`${theme.textMuted} text-sm`}>Sebuah tafsiran tentang yang tertinggal</p>
              </motion.div>
            </motion.section>

          </div>
        </div>
      </main>
    </div>
  );
}
