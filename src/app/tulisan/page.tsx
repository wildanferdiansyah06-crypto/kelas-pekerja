"use client";

import postsData from "@/public/data/posts.json";
import { motion } from "framer-motion";
import { useTheme } from "@/src/components/ThemeProvider";
import Link from "next/link";
import { PenLine, Clock, ArrowRight, Filter } from "lucide-react";
import { useState, useMemo } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

// Kategori yang tersedia
const CATEGORIES = ["Semua", "Barista & FnB", "Retail", "Office & Korporat", "Kreatif", "Lainnya"];

export default function TulisanPage() {
  const posts = postsData.posts || [];
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState("Semua");

  const isDark = theme === "dark";

  const colors = {
    bg: isDark ? "bg-[#0a0a0a]" : "bg-[#fafafa]",
    text: isDark ? "text-neutral-300" : "text-neutral-700",
    textMuted: isDark ? "opacity-60" : "opacity-70",
    textSubtle: isDark ? "opacity-40" : "opacity-50",
    heading: isDark ? "text-white" : "text-neutral-900",
    accent: "#c7b299",
    accentSecondary: "#8b7355",
    border: isDark ? "border-neutral-800" : "border-neutral-200",
    cardBg: isDark ? "bg-neutral-900/30" : "bg-white",
    number: isDark ? "text-neutral-800" : "text-neutral-200",
    selectionBg: isDark ? "selection:bg-[#c7b299]" : "selection:bg-[#8b7355]",
    selectionText: isDark ? "selection:text-[#0a0a0a]" : "selection:text-white",
    grainOpacity: isDark ? "opacity-[0.03]" : "opacity-[0.02]",
  };

  // Filter posts
  const filteredPosts = useMemo(() => {
    if (activeCategory === "Semua") return posts;
    return posts.filter((post: any) => post.category === activeCategory);
  }, [posts, activeCategory]);

  return (
    <main className={`min-h-screen ${colors.bg} ${colors.text} ${colors.selectionBg} ${colors.selectionText} transition-colors duration-500`}>
      {/* Grain Texture */}
      <div
        className={`fixed inset-0 ${colors.grainOpacity} pointer-events-none z-0 transition-opacity duration-500`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 py-32 px-6">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <motion.header
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-20 text-center"
          >
            <div className={`flex items-center justify-center gap-4 mb-8 ${colors.textSubtle}`}>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#c7b299] to-transparent"></div>
              <span className="text-[10px] tracking-[0.5em] uppercase font-light">
                Arsip Pikiran
              </span>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#c7b299] to-transparent"></div>
            </div>

            <h1 className={`font-serif text-5xl md:text-7xl mb-6 ${colors.heading} tracking-tight transition-colors duration-500`}>
              <span className="block text-[#c7b299] text-2xl md:text-3xl mb-4 italic font-light opacity-80">
                ruang bagi
              </span>
              Tulisan
            </h1>

            <p className={`text-lg md:text-xl ${colors.textMuted} leading-[2] max-w-2xl mx-auto font-light transition-opacity duration-500`}>
              Di antara deru waktu yang tak pernah berhenti, ada saat-saat ketika
              kata-kata menjadi satu-satunya tempat perlindungan.
            </p>

            {/* CTA Tulis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-12"
            >
              <Link
                href="/tulis"
                className="inline-flex items-center gap-3 px-8 py-4 
                  border border-[#8b7355]/40 rounded-full
                  text-[#8b7355] hover:text-[#c7b299] hover:border-[#c7b299]
                  transition-all duration-300 text-sm tracking-wider"
              >
                <PenLine size={18} />
                Tulis Ceritamu
              </Link>
            </motion.div>
          </motion.header>

          {/* Filter Kategori */}
          {posts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-16"
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <Filter size={14} className="text-[#8b7355]" />
                <span className={`text-xs tracking-widest uppercase ${colors.textSubtle}`}>
                  Filter Kategori
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 text-xs tracking-wider rounded-full border transition-all duration-300
                      ${activeCategory === cat 
                        ? "bg-[#8b7355] text-white border-[#8b7355]" 
                        : `border-neutral-700/30 hover:border-[#8b7355] ${colors.textMuted}`
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Stats */}
          <div className={`flex items-baseline justify-between mb-12 border-b ${colors.border} pb-4 transition-colors duration-500`}>
            <h2 className={`font-serif text-2xl ${colors.heading} italic transition-colors duration-500`}>
              {activeCategory === "Semua" ? "Semua Cerita" : activeCategory}
            </h2>
            <span className={`text-xs tracking-widest uppercase ${colors.textSubtle}`}>
              {filteredPosts.length > 0 ? `${filteredPosts.length} tulisan` : "Kosong"}
            </span>
          </div>

          {/* Posts List */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="space-y-12"
          >
            {filteredPosts.length === 0 ? (
              <motion.div
                variants={fadeUp}
                className={`text-center py-24 ${colors.textSubtle}`}
              >
                {posts.length === 0 ? (
                  // Belum ada tulisan sama sekali
                  <>
                    <p className="font-serif text-3xl italic mb-4 text-[#c7b299]">
                      "Keheningan yang menunggu..."
                    </p>
                    <p className="text-base mb-4 max-w-md mx-auto leading-relaxed">
                      Belum ada kata yang berani keluar. Tapi keheningan ini gak akan bertahan lama.
                    </p>
                    <p className="text-sm mb-8 opacity-60">
                      Jadi yang pertama mencuri start.
                    </p>
                    <Link
                      href="/tulis"
                      className="inline-flex items-center gap-3 px-8 py-4 
                        bg-[#8b7355] text-white rounded-full
                        hover:bg-[#c7b299] transition-all duration-300 
                        text-sm tracking-wider font-medium"
                    >
                      <PenLine size={18} />
                      Jadi yang Pertama Menulis
                    </Link>
                  </>
                ) : (
                  // Filter gak ketemu
                  <>
                    <p className="font-serif text-xl italic mb-4">
                      Belum ada cerita di kategori ini
                    </p>
                    <button
                      onClick={() => setActiveCategory("Semua")}
                      className="text-[#8b7355] hover:text-[#c7b299] transition-colors text-sm"
                    >
                      Lihat semua kategori →
                    </button>
                  </>
                )}
              </motion.div>
            ) : (
              filteredPosts.map((post: any, index: number) => (
                <motion.article
                  key={post.slug}
                  variants={fadeUp}
                  className="group"
                >
                  <Link href={`/tulisan/${post.slug}`} className="block">
                    <div className={`${colors.cardBg} rounded-2xl p-8 md:p-10 border ${colors.border} 
                      hover:border-[#8b7355]/50 transition-all duration-500
                      hover:shadow-lg hover:shadow-[#8b7355]/5`}>
                      
                      {/* Meta: Kategori & Waktu Baca */}
                      <div className="flex flex-wrap items-center gap-4 mb-6">
                        <span className="px-3 py-1 text-[10px] tracking-widest uppercase 
                          bg-[#8b7355]/10 text-[#8b7355] rounded-full">
                          {post.category}
                        </span>
                        <span className={`flex items-center gap-1 text-xs ${colors.textSubtle}`}>
                          <Clock size={12} />
                          {post.readTime}
                        </span>
                        <span className={`text-xs ${colors.textSubtle}`}>
                          {post.date}
                        </span>
                      </div>

                      {/* HOOK EMOSIONAL */}
                      <p className={`text-base md:text-lg italic mb-4 text-[#c7b299] leading-relaxed 
                        border-l-2 border-[#8b7355]/30 pl-4`}>
                        "{post.hook}"
                      </p>

                      {/* Judul */}
                      <h3 className={`font-serif text-2xl md:text-3xl mb-4 ${colors.heading} 
                        group-hover:text-[#c7b299] transition-colors duration-500 leading-tight`}>
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className={`text-base ${colors.textMuted} leading-[1.9] mb-6 line-clamp-3`}>
                        {post.excerpt}
                      </p>

                      {/* Role & CTA */}
                      <div className="flex items-center justify-between">
                        <span className={`text-xs ${colors.textSubtle} tracking-wider`}>
                          Ditulis oleh: {post.role}
                        </span>
                        <span className="inline-flex items-center gap-2 text-sm text-[#8b7355] 
                          group-hover:text-[#c7b299] transition-colors">
                          Baca selengkapnya
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))
            )}
          </motion.div>

          {/* Footer CTA */}
          {filteredPosts.length > 0 && (
            <motion.footer
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={`mt-24 pt-16 border-t ${colors.border} text-center transition-colors duration-500`}
            >
              <p className={`font-serif italic ${colors.textMuted} text-lg mb-8`}>
                Punya cerita yang perlu didengar?
              </p>
              <Link
                href="/tulis"
                className="inline-flex items-center gap-3 px-8 py-4 
                  bg-[#8b7355] text-[#0a0a0a] dark:text-[#fafafa] rounded-full
                  hover:bg-[#c7b299] transition-all duration-300 
                  text-sm tracking-wider font-medium"
              >
                <PenLine size={18} />
                Tulis Ceritamu
              </Link>
            </motion.footer>
          )}
        </div>
      </div>
    </main>
  );
}
