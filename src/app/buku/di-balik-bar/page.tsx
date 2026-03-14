'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Coffee, Clock, Eye, EyeOff, Settings2, X, Type, Palette } from 'lucide-react';

export default function DiBalikBarPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [showTexture, setShowTexture] = useState(true);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [showControls, setShowControls] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
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
    bg: 'bg-[#0c0a09]',
    bgGradient: 'from-stone-950 via-[#1c1917] to-stone-950',
    text: 'text-stone-400',
    textMuted: 'text-stone-600',
    textHeading: 'text-stone-200',
    border: 'border-stone-800',
    borderLight: 'border-stone-700',
    accent: 'text-amber-600',
    accentBg: 'bg-amber-950/20',
    accentBorder: 'border-amber-900/30',
    card: 'bg-stone-900/30',
    hover: 'hover:bg-stone-800/40',
    coffee: 'text-amber-700/20'
  } : {
    bg: 'bg-[#fafaf9]',
    bgGradient: 'from-stone-50 via-[#f5f5f4] to-stone-100',
    text: 'text-stone-600',
    textMuted: 'text-stone-400',
    textHeading: 'text-stone800',
    border: 'border-stone-200',
    borderLight: 'border-stone-300',
    accent: 'text-amber-700',
    accentBg: 'bg-amber-50/60',
    accentBorder: 'border-amber-200',
    card: 'bg-white/60',
    hover: 'hover:bg-stone-100/80',
    coffee: 'text-amber-600/10'
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
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 }}
  };

  const lineReveal = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
  };

  const viewportConfig = { once: true, amount: 0.15 };

  return (
    <div className={`min-h-screen ${theme.bg} transition-colors duration-700 ease-out selection:bg-amber-900/30 selection:text-amber-100`}>
      
      {/* Aesthetic Background - Coffee Stains & Steam Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Base */}
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.bgGradient} opacity-50`} />
        
        {/* Coffee Ring Stains */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: showTexture ? 0.4 : 0, scale: 1 }}
          transition={{ duration: 1 }}
          className={`absolute top-20 right-[10%] w-64 h-64 rounded-full border-[3px] ${darkMode ? 'border-amber-900/20' : 'border-amber-800/10'} ${darkMode ? 'shadow-[inset_0_0_40px_rgba(120,53,15,0.1)]' : 'shadow-[inset_0_0_40px_rgba(180,83,9,0.05)]'}`}
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: showTexture ? 0.3 : 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className={`absolute top-32 right-[12%] w-48 h-48 rounded-full border-2 ${darkMode ? 'border-amber-950/30' : 'border-amber-900/5'}`}
        />
        
        {/* Bottom Left Coffee Stain */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: showTexture ? 0.35 : 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className={`absolute bottom-40 left-[5%] w-80 h-80 rounded-full border-[2px] ${darkMode ? 'border-amber-900/15' : 'border-amber-800/8'} ${darkMode ? 'shadow-[inset_0_0_60px_rgba(120,53,15,0.08)]' : 'shadow-[inset_0_0_60px_rgba(180,83,9,0.03)]'}`}
        />
        
        {/* Coffee Bean Shapes */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className={`absolute top-1/4 left-[8%] w-4 h-8 ${theme.coffee} rounded-full opacity-30 blur-[1px]`}
          style={{ transform: 'rotate(45deg)' }}
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className={`absolute bottom-1/3 right-[12%] w-3 h-6 ${theme.coffee} rounded-full opacity-20 blur-[1px]`}
          style={{ transform: 'rotate(-30deg)' }}
        />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
          className={`absolute top-2/3 left-[15%] w-2 h-5 ${theme.coffee} rounded-full opacity-25 blur-[1px]`}
          style={{ transform: 'rotate(60deg)' }}
        />
        
        {/* Subtle Steam Lines */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="steam" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M50 100 Q30 50 50 0" stroke="currentColor" strokeWidth="0.5" fill="none" className={darkMode ? 'text-amber-700' : 'text-amber-600'} />
              <path d="M70 100 Q90 50 70 20" stroke="currentColor" strokeWidth="0.5" fill="none" className={darkMode ? 'text-amber-700' : 'text-amber-600'} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#steam)" />
        </svg>
        
        {/* Apron Texture Pattern */}
        <div 
          className={`absolute inset-0 opacity-[0.02] ${showTexture ? 'block' : 'hidden'}`}
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              ${darkMode ? 'rgba(120,53,15,0.1)' : 'rgba(180,83,9,0.05)'} 2px,
              ${darkMode ? 'rgba(120,53,15,0.1)' : 'rgba(180,83,9,0.05)'} 4px
            )`
          }}
        />
      </div>

      {/* Progress Bar */}
      <motion.div 
        className={`fixed top-0 left-0 right-0 h-[2px] ${darkMode ? 'bg-gradient-to-r from-amber-800 to-amber-600' : 'bg-gradient-to-r from-amber-700 to-amber-500'} origin-left z-50`}
        style={{ scaleX }}
      />

      {/* Main Content */}
      <main className={`relative max-w-4xl mx-auto px-6 md:px-12 ${fontSize === 'large' ? 'py-20 md:py-28' : 'py-16 md:py-24'}`}>

        {/* Header */}
        <motion.header variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`${fontSize === 'large' ? 'mb-24 md:mb-32' : 'mb-20 md:mb-28'}`}>
          <motion.div variants={fadeInUp} className={`${theme.border} border-b pb-8 mb-12`}>
            <div className="flex items-center gap-3 mb-4">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }} className={`w-2 h-2 rounded-full ${darkMode ? 'bg-amber-700' : 'bg-amber-600'}`} />
              <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.2em] uppercase`}>Cerita Pendek</span>
            </div>
            <h1 className={`font-serif ${fontSizeClasses.heading} tracking-tight ${theme.textHeading} mb-6`}>
              Di Balik <span className={`italic ${theme.accent} font-light`}>Bar</span>
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className={`${theme.textMuted} italic`}>Catatan dari Seorang Barista</span>
              <span className={`w-8 h-px ${darkMode ? 'bg-stone-700' : 'bg-stone-300'}`} />
              <span className={`${theme.accent} font-medium`}>Wildan Ferdiansyah</span>
            </div>
          </motion.div>
        </motion.header>

        {/* Section: 11 P.M. */}
        <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`${fontSize === 'large' ? 'mb-20 md:mb-28' : 'mb-16 md:mb-24'}`}>
          <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8">
            <Clock size={fontSize === 'large' ? 20 : 16} className={theme.accent} strokeWidth={1.5} />
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.15em] uppercase`}>11 P.M.</span>
          </motion.div>

          <motion.h2 variants={fadeInUp} className={`${fontSizeClasses.subheading} font-serif font-light ${theme.textHeading} mb-8 italic`}>
            dan Kopi Tubruk
          </motion.h2>

          <motion.div variants={staggerContainer} className="space-y-3">
            {["Jam sebelas malam.", "Café sudah tutup.", "Lampu tidak semuanya mati.", "Beberapa dibiarkan menyala,", "Cukup untuk melihat meja dan lantai", "Yang masih basah oleh sisa hari."].map((line, i) => (
              <motion.p key={i} variants={lineReveal} className={`${fontSizeClasses.body} font-light ${i === 0 ? theme.textHeading : ''}`}>{line}</motion.p>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className={`my-10 pl-6 border-l ${theme.borderLight}`}>
            <p className={`${theme.textMuted} italic mb-3`}>Mesin espresso akhirnya diam.</p>
            <p className={`${theme.textMuted} mb-2`}>Bukan diam sepenuhnya.</p>
            <p className={`${theme.textMuted} mb-2`}>Masih ada dengung kecil,</p>
            <p className={`${theme.textMuted} italic`}>Seperti napas orang tua yang tidur dengan mulut terbuka.</p>
          </motion.div>

          {/* Coffee Cup Visual */}
          <motion.div variants={scaleIn} className={`my-12 p-8 md:p-10 ${theme.accentBg} ${theme.accentBorder} border rounded-lg relative overflow-hidden`}>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-6 right-6 opacity-20">
              <Coffee size={100} strokeWidth={1} />
            </motion.div>
            <div className="relative z-10 space-y-3">
              <p className={`${theme.textHeading} ${fontSize === 'large' ? 'text-xl' : 'text-lg'}`}>Di depanku</p>
              <p className={`${theme.textHeading} ${fontSizeClasses.subheading} font-serif italic`}>Segelas kopi tubruk.</p>
              <p className={`${theme.textMuted} mt-4 ${fontSizeClasses.body}`}>Bubuk kopi mengendap perlahan.</p>
              <p className={`${theme.textMuted} italic`}>Aromanya kasar, seperti tanah basah yang lama tidak tersentuh hujan.</p>
            </div>
          </motion.div>
        </motion.section>

        {/* Section: Barista Rendahan */}
        <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`${fontSize === 'large' ? 'mb-20 md:mb-28' : 'mb-16 md:mb-24'}`}>
          <motion.div variants={fadeInUp} className={`flex items-center gap-4 mb-8 pb-4 border-b ${theme.border}`}>
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.15em] uppercase`}># Barista Rendahan</span>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-5">
            {["Aku belajar sejak awal bagaimana orang melihat barista.", "Tidak terang-terangan.", "Tidak kejam.", "Cukup untuk mengingatkan di mana posisiku."].map((line, i) => (
              <motion.p key={i} variants={fadeInUp} className={`${fontSizeClasses.body} font-light leading-relaxed`}>{line}</motion.p>
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

          <motion.div variants={scaleIn} className={`p-6 ${theme.accentBg} ${theme.accentBorder} border rounded-lg my-8`}>
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-stone-700/20">
              <span className={`${theme.textMuted} text-sm`}>Gaji</span>
              <span className={`${theme.accent} font-mono tracking-wider`}>kecil.</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`${theme.textMuted} text-sm`}>Jam kerja</span>
              <span className={`${theme.textHeading} font-mono tracking-wider`}>panjang.</span>
            </div>
          </motion.div>
        </motion.section>

        {/* Section: Terlihat, Sebentar */}
        <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`${fontSize === 'large' ? 'mb-20 md:mb-28' : 'mb-16 md:mb-24'}`}>
          <motion.div variants={fadeInUp} className={`flex items-center gap-4 mb-8 pb-4 border-b ${theme.border}`}>
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.15em] uppercase`}># Terlihat, Sebentar</span>
          </motion.div>

          <motion.div variants={scaleIn} className={`text-center py-10 ${theme.accentBg} ${theme.accentBorder} border rounded-lg my-8`}>
            <p className={`${theme.accent} ${fontSizeClasses.small} tracking-[0.2em] uppercase mb-3`}>Beberapa detik saja,</p>
            <p className={`${theme.textHeading} ${fontSizeClasses.heading} font-serif italic`}>Aku terlihat.</p>
          </motion.div>

          <motion.p variants={fadeInUp} className={`${theme.textMuted} text-center ${fontSizeClasses.subheading} italic mb-8 font-serif`}>Lalu hilang.</motion.p>
        </motion.section>

        {/* Section: Rekaman */}
        <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`${fontSize === 'large' ? 'mb-20 md:mb-28' : 'mb-16 md:mb-24'}`}>
          <motion.div variants={fadeInUp} className={`flex items-center gap-4 mb-8 pb-4 border-b ${theme.border}`}>
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.15em] uppercase`}># Rekaman</span>
          </motion.div>

          <motion.div variants={scaleIn} className={`p-6 md:p-8 ${darkMode ? 'bg-[#0a0908]' : 'bg-white'} border-2 ${theme.border} shadow-xl my-8 rounded-lg relative`}>
            <div className={`absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-16 ${darkMode ? 'bg-red-900/60' : 'bg-red-400/60'} rounded-full`} />
            <div className="space-y-3 mb-6">
              <p className={`${theme.textMuted} ${fontSizeClasses.body}`}>Aku duduk di kamar setelah pulang kerja.</p>
              <p className={`${theme.textMuted} ${fontSizeClasses.body}`}>Masih memakai kaos yang sama sejak pagi.</p>
              <p className={`${theme.textMuted} italic`}>Kipas berputar pelan. Udara lembap.</p>
            </div>
            <motion.div variants={fadeInUp} className={`p-5 ${darkMode ? 'bg-stone-900/30' : 'bg-stone-50'} rounded-lg border ${theme.border}`}>
              <p className={`${theme.textMuted} ${fontSizeClasses.small} uppercase tracking-widest mb-3`}>Suara orang tua itu terdengar tenang.</p>
              <blockquote className={`${darkMode ? 'text-red-400/80' : 'text-red-700/80'} ${fontSize === 'large' ? 'text-xl' : 'text-lg'} font-serif italic border-l-4 ${darkMode ? 'border-red-900/40' : 'border-red-300'} pl-4 my-4`}>
                "Biasanya barista di Bali itu gigolo."
              </blockquote>
              <p className={`${theme.textMuted} italic text-sm`}>Kalimat itu diucapkan seperti nasihat. Bukan hinaan.</p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Section: Masih Berdiri */}
        <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`${fontSize === 'large' ? 'mb-20 md:mb-28' : 'mb-16 md:mb-24'}`}>
          <motion.div variants={fadeInUp} className={`flex items-center gap-4 mb-8 pb-4 border-b ${theme.border}`}>
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.15em] uppercase`}># Masih Berdiri</span>
          </motion.div>

          <motion.div variants={scaleIn} className={`p-8 ${theme.card} border ${theme.border} rounded-xl relative overflow-hidden`}>
            <motion.div animate={{ x: [0, 20, 0], y: [0, -10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className={`absolute -top-10 -right-10 w-40 h-40 ${darkMode ? 'bg-stone-800/20' : 'bg-stone-300/20'} rounded-full blur-3xl`} />
            <div className="relative z-10 text-center space-y-4">
              <p className={`${theme.text} ${fontSizeClasses.body} font-light`}>Aku berdiri bukan karena kuat,</p>
              <p className={`${theme.text} ${fontSizeClasses.body} font-light`}>Bukan karena yakin.</p>
              <div className={`py-6 border-y ${theme.border} my-6`}>
                <p className={`${theme.textHeading} ${fontSizeClasses.subheading} font-serif italic`}>Aku berdiri karena tubuhku masih sanggup melakukannya.</p>
              </div>
              <p className={`${theme.accent} ${fontSizeClasses.small} tracking-[0.2em] uppercase`}>Dan hari ini, itu cukup.</p>
            </div>
          </motion.div>
        </motion.section>

        {/* Epilog */}
        <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`${fontSize === 'large' ? 'mb-16 md:mb-20' : 'mb-12 md:mb-16'} border-t-2 ${theme.border} pt-12`}>
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4 mb-10">
            <span className={`w-8 h-px ${darkMode ? 'bg-stone-800' : 'bg-stone-200'}`} />
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.2em] uppercase`}>Epilog</span>
            <span className={`w-8 h-px ${darkMode ? 'bg-stone-800' : 'bg-stone-200'}`} />
          </motion.div>

          <motion.h2 variants={fadeInUp} className={`text-center font-serif font-light ${fontSizeClasses.heading} ${theme.textHeading} mb-10 italic`}>Masih di Sini</motion.h2>

          <div className="max-w-xl mx-auto space-y-6 text-center">
            <motion.p variants={lineReveal} className={`${theme.text} ${fontSizeClasses.body} font-light`}>Aku masih membuat kopi.</motion.p>
            <motion.p variants={lineReveal} className={`${theme.text} font-light italic mt-6 ${fontSizeClasses.body}`}>Aku tidak lagi mencari sempurna.</motion.p>
            <motion.div variants={scaleIn} className={`py-8 ${theme.accentBg} ${theme.accentBorder} border rounded-lg my-8`}>
              <p className={`${theme.textHeading} ${fontSizeClasses.subheading} font-serif`}>Aku hanya menyeduh dan menunggu.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className={`pt-6 border-t ${theme.border}`}>
              <p className={`${theme.textHeading} ${fontSizeClasses.body} tracking-widest uppercase mb-2`}>Tidak ada kesimpulan.</p>
              <p className={`${theme.textMuted} text-sm italic mb-4`}>Hanya keberadaan.</p>
              <p className={`${theme.accent} ${fontSizeClasses.heading} font-serif italic`}>Aku masih di sini.</p>
            </motion.div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`text-center pt-12 pb-8 border-t ${theme.border}`}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className={`w-12 h-px ${darkMode ? 'bg-stone-800' : 'bg-stone-200'}`} />
            <Coffee size={16} className={theme.textMuted} strokeWidth={1.5} />
            <span className={`w-12 h-px ${darkMode ? 'bg-stone-800' : 'bg-stone-200'}`} />
          </div>
          <p className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.15em] uppercase`}>Di Balik Bar</p>
          <p className={`${theme.textMuted} text-[10px] mt-2 tracking-wider opacity-60`}>Wildan Ferdiansyah • 2025</p>
        </motion.footer>

      </main>

      {/* Floating Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }} transition={{ duration: 0.2 }} className={`fixed bottom-20 left-6 z-40 ${darkMode ? 'bg-stone-900/95' : 'bg-white/95'} backdrop-blur-xl border ${theme.border} rounded-2xl shadow-2xl p-4 min-w-[200px]`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Palette size={14} className={theme.textMuted} />
                  <span className={`${theme.textMuted} text-xs`}>Tema</span>
                </div>
                <button onClick={toggleDarkMode} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all ${darkMode ? 'bg-stone-800 text-amber-500' : 'bg-stone-100 text-amber-700'}`}>
                  {darkMode ? <Moon size={12} /> : <Sun size={12} />}
                  <span>{darkMode ? 'Gelap' : 'Terang'}</span>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Type size={14} className={theme.textMuted} />
                  <span className={`${theme.textMuted} text-xs`}>Ukuran</span>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => setFontSize('normal')} className={`px-2 py-1 rounded text-xs transition-all ${fontSize === 'normal' ? (darkMode ? 'bg-stone-700 text-white' : 'bg-stone-200 text-stone-800') : theme.textMuted}`}>A</button>
                  <button onClick={() => setFontSize('large')} className={`px-2 py-1 rounded text-xs transition-all ${fontSize === 'large' ? (darkMode ? 'bg-stone-700 text-white' : 'bg-stone-200 text-stone-800') : theme.textMuted}`}>A+</button>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-stone-700/20">
                <div className="flex items-center gap-2">
                  <Coffee size={14} className={theme.textMuted} />
                  <span className={`${theme.textMuted} text-xs`}>Latar</span>
                </div>
                <button onClick={() => setShowTexture(!showTexture)} className={`p-1.5 rounded-lg transition-all ${showTexture ? (darkMode ? 'bg-stone-800 text-amber-500' : 'bg-stone-200 text-amber-700') : theme.textMuted}`}>
                  {showTexture ? <Eye size={12} /> : <EyeOff size={12} />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowControls(!showControls)} className={`fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-3 ${darkMode ? 'bg-stone-900/90 text-stone-200 hover:bg-stone-800' : 'bg-white/90 text-stone-700 hover:bg-stone-50'} backdrop-blur-xl border ${theme.border} rounded-full shadow-lg transition-all duration-300`}>
        <Settings2 size={16} strokeWidth={1.5} />
        <span className="text-xs font-medium">Pengaturan</span>
        {showControls && <X size={14} className="ml-1 opacity-60" />}
      </motion.button>

    </div>
  );
}
