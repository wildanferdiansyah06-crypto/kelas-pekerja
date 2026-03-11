'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Type, Eye, EyeOff, ArrowUp, Clock, AlertCircle } from 'lucide-react';

// Typewriter hook
function useTypewriter(text: string, speed: number = 50, start: boolean = true) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!start) return;
    
    let index = 0;
    setDisplayText('');
    setIsComplete(false);
    
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, start]);

  return { displayText, isComplete };
}

export default function KamiMenulisPelanPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [focusMode, setFocusMode] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [typingEnabled, setTypingEnabled] = useState(true);

  const { scrollYProgress } = useScroll();
  const progressBar = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Track scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
      
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Random glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 150);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Theme - Very high contrast brutalist
  const theme = darkMode ? {
    bg: 'bg-[#050505]',
    text: 'text-neutral-400',
    textMuted: 'text-neutral-600',
    textHeading: 'text-white',
    accent: 'text-red-500',
    accentBg: 'bg-red-500/10',
    border: 'border-neutral-800',
    borderAccent: 'border-red-900/50',
    highlight: 'bg-neutral-900',
    code: 'bg-black',
    cursor: 'bg-red-500',
    noise: 'opacity-[0.05]'
  } : {
    bg: 'bg-[#f5f5f5]',
    text: 'text-neutral-600',
    textMuted: 'text-neutral-400',
    textHeading: 'text-black',
    accent: 'text-red-600',
    accentBg: 'bg-red-100',
    border: 'border-neutral-300',
    borderAccent: 'border-red-300',
    highlight: 'bg-neutral-100',
    code: 'bg-white',
    cursor: 'bg-red-600',
    noise: 'opacity-[0.02]'
  };

  const sections = [
    { id: 'pembuka', title: 'Pembuka', subtitle: 'Lewat Begitu Saja' },
    { id: 'kelas-pekerja', title: 'Tentang Kelas Pekerja', subtitle: 'Menulis dari Sisa' },
    { id: 'tentang-karya', title: 'Tentang Karya', subtitle: 'Bekal Dingin' },
    { id: 'orang-terdekat', title: 'Tentang Orang Terdekat', subtitle: 'Yang Paling Sunyi' },
    { id: 'dunia-sibuk', title: 'Tentang Dunia yang Sibuk', subtitle: 'Tidak Berhenti' },
    { id: 'bertahan-menulis', title: 'Tentang Bertahan Menulis', subtitle: 'Meski Lewat' },
    { id: 'penutup', title: 'Penutup', subtitle: 'Tetap Ditulis' },
  ];

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-300 font-mono selection:bg-red-500/30`}>
      
      {/* Heavy Noise Texture */}
      <div className={`fixed inset-0 pointer-events-none z-50 mix-blend-overlay ${theme.noise}`}
        style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}
      />

      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden opacity-[0.03]">
        <div className="w-full h-2 bg-white animate-scanline" />
      </div>

      {/* Progress Bar - Thick brutalist style */}
      <div className={`fixed top-0 left-0 right-0 h-2 ${theme.code} z-50 border-b ${theme.border}`}>
        <motion.div 
          className={`h-full ${theme.accent.replace('text-', 'bg-')}`}
          style={{ width: progressBar }}
        />
      </div>

      {/* Glitch Overlay */}
      <AnimatePresence>
        {glitchActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0, 0.4, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-red-500/20 z-30 pointer-events-none mix-blend-multiply"
          />
        )}
      </AnimatePresence>

      {/* Header - Brutalist */}
      <header className={`fixed top-0 left-0 right-0 z-40 px-4 py-3 ${theme.code} border-b ${theme.border}`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-3 h-3 ${theme.accent.replace('text-', 'bg-')}`} />
            <span className={`text-xs uppercase tracking-widest ${theme.textMuted}`}>
              KAMI_MENULIS_PELAN.txt
            </span>
            {typingEnabled && (
              <span className={`text-[10px] ${theme.accent} animate-pulse`}>● REC</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTypingEnabled(!typingEnabled)}
              className={`p-2 border ${theme.border} hover:${theme.accentBg} transition-colors`}
              title="Toggle typewriter"
            >
              <Type size={14} className={typingEnabled ? theme.accent : theme.textMuted} />
            </button>
            <button
              onClick={() => setFocusMode(!focusMode)}
              className={`p-2 border ${theme.border} hover:${theme.accentBg} transition-colors`}
            >
              {focusMode ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
            <button
              onClick={toggleDarkMode}
              className={`p-2 border ${theme.border} hover:${theme.accentBg} transition-colors`}
            >
              {darkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar Navigation - Raw brutalist */}
      <AnimatePresence>
        {!focusMode && (
          <motion.nav
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`fixed left-4 top-20 bottom-20 w-48 ${theme.code} border ${theme.border} z-30 hidden lg:block overflow-y-auto`}
          >
            <div className="p-4 border-b ${theme.border}">
              <p className={`text-[10px] uppercase tracking-widest ${theme.textMuted}`}>/// SECTIONS</p>
            </div>
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`block p-3 text-xs border-b ${theme.border} last:border-0 transition-all ${
                  activeSection === section.id 
                    ? `${theme.accentBg} ${theme.accent} border-l-2 ${theme.borderAccent}` 
                    : `hover:${theme.highlight} ${theme.textMuted}`
                }`}
              >
                <span className="block truncate">{section.title}</span>
                <span className={`block text-[10px] mt-1 ${theme.textMuted}`}>{section.subtitle}</span>
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={`relative z-20 pt-32 pb-32 px-4 transition-all duration-300 ${focusMode ? 'max-w-2xl' : 'max-w-2xl lg:ml-56'} mx-auto`}>
        
        {/* Title Section - Brutalist */}
        <section className="mb-20 border-b-2 border-current pb-8">
          <div className={`inline-block px-2 py-1 text-[10px] uppercase tracking-widest ${theme.accentBg} ${theme.accent} border ${theme.borderAccent} mb-4`}>
            [PEMBUKA]
          </div>
          
          <h1 className={`text-4xl md:text-6xl font-bold ${theme.textHeading} mb-4 tracking-tighter leading-none`}>
            KAMI MENULIS
            <br />
            <span className={theme.accent}>PELAN</span>
          </h1>
          
          <div className={`flex items-center gap-2 text-xs ${theme.textMuted} mt-6`}>
            <Clock size={12} />
            <span>EST_READ_TIME: 8_MIN</span>
            <span className="mx-2">|</span>
            <span>WORD_COUNT: 1,247</span>
          </div>
        </section>

        {/* Pembuka */}
        <section id="pembuka" className="mb-24 scroll-mt-24">
          <TypewriterParagraph 
            text="Buku-buku itu lahir diam-diam. Ditulis setelah kerja selesai."
            theme={theme}
            typingEnabled={typingEnabled}
            className="text-lg md:text-xl leading-relaxed mb-6"
          />
          
          <div className={`space-y-4 ${theme.textMuted} text-sm leading-relaxed mb-8 pl-4 border-l-2 ${theme.border}`}>
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
            className="mb-4"
            delay={1300}
          />
          
          <div className={`p-4 ${theme.highlight} border ${theme.border} my-8`}>
            <TypewriterParagraph 
              text="Kadang hanya satu kalimat."
              theme={theme}
              typingEnabled={typingEnabled}
              className="mb-2"
            />
            <TypewriterParagraph 
              text="Kadang tanpa pesan apa-apa."
              theme={theme}
              typingEnabled={typingEnabled}
            />
          </div>

          <TypewriterParagraph 
            text="Lalu aku menunggu."
            theme={theme}
            typingEnabled={typingEnabled}
            className={`text-lg ${theme.textHeading} mt-8`}
            delay={1500}
          />
          
          <p className={`mt-4 text-sm ${theme.textMuted} italic`}>
            Bukan dengan harapan besar. Cukup lama untuk tahu apakah ia akan berhenti atau lewat begitu saja.
          </p>
        </section>

        {/* Tentang Kelas Pekerja */}
        <section id="kelas-pekerja" className="mb-24 scroll-mt-24">
          <div className={`mb-8 pb-4 border-b ${theme.border}`}>
            <span className={`text-[10px] uppercase tracking-widest ${theme.accent}`}>/// SECTION_01</span>
            <h2 className={`text-2xl font-bold ${theme.textHeading} mt-2`}>TENTANG KELAS PEKERJA</h2>
          </div>

          <TypewriterParagraph 
            text="Kelas pekerja menulis dari sisa."
            theme={theme}
            typingEnabled={typingEnabled}
            className="text-lg leading-relaxed mb-8"
          />

          <div className={`grid gap-4 mb-8`}>
            {['Sisa tenaga.', 'Sisa waktu.', 'Sisa pikiran yang belum habis dipakai bekerja.'].map((item, i) => (
              <div 
                key={i} 
                className={`p-4 ${theme.code} border ${theme.border} flex items-center gap-4`}
              >
                <span className={`text-xs ${theme.accent}`}>[{String(i + 1).padStart(2, '0')}]</span>
                <TypewriterParagraph 
                  text={item}
                  theme={theme}
                  typingEnabled={typingEnabled}
                  delay={i * 200}
                />
              </div>
            ))}
          </div>

          <div className={`p-6 ${theme.highlight} border-l-4 ${theme.borderAccent}`}>
            <TypewriterParagraph 
              text="Kami menulis bukan karena yakin. Tapi karena diam-diam tahu kalau tidak ditulis, hari ini akan hilang."
              theme={theme}
              typingEnabled={typingEnabled}
              className="leading-relaxed mb-4"
            />
            <TypewriterParagraph 
              text="Tulisan kami lahir dari tubuh yang ingin rebah tapi masih memaksa duduk."
              theme={theme}
              typingEnabled={typingEnabled}
              className="leading-relaxed"
            />
          </div>

          <p className={`mt-6 text-sm ${theme.textMuted} border-t ${theme.border} pt-4`}>
            Karena itu, ia tidak pandai meminta perhatian.
          </p>
        </section>

        {/* Tentang Karya */}
        <section id="tentang-karya" className="mb-24 scroll-mt-24">
          <div className={`mb-8 pb-4 border-b ${theme.border}`}>
            <span className={`text-[10px] uppercase tracking-widest ${theme.accent}`}>/// SECTION_02</span>
            <h2 className={`text-2xl font-bold ${theme.textHeading} mt-2`}>TENTANG KARYA</h2>
          </div>

          <div className={`p-6 ${theme.code} border-2 ${theme.border} relative overflow-hidden mb-8`}>
            <div className={`absolute top-0 right-0 px-2 py-1 text-[10px] ${theme.accentBg} ${theme.accent} border-l ${theme.border}`}>
              FILE: BEKAL.DINGIN
            </div>
            
            <TypewriterParagraph 
              text="Karya itu seperti bekal yang dimakan dingin di sela jam kerja."
              theme={theme}
              typingEnabled={typingEnabled}
              className="text-lg leading-relaxed mb-6 mt-4"
            />
            
            <div className={`space-y-2 text-sm ${theme.textMuted} mb-6`}>
              <p>Tidak mewah.</p>
              <p>Tidak istimewa.</p>
            </div>

            <TypewriterParagraph 
              text="Ia hanya ingin dibuka, meski hanya untuk memastikan bahwa ia belum basi."
              theme={theme}
              typingEnabled={typingEnabled}
              className="leading-relaxed"
            />
          </div>

          <div className={`p-4 ${theme.accentBg} border ${theme.borderAccent} text-sm`}>
            <p className={theme.accent}>
              Dan ketika tidak dibuka, ia tidak marah. Hanya diam lebih lama.
            </p>
          </div>

          <p className={`mt-6 text-sm ${theme.textMuted} italic text-center`}>
            Kadang, ketika dunia luar melewatinya begitu saja, rasanya masih bisa diterima.
          </p>
        </section>

        {/* Tentang Orang Terdekat */}
        <section id="orang-terdekat" className="mb-24 scroll-mt-24">
          <div className={`mb-8 pb-4 border-b ${theme.border}`}>
            <span className={`text-[10px] uppercase tracking-widest ${theme.accent}`}>/// SECTION_03</span>
            <h2 className={`text-2xl font-bold ${theme.textHeading} mt-2`}>TENTANG ORANG TERDEKAT</h2>
          </div>

          <TypewriterParagraph 
            text="Ada orang yang paling dekat. Yang melihat lelahku tanpa perlu aku jelaskan."
            theme={theme}
            typingEnabled={typingEnabled}
            className="leading-relaxed mb-8"
          />

          <div className={`py-12 text-center border-y-2 ${theme.border} my-8`}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <p className={`text-3xl md:text-4xl font-bold ${theme.textHeading} tracking-tight`}>
                BUKU ITU ADA.
              </p>
              <p className={`text-xs ${theme.accent} mt-4 tracking-[0.5em]`}>BERBULAN-BULAN.</p>
            </motion.div>
          </div>

          <TypewriterParagraph 
            text="Aku tidak pernah bertanya. Karena aku tahu, jawabannya akan lebih menyakitkan jika diucapkan."
            theme={theme}
            typingEnabled={typingEnabled}
            className="leading-relaxed mb-8"
          />

          <div className={`p-6 ${theme.highlight} border-l-4 ${theme.borderAccent}`}>
            <p className={`${theme.accent} italic mb-4`}>Kadang, yang paling sunyi bukan tidak dibaca,</p>
            <p className={`${theme.textHeading} text-lg`}>
              tapi disadari bahwa bahkan yang terdekat pun tidak sempat berhenti.
            </p>
          </div>

          <p className={`mt-8 text-sm ${theme.textMuted} border-t ${theme.border} pt-4`}>
            Kalau yang dekat saja tidak sempat, aku tidak tahu apa yang bisa kuharapkan dari dunia yang asing.
          </p>
        </section>

        {/* Tentang Dunia yang Sibuk */}
        <section id="dunia-sibuk" className="mb-24 scroll-mt-24">
          <div className={`mb-8 pb-4 border-b ${theme.border}`}>
            <span className={`text-[10px] uppercase tracking-widest ${theme.accent}`}>/// SECTION_04</span>
            <h2 className={`text-2xl font-bold ${theme.textHeading} mt-2`}>TENTANG DUNIA YANG SIBUK</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className={`p-6 ${theme.code} border ${theme.border}`}>
              <AlertCircle size={24} className={theme.accent} />
              <p className={`mt-4 text-lg ${theme.textHeading}`}>Dunia tidak kejam.</p>
              <p className={`mt-2 ${theme.text}`}>Ia hanya tidak berhenti.</p>
            </div>
            
            <div className={`p-6 ${theme.highlight} border ${theme.border}`}>
              <p className={`text-sm ${theme.textMuted} leading-relaxed`}>
                Dan yang tidak berhenti jarang sempat melihat apa yang lahir pelan.
              </p>
              <p className={`mt-4 text-sm ${theme.text}`}>
                Karya seperti ini tidak cocok dengan ritme itu.
              </p>
            </div>
          </div>

          <div className={`mt-6 p-4 border ${theme.border} ${theme.accentBg}`}>
            <p className={`${theme.accent} text-sm`}>
              Ia berdiri di pinggir, menyadari bahwa tidak semua yang dibuat dengan sungguh-sungguh akan diberi waktu.
            </p>
          </div>
        </section>

        {/* Tentang Bertahan Menulis */}
        <section id="bertahan-menulis" className="mb-24 scroll-mt-24">
          <div className={`mb-8 pb-4 border-b ${theme.border}`}>
            <span className={`text-[10px] uppercase tracking-widest ${theme.accent}`}>/// SECTION_05</span>
            <h2 className={`text-2xl font-bold ${theme.textHeading} mt-2`}>TENTANG BERTAHAN MENULIS</h2>
          </div>

          <TypewriterParagraph 
            text="Aku tetap menulis bukan karena yakin akan dibaca."
            theme={theme}
            typingEnabled={typingEnabled}
            className="text-xl leading-relaxed mb-6"
          />

          <div className={`p-8 ${theme.code} border-2 ${theme.borderAccent} relative`}>
            <div className={`absolute -top-3 left-4 px-2 ${theme.bg} text-xs ${theme.accent}`}>
              CORE_MEMORY
            </div>
            <TypewriterParagraph 
              text="Aku menulis karena jika tidak, hari-hari ini akan runtuh tanpa saksi."
              theme={theme}
              typingEnabled={typingEnabled}
              className="text-lg leading-relaxed"
            />
          </div>

          <div className={`mt-8 py-8 text-center border-y ${theme.border}`}>
            <p className={`${theme.textMuted} italic text-sm mb-2`}>Menulis adalah caraku mengatakan pada diri sendiri bahwa</p>
            <p className={`text-2xl ${theme.textHeading} font-bold`}>AKU PERNAH ADA</p>
            <p className={`${theme.accent} text-sm mt-2`}>DI HARI INI.</p>
          </div>

          <p className={`mt-8 text-right text-sm ${theme.textMuted} tracking-widest`}>
            MESKI LEWAT.
          </p>
        </section>

        {/* Penutup */}
        <section id="penutup" className="mb-24 scroll-mt-24">
          <div className={`mb-8 pb-4 border-b-2 ${theme.border}`}>
            <span className={`text-[10px] uppercase tracking-widest ${theme.accent}`}>/// END_OF_FILE</span>
            <h2 className={`text-2xl font-bold ${theme.textHeading} mt-2`}>PENUTUP: TETAP DITULIS</h2>
          </div>

          <div className={`space-y-6`}>
            <TypewriterParagraph 
              text="Buku ini tidak meminta perhatian. Ia juga tidak ingin dipahami."
              theme={theme}
              typingEnabled={typingEnabled}
              className="leading-relaxed"
            />
            
            <TypewriterParagraph 
              text="Ia hanya ingin jujur."
              theme={theme}
              typingEnabled={typingEnabled}
              className={`text-xl ${theme.textHeading} font-bold`}
            />

            <div className={`p-6 ${theme.highlight} border ${theme.border} my-8`}>
              <p className={`text-sm ${theme.textMuted} leading-relaxed`}>
                Dan jika suatu hari seseorang membacanya dalam keadaan lelah, dalam keadaan sepi,
              </p>
              <p className={`text-lg ${theme.accent} mt-4 font-bold`}>
                ITU SUDAH CUKUP.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className={`p-4 ${theme.code} border ${theme.border} text-center`}>
                <p className={`text-xs ${theme.textMuted}`}>IF_NOT_READ</p>
                <p className={`text-sm ${theme.text} mt-2`}>Tidak apa-apa.</p>
              </div>
              <div className={`p-4 ${theme.accentBg} border ${theme.borderAccent} text-center`}>
                <p className={`text-xs ${theme.accent}`}>FINAL_STATE</p>
                <p className={`text-sm ${theme.textHeading} mt-2 font-bold`}>Ia tetap ditulis.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer - Raw terminal style */}
        <footer className={`mt-20 pt-8 border-t-2 ${theme.border} text-xs ${theme.textMuted}`}>
          <div className="flex items-center justify-between">
            <span>FILE: KAMI_MENULIS_PELAN.TXT</span>
            <span>SIZE: 1,247_BYTES</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span>AUTHOR: UNKNOWN_WORKER</span>
            <span>STATUS: COMPLETE</span>
          </div>
          <div className={`mt-4 pt-4 border-t ${theme.border} text-center`}>
            <span className={theme.accent}>EOF_</span>
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
            className={`fixed bottom-4 right-4 z-50 p-3 ${theme.code} border ${theme.border} ${theme.accent} hover:${theme.accentBg} transition-colors`}
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Global Styles for animations */}
      <style jsx global>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .animate-scanline {
          animation: scanline 8s linear infinite;
        }
        .cursor-blink {
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// Typewriter Component
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  const { displayText, isComplete } = useTypewriter(
    text, 
    typingEnabled ? 30 : 0, 
    isVisible && typingEnabled
  );

  if (!typingEnabled) {
    return <p ref={ref} className={className}>{text}</p>;
  }

  return (
    <p ref={ref} className={className}>
      {isVisible ? displayText : ''}
      {!isComplete && isVisible && (
        <span className={`inline-block w-2 h-4 ml-1 ${theme.cursor} cursor-blink`} />
      )}
    </p>
  );
}
