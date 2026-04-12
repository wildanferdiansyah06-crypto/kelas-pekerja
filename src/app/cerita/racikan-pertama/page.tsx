'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Moon, Sun, ArrowLeft, Quote, Sparkles, Coffee, HeartCrack } from 'lucide-react';
import Link from 'next/link';

export default function RacikanPertamaPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
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
    divider: 'bg-stone-800',
    accent: 'text-amber-600',
    accentBg: 'bg-amber-950/20',
    accentBorder: 'border-amber-900/30',
    card: 'bg-stone-900/30',
    hover: 'hover:bg-stone-800/40',
    highlight: 'bg-amber-950/30 border-amber-800/40'
  } : {
    bg: 'bg-[#faf9f7]',
    bgGradient: 'from-[#faf9f7] via-[#f5f3f0] to-[#faf9f7]',
    text: 'text-[#4a4a4a]',
    textMuted: 'text-[#6a6a6a]',
    textHeading: 'text-[#2d2d2d]',
    border: 'border-[#e5e2dd]',
    borderLight: 'border-[#d4d0c8]',
    divider: 'bg-[#e5e2dd]',
    accent: 'text-[#8b7355]',
    accentBg: 'bg-[#e5e2dd]/50',
    accentBorder: 'border-[#d4d0c8]',
    card: 'bg-white/60',
    hover: 'hover:bg-[#f5f3f0]/80',
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

  // TAMBAHKAN INI - scaleIn yang hilang
  const scaleIn = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
  };

  const viewportConfig = { once: true, amount: 0.2 };

  return (
    <div className={`${theme.bg} transition-colors duration-700 ease-out selection:bg-amber-900/30 selection:text-amber-100`}>
      
      <motion.div 
        className={`fixed top-0 left-0 right-0 h-[2px] ${darkMode ? 'bg-gradient-to-r from-amber-800 to-amber-600' : 'bg-gradient-to-r from-amber-700 to-amber-500'} origin-left z-50`}
        style={{ scaleX }}
      />

      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 ${darkMode ? 'bg-stone-950/80' : 'bg-white/80'} backdrop-blur-md border-b ${theme.border} px-6 py-4`}
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className={`flex items-center gap-2 ${theme.textMuted} hover:${theme.textHeading} transition-colors`}>
            <ArrowLeft size={20} />
            <span className="text-sm">Kembali</span>
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={toggleDarkMode} className={`p-2 rounded-full ${theme.card} ${theme.hover} transition-all`}>
              {darkMode ? <Sun size={18} className={theme.accent} /> : <Moon size={18} className={theme.accent} />}
            </button>
            <button 
              onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium ${theme.card} ${theme.hover} ${theme.accent}`}
            >
              {fontSize === 'normal' ? 'A' : 'A+'}
            </button>
          </div>
        </div>
      </motion.nav>

      <main className={`relative max-w-3xl mx-auto px-6 md:px-12 ${fontSize === 'large' ? 'py-28 md:py-36' : 'py-24 md:py-32'}`}>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex flex-wrap items-center justify-center gap-3 mb-8 ${theme.accentBg} ${theme.accentBorder} border rounded-full py-2 px-4 w-fit mx-auto mt-8`}
        >
          <span className={`${theme.accent} ${fontSizeClasses.small} font-medium`}>Barista</span>
          <span className={`w-1 h-1 rounded-full ${theme.textMuted}`} />
          <span className={`${theme.textMuted} ${fontSizeClasses.small}`}>4 menit baca</span>
        </motion.div>

        <motion.header variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`${fontSize === 'large' ? 'mb-20 md:mb-28' : 'mb-16 md:mb-24'}`}>
          <motion.div variants={fadeInUp} className={`${theme.border} border-b pb-8 mb-12`}>
            <div className="flex items-center gap-3 mb-4">
              <Coffee size={fontSize === 'large' ? 20 : 16} className={theme.accent} strokeWidth={1.5} />
              <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.2em] uppercase`}>Kenangan</span>
            </div>
            
            <h1 className={`font-serif ${fontSizeClasses.heading} tracking-tight ${theme.textHeading} mb-6 leading-tight`}>
              Racikan <span className={`italic ${theme.accent} font-light`}>Pertama</span>
            </h1>
            
            <motion.div 
              variants={fadeInUp}
              className={`${theme.accentBg} ${theme.accentBorder} border-l-4 p-6 rounded-r-lg mb-6`}
            >
              <p className={`${theme.textHeading} ${fontSize === 'large' ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'} leading-relaxed font-light`}>
                "Setiap racikan adalah doa yang tidak kita sadari. Kopi pertama yang kubuat bukan untuk pelanggan, tapi untuk nenek yang tidak pernah datang lagi."
              </p>
            </motion.div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className={`${theme.textMuted} italic`}>Untuk Yang Pergi</span>
              <span className={`w-8 h-px ${darkMode ? 'bg-stone-700' : 'bg-stone-300'}`} />
              <span className={`${theme.accent} font-medium`}>Wildan Ferdiansyah</span>
            </div>
          </motion.div>
        </motion.header>

        <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`${fontSize === 'large' ? 'mb-24 md:mb-32' : 'mb-20 md:mb-28'}`}>
          <motion.h2 variants={fadeInUp} className={`${fontSizeClasses.subheading} font-serif font-light ${theme.textHeading} mb-10 italic`}>
            Hari Pertama di Balik Mesin
          </motion.h2>

          <motion.div variants={staggerContainer} className="space-y-4">
            {[
              "Aku masih ingat hari itu. Bukan karena pelanggan pertamaku, atau karena kecelakaan kecil dengan susu yang panas.",
              "Aku ingat karena nenek.",
              "Dia datang sendirian, jam sepagi. Mengenakan kebaya ungu yang kusam di pundaknya, tongkat kayu di tangan kirinya. Umurnya mungkin delapan puluh, mungkin lebih.",
              "Aku belum bisa membuat kopi dengan baik waktu itu. Tangan ku gemetar, tekanan gilingan ku kacau, ekstraksi ku terlalu cepat.",
              "Tapi nenek duduk di bar. Menunggu. Menatapku dengan sabar, seperti menatap cucu yang sedang belajar berjalan."
            ].map((line, i) => (
              <motion.p 
                key={i} 
                variants={lineReveal} 
                className={`${fontSizeClasses.body} font-light ${i === 1 ? `${theme.textHeading} font-normal` : ''} ${i === 2 ? 'italic ' + theme.textMuted : ''}`}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className={`my-12 p-8 md:p-10 ${theme.highlight} border-2 ${theme.accentBorder} rounded-lg relative overflow-hidden`}>
            <Quote size={32} className={`${theme.accent} opacity-30 absolute top-6 right-6`} />
            <div className="relative z-10 space-y-4">
              <p className={`${theme.textHeading} ${fontSizeClasses.body} font-medium`}>"Tidak apa-apa, sayang," katanya. "Aku tidak buru-buru."</p>
              <p className={`${theme.textMuted} ${fontSizeClasses.body} leading-relaxed`}>
                Tiga kali aku gagal. Tiga kali dia menunggu. Tidak mengeluh, tidak meminta diganti. Hanya tersenyum dan bilang, "Coba lagi, pelan-pelan."
              </p>
              <p className={`${theme.accent} italic text-sm mt-4`}>
                Kopi keempat — yang masih jauh dari sempurna — akhirnya kuberikan. Dia minum perlahan. Seperti ritual. Seperti doa.
              </p>
            </div>
          </motion.div>
        </motion.section>

        <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`${fontSize === 'large' ? 'mb-24 md:mb-32' : 'mb-20 md:mb-28'}`}>
          <motion.div variants={fadeInUp} className={`flex items-center gap-4 mb-10 pb-4 border-b ${theme.border}`}>
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.15em] uppercase`}># Rutinitas</span>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-6">
            <motion.p variants={fadeInUp} className={`${fontSizeClasses.body} font-light leading-relaxed`}>
              Setelah itu, setiap Kamis pagi, nenek datang. Selalu jam delapan. Selalu kebaya ungu yang sama — atau mungkin dia punya banyak kebaya ungu yang serupa. Selalu duduk di stool yang sama, di sudut bar, menghadap jendela.
            </motion.p>

            <motion.p variants={fadeInUp} className={`${theme.textMuted} ${fontSizeClasses.body} italic leading-relaxed pl-6 border-l-2 ${theme.borderLight}`}>
              Aku belajar membuat kopi yang lebih baik karena dia. Bukan karena tekanan untuk sempurna, tapi karena aku ingin dia minum sesuatu yang layak. Sesuatu yang mengatakan, "Terima kasih sudah menunggu. Terima kasih sudah percaya."
            </motion.p>

            <motion.div variants={fadeInUp} className={`grid grid-cols-1 md:grid-cols-2 gap-4 my-10`}>
              <div className={`p-6 ${theme.card} border ${theme.border} rounded-lg`}>
                <p className={`${theme.textMuted} text-sm mb-2 uppercase tracking-wider`}>Pesanannya</p>
                <p className={`${theme.textHeading} ${fontSizeClasses.subheading} font-serif italic`}>Kopi Tubruk</p>
                <p className={`${theme.textMuted} text-sm mt-3 leading-relaxed`}>Tidak pakai gula. Tidak pakai susu. "Biar aku rasakan aslinya," katanya.</p>
              </div>
              <div className={`p-6 ${theme.card} border ${theme.border} rounded-lg`}>
                <p className={`${theme.textMuted} text-sm mb-2 uppercase tracking-wider`}>Yang Dibawanya</p>
                <p className={`${theme.textHeading} ${fontSizeClasses.subheading} font-serif italic`}>Buku Tua</p>
                <p className={`${theme.textMuted} text-sm mt-3 leading-relaxed`}>Selalu buku puisi. Dia baca sambil menunggu kopinya dingin sedikit.</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`${fontSize === 'large' ? 'mb-24 md:mb-32' : 'mb-20 md:mb-28'}`}>
          <motion.div variants={fadeInUp} className={`flex items-center gap-4 mb-10 pb-4 border-b ${theme.border}`}>
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.15em] uppercase`}># Yang Tidak Datang</span>
          </motion.div>

          <motion.div variants={scaleIn} className={`p-10 md:p-14 ${darkMode ? 'bg-[#0a0908]' : 'bg-white'} border-2 ${theme.border} shadow-2xl my-12 rounded-lg relative overflow-hidden`}>
            <div className={`absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-24 ${darkMode ? 'bg-stone-700' : 'bg-stone-300'} rounded-full`} />
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <HeartCrack size={20} className={theme.textMuted} />
                <p className={`${theme.textMuted} ${fontSizeClasses.small} uppercase tracking-widest`}>Kamis ke-12</p>
              </div>
              
              <p className={`${theme.textHeading} ${fontSizeClasses.heading} font-serif italic mb-4`}>
                Dia tidak datang.
              </p>
              
              <div className="space-y-4">
                <p className={`${theme.textMuted} ${fontSizeClasses.body} leading-relaxed`}>
                  Aku sudah menyeduh kopinya. Tubruk, tidak pakai gula, dalam cangkir keramik putih yang kusukai. Aku letakkan di stool kosongnya, menghadap jendela, seperti biasa.
                </p>
                
                <p className={`${theme.textMuted} ${fontSizeClasses.body} leading-relaxed pl-6 border-l-2 ${theme.borderLight}`}>
                  Jam delapan lewat lima. Jam delapan lewat sepuluh. Jam sembilan.
                </p>
                
                <p className={`${theme.textHeading} ${fontSizeClasses.body} font-medium`}>
                  Kopi itu dingin. Aku yang menghabiskannya. Pertama kalinya aku minum racikanku sendiri sambil menangis diam-diam di balik bar.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className={`p-8 ${theme.highlight} border-2 ${theme.accentBorder} rounded-xl text-center`}>
            <Sparkles size={24} className={`${theme.accent} mx-auto mb-4 opacity-50`} />
            <p className={`${theme.textHeading} ${fontSize === 'large' ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'} font-serif italic leading-relaxed mb-4`}>
              "Setiap racikan adalah doa. Doa untuk yang minum. Doa untuk yang menunggu. Doa untuk yang sudah tidak bisa kita seduhkan lagi."
            </p>
            <p className={`${theme.accent} ${fontSizeClasses.small} uppercase tracking-widest`}>
              Untuk nenek berkebaya ungu — di mana pun Anda berada.
            </p>
          </motion.div>
        </motion.section>

        <motion.footer variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`text-center pt-12 pb-8 border-t ${theme.border}`}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className={`w-12 h-px ${darkMode ? 'bg-stone-800' : 'bg-stone-200'}`} />
            <Coffee size={16} className={theme.textMuted} strokeWidth={1.5} />
            <span className={`w-12 h-px ${darkMode ? 'bg-stone-800' : 'bg-stone-200'}`} />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
            <Link href="/cerita/di-ujung-shift" className={`${theme.accent} hover:underline text-sm`}>← Di Ujung Shift</Link>
            <span className={`hidden md:inline ${theme.textMuted}`}>•</span>
            <Link href="/cerita/meja-kosong" className={`${theme.accent} hover:underline text-sm`}>Meja Kosong →</Link>
          </div>
          <p className={`${theme.textMuted} text-[10px] tracking-wider opacity-60`}>Wildan Ferdiansyah • 2025</p>
        </motion.footer>

      </main>
    </div>
  );
}
