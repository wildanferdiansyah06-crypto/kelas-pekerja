'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { Moon, Sun, Coffee, BookOpen, ChevronUp, Quote, Settings2, X, Type, Palette, Eye, EyeOff } from 'lucide-react';
import { useReducedMotion } from "@/src/hooks/useReducedMotion";

export default function SeniMenyeduhiKehidupanPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [showTexture, setShowTexture] = useState(true);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [showControls, setShowControls] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const reducedMotion = useReducedMotion();

  // Smooth progress untuk reading indicator
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Sync dengan tema global
  useEffect(() => {
    const checkGlobalTheme = () => {
      const html = document.documentElement;
      if (html.classList.contains('dark')) setDarkMode(true);
      else if (html.classList.contains('light')) setDarkMode(false);
    };
    
    checkGlobalTheme();
    
    const observer = new MutationObserver(checkGlobalTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  // Toggle tema & sync ke global
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  };

  // Track active section untuk TOC
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = darkMode ? {
    bg: 'bg-[#0c0a09]',
    bgGradient: 'from-stone-950 via-[#1c1917] to-stone-950',
    text: 'text-stone-300',
    textMuted: 'text-stone-500',
    textHeading: 'text-amber-50',
    accent: 'text-amber-500',
    accentBg: 'bg-amber-500/10',
    accentBorder: 'border-amber-500/30',
    secondary: 'text-orange-400',
    border: 'border-stone-800',
    card: 'bg-stone-900/40',
    hover: 'hover:bg-stone-800/40',
    quoteBorder: 'border-l-amber-500',
    tocActive: 'bg-amber-500/10 text-amber-500',
    progress: 'bg-amber-600'
  } : {
    bg: 'bg-[#faf9f7]',
    bgGradient: 'from-[#faf9f7] via-[#f5f3f0] to-[#faf9f7]',
    text: 'text-[#4a4a4a]',
    textMuted: 'text-[#6a6a6a]',
    textHeading: 'text-[#2d2d2d]',
    accent: 'text-[#8b7355]',
    accentBg: 'bg-[#e5e2dd]/50',
    accentBorder: 'border-[#d4d0c8]',
    secondary: 'text-[#6b5d4f]',
    border: 'border-[#e5e2dd]',
    card: 'bg-white/60',
    hover: 'hover:bg-stone-100/80',
    quoteBorder: 'border-l-amber-600',
    tocActive: 'bg-amber-100 text-amber-700',
    progress: 'bg-amber-700'
  };

  const fontSizeClasses = fontSize === 'large' ? {
    body: 'text-lg md:text-xl leading-relaxed',
    heading: 'text-3xl md:text-5xl',
    subheading: 'text-xl md:text-2xl',
    small: 'text-sm'
  } : {
    body: 'text-base md:text-lg leading-[1.8]',
    heading: 'text-2xl md:text-4xl',
    subheading: 'text-lg md:text-xl',
    small: 'text-xs'
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 }}
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
  };

  const viewportConfig = { once: true, amount: 0.15 };

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
    <div ref={containerRef} className={`${theme.bg} ${theme.text} transition-colors duration-700 overflow-x-hidden selection:bg-amber-900/30 selection:text-amber-100 w-full`}>
      
      {/* Background - Coffee Aesthetic */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 bg-gradient-to-b ${theme.bgGradient} opacity-50`} />
        
        {/* Coffee Ring Stains */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: showTexture ? 0.4 : 0 }}
          transition={{ duration: 1 }}
          className={`absolute top-20 right-[10%] w-64 h-64 rounded-full border-[3px] ${darkMode ? 'border-amber-900/20' : 'border-amber-800/10'} ${darkMode ? 'shadow-[inset_0_0_40px_rgba(120,53,15,0.1)]' : 'shadow-[inset_0_0_40px_rgba(180,83,9,0.05)]'}`}
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: showTexture ? 0.3 : 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className={`absolute top-32 right-[12%] w-48 h-48 rounded-full border-2 ${darkMode ? 'border-amber-950/30' : 'border-amber-900/5'}`}
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: showTexture ? 0.35 : 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className={`absolute bottom-40 left-[5%] w-80 h-80 rounded-full border-[2px] ${darkMode ? 'border-amber-900/15' : 'border-amber-800/8'} ${darkMode ? 'shadow-[inset_0_0_60px_rgba(120,53,15,0.08)]' : 'shadow-[inset_0_0_60px_rgba(180,83,9,0.03)]'}`}
        />
        
        {/* Coffee Beans */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className={`absolute top-1/4 left-[8%] w-4 h-8 ${darkMode ? 'text-amber-900/20' : 'text-amber-700/10'} rounded-full opacity-30 blur-[1px]`}
          style={{ transform: 'rotate(45deg)' }}
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className={`absolute bottom-1/3 right-[12%] w-3 h-6 ${darkMode ? 'text-amber-900/20' : 'text-amber-700/10'} rounded-full opacity-20 blur-[1px]`}
          style={{ transform: 'rotate(-30deg)' }}
        />
        
        {/* Steam Pattern */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="steam" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M50 100 Q30 50 50 0" stroke="currentColor" strokeWidth="0.5" fill="none" className={darkMode ? 'text-amber-700' : 'text-amber-600'} />
              <path d="M70 100 Q90 50 70 20" stroke="currentColor" strokeWidth="0.5" fill="none" className={darkMode ? 'text-amber-700' : 'text-amber-600'} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#steam)" />
        </svg>
      </div>

      {/* NEW: Progress Indicator - Circular/Side Style */}
      <div className="fixed top-24 right-6 z-40 hidden md:flex flex-col items-center gap-2">
        <div className={`relative w-12 h-12 rounded-full ${darkMode ? 'bg-stone-900/80' : 'bg-white/80'} backdrop-blur-md border ${theme.border} shadow-lg flex items-center justify-center`}>
          <svg className="w-8 h-8 -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={darkMode ? '#292524' : '#e7e5e4'}
              strokeWidth="3"
            />
            <motion.path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={darkMode ? '#d97706' : '#b45309'}
              strokeWidth="3"
              strokeDasharray="100, 100"
              style={{ pathLength: smoothProgress }}
            />
          </svg>
          <motion.div 
            className={`absolute inset-0 rounded-full border-2 ${theme.accentBorder}`}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <span className={`${theme.textMuted} text-[10px] uppercase tracking-wider`}>Baca</span>
      </div>

      {/* Mobile Progress - Top edge glow */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 md:hidden">
        <motion.div 
          className={`h-full ${theme.progress} shadow-[0_0_10px_rgba(217,119,6,0.5)]`}
          style={{ width: useTransform(smoothProgress, v => `${v * 100}%`) }}
        />
      </div>

      {/* Main Content - PERLEBAR max-w-2xl -> max-w-4xl */}
      <main className={`relative z-20 max-w-4xl mx-auto px-6 md:px-12 pt-16 pb-20`}>
        
        {/* Hero */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="text-center mb-32 md:mb-40 pt-16"
        >
          <motion.div 
            variants={scaleIn}
            className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${theme.accentBg} border-2 ${theme.accentBorder} mb-8 relative`}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className={`absolute inset-0 rounded-full border-2 border-dashed ${theme.accentBorder}`}
            />
            <Coffee size={40} className={theme.accent} />
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className={`font-serif ${fontSizeClasses.heading} font-light tracking-tight ${theme.textHeading} leading-[1.1] mb-6`}
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
            className={`mt-12 p-8 ${theme.accentBg} border-l-4 ${theme.quoteBorder} rounded-r-xl relative overflow-hidden`}
          >
            <Quote size={24} className={`absolute top-4 right-4 ${theme.accent} opacity-20`} />
            <p className={`font-serif text-xl md:text-2xl italic ${theme.accent} leading-relaxed relative z-10`}>
              "Setiap tetes kopi adalah perjalanan tentang menerima waktu dan percaya pada proses."
            </p>
          </motion.blockquote>

          <motion.p variants={fadeInUp} className={`${theme.textMuted} text-sm italic mt-8`}>
            Diseduh dengan hati, 2025
          </motion.p>
        </motion.section>

        {/* TOC - In Content (Desktop & Mobile) */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className={`mb-28 md:mb-36 ${theme.card} p-6 md:p-8 rounded-2xl border ${theme.border} backdrop-blur-sm`}
        >
          <motion.h3 variants={fadeInUp} className={`text-center font-serif text-2xl ${theme.accent} mb-6 flex items-center justify-center gap-2`}>
            <BookOpen size={20} />
            Daftar Isi
          </motion.h3>
          
          <motion.nav variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {chapters.map((chapter) => (
              <motion.a 
                key={chapter.id}
                variants={fadeInUp}
                href={`#${chapter.id}`}
                className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-all text-sm ${
                  activeSection === chapter.id 
                    ? `${theme.tocActive} font-medium` 
                    : `${theme.textMuted} ${theme.hover}`
                }`}
              >
                <span className="w-6 text-center">{chapter.icon}</span>
                <span className="truncate">{chapter.title}</span>
              </motion.a>
            ))}
          </motion.nav>
        </motion.section>

        {/* Kata Pengantar */}
        <motion.section 
          id="kata-pengantar"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mb-28 md:mb-36 scroll-mt-24"
        >
          <motion.div variants={fadeInUp} className={`flex items-center gap-4 mb-12`}>
            <span className={`w-12 h-px ${darkMode ? 'bg-amber-700/50' : 'bg-amber-500'}`} />
            <h2 className={`text-xs uppercase tracking-[0.3em] ${theme.accent} font-semibold`}>Kata Pengantar</h2>
          </motion.div>
          
          <motion.div variants={staggerContainer} className="space-y-6">
            <motion.p 
              variants={fadeInUp}
              className={`${fontSizeClasses.body} ${theme.text} font-light first-letter:text-6xl first-letter:font-serif first-letter:${theme.accent} first-letter:float-left first-letter:mr-3 first-letter:mt-[-8px]`}
            >
              Kopi mengajarkan kesabaran — bukan hanya dalam menunggu tetesan yang jatuh perlahan, tetapi juga dalam memahami bahwa setiap hal memiliki waktunya sendiri. Tidak semua rasa muncul sekaligus; ada yang perlu waktu untuk larut, ada pula yang harus menunggu panas merata agar maknanya sempurna.
            </motion.p>
            
            {[
              "Dalam proses menyeduh, kita belajar bahwa tergesa hanya membuat pahit yang berlebihan. Sementara menunda terlalu lama justru membuat aroma kehilangan esensinya. Hidup pun serupa: ada ritme yang tak terlihat, dan tugas kita hanyalah menyelaraskan diri dengannya.",
              "Kesabaran bukan berarti diam tanpa arah, melainkan kesediaan untuk berjalan dengan tenang, meski hasil belum tampak di depan mata. Seperti air yang perlahan menembus biji kopi, kita belajar bahwa keindahan membutuhkan waktu dan ketulusan.",
              "Dalam setiap tetes kopi, tersimpan perjalanan tentang menerima waktu, tentang kepercayaan kepada proses. Dan pada akhirnya, kita menyadari bahwa yang kita nikmati bukan hanya rasa, melainkan perjalanan itu sendiri."
            ].map((text, i) => (
              <motion.p key={i} variants={fadeInUp} className={`${fontSizeClasses.body} ${theme.text} font-light`}>
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
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mb-28 md:mb-36 scroll-mt-24"
        >
          <motion.div variants={fadeInUp} className={`flex items-center gap-4 mb-12`}>
            <span className={`w-12 h-px ${darkMode ? 'bg-amber-700/50' : 'bg-amber-500'}`} />
            <h2 className={`text-xs uppercase tracking-[0.3em] ${theme.accent} font-semibold`}>Pendahuluan</h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-6">
            <motion.p variants={fadeInUp} className={`${fontSizeClasses.body} ${theme.text} font-light`}>
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
              <motion.p key={i} variants={fadeInUp} className={`${fontSizeClasses.body} ${theme.text} font-light`}>
                {text}
              </motion.p>
            ))}

            <motion.p variants={fadeInUp} className={`${fontSizeClasses.body} ${theme.textHeading} italic mt-8`}>
              Mari kita belajar menyeduh bukan hanya kopi, tapi juga diri kita sendiri. Pelan-pelan, dengan sabar, seimbang, dan penuh makna.
            </motion.p>
          </motion.div>
        </motion.section>

        {/* Bab 1 */}
        <motion.section 
          id="bab-1"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mb-28 md:mb-36 scroll-mt-24"
        >
          <motion.div variants={fadeInUp} className={`flex items-baseline gap-4 mb-8 pb-4 border-b ${theme.border}`}>
            <span className={`${theme.accent} text-sm font-medium tracking-widest`}>BAB 01</span>
            <h2 className={`font-serif ${fontSizeClasses.subheading} ${theme.textHeading}`}>Dari Biji ke Jiwa</h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-6">
            {[
              "Setiap kali aku menggenggam segenggam biji kopi, ada perasaan hangat yang sulit dijelaskan—seolah aku sedang memegang sesuatu yang hidup. Bukan hanya karena aroma segarnya yang khas, tapi karena aku tahu biji-biji kecil itu telah melalui perjalanan panjang dan penuh makna. Mereka tumbuh di ketinggian, di antara tanah, hujan, dan matahari; menunggu waktu yang tepat untuk dipetik, melewati panasnya proses sangrai, hingga akhirnya tiba di meja bar tempat aku berdiri sekarang.",
              "Kita semua memulai perjalanan dari sesuatu yang sederhana—kecil, polos, dan penuh potensi. Lalu hidup memanggang kita dengan berbagai pengalaman: rasa gagal, kehilangan, cinta, kecewa, tawa, dan harapan. Setiap \"sangrai\" itu meninggalkan bekas, mengubah kita sedikit demi sedikit, hingga akhirnya kita memiliki aroma dan rasa yang khas: diri kita sendiri.",
              "Suatu hari, seorang pelanggan berkata padaku, \"Kopi yang enak itu bukan yang mahal, tapi yang punya cerita.\" Kalimat itu menempel di pikiranku, karena memang benar—bukan harga yang menentukan nilai, tetapi perjalanan di baliknya. Seperti manusia, kita tidak diukur dari pencapaian semata, melainkan dari proses yang membentuk siapa kita hari ini. Kopi mengajarkanku bahwa setiap hal indah membutuhkan waktu; tidak semua bisa dipercepat.",
              "Biji yang belum matang tidak bisa dipaksa dipetik. Begitu juga manusia. Kadang kita ingin buru-buru sampai—ingin sukses hari ini, bahagia sekarang juga. Tapi hidup punya ritmenya sendiri. Jika kita terburu-buru, \"rasa\" kita bisa belum matang.",
              "Saat aku menatap biji-biji yang menari di dalam grinder, aku teringat satu hal: kadang kita perlu dihancurkan dulu untuk mengeluarkan aroma terbaik dari dalam diri. Tidak nyaman memang, seperti biji yang hancur menjadi bubuk halus—namun dari situlah kehidupan mulai mengalir. Ketika air panas menyentuh bubuk kopi, aroma yang tersembunyi mulai keluar. Panas itu menyakitkan, tapi juga membangkitkan kehidupan baru.",
              "Mungkin begitulah cara semesta bekerja. Tekanan, panas, dan waktu bukan hukuman; mereka adalah cara hidup mengeluarkan versi terbaik dari kita. Setiap kali aku menyeduh kopi untuk pelanggan, aku berpikir: setiap cangkir kopi adalah kisah tentang kesabaran, luka, dan keindahan yang berpadu dalam harmoni. Dan setiap kali aku mencicipinya, aku belajar satu hal sederhana—bahwa di balik rasa pahit, selalu ada aroma yang menenangkan. Seperti hidup, yang kadang keras di luar, tapi hangat di dalam.",
              "Jadi, sebelum kamu menyesap kopi berikutnya, berhentilah sejenak. Perhatikan aromanya, rasakan kehangatannya, dan pikirkan perjalanan panjang yang membawanya ke hadapanmu. Karena mungkin, di sana—di antara biji dan jiwa—kamu akan menemukan dirimu sendiri."
            ].map((text, i) => (
              <motion.p key={i} variants={fadeInUp} className={`${fontSizeClasses.body} ${theme.text} font-light`}>
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
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mb-28 md:mb-36 scroll-mt-24"
        >
          <motion.div variants={fadeInUp} className={`flex items-baseline gap-4 mb-8 pb-4 border-b ${theme.border}`}>
            <span className={`${theme.secondary} text-sm font-medium tracking-widest`}>BAB 02</span>
            <h2 className={`font-serif ${fontSizeClasses.subheading} ${theme.textHeading}`}>Air dan Keseimbangan</h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-6">
            <motion.p variants={fadeInUp} className={`${fontSizeClasses.body} ${theme.text} font-light`}>
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
              "Pagi itu, aku menyiapkan seduhan untuk pelanggan tetap. Ia selalu memesan kopi yang sama, tapi hari itu rasanya sedikit berbeda. \"Sedikit lebih pahit, ya?\" katanya sambil tersenyum. Aku menatap timbangan dan termometer—suhu airku terlalu tinggi dua derajat. Sekecil itu, tapi rasanya berubah. Dari situ aku belajar, hidup pun seperti itu. Hal kecil bisa mengubah segalanya. Suhu emosi, kadar sabar, atau intensitas perhatian—semuanya memengaruhi \"rasa\" hari kita. Terlalu panas, kita terbakar. Terlalu dingin, kita membeku.",
              "Air mengajarkan kita untuk seimbang. Ia tidak menolak bentuk cangkir yang menampungnya; ia menerima, beradaptasi, dan tetap jernih. Kadang lembut seperti tetesan pour-over yang pelan, kadang kuat seperti semburan espresso di bawah tekanan tinggi. Tapi dalam segala bentuknya, air tetap air—tenang, lentur, tapi tegas.",
              "Aku sering merenung tentang itu saat menuangkan air ke atas bubuk kopi. Gerakan kecil pergelangan tangan, aliran air yang melingkar, dan ritme napas yang harus dijaga—semuanya menuntut kesadaran. Kalau terburu-buru, hasilnya kacau. Kalau terlalu berhati-hati, airnya keburu dingin. Hidup pun begitu: kita butuh flow yang pas antara niat, tindakan, dan rasa percaya.",
              "Ada masa ketika aku dulu \"terlalu panas\" menghadapi hidup. Aku ingin semuanya cepat selesai—karier, mimpi, cinta. Tapi seperti kopi yang diseduh air mendidih, aku malah kehilangan rasa. Butuh waktu untuk belajar menurunkan suhu, menenangkan diri, dan menyadari bahwa tidak semua hal harus mendidih untuk terasa hidup. Keseimbangan bukan berarti tanpa tekanan, melainkan tahu kapan harus diam dan kapan harus mengalir.",
              "Kadang kita perlu jadi air yang tenang, menenangkan sekitar. Kadang, jadi air yang deras, menembus halangan. Tapi yang paling penting: tetap jernih, apa pun wadahnya.",
              "Setiap kali aku menatap air yang mengalir dari ketel, aku teringat satu hal sederhana—bahwa keseimbangan tidak datang dari kontrol penuh, tapi dari kemampuan untuk menerima dan menyesuaikan diri. Kopi dan air saling melengkapi. Tanpa kopi, air tak punya rasa. Tanpa air, kopi tak punya makna. Begitu juga manusia: tanpa keseimbangan antara hati dan pikiran, kita hanya akan jadi salah satu—terlalu pahit, atau terlalu hambar.",
              "Maka, sebelum kamu meneguk kopi pagimu, lihatlah air yang menjadi bagian dari seduhan itu. Lihat bagaimana ia mengalir tanpa perlawanan, membawa rasa tanpa kehilangan dirinya. Karena mungkin, di situ kamu akan belajar: menjadi tenang bukan berarti lemah, dan menyesuaikan diri bukan berarti kehilangan jati diri."
            ].map((text, i) => (
              <motion.p key={i} variants={fadeInUp} className={`${fontSizeClasses.body} ${theme.text} font-light`}>
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

        {/* Bab 3 */}
        <motion.section 
          id="bab-3"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mb-28 md:mb-36 scroll-mt-24"
        >
          <motion.div variants={fadeInUp} className={`flex items-baseline gap-4 mb-8 pb-4 border-b ${theme.border}`}>
            <span className={`text-orange-500 text-sm font-medium tracking-widest`}>BAB 03</span>
            <h2 className={`font-serif ${fontSizeClasses.subheading} ${theme.textHeading}`}>Suhu, Tekanan, dan Ketahanan</h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-6">
            {[
              "Di balik setiap cangkir espresso yang sempurna, ada kekuatan yang sering diabaikan: tekanan. Tanpa tekanan, tidak ada crema, tidak ada rasa yang kuat, tidak ada aroma yang menonjol. Mesin espresso bekerja dengan mendorong air panas di bawah tekanan tinggi untuk mengekstraksi rasa terbaik dari bubuk kopi yang halus dan rapat. Dan setiap kali aku menatap mesin itu bekerja, aku selalu berpikir: hidup juga menekan kita dengan cara yang sama.",
              "Dulu aku takut pada tekanan—tekanan dari pekerjaan, ekspektasi, dan diri sendiri. Semua terasa berat, seperti air panas yang siap meledak jika tak tertahan. Tapi kopi mengajarkanku satu hal penting: tekanan tidak selalu berarti kehancuran; kadang justru itu yang membentuk kekuatan rasa.",
              "Aku ingat malam itu, kedai sudah hampir tutup. Seorang pelanggan terakhir datang, wajahnya lelah tapi matanya memohon secangkir espresso. Aku tahu, ia tidak butuh kafein—ia butuh kehangatan. Aku menyalakan mesin, memantau tekanan di manometer, memperhatikan setiap tetes yang keluar. Semakin tinggi tekanannya, semakin pekat warnanya. Dan di detik itu aku sadar, rasa terbaik memang lahir dari tekanan yang pas, bukan dari pelarian.",
              "Kopi yang diseduh tanpa tekanan terasa datar dan hambar, seperti hidup tanpa tantangan. Tapi tekanan yang berlebihan juga bisa menghancurkan rasa—gosong, pahit, tak seimbang. Hidup mengajarkan kita hal yang sama: ketahanan bukan hanya soal kuat menahan beban, tapi juga tahu kapan harus menurunkan panasnya.",
              "Dalam dunia kopi, suhu adalah sahabat sekaligus musuh. Sedikit terlalu panas, kopi terbakar. Terlalu dingin, ekstraksinya gagal. Mungkin begitulah emosi manusia. Ketika marah, kita \"terlalu panas\"; ketika menyerah, kita \"terlalu dingin.\" Butuh ketenangan untuk menjaga suhu hati agar tetap di titik yang pas—hangat, tapi tidak membakar.",
              "Kopi mengajarkanku untuk menghargai tekanan yang datang. Ia menunjukkan bahwa dari situlah lahir sesuatu yang pekat, beraroma, dan bermakna. Tekanan bukan musuh; ia adalah pengingat bahwa kita masih hidup, bahwa kita masih punya sesuatu untuk dikeluarkan dari dalam diri.",
              "Namun tidak semua tekanan baik. Ada kalanya kita perlu \"menurunkan suhu,\" memberi ruang bagi diri sendiri untuk bernapas. Mesin pun butuh waktu istirahat agar tidak rusak. Begitu juga manusia. Kita tidak bisa terus-menerus berada di bawah tekanan tanpa jeda. Kadang kita harus berhenti sejenak, mengangkat tuas, dan membiarkan uapnya keluar agar tidak meledak di dalam.",
              "Tekanan, suhu, dan ketahanan—tiga hal yang menentukan kualitas espresso, juga kualitas manusia. Kopi yang baik bukan kopi yang tidak pernah tertekan, tapi kopi yang tahu bagaimana mengolah tekanan itu menjadi rasa. Hidup yang baik pun bukan hidup tanpa masalah, melainkan hidup yang mampu mengubah tekanan menjadi keteguhan, panas menjadi semangat, dan luka menjadi aroma yang menenangkan.",
              "Setiap kali aku menatap lapisan crema di atas espresso—lembut, keemasan, sempurna—aku selalu berpikir: itulah hasil dari perjuangan, dari panas dan tekanan yang seimbang. Sama seperti kita—di balik senyum yang tenang, selalu ada cerita tentang seberapa kuat kita menahan diri agar tidak hancur di tengah panas kehidupan."
            ].map((text, i) => (
              <motion.p key={i} variants={fadeInUp} className={`${fontSizeClasses.body} ${theme.text} font-light`}>
                {text}
              </motion.p>
            ))}
          </motion.div>

          <motion.blockquote 
            variants={scaleIn}
            className={`mt-10 pl-6 border-l-4 border-orange-500 text-orange-500 italic font-serif text-xl py-4`}
          >
            "Tekanan bukan musuh. Ia hanya cara hidup menanyakan: sudahkah kamu siap mengeluarkan rasa terbaikmu hari ini?"
          </motion.blockquote>
        </motion.section>

        {/* Bab 4 */}
        <motion.section 
          id="bab-4"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mb-28 md:mb-36 scroll-mt-24"
        >
          <motion.div variants={fadeInUp} className={`flex items-baseline gap-4 mb-8 pb-4 border-b ${theme.border}`}>
            <span className={`text-stone-400 text-sm font-medium tracking-widest`}>BAB 04</span>
            <h2 className={`font-serif ${fontSizeClasses.subheading} ${theme.textHeading}`}>Grind Size: Tentang Detail dan Kesabaran</h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-6">
            {[
              "Di dunia kopi, ukuran gilingan adalah hal yang sering diremehkan kecil, tapi menentukan segalanya. Terlalu halus, kopi jadi pahit. Terlalu kasar, rasanya lemah. Butuh ketepatan, kesabaran, dan sedikit intuisi untuk menemukan keseimbangan itu.",
              "Aku pernah menyeduh kopi dengan terburu-buru. Grinder kuatur cepat, tanpa periksa hasilnya. Saat diseduh, kopi itu rasanya aneh seolah kehilangan jati dirinya. Dari situ aku belajar, bahwa dalam hidup pun, kita sering terburu-buru dan kehilangan rasa.",
              "Detail kecil menentukan hasil besar. Cara kita menyapa orang, mendengarkan, bahkan menyeduh kopi untuk diri sendiri semua adalah bentuk perhatian yang sederhana tapi bermakna. Kesabaran bukan berarti lambat, tapi sadar akan proses. Karena setiap hal besar dibangun dari hal-hal kecil yang dilakukan dengan hati.",
              "Kopi yang baik tidak terburu-buru. Dan manusia yang baik, bukan yang cepat selesai tapi yang tidak melewatkan proses penggilingannya. Karena justru di saat-saat kita \"dihaluskan,\" karakter sejati kita terbentuk."
            ].map((text, i) => (
              <motion.p key={i} variants={fadeInUp} className={`${fontSizeClasses.body} ${theme.text} font-light`}>
                {text}
              </motion.p>
            ))}
          </motion.div>

          <motion.blockquote 
            variants={scaleIn}
            className={`mt-10 pl-6 border-l-4 border-stone-400 text-stone-400 italic font-serif text-xl py-4`}
          >
            "Kadang yang membedakan rasa bukan bahan, tapi ketulusan dalam memperhatikan hal-hal kecil."
          </motion.blockquote>
        </motion.section>

        {/* Bab 5 */}
        <motion.section 
          id="bab-5"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mb-28 md:mb-36 scroll-mt-24"
        >
          <motion.div variants={fadeInUp} className={`flex items-baseline gap-4 mb-8 pb-4 border-b ${theme.border}`}>
            <span className={`text-purple-400 text-sm font-medium tracking-widest`}>BAB 05</span>
            <h2 className={`font-serif ${fontSizeClasses.subheading} ${theme.textHeading}`}>Waktu Seduh dan Kesabaran</h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-6">
            {[
              "Tidak ada kopi yang bisa diseduh dalam satu detik.",
              "Waktu adalah bagian dari rasa ia mengikat aroma, menyeimbangkan panas, dan memberi ruang bagi kopi untuk bercerita. Aku sering menyeduh pour-over sambil menatap air menetes perlahan ke dalam cangkir. Setiap tetes seperti menit yang berjalan sabar, tenang, tanpa tergesa.",
              "Jika kupercepat, rasanya belum matang. Jika kutunda terlalu lama, ia kehilangan hangatnya. Begitulah hidup. Kita semua punya \"waktu seduh\" masing-masing. Tidak ada yang benar-benar terlambat, tidak ada yang terlalu cepat. Setiap orang punya waktu yang ditentukan semesta kita hanya perlu percaya prosesnya.",
              "Kesabaran bukan berarti pasrah, tapi tahu kapan harus berhenti mengaduk dan mulai menikmati aroma. Hidup pun begitu ada saat bekerja keras, ada saat menunggu hasilnya. Dan yang indah, terkadang momen menunggu itulah yang membuat hasil akhirnya terasa lebih manis."
            ].map((text, i) => (
              <motion.p key={i} variants={fadeInUp} className={`${fontSizeClasses.body} ${theme.text} font-light`}>
                {text}
              </motion.p>
            ))}
          </motion.div>

          <motion.blockquote 
            variants={scaleIn}
            className={`mt-10 pl-6 border-l-4 border-purple-400 text-purple-400 italic font-serif text-xl py-4`}
          >
            "Rasa terbaik hanya muncul jika kita cukup sabar untuk menunggu aroma muncul sepenuhnya."
          </motion.blockquote>
        </motion.section>

        {/* Bab 6 */}
        <motion.section 
          id="bab-6"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mb-28 md:mb-36 scroll-mt-24"
        >
          <motion.div variants={fadeInUp} className={`flex items-baseline gap-4 mb-8 pb-4 border-b ${theme.border}`}>
            <span className={`text-yellow-600 text-sm font-medium tracking-widest`}>BAB 06</span>
            <h2 className={`font-serif ${fontSizeClasses.subheading} ${theme.textHeading}`}>Rasa: Pahit, Manis, dan Seimbang</h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-6">
            {[
              "Kopi yang sempurna tidak pernah hanya manis. Ia punya pahit yang jujur, asam yang hidup, dan manis yang datang di akhir — seperti hidup.",
              "Aku pernah takut pada rasa pahit. Dulu, aku selalu menambah gula dalam kopi. Tapi semakin lama aku belajar menyeduh, aku sadar: pahit bukan musuh. Ia bagian dari keseimbangan. Tanpanya, manis tidak akan berarti. Hidup pun begitu.",
              "Kita sering ingin semuanya terasa manis — hubungan, pekerjaan, mimpi. Tapi tanpa rasa pahit, kita tidak akan tahu arti syukur. Rasa pahit mengingatkan kita untuk menghargai momen ringan, dan memberi kedalaman pada cerita kita sendiri.",
              "Setiap seduhan punya komposisi unik. Ada yang lebih pekat, ada yang ringan. Begitu juga manusia kita semua punya \"profil rasa\" masing-masing. Tak perlu sama, cukup jujur dengan rasa yang kita bawa."
            ].map((text, i) => (
              <motion.p key={i} variants={fadeInUp} className={`${fontSizeClasses.body} ${theme.text} font-light`}>
                {text}
              </motion.p>
            ))}
          </motion.div>

          <motion.blockquote 
            variants={scaleIn}
            className={`mt-10 pl-6 border-l-4 border-yellow-600 text-yellow-600 italic font-serif text-xl py-4`}
          >
            "Hidup yang seimbang bukan yang selalu manis, tapi yang berani menerima pahit sebagai bagian dari rasa."
          </motion.blockquote>
        </motion.section>

        {/* Bab 7 */}
        <motion.section 
          id="bab-7"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mb-28 md:mb-36 scroll-mt-24"
        >
          <motion.div variants={fadeInUp} className={`flex items-baseline gap-4 mb-8 pb-4 border-b ${theme.border}`}>
            <span className={`text-green-500 text-sm font-medium tracking-widest`}>BAB 07</span>
            <h2 className={`font-serif ${fontSizeClasses.subheading} ${theme.textHeading}`}>Ritual Kopi, Ritual Diri</h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-6">
            {[
              "Setiap pagi, sebelum kedai ramai, aku selalu membuat kopi untuk diriku sendiri.",
              "Bukan karena butuh kafein, tapi karena butuh keheningan. Ritual kecil itu menjadi waktu untuk menenangkan pikiran, menyapa hari, dan berdialog dengan diri sendiri. Menyiapkan kopi perlahan menggiling, menyeduh, menunggu, mencium aroma semuanya seperti meditasi.",
              "Di situ aku belajar hadir. Tidak memikirkan masa lalu, tidak mengkhawatirkan nanti. Hanya di sini, di detik ini. Kita sering hidup terlalu cepat, sampai lupa menikmati momen sederhana. Padahal, seperti kopi, hidup terasa paling nikmat saat kita menikmatinya perlahan.",
              "Ritual itu tidak harus besar. Bisa berupa secangkir kopi, napas panjang di pagi hari, atau menulis tiga hal yang disyukuri sebelum tidur. Yang penting, kita menyisakan ruang untuk mengenali diri karena hidup yang terlalu sibuk tanpa jeda, akan kehilangan rasa."
            ].map((text, i) => (
              <motion.p key={i} variants={fadeInUp} className={`${fontSizeClasses.body} ${theme.text} font-light`}>
                {text}
              </motion.p>
            ))}
          </motion.div>

          <motion.blockquote 
            variants={scaleIn}
            className={`mt-10 pl-6 border-l-4 border-green-500 text-green-500 italic font-serif text-xl py-4`}
          >
            "Ritual kecil menjaga kita tetap waras di tengah hiruk pikuk — seperti kopi yang menjaga hangat di pagi yang dingin."
          </motion.blockquote>
        </motion.section>

        {/* Bab 8 */}
        <motion.section 
          id="bab-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mb-28 md:mb-36 scroll-mt-24"
        >
          <motion.div variants={fadeInUp} className={`flex items-baseline gap-4 mb-8 pb-4 border-b ${theme.border}`}>
            <span className={`${theme.accent} text-sm font-medium tracking-widest`}>BAB 08</span>
            <h2 className={`font-serif ${fontSizeClasses.subheading} ${theme.textHeading}`}>Seni Menyeduh Kehidupan</h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-6">
            {[
              "Hidup, pada akhirnya, adalah tentang cara kita menyeduhnya. Tentang bagaimana kita mengolah panas, tekanan, waktu, dan rasa. Setiap unsur punya perannya, dan tak satu pun bisa diabaikan.",
              "Kopi tidak pernah terburu-buru, tapi juga tidak berdiam terlalu lama. Ia tahu kapan harus berhenti. Hidup juga begitu. Kita harus tahu kapan berjuang, kapan beristirahat, dan kapan menikmati hasil seduhan kita sendiri.",
              "Kadang hidup terasa pahit, kadang manis, tapi yang membuatnya indah adalah cara kita meresapi setiap tegukan.",
              "Kopi mengajarkan bahwa hasil terbaik bukan dari kesempurnaan, tapi dari ketulusan dari niat untuk memberi rasa yang tulus, sekecil apa pun itu."
            ].map((text, i) => (
              <motion.p key={i} variants={fadeInUp} className={`${fontSizeClasses.body} ${theme.text} font-light`}>
                {text}
              </motion.p>
            ))}
          </motion.div>

          <motion.blockquote 
            variants={scaleIn}
            className={`mt-10 pl-6 border-l-4 ${theme.quoteBorder} ${theme.accent} italic font-serif text-xl py-4`}
          >
            "Hidup bukan tentang mencari rasa yang sempurna, tapi tentang belajar menikmati setiap rasa yang datang."
          </motion.blockquote>
        </motion.section>

        {/* Bab 9 */}
        <motion.section 
          id="bab-9"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mb-28 md:mb-36 scroll-mt-24"
        >
          <motion.div variants={fadeInUp} className={`flex items-baseline gap-4 mb-8 pb-4 border-b ${theme.border}`}>
            <span className={`text-indigo-400 text-sm font-medium tracking-widest`}>BAB 09</span>
            <h2 className={`font-serif ${fontSizeClasses.subheading} ${theme.textHeading}`}>Kopi, Waktu, dan Keheningan</h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-6">
            {[
              "Ada saat ketika kedai sudah sepi, lampu tinggal redup, dan aroma kopi terakhir masih tertinggal di udara. Di momen-momen seperti itu, aku sering merenung tentang waktu.",
              "Waktu bukan musuh, ia adalah teman yang diam-diam menemani kita tumbuh. Ia tidak bisa kita percepat, tidak bisa kita ubah, tapi bisa kita nikmati. Seperti kopi yang menua dengan indah di dalam cangkir makin lama dibiarkan, rasanya berubah, tapi tetap punya cerita.",
              "Keheningan malam mengingatkanku untuk tidak selalu melawan waktu. Kadang, diam justru memberi jawaban yang tak bisa dikejar dengan tergesa. Hidup tidak selalu harus ramai; ada makna yang hanya bisa ditemukan dalam senyap, di antara detak jam dan sisa aroma kopi yang perlahan hilang."
            ].map((text, i) => (
              <motion.p key={i} variants={fadeInUp} className={`${fontSizeClasses.body} ${theme.text} font-light`}>
                {text}
              </motion.p>
            ))}
          </motion.div>

          <motion.blockquote 
            variants={scaleIn}
            className={`mt-10 pl-6 border-l-4 border-indigo-400 text-indigo-400 italic font-serif text-xl py-4`}
          >
            "Waktu tidak pernah benar-benar pergi — ia hanya berubah bentuk menjadi kenangan yang menghangatkan."
          </motion.blockquote>
        </motion.section>

        {/* Bab 10 */}
        <motion.section 
          id="bab-10"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mb-28 md:mb-36 scroll-mt-24"
        >
          <motion.div variants={fadeInUp} className={`flex items-baseline gap-4 mb-8 pb-4 border-b ${theme.border}`}>
            <span className={`${theme.accent} text-sm font-medium tracking-widest`}>BAB 10</span>
            <h2 className={`font-serif ${fontSizeClasses.subheading} ${theme.textHeading}`}>Penutup: Menyeduh dengan Jiwa</h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-6">
            <motion.p variants={fadeInUp} className={`${fontSizeClasses.body} ${theme.text} font-light`}>
              Kopi telah menjadi guru yang setia. Dari biji hingga cangkir, dari aroma hingga rasa, ia mengajarkan bahwa hidup bukan tentang kesempurnaan, tapi tentang <strong className={theme.textHeading}>keberanian untuk hadir sepenuhnya</strong>.
            </motion.p>

            <motion.p variants={fadeInUp} className={`${fontSizeClasses.body} ${theme.text} font-light`}>
              Menjadi manusia yang "diseduh dengan jiwa" berarti menjalani hidup dengan sadar menghargai proses, menerima pahit dan manisnya, dan tidak takut menghadapi tekanan.
            </motion.p>

            <motion.div variants={fadeInUp} className={`my-12 p-8 ${theme.accentBg} border-2 ${theme.accentBorder} rounded-xl relative overflow-hidden`}>
              <motion.div 
                className={`absolute top-0 right-0 w-64 h-64 rounded-full ${theme.accentBg} blur-3xl opacity-30`}
                animate={{ scale: [1, 1.3, 1], x: [0, 20, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              />
              <p className={`relative z-10 ${fontSizeClasses.body} ${theme.text} font-light`}>
                Jadi, lain kali saat kamu menyeduh kopi, lakukanlah dengan hati. Lihat bagaimana air bertemu bubuk, dengarkan bunyi halus saat kopi menetes, hirup aromanya, dan rasakan kehangatannya.
              </p>
              <p className={`relative z-10 mt-4 ${fontSizeClasses.subheading} ${theme.accent} font-serif italic`}>
                Di situ, kamu sedang belajar menyeduh kehidupanmu sendiri.
              </p>
            </motion.div>

            <motion.p variants={fadeInUp} className={`${fontSizeClasses.body} ${theme.text} font-light`}>
              Dan ketika kamu menyeruput tegukan terakhirnya, mungkin kamu akan tersenyum dan berkata pelan: "Hidupku mungkin tidak selalu manis, tapi selalu punya rasa."
            </motion.p>
          </motion.div>

          <motion.blockquote 
            variants={scaleIn}
            className={`mt-12 text-center`}
          >
            <p className={`font-serif ${fontSizeClasses.heading} ${theme.accent} italic leading-relaxed mb-4`}>
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
          viewport={viewportConfig}
          variants={staggerContainer}
          className={`mb-20 md:mb-28 border-t-2 ${theme.border} pt-16`}
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4 mb-12">
            <span className={`w-12 h-px ${darkMode ? 'bg-stone-700' : 'bg-stone-300'}`} />
            <h2 className={`text-xs uppercase tracking-[0.3em] ${theme.textMuted} font-semibold`}>Epilog</h2>
            <span className={`w-12 h-px ${darkMode ? 'bg-stone-700' : 'bg-stone-300'}`} />
          </motion.div>

          <motion.h3 variants={fadeInUp} className={`text-center font-serif ${fontSizeClasses.heading} ${theme.textHeading} mb-8 italic`}>
            Saat Aroma Terakhir Menguap
          </motion.h3>

          <motion.div variants={staggerContainer} className={`max-w-2xl mx-auto space-y-6 ${theme.text} font-light ${fontSizeClasses.body}`}>
            <motion.p variants={fadeInUp}>
              Kopi selalu tahu caranya mengajarkan perpisahan dengan lembut. Ia tak pernah memaksa untuk tetap hangat, ia hanya hadir sejenak — mengisi ruang dengan aroma, lalu perlahan pergi meninggalkan rasa.
            </motion.p>

            <motion.p variants={fadeInUp}>
              Mungkin begitulah hidup dan semua pertemuan di dalamnya: <span className={theme.accent}>sementara, tapi bermakna</span>.
            </motion.p>

            <motion.p variants={fadeInUp}>
              Aku sering berpikir, mungkin kita semua hanyalah biji-biji kopi kecil yang sedang diseduh oleh waktu. Setiap tekanan, panas, dan diamnya bukan untuk menghancurkan, tapi untuk membangkitkan rasa terbaik dari dalam diri. Kita belajar dari air untuk tetap mengalir, dari api untuk tetap hangat, dan dari kopi — untuk tetap jujur terhadap rasa yang kita bawa.
            </motion.p>

            <motion.p variants={fadeInUp}>
              Setiap orang yang pernah datang dalam hidup kita adalah seperti pelanggan yang singgah di kedai: Ada yang hanya memesan sekali lalu pergi, ada yang kembali setiap pagi, dan ada yang diam-diam meninggalkan bekas di meja hati. Namun semuanya memiliki aroma sendiri, dan semuanya layak disyukuri.
            </motion.p>

            <motion.p variants={fadeInUp}>
              Kini aku paham, seni menyeduh kehidupan bukan tentang mencari kesempurnaan rasa, Melainkan tentang keberanian untuk hadir sepenuhnya — meski tahu panas bisa melukai, meski sadar waktu akan mendinginkan. Karena yang membuat setiap tegukan istimewa bukan hasilnya, tapi proses kita menantikan aroma itu muncul.
            </motion.p>

            <motion.p variants={fadeInUp}>
              Dan saat cangkir terakhir kosong, jangan bersedih. Lihatlah sisa ampas di dasar gelas — di sanalah cerita kita tersimpan. Bukan untuk disesali, tapi untuk diingat: bahwa kita pernah hangat, pernah berproses, dan pernah memberi rasa.
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

      {/* Floating Controls - Bottom Left (Google-style) */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`fixed bottom-20 left-6 z-40 ${darkMode ? 'bg-stone-900/95' : 'bg-white/95'} backdrop-blur-xl border ${theme.border} rounded-2xl shadow-2xl p-4 min-w-[220px]`}
          >
            <div className="space-y-4">
              {/* Tema */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Palette size={14} className={theme.textMuted} />
                  <span className={`${theme.textMuted} text-xs`}>Tema</span>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all ${darkMode ? 'bg-stone-800 text-amber-500' : 'bg-stone-100 text-amber-700'}`}
                >
                  {darkMode ? <Moon size={12} /> : <Sun size={12} />}
                  <span>{darkMode ? 'Gelap' : 'Terang'}</span>
                </button>
              </div>

              {/* Ukuran Font */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Type size={14} className={theme.textMuted} />
                  <span className={`${theme.textMuted} text-xs`}>Ukuran Teks</span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setFontSize('normal')}
                    className={`px-2.5 py-1 rounded text-xs transition-all ${fontSize === 'normal' ? (darkMode ? 'bg-stone-700 text-white' : 'bg-stone-200 text-stone-800') : theme.textMuted}`}
                  >
                    A
                  </button>
                  <button
                    onClick={() => setFontSize('large')}
                    className={`px-2.5 py-1 rounded text-xs transition-all ${fontSize === 'large' ? (darkMode ? 'bg-stone-700 text-white' : 'bg-stone-200 text-stone-800') : theme.textMuted}`}
                  >
                    A+
                  </button>
                </div>
              </div>

              {/* Texture Toggle */}
              <div className="flex items-center justify-between pt-3 border-t border-stone-700/20">
                <div className="flex items-center gap-2">
                  <Coffee size={14} className={theme.textMuted} />
                  <span className={`${theme.textMuted} text-xs`}>Latar Kopi</span>
                </div>
                <button
                  onClick={() => setShowTexture(!showTexture)}
                  className={`p-1.5 rounded-lg transition-all ${showTexture ? (darkMode ? 'bg-stone-800 text-amber-500' : 'bg-stone-200 text-amber-700') : theme.textMuted}`}
                >
                  {showTexture ? <Eye size={12} /> : <EyeOff size={12} />}
                </button>
              </div>

              {/* TOC Quick Links */}
              <div className="pt-3 border-t border-stone-700/20">
                <p className={`${theme.textMuted} text-xs mb-2`}>Loncat ke Bab</p>
                <div className="grid grid-cols-3 gap-1">
                  {[1, 5, 10].map((num) => (
                    <a
                      key={num}
                      href={`#bab-${num}`}
                      onClick={() => setShowControls(false)}
                      className={`text-center py-1.5 px-2 rounded text-xs ${theme.hover} transition-colors ${theme.textMuted}`}
                    >
                      Bab {num}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button - Bottom Left */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowControls(!showControls)}
        className={`fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-3 ${darkMode ? 'bg-stone-900/90 text-stone-200 hover:bg-stone-800' : 'bg-white/90 text-stone-700 hover:bg-stone-50'} backdrop-blur-xl border ${theme.border} rounded-full shadow-lg transition-all duration-300`}
      >
        <Settings2 size={16} strokeWidth={1.5} />
        <span className="text-xs font-medium">Pengaturan</span>
        {showControls && <X size={14} className="ml-1 opacity-60" />}
      </motion.button>

      {/* Scroll to Top */}
      <AnimatePresence>
        {activeSection !== '' && (
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

    </div>
  );
}
