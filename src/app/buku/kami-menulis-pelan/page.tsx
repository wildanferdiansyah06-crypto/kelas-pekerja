'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from "@/src/components/ThemeProvider";

export default function LewatBegituSajaPage() {
  const { theme: globalTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [subtitleText, setSubtitleText] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [showGooglePopup, setShowGooglePopup] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const mainRef = useRef<HTMLDivElement>(null);
  
  const fullSubtitle = "Buku-buku itu lahir diam-diam. Ditulis setelah kerja selesai. Alarm pagi belum sempat dilupakan. Layar ponsel masih perih di mata. Badan bau keringat. Kopi instan dingin di meja. Lalu aku mengirimkannya sebagai tautan, dan menunggu—bukan dengan harapan besar, cukup lama untuk tahu apakah ia akan berhenti atau lewat begitu saja.";

  const sections = [
    { id: 'pembuka', title: 'Pembuka' },
    { id: 'sisa', title: 'Menulis dari Sisa' },
    { id: 'dekat', title: 'Yang Terdekat' },
    { id: 'dunia', title: 'Dunia yang Lewat' },
    { id: 'menulis', title: 'Mengapa Menulis' },
    { id: 'penutup', title: 'Penutup' }
  ];

  // Memoize the check function
  const isVisible = useCallback((id: string) => visibleItems.has(id), [visibleItems]);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    // Intersection Observer for scroll reveal
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

    // Observe all elements with data-reveal
    setTimeout(() => {
  const elements = document.querySelectorAll('[data-reveal]');
  elements.forEach((el) => observer.observe(el));
}, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Update active section based on scroll
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
    bg: darkMode ? "bg-[#0a0908]" : "bg-[#fafaf9]",
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
    noise: darkMode ? "opacity-[0.03]" : "opacity-[0.02]",
    particle: darkMode ? "bg-[#8b7355]/30" : "bg-[#a16207]/20",
    popup: darkMode ? "bg-[#141210] border-[#8b7355]/20" : "bg-white border-[#a16207]/20",
    popupHover: darkMode ? "hover:bg-[#1c1917]" : "hover:bg-stone-50"
  };

  const title = "Lewat Begitu Saja";
  const letters = title.split("");
  const backgroundOffset = scrollY * -0.08;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setShowGooglePopup(false);
  };

  return (
    <div ref={mainRef} className={`min-h-screen ${theme.bg} ${theme.text} relative overflow-hidden transition-colors duration-500`}>
      
      {/* Noise Texture */}
      <div className={`absolute inset-0 ${theme.noise} pointer-events-none`} style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
      }} />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none" style={{ transform: `translateY(${backgroundOffset}px)` }}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${theme.particle} animate-float`}
            style={{
              left: `${10 + i * 14}%`,
              top: `${15 + (i % 4) * 22}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${7 + i * 0.6}s`
            }}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className={`fixed top-0 left-0 right-0 h-[2px] z-50 ${darkMode ? 'bg-[#1c1917]' : 'bg-[#e7e5e4]'}`}>
        <div 
          className={`h-full ${darkMode ? 'bg-[#8b7355]' : 'bg-[#a16207]'} transition-all duration-300`} 
          style={{ width: `${Math.min(100, (scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100)}%` }}
        />
      </div>

      {/* Hero Section */}
      <section id="pembuka" className="relative z-10 min-h-[90vh] flex flex-col justify-center items-center px-6 pt-24 pb-12">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          
          {/* Top Line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className={`h-px ${darkMode ? 'bg-[#8b7355]/30' : 'bg-[#a16207]/30'} w-16 animate-expand`} />
            <span className={`text-[10px] tracking-[0.5em] uppercase ${theme.accentMuted} animate-fade-in-delayed`}>
              Arsip Pribadi
            </span>
            <div className={`h-px ${darkMode ? 'bg-[#8b7355]/30' : 'bg-[#a16207]/30'} w-16 animate-expand`} />
          </div>

          {/* Subtitle */}
          <p className={`font-serif italic ${theme.accent} text-xl mb-6 opacity-80 animate-fade-up`}>
            sebuah pengakuan
          </p>

          {/* Main Title */}
          <div className="overflow-hidden mb-8">
            <h1 className={`font-serif text-4xl md:text-6xl lg:text-7xl ${theme.text} flex justify-center flex-wrap`}>
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

          {/* Scroll Indicator */}
          <div className="mt-16 animate-bounce-slow">
            <div className={`w-6 h-10 rounded-full border-2 ${theme.accentBorder} flex justify-center pt-2 mx-auto`}>
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

          {/* Opening Paragraph */}
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

            {/* Three Cards */}
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
                  className={`p-6 ${theme.accentBg} ${theme.accentBorder} border text-center transition-all duration-1000 hover:${theme.accentBgHeavy} ${isVisible(item.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <p className={`font-serif italic ${theme.accent} text-lg mb-2`}>{item.title}</p>
                  <p className={`text-xs ${theme.textMuted}`}>{item.desc}</p>
                </div>
              ))}
            </div>

            <p data-reveal="sisa-2" id="sisa-2" className={`text-base md:text-lg leading-[2.2] ${theme.textMuted} font-light text-justify transition-all duration-1000 ${isVisible('sisa-2') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Tulisan kami lahir dari tubuh yang ingin rebah tapi masih memaksa duduk. Karena itu, ia tidak pandai meminta perhatian. Ia hanya diam, menunggu, dan kadang—ketika dunia luar melewatinya begitu saja—rasanya masih bisa diterima.
            </p>

            {/* Quote Block */}
            <div data-reveal="sisa-quote" id="sisa-quote" className={`my-16 pl-8 border-l-2 ${theme.accentBorder} transition-all duration-1000 ${isVisible('sisa-quote') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <blockquote className={`font-serif italic text-xl md:text-2xl ${theme.accent} leading-[1.7]`}>
                &ldquo;Karya itu seperti bekal yang dimakan dingin di sela jam kerja. Tidak mewah. Tidak istimewa. Ia hanya ingin dibuka, meski hanya untuk memastikan bahwa ia belum basi.&rdquo;
              </blockquote>
              <p className={`mt-4 text-sm ${theme.textMuted} italic`}>— dari catatan sela jam istirahat</p>
            </div>

            <p data-reveal="sisa-3" id="sisa-3" className={`text-base md:text-lg leading-[2.2] ${theme.textMuted} font-light text-justify transition-all duration-1000 ${isVisible('sisa-3') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Ada yang menulis di toilet kantor, menyelinap lima menit dari meja. Ada yang menulis di bus yang macet, di antara ketiak orang asing dan bau knalpot. Ada yang menulis setelah anak tidur, di tengah keheningan yang hanya diisi suara kipas angin. Kami menulis dari celah-celah waktu yang seharusnya tidak ada.
            </p>
          </div>
        </section>

        {/* Section: Yang Terdekat */}
        <section id="dekat" className="mb-24 scroll-mt-24">
          <div data-reveal="dekat-header" id="dekat-header" className={`flex items-center gap-4 mb-12 pb-4 border-b ${theme.accentBorder} transition-all duration-1000 ${isVisible('dekat-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className={`text-5xl font-serif ${theme.accentLight}`}>02</span>
            <div>
              <h2 className={`text-2xl md:text-3xl font-serif ${theme.text}`}>Yang Terdekat</h2>
              <p className={`text-sm ${theme.accentMuted} italic`}>Tentang mereka yang melihat tapi tidak berhenti</p>
            </div>
          </div>

          <div className="space-y-8">
            <p data-reveal="dekat-1" id="dekat-1" className={`text-base md:text-lg leading-[2.2] ${theme.textMuted} font-light text-justify transition-all duration-1000 ${isVisible('dekat-1') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Ada orang yang paling dekat. Yang melihat lelahku tanpa perlu aku jelaskan. Buku itu ada di sana, berbulan-bulan. Aku tidak pernah bertanya. Karena aku tahu, jawabannya akan lebih menyakitkan jika diucapkan.
            </p>

            {/* Poetic Centerpiece */}
            <div data-reveal="dekat-poetic" id="dekat-poetic" className={`my-16 py-12 px-8 ${theme.accentBg} ${theme.accentBorder} border text-center transition-all duration-1000 ${isVisible('dekat-poetic') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <p className={`font-serif text-2xl md:text-3xl ${theme.textSecondary} italic leading-[1.8]`}>
                Kadang, yang paling sunyi bukan tidak dibaca, tapi disadari bahwa bahkan yang terdekat pun tidak sempat berhenti.
              </p>
            </div>

            <p data-reveal="dekat-2" id="dekat-2" className={`text-base md:text-lg leading-[2.2] ${theme.textMuted} font-light text-justify transition-all duration-1000 ${isVisible('dekat-2') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Mereka yang paling mengenalmu adalah mereka yang paling tahu bagaimana mengabaikanmu tanpa terlihat kejam. Mereka melihat tautan itu, mungkin bahkan mengkliknya, tapi tidak pernah memberi tahu. Dan diam-diam, kau berterima kasih atas kebijaksanaan mereka—karena keheningan itu lebih ringan daripada penolakan.
            </p>

            <p data-reveal="dekat-3" id="dekat-3" className={`text-base md:text-lg leading-[2.2] ${theme.textMuted} font-light text-justify transition-all duration-1000 ${isVisible('dekat-3') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Aku tidak menyalahkan siapa-siapa. Dunia ini berputar terlalu cepat untuk berhenti membaca tulisan seseorang yang sedang lelah. Yang terdekat pun punya lelahnya sendiri, punya tautan-tautan yang mereka kirim dan tidak dibalas, punya buku-buku yang mereka tulis dan tidak dibaca.
            </p>

            {/* Nested Quote */}
            <div data-reveal="dekat-quote" id="dekat-quote" className={`my-14 pl-6 border-l ${theme.accentBorder} transition-all duration-1000 ${isVisible('dekat-quote') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <p className={`text-base md:text-lg leading-[2] ${theme.textSecondary} italic`}>
                &ldquo;Yang paling dekat adalah yang paling tahu cara melukai tanpa terlihat melukai. Bukan karena mereka jahat, tapi karena mereka dekat—dan jarak nol adalah jarak yang paling sulit untuk dilihat.&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* Section: Dunia yang Lewat */}
        <section id="dunia" className="mb-24 scroll-mt-24">
          <div data-reveal="dunia-header" id="dunia-header" className={`flex items-center gap-4 mb-12 pb-4 border-b ${theme.accentBorder} transition-all duration-1000 ${isVisible('dunia-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className={`text-5xl font-serif ${theme.accentLight}`}>03</span>
            <div>
              <h2 className={`text-2xl md:text-3xl font-serif ${theme.text}`}>Dunia yang Lewat</h2>
              <p className={`text-sm ${theme.accentMuted} italic`}>Tentang ketidakberhentian dan ketidaklihatan</p>
            </div>
          </div>

          <div className="space-y-8">
            <p data-reveal="dunia-1" id="dunia-1" className={`text-base md:text-lg leading-[2.2] ${theme.textMuted} font-light text-justify transition-all duration-1000 ${isVisible('dunia-1') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Kalau yang dekat saja tidak sempat, aku tidak tahu apa yang bisa kuharapkan dari dunia yang asing. Dunia tidak kejam. Ia hanya tidak berhenti. Dan yang tidak berhenti jarang sempat melihat apa yang lahir pelan.
            </p>

            <p data-reveal="dunia-2" id="dunia-2" className={`text-base md:text-lg leading-[2.2] ${theme.textMuted} font-light text-justify transition-all duration-1000 ${isVisible('dunia-2') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Algoritma tidak mengenal lelah. Feed terus bergulir, notifikasi terus berdering, konten terus lahir dan mati dalam hitungan detik. Di tengah laju itu, sebuah tulisan yang lahir dari kopi dingin dan mata lelah adalah hal yang paling tidak relevan—dan karena itu, paling jujur.
            </p>

            {/* Contrast Box */}
            <div data-reveal="dunia-box" id="dunia-box" className={`my-14 p-8 ${darkMode ? 'bg-[#141210]' : 'bg-white'} ${theme.accentBorder} border transition-all duration-1000 ${isVisible('dunia-box') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-start gap-6">
                <div className={`text-4xl ${theme.accent}`}>⚡</div>
                <div>
                  <h4 className={`font-serif text-xl ${theme.text} mb-3`}>Perbandingan Kecepatan</h4>
                  <div className="space-y-2 text-sm md:text-base">
                    <p className={theme.textMuted}>Video viral: <span className={theme.text}>3 detik untuk menarik perhatian</span></p>
                    <p className={theme.textMuted}>Tweet: <span className={theme.text}>280 karakter, umur 15 menit</span></p>
                    <p className={theme.textMuted}>Tulisan ini: <span className={theme.accent}>Lahir dalam 3 jam, dibaca dalam 7 menit, dilupakan dalam... mungkin tidak pernah diingat</span></p>
                  </div>
                </div>
              </div>
            </div>

            <p data-reveal="dunia-3" id="dunia-3" className={`text-base md:text-lg leading-[2.2] ${theme.textMuted} font-light text-justify transition-all duration-1000 ${isVisible('dunia-3') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Aku tidak protes. Aku hanya mencatat. Mencatat bahwa ada yang hilang di antara kecepatan dan keterlibatan. Bahwa sesuatu yang lahir pelan seringkali mati tanpa suara, bukan karena tidak berharga, tapi karena dunia sedang tidak sempat berhenti.
            </p>

            <p data-reveal="dunia-4" id="dunia-4" className={`text-base md:text-lg leading-[2.2] ${theme.textSecondary} font-light text-justify italic transition-all duration-1000 ${isVisible('dunia-4') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Mungkin ini bukan tentang dunia yang salah. Mungkin ini tentang kita yang memilih untuk tetap menulis, meski tahu dunia sedang tidak sempat membaca.
            </p>
          </div>
        </section>

        {/* Section: Mengapa Menulis */}
        <section id="menulis" className="mb-24 scroll-mt-24">
          <div data-reveal="menulis-header" id="menulis-header" className={`flex items-center gap-4 mb-12 pb-4 border-b ${theme.accentBorder} transition-all duration-1000 ${isVisible('menulis-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className={`text-5xl font-serif ${theme.accentLight}`}>04</span>
            <div>
              <h2 className={`text-2xl md:text-3xl font-serif ${theme.text}`}>Mengapa Menulis</h2>
              <p className={`text-sm ${theme.accentMuted} italic`}>Manifesto dari yang menulis pelan</p>
            </div>
          </div>

          {/* Highlight Box */}
          <div data-reveal="menulis-highlight" id="menulis-highlight" className={`mb-12 p-8 md:p-10 ${theme.accentBg} ${theme.accentBorder} border transition-all duration-1000 ${isVisible('menulis-highlight') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <p className={`text-lg md:text-xl leading-[2] ${theme.text} font-light text-center italic`}>
              Aku tetap menulis bukan karena yakin akan dibaca. Aku menulis karena jika tidak, hari-hari ini akan runtuh tanpa saksi. Menulis adalah caraku mengatakan pada diri sendiri bahwa aku pernah ada di hari ini.
            </p>
          </div>

          <div className="space-y-8">
            <p data-reveal="menulis-1" id="menulis-1" className={`text-base md:text-lg leading-[2.2] ${theme.textMuted} font-light text-justify transition-all duration-1000 ${isVisible('menulis-1') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Ada yang menulis untuk mengubah dunia. Ada yang menulis untuk mengubah orang. Aku menulis untuk mengubah satu hal saja: kesadaran diri sendiri bahwa aku masih hidup. Bahwa di antara bangun dan tidur, ada sesuatu yang terjadi. Bahwa di antara kerja dan lelah, ada sesuatu yang dirasakan.
            </p>

            {/* Numbered List */}
            <div className="my-14 space-y-6">
              {[
                { id: 'menulis-reason-1', text: 'Untuk mengingat bahwa aku pernah merasa sesuatu hari ini' },
                { id: 'menulis-reason-2', text: 'Untuk memberi bentuk pada kekacauan yang tidak bisa kuceritakan pada siapa-siapa' },
                { id: 'menulis-reason-3', text: 'Untuk membuktikan bahwa sisa-sisa waktu itu tidak sia-sia' },
                { id: 'menulis-reason-4', text: 'Untuk, mungkin suatu hari, dibaca oleh seseorang yang juga sedang lelah dan merasa sendiri' }
              ].map((reason, i) => (
                <div 
                  key={reason.id}
                  data-reveal={reason.id}
                  id={reason.id}
                  className={`flex gap-4 transition-all duration-1000 ${isVisible(reason.id) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <span className={`text-2xl font-serif ${theme.accent} w-8`}>{i + 1}</span>
                  <p className={`text-base md:text-lg leading-[1.9] ${theme.textSecondary} font-light`}>{reason.text}</p>
                </div>
              ))}
            </div>

            <p data-reveal="menulis-2" id="menulis-2" className={`text-base md:text-lg leading-[2.2] ${theme.textMuted} font-light text-justify transition-all duration-1000 ${isVisible('menulis-2') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Menulis adalah bentuk terendah hati dari pemberontakan. Pemberontakan melawan lupa. Melawan hilang. Melawan suara-suara yang bilang "tidak ada yang peduli" dengan cara yang paling sederhana: tetap menulis, meski tidak ada yang peduli.
            </p>

            {/* Final Quote of Section */}
            <div data-reveal="menulis-quote" id="menulis-quote" className={`my-16 text-center transition-all duration-1000 ${isVisible('menulis-quote') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className={`font-serif text-2xl md:text-3xl ${theme.accent} italic leading-[1.7]`}>
                &ldquo;Setiap tulisan adalah bukti eksistensi. Bukan eksistensi yang penting, tapi eksistensi yang pernah ada.&rdquo;
              </p>
            </div>
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
              Dan jika suatu hari seseorang membacanya dalam keadaan lelah, dalam keadaan sepi, dalam keadaan tidak yakin akan apa-apa—itu sudah cukup. Jika tidak, tidak apa-apa.
            </p>

            {/* Big Final Statement */}
            <div data-reveal="penutup-final" id="penutup-final" className={`py-16 px-8 ${theme.accentBg} ${theme.accentBorder} border text-center transition-all duration-1000 ${isVisible('penutup-final') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <p className={`font-serif text-3xl md:text-4xl ${theme.accent} italic leading-[1.6]`}>
                Ia tetap ditulis.
              </p>
              <p className={`mt-6 text-sm ${theme.textMuted} tracking-[0.2em] uppercase`}>
                Meski lewat begitu saja
              </p>
            </div>
          </div>
        </section>

        {/* Tulisan Lain */}
        <section className="mt-32 mb-24">
          <div data-reveal="lain-header" id="lain-header" className={`flex items-center justify-between mb-12 pb-4 border-b ${theme.accentBgHeavy} transition-all duration-1000 ${isVisible('lain-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className={`font-serif italic text-xl md:text-2xl ${theme.text}`}>Tulisan-tulisan Lain</h3>
            <span className={`text-[10px] tracking-[0.3em] uppercase ${theme.accentMuted}`}>Segera</span>
          </div>

          <div data-reveal="lain-content" id="lain-content" className={`text-center py-20 transition-all duration-1000 ${isVisible('lain-content') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className={`font-serif italic text-xl ${theme.accentMuted} mb-4 animate-pulse`}>
              Keheningan yang menunggu
            </p>
            <p className={`text-base ${theme.emptyState} mb-2`}>Belum ada kata yang berani keluar.</p>
            <p className={`text-sm ${theme.subtleText} italic`}>Mungkin besok. Mungkin tidak.</p>
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
          <p className={`font-serif italic ${theme.accentMuted} text-sm md:text-base leading-[1.8] animate-pulse`}>
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

      {/* Google Popup - Bottom Left */}
      <div className="fixed bottom-6 left-6 z-50">
        {/* Toggle Button */}
        <button
          onClick={() => setShowGooglePopup(!showGooglePopup)}
          className={`flex items-center gap-3 px-5 py-3 rounded-full ${theme.popup} border shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105`}
        >
          <div className={`w-8 h-8 rounded-full ${theme.accentBg} flex items-center justify-center`}>
            <svg className={`w-4 h-4 ${theme.accent}`} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
          <span className={`text-sm font-medium ${theme.text}`}>Menu</span>
          <div className={`w-5 h-5 rounded-full ${theme.accentBg} flex items-center justify-center text-[10px] ${theme.accent} font-bold`}>
            {activeSection + 1}
          </div>
        </button>

        {/* Popup Menu */}
        {showGooglePopup && (
          <div className={`absolute bottom-full left-0 mb-3 w-72 ${theme.popup} border rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden animate-popup-up`}>
            {/* Header */}
            <div className={`p-4 border-b ${theme.accentBorder} flex items-center justify-between`}>
              <span className={`text-xs tracking-[0.2em] uppercase ${theme.accentMuted} font-semibold`}>Navigasi</span>
              <button 
                onClick={() => setShowGooglePopup(false)}
                className={`p-1 rounded-full ${theme.popupHover} transition-colors`}
              >
                <svg className={`w-4 h-4 ${theme.textMuted}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Section List */}
            <div className="p-2">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 ${
                    activeSection === index 
                      ? `${theme.accentBg} ${theme.accent}` 
                      : `${theme.popupHover} ${theme.textMuted}`
                  }`}
                >
                  <span className={`text-xs font-mono w-6 ${activeSection === index ? theme.accent : theme.textMuted}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={`text-sm ${activeSection === index ? 'font-medium' : ''}`}>
                    {section.title}
                  </span>
                  {activeSection === index && (
                    <div className={`ml-auto w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-[#8b7355]' : 'bg-[#a16207]'}`} />
                  )}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <div className={`p-3 border-t ${theme.accentBorder}`}>
              <button
                onClick={toggleTheme}
                className={`w-full flex items-center gap-3 p-3 rounded-xl ${theme.popupHover} transition-colors`}
              >
                <div className={`w-8 h-8 rounded-full ${theme.accentBg} flex items-center justify-center`}>
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

            {/* Progress */}
            <div className={`px-4 py-3 border-t ${theme.accentBorder} bg-opacity-50`}>
              <div className={`h-1 ${darkMode ? 'bg-[#1c1917]' : 'bg-[#e7e5e4]'} rounded-full overflow-hidden`}>
                <div 
                  className={`h-full ${darkMode ? 'bg-[#8b7355]' : 'bg-[#a16207]'} transition-all duration-300`} 
                  style={{ width: `${((activeSection + 1) / sections.length) * 100}%` }}
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
