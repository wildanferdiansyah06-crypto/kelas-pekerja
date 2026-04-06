'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useTheme } from "@/src/components/ThemeProvider";

export default function KamiMenulisPelanPage() {
  const { theme: globalTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [subtitleText, setSubtitleText] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [showGooglePopup, setShowGooglePopup] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  
  const fullSubtitle = "Buku-buku itu lahir diam-diam. Ditulis setelah kerja selesai. Alarm pagi belum sempat dilupakan. Layar ponsel masih perih di mata. Badan bau keringat. Kopi instan dingin di meja. Lalu aku mengirimkannya sebagai tautan, dan menunggu—bukan dengan harapan besar, cukup lama untuk tahu apakah ia akan berhenti atau lewat begitu saja.";

  // SECTIONS - pindah ke sini, sebelum isVisible dan useEffect
  const sections = useMemo(() => [
    { id: 'pembuka', title: 'Pembuka' },
    { id: 'sisa', title: 'Menulis dari Sisa' },
    { id: 'berhenti', title: 'Titik Berhenti' },
    { id: 'dekat', title: 'Yang Terdekat' },
    { id: 'dunia', title: 'Dunia yang Lewat' },
    { id: 'menulis', title: 'Mengapa Menulis' },
    { id: 'penutup', title: 'Penutup' }
  ], []);

  const isVisible = useCallback(
    (id: string) => visibleItems.has(id) || visibleItems.size === 0,
    [visibleItems]
  );

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setVisibleItems((prev) => {
              const newSet = new Set(prev);
              newSet.add(entry.target.id);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    setTimeout(() => {
      const elements = document.querySelectorAll('[data-reveal]');
      elements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const scrollPosition = scrollY + 200;
    sections.forEach((section, index) => {
      const element = document.getElementById(section.id);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(index);
        }
      }
    });
  }, [scrollY, mounted, sections]);

  useEffect(() => {
    if (!mounted) return;
    
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullSubtitle.length) {
        setSubtitleText(fullSubtitle.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 25);
    
    return () => clearInterval(timer);
  }, [mounted]);

  if (!mounted) return null;

  const darkMode = globalTheme === 'dark';

  const theme = {
    bg: darkMode ? "bg-[#0c0b0a]" : "bg-[#fafaf9]",
    bgGradient: darkMode 
      ? "bg-gradient-to-b from-[#0a0908] via-[#11100f] to-[#0a0908]" 
      : "bg-gradient-to-b from-[#fafaf9] via-[#f5f5f4] to-[#fafaf9]",
    text: darkMode ? "text-[#e7e5e4]" : "text-[#1c1917]",
    textMuted: darkMode ? "text-[#a8a29e]" : "text-[#78716c]",
    textSecondary: darkMode ? "text-[#d6d3d1]" : "text-[#57534e]",
    accent: darkMode ? "text-[#8b7355]" : "text-[#a16207]",
    accentMuted: darkMode ? "text-[#8b7355]/60" : "text-[#a16207]/60",
    accentLight: darkMode ? "text-[#8b7355]/40" : "text-[#a16207]/40",
    accentBorder: darkMode ? "border-[#8b7355]/30" : "border-[#a16207]/30",
    accentBg: darkMode ? "bg-[#8b7355]/10" : "bg-[#a16207]/10",
    accentBgHeavy: darkMode ? "bg-[#8b7355]/20" : "bg-[#a16207]/20",
    divider: darkMode ? "bg-[#8b7355]/20" : "bg-[#a16207]/20",
    subtleText: darkMode ? "text-[#57534e]" : "text-[#a8a29e]",
    emptyState: darkMode ? "text-[#44403c]" : "text-[#d6d3d1]",
    noise: darkMode ? "opacity-[0.04]" : "opacity-[0.02]",
    particle: darkMode ? "bg-[#8b7355]/30" : "bg-[#a16207]/20",
    popup: darkMode ? "bg-[#141210]/90 border-[#8b7355]/20" : "bg-white/90 border-[#a16207]/20",
    popupHover: darkMode ? "hover:bg-[#1c1917]/80" : "hover:bg-stone-50/80",
    radialGlow: darkMode 
      ? "radial-gradient(circle at 50% 0%, rgba(139, 115, 85, 0.08), transparent 50%)" 
      : "radial-gradient(circle at 50% 0%, rgba(161, 98, 7, 0.06), transparent 50%)"
  };

  const title = "Kami Menulis Pelan";
  const letters = title.split("");
  const backgroundOffset = scrollY * -0.08;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setShowGooglePopup(false);
  };

  const relatedArticles = [
    { 
      title: 'Di Balik Bar', 
      desc: 'Realita keras pekerja malam yang tak pernah tidur', 
      link: '/buku/di-balik-bar',
      readTime: '6 menit',
      mood: 'keras'
    },
    { 
      title: 'Di Atas Cangkir', 
      desc: 'Refleksi di ujung lidah sebelum kopi dingin', 
      link: '/buku/di-atas-cangkir-yang-sama',
      readTime: '5 menit',
      mood: 'filosofis'
    },
    { 
      title: 'Di Ujung Shift', 
      desc: 'Catatan dari yang tersisa di penghujung hari', 
      link: '/cerita/di-ujung-shift',
      readTime: '4 menit',
      mood: 'lelah'
    }
  ];

  return (
    <div ref={mainRef} className={`min-h-screen ${theme.bg} ${theme.text} relative overflow-hidden transition-colors duration-500`}>
      
      {/* BACKGROUND LAYERS - Depth System */}
      
      {/* Layer 1: Base Gradient */}
      <div className={`absolute inset-0 ${theme.bgGradient} pointer-events-none`} />
      
      {/* Layer 2: Radial Glow */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{ 
          background: theme.radialGlow,
          opacity: Math.max(0, 1 - scrollY / 800)
        }} 
      />
      
      {/* Layer 3: Section-based depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className={`absolute w-full h-[800px] transition-opacity duration-1000 ${darkMode ? 'bg-[#8b7355]/[0.02]' : 'bg-[#a16207]/[0.015]'}`}
          style={{ 
            top: '1800px',
            opacity: scrollY > 1500 && scrollY < 2800 ? 1 : 0 
          }}
        />
      </div>

      {/* Layer 4: Noise Texture */}
      <div className={`absolute inset-0 ${theme.noise} pointer-events-none mix-blend-overlay`} style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px'
      }} />

      {/* Layer 5: Vignette */}
      <div 
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          background: darkMode 
            ? 'radial-gradient(circle at center, transparent 0%, rgba(10, 9, 8, 0.4) 100%)' 
            : 'radial-gradient(circle at center, transparent 0%, rgba(250, 250, 249, 0.3) 100%)',
          boxShadow: darkMode 
            ? 'inset 0 0 150px rgba(0,0,0,0.5)' 
            : 'inset 0 0 150px rgba(0,0,0,0.03)'
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-[2]" style={{ transform: `translateY(${backgroundOffset}px)` }}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${theme.particle} animate-float`}
            style={{
              left: `${10 + i * 14}%`,
              top: `${15 + (i % 4) * 22}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${7 + i * 0.6}s`,
              opacity: 0.3 + (i % 3) * 0.2
            }}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className={`fixed top-0 left-0 right-0 h-[2px] z-50 ${darkMode ? 'bg-[#1c1917]' : 'bg-[#e7e5e4]'}`}>
        <div 
          className={`h-full ${darkMode ? 'bg-[#8b7355]' : 'bg-[#a16207]'} transition-all duration-300 relative`}
          style={{ 
            width: `${Math.min(100, (scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100)}%`,
            boxShadow: darkMode ? '0 0 10px rgba(139, 115, 85, 0.5)' : 'none'
          }} 
        />
      </div>

      {/* HERO SECTION */}
      <section id="pembuka" className="relative z-10 min-h-[90vh] flex flex-col justify-center items-center px-6 pt-24 pb-12">
        <div 
          className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px] pointer-events-none transition-opacity duration-1000 ${darkMode ? 'bg-[#8b7355]/10' : 'bg-[#a16207]/8'}`}
        />
        
        <div className="max-w-3xl mx-auto text-center animate-fade-in relative z-10">
          
          {/* Label Suasana */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className={`text-[10px] tracking-[0.2em] uppercase ${theme.accentMuted}`}>
              Refleksi
            </span>
            <span className={theme.accentMuted}>•</span>
            <span className={`text-[10px] tracking-[0.2em] uppercase ${theme.accentMuted}`}>
              Tulisan Pelan
            </span>
            <span className={theme.accentMuted}>•</span>
            <span className={`text-[10px] tracking-[0.2em] uppercase ${theme.accentMuted}`}>
              8 menit baca
            </span>
          </div>

          {/* Top Line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className={`h-px ${darkMode ? 'bg-gradient-to-r from-transparent via-[#8b7355]/40 to-transparent' : 'bg-gradient-to-r from-transparent via-[#a16207]/40 to-transparent'} w-16 animate-expand`} />
            <span className={`text-[10px] tracking-[0.5em] uppercase ${theme.accentMuted} animate-fade-in-delayed`}>
              Arsip Pribadi
            </span>
            <div className={`h-px ${darkMode ? 'bg-gradient-to-r from-transparent via-[#8b7355]/40 to-transparent' : 'bg-gradient-to-r from-transparent via-[#a16207]/40 to-transparent'} w-16 animate-expand`} />
          </div>

          {/* Subtitle */}
          <p className={`font-serif italic ${theme.accent} text-xl mb-6 opacity-80 animate-fade-up`}>
            sebuah pengakuan
          </p>

          {/* Main Title */}
          <div className="overflow-hidden mb-8">
            <h1 
              className={`font-serif text-4xl md:text-6xl lg:text-7xl ${theme.text} flex justify-center flex-wrap`}
              style={{
                textShadow: darkMode ? '0 2px 20px rgba(139, 115, 85, 0.15)' : 'none'
              }}
            >
              {letters.map((letter, i) => (
                <span
                  key={i}
                  className={`inline-block ${letter === " " ? "w-3 md:w-4" : ""} animate-letter-drop`}
                  style={{ animationDelay: `${0.5 + i * 0.08}s` }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </h1>
          </div>

          {/* Typewriter Subtitle */}
          <div className="max-w-2xl mx-auto mt-8 px-4 animate-fade-in-delayed-2">
            <p className={`text-sm md:text-base leading-[1.9] ${theme.textMuted} font-light tracking-wide`}>
              {subtitleText}
              <span className={`inline-block w-[2px] h-[1.2em] ${darkMode ? 'bg-[#8b7355]' : 'bg-[#a16207]'} ml-1 align-middle animate-blink`} />
            </p>
          </div>

          {/* Kalimat Nusuk */}
          <div className="mt-12 max-w-xl mx-auto animate-fade-in-delayed-2">
            <div 
              className={`p-6 ${theme.accentBg} ${theme.accentBorder} border-l-4 backdrop-blur-sm relative overflow-hidden`}
              style={{
                borderLeftColor: darkMode ? 'rgba(139, 115, 85, 0.6)' : 'rgba(161, 98, 7, 0.6)'
              }}
            >
              <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-r from-[#8b7355]/5 to-transparent' : 'bg-gradient-to-r from-[#a16207]/5 to-transparent'}`} />
              <span className={`absolute -top-3 -left-2 text-4xl ${theme.accent} opacity-20`}>❝</span>
              <p className={`text-lg md:text-xl leading-[1.8] ${theme.text} font-serif italic text-left pl-4 relative z-10`}>
                Kadang kita berhenti nulis… bukan karena gak punya kata.
                <br/>
                <span className={theme.accent}>Tapi karena takut gak ada yang peduli.</span>
              </p>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 animate-bounce-slow">
            <div className={`w-6 h-10 rounded-full border-2 ${theme.accentBorder} flex justify-center pt-2 mx-auto backdrop-blur-sm`}>
              <div className={`w-1 h-2 rounded-full ${darkMode ? 'bg-[#8b7355]' : 'bg-[#a16207]'} animate-scroll-down`} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className={`relative z-10 max-w-3xl mx-auto px-6 pb-32 ${theme.text}`}>
        
        {/* Section: Menulis dari Sisa */}
        <section id="sisa" className="mb-24 scroll-mt-24">
          <div data-reveal="sisa-header" id="sisa-header" className={`flex items-center gap-4 mb-12 pb-4 border-b ${theme.accentBorder} transition-all duration-1000 ${isVisible('sisa-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className={`text-5xl font-serif ${theme.accentLight}`}>01</span>
            <div>
              <h2 className={`text-2xl md:text-3xl font-serif ${theme.text}`}>Menulis dari Sisa</h2>
              <p className={`text-sm ${theme.accentMuted} italic`}>Catatan dari tubuh yang lelah</p>
            </div>
          </div>

          <div data-reveal="sisa-open" id="sisa-open" className={`mb-12 transition-all duration-1000 delay-100 ${isVisible('sisa-open') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className={`text-base md:text-lg leading-[2.2] ${theme.textSecondary} font-light text-justify`}>
              <span className={`float-left text-6xl md:text-7xl font-serif ${theme.accent} mr-4 mt-2 leading-none`}>
                B
              </span>
              adan bau keringat. Layar ponsel masih perih di mata. Alarm pagi belum sempat dilupakan. Kopi instan dingin di meja, sudah kehilangan uapnya sejak jam yang lalu. Aku mengirimkannya sebagai tautan—kadang hanya satu kalimat, kadang tanpa pesan apa-apa.
            </p>
          </div>

          <div className="space-y-8">
            <p data-reveal="sisa-1" id="sisa-1" className={`text-base md:text-lg leading-[2.2] ${theme.textMuted} font-light text-justify transition-all duration-1000 ${isVisible('sisa-1') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Kelas pekerja menulis dari sisa. Sisa tenaga yang tidak cukup untuk tidur nyenyak. Sisa waktu yang tidak dimiliki siapa-siapa. Sisa pikiran yang belum habis dipakai bekerja. Kami menulis bukan karena yakin, tapi karena diam-diam tahu: kalau tidak ditulis, hari ini akan hilang.
            </p>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-14">
              {[
                { id: 'sisa-card-1', title: 'Sisa tenaga.', desc: 'Yang tidak cukup untuk tidur nyenyak' },
                { id: 'sisa-card-2', title: 'Sisa waktu.', desc: 'Yang tidak dimiliki siapa-siapa' },
                { id: 'sisa-card-3', title: 'Sisa pikiran.', desc: 'Yang belum habis dipakai bekerja' }
              ].map((item, i) => (
                <div 
                  key={item.id}
                  data-reveal={item.id}
                  id={item.id}
                  className={`p-6 ${theme.accentBg} ${theme.accentBorder} border text-center transition-all duration-500 hover:${theme.accentBgHeavy} hover:scale-[1.02] ${isVisible(item.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ 
                    transitionDelay: `${i * 150}ms`,
                    boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.05)'
                  }}
                >
                  <p className={`font-serif italic ${theme.accent} text-lg mb-2`}>{item.title}</p>
                  <p className={`text-xs ${theme.textMuted}`}>{item.desc}</p>
                </div>
              ))}
            </div>

            <p data-reveal="sisa-2" id="sisa-2" className={`text-base md:text-lg leading-[2.2] ${theme.textMuted} font-light text-justify transition-all duration-1000 ${isVisible('sisa-2') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Tulisan kami lahir dari tubuh yang ingin rebah tapi masih memaksa duduk. Karena itu, ia tidak pandai meminta perhatian. Ia hanya diam, menunggu, dan kadang—ketika dunia luar melewatinya begitu saja—rasanya masih bisa diterima.
            </p>
          </div>
        </section>

        {/* Section: Titik Berhenti */}
        <section id="berhenti" className="mb-24 scroll-mt-24 relative">
          <div className={`absolute -inset-x-8 -inset-y-4 ${darkMode ? 'bg-[#8b7355]/[0.02]' : 'bg-[#a16207]/[0.015]'} rounded-2xl -z-10`} />
          
          <div data-reveal="berhenti-header" id="berhenti-header" className={`flex items-center gap-4 mb-12 pb-4 border-b ${theme.accentBorder} transition-all duration-1000 ${isVisible('berhenti-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className={`text-5xl font-serif ${theme.accentLight}`}>02</span>
            <div>
              <h2 className={`text-2xl md:text-3xl font-serif ${theme.text}`}>Titik Berhenti</h2>
              <p className={`text-sm ${theme.accentMuted} italic`}>Ketika diam lebih mudah</p>
            </div>
          </div>

          <div className="space-y-8">
            <div 
              data-reveal="berhenti-punch" 
              id="berhenti-punch" 
              className={`my-16 py-12 px-8 ${darkMode ? 'bg-[#141210]' : 'bg-white'} ${theme.accentBorder} border transition-all duration-1000 ${isVisible('berhenti-punch') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{
                boxShadow: darkMode 
                  ? '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(139, 115, 85, 0.1)' 
                  : '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(161, 98, 7, 0.1)'
              }}
            >
              <p className={`font-serif text-2xl md:text-3xl ${theme.text} italic leading-[1.8] text-center mb-6`}>
                "Kita berhenti bukan karena lelah menulis."
              </p>
              <p className={`font-serif text-xl md:text-2xl ${theme.accent} italic leading-[1.8] text-center`}>
                "Kita berhenti karena lelah berharap."
              </p>
              <div className={`w-24 h-px ${theme.divider} mx-auto mt-8`} />
            </div>

            <p data-reveal="berhenti-1" id="berhenti-1" className={`text-base md:text-lg leading-[2.2] ${theme.textMuted} font-light text-justify transition-all duration-1000 ${isVisible('berhenti-1') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Ada malam-malam di mana draft sudah terbuka tapi jari tidak bergerak. Bukan karena tidak ada yang mau dikatakan. Tapi karena pertanyaan itu muncul lagi: untuk siapa? Kalau yang terdekat saja tidak membaca, kenapa masih menulis?
            </p>

            <p data-reveal="berhenti-2" id="berhenti-2" className={`text-base md:text-lg leading-[2.2] ${theme.textMuted} font-light text-justify transition-all duration-1000 ${isVisible('berhenti-2') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Titik berhenti bukan saat pena kering. Titik berhenti adalah saat kita mulai menghitung: berapa lama lagi sampai ada yang peduli? Dan jawabannya terlalu sering: mungkin tidak pernah.
            </p>

            <div 
              data-reveal="berhenti-quote" 
              id="berhenti-quote" 
              className={`my-16 pl-8 border-l-4 transition-all duration-1000 ${isVisible('berhenti-quote') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
              style={{
                borderLeftColor: darkMode ? 'rgba(139, 115, 85, 0.5)' : 'rgba(161, 98, 7, 0.5)',
                boxShadow: darkMode ? '-4px 0 20px rgba(139, 115, 85, 0.1)' : 'none'
              }}
            >
              <blockquote className={`font-serif text-xl md:text-2xl ${theme.text} leading-[1.7] italic`}>
                &ldquo;Paling sakit bukan saat tulisan gak dibaca.
                <br/>
                <span className={theme.accent}>Paling sakit saat kita berhenti nulis… dan ternyata gak ada yang nyadar.&rdquo;</span>
              </blockquote>
            </div>

            <p data-reveal="berhenti-3" id="berhenti-3" className={`text-base md:text-lg leading-[2.2] ${theme.textSecondary} font-light text-justify italic transition-all duration-1000 ${isVisible('berhenti-3') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Tapi di situlah letaknya. Di titik paling rendah, di saat berhenti tampak seperti pilihan paling masuk akal—kita justru menemukan alasan paling jujur untuk lanjut: bukan untuk dibaca, tapi untuk tidak mati dalam diam.
            </p>
          </div>
        </section>

        {/* Section: Yang Terdekat */}
        <section id="dekat" className="mb-24 scroll-mt-24">
          <div data-reveal="dekat-header" id="dekat-header" className={`flex items-center gap-4 mb-12 pb-4 border-b ${theme.accentBorder} transition-all duration-1000 ${isVisible('dekat-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className={`text-5xl font-serif ${theme.accentLight}`}>03</span>
            <div>
              <h2 className={`text-2xl md:text-3xl font-serif ${theme.text}`}>Yang Terdekat</h2>
              <p className={`text-sm ${theme.accentMuted} italic`}>Tentang mereka yang melihat tapi tidak berhenti</p>
            </div>
          </div>

          <div className="space-y-8">
            <p data-reveal="dekat-1" id="dekat-1" className={`text-base md:text-lg leading-[2.2] ${theme.textMuted} font-light text-justify transition-all duration-1000 ${isVisible('dekat-1') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Ada orang yang paling dekat. Yang melihat lelahku tanpa perlu aku jelaskan. Buku itu ada di sana, berbulan-bulan. Aku tidak pernah bertanya. Karena aku tahu, jawabannya akan lebih menyakitkan jika diucapkan.
            </p>

            <div 
              data-reveal="dekat-poetic" 
              id="dekat-poetic" 
              className={`my-16 py-12 px-8 ${theme.accentBg} ${theme.accentBorder} border text-center transition-all duration-1000 ${isVisible('dekat-poetic') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{
                background: darkMode 
                  ? 'linear-gradient(135deg, rgba(139, 115, 85, 0.08) 0%, rgba(139, 115, 85, 0.02) 100%)' 
                  : 'linear-gradient(135deg, rgba(161, 98, 7, 0.06) 0%, rgba(161, 98, 7, 0.02) 100%)'
              }}
            >
              <p className={`font-serif text-2xl md:text-3xl ${theme.textSecondary} italic leading-[1.8]`}>
                Kadang, yang paling sunyi bukan tidak dibaca, tapi disadari bahwa bahkan yang terdekat pun tidak sempat berhenti.
              </p>
            </div>

            <p data-reveal="dekat-2" id="dekat-2" className={`text-base md:text-lg leading-[2.2] ${theme.textMuted} font-light text-justify transition-all duration-1000 ${isVisible('dekat-2') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Mereka yang paling mengenalmu adalah mereka yang paling tahu bagaimana mengabaikanmu tanpa terlihat kejam. Mereka melihat tautan itu, mungkin bahkan mengkliknya, tapi tidak pernah memberi tahu. Dan diam-diam, kau berterima kasih atas kebijaksanaan mereka—karena keheningan itu lebih ringan daripada penolakan.
            </p>
          </div>
        </section>

        {/* Section: Dunia yang Lewat */}
        <section id="dunia" className="mb-24 scroll-mt-24">
          <div data-reveal="dunia-header" id="dunia-header" className={`flex items-center gap-4 mb-12 pb-4 border-b ${theme.accentBorder} transition-all duration-1000 ${isVisible('dunia-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className={`text-5xl font-serif ${theme.accentLight}`}>04</span>
            <div>
              <h2 className={`text-2xl md:text-3xl font-serif ${theme.text}`}>Dunia yang Lewat</h2>
              <p className={`text-sm ${theme.accentMuted} italic`}>Tentang ketidakberhentian dan ketidaklihatan</p>
            </div>
          </div>

          <div className="space-y-8">
            <p data-reveal="dunia-1" id="dunia-1" className={`text-base md:text-lg leading-[2.2] ${theme.textMuted} font-light text-justify transition-all duration-1000 ${isVisible('dunia-1') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Kalau yang dekat saja tidak sempat, aku tidak tahu apa yang bisa kuharapkan dari dunia yang asing. Dunia tidak kejam. Ia hanya tidak berhenti. Dan yang tidak berhenti jarang sempat melihat apa yang lahir pelan.
            </p>

            <div 
              data-reveal="dunia-highlight" 
              id="dunia-highlight" 
              className={`my-12 py-8 px-6 ${theme.accentBgHeavy} ${theme.accentBorder} border text-center transition-all duration-1000 ${isVisible('dunia-highlight') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{
                boxShadow: darkMode 
                  ? 'inset 0 1px 0 rgba(139, 115, 85, 0.2), 0 4px 20px rgba(0,0,0,0.2)' 
                  : 'inset 0 1px 0 rgba(161, 98, 7, 0.2), 0 4px 20px rgba(0,0,0,0.05)'
              }}
            >
              <p className={`font-serif text-2xl md:text-3xl ${theme.text} font-medium leading-[1.6]`}>
                "Menulis pelan itu gak masalah.
                <br/>
                <span className={theme.accent}>Yang bahaya itu berhenti."</span>
              </p>
            </div>

            <p data-reveal="dunia-2" id="dunia-2" className={`text-base md:text-lg leading-[2.2] ${theme.textMuted} font-light text-justify transition-all duration-1000 ${isVisible('dunia-2') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Algoritma tidak mengenal lelah. Feed terus bergulir, notifikasi terus berdering, konten terus lahir dan mati dalam hitungan detik. Di tengah laju itu, sebuah tulisan yang lahir dari kopi dingin dan mata lelah adalah hal yang paling tidak relevan—dan karena itu, paling jujur.
            </p>

            <p data-reveal="dunia-3" id="dunia-3" className={`text-base md:text-lg leading-[2.2] ${theme.textSecondary} font-light text-justify italic transition-all duration-1000 ${isVisible('dunia-3') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Mungkin ini bukan tentang dunia yang salah. Mungkin ini tentang kita yang memilih untuk tetap menulis, meski tahu dunia sedang tidak sempat membaca.
            </p>
          </div>
        </section>

        {/* Section: Mengapa Menulis */}
        <section id="menulis" className="mb-24 scroll-mt-24">
          <div data-reveal="menulis-header" id="menulis-header" className={`flex items-center gap-4 mb-12 pb-4 border-b ${theme.accentBorder} transition-all duration-1000 ${isVisible('menulis-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className={`text-5xl font-serif ${theme.accentLight}`}>05</span>
            <div>
              <h2 className={`text-2xl md:text-3xl font-serif ${theme.text}`}>Mengapa Menulis</h2>
              <p className={`text-sm ${theme.accentMuted} italic`}>Manifesto dari yang menulis pelan</p>
            </div>
          </div>

          <div 
            data-reveal="menulis-highlight" 
            id="menulis-highlight" 
            className={`mb-12 p-8 md:p-10 ${theme.accentBg} ${theme.accentBorder} border transition-all duration-1000 ${isVisible('menulis-highlight') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            style={{
              background: darkMode 
                ? 'linear-gradient(to bottom, rgba(139, 115, 85, 0.1), rgba(139, 115, 85, 0.05))' 
                : 'linear-gradient(to bottom, rgba(161, 98, 7, 0.08), rgba(161, 98, 7, 0.04))'
            }}
          >
            <p className={`text-lg md:text-xl leading-[2] ${theme.text} font-light text-center italic`}>
              Aku tetap menulis bukan karena yakin akan dibaca. Aku menulis karena jika tidak, hari-hari ini akan runtuh tanpa saksi.
            </p>
          </div>

          <div className="space-y-8">
            <p data-reveal="menulis-1" id="menulis-1" className={`text-base md:text-lg leading-[2.2] ${theme.textMuted} font-light text-justify transition-all duration-1000 ${isVisible('menulis-1') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Ada yang menulis untuk mengubah dunia. Ada yang menulis untuk mengubah orang. Aku menulis untuk mengubah satu hal saja: kesadaran diri sendiri bahwa aku masih hidup.
            </p>

            <div data-reveal="menulis-quote" id="menulis-quote" className={`my-16 text-center transition-all duration-1000 ${isVisible('menulis-quote') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div 
                className={`inline-block p-8 ${theme.accentBg} ${theme.accentBorder} border`}
                style={{
                  boxShadow: darkMode 
                    ? '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(139, 115, 85, 0.2)' 
                    : '0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(161, 98, 7, 0.2)'
                }}
              >
                <p className={`font-serif text-2xl md:text-3xl ${theme.accent} italic leading-[1.7]`}>
                  &ldquo;Gak semua tulisan harus cepat.
                  <br/>
                  Tapi semua tulisan harus jujur.&rdquo;
                </p>
              </div>
            </div>

            <p data-reveal="menulis-2" id="menulis-2" className={`text-base md:text-lg leading-[2.2] ${theme.textMuted} font-light text-justify transition-all duration-1000 ${isVisible('menulis-2') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Menulis adalah bentuk terendah hati dari pemberontakan. Pemberontakan melawan lupa. Melawan hilang. Melawan suara-suara yang bilang "tidak ada yang peduli" dengan cara yang paling sederhana: tetap menulis, meski tidak ada yang peduli.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div data-reveal="divider-main" id="divider-main" className={`flex items-center justify-center gap-4 py-16 transition-all duration-1000 ${isVisible('divider-main') ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          <div className={`h-px ${theme.divider} w-32 animate-expand`} />
          <div className={`w-3 h-3 border ${theme.accentBorder} rotate-45 animate-spin-slow`} />
          <div className={`h-px ${theme.divider} w-32 animate-expand`} />
        </div>

        {/* Section: Penutup */}
        <section id="penutup" className="mb-24 scroll-mt-24">
          <div data-reveal="penutup-header" id="penutup-header" className={`flex items-center justify-between mb-12 pb-4 border-b ${theme.accentBgHeavy} transition-all duration-1000 ${isVisible('penutup-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className={`font-serif italic text-2xl md:text-3xl ${theme.text}`}>Penutup</h3>
            <span className={`text-[10px] tracking-[0.3em] uppercase ${theme.accentMuted}`}>Akhir</span>
          </div>

          <div className="space-y-10">
            <p data-reveal="penutup-1" id="penutup-1" className={`text-lg md:text-xl leading-[2.2] ${theme.textMuted} font-light text-center transition-all duration-1000 ${isVisible('penutup-1') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Buku ini tidak meminta perhatian. Ia juga tidak ingin dipahami. Ia hanya ingin jujur.
            </p>

            <p data-reveal="penutup-2" id="penutup-2" className={`text-lg md:text-xl leading-[2.2] ${theme.textSecondary} font-light text-center italic px-4 md:px-12 transition-all duration-1000 ${isVisible('penutup-2') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Dan jika suatu hari seseorang membacanya dalam keadaan lelah, dalam keadaan sepi, dalam keadaan tidak yakin akan apa-apa—itu sudah cukup.
            </p>

            <div 
              data-reveal="penutup-final" 
              id="penutup-final" 
              className={`py-16 px-8 ${theme.accentBg} ${theme.accentBorder} border text-center transition-all duration-1000 ${isVisible('penutup-final') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{
                background: darkMode 
                  ? 'linear-gradient(135deg, rgba(139, 115, 85, 0.12) 0%, rgba(139, 115, 85, 0.04) 100%)' 
                  : 'linear-gradient(135deg, rgba(161, 98, 7, 0.1) 0%, rgba(161, 98, 7, 0.04) 100%)',
                boxShadow: darkMode 
                  ? '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(139, 115, 85, 0.3)' 
                  : '0 8px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(161, 98, 7, 0.3)'
              }}
            >
              <p className={`font-serif text-2xl md:text-3xl ${theme.text} italic leading-[1.6] mb-6`}>
                "Kalau hari ini lo cuma bisa nulis satu kalimat…
                <br/>
                <span className={theme.accent}>itu juga udah cukup."</span>
              </p>
              <div className={`w-16 h-px ${theme.divider} mx-auto`} />
              <p className={`mt-6 text-sm ${theme.textMuted} tracking-[0.2em] uppercase`}>
                Ia tetap ditulis. Meski lewat begitu saja.
              </p>
            </div>
          </div>
        </section>

        {/* Closing Statement */}
        <section data-reveal="closing-kuat" id="closing-kuat" className={`mb-20 py-16 text-center transition-all duration-1000 ${isVisible('closing-kuat') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className={`w-20 h-px ${theme.divider} mx-auto mb-10`} />
          <p className={`font-serif text-3xl md:text-4xl ${theme.text} font-medium leading-[1.5] mb-6`}>
            Gak apa-apa pelan.
          </p>
          <p className={`font-serif text-2xl md:text-3xl ${theme.accent} italic leading-[1.5]`}>
            Yang penting lo gak berhenti.
          </p>
          <div className={`w-20 h-px ${theme.divider} mx-auto mt-10`} />
        </section>

        {/* Related Articles */}
        <section className="mt-32 mb-24">
          <div data-reveal="lain-header" id="lain-header" className={`mb-12 transition-all duration-1000 ${isVisible('lain-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🌿</span>
              <h3 className={`font-serif italic text-2xl md:text-3xl ${theme.text}`}>Tulisan Lain untuk Lo yang Lagi Pelan</h3>
            </div>
            <p className={`text-sm ${theme.textMuted} ml-9`}>
              Karena setiap perasaan butuh tempat tersendiri
            </p>
          </div>

          <div data-reveal="lain-content" id="lain-content" className={`space-y-4 transition-all duration-1000 ${isVisible('lain-content') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {relatedArticles.map((article, i) => (
              <a 
                key={i}
                href={article.link}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group flex items-center gap-6 p-6 ${theme.accentBg} ${theme.accentBorder} border transition-all duration-500 hover:${theme.accentBgHeavy} relative overflow-hidden`}
                style={{
                  boxShadow: darkMode 
                    ? '0 4px 20px rgba(0,0,0,0.2)' 
                    : '0 4px 20px rgba(0,0,0,0.05)'
                }}
              >
                <div 
                  className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-500 ${hoveredCard === i ? 'opacity-100' : 'opacity-0'}`}
                  style={{ backgroundColor: darkMode ? 'rgba(139, 115, 85, 0.6)' : 'rgba(161, 98, 7, 0.6)' }}
                />
                
                <span 
                  className={`text-4xl font-serif ${theme.accentLight} transition-all duration-300 ${hoveredCard === i ? 'scale-110 ' + theme.accent : ''}`}
                  style={{
                    textShadow: hoveredCard === i && darkMode ? '0 0 20px rgba(139, 115, 85, 0.3)' : 'none'
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className={`font-serif text-xl ${theme.text} group-hover:${theme.accent} transition-colors duration-300`}>
                      {article.title}
                    </h4>
                    <span 
                      className={`text-[10px] px-2 py-1 rounded-full uppercase tracking-wider transition-all duration-300 ${hoveredCard === i ? theme.accentBg + ' ' + theme.accent : theme.accentBg + ' ' + theme.accentMuted}`}
                    >
                      {article.mood}
                    </span>
                  </div>
                  <p className={`text-sm ${theme.textMuted} leading-relaxed`}>{article.desc}</p>
                </div>
                
                <div className="text-right hidden md:block">
                  <span className={`text-xs ${theme.textMuted} block mb-1`}>{article.readTime}</span>
                  <svg 
                    className={`w-5 h-5 ${theme.accent} transition-all duration-300 ${hoveredCard === i ? 'translate-x-1' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </a>
            ))}
          </div>

          <div data-reveal="lain-footer" id="lain-footer" className={`mt-8 text-center transition-all duration-1000 ${isVisible('lain-footer') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className={`text-sm ${theme.textMuted} italic`}>
              "Setiap tulisan punya waktunya sendiri. Yang penting, kita tetap menulis."
            </p>
          </div>
        </section>

        {/* CTA FINAL */}
        <section data-reveal="cta-section" id="cta-section" className={`mb-32 transition-all duration-1000 ${isVisible('cta-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className={`h-px ${theme.divider} w-24`} />
            <div 
              className={`w-2 h-2 rounded-full ${theme.accentBorder} border transition-all duration-500`}
              style={{
                backgroundColor: darkMode ? 'rgba(139, 115, 85, 0.3)' : 'rgba(161, 98, 7, 0.3)',
                boxShadow: darkMode ? '0 0 10px rgba(139, 115, 85, 0.3)' : 'none'
              }}
            />
            <div className={`h-px ${theme.divider} w-24`} />
          </div>

          <div 
            className={`relative p-8 md:p-12 ${theme.accentBg} ${theme.accentBorder} border`}
            style={{
              background: darkMode 
                ? 'linear-gradient(135deg, rgba(20, 18, 16, 0.8) 0%, rgba(28, 25, 23, 0.6) 100%)' 
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(250, 250, 249, 0.8) 100%)',
              backdropFilter: 'blur(10px)',
              boxShadow: darkMode 
                ? '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(139, 115, 85, 0.2)' 
                : '0 8px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(161, 98, 7, 0.2)'
            }}
          >
            <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 ${theme.accentBorder}`} />
            <div className={`absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 ${theme.accentBorder}`} />
            <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 ${theme.accentBorder}`} />
            <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 ${theme.accentBorder}`} />

            <div className="text-center max-w-2xl mx-auto">
              <div className="mb-6">
                <span className="text-4xl">✍️</span>
              </div>

              <blockquote className={`font-serif text-xl md:text-2xl ${theme.text} italic leading-[1.8] mb-8`}>
                "Kalau lo lagi ngerasain hal yang sama…
                <br/>
                <span className={theme.accent}>tulis aja. Pelan-pelan juga gak apa-apa.</span>
                <br/>
                Gak perlu sempurna.
                <br/>
                <span className={theme.accent}>Yang penting, jujur.</span>"
              </blockquote>

              <div className={`w-16 h-px ${theme.divider} mx-auto mb-8`} />

              <a 
                href="/tulis"
                className={`inline-flex items-center gap-3 px-8 py-4 transition-all duration-500 hover:scale-105 group relative overflow-hidden`}
                style={{
                  backgroundColor: darkMode ? '#8b7355' : '#a16207',
                  boxShadow: darkMode 
                    ? '0 4px 20px rgba(139, 115, 85, 0.3), 0 8px 30px rgba(0,0,0,0.3)' 
                    : '0 4px 20px rgba(161, 98, 7, 0.2), 0 8px 30px rgba(0,0,0,0.1)'
                }}
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: darkMode 
                      ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' 
                      : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                  }}
                />
                <span className="relative z-10 text-white font-medium">Mulai Nulis</span>
                <svg 
                  className="w-4 h-4 text-white relative z-10 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </a>

              <p className={`mt-6 text-sm ${theme.textMuted} italic`}>
                Gak ada yang bakal nilai. Gak ada yang bakal judge.
                <br/>
                Ini cuma buat lo. Dan mungkin, buat yang butuh dengar.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-12">
            <div className={`h-px ${theme.divider} w-16`} />
            <span className={`text-[10px] tracking-[0.3em] uppercase ${theme.accentMuted}`}>Dari sisa, untuk sisa</span>
            <div className={`h-px ${theme.divider} w-16`} />
          </div>
        </section>

        {/* Quote Footer */}
        <div data-reveal="footer-quote" id="footer-quote" className={`mt-32 text-center transition-all duration-1000 ${isVisible('footer-quote') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className={`w-16 h-px ${theme.divider} mx-auto mb-10 animate-expand`} />
          <p className={`font-serif italic text-lg md:text-xl ${theme.accentMuted} max-w-2xl mx-auto leading-[1.9] mb-6`}>
            &ldquo;Meski lewat begitu saja, setidaknya aku pernah mencoba mengingatkan bahwa aku ada. Bahwa di antara deru mesin dan hiruk pikuk hari, ada seseorang yang mencoba mengingat.&rdquo;
          </p>
          <p className={`text-[10px] tracking-[0.3em] uppercase ${theme.subtleText}`}>
            — Dari yang menulis pelan, untuk yang membaca pelan
          </p>
        </div>

        {/* Final Footer */}
        <div data-reveal="footer-final" id="footer-final" className={`mt-32 text-center pb-24 transition-all duration-1000 ${isVisible('footer-final') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div 
            className={`absolute left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full blur-[100px] pointer-events-none -z-10 ${darkMode ? 'bg-[#8b7355]/5' : 'bg-[#a16207]/5'}`}
          />
          
          <p 
            className={`font-serif italic ${theme.accentMuted} text-sm md:text-base leading-[1.8] animate-pulse`}
            style={{
              textShadow: darkMode ? '0 2px 10px rgba(139, 115, 85, 0.1)' : 'none'
            }}
          >
            Ditulis setelah kerja selesai,<br />
            di malam yang tidak yakin ingin dihabiskan,<br />
            oleh tubuh yang ingin rebah tapi masih memaksa duduk.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-4">
            <div className={`h-px ${theme.accentBgHeavy} w-12`}></div>
            <span className={`text-[10px] tracking-[0.4em] uppercase ${theme.emptyState}`}>Akhir dari arsip</span>
            <div className={`h-px ${theme.accentBgHeavy} w-12`}></div>
          </div>

          <p className={`mt-8 text-[10px] ${theme.subtleText} tracking-wider`}>
            {new Date().getFullYear()} • Dari yang menulis pelan
          </p>
        </div>
      </div>

      {/* Navigation Popup */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setShowGooglePopup(!showGooglePopup)}
          className={`flex items-center gap-3 px-5 py-3 rounded-full border shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105`}
          style={{
            backgroundColor: darkMode ? 'rgba(20, 18, 16, 0.9)' : 'rgba(255, 255, 255, 0.9)',
            borderColor: darkMode ? 'rgba(139, 115, 85, 0.2)' : 'rgba(161, 98, 7, 0.2)',
            boxShadow: darkMode 
              ? '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(139, 115, 85, 0.1)' 
              : '0 8px 32px rgba(0,0,0,0.1), 0 0 0 1px rgba(161, 98, 7, 0.1)'
          }}
        >
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300`}
            style={{ backgroundColor: darkMode ? 'rgba(139, 115, 85, 0.15)' : 'rgba(161, 98, 7, 0.15)' }}
          >
            <svg className={`w-4 h-4 ${theme.accent}`} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
          <span className={`text-sm font-medium ${theme.text}`}>Menu</span>
          <div 
            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${theme.accent}`}
            style={{ backgroundColor: darkMode ? 'rgba(139, 115, 85, 0.2)' : 'rgba(161, 98, 7, 0.2)' }}
          >
            {activeSection + 1}
          </div>
        </button>

        {showGooglePopup && (
          <div 
            className={`absolute bottom-full left-0 mb-3 w-72 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden animate-popup-up border`}
            style={{
              backgroundColor: darkMode ? 'rgba(20, 18, 16, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              borderColor: darkMode ? 'rgba(139, 115, 85, 0.2)' : 'rgba(161, 98, 7, 0.2)',
              boxShadow: darkMode 
                ? '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(139, 115, 85, 0.1)' 
                : '0 8px 32px rgba(0,0,0,0.15), 0 0 0 1px rgba(161, 98, 7, 0.1)'
            }}
          >
            <div className={`p-4 border-b flex items-center justify-between`} style={{ borderColor: darkMode ? 'rgba(139, 115, 85, 0.2)' : 'rgba(161, 98, 7, 0.2)' }}>
              <span className={`text-xs tracking-[0.2em] uppercase ${theme.accentMuted} font-semibold`}>Navigasi</span>
              <button 
                onClick={() => setShowGooglePopup(false)}
                className={`p-1 rounded-full transition-colors`}
                style={{ backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
              >
                <svg className={`w-4 h-4 ${theme.textMuted}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-2">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 ${
                    activeSection === index 
                      ? theme.accentBg + ' ' + theme.accent 
                      : theme.popupHover + ' ' + theme.textMuted
                  }`}
                >
                  <span className={`text-xs font-mono w-6 ${activeSection === index ? theme.accent : theme.textMuted}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={`text-sm ${activeSection === index ? 'font-medium' : ''}`}>
                    {section.title}
                  </span>
                  {activeSection === index && (
                    <div 
                      className={`ml-auto w-1.5 h-1.5 rounded-full`}
                      style={{ backgroundColor: darkMode ? '#8b7355' : '#a16207' }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className={`p-3 border-t`} style={{ borderColor: darkMode ? 'rgba(139, 115, 85, 0.2)' : 'rgba(161, 98, 7, 0.2)' }}>
              <button
                onClick={toggleTheme}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors`}
                style={{ backgroundColor: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)' }}
              >
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center`}
                  style={{ backgroundColor: darkMode ? 'rgba(139, 115, 85, 0.15)' : 'rgba(161, 98, 7, 0.15)' }}
                >
                  {darkMode ? (
                    <svg className={`w-4 h-4 ${theme.accent}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className={`w-4 h-4 ${theme.accent}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </div>
                <span className={`text-sm ${theme.text}`}>
                  {darkMode ? 'Mode Terang' : 'Mode Gelap'}
                </span>
                <span className={`ml-auto text-xs ${theme.accentMuted}`}>
                  {darkMode ? '☀️' : '🌙'}
                </span>
              </button>
            </div>

                        <div className={`px-4 py-3 border-t bg-opacity-50`} style={{ borderColor: darkMode ? 'rgba(139, 115, 85, 0.2)' : 'rgba(161, 98, 7, 0.2)' }}>
              <div className={`h-1 rounded-full overflow-hidden`} style={{ backgroundColor: darkMode ? 'rgba(28, 25, 23, 0.5)' : 'rgba(231, 229, 228, 0.5)' }}>
                <div 
                  className={`h-full transition-all duration-300`}
                  style={{ 
                    width: `${((activeSection + 1) / sections.length) * 100}%`,
                    backgroundColor: darkMode ? '#8b7355' : '#a16207',
                    boxShadow: darkMode ? '0 0 10px rgba(139, 115, 85, 0.5)' : 'none'
                  }} 
                />
              </div>
              <p className={`text-[10px] ${theme.textMuted} mt-2 text-center`}>
                Bagian {activeSection + 1} dari {sections.length}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); opacity: 0.1; }
          50% { transform: translateY(-30px); opacity: 0.3; }
        }
        
        @keyframes expand {
          from { transform: scaleX(0); opacity: 0; }
          to { transform: scaleX(1); opacity: 1; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 0.8; transform: translateY(0); }
        }
        
        @keyframes letterDrop {
          from { opacity: 0; transform: translateY(100px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes spinSlow {
          from { transform: rotate(45deg); }
          to { transform: rotate(405deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        
        @keyframes scrollDown {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }
        
        @keyframes popupUp {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        .animate-float {
          animation: float ease-in-out infinite;
        }
        
        .animate-expand {
          animation: expand 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease forwards;
        }
        
        .animate-fade-in-delayed {
          opacity: 0;
          animation: fadeIn 1s ease 0.8s forwards;
        }
        
        .animate-fade-in-delayed-2 {
          opacity: 0;
          animation: fadeIn 1s ease 1.5s forwards;
        }
        
        .animate-fade-up {
          opacity: 0;
          animation: fadeUp 1s ease 0.3s forwards;
        }
        
        .animate-letter-drop {
          opacity: 0;
          animation: letterDrop 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        
        .animate-blink {
          animation: blink 0.8s infinite;
        }
        
        .animate-spin-slow {
          animation: spinSlow 8s linear infinite;
        }
        
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounceSlow 2s ease-in-out infinite;
        }
        
        .animate-scroll-down {
          animation: scrollDown 1.5s ease-in-out infinite;
        }
        
        .animate-popup-up {
          animation: popupUp 0.3s ease-out forwards;
        }
        
        .scroll-mt-24 {
          scroll-margin-top: 6rem;
        }
      `}</style>
    </div>
  );
}
