'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, BookOpen, Coffee, ChevronRight, Menu, X, Search, ArrowUp } from 'lucide-react';

export default function CoffeeBookPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
      
      // Update active chapter based on scroll position
      const chapters = document.querySelectorAll('[data-chapter]');
      chapters.forEach((chapter) => {
        const rect = chapter.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveChapter(Number(chapter.getAttribute('data-chapter')));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Theme classes
  const theme = darkMode ? {
    bg: 'bg-[#0c0c0c]',
    text: 'text-neutral-300',
    textMuted: 'text-neutral-500',
    textHeading: 'text-neutral-100',
    textSubheading: 'text-neutral-400',
    border: 'border-neutral-800',
    accent: 'text-amber-600',
    accentBg: 'bg-amber-900/20',
    accentBorder: 'border-amber-800/50',
    sidebar: 'bg-[#111111]',
    code: 'bg-neutral-900',
    highlight: 'bg-amber-900/10'
  } : {
    bg: 'bg-[#fafaf8]',
    text: 'text-stone-700',
    textMuted: 'text-stone-500',
    textHeading: 'text-stone-900',
    textSubheading: 'text-stone-600',
    border: 'border-stone-200',
    accent: 'text-amber-700',
    accentBg: 'bg-amber-100/50',
    accentBorder: 'border-amber-300',
    sidebar: 'bg-white',
    code: 'bg-stone-100',
    highlight: 'bg-amber-50'
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-500`}>
      
      {/* Fixed Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 ${theme.sidebar} border-b ${theme.border} backdrop-blur-md bg-opacity-90`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-neutral-800' : 'hover:bg-stone-100'} transition-colors`}
            >
              <Menu size={20} className={theme.textMuted} />
            </button>
            <div className="flex items-center gap-3">
              <Coffee size={20} className={theme.accent} />
              <div>
                <h1 className={`font-semibold text-sm ${theme.textHeading}`}>Coffee from Bean to Cup</h1>
                <p className={`text-xs ${theme.textMuted}`}>A Serious Guide</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-neutral-800' : 'hover:bg-stone-100'} transition-colors`}
            >
              {darkMode ? <Sun size={18} className={theme.accent} /> : <Moon size={18} className={theme.accent} />}
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className={`fixed left-0 top-16 bottom-0 w-80 ${theme.sidebar} border-r ${theme.border} z-50 overflow-y-auto`}
            >
              <div className="p-6">
                <h2 className={`text-xs font-semibold uppercase tracking-wider ${theme.textMuted} mb-4`}>Daftar Isi</h2>
                <nav className="space-y-1">
                  {chapters.map((chapter) => (
                    <a
                      key={chapter.num}
                      href={`#bab-${chapter.num}`}
                      onClick={() => setSidebarOpen(false)}
                      className={`block p-3 rounded-lg text-sm transition-all ${
                        activeChapter === chapter.num 
                          ? `${theme.accentBg} ${theme.accent} font-medium border ${theme.accentBorder}` 
                          : `${darkMode ? 'hover:bg-neutral-800' : 'hover:bg-stone-100'} ${theme.textMuted}`
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`text-xs font-mono mt-0.5 ${activeChapter === chapter.num ? theme.accent : theme.textMuted}`}>
                          {String(chapter.num).padStart(2, '0')}
                        </span>
                        <div>
                          <p className={activeChapter === chapter.num ? theme.textHeading : theme.text}>{chapter.title}</p>
                          <p className={`text-xs mt-0.5 ${theme.textMuted}`}>{chapter.subtitle}</p>
                        </div>
                      </div>
                    </a>
                  ))}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-24 pb-32 px-4">
        <div className="max-w-3xl mx-auto">
          
          {/* Book Header */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mb-16 text-center"
          >
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${theme.accentBg} border ${theme.accentBorder} mb-6`}>
              <Coffee size={40} className={theme.accent} />
            </div>
            <h1 className={`text-4xl md:text-5xl font-bold ${theme.textHeading} mb-4 tracking-tight`}>
              Coffee from Bean to Cup
            </h1>
            <p className={`text-xl ${theme.textSubheading} italic mb-4`}>A Serious Guide</p>
            <p className={`text-sm ${theme.textMuted}`}>oleh Wildan Ferdiansyah</p>
            
            <div className={`mt-8 p-6 rounded-xl ${theme.highlight} border ${theme.border}`}>
              <p className={`text-sm leading-relaxed ${theme.text}`}>
                Buku ini adalah panduan komprehensif tentang sains kopi, mulai dari biologi tanaman hingga teknik ekstraksi. 
                Ditujukan untuk barista, roaster, dan pecinta kopi yang ingin memahami logika di balik setiap cangkir.
              </p>
            </div>
          </motion.div>

          {/* Ringkasan Materi */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-20"
          >
            <h2 className={`text-2xl font-bold ${theme.textHeading} mb-6 pb-2 border-b ${theme.border}`}>
              Ringkasan Materi Utama
            </h2>
            
            <div className="space-y-6">
              <div className={`p-5 rounded-lg ${darkMode ? 'bg-neutral-900/50' : 'bg-white'} border ${theme.border}`}>
                <h3 className={`font-semibold ${theme.accent} mb-3 flex items-center gap-2`}>
                  <span className="w-6 h-6 rounded-full bg-current text-white text-xs flex items-center justify-center">1</span>
                  Fondasi Biologis & Lingkungan
                </h3>
                <ul className={`space-y-2 text-sm ${theme.text}`}>
                  <li className="flex items-start gap-2">
                    <ChevronRight size={16} className={`mt-0.5 ${theme.accent}`} />
                    <span>Spesies utama: <strong>Arabica</strong> (manis, kompleks) dan <strong>Robusta</strong> (pahit, body tebal)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight size={16} className={`mt-0.5 ${theme.accent}`} />
                    <span>Altitude tinggi → metabolisme lambat → akumulasi gula tinggi → rasa kompleks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight size={16} className={`mt-0.5 ${theme.accent}`} />
                    <span>Varietas penting: Typica, Bourbon, Geisha</span>
                  </li>
                </ul>
              </div>

              <div className={`p-5 rounded-lg ${darkMode ? 'bg-neutral-900/50' : 'bg-white'} border ${theme.border}`}>
                <h3 className={`font-semibold ${theme.accent} mb-3 flex items-center gap-2`}>
                  <span className="w-6 h-6 rounded-full bg-current text-white text-xs flex items-center justify-center">2</span>
                  Pasca-Panen & Roasting
                </h3>
                <ul className={`space-y-2 text-sm ${theme.text}`}>
                  <li className="flex items-start gap-2">
                    <ChevronRight size={16} className={`mt-0.5 ${theme.accent}`} />
                    <span><strong>Washed:</strong> clean, acidity cerah</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight size={16} className={`mt-0.5 ${theme.accent}`} />
                    <span><strong>Natural:</strong> fruity, body tebal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight size={16} className={`mt-0.5 ${theme.accent}`} />
                    <span><strong>Honey:</strong> sweet, balance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight size={16} className={`mt-0.5 ${theme.accent}`} />
                    <span>Maillard reaction → cokelat/kacang; karamelisasi → manis</span>
                  </li>
                </ul>
              </div>

              <div className={`p-5 rounded-lg ${darkMode ? 'bg-neutral-900/50' : 'bg-white'} border ${theme.border}`}>
                <h3 className={`font-semibold ${theme.accent} mb-3 flex items-center gap-2`}>
                  <span className="w-6 h-6 rounded-full bg-current text-white text-xs flex items-center justify-center">3</span>
                  Sains Ekstraksi & Air
                </h3>
                <ul className={`space-y-2 text-sm ${theme.text}`}>
                  <li className="flex items-start gap-2">
                    <ChevronRight size={16} className={`mt-0.5 ${theme.accent}`} />
                    <span>Extraction Yield ideal: <strong>18–22%</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight size={16} className={`mt-0.5 ${theme.accent}`} />
                    <span>TDS mengukur kekuatan seduhan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight size={16} className={`mt-0.5 ${theme.accent}`} />
                    <span>Air ideal: 75–150 ppm; magnesium bantu ekstraksi; bicarbonate buffer acidity</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Bab 1 */}
          <motion.section 
            id="bab-1"
            data-chapter={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="mb-20 scroll-mt-24"
          >
            <div className={`flex items-center gap-4 mb-8 pb-4 border-b ${theme.border}`}>
              <span className={`text-5xl font-bold ${theme.accent} opacity-30`}>01</span>
              <div>
                <h2 className={`text-3xl font-bold ${theme.textHeading}`}>Coffee Species</h2>
                <p className={`text-sm ${theme.textMuted} mt-1`}>Genus Coffea dan Posisi Botani Kopi</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className={`p-6 rounded-xl ${theme.highlight} border ${theme.border}`}>
                <h3 className={`font-semibold ${theme.textHeading} mb-3 text-lg`}>1.1 Genus Coffea</h3>
                <p className={`${theme.text} leading-relaxed mb-4`}>
                  Tanaman kopi berasal dari genus <em>Coffea</em>, sebuah genus tumbuhan berbunga dalam famili Rubiaceae. 
                  Hingga saat ini, lebih dari <strong>120 spesies Coffea</strong> telah diidentifikasi oleh para botanis.
                </p>
                <p className={`${theme.text} leading-relaxed`}>
                  Spesies-spesies ini tumbuh liar di Afrika, Madagaskar, dan sebagian Asia tropis. Namun, 
                  seluruh industri kopi modern secara praktis hanya bergantung pada <strong>dua spesies utama</strong>: 
                  <span className={theme.accent}> Coffea arabica</span> dan 
                  <span className={theme.accent}> Coffea canephora (Robusta)</span>.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className={`p-5 rounded-lg ${darkMode ? 'bg-neutral-900/30' : 'bg-stone-50'} border ${theme.border}`}>
                  <h4 className={`font-semibold ${theme.accent} mb-3`}>🌿 Arabica</h4>
                  <ul className={`space-y-2 text-sm ${theme.text}`}>
                    <li>• Ketinggian: 900–2,000 mdpl</li>
                    <li>• Suhu: 15–24°C</li>
                    <li>• Metabolisme: Lambat</li>
                    <li>• Kafein: 1.2–1.5%</li>
                    <li>• Karakter: Manis, kompleks, acidity cerah</li>
                  </ul>
                </div>
                <div className={`p-5 rounded-lg ${darkMode ? 'bg-neutral-900/30' : 'bg-stone-50'} border ${theme.border}`}>
                  <h4 className={`font-semibold ${theme.accent} mb-3`}>☕ Robusta</h4>
                  <ul className={`space-y-2 text-sm ${theme.text}`}>
                    <li>• Ketinggian: 200–800 mdpl</li>
                    <li>• Suhu: 24–30°C</li>
                    <li>• Metabolisme: Cepat</li>
                    <li>• Kafein: 2.2–2.7%</li>
                    <li>• Karakter: Pahit, body tebal, earthy</li>
                  </ul>
                </div>
              </div>

              <div className={`p-6 rounded-lg ${theme.code} border ${theme.border}`}>
                <h4 className={`font-semibold ${theme.textHeading} mb-3`}>1.3 Kimia Rasa Arabica</h4>
                <p className={`${theme.text} text-sm leading-relaxed mb-3`}>
                  Saat proses roasting, <strong>sukrosa</strong> terurai melalui reaksi karamelisasi dan Maillard. 
                  Reaksi ini menghasilkan ratusan senyawa volatil yang bertanggung jawab atas aroma:
                </p>
                <div className="flex flex-wrap gap-2">
                  {['caramel', 'honey', 'toffee', 'cokelat'].map((aroma) => (
                    <span key={aroma} className={`px-3 py-1 rounded-full text-xs ${theme.accentBg} ${theme.accent} border ${theme.accentBorder}`}>
                      {aroma}
                    </span>
                  ))}
                </div>
              </div>

              <blockquote className={`pl-6 border-l-4 ${theme.accentBorder} italic ${theme.textSubheading}`}>
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
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="mb-20 scroll-mt-24"
          >
            <div className={`flex items-center gap-4 mb-8 pb-4 border-b ${theme.border}`}>
              <span className={`text-5xl font-bold ${theme.accent} opacity-30`}>02</span>
              <div>
                <h2 className={`text-3xl font-bold ${theme.textHeading}`}>Coffee Processing</h2>
                <p className={`text-sm ${theme.textMuted} mt-1`}>Anatomi Buah dan Fermentasi</p>
              </div>
            </div>

            <div className="space-y-6">
              <p className={`${theme.text} leading-relaxed text-lg`}>
                <strong>2.1 Anatomi Buah Kopi</strong> — Buah kopi secara botani disebut <em>coffee cherry</em>. 
                Ia terdiri dari beberapa lapisan utama: kulit luar (exocarp), daging buah (mesocarp), 
                lapisan lendir lengket yang kaya gula (mucilage), kulit tanduk (parchment), dan biji kopi itu sendiri.
              </p>

              <div className="grid gap-4">
                {[
                  { name: 'Washed / Fully Washed', desc: 'Clean, acidity cerah, clarity tinggi', color: 'blue' },
                  { name: 'Honey Process', desc: 'Sweet, balance, body medium', color: 'amber' },
                  { name: 'Natural Process', desc: 'Fruity, winey, body tebal', color: 'red' },
                  { name: 'Anaerobic', desc: 'Kompleksitas ekstrem, rasa unik', color: 'purple' }
                ].map((process) => (
                  <div key={process.name} className={`p-4 rounded-lg ${darkMode ? 'bg-neutral-900/30' : 'bg-white'} border ${theme.border} flex items-center justify-between`}>
                    <div>
                      <h4 className={`font-semibold ${theme.textHeading}`}>{process.name}</h4>
                      <p className={`text-sm ${theme.textMuted}`}>{process.desc}</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full bg-${process.color}-500`} />
                  </div>
                ))}
              </div>

              <div className={`p-6 rounded-xl ${theme.highlight} border ${theme.border}`}>
                <h3 className={`font-semibold ${theme.textHeading} mb-3`}>2.2 Apa Itu Fermentasi?</h3>
                <p className={`${theme.text} leading-relaxed`}>
                  Fermentasi dalam kopi adalah proses metabolisme mikroorganisme—terutama ragi dan bakteri asam laktat—
                  yang memakan gula dalam mucilage dan menghasilkan asam organik, alkohol, dan senyawa aroma. 
                  Proses ini bukan sekadar 'membusukkan' kopi, tetapi <strong>mengontrol pembentukan senyawa rasa</strong>.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Bab 3 - Roast Level */}
          <motion.section 
            id="bab-3"
            data-chapter={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="mb-20 scroll-mt-24"
          >
            <div className={`flex items-center gap-4 mb-8 pb-4 border-b ${theme.border}`}>
              <span className={`text-5xl font-bold ${theme.accent} opacity-30`}>03</span>
              <div>
                <h2 className={`text-3xl font-bold ${theme.textHeading}`}>Roast Level & Flavor</h2>
                <p className={`text-sm ${theme.textMuted} mt-1`}>Maillard Reaction & Development</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Roast Level Visual */}
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-neutral-900/50' : 'bg-stone-100'} border ${theme.border}`}>
                <h3 className={`font-semibold ${theme.textHeading} mb-4 text-center`}>Spektrum Roast Level</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="w-20 text-right text-xs font-mono text-green-600">LIGHT</div>
                    <div className="flex-1 h-8 rounded bg-gradient-to-r from-green-200 via-yellow-200 to-amber-700 relative">
                      <div className="absolute inset-0 flex items-center justify-around text-[10px] font-bold text-black/50">
                        <span>Acidity</span>
                        <span>Origin</span>
                        <span className="text-white/70">Bitter</span>
                      </div>
                    </div>
                    <div className="w-20 text-xs font-mono text-amber-900">DARK</div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className={`p-5 rounded-lg border ${theme.border}`}>
                  <h4 className={`font-semibold ${theme.accent} mb-2`}>Maillard Reaction (140–165°C)</h4>
                  <p className={`text-sm ${theme.text}`}>
                    Reaksi antara asam amino dan gula pereduksi menghasilkan ratusan senyawa aroma: 
                    cokelat, kacang, roti panggang, karamel.
                  </p>
                </div>
                <div className={`p-5 rounded-lg border ${theme.border}`}>
                  <h4 className={`font-semibold ${theme.accent} mb-2`}>Karamelisasi (&gt;160°C)</h4>
                  <p className={`text-sm ${theme.text}`}>
                    Gula terurai pada suhu tinggi menghasilkan rasa manis, caramel, toffee, dan burnt sugar.
                  </p>
                </div>
              </div>

              <div className={`p-6 rounded-lg ${theme.code} border ${theme.border}`}>
                <h4 className={`font-semibold ${theme.textHeading} mb-3`}>First Crack vs Second Crack</h4>
                <div className="space-y-3 text-sm">
                  <div className={`flex items-start gap-3 p-3 rounded ${darkMode ? 'bg-neutral-800' : 'bg-white'}`}>
                    <span className={`font-mono ${theme.accent}`}>1st CRACK</span>
                    <span className={theme.text}>Tekanan uap dan gas menyebabkan struktur sel pecah. Transisi endothermic → exothermic.</span>
                  </div>
                  <div className={`flex items-start gap-3 p-3 rounded ${darkMode ? 'bg-neutral-800' : 'bg-white'}`}>
                    <span className={`font-mono ${theme.accent}`}>2nd CRACK</span>
                    <span className={theme.text}>Degradasi struktur sel, pelepasan minyak ke permukaan. Rasa pahit dan smoky mulai dominan.</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Continue with more chapters in similar pattern... */}
          
          {/* Bab 4 - Grind Size */}
          <motion.section 
            id="bab-4"
            data-chapter={4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="mb-20 scroll-mt-24"
          >
            <div className={`flex items-center gap-4 mb-8 pb-4 border-b ${theme.border}`}>
              <span className={`text-5xl font-bold ${theme.accent} opacity-30`}>04</span>
              <div>
                <h2 className={`text-3xl font-bold ${theme.textHeading}`}>Grind Size & Extraction</h2>
                <p className={`text-sm ${theme.textMuted} mt-1`}>Teori Ekstraksi dan Partikel</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className={`p-6 rounded-xl ${theme.highlight} border ${theme.border}`}>
                <h3 className={`font-semibold ${theme.textHeading} mb-3 text-lg`}>4.1 Apa Itu Ekstraksi?</h3>
                <p className={`${theme.text} leading-relaxed`}>
                  Ekstraksi kopi adalah proses pelarutan senyawa kimia dari partikel kopi ke dalam air panas. 
                  Air bertindak sebagai pelarut yang mengambil asam organik, gula terlarut, lipid, dan senyawa pahit 
                  dari jaringan sel kopi. Tujuan ekstraksi bukan mengambil semua senyawa, tetapi mengambilnya dalam 
                  <strong> proporsi yang seimbang</strong>.
                </p>
              </div>

              {/* Extraction Timeline */}
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-neutral-900/30' : 'bg-white'} border ${theme.border}`}>
                <h4 className={`font-semibold ${theme.textHeading} mb-4`}>Urutan Pelarutan Senyawa</h4>
                <div className="space-y-2">
                  {[
                    { phase: '0-20%', compound: 'Asam & Senyawa Aromatik', taste: 'Acidity, Aroma', color: 'text-yellow-500' },
                    { phase: '20-60%', compound: 'Gula & Senyawa Manis', taste: 'Sweetness', color: 'text-amber-500' },
                    { phase: '60-100%', compound: 'Senyawa Pahit & Astringent', taste: 'Bitterness', color: 'text-red-500' },
                  ].map((item) => (
                    <div key={item.phase} className={`flex items-center gap-4 p-3 rounded ${darkMode ? 'bg-neutral-800/50' : 'bg-stone-50'}`}>
                      <span className={`font-mono text-sm ${item.color} w-16`}>{item.phase}</span>
                      <div className="flex-1">
                        <p className={`font-medium ${theme.textHeading} text-sm`}>{item.compound}</p>
                        <p className={`text-xs ${theme.textMuted}`}>{item.taste}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`p-6 rounded-lg ${theme.code} border ${theme.border}`}>
                <h4 className={`font-semibold ${theme.textHeading} mb-3`}>Fines vs Boulders</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className={`p-4 rounded border ${theme.border} ${darkMode ? 'bg-red-900/10' : 'bg-red-50'}`}>
                    <p className={`font-semibold text-red-600 mb-2`}>FINES ⚠️</p>
                    <p className={theme.text}>Partikel sangat halus yang mengekstraksi sangat cepat dan mudah over-extract.</p>
                  </div>
                  <div className={`p-4 rounded border ${theme.border} ${darkMode ? 'bg-blue-900/10' : 'bg-blue-50'}`}>
                    <p className={`font-semibold text-blue-600 mb-2`}>BOULDERS ⚠️</p>
                    <p className={theme.text}>Partikel besar yang mengekstraksi sangat lambat dan mudah under-extract.</p>
                  </div>
                </div>
              </div>

              <blockquote className={`pl-6 border-l-4 ${theme.accentBorder} ${theme.accent} font-medium`}>
                "Grind size adalah kenop utama untuk mengontrol rasa kopi. 
                Ia menghubungkan fisika, kimia, dan sensorik dalam satu variabel sederhana."
              </blockquote>
            </div>
          </motion.section>

          {/* Bab 5 - Espresso */}
          <motion.section 
            id="bab-5"
            data-chapter={5}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="mb-20 scroll-mt-24"
          >
            <div className={`flex items-center gap-4 mb-8 pb-4 border-b ${theme.border}`}>
              <span className={`text-5xl font-bold ${theme.accent} opacity-30`}>05</span>
              <div>
                <h2 className={`text-3xl font-bold ${theme.textHeading}`}>Espresso Fundamentals</h2>
                <p className={`text-sm ${theme.textMuted} mt-1`}>Tekanan 9 Bar dan Parameter Kritis</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className={`p-6 rounded-xl ${theme.highlight} border ${theme.border}`}>
                <h3 className={`font-semibold ${theme.textHeading} mb-4 text-lg`}>5.1 Definisi Ilmiah Espresso</h3>
                <p className={`${theme.text} leading-relaxed mb-4`}>
                  Espresso adalah metode ekstraksi kopi menggunakan <strong>air panas bertekanan tinggi</strong> yang dipaksa 
                  melewati bed kopi yang dipadatkan. Secara teknis, espresso didefinisikan sebagai:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'Tekanan', value: '9 bar', desc: '~130 psi' },
                    { label: 'Suhu', value: '90–96°C', desc: 'Ideal: 93°C' },
                    { label: 'Waktu', value: '25–30s', desc: 'Golden zone' },
                    { label: 'Rasio', value: '1:2', desc: 'Kopi:Liquid' },
                  ].map((param) => (
                    <div key={param.label} className={`p-3 rounded-lg ${darkMode ? 'bg-neutral-800' : 'bg-white'} border ${theme.border} text-center`}>
                      <p className={`text-xs ${theme.textMuted} uppercase tracking-wider`}>{param.label}</p>
                      <p className={`text-lg font-bold ${theme.accent} mt-1`}>{param.value}</p>
                      <p className={`text-xs ${theme.textMuted}`}>{param.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`p-6 rounded-lg ${theme.code} border ${theme.border}`}>
                <h4 className={`font-semibold ${theme.textHeading} mb-3`}>5.9 Crema Science</h4>
                <p className={`${theme.text} text-sm leading-relaxed mb-3`}>
                  Crema adalah <strong>emulsi gas CO2, minyak kopi, dan air</strong>. 
                  Crema bukan indikator rasa enak, tetapi indikator kesegaran kopi dan tekanan ekstraksi.
                </p>
                <div className={`flex items-center gap-2 text-xs ${theme.textMuted}`}>
                  <span className={`px-2 py-1 rounded ${darkMode ? 'bg-neutral-800' : 'bg-stone-200'}`}>CO2</span>
                  <span>+</span>
                  <span className={`px-2 py-1 rounded ${darkMode ? 'bg-neutral-800' : 'bg-stone-200'}`}>Minyak Kopi</span>
                  <span>+</span>
                  <span className={`px-2 py-1 rounded ${darkMode ? 'bg-neutral-800' : 'bg-stone-200'}`}>Air</span>
                  <span>=</span>
                  <span className={`px-2 py-1 rounded ${theme.accentBg} ${theme.accent}`}>Crema</span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Quick Navigation to remaining chapters */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-20"
          >
            <div className={`p-8 rounded-2xl ${theme.highlight} border ${theme.border} text-center`}>
              <BookOpen size={48} className={`mx-auto mb-4 ${theme.accent} opacity-50`} />
              <h3 className={`text-2xl font-bold ${theme.textHeading} mb-2`}>15 Bab Lainnya</h3>
              <p className={`${theme.textMuted} mb-6 max-w-md mx-auto`}>
                Buku ini mencakup 20 bab lengkap tentang sains kopi, dari sensory science hingga coffee economics.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((num) => (
                  <a
                    key={num}
                    href={`#bab-${num}`}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${theme.border} ${darkMode ? 'hover:bg-neutral-800' : 'hover:bg-stone-100'} ${theme.textMuted}`}
                  >
                    Bab {num}
                  </a>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Sample content for remaining chapters */}
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
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="mb-20 scroll-mt-24"
            >
              <div className={`flex items-center gap-4 mb-8 pb-4 border-b ${theme.border}`}>
                <span className={`text-5xl font-bold ${theme.accent} opacity-30`}>
                  {String(chapter.id).padStart(2, '0')}
                </span>
                <div>
                  <h2 className={`text-3xl font-bold ${theme.textHeading}`}>{chapter.title}</h2>
                  <p className={`text-sm ${theme.textMuted} mt-1`}>{chapter.subtitle}</p>
                </div>
              </div>
              
              <div className={`p-6 rounded-xl ${theme.highlight} border ${theme.border}`}>
                <p className={`${theme.text} leading-relaxed text-lg`}>{chapter.content}</p>
              </div>

              {chapter.id === 20 && (
                <div className={`mt-8 p-8 rounded-xl ${theme.accentBg} border ${theme.accentBorder} text-center`}>
                  <p className={`text-xl font-light italic ${theme.accent} mb-4`}>
                    "Menjadi barista berarti memilih jalan presisi, kerendahan hati, 
                    dan dedikasi seumur hidup terhadap kualitas."
                  </p>
                  <p className={`text-sm ${theme.textMuted}`}>— Wildan Ferdiansyah</p>
                </div>
              )}
            </motion.section>
          ))}

          {/* Footer */}
          <motion.footer 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className={`pt-12 border-t ${theme.border} text-center`}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className={`w-16 h-px ${theme.border} ${darkMode ? 'bg-neutral-700' : 'bg-stone-300'}`} />
              <Coffee size={20} className={theme.accent} />
              <span className={`w-16 h-px ${theme.border} ${darkMode ? 'bg-neutral-700' : 'bg-stone-300'}`} />
            </div>
            <p className={`text-sm ${theme.textMuted}`}>
              Coffee from Bean to Cup: A Serious Guide
            </p>
            <p className={`text-xs ${theme.textMuted} mt-2`}>
              © 2025 Wildan Ferdiansyah. All rights reserved.
            </p>
          </motion.footer>

        </div>
      </main>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg z-40 ${theme.accentBg} ${theme.accent} border ${theme.accentBorder} hover:scale-110 transition-transform`}
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
