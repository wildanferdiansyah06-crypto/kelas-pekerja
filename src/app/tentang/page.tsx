"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/src/components/ThemeProvider";
import Link from "next/link";

export default function TentangPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });
  
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
    accentBorder: isDark ? "border-[#8b7355]/30" : "border-[#a16207]/30",
    accentBg: isDark ? "bg-[#8b7355]/20" : "bg-[#a16207]/20",
    accentBgLight: isDark ? "bg-[#8b7355]/10" : "bg-[#a16207]/10",
    divider: isDark ? "bg-[#8b7355]/20" : "bg-[#a16207]/20",
    subtleText: isDark ? "text-[#57534e]" : "text-[#a8a29e]",
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const letterAnimation = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: 0.3 + (i * 0.05),
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const lineExpand = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className={`min-h-screen ${colors.bg} ${colors.text} relative overflow-hidden transition-colors duration-500`}>
      {/* Noise texture */}
      <div className={`absolute inset-0 ${isDark ? 'opacity-[0.03]' : 'opacity-[0.02]'} pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]`}></div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-[1px] h-[1px] ${isDark ? 'bg-[#8b7355]/30' : 'bg-[#a16207]/20'} rounded-full`}
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: isDark ? [0.1, 0.3, 0.1] : [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 6 + i * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4
            }}
          />
        ))}
      </div>

      {/* HERO SECTION */}
      <div 
        ref={heroRef}
        className="relative z-10 min-h-[85vh] flex flex-col justify-center items-center px-6 pt-24 pb-16"
      >
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={isHeroInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Label */}
          <motion.div 
            className="flex items-center justify-center gap-4 mb-8"
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
          >
            <motion.div 
              className={`h-px ${isDark ? 'bg-[#8b7355]/30' : 'bg-[#a16207]/30'} w-12 origin-right`}
              variants={lineExpand}
            />
            <motion.span 
              className={`text-[10px] tracking-[0.5em] uppercase ${colors.accentMuted}`}
              initial={{ opacity: 0 }}
              animate={isHeroInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Arsip Pikiran
            </motion.span>
            <motion.div 
              className={`h-px ${isDark ? 'bg-[#8b7355]/30' : 'bg-[#a16207]/30'} w-12 origin-left`}
              variants={lineExpand}
            />
          </motion.div>

          {/* Context */}
          <motion.p
            className={`font-serif italic ${colors.accent} text-lg md:text-xl mb-6 opacity-80`}
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 0.8, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            ruang bagi
          </motion.p>

          {/* Main Title */}
          <div className="overflow-hidden mb-8">
            <h1 className={`font-serif text-5xl md:text-7xl lg:text-8xl ${colors.text} flex justify-center perspective-1000`}>
              {"Tentang".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterAnimation}
                  initial="hidden"
                  animate={isHeroInView ? "visible" : "hidden"}
                  className="inline-block"
                  style={{ 
                    transformStyle: "preserve-3d",
                    textShadow: isDark ? "0 0 60px rgba(139,115,85,0.12)" : "0 0 40px rgba(161,98,7,0.08)"
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Original Subtitle - Typewriter */}
          <motion.div 
            className="max-w-2xl mx-auto mt-8"
            initial={{ opacity: 0 }}
            animate={isHeroInView ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <p className={`text-[15px] md:text-[17px] leading-[1.9] ${colors.textMuted} font-light`}>
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

      {/* MAIN CONTENT - Continuous Scroll, No Fade Out */}
      <div className={`relative z-10 max-w-3xl mx-auto px-6 pb-32 ${colors.text}`}>
        
        {/* === YOUR ORIGINAL MANIFESTO - FULLY PRESERVED === */}
        <motion.div
          custom={0}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-12"
        >
          <p className={`text-[16px] md:text-[18px] leading-[2] ${colors.textSecondary} font-light text-justify`}>
            <motion.span 
              className={`float-left text-6xl md:text-7xl font-serif ${colors.accent} mr-4 mt-1 leading-none`}
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              K
            </motion.span>
            ita hidup di era yang terobsesi pada kecepatan. Segala sesuatu harus instan, terukur, menghasilkan. Namun di sudut terdalam kesadaran, kita tahu: yang benar-benar berarti justru datang dari proses yang lambat, menyakitkan, dan seringkali tanpa tujuan jelas.
          </p>
        </motion.div>

        <motion.div 
          className="space-y-8 mb-16"
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
          className={`my-16 pl-6 md:pl-8 border-l-2 ${colors.accentBorder}`}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <blockquote 
            className={`font-serif italic text-xl md:text-2xl ${colors.accent} leading-[1.7]`}
          >
            &ldquo;Menulis adalah cara kita memberi makna pada kekosongan. Bukan untuk mengisinya, tetapi untuk mengenalinya. Seperti menatap ke dalam sumur yang gelap dan akhirnya melihat bayangan diri sendiri.&rdquo;
          </blockquote>
        </motion.div>

        <motion.p 
          className={`text-[16px] md:text-[17px] leading-[2] ${colors.textMuted} font-light text-justify mb-20`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Mungkin ini semua hanya monolog yang tak pernah dimaksudkan untuk didengar. Tapi jika kamu menemukan dirimu di sini, di antara kata-kata yang tercecer—selamat datang. Kita adalah orang-orang yang sama: yang mencari arti di tempat-tempat yang orang lain lewati begitu saja.
        </motion.p>

        {/* Divider */}
        <motion.div 
          className="flex items-center justify-center gap-4 py-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={`h-px ${colors.divider} w-16 md:w-24`}></div>
          <div className={`w-1.5 h-1.5 border ${isDark ? 'border-[#8b7355]/40' : 'border-[#a16207]/40'} rotate-45`}></div>
          <div className={`h-px ${colors.divider} w-16 md:w-24`}></div>
        </motion.div>

        {/* === BRIDGE: Why This Exists (Personal Layer) === */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="pt-8 pb-12"
        >
          <div className="text-center mb-12">
            <span className={`text-[10px] tracking-[0.4em] uppercase ${colors.accentMuted}`}>
              Tapi Mengapa Ini Ada?
            </span>
          </div>

          <p className={`text-[17px] md:text-[19px] leading-[2] ${colors.textSecondary} font-light text-justify mb-8`}>
            Semua tulisan di atas bukan sekadar filosofi yang gue angkat dari buku. Mereka datang dari <span className={colors.accent}>pengalaman hidup</span> — dari hari-hari di mana gue duduk sendirian di sudut kafe, menatap cangkir kopi yang tengah menghangat, dan bertanya dalam hati: <em className={`${colors.accent} not-italic`}>untuk apa sebenarnya gue bekerja sekeras ini?</em>
          </p>

          <p className={`text-[16px] md:text-[17px] leading-[2] ${colors.textMuted} font-light text-justify mb-8`}>
            Gue pernah berada di tempat kerja yang di atas kertas terlihat "sempurna" — gaji cukup, nama perusahaan terdengar bagus, posisi stabil. Tapi setiap pagi, gue harus memaksa diri sendiri untuk bangkit dari tempat tidur. Bukan karena malas. Karena ada sesuatu yang <span className={colors.accent}>salah</span>, tapi gue tidak bisa menjelaskan apa. Dan yang lebih buruk: gue tidak punya tempat untuk bercerita.
          </p>

          <p className={`text-[16px] md:text-[17px] leading-[2] ${colors.textMuted} font-light text-justify`}>
            Gue butuh ruang yang <span className={colors.accent}>lambat</span>. Yang tidak menuntut jawaban instan. Yang memberi izin untuk tidak sempurna, untuk bingung, untuk merasa tanpa harus memahami. Website ini lahir dari kebutuhan itu — dan dari keyakinan bahwa gue tidak sendirian.
          </p>
        </motion.div>

        {/* Personal Quote */}
        <motion.div
          className={`my-14 pl-6 md:pl-8 border-l-2 ${colors.accentBorder}`}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className={`font-serif italic text-xl md:text-2xl ${colors.accent} leading-[1.7]`}>
            &ldquo;Gue bikin ini bukan karena gue sudah menemukan jawabannya. Gue bikin ini karena gue masih mencari — dan gue tahu ada orang lain di luar sana yang juga mencari.&rdquo;
          </p>
        </motion.div>

        {/* Who Is This For */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className={`font-serif text-xl md:text-2xl ${colors.text} mb-8 text-center`}>
            Ini Untuk Kamu Yang...
          </h3>

          <div className="space-y-4">
            {[
              {
                title: "Merasa sendiri di tengah keramaian kantor",
                desc: "Di sekitarmu ada puluhan rekan kerja, tapi tidak satu pun yang benar-benar mengerti apa yang kamu rasakan."
              },
              {
                title: "Punya cerita tapi tidak tahu harus cerita ke siapa",
                desc: "Takut dianggap lemah, takut dianggap tidak bersyukur, takut di-judge oleh orang yang tidak mengerti konteksnya."
              },
              {
                title: "Sedang bertanya-tanya: ini salahku, atau memang tempatnya?",
                desc: "Kebingungan yang valid. Gue pernah di sana, dan tidak ada yang salah dengan merasa bingung."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className={`flex gap-4 p-5 ${isDark ? 'bg-[#1c1917]/30' : 'bg-[#f5f5f4]/70'} border-l-2 ${colors.accentBorder}`}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ x: 6, transition: { duration: 0.2 } }}
              >
                <span className={`${colors.accent} font-serif text-xl leading-none mt-0.5`}>0{index + 1}</span>
                <div>
                  <h4 className={`${colors.textSecondary} font-medium mb-1 text-[15px]`}>{item.title}</h4>
                  <p className={`text-[14px] ${colors.textMuted} leading-relaxed`}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Positioning Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`p-6 md:p-8 ${colors.accentBgLight} border ${colors.accentBorder} text-center mb-16`}
        >
          <p className={`text-[15px] md:text-[16px] leading-[1.9] ${colors.textSecondary}`}>
            Ini bukan platform review kerja profesional. Ini <span className={`${colors.accent} font-medium`}>tempat orang jujur tentang dunia kerja</span> — yang baik, yang buruk, yang membingungkan, yang membuat kita tumbuh, yang membuat kita hancur, dan semua nuansa di antaranya.
          </p>
        </motion.div>

        {/* CTA Section - No Archive */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center py-12"
        >
          <div className={`h-px ${colors.divider} w-20 mx-auto mb-10`}></div>

          <h3 className={`font-serif text-2xl md:text-3xl ${colors.text} mb-5`}>
            Punya cerita yang perlu keluar?
          </h3>
          
          <p className={`text-[15px] ${colors.textMuted} max-w-md mx-auto mb-8 leading-relaxed`}>
            Tidak harus sempurna. Tidak harus panjang. Tidak harus punya pelajaran moral. Yang penting: <span className={colors.accent}>jujur</span>.
          </p>

          <Link href="/tulis">
            <motion.button
              className={`group relative px-8 py-4 ${colors.accentBg} ${colors.accentBorder} border overflow-hidden`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className={`relative z-10 text-[13px] tracking-[0.2em] uppercase ${colors.accent} font-medium transition-colors duration-300 group-hover:text-white`}>
                Tulis Sekarang
              </span>
              <motion.div
                className={`absolute inset-0 ${isDark ? 'bg-[#8b7355]' : 'bg-[#a16207]'}`}
                initial={{ y: "100%" }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.button>
          </Link>

          <p className={`mt-8 text-[12px] ${colors.subtleText} italic max-w-sm mx-auto leading-relaxed`}>
            &ldquo;Tulisan yang paling jujur adalah yang ditulis tanpa penonton, hanya untuk meyakinkan diri sendiri bahwa kita pernah merasa.&rdquo;
          </p>
        </motion.div>

        {/* Final Footer */}
        <motion.div 
          className="mt-20 text-center pb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3">
            <div className={`h-px ${colors.accentBg} w-6`}></div>
            <span className={`text-[9px] tracking-[0.4em] uppercase ${isDark ? 'text-[#44403c]' : 'text-[#d6d3d1]'}`}>
              Ditulis perlahan, seperti menyeduh kopi di pagi yang belum yakin ingin dimulai
            </span>
            <div className={`h-px ${colors.accentBg} w-6`}></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
