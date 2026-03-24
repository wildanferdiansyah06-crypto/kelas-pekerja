"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useTheme } from "@/src/components/ThemeProvider";
import Link from "next/link";

export default function TentangPage() {
  const containerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const isHeroInView = useInView(heroRef, { once: true });
  const isStoryInView = useInView(storyRef, { once: true, margin: "-200px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  
  const [typedText, setTypedText] = useState("");
  const fullText = "Website ini lahir dari keresahan. Dari pengalaman kerja yang gak pernah diceritain di sekolah.";
  
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    if (isHeroInView) {
      let i = 0;
      const timer = setInterval(() => {
        if (i <= fullText.length) {
          setTypedText(fullText.slice(0, i));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 40);
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

  const words = ["Kenapa", "Ada?"];
  const letters = words.map(word => word.split(""));

  return (
    <section 
      ref={containerRef}
      className={`min-h-screen ${colors.bg} ${colors.text} relative overflow-hidden transition-colors duration-500`}
    >
      {/* Noise texture background */}
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

      {/* HERO SECTION - The Hook */}
      <div 
        ref={heroRef}
        className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 pt-24 pb-12"
      >
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={isHeroInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Label */}
          <motion.div 
            className="flex items-center justify-center gap-4 mb-12"
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
              Dari Keresahan
            </motion.span>
            <motion.div 
              className={`h-px ${isDark ? 'bg-[#8b7355]/30' : 'bg-[#a16207]/30'} w-16 origin-left`}
              variants={lineExpand}
            />
          </motion.div>

          {/* Main Title with dramatic reveal */}
          <div className="overflow-hidden mb-8">
            <h1 className={`font-serif text-5xl md:text-7xl lg:text-8xl ${colors.text} flex justify-center gap-4 md:gap-8 perspective-1000`}>
              {letters.map((wordLetters, wordIndex) => (
                <span key={wordIndex} className="flex">
                  {wordLetters.map((letter, i) => (
                    <motion.span
                      key={i}
                      custom={i + (wordIndex * 5)}
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

          {/* The Story Hook - Typewriter effect */}
          <motion.div 
            className="max-w-3xl mx-auto mt-12 mb-8"
            initial={{ opacity: 0 }}
            animate={isHeroInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <p className={`text-lg md:text-xl lg:text-2xl leading-[1.8] ${colors.textSecondary} font-light`}>
              <span className={`${colors.accent} font-medium`}>{typedText}</span>
              <motion.span
                className={`inline-block w-[3px] h-[1.2em] ${isDark ? 'bg-[#8b7355]' : 'bg-[#a16207]'} ml-1 align-middle`}
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </p>
          </motion.div>

          {/* Positioning Statement */}
          <motion.p
            className={`text-sm md:text-base ${colors.textMuted} max-w-2xl mx-auto leading-relaxed`}
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2.5, duration: 1 }}
          >
            Tempat berbagi pengalaman kerja nyata dari berbagai orang di Indonesia. 
            Bukan review manis. Bukan promosi. Hanya kejujuran.
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 3, duration: 1 }}
        >
          <motion.div
            className={`w-6 h-10 border-2 ${colors.accentBorder} rounded-full flex justify-center p-1`}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className={`w-1 h-2 ${isDark ? 'bg-[#8b7355]/60' : 'bg-[#a16207]/60'} rounded-full`}
              animate={{ opacity: [1, 0.3, 1], y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* THE STORY SECTION - Personal & Relatable */}
      <div 
        ref={storyRef}
        className={`relative z-10 max-w-3xl mx-auto px-6 py-32 ${colors.text}`}
      >
        {/* Origin Story */}
        <motion.div
          custom={0}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <div className={`flex items-center gap-4 mb-8`}>
            <span className={`text-[10px] tracking-[0.4em] uppercase ${colors.accentMuted}`}>01</span>
            <div className={`h-px ${colors.divider} flex-1`}></div>
            <span className={`text-[10px] tracking-[0.4em] uppercase ${colors.accentMuted}`}>Asal Muasal</span>
          </div>

          <p className={`text-[18px] md:text-[20px] leading-[2] ${colors.textSecondary} font-light text-justify mb-8`}>
            <motion.span 
              className={`float-left text-7xl font-serif ${colors.accent} mr-4 mt-2 leading-none`}
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              P
            </motion.span>
            ernah gak sih lo ngerasa: sekolah ngajarin teori, tapi gak ngajarin gimana caranya survive di dunia kerja yang sebenarnya?
          </p>

          <p className={`text-[16px] md:text-[17px] leading-[2] ${colors.textMuted} font-light text-justify mb-6`}>
            Gue pernah. Kerja pertama kali, gue kira cukup dateng on time, kerjain tugas, semua bakal baik-baik aja. Ternyata ada politik kantor, ada ekspektasi yang gak diomongin, ada burnout yang dateng tiba-tiba.
          </p>

          <p className={`text-[16px] md:text-[17px] leading-[2] ${colors.textMuted} font-light text-justify`}>
            Dan gue sadar: gue gak sendirian. Banyak orang ngalamin hal serupa, tapi gak ada tempat buat cerita. Semua pendem sendiri. Takut dianggap lemah. Takut dianggap gak bersyukur.
          </p>
        </motion.div>

        {/* The Human Behind */}
        <motion.div
          custom={1}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <div className={`flex items-center gap-4 mb-8`}>
            <span className={`text-[10px] tracking-[0.4em] uppercase ${colors.accentMuted}`}>02</span>
            <div className={`h-px ${colors.divider} flex-1`}></div>
            <span className={`text-[10px] tracking-[0.4em] uppercase ${colors.accentMuted}`}>Siapa di Balik Ini</span>
          </div>

          <div className={`p-8 md:p-10 ${colors.accentBgLight} border ${colors.accentBorder} rounded-sm`}>
            <p className={`text-[16px] md:text-[17px] leading-[2] ${colors.textSecondary} font-light text-justify mb-6`}>
              Website ini dibangun oleh seseorang yang juga pernah kerja dari bawah. Yang pernah ngerasain gimana rasanya:
            </p>
            
            <ul className={`space-y-4 mb-6`}>
              {[
                "Masuk kantor dengan semangat, pulang dengan hampa",
                "Bingung: ini gue yang kurang bersyukur, atau memang tempatnya yang toxic?",
                "Pingin resign tapi gak punya tempat cerita"
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  className={`flex items-start gap-3 text-[15px] ${colors.textMuted}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (index * 0.1), duration: 0.6 }}
                >
                  <span className={`${colors.accent} mt-1.5`}>—</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>

            <p className={`text-[15px] ${colors.accent} italic`}>
              Gue gak punya jawaban untuk semua masalah. Tapi gue percaya: cerita yang diungkapin bisa jadi penawar buat yang lain.
            </p>
          </div>
        </motion.div>

        {/* The Value Proposition */}
        <motion.div
          custom={2}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <div className={`flex items-center gap-4 mb-8`}>
            <span className={`text-[10px] tracking-[0.4em] uppercase ${colors.accentMuted}`}>03</span>
            <div className={`h-px ${colors.divider} flex-1`}></div>
            <span className={`text-[10px] tracking-[0.4em] uppercase ${colors.accentMuted}`}>Untuk Apa Ini Ada</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div 
              className={`p-6 ${isDark ? 'bg-[#1c1917]/30' : 'bg-[#f5f5f4]'} border ${colors.accentBorder}`}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
            >
              <h4 className={`font-serif text-xl ${colors.accent} mb-3`}>Biar Gak Salah Pilih</h4>
              <p className={`text-[14px] ${colors.textMuted} leading-relaxed`}>
                Cerita orang lain bisa jadi peta buat lo. Biar lo tau apa yang bakal dihadepin sebelum terjun.
              </p>
            </motion.div>

            <motion.div 
              className={`p-6 ${isDark ? 'bg-[#1c1917]/30' : 'bg-[#f5f5f4]'} border ${colors.accentBorder}`}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
            >
              <h4 className={`font-serif text-xl ${colors.accent} mb-3`}>Biar Didengar</h4>
              <p className={`text-[14px] ${colors.textMuted} leading-relaxed`}>
                Cerita yang selama ini dipendem bisa keluar. Gak usah takut di-judge. Di sini, semua valid.
              </p>
            </motion.div>

            <motion.div 
              className={`p-6 ${isDark ? 'bg-[#1c1917]/30' : 'bg-[#f5f5f4]'} border ${colors.accentBorder}`}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
            >
              <h4 className={`font-serif text-xl ${colors.accent} mb-3`}>Biar Ngerasa Sendiri</h4>
              <p className={`text-[14px] ${colors.textMuted} leading-relaxed`}>
                Kadang yang kita butuhin cuma tau: "Oh, gue gak sendirian." Itu aja udah cukup powerful.
              </p>
            </motion.div>

            <motion.div 
              className={`p-6 ${isDark ? 'bg-[#1c1917]/30' : 'bg-[#f5f5f4]'} border ${colors.accentBorder}`}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
            >
              <h4 className={`font-serif text-xl ${colors.accent} mb-3`}>Biar Jujur</h4>
              <p className={`text-[14px] ${colors.textMuted} leading-relaxed`}>
                Dunia kerja gak selalu indah. Dan gak apa-apa buat ngomongin yang gak indah itu.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Quote Section */}
        <motion.div
          className={`my-20 pl-8 md:pl-12 border-l-2 ${colors.accentBorder}`}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.blockquote 
            className={`font-serif italic text-2xl md:text-3xl ${colors.accent} leading-[1.5] mb-6`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.9 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            &ldquo;Ini bukan blog. Ini tempat orang jujur tentang dunia kerja. Dan itu powerful banget.&rdquo;
          </motion.blockquote>
          <p className={`text-[12px] tracking-[0.3em] uppercase ${colors.subtleText}`}>
            — Inti dari semua ini
          </p>
        </motion.div>

        {/* What This Is Not */}
        <motion.div
          custom={3}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <div className={`flex items-center gap-4 mb-8`}>
            <span className={`text-[10px] tracking-[0.4em] uppercase ${colors.accentMuted}`}>04</span>
            <div className={`h-px ${colors.divider} flex-1`}></div>
            <span className={`text-[10px] tracking-[0.4em] uppercase ${colors.accentMuted}`}>Yang Ini Bukan</span>
          </div>

          <p className={`text-[16px] md:text-[17px] leading-[2] ${colors.textMuted} font-light text-justify mb-6`}>
            Biar jelas aja, ini bukan:
          </p>

          <div className="space-y-4">
            {[
              { title: "Platform job review profesional", desc: "Kita gak rating bintang 1-5. Kita cerita pengalaman." },
              { title: "Tempat curhat tanpa arah", desc: "Setiap cerita punya makna. Buat lo yang cerita, buat yang baca." },
              { title: "Komunitas yang menghakimi", desc: "Gak ada yang salah buat resign. Gak ada yang salah buat bertahan." }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className={`flex gap-4 p-4 ${isDark ? 'bg-[#1c1917]/20' : 'bg-[#f5f5f4]/50'} border-l-2 ${colors.accentBorder}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
              >
                <span className={`${colors.accent} font-serif text-lg`}>×</span>
                <div>
                  <h5 className={`${colors.textSecondary} font-medium mb-1`}>{item.title}</h5>
                  <p className={`text-[13px] ${colors.textMuted}`}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center py-20"
        >
          <motion.div 
            className={`h-px ${colors.divider} w-32 mx-auto mb-12`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          <h3 className={`font-serif text-3xl md:text-4xl ${colors.text} mb-6`}>
            Punya cerita yang pengen keluar?
          </h3>
          
          <p className={`text-[16px] ${colors.textMuted} max-w-xl mx-auto mb-10 leading-relaxed`}>
            Gak harus sempurna. Gak harus panjang. Yang penting: jujur. Cerita lo bisa jadi yang dibutuhin orang lain buat bikin keputusan besar.
          </p>

          <Link href="/tulis">
            <motion.button
              className={`group relative px-8 py-4 ${colors.accentBg} ${colors.accentBorder} border overflow-hidden`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className={`relative z-10 text-[13px] tracking-[0.2em] uppercase ${colors.accent} font-medium`}>
                Mulai Cerita Lo Sekarang
              </span>
              <motion.div
                className={`absolute inset-0 ${isDark ? 'bg-[#8b7355]/30' : 'bg-[#a16207]/20'}`}
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </Link>

          <motion.p 
            className={`mt-6 text-[12px] ${colors.subtleText} italic`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Atau baca dulu cerita orang lain di <Link href="/arsip" className={`${colors.accent} underline underline-offset-4`}>arsip</Link>
          </motion.p>
        </motion.div>

        {/* Final Quote */}
        <motion.div 
          className="mt-24 text-center pb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <motion.div
            className={`w-12 h-px ${colors.divider} mx-auto mb-8`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
          
          <p className={`font-serif italic text-lg md:text-xl ${colors.accentMuted} max-w-2xl mx-auto leading-[1.7] mb-6`}>
            &ldquo;Tulisan yang paling jujur adalah yang ditulis tanpa penonton, hanya untuk meyakinkan diri sendiri bahwa kita pernah merasa.&rdquo;
          </p>
          
          <motion.div 
            className="flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 1 }}
          >
            <div className={`h-px ${colors.accentBg} w-8`}></div>
            <span className={`text-[9px] tracking-[0.4em] uppercase ${isDark ? 'text-[#44403c]' : 'text-[#d6d3d1]'}`}>
              Dari ruang yang sunyi, untuk yang pernah sunyi
            </span>
            <div className={`h-px ${colors.accentBg} w-8`}></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
