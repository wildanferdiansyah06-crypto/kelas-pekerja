'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function LewatBegituSajaPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [subtitleText, setSubtitleText] = useState("");
  const [isClient, setIsClient] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  
  const fullSubtitle = "Buku-buku itu lahir diam-diam. Ditulis setelah kerja selesai. Alarm pagi belum sempat dilupakan. Layar ponsel masih perih di mata. Badan bau keringat. Kopi instan dingin di meja. Lalu aku mengirimkannya sebagai tautan, dan menunggu—bukan dengan harapan besar, cukup lama untuk tahu apakah ia akan berhenti atau lewat begitu saja.";

  useEffect(() => {
    setIsClient(true);
    if (typeof window === 'undefined') return;
    
    const html = document.documentElement;
    setDarkMode(html.classList.contains('dark'));
    
    const observer = new MutationObserver(() => {
      setDarkMode(html.classList.contains('dark'));
    });
    
    observer.observe(html, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
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
  }, [isClient]);

  const theme = {
    bg: darkMode ? "bg-[#0a0908]" : "bg-[#fafaf9]",
    text: darkMode ? "text-[#e7e5e4]" : "text-[#1c1917]",
    textMuted: darkMode ? "text-[#a8a29e]" : "text-[#78716c]",
    textSecondary: darkMode ? "text-[#d6d3d1]" : "text-[#57534e]",
    accent: darkMode ? "text-[#8b7355]" : "text-[#a16207]",
    accentMuted: darkMode ? "text-[#8b7355]/60" : "text-[#a16207]/60",
    accentBorder: darkMode ? "border-[#8b7355]/30" : "border-[#a16207]/30",
    accentBg: darkMode ? "bg-[#8b7355]/10" : "bg-[#a16207]/10",
    accentBgLight: darkMode ? "bg-[#8b7355]/20" : "bg-[#a16207]/20",
    divider: darkMode ? "bg-[#8b7355]/20" : "bg-[#a16207]/20",
    subtleText: darkMode ? "text-[#57534e]" : "text-[#a8a29e]",
    emptyState: darkMode ? "text-[#57534e]" : "text-[#a8a29e]",
    noise: darkMode ? "opacity-[0.03]" : "opacity-[0.02]",
    particle: darkMode ? "bg-[#8b7355]/30" : "bg-[#a16207]/20"
  };

  const title = "Lewat Begitu Saja";
  const letters = title.split("");

  if (!isClient) {
    return null;
  }

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} relative overflow-hidden transition-colors duration-500`}>
      
      <div className={`absolute inset-0 ${theme.noise} pointer-events-none`} style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
      }} />

      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: backgroundY }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${theme.particle}`}
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: darkMode ? [0.1, 0.3, 0.1] : [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </motion.div>

      <div className="relative z-10 min-h-[90vh] flex flex-col justify-center items-center px-6 pt-24 pb-12">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <motion.div 
              className={`h-px ${darkMode ? 'bg-[#8b7355]/30' : 'bg-[#a16207]/30'} w-16`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            />
            <span className={`text-[10px] tracking-[0.5em] uppercase ${theme.accentMuted}`}>
              Arsip Pribadi
            </span>
            <motion.div 
              className={`h-px ${darkMode ? 'bg-[#8b7355]/30' : 'bg-[#a16207]/30'} w-16`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>

          <motion.p
            className={`font-serif italic ${theme.accent} text-xl mb-6 opacity-80`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            sebuah pengakuan
          </motion.p>

          <div className="overflow-hidden mb-8">
            <h1 className={`font-serif text-4xl md:text-6xl lg:text-7xl ${theme.text} flex justify-center flex-wrap`}>
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.5 + (i * 0.08),
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className={`inline-block ${letter === " " ? "w-3 md:w-4" : ""}`}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </h1>
          </div>

          <motion.div 
            className="max-w-2xl mx-auto mt-8 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <p className={`text-sm md:text-base leading-[1.8] ${theme.textMuted} font-light`}>
              {subtitleText}
              <motion.span
                className={`inline-block w-[2px] h-[1.2em] ${darkMode ? 'bg-[#8b7355]' : 'bg-[#a16207]'} ml-1 align-middle`}
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </p>
          </motion.div>
        </motion.div>
      </div>

      <div className={`relative z-10 max-w-3xl mx-auto px-6 pb-32 ${theme.text}`}>
        
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <p className={`text-base md:text-lg leading-[2] ${theme.textSecondary} font-light text-justify`}>
            <motion.span 
              className={`float-left text-6xl md:text-7xl font-serif ${theme.accent} mr-4 mt-2 leading-none`}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              B
            </motion.span>
            adan bau keringat. Layar ponsel masih perih di mata. Alarm pagi belum sempat dilupakan. Kopi instan dingin di meja, sudah kehilangan uapnya sejak jam yang lalu. Aku mengirimkannya sebagai tautan—kadang hanya satu kalimat, kadang tanpa pesan apa-apa.
          </p>
        </motion.div>

        <div className="space-y-8">
          <motion.p 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className={`text-base md:text-lg leading-[2] ${theme.textMuted} font-light text-justify`}
          >
            Kelas pekerja menulis dari sisa. Sisa tenaga yang tidak cukup untuk tidur nyenyak. Sisa waktu yang tidak dimiliki siapa-siapa. Sisa pikiran yang belum habis dipakai bekerja. Kami menulis bukan karena yakin, tapi karena diam-diam tahu: kalau tidak ditulis, hari ini akan hilang.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-12">
            {['Sisa tenaga.', 'Sisa waktu.', 'Sisa pikiran.'].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                className={`p-6 ${theme.accentBg} ${theme.accentBorder} border text-center`}
              >
                <p className={`font-serif italic ${theme.accent} text-sm md:text-base`}>{item}</p>
              </motion.div>
            ))}
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className={`text-base md:text-lg leading-[2] ${theme.textMuted} font-light text-justify`}
          >
            Tulisan kami lahir dari tubuh yang ingin rebah tapi masih memaksa duduk. Karena itu, ia tidak pandai meminta perhatian. Ia hanya diam, menunggu, dan kadang—ketika dunia luar melewatinya begitu saja—rasanya masih bisa diterima.
          </motion.p>
        </div>

        <motion.div
          className={`my-16 pl-6 border-l-2 ${theme.accentBorder}`}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <blockquote className={`font-serif italic text-lg md:text-xl ${theme.accent} leading-[1.6]`}>
            &ldquo;Karya itu seperti bekal yang dimakan dingin di sela jam kerja. Tidak mewah. Tidak istimewa. Ia hanya ingin dibuka, meski hanya untuk memastikan bahwa ia belum basi.&rdquo;
          </blockquote>
        </motion.div>

        <div className="space-y-8">
          <motion.p 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className={`text-base md:text-lg leading-[2] ${theme.textMuted} font-light text-justify`}
          >
            Ada orang yang paling dekat. Yang melihat lelahku tanpa perlu aku jelaskan. Buku itu ada di sana, berbulan-bulan. Aku tidak pernah bertanya. Karena aku tahu, jawabannya akan lebih menyakitkan jika diucapkan.
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className={`text-base md:text-lg leading-[2] ${theme.textSecondary} font-light text-center italic px-4 md:px-8`}
          >
            Kadang, yang paling sunyi bukan tidak dibaca, tapi disadari bahwa bahkan yang terdekat pun tidak sempat berhenti.
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className={`text-base md:text-lg leading-[2] ${theme.textMuted} font-light text-justify`}
          >
            Kalau yang dekat saja tidak sempat, aku tidak tahu apa yang bisa kuharapkan dari dunia yang asing. Dunia tidak kejam. Ia hanya tidak berhenti. Dan yang tidak berhenti jarang sempat melihat apa yang lahir pelan.
          </motion.p>
        </div>

        <motion.div
          className={`my-16 p-6 md:p-8 ${theme.accentBg} ${theme.accentBorder} border`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className={`text-base md:text-lg leading-[2] ${theme.text} font-light text-center italic`}>
            Aku tetap menulis bukan karena yakin akan dibaca. Aku menulis karena jika tidak, hari-hari ini akan runtuh tanpa saksi. Menulis adalah caraku mengatakan pada diri sendiri bahwa aku pernah ada di hari ini.
          </p>
        </motion.div>

        <motion.div 
          className="flex items-center justify-center gap-4 py-12"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className={`h-px ${theme.divider} w-24`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <motion.div 
            className={`w-2 h-2 border ${theme.accentBorder} rotate-45`}
            animate={{ rotate: [45, 225, 45] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className={`h-px ${theme.divider} w-24`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </motion.div>

        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className={`flex items-center justify-between mb-8 border-b ${theme.accentBg} pb-4`}>
            <h3 className={`font-serif italic text-xl md:text-2xl ${theme.text}`}>Penutup</h3>
            <span className={`text-[10px] tracking-[0.3em] uppercase ${theme.accentMuted}`}>Akhir</span>
          </div>

          <div className="space-y-8">
            <motion.p 
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className={`text-base md:text-lg leading-[2] ${theme.textMuted} font-light text-center`}
            >
              Buku ini tidak meminta perhatian. Ia juga tidak ingin dipahami. Ia hanya ingin jujur.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className={`text-base md:text-lg leading-[2] ${theme.textSecondary} font-light text-center italic`}
            >
              Dan jika suatu hari seseorang membacanya dalam keadaan lelah, dalam keadaan sepi, itu sudah cukup. Jika tidak, tidak apa-apa.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className={`font-serif text-xl md:text-2xl ${theme.accent} italic text-center mt-12`}
            >
              Ia tetap ditulis.
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          className="mt-24"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className={`flex items-center justify-between mb-8 border-b ${theme.accentBg} pb-4`}>
            <h3 className={`font-serif italic text-xl md:text-2xl ${theme.text}`}>Tulisan-tulisan Lain</h3>
            <span className={`text-[10px] tracking-[0.3em] uppercase ${theme.accentMuted}`}>Segera</span>
          </div>

          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <motion.p 
              className={`font-serif italic text-lg ${theme.accentMuted} mb-3`}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              Keheningan yang menunggu
            </motion.p>
            <p className={`text-sm ${theme.emptyState}`}>Belum ada kata yang berani keluar.</p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <motion.div
            className={`w-12 h-px ${theme.divider} mx-auto mb-8`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
          <p className={`font-serif italic text-base md:text-lg ${theme.accentMuted} max-w-2xl mx-auto leading-[1.7] mb-4`}>
            &ldquo;Meski lewat begitu saja, setidaknya aku pernah mencoba mengingatkan bahwa aku ada.&rdquo;
          </p>
          <p className={`text-[10px] tracking-[0.3em] uppercase ${theme.subtleText}`}>
            — Dari yang menulis pelan
          </p>
        </motion.div>

        <motion.div 
          className="mt-24 text-center pb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <motion.p 
            className={`font-serif italic ${theme.accentMuted} text-sm`}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            Ditulis setelah kerja selesai,<br />
            di malam yang tidak yakin ingin dihabiskan.
          </motion.p>
          
          <motion.div 
            className="mt-8 flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 1 }}
          >
            <div className={`h-px ${theme.accentBg} w-8`}></div>
            <span className={`text-[9px] tracking-[0.4em] uppercase ${darkMode ? 'text-[#44403c]' : 'text-[#d6d3d1]'}`}>Akhir dari arsip</span>
            <div className={`h-px ${theme.accentBg} w-8`}></div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
