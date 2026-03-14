'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, BookOpen, Coffee, ChevronRight, X, BookMarked, Compass } from 'lucide-react';

export default function CoffeeBookPage() {
  // Dark mode state - akan disinkronkan dengan navbar global
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState(1);
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Toggle dark mode - bisa dihubungkan dengan context/global state
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Handle scroll and responsive detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(progress);
      setShowFloatingMenu(scrollTop > 300);
      
      // Update active chapter based on scroll position
      const chapters = document.querySelectorAll('[data-chapter]');
      chapters.forEach((chapter) => {
        const rect = chapter.getBoundingClientRect();
        // Adjusted for global navbar height (assume 80px)
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveChapter(Number(chapter.getAttribute('data-chapter')));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Theme classes - compatible with global dark mode
  const theme = darkMode ? {
    bg: 'bg-[#0a0a0a]',
    text: 'text-neutral-300',
    textMuted: 'text-neutral-500',
    textHeading: 'text-neutral-100',
    textSubheading: 'text-neutral-400',
    border: 'border-neutral-800',
    accent: 'text-amber-500',
    accentBg: 'bg-amber-950/30',
    accentBorder: 'border-amber-800/50',
    sidebar: 'bg-[#0f0f0f]',
    code: 'bg-neutral-900',
    highlight: 'bg-amber-950/20',
    card: 'bg-neutral-900/40',
    float: 'bg-neutral-900/90'
  } : {
    bg: 'bg-[#fafaf9]',
    text: 'text-stone-700',
    textMuted: 'text-stone-500',
    textHeading: 'text-stone-900',
    textSubheading: 'text-stone-600',
    border: 'border-stone-200',
    accent: 'text-amber-700',
    accentBg: 'bg-amber-100/60',
    accentBorder: 'border-amber-300',
    sidebar: 'bg-white',
    code: 'bg-stone-100',
    highlight: 'bg-amber-50/80',
    card: 'bg-white',
    float: 'bg-white/90'
  };

  const chapters = [
    { num: 1, title: "Coffee Species", subtitle: "Genus Coffea dan Posisi Botani" },
    { num: 2, title: "Coffee Processing", subtitle: "Anatomi Buah dan Fermentasi" },
    { num: 3, title: "Roast Level & Flavor", subtitle: "Maillard Reaction & Development" },
    { num: 4, title: "Grind Size & Extraction", subtitle: "Teori Ekstraksi dan Partikel" },
    { num: 5, title: "Espresso Fundamentals", subtitle: "Tekanan 9 Bar dan Suhu" },
    { num: 6, title: "Taste & Sensory Science", subtitle: "Sistem Sensorik Manusia" },
    { num: 7, title: "Manual Brew Methods", subtitle: "Immersion vs Percolation" },
    { num: 8, title: "Espresso Troubleshooting", subtitle: "Diagnosa dan Koreksi" },
    { num: 9, title: "Water Chemistry", subtitle: "Mineral dan Ekstraksi" },
    { num: 10, title: "Extraction Yield", subtitle: "EY dan TDS Control" },
    { num: 11, title: "Arabica Varieties", subtitle: "Genetika dan Keturunan" },
    { num: 12, title: "Terroir & Altitude", subtitle: "Lingkungan dan Metabolisme" },
    { num: 13, title: "Freshness & Storage", subtitle: "Degassing dan Oksidasi" },
    { num: 14, title: "Milk Science", subtitle: "Protein dan Microfoam" },
    { num: 15, title: "Cafe Workflow", subtitle: "Speed dan Consistency" },
    { num: 16, title: "Grinder Technology", subtitle: "Burr Geometry dan RPM" },
    { num: 17, title: "Espresso Machine", subtitle: "Boiler dan Pressure Profiling" },
    { num: 18, title: "Cupping & QC", subtitle: "Defect Detection" },
    { num: 19, title: "Coffee Economics", subtitle: "Pricing dan Ethics" },
    { num: 20, title: "Professional Mindset", subtitle: "Manifesto Barista" },
  ];

  const fadeIn = {
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
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-500`}>
      
      {/* Reading Progress Bar - Top (below global navbar) */}
      <div className={`fixed top-0 left-0 right-0 h-1 z-40 ${darkMode ? 'bg-neutral-800' : 'bg-stone-200'}`}>
        <motion.div 
          className={`h-full ${theme.accent.replace('text-', 'bg-')}`}
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Floating Bottom Left Navigation */}
      <AnimatePresence>
        {showFloatingMenu && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className={`fixed bottom-6 left-6 z-40 flex flex-col gap-3`}
          >
            {/* Main Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSidebarOpen(true)}
              className={`flex items-center gap-3 px-5 py-3 rounded-2xl ${theme.float} backdrop-blur-xl border ${theme.border} shadow-2xl ${theme.accent} font-medium`}
            >
              <BookMarked size={20} />
              <span className="hidden sm:inline">Daftar Isi</span>
              <span className="sm:hidden">Menu</span>
              <div className={`flex items-center gap-2 ml-2 pl-2 border-l ${theme.border}`}>
                <span className={`text-xs font-mono ${theme.textMuted}`}>
                  {String(activeChapter).padStart(2, '0')}/20
                </span>
              </div>
            </motion.button>

            {/* Secondary Actions */}
            <div className={`flex items-center gap-2 p-2 rounded-2xl ${theme.float} backdrop-blur-xl border ${theme.border} shadow-2xl w-fit`}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleDarkMode}
                className={`p-3 rounded-xl ${darkMode ? 'hover:bg-neutral-800' : 'hover:bg-stone-200'} transition-colors`}
              >
                {darkMode ? <Sun size={20} className={theme.accent} /> : <Moon size={20} className={theme.accent} />}
              </motion.button>

              <div className={`w-px h-6 ${darkMode ? 'bg-neutral-700' : 'bg-stone-300'}`} />

              <motion.a
                href="#bab-1"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-xl ${darkMode ? 'hover:bg-neutral-800' : 'hover:bg-stone-200'} transition-colors`}
              >
                <Compass size={20} className={theme.textMuted} />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Navigation - Full Screen Overlay Style */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`fixed left-0 top-0 bottom-0 w-full sm:w-[480px] ${theme.sidebar} z-50 overflow-y-auto shadow-2xl`}
            >
              {/* Added padding top for global navbar */}
              <div className="pt-20 sm:pt-24 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${theme.accentBg} border ${theme.accentBorder}`}>
                      <Coffee size={24} className={theme.accent} />
                    </div>
                    <div>
                      <h2 className={`font-bold text-lg ${theme.textHeading}`}>Daftar Isi</h2>
                      <p className={`text-sm ${theme.textMuted}`}>20 Bab Lengkap</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSidebarOpen(false)}
                    className={`p-3 rounded-xl ${darkMode ? 'hover:bg-neutral-800' : 'hover:bg-stone-100'} transition-colors`}
                  >
                    <X size={24} className={theme.textMuted} />
                  </button>
                </div>

                <nav className="space-y-2 pb-20">
                  {chapters.map((chapter, idx) => (
                    <motion.a
                      key={chapter.num}
                      href={`#bab-${chapter.num}`}
                      onClick={() => setSidebarOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`group flex items-center gap-4 p-4 rounded-xl text-sm transition-all duration-300 ${
                        activeChapter === chapter.num 
                          ? `${theme.accentBg} ${theme.accent} font-semibold border ${theme.accentBorder}` 
                          : `${darkMode ? 'hover:bg-neutral-800/50' : 'hover:bg-stone-100'} ${theme.textMuted} hover:text-current`
                      }`}
                    >
                      <span className={`text-lg font-mono font-bold ${activeChapter === chapter.num ? theme.accent : theme.textMuted}`}>
                        {String(chapter.num).padStart(2, '0')}
                      </span>
                      <div className="flex-1">
                        <p className={`font-medium text-base ${activeChapter === chapter.num ? theme.textHeading : theme.text}`}>
                          {chapter.title}
                        </p>
                        <p className={`text-xs mt-1 ${theme.textMuted}`}>{chapter.subtitle}</p>
                      </div>
                      {activeChapter === chapter.num && (
                        <motion.div layoutId="activeIndicator">
                          <ChevronRight size={20} />
                        </motion.div>
                      )}
                    </motion.a>
                  ))}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content - FULL WIDTH with top padding for global navbar */}
      <main className="min-h-screen pb-20 pt-20 sm:pt-24">
        {/* Hero Section - Full Bleed */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className={`relative min-h-[calc(100vh-5rem)] flex items-center justify-center px-6 sm:px-8 lg:px-12 ${theme.highlight} border-b ${theme.border}`}
        >
          <div className="max-w-7xl mx-auto w-full py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${theme.accentBg} border ${theme.accentBorder} mb-8 shadow-xl`}
                >
                  <Coffee size={40} className={theme.accent} />
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold ${theme.textHeading} mb-6 tracking-tight leading-[0.9]`}
                >
                  Coffee from<br />
                  <span className={theme.accent}>Bean to Cup</span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className={`text-2xl sm:text-3xl ${theme.textSubheading} italic mb-8 font-light`}
                >
                  A Serious Guide
                </motion.p>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className={`text-lg ${theme.textMuted} mb-8`}
                >
                  oleh <span className={`font-semibold ${theme.textHeading}`}>Wildan Ferdiansyah</span>
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className={`p-6 sm:p-8 rounded-2xl ${theme.card} border ${theme.border} shadow-lg max-w-2xl`}
                >
                  <p className={`text-lg leading-relaxed ${theme.text}`}>
                    Buku ini adalah panduan komprehensif tentang sains kopi, mulai dari biologi tanaman hingga teknik ekstraksi. 
                    Ditujukan untuk barista, roaster, dan pecinta kopi yang ingin memahami logika di balik setiap cangkir.
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-12 flex items-center gap-4"
                >
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full ${theme.accentBg} ${theme.accent} font-semibold border ${theme.accentBorder} hover:shadow-lg transition-all`}
                  >
                    <BookOpen size={20} />
                    Mulai Membaca
                  </button>
                  <span className={`text-sm ${theme.textMuted}`}>atau scroll ke bawah</span>
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="hidden lg:block relative"
              >
                <div className={`aspect-square rounded-3xl ${theme.card} border ${theme.border} p-8 shadow-2xl relative overflow-hidden`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${darkMode ? 'from-amber-500/10 to-transparent' : 'from-amber-200/50 to-transparent'}`} />
                  <div className="relative z-10 grid grid-cols-2 gap-4 h-full">
                    <div className={`rounded-2xl ${theme.code} p-6 flex flex-col justify-center`}>
                      <p className={`text-4xl font-bold ${theme.accent} mb-2`}>120+</p>
                      <p className={`text-sm ${theme.textMuted}`}>Spesies Coffea</p>
                    </div>
                    <div className={`rounded-2xl ${theme.code} p-6 flex flex-col justify-center`}>
                      <p className={`text-4xl font-bold ${theme.accent} mb-2`}>9 Bar</p>
                      <p className={`text-sm ${theme.textMuted}`}>Tekanan Espresso</p>
                    </div>
                    <div className={`rounded-2xl ${theme.code} p-6 flex flex-col justify-center`}>
                      <p className={`text-4xl font-bold ${theme.accent} mb-2`}>18-22%</p>
                      <p className={`text-sm ${theme.textMuted}`}>Extraction Yield</p>
                    </div>
                    <div className={`rounded-2xl ${theme.code} p-6 flex flex-col justify-center`}>
                      <p className={`text-4xl font-bold ${theme.accent} mb-2`}>93°C</p>
                      <p className={`text-sm ${theme.textMuted}`}>Suhu Ideal</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`absolute bottom-8 left-1/2 -translate-x-1/2 ${theme.textMuted}`}
          >
            <div className={`w-6 h-10 rounded-full border-2 ${theme.border} flex justify-center pt-2`}>
              <div className={`w-1 h-2 rounded-full ${theme.accent.replace('text-', 'bg-')}`} />
            </div>
          </motion.div>
        </motion.section>

        {/* Content Container - Full Width dengan padding */}
        <div className="px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-7xl mx-auto py-20">
            
            {/* Ringkasan Materi */}
            <motion.section 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="mb-32"
            >
              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${theme.textHeading} mb-12 pb-6 border-b-2 ${theme.border}`}>
                Ringkasan Materi Utama
              </h2>
              
              <div className="grid lg:grid-cols-3 gap-8">
                <motion.div variants={fadeIn} className={`p-8 rounded-2xl ${theme.card} border ${theme.border} shadow-lg hover:shadow-xl transition-all duration-300 group`}>
                  <div className={`w-14 h-14 rounded-xl ${theme.accentBg} ${theme.accent} flex items-center justify-center text-2xl font-bold mb-6 group-hover:scale-110 transition-transform`}>
                    1
                  </div>
                  <h3 className={`font-bold text-xl ${theme.accent} mb-5`}>Fondasi Biologis</h3>
                  <ul className={`space-y-4 text-base ${theme.text}`}>
                    <li className="flex items-start gap-3">
                      <ChevronRight size={20} className={`mt-1 ${theme.accent} flex-shrink-0`} />
                      <span>Spesies utama: <strong className={theme.textHeading}>Arabica</strong> (manis, kompleks) dan <strong className={theme.textHeading}>Robusta</strong> (pahit, body tebal)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight size={20} className={`mt-1 ${theme.accent} flex-shrink-0`} />
                      <span>Altitude tinggi → metabolisme lambat → akumulasi gula tinggi → rasa kompleks</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight size={20} className={`mt-1 ${theme.accent} flex-shrink-0`} />
                      <span>Varietas penting: Typica, Bourbon, Geisha</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div variants={fadeIn} className={`p-8 rounded-2xl ${theme.card} border ${theme.border} shadow-lg hover:shadow-xl transition-all duration-300 group`}>
                  <div className={`w-14 h-14 rounded-xl ${theme.accentBg} ${theme.accent} flex items-center justify-center text-2xl font-bold mb-6 group-hover:scale-110 transition-transform`}>
                    2
                  </div>
                  <h3 className={`font-bold text-xl ${theme.accent} mb-5`}>Pasca-Panen & Roasting</h3>
                  <ul className={`space-y-4 text-base ${theme.text}`}>
                    <li className="flex items-start gap-3">
                      <ChevronRight size={20} className={`mt-1 ${theme.accent} flex-shrink-0`} />
                      <span><strong className={theme.textHeading}>Washed:</strong> clean, acidity cerah</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight size={20} className={`mt-1 ${theme.accent} flex-shrink-0`} />
                      <span><strong className={theme.textHeading}>Natural:</strong> fruity, body tebal</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight size={20} className={`mt-1 ${theme.accent} flex-shrink-0`} />
                      <span><strong className={theme.textHeading}>Honey:</strong> sweet, balance</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight size={20} className={`mt-1 ${theme.accent} flex-shrink-0`} />
                      <span>Maillard reaction → cokelat/kacang; karamelisasi → manis</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div variants={fadeIn} className={`p-8 rounded-2xl ${theme.card} border ${theme.border} shadow-lg hover:shadow-xl transition-all duration-300 group`}>
                  <div className={`w-14 h-14 rounded-xl ${theme.accentBg} ${theme.accent} flex items-center justify-center text-2xl font-bold mb-6 group-hover:scale-110 transition-transform`}>
                    3
                  </div>
                  <h3 className={`font-bold text-xl ${theme.accent} mb-5`}>Sains Ekstraksi & Air</h3>
                  <ul className={`space-y-4 text-base ${theme.text}`}>
                    <li className="flex items-start gap-3">
                      <ChevronRight size={20} className={`mt-1 ${theme.accent} flex-shrink-0`} />
                      <span>Extraction Yield ideal: <strong className={theme.textHeading}>18–22%</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight size={20} className={`mt-1 ${theme.accent} flex-shrink-0`} />
                      <span>TDS mengukur kekuatan seduhan</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight size={20} className={`mt-1 ${theme.accent} flex-shrink-0`} />
                      <span>Air ideal: 75–150 ppm; magnesium bantu ekstraksi; bicarbonate buffer acidity</span>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </motion.section>

            {/* Bab 1 */}
            <motion.section 
              id="bab-1"
              data-chapter={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }}
              variants={fadeIn}
              className="mb-32 scroll-mt-28"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-6 mb-12 pb-6 border-b-2 ${theme.border}`}>
                <span className={`text-8xl sm:text-9xl font-black ${theme.accent} opacity-20 leading-none`}>01</span>
                <div className="flex-1">
                  <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${theme.textHeading} mb-3`}>Coffee Species</h2>
                  <p className={`text-xl ${theme.textMuted}`}>Genus Coffea dan Posisi Botani Kopi</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className={`p-8 lg:p-12 rounded-3xl ${theme.highlight} border ${theme.border} shadow-lg`}>
                  <h3 className={`font-bold text-2xl lg:text-3xl ${theme.textHeading} mb-6`}>1.1 Genus Coffea</h3>
                  <p className={`${theme.text} text-lg lg:text-xl leading-relaxed mb-6`}>
                    Tanaman kopi berasal dari genus <em className={theme.accent}>Coffea</em>, sebuah genus tumbuhan berbunga dalam famili Rubiaceae. 
                    Hingga saat ini, lebih dari <strong className={theme.textHeading}>120 spesies Coffea</strong> telah diidentifikasi oleh para botanis.
                  </p>
                  <p className={`${theme.text} text-lg lg:text-xl leading-relaxed`}>
                    Spesies-spesies ini tumbuh liar di Afrika, Madagaskar, dan sebagian Asia tropis. Namun, 
                    seluruh industri kopi modern secara praktis hanya bergantung pada <strong className={theme.textHeading}>dua spesies utama</strong>: 
                    <span className={`${theme.accent} font-semibold`}> Coffea arabica</span> dan 
                    <span className={`${theme.accent} font-semibold`}> Coffea canephora (Robusta)</span>.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className={`p-8 rounded-2xl ${theme.card} border ${theme.border} shadow-lg hover:shadow-xl transition-all duration-300`}>
                    <h4 className={`font-bold text-xl ${theme.accent} mb-6 flex items-center gap-2`}>
                      🌿 Arabica
                    </h4>
                    <ul className={`space-y-4 text-base ${theme.text}`}>
                      <li className="flex justify-between border-b border-dashed border-current/20 pb-3">
                        <span className={theme.textMuted}>Ketinggian</span>
                        <span className="font-semibold">900–2,000 mdpl</span>
                      </li>
                      <li className="flex justify-between border-b border-dashed border-current/20 pb-3">
                        <span className={theme.textMuted}>Suhu</span>
                        <span className="font-semibold">15–24°C</span>
                      </li>
                      <li className="flex justify-between border-b border-dashed border-current/20 pb-3">
                        <span className={theme.textMuted}>Metabolisme</span>
                        <span className="font-semibold">Lambat</span>
                      </li>
                      <li className="flex justify-between border-b border-dashed border-current/20 pb-3">
                        <span className={theme.textMuted}>Kafein</span>
                        <span className="font-semibold">1.2–1.5%</span>
                      </li>
                      <li className="pt-2">
                        <span className={theme.textMuted}>Karakter:</span>
                        <span className="font-semibold ml-2">Manis, kompleks, acidity cerah</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className={`p-8 rounded-2xl ${theme.card} border ${theme.border} shadow-lg hover:shadow-xl transition-all duration-300`}>
                    <h4 className={`font-bold text-xl ${theme.accent} mb-6 flex items-center gap-2`}>
                      ☕ Robusta
                    </h4>
                    <ul className={`space-y-4 text-base ${theme.text}`}>
                      <li className="flex justify-between border-b border-dashed border-current/20 pb-3">
                        <span className={theme.textMuted}>Ketinggian</span>
                        <span className="font-semibold">200–800 mdpl</span>
                      </li>
                      <li className="flex justify-between border-b border-dashed border-current/20 pb-3">
                        <span className={theme.textMuted}>Suhu</span>
                        <span className="font-semibold">24–30°C</span>
                      </li>
                      <li className="flex justify-between border-b border-dashed border-current/20 pb-3">
                        <span className={theme.textMuted}>Metabolisme</span>
                        <span className="font-semibold">Cepat</span>
                      </li>
                      <li className="flex justify-between border-b border-dashed border-current/20 pb-3">
                        <span className={theme.textMuted}>Kafein</span>
                        <span className="font-semibold">2.2–2.7%</span>
                      </li>
                      <li className="pt-2">
                        <span className={theme.textMuted}>Karakter:</span>
                        <span className="font-semibold ml-2">Pahit, body tebal, earthy</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className={`p-8 rounded-2xl ${theme.code} border ${theme.border}`}>
                  <h4 className={`font-bold text-xl ${theme.textHeading} mb-5`}>1.3 Kimia Rasa Arabica</h4>
                  <p className={`${theme.text} text-lg leading-relaxed mb-6`}>
                    Saat proses roasting, <strong className={theme.textHeading}>sukrosa</strong> terurai melalui reaksi karamelisasi dan Maillard. 
                    Reaksi ini menghasilkan ratusan senyawa volatil yang bertanggung jawab atas aroma:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {['caramel', 'honey', 'toffee', 'cokelat', 'fruity', 'floral'].map((aroma) => (
                      <span key={aroma} className={`px-5 py-2.5 rounded-full text-base font-medium ${theme.accentBg} ${theme.accent} border ${theme.accentBorder} shadow-sm`}>
                        {aroma}
                      </span>
                    ))}
                  </div>
                </div>

                <blockquote className={`pl-8 border-l-4 ${theme.accentBorder} italic ${theme.textSubheading} text-xl lg:text-2xl leading-relaxed`}>
                  "Arabica tidak otomatis enak dan Robusta tidak otomatis buruk. 
                  Kualitas akhir ditentukan oleh keseluruhan rantai produksi."
                </blockquote>
              </div>
            </motion.section>

            {/* Bab 2 */}
            <motion.section 
              id="bab-2"
              data-chapter={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }}
              variants={fadeIn}
              className="mb-32 scroll-mt-28"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-6 mb-12 pb-6 border-b-2 ${theme.border}`}>
                <span className={`text-8xl sm:text-9xl font-black ${theme.accent} opacity-20 leading-none`}>02</span>
                <div className="flex-1">
                  <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${theme.textHeading} mb-3`}>Coffee Processing</h2>
                  <p className={`text-xl ${theme.textMuted}`}>Anatomi Buah dan Fermentasi</p>
                </div>
              </div>

              <div className="space-y-8">
                <p className={`${theme.text} leading-relaxed text-xl lg:text-2xl`}>
                  <strong className={`text-2xl lg:text-3xl ${theme.textHeading}`}>2.1 Anatomi Buah Kopi</strong> — Buah kopi secara botani disebut <em className={theme.accent}>coffee cherry</em>. 
                  Ia terdiri dari beberapa lapisan utama: kulit luar (exocarp), daging buah (mesocarp), 
                  lapisan lendir lengket yang kaya gula (mucilage), kulit tanduk (parchment), dan biji kopi itu sendiri.
                </p>

                <div className="grid gap-4">
                  {[
                    { name: 'Washed / Fully Washed', desc: 'Clean, acidity cerah, clarity tinggi', color: 'bg-blue-500' },
                    { name: 'Honey Process', desc: 'Sweet, balance, body medium', color: 'bg-amber-500' },
                    { name: 'Natural Process', desc: 'Fruity, winey, body tebal', color: 'bg-red-500' },
                    { name: 'Anaerobic', desc: 'Kompleksitas ekstrem, rasa unik', color: 'bg-purple-500' }
                  ].map((process, idx) => (
                    <motion.div 
                      key={process.name} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className={`p-6 rounded-2xl ${theme.card} border ${theme.border} shadow-md flex items-center justify-between group hover:shadow-lg transition-all duration-300`}
                    >
                      <div>
                        <h4 className={`font-bold text-xl ${theme.textHeading} group-hover:${theme.accent} transition-colors`}>{process.name}</h4>
                        <p className={`text-base ${theme.textMuted} mt-1`}>{process.desc}</p>
                      </div>
                      <div className={`w-4 h-16 rounded-full ${process.color} shadow-lg`} />
                    </motion.div>
                  ))}
                </div>

                <div className={`p-8 lg:p-12 rounded-3xl ${theme.highlight} border ${theme.border} shadow-lg`}>
                  <h3 className={`font-bold text-2xl lg:text-3xl ${theme.textHeading} mb-6`}>2.2 Apa Itu Fermentasi?</h3>
                  <p className={`${theme.text} text-lg lg:text-xl leading-relaxed`}>
                    Fermentasi dalam kopi adalah proses metabolisme mikroorganisme—terutama ragi dan bakteri asam laktat—
                    yang memakan gula dalam mucilage dan menghasilkan asam organik, alkohol, dan senyawa aroma. 
                    Proses ini bukan sekadar 'membusukkan' kopi, tetapi <strong className={theme.textHeading}>mengontrol pembentukan senyawa rasa</strong>.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Bab 3 */}
            <motion.section 
              id="bab-3"
              data-chapter={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }}
              variants={fadeIn}
              className="mb-32 scroll-mt-28"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-6 mb-12 pb-6 border-b-2 ${theme.border}`}>
                <span className={`text-8xl sm:text-9xl font-black ${theme.accent} opacity-20 leading-none`}>03</span>
                <div className="flex-1">
                  <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${theme.textHeading} mb-3`}>Roast Level & Flavor</h2>
                  <p className={`text-xl ${theme.textMuted}`}>Maillard Reaction & Development</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className={`p-8 lg:p-12 rounded-3xl ${darkMode ? 'bg-neutral-900/60' : 'bg-stone-100'} border ${theme.border} shadow-lg`}>
                  <h3 className={`font-bold text-2xl lg:text-3xl ${theme.textHeading} mb-10 text-center`}>Spektrum Roast Level</h3>
                  <div className="space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="w-24 text-right">
                        <span className="text-sm font-bold text-green-600 block">LIGHT</span>
                        <span className="text-xs text-green-600/70">Cinnamon</span>
                      </div>
                      <div className="flex-1 h-16 rounded-2xl bg-gradient-to-r from-green-300 via-yellow-400 via-orange-500 to-amber-900 relative shadow-inner overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-around text-sm font-bold text-black/60 px-4">
                          <span className="bg-white/30 px-3 py-1 rounded-full backdrop-blur-sm">Acidity</span>
                          <span className="bg-white/30 px-3 py-1 rounded-full backdrop-blur-sm">Origin</span>
                          <span className="bg-black/30 text-white/90 px-3 py-1 rounded-full backdrop-blur-sm">Bitter</span>
                        </div>
                      </div>
                      <div className="w-24">
                        <span className="text-sm font-bold text-amber-900 block">DARK</span>
                        <span className="text-xs text-amber-900/70">French</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between px-32 text-xs font-mono text-neutral-500">
                      <span>196°C</span>
                      <span>210°C</span>
                      <span>225°C</span>
                      <span>240°C</span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className={`p-8 rounded-2xl ${theme.card} border ${theme.border} shadow-lg hover:shadow-xl transition-shadow`}>
                    <h4 className={`font-bold text-xl ${theme.accent} mb-4`}>Maillard Reaction (140–165°C)</h4>
                    <p className={`text-lg ${theme.text} leading-relaxed`}>
                      Reaksi antara asam amino dan gula pereduksi menghasilkan ratusan senyawa aroma: 
                      cokelat, kacang, roti panggang, karamel.
                    </p>
                  </div>
                  <div className={`p-8 rounded-2xl ${theme.card} border ${theme.border} shadow-lg hover:shadow-xl transition-shadow`}>
                    <h4 className={`font-bold text-xl ${theme.accent} mb-4`}>Karamelisasi (&gt;160°C)</h4>
                    <p className={`text-lg ${theme.text} leading-relaxed`}>
                      Gula terurai pada suhu tinggi menghasilkan rasa manis, caramel, toffee, dan burnt sugar.
                    </p>
                  </div>
                </div>

                <div className={`p-8 rounded-2xl ${theme.code} border ${theme.border}`}>
                  <h4 className={`font-bold text-xl ${theme.textHeading} mb-6`}>First Crack vs Second Crack</h4>
                  <div className="space-y-4 text-base">
                    <div className={`flex items-start gap-4 p-5 rounded-xl ${darkMode ? 'bg-neutral-800' : 'bg-white'} shadow-sm`}>
                      <span className={`font-mono font-bold text-lg ${theme.accent} min-w-[100px]`}>1st CRACK</span>
                      <span className={`${theme.text} text-lg leading-relaxed`}>Tekanan uap dan gas menyebabkan struktur sel pecah. Transisi endothermic → exothermic. Titik kritis untuk light roast.</span>
                    </div>
                    <div className={`flex items-start gap-4 p-5 rounded-xl ${darkMode ? 'bg-neutral-800' : 'bg-white'} shadow-sm`}>
                      <span className={`font-mono font-bold text-lg ${theme.accent} min-w-[100px]`}>2nd CRACK</span>
                      <span className={`${theme.text} text-lg leading-relaxed`}>Degradasi struktur sel, pelepasan minyak ke permukaan. Rasa pahit dan smoky mulai dominan. Batas untuk dark roast.</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Bab 4 */}
            <motion.section 
              id="bab-4"
              data-chapter={4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }}
              variants={fadeIn}
              className="mb-32 scroll-mt-28"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-6 mb-12 pb-6 border-b-2 ${theme.border}`}>
                <span className={`text-8xl sm:text-9xl font-black ${theme.accent} opacity-20 leading-none`}>04</span>
                <div className="flex-1">
                  <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${theme.textHeading} mb-3`}>Grind Size & Extraction</h2>
                  <p className={`text-xl ${theme.textMuted}`}>Teori Ekstraksi dan Partikel</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className={`p-8 lg:p-12 rounded-3xl ${theme.highlight} border ${theme.border} shadow-lg`}>
                  <h3 className={`font-bold text-2xl lg:text-3xl ${theme.textHeading} mb-6`}>4.1 Apa Itu Ekstraksi?</h3>
                  <p className={`${theme.text} text-xl lg:text-2xl leading-relaxed`}>
                    Ekstraksi kopi adalah proses pelarutan senyawa kimia dari partikel kopi ke dalam air panas. 
                    Air bertindak sebagai pelarut yang mengambil asam organik, gula terlarut, lipid, dan senyawa pahit 
                    dari jaringan sel kopi. Tujuan ekstraksi bukan mengambil semua senyawa, tetapi mengambilnya dalam 
                    <strong className={theme.textHeading}> proporsi yang seimbang</strong>.
                  </p>
                </div>

                <div className={`p-8 rounded-2xl ${theme.card} border ${theme.border} shadow-lg`}>
                  <h4 className={`font-bold text-xl ${theme.textHeading} mb-6`}>Urutan Pelarutan Senyawa</h4>
                  <div className="space-y-4">
                    {[
                      { phase: '0-20%', compound: 'Asam & Senyawa Aromatik', taste: 'Acidity, Aroma', color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
                      { phase: '20-60%', compound: 'Gula & Senyawa Manis', taste: 'Sweetness', color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
                      { phase: '60-100%', compound: 'Senyawa Pahit & Astringent', taste: 'Bitterness', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/30' },
                    ].map((item) => (
                      <div key={item.phase} className={`flex items-center gap-6 p-5 rounded-xl ${item.bg} border ${item.border}`}>
                        <span className={`font-mono text-2xl font-bold ${item.color} w-24`}>{item.phase}</span>
                        <div className="flex-1">
                          <p className={`font-bold text-lg ${theme.textHeading}`}>{item.compound}</p>
                          <p className={`text-base ${theme.textMuted}`}>{item.taste}</p>
                        </div>
                        <div className={`w-32 h-3 rounded-full ${item.color.replace('text-', 'bg-')} opacity-30`}>
                          <div className={`h-full rounded-full ${item.color.replace('text-', 'bg-')}`} style={{ width: item.phase }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`p-8 rounded-2xl ${theme.code} border ${theme.border}`}>
                  <h4 className={`font-bold text-xl ${theme.textHeading} mb-6`}>Fines vs Boulders</h4>
                  <div className="grid md:grid-cols-2 gap-6 text-lg">
                    <div className={`p-6 rounded-xl border ${theme.border} ${darkMode ? 'bg-red-950/20' : 'bg-red-50'} shadow-lg`}>
                      <p className={`font-bold text-red-600 mb-3 text-xl`}>FINES ⚠️</p>
                      <p className={`${theme.text} leading-relaxed`}>Partikel sangat halus (&lt;100μm) yang mengekstraksi sangat cepat dan mudah over-extract. Menyebabkan rasa pahit dan astringent.</p>
                    </div>
                    <div className={`p-6 rounded-xl border ${theme.border} ${darkMode ? 'bg-blue-950/20' : 'bg-blue-50'} shadow-lg`}>
                      <p className={`font-bold text-blue-600 mb-3 text-xl`}>BOULDERS ⚠️</p>
                      <p className={`${theme.text} leading-relaxed`}>Partikel besar (&gt;800μm) yang mengekstraksi sangat lambat dan mudah under-extract. Menyebabkan rasa asam dan kurang body.</p>
                    </div>
                  </div>
                </div>

                <blockquote className={`pl-8 border-l-4 ${theme.accentBorder} ${theme.accent} font-semibold text-2xl lg:text-3xl leading-relaxed`}>
                  "Grind size adalah kenop utama untuk mengontrol rasa kopi. 
                  Ia menghubungkan fisika, kimia, dan sensorik dalam satu variabel sederhana."
                </blockquote>
              </div>
            </motion.section>

            {/* Bab 5 */}
            <motion.section 
              id="bab-5"
              data-chapter={5}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }}
              variants={fadeIn}
              className="mb-32 scroll-mt-28"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-6 mb-12 pb-6 border-b-2 ${theme.border}`}>
                <span className={`text-8xl sm:text-9xl font-black ${theme.accent} opacity-20 leading-none`}>05</span>
                <div className="flex-1">
                  <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${theme.textHeading} mb-3`}>Espresso Fundamentals</h2>
                  <p className={`text-xl ${theme.textMuted}`}>Tekanan 9 Bar dan Parameter Kritis</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className={`p-8 lg:p-12 rounded-3xl ${theme.highlight} border ${theme.border} shadow-lg`}>
                  <h3 className={`font-bold text-2xl lg:text-3xl ${theme.textHeading} mb-8 text-center`}>5.1 Definisi Ilmiah Espresso</h3>
                  <p className={`${theme.text} text-xl lg:text-2xl leading-relaxed mb-10 text-center max-w-4xl mx-auto`}>
                    Espresso adalah metode ekstraksi kopi menggunakan <strong className={theme.textHeading}>air panas bertekanan tinggi</strong> yang dipaksa 
                    melewati bed kopi yang dipadatkan. Secara teknis, espresso didefinisikan sebagai:
                  </p>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: 'Tekanan', value: '9 bar', desc: '~130 psi', icon: '⚡' },
                      { label: 'Suhu', value: '90–96°C', desc: 'Ideal: 93°C', icon: '🌡️' },
                      { label: 'Waktu', value: '25–30s', desc: 'Golden zone', icon: '⏱️' },
                      { label: 'Rasio', value: '1:2', desc: 'Kopi:Liquid', icon: '⚖️' },
                    ].map((param) => (
                      <div key={param.label} className={`p-6 rounded-xl ${theme.card} border ${theme.border} text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
                        <div className="text-3xl mb-2">{param.icon}</div>
                        <p className={`text-sm ${theme.textMuted} uppercase tracking-wider font-semibold`}>{param.label}</p>
                        <p className={`text-3xl font-black ${theme.accent} my-2`}>{param.value}</p>
                        <p className={`text-sm ${theme.textMuted}`}>{param.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`p-8 rounded-2xl ${theme.code} border ${theme.border}`}>
                  <h4 className={`font-bold text-xl ${theme.textHeading} mb-5`}>5.9 Crema Science</h4>
                  <p className={`${theme.text} text-lg leading-relaxed mb-6`}>
                    Crema adalah <strong className={theme.textHeading}>emulsi gas CO2, minyak kopi, dan air</strong>. 
                    Crema bukan indikator rasa enak, tetapi indikator kesegaran kopi dan tekanan ekstraksi.
                  </p>
                  <div className={`flex items-center justify-center gap-3 text-base ${theme.textMuted} flex-wrap`}>
                    <span className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-neutral-800' : 'bg-stone-200'} font-mono`}>CO2</span>
                    <span className="text-2xl">+</span>
                    <span className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-neutral-800' : 'bg-stone-200'} font-mono`}>Minyak Kopi</span>
                    <span className="text-2xl">+</span>
                    <span className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-neutral-800' : 'bg-stone-200'} font-mono`}>Air</span>
                    <span className="text-2xl">=</span>
                    <span className={`px-6 py-3 rounded-lg ${theme.accentBg} ${theme.accent} font-bold text-lg shadow-lg`}>Crema</span>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Quick Navigation */}
            <motion.section 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="mb-32"
            >
              <div className={`p-12 lg:p-16 rounded-3xl ${theme.highlight} border ${theme.border} text-center shadow-2xl`}>
                <motion.div 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <BookOpen size={64} className={`mx-auto mb-6 ${theme.accent} opacity-60`} />
                </motion.div>
                <h3 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${theme.textHeading} mb-4`}>15 Bab Lainnya</h3>
                <p className={`${theme.textMuted} mb-10 max-w-2xl mx-auto text-lg lg:text-xl`}>
                  Buku ini mencakup 20 bab lengkap tentang sains kopi, dari sensory science hingga coffee economics.
                </p>
                <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                  {[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((num) => (
                    <motion.a
                      key={num}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      href={`#bab-${num}`}
                      className={`px-5 py-3 rounded-xl text-base font-semibold transition-all border ${theme.border} ${darkMode ? 'hover:bg-neutral-800' : 'hover:bg-stone-100'} ${theme.textMuted} hover:${theme.accent} shadow-sm`}
                    >
                      Bab {num}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Sample chapters */}
            {[
              { id: 6, title: "Taste & Sensory Science", subtitle: "Sistem Sensorik Manusia", content: "Persepsi rasa kopi adalah hasil integrasi antara indera pengecap (taste), penciuman (smell), dan sensasi taktil di mulut (mouthfeel). Sebagian besar kompleksitas rasa kopi sebenarnya berasal dari aroma yang terdeteksi oleh hidung melalui jalur retronasal." },
              { id: 9, title: "Water Chemistry", subtitle: "Mineral dan Ekstraksi", content: "Lebih dari 98% isi secangkir kopi adalah air. Mineral terlarut berfungsi sebagai ion yang berinteraksi dengan senyawa rasa. Magnesium meningkatkan sweetness, kalsium berkontribusi terhadap body. TDS ideal: 75-150 ppm." },
              { id: 10, title: "Extraction Yield", subtitle: "EY dan TDS Control", content: "Extraction yield (EY) adalah persentase massa senyawa kopi yang berhasil diekstraksi. Golden zone berada pada 18-22%. Di bawah ini: under-extracted (asam). Di atas ini: over-extracted (pahit)." },
              { id: 20, title: "The Professional Barista Mindset", subtitle: "Manifesto Penutup", content: "Menjadi barista berarti memilih jalan presisi, kerendahan hati, dan dedikasi seumur hidup terhadap kualitas. Profesionalisme berarti melakukan hal yang benar bahkan ketika tidak ada yang melihat." },
            ].map((chapter) => (
              <motion.section
                key={chapter.id}
                id={`bab-${chapter.id}`}
                data-chapter={chapter.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-150px" }}
                variants={fadeIn}
                className="mb-32 scroll-mt-28"
              >
                <div className={`flex flex-col sm:flex-row sm:items-end gap-6 mb-12 pb-6 border-b-2 ${theme.border}`}>
                  <span className={`text-8xl sm:text-9xl font-black ${theme.accent} opacity-20 leading-none`}>
                    {String(chapter.id).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${theme.textHeading} mb-3`}>{chapter.title}</h2>
                    <p className={`text-xl ${theme.textMuted}`}>{chapter.subtitle}</p>
                  </div>
                </div>
                
                <div className={`p-8 lg:p-12 rounded-3xl ${theme.highlight} border ${theme.border} shadow-lg`}>
                  <p className={`${theme.text} text-xl lg:text-2xl leading-relaxed`}>{chapter.content}</p>
                </div>

                {chapter.id === 20 && (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className={`mt-12 p-10 lg:p-16 rounded-3xl ${theme.accentBg} border-2 ${theme.accentBorder} text-center shadow-2xl`}
                  >
                    <p className={`text-2xl sm:text-3xl lg:text-4xl font-light italic ${theme.accent} mb-6 leading-relaxed`}>
                      "Menjadi barista berarti memilih jalan presisi, kerendahan hati, 
                      dan dedikasi seumur hidup terhadap kualitas."
                    </p>
                    <p className={`text-lg ${theme.textMuted}`}>— Wildan Ferdiansyah</p>
                  </motion.div>
                )}
              </motion.section>
            ))}

          </div>
        </div>
      </main>
      
      {/* REMOVED: Footer section karena sudah ada footer global */}
      {/* Jika ada content di bawah ini yang terkait footer, sudah dihapus */}
    </div>
  );
}
