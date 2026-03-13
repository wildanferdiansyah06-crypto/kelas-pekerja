"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export default function TentangSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1]);

  // Typing effect untuk quote
  const [displayedQuote, setDisplayedQuote] = useState("");
  const fullQuote = "Aku menulis bukan untuk didengar, tapi untuk memastikan bahwa hari-hari ini pernah ada.";
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isInView && !isTyping) {
      setIsTyping(true);
      let i = 0;
      const interval = setInterval(() => {
        if (i <= fullQuote.length) {
          setDisplayedQuote(fullQuote.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1] // Smooth ease-out
      }
    }
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-32 px-6 bg-[#faf8f5] dark:bg-[#1a1816] overflow-hidden relative"
    >
      {/* Floating particles background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: y1, opacity }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#8b7355]/20 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </motion.div>

      <motion.div 
        className="max-w-3xl mx-auto text-center relative z-10"
        style={{ scale }}
      >
        {/* Animated line */}
        <motion.div 
          className="w-12 h-px bg-[#8b7355]/30 mx-auto mb-12 origin-center"
          variants={lineVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Label */}
          <motion.p 
            variants={itemVariants}
            className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-8"
          >
            Tentang
          </motion.p>

          {/* Heading dengan reveal effect */}
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="font-serif text-3xl md:text-4xl leading-snug">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
              >
                Ini bukan buku motivasi.
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1, delay: 0.7 }}
                className="italic text-[#8b7355] opacity-70 inline-block"
              >
                Ini bukan panduan hidup.
              </motion.span>
            </h2>
          </motion.div>

          {/* Paragraf dengan stagger */}
          <motion.div 
            className="space-y-6 text-[15px] leading-[1.9] opacity-70"
            variants={containerVariants}
          >
            <motion.p variants={itemVariants}>
              Kelas Pekerja adalah kumpulan catatan dari seseorang yang masih
              belajar memahami hidupnya sendiri. Tidak ada janji untuk memberi
              jawaban, hanya usaha untuk tetap jujur pada pengalaman sehari-hari.
            </motion.p>

            <motion.p variants={itemVariants}>
              Sebagian tulisan lahir di sela waktu kerja, sebagian lagi di
              malam yang terlalu sunyi. Di antara kopi yang mulai dingin dan
              lagu-lagu yang diputar terlalu pelan.
            </motion.p>

            <motion.p variants={itemVariants}>
              Tidak semua orang punya ruang untuk berhenti sejenak dan
              memikirkan hidupnya. Kadang tulisan menjadi satu-satunya tempat
              untuk melakukannya.
            </motion.p>
          </motion.div>

          {/* Quote dengan typing effect & glow */}
          <motion.div 
            className="mt-16 pt-8 border-t border-[#8b7355]/10"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <motion.p 
              className="font-serif italic text-[#8b7355] text-lg relative inline-block"
              animate={{ 
                textShadow: [
                  "0 0 0px rgba(139,115,85,0)",
                  "0 0 20px rgba(139,115,85,0.3)",
                  "0 0 0px rgba(139,115,85,0)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="opacity-70">&ldquo;{displayedQuote}&rdquo;</span>
              
              {/* Blinking cursor */}
              <motion.span
                className="inline-block w-[2px] h-[1.2em] bg-[#8b7355] ml-1 align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
