"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useTheme } from "@/src/components/ThemeProvider";
import Link from "next/link";

export default function TentangPage() {
  const containerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const essenceRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isEssenceInView = useInView(essenceRef, { once: true, margin: "-200px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacityLayer1 = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const opacityLayer2 = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  
  const [typedText, setTypedText] = useState("");
  const fullText = "Di antara deru waktu yang tak pernah berhenti, ada saat-saat ketika kata-kata menjadi satu-satunya tempat perlindungan.";
  
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
      }, 35);
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

  const words = ["Tentang"];
  const letters = words[0].split("");

  return (
    <section 
      ref={containerRef}
      className={`min-h-screen ${colors.bg} ${colors.text} relative overflow-hidden transition-colors duration-500`}
    >
      {/* Noise texture */}
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

      {/* LAYER 1: The Original Essence (Your Core Story) */}
      <motion.div 
        style={{ opacity: opacityLayer1 }}
        className="relative z-10"
      >
        <div 
          ref={heroRef}
          className="min-h-screen flex flex-col justify-center items-center px-6 pt-24 pb-12"
        >
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0 }}
            animate={isHeroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            {/* Label */}
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

            {/* Context */}
            <motion.p
              className={`font-serif italic ${colors.accent} text-xl mb-6 opacity-80`}
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 0.8, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 1 }}
            >
              ruang bagi
            </motion.p>

            {/* Main Title */}
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

            {/* Your Original Subtitle - Typewriter */}
            <motion.div 
              className="max-w-2xl mx-auto mt-8"
              initial={{ opacity: 0 }}
              animate={isHeroInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.5, duration: 1 }}
            >
              <p className={`text-[15px] md:text-base leading-[1.8] ${colors.textMuted} font-light`}>
                {typedText}
                <motion.span
                  className={`inline-block w-[2px] h-[1.2em] ${isDark ? 'bg-[#8b7355]' : 'bg-[#a16207]'} ml-1 align-middle`}
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Your Original Manifesto Content - PRESERVED EXACTLY */}
        <div className={`relative z-10 max-w-3xl mx-auto px-6 pb-32 ${colors.text}`}>
          {/* Opening with Drop Cap */}
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

          {/* Your Original Body Paragraphs */}
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

          {/* Your Original Quote */}
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

          {/* Your Original Closing Paragraph */}
          <motion.p 
            className={`text-[16px] md:text-[17px] leading-[2] ${colors.textMuted} font-light text-justify mb-20`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            Mungkin ini semua hanya monolog yang tak pernah dimaksudkan untuk didengar. Tapi jika kamu menemukan dirimu di sini, di antara kata-kata yang tercecer—selamat datang. Kita adalah orang-orang yang sama: yang mencari arti di tempat-tempat yang orang lain lewati begitu saja.
          </motion.p>

          {/* Divider */}
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
        </div>
      </motion.div>

      {/* LAYER 2: The Human Connection (New Personal Layer) */}
      <motion.div 
        ref={essenceRef}
        style={{ opacity: opacityLayer2 }}
        className="relative z-20 min-h-screen flex items-center justify-center px-6 py-32"
      >
        <div className="max-w-3xl mx-auto w-full">
          {/* Transition Label */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className={`text-[10px] tracking-[0.5em] uppercase ${colors.accentMuted}`}>
              Tapi Kenapa Website Ini Ada?
            </span>
          </motion.div>

          {/* Personal Story Integration */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="space-y-8"
          >
            <p className={`text-[18px] md:text-[20px] leading-[2] ${colors.textSecondary} font-light text-justify`}>
              Tulisan-tulisan di atas bukan sekadar filosofi. Mereka datang dari <span className={colors.accent}>pengalaman</span> — dari hari-hari where gue duduk di kafe, menatap cangkir kopi yang menghangat, dan bertanya: <em className={`${colors.accent} not-italic`}>untuk apa gue kerja sekeras ini?</em>
            </p>

            <p className={`text-[16px] md:text-[17px] leading-[2] ${colors.textMuted} font-light text-justify`}>
              Gue pernah kerja di tempat yang semuanya "tepat" di atas kertas — gaji oke, nama company bagus, posisi stabil. Tapi tiap pagi, gue harus paksa diri sendiri buat bangkit dari kasur. Bukan karena malas. Karena ada yang <span className={colors.accent}>salah</span>, tapi gue gak bisa jelasin apa.
            </p>

            <p className={`text-[16px] md:text-[17px] leading-[2] ${colors.textMuted} font-light text-justify`}>
              Gue cari tempat buat cerita. Bukan di LinkedIn (terlalu publik). Bukan di Twitter (terlalu cepat). Gue butuh ruang yang <span className={colors.accent}>lambat</span>, yang ngasih izin buat gak sempurna, yang ngerti bahwa beberapa pengalaman cuma bisa diungkapin lewat tulisan yang mengalir tanpa struktur jelas.
            </p>
          </motion.div>

          {/* The Bridge */}
          <motion.div
            className={`my-16 pl-8 md:pl-12 border-l-2 ${colors.accentBorder}`}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <p className={`font-serif italic text-2xl md:text-3xl ${colors.accent} leading-[1.5]`}>
              &ldquo;Gue bikin website ini bukan karena gue udah figured it out. Gue bikin ini karena gue masih mencari, dan gue tahu gue gak sendiri.&rdquo;
            </p>
          </motion.div>

          {/* What This Is For */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-16"
          >
            <h3 className={`font-serif text-2xl ${colors.text} mb-8 text-center`}>
              Jadi, Ini untuk Siapa?
            </h3>

            <div className="space-y-6">
              {[
                {
                  title: "Yang merasa sendiri di tempat kerja",
                  desc: "Padahal di sekitar lo ada puluhan orang, tapi gak ada yang ngerti."
                },
                {
                  title: "Yang punya cerita tapi gak tau cerita ke siapa",
                  desc: "Takut dianggap lemah, takut dianggap gak bersyukur, takut di-judge."
                },
                {
                  title: "Yang lagi bingung: ini gue yang salah, atau memang tempatnya?",
                  desc: "Gue pernah di posisi itu. Dan gak ada yang salah dengan bingung."
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className={`flex gap-4 p-6 ${isDark ? 'bg-[#1c1917]/20' : 'bg-[#f5f5f4]/60'} border-l-2 ${colors.accentBorder}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (index * 0.15), duration: 0.6 }}
                  whileHover={{ x: 8, transition: { duration: 0.3 } }}
                >
                  <span className={`${colors.accent} font-serif text-2xl leading-none mt-1`}>0{index + 1}</span>
                  <div>
                    <h4 className={`${colors.textSecondary} font-medium mb-2 text-[15px]`}>{item.title}</h4>
                    <p className={`text-[14px] ${colors.textMuted} leading-relaxed`}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Positioning Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className={`p-8 ${colors.accentBgLight} border ${colors.accentBorder} text-center mb-16`}
          >
            <p className={`text-[15px] md:text-[16px] leading-[1.8] ${colors.textSecondary}`}>
              Ini bukan platform review kerja profesional. Ini <span className={`${colors.accent} font-medium`}>tempat orang jujur tentang dunia kerja</span> — yang baik, yang buruk, yang confusing, yang bikin kita tumbuh, yang bikin kita hancur, dan semua yang di antaranya.
            </p>
          </motion.div>

          {/* CTA - No Archive Mentioned */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-center py-12"
          >
            <motion.div 
              className={`h-px ${colors.divider} w-24 mx-auto mb-12`}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
            />

            <h3 className={`font-serif text-3xl md:text-4xl ${colors.text} mb-6`}>
              Punya cerita yang perlu keluar?
            </h3>
            
            <p className={`text-[15px] ${colors.textMuted} max-w-lg mx-auto mb-10 leading-relaxed`}>
              Gak harus sempurna. Gak harus panjang. Gak harus punya moral lesson. Yang penting: <span className={colors.accent}>jujur</span>.
            </p>

            <Link href="/tulis">
              <motion.button
                className={`group relative px-10 py-5 ${colors.accentBg} ${colors.accentBorder} border-2 overflow-hidden`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className={`relative z-10 text-[14px] tracking-[0.25em] uppercase ${colors.accent} font-medium`}>
                  Tulis Sekarang
                </span>
                <motion.div
                  className={`absolute inset-0 ${isDark ? 'bg-[#8b7355]' : 'bg-[#a16207]'}`}
                  initial={{ y: "100%" }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.span 
                  className={`absolute inset-0 flex items-center justify-center text-[14px] tracking-[0.25em] uppercase font-medium ${isDark ? 'text-[#0a0908]' : 'text-[#fafaf9]'} opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20`}
                >
                  Tulis Sekarang
                </motion.span>
              </motion.button>
            </Link>

            <motion.p 
              className={`mt-8 text-[12px] ${colors.subtleText} italic max-w-md mx-auto leading-relaxed`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              &ldquo;Tulisan yang paling jujur adalah yang ditulis tanpa penonton, hanya untuk meyakinkan diri sendiri bahwa kita pernah merasa.&rdquo;
            </motion.p>
          </motion.div>

          {/* Final */}
          <motion.div 
            className="mt-24 text-center pb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <motion.div 
              className="flex items-center justify-center gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 1 }}
            >
              <div className={`h-px ${colors.accentBg} w-8`}></div>
              <span className={`text-[9px] tracking-[0.4em] uppercase ${isDark ? 'text-[#44403c]' : 'text-[#d6d3d1]'}`}>
                Ditulis perlahan, seperti menyeduh kopi di pagi yang belum yakin ingin dimulai
              </span>
              <div className={`h-px ${colors.accentBg} w-8`}></div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
