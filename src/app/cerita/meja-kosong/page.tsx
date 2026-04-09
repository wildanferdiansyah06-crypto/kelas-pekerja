'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Moon, Sun, ArrowLeft, Quote, Sparkles, GlassWater, Calendar, User } from 'lucide-react';
import Link from 'next/link';

export default function MejaKosongPage() {
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
    bg: 'bg-[#fafaf9]',
    bgGradient: 'from-stone-50 via-[#f5f5f4] to-stone-100',
    text: 'text-stone-600',
    textMuted: 'text-stone-400',
    textHeading: 'text-stone-800',
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
          <span className={`${theme.accent} ${fontSizeClasses.small} font-medium`}>Bartender</span>
          <span className={`w-1 h-1 rounded-full ${theme.textMuted}`} />
          <span className={`${theme.textMuted} ${fontSizeClasses.small}`}>6 menit baca</span>
        </motion.div>

        <motion.header variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`${fontSize === 'large' ? 'mb-20 md:mb-28' : 'mb-16 md:mb-24'}`}>
          <motion.div variants={fadeInUp} className={`${theme.border} border-b pb-8 mb-12`}>
            <div className="flex items-center gap-3 mb-4">
              <GlassWater size={fontSize === 'large' ? 20 : 16} className={theme.accent} strokeWidth={1.5} />
              <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.2em] uppercase`}>Misteri</span>
            </div>
            
            <h1 className={`font-serif ${fontSizeClasses.heading} tracking-tight ${theme.textHeading} mb-6 leading-tight`}>
              Meja <span className={`italic ${theme.accent} font-light`}>Kosong</span>
            </h1>
            
            <motion.div 
              variants={fadeInUp}
              className={`${theme.accentBg} ${theme.accentBorder} border-l-4 p-6 rounded-r-lg mb-6`}
            >
              <p className={`${theme.textHeading} ${fontSize === 'large' ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'} leading-relaxed font-light`}>
                "Kita bukan cuma bikin minuman. Kita jadi saksi hidup orang. Dan kadang, kita jadi satu-satunya yang memperhatikan ketika mereka pergi."
              </p>
            </motion.div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className={`${theme.textMuted} italic`}>Setiap Kamis Malam</span>
              <span className={`w-8 h-px ${darkMode ? 'bg-stone-700' : 'bg-stone-300'}`} />
              <span className={`${theme.accent} font-medium`}>Wildan Ferdiansyah</span>
            </div>
          </motion.div>
        </motion.header>

        <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`${fontSize === 'large' ? 'mb-24 md:mb-32' : 'mb-20 md:mb-28'}`}>
          <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-10">
            <Calendar size={fontSize === 'large' ? 20 : 16} className={theme.accent} strokeWidth={1.5} />
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.15em] uppercase`}>Kamis, 20:00</span>
          </motion.div>

          <motion.h2 variants={fadeInUp} className={`${fontSizeClasses.subheading} font-serif font-light ${theme.textHeading} mb-10 italic`}>
            Rutinitas yang Tidak Ditutupi
          </motion.h2>

          <motion.div variants={staggerContainer} className="space-y-4">
            {[
              "Ada meja di sudut dekat jendela.",
              "Meja nomor tujuh. Dua kursi. Satu lampu gantung kecil di atasnya yang selalu kusaklar sedikit lebih redup dari yang lain.",
              "Setiap Kamis malam, selama setahun terakhir, meja itu ditempati oleh seorang pria. Usianya sekitar empat puluhan. Rambut mulai menipis. Selalu mengenakan kemeja flanel biru — atau mungkin dia punya banyak kemeja flanel biru yang sama.",
              "Dia tidak pernah datang bersama siapa pun. Tapi dia selalu memesan untuk dua."
            ].map((line, i) => (
              <motion.p 
                key={i} 
                variants={lineReveal} 
                className={`${fontSizeClasses.body} font-light ${i === 0 ? `${theme.textHeading} font-normal` : ''} ${i === 3 ? 'italic ' + theme.textMuted : ''}`}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className={`my-12 pl-6 md:pl-8 border-l-2 ${theme.accentBorder}`}>
            <p className={`${theme.textMuted} ${fontSizeClasses.body} italic mb-4 leading-relaxed`}>
              "Dua whiskey sour," katanya setiap kali. "Satu dengan es, satu tanpa."
            </p>
            <p className={`${theme.text} ${fontSizeClasses.body} leading-relaxed`}>
              Yang tanpa es selalu dia letakkan di kursi kosong di depannya. Tidak diminum. Hanya didiamkan di sana selama dua jam. Kadang dia berbicara pada gelas itu. Kadang dia hanya menatap.
            </p>
          </motion.div>
        </motion.section>

        <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`${fontSize === 'large' ? 'mb-24 md:mb-32' : 'mb-20 md:mb-28'}`}>
          <motion.div variants={fadeInUp} className={`flex items-center gap-4 mb-10 pb-4 border-b ${theme.border}`}>
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.15em] uppercase`}># Yang Kami Tahu</span>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-6">
            <motion.p variants={fadeInUp} className={`${fontSizeClasses.body} font-light leading-relaxed`}>
              Kami — para staf bar — tidak pernah bertanya. Itu aturan tak tertulis. Tapi kami mengamati. Kami menyimpulkan. Kami menciptakan narasi-narasi kecil di kepala kami tentang pria di meja nomor tujuh.
            </motion.p>

            <motion.div variants={fadeInUp} className={`grid md:grid-cols-2 gap-4 my-10`}>
              <div className={`p-6 ${theme.card} border ${theme.border} rounded-lg ${theme.hover} transition-all duration-300`}>
                <p className={`${theme.textMuted} text-sm mb-2 uppercase tracking-wider flex items-center gap-2`}>
                  <User size={14} /> Teori 1
                </p>
                <p className={`${theme.textHeading} ${fontSizeClasses.subheading} font-serif italic mb-2`}>Saudara Kembar</p>
                <p className={`${theme.textMuted} text-sm leading-relaxed`}>
                  Yang satu meninggal. Yang hidup masih memesan minuman untuk yang mati. Seperti janji yang tidak bisa dilupakan.
                </p>
              </div>
              <div className={`p-6 ${theme.card} border ${theme.border} rounded-lg ${theme.hover} transition-all duration-300`}>
                <p className={`${theme.textMuted} text-sm mb-2 uppercase tracking-wider flex items-center gap-2`}>
                  <User size={14} /> Teori 2
                </p>
                <p className={`${theme.textHeading} ${fontSizeClasses.subheading} font-serif italic mb-2`}>Cinta yang Pergi</p>
                <p className={`${theme.textMuted} text-sm leading-relaxed`}>
                  Dia dan seseorang janjian di sini setiap Kamis. Lalu orang itu pergi. Tapi dia masih datang. Masih memesan untuk dua.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className={`p-8 ${theme.highlight} border-2 ${theme.accentBorder} rounded-lg`}>
              <Quote size={32} className={`${theme.accent} opacity-30 mb-4`} />
              <p className={`${theme.textHeading} ${fontSizeClasses.body} font-medium mb-3`}>
                "Tidak pernah ada yang tahu cerita sebenarnya," kata seniorku, yang sudah bekerja di sini lima tahun. "Dan kita tidak boleh tanya. Tapi lihatlah caranya memegang gelas kedua — seperti memegang tangan."
              </p>
              <p className={`${theme.accent} italic text-sm`}>
                "Itu bukan untuk saudara. Itu untuk seseorang yang pernah dicintai."
              </p>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`${fontSize === 'large' ? 'mb-24 md:mb-32' : 'mb-20 md:mb-28'}`}>
          <motion.div variants={fadeInUp} className={`flex items-center gap-4 mb-10 pb-4 border-b ${theme.border}`}>
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.15em] uppercase`}># Kamis Tanpa Dia</span>
          </motion.div>

          <motion.div variants={scaleIn} className={`p-10 md:p-14 ${darkMode ? 'bg-[#0a0908]' : 'bg-white'} border-2 ${theme.border} shadow-2xl my-12 rounded-lg relative overflow-hidden`}>
            <div className={`absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-24 ${darkMode ? 'bg-stone-700' : 'bg-stone-300'} rounded-full`} />
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <GlassWater size={20} className={theme.textMuted} />
                <p className={`${theme.textMuted} ${fontSizeClasses.small} uppercase tracking-widest`}>Kamis Ke-53</p>
              </div>
              
              <p className={`${theme.textHeading} ${fontSizeClasses.heading} font-serif italic mb-4`}>
                Meja nomor tujuh kosong.
              </p>
              
              <div className="space-y-4">
                <p className={`${theme.textMuted} ${fontSizeClasses.body} leading-relaxed`}>
                  Jam delapan malam. Jam sembilan. Jam sepuluh. Kursi itu tetap kosong. Tidak ada kemeja flanel biru. Tidak ada whiskey sour ganda. Tidak ada percakapan diam dengan gelas yang tidak diminum.
                </p>
                
                <p className={`${theme.textMuted} ${fontSizeClasses.body} leading-relaxed pl-6 border-l-2 ${theme.borderLight}`}>
                  Aku membersihkan meja itu tiga kali malam itu, lebih sering dari biasanya. Bukan karena kotor. Tapi karena aku tidak tahu harus berbuat apa. Aku merasa seperti kehilangan sesuatu, padahal dia bukan milikku. Bukan pelanggan setia dalam arti bisnis. Tapi dia adalah bagian dari rutinitas. Bagian dari kamis. Bagian dari cerita bar ini.
                </p>
                
                <p className={`${theme.textHeading} ${fontSizeClasses.body} font-medium`}>
                  Kami tidak pernah melihatnya lagi.
                </p>
              </div>

              <div className={`mt-8 pt-6 border-t ${theme.borderLight}`}>
                <p className={`${theme.accent} ${fontSizeClasses.small} uppercase tracking-widest mb-2`}>Yang Tersisa</p>
                <p className={`${theme.textMuted} ${fontSizeClasses.body} italic`}>
                  Kini, setiap Kamis, aku selalu menyisihkan meja nomor tujuh selama satu jam pertama. Mengelapnya dua kali. Menyalakan lampu gantung sedikit lebih redup. Siapkan dua gelas — meski tidak ada yang memesan.
                </p>
                <p className={`${theme.textHeading} ${fontSizeClasses.body} italic mt-4`}>
                  "Siapa tahu," kataku pada diri sendiri. "Siapa tahu suatu hari dia kembali. Atau siapa tahu... dia sudah tenang di tempat yang lebih baik, bersama si pemilik gelas kedua."
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className={`text-center py-14 ${theme.accentBg} ${theme.accentBorder} border-2 rounded-lg my-14 relative overflow-hidden`}>
            <motion.div 
              animate={{ y: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute top-4 left-1/2 -translate-x-1/2 w-32 h-32 ${darkMode ? 'bg-amber-800/20' : 'bg-amber-500/20'} rounded-full blur-3xl`} 
            />
            <div className="relative z-10">
              <Sparkles size={32} className={`${theme.accent} mx-auto mb-4 opacity-50`} />
              <p className={`${theme.accent} ${fontSizeClasses.small} tracking-[0.2em] uppercase mb-4`}>Untuk Pria Berflanel Biru</p>
              <p className={`${theme.textHeading} ${fontSizeClasses.heading} font-serif italic mb-4`}>Semoga kamu bertemu lagi.</p>
              <div className={`w-16 h-px ${theme.divider} mx-auto my-6`} />
              <p className={`${theme.textMuted} ${fontSizeClasses.subheading} italic font-serif`}>Dimanapun itu.</p>
            </div>
          </motion.div>
        </motion.section>

        <motion.footer variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig} className={`text-center pt-12 pb-8 border-t ${theme.border}`}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className={`w-12 h-px ${darkMode ? 'bg-stone-800' : 'bg-stone-200'}`} />
            <GlassWater size={16} className={theme.textMuted} strokeWidth={1.5} />
            <span className={`w-12 h-px ${darkMode ? 'bg-stone-800' : 'bg-stone-200'}`} />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
            <Link href="/cerita/racikan-pertama" className={`${theme.accent} hover:underline text-sm`}>← Racikan Pertama</Link>
            <span className={`hidden md:inline ${theme.textMuted}`}>•</span>
            <Link href="/cerita/di-ujung-shift" className={`${theme.accent} hover:underline text-sm`}>Di Ujung Shift →</Link>
          </div>
          <p className={`${theme.textMuted} text-[10px] tracking-wider opacity-60`}>Wildan Ferdiansyah • 2025</p>
        </motion.footer>

      </main>
    </div>
  );
}
