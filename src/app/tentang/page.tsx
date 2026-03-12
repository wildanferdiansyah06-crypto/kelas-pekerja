"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

// Custom easing curves untuk feel yang lebih organic
const easeOutExpo = [0.16, 1, 0.3, 1];
const easeInOutQuart = [0.76, 0, 0.24, 1];
const easeOutQuart = [0.25, 1, 0.5, 1];

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  className?: string;
}

const ScrollReveal = ({ 
  children, 
  delay = 0, 
  direction = "up",
  duration = 0.8,
  className = "" 
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const directions = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        ...directions[direction]
      }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0, 
        y: 0 
      } : {}}
      transition={{ 
        duration,
        delay,
        ease: easeOutExpo
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Text reveal component untuk efek mengetik/perkata
const TextReveal = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <span ref={ref} className={`overflow-hidden inline-block ${className}`}>
      <motion.span
        className="inline-block"
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : {}}
        transition={{ duration: 0.8, delay, ease: easeOutExpo }}
      >
        {text}
      </motion.span>
    </span>
  );
};

// Magnetic button effect
const MagneticButton = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const x = (clientX - left - width / 2) * 0.3;
    const y = (clientY - top - height / 2) * 0.3;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
      <motion.span
        className="absolute inset-0 bg-white/10 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.5, opacity: 1 }}
        transition={{ duration: 0.4 }}
      />
    </motion.button>
  );
};

// Floating particles background
const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-neutral-700/30 rounded-full"
          initial={{ 
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800) 
          }}
          animate={{ 
            y: [null, Math.random() * -100, Math.random() * 100],
            x: [null, Math.random() * 50, Math.random() * -50],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: 15 + Math.random() * 10, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

// Parallax image component
const ParallaxImage = ({ src, alt, className = "" }: { src: string, alt: string, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale }}
        className="w-full h-full object-cover"
      />
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-[#0c0c0c]"
        style={{ opacity }}
      />
    </div>
  );
};

// Staggered text animation untuk heading
const StaggeredText = ({ text, className = "" }: { text: string, className?: string }) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const words = text.split(" ");

  return (
    <h2 ref={ref} className={`flex flex-wrap gap-x-3 ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", rotateX: -90 }}
            animate={isInView ? { y: 0, rotateX: 0 } : {}}
            transition={{ 
              duration: 0.8, 
              delay: i * 0.1, 
              ease: easeOutExpo 
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  );
};

export default function TentangPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#0c0c0c] text-neutral-200 selection:bg-[#8b7355] selection:text-white overflow-x-hidden">
      
      {/* Floating particles */}
      <FloatingParticles />

      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#8b7355] origin-left z-50"
        style={{ scaleX: smoothProgress }}
      />

      {/* Mouse follower glow */}
      <motion.div
        className="fixed w-[600px] h-[600px] rounded-full pointer-events-none z-0 opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(139,115,85,0.15) 0%, transparent 70%)",
          left: mousePosition.x * 10,
          top: mousePosition.y * 10,
          x: "-50%",
          y: "-50%"
        }}
        animate={{
          x: mousePosition.x * 2,
          y: mousePosition.y * 2
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      />

      <main className="relative z-10">
        
        {/* HERO SECTION */}
        <motion.section 
          className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          {/* Background gradient yang bergerak */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-transparent to-[#0c0c0c]"
            style={{ y: backgroundY }}
          />
          
          {/* Decorative elements */}
          <motion.div 
            className="absolute top-20 left-10 w-32 h-32 border border-neutral-800/50 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-32 right-20 w-24 h-24 border border-[#8b7355]/20 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />

          <div className="max-w-4xl mx-auto text-center relative">
            
            {/* Label dengan line decoration */}
            <ScrollReveal delay={0.2}>
              <div className="flex items-center justify-center gap-4 mb-8">
                <motion.div 
                  className="h-[1px] w-12 bg-neutral-700"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                <span className="text-xs tracking-[0.5em] uppercase text-neutral-500 font-light">
                  Tentang
                </span>
                <motion.div 
                  className="h-[1px] w-12 bg-neutral-700"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </ScrollReveal>

            {/* Main title dengan character animation */}
            <div className="overflow-hidden mb-8">
              <motion.h1 
                className="font-serif text-6xl md:text-8xl lg:text-9xl text-white leading-none tracking-tight"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.3, ease: easeOutExpo }}
              >
                {"Kelas Pekerja".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.5 + i * 0.05,
                      ease: easeOutQuart
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.h1>
            </div>

            {/* Subtitle dengan fade up */}
            <ScrollReveal delay={0.8} duration={1}>
              <p className="text-lg md:text-xl opacity-60 leading-relaxed max-w-2xl mx-auto font-light">
                Sebuah ruang sunyi untuk mencatat kehidupan yang berjalan pelan.
                Catatan tentang kerja, kopi, dan hari-hari yang sering terasa biasa,
                tetapi sebenarnya penuh makna.
              </p>
            </ScrollReveal>

            {/* Scroll indicator */}
            <motion.div 
              className="absolute -bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-600">Scroll</span>
              <motion.div 
                className="w-[1px] h-12 bg-gradient-to-b from-neutral-600 to-transparent"
                animate={{ scaleY: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </motion.section>

        {/* ASAL MUASAL SECTION */}
        <section className="py-32 px-6 relative">
          <div className="max-w-4xl mx-auto">
            
            <div className="grid md:grid-cols-12 gap-12 items-start">
              <div className="md:col-span-4">
                <ScrollReveal direction="left">
                  <div className="sticky top-32">
                    <span className="text-[#8b7355] text-sm tracking-[0.3em] uppercase block mb-4">01</span>
                    <StaggeredText 
                      text="Asal Muasal" 
                      className="font-serif text-4xl md:text-5xl text-white leading-tight"
                    />
                    <motion.div 
                      className="h-[2px] w-24 bg-[#8b7355] mt-6"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    />
                  </div>
                </ScrollReveal>
              </div>

              <div className="md:col-span-8 space-y-8">
                <ScrollReveal delay={0.2}>
                  <p className="text-xl md:text-2xl leading-[1.8] text-neutral-300 font-light">
                    Tempat ini lahir dari kegelisahan sederhana yang sering datang di
                    malam-malam sunyi. Sebuah perasaan bahwa begitu banyak orang
                    bekerja setiap hari, menjalani hidupnya dengan tenang,
                    tetapi kisah mereka hampir tidak pernah dituliskan.
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={0.4}>
                  <p className="text-lg leading-[1.9] text-neutral-400">
                    Kita hidup di dunia yang terlalu sering merayakan pencapaian
                    besar. Padahal kehidupan juga terjadi di ruang-ruang kecil:
                    di balik meja kerja, di perjalanan pulang yang panjang,
                    di antara tegukan kopi yang perlahan mendingin.
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={0.6}>
                  <p className="text-lg leading-[1.9] text-neutral-400">
                    Kelas Pekerja lahir dari keyakinan sederhana bahwa setiap
                    kehidupan—seberapa biasa pun—mengandung keindahan yang patut
                    disimpan.
                  </p>
                </ScrollReveal>

                {/* Quote dengan special styling */}
                <ScrollReveal delay={0.8}>
                  <div className="relative pl-8 py-8 my-12">
                    <motion.div 
                      className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#8b7355] via-[#8b7355] to-transparent"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                    />
                    <blockquote className="font-serif text-2xl md:text-3xl text-[#c7b299] leading-relaxed italic">
                      "Karena terkadang, yang paling sederhana justru yang paling dekat
                      dengan kebenaran hidup."
                    </blockquote>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* VISUAL BREAK - Parallax Image */}
        <section className="relative h-[60vh] overflow-hidden">
          <ParallaxImage 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80" 
            alt="Workspace aesthetic"
            className="absolute inset-0 h-full"
          />
          <div className="absolute inset-0 bg-[#0c0c0c]/60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <ScrollReveal>
              <p className="text-xs tracking-[0.5em] uppercase text-neutral-400">Ruang untuk Bernapas</p>
            </ScrollReveal>
          </div>
        </section>

        {/* FILOSOFI SECTION */}
        <section className="py-32 px-6 relative">
          <div className="max-w-5xl mx-auto">
            
            <div className="text-center mb-20">
              <ScrollReveal>
                <span className="text-[#8b7355] text-sm tracking-[0.3em] uppercase block mb-4">02</span>
              </ScrollReveal>
              <StaggeredText 
                text="Filosofi Kami" 
                className="font-serif text-5xl md:text-6xl text-white justify-center"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Kehidupan Sederhana",
                  desc: "Kami percaya bahwa kehidupan sederhana juga layak untuk dicatat. Bahwa menulis bukan hanya milik penulis besar, tetapi milik siapa saja yang mencoba memahami hidupnya sendiri.",
                  delay: 0
                },
                {
                  title: "Tulisan yang Menemani",
                  desc: "Tidak semua tulisan harus mengubah dunia. Kadang tulisan hanya perlu menemani seseorang melewati malam yang panjang.",
                  delay: 0.2
                },
                {
                  title: "Rasa Dimengerti",
                  desc: "Jika seseorang membaca tulisan di sini dan merasa hidupnya sedikit lebih dimengerti, maka tempat kecil ini sudah menjalankan tugasnya.",
                  delay: 0.4
                }
              ].map((item, index) => (
                <ScrollReveal key={index} delay={item.delay} direction="up">
                  <motion.div 
                    className="group relative p-8 border border-neutral-800/50 hover:border-[#8b7355]/30 transition-colors duration-500 bg-neutral-900/20 backdrop-blur-sm"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-b from-[#8b7355]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <span className="text-[#8b7355]/50 text-5xl font-serif absolute top-4 right-4 opacity-30">
                      0{index + 1}
                    </span>
                    <h3 className="font-serif text-2xl text-white mb-4 relative z-10">
                      {item.title}
                    </h3>
                    <p className="text-neutral-400 leading-relaxed relative z-10">
                      {item.desc}
                    </p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>

            {/* Connecting line animation */}
            <div className="hidden md:block absolute left-1/2 top-[400px] -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-[#8b7355]/30 to-transparent" />
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-32 px-6 border-t border-neutral-900/50">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <p className="text-neutral-500 text-sm tracking-[0.3em] uppercase mb-6">Mulai Menulis</p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-8 leading-tight">
                Punya cerita yang ingin dibagikan?
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <p className="text-neutral-400 mb-12 text-lg">
                Setiap suara berharga. Setiap cerita penting.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <MagneticButton className="group relative px-8 py-4 border border-[#8b7355] text-[#c7b299] text-sm tracking-[0.2em] uppercase hover:text-white transition-colors duration-300 rounded-full">
                <span className="relative z-10">Kirim Tulisan</span>
                <motion.span 
                  className="absolute inset-0 bg-[#8b7355]"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.4, ease: easeOutExpo }}
                  style={{ originX: 0.5, originY: 0.5, borderRadius: "9999px" }}
                />
              </MagneticButton>
            </ScrollReveal>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-neutral-900 py-16 px-6 relative overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
              <ScrollReveal direction="left">
                <span className="font-serif text-3xl text-white tracking-tight">
                  Kelas Pekerja
                </span>
              </ScrollReveal>
              
              <ScrollReveal direction="right">
                <div className="flex gap-12 text-xs tracking-[0.2em] uppercase">
                  {["Arsip", "Kirim Tulisan", "Kontak"].map((item, i) => (
                    <motion.a
                      key={item}
                      href="#"
                      className="text-neutral-500 hover:text-[#c7b299] transition-colors relative group"
                      whileHover={{ y: -2 }}
                    >
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c7b299] group-hover:w-full transition-all duration-300" />
                    </motion.a>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal>
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-neutral-900/50 text-xs text-neutral-600 tracking-wider">
                <span>© {new Date().getFullYear()} Kelas Pekerja</span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#8b7355] rounded-full animate-pulse" />
                  Dibuat dengan sunyi di malam hari
                </span>
              </div>
            </ScrollReveal>
          </div>
        </footer>

      </main>

      {/* Noise texture overlay untuk aesthetic film grain */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
