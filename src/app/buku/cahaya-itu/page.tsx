'use client';

import { useState, useEffect, useRef } from 'react';
import { Moon, Sun, BookOpen, Flame, ChevronRight, X, Compass, Quote, Feather } from 'lucide-react';
import { useTheme } from "@/src/components/ThemeProvider";

export default function CahayaItuPage() {
  const { theme: globalTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);
  
  // Performance optimizations
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const handleScroll = () => {
      // Throttle with simple timeout
      if (scrollTimeoutRef.current) return;
      
      scrollTimeoutRef.current = setTimeout(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        
        setReadingProgress(progress);
        setShowFloatingMenu(scrollTop > 300);
        
        // Update chapter tracking less frequently
        if (Math.abs(scrollTop - lastScrollYRef.current) > 200) {
          const chapters = document.querySelectorAll('[data-chapter]');
          let currentChapter = 0;
          
          chapters.forEach((chapter) => {
            const rect = chapter.getBoundingClientRect();
            const chapterNum = Number(chapter.getAttribute('data-chapter'));
            
            if (rect.top < window.innerHeight * 0.5) {
              currentChapter = chapterNum;
            }
          });
          
          setActiveChapter(currentChapter);
          setCompletedChapters(prev => Array.from(new Set([...prev, currentChapter])));
          lastScrollYRef.current = scrollTop;
        }
        
        scrollTimeoutRef.current = undefined;
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [mounted]);

  if (!mounted) return null;

  const darkMode = globalTheme === 'dark';

  // Simplified theme
  const theme = darkMode ? {
    bg: 'bg-[#0f0d0c]',
    text: 'text-[#e5e0db]',
    textMuted: 'text-[#8b7d6b]',
    textHeading: 'text-[#f0ebe5]',
    textSubheading: 'text-[#a89f91]',
    border: 'border-[#2a2520]',
    accent: 'text-[#c9a66b]',
    accentBg: 'bg-[#1a1612]',
    accentBorder: 'border-[#3d3428]',
    sidebar: 'bg-[#0a0807]',
    card: 'bg-[#1a1612]/80',
    float: 'bg-[#1c1814]/95',
    gradientFrom: 'from-[#2a2420]/30',
    gradientTo: 'to-[#0f0d0c]/10',
    quoteBorder: 'border-[#c9a66b]/40',
    quoteBg: 'bg-[#1a1612]/60',
    romanColor: 'text-[#5c4d3c]',
    ember: 'text-[#8b4513]',
  } : {
    bg: 'bg-[#f5f0e8]',
    text: 'text-[#2c241b]',
    textMuted: 'text-[#6b5d4d]',
    textHeading: 'text-[#1a1612]',
    textSubheading: 'text-[#4a3f32]',
    border: 'border-[#d4cfc4]',
    accent: 'text-[#8b4513]',
    accentBg: 'bg-[#ebe5d8]',
    accentBorder: 'border-[#c4b8a3]',
    sidebar: 'bg-[#ebe5d8]',
    card: 'bg-[#ebe5d8]/80',
    float: 'bg-[#f5f0e8]/95',
    gradientFrom: 'from-[#d9d0c1]/40',
    gradientTo: 'to-[#f5f0e8]/20',
    quoteBorder: 'border-[#8b4513]/40',
    quoteBg: 'bg-[#ebe5d8]/60',
    romanColor: 'text-[#a89b8c]',
    ember: 'text-[#a0522d]',
  };

  const chapters = [
    { num: 0, title: "Pembuka", subtitle: "Badan Bau Keringat" },
    { num: 1, title: "01", subtitle: "Bocah Itu" },
    { num: 2, title: "02", subtitle: "Yang Menawan" },
    { num: 3, title: "03", subtitle: "Pisau Itu" },
    { num: 4, title: "04", subtitle: "Malam Itu" },
    { num: 5, title: "05", subtitle: "Ratapan Itu" },
    { num: 6, title: "Penutup", subtitle: "Jangan Jadi Cahaya" },
  ];

  const isChapterCompleted = (num: number) => completedChapters.includes(num);

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-500`}>
      
      {/* Simple Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute inset-0 bg-gradient-to-b ${theme.gradientFrom} ${theme.gradientTo} opacity-20`} />
      </div>

      {/* Reading Progress Bar */}
      <div className={`fixed top-0 left-0 right-0 h-[2px] z-50 ${darkMode ? 'bg-[#2a2520]' : 'bg-[#d4cfc4]'}`}>
        <div 
          className={`h-full ${darkMode ? 'bg-[#c9a66b]' : 'bg-[#8b4513]'} transition-all duration-300`}
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Floating Navigation */}
      {showFloatingMenu && (
        <div className={`fixed bottom-4 left-4 z-40 flex flex-col gap-2`}>
          <button
            onClick={() => setSidebarOpen(true)}
            className={`flex items-center gap-2 px-4 py-3 rounded-full ${theme.float} backdrop-blur-md border ${theme.border} shadow-xl ${theme.accent} font-serif tracking-wide text-sm`}
          >
            <BookOpen size={16} strokeWidth={1.5} />
            <span className="font-medium">Daftar Isi</span>
            <span className={`text-xs font-serif ${theme.textMuted} ml-2 pl-2 border-l ${theme.border}`}>
              {String(activeChapter).padStart(2, '0')}/{chapters.length - 1}
            </span>
          </button>

          <div className={`flex items-center gap-1 p-1.5 rounded-full ${theme.float} backdrop-blur-md border ${theme.border} shadow-xl w-fit`}>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${darkMode ? 'hover:bg-[#2a2520]' : 'hover:bg-[#e0d9cc]'} transition-colors duration-300`}
            >
              {darkMode ? <Sun size={16} className={theme.accent} strokeWidth={1.5} /> : <Moon size={16} className={theme.accent} strokeWidth={1.5} />}
            </button>
            <div className={`w-px h-3 ${darkMode ? 'bg-[#3d3428]' : 'bg-[#c4b8a3]'}`} />
            <a
              href="#pembuka"
              className={`p-2 rounded-full ${darkMode ? 'hover:bg-[#2a2520]' : 'hover:bg-[#e0d9cc]'} transition-colors duration-300`}
            >
              <Compass size={16} className={theme.textMuted} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      )}

      {/* Sidebar */}
      {sidebarOpen && (
        <>
          <div 
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <aside className={`fixed left-0 top-0 bottom-0 w-80 ${theme.sidebar} z-50 overflow-y-auto shadow-2xl`}>
            <div className="pt-20 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full border ${theme.accentBorder} ${theme.accentBg}`}>
                    <Flame size={18} className={theme.accent} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h2 className={`font-serif font-bold text-lg ${theme.textHeading}`}>Daftar Isi</h2>
                    <p className={`text-sm ${theme.textMuted} font-serif italic`}>Tentang yang Terbakar</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className={`p-2 rounded-full ${darkMode ? 'hover:bg-[#2a2520]' : 'hover:bg-[#d4cfc4]'} transition-colors duration-300`}
                >
                  <X size={18} className={theme.textMuted} strokeWidth={1.5} />
                </button>
              </div>

              <div className={`mb-6 p-4 rounded-xl ${theme.card} border ${theme.border}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-sm ${theme.textMuted} font-serif`}>Progress Membaca</span>
                  <span className={`text-sm font-serif ${theme.accent}`}>
                    {Math.round((completedChapters.length / chapters.length) * 100)}%
                  </span>
                </div>
                <div className={`w-full h-[3px] rounded-full ${darkMode ? 'bg-[#2a2520]' : 'bg-[#d4cfc4]'}`}>
                  <div 
                    className={`h-full rounded-full ${darkMode ? 'bg-[#c9a66b]' : 'bg-[#8b4513]'} transition-all duration-800`}
                    style={{ width: `${(completedChapters.length / chapters.length) * 100}%` }}
                  />
                </div>
              </div>

              <nav className="space-y-1 pb-16">
                {chapters.map((chapter) => {
                  const isCompleted = isChapterCompleted(chapter.num);
                  const isActive = activeChapter === chapter.num;
                  
                  return (
                    <a
                      key={chapter.num}
                      href={chapter.num === 0 ? "#pembuka" : chapter.num === 6 ? "#penutup" : `#bab-${chapter.num}`}
                      onClick={() => setSidebarOpen(false)}
                      className={`group flex items-center gap-3 p-3 rounded-lg text-sm transition-all duration-300 ${
                        isActive 
                          ? `${theme.accentBg} ${theme.accent} font-semibold border ${theme.accentBorder}` 
                          : isCompleted
                            ? `${theme.card} ${theme.text} border ${theme.border}`
                            : `${theme.textMuted} hover:${theme.text} hover:bg-[${darkMode ? '#2a2520' : '#e0d9cc'}]`
                      }`}
                    >
                      <span className={`text-lg font-serif font-bold flex-shrink-0 w-6 text-center ${
                        isCompleted 
                          ? theme.accent
                          : isActive 
                            ? theme.accent 
                            : theme.textMuted
                      }`}>
                        {isCompleted ? <Feather size={14} strokeWidth={2} /> : chapter.num === 0 ? 'P' : chapter.num === 6 ? 'E' : ['I', 'II', 'III', 'IV', 'V'][chapter.num - 1]}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className={`font-serif font-medium text-sm truncate ${isActive ? theme.textHeading : isCompleted ? theme.textHeading : theme.text}`}>
                          {chapter.title}
                        </p>
                        <p className={`text-xs mt-1 truncate ${theme.textMuted} font-serif italic`}>{chapter.subtitle}</p>
                      </div>
                      {isActive && <ChevronRight size={16} strokeWidth={2} />}
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>
        </>
      )}

      {/* Main Content */}
      <main className="min-h-screen pt-0 pb-24 font-serif antialiased relative z-10">
        
        {/* HERO SECTION */}
        <section 
          id="pembuka"
          data-chapter={0}
          className={`relative flex items-center justify-center px-6 ${theme.bg} border-b ${theme.border} min-h-screen`}
        >
          <div className={`absolute inset-0 bg-gradient-to-b ${theme.gradientFrom} ${theme.gradientTo} opacity-60`} />
          
          <div className="max-w-3xl mx-auto w-full pt-20 pb-20 relative z-10 text-center">
            <div className="mb-16">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${theme.accentBg} border ${theme.accentBorder} mb-10`}>
                <Flame size={24} className={theme.accent} strokeWidth={1} />
              </div>
              
              <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold ${theme.textHeading} mb-8 tracking-tight leading-[1.1] font-serif`}>
                CAHAYA<br />
                <span className={`${theme.ember} italic font-light`}>ITU</span>
              </h1>
              
              <p className={`text-xl md:text-2xl ${theme.textSubheading} italic mb-10 font-serif font-light tracking-wide max-w-2xl mx-auto leading-relaxed`}>
                Sebuah Pengakuan tentang yang Terbakar hingga Padam
              </p>

              <div className={`w-32 h-[1px] mx-auto ${darkMode ? 'bg-[#c9a66b]/50' : 'bg-[#8b4513]/50'} mb-10`} />
              
              <p className={`text-lg ${theme.textMuted} max-w-2xl mx-auto leading-[1.8] font-serif`}>
                "Badan bau keringat. Dia pulang jam dua. Bukan karena lembur. 
                Tapi karena di rumahnya, tidak ada yang menunggu."
              </p>
            </div>

            <div>
              <button
                onClick={() => setSidebarOpen(true)}
                className={`inline-flex items-center gap-3 px-8 py-4 rounded-full ${theme.accentBg} ${theme.accent} font-serif border ${theme.accentBorder} hover:shadow-lg transition-all duration-500 tracking-wide text-sm uppercase`}
              >
                <BookOpen size={16} strokeWidth={1.5} />
                Mulai Membaca
              </button>
            </div>
          </div>

          <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 ${theme.textMuted}`}>
            <div className={`w-6 h-10 rounded-full border ${theme.border} flex justify-center pt-2`}>
              <div className={`w-[2px] h-2 rounded-full ${darkMode ? 'bg-[#c9a66b]' : 'bg-[#8b4513]'}`} />
            </div>
          </div>
        </section>

        {/* Content Container */}
        <div className="px-6 lg:px-12">
          <div className="max-w-2xl mx-auto py-20">
            
            {/* PEMBUKA */}
            <section 
              id="pembuka"
              data-chapter={0}
              className="mb-40 scroll-mt-24"
            >
              <div className={`mb-12 pb-6 border-b ${theme.border}`}>
                <span className={`text-xs font-bold tracking-[0.3em] ${theme.accent} uppercase font-serif`}>Pembuka</span>
                <h2 className={`text-4xl font-bold ${theme.textHeading} mt-4 font-serif leading-tight`}>Badan Bau Keringat</h2>
              </div>

              <div className="space-y-8">
                <p className={`${theme.text} text-lg leading-[1.9] first-letter:text-6xl first-letter:${theme.accent} first-letter:font-bold first-letter:mr-4 first-letter:float-left first-letter:leading-none first-letter:mt-2`}>
                  Badan bau keringat. Dia pulang jam dua. Bukan karena lembur. Tapi karena di rumahnya, tidak ada yang menunggu.
                </p>
                
                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Meja penuh berkas. Kopi dingin. Dia tidak minum. Dia hanya memandanginya, berpikir: setidaknya aku berguna untuk sesuatu.
                </p>

                <div className={`my-12 p-8 ${theme.quoteBg} border-l-4 ${theme.quoteBorder} relative`}>
                  <Quote size={32} className={`${theme.accent} opacity-20 absolute top-4 right-4`} />
                  <p className={`${theme.textHeading} text-2xl font-serif italic leading-relaxed text-center`}>
                    "Aku baik-baik saja."
                  </p>
                </div>

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Lututnya bergetar. Tapi getaran itu tidak terlihat. Dia sudah terlalu ahli menjadi fondasi. Terlalu lama berlatih menjadi dinding yang tidak berhak retak.
                </p>
              </div>
            </section>

            {/* BAB I */}
            <section 
              id="bab-1"
              data-chapter={1}
              className="mb-40 scroll-mt-24"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-6 mb-16 pb-8 border-b ${theme.border}`}>
                <span className={`text-8xl font-black ${theme.romanColor} opacity-40 leading-none font-serif`}>I</span>
                <div className="flex-1">
                  <h2 className={`text-4xl font-bold ${theme.textHeading} mb-3 font-serif leading-tight`}>Bocah Itu</h2>
                  <p className={`text-lg ${theme.textMuted} italic font-serif`}>Tentang yang Tidak Pernah Jatuh Cinta</p>
                </div>
              </div>

              <div className="space-y-8">
                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Dia tidak pernah jatuh cinta.
                </p>

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Bukan karena tidak ada yang suka. Tapi karena waktu seseorang mendekat dengan lembut, dia panik. Dia pikir, kalau aku berbaring di pelukanmu, siapa yang akan menjaga pintu? Siapa yang akan menahan langit supaya tidak runtuh menimpa semua orang yang kita cintai?
                </p>

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Jadi dia tolak dengan senyum yang terlalu ramah. Dengan alasan yang terlalu masuk akal. Lalu kembali ke kamarnya yang kecil. Meja penuh masalah orang lain. Kopi sudah dingin. Dia tidak minum. Dia hanya memandanginya, berpikir: setidaknya aku berguna untuk sesuatu. Setidaknya aku masih dibutuhkan.
                </p>

                <div className={`my-8 p-6 ${theme.accentBg} ${theme.accentBorder} border-2 rounded-lg`}>
                  <p className={`${theme.text} text-lg leading-[1.8] font-serif italic`}>
                    Cinta adalah kemewahan yang tidak bisa dia bayar. Seluruh tabungannya habis untuk membeli ketenangan bagi orang-orang yang tidak pernah bertanya, <span className={theme.accent}>bagaimana denganmu?</span>
                  </p>
                </div>

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Orang-orang yang menerima cahayanya dengan nyaman, tanpa pernah melihat bagaimana api itu memakan dirinya sendiri.
                </p>
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
