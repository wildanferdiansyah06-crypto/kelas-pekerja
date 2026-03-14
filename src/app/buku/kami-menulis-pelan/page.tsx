'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Coffee, Settings2, X, Type, Palette, Eye, EyeOff, BookOpen } from 'lucide-react';

export default function LewatBegituSajaPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [showTexture, setShowTexture] = useState(true);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [showControls, setShowControls] = useState(false);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

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

  const theme = darkMode ? {
    bg: 'bg-[#0a0908]',
    bgGradient: 'from-stone-950 via-[#1c1917] to-[#0a0908]',
    text: 'text-stone-400',
    textMuted: 'text-stone-600',
    textHeading: 'text-stone-200',
    accent: 'text-amber-600',
    accentBg: 'bg-amber-950/20',
    accentBorder: 'border-amber-900/30',
    border: 'border-stone-800',
    borderLight: 'border-stone-700/50',
    card: 'bg-stone-900/30',
    hover: 'hover:bg-stone-800/30',
    coffee: 'text-amber-800/20',
    progress: 'bg-amber-700'
  } : {
    bg: 'bg-[#fafaf9]',
    bgGradient: 'from-[#f5f5f4] via-[#fafaf9] to-[#f5f5f4]',
    text: 'text-stone-600',
    textMuted: 'text-stone-400',
    textHeading: 'text-stone-800',
    accent: 'text-amber-700',
    accentBg: 'bg-amber-100/50',
    accentBorder: 'border-amber-200',
    border: 'border-stone-200',
    borderLight: 'border-stone-300',
    card: 'bg-white/50',
    hover: 'hover:bg-stone-100/60',
    coffee: 'text-amber-700/10',
    progress: 'bg-amber-600'
  };

  const fontSizeClasses = fontSize === 'large' ? {
    body: 'text-lg md:text-xl leading-[1.9]',
    heading: 'text-3xl md:text-4xl',
    title: 'text-4xl md:text-6xl',
    small: 'text-sm'
  } : {
    body: 'text-base md:text-lg leading-[1.8]',
    heading: 'text-2xl md:text-3xl',
    title: 'text-3xl md:text-5xl',
    small: 'text-xs'
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 }}
  };

  const lineReveal = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
  };

  const viewportConfig = { once: true, amount: 0.2 };

  const sections = [
    { id: 'pembuka', title: 'Pembuka' },
    { id: 'tentang', title: 'Tentang Kelas Pekerja' },
    { id: 'karya', title: 'Tentang Karya' },
    { id: 'terdekat', title: 'Tentang Orang Terdekat' },
    { id: 'dunia', title: 'Tentang Dunia yang Sibuk' },
    { id: 'bertahan', title: 'Tentang Bertahan Menulis' },
    { id: 'penutup', title: 'Penutup' },
  ];

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-700 ease-out selection:bg-amber-900/20 selection:text-amber-700`}>
      
      {/* Aesthetic Background - Coffee & Indie vibes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Base */}
        <div className={`absolute inset-0 bg-gradient-to-b ${theme.bgGradient}`} />
        
        {/* Coffee Stains - Organic shapes */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: showTexture ? 0.3 : 0 }}
          transition={{ duration: 1.5 }}
          className={`absolute top-32 right-[5%] w-72 h-72 rounded-full border-[2px] ${darkMode ? 'border-amber-900/15' : 'border-amber-800/8'}`}
          style={{ 
            boxShadow: `inset 0 0 60px ${darkMode ? 'rgba(120,53,15,0.08)' : 'rgba(180,83,9,0.04)'}`,
            transform: 'rotate(12deg)'
          }}
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: showTexture ? 0.25 : 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className={`absolute top-40 right-[8%] w-48 h-48 rounded-full border-[1px] ${darkMode ? 'border-amber-950/20' : 'border-amber-900/5'}`}
        />
        
        {/* Bottom stains */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: showTexture ? 0.2 : 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className={`absolute bottom-20 left-[3%] w-96 h-96 rounded-full border-[2px] ${darkMode ? 'border-amber-900/10' : 'border-amber-800/5'}`}
          style={{ 
            boxShadow: `inset 0 0 80px ${darkMode ? 'rgba(120,53,15,0.05)' : 'rgba(180,83,9,0.02)'}`,
            transform: 'rotate(-8deg)'
          }}
        />

        {/* Floating Coffee Beans */}
        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-1/4 left-[10%] w-3 h-6 ${theme.coffee} rounded-full opacity-20`}
          style={{ transform: 'rotate(45deg)' }}
        />
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className={`absolute top-1/2 right-[15%] w-2 h-5 ${theme.coffee} rounded-full opacity-15`}
          style={{ transform: 'rotate(-30deg)' }}
        />
        <motion.div 
          animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className={`absolute bottom-1/3 left-[20%] w-4 h-8 ${theme.coffee} rounded-full opacity-10`}
          style={{ transform: 'rotate(60deg)' }}
        />

        {/* Steam wisps - subtle */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="steam-wisps" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M100 200 Q80 100 100 0" stroke="currentColor" strokeWidth="0.8" fill="none" className={darkMode ? 'text-amber-700' : 'text-amber-600'} />
              <path d="M140 200 Q160 100 140 20" stroke="currentColor" strokeWidth="0.6" fill="none" className={darkMode ? 'text-amber-700' : 'text-amber-600'} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#steam-wisps)" />
        </svg>

        {/* Paper texture overlay */}
        <div 
          className={`absolute inset-0 opacity-[0.015] ${showTexture ? 'block' : 'hidden'}`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Progress Indicator - Circular right side */}
      <div className="fixed top-24 right-6 z-40 hidden md:flex flex-col items-center gap-2">
        <div className={`relative w-10 h-10 rounded-full ${darkMode ? 'bg-stone-900/80' : 'bg-white/80'} backdrop-blur-md border ${theme.border} shadow-lg flex items-center justify-center`}>
          <svg className="w-6 h-6 -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={darkMode ? '#292524' : '#e7e5e4'}
              strokeWidth="2"
            />
            <motion.path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={darkMode ? '#b45309' : '#d97706'}
              strokeWidth="2"
              strokeDasharray="100, 100"
              style={{ pathLength: smoothProgress }}
            />
          </svg>
        </div>
      </div>

      {/* Mobile Progress */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50 md:hidden">
        <motion.div 
          className={`h-full ${theme.progress}`}
          style={{ width: useTransform(smoothProgress, v => `${v * 100}%`) }}
        />
      </div>

      {/* Main Content */}
      <main className={`relative z-20 max-w-3xl mx-auto px-6 md:px-12 pt-16 pb-32`}>

        {/* Hero / Pembuka */}
        <motion.section 
          id="pembuka"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="min-h-[80vh] flex flex-col justify-center mb-24 md:mb-32"
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.4em] uppercase`}>Pembuka</span>
          </motion.div>

          <motion.h1 
            variants={fadeInUp}
            className={`font-serif ${fontSizeClasses.title} font-light tracking-tight ${theme.textHeading} leading-[1.1] mb-12`}
          >
            Lewat
            <br />
            <span className={`italic ${theme.accent}`}>Begitu Saja</span>
          </motion.h1>

          <motion.div variants={staggerContainer} className="space-y-6 max-w-2xl">
            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.text}`}>
              Buku-buku itu lahir diam-diam. Ditulis setelah kerja selesai.
            </motion.p>
            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.text}`}>
              Alarm pagi belum sempat dilupakan. Layar ponsel masih perih di mata.
            </motion.p>
            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.text}`}>
              Badan bau keringat.
            </motion.p>
            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.text}`}>
              Kopi instan dingin di meja.
            </motion.p>
          </motion.div>

          <motion.div variants={fadeInUp} className={`mt-12 pl-6 border-l-2 ${theme.borderLight}`}>
            <p className={`${fontSizeClasses.body} font-light italic ${theme.textMuted}`}>
              Aku mengirimkannya sebagai tautan.
            </p>
            <p className={`${fontSizeClasses.body} font-light ${theme.text} mt-4`}>
              Kadang hanya satu kalimat.
            </p>
            <p className={`${fontSizeClasses.body} font-light ${theme.text}`}>
              Kadang tanpa pesan apa-apa.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className={`mt-12 p-6 ${theme.card} border ${theme.border} rounded-lg`}>
            <p className={`${fontSizeClasses.body} font-light ${theme.textHeading} italic`}>
              Lalu aku menunggu.
            </p>
            <p className={`${fontSizeClasses.body} font-light ${theme.textMuted} mt-4`}>
              Bukan dengan harapan besar. Cukup lama untuk tahu apakah ia akan berhenti atau lewat begitu saja.
            </p>
          </motion.div>
        </motion.section>

        {/* Tentang Kelas Pekerja */}
        <motion.section 
          id="tentang"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mb-24 md:mb-32 scroll-mt-24"
        >
          <motion.div variants={fadeInUp} className={`flex items-center gap-4 mb-10 pb-4 border-b ${theme.border}`}>
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.3em] uppercase`}>Tentang</span>
            <h2 className={`font-serif ${fontSizeClasses.heading} ${theme.textHeading}`}>Kelas Pekerja</h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-8">
            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.text}`}>
              Kelas pekerja menulis dari sisa.
            </motion.p>

            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
              {['Sisa tenaga.', 'Sisa waktu.', 'Sisa pikiran yang belum habis dipakai bekerja.'].map((item, i) => (
                <motion.div 
                  key={i}
                  variants={scaleIn}
                  className={`p-4 ${theme.card} border ${theme.border} rounded-lg text-center`}
                >
                  <p className={`${fontSizeClasses.body} font-light ${theme.textHeading}`}>{item}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.text}`}>
              Kami menulis bukan karena yakin. Tapi karena diam-diam tahu kalau tidak ditulis, hari ini akan hilang.
            </motion.p>

            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.text}`}>
              Tulisan kami lahir dari tubuh yang ingin rebah tapi masih memaksa duduk.
            </motion.p>

            <motion.div variants={fadeInUp} className={`p-6 ${theme.accentBg} ${theme.accentBorder} border rounded-lg`}>
              <p className={`${fontSizeClasses.body} font-light ${theme.accent} italic text-center`}>
                Karena itu, ia tidak pandai meminta perhatian.
              </p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Tentang Karya */}
        <motion.section 
          id="karya"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mb-24 md:mb-32 scroll-mt-24"
        >
          <motion.div variants={fadeInUp} className={`flex items-center gap-4 mb-10 pb-4 border-b ${theme.border}`}>
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.3em] uppercase`}>Tentang</span>
            <h2 className={`font-serif ${fontSizeClasses.heading} ${theme.textHeading}`}>Karya</h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-6">
            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.text}`}>
              Karya itu seperti bekal yang dimakan dingin di sela jam kerja.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex gap-4 justify-center my-10">
              <span className={`${theme.textMuted} italic`}>Tidak mewah.</span>
              <span className={theme.textMuted}>•</span>
              <span className={`${theme.textMuted} italic`}>Tidak istimewa.</span>
            </motion.div>

            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.text}`}>
              Ia hanya ingin dibuka, meski hanya untuk memastikan bahwa ia belum basi.
            </motion.p>

            <motion.div variants={fadeInUp} className={`my-10 py-8 px-6 ${theme.card} border ${theme.border} rounded-xl relative overflow-hidden`}>
              <motion.div 
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
                className={`absolute top-4 right-4 ${theme.coffee}`}
              >
                <Coffee size={48} strokeWidth={1} />
              </motion.div>
              <p className={`${fontSizeClasses.body} font-light ${theme.textHeading} italic relative z-10`}>
                Dan ketika tidak dibuka, ia tidak marah. Hanya diam lebih lama.
              </p>
            </motion.div>

            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.textMuted} text-center italic`}>
              Kadang, ketika dunia luar melewatinya begitu saja, rasanya masih bisa diterima.
            </motion.p>
          </motion.div>
        </motion.section>

        {/* Tentang Orang Terdekat */}
        <motion.section 
          id="terdekat"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mb-24 md:mb-32 scroll-mt-24"
        >
          <motion.div variants={fadeInUp} className={`flex items-center gap-4 mb-10 pb-4 border-b ${theme.border}`}>
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.3em] uppercase`}>Tentang</span>
            <h2 className={`font-serif ${fontSizeClasses.heading} ${theme.textHeading}`}>Orang Terdekat</h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-6">
            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.text}`}>
              Ada orang yang paling dekat. Yang melihat lelahku tanpa perlu aku jelaskan.
            </motion.p>

            <motion.div variants={fadeInUp} className={`my-8 p-6 ${theme.card} border-l-4 ${theme.accentBorder} rounded-r-lg`}>
              <p className={`${fontSizeClasses.body} font-light ${theme.textMuted} italic`}>
                Buku itu ada.
              </p>
              <p className={`${fontSizeClasses.body} font-light ${theme.textMuted} mt-2`}>
                Berbulan-bulan.
              </p>
            </motion.div>

            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.text}`}>
              Aku tidak pernah bertanya. Karena aku tahu, jawabannya akan lebih menyakitkan jika diucapkan.
            </motion.p>

            <motion.blockquote variants={scaleIn} className={`my-10 pl-6 border-l-2 ${theme.borderLight}`}>
              <p className={`${fontSizeClasses.body} font-light ${theme.textHeading} italic`}>
                Kadang, yang paling sunyi bukan tidak dibaca, tapi disadari bahwa bahkan yang terdekat pun tidak sempat berhenti.
              </p>
            </motion.blockquote>

            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.textMuted} italic`}>
              Kalau yang dekat saja tidak sempat, aku tidak tahu apa yang bisa kuharapkan dari dunia yang asing.
            </motion.p>
          </motion.div>
        </motion.section>

        {/* Tentang Dunia yang Sibuk */}
        <motion.section 
          id="dunia"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mb-24 md:mb-32 scroll-mt-24"
        >
          <motion.div variants={fadeInUp} className={`flex items-center gap-4 mb-10 pb-4 border-b ${theme.border}`}>
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.3em] uppercase`}>Tentang</span>
            <h2 className={`font-serif ${fontSizeClasses.heading} ${theme.textHeading}`}>Dunia yang Sibuk</h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-6">
            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.text}`}>
              Dunia tidak kejam.
            </motion.p>
            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.text}`}>
              Ia hanya tidak berhenti.
            </motion.p>

            <motion.div variants={fadeInUp} className={`my-10 p-8 ${theme.accentBg} ${theme.accentBorder} border rounded-xl text-center`}>
              <p className={`${fontSizeClasses.body} font-light ${theme.accent} italic`}>
                Dan yang tidak berhenti jarang sempat melihat apa yang lahir pelan.
              </p>
            </motion.div>

            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.text}`}>
              Karya seperti ini tidak cocok dengan ritme itu.
            </motion.p>
            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.text}`}>
              Ia berdiri di pinggir, menyadari bahwa tidak semua yang dibuat dengan sungguh-sungguh akan diberi waktu.
            </motion.p>
          </motion.div>
        </motion.section>

        {/* Tentang Bertahan Menulis */}
        <motion.section 
          id="bertahan"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mb-24 md:mb-32 scroll-mt-24"
        >
          <motion.div variants={fadeInUp} className={`flex items-center gap-4 mb-10 pb-4 border-b ${theme.border}`}>
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.3em] uppercase`}>Tentang</span>
            <h2 className={`font-serif ${fontSizeClasses.heading} ${theme.textHeading}`}>Bertahan Menulis</h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-8">
            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.text}`}>
              Aku tetap menulis bukan karena yakin akan dibaca.
            </motion.p>

            <motion.div variants={scaleIn} className={`p-8 ${theme.card} border ${theme.border} rounded-xl relative overflow-hidden`}>
              <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 5, repeat: Infinity }}
                className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full ${theme.coffee} blur-2xl`}
              />
              <p className={`${fontSizeClasses.body} font-light ${theme.textHeading} italic relative z-10`}>
                Aku menulis karena jika tidak, hari-hari ini akan runtuh tanpa saksi.
              </p>
            </motion.div>

            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.text}`}>
              Menulis adalah caraku mengatakan pada diri sendiri bahwa aku pernah ada di hari ini.
            </motion.p>

            <motion.p variants={fadeInUp} className={`${fontSizeClasses.heading} font-serif ${theme.accent} italic text-center mt-12`}>
              Meski lewat.
            </motion.p>
          </motion.div>
        </motion.section>

        {/* Penutup */}
        <motion.section 
          id="penutup"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mb-16 scroll-mt-24"
        >
          <motion.div variants={fadeInUp} className={`flex items-center justify-center gap-4 mb-12`}>
            <span className={`w-12 h-px ${darkMode ? 'bg-stone-800' : 'bg-stone-300'}`} />
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.3em] uppercase`}>Penutup</span>
            <span className={`w-12 h-px ${darkMode ? 'bg-stone-800' : 'bg-stone-300'}`} />
          </motion.div>

          <motion.h3 variants={fadeInUp} className={`font-serif ${fontSizeClasses.heading} ${theme.textHeading} text-center mb-10 italic`}>
            Tetap Ditulis
          </motion.h3>

          <motion.div variants={staggerContainer} className="max-w-2xl mx-auto space-y-6">
            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.text} text-center`}>
              Buku ini tidak meminta perhatian. Ia juga tidak ingin dipahami.
            </motion.p>

            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.textHeading} italic text-center`}>
              Ia hanya ingin jujur.
            </motion.p>

            <motion.div variants={fadeInUp} className={`my-12 p-8 ${theme.accentBg} ${theme.accentBorder} border rounded-xl`}>
              <p className={`${fontSizeClasses.body} font-light ${theme.text} text-center`}>
                Dan jika suatu hari seseorang membacanya dalam keadaan lelah, dalam keadaan sepi, itu sudah cukup.
              </p>
            </motion.div>

            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.textMuted} text-center italic`}>
              Jika tidak, tidak apa-apa.
            </motion.p>

            <motion.p variants={fadeInUp} className={`${fontSizeClasses.heading} font-serif ${theme.textHeading} text-center mt-12 tracking-widest`}>
              Ia tetap ditulis.
            </motion.p>
          </motion.div>
        </motion.section>

        {/* End decoration */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex items-center justify-center gap-4 pt-16"
        >
          <span className={`w-16 h-px ${darkMode ? 'bg-stone-800' : 'bg-stone-300'}`} />
          <Coffee size={20} className={theme.accent} strokeWidth={1} />
          <span className={`w-16 h-px ${darkMode ? 'bg-stone-800' : 'bg-stone-300'}`} />
        </motion.div>

      </main>

      {/* Floating Controls - Bottom Left (Google-style, mengganti footer page) */}
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
                  <span className={`${theme.textMuted} text-xs`}>Teks</span>
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
                  <span className={`${theme.textMuted} text-xs`}>Latar</span>
                </div>
                <button
                  onClick={() => setShowTexture(!showTexture)}
                  className={`p-1.5 rounded-lg transition-all ${showTexture ? (darkMode ? 'bg-stone-800 text-amber-500' : 'bg-stone-200 text-amber-700') : theme.textMuted}`}
                >
                  {showTexture ? <Eye size={12} /> : <EyeOff size={12} />}
                </button>
              </div>

              {/* Quick Nav */}
              <div className="pt-3 border-t border-stone-700/20">
                <p className={`${theme.textMuted} text-xs mb-2 flex items-center gap-1`}>
                  <BookOpen size={12} /> Loncat ke
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {sections.slice(0, 4).map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      onClick={() => setShowControls(false)}
                      className={`text-left py-1.5 px-2 rounded text-xs ${theme.hover} transition-colors ${theme.textMuted} truncate`}
                    >
                      {section.title}
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
        <span className="text-xs font-medium">Menu</span>
        {showControls && <X size={14} className="ml-1 opacity-60" />}
      </motion.button>

    </div>
  );
}
