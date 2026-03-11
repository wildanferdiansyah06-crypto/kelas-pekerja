'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Coffee, Clock, Eye, EyeOff } from 'lucide-react';

export default function DiBalikBarPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [showNoise, setShowNoise] = useState(true);
  const { scrollYProgress } = useScroll();
  
  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Theme classes
  const theme = darkMode ? {
    bg: 'bg-[#0a0a0a]',
    text: 'text-[#a0a0a0]',
    textMuted: 'text-neutral-600',
    textHeading: 'text-neutral-200',
    border: 'border-neutral-800',
    accent: 'text-amber-600',
    accentBg: 'bg-amber-900/20',
    noise: 'opacity-[0.03]'
  } : {
    bg: 'bg-[#fafaf9]',
    text: 'text-[#57534e]',
    textMuted: 'text-stone-400',
    textHeading: 'text-stone-800',
    border: 'border-stone-200',
    accent: 'text-amber-700',
    accentBg: 'bg-amber-100/50',
    noise: 'opacity-[0.015]'
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
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
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const lineReveal = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
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

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-700 ease-in-out selection:bg-neutral-800 selection:text-neutral-200`}>
      {/* Noise Texture */}
      {showNoise && (
        <motion.div 
          className={`fixed inset-0 pointer-events-none ${theme.noise} transition-opacity duration-700`}
          style={{ y: backgroundY }}
        >
          <div className="absolute inset-0" 
               style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}} 
          />
        </motion.div>
      )}

      {/* Progress Bar */}
      <motion.div 
        className={`fixed top-0 left-0 right-0 h-[2px] ${darkMode ? 'bg-amber-700' : 'bg-amber-600'} origin-left z-50`}
        style={{ scaleX: scrollYProgress }}
      />

      {/* Floating Controls */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className={`fixed top-6 right-6 z-40 flex gap-3 ${darkMode ? 'bg-neutral-900/80' : 'bg-white/80'} backdrop-blur-md p-2 rounded-full border ${theme.border} shadow-lg`}
      >
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full transition-all duration-300 ${darkMode ? 'hover:bg-neutral-800 text-amber-500' : 'hover:bg-stone-100 text-amber-600'}`}
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
                <Moon size={18} />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sun size={18} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
        
        <button
          onClick={() => setShowNoise(!showNoise)}
          className={`p-2 rounded-full transition-all duration-300 ${darkMode ? 'hover:bg-neutral-800 text-neutral-400' : 'hover:bg-stone-100 text-stone-500'}`}
          aria-label="Toggle noise texture"
        >
          {showNoise ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      </motion.div>

      <main className="relative max-w-2xl mx-auto px-6 py-24 md:py-32">

        {/* Header Section */}
        <motion.header 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-32 md:mb-40"
        >
          <motion.div variants={fadeInUp} className={`border-b ${theme.border} pb-8 mb-12`}>
            <h1 className={`font-light text-4xl md:text-6xl tracking-tight ${theme.textHeading} mb-4`}>
              DI BALIK <span className={`italic ${theme.accent}`}>BAR</span>
            </h1>
            <div className="flex items-center gap-4 text-sm">
              <span className={`${theme.textMuted} italic`}>Catatan dari Seorang Barista</span>
              <span className={`w-12 h-px ${darkMode ? 'bg-neutral-700' : 'bg-stone-300'}`} />
              <span className={`${theme.accent} font-medium`}>Wildan Ferdiansyah</span>
            </div>
          </motion.div>
        </motion.header>

        {/* Poem: 11 P.M. dan Kopi Tubruk */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-28 md:mb-36"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8">
            <Clock size={16} className={theme.accent} />
            <span className={`text-xs font-mono tracking-widest uppercase ${theme.textMuted}`}>11 P.M.</span>
          </motion.div>

          <motion.h2 variants={fadeInUp} className={`text-2xl md:text-3xl font-light ${theme.textHeading} mb-10 italic`}>
            dan Kopi Tubruk
          </motion.h2>

          <div className="space-y-1">
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
                className={`text-lg md:text-xl font-light leading-relaxed ${i === 0 ? theme.textHeading : theme.text}`}
              >
                {line}
              </motion.p>
            ))}
          </div>

          <motion.div variants={fadeInUp} className={`my-8 pl-6 border-l-2 ${theme.border}`}>
            <p className={`text-sm ${theme.textMuted} italic mb-4`}>Mesin espresso akhirnya diam.</p>
            <p className={`text-sm ${theme.textMuted} mb-2`}>Bukan diam sepenuhnya.</p>
            <p className={`text-sm ${theme.textMuted} mb-2`}>Masih ada dengung kecil,</p>
            <p className={`text-sm ${theme.textMuted} italic`}>Seperti napas orang tua yang tidur dengan mulut terbuka.</p>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-4 mt-8">
            {[
              "Aku duduk sendiri.",
              "Kursi kayu itu dingin di punggungku.",
              "Bajuku masih lembap oleh keringat yang tidak sempat kering seharian."
            ].map((line, i) => (
              <motion.p key={i} variants={lineReveal} className={`${theme.text} font-light`}>
                {line}
              </motion.p>
            ))}
          </motion.div>

          {/* The Coffee Cup Visual */}
          <motion.div 
            variants={scaleIn}
            className={`my-12 p-8 md:p-12 ${theme.accentBg} rounded-sm border ${theme.border} relative overflow-hidden`}
          >
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-4 right-4 opacity-20"
            >
              <Coffee size={120} />
            </motion.div>
            
            <div className="relative z-10 space-y-3">
              <p className={`${theme.textHeading} text-lg`}>Di depanku</p>
              <p className={`${theme.textHeading} text-2xl md:text-3xl font-light italic`}>Segelas kopi tubruk.</p>
              <p className={`${theme.textMuted} mt-4`}>Bubuk kopi mengendap perlahan.</p>
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
                variants={lineReveal}
                className={`${i === 2 ? `text-lg ${theme.textHeading}` : theme.text} font-light leading-relaxed`}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className={`mt-8 p-6 ${darkMode ? 'bg-neutral-900/30' : 'bg-stone-100'} border ${theme.border}`}>
            <p className={`${theme.textHeading} mb-2`}>Saat kuminum,</p>
            <p className={`${theme.accent} text-xl font-light italic`}>Rasanya pahit.</p>
            <p className={`${theme.textMuted} text-sm mt-3`}>Bukan pahit yang rumit. Pahit yang langsung.</p>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-8 text-center space-y-2">
            <p className={`${theme.text} font-light italic`}>Aku menelan tanpa ekspresi.</p>
            <p className={`${theme.textMuted} text-sm`}>Di jam itu, tidak ada yang perlu dinikmati.</p>
          </motion.div>

          <motion.div variants={fadeInUp} className={`mt-12 py-8 border-t ${theme.border} text-center`}>
            <p className={`${theme.textMuted} text-sm tracking-[0.2em] uppercase mb-4`}>Aku hanya duduk dan menunggu</p>
            <motion.p 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className={`${theme.textHeading} text-xl md:text-2xl font-light italic`}
            >
              Kopi itu habis sendiri.
            </motion.p>
          </motion.div>
        </motion.section>

        {/* Section: Barista Rendahan */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-28 md:mb-36"
        >
          <motion.div variants={fadeInUp} className={`flex items-center gap-4 mb-10 pb-4 border-b ${theme.border}`}>
            <span className={`text-[10px] font-mono tracking-widest uppercase ${theme.textMuted}`}># Barista Rendahan</span>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-6">
            {[
              "Aku belajar sejak awal bagaimana orang melihat barista.",
              "Tidak terang-terangan.",
              "Tidak kejam.",
              "Cukup untuk mengingatkan di mana posisiku."
            ].map((line, i) => (
              <motion.p key={i} variants={lineReveal} className={`${theme.text} font-light leading-relaxed`}>
                {line}
              </motion.p>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className={`my-8 grid grid-cols-2 gap-4`}>
            <div className={`p-4 ${darkMode ? 'bg-neutral-900/20' : 'bg-stone-50'} border ${theme.border}`}>
              <p className={`${theme.textMuted} text-sm`}>Pelanggan berbicara</p>
              <p className={`${theme.textHeading} italic`}>Melewatiku.</p>
            </div>
            <div className={`p-4 ${darkMode ? 'bg-neutral-900/20' : 'bg-stone-50'} border ${theme.border}`}>
              <p className={`${theme.textMuted} text-sm`}>Atasan membetulkan ucapanku</p>
              <p className={`${theme.textHeading} italic`}>Di depan orang lain.</p>
            </div>
          </motion.div>

          <motion.div variants={staggerContainer} className={`space-y-4 my-8 pl-6 border-l-2 ${theme.border}`}>
            {[
              "Aku memakai apron.",
              "Mereka melihat seragam.",
              "Aku berdiri berjam-jam.",
              "Mereka melihat pelayanan."
            ].map((line, i) => (
              <motion.p key={i} variants={lineReveal} className={`${theme.text} font-light`}>
                <span className={theme.textMuted}>{line.split('.')[0]}.</span>
                <span className={theme.textHeading}>{line.split('.')[1]}</span>
              </motion.p>
            ))}
          </motion.div>

          <motion.p variants={fadeInUp} className={`${theme.textHeading} text-lg italic my-8`}>
            Tidak ada yang bertanya apa yang kubawa pulang.
          </motion.p>

          <motion.div variants={fadeInUp} className={`p-6 ${theme.accentBg} border ${theme.border} my-8`}>
            <div className="flex justify-between items-center mb-4">
              <span className={`text-sm ${theme.textMuted}`}>Gaji</span>
              <span className={`${theme.accent} font-mono`}>kecil.</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${theme.textMuted}`}>Jam kerja</span>
              <span className={`${theme.textHeading} font-mono`}>panjang.</span>
            </div>
          </motion.div>

          <motion.p variants={fadeInUp} className={`${theme.text} font-light italic text-center`}>
            Aku menghitung hari dengan shift, bukan tanggal.
          </motion.p>

          <motion.div variants={staggerContainer} className="mt-8 space-y-2 text-center">
            <motion.p variants={lineReveal} className={`${theme.textMuted} text-sm tracking-[0.3em] uppercase`}>Pagi.</motion.p>
            <motion.p variants={lineReveal} className={`${theme.textMuted} text-sm tracking-[0.3em] uppercase`}>Siang.</motion.p>
            <motion.p variants={lineReveal} className={`${theme.textMuted} text-sm tracking-[0.3em] uppercase`}>Tutup.</motion.p>
          </motion.div>

          <motion.div variants={fadeInUp} className={`mt-12 p-8 ${darkMode ? 'bg-neutral-900/30' : 'bg-stone-100'} border ${theme.border} relative`}>
            <motion.div 
              className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-red-500/20"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <p className={`${theme.text} font-light leading-relaxed mb-4`}>
              Malam hari aku mencuci cangkir pelan-pelan.
            </p>
            <p className={`${theme.textMuted} text-sm italic`}>Bukan karena kotor. Karena berhenti terasa berbahaya.</p>
          </motion.div>

          <motion.div variants={fadeInUp} className={`mt-8 pt-8 border-t ${theme.border}`}>
            <p className={`${theme.textMuted} text-sm mb-4`}>Orang bilang kerja membangun harga diri.</p>
            <p className={`${theme.textHeading} text-lg italic`}>Beberapa pekerjaan hanya mengajarkan cara bertahan.</p>
          </motion.div>
        </motion.section>

        {/* Section: Terlihat, Sebentar */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-28 md:mb-36"
        >
          <motion.div variants={fadeInUp} className={`flex items-center gap-4 mb-10 pb-4 border-b ${theme.border}`}>
            <span className={`text-[10px] font-mono tracking-widest uppercase ${theme.textMuted}`}># Terlihat, Sebentar</span>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-4 mb-8">
            {[
              "Ada momen-momen kecil saat aku pikir",
              "Mungkin sesuatu akan berubah."
            ].map((line, i) => (
              <motion.p key={i} variants={lineReveal} className={`${i === 0 ? theme.text : theme.textHeading} font-light text-lg`}>
                {line}
              </motion.p>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className={`grid gap-4 mb-8`}>
            <div className={`p-4 ${darkMode ? 'bg-neutral-800/30' : 'bg-stone-200/50'} border-l-4 ${darkMode ? 'border-amber-700' : 'border-amber-600'}`}>
              <p className={`${theme.text} font-light`}>Pelanggan mengucap terima kasih dan benar-benar bermaksud begitu.</p>
            </div>
            <div className={`p-4 ${darkMode ? 'bg-neutral-800/30' : 'bg-stone-200/50'} border-l-4 ${darkMode ? 'border-amber-700' : 'border-amber-600'}`}>
              <p className={`${theme.text} font-light`}>Atasan mengangguk tanpa mengoreksi.</p>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className={`text-center py-8 ${theme.accentBg} border ${theme.border} my-8`}>
            <motion.p 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`${theme.accent} text-sm tracking-[0.2em] uppercase mb-2`}
            >
              Beberapa detik saja,
            </motion.p>
            <p className={`${theme.textHeading} text-2xl font-light italic`}>Aku terlihat.</p>
          </motion.div>

          <motion.p variants={fadeInUp} className={`${theme.textMuted} text-center text-lg italic mb-8`}>
            Lalu hilang.
          </motion.p>

          <motion.div variants={staggerContainer} className={`space-y-3 ${theme.textMuted}`}>
            {[
              "Cangkir kosong.",
              "Meja dilap.",
              "Pesanan berikutnya datang."
            ].map((line, i) => (
              <motion.p key={i} variants={lineReveal} className="text-sm font-light tracking-wide text-center">
                {line}
              </motion.p>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className={`mt-12 p-8 border ${theme.border} ${darkMode ? 'bg-neutral-900/20' : 'bg-stone-50'}`}>
            <p className={`${theme.text} font-light leading-relaxed mb-4`}>
              Perhatian tidak pernah tinggal lama.
            </p>
            <p className={`${theme.textMuted} text-sm italic mb-6`}>
              Ia datang sebentar, lalu pergi tanpa meninggalkan apa pun yang bisa disimpan.
            </p>
            <div className={`pt-6 border-t ${theme.border}`}>
              <p className={`${theme.textHeading} text-center italic`}>Setelah itu, yang tersisa hanya hitungan.</p>
            </div>
          </motion.div>
        </motion.section>

        {/* Continue with other sections... */}
        {/* I'll add a few more key sections with the same pattern */}

        {/* Section: Rekaman (The Recording) - Highlighted Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-28 md:mb-36"
        >
          <motion.div variants={fadeInUp} className={`flex items-center gap-4 mb-10 pb-4 border-b ${theme.border}`}>
            <span className={`text-[10px] font-mono tracking-widest uppercase ${theme.textMuted}`}># Rekaman</span>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-4 mb-8">
            <motion.p variants={lineReveal} className={`${theme.text} font-light`}>Aku mendengarnya sendirian.</motion.p>
            <motion.p variants={lineReveal} className={`${theme.text} font-light`}>Ia dikirim kepadaku.</motion.p>
            <motion.p variants={lineReveal} className={`${theme.textHeading} text-lg italic`}>Rekaman suara.</motion.p>
          </motion.div>

          <motion.div variants={fadeInUp} className={`p-8 ${darkMode ? 'bg-[#0f0f0f]' : 'bg-white'} border-2 ${darkMode ? 'border-neutral-800' : 'border-stone-300'} shadow-2xl my-8 relative`}>
            <motion.div 
              className={`absolute -left-3 top-1/2 w-1 h-20 ${darkMode ? 'bg-red-900' : 'bg-red-400'}`}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            
            <div className="space-y-3">
              <p className={`${theme.textMuted} text-sm`}>Aku duduk di kamar setelah pulang kerja.</p>
              <p className={`${theme.textMuted} text-sm`}>Masih memakai kaos yang sama sejak pagi.</p>
              <p className={`${theme.textMuted} text-sm italic`}>Kipas berputar pelan. Udara lembap.</p>
              <p className={`${theme.textMuted} text-sm`}>Bau kopi masih tertinggal di tanganku.</p>
            </div>

            <motion.div 
              variants={fadeInUp}
              className={`mt-8 p-6 ${darkMode ? 'bg-neutral-900' : 'bg-stone-100'} rounded border ${theme.border}`}
            >
              <p className={`${theme.textMuted} text-xs uppercase tracking-widest mb-4`}>Suara orang tua itu terdengar tenang.</p>
              <p className={`${theme.textMuted} text-sm italic mb-2`}>Tidak marah. Tidak keras.</p>
              
              <motion.blockquote 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className={`${darkMode ? 'text-red-400' : 'text-red-700'} text-lg md:text-xl font-light italic border-l-4 ${darkMode ? 'border-red-900' : 'border-red-400'} pl-4 my-6`}
              >
                "Biasanya barista di Bali itu gigolo."
              </motion.blockquote>

              <p className={`${theme.textMuted} text-sm italic`}>Kalimat itu diucapkan seperti nasihat. Bukan hinaan.</p>
            </motion.div>

            <motion.div variants={staggerContainer} className="mt-6 space-y-2">
              <motion.p variants={lineReveal} className={`${theme.text} font-light`}>Namaku tidak disebut.</motion.p>
              <motion.p variants={lineReveal} className={`${theme.text} font-light`}>Tapi aku tahu siapa yang sedang dibicarakan.</motion.p>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInUp} className={`p-6 ${theme.border} border-l-4 ${darkMode ? 'border-l-neutral-700' : 'border-l-stone-400'}`}>
            <p className={`${theme.text} font-light italic mb-4`}>Aku mematikan ponsel sebelum rekaman selesai.</p>
            <p className={`${theme.text} font-light`}>Aku berdiri di depan mesin espresso yang belum sempat kubersihkan.</p>
          </motion.div>

          <motion.div variants={staggerContainer} className={`mt-8 space-y-2 ${theme.textMuted} text-sm`}>
            <motion.p variants={lineReveal}>Tanganku ada di sana.</motion.p>
            <motion.p variants={lineReveal}>Kasar.</motion.p>
            <motion.p variants={lineReveal}>Bau sabun murah dan logam panas.</motion.p>
          </motion.div>

          <motion.div variants={fadeInUp} className={`mt-8 p-6 ${darkMode ? 'bg-neutral-900/50' : 'bg-stone-200/50'} border ${theme.border}`}>
            <p className={`${theme.text} font-light leading-relaxed`}>
              Tidak ada yang terlihat mewah dari tubuh yang berdiri delapan jam untuk kopi orang lain.
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} className="mt-8 space-y-4">
            <motion.p variants={lineReveal} className={`${theme.text} font-light`}>Aku menyalakan mesin.</motion.p>
            <motion.p variants={lineReveal} className={`${theme.textMuted} text-sm italic`}>Steamer menjerit sebentar.</motion.p>
            <motion.p variants={lineReveal} className={`${theme.text} font-light`}>Portafilter kubenturkan ke knockbox.</motion.p>
            <motion.p variants={lineReveal} className={`${theme.textMuted} text-sm`}>Suara tumpul. Pendek.</motion.p>
          </motion.div>

          <motion.div variants={fadeInUp} className={`mt-8 py-6 border-t ${theme.border} text-center`}>
            <p className={`${theme.textHeading} text-lg mb-2`}>Tanganku tidak gemetar.</p>
            <motion.p 
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className={`${theme.textMuted} text-sm italic`}
            >
              Dan itu yang paling aneh.
            </motion.p>
          </motion.div>

          <motion.div variants={fadeInUp} className={`mt-6 text-center`}>
            <p className={`${theme.textMuted} text-sm`}>Malam itu aku membuat kopi lagi.</p>
            <p className={`${theme.accent} text-xl italic mt-2`}>Rasanya pahit.</p>
          </motion.div>

          <motion.div variants={fadeInUp} className={`mt-8 pt-6 border-t ${theme.border}`}>
            <p className={`${theme.text} font-light italic text-center`}>
              Setelah itu, aku tidak mencari penghiburan.
            </p>
            <p className={`${theme.textHeading} text-center mt-4 text-lg tracking-widest uppercase`}>
              Aku hanya melanjutkan hari.
            </p>
          </motion.div>
        </motion.section>

        {/* Section: Masih Berdiri (Final Section Before Epilogue) */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-28 md:mb-36"
        >
          <motion.div variants={fadeInUp} className={`flex items-center gap-4 mb-10 pb-4 border-b ${theme.border}`}>
            <span className={`text-[10px] font-mono tracking-widest uppercase ${theme.textMuted}`}># Masih Berdiri</span>
          </motion.div>

          <motion.div variants={fadeInUp} className={`text-center mb-12`}>
            <motion.h3 
              className={`text-3xl md:text-5xl font-light ${theme.textHeading} mb-6`}
              whileInView={{ scale: [0.95, 1] }}
              transition={{ duration: 0.5 }}
            >
              Aku masih di sini.
            </motion.h3>
            <div className={`flex justify-center gap-8 text-sm ${theme.textMuted} mb-8`}>
              <span>Tidak menang.</span>
              <span>Tidak kalah.</span>
            </div>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-4 text-center mb-12">
            {[
              "Aku bangun dan kembali ke tempat yang sama.",
              "Apron yang sama.",
              "Mesin yang sama.",
              "Jam buka yang sama."
            ].map((line, i) => (
              <motion.p key={i} variants={lineReveal} className={`${theme.text} font-light`}>
                {line}
              </motion.p>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className={`py-8 px-6 ${theme.accentBg} border ${theme.border} my-8`}>
            <p className={`${theme.textMuted} text-sm text-center mb-4`}>Tidak ada tepuk tangan saat aku datang.</p>
            <p className={`${theme.textMuted} text-sm text-center`}>Tidak ada yang bertanya kenapa aku belum pergi.</p>
            <div className={`mt-6 pt-6 border-t ${theme.border}`}>
              <p className={`${theme.textHeading} italic text-center`}>Dan anehnya, aku juga tidak lagi menanyakannya pada diriku sendiri.</p>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className={`p-8 ${darkMode ? 'bg-neutral-900/30' : 'bg-stone-100'} border ${theme.border} relative overflow-hidden`}>
            <motion.div 
              className={`absolute top-0 right-0 w-32 h-32 ${darkMode ? 'bg-neutral-800/20' : 'bg-stone-300/20'} rounded-full blur-3xl`}
              animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            
            <div className="relative z-10 text-center space-y-4">
              <p className={`${theme.text} font-light`}>Aku berdiri bukan karena kuat,</p>
              <p className={`${theme.text} font-light`}>Bukan karena yakin.</p>
              <div className={`py-6 border-y ${theme.border} my-6`}>
                <p className={`${theme.textHeading} text-xl md:text-2xl font-light italic`}>
                  Aku berdiri karena tubuhku masih sanggup melakukannya.
                </p>
              </div>
              <p className={`${theme.accent} text-sm tracking-[0.3em] uppercase`}>Dan hari ini, itu cukup.</p>
            </div>
          </motion.div>
        </motion.section>

        {/* Epilog */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="mb-20 md:mb-28 border-t-2 border-neutral-800 pt-16"
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4 mb-12">
            <span className={`w-12 h-px ${theme.border} ${darkMode ? 'bg-neutral-700' : 'bg-stone-300'}`} />
            <span className={`text-[10px] font-mono tracking-widest uppercase ${theme.textMuted}`}>Epilog</span>
            <span className={`w-12 h-px ${theme.border} ${darkMode ? 'bg-neutral-700' : 'bg-stone-300'}`} />
          </motion.div>

          <motion.h2 variants={fadeInUp} className={`text-center font-light text-3xl md:text-4xl ${theme.textHeading} mb-12 italic`}>
            Masih di Sini
          </motion.h2>

          <motion.div variants={staggerContainer} className="max-w-xl mx-auto space-y-6 text-center">
            <motion.p variants={lineReveal} className={`${theme.text} font-light text-lg`}>
              Aku masih membuat kopi.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="space-y-2">
              <p className={`${theme.textMuted} text-sm`}>Beberapa hari rasanya pahit.</p>
              <p className={`${theme.textMuted} text-sm`}>Beberapa hari tidak.</p>
            </motion.div>

            <motion.p variants={lineReveal} className={`${theme.text} font-light italic mt-8`}>
              Aku tidak lagi mencari sempurna.
            </motion.p>

            <motion.div variants={fadeInUp} className={`py-8 ${theme.accentBg} border ${theme.border} my-8`}>
              <p className={`${theme.textHeading} text-xl md:text-2xl font-light`}>
                Aku hanya menyeduh dan menunggu.
              </p>
            </motion.div>

            <motion.p variants={lineReveal} className={`${theme.textMuted} text-sm tracking-[0.2em] uppercase`}>
              Hari-hari datang tanpa janji.
            </motion.p>

            <motion.p variants={lineReveal} className={`${theme.text} font-light italic`}>
              Aku menyambutnya dengan cangkir yang sama.
            </motion.p>

            <motion.div variants={fadeInUp} className={`pt-8 border-t ${theme.border} mt-8`}>
              <p className={`${theme.textHeading} text-lg tracking-widest uppercase mb-4`}>Tidak ada kesimpulan.</p>
              <p className={`${theme.textMuted} text-sm italic mb-6`}>Hanya keberadaan.</p>
              <motion.p 
                className={`${theme.accent} text-2xl md:text-3xl font-light italic`}
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 1.5 }}
              >
                Aku masih di sini.
              </motion.p>
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
            className="flex items-center justify-center gap-3 mb-8"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <span className={`w-16 h-px ${darkMode ? 'bg-neutral-700' : 'bg-stone-300'}`} />
            <Coffee size={16} className={theme.textMuted} />
            <span className={`w-16 h-px ${darkMode ? 'bg-neutral-700' : 'bg-stone-300'}`} />
          </motion.div>
          
          <p className={`${theme.textMuted} text-xs font-mono tracking-widest uppercase`}>
            Di Balik Bar
          </p>
          <p className={`${theme.textMuted} text-[10px] mt-2 font-mono opacity-60`}>
            Wildan Ferdiansyah • 2025
          </p>
        </motion.footer>

      </main>
    </div>
  );
}
