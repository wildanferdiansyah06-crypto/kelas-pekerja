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

  // TEMA: "Ashes & Embers" 
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
    highlight: 'bg-[#2a2420]/50',
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
    highlight: 'bg-[#d9d0c1]/60',
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
    <div className={`${theme.bg} ${theme.text} transition-colors duration-1000 selection:${theme.accent} selection:bg-current`}>
      
      {/* Simplified Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute inset-0 bg-gradient-to-b ${theme.gradientFrom} ${theme.gradientTo} opacity-30`} />
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
      <main className="pt-0 pb-24 font-serif antialiased relative z-10">
        
        {/* HERO SECTION */}
        <section
          id="pembuka"
          data-chapter={0}
          className={`relative flex items-center justify-center px-6 ${theme.bg} border-b ${theme.border}`}
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

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Dia belajar bahwa dicintai berarti harus bisa memberi. Dan dia sudah tidak punya apa-apa selain tulang-tulangnya yang dipaksa berdiri. Jadi dia menolak cinta. Bukan karena tidak menginginkannya, tapi karena dia tahu, dengan kepastian yang menghancurkan, bahwa dia tidak punya apa-apa untuk diberikan. Dia sudah memberikan segalanya kepada mereka, kepada rakyatnya, kepada tujuan yang lebih besar, kepada mimpi siang bolong yang haus akan pengorbanan.
                </p>
              </div>
            </section>

            {/* BAB II */}
            <section 
              id="bab-2"
              data-chapter={2}
              className="mb-40 scroll-mt-24"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-6 mb-16 pb-8 border-b ${theme.border}`}>
                <span className={`text-8xl font-black ${theme.romanColor} opacity-40 leading-none font-serif`}>II</span>
                <div className="flex-1">
                  <h2 className={`text-4xl font-bold ${theme.textHeading} mb-3 font-serif leading-tight`}>Yang Menawan</h2>
                  <p className={`text-lg ${theme.textMuted} italic font-serif`}>Estetika dalam Kehancuran</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className={`p-6 ${theme.card} border ${theme.border} rounded-lg`}>
                  <p className={`${theme.textHeading} text-xl font-serif italic`}>
                    Kamu bilang dia menginspirasi?
                  </p>
                </div>

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Dia menawan karena sudah mati di bagian dalam. Tapi cahaya dari bangkai itu membuatnya tampak hidup. Berkilau. Pahlawan. Seolah-olah kehancuran yang teratur adalah bentuk seni yang paling tinggi.
                </p>

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Kamu duduk di sekitarnya untuk menghangatkan tangan. Kamu membaca buku tentang filsafat penderitaan. Kamu tidak sadar bahwa kayu bakar itu adalah tulang-tulangnya sendiri. Kamu tidak sadar bahwa setiap tawa yang kamu dengar darinya adalah bunyi dari balok-balok fondasi yang sedang patah.
                </p>

                <div className={`my-12 p-8 ${darkMode ? 'bg-[#1a1612]' : 'bg-white'} border-2 ${theme.border} shadow-xl rounded-lg relative overflow-hidden`}>
                  <div className={`absolute -left-1 top-0 bottom-0 w-1 ${darkMode ? 'bg-[#c9a66b]/60' : 'bg-[#8b4513]/60'}`} />
                  <p className={`${theme.textMuted} text-sm uppercase tracking-widest mb-4`}>Yang Tidak Tersadari</p>
                  <p className={`${theme.textHeading} text-xl md:text-2xl font-serif leading-relaxed`}>
                    Ada estetika dalam keterbatasan yang heroik. Ada romansa dalam penderitaan yang disangkal. Kita menyukai melihat sesuatu yang indah sedang hancur karena itu memvalidasi kerapuhan kita sendiri.
                  </p>
                </div>

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Ketika seseorang yang begitu sempurna, begitu kuat, begitu terang, akhirnya menunjukkan retakannya, kita merasa lega. <em>Ah, jadi dia juga manusia.</em>
                </p>

                <p className={`${theme.text} text-lg leading-[1.9] ${theme.ember} font-medium`}>
                  Tapi bagi yang sedang hancur, validasi ini adalah penghinaan terakhir. Dia tidak hancur untuk menjadi objek estetika. Dia hancur karena dia habis. Dan fakta bahwa kehancurannya indah hanya menunjukkan betapa salahnya dunia, bahwa bahkan penderitaan pun harus diproduksi dengan cara yang menarik untuk dikonsumsi.
                </p>

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Paling sakit bukan saat dia padam. Paling sakit saat kita baru sadar setelah dia dingin. Saat kita menemukan draft-draft email yang tidak pernah terkirim. Saat kita menemukan kertas-kertas di saku jaketnya yang bau rokok dan kopi dingin. Saat kita baru mengerti bahwa senyumnya yang terlalu ramah itu adalah bentuk terakhir dari seseorang yang sudah lupa cara menjadi tidak ramah.
                </p>
              </div>
            </section>

            {/* BAB III */}
            <section 
              id="bab-3"
              data-chapter={3}
              className="mb-40 scroll-mt-24"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-6 mb-16 pb-8 border-b ${theme.border}`}>
                <span className={`text-8xl font-black ${theme.romanColor} opacity-40 leading-none font-serif`}>III</span>
                <div className="flex-1">
                  <h2 className={`text-4xl font-bold ${theme.textHeading} mb-3 font-serif leading-tight`}>Pisau Itu</h2>
                  <p className={`text-lg ${theme.textMuted} italic font-serif`}>Idealisme yang Mengiris</p>
                </div>
              </div>

              <div className="space-y-8">
                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Setiap pagi dia bangun. Mengiris sedikit demi sedikit. Impiannya yang pernah ingin jadi anak biasa. Yang pernah ingin nangis tanpa malu. Yang pernah ingin jatuh cinta seperti orang gila tanpa hitung-hitungan dampak sosial.
                </p>

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Sekarang, sisa-sisa irisan itu habis. Yang tersisa hanya tulang. Cahaya yang menyilaukan tapi membekukan. Struktur yang kokoh tapi kosong.
                </p>

                <div className={`my-12 pl-8 border-l-2 ${theme.quoteBorder}`}>
                  <p className={`${theme.textMuted} text-lg leading-[1.9] italic font-serif`}>
                    Dia bilang, aku memikul langit demi rakyatku. Tapi tidak ada yang memintanya. Tidak ada yang menuntutnya. Dia yang menuntut dari dirinya sendiri. Dia yang menetapkan standar yang mustahil. Dia yang menjadi penjaga dan tahanan dalam penjara yang dia bangun sendiri, dengan kunci yang dia lempar ke lautan yang tidak pernah dia kunjungi karena terlalu sibuk menahan langit.
                  </p>
                </div>

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Idealismenya adalah pisau dapur yang tumpul. Bukan membunuh cepat. Tapi mengiris sedikit demi sedikit. Setiap hari. Setiap pagi. Setiap kali dia berkata <em>aku baik-baik saja</em> sambil mengabaikan getaran di lututnya. Setiap kali dia menelan kata-kata yang seharusnya keluar. Setiap kali dia memilih untuk menjadi fondasi lagi, lagi, dan lagi.
                </p>

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Pisau itu tidak hanya memotong daging. Tapi juga memotong mimpi. Memotong keinginan. Memotong hak untuk menjadi lemah. Memotong hak untuk tidak kuat. Setiap irisan adalah pengorbanan yang tidak ada yang lihat. Setiap tetesan darah adalah doa yang tidak ada yang dengar.
                </p>

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Sampai suatu hari, pisau itu mencapai tulang. Dan ketika itu terjadi, tidak ada yang bisa dilakukan lagi. Selain jatuh. Dan padam.
                </p>
              </div>
            </section>

            {/* BAB IV */}
            <section 
              id="bab-4"
              data-chapter={4}
              className="mb-40 scroll-mt-24"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-6 mb-16 pb-8 border-b ${theme.border}`}>
                <span className={`text-8xl font-black ${theme.romanColor} opacity-40 leading-none font-serif`}>IV</span>
                <div className="flex-1">
                  <h2 className={`text-4xl font-bold ${theme.textHeading} mb-3 font-serif leading-tight`}>Malam Itu</h2>
                  <p className={`text-lg ${theme.textMuted} italic font-serif`}>Ketika Semua Menyerah</p>
                </div>
              </div>

              <div className="space-y-8">
                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Malam itu hujan deras. Dia di kantor sendirian. Jam menunjukkan 11:47 PM. Tidak ada yang menunggu di rumah. Tidak ada yang akan marah kalau dia pulang larut. Tidak ada yang akan bertanya di mana saja.
                </p>

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Tapi dia tetap di kantor. Karena di rumah terlalu sunyi. Terlalu banyak ruang kosong yang mengingatkan pada hal-hal yang tidak mau diingat. Lebih baik di kantor dengan berkas-berkas yang setia menemani. Dengan kopi yang tidak pernah menilai.
                </p>

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Malam itu, untuk pertama kalinya dalam bertahun-tahun, dia menulis sesuatu untuk dirinya sendiri. Bukan laporan. Bukan proposal. Bukan email resmi. Tapi tulisan tangan di kertas kantor yang tidak akan dibaca siapa-siapa.
                </p>

                <div className={`my-12 p-8 ${theme.quoteBg} border-l-4 ${theme.quoteBorder} relative`}>
                  <Quote size={32} className={`${theme.accent} opacity-20 absolute top-4 right-4`} />
                  <p className={`${theme.textHeading} text-2xl font-serif italic leading-relaxed text-center`}>
                    "Aku lelah. Aku hanya ingin tidur. Tidur yang nyenyak. Tanpa mimpi. Tanpa tanggung jawab. Tanpa harus jadi cahaya untuk siapa pun."
                  </p>
                </div>

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Malam itu, dia menangis. Diam-diam di toilet kantor. Air mata yang tidak pernah keluar selama bertahun-tahun. Air mata yang tertahan oleh kebanggaan. Oleh tanggung jawab. Oleh citra yang harus dipertahankan.
                </p>

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Malam itu, dia hampir menyerah. Hampir memanggil seseorang. Siapa saja. Tapi tidak ada nomor yang bisa dihubungi di tengah malam. Karena selama ini, dia sengaja menjaga jarak. Agar tidak ada yang terlalu dekat. Agar tidak ada yang akan terlalu sakit saat dia pergi.
                </p>

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Malam itu, dia pulang jam 2. Seperti biasa. Tapi kali ini, langkahnya lebih berat. Kali ini, beban yang dipikul terasa terlalu berat. Kali ini, untuk pertama kalinya, dia berpikir: mungkin aku tidak kuat lagi.
                </p>
              </div>
            </section>

            {/* BAB V */}
            <section 
              id="bab-5"
              data-chapter={5}
              className="mb-40 scroll-mt-24"
            >
              <div className={`flex flex-col sm:flex-row sm:items-end gap-6 mb-16 pb-8 border-b ${theme.border}`}>
                <span className={`text-8xl font-black ${theme.romanColor} opacity-40 leading-none font-serif`}>V</span>
                <div className="flex-1">
                  <h2 className={`text-4xl font-bold ${theme.textHeading} mb-3 font-serif leading-tight`}>Ratapan Itu</h2>
                  <p className={`text-lg ${theme.textMuted} italic font-serif`}>Kata-Kata Terakhir</p>
                </div>
              </div>

              <div className="space-y-8">
                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Ratapan itu tidak datang dengan teriakan. Tidak datang dengan drama. Tidak datang di depan orang banyak.
                </p>

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Ratapan itu datang di pagi yang biasa. Saat dia memandang cermin dan tidak mengenal wajah yang di sana. Mata yang terlalu lelah. Wajah yang terlalu pucat. Senyum yang terlalu dipaksakan.
                </p>

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Ratapan itu datang saat dia menulis email pengunduran diri. Dengan kata-kata yang formal. Dengan alasan yang masuk akal. "Karena alasan kesehatan keluarga." Tidak ada yang tahu bahwa keluarga yang dimaksud adalah dirinya sendiri. Yang sudah sakit terlalu lama.
                </p>

                <div className={`my-8 p-6 ${theme.accentBg} ${theme.accentBorder} border-2 rounded-lg`}>
                  <p className={`${theme.text} text-lg leading-[1.8] font-serif italic`}>
                    "Terima kasih atas kesempatan yang telah diberikan. Saya belajar banyak. Saya tumbuh banyak. Tapi sekarang saatnya untuk pulang. Untuk istirahat. Untuk menjadi biasa saja."
                  </p>
                </div>

                <p className={`${theme.text} text-lg leading-[1.9] ${theme.ember} font-medium`}>
                  Di saat-saat terakhir, bukan air mata biasa yang keluar. Tapi segala sesuatu yang telah dia tahan selama bertahun-tahun. Air mata yang keluar bersama darah. Bersama usus. Bersama kehancuran total dari seseorang yang telah menjadi terlalu banyak orang, hingga dirinya asli adalah orang asing.
                </p>

                <div className={`my-12 text-center p-10 ${theme.accentBg} ${theme.accentBorder} border-2 rounded-lg`}>
                  <p className={`${theme.textHeading} text-2xl md:text-3xl font-serif italic leading-relaxed mb-4`}>
                    Dunia baru sadar.
                  </p>
                  <p className={`${theme.accent} text-xl font-serif italic`}>
                    Oh. Dia ternyata manusia.
                  </p>
                </div>

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Tapi sudah terlambat. Cahaya itu sudah padam. Dan sekarang kamu duduk di kegelapan yang ditinggalkannya, menyesali kenapa tidak bertanya lebih keras waktu dia bilang, <em>aku baik-baik saja</em>. Kenapa tidak tarik lengannya dan bilang, <span className={theme.accent}>tidak, kamu tidak baik-baik saja, dan itu tidak apa-apa. Jatuhlah. Biarkan langit itu runtuh. Biarkan kamu hancur bersamanya. Tapi tolong, tolong jangan jadi cahaya lagi.</span>
                </p>

                <p className={`${theme.text} text-lg leading-[1.9]`}>
                  Di penguburannya, orang-orang berkata, <em>dia adalah orang baik.</em> Bukan, dia adalah orang yang pernah ketawa terbahak-bahak. Bukan, dia pernah jatuh cinta seperti orang bodoh. Tapi, <span className={theme.textMuted}>dia adalah orang baik.</span> Seolah kebaikan adalah satu-satunya identitas yang tersisa dari seseorang yang telah menjual seluruh dirinya untuk menjadi pupuk bagi kehidupan orang lain.
                </p>
              </div>
            </section>

            {/* PENUTUP */}
            <section 
              id="penutup"
              data-chapter={6}
              className="mb-40 scroll-mt-24"
            >
              <div className={`mb-16 pb-8 border-b ${theme.border}`}>
                <span className={`text-xs font-bold tracking-[0.3em] ${theme.accent} uppercase font-serif`}>Penutup</span>
                <h2 className={`text-4xl sm:text-5xl font-bold ${theme.textHeading} mt-4 font-serif leading-tight`}>Jangan Jadi Cahaya</h2>
              </div>

              <div className="space-y-10">
                <p className={`${theme.text} text-xl md:text-2xl leading-[1.8] font-serif text-center`}>
                  Jangan jadi cahaya.
                </p>

                <p className={`${theme.text} text-lg leading-[1.9] text-center max-w-2xl mx-auto`}>
                  Jadi saja lilin yang berkedip-kedip. Yang getir. Yang hampir padam tiap angin. Tapi hangat. Hangat di tangan yang dekat. Jadi saja lampu tidur yang redup. Yang cukup untuk satu kamar saja. Untuk satu tubuh saja. Untuk satu hati saja.
                </p>

                <div className={`my-16 p-10 ${theme.highlight} border-2 ${theme.accentBorder} rounded-xl text-center`}>
                  <p className={`${theme.textHeading} text-2xl md:text-3xl font-serif italic leading-relaxed mb-6`}>
                    Jangan menyangga langit.
                  </p>
                  <p className={`${theme.accent} text-xl font-serif italic mb-6`}>
                    Biarkan runtuh.
                  </p>
                  <div className={`w-24 h-px ${darkMode ? 'bg-[#c9a66b]/50' : 'bg-[#8b4513]/50'} mx-auto`} />
                </div>

                <p className={`${theme.text} text-lg leading-[1.9] text-center max-w-2xl mx-auto`}>
                  Sebab yang seharusnya kita pikul bukan langit. Tapi hanya diri kita sendiri, dan itu sudah cukup berat. <span className={`${theme.accent} font-medium text-xl`}>Itu sudah cukup. Sudah cukup. Sudah cukup.</span>
                </p>

                {/* Final Note */}
                <div className={`mt-20 pt-12 border-t-2 ${theme.border} ${theme.accentBorder}`}>
                  <div className="max-w-xl mx-auto">
                    <p className={`${theme.textMuted} text-sm leading-[1.9] mb-6`}>
                      Di saku jaket bekasnya, kertas bau rokok dan kopi dingin. Tulisannya tidak rapi. Ada noda yang mungkin air, mungkin sesuatu yang lain.
                    </p>

                    <div className={`p-6 ${theme.card} border ${theme.border} rounded-lg mb-6`}>
                      <p className={`${theme.textMuted} text-sm italic mb-4`}>Di baliknya, gambar kecil: bocah kecil sedang berdiri di bawah hujan, memegang payung besar untuk orang lain, sementara dirinya sendiri basah kuyup.</p>
                      <p className={`${theme.textMuted} text-xs uppercase tracking-wider`}>Di pojok, tulisan yang lebih tidak rapi lagi:</p>
                    </div>

                    <blockquote className={`${theme.ember} text-lg md:text-xl font-serif italic leading-relaxed text-center border-l-4 ${theme.quoteBorder} pl-6 py-4`}>
                      "Aku lelah jadi pelita. Aku ingin jadi abu saja. Abu yang hangat sebentar, lalu dingin, lalu pergi, tanpa harus menerangi siapa-siapa lagi."
                    </blockquote>

                    <div className="mt-10 text-center">
                      <p className={`${theme.accent} text-sm uppercase tracking-[0.3em]`}>Selesai</p>
                    </div>
                  </div>
                </div>

                {/* Author Note */}
                <div className={`mt-16 pt-8 border-t ${theme.border} text-center`}>
                  <Feather size={24} className={`${theme.accent} mx-auto mb-4 opacity-50`} />
                  <p className={`${theme.textMuted} text-sm italic leading-[1.8]`}>
                    Ditulis setelah melihat seseorang padam, di malam yang tidak yakin ingin dihabiskan, oleh tubuh yang ingin rebah tapi masih memaksa mengingat.
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
