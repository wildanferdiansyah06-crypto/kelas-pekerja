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
          
          {/* Catatan untuk Pembaca */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <div className={`py-8 px-6 rounded-2xl ${darkMode ? 'bg-gray-900/50' : 'bg-amber-50'}`}>
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                Catatan untuk Pembaca
              </h2>
              <p className="mb-4 leading-relaxed">
                Buku ini bukan tentang perubahan besar. Buku ini tentangmu yang dulu pernah duduk di lantai kamar, menatap langit-langit, dan merasa bahwa segalanya akan selalu begini.
              </p>
              <p className="leading-relaxed">
                Kamu salah. Bukan karena segalanya berubah. Tapi karena kamu tidak pernah sadar kapan perubahan itu terjadi.
              </p>
            </div>
          </motion.section>

          {/* BAGIAN PERTAMA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
              BAGIAN PERTAMA: HARI-HARI YANG SAMA
            </h2>
          </motion.div>

          {/* Bab 1 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
              1. Alarm yang Sama
            </h3>
            <p className="mb-4 leading-relaxed">
              Pagi itu, seperti pagi kemarin, dan kemarinnya lagi.
            </p>
            <p className="mb-4 leading-relaxed">
              Bunyi alarm dari ponsel yang sudah mulai lemot. Kamu menekan tombol snooze. Sekali. Dua kali. Tiga kali. Hingga akhirnya terpaksa bangun karena takut terlambat.
            </p>
            <p className="mb-4 leading-relaxed">
              Kamu tidak ingat kapan kebiasaan ini dimulai. Yang kamu tahu, ini sudah berlangsung lama. Terlalu lama, mungkin.
            </p>
            <p className="mb-4 leading-relaxed">
              Kamar mandi. Sikat gigi. Air mengalir. Cermin yang sama. Wajah yang sama. Hanya rambut yang sedikit lebih panjang dari bulan lalu. Atau mungkin lebih pendek? Kamu tidak yakin.
            </p>
            <p className="mb-4 leading-relaxed">
              Di dapur, ibumu menyiapkan sarapan. Menu yang sama. Nasi, telur, kecap. Kamu duduk di kursi yang sama. Meja yang sama. Piring yang sama.
            </p>
            <p className="mb-4 leading-relaxed">
              "Hati-hati di jalan," kata ibumu. Seperti biasa. Kamu mengangguk. Seperti biasa.
            </p>
            <p className="leading-relaxed">
              Dan kamu berangkat.
            </p>
          </motion.section>

          {/* Bab 2 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
              2. Jalan yang Sama
            </h3>
            <p className="mb-4 leading-relaxed">
              Jalan itu masih sama.
            </p>
            <p className="mb-4 leading-relaxed">
              Trotoar yang retak di sebelah kiri, yang sudah retak sejak kamu masih SMA. Pohon mangga tua yang rindangnya masih sama, meski daun-daunnya sudah berganti berkali-kali. Warung kopi di sudut yang selalu ramai pagi-pagi, dengan pemiliknya yang selalu sibuk mengaduk kopi sambil melihat ponsel.
            </p>
            <p className="mb-4 leading-relaxed">
              Kamu lewat di sini setiap hari. Setiap. Hari.
            </p>
            <p className="mb-4 leading-relaxed">
              Terkadang kamu melihat wajah-wajah yang sama. Bapak-bapak yang jogging dengan kaos lusuh. Ibu-ibu yang membawa tas belanjaan. Anak sekolah yang berlarian, tasnya terbuka, buku-buku hampir jatuh.
            </p>
            <p className="mb-4 leading-relaxed">
              Kamu tidak mengenal mereka. Tapi kamu mengenal wajah mereka.
            </p>
            <p className="mb-4 leading-relaxed">
              Dan entah kenapa, itu menenangkan.
            </p>
            <p className="leading-relaxed">
              Seperti mengetahui bahwa di dunia yang terus berputar, ada hal-hal yang tetap diam di tempatnya.
            </p>
          </motion.section>

          {/* Bab 3 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
              3. Ruang yang Sama
            </h3>
            <p className="mb-4 leading-relaxed">
              Meja kerjamu masih di tempat yang sama.
            </p>
            <p className="mb-4 leading-relaxed">
              Komputer yang sama. Kursi yang sama. Pemandangan dari jendela yang sama-gedung-gedung yang kamu sudah hafal bentuknya.
            </p>
            <p className="mb-4 leading-relaxed">
              Rekan kerja duduk di meja sebelah. Dia membuka laptop. Mengetik. Minum kopi. Sama seperti kemarin.
            </p>
            <p className="mb-4 leading-relaxed">
              Kamu menatap layar. Email yang sama. Laporan yang sama. Deadline yang sama. Jam berlalu tanpa suara.
            </p>
            <p className="mb-4 leading-relaxed">
              Kamu tidak sadar kapan matahari mulai condong ke barat. Yang kamu tahu, tiba-tiba sudah jam lima sore.
            </p>
            <p className="leading-relaxed">
              Dan kamu pulang.
            </p>
          </motion.section>

          {/* Bab 4 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
              4. Malam yang Sama
            </h3>
            <p className="mb-4 leading-relaxed">
              Malam itu datang tanpa peringatan.
            </p>
            <p className="mb-4 leading-relaxed">
              Seperti malam-malam sebelumnya, kamu duduk di sofa. Menonton sesuatu di layar. Atau mungkin tidak menonton apa-apa-kamu tidak benar-benar memperhatikan.
            </p>
            <p className="mb-4 leading-relaxed">
              Ponsel di tangan. Gulir ke bawah. Ke bawah. Ke bawah.
            </p>
            <p className="mb-4 leading-relaxed">
              Foto seseorang yang baru menikah. Teman lama yang pindah ke kota lain. Seseorang yang memposting foto masa kecilnya.
            </p>
            <p className="mb-4 leading-relaxed">
              Kamu berhenti sejenak di foto itu. Masa kecil.
            </p>
            <p className="mb-4 leading-relaxed">
              Kamu mencoba mengingat. Bukan wajah-wajah, bukan nama-nama. Tapi rasanya. Rasa menjadi anak kecil yang tidak tahu apa-apa, yang berlari tanpa lelah, yang tertawa tanpa alasan.
            </p>
            <p className="mb-4 leading-relaxed">
              Kamu tidak bisa.
            </p>
            <p className="mb-4 leading-relaxed">
              Bukan karena kamu lupa. Tapi karena rasanya sudah terlalu jauh. Seperti mencoba meraih seseorang di ujung terowongan yang gelap.
            </p>
            <p className="mb-4 leading-relaxed">
              Kamu menutup ponsel.
            </p>
            <p className="mb-4 leading-relaxed">
              Langit-langit kamarmu masih sama. Lampu yang sama. Suasana yang sama. Kamu tidur.
            </p>
            <p className="leading-relaxed">
              Dan besok, semuanya akan sama lagi.
            </p>
          </motion.section>

          {/* Bab 5 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
              5. Yang Berubah Tanpa Izin
            </h3>
            <p className="mb-4 leading-relaxed">
              Suatu hari, tanpa kamu sadari, sesuatu berbeda.
            </p>
            <p className="mb-4 leading-relaxed">
              Bukan perubahan besar. Bukan sesuatu yang bisa kamu tunjuk dan katakan, "Ini berbeda." Tapi ada.
            </p>
            <p className="mb-4 leading-relaxed">
              Mungkin itu bunyi langkah kakimu di koridor yang sedikit lebih berat dari dulu. Mungkin itu cara kamu mengunci pintu yang sekarang dilakukan tanpa berpikir. Mungkin itu ekspresi wajahmu di cermin yang tidak lagi terlihat asing.
            </p>
            <p className="mb-4 leading-relaxed">
              Kamu tidak tahu kapan semua ini terjadi.
            </p>
            <p className="mb-4 leading-relaxed">
              Yang kamu tahu, suatu pagi kamu bangun dan merasa... berbeda. Bukan lebih baik. Bukan lebih buruk. Hanya berbeda.
            </p>
            <p className="leading-relaxed">
              Seperti buku yang sudah dibaca setengahnya. Halaman-halaman awal masih sama, tapi kamu sudah bukan pembaca yang sama.
            </p>
          </motion.section>

          {/* Bab 6 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
              6. Yang Hilang di Antara Hari
            </h3>
            <p className="mb-4 leading-relaxed">
              Ada hal-hal yang hilang tanpa pamit.
            </p>
            <p className="mb-4 leading-relaxed">
              Bukan barang. Bukan orang. Tapi... sesuatu yang lebih sulit dijelaskan.
            </p>
            <p className="mb-4 leading-relaxed">
              Cara tertawamu yang dulu lebih keras. Cara marahmu yang dulu lebih cepat reda. Cara berharapmu yang dulu lebih berani.
            </p>
            <p className="mb-4 leading-relaxed">
              Kamu tidak sadar kapan mereka pergi.
            </p>
            <p className="mb-4 leading-relaxed">
              Mungkin saat kamu terlalu sibuk memikirkan hari esok. Mungkin saat kamu terlalu lelah menatap hari ini. Mungkin saat kamu terlalu cepat melupakan hari kemarin.
            </p>
            <p className="mb-4 leading-relaxed">
              Yang tersisa hanya bayangan mereka.
            </p>
            <p className="mb-4 leading-relaxed">
              Bayangan yang kadang muncul tiba-tiba-saat aroma kopi tertentu, saat lagu lama diputar, saat seseorang memanggil namamu dengan cara yang sudah lama tidak kamu dengar.
            </p>
            <p className="leading-relaxed">
              Dan untuk sekejap, kamu kembali menjadi dirimu yang dulu. Sebelum pergi lagi.
            </p>
          </motion.section>

          {/* Bab 7 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
              7. Yang Tersisa di Balik Pintu
            </h3>
            <p className="mb-4 leading-relaxed">
              Pintu kamar lamamu masih ada.
            </p>
            <p className="mb-4 leading-relaxed">
              Di rumah orangtuamu. Di ujung koridor. Dengan goresan-goresan pensil di permukaannya-tinggi badanmu yang dicatat setiap tahun, dari umur lima hingga tujuh belas.
            </p>
            <p className="mb-4 leading-relaxed">
              Kamu tidak pernah menghapusnya.
            </p>
            <p className="mb-4 leading-relaxed">
              Entah kenapa.
            </p>
            <p className="mb-4 leading-relaxed">
              Mungkin karena di balik pintu itu, ada dunia yang sudah tidak pernah kamu masuki lagi. Dunia di mana segalanya masih sederhana. Di mana masalah terbesarmu adalah PR matematika yang belum selesai. Di masa depan masih terasa jauh dan tidak menakutkan.
            </p>
            <p className="mb-4 leading-relaxed">
              Kamu membuka pintu itu terakhir kali kapan? Tiga tahun lalu? Lima? Kamu tidak ingat.
            </p>
            <p className="mb-4 leading-relaxed">
              Yang kamu ingat, setiap kali kamu pulang ke rumah orangtuamu, kamu selalu melewati koridor itu. Tapi kamu tidak pernah membuka pintunya.
            </p>
            <p className="leading-relaxed">
              Seperti takut akan menemukan sesuatu yang sudah tidak kamu kenali. Atau lebih buruk-menemukan sesuatu yang masih persis sama, sementara kamu sudah berubah.
            </p>
          </motion.section>

          {/* Bab 8 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
              8. Yang Tertinggal di Laci
            </h3>
            <p className="mb-4 leading-relaxed">
              Di laci meja kerjamu, ada sesuatu yang sudah lama tidak kamu lihat. Surat.
            </p>
            <p className="mb-4 leading-relaxed">
              Bukan email. Bukan chat. Tapi surat tulisan tangan, di atas kertas yang sudah menguning di tepinya. Dari seseorang yang dulu kamu anggap akan selalu ada.
            </p>
            <p className="mb-4 leading-relaxed">
              Kamu tidak membukanya lagi. Kamu hanya tahu dia ada di sana, bersama pena yang sudah kering tintanya, dan kenangan yang sudah tidak lagi sama.
            </p>
            <p className="mb-4 leading-relaxed">
              Ada kalanya kamu ingin membacanya lagi. Tapi kamu takut.
            </p>
            <p className="mb-4 leading-relaxed">
              Takut bahwa kata-kata yang dulu terasa hangat sekarang terasa asing. Takut bahwa rasa yang dulu terasa nyata sekarang terasa palsu. Takut bahwa orang yang menulisnya dan orang yang membacanya sekarang adalah dua orang yang berbeda.
            </p>
            <p className="leading-relaxed">
              Jadi kamu menutup laci. Dan berpura-pura lupa.
            </p>
          </motion.section>

          {/* BAGIAN KETIGA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
              BAGIAN KETIGA: SUARA-SUARA DARI MASA LALU
            </h2>
          </motion.div>

          {/* Bab 9 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
              9. Lagu yang Salah Waktu
            </h3>
            <p className="mb-4 leading-relaxed">
              Radio di taksi memutar lagu itu.
            </p>
            <p className="mb-4 leading-relaxed">
              Lagu yang kamu tidak dengar selama bertahun-tahun.
            </p>
            <p className="mb-4 leading-relaxed">
              Suara gitar yang sama. Lirik yang sama. Tapi rasanya... berbeda.
            </p>
            <p className="mb-4 leading-relaxed">
              Dulu, lagu ini tentang seseorang yang kamu cintai. Sekarang, lagu ini tentang seseorang yang kamu lupakan.
            </p>
            <p className="mb-4 leading-relaxed">
              Bukan karena kamu ingin melupakan. Tapi karena waktu tidak pernah bertanya apakah kamu siap untuk melepaskan.
            </p>
            <p className="leading-relaxed">
              Kamu menatap jendela taksi. Kota yang sama, tapi tidak lagi terlihat sama. Atau mungkin, kamu yang tidak lagi sama.
            </p>
          </motion.section>

          {/* Bab 10 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
              10. Foto yang Tidak Kamu Ambil
            </h3>
            <p className="mb-4 leading-relaxed">
              Galeri ponselmu penuh dengan foto.
            </p>
            <p className="mb-4 leading-relaxed">
              Makanan. Pemandangan. Selfie. Tapi ada satu foto yang tidak pernah kamu ambil. Foto dirimu, dulu.
            </p>
            <p className="mb-4 leading-relaxed">
              Bukan wajah. Bukan pakaian. Tapi momen.
            </p>
            <p className="mb-4 leading-relaxed">
              Momen saat kamu masih percaya bahwa segalanya akan baik-baik saja. Saat kamu masih berani bermimpi tanpa takut jatuh. Saat kamu masih bisa tertawa tanpa merasa bersalah.
            </p>
            <p className="leading-relaxed">
              Kamu tidak punya foto itu. Karena saat itu terjadi, kamu terlalu sibuk hidup untuk menyadari bahwa itu adalah momen yang perlu diabadikan.
            </p>
          </motion.section>

          {/* Bab 11 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
              11. Tempat yang Tidak Pernah Kamu Kunjungi Lagi
            </h3>
            <p className="mb-4 leading-relaxed">
              Ada sebuah tempat.
            </p>
            <p className="mb-4 leading-relaxed">
              Bukan tempat istimewa. Bukan tempat indah. Hanya sebuah bangku di taman, di dekat kolam yang airnya tidak pernah bening.
            </p>
            <p className="mb-4 leading-relaxed">
              Kamu duduk di sana, dulu.
            </p>
            <p className="mb-4 leading-relaxed">
              Dengan seseorang. Atau sendiri. Kamu tidak ingat dengan pasti.
            </p>
            <p className="mb-4 leading-relaxed">
              Yang kamu ingat, angin di sana terasa berbeda. Lebih lambat. Lebih lembut. Seperti dunia sedang menunggumu menarik napas.
            </p>
            <p className="mb-4 leading-relaxed">
              Kamu tidak pernah kembali ke sana.
            </p>
            <p className="leading-relaxed">
              Bukan karena kamu tidak mau. Tapi karena kamu takut tempat itu sudah berubah. Atau lebih buruk-takut bahwa tempat itu masih sama, tapi kamu sudah tidak lagi bisa merasakan apa yang dulu kamu rasakan.
            </p>
          </motion.section>

          {/* Bab 12 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
              12. Nama yang Tidak Pernah Kamu Ucapkan Lagi
            </h3>
            <p className="mb-4 leading-relaxed">
              Ada nama yang tidak pernah kamu ucapkan lagi.
            </p>
            <p className="mb-4 leading-relaxed">
              Bukan karena kamu lupa. Tapi karena mengucapkannya terasa seperti membuka pintu yang sudah lama terkunci.
            </p>
            <p className="mb-4 leading-relaxed">
              Pintu ke ruangan yang penuh dengan debu dan bayangan.
            </p>
            <p className="mb-4 leading-relaxed">
              Kamu tidak tahu apa yang akan kamu temukan di sana.
            </p>
            <p className="mb-4 leading-relaxed">
              Mungkin kenangan yang masih hangat. Mungkin luka yang belum sembuh. Mungkin hanya keheningan yang terlalu keras untuk ditahan.
            </p>
            <p className="mb-4 leading-relaxed">
              Jadi kamu membiarkan nama itu diam. Di sudut pikiranmu.
            </p>
            <p className="leading-relaxed">
              Tidak mati. Tidak hidup. Hanya... ada.
            </p>
          </motion.section>

          {/* BAGIAN KEEMPAT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
              BAGIAN KEEMPAT: SAAT KAMU MENYADARI
            </h2>
          </motion.div>

          {/* Bab 13 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
              13. Cermin yang Berbeda
            </h3>
            <p className="mb-4 leading-relaxed">
              Suatu pagi, kamu menatap cermin.
            </p>
            <p className="mb-4 leading-relaxed">
              Bukan cermin yang biasa. Bukan cermin di kamar mandi atau di mobil. Tapi cermin di mata seseorang. Seseorang yang baru kamu kenal.
            </p>
            <p className="mb-4 leading-relaxed">
              Dia melihatmu, dan untuk sekejap, kamu melihat dirimu dari sudut pandang yang tidak pernah kamu lihat sebelumnya.
            </p>
            <p className="mb-4 leading-relaxed">
              Bukan lebih baik. Bukan lebih buruk. Hanya berbeda. Dan kamu sadar-
            </p>
            <p className="mb-4 leading-relaxed">
              Dirimu yang dulu, yang sekarang, dan yang akan datang, adalah orang-orang yang berbeda.
            </p>
            <p className="mb-4 leading-relaxed">
              Bukan karena kamu berubah secara drastis. Tapi karena setiap hari, setiap jam, setiap detik, ada bagian kecil dari dirimu yang berganti.
            </p>
            <p className="leading-relaxed">
              Seperti sungai yang airnya selalu berbeda, meski sungainya tetap sama.
            </p>
          </motion.section>

          {/* Bab 14 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
              14. Pertanyaan yang Tidak Pernah Terjawab
            </h3>
            <p className="mb-4 leading-relaxed">
              Ada pertanyaan yang selalu kamu bawa.
            </p>
            <p className="mb-4 leading-relaxed">
              "Apakah aku sudah menjadi orang yang dulu aku inginkan?" Kamu tidak punya jawaban.
            </p>
            <p className="mb-4 leading-relaxed">
              Bukan karena kamu tidak tahu. Tapi karena pertanyaan itu sendiri sudah berubah maknanya. Dulu, itu tentang impian. Sekarang, itu tentang sesuatu yang lebih rumit.
            </p>
            <p className="mb-4 leading-relaxed">
              Tentang apakah kamu masih mengenali dirimu sendiri. Tentang apakah kamu masih bisa merasa sesuatu yang dulu kamu rasakan. Tentang apakah kamu masih... kamu.
            </p>
            <p className="mb-4 leading-relaxed">
              Dan kamu sadar, mungkin tidak ada jawaban yang benar. Hanya perjalanan.
            </p>
            <p className="mb-4 leading-relaxed">
              Yang terus berjalan.
            </p>
            <p className="leading-relaxed">
              Tanpa henti.
            </p>
          </motion.section>

          {/* Bab 15 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
              15. Yang Kamu Rindukan Sebenarnya
            </h3>
            <p className="mb-4 leading-relaxed">
              Kamu rindu.
            </p>
            <p className="mb-4 leading-relaxed">
              Bukan pada tempat. Bukan pada orang. Tapi pada rasanya.
            </p>
            <p className="mb-4 leading-relaxed">
              Rasa menjadi seseorang yang masih punya waktu yang tidak terbatas. Rasa menjadi seseorang yang masih percaya bahwa masa depan adalah sesuatu yang indah. Rasa menjadi seseorang yang masih bisa menangis dan tertawa tanpa merasa lelah.
            </p>
            <p className="mb-4 leading-relaxed">
              Kamu rindu pada dirimu yang dulu.
            </p>
            <p className="mb-4 leading-relaxed">
              Bukan karena dirimu sekarang lebih buruk. Tapi karena dirimu dulu adalah seseorang yang kamu sudah tidak bisa jadi lagi.
            </p>
            <p className="leading-relaxed">
              Dan itu bukan tragedi. Itu hanya... hidup.
            </p>
          </motion.section>

          {/* BAGIAN KELIMA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
              BAGIAN KELIMA: YANG TETAP ADA
            </h2>
          </motion.div>

          {/* Bab 16 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
              16. Yang Tidak Pernah Pergi
            </h3>
            <p className="mb-4 leading-relaxed">
              Tapi di tengah semua yang berubah, ada hal-hal yang tetap. Bukan banyak. Tapi cukup.
            </p>
            <p className="mb-4 leading-relaxed">
              Cara kamu menatap langit saat sedang bingung. Cara kamu menggigit bibir saat sedang cemas. Cara kamu tersenyum saat melihat sesuatu yang lucu, meski kamu sudah lupa apa yang membuatmu tertawa dulu.
            </p>
            <p className="mb-4 leading-relaxed">
              Ada bagian dari dirimu yang tidak pernah berubah.
            </p>
            <p className="mb-4 leading-relaxed">
              Bagian yang masih anak kecil yang berlari di halaman rumah. Bagian yang masih remaja yang menulis diary dengan huruf-huruf miring. Bagian yang masih pemuda yang berani bermimpi.
            </p>
            <p className="leading-relaxed">
              Mereka masih ada. Tidak di permukaan. Tapi di dalam. Menunggu.
            </p>
          </motion.section>

          {/* Bab 17 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
              17. Yang Kamu Bawa
            </h3>
            <p className="mb-4 leading-relaxed">
              Setiap hari yang kamu jalani, setiap momen yang kamu lewati, setiap orang yang kamu temui-mereka semua meninggalkan sesuatu padamu.
            </p>
            <p className="mb-4 leading-relaxed">
              Bukan barang. Tapi jejak.
            </p>
            <p className="mb-4 leading-relaxed">
              Jejak di cara kamu berbicara. Jejak di cara kamu melihat dunia. Jejak di cara kamu merasa. Kamu adalah kumpulan dari semua yang pernah kamu alami.
            </p>
            <p className="leading-relaxed">
              Bukan sempurna. Tapi utuh. Dan mungkin, itu cukup.
            </p>
          </motion.section>

          {/* Bab 18 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
              18. Yang Akan Datang
            </h3>
            <p className="mb-4 leading-relaxed">
              Kamu tidak tahu apa yang akan datang. Tidak ada yang tahu.
            </p>
            <p className="mb-4 leading-relaxed">
              Tapi ada satu hal yang kamu tahu pasti-
            </p>
            <p className="mb-4 leading-relaxed">
              Suatu hari nanti, kamu akan menatap ke belakang.
            </p>
            <p className="mb-4 leading-relaxed">
              Ke hari ini. Ke momen ini. Ke dirimu yang sedang membaca ini. Dan kamu akan merasa rindu.
            </p>
            <p className="mb-4 leading-relaxed">
              Rindu pada sesuatu yang kamu tidak sadari sedang kamu miliki. Jadi mungkin, yang bisa kamu lakukan sekarang hanyalah... Menarik napas.
            </p>
            <p className="leading-relaxed">
              Dan mencoba merasakannya. Sebelum ia pergi.
            </p>
          </motion.section>

          {/* EPILOG */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
              EPILOG: PAGI INI
            </h2>
          </motion.div>

          {/* Epilog */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <p className="mb-4 leading-relaxed">
              Pagi ini, alarm berbunyi lagi. Seperti biasa.
            </p>
            <p className="mb-4 leading-relaxed">
              Kamu menekan snooze. Sekali. Dua kali.
            </p>
            <p className="mb-4 leading-relaxed">
              Tapi kali ini, sebelum kamu bangun, kamu berhenti sejenak. Menatap langit-langit.
            </p>
            <p className="mb-4 leading-relaxed">
              Dan untuk pertama kalinya dalam waktu yang lama, kamu sadar- Hari ini adalah hari yang tidak akan pernah kamu miliki lagi.
            </p>
            <p className="mb-4 leading-relaxed">
              Bukan karena spesial. Bukan karena berbeda. Tapi karena setiap hari adalah satu-satunya kesempatan untuk merasakannya.
            </p>
            <p className="mb-4 leading-relaxed">
              Kamu bangun.
            </p>
            <p className="mb-4 leading-relaxed">
              Membuka jendela.
            </p>
            <p className="mb-4 leading-relaxed">
              Dan untuk sekejap, angin pagi terasa seperti sesuatu yang pernah kamu kenal.
            </p>
            <p className="mb-4 leading-relaxed">
              Sesuatu yang sudah lama hilang. Atau mungkin...
            </p>
            <p className="leading-relaxed">
              Sesuatu yang baru saja datang.
            </p>
          </motion.section>

          {/* Akhir */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <p className={`text-2xl font-bold ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
              Akhir
            </p>
          </motion.div>

          {/* Catatan Penulis */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <div className={`py-8 px-6 rounded-2xl ${darkMode ? 'bg-gray-900/50' : 'bg-amber-50'}`}>
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                Catatan Penulis
              </h2>
              <p className="mb-4 leading-relaxed">
                Buku ini bukan tentang jawaban. Buku ini tentang pertanyaan-pertanyaan yang kita semua bawa. Pertanyaan tentang siapa kita dulu, siapa kita sekarang, dan siapa kita akan menjadi.
              </p>
              <p className="mb-4 leading-relaxed">
                Tidak ada yang bisa menjawabnya. Tidak ada yang perlu menjawabnya. Yang penting, kita terus bertanya.
              </p>
              <p className="leading-relaxed">
                Dan terus merasa.
              </p>
            </div>
          </motion.section>

          {/* Quote Penutup */}
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
              "Hari ini akan menjadi kenangan. Entah kenangan yang indah, atau kenangan yang biasa saja. Tapi itu akan menjadi kenangan. Dan suatu hari nanti, kamu akan rindu padanya. Jadi rasakanlah. Sekarang. Sebelum ia pergi."
            </p>
          </motion.div>

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
