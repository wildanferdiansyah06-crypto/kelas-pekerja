'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, AnimatePresence, useSpring } from 'framer-motion';
import { Moon, Sun, Coffee, BookOpen, ChevronUp, Quote, Settings2, X, Type, Palette } from 'lucide-react';

export default function MasaYangTakPernahBertanyaIzinPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [showTexture, setShowTexture] = useState(true);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [showControls, setShowControls] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Smooth progress untuk reading indicator
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Sync dengan tema global
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

  // Toggle tema & sync ke global
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Background pattern untuk texture
  const backgroundPattern = showTexture ? (
    <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.02]" 
         style={{
           backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
         }} />
  ) : null;

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen transition-colors duration-500 ${
        darkMode ? 'bg-gray-950 text-gray-100' : 'bg-amber-50 text-gray-900'
      }`}
    >
      {backgroundPattern}
      
      {/* Reading Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 z-50"
        style={{ scaleX: smoothProgress }}
      />

      {/* Floating Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={`fixed right-4 top-1/2 -translate-y-1/2 p-4 rounded-2xl shadow-2xl z-40 ${
              darkMode ? 'bg-gray-900/95 border border-gray-800' : 'bg-white/95 border border-gray-200'
            }`}
          >
            <div className="flex flex-col gap-4">
              <button
                onClick={() => setShowControls(false)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <X size={20} />
              </button>
              
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'bg-amber-500/20 text-amber-400' 
                    : 'bg-amber-500 text-white'
                }`}
              >
                {darkMode ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              
              <button
                onClick={() => setShowTexture(!showTexture)}
                className={`p-2 rounded-lg transition-colors ${
                  showTexture
                    ? 'bg-blue-500/20 text-blue-400'
                    : darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Palette size={20} />
              </button>
              
              <button
                onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
                className={`p-2 rounded-lg transition-colors ${
                  fontSize === 'large'
                    ? 'bg-purple-500/20 text-purple-400'
                    : darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Type size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Toggle */}
      <button
        onClick={() => setShowControls(!showControls)}
        className={`fixed right-4 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-lg z-30 transition-all ${
          darkMode ? 'bg-gray-900/90 hover:bg-gray-800 text-gray-400' : 'bg-white/90 hover:bg-gray-100 text-gray-600'
        }`}
      >
        <Settings2 size={24} />
      </button>

      {/* Scroll to Top */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollYProgress.get() > 0.1 ? 1 : 0 }}
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg z-30 transition-all ${
          darkMode ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'bg-amber-500 hover:bg-amber-600 text-white'
        }`}
      >
        <ChevronUp size={24} />
      </motion.button>

      {/* Main Content */}
      <main className={`max-w-4xl mx-auto px-6 py-16 ${fontSize === 'large' ? 'text-xl' : 'text-base'}`}>
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <Coffee size={64} className={darkMode ? 'text-amber-500' : 'text-amber-600'} />
          </motion.div>
          
          <h1 className={`font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`} style={{ fontSize: fontSize === 'large' ? '3.5rem' : '2.5rem' }}>
            Masa yang Tak Pernah Bertanya Izin
          </h1>
          
          <p className={`text-xl mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Tentang Waktu yang Berlalu Tanpa Permisi dan Kenangan yang Tertinggal
          </p>
          
          <div className={`flex items-center gap-4 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            <span>📖 40 menit baca</span>
            <span>•</span>
            <span>📅 7 Mei 2026</span>
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className={`space-y-16 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          
          {/* Section 1 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
              Masa Itu Pernahkah Minta Izin?
            </h2>
            
            <p className="mb-4 leading-relaxed">
              Masa itu tidak pernah bertanya izin. Dia datang, lewat, dan pergi begitu saja, meninggalkan kita dengan tumpukan kenangan yang kadang terlalu berat untuk dibawa. Kita tidak pernah tahu kapan exactly masa itu akan berubah. Satu detik kita masih di situ, detik berikutnya kita sudah di sini, dan kita tidak pernah benar-benar siap.
            </p>
            
            <p className="mb-4 leading-relaxed">
              Mungkin itu yang membuatnya begitu menakutkan—ketidakpastian. Kita suka merasa berada di kendali, suka merasa bahwa kita bisa memutuskan kapan harus mulai dan kapan harus berhenti. Tapi masa? Masa tidak peduli dengan rencana kita. Dia bergerak sesuai jamnya sendiri, tanpa mempedulikan apakah kita sudah siap atau belum.
            </p>
          </motion.section>

          {/* Quote 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`py-8 px-6 rounded-2xl border-l-4 ${
              darkMode 
                ? 'bg-gray-900/50 border-amber-500 text-gray-300' 
                : 'bg-amber-50 border-amber-500 text-gray-700'
            }`}
          >
            <Quote className={`mb-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} size={32} />
            <p className="text-xl italic mb-4">
              "Waktu tidak pernah menunggu siapapun. Dia berlalu, mengubah segalanya, dan kita hanya bisa menonton dari pinggir, berharap kita bisa menangkap momen-momen yang benar-benar berharga sebelum mereka hilang selamanya."
            </p>
          </motion.div>

          {/* Section 2 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
              Orang-Orang yang Pergi Tanpa Pamit
            </h2>
            
            <p className="mb-4 leading-relaxed">
              Ada orang-orang yang pergi tanpa pamit. Mereka ada di hidup kita suatu hari, dan besoknya mereka sudah tidak. Tidak ada drama, tidak ada perpisahan yang dramatis, hanya keheningan yang tiba-tiba menjadi terlalu berat. Dan kita duduk di sana, bertanya-tanya apa yang salah, apa yang kurang, kenapa mereka memilih pergi begitu saja.
            </p>
            
            <p className="mb-4 leading-relaxed">
              Tapi mungkin itu juga bagian dari masa. Masa yang membawa orang-orang itu pergi, tanpa pernah bertanya izin kepada kita. Tanpa pernah mempertimbangkan apakah kita sudah siap kehilangan mereka atau belum. Mereka pergi, dan kita harus belajar hidup tanpa mereka, meskipun rasanya seperti kehilangan sebagian dari diri sendiri.
            </p>
          </motion.section>

          {/* Section 3 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
              Belajar Menerima Ketidakpastian
            </h2>
            
            <p className="mb-4 leading-relaxed">
              Bagian tersulit dari masa adalah belajar menerima bahwa tidak semua hal bisa dikendalikan. Kita bisa merencanakan, kita bisa berusaha, tapi pada akhirnya, masa yang menentukan. Ada hal-hal yang terjadi di luar kendali kita, dan terkadang yang terbaik yang bisa kita lakukan adalah menerima dan terus bergerak maju.
            </p>
            
            <p className="mb-4 leading-relaxed">
              Menerima tidak berarti menyerah. Menerima berarti memahami bahwa ada hal-hal yang tidak bisa kita ubah, dan fokus pada hal-hal yang masih bisa kita lakukan. Masa mungkin tidak pernah bertanya izin, tapi kita masih punya pilihan tentang bagaimana kita merespons perubahannya.
            </p>
          </motion.section>

          {/* Quote 2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`py-8 px-6 rounded-2xl border-l-4 ${
              darkMode 
                ? 'bg-gray-900/50 border-amber-500 text-gray-300' 
                : 'bg-amber-50 border-amber-500 text-gray-700'
            }`}
          >
            <Quote className={`mb-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} size={32} />
            <p className="text-xl italic mb-4">
              "Kita tidak bisa menghentikan waktu, tapi kita bisa memilih bagaimana menghabiskannya. Setiap detik adalah kesempatan untuk menciptakan kenangan yang berharga, untuk menjadi orang yang lebih baik, untuk mencintai lebih dalam."
            </p>
          </motion.div>

          {/* Section 4 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
              Kenangan yang Tertinggal
            </h2>
            
            <p className="mb-4 leading-relaxed">
              Masa meninggalkan kenangan. Beberapa kenangan indah yang membuat kita tersenyum meskipun sudah bertahun-tahun berlalu. Beberapa kenangan menyakitkan yang masih bisa membuat kita menangis jika diingat kembali. Tapi semua kenangan itu adalah bagian dari kita, membentuk siapa kita hari ini.
            </p>
            
            <p className="mb-4 leading-relaxed">
              Mungkin itu hadiah terbesar dari masa—kenangan. Meskipun masa tidak pernah bertanya izin sebelum membawa perubahan, dia meninggalkan jejak-jejak yang bisa kita pegang. Kenangan-kenangan yang mengingatkan kita bahwa kita pernah hidup, pernah mencintai, pernah merasa, pernah ada.
            </p>
          </motion.section>

          {/* Section 5 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
              Hidup di Masa Sekarang
            </h2>
            
            <p className="mb-4 leading-relaxed">
              Jika masa tidak pernah bertanya izin, maka satu-satunya hal yang bisa kita lakukan adalah hidup sepenuhnya di masa sekarang. Jangan menunggu masa yang "tepat" karena masa yang tepat tidak pernah benar-benar ada. Hari ini adalah satu-satunya waktu yang kita miliki.
            </p>
            
            <p className="mb-4 leading-relaxed">
              Cintai sekarang. Tertawalah sekarang. Berkarya sekarang. Jangan tunda kebahagiaan untuk masa depan yang tidak pasti. Masa mungkin tidak pernah bertanya izin, tapi kita masih punya kebebasan untuk memilih bagaimana kita mengisi setiap detik yang diberikan kepada kita.
            </p>
          </motion.section>

          {/* Closing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`py-12 px-8 rounded-2xl text-center ${
              darkMode ? 'bg-gray-900/50' : 'bg-amber-100/50'
            }`}
          >
            <BookOpen className={`mx-auto mb-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} size={48} />
            <p className="text-xl italic mb-4">
              "Masa mungkin tidak pernah bertanya izin, tapi kita selalu punya pilihan untuk membuat setiap detik berarti."
            </p>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              — Wildan Ferdiansyah
            </p>
          </motion.div>

        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 pt-8 border-t border-gray-200 dark:border-gray-800 text-center"
        >
          <p className={darkMode ? 'text-gray-500' : 'text-gray-600'}>
            Terima kasih sudah membaca. Semoga tulisan ini bisa memberikan sedikit ketenangan di tengah masa yang terus bergerak.
          </p>
        </motion.div>

      </main>
    </div>
  );
}
