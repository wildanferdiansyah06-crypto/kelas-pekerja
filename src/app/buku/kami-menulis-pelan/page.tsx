'use client';

import { useState, useEffect } from 'react';

export default function LewatBegituSajaPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [subtitleText, setSubtitleText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  const fullSubtitle = "Buku-buku itu lahir diam-diam. Ditulis setelah kerja selesai. Alarm pagi belum sempat dilupakan. Layar ponsel masih perih di mata. Badan bau keringat. Kopi instan dingin di meja. Lalu aku mengirimkannya sebagai tautan, dan menunggu—bukan dengan harapan besar, cukup lama untuk tahu apakah ia akan berhenti atau lewat begitu saja.";

  useEffect(() => {
    // Theme detection
    const html = document.documentElement;
    setDarkMode(html.classList.contains('dark'));
    
    const observer = new MutationObserver(() => {
      setDarkMode(html.classList.contains('dark'));
    });
    
    observer.observe(html, { attributes: true, attributeFilter: ['class'] });
    
    // Scroll handler
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial animations
    setTimeout(() => setIsVisible(true), 100);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!isVisible) return;
    
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
  }, [isVisible]);

  const theme = {
    bg: darkMode ? "bg-[#0a0908]" : "bg-[#fafaf9]",
    text: darkMode ? "text-[#e7e5e4]" : "text-[#1c1917]",
    textMuted: darkMode ? "text-[#a8a29e]" : "text-[#78716c]",
    textSecondary: darkMode ? "text-[#d6d3d1]" : "text-[#57534e]",
    accent: darkMode ? "text-[#8b7355]" : "text-[#a16207]",
    accentMuted: darkMode ? "text-[#8b7355]/60" : "text-[#a16207]/60",
    accentBorder: darkMode ? "border-[#8b7355]/30" : "border-[#a16207]/30",
    accentBg: darkMode ? "bg-[#8b7355]/10" : "bg-[#a16207]/10",
    divider: darkMode ? "bg-[#8b7355]/20" : "bg-[#a16207]/20",
    subtleText: darkMode ? "text-[#57534e]" : "text-[#a8a29e]",
    emptyState: darkMode ? "text-[#57534e]" : "text-[#a8a29e]",
    noise: darkMode ? "opacity-[0.03]" : "opacity-[0.02]",
    particle: darkMode ? "bg-[#8b7355]/30" : "bg-[#a16207]/20"
  };

  const title = "Lewat Begitu Saja";
  const letters = title.split("");

  // Parallax calculation
  const backgroundOffset = scrollY * -0.15;

  if (!isVisible) {
    return <div className="min-h-screen bg-[#0a0908]" />;
  }

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} relative overflow-hidden transition-colors duration-500`}>
      
      {/* Noise Texture */}
      <div className={`absolute inset-0 ${theme.noise} pointer-events-none`} style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
      }} />

      {/* Floating Particles with CSS Animation */}
      <div className="absolute inset-0 pointer-events-none" style={{ transform: `translateY(${backgroundOffset}px)` }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${theme.particle} animate-float`}
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${6 + i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="relative z-10 min-h-[90vh] flex flex-col justify-center items-center px-6 pt-24 pb-12">
        <div className={`max-w-3xl mx-auto text-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          
          {/* Top Line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className={`h-px ${darkMode ? 'bg-[#8b7355]/30' : 'bg-[#a16207]/30'} w-16 origin-right animate-expand`} />
            <span className={`text-[10px] tracking-[0.5em] uppercase ${theme.accentMuted} animate-fade-in`} style={{ animationDelay: '0.8s' }}>
              Arsip Pribadi
            </span>
            <div className={`h-px ${darkMode ? 'bg-[#8b7355]/30' : 'bg-[#a16207]/30'} w-16 origin-left animate-expand`} />
          </div>

          {/* Subtitle */}
          <p className={`font-serif italic ${theme.accent} text-xl mb-6 opacity-80 animate-fade-up`} style={{ animationDelay: '0.3s' }}>
            sebuah pengakuan
          </p>

          {/* Main Title - Letter by letter animation */}
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
          <div className="max-w-2xl mx-auto mt-8 px-4 animate-fade-in" style={{ animationDelay: '1.5s' }}>
            <p className={`text-sm md:text-base leading-[1.8] ${theme.textMuted} font-light`}>
              {subtitleText}
              <span className={`inline-block w-[2px] h-[1.2em] ${darkMode ? 'bg-[#8b7355]' : 'bg-[#a16207]'} ml-1 align-middle animate-blink`} />
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`relative z-10 max-w-3xl mx-auto px-6 pb-32 ${theme.text}`}>
        
        {/* Opening Paragraph with Drop Cap */}
        <div className="mb-12 scroll-fade-up">
          <p className={`text-base md:text-lg leading-[2] ${theme.textSecondary} font-light text-justify`}>
            <span className={`float-left text-6xl md:text-7xl font-serif ${theme.accent} mr-4 mt-2 leading-none animate-scale-in`}>
              B
            </span>
            adan bau keringat. Layar ponsel masih perih di mata. Alarm pagi belum sempat dilupakan. Kopi instan dingin di meja, sudah kehilangan uapnya sejak jam yang lalu. Aku mengirimkannya sebagai tautan—kadang hanya satu kalimat, kadang tanpa pesan apa-apa.
          </p>
        </div>

        {/* Body Content */}
        <div className="space-y-8">
          <p className={`text-base md:text-lg leading-[2] ${theme.textMuted} font-light text-justify scroll-fade-up`}>
            Kelas pekerja menulis dari sisa. Sisa tenaga yang tidak cukup untuk tidur nyenyak. Sisa waktu yang tidak dimiliki siapa-siapa. Sisa pikiran yang belum habis dipakai bekerja. Kami menulis bukan karena yakin, tapi karena diam-diam tahu: kalau tidak ditulis, hari ini akan hilang.
          </p>

          {/* Three Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-12">
            {['Sisa tenaga.', 'Sisa waktu.', 'Sisa pikiran.'].map((item, i) => (
              <div 
                key={i}
                className={`p-6 ${theme.accentBg} ${theme.accentBorder} border text-center scroll-fade-up`}
                style={{ transitionDelay: `${i * 0.2}s` }}
              >
                <p className={`font-serif italic ${theme.accent} text-sm md:text-base`}>{item}</p>
              </div>
            ))}
          </div>

          <p className={`text-base md:text-lg leading-[2] ${theme.textMuted} font-light text-justify scroll-fade-up`}>
            Tulisan kami lahir dari tubuh yang ingin rebah tapi masih memaksa duduk. Karena itu, ia tidak pandai meminta perhatian. Ia hanya diam, menunggu, dan kadang—ketika dunia luar melewatinya begitu saja—rasanya masih bisa diterima.
          </p>
        </div>

        {/* Quote Block */}
        <div className={`my-16 pl-6 border-l-2 ${theme.accentBorder} scroll-fade-up`}>
          <blockquote className={`font-serif italic text-lg md:text-xl ${theme.accent} leading-[1.6]`}>
            &ldquo;Karya itu seperti bekal yang dimakan dingin di sela jam kerja. Tidak mewah. Tidak istimewa. Ia hanya ingin dibuka, meski hanya untuk memastikan bahwa ia belum basi.&rdquo;
          </blockquote>
        </div>

        {/* More Content */}
        <div className="space-y-8">
          <p className={`text-base md:text-lg leading-[2] ${theme.textMuted} font-light text-justify scroll-fade-up`}>
            Ada orang yang paling dekat. Yang melihat lelahku tanpa perlu aku jelaskan. Buku itu ada di sana, berbulan-bulan. Aku tidak pernah bertanya. Karena aku tahu, jawabannya akan lebih menyakitkan jika diucapkan.
          </p>

          <p className={`text-base md:text-lg leading-[2] ${theme.textSecondary} font-light text-center italic px-4 md:px-8 scroll-fade-up`}>
            Kadang, yang paling sunyi bukan tidak dibaca, tapi disadari bahwa bahkan yang terdekat pun tidak sempat berhenti.
          </p>

          <p className={`text-base md:text-lg leading-[2] ${theme.textMuted} font-light text-justify scroll-fade-up`}>
            Kalau yang dekat saja tidak sempat, aku tidak tahu apa yang bisa kuharapkan dari dunia yang asing. Dunia tidak kejam. Ia hanya tidak berhenti. Dan yang tidak berhenti jarang sempat melihat apa yang lahir pelan.
          </p>
        </div>

        {/* Highlight Box */}
        <div className={`my-16 p-6 md:p-8 ${theme.accentBg} ${theme.accentBorder} border scroll-fade-up`}>
          <p className={`text-base md:text-lg leading-[2] ${theme.text} font-light text-center italic`}>
            Aku tetap menulis bukan karena yakin akan dibaca. Aku menulis karena jika tidak, hari-hari ini akan runtuh tanpa saksi. Menulis adalah caraku mengatakan pada diri sendiri bahwa aku pernah ada di hari ini.
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 py-12 scroll-fade-up">
          <div className={`h-px ${theme.divider} w-24 animate-expand`} />
          <div className={`w-2 h-2 border ${theme.accentBorder} rotate-45 animate-spin-slow`} />
          <div className={`h-px ${theme.divider} w-24 animate-expand`} />
        </div>

        {/* Penutup Section */}
        <div className="mt-20 scroll-fade-up">
          <div className={`flex items-center justify-between mb-8 border-b ${theme.accentBg} pb-4`}>
            <h3 className={`font-serif italic text-xl md:text-2xl ${theme.text}`}>Penutup</h3>
            <span className={`text-[10px] tracking-[0.3em] uppercase ${theme.accentMuted}`}>Akhir</span>
          </div>

          <div className="space-y-8">
            <p className={`text-base md:text-lg leading-[2] ${theme.textMuted} font-light text-center scroll-fade-up`}>
              Buku ini tidak meminta perhatian. Ia juga tidak ingin dipahami. Ia hanya ingin jujur.
            </p>

            <p className={`text-base md:text-lg leading-[2] ${theme.textSecondary} font-light text-center italic scroll-fade-up`}>
              Dan jika suatu hari seseorang membacanya dalam keadaan lelah, dalam keadaan sepi, itu sudah cukup. Jika tidak, tidak apa-apa.
            </p>

            <p className={`font-serif text-xl md:text-2xl ${theme.accent} italic text-center mt-12 scroll-fade-up`}>
              Ia tetap ditulis.
            </p>
          </div>
        </div>

        {/* Tulisan Lain */}
        <div className="mt-24 scroll-fade-up">
          <div className={`flex items-center justify-between mb-8 border-b ${theme.accentBg} pb-4`}>
            <h3 className={`font-serif italic text-xl md:text-2xl ${theme.text}`}>Tulisan-tulisan Lain</h3>
            <span className={`text-[10px] tracking-[0.3em] uppercase ${theme.accentMuted}`}>Segera</span>
          </div>

          <div className="text-center py-20">
            <p className={`font-serif italic text-lg ${theme.accentMuted} mb-3 animate-pulse`}>
              Keheningan yang menunggu
            </p>
            <p className={`text-sm ${theme.emptyState}`}>Belum ada kata yang berani keluar.</p>
          </div>
        </div>

        {/* Quote Footer */}
        <div className="mt-24 text-center scroll-fade-up">
          <div className={`w-12 h-px ${theme.divider} mx-auto mb-8 animate-expand`} />
          <p className={`font-serif italic text-base md:text-lg ${theme.accentMuted} max-w-2xl mx-auto leading-[1.7] mb-4`}>
            &ldquo;Meski lewat begitu saja, setidaknya aku pernah mencoba mengingatkan bahwa aku ada.&rdquo;
          </p>
          <p className={`text-[10px] tracking-[0.3em] uppercase ${theme.subtleText}`}>
            — Dari yang menulis pelan
          </p>
        </div>

        {/* Final Footer */}
        <div className="mt-24 text-center pb-20 scroll-fade-up">
          <p className={`font-serif italic ${theme.accentMuted} text-sm animate-pulse`}>
            Ditulis setelah kerja selesai,<br />
            di malam yang tidak yakin ingin dihabiskan.
          </p>
          
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className={`h-px ${theme.accentBg} w-8`}></div>
            <span className={`text-[9px] tracking-[0.4em] uppercase ${darkMode ? 'text-[#44403c]' : 'text-[#d6d3d1]'}`}>Akhir dari arsip</span>
            <div className={`h-px ${theme.accentBg} w-8`}></div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
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
        
        .animate-float {
          animation: float ease-in-out infinite;
        }
        
        .animate-expand {
          animation: expand 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        
        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 1s ease forwards;
        }
        
        .animate-fade-up {
          opacity: 0;
          animation: fadeUp 1s ease forwards;
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
        
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        
        .scroll-fade-up {
          opacity: 0;
          transform: translateY(60px);
          transition: opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1), transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
        }
        
        .scroll-fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
