'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Coffee, Clock, Eye, EyeOff, Settings2, X, Type, Palette } from 'lucide-react';

export default function DiBalikBarPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [showNoise, setShowNoise] = useState(true);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [showControls, setShowControls] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Smooth progress bar
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  // Sync with global theme if available
  useEffect(() => {
    const checkGlobalTheme = () => {
      const html = document.documentElement;
      if (html.classList.contains('dark')) {
        setDarkMode(true);
      } else if (html.classList.contains('light')) {
        setDarkMode(false);
      }
    };
    
    checkGlobalTheme();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkGlobalTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  // Toggle dark mode and sync to global
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    
    // Sync with global theme
    if (newMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  };

  // Theme classes
  const theme = darkMode ? {
    bg: 'bg-[#0a0a0a]',
    text: 'text-[#a0a0a0]',
    textMuted: 'text-neutral-500',
    textHeading: 'text-neutral-100',
    border: 'border-neutral-800',
    borderLight: 'border-neutral-700',
    accent: 'text-amber-600',
    accentBg: 'bg-amber-950/30',
    accentBorder: 'border-amber-900/50',
    noise: 'opacity-[0.02]',
    card: 'bg-neutral-900/40',
    hover: 'hover:bg-neutral-800/50'
  } : {
    bg: 'bg-[#fafaf9]',
    text: 'text-[#57534e]',
    textMuted: 'text-stone-400',
    textHeading: 'text-stone-800',
    border: 'border-stone-200',
    borderLight: 'border-stone-300',
    accent: 'text-amber-700',
    accentBg: 'bg-amber-50/80',
    accentBorder: 'border-amber-200',
    noise: 'opacity-[0.015]',
    card: 'bg-stone-100/60',
    hover: 'hover:bg-stone-200/50'
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

  // Smooth animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const lineReveal = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  const viewportConfig = { once: true, amount: 0.15 };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-700 ease-out selection:bg-neutral-700 selection:text-neutral-200`}>
      
      {/* Subtle Noise Texture */}
      <AnimatePresence>
        {showNoise && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed inset-0 pointer-events-none ${theme.noise} transition-opacity duration-500`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
          />
        )}
      </AnimatePresence>

      {/* Reading Progress Bar */}
      <motion.div 
        className={`fixed top-0 left-0 right-0 h-[1.5px] ${darkMode ? 'bg-gradient-to-r from-amber-700 to-amber-500' : 'bg-gradient-to-r from-amber-600 to-amber-400'} origin-left z-50`}
        style={{ scaleX }}
      />

      {/* Main Content */}
      <main className={`relative max-w-4xl mx-auto px-6 md:px-12 ${fontSize === 'large' ? 'py-20 md:py-28' : 'py-16 md:py-24'}`}>

        {/* Header Section */}
        <motion.header 
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className={`${fontSize === 'large' ? 'mb-24 md:mb-32' : 'mb-20 md:mb-28'}`}
        >
          <motion.div variants={fadeInUp} className={`${theme.border} border-b pb-8 mb-12`}>
            <div className="flex items-center gap-3 mb-4">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className={`w-2 h-2 rounded-full ${darkMode ? 'bg-amber-600' : 'bg-amber-500'}`}
              />
              <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.2em] uppercase`}>Cerita Pendek</span>
            </div>
            
            <h1 className={`font-serif ${fontSizeClasses.heading} tracking-tight ${theme.textHeading} mb-6`}>
              Di Balik <span className={`italic ${theme.accent} font-light`}>Bar</span>
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className={`${theme.textMuted} italic`}>Catatan dari Seorang Barista</span>
              <span className={`w-8 h-px ${darkMode ? 'bg-neutral-700' : 'bg-stone-300'}`} />
              <span className={`${theme.accent} font-medium`}>Wildan Ferdiansyah</span>
            </div>
          </motion.div>
        </motion.header>

        {/* Section: 11 P.M. */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className={`${fontSize === 'large' ? 'mb-20 md:mb-28' : 'mb-16 md:mb-24'}`}
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8">
            <Clock size={fontSize === 'large' ? 20 : 16} className={theme.accent} strokeWidth={1.5} />
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.15em] uppercase`}>11 P.M.</span>
          </motion.div>

          <motion.h2 variants={fadeInUp} className={`${fontSizeClasses.subheading} font-serif font-light ${theme.textHeading} mb-8 italic`}>
            dan Kopi Tubruk
          </motion.h2>

          <motion.div variants={staggerContainer} className="space-y-3">
            {[
              "Jam sebelas malam.",
              "Café sudah tutup.",
              "Lampu tidak semuanya mati.",
              "Beberapa dibiarkan menyala,",
              "Cukup untuk melihat meja dan lantai",
              "Yang masih basah oleh sisa hari."
            ].map((line, i) => (
              <motion.p 
                key={i}
                variants={lineReveal}
                className={`${fontSizeClasses.body} font-light ${i === 0 ? theme.textHeading : ''}`}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className={`my-10 pl-6 border-l ${theme.borderLight}`}>
            <p className={`${theme.textMuted} italic mb-3`}>Mesin espresso akhirnya diam.</p>
            <p className={`${theme.textMuted} mb-2`}>Bukan diam sepenuhnya.</p>
            <p className={`${theme.textMuted} mb-2`}>Masih ada dengung kecil,</p>
            <p className={`${theme.textMuted} italic`}>Seperti napas orang tua yang tidur dengan mulut terbuka.</p>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-4 mt-8">
            {[
              "Aku duduk sendiri.",
              "Kursi kayu itu dingin di punggungku.",
              "Bajuku masih lembap oleh keringat yang tidak sempat kering seharian."
            ].map((line, i) => (
              <motion.p 
                key={i} 
                variants={fadeInUp}
                className={`${fontSizeClasses.body} font-light`}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>

          {/* Coffee Cup Visual */}
          <motion.div 
            variants={scaleIn}
            className={`my-12 p-8 md:p-10 ${theme.accentBg} ${theme.accentBorder} border rounded-lg relative overflow-hidden`}
          >
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-6 right-6 opacity-10"
            >
              <Coffee size={100} strokeWidth={1} />
            </motion.div>
            
            <div className="relative z-10 space-y-3">
              <p className={`${theme.textHeading} ${fontSize === 'large' ? 'text-xl' : 'text-lg'}`}>Di depanku</p>
              <p className={`${theme.textHeading} ${fontSizeClasses.subheading} font-serif italic`}>Segelas kopi tubruk.</p>
              <p className={`${theme.textMuted} mt-4 ${fontSizeClasses.body}`}>Bubuk kopi mengendap perlahan.</p>
              <p className={`${theme.textMuted} italic`}>Aromanya kasar, seperti tanah basah yang lama tidak tersentuh hujan.</p>
            </div>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-4">
            {[
              "Aku meniupnya sekali.",
              "Uap panas naik dan menyentuh wajahku.",
              "Bukan hangat.",
              "Lebih seperti tamparan pelan yang mengingatkan aku belum pulang."
            ].map((line, i) => (
              <motion.p 
                key={i} 
                variants={fadeInUp}
                className={`${fontSizeClasses.body} font-light ${i === 2 ? theme.textHeading : ''}`}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className={`mt-8 p-6 ${theme.card} border ${theme.border} rounded-lg`}>
            <p className={`${theme.textHeading} mb-2 ${fontSizeClasses.body}`}>Saat kuminum,</p>
            <p className={`${theme.accent} ${fontSizeClasses.subheading} font-serif italic`}>Rasanya pahit.</p>
            <p className={`${theme.textMuted} mt-3 text-sm`}>Bukan pahit yang rumit. Pahit yang langsung.</p>
          </motion.div>
        </motion.section>

        {/* Section: Barista Rendahan */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className={`${fontSize === 'large' ? 'mb-20 md:mb-28' : 'mb-16 md:mb-24'}`}
        >
          <motion.div variants={fadeInUp} className={`flex items-center gap-4 mb-8 pb-4 border-b ${theme.border}`}>
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.15em] uppercase`}># Barista Rendahan</span>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-5">
            {[
              "Aku belajar sejak awal bagaimana orang melihat barista.",
              "Tidak terang-terangan.",
              "Tidak kejam.",
              "Cukup untuk mengingatkan di mana posisiku."
            ].map((line, i) => (
              <motion.p 
                key={i} 
                variants={fadeInUp}
                className={`${fontSizeClasses.body} font-light leading-relaxed`}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className={`my-8 grid md:grid-cols-2 gap-4`}>
            <div className={`p-5 ${theme.card} border ${theme.border} rounded-lg ${theme.hover} transition-colors duration-300`}>
              <p className={`${theme.textMuted} text-sm mb-1`}>Pelanggan berbicara</p>
              <p className={`${theme.textHeading} italic font-serif`}>Melewatiku.</p>
            </div>
            <div className={`p-5 ${theme.card} border ${theme.border} rounded-lg ${theme.hover} transition-colors duration-300`}>
              <p className={`${theme.textMuted} text-sm mb-1`}>Atasan membetulkan ucapanku</p>
              <p className={`${theme.textHeading} italic font-serif`}>Di depan orang lain.</p>
            </div>
          </motion.div>

          <motion.div variants={staggerContainer} className={`space-y-4 my-8 pl-6 border-l-2 ${theme.borderLight}`}>
            {[
              "Aku memakai apron.",
              "Mereka melihat seragam.",
              "Aku berdiri berjam-jam.",
              "Mereka melihat pelayanan."
            ].map((line, i) => (
              <motion.p 
                key={i} 
                variants={lineReveal}
                className={`${fontSizeClasses.body} font-light`}
              >
                <span className={theme.textMuted}>{line.split('.')[0]}.</span>
                <span className={theme.textHeading}>{line.split('.')[1]}</span>
              </motion.p>
            ))}
          </motion.div>

          <motion.p variants={fadeInUp} className={`${theme.textHeading} ${fontSizeClasses.subheading} italic font-serif my-8 text-center`}>
            Tidak ada yang bertanya apa yang kubawa pulang.
          </motion.p>

          <motion.div variants={scaleIn} className={`p-6 ${theme.accentBg} ${theme.accentBorder} border rounded-lg my-8`}>
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-neutral-700/20">
              <span className={`${theme.textMuted} text-sm`}>Gaji</span>
              <span className={`${theme.accent} font-mono tracking-wider`}>kecil.</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`${theme.textMuted} text-sm`}>Jam kerja</span>
              <span className={`${theme.textHeading} font-mono tracking-wider`}>panjang.</span>
            </div>
          </motion.div>

          <motion.p variants={fadeInUp} className={`${theme.text} font-light italic text-center ${fontSizeClasses.body}`}>
            Aku menghitung hari dengan shift, bukan tanggal.
          </motion.p>
        </motion.section>

        {/* Section: Terlihat, Sebentar */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className={`${fontSize === 'large' ? 'mb-20 md:mb-28' : 'mb-16 md:mb-24'}`}
        >
          <motion.div variants={fadeInUp} className={`flex items-center gap-4 mb-8 pb-4 border-b ${theme.border}`}>
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.15em] uppercase`}># Terlihat, Sebentar</span>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-4 mb-8">
            {[
              "Ada momen-momen kecil saat aku pikir",
              "Mungkin sesuatu akan berubah."
            ].map((line, i) => (
              <motion.p 
                key={i} 
                variants={fadeInUp}
                className={`${i === 0 ? theme.text : theme.textHeading} ${fontSizeClasses.body} font-light`}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className={`grid gap-3 mb-8`}>
            <div className={`p-4 ${theme.card} border-l-4 ${darkMode ? 'border-amber-700' : 'border-amber-500'} rounded-r-lg`}>
              <p className={`${theme.text} font-light ${fontSizeClasses.body}`}>Pelanggan mengucap terima kasih dan benar-benar bermaksud begitu.</p>
            </div>
            <div className={`p-4 ${theme.card} border-l-4 ${darkMode ? 'border-amber-700' : 'border-amber-500'} rounded-r-lg`}>
              <p className={`${theme.text} font-light ${fontSizeClasses.body}`}>Atasan mengangguk tanpa mengoreksi.</p>
            </div>
          </motion.div>

          <motion.div variants={scaleIn} className={`text-center py-10 ${theme.accentBg} ${theme.accentBorder} border rounded-lg my-8`}>
            <p className={`${theme.accent} ${fontSizeClasses.small} tracking-[0.2em] uppercase mb-3`}>
              Beberapa detik saja,
            </p>
            <p className={`${theme.textHeading} ${fontSizeClasses.heading} font-serif italic`}>Aku terlihat.</p>
          </motion.div>

          <motion.p variants={fadeInUp} className={`${theme.textMuted} text-center ${fontSizeClasses.subheading} italic mb-8 font-serif`}>
            Lalu hilang.
          </motion.p>
        </motion.section>

        {/* Section: Rekaman */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className={`${fontSize === 'large' ? 'mb-20 md:mb-28' : 'mb-16 md:mb-24'}`}
        >
          <motion.div variants={fadeInUp} className={`flex items-center gap-4 mb-8 pb-4 border-b ${theme.border}`}>
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.15em] uppercase`}># Rekaman</span>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-4 mb-8">
            <motion.p variants={lineReveal} className={`${theme.text} ${fontSizeClasses.body} font-light`}>Aku mendengarnya sendirian.</motion.p>
            <motion.p variants={lineReveal} className={`${theme.text} ${fontSizeClasses.body} font-light`}>Ia dikirim kepadaku.</motion.p>
            <motion.p variants={lineReveal} className={`${theme.textHeading} ${fontSizeClasses.subheading} italic font-serif`}>Rekaman suara.</motion.p>
          </motion.div>

          <motion.div variants={scaleIn} className={`p-6 md:p-8 ${darkMode ? 'bg-[#0c0c0c]' : 'bg-white'} border-2 ${theme.border} shadow-xl my-8 rounded-lg relative`}>
            <div className={`absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-16 ${darkMode ? 'bg-red-900' : 'bg-red-400'} rounded-full`} />
            
            <div className="space-y-3 mb-6">
              <p className={`${theme.textMuted} ${fontSizeClasses.body}`}>Aku duduk di kamar setelah pulang kerja.</p>
              <p className={`${theme.textMuted} ${fontSizeClasses.body}`}>Masih memakai kaos yang sama sejak pagi.</p>
              <p className={`${theme.textMuted} italic`}>Kipas berputar pelan. Udara lembap.</p>
              <p className={`${theme.textMuted} ${fontSizeClasses.body}`}>Bau kopi masih tertinggal di tanganku.</p>
            </div>

            <motion.div 
              variants={fadeInUp}
              className={`p-5 ${darkMode ? 'bg-neutral-900/50' : 'bg-stone-50'} rounded-lg border ${theme.border}`}
            >
              <p className={`${theme.textMuted} ${fontSizeClasses.small} uppercase tracking-widest mb-3`}>Suara orang tua itu terdengar tenang.</p>
              <p className={`${theme.textMuted} italic mb-3`}>Tidak marah. Tidak keras.</p>
              
              <blockquote className={`${darkMode ? 'text-red-400/90' : 'text-red-700'} ${fontSize === 'large' ? 'text-xl' : 'text-lg'} font-serif italic border-l-4 ${darkMode ? 'border-red-900/50' : 'border-red-300'} pl-4 my-4`}>
                "Biasanya barista di Bali itu gigolo."
              </blockquote>

              <p className={`${theme.textMuted} italic text-sm`}>Kalimat itu diucapkan seperti nasihat. Bukan hinaan.</p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Section: Masih Berdiri */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className={`${fontSize === 'large' ? 'mb-20 md:mb-28' : 'mb-16 md:mb-24'}`}
        >
          <motion.div variants={fadeInUp} className={`flex items-center gap-4 mb-8 pb-4 border-b ${theme.border}`}>
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.15em] uppercase`}># Masih Berdiri</span>
          </motion.div>

          <motion.div variants={fadeInUp} className={`text-center mb-10`}>
            <h3 className={`${fontSizeClasses.heading} font-serif font-light ${theme.textHeading} mb-4`}>
              Aku masih di sini.
            </h3>
            <div className={`flex justify-center gap-6 text-sm ${theme.textMuted}`}>
              <span>Tidak menang.</span>
              <span>•</span>
              <span>Tidak kalah.</span>
            </div>
          </motion.div>

          <motion.div variants={scaleIn} className={`p-8 ${theme.card} border ${theme.border} rounded-xl relative overflow-hidden`}>
            <motion.div 
              animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute -top-10 -right-10 w-40 h-40 ${darkMode ? 'bg-neutral-800/20' : 'bg-stone-300/20'} rounded-full blur-3xl`}
            />
            
            <div className="relative z-10 text-center space-y-4">
              <p className={`${theme.text} ${fontSizeClasses.body} font-light`}>Aku berdiri bukan karena kuat,</p>
              <p className={`${theme.text} ${fontSizeClasses.body} font-light`}>Bukan karena yakin.</p>
              <div className={`py-6 border-y ${theme.border} my-6`}>
                <p className={`${theme.textHeading} ${fontSizeClasses.subheading} font-serif italic`}>
                  Aku berdiri karena tubuhku masih sanggup melakukannya.
                </p>
              </div>
              <p className={`${theme.accent} ${fontSizeClasses.small} tracking-[0.2em] uppercase`}>Dan hari ini, itu cukup.</p>
            </div>
          </motion.div>
        </motion.section>

        {/* Epilog */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className={`${fontSize === 'large' ? 'mb-16 md:mb-20' : 'mb-12 md:mb-16'} border-t-2 ${theme.border} pt-12`}
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4 mb-10">
            <span className={`w-8 h-px ${darkMode ? 'bg-neutral-700' : 'bg-stone-300'}`} />
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.2em] uppercase`}>Epilog</span>
            <span className={`w-8 h-px ${darkMode ? 'bg-neutral-700' : 'bg-stone-300'}`} />
          </motion.div>

          <motion.h2 variants={fadeInUp} className={`text-center font-serif font-light ${fontSizeClasses.heading} ${theme.textHeading} mb-10 italic`}>
            Masih di Sini
          </motion.h2>

          <div className="max-w-xl mx-auto space-y-6 text-center">
            <motion.p variants={lineReveal} className={`${theme.text} ${fontSizeClasses.body} font-light`}>
              Aku masih membuat kopi.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="space-y-2">
              <p className={`${theme.textMuted} text-sm`}>Beberapa hari rasanya pahit.</p>
              <p className={`${theme.textMuted} text-sm`}>Beberapa hari tidak.</p>
            </motion.div>

            <motion.p variants={lineReveal} className={`${theme.text} font-light italic mt-6 ${fontSizeClasses.body}`}>
              Aku tidak lagi mencari sempurna.
            </motion.p>

            <motion.div variants={scaleIn} className={`py-8 ${theme.accentBg} ${theme.accentBorder} border rounded-lg my-8`}>
              <p className={`${theme.textHeading} ${fontSizeClasses.subheading} font-serif`}>
                Aku hanya menyeduh dan menunggu.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className={`pt-6 border-t ${theme.border}`}>
              <p className={`${theme.textHeading} ${fontSizeClasses.body} tracking-widest uppercase mb-2`}>Tidak ada kesimpulan.</p>
              <p className={`${theme.textMuted} text-sm italic mb-4`}>Hanya keberadaan.</p>
              <p className={`${theme.accent} ${fontSizeClasses.heading} font-serif italic`}>
                Aku masih di sini.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer 
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className={`text-center pt-12 pb-8 border-t ${theme.border}`}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className={`w-12 h-px ${darkMode ? 'bg-neutral-800' : 'bg-stone-200'}`} />
            <Coffee size={16} className={theme.textMuted} strokeWidth={1.5} />
            <span className={`w-12 h-px ${darkMode ? 'bg-neutral-800' : 'bg-stone-200'}`} />
          </div>
          
          <p className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.15em] uppercase`}>
            Di Balik Bar
          </p>
          <p className={`${theme.textMuted} text-[10px] mt-2 tracking-wider opacity-60`}>
            Wildan Ferdiansyah • 2025
          </p>
        </motion.footer>

      </main>

      {/* Floating Controls - Bottom Left (Google-style) */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`fixed bottom-20 left-6 z-40 ${darkMode ? 'bg-neutral-900/95' : 'bg-white/95'} backdrop-blur-xl border ${theme.border} rounded-2xl shadow-2xl p-4 min-w-[200px]`}
          >
            <div className="space-y-3">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Palette size={14} className={theme.textMuted} />
                  <span className={`${theme.textMuted} text-xs`}>Tema</span>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all duration-300 ${darkMode ? 'bg-neutral-800 text-amber-400' : 'bg-stone-100 text-amber-600'}`}
                >
                  {darkMode ? <Moon size={12} /> : <Sun size={12} />}
                  <span>{darkMode ? 'Gelap' : 'Terang'}</span>
                </button>
              </div>

              {/* Font Size */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Type size={14} className={theme.textMuted} />
                  <span className={`${theme.textMuted} text-xs`}>Ukuran</span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setFontSize('normal')}
                    className={`px-2 py-1 rounded text-xs transition-all ${fontSize === 'normal' ? (darkMode ? 'bg-neutral-700 text-white' : 'bg-stone-200 text-stone-800') : theme.textMuted}`}
                  >
                    A
                  </button>
                  <button
                    onClick={() => setFontSize('large')}
                    className={`px-2 py-1 rounded text-xs transition-all ${fontSize === 'large' ? (darkMode ? 'bg-neutral-700 text-white' : 'bg-stone-200 text-stone-800') : theme.textMuted}`}
                  >
                    A+
                  </button>
                </div>
              </div>

              {/* Noise Toggle */}
              <div className="flex items-center justify-between pt-2 border-t border-neutral-700/20">
                <div className="flex items-center gap-2">
                  <span className={`${theme.textMuted} text-xs`}>Tekstur</span>
                </div>
                <button
                  onClick={() => setShowNoise(!showNoise)}
                  className={`p-1.5 rounded-lg transition-all ${showNoise ? (darkMode ? 'bg-neutral-800 text-neutral-200' : 'bg-stone-200 text-stone-700') : theme.textMuted}`}
                >
                  {showNoise ? <Eye size={12} /> : <EyeOff size={12} />}
                </button>
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
        className={`fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-3 ${darkMode ? 'bg-neutral-900/90 text-neutral-200 hover:bg-neutral-800' : 'bg-white/90 text-stone-700 hover:bg-stone-50'} backdrop-blur-xl border ${theme.border} rounded-full shadow-lg transition-all duration-300`}
      >
        <Settings2 size={16} strokeWidth={1.5} />
        <span className="text-xs font-medium">Pengaturan</span>
        {showControls && <X size={14} className="ml-1 opacity-60" />}
      </motion.button>

      {/* Global Styles for Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
