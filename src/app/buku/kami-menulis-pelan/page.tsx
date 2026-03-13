/* eslint-disable react/jsx-no-comment-textnodes */

'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Coffee, Sun, Moon, BookOpen, Eye, EyeOff, ArrowUp, Clock, Quote } from 'lucide-react';

// ==========================================
// HOOK: Typewriter yang aman
// ==========================================
function useTypewriter(text: string, speed: number = 50, start: boolean = true) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  
  const indexRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const textRef = useRef(text);
  const startRef = useRef(start);

  useEffect(() => {
    textRef.current = text;
    startRef.current = start;
  }, [text, start]);

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (!start || speed <= 0 || !text) {
      setDisplayText(text);
      setIsComplete(true);
      return;
    }

    indexRef.current = 0;
    setDisplayText('');
    setIsComplete(false);

    const safeSpeed = Math.max(speed, 16);

    timerRef.current = setInterval(() => {
      const currentText = textRef.current;
      const currentIndex = indexRef.current;

      if (currentIndex < currentText.length) {
        setDisplayText(currentText.slice(0, currentIndex + 1));
        indexRef.current = currentIndex + 1;
      } else {
        setIsComplete(true);
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }
    }, safeSpeed);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [text, speed, start]);

  return { displayText, isComplete };
}

// ==========================================
// HOOK: Client-side detection
// ==========================================
function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

// ==========================================
// HOOK: Scroll tracking yang aman
// ==========================================
function useScrollTracking(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const rafRef = useRef<number | null>(null);
  const isClient = useIsClient();

  useEffect(() => {
    if (!isClient) return;

    let lastScrollY = 0;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          setShowScrollTop(currentScrollY > 300);
          
          if (Math.abs(currentScrollY - lastScrollY) > 50) {
            lastScrollY = currentScrollY;
            
            const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
            const scrollPosition = currentScrollY + 200;

            for (const section of sections) {
              if (section) {
                const offsetTop = section.offsetTop;
                const offsetHeight = section.offsetHeight;
                
                if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                  setActiveSection(section.id);
                  break;
                }
              }
            }
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isClient, sectionIds]);

  return { activeSection, showScrollTop };
}

export default function KamiMenulisPelanPage() {
  const [darkMode, setDarkMode] = useState(false); // Default light mode untuk aesthetic kopi
  const [focusMode, setFocusMode] = useState(false);
  const [steamParticles, setSteamParticles] = useState<Array<{id: number, left: number, delay: number}>>([]);
  const [typingEnabled, setTypingEnabled] = useState(true);
  
  const isClient = useIsClient();

  const { scrollYProgress } = useScroll();
  const progressBar = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Steam particles effect
  useEffect(() => {
    if (!isClient) return;
    
    const particles = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      left: 20 + Math.random() * 60,
      delay: i * 0.5
    }));
    setSteamParticles(particles);
  }, [isClient]);

  // Sections data
  const sections = useMemo(() => [
    { id: 'pembuka', title: 'Pembuka', subtitle: 'Lewat Begitu Saja' },
    { id: 'kelas-pekerja', title: 'Tentang Kelas Pekerja', subtitle: 'Menulis dari Sisa' },
    { id: 'tentang-karya', title: 'Tentang Karya', subtitle: 'Bekal Dingin' },
    { id: 'orang-terdekat', title: 'Tentang Orang Terdekat', subtitle: 'Yang Paling Sunyi' },
    { id: 'dunia-sibuk', title: 'Tentang Dunia yang Sibuk', subtitle: 'Tidak Berhenti' },
    { id: 'bertahan-menulis', title: 'Tentang Bertahan Menulis', subtitle: 'Meski Lewat' },
    { id: 'penutup', title: 'Penutup', subtitle: 'Tetap Ditulis' },
  ], []);

  const sectionIds = useMemo(() => sections.map(s => s.id), [sections]);
  const { activeSection, showScrollTop } = useScrollTracking(sectionIds);

  const toggleDarkMode = useCallback(() => setDarkMode(prev => !prev), []);

  // Aesthetic Coffee & Philosophy Theme
  const theme = useMemo(() => darkMode ? {
    // Dark mode: Deep espresso night
    bg: 'bg-[#1a1512]', // Dark coffee bean
    text: 'text-[#d4c4b0]', // Cream foam
    textMuted: 'text-[#8b7355]', // Old paper
    textHeading: 'text-[#f5e6d3]', // Warm milk
    accent: 'text-[#c9a86c]', // Golden crema
    accentBg: 'bg-[#c9a86c]/10',
    accentSoft: 'bg-[#4a3f35]', // Coffee grounds
    border: 'border-[#3d3229]', // Dark roast
    borderAccent: 'border-[#c9a86c]/30',
    highlight: 'bg-[#2a211c]', // Wet coffee grounds
    card: 'bg-[#231c17]', // Espresso cup
    cursor: 'bg-[#c9a86c]',
    paperTexture: 'opacity-[0.03]'
  } : {
    // Light mode: Warm coffee shop morning
    bg: 'bg-[#faf8f5]', // Warm white paper
    text: 'text-[#4a4036]', // Coffee stain text
    textMuted: 'text-[#8b7355]', // Aged paper
    textHeading: 'text-[#2c2416]', // Dark roast
    accent: 'text-[#8b6914]', // Amber coffee
    accentBg: 'bg-[#f5e6c8]', // Light cream
    accentSoft: 'bg-[#e8dcc8]', // Foam
    border: 'border-[#d4c4b0]', // Coffee with milk
    borderAccent: 'border-[#c9a86c]',
    highlight: 'bg-[#f5f0e8]', // Paper texture
    card: 'bg-[#ffffff]', // Clean cup
    cursor: 'bg-[#8b6914]',
    paperTexture: 'opacity-[0.04]'
  }, [darkMode]);

  if (!isClient) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-[#1a1512]' : 'bg-[#faf8f5]'} flex items-center justify-center`}>
        <div className="flex items-center gap-3 text-[#8b7355]">
          <Coffee className="animate-pulse" size={20} />
          <span className="font-serif italic text-sm">Menyeduh...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-500 font-serif selection:bg-[#c9a86c]/30`}>
      
      {/* Paper Texture Overlay */}
      <div className={`fixed inset-0 pointer-events-none z-50 ${theme.paperTexture}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'multiply'
        }}
      />

      {/* Coffee Steam Animation */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 pointer-events-none z-40 hidden md:block">
        {steamParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute w-1 h-8 rounded-full ${darkMode ? 'bg-[#d4c4b0]/20' : 'bg-[#8b7355]/10'}`}
            style={{ left: `${particle.left}%` }}
            animate={{
              y: [-20, -100],
              opacity: [0, 0.6, 0],
              scale: [1, 1.5, 2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Progress Bar - Coffee drip style */}
      <div className={`fixed top-0 left-0 right-0 h-1 ${theme.bg} z-50`}>
        <motion.div 
          className={`h-full ${theme.accent.replace('text-', 'bg-')}`}
          style={{ width: progressBar }}
        />
      </div>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 px-6 py-4 ${theme.bg}/90 backdrop-blur-sm border-b ${theme.border}`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Coffee className={theme.accent} size={18} />
            <span className={`text-xs uppercase tracking-[0.2em] ${theme.textMuted} font-medium`}>
              Kopi & Catatan
            </span>
            {typingEnabled && (
              <span className={`text-[10px] ${theme.accent} animate-pulse`}>● mengetik</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTypingEnabled(!typingEnabled)}
              className={`p-2 rounded-full border ${theme.border} hover:${theme.accentBg} transition-all duration-300`}
              title="Toggle typewriter"
            >
              <span className="text-xs font-serif italic">
                {typingEnabled ? 'A' : 'a'}
              </span>
            </button>
            <button
              onClick={() => setFocusMode(!focusMode)}
              className={`p-2 rounded-full border ${theme.border} hover:${theme.accentBg} transition-all duration-300`}
            >
              {focusMode ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full border ${theme.border} hover:${theme.accentBg} transition-all duration-300`}
            >
              {darkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar Navigation - Book style */}
      <AnimatePresence>
        {!focusMode && (
          <motion.nav
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`fixed left-6 top-32 bottom-20 w-56 ${theme.card} border ${theme.border} z-30 hidden lg:block overflow-y-auto rounded-lg shadow-lg`}
          >
            <div className={`p-4 border-b ${theme.border} ${theme.accentSoft}`}>
              <p className={`text-[10px] uppercase tracking-widest ${theme.accent} font-semibold`}>Daftar Isi</p>
            </div>
            {sections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`block p-4 text-sm border-b ${theme.border} last:border-0 transition-all duration-300 ${
                  activeSection === section.id 
                    ? `${theme.accentBg} ${theme.accent} border-l-4 ${theme.borderAccent} pl-6` 
                    : `hover:${theme.highlight} ${theme.textMuted} hover:pl-6`
                }`}
              >
                <span className="block font-serif">{section.title}</span>
                <span className={`block text-[11px] mt-1 italic ${theme.textMuted}`}>{section.subtitle}</span>
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={`relative z-20 pt-32 pb-32 px-6 transition-all duration-500 ${focusMode ? 'max-w-2xl' : 'max-w-2xl lg:ml-72'} mx-auto`}>
        
        {/* Title Section */}
        <section className="mb-20 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`inline-block px-4 py-2 text-[10px] uppercase tracking-[0.3em] ${theme.accentBg} ${theme.accent} border ${theme.borderAccent} mb-8 rounded-full`}
          >
            [Essai]
          </motion.div>
          
          <h1 className={`text-4xl md:text-6xl font-serif font-bold ${theme.textHeading} mb-6 tracking-tight leading-tight`}>
            Kami Menulis
            <br />
            <span className={`${theme.accent} italic font-light`}>Pelan</span>
          </h1>
          
          <div className={`flex items-center justify-center gap-4 text-xs ${theme.textMuted} mt-8 font-serif italic`}>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              8 menit membaca
            </span>
            <span>•</span>
            <span>1,247 kata</span>
          </div>

          {/* Decorative coffee ring */}
          <div className={`mt-12 w-32 h-32 mx-auto rounded-full border-2 ${theme.border} opacity-20 relative`}>
            <div className={`absolute inset-2 rounded-full border ${theme.border} opacity-40`} />
          </div>
        </section>

        {/* Pembuka */}
        <section id="pembuka" className="mb-24 scroll-mt-32">
          <TypewriterParagraph 
            text="Buku-buku itu lahir diam-diam. Ditulis setelah kerja selesai."
            theme={theme}
            typingEnabled={typingEnabled}
            className="text-xl md:text-2xl leading-relaxed mb-8 font-serif text-center italic"
          />
          
          <div className={`space-y-4 ${theme.textMuted} text-base leading-loose mb-12 pl-6 border-l-2 ${theme.borderAccent}`}>
            <TypewriterParagraph 
              text="Alarm pagi belum sempat dilupakan."
              theme={theme}
              typingEnabled={typingEnabled}
              delay={500}
            />
            <TypewriterParagraph 
              text="Layar ponsel masih perih di mata."
              theme={theme}
              typingEnabled={typingEnabled}
              delay={700}
            />
            <TypewriterParagraph 
              text="Badan bau keringat."
              theme={theme}
              typingEnabled={typingEnabled}
              delay={900}
            />
            <TypewriterParagraph 
              text="Kopi instan dingin di meja."
              theme={theme}
              typingEnabled={typingEnabled}
              delay={1100}
            />
          </div>

          <TypewriterParagraph 
            text="Aku mengirimkannya sebagai tautan."
            theme={theme}
            typingEnabled={typingEnabled}
            className="mb-6 text-lg"
            delay={1300}
          />
          
          <div className={`p-6 ${theme.highlight} border ${theme.border} my-10 rounded-lg shadow-sm`}>
            <TypewriterParagraph 
              text="Kadang hanya satu kalimat."
              theme={theme}
              typingEnabled={typingEnabled}
              className="mb-3 text-lg italic"
            />
            <TypewriterParagraph 
              text="Kadang tanpa pesan apa-apa."
              theme={theme}
              typingEnabled={typingEnabled}
              className="text-lg italic"
            />
          </div>

          <TypewriterParagraph 
            text="Lalu aku menunggu."
            theme={theme}
            typingEnabled={typingEnabled}
            className={`text-2xl ${theme.textHeading} mt-12 text-center font-serif`}
            delay={1500}
          />
          
          <p className={`mt-6 text-sm ${theme.textMuted} italic text-center max-w-md mx-auto leading-relaxed`}>
            Bukan dengan harapan besar. Cukup lama untuk tahu apakah ia akan berhenti atau lewat begitu saja.
          </p>
        </section>

        {/* Tentang Kelas Pekerja */}
        <section id="kelas-pekerja" className="mb-24 scroll-mt-32">
          <div className={`mb-10 pb-4 border-b ${theme.border}`}>
            <span className={`text-[10px] uppercase tracking-[0.3em] ${theme.accent} font-semibold`}>Bab I</span>
            <h2 className={`text-3xl font-serif font-bold ${theme.textHeading} mt-3`}>Tentang Kelas Pekerja</h2>
            <p className={`text-sm ${theme.textMuted} mt-2 italic`}>Menulis dari Sisa</p>
          </div>

          <TypewriterParagraph 
            text="Kelas pekerja menulis dari sisa."
            theme={theme}
            typingEnabled={typingEnabled}
            className="text-xl leading-relaxed mb-10 font-serif"
          />

          <div className={`grid gap-4 mb-10`}>
            {['Sisa tenaga.', 'Sisa waktu.', 'Sisa pikiran yang belum habis dipakai bekerja.'].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-5 ${theme.card} border ${theme.border} rounded-lg flex items-center gap-4 shadow-sm`}
              >
                <span className={`text-sm ${theme.accent} font-serif italic`}>{String(i + 1).padStart(2, '0')}.</span>
                <TypewriterParagraph 
                  text={item}
                  theme={theme}
                  typingEnabled={typingEnabled}
                  delay={i * 200}
                  className="font-serif text-lg"
                />
              </motion.div>
            ))}
          </div>

          <div className={`p-8 ${theme.accentSoft} border-l-4 ${theme.borderAccent} rounded-r-lg`}>
            <Quote className={`${theme.accent} mb-4 opacity-50`} size={24} />
            <TypewriterParagraph 
              text="Kami menulis bukan karena yakin. Tapi karena diam-diam tahu kalau tidak ditulis, hari ini akan hilang."
              theme={theme}
              typingEnabled={typingEnabled}
              className="leading-relaxed mb-4 text-lg font-serif"
            />
            <TypewriterParagraph 
              text="Tulisan kami lahir dari tubuh yang ingin rebah tapi masih memaksa duduk."
              theme={theme}
              typingEnabled={typingEnabled}
              className="leading-relaxed italic"
            />
          </div>

          <p className={`mt-8 text-sm ${theme.textMuted} border-t ${theme.border} pt-6 italic text-center`}>
            Karena itu, ia tidak pandai meminta perhatian.
          </p>
        </section>

        {/* Tentang Karya */}
        <section id="tentang-karya" className="mb-24 scroll-mt-32">
          <div className={`mb-10 pb-4 border-b ${theme.border}`}>
            <span className={`text-[10px] uppercase tracking-[0.3em] ${theme.accent} font-semibold`}>Bab II</span>
            <h2 className={`text-3xl font-serif font-bold ${theme.textHeading} mt-3`}>Tentang Karya</h2>
            <p className={`text-sm ${theme.textMuted} mt-2 italic`}>Bekal Dingin</p>
          </div>

          <div className={`p-8 ${theme.card} border-2 ${theme.border} relative overflow-hidden mb-10 rounded-lg shadow-lg`}>
            <div className={`absolute top-0 right-0 px-4 py-2 text-[10px] ${theme.accentBg} ${theme.accent} border-l border-b ${theme.border} rounded-bl-lg font-semibold uppercase tracking-wider`}>
              Catatan Pinggir
            </div>
            
            <TypewriterParagraph 
              text="Karya itu seperti bekal yang dimakan dingin di sela jam kerja."
              theme={theme}
              typingEnabled={typingEnabled}
              className="text-xl leading-relaxed mb-8 mt-4 font-serif"
            />
            
            <div className={`space-y-3 text-base ${theme.textMuted} mb-8 pl-4`}>
              <p className="italic">Tidak mewah.</p>
              <p className="italic">Tidak istimewa.</p>
            </div>

            <TypewriterParagraph 
              text="Ia hanya ingin dibuka, meski hanya untuk memastikan bahwa ia belum basi."
              theme={theme}
              typingEnabled={typingEnabled}
              className="leading-relaxed font-serif text-lg"
            />
          </div>

          <div className={`p-6 ${theme.accentBg} border ${theme.borderAccent} rounded-lg text-center`}>
            <p className={`${theme.accent} font-serif italic text-lg`}>
              "Dan ketika tidak dibuka, ia tidak marah. Hanya diam lebih lama."
            </p>
          </div>

          <p className={`mt-10 text-sm ${theme.textMuted} italic text-center font-serif`}>
            Kadang, ketika dunia luar melewatinya begitu saja, rasanya masih bisa diterima.
          </p>
        </section>

        {/* Tentang Orang Terdekat */}
        <section id="orang-terdekat" className="mb-24 scroll-mt-32">
          <div className={`mb-10 pb-4 border-b ${theme.border}`}>
            <span className={`text-[10px] uppercase tracking-[0.3em] ${theme.accent} font-semibold`}>Bab III</span>
            <h2 className={`text-3xl font-serif font-bold ${theme.textHeading} mt-3`}>Tentang Orang Terdekat</h2>
            <p className={`text-sm ${theme.textMuted} mt-2 italic`}>Yang Paling Sunyi</p>
          </div>

          <TypewriterParagraph 
            text="Ada orang yang paling dekat. Yang melihat lelahku tanpa perlu aku jelaskan."
            theme={theme}
            typingEnabled={typingEnabled}
            className="leading-relaxed mb-10 text-lg font-serif"
          />

          <div className={`py-16 text-center border-y-2 ${theme.border} my-12 ${theme.highlight}`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <p className={`text-3xl md:text-5xl font-serif font-bold ${theme.textHeading} tracking-tight italic`}>
                Buku itu ada.
              </p>
              <p className={`text-xs ${theme.accent} mt-6 tracking-[0.5em] uppercase font-semibold`}>Berbulan-bulan.</p>
            </motion.div>
          </div>

          <TypewriterParagraph 
            text="Aku tidak pernah bertanya. Karena aku tahu, jawabannya akan lebih menyakitkan jika diucapkan."
            theme={theme}
            typingEnabled={typingEnabled}
            className="leading-relaxed mb-10 text-lg font-serif"
          />

          <div className={`p-8 ${theme.accentSoft} border-l-4 ${theme.borderAccent} rounded-r-lg`}>
            <p className={`${theme.accent} italic mb-4 text-lg font-serif`}>Kadang, yang paling sunyi bukan tidak dibaca,</p>
            <p className={`${theme.textHeading} text-xl font-serif font-bold`}>
              tapi disadari bahwa bahkan yang terdekat pun tidak sempat berhenti.
            </p>
          </div>

          <p className={`mt-10 text-sm ${theme.textMuted} border-t ${theme.border} pt-6 italic text-center font-serif`}>
            Kalau yang dekat saja tidak sempat, aku tidak tahu apa yang bisa kuharapkan dari dunia yang asing.
          </p>
        </section>

        {/* Tentang Dunia yang Sibuk */}
        <section id="dunia-sibuk" className="mb-24 scroll-mt-32">
          <div className={`mb-10 pb-4 border-b ${theme.border}`}>
            <span className={`text-[10px] uppercase tracking-[0.3em] ${theme.accent} font-semibold`}>Bab IV</span>
            <h2 className={`text-3xl font-serif font-bold ${theme.textHeading} mt-3`}>Tentang Dunia yang Sibuk</h2>
            <p className={`text-sm ${theme.textMuted} mt-2 italic`}>Tidak Berhenti</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className={`p-8 ${theme.card} border ${theme.border} rounded-lg shadow-sm`}>
              <p className={`mt-4 text-2xl ${theme.textHeading} font-serif italic`}>Dunia tidak kejam.</p>
              <p className={`mt-4 ${theme.text} font-serif`}>Ia hanya tidak berhenti.</p>
            </div>
            
            <div className={`p-8 ${theme.highlight} border ${theme.border} rounded-lg`}>
              <p className={`text-base ${theme.textMuted} leading-relaxed font-serif italic`}>
                Dan yang tidak berhenti jarang sempat melihat apa yang lahir pelan.
              </p>
              <p className={`mt-6 text-base ${theme.text} font-serif`}>
                Karya seperti ini tidak cocok dengan ritme itu.
              </p>
            </div>
          </div>

          <div className={`mt-8 p-6 border ${theme.border} ${theme.accentBg} rounded-lg text-center`}>
            <p className={`${theme.accent} text-base font-serif italic`}>
              Ia berdiri di pinggir, menyadari bahwa tidak semua yang dibuat dengan sungguh-sungguh akan diberi waktu.
            </p>
          </div>
        </section>

        {/* Tentang Bertahan Menulis */}
        <section id="bertahan-menulis" className="mb-24 scroll-mt-32">
          <div className={`mb-10 pb-4 border-b ${theme.border}`}>
            <span className={`text-[10px] uppercase tracking-[0.3em] ${theme.accent} font-semibold`}>Bab V</span>
            <h2 className={`text-3xl font-serif font-bold ${theme.textHeading} mt-3`}>Tentang Bertahan Menulis</h2>
            <p className={`text-sm ${theme.textMuted} mt-2 italic`}>Meski Lewat</p>
          </div>

          <TypewriterParagraph 
            text="Aku tetap menulis bukan karena yakin akan dibaca."
            theme={theme}
            typingEnabled={typingEnabled}
            className="text-2xl leading-relaxed mb-8 font-serif text-center"
          />

          <div className={`p-10 ${theme.card} border-2 ${theme.borderAccent} relative rounded-lg shadow-lg`}>
            <div className={`absolute -top-4 left-8 px-4 py-1 ${theme.bg} text-xs ${theme.accent} border ${theme.border} rounded-full font-semibold uppercase tracking-wider`}>
              Inti
            </div>
            <TypewriterParagraph 
              text="Aku menulis karena jika tidak, hari-hari ini akan runtuh tanpa saksi."
              theme={theme}
              typingEnabled={typingEnabled}
              className="text-xl leading-relaxed font-serif italic text-center mt-4"
            />
          </div>

          <div className={`mt-10 py-12 text-center border-y ${theme.border} ${theme.highlight}`}>
            <p className={`${theme.textMuted} italic text-sm mb-4 font-serif`}>Menulis adalah caraku mengatakan pada diri sendiri bahwa</p>
            <p className={`text-3xl ${theme.textHeading} font-serif font-bold italic`}>Aku Pernah Ada</p>
            <p className={`${theme.accent} text-sm mt-4 tracking-[0.3em] uppercase font-semibold`}>Di Hari Ini.</p>
          </div>

          <p className={`mt-10 text-right text-sm ${theme.textMuted} tracking-widest uppercase font-semibold`}>
            Meski Lewat.
          </p>
        </section>

        {/* Penutup */}
        <section id="penutup" className="mb-24 scroll-mt-32">
          <div className={`mb-10 pb-4 border-b-2 ${theme.border}`}>
            <span className={`text-[10px] uppercase tracking-[0.3em] ${theme.accent} font-semibold`}>Penutup</span>
            <h2 className={`text-3xl font-serif font-bold ${theme.textHeading} mt-3`}>Tetap Ditulis</h2>
          </div>

          <div className={`space-y-8`}>
            <TypewriterParagraph 
              text="Buku ini tidak meminta perhatian. Ia juga tidak ingin dipahami."
              theme={theme}
              typingEnabled={typingEnabled}
              className="leading-relaxed text-lg font-serif"
            />
            
            <TypewriterParagraph 
              text="Ia hanya ingin jujur."
              theme={theme}
              typingEnabled={typingEnabled}
              className={`text-2xl ${theme.textHeading} font-serif font-bold text-center italic`}
            />

            <div className={`p-8 ${theme.highlight} border ${theme.border} my-10 rounded-lg text-center`}>
              <p className={`text-base ${theme.textMuted} leading-relaxed font-serif italic mb-6`}>
                Dan jika suatu hari seseorang membacanya dalam keadaan lelah, dalam keadaan sepi,
              </p>
              <p className={`text-2xl ${theme.accent} font-serif font-bold tracking-wide`}>
                ITU SUDAH CUKUP.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className={`p-6 ${theme.card} border ${theme.border} text-center rounded-lg`}>
                <p className={`text-xs ${theme.textMuted} uppercase tracking-wider font-semibold mb-2`}>Jika Tidak Dibaca</p>
                <p className={`text-base ${theme.text} font-serif italic`}>Tidak apa-apa.</p>
              </div>
              <div className={`p-6 ${theme.accentBg} border ${theme.borderAccent} text-center rounded-lg`}>
                <p className={`text-xs ${theme.accent} uppercase tracking-wider font-semibold mb-2`}>Keadaan Akhir</p>
                <p className={`text-base ${theme.textHeading} font-serif font-bold italic`}>Ia tetap ditulis.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`mt-24 pt-10 border-t-2 ${theme.border} text-xs ${theme.textMuted}`}>
          <div className="flex items-center justify-between font-serif">
            <span className="italic">Kami Menulis Pelan</span>
            <span>1,247 kata</span>
          </div>
          <div className="flex items-center justify-between mt-3 font-serif">
            <span className="italic">Oleh: Seorang Pekerja</span>
            <span>Selesai.</span>
          </div>
          <div className={`mt-8 pt-8 border-t ${theme.border} text-center`}>
            <Coffee className={`${theme.accent} mx-auto mb-4`} size={24} />
            <span className={`${theme.accent} font-serif italic text-sm`}>Sampai kopi berikutnya.</span>
          </div>
        </footer>

      </main>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`fixed bottom-6 right-6 z-50 p-4 ${theme.card} border ${theme.border} ${theme.accent} hover:${theme.accentBg} transition-all duration-300 rounded-full shadow-lg`}
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .cursor-blink {
          animation: blink 1.5s ease-in-out infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: ${darkMode ? '#1a1512' : '#faf8f5'};
        }
        ::-webkit-scrollbar-thumb {
          background: ${darkMode ? '#3d3229' : '#d4c4b0'};
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: ${darkMode ? '#c9a86c' : '#8b6914'};
        }
      `}</style>
    </div>
  );
}

// ==========================================
// COMPONENT: Typewriter Paragraph
// ==========================================
function TypewriterParagraph({ 
  text, 
  theme, 
  typingEnabled, 
  className = '', 
  delay = 0 
}: { 
  text: string; 
  theme: any; 
  typingEnabled: boolean;
  className?: string;
  delay?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isClient = useIsClient();

  useEffect(() => {
    if (!isClient || !ref.current) return;

    const element = ref.current;
    
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => {
            setIsVisible(true);
          }, delay);
          
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current && element) {
        observerRef.current.unobserve(element);
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [isClient, delay]);

  const { displayText, isComplete } = useTypewriter(
    text, 
    typingEnabled ? 40 : 0, 
    isVisible && typingEnabled
  );

  if (!isClient) {
    return <div ref={ref} className={className}>{text}</div>;
  }

  return (
    <div ref={ref} className={className}>
      {typingEnabled ? displayText : text}
      {typingEnabled && !isComplete && isVisible && (
        <span className={`inline-block w-0.5 h-5 ml-1 ${theme.cursor} cursor-blink align-middle`} />
      )}
    </div>
  );
}
