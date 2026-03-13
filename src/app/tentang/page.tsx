"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export default function TulisanSection() {
  const containerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const isHeroInView = useInView(heroRef, { once: true });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax untuk depth - hanya untuk background particles
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  // Hero fade out saat scroll, tapi tetap visible di awal
  const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  // State untuk typing effect
  const [subtitleText, setSubtitleText] = useState("");
  const fullSubtitle = "Di antara deru waktu yang tak pernah berhenti, ada saat-saat ketika kata-kata menjadi satu-satunya tempat perlindungan. Bukan untuk diterima, bukan untuk dipahami—hanya untuk ada.";
  
  // Theme detection
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check system preference or stored theme
    const checkTheme = () => {
      const stored = localStorage.getItem('theme');
      if (stored) {
        setIsDark(stored === 'dark');
      } else {
        setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
      }
    };
    
    checkTheme();
    
    // Listen for theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setIsDark(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

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

  // Theme-based colors
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

  const words = ["Tulisan"];
  const letters = words[0].split("");

  return (
    <section 
      ref={containerRef}
      className={`min-h-screen ${colors.bg} ${colors.text} relative overflow-hidden`}
    >
      {/* Subtle grain texture overlay */}
      <div className={`absolute inset-0 ${isDark ? 'opacity-[0.03]' : 'opacity-[0.02]'} pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]`}></div>

      {/* Floating particles */}
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

      {/* HERO SECTION - FIXED: Static positioning, no scroll transform that pushes it down */}
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
          {/* Decorative line */}
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
              Arsip Pikiran
            </motion.span>
            <motion.div 
              className={`h-px ${isDark ? 'bg-[#8b7355]/30' : 'bg-[#a16207]/30'} w-16 origin-left`}
              variants={lineExpand}
            />
          </motion.div>

          {/* ruang bagi */}
          <motion.p
            className={`font-serif italic ${colors.accent} text-xl mb-6 opacity-80`}
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 0.8, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 1 }}
          >
            ruang bagi
          </motion.p>

          {/* TULISAN - Large animated letters */}
          <div className="overflow-hidden mb-8">
            <h1 className={`font-serif text-6xl md:text-8xl lg:text-9xl ${colors.text} flex justify-center perspective-1000`}>
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
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
            </h1>
          </div>

          {/* Typing subtitle */}
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

      {/* CONTENT SECTION */}
      <div className={`relative z-10 max-w-3xl mx-auto px-6 pb-32 ${colors.text}`}>
        {/* Drop cap paragraph */}
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
            ita hidup di era yang terobsesi pada kecepatan. Segala sesuatu harus instan, terukur, menghasilkan. Namun di sudut terdalam kesadaran, kita tahu: yang benar-benar berarti justru datang dari proses yang lambat, menyakitkan, dan seringkali tanpa tujuan jelas.
          </p>
        </motion.div>

        {/* Regular paragraphs with stagger */}
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
            Setiap tulisan di sini adalah jejak—bukan petunjuk arah, melainkan bekas tapak kaki di pasir yang segera terhapus ombak. Mereka tidak mengklaim kebenaran. Mereka hanya mengakui keberadaan: bahwa seseorang, di suatu tempat, pernah merasa sesuatu yang terlalu kompleks untuk diungkapkan dalam percakapan sehari-hari.
          </motion.p>

          <motion.p 
            custom={2}
            variants={fadeInUp}
            className={`text-[16px] md:text-[17px] leading-[2] ${colors.textMuted} font-light text-justify`}
          >
            Tentang kopi yang bukan sekadar minuman, melainkan ritual penundaan— cara kita memberontak terhadap waktu. Tentang kerja yang memakan hari-hari kita, lalu kita bertanya: <em className={`${colors.accent} not-italic`}>untuk apa sebenarnya?</em> Tentang keheningan yang mengganggu, karena di dalamnya kita terpaksa berhadapan dengan diri sendiri.
          </motion.p>
        </motion.div>

        {/* Quote block dengan reveal */}
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
            &ldquo;Menulis adalah cara kita memberi makna pada kekosongan. Bukan untuk mengisinya, tetapi untuk mengenalinya. Seperti menatap ke dalam sumur yang gelap dan akhirnya melihat bayangan diri sendiri.&rdquo;
          </motion.blockquote>
        </motion.div>

        {/* Closing paragraph */}
        <motion.p 
          className={`text-[16px] md:text-[17px] leading-[2] ${colors.textMuted} font-light text-justify mb-20`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Mungkin ini semua hanya monolog yang tak pernah dimaksudkan untuk didengar. Tapi jika kamu menemukan dirimu di sini, di antara kata-kata yang tercecer—selamat datang. Kita adalah orang-orang yang sama: yang mencari arti di tempat-tempat yang orang lain lewati begitu saja.
        </motion.p>

        {/* Decorative divider */}
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

        {/* Catatan-catatan section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className={`flex items-center justify-between mb-8 border-b ${colors.accentBgLight} pb-4`}>
            <h3 className={`font-serif italic text-2xl ${colors.text}`}>Catatan-catatan</h3>
            <span className={`text-[10px] tracking-[0.3em] uppercase ${colors.accentMuted}`}>Kosong</span>
          </div>

          {/* Empty state dengan animasi breathing */}
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
              Keheningan yang menunggu
            </motion.p>
            <p className={`text-sm ${colors.emptyState}`}>Belum ada kata yang berani keluar.</p>
          </motion.div>
        </motion.div>

        {/* Quote penutup */}
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
            &ldquo;Tulisan yang paling jujur adalah yang ditulis tanpa penonton, hanya untuk meyakinkan diri sendiri bahwa kita pernah merasa.&rdquo;
          </p>
          <p className={`text-[10px] tracking-[0.3em] uppercase ${colors.subtleText}`}>
            — Dari ruang yang sunyi
          </p>
        </motion.div>

        {/* Footer text */}
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
            Ditulis perlahan, seperti menyeduh kopi<br />
            di pagi yang belum yakin ingin dimulai.
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
    </section>
  );
}
