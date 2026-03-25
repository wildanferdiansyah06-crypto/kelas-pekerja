'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Moon, Sun, Clock, ArrowLeft, Quote, Sparkles, Footprints, Heart } from 'lucide-react';
import Link from 'next/link';

export default function DiUjungShiftPage() {
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
    textSecondary: 'text-stone-500',
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
    bg: 'bg-[#fafaf9]',
    bgGradient: 'from-stone-50 via-[#f5f5f4] to-stone-100',
    text: 'text-stone-600',
    textMuted: 'text-stone-400',
    textHeading: 'text-stone-800',
    textSecondary: 'text-stone-500',
    border: 'border-stone-200',
    borderLight: 'border-stone-300',
    divider: 'bg-stone-200',
    accent: 'text-amber-700',
    accentBg: 'bg-amber-50/60',
    accentBorder: 'border-amber-200',
    card: 'bg-white/60',
    hover: 'hover:bg-stone-100/80',
    highlight: 'bg-amber-50/80 border-amber-300/60'
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
    <div className={`min-h-screen ${theme.bg} transition-colors duration-700 ease-out selection:bg-amber-900/30 selection:text-amber-100`}>
      
      {/* Progress Bar */}
      <motion.div 
        className={`fixed top-0 left-0 right-0 h-[2px] ${darkMode ? 'bg-gradient-to-r from-amber-800 to-amber-600' : 'bg-gradient-to-r from-amber-700 to-amber-500'} origin-left z-50`}
        style={{ scaleX }}
      />

      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 ${darkMode ? 'bg-stone-950/80' : 'bg-white/80'} backdrop-blur-md border-b ${theme.border} px-6 py-4`}
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className={`flex items-center gap-2 ${theme.textMuted} hover:${theme.textHeading} transition-colors`}>
            <ArrowLeft size={20} />
            <span className="text-sm">Kembali ke Di Balik Bar</span>
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

        {/* Identity Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex flex-wrap items-center justify-center gap-3 mb-8 ${theme.accentBg} ${theme.accentBorder} border rounded-full py-2 px-4 w-fit mx-auto mt-8`}
        >
          <span className={`${theme.accent} ${fontSizeClasses.small} font-medium`}>Barista</span>
          <span className={`w-1 h-1 rounded-full ${theme.textMuted}`} />
          <span className={`${theme.textMuted} ${fontSizeClasses.small}`}>5 menit baca</span>
        </motion.div>

        {/* Header */}
        <motion.header variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`${fontSize === 'large' ? 'mb-20 md:mb-28' : 'mb-16 md:mb-24'}`}>
          <motion.div variants={fadeInUp} className={`${theme.border} border-b pb-8 mb-12`}>
            <div className="flex items-center gap-3 mb-4">
              <Footprints size={fontSize === 'large' ? 20 : 16} className={theme.accent} strokeWidth={1.5} />
              <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.2em] uppercase`}>Jam Terakhir</span>
            </div>
            
            <h1 className={`font-serif ${fontSizeClasses.heading} tracking-tight ${theme.textHeading} mb-6 leading-tight`}>
              Di Ujung <span className={`italic ${theme.accent} font-light`}>Shift</span>
            </h1>
            
            <motion.div 
              variants={fadeInUp}
              className={`${theme.accentBg} ${theme.accentBorder} border-l-4 p-6 rounded-r-lg mb-6`}
            >
              <p className={`${theme.textHeading} ${fontSize === 'large' ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'} leading-relaxed font-light`}>
                "Capeknya bukan di tangan. Capeknya di kepala, di senyum yang dipaksakan, di 'baik-baik saja' yang terucap otomatis."
              </p>
            </motion.div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className={`${theme.textMuted} italic`}>Catatan Shift Malam</span>
              <span className={`w-8 h-px ${darkMode ? 'bg-stone-700' : 'bg-stone-300'}`} />
              <span className={`${theme.accent} font-medium`}>Wildan Ferdiansyah</span>
            </div>
          </motion.div>
        </motion.header>

        {/* Section: Jam 9 Malam */}
        <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`${fontSize === 'large' ? 'mb-24 md:mb-32' : 'mb-20 md:mb-28'}`}>
          <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-10">
            <Clock size={fontSize === 'large' ? 20 : 16} className={theme.accent} strokeWidth={1.5} />
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.15em] uppercase`}>09:00 PM</span>
          </motion.div>

          <motion.h2 variants={fadeInUp} className={`${fontSizeClasses.subheading} font-serif font-light ${theme.textHeading} mb-10 italic`}>
            Ketika Kaki Mulai Bicara
          </motion.h2>

          <motion.div variants={staggerContainer} className="space-y-4">
            {[
              "Jam sembilan malam.",
              "Dua jam lagi.",
              "Tidak terasa lama, tapi tubuhku sudah mulai berhitung mundur sejak jam enam sore tadi.",
              "Kakiku — yang sejak pagi berdiri di lantai keramik dingin — mulai mengirim sinyal. Bukan sakit yang tajam. Bukan lelah yang bisa dijelaskan. Tapi sesuatu yang lebih dalam, lebih menyeluruh.",
              "Seperti ada batu kecil yang mengendap di telapak kaki, menekan urat-urat kecil yang tidak kumiliki nama untuknya."
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

          <motion.div variants={fadeInUp} className={`my-12 pl-6 md:pl-8 border-l-2 ${theme.accentBorder}`}>
            <p className={`${theme.textMuted} ${fontSizeClasses.body} italic mb-4 leading-relaxed`}>
              Aku sering berpikir, kalau kaki bisa berbicara, mereka pasti sudah mengumpat sejak jam tiga sore. Mereka pasti sudah bertanya: sampai kapan? Berapa lama lagi? Kenapa kita harus terus menopang?
            </p>
            <p className={`${theme.text} ${fontSizeClasses.body} leading-relaxed`}>
              Tapi kaki tidak bisa bicara. Jadi mereka hanya berdenyut. Mengirim rasa kesemutan yang bukan kesemutan. Menjadi berat, seperti ada gravitasi ekstra yang hanya bekerja pada tubuhku.
            </p>
          </motion.div>
        </motion.section>

        {/* Section: Jam 10 Malam */}
        <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`${fontSize === 'large' ? 'mb-24 md:mb-32' : 'mb-20 md:mb-28'}`}>
          <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-10">
            <Clock size={fontSize === 'large' ? 20 : 16} className={theme.accent} strokeWidth={1.5} />
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.15em] uppercase`}>10:00 PM</span>
          </motion.div>

          <motion.h2 variants={fadeInUp} className={`${fontSizeClasses.subheading} font-serif font-light ${theme.textHeading} mb-10 italic`}>
            Senyum yang Tersisa
          </motion.h2>

          <motion.div variants={staggerContainer} className="space-y-6">
            <motion.p variants={fadeInUp} className={`${fontSizeClasses.body} font-light leading-relaxed`}>
              Satu jam lagi. Pelanggan mulai berkurang. Meja-meja yang sejak tadi penuh dengan suara tawa dan percakapan mulai kosong satu per satu. Aku seharusnya lega. Tapi lega adalah kemewahan yang belum bisa kurasakan.
            </motion.p>

            <motion.p variants={fadeInUp} className={`${theme.textMuted} ${fontSizeClasses.body} italic leading-relaxed pl-6 border-l-2 ${theme.borderLight}`}>
              Karena di ujung shift, bukan berarti pekerjaan selesai. Ada yang namanya cleaning. Ada restock. Ada meja-meja yang harus dilap, lantai yang harus dipel, mesin yang harus dibersihkan dengan cermat — seolah-olah kita tidak sudah berdiri delapan jam.
            </motion.p>

            <motion.div variants={fadeInUp} className={`p-8 ${theme.highlight} border-2 ${theme.accentBorder} rounded-lg my-10`}>
              <Quote size={32} className={`${theme.accent} opacity-30 mb-4`} />
              <p className={`${theme.textHeading} ${fontSize === 'large' ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'} font-serif italic leading-relaxed mb-4`}>
                "Masih bisa order, Kak?"
              </p>
              <p className={`${theme.textMuted} ${fontSizeClasses.body} leading-relaxed`}>
                Seorang pelanggan datang, jam sepuluh lewat seperempat. Aku ingin mengatakan tidak. Aku ingin mengatakan mesin sudah dingin, bahwa aku sudah lelah, bahwa kakiku sudah tidak merasa. 
              </p>
              <p className={`${theme.accent} italic mt-4 text-sm`}>
                Tapi yang keluar adalah senyum. Senyum yang sama persis dengan yang kupakai jam sepagi tadi, hanya sekarang lebih berat, lebih mahal harganya.
              </p>
            </motion.div>

            <motion.p variants={fadeInUp} className={`${theme.textMuted} ${fontSizeClasses.body} italic leading-relaxed`}>
              Aku membuat kopi itu. Dua puluh menit. Dua puluh menit ekstra berdiri. Dua puluh menit ekstra tersenyum. Dua puluh menit yang mengambil sisa tenagaku yang seharusnya disimpan untuk perjalanan pulang.
            </motion.p>
          </motion.div>
        </motion.section>

        {/* Section: Jam 11 Malam - Closing */}
        <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`${fontSize === 'large' ? 'mb-24 md:mb-32' : 'mb-20 md:mb-28'}`}>
          <motion.div variants={fadeInUp} className={`flex items-center gap-4 mb-10 pb-4 border-b ${theme.border}`}>
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.15em] uppercase`}># Closing Time</span>
          </motion.div>

          <motion.div variants={scaleIn} className={`p-10 md:p-14 ${theme.highlight} border-2 ${theme.accentBorder} rounded-xl relative overflow-hidden`}>
            <motion.div 
              animate={{ x: [0, 30, 0], y: [0, -15, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute -top-20 -right-20 w-60 h-60 ${darkMode ? 'bg-amber-900/10' : 'bg-amber-500/10'} rounded-full blur-3xl`} 
            />
            
            <div className="relative z-10 text-center space-y-6">
              <motion.p variants={fadeInUp} className={`${theme.text} ${fontSizeClasses.body} font-light leading-relaxed`}>
                Akhirnya. Jam sebelas. Kunci gemerencet. Lampu padam. Aku duduk di tangga belakang, sepatu sudah terlepas, kakiku mengembang — begitulah rasanya, seperti balon yang terlalu lama diisi udara.
              </motion.p>
              
              <div className={`py-8 border-y-2 ${theme.accentBorder} my-8`}>
                <motion.p 
                  variants={fadeInUp}
                  className={`${theme.textHeading} ${fontSize === 'large' ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} font-serif italic leading-relaxed`}
                >
                  "Delapan jam berdiri. Delapan jam tersenyum. Delapan jam menjadi versi terbaik dari diriku — padahal aku sudah lupa diriku yang sebenarnya seperti apa."
                </motion.p>
              </div>
              
              <motion.div variants={fadeInUp} className="flex justify-center mb-6">
                <Heart className={`${theme.accent} opacity-50`} size={32} fill="currentColor" />
              </motion.div>
              
              <motion.p variants={fadeInUp} className={`${theme.accent} ${fontSizeClasses.small} tracking-[0.25em] uppercase font-medium`}>
                Besok, kita ulangi lagi.
              </motion.p>
            </div>
          </motion.div>
        </motion.section>

        {/* Footer Navigation */}
        <motion.footer variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`text-center pt-12 pb-8 border-t ${theme.border}`}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className={`w-12 h-px ${darkMode ? 'bg-stone-800' : 'bg-stone-200'}`} />
            <Sparkles size={16} className={theme.textMuted} strokeWidth={1.5} />
            <span className={`w-12 h-px ${darkMode ? 'bg-stone-800' : 'bg-stone-200'}`} />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
            <Link href="/cerita/racikan-pertama" className={`${theme.accent} hover:underline text-sm`}>← Racikan Pertama</Link>
            <span className={`hidden md:inline ${theme.textMuted}`}>•</span>
            <Link href="/cerita/meja-kosong" className={`${theme.accent} hover:underline text-sm`}>Meja Kosong →</Link>
          </div>
          <p className={`${theme.textMuted} text-[10px] tracking-wider opacity-60`}>Wildan Ferdiansyah • 2025</p>
        </motion.footer>

      </main>
    </div>
  );
}
