"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useTheme } from "@/src/components/ThemeProvider";
import Footer from "@/src/components/Footer";

export default function KamiMenulisPelanPage() {
  const containerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const isHeroInView = useInView(heroRef, { once: true });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  
  const [subtitleText, setSubtitleText] = useState("");
  const fullSubtitle = "Dari kelas pekerja yang menulis di sela-sela waktu yang bukan milik mereka. Bukan untuk dilihat, bukan untuk dipuji—hanya untuk mengingat bahwa kita pernah hidup.";
  
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    if (isHeroInView) {
      let i = 0;
      const timer = setInterval(() => {
        if (i <= fullSubtitle.length) {
          setSubtitleText(fullSubtitle.slice(0, i));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [isHeroInView]);

  const colors = {
    bg: isDark ? "bg-[#0a0908]" : "bg-[#fafaf9]",
    text: isDark ? "text-[#e7e5e4]" : "text-[#1c1917]",
    textMuted: isDark ? "text-[#a8a29e]" : "text-[#78716c]",
    textSecondary: isDark ? "text-[#d6d3d1]" : "text-[#57534e]",
    accent: isDark ? "text-[#8b7355]" : "text-[#a16207]",
    accentMuted: isDark ? "text-[#8b7355]/60" : "text-[#a16207]/60",
    accentLight: isDark ? "text-[#8b7355]/30" : "text-[#a16207]/30",
    accentBorder: isDark ? "border-[#8b7355]/30" : "border-[#a16207]/30",
    accentBg: isDark ? "bg-[#8b7355]/20" : "bg-[#a16207]/20",
    accentBgLight: isDark ? "bg-[#8b7355]/10" : "bg-[#a16207]/10",
    divider: isDark ? "bg-[#8b7355]/20" : "bg-[#a16207]/20",
    subtleText: isDark ? "text-[#57534e]" : "text-[#a8a29e]",
    emptyState: isDark ? "text-[#57534e]" : "text-[#a8a29e]",
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60, filter: "blur(10px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.15,
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const letterAnimation = {
    hidden: { opacity: 0, y: 100, rotateX: -90 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: 0.5 + (i * 0.08),
        duration: 1,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const lineExpand = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const words = ["Kami", "Menulis", "Pelan"];
  const allLetters = words.map(word => word.split(""));

  return (
    <section 
      ref={containerRef}
      className={`min-h-screen ${colors.bg} ${colors.text} relative overflow-hidden transition-colors duration-500`}
    >
      {/* Noise Texture Background */}
      <div className={`absolute inset-0 ${isDark ? 'opacity-[0.03]' : 'opacity-[0.02]'} pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]`}></div>

      {/* Floating Particles */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-[1px] h-[1px] ${isDark ? 'bg-[#8b7355]/30' : 'bg-[#a16207]/20'} rounded-full`}
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: isDark ? [0.1, 0.4, 0.1] : [0.05, 0.2, 0.05],
              scale: [1, 2, 1]
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}
      </motion.div>

      {/* Hero Section */}
      <div 
        ref={heroRef}
        className="relative z-10 min-h-[90vh] flex flex-col justify-center items-center px-6 pt-24 pb-12"
      >
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={isHeroInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Decorative Lines */}
          <motion.div 
            className="flex items-center justify-center gap-4 mb-8"
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
          >
            <motion.div 
              className={`h-px ${isDark ? 'bg-[#8b7355]/30' : 'bg-[#a16207]/30'} w-16 origin-right`}
              variants={lineExpand}
            />
            <motion.span 
              className={`text-[10px] tracking-[0.5em] uppercase ${colors.accentMuted}`}
              initial={{ opacity: 0 }}
              animate={isHeroInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 1 }}
            >
              Arsip Kelas Pekerja
            </motion.span>
            <motion.div 
              className={`h-px ${isDark ? 'bg-[#8b7355]/30' : 'bg-[#a16207]/30'} w-16 origin-left`}
              variants={lineExpand}
            />
          </motion.div>

          {/* Subtitle Above */}
          <motion.p
            className={`font-serif italic ${colors.accent} text-xl mb-6 opacity-80`}
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 0.8, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 1 }}
          >
            catatan dari
          </motion.p>

          {/* Main Title - Animated Letters */}
          <div className="overflow-hidden mb-8">
            <h1 className={`font-serif text-5xl md:text-7xl lg:text-8xl ${colors.text} flex justify-center gap-4 md:gap-8 perspective-1000 flex-wrap`}>
              {words.map((word, wordIndex) => (
                <span key={wordIndex} className="flex">
                  {allLetters[wordIndex].map((letter, i) => (
                    <motion.span
                      key={`${wordIndex}-${i}`}
                      custom={wordIndex * 10 + i}
                      variants={letterAnimation}
                      initial="hidden"
                      animate={isHeroInView ? "visible" : "hidden"}
                      className="inline-block"
                      style={{ 
                        transformStyle: "preserve-3d",
                        textShadow: isDark ? "0 0 80px rgba(139,115,85,0.15)" : "0 0 60px rgba(161,98,7,0.1)"
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h1>
          </div>

          {/* Typewriter Subtitle */}
          <motion.div 
            className="max-w-2xl mx-auto mt-8"
            initial={{ opacity: 0 }}
            animate={isHeroInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <p className={`text-[15px] md:text-base leading-[1.8] ${colors.textMuted} font-light`}>
              {subtitleText}
              <motion.span
                className={`inline-block w-[2px] h-[1.2em] ${isDark ? 'bg-[#8b7355]' : 'bg-[#a16207]'} ml-1 align-middle`}
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className={`relative z-10 max-w-3xl mx-auto px-6 pb-32 ${colors.text}`}>
        
        {/* Opening Paragraph */}
        <motion.div
          custom={0}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12"
        >
          <p className={`text-[16px] md:text-[17px] leading-[2] ${colors.textSecondary} font-light text-justify`}>
            <motion.span 
              className={`float-left text-7xl font-serif ${colors.accent} mr-4 mt-2 leading-none`}
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              K
            </motion.span>
            ami menulis dari sisa. Sisa tenaga yang tidak cukup untuk tidur nyenyak, tapi masih cukup untuk menyalakan lampu meja. Sisa waktu yang tidak dimiliki siapa-siapa, jadi kami klaim sebagai milik kami. Sisa pikiran yang belum sepenuhnya habis dipakai untuk memenuhi tuntutan hari.
          </p>
        </motion.div>

        {/* Content Sections */}
        <motion.div 
          className="space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.p 
            custom={1}
            variants={fadeInUp}
            className={`text-[16px] md:text-[17px] leading-[2] ${colors.textMuted} font-light text-justify`}
          >
            Kami bukan penulis profesional. Kami adalah pekerja—di pabrik, di kantor, di jalanan, di dapur orang lain. Kami bangun pagi untuk melakukan hal-hal yang tidak kami cintai, lalu pulang dengan tubuh yang ingin rebah tapi pikiran yang masih berdenyut. Di celah-celah itu, di antara kelelahan dan tidur, kami mencuri waktu untuk menulis.
          </motion.p>

          <motion.p 
            custom={2}
            variants={fadeInUp}
            className={`text-[16px] md:text-[17px] leading-[2] ${colors.textMuted} font-light text-justify`}
          >
            Tulisan kami tidak muncul dari inspirasi yang tiba-tiba melanda. Mereka lahir dari keharusan—keharusan untuk mengingat, untuk mengeluh, untuk bertanya <em className={`${colors.accent} not-italic`}>apakah ini saja?</em> Keharusan untuk membuktikan bahwa kami lebih dari sekadar alat, lebih dari sekadar angka di daftar gaji.
          </motion.p>
        </motion.div>

        {/* Quote Block */}
        <motion.div
          className={`my-16 pl-6 border-l-2 ${colors.accentBorder}`}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.blockquote 
            className={`font-serif italic text-xl md:text-2xl ${colors.accent} leading-[1.6]`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.9 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            &ldquo;Menulis pelan bukan karena tidak punya urgensi. Tapi karena kami tahu, jika ditulis terlalu cepat, kami akan kehabisan diri sendiri sebelum dunia kehabisan tuntutan.&rdquo;
          </motion.blockquote>
        </motion.div>

        {/* More Content */}
        <motion.p 
          className={`text-[16px] md:text-[17px] leading-[2] ${colors.textMuted} font-light text-justify mb-20`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Kami tidak menulis untuk viral. Kami tidak menulis untuk dipuji. Kami menulis karena diam lebih berbahaya—karena jika tidak ditulis, hari-hari ini akan runtuh tanpa saksi. Karena ada sesuatu di dalam yang harus dikeluarkan, meski tak ada yang menunggu di luar.
        </motion.p>

        {/* Section Divider */}
        <motion.div 
          className="flex items-center justify-center gap-4 py-12"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className={`h-px ${colors.divider} w-24`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <motion.div 
            className={`w-2 h-2 border ${isDark ? 'border-[#8b7355]/40' : 'border-[#a16207]/40'} rotate-45`}
            animate={{ rotate: [45, 225, 45] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className={`h-px ${colors.divider} w-24`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </motion.div>

        {/* Empty State / Placeholder */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className={`flex items-center justify-between mb-8 border-b ${colors.accentBgLight} pb-4`}>
            <h3 className={`font-serif italic text-2xl ${colors.text}`}>Tulisan-tulisan</h3>
            <span className={`text-[10px] tracking-[0.3em] uppercase ${colors.accentMuted}`}>Segera</span>
          </div>

          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <motion.p 
              className={`font-serif italic text-xl ${colors.accentMuted} mb-3`}
              animate={{ 
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              Ruang yang menunggu diisi
            </motion.p>
            <p className={`text-sm ${colors.emptyState}`}>Belum ada kata yang berani keluar dari bayangan.</p>
          </motion.div>
        </motion.div>

        {/* Closing Quote */}
        <motion.div 
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <motion.div
            className={`w-12 h-px ${colors.divider} mx-auto mb-8`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
          <p className={`font-serif italic text-lg md:text-xl ${colors.accentMuted} max-w-2xl mx-auto leading-[1.7] mb-4`}>
            &ldquo;Kami mungkin lewat begitu saja. Tapi setidaknya, kami pernah mencoba mengingatkan bahwa kami ada.&rdquo;
          </p>
          <p className={`text-[10px] tracking-[0.3em] uppercase ${colors.subtleText}`}>
            — Dari kami yang menulis pelan
          </p>
        </motion.div>

        {/* Final Note */}
        <motion.div 
          className="mt-24 text-center pb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <motion.p 
            className={`font-serif italic ${colors.accentMuted} text-sm`}
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
            <div className={`h-px ${colors.accentBg} w-8`}></div>
            <span className={`text-[9px] tracking-[0.4em] uppercase ${isDark ? 'text-[#44403c]' : 'text-[#d6d3d1]'}`}>Akhir dari arsip</span>
            <div className={`h-px ${colors.accentBg} w-8`}></div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </section>
  );
}
