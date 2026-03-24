"use client";

import postsData from "@/public/data/posts.json";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "@/src/components/ThemeProvider";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  PenLine, 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  Heart,
  Share2,
  Quote,
  Bookmark,
  MoreHorizontal,
  ChevronRight
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function TulisanDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { theme } = useTheme();
  const [showFloatingCta, setShowFloatingCta] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const isDark = theme === "dark";

  const colors = {
    bg: isDark ? "bg-[#0a0a0a]" : "bg-[#fafafa]",
    text: isDark ? "text-neutral-300" : "text-neutral-700",
    textMuted: isDark ? "text-neutral-400" : "text-neutral-600",
    textSubtle: isDark ? "text-neutral-600" : "text-neutral-400",
    heading: isDark ? "text-white" : "text-neutral-900",
    accent: "#c7b299",
    accentSecondary: "#8b7355",
    border: isDark ? "border-neutral-800" : "border-neutral-200",
    cardBg: isDark ? "bg-neutral-900/80" : "bg-white/80",
    quoteBg: isDark ? "bg-[#8b7355]/10" : "bg-[#8b7355]/5",
    grainOpacity: isDark ? "opacity-[0.03]" : "opacity-[0.02]",
    stickyBg: isDark ? "bg-[#0a0a0a]/95" : "bg-[#fafafa]/95",
  };

  const posts = (postsData as any).posts || [];
  const post = posts.find((p: any) => p.slug === slug);
  
  const relatedPosts = post?.related?.length
    ? posts.filter((p: any) => post.related.includes(p.slug)).slice(0, 3)
    : [];

  const morePosts = posts
    .filter((p: any) => p.slug !== slug && !post?.related?.includes(p.slug))
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setShowFloatingCta(scrollPercent > 30 && scrollPercent < 90);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!post) {
    return (
      <main className={`min-h-screen ${colors.bg} ${colors.text} flex items-center justify-center`}>
        <div className="text-center">
          <p className="font-serif text-2xl italic mb-4">Tulisan tidak ditemukan</p>
          <Link href="/tulisan" className="text-[#8b7355] hover:text-[#c7b299]">Kembali ke arsip</Link>
        </div>
      </main>
    );
  }

  return (
    <main className={`min-h-screen ${colors.bg} ${colors.text} transition-colors duration-500`}>
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#8b7355] z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Grain */}
      <div className={`fixed inset-0 ${colors.grainOpacity} pointer-events-none z-0`} style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />

      {/* Floating CTA - Muncul saat scroll */}
      <motion.div 
        initial={false}
        animate={{ y: showFloatingCta ? 0 : 100, opacity: showFloatingCta ? 1 : 0 }}
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 
          ${colors.cardBg} backdrop-blur-xl rounded-full border ${colors.border}
          shadow-2xl shadow-black/20 flex items-center gap-4`}
      >
        <span className="text-sm hidden sm:block">Punya cerita serupa?</span>
        <Link href="/tulis" className="flex items-center gap-2 px-4 py-2 bg-[#8b7355] text-white rounded-full text-sm font-medium hover:bg-[#c7b299] transition-colors">
          <PenLine size={16} />
          Tulis Sekarang
        </Link>
      </motion.div>

      <div className="relative z-10">
        {/* Sticky Header dengan Metadata */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed top-0 left-0 right-0 z-40 px-6 py-4 
            ${colors.stickyBg} backdrop-blur-xl border-b ${colors.border}`}
        >
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <Link href="/tulisan" className="flex items-center gap-2 text-sm text-[#8b7355] hover:text-[#c7b299]">
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Arsip</span>
            </Link>
            
            <div className="flex items-center gap-4 text-xs">
              <span className="px-3 py-1 bg-[#8b7355]/10 text-[#8b7355] rounded-full">
                {post.category}
              </span>
              <span className={colors.textSubtle}>{post.readTime}</span>
            </div>

            <div className="flex items-center gap-2">
              <button className={`p-2 rounded-full hover:bg-neutral-800/10 ${colors.textSubtle}`}>
                <Bookmark size={18} />
              </button>
              <button className={`p-2 rounded-full hover:bg-neutral-800/10 ${colors.textSubtle}`}>
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </motion.nav>

        {/* HERO SECTION - DENGAN OPENING KILLER */}
        <header className="pt-28 pb-12 px-6">
          <div className="max-w-2xl mx-auto">
            <motion.div variants={stagger} initial="hidden" animate="show">
              
              {/* Meta Line */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mb-8 text-xs tracking-wider">
                <span className="text-[#8b7355] font-medium">{post.category}</span>
                <span className={colors.textSubtle}>•</span>
                <span className={colors.textSubtle}>{post.duration || "Pengalaman Kerja"}</span>
                <span className={colors.textSubtle}>•</span>
                <span className={colors.textSubtle}>{post.readTime} baca</span>
              </motion.div>

              {/* OPENING KILLER - Sebelum Judul */}
              <motion.div 
                variants={fadeUp}
                className="mb-8 p-6 rounded-2xl border-l-4 border-[#8b7355] bg-[#8b7355]/5"
              >
                <p className="text-lg md:text-xl leading-relaxed text-[#c7b299] italic font-serif">
                  "{post.opening || post.hook}"
                </p>
              </motion.div>

              {/* Judul */}
              <motion.h1 
                variants={fadeUp}
                className={`font-serif text-3xl md:text-5xl ${colors.heading} leading-[1.15] mb-6 tracking-tight`}
              >
                {post.title}
              </motion.h1>

              {/* Hook/Subtitle */}
              <motion.p 
                variants={fadeUp}
                className={`text-lg ${colors.textMuted} leading-relaxed mb-8`}
              >
                {post.hook}
              </motion.p>

              {/* Author Meta */}
              <motion.div variants={fadeUp} className="flex items-center gap-4 text-sm">
                <div className={`w-10 h-10 rounded-full ${isDark ? 'bg-neutral-800' : 'bg-neutral-200'} flex items-center justify-center`}>
                  <span className="text-lg">✍️</span>
                </div>
                <div>
                  <p className={colors.heading}>{post.role}</p>
                  <p className={colors.textSubtle}>{post.workplace || "Anonim"}</p>
                </div>
                <span className={`ml-auto text-xs ${colors.textSubtle}`}>{post.date}</span>
              </motion.div>
            </motion.div>
          </div>
        </header>

        {/* CONTENT - MEDIUM STYLE */}
        <article className="px-6 pb-16">
          <div className="max-w-2xl mx-auto">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-10"
            >
              {post.content?.map((block: any, index: number) => {
                if (block.type === "paragraph") {
                  return (
                    <motion.p
                      key={index}
                      variants={fadeUp}
                      className={`text-lg md:text-[1.125rem] ${colors.text} leading-[1.8] tracking-[-0.01em]`}
                      style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                    >
                      {block.text}
                    </motion.p>
                  );
                }

                if (block.type === "quote") {
                  return (
                    <motion.blockquote
                      key={index}
                      variants={fadeUp}
                      className="relative my-16 py-8 px-0"
                    >
                      <div className="absolute -top-4 left-0 text-6xl text-[#8b7355]/20 font-serif">"</div>
                      <p className="font-serif text-2xl md:text-3xl italic text-[#c7b299] leading-[1.4] pl-8 border-l-2 border-[#8b7355]/30">
                        {block.text}
                      </p>
                    </motion.blockquote>
                  );
                }

                return null;
              })}
            </motion.div>

            {/* Impact Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 mb-16 p-8 rounded-3xl bg-gradient-to-br from-[#8b7355]/10 to-transparent border border-[#8b7355]/20"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#8b7355]/20 flex items-center justify-center flex-shrink-0">
                  <Heart size={20} className="text-[#8b7355]" />
                </div>
                <div>
                  <h4 className={`text-sm font-semibold tracking-wider uppercase mb-3 ${colors.textSubtle}`}>
                    Kenapa cerita ini penting
                  </h4>
                  <p className={`text-lg ${colors.textMuted} leading-relaxed`}>
                    {post.impact}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Inline CTA - Setelah Baca */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center py-12 border-y border-dashed border-[#8b7355]/30 my-16"
            >
              <p className="font-serif text-2xl italic text-[#c7b299] mb-4">
                "Gue juga pernah ngalamin hal serupa..."
              </p>
              <p className={`text-sm ${colors.textMuted} mb-6`}>
                Ribuan pekerja lain punya cerita yang belum terdengar
              </p>
              <Link
                href="/tulis"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#8b7355] text-white rounded-full hover:bg-[#c7b299] transition-all text-sm font-medium"
              >
                <PenLine size={18} />
                Tulis Ceritamu
              </Link>
            </motion.div>
          </div>
        </article>

        {/* RELATED CONTENT - INTEGRATED (Bukan Footer) */}
        <section className={`px-6 py-20 ${isDark ? 'bg-neutral-900/30' : 'bg-neutral-100/50'}`}>
          <div className="max-w-6xl mx-auto">
            
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#8b7355]/30"></div>
                  <span className="text-xs tracking-[0.2em] uppercase text-[#8b7355] font-medium">
                    Lanjut Baca — Cerita Serupa
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#8b7355]/30"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost: any, index: number) => (
                    <motion.div
                      key={relatedPost.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link 
                        href={`/tulisan/${relatedPost.slug}`}
                        className="group block h-full"
                      >
                        <div className={`h-full p-6 rounded-2xl border ${colors.border} 
                          hover:border-[#8b7355] hover:shadow-xl hover:shadow-[#8b7355]/10
                          transition-all duration-300 ${colors.cardBg}`}>
                          
                          <span className="text-[10px] tracking-widest uppercase text-[#8b7355]">
                            {relatedPost.category}
                          </span>
                          
                          <h3 className={`font-serif text-xl mt-3 mb-3 ${colors.heading} 
                            group-hover:text-[#c7b299] transition-colors leading-snug`}>
                            {relatedPost.title}
                          </h3>
                          
                          <p className={`text-sm ${colors.textMuted} line-clamp-2 mb-4`}>
                            {relatedPost.hook}
                          </p>
                          
                          <div className="flex items-center gap-2 text-xs text-[#8b7355] group-hover:text-[#c7b299]">
                            <span>Baca lanjutan</span>
                            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* More Posts - Random */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-neutral-500/30"></div>
                <span className={`text-xs tracking-[0.2em] uppercase ${colors.textSubtle} font-medium`}>
                  Kamu Juga Mungkin Suka
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-neutral-500/30"></div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {morePosts.map((morePost: any, index: number) => (
                  <motion.div
                    key={morePost.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      href={`/tulisan/${morePost.slug}`}
                      className="group flex items-start gap-4 p-4 rounded-xl hover:bg-neutral-800/5 transition-colors"
                    >
                      <span className={`text-4xl font-serif ${colors.textSubtle} opacity-30`}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <span className="text-[10px] tracking-widest uppercase text-[#8b7355]">
                          {morePost.category}
                        </span>
                        <h4 className={`font-medium mt-1 ${colors.heading} group-hover:text-[#c7b299] transition-colors line-clamp-2`}>
                          {morePost.title}
                        </h4>
                        <span className={`text-xs ${colors.textSubtle} mt-2 block`}>
                          {morePost.readTime}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA - Full Width */}
        <section className="px-6 py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#8b7355]/20 via-transparent to-[#c7b299]/10"></div>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-serif text-4xl md:text-5xl italic text-[#c7b299] mb-6 leading-tight">
                "Ceritamu mungkin yang mereka butuhkan hari ini"
              </p>
              <p className={`text-lg ${colors.textMuted} mb-10 max-w-xl mx-auto`}>
                Setiap pengalaman kerja itu berharga. Jangan biarkan hilang begitu saja.
              </p>
              <Link
                href="/tulis"
                className="inline-flex items-center gap-3 px-10 py-5 
                  bg-[#8b7355] text-white rounded-full
                  hover:bg-[#c7b299] transition-all duration-300 
                  text-base tracking-wider font-medium shadow-2xl shadow-[#8b7355]/30
                  hover:shadow-[#c7b299]/30 hover:-translate-y-1"
              >
                <PenLine size={20} />
                Mulai Menulis
              </Link>
              <p className={`mt-6 text-xs ${colors.textSubtle}`}>
                Anonim • Tanpa login • Langsung terbit
              </p>
            </motion.div>
          </div>
        </section>

        {/* Simple Footer */}
        <footer className={`py-8 px-6 border-t ${colors.border} text-center`}>
          <Link href="/" className={`text-sm ${colors.textSubtle} hover:text-[#8b7355] transition-colors`}>
            ← Kembali ke Beranda
          </Link>
        </footer>
      </div>
    </main>
  );
}
