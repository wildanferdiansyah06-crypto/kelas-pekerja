'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { Moon, Sun, Coffee, Settings2, X, Type, Palette, Eye, EyeOff, BookOpen, Clock, Wind, Ghost } from 'lucide-react';

export default function LewatBegituSajaPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [showTexture, setShowTexture] = useState(true);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [showControls, setShowControls] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Mouse tracking untuk efek parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
    bg: 'bg-[#050505]',
    bgGradient: 'from-[#0a0a0a] via-[#0f0f0f] to-[#050505]',
    text: 'text-stone-500',
    textMuted: 'text-stone-700',
    textHeading: 'text-stone-300',
    accent: 'text-amber-900',
    accentSoft: 'text-amber-950',
    accentBg: 'bg-amber-950/10',
    accentBorder: 'border-amber-950/30',
    border: 'border-stone-900',
    borderLight: 'border-stone-800',
    card: 'bg-stone-950/40',
    hover: 'hover:bg-stone-900/30',
    coffee: 'text-amber-950/30',
    progress: 'bg-amber-900',
    glow: 'shadow-amber-900/20'
  } : {
    bg: 'bg-[#fafaf9]',
    bgGradient: 'from-[#f5f5f4] via-[#fafaf9] to-[#f5f5f4]',
    text: 'text-stone-600',
    textMuted: 'text-stone-400',
    textHeading: 'text-stone-800',
    accent: 'text-amber-800',
    accentSoft: 'text-amber-700',
    accentBg: 'bg-amber-100/30',
    accentBorder: 'border-amber-200',
    border: 'border-stone-200',
    borderLight: 'border-stone-300',
    card: 'bg-white/40',
    hover: 'hover:bg-stone-100/50',
    coffee: 'text-amber-800/15',
    progress: 'bg-amber-700',
    glow: 'shadow-amber-700/10'
  };

  const fontSizeClasses = fontSize === 'large' ? {
    body: 'text-lg md:text-xl leading-[2.2]',
    heading: 'text-2xl md:text-3xl',
    title: 'text-4xl md:text-6xl',
    small: 'text-sm',
    poetry: 'text-xl md:text-2xl'
  } : {
    body: 'text-base md:text-lg leading-[2]',
    heading: 'text-xl md:text-2xl',
    title: 'text-3xl md:text-5xl',
    small: 'text-xs',
    poetry: 'text-lg md:text-xl'
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
  };

  const fadeInSlow = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 2, ease: "easeOut" }}
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 }}
  };

  const lineReveal = {
    hidden: { opacity: 0, x: -50, filter: 'blur(10px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
  };

  const breathe = {
    animate: { 
      opacity: [0.4, 0.8, 0.4],
      scale: [1, 1.02, 1],
      transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
    }
  };

  const float = {
    animate: {
      y: [0, -20, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
    }
  };

  const viewportConfig = { once: true, amount: 0.15 };

  const sections = [
    { id: 'luka', title: 'Luka yang Tak Berdarah' },
    { id: 'ruang', title: 'Ruang Hening' },
    { id: 'waktu', title: 'Waktu yang Melupakan' },
    { id: 'suara', title: 'Suara dalam Sunyi' },
    { id: 'jejak', title: 'Jejak yang Pudar' },
    { id: 'akhir', title: 'Akhir yang Tak Pernah Tiba' },
  ];

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-1000 ease-out selection:bg-amber-950/30 selection:text-amber-800 overflow-x-hidden`}
      style={{ cursor: 'none' }}
    >
      {/* Custom Cursor */}
      <motion.div
        className={`fixed w-4 h-4 rounded-full ${theme.accent} pointer-events-none z-[100] mix-blend-difference hidden md:block`}
        animate={{ x: mousePosition.x - 8, y: mousePosition.y - 8 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        className={`fixed w-8 h-8 rounded-full border ${theme.borderLight} pointer-events-none z-[99] hidden md:block`}
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      />

      {/* Atmospheric Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Deep gradient layers */}
        <div className={`absolute inset-0 bg-gradient-to-b ${theme.bgGradient}`} />
        
        {/* Animated fog/mist layers */}
        <motion.div 
          animate={{ opacity: [0.3, 0.6, 0.3], x: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-${darkMode ? 'stone-950' : 'stone-200'}/20 to-transparent`}
        />

        {/* Organic stains - like old coffee rings on forgotten paper */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: showTexture ? 0.15 : 0 }}
          transition={{ duration: 3 }}
          className={`absolute top-[10%] right-[3%] w-[500px] h-[500px] rounded-full border-[1px] ${theme.border}`}
          style={{ 
            boxShadow: `inset 0 0 100px ${darkMode ? 'rgba(69,26,3,0.1)' : 'rgba(120,53,15,0.05)'}`,
            transform: 'rotate(25deg)'
          }}
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: showTexture ? 0.1 : 0 }}
          transition={{ duration: 3, delay: 0.5 }}
          className={`absolute top-[15%] right-[5%] w-[350px] h-[350px] rounded-full border-[0.5px] ${theme.borderLight}`}
        />
        
        {/* Bottom stains - heavy, melancholic */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: showTexture ? 0.12 : 0 }}
          transition={{ duration: 3, delay: 1 }}
          className={`absolute bottom-[5%] left-[2%] w-[600px] h-[600px] rounded-full border-[1px] ${theme.border}`}
          style={{ 
            boxShadow: `inset 0 0 120px ${darkMode ? 'rgba(69,26,3,0.08)' : 'rgba(120,53,15,0.03)'}`,
            transform: 'rotate(-15deg)'
          }}
        />

        {/* Floating debris - like forgotten memories */}
        <motion.div 
          variants={float}
          animate="animate"
          className={`absolute top-[20%] left-[8%] w-2 h-3 ${theme.coffee} rounded-full opacity-10 rotate-45`}
        />
        <motion.div 
          variants={float}
          animate="animate"
          transition={{ delay: 2 }}
          className={`absolute top-[60%] right-[12%] w-1.5 h-2.5 ${theme.coffee} rounded-full opacity-8 rotate-[-30deg]`}
        />
        <motion.div 
          variants={float}
          animate="animate"
          transition={{ delay: 4 }}
          className={`absolute bottom-[30%] left-[15%] w-2.5 h-4 ${theme.coffee} rounded-full opacity-6 rotate-[60deg]`}
        />

        {/* Subtle noise texture */}
        <div 
          className={`absolute inset-0 opacity-[0.03] ${showTexture ? 'block' : 'hidden'}`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />

        {/* Vignette - drawing eyes to center, pushing world away */}
        <div className={`absolute inset-0 ${darkMode ? 'bg-radial-gradient' : ''}`} style={{
          background: darkMode ? 'radial-gradient(circle at center, transparent 0%, rgba(5,5,5,0.4) 100%)' : 'none'
        }} />
      </div>

      {/* Minimal Progress - just a whisper */}
      <div className="fixed top-0 left-0 right-0 h-[1px] z-50">
        <motion.div 
          className={`h-full ${theme.progress} opacity-50`}
          style={{ width: useTransform(smoothProgress, v => `${v * 100}%`) }}
        />
      </div>

      {/* Main Content - Generous breathing room */}
      <main className={`relative z-10 max-w-2xl mx-auto px-8 md:px-16 pt-32 pb-48`}>

        {/* Hero - Slow emergence from void */}
        <motion.section 
          id="luka"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="min-h-[90vh] flex flex-col justify-center mb-48 md:mb-64"
        >
          <motion.div variants={fadeInSlow} className="mb-16">
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.5em] uppercase opacity-60`}>
              Sebuah Pengakuan
            </span>
          </motion.div>

          <motion.h1 
            variants={fadeInUp}
            className={`font-serif ${fontSizeClasses.title} font-light tracking-tight ${theme.textHeading} leading-[1.15] mb-20`}
          >
            Lewat
            <br />
            <span className={`italic ${theme.accentSoft} opacity-80`}>Begitu Saja</span>
          </motion.h1>

          <motion.div variants={staggerContainer} className="space-y-8 max-w-xl">
            <motion.p variants={lineReveal} className={`${fontSizeClasses.poetry} font-light ${theme.text} leading-[2.2]`}>
              Ada luka yang tak berdarah.
            </motion.p>
            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.textMuted} leading-[2] ml-4`}>
              Ia tinggal di sela-sela hari, di ruang-ruang yang tidak pernah kita namai.
            </motion.p>
            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.textMuted} leading-[2] ml-4`}>
              Di sudut mata yang kering, di tenggorokan yang selalu tercekat, di dada yang berdegup terlalu pelan untuk dianggap hidup.
            </motion.p>
          </motion.div>

          <motion.div variants={fadeInUp} className={`mt-20 pl-8 border-l ${theme.borderLight} opacity-80`}>
            <p className={`${fontSizeClasses.body} font-light ${theme.text} leading-[2.2] italic`}>
              "Aku menulis ini bukan untuk dimengerti."
            </p>
            <p className={`${fontSizeClasses.body} font-light ${theme.textMuted} mt-8 leading-[2]`}>
              Tapi karena diam lebih menyakitkan. Karena ada sesuatu di dalam yang harus dikeluarkan, meski tak ada yang menunggu di luar.
            </p>
          </motion.div>

          <motion.div 
            variants={breathe}
            animate="animate"
            className={`mt-24 flex justify-center`}
          >
            <Wind size={24} className={`${theme.textMuted} opacity-30`} strokeWidth={1} />
          </motion.div>
        </motion.section>

        {/* Ruang Hening */}
        <motion.section 
          id="ruang"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mb-48 md:mb-64 scroll-mt-32"
        >
          <motion.div variants={fadeInUp} className={`flex items-center gap-6 mb-16 pb-6 border-b ${theme.border}`}>
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.4em] uppercase opacity-50`}>Bab I</span>
            <h2 className={`font-serif ${fontSizeClasses.heading} ${theme.textHeading} italic`}>Ruang Hening</h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-12">
            <motion.p variants={lineReveal} className={`${fontSizeClasses.poetry} font-light ${theme.text} leading-[2.4]`}>
              Setiap malam, aku duduk di kursi yang sama.
            </motion.p>

            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.textMuted} leading-[2.2]`}>
              Bukan karena nyaman. Tapi karena kursi ini sudah menyerap terlalu banyak sunyi. Sudah menjadi bagian dari keheningan yang kukenakan setiap hari seperti baju kedua.
            </motion.p>

            <motion.div variants={fadeInUp} className="my-16 space-y-6">
              <p className={`${fontSizeClasses.body} font-light ${theme.text} text-center italic opacity-80`}>
                Di seberang jendela, kota terus berdenyut.
              </p>
              <p className={`${fontSizeClasses.body} font-light ${theme.textMuted} text-center`}>
                Lampu-lampu berkedip dalam bahasa yang tidak kupahami.
              </p>
              <p className={`${fontSizeClasses.body} font-light ${theme.textMuted} text-center`}>
                Mobil-mobil lewat, membawa orang-orang dengan tujuan.
              </p>
            </motion.div>

            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.text} leading-[2.2]`}>
              Aku hanya menonton. Bukan sebagai bagian dari dunia, tapi sebagai bayangan yang tertinggal di kaca. Seperti noda air yang tidak pernah benar-benar kering.
            </motion.p>

            <motion.div variants={scaleIn} className={`my-16 p-10 ${theme.card} border ${theme.border} rounded-sm relative overflow-hidden`}>
              <motion.div 
                animate={{ opacity: [0.05, 0.15, 0.05] }}
                transition={{ duration: 10, repeat: Infinity }}
                className={`absolute inset-0 ${theme.accentBg}`}
              />
              <p className={`${fontSizeClasses.poetry} font-light ${theme.textHeading} italic text-center leading-[2.4] relative z-10`}>
                "Kadang aku bertanya pada bayanganku sendiri: apakah kau masih mengenaliku?"
              </p>
              <p className={`${fontSizeClasses.body} font-light ${theme.textMuted} text-center mt-8 relative z-10`}>
                Ia tidak pernah menjawab. Hanya mengikuti setiap gerakanku, sepena yang setia pada mayatnya.
              </p>
            </motion.div>

            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.textMuted} leading-[2.2]`}>
              Ruang ini tidak kosong. Ia penuh dengan yang tak terucap. Penuh dengan percakapan yang hanya terjadi di dalam kepala, dengan pelukan yang tidak pernah diberikan, dengan kata-kata yang terus mengendap di dasar kerongkongan seperti endapan kopi yang terlalu lama dibiarkan.
            </motion.p>
          </motion.div>
        </motion.section>

        {/* Waktu yang Melupakan */}
        <motion.section 
          id="waktu"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mb-48 md:mb-64 scroll-mt-32"
        >
          <motion.div variants={fadeInUp} className={`flex items-center gap-6 mb-16 pb-6 border-b ${theme.border}`}>
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.4em] uppercase opacity-50`}>Bab II</span>
            <h2 className={`font-serif ${fontSizeClasses.heading} ${theme.textHeading} italic`}>Waktu yang Melupakan</h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-12">
            <motion.p variants={lineReveal} className={`${fontSizeClasses.poetry} font-light ${theme.text} leading-[2.4]`}>
              Waktu tidak pernah berjalan lurus.
            </motion.p>
            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.textMuted} leading-[2.2] ml-6`}>
              Ia berkelok, berputar, lalu tersedak di tenggorokan hari-hari yang monoton. Di sini, di ruang ini, jam dinding hanya hiasan. Jarumnya bergerak, tapi waktu tidak pernah benar-benar lewat.
            </motion.p>

            <motion.div variants={fadeInUp} className="my-16 grid grid-cols-1 gap-8">
              {[
                { text: "Pagi datang dengan cahaya yang sama.", sub: "Aku membuka mata, dan lupa apakah ini hari ini atau kemarin." },
                { text: "Siang berlalu tanpa jejak.", sub: "Makan siang di meja yang sama, dengan rasa yang sudah mati sebelum menyentuh lidah." },
                { text: "Malam tiba seperti tamu yang tidak diundang.", sub: "Membawa sunyi yang lebih dalam, lebih berat, lebih mengenaliku daripada siapapun." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  variants={scaleIn}
                  className={`p-8 ${theme.card} border-l-2 ${theme.borderLight} ${theme.hover} transition-all duration-700`}
                >
                  <p className={`${fontSizeClasses.body} font-light ${theme.textHeading} italic mb-4`}>{item.text}</p>
                  <p className={`${fontSizeClasses.body} font-light ${theme.textMuted}`}>{item.sub}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.text} leading-[2.2]`}>
              Aku menulis tanggal di sudut kertas, lalu melupakannya. Apakah penting? Hari ini, kemarin, atau lima tahun lalu—semua terasa sama. Semua adalah ruang yang sama, dengan bau yang sama, dengan kekosongan yang sama.
            </motion.p>

            <motion.blockquote variants={scaleIn} className={`my-16 pl-8 border-l-2 ${theme.accentBorder}`}>
              <p className={`${fontSizeClasses.poetry} font-light ${theme.accentSoft} italic leading-[2.4]`}>
                "Yang paling menakutkan bukanlah kematian, tapi terus hidup sementara dunia perlahan-lahan melupakan bahwa kau pernah ada."
              </p>
            </motion.blockquote>

            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.textMuted} leading-[2.2]`}>
              Kadang aku menemukan foto lama. Diriku yang tersenyum, bersama orang-orang yang kini hanya nama di memori. Aku mencoba mengingat rasanya—bahagia, mungkin? Tapi itu seperti mencicipi air. Tidak ada rasa. Hanya dingin yang lewat di kerongkongan.
            </motion.p>
          </motion.div>
        </motion.section>

        {/* Suara dalam Sunyi */}
        <motion.section 
          id="suara"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mb-48 md:mb-64 scroll-mt-32"
        >
          <motion.div variants={fadeInUp} className={`flex items-center gap-6 mb-16 pb-6 border-b ${theme.border}`}>
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.4em] uppercase opacity-50`}>Bab III</span>
            <h2 className={`font-serif ${fontSizeClasses.heading} ${theme.textHeading} italic`}>Suara dalam Sunyi</h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-12">
            <motion.p variants={lineReveal} className={`${fontSizeClasses.poetry} font-light ${theme.text} leading-[2.4]`}>
              Ada suara yang hanya terdengar ketika semuanya sunyi.
            </motion.p>

            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.textMuted} leading-[2.2]`}>
              Bukan suara dari luar. Bukan deru mesin, bukan langkah kaki di koridor, bukan bisikan tetangga di balik dinding tipis. Ini suara dari dalam—dari tempat yang lebih dalam daripada pikiran, lebih dalam daripada kenangan.
            </motion.p>

            <motion.div variants={fadeInUp} className={`my-16 p-10 ${theme.accentBg} border ${theme.accentBorder} rounded-sm`}>
              <p className={`${fontSizeClasses.body} font-light ${theme.text} italic text-center leading-[2.4]`}>
                "Ia berbisik tentang hal-hal yang kucoba kubur: tentang mimpi yang terlalu kecil untuk dikejar, tentang cinta yang terlalu besar untuk diungkapkan, tentang diriku yang terlalu rapuh untuk diakui."
              </p>
            </motion.div>

            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.text} leading-[2.2]`}>
              Di tengah malam, ketika tidur adalah musuh yang tak bisa dikalahkan, suara itu menjadi nyaring. Ia menceritakan kisah-kisah yang tidak kuminta. Tentang jalan yang tidak kutempuh. Tentang kata-kata yang tertelan. Tentang peluang yang kulihat pergi, satu per satu, seperti debu yang terbawa angin.
            </motion.p>

            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.textMuted} leading-[2.2]`}>
              Aku mencoba membalas. Bicara pada diri sendiri, kadang keras, kadang hanya gerakan bibir yang tak bersuara. Tapi suara itu tidak mendengarkan. Ia hanya terus berbicara, dalam irama yang sama, dalam nada yang sama, seperti jarum piringan hitam yang tersangkut di lekukan yang sama.
            </motion.p>

            <motion.div variants={scaleIn} className="my-16 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className={`inline-block p-8 ${theme.card} border ${theme.border} rounded-full`}
              >
                <Clock size={32} className={`${theme.textMuted} opacity-40`} strokeWidth={1} />
              </motion.div>
              <p className={`${fontSizeClasses.small} ${theme.textMuted} mt-6 uppercase tracking-[0.3em]`}>
                Berputar tanpa arah
              </p>
            </motion.div>

            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.text} leading-[2.2]`}>
              Mungkin inilah sebabnya aku menulis. Bukan untuk didengar oleh dunia, tapi untuk mengalihkan suara itu. Untuk memberinya bentuk, memberinya kata-kata, sehingga ia tidak lagi menguasai ruang-ruang kosong di kepalaku.
            </motion.p>
          </motion.div>
        </motion.section>

        {/* Jejak yang Pudar */}
        <motion.section 
          id="jejak"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mb-48 md:mb-64 scroll-mt-32"
        >
          <motion.div variants={fadeInUp} className={`flex items-center gap-6 mb-16 pb-6 border-b ${theme.border}`}>
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.4em] uppercase opacity-50`}>Bab IV</span>
            <h2 className={`font-serif ${fontSizeClasses.heading} ${theme.textHeading} italic`}>Jejak yang Pudar</h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-12">
            <motion.p variants={lineReveal} className={`${fontSizeClasses.poetry} font-light ${theme.text} leading-[2.4]`}>
              Aku meninggalkan jejak setiap hari.
            </motion.p>
            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.textMuted} leading-[2.2]`}>
              Di sandal yang terus mengikis di ujung. Di piring yang terus menumpuk di wastafel. Di kertas-kertas yang kubuang, yang kutulis, yang kubakar. Tapi jejak-jejak itu tidak bertanya ke mana perginya. Mereka hanya ada, lalu hilang, seperti napas yang tak pernah dihirup dengan sengaja.
            </motion.p>

            <motion.div variants={fadeInUp} className="my-16 space-y-8">
              <p className={`${fontSizeClasses.body} font-light ${theme.text} text-center italic`}>
                "Pernahkah kau merasa menjadi hantu di kehidupanmu sendiri?"
              </p>
              <div className="flex justify-center">
                <Ghost size={48} className={`${theme.textMuted} opacity-20`} strokeWidth={1} />
              </div>
              <p className={`${fontSizeClasses.body} font-light ${theme.textMuted} text-center max-w-lg mx-auto`}>
                Melihat, tapi tidak terlihat. Menyentuh, tapi tidak terasa. Berbicara, tapi hanya angin yang menjawab.
              </p>
            </motion.div>

            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.text} leading-[2.2]`}>
              Aku mencoba mengingat kapan terakhir kali seseorang benar-benar melihatku. Bukan melihat tubuhku, atau namaku, atau peranku. Tapi melihat ke dalam, ke tempat di mana suara-suara itu berasal. Ke tempat di mana aku benar-benar berada.
            </motion.p>

            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.textMuted} leading-[2.2]`}>
              Mungkin tidak pernah. Mungkin itu terlalu banyak diminta. Atau mungkin, aku sendiri sudah lupa bagaimana caranya terbuka. Bagaimana caranya tidak menjadi bayangan. Bagaimana caranya hadir sepenuhnya, tanpa setengah hati menunggu saat aku bisa kembali ke sunyi.
            </motion.p>

            <motion.div variants={scaleIn} className={`my-16 p-10 ${theme.card} border ${theme.border} relative`}>
              <div className={`absolute -top-3 left-8 px-4 ${theme.bg}`}>
                <span className={`${fontSizeClasses.small} ${theme.textMuted} uppercase tracking-[0.3em]`}>Pengakuan</span>
              </div>
              <p className={`${fontSizeClasses.body} font-light ${theme.textHeading} italic leading-[2.4]`}>
                "Aku takut bahwa suatu hari nanti, ketika aku benar-benar pergi, tidak akan ada yang menyadari kekosongan yang kutinggalkan. Karena kekosongan itu sudah ada sejak lama. Aku hanya menempatinya."
              </p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Akhir yang Tak Pernah Tiba */}
        <motion.section 
          id="akhir"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="mb-32 scroll-mt-32"
        >
          <motion.div variants={fadeInUp} className={`flex items-center gap-6 mb-16 pb-6 border-b ${theme.border}`}>
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.4em] uppercase opacity-50`}>Bab V</span>
            <h2 className={`font-serif ${fontSizeClasses.heading} ${theme.textHeading} italic`}>Akhir yang Tak Pernah Tiba</h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-12">
            <motion.p variants={lineReveal} className={`${fontSizeClasses.poetry} font-light ${theme.text} leading-[2.4]`}>
              Setiap kisah seharusnya punya akhir.
            </motion.p>
            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.textMuted} leading-[2.2]`}>
              Tapi yang ini terus berlanjut, hari demi hari, dalam irama yang sama, dalam sunyi yang sama. Tidak ada klimaks. Tidak ada resolusi. Hanya pengulangan yang perlahan-lahan menggerus apa pun yang tersisa dari harapan.
            </motion.p>

            <motion.div variants={fadeInUp} className={`my-16 p-12 ${theme.accentBg} border ${theme.accentBorder} rounded-sm text-center`}>
              <p className={`${fontSizeClasses.poetry} font-light ${theme.accentSoft} italic leading-[2.6] mb-8`}>
                "Jadi aku terus menulis."
              </p>
              <p className={`${fontSizeClasses.body} font-light ${theme.text} leading-[2.2]`}>
                Bukan karena yakin ada yang membaca. Bukan karena berharap ada yang mengerti.
              </p>
              <p className={`${fontSizeClasses.body} font-light ${theme.textMuted} mt-6 leading-[2.2]`}>
                Tapi karena menulis adalah satu-satunya cara aku tahu untuk membuktikan bahwa aku masih ada. Bahwa di balik sunyi ini, di balik bayangan ini, masih ada sesuatu yang berdenyut—terlalu pelan untuk didengar orang lain, tapi cukup keras untuk kurasakan sendiri.
              </p>
            </motion.div>

            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.text} leading-[2.2]`}>
              Mungkin suatu hari, ketika cahaya pagi datang dengan sudut yang berbeda, aku akan menemukan kata yang tepat. Kata yang bisa mengubah semua ini menjadi makna. Tapi sampai saat itu—jika memang akan datang—aku akan terus di sini. Di kursi yang sama. Di ruang yang sama. Menunggu.
            </motion.p>

            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.textMuted} leading-[2.2] text-center italic mt-16`}>
              Bukan dengan harapan.
            </motion.p>
            <motion.p variants={lineReveal} className={`${fontSizeClasses.poetry} font-light ${theme.textHeading} leading-[2.4] text-center`}>
              Tapi dengan kesetiaan yang hanya dimiliki oleh yang sudah terlalu lama berada di tempat yang sama.
            </motion.p>
          </motion.div>
        </motion.section>

        {/* Penutup - Epilog */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="pt-32 border-t border-stone-900"
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-8 mb-20">
            <span className={`w-24 h-px ${theme.border}`} />
            <span className={`${theme.textMuted} ${fontSizeClasses.small} tracking-[0.5em] uppercase opacity-40`}>Epilog</span>
            <span className={`w-24 h-px ${theme.border}`} />
          </motion.div>

          <motion.div variants={staggerContainer} className="max-w-xl mx-auto text-center space-y-10">
            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.textMuted} leading-[2.2]`}>
              Jika kau membaca sampai di sini, mungkin kau juga mengenal sunyi ini.
            </motion.p>

            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.text} leading-[2.2]`}>
              Mungkin di suatu tempat, di waktu yang berbeda, kau juga duduk di kursimu sendiri. Menatap jendela yang sama. Mendengar suara yang sama.
            </motion.p>

            <motion.div variants={scaleIn} className={`py-12 px-8 ${theme.card} border ${theme.border}`}>
              <p className={`${fontSizeClasses.poetry} font-light ${theme.textHeading} italic leading-[2.4]`}>
                "Maka dari itu, selamat datang."
              </p>
              <p className={`${fontSizeClasses.body} font-light ${theme.textMuted} mt-6 leading-[2]`}>
                Bukan sebagai pembaca. Tapi sebagai penghuni sunyi yang lain. Sebagai bayangan yang juga mencoba diingat. Sebagai suara yang juga berusaha didengar.
              </p>
            </motion.div>

            <motion.p variants={lineReveal} className={`${fontSizeClasses.body} font-light ${theme.textMuted} italic leading-[2.2]`}>
              Kita mungkin tidak akan pernah bertemu. Tapi di dalam sunyi ini, kita tidak sendiri.
            </motion.p>

            <motion.div variants={breathe} animate="animate" className="pt-12">
              <Coffee size={20} className={`${theme.accent} mx-auto opacity-40`} strokeWidth={1} />
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Final whisper */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 3 }}
          className="text-center pt-32 pb-16"
        >
          <p className={`${fontSizeClasses.small} ${theme.textMuted} tracking-[0.3em] uppercase opacity-30`}>
            Dari satu yang lewat, untuk yang lain yang juga lewat
          </p>
          <p className={`${fontSizeClasses.small} ${theme.textMuted} mt-4 opacity-20`}>
            — tanpa tahun, tanpa nama, tanpa jejak —
          </p>
        </motion.div>

      </main>

      {/* Controls - Minimal, unobtrusive */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-24 left-6 z-40 ${darkMode ? 'bg-stone-950/90' : 'bg-white/90'} backdrop-blur-xl border ${theme.border} p-5 rounded-sm shadow-2xl`}
          >
            <div className="space-y-4 min-w-[180px]">
              <div className="flex items-center justify-between">
                <span className={`${theme.textMuted} ${fontSizeClasses.small}`}>Tema</span>
                <button onClick={toggleDarkMode} className={`p-2 rounded-sm ${theme.hover}`}>
                  {darkMode ? <Moon size={14} className={theme.accent} /> : <Sun size={14} className={theme.accent} />}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className={`${theme.textMuted} ${fontSizeClasses.small}`}>Teks</span>
                <div className="flex gap-2">
                  <button onClick={() => setFontSize('normal')} className={`px-2 py-1 ${fontSize === 'normal' ? theme.accentBg : ''} ${fontSizeClasses.small}`}>A</button>
                  <button onClick={() => setFontSize('large')} className={`px-2 py-1 ${fontSize === 'large' ? theme.accentBg : ''} ${fontSizeClasses.small}`}>A+</button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={`${theme.textMuted} ${fontSizeClasses.small}`}>Latar</span>
                <button onClick={() => setShowTexture(!showTexture)} className={`p-2 rounded-sm ${theme.hover}`}>
                  {showTexture ? <Eye size={14} className={theme.textMuted} /> : <EyeOff size={14} className={theme.textMuted} />}
                </button>
              </div>
              <div className={`pt-3 border-t ${theme.border}`}>
                <p className={`${theme.textMuted} ${fontSizeClasses.small} mb-2`}>Loncat ke</p>
                <div className="space-y-1">
                  {sections.map((s) => (
                    <a key={s.id} href={`#${s.id}`} onClick={() => setShowControls(false)} className={`block ${fontSizeClasses.small} ${theme.textMuted} ${theme.hover} py-1`}>
                      {s.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowControls(!showControls)}
        className={`fixed bottom-6 left-6 z-50 p-3 ${darkMode ? 'bg-stone-900/80' : 'bg-white/80'} backdrop-blur-md border ${theme.border} rounded-full shadow-lg ${theme.textMuted} hover:${theme.text} transition-colors`}
      >
        {showControls ? <X size={16} /> : <Settings2 size={16} />}
      </motion.button>

    </div>
  );
}
