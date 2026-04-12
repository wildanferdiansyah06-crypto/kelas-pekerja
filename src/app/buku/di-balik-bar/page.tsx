'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Coffee, Clock, Eye, EyeOff, Settings2, X, Type, Palette, ArrowRight, Quote, PenLine, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function DiBalikBarPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [showTexture, setShowTexture] = useState(true);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [showControls, setShowControls] = useState(false);
  const [highlightedSection, setHighlightedSection] = useState<number | null>(null);
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
    textSecondary: 'text-stone-500',
    border: 'border-stone-800',
    borderLight: 'border-stone-700',
    divider: 'bg-stone-800',
    accent: 'text-amber-600',
    accentBg: 'bg-amber-950/20',
    accentBorder: 'border-amber-900/30',
    card: 'bg-stone-900/30',
    hover: 'hover:bg-stone-800/40',
    coffee: 'text-amber-700/20',
    highlight: 'bg-amber-950/30 border-amber-800/40'
  } : {
    bg: 'bg-[#faf9f7]',
    bgGradient: 'from-[#faf9f7] via-[#f5f3f0] to-[#faf9f7]',
    text: 'text-[#4a4a4a]',
    textMuted: 'text-[#6a6a6a]',
    textHeading: 'text-[#2d2d2d]',
    textSecondary: 'text-[#6a6a6a]',
    border: 'border-[#e5e2dd]',
    borderLight: 'border-[#d4d0c8]',
    divider: 'bg-[#e5e2dd]',
    accent: 'text-[#8b7355]',
    accentBg: 'bg-[#e5e2dd]/50',
    accentBorder: 'border-[#d4d0c8]',
    card: 'bg-white/60',
    hover: 'hover:bg-[#f5f3f0]/80',
    coffee: 'text-[#8b7355]/10',
    highlight: 'bg-[#e5e2dd]/80 border-[#d4d0c8]/60'
  };

  const fontSizeClasses = fontSize === 'large' ? {
    body: 'text-lg md:text-xl leading-relaxed',
    heading: 'text-3xl md:text-5xl',
    subheading: 'text-xl md:text-2xl',
    small: 'text-sm'
  } : {
    body: 'text-base md:text-lg leading-[1.9]',
    heading: 'text-2xl md:text-4xl',
    subheading: 'text-lg md:text-xl',
    small: 'text-xs'
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 }}
  };

  const lineReveal = {
    hidden: { opacity: 0, x: -30, filter: "blur(8px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
  };

  const breathAnimation = {
    animate: { 
      opacity: [0.4, 0.8, 0.4],
      scale: [1, 1.02, 1]
    },
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  };

  const viewportConfig = { once: true, amount: 0.2 };

  // Related stories data - SUDAH DILENGKAPI SLUG
  const relatedStories = [
    {
      title: "Di Ujung Shift",
      slug: "di-ujung-shift",
      category: "Barista",
      readTime: "5 menit",
      excerpt: "Tentang jam-jam terakhir ketika kaki sudah tidak merasa, tapi senyum harus tetap ada.",
      highlight: "Capeknya bukan di tangan. Capeknya di kepala, di senyum yang dipaksakan."
    },
    {
      title: "Racikan Pertama",
      slug: "racikan-pertama",
      category: "Barista",
      readTime: "4 menit",
      excerpt: "Ketika kopi pertama yang lo buat bukan untuk pelanggan, tapi untuk nenek yang tidak pernah datang lagi.",
      highlight: "Setiap racikan adalah doa yang tidak kita sadari."
    },
    {
      title: "Meja Kosong",
      slug: "meja-kosong",
      category: "Bartender",
      readTime: "6 menit",
      excerpt: "Cerita tentang meja favorit yang ditinggalkan, dan orang yang selalu duduk di sana setiap Kamis malam.",
      highlight: "Kita bukan cuma bikin minuman. Kita jadi saksi hidup orang."
    }
  ];

  return (
    <div className={`${theme.bg} transition-colors duration-700 ease-out selection:bg-amber-900/30 selection:text-amber-100 w-full`}>
      
      {/* Aesthetic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.bgGradient} opacity-50`} />
        
        {/* Coffee Ring Stains */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: showTexture ? 0.35 : 0, scale: 1 }}
          transition={{ duration: 1.2 }}
          className={`absolute top-20 right-[10%] w-64 h-64 rounded-full border-[3px] ${darkMode ? 'border-amber-900/20' : 'border-amber-800/10'} ${darkMode ? 'shadow-[inset_0_0_40px_rgba(120,53,15,0.1)]' : 'shadow-[inset_0_0_40px_rgba(180,83,9,0.05)]'}`}
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: showTexture ? 0.25 : 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className={`absolute bottom-40 left-[5%] w-80 h-80 rounded-full border-[2px] ${darkMode ? 'border-amber-900/15' : 'border-amber-800/8'}`}
        />
        
        {/* Coffee Bean Shapes */}
        {[...Array(3)].map((_, i) => (
          <motion.div 
            key={i}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 100 + i * 20, repeat: Infinity, ease: "linear" }}
            className={`absolute ${i === 0 ? 'top-1/4 left-[8%]' : i === 1 ? 'bottom-1/3 right-[12%]' : 'top-2/3 left-[15%]'} ${theme.coffee} rounded-full opacity-20 blur-[1px]`}
            style={{ 
              transform: `rotate(${45 + i * 15}deg)`,
              width: `${4 + i * 2}px`,
              height: `${8 + i * 3}px`
            }}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <motion.div 
        className={`fixed top-0 left-0 right-0 h-[2px] ${darkMode ? 'bg-gradient-to-r from-amber-800 to-amber-600' : 'bg-gradient-to-r from-amber-700 to-amber-500'} origin-left z-50`}
        style={{ scaleX }}
      />

      {/* Main Content */}
      <main className={`relative max-w-3xl mx-auto px-6 md:px-12 ${fontSize === 'large' ? 'py-20 md:py-28' : 'py-16 md:py-24'}`}>

        {/* Story Identity Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`flex flex-wrap items-center justify-center gap-3 mb-8 ${theme.accentBg} ${theme.accentBorder} border rounded-full py-2 px-4 w-fit mx-auto`}
        >
          <span className={`${theme.accent} ${fontSizeClasses.small} font-medium`}>Barista / Bartender</span>
          <span className={`w-1 h-1 rounded-full ${theme.textMuted}`} />
          <span className={`${theme.textMuted} ${fontSizeClasses.small}`}>6 bulan pengalaman</span>
          <span className={`w-1 h-1 rounded-full ${theme.textMuted}`} />
          <span className={`${theme.textMuted} ${fontSizeClasses.small}`}>8 menit baca</span>
        </motion.div>

        {/* Header */}
        <motion.header variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`${fontSize === 'large' ? 'mb-20 md:mb-28' : 'mb-16 md:mb-24'}`}>
          <motion.div variants={fadeInUp} className={`${theme.border} border-b pb-8 mb-12`}>
            <div className="flex items-center gap-3 mb-4">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }} className={`w-2 h-2 rounded-full ${darkMode ? 'bg-amber-700' : 'bg-amber-600'}`} />
              <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.2em] uppercase`}>Cerita Pendek</span>
            </div>
            
            <h1 className={`font-serif ${fontSizeClasses.heading} tracking-tight ${theme.textHeading} mb-6 leading-tight`}>
              Di Balik <span className={`italic ${theme.accent} font-light`}>Bar</span>
            </h1>
            
            {/* BRUTAL OPENING */}
            <motion.div 
              variants={fadeInUp}
              className={`${theme.accentBg} ${theme.accentBorder} border-l-4 p-6 rounded-r-lg mb-6`}
            >
              <p className={`${theme.textHeading} ${fontSize === 'large' ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'} leading-relaxed font-light`}>
                "Orang cuma lihat kita bikin minuman yang cantik. 
                <span className={`${theme.accent} font-medium block mt-2`}>Tapi gak ada yang tahu capeknya di balik bar.</span>"
              </p>
            </motion.div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className={`${theme.textMuted} italic`}>Catatan dari Seorang Barista</span>
              <span className={`w-8 h-px ${darkMode ? 'bg-stone-700' : 'bg-stone-300'}`} />
              <span className={`${theme.accent} font-medium`}>Wildan Ferdiansyah</span>
            </div>
          </motion.div>
        </motion.header>

        {/* Section: 11 P.M. */}
        <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`${fontSize === 'large' ? 'mb-24 md:mb-32' : 'mb-20 md:mb-28'}`}>
          <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-10">
            <Clock size={fontSize === 'large' ? 20 : 16} className={theme.accent} strokeWidth={1.5} />
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.15em] uppercase`}>11 P.M.</span>
          </motion.div>

          <motion.h2 variants={fadeInUp} className={`${fontSizeClasses.subheading} font-serif font-light ${theme.textHeading} mb-10 italic`}>
            dan Kopi Tubruk yang Menunggu
          </motion.h2>

          <motion.div variants={staggerContainer} className="space-y-4">
            {[
              "Jam sebelas malam.",
              "Café sudah tutup.",
              "Lampu tidak semuanya mati — beberapa dibiarkan menyala, cukup untuk melihat meja dan lantai yang masih basah oleh sisa hari.",
              "Aroma kopi yang tersisa di udara, seperti kenangan yang tidak mau pergi.",
              "Aku duduk sendirian, menghadap jendela yang kini menjadi cermin gelap."
            ].map((line, i) => (
              <motion.p 
                key={i} 
                variants={lineReveal} 
                className={`${fontSizeClasses.body} font-light ${i === 0 ? `${theme.textHeading} font-normal` : ''} ${i === 4 ? 'italic ' + theme.textMuted : ''}`}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>

          {/* Poetic Expansion */}
          <motion.div variants={fadeInUp} className={`my-12 pl-6 md:pl-8 border-l-2 ${theme.accentBorder}`}>
            <p className={`${theme.textMuted} ${fontSizeClasses.body} italic mb-4 leading-relaxed`}>
              Mesin espresso akhirnya diam. Bukan diam sepenuhnya. Masih ada dengung kecil, seperti napas orang tua yang tidur dengan mulut terbuka.
            </p>
            <p className={`${theme.text} ${fontSizeClasses.body} leading-relaxed`}>
              Aku sering berpikir, mesin ini lebih beristirahat daripada aku. Setidaknya dia punya waktu untuk dingin. Aku? Aku masih hangat. Masih terbakar oleh hari yang baru saja lewat.
            </p>
          </motion.div>

          {/* Highlight Moment */}
          <motion.div 
            variants={scaleIn}
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => setHighlightedSection(1)}
            onHoverEnd={() => setHighlightedSection(null)}
            className={`my-14 p-8 md:p-10 ${highlightedSection === 1 ? theme.highlight : theme.accentBg} ${theme.accentBorder} border-2 rounded-lg relative overflow-hidden cursor-pointer transition-all duration-500`}
          >
            <Quote size={32} className={`${theme.accent} opacity-30 absolute top-6 right-6`} />
            <div className="relative z-10 space-y-4">
              <p className={`${theme.textHeading} ${fontSize === 'large' ? 'text-xl' : 'text-lg'} font-medium`}>Di depanku, segelas kopi tubruk.</p>
              <p className={`${theme.textHeading} ${fontSizeClasses.subheading} font-serif italic`}>Bukan untuk pelanggan. Bukan untuk review. Untukku.</p>
              <div className={`h-px ${theme.divider} my-6`} />
              <p className={`${theme.textMuted} ${fontSizeClasses.body} leading-relaxed`}>
                Bubuk kopi mengendap perlahan di dasar gelas, seperti pikiran-pikiran yang mengendap di dasar hati. Aromanya kasar, seperti tanah basah yang lama tidak tersentuh hujan. Tidak manis. Tidak sempurna. Tapi jujur.
              </p>
              <p className={`${theme.accent} italic text-sm mt-4`}>
                "Ini ritualku. Menyeduh kopi untuk diri sendiri setelah seharian menyeduh untuk orang lain."
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* Section: Barista Rendahan */}
        <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`${fontSize === 'large' ? 'mb-24 md:mb-32' : 'mb-20 md:mb-28'}`}>
          <motion.div variants={fadeInUp} className={`flex items-center gap-4 mb-10 pb-4 border-b ${theme.border}`}>
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.15em] uppercase`}># Barista Rendahan</span>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-6">
            <motion.p variants={fadeInUp} className={`${fontSizeClasses.body} font-light leading-relaxed`}>
              Aku belajar sejak awal bagaimana orang melihat barista. Tidak terang-terangan. Tidak kejam. Cukup untuk mengingatkan di mana posisiku di rantai ini.
            </motion.p>
            
            <motion.p variants={fadeInUp} className={`${theme.textMuted} ${fontSizeClasses.body} italic leading-relaxed pl-6 border-l-2 ${theme.borderLight}`}>
              "Kamu yang bikin kopi ya?" — Seperti itu saja identitasku. Seperti tidak ada nama, tidak ada wajah, tidak ada malam-malam di mana aku pulang dengan kaki yang tidak merasa.
            </motion.p>

            <motion.p variants={fadeInUp} className={`${fontSizeClasses.body} font-light leading-relaxed`}>
              Pelanggan berbicara melewatku. Bukan ke aku. Atasan membetulkan ucapanku di depan orang lain, seolah-olah aku tidak bisa berbahasa dengan benar. Padahal aku hanya bicara pelan. Karena bicara keras membutuhkan energi, dan energiku sudah habis untuk menyeduh.
            </motion.p>
          </motion.div>

          {/* Emotional Grid */}
          <motion.div variants={fadeInUp} className={`my-10 grid md:grid-cols-2 gap-4`}>
            <div className={`p-6 ${theme.card} border ${theme.border} rounded-lg ${theme.hover} transition-all duration-300`}>
              <p className={`${theme.textMuted} text-sm mb-2 uppercase tracking-wider`}>Gaji</p>
              <p className={`${theme.accent} ${fontSizeClasses.subheading} font-serif italic`}>Cukup untuk bertahan.</p>
              <p className={`${theme.textMuted} text-sm mt-3 leading-relaxed`}>Tidak cukup untuk hidup. Tidak cukup untuk impian. Cukup untuk datang lagi besok.</p>
            </div>
            <div className={`p-6 ${theme.card} border ${theme.border} rounded-lg ${theme.hover} transition-all duration-300`}>
              <p className={`${theme.textMuted} text-sm mb-2 uppercase tracking-wider`}>Jam Kerja</p>
              <p className={`${theme.textHeading} ${fontSizeClasses.subheading} font-serif italic`}>Panjang. Terlalu panjang.</p>
              <p className={`${theme.textMuted} text-sm mt-3 leading-relaxed`}>Berdiri delapan jam. Tersenyum delapan jam. Menjadi versi terbaik dari diriku — delapan jam.</p>
            </div>
          </motion.div>

          {/* HIGHLIGHT MOMENT - QUOTE BLOCK */}
          <motion.div 
            variants={scaleIn}
            className={`p-8 ${theme.highlight} border-2 ${theme.accentBorder} rounded-xl my-12 relative overflow-hidden`}
          >
            <motion.div 
              {...breathAnimation}
              className={`absolute -right-10 -bottom-10 w-40 h-40 ${darkMode ? 'bg-amber-900/10' : 'bg-amber-500/10'} rounded-full blur-3xl`} 
            />
            <div className="relative z-10 text-center">
              <Sparkles size={24} className={`${theme.accent} mx-auto mb-4 opacity-50`} />
              <p className={`${theme.accent} ${fontSizeClasses.small} uppercase tracking-[0.2em] mb-4`}>Yang Tidak Terlihat</p>
              <p className={`${theme.textHeading} ${fontSize === 'large' ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} font-serif italic leading-relaxed`}>
                "Capeknya bukan di tangan. <span className={theme.accent}>Capeknya di kepala,</span> di senyum yang dipaksakan, di 'baik-baik saja' yang terucap otomatis."
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* Section: Terlihat, Sebentar */}
        <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`${fontSize === 'large' ? 'mb-24 md:mb-32' : 'mb-20 md:mb-28'}`}>
          <motion.div variants={fadeInUp} className={`flex items-center gap-4 mb-10 pb-4 border-b ${theme.border}`}>
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.15em] uppercase`}># Terlihat, Sebentar</span>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-6">
            <motion.p variants={fadeInUp} className={`${fontSizeClasses.body} font-light leading-relaxed`}>
              Ada momen-momen langka. Ketika seorang pelanggan benar-benar melihatku. Bukan sebagai mesin pembuat kopi, tapi sebagai manusia. Mereka bertanya namaku. Mereka ingat pesanan favoritku — yang kubuat untuk diri sendiri di akhir shift.
            </motion.p>

            {/* HIGHLIGHT MOMENT - BOLD */}
            <motion.p variants={fadeInUp} className={`${theme.textMuted} ${fontSizeClasses.body} italic leading-relaxed pl-6 border-l-2 ${theme.borderLight}`}>
              "<span className={`${theme.textHeading} font-medium not-italic`}>Kamu yang selalu bikin kopi kuat itu ya?</span>" — Seperti ada yang memperhatikan. Seperti aku ada.
            </motion.p>

            <motion.p variants={fadeInUp} className={`${fontSizeClasses.body} font-light leading-relaxed`}>
              Tapi momen itu singkat. Terlalu singkat. Seperti kilatan cahaya di ruangan gelap — membuatmu sadar betapa gelapnya sebenarnya. Lalu mereka pergi. Dan aku kembali menjadi nama di struk, wajah yang dilupakan, suara yang terlalu pelan untuk diingat.
            </motion.p>
          </motion.div>

          <motion.div variants={scaleIn} className={`text-center py-14 ${theme.accentBg} ${theme.accentBorder} border-2 rounded-lg my-14 relative overflow-hidden`}>
            <motion.div 
              animate={{ y: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute top-4 left-1/2 -translate-x-1/2 w-32 h-32 ${darkMode ? 'bg-amber-800/20' : 'bg-amber-500/20'} rounded-full blur-3xl`} 
            />
            <div className="relative z-10">
              <p className={`${theme.accent} ${fontSizeClasses.small} tracking-[0.2em] uppercase mb-4`}>Beberapa detik saja,</p>
              <p className={`${theme.textHeading} ${fontSizeClasses.heading} font-serif italic mb-4`}>Aku terlihat.</p>
              <div className={`w-16 h-px ${theme.divider} mx-auto my-6`} />
              <p className={`${theme.textMuted} ${fontSizeClasses.subheading} italic font-serif`}>Lalu hilang.</p>
            </div>
          </motion.div>

          <motion.p variants={fadeInUp} className={`${theme.textMuted} ${fontSizeClasses.body} italic leading-relaxed text-center max-w-2xl mx-auto`}>
            Tapi aku menyimpan momen-momen itu. Seperti koleksi benda kecil yang tidak bernilai bagi orang lain, tapi berarti segalanya bagiku.
          </motion.p>
        </motion.section>

        {/* Section: Suara dari Ruang Tamu - KOREKSI: LAGI CALL SAMA PACAR */}
        <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`${fontSize === 'large' ? 'mb-24 md:mb-32' : 'mb-20 md:mb-28'}`}>
          <motion.div variants={fadeInUp} className={`flex items-center gap-4 mb-10 pb-4 border-b ${theme.border}`}>
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.15em] uppercase`}># Suara dari Ruang Tamu</span>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-6 mb-10">
            <motion.p variants={fadeInUp} className={`${fontSizeClasses.body} font-light leading-relaxed`}>
              Aku di kamar sendirian. Sudah berganti pakaian — kaos kerja yang bau kopi dan keringat sekarang terlipat rapi di sudut. Kipas angin berputar pelan, tapi aku masih merasa panas. Bukan panas cuaca. Panas dari dalam.
            </motion.p>

            {/* KONTEKS CALL */}
            <motion.div variants={fadeInUp} className={`p-6 ${theme.accentBg} ${theme.accentBorder} border rounded-lg flex items-start gap-4`}>
              <div className={`w-10 h-10 rounded-full ${theme.card} flex items-center justify-center flex-shrink-0`}>
                <span className={theme.accent}>📱</span>
              </div>
              <div>
                <p className={`${theme.textHeading} ${fontSizeClasses.body} font-medium mb-2`}>Lagi video call sama pacar</p>
                <p className={`${theme.textMuted} ${fontSizeClasses.body} leading-relaxed`}>
                  Dia di rumahnya, aku di kosan. Kami bicara tentang hari ini, tentang capek, tentang rencana besok. Suasana biasa. Hangat. Sampai suara lain masuk dari speaker-nya.
                </p>
              </div>
            </motion.div>

            <motion.p variants={fadeInUp} className={`${theme.textMuted} ${fontSizeClasses.body} italic leading-relaxed`}>
              Dari ujung telepon, suara ibunya terdengar. Mereka pikir aku tidak mendengar. Atau mungkin mereka pikir jarak akan meredam suara. Tapi malam itu sunyi, dan setiap kata masuk — jelas, tajam, menusuk.
            </motion.p>
          </motion.div>

          <motion.div variants={scaleIn} className={`p-8 md:p-10 ${darkMode ? 'bg-[#0a0908]' : 'bg-white'} border-2 ${theme.border} shadow-2xl my-12 rounded-lg relative overflow-hidden`}>
            <div className={`absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-24 ${darkMode ? 'bg-red-900/60' : 'bg-red-400/60'} rounded-full`} />
            <motion.div 
              animate={{ opacity: [0.05, 0.1, 0.05] }}
              transition={{ duration: 3, repeat: Infinity }}
              className={`absolute inset-0 ${darkMode ? 'bg-red-950/5' : 'bg-red-50/50'}`} 
            />
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-red-700/60' : 'bg-red-400/60'} animate-pulse`} />
                <p className={`${theme.textMuted} ${fontSizeClasses.small} uppercase tracking-widest`}>Suara ibu pacarku, dari ruang tamu, masuk ke speaker</p>
              </div>
              
              {/* HIGHLIGHT MOMENT - QUOTE BRUTAL */}
              <blockquote className={`${darkMode ? 'text-red-400/90' : 'text-red-700/90'} ${fontSize === 'large' ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} font-serif italic border-l-4 ${darkMode ? 'border-red-900/40' : 'border-red-300'} pl-6 py-4 my-6 leading-relaxed`}>
                "<span className="font-bold">Biasanya barista di Bali itu gigolo.</span> Jangan lanjutin sama anak itu, ya."
              </blockquote>
              
              <div className="space-y-4">
                <p className={`${theme.textMuted} ${fontSizeClasses.body} leading-relaxed`}>
                  Aku membeku. Tangan yang sedang memegang ponsel bergetar perlahan. Bukan karena marah. Marah terlalu mewah untuk dirasakan saat itu. Yang kurasakan adalah <span className={`${theme.textHeading} font-medium`}>malu</span> — yang menusuk, yang membuat wajah terbakar, yang ingin membuatku menghilang dari muka bumi.
                </p>
                
                {/* DINAMIKA PACAR DI TELEPON */}
                <p className={`${theme.textMuted} ${fontSizeClasses.body} leading-relaxed`}>
                  Di layar, wajah pacarku berubah. Dia mendengar juga, tentu saja. Speaker-nya menyala. Suara ibunya masuk ke telingaku, juga ke telinganya. Dia menatapku, aku menatapnya. <span className={`${theme.textHeading} font-medium italic`}>Diam.</span>
                </p>
                
                <p className={`${theme.textMuted} ${fontSizeClasses.body} leading-relaxed pl-6 border-l-2 ${theme.borderLight}`}>
                  Dia tidak menutup speaker. Dia tidak membela. Dia hanya... diam. Seolah-olah kata-kata itu tidak cukup penting untuk disanggah. Atau mungkin, di dalam hatinya, dia juga berpikir sama?
                </p>
                
                {/* HIGHLIGHT MOMENT - BOLD */}
                <p className={`${theme.textMuted} italic ${fontSizeClasses.body}`}>
                  Aku pikir, mungkin ini yang mereka lihat: <span className={`${theme.textHeading} font-medium not-italic`}>bukan seseorang yang bekerja keras, bukan seseorang yang mencoba bertahan, tapi hanya profesi yang rendah, yang tidak layak dihormati, yang harus diwaspadai — bahkan oleh orang yang katanya mencintaimu.</span>
                </p>
              </div>

              <div className={`mt-8 pt-6 border-t ${theme.borderLight}`}>
                <p className={`${theme.accent} ${fontSizeClasses.small} uppercase tracking-widest mb-2`}>Yang Ingin Kukatakan</p>
                <p className={`${theme.textHeading} ${fontSizeClasses.body} italic`}>
                  "Aku hanya membuat kopi, Bu. Aku hanya berusaha menjadi baik. Aku tidak menjadi apa-apa kecuali lelah."
                </p>
              </div>
            </div>
          </motion.div>

          <motion.p variants={fadeInUp} className={`${theme.textMuted} ${fontSizeClasses.body} text-center italic leading-relaxed max-w-2xl mx-auto`}>
            Call itu berakhir cepat. Aku pura-pura sinyal jelek. Pura-pura tidak mendengar. Pura-pura tidak merasa. Tapi malam itu, aku benar-benar tidak bisa tidur. Bukan karena kata-kata ibunya. Tapi karena <span className={`${theme.textHeading} font-medium`}>diamnya dia.</span>
          </motion.p>
        </motion.section>

        {/* New Section: Tengah Malam */}
        <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`${fontSize === 'large' ? 'mb-24 md:mb-32' : 'mb-20 md:mb-28'}`}>
          <motion.div variants={fadeInUp} className={`flex items-center gap-4 mb-10 pb-4 border-b ${theme.border}`}>
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.15em] uppercase`}># Tengah Malam</span>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-6">
            <motion.p variants={fadeInUp} className={`${fontSizeClasses.body} font-light leading-relaxed`}>
              Jam dua malam. Aku masih terjaga. Bukan karena insomnia. Karena kaki. Kaki yang terus berdenyut, seperti masih mengingat lantai keras café. Tubuhku sudah di kasur, tapi bagian-bagianku masih di tempat kerja.
            </motion.p>

            <motion.div variants={fadeInUp} className={`p-8 ${theme.card} border ${theme.border} rounded-lg my-10`}>
              <p className={`${theme.textMuted} ${fontSizeClasses.small} uppercase tracking-wider mb-4`}>Ritual Sebelum Tidur</p>
              <ul className="space-y-3">
                {[
                  "Mengecek jam — sudah terlalu larut untuk tidur nyenyak.",
                  "Mengecek kaki — masih bengkak, masih sakit.",
                  "Mengecek dompet — cukup untuk besok, hanya itu yang penting.",
                  "Mengecek hati — masih utuh, meski lelah."
                ].map((item, i) => (
                  <li key={i} className={`${theme.text} ${fontSizeClasses.body} flex items-start gap-3`}>
                    <span className={`${theme.accent} mt-2 w-1.5 h-1.5 rounded-full bg-current flex-shrink-0`} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* HIGHLIGHT MOMENT */}
            <motion.p variants={fadeInUp} className={`${theme.textMuted} ${fontSizeClasses.body} italic leading-relaxed pl-6 border-l-2 ${theme.borderLight}`}>
              Kadang aku bertanya: <span className={`${theme.textHeading} font-medium not-italic`}>apakah semua orang merasa seperti ini?</span> Atau hanya aku? Atau hanya kita — mereka yang bekerja di balik bar, di balik meja, di balik senyum yang kita pinjam setiap hari?
            </motion.p>
          </motion.div>
        </motion.section>

        {/* Section: Masih Berdiri - Climax */}
        <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`${fontSize === 'large' ? 'mb-24 md:mb-32' : 'mb-20 md:mb-28'}`}>
          <motion.div variants={fadeInUp} className={`flex items-center gap-4 mb-10 pb-4 border-b ${theme.border}`}>
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.15em] uppercase`}># Masih Berdiri</span>
          </motion.div>

          <motion.div variants={scaleIn} className={`p-10 md:p-14 ${theme.highlight} border-2 ${theme.accentBorder} rounded-xl relative overflow-hidden`}>
            <motion.div 
              animate={{ x: [0, 30, 0], y: [0, -15, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute -top-20 -right-20 w-60 h-60 ${darkMode ? 'bg-amber-900/10' : 'bg-amber-500/10'} rounded-full blur-3xl`} 
            />
            
            <div className="relative z-10 text-center space-y-6">
              <motion.p variants={fadeInUp} className={`${theme.text} ${fontSizeClasses.body} font-light leading-relaxed`}>
                Aku berdiri bukan karena kuat.
              </motion.p>
              <motion.p variants={fadeInUp} className={`${theme.text} ${fontSizeClasses.body} font-light leading-relaxed`}>
                Bukan karena yakin akan masa depan yang cerah.
              </motion.p>
              <motion.p variants={fadeInUp} className={`${theme.text} ${fontSizeClasses.body} font-light leading-relaxed`}>
                Bukan karena passion yang membakar.
              </motion.p>
              
              <div className={`py-8 border-y-2 ${theme.accentBorder} my-8`}>
                <motion.p 
                  variants={scaleIn}
                  className={`${theme.textHeading} ${fontSize === 'large' ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} font-serif italic leading-relaxed`}
                >
                  "Aku berdiri karena tubuhku masih sanggup melakukannya. <span className={theme.accent}>Karena besok ada tagihan.</span> Karena aku belum menemukan alasan untuk berhenti — atau untuk melanjutkan."
                </motion.p>
              </div>
              
              <motion.p variants={fadeInUp} className={`${theme.accent} ${fontSizeClasses.small} tracking-[0.25em] uppercase font-medium`}>
                Dan hari ini, itu cukup.
              </motion.p>
              <motion.p variants={fadeInUp} className={`${theme.textMuted} ${fontSizeClasses.body} italic`}>
                Mungkin besok juga. Mungkin selamanya.
              </motion.p>
            </div>
          </motion.div>
        </motion.section>

        {/* Epilog - Enhanced */}
        <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`${fontSize === 'large' ? 'mb-20 md:mb-24' : 'mb-16 md:mb-20'} border-t-2 ${theme.border} pt-16`}>
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4 mb-12">
            <span className={`w-12 h-px ${darkMode ? 'bg-stone-800' : 'bg-stone-200'}`} />
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.2em] uppercase`}>Epilog</span>
            <span className={`w-12 h-px ${darkMode ? 'bg-stone-800' : 'bg-stone-200'}`} />
          </motion.div>

          <motion.h2 variants={fadeInUp} className={`text-center font-serif font-light ${fontSizeClasses.heading} ${theme.textHeading} mb-12 italic`}>Masih di Sini</motion.h2>

          <div className="max-w-2xl mx-auto space-y-8 text-center">
            <motion.p variants={lineReveal} className={`${theme.text} ${fontSizeClasses.body} font-light leading-relaxed`}>
              Aku masih membuat kopi. Masih berdiri di balik bar. Masih tersenyum ketika pelanggan datang. Masih menjadi tidak terlihat.
            </motion.p>
            
            <motion.p variants={lineReveal} className={`${theme.textMuted} font-light italic leading-relaxed ${fontSizeClasses.body}`}>
              Aku tidak lagi mencari sempurna. Aku tidak lagi mencari pengakuan. Aku hanya mencari... <span className={`${theme.textHeading} font-medium not-italic`}>tenang.</span> Sedikit saja. Sebentar saja.
            </motion.p>
            
            <motion.div variants={scaleIn} className={`py-10 ${theme.accentBg} ${theme.accentBorder} border-2 rounded-lg my-10`}>
              <p className={`${theme.textHeading} ${fontSizeClasses.subheading} font-serif italic mb-4`}>Aku hanya menyeduh dan menunggu.</p>
              <p className={`${theme.textMuted} ${fontSizeClasses.body}`}>Menunggu apa? Aku juga tidak tahu.</p>
              <p className={`${theme.accent} ${fontSizeClasses.small} uppercase tracking-widest mt-4`}>Mungkin menunggu diriku sendiri.</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className={`pt-8 border-t ${theme.border}`}>
              <p className={`${theme.textHeading} ${fontSizeClasses.body} tracking-widest uppercase mb-3`}>Tidak ada kesimpulan.</p>
              <p className={`${theme.textMuted} text-sm italic mb-6`}>Hanya keberadaan yang terus berlanjut.</p>
              <motion.p 
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
                className={`${theme.accent} ${fontSizeClasses.heading} font-serif italic`}
              >
                Aku masih di sini.
              </motion.p>
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`my-20 py-16 ${theme.accentBg} ${theme.accentBorder} border-y-2 text-center relative overflow-hidden`}
        >
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 5, repeat: Infinity }}
            className={`absolute inset-0 ${darkMode ? 'bg-amber-900/10' : 'bg-amber-500/10'}`}
          />
          
          <div className="relative z-10 max-w-2xl mx-auto px-6">
            <PenLine size={48} className={`${theme.accent} mx-auto mb-6`} />
            <h3 className={`font-serif ${fontSizeClasses.heading} ${theme.textHeading} mb-6 italic`}>
              Punya pengalaman kerja kayak gini juga?
            </h3>
            <p className={`${theme.textMuted} ${fontSizeClasses.body} mb-10 leading-relaxed`}>
              Cerita lo mungkin beda profesi, beda kota, beda detail. Tapi rasanya? Mungkin sama. 
              <span className={`${theme.textHeading} font-medium block mt-2`}>Capek yang tidak terlihat. Harapan yang terkikis. Kebanggaan kecil yang tidak ada yang lihat.</span>
            </p>
            
            <Link href="/tulis">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative px-12 py-6 ${darkMode ? 'bg-amber-900/40' : 'bg-amber-100'} ${theme.accentBorder} border-2 overflow-hidden rounded-lg shadow-xl`}
              >
                <span className={`relative z-10 text-[16px] tracking-[0.15em] uppercase ${theme.accent} font-bold transition-colors duration-300 group-hover:text-white`}>
                  Tulis Cerita Lo
                </span>
                <motion.div
                  className={`absolute inset-0 ${darkMode ? 'bg-amber-700' : 'bg-amber-600'}`}
                  initial={{ y: "100%" }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
                <span className={`absolute inset-0 flex items-center justify-center text-[16px] tracking-[0.15em] uppercase font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20`}>
                  Tulis Cerita Lo
                </span>
              </motion.button>
            </Link>

            <p className={`mt-8 ${theme.textMuted} text-sm italic`}>
              Tidak perlu sempurna. Tidak perlu panjang. Yang penting: <span className={theme.accent}>jujur.</span>
            </p>
          </div>
        </motion.section>

        {/* Related Stories - SUDAH FIX DENGAN LINK */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className={`flex items-center gap-4 mb-10 pb-4 border-b ${theme.border}`}>
            <span className={`${theme.accent} ${fontSizeClasses.small} tracking-[0.15em] uppercase font-medium flex items-center gap-2`}>
              <Sparkles size={16} />
              Cerita Lain dari Dunia Kerja Bar
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedStories.map((story, index) => (
              <Link href={`/cerita/${story.slug}`} key={index}>
                <motion.article
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className={`group p-6 ${theme.card} border ${theme.border} rounded-lg cursor-pointer h-full flex flex-col`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`${theme.accent} ${fontSizeClasses.small} font-medium`}>{story.category}</span>
                    <span className={`w-1 h-1 rounded-full ${theme.textMuted}`} />
                    <span className={`${theme.textMuted} text-xs`}>{story.readTime}</span>
                  </div>
                  
                  <h4 className={`${theme.textHeading} ${fontSizeClasses.subheading} font-serif italic mb-3 group-hover:${theme.accent} transition-colors`}>
                    {story.title}
                  </h4>
                  
                  <p className={`${theme.textMuted} text-sm leading-relaxed mb-4 flex-grow`}>
                    {story.excerpt}
                  </p>
                  
                  <div className={`mt-auto pt-4 border-t ${theme.borderLight}`}>
                    <p className={`${theme.accent} text-xs italic leading-relaxed`}>
                      "{story.highlight}"
                    </p>
                  </div>
                  
                  <div className={`flex items-center gap-2 mt-4 ${theme.accent} text-sm font-medium`}>
                    <span>Baca Selengkapnya</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/jelajahi">
              <motion.button
                whileHover={{ scale: 1.02 }}
                className={`px-8 py-4 ${theme.card} border ${theme.border} rounded-full ${theme.hover} transition-all text-sm ${theme.textMuted} font-medium`}
              >
                Lihat Semua Cerita →
              </motion.button>
            </Link>
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
          <p className={`${theme.accent} text-xs mt-4 italic`}>Dari balik bar, untuk yang di balik meja lainnya.</p>
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
