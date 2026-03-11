'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { Moon, Sun, Coffee, BookOpen, ChevronUp, Quote, Menu, X } from 'lucide-react';

export default function SeniMenyeduhiKehidupanPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [isTocOpen, setIsTocOpen] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 0.5], ['0%', '20%']);
  const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);
      
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const theme = darkMode ? {
    bg: 'bg-[#0c0a09]',
    bgGradient: 'from-amber-950/20 via-[#0c0a09] to-[#0c0a09]',
    text: 'text-stone-300',
    textMuted: 'text-stone-500',
    textHeading: 'text-amber-50',
    accent: 'text-amber-500',
    accentBg: 'bg-amber-500/10',
    accentBorder: 'border-amber-500/30',
    accentGlow: 'shadow-amber-500/20',
    secondary: 'text-orange-400',
    border: 'border-stone-800',
    card: 'bg-stone-900/40',
    highlight: 'bg-amber-500/5',
    quoteBorder: 'border-l-amber-500',
    noise: 'opacity-[0.03]',
    navBg: 'bg-[#0c0a09]/95',
    navBorder: 'border-stone-800'
  } : {
    bg: 'bg-[#fafaf9]',
    bgGradient: 'from-amber-100/50 via-[#fafaf9] to-[#fafaf9]',
    text: 'text-stone-600',
    textMuted: 'text-stone-400',
    textHeading: 'text-stone-900',
    accent: 'text-amber-700',
    accentBg: 'bg-amber-100/50',
    accentBorder: 'border-amber-300',
    accentGlow: 'shadow-amber-700/10',
    secondary: 'text-orange-600',
    border: 'border-stone-200',
    card: 'bg-white/60',
    highlight: 'bg-amber-50/50',
    quoteBorder: 'border-l-amber-600',
    noise: 'opacity-[0.015]',
    navBg: 'bg-[#fafaf9]/95',
    navBorder: 'border-stone-200'
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
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
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  const chapters = [
    { id: 'kata-pengantar', title: 'Kata Pengantar', icon: '✦' },
    { id: 'pendahuluan', title: 'Pendahuluan', icon: '◈' },
    { id: 'bab-1', title: 'Bab 1: Dari Biji ke Jiwa', icon: '❖' },
    { id: 'bab-2', title: 'Bab 2: Air dan Keseimbangan', icon: '💧' },
    { id: 'bab-3', title: 'Bab 3: Suhu, Tekanan, dan Ketahanan', icon: '🔥' },
    { id: 'bab-4', title: 'Bab 4: Grind Size', icon: '⚙' },
    { id: 'bab-5', title: 'Bab 5: Waktu Seduh', icon: '⏳' },
    { id: 'bab-6', title: 'Bab 6: Rasa', icon: '☕' },
    { id: 'bab-7', title: 'Bab 7: Ritual', icon: '🌿' },
    { id: 'bab-8', title: 'Bab 8: Seni Menyeduh', icon: '☀' },
    { id: 'bab-9', title: 'Bab 9: Waktu dan Keheningan', icon: '🌙' },
    { id: 'bab-10', title: 'Bab 10: Penutup', icon: '💭' },
    { id: 'epilog', title: 'Epilog', icon: '✦' },
  ];

  return (
    <div ref={containerRef} className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-700 overflow-x-hidden`}>
      
      {/* Animated Background Gradient */}
      <motion.div 
        className={`fixed inset-0 bg-gradient-to-b ${theme.bgGradient} pointer-events-none z-0`}
        style={{ y: backgroundY }}
      />

      {/* Noise Texture Overlay */}
      <div className={`fixed inset-0 pointer-events-none z-10 ${theme.noise}`}
        style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}
      />

      {/* Floating Coffee Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${darkMode ? 'bg-amber-500/20' : 'bg-amber-600/10'}`}
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)
            }}
            animate={{ 
              y: [null, -100],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <motion.div 
        className={`fixed top-0 left-0 right-0 h-1 ${darkMode ? 'bg-amber-600' : 'bg-amber-700'} origin-left z-50`}
        style={{ scaleX: smoothProgress }}
      />

      {/* Global Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 ${theme.navBg} backdrop-blur-md border-b ${theme.navBorder}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo / Brand */}
            <motion.a 
              href="#"
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className={`w-8 h-8 rounded-full ${theme.accentBg} border ${theme.accentBorder} flex items-center justify-center`}>
                <Coffee size={16} className={theme.accent} />
              </div>
              <span className={`font-serif text-lg ${theme.textHeading} hidden sm:block`}>
                Kelas Pekerja
              </span>
            </motion.a>

            {/* Center: Reading Progress */}
            <div className="flex-1 max-w-md mx-4 hidden md:flex items-center justify-center gap-3">
              <BookOpen size={14} className={theme.accent} />
              <div className={`flex-1 h-1.5 rounded-full ${darkMode ? 'bg-stone-800' : 'bg-stone-200'} overflow-hidden`}>
                <motion.div 
                  className={`h-full rounded-full ${theme.accent.replace('text-', 'bg-')}`}
                  style={{ width: `${readingProgress}%` }}
                />
              </div>
              <span className={`text-xs font-medium ${theme.textMuted} w-10 text-right`}>
                {Math.round(readingProgress)}%
              </span>
            </div>

            {/* Right: Dark Mode & TOC Toggle */}
            <div className="flex items-center gap-2">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2.5 rounded-xl transition-all duration-300 ${darkMode ? 'hover:bg-stone-800' : 'hover:bg-stone-100'} group`}
                aria-label="Toggle dark mode"
              >
                <AnimatePresence mode="wait">
                  {darkMode ? (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun size={18} className={`${theme.accent} group-hover:scale-110 transition-transform`} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon size={18} className={`${theme.accent} group-hover:scale-110 transition-transform`} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              {/* TOC Toggle Button */}
              <button
                onClick={() => setIsTocOpen(!isTocOpen)}
                className={`p-2.5 rounded-xl transition-all duration-300 ${isTocOpen ? theme.accentBg : ''} ${darkMode ? 'hover:bg-stone-800' : 'hover:bg-stone-100'} group md:hidden`}
                aria-label="Toggle table of contents"
              >
                {isTocOpen ? (
                  <X size={18} className={theme.accent} />
                ) : (
                  <Menu size={18} className={theme.accent} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile TOC Dropdown */}
        <AnimatePresence>
          {isTocOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden border-t ${theme.navBorder} overflow-hidden`}
            >
              <div className={`max-h-[60vh] overflow-y-auto p-4 ${theme.card}`}>
                <p className={`text-[10px] uppercase tracking-widest ${theme.textMuted} mb-3`}>Daftar Isi</p>
                <nav className="space-y-1">
                  {chapters.map((chapter) => (
                    <a
                      key={chapter.id}
                      href={`#${chapter.id}`}
                      onClick={() => setIsTocOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                        activeSection === chapter.id 
                          ? `${theme.accentBg} ${theme.accent} font-medium` 
                          : `${theme.textMuted} hover:${darkMode ? 'bg-stone-800' : 'bg-stone-100'}`
                      }`}
                    >
                      <span className="w-5 text-center">{chapter.icon}</span>
                      <span className="truncate">{chapter.title}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Desktop Sidebar TOC - Fixed Left */}
      <motion.aside
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className={`fixed left-4 top-24 z-30 w-64 hidden lg:block`}
      >
        <div className={`${theme.card} backdrop-blur-md p-5 rounded-2xl border ${theme.border} shadow-lg max-h-[calc(100vh-8rem)] overflow-y-auto`}>
          <div className="flex items-center gap-2 mb-4 pb-3 border-b ${theme.border}">
            <BookOpen size={16} className={theme.accent} />
            <p className={`text-xs uppercase tracking-widest ${theme.textMuted} font-semibold`}>Daftar Isi</p>
          </div>
          
          <nav className="space-y-1">
            {chapters.map((chapter, idx) => (
              <motion.a
                key={chapter.id}
                href={`#${chapter.id}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + idx * 0.05 }}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                  activeSection === chapter.id 
                    ? `${theme.accentBg} ${theme.accent} font-medium` 
                    : `${theme.textMuted} hover:${darkMode ? 'bg-stone-800/50' : 'bg-stone-100/50'}`
                }`}
              >
                <span className="w-5 text-center text-xs">{chapter.icon}</span>
                <span className="truncate leading-tight">{chapter.title}</span>
              </motion.a>
            ))}
          </nav>

          {/* Mini Progress in Sidebar */}
          <div className={`mt-4 pt-4 border-t ${theme.border}`}>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className={theme.textMuted}>Progress</span>
              <span className={theme.accent}>{Math.round(readingProgress)}%</span>
            </div>
            <div className={`h-1 rounded-full ${darkMode ? 'bg-stone-800' : 'bg-stone-200'}`}>
              <motion.div 
                className={`h-full rounded-full ${theme.accent.replace('text-', 'bg-')}`}
                style={{ width: `${readingProgress}%` }}
              />
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Scroll to Top */}
      <AnimatePresence>
        {readingProgress > 10 && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`fixed bottom-6 right-6 z-40 p-3 rounded-full ${theme.card} border ${theme.border} shadow-lg ${theme.accent} hover:scale-110 transition-transform`}
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <main className={`relative z-20 max-w-2xl mx-auto px-6 pt-24 pb-20 lg:ml-72 lg:mr-auto xl:mx-auto`}>
        
        {/* Hero Section */}
        <motion.section 
          style={{ opacity: opacityHero, y: textY }}
          className="text-center mb-32 md:mb-40 pt-16"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${theme.accentBg} border-2 ${theme.accentBorder} mb-8 relative`}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className={`absolute inset-0 rounded-full border-2 border-dashed ${theme.accentBorder}`}
            />
            <Coffee size={40} className={theme.accent} />
          </motion.div>
          
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.h1 
              variants={fadeInUp}
              className={`font-serif text-5xl md:text-7xl font-light tracking-tight ${theme.textHeading} leading-[1.1] mb-6`}
            >
              SENI MENYEDUH
              <br />
              <span className={`italic ${theme.accent}`}>KEHIDUPAN</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className={`text-lg md:text-xl ${theme.textMuted} font-light tracking-wide max-w-lg mx-auto leading-relaxed mb-8`}
            >
              Refleksi tentang Rasa, Waktu, dan Kesabaran dalam Secangkir Kopi
            </motion.p>

            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4 mb-8">
              <span className={`w-16 h-px ${darkMode ? 'bg-stone-700' : 'bg-stone-300'}`} />
              <span className={`text-2xl ${theme.accent}`}>✦</span>
              <span className={`w-16 h-px ${darkMode ? 'bg-stone-700' : 'bg-stone-300'}`} />
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-2">
              <p className={`text-sm uppercase tracking-[0.3em] ${theme.textMuted}`}>Ditulis oleh</p>
              <p className={`font-serif text-3xl ${theme.textHeading} italic`}>Wildan Ferdiansyah</p>
            </motion.div>

            <motion.blockquote 
              variants={scaleIn}
              className={`mt-12 p-8 ${theme.highlight} border-l-4 ${theme.quoteBorder} rounded-r-xl relative overflow-hidden`}
            >
              <Quote size={24} className={`absolute top-4 right-4 ${theme.accent} opacity-20`} />
              <p className={`font-serif text-xl md:text-2xl italic ${theme.accent} leading-relaxed relative z-10`}>
                "Setiap tetes kopi adalah perjalanan tentang menerima waktu dan percaya pada proses."
              </p>
            </motion.blockquote>

            <motion.p variants={fadeInUp} className={`${theme.textMuted} text-sm italic mt-8`}>
              Diseduh dengan hati, 2025
            </motion.p>
          </motion.div>
        </motion.section>

        {/* Kata Pengantar */}
        <motion.section 
          id="kata-pengantar"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-28 md:mb-36 scroll-mt-28"
        >
          <motion.div variants={fadeInUp} className={`flex items-center gap-4 mb-12`}>
            <span className={`w-12 h-px ${darkMode ? 'bg-amber-700/50' : 'bg-amber-500'}`} />
            <h2 className={`text-xs uppercase tracking-[0.3em] ${theme.accent} font-semibold`}>Kata Pengantar</h2>
          </motion.div>
          
          <motion.div variants={staggerContainer} className="space-y-6">
            <motion.p 
              variants={fadeInUp}
              className={`text-lg md:text-xl leading-[1.9] ${theme.text} font-light first-letter:text-6xl first-letter:font-serif first-letter:${theme.accent} first-letter:float-left first-letter:mr-3 first-letter:mt-[-8px]`}
            >
              Kopi mengajarkan kesabaran — bukan hanya dalam menunggu tetesan yang jatuh perlahan, tetapi juga dalam memahami bahwa setiap hal memiliki waktunya sendiri. Tidak semua rasa muncul sekaligus; ada yang perlu waktu untuk larut, ada pula yang harus menunggu panas merata agar maknanya sempurna.
            </motion.p>
            
            {[
              "Dalam proses menyeduh, kita belajar bahwa tergesa hanya membuat pahit yang berlebihan. Sementara menunda terlalu lama justru membuat aroma kehilangan esensinya. Hidup pun serupa: ada ritme yang tak terlihat, dan tugas kita hanyalah menyelaraskan diri dengannya.",
              "Kesabaran bukan berarti diam tanpa arah, melainkan kesediaan untuk berjalan dengan tenang, meski hasil belum tampak di depan mata. Seperti air yang perlahan menembus biji kopi, kita belajar bahwa keindahan membutuhkan waktu dan ketulusan.",
              "Dalam setiap tetes kopi, tersimpan perjalanan tentang menerima waktu, tentang kepercayaan kepada proses. Dan pada akhirnya, kita menyadari bahwa yang kita nikmati bukan hanya rasa, melainkan perjalanan itu sendiri."
            ].map((text, i) => (
              <motion.p key={i} variants={fadeInUp} className={`text-lg md:text-xl leading-[1.9] ${theme.text} font-light`}>
                {text}
              </motion.p>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-12 text-right">
            <p className={`${theme.textMuted} italic font-serif text-lg`}>Dengan hangat dan sepenuh jiwa,</p>
            <p className={`${theme.textHeading} font-serif text-2xl mt-2`}>Wildan Ferdiansyah</p>
          </motion.div>
        </motion.section>

        {/* Pendahuluan */}
        <motion.section 
          id="pendahuluan"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-28 md:mb-36 scroll-mt-28"
        >
          <motion.div variants={fadeInUp} className={`flex items-center gap-4 mb-12`}>
            <span className={`w-12 h-px ${darkMode ? 'bg-amber-700/50' : 'bg-amber-500'}`} />
            <h2 className={`text-xs uppercase tracking-[0.3em] ${theme.accent} font-semibold`}>Pendahuluan</h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-6">
            <motion.p variants={fadeInUp} className={`text-lg md:text-xl leading-[1.9] ${theme.text} font-light`}>
              Kopi adalah tentang <strong className={theme.textHeading}>keseimbangan</strong> — antara rasa, waktu, dan ketepatan. Setiap unsur saling melengkapi, menghadirkan harmoni yang tak dapat diciptakan dengan satu elemen saja.
            </motion.p>

            <motion.div variants={fadeInUp} className={`my-8 p-6 ${theme.card} border ${theme.border} rounded-xl relative overflow-hidden`}>
              <motion.div 
                className={`absolute -right-8 -top-8 w-32 h-32 rounded-full ${theme.accentBg} blur-3xl`}
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <p className={`relative z-10 text-lg leading-relaxed ${theme.text}`}>
                Seperti hidup, keseimbangan bukan berarti tanpa tekanan, melainkan <span className={theme.accent}>tahu kapan harus memberi ruang dan kapan harus bertindak</span>.
              </p>
            </motion.div>

            {[
              "Air yang terlalu panas akan membakar, yang terlalu dingin takkan mampu mengekstrak rasa. Begitu pula kita, yang kadang perlu belajar menemukan suhu ideal dalam menghadapi hidup.",
              "Kita terlalu sering berada di ekstrem: terlalu cepat atau terlalu lambat, terlalu keras atau terlalu lembut. Padahal kebijaksanaan sejati terletak di tengah — di ruang hening tempat kita belajar memahami diri.",
              "Keseimbangan juga tentang rasa — pahit, manis, dan asam, yang masing-masing memiliki tempatnya. Tak ada rasa yang sia-sia, karena semuanya hadir untuk melatih kita mengenal hidup lebih dalam.",
              "Hidup, seperti secangkir kopi, menuntut kita untuk hadir sepenuhnya. Untuk menakar, menunggu, dan merasakan setiap proses tanpa terburu-buru menuju hasil. Di sanalah keseimbangan sejati lahir — bukan dari kesempurnaan, tapi dari penerimaan."
            ].map((text, i) => (
              <motion.p key={i} variants={fadeInUp} className={`text-lg leading-[1.9] ${theme.text} font-light`}>
                {text}
              </motion.p>
            ))}

            <motion.p variants={fadeInUp} className={`text-lg leading-[1.9] ${theme.textHeading} italic mt-8`}>
              Mari kita belajar menyeduh bukan hanya kopi, tapi juga diri kita sendiri. Pelan-pelan, dengan sabar, seimbang, dan penuh makna.
            </motion.p>
          </motion.div>
        </motion.section>

        {/* Section Title */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
          className={`text-center py-16 md:py-24 border-y ${theme.border} my-16`}
        >
          <motion.h2 
            className={`font-serif text-3xl md:text-5xl ${theme.textHeading} italic mb-4`}
            whileInView={{ opacity: [0.5, 1], scale: [0.98, 1] }}
            transition={{ duration: 0.8 }}
          >
            Seni Menyeduh Kehidupan
          </motion.h2>
          <motion.div 
            className="flex items-center justify-center gap-3 mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className={`w-8 h-px ${darkMode ? 'bg-amber-800' : 'bg-amber-300'}`} />
            <span className={`${theme.accent} text-xl`}>✦</span>
            <span className={`w-8 h-px ${darkMode ? 'bg-amber-800' : 'bg-amber-300'}`} />
          </motion.div>
        </motion.section>

        {/* Daftar Isi - Mobile Only (Desktop moved to sidebar) */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className={`mb-28 md:mb-36 ${theme.card} p-8 md:p-12 rounded-2xl border ${theme.border} backdrop-blur-sm lg:hidden`}
        >
          <motion.h3 variants={fadeInUp} className={`text-center font-serif text-2xl ${theme.accent} mb-10`}>
            ✨ Daftar Isi ✨
          </motion.h3>
          
          <motion.nav variants={staggerContainer} className="space-y-3 max-w-lg mx-auto">
            {chapters.slice(2).map((chapter, idx) => (
              <motion.a 
                key={chapter.id}
                variants={fadeInUp}
                href={`#${chapter.id}`}
                whileHover={{ x: 8 }}
                className={`group flex items-center justify-between py-3 border-b ${theme.border} last:border-0 transition-colors`}
              >
                <span className={`${theme.text} group-hover:${theme.accent} transition-colors font-light`}>
                  <span className="mr-3">{chapter.icon}</span>
                  {chapter.title}
                </span>
                <span className={`${theme.textMuted} font-serif italic text-sm group-hover:${theme.accent} transition-colors`}>
                  {5 + idx * 6}
                </span>
              </motion.a>
            ))}
          </motion.nav>

          <motion.p variants={fadeInUp} className={`text-center ${theme.textMuted} text-sm mt-8 italic`}>
            — Diseduh dengan hati oleh Wildan F —
          </motion.p>
        </motion.section>

        {/* Bab 1 */}
        <motion.section 
          id="bab-1"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-28 md:mb-36 scroll-mt-28"
        >
          <motion.div variants={fadeInUp} className={`flex items-baseline gap-4 mb-8 pb-4 border-b ${theme.border}`}>
            <span className={`${theme.accent} text-sm font-medium tracking-widest`}>BAB 01</span>
            <h2 className={`font-serif text-3xl md:text-4xl ${theme.textHeading}`}>Dari Biji ke Jiwa</h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-6">
            {[
              "Setiap kali aku menggenggam segenggam biji kopi, ada perasaan hangat yang sulit dijelaskan—seolah aku sedang memegang sesuatu yang hidup. Bukan hanya karena aroma segarnya yang khas, tapi karena aku tahu biji-biji kecil itu telah melalui perjalanan panjang dan penuh makna.",
              "Kita semua memulai perjalanan dari sesuatu yang sederhana—kecil, polos, dan penuh potensi. Lalu hidup memanggang kita dengan berbagai pengalaman: rasa gagal, kehilangan, cinta, kecewa, tawa, dan harapan. Setiap \"sangrai\" itu meninggalkan bekas, mengubah kita sedikit demi sedikit, hingga akhirnya kita memiliki aroma dan rasa yang khas: diri kita sendiri.",
              "Suatu hari, seorang pelanggan berkata padaku, \"Kopi yang enak itu bukan yang mahal, tapi yang punya cerita.\" Kalimat itu menempel di pikiranku, karena memang benar—bukan harga yang menentukan nilai, tetapi perjalanan di baliknya.",
              "Biji yang belum matang tidak bisa dipaksa dipetik. Begitu juga manusia. Kadang kita ingin buru-buru sampai—ingin sukses hari ini, bahagia sekarang juga. Tapi hidup punya ritmenya sendiri.",
              "Saat aku menatap biji-biji yang menari di dalam grinder, aku teringat satu hal: kadang kita perlu dihancurkan dulu untuk mengeluarkan aroma terbaik dari dalam diri. Tidak nyaman memang, seperti biji yang hancur menjadi bubuk halus—namun dari situlah kehidupan mulai mengalir.",
              "Mungkin begitulah cara semesta bekerja. Tekanan, panas, dan waktu bukan hukuman; mereka adalah cara hidup mengeluarkan versi terbaik dari kita."
            ].map((text, i) => (
              <motion.p key={i} variants={fadeInUp} className={`text-lg leading-[1.9] ${theme.text} font-light`}>
                {text}
              </motion.p>
            ))}
          </motion.div>

          <motion.blockquote 
            variants={scaleIn}
            className={`mt-10 pl-6 border-l-4 ${theme.quoteBorder} ${theme.accent} italic font-serif text-xl md:text-2xl py-4`}
          >
            "Hidup bukan tentang seberapa cepat kita diseduh, tapi seberapa dalam kita memberi rasa."
          </motion.blockquote>
        </motion.section>

        {/* Bab 2 */}
        <motion.section 
          id="bab-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-28 md:mb-36 scroll-mt-28"
        >
          <motion.div variants={fadeInUp} className={`flex items-baseline gap-4 mb-8 pb-4 border-b ${theme.border}`}>
            <span className={`${theme.secondary} text-sm font-medium tracking-widest`}>BAB 02</span>
            <h2 className={`font-serif text-3xl md:text-4xl ${theme.textHeading}`}>💧 Air dan Keseimbangan</h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-6">
            <motion.p variants={fadeInUp} className={`text-lg leading-[1.9] ${theme.text} font-light`}>
              Setelah biji kopi digiling dengan hati-hati, ada satu elemen yang menentukan segalanya: <strong className={theme.textHeading}>air</strong>. Tanpa air, kopi hanyalah bubuk pahit tanpa makna. Tapi dengan air yang tepat, ia berubah menjadi sesuatu yang hidup, hangat, dan penuh cerita.
            </motion.p>

            <motion.div variants={fadeInUp} className={`my-8 p-6 ${theme.card} border ${theme.border} rounded-xl relative overflow-hidden`}>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10"
                animate={{ x: ["0%", "100%", "0%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <p className={`relative z-10 text-lg leading-relaxed ${theme.text}`}>
                Air tampak sederhana, tapi ia menyimpan <span className={theme.secondary}>kekuatan luar biasa</span>. Ia bisa meresap, menembus, dan menyatukan. Dalam dunia kopi, air bukan hanya pelarut rasa—ia adalah jembatan antara kopi dan manusia.
              </p>
            </motion.div>

            {[
              "Pagi itu, aku menyiapkan seduhan untuk pelanggan tetap. Ia selalu memesan kopi yang sama, tapi hari itu rasanya sedikit berbeda. \"Sedikit lebih pahit, ya?\" katanya sambil tersenyum. Aku menatap timbangan dan termometer—suhu airku terlalu tinggi dua derajat. Sekecil itu, tapi rasanya berubah.",
              "Air mengajarkan kita untuk seimbang. Ia tidak menolak bentuk cangkir yang menampungnya; ia menerima, beradaptasi, dan tetap jernih. Kadang lembut seperti tetesan pour-over yang pelan, kadang kuat seperti semburan espresso di bawah tekanan tinggi.",
              "Ada masa ketika aku dulu \"terlalu panas\" menghadapi hidup. Aku ingin semuanya cepat selesai—karier, mimpi, cinta. Tapi seperti kopi yang diseduh air mendidih, aku malah kehilangan rasa."
            ].map((text, i) => (
              <motion.p key={i} variants={fadeInUp} className={`text-lg leading-[1.9] ${theme.text} font-light`}>
                {text}
              </motion.p>
            ))}
          </motion.div>

          <motion.blockquote 
            variants={scaleIn}
            className={`mt-10 pl-6 border-l-4 border-blue-500 ${theme.secondary} italic font-serif text-xl py-4`}
          >
            "Hidup adalah tentang suhu dan kadar: terlalu panas, kita meledak; terlalu dingin, kita membeku. Di tengah-tengahnya, kita menemukan keseimbangan."
          </motion.blockquote>
        </motion.section>

        {/* Bab 3-9 Placeholders */}
        {[3, 4, 5, 6, 7, 8, 9].map((babNum) => {
          const titles = [
            "Suhu, Tekanan, dan Ketahanan",
            "Grind Size: Tentang Detail dan Kesabaran", 
            "Waktu Seduh dan Kesabaran",
            "Rasa: Pahit, Manis, dan Seimbang",
            "Ritual Kopi, Ritual Diri",
            "Seni Menyeduh Kehidupan",
            "Kopi, Waktu, dan Keheningan"
          ];
          const icons = ["🔥", "⚙", "⏳", "☕", "🌿", "☀", "🌙"];
          const colors = ["text-orange-500", "text-stone-400", "text-purple-400", "text-yellow-600", "text-green-500", "text-amber-500", "text-indigo-400"];
          
          return (
            <motion.section
              key={babNum}
              id={`bab-${babNum}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="mb-28 md:mb-36 scroll-mt-28"
            >
              <motion.div variants={fadeInUp} className={`flex items-baseline gap-4 mb-8 pb-4 border-b ${theme.border}`}>
                <span className={`${colors[babNum-3]} text-sm font-medium tracking-widest`}>BAB 0{babNum}</span>
                <h2 className={`font-serif text-3xl md:text-4xl ${theme.textHeading}`}>
                  {icons[babNum-3]} {titles[babNum-3]}
                </h2>
              </motion.div>
              
              <motion.div variants={fadeInUp} className={`p-8 ${theme.card} border ${theme.border} rounded-xl`}>
                <p className={`text-lg leading-relaxed ${theme.text} font-light italic`}>
                  [Konten lengkap Bab {babNum} akan ditampilkan di sini dengan format yang sama—paragraf demi paragraf dengan animasi stagger, blockquote di akhir, dan visual yang sesuai tema bab.]
                </p>
              </motion.div>
            </motion.section>
          );
        })}

        {/* Bab 10 - Penutup */}
        <motion.section 
          id="bab-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-28 md:mb-36 scroll-mt-28"
        >
          <motion.div variants={fadeInUp} className={`flex items-baseline gap-4 mb-8 pb-4 border-b ${theme.border}`}>
            <span className={`${theme.accent} text-sm font-medium tracking-widest`}>BAB 10</span>
            <h2 className={`font-serif text-3xl md:text-4xl ${theme.textHeading}`}>💭 Penutup: Menyeduh dengan Jiwa</h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-6">
            <motion.p variants={fadeInUp} className={`text-lg leading-[1.9] ${theme.text} font-light`}>
              Kopi telah menjadi guru yang setia. Dari biji hingga cangkir, dari aroma hingga rasa, ia mengajarkan bahwa hidup bukan tentang kesempurnaan, tapi tentang <strong className={theme.textHeading}>keberanian untuk hadir sepenuhnya</strong>.
            </motion.p>

            <motion.p variants={fadeInUp} className={`text-lg leading-[1.9] ${theme.text} font-light`}>
              Menjadi manusia yang "diseduh dengan jiwa" berarti menjalani hidup dengan sadar menghargai proses, menerima pahit dan manisnya, dan tidak takut menghadapi tekanan.
            </motion.p>

            <motion.div variants={fadeInUp} className={`my-12 p-8 ${theme.accentBg} border-2 ${theme.accentBorder} rounded-xl relative overflow-hidden`}>
              <motion.div 
                className={`absolute top-0 right-0 w-64 h-64 rounded-full ${theme.accentBg} blur-3xl opacity-30`}
                animate={{ scale: [1, 1.3, 1], x: [0, 20, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              />
              <p className={`relative z-10 text-lg md:text-xl leading-relaxed ${theme.text} font-light`}>
                Jadi, lain kali saat kamu menyeduh kopi, lakukanlah dengan hati. Lihat bagaimana air bertemu bubuk, dengarkan bunyi halus saat kopi menetes, hirup aromanya, dan rasakan kehangatannya.
              </p>
              <p className={`relative z-10 mt-4 text-lg ${theme.accent} font-serif italic`}>
                Di situ, kamu sedang belajar menyeduh kehidupanmu sendiri.
              </p>
            </motion.div>
          </motion.div>

          <motion.blockquote 
            variants={scaleIn}
            className={`mt-12 text-center`}
          >
            <p className={`font-serif text-2xl md:text-3xl ${theme.accent} italic leading-relaxed mb-4`}>
              "Seni menyeduh kehidupan bukan tentang kopi, tapi tentang bagaimana kita hadir sepenuhnya, dengan jiwa."
            </p>
            <p className={`${theme.textMuted} font-serif`}>-iamwildan</p>
          </motion.blockquote>
        </motion.section>

        {/* Epilog */}
        <motion.section 
          id="epilog"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className={`mb-20 md:mb-28 border-t-2 ${theme.border} pt-16`}
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4 mb-12">
            <span className={`w-12 h-px ${darkMode ? 'bg-stone-700' : 'bg-stone-300'}`} />
            <h2 className={`text-xs uppercase tracking-[0.3em] ${theme.textMuted} font-semibold`}>Epilog</h2>
            <span className={`w-12 h-px ${darkMode ? 'bg-stone-700' : 'bg-stone-300'}`} />
          </motion.div>

          <motion.h3 variants={fadeInUp} className={`text-center font-serif text-3xl md:text-4xl ${theme.textHeading} mb-8 italic`}>
            Saat Aroma Terakhir Menguap
          </motion.h3>

          <motion.div variants={staggerContainer} className={`max-w-2xl mx-auto space-y-6 ${theme.text} font-light text-lg leading-[1.9]`}>
            <motion.p variants={fadeInUp}>
              Kopi selalu tahu caranya mengajarkan perpisahan dengan lembut. Ia tak pernah memaksa untuk tetap hangat, ia hanya hadir sejenak — mengisi ruang dengan aroma, lalu perlahan pergi meninggalkan rasa.
            </motion.p>

            <motion.p variants={fadeInUp}>
              Mungkin begitulah hidup dan semua pertemuan di dalamnya: <span className={theme.accent}>sementara, tapi bermakna</span>.
            </motion.p>

            <motion.p variants={fadeInUp}>
              Aku sering berpikir, mungkin kita semua hanyalah biji-biji kopi kecil yang sedang diseduh oleh waktu. Setiap tekanan, panas, dan diamnya bukan untuk menghancurkan, tapi untuk membangkitkan rasa terbaik dari dalam diri.
            </motion.p>

            <motion.div variants={fadeInUp} className={`my-12 p-8 ${theme.card} border ${theme.border} rounded-xl text-center`}>
              <p className={`${theme.textHeading} text-xl italic mb-4`}>
                "Setiap tetes kopi adalah doa kecil yang diseduh perlahan — mengajarkan kita bahwa keindahan selalu lahir dari kesabaran."
              </p>
              <div className={`flex items-center justify-center gap-2 ${theme.accent}`}>
                <Coffee size={16} />
                <span className="text-sm">Wildan Ferdiansyah</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className={`text-center pt-16 pb-12 border-t ${theme.border}`}
        >
          <motion.div 
            className="flex items-center justify-center gap-4 mb-8"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <span className={`w-16 h-px ${darkMode ? 'bg-stone-700' : 'bg-stone-300'}`} />
            <Coffee size={20} className={theme.accent} />
            <span className={`w-16 h-px ${darkMode ? 'bg-stone-700' : 'bg-stone-300'}`} />
          </motion.div>
          
          <p className={`${theme.textMuted} text-sm font-light`}>
            Diseduh dengan hati oleh <span className={theme.accent}>Wildan Ferdiansyah</span>
          </p>
          <p className={`${theme.textMuted} text-xs mt-2 opacity-60`}>© 2025</p>
        </motion.footer>

      </main>
    </div>
  );
}
