"use client";

import postsData from "@/public/data/posts.json";
import { motion } from "framer-motion";
import { useTheme } from "@/src/components/ThemeProvider";
import Link from "next/link";
import { PenLine, Clock, ArrowRight, Filter, Sparkles, TrendingUp, ChevronRight, Heart, BookOpen } from "lucide-react";
import { useState, useMemo, useCallback, memo } from "react";

// Memoized animation variants to prevent recreation
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const CATEGORIES = ["Semua", "Ruang Bagi", "Barista & FnB", "Retail", "Office & Korporat", "Gig Economy", "Startup", "Kreatif"];

// Memoized background component to prevent re-renders
const Background = memo(({ isDark }: { isDark: boolean }) => {
  return (
    <div className={`fixed inset-0 ${isDark ? "opacity-[0.03]" : "opacity-[0.02]"} pointer-events-none z-0`}>
      {/* Simplified background with fewer animations */}
      <div className="absolute top-20 left-10 w-32 h-32 opacity-20">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#c7b299]/10 to-transparent blur-3xl animate-pulse"></div>
      </div>
      <div className="absolute top-40 right-20 w-24 h-24 opacity-15">
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#8b7355]/10 to-transparent blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      <div className="absolute bottom-20 left-1/4 w-40 h-40 opacity-10">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-[#c7b299]/5 to-transparent blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
    </div>
  );
});

Background.displayName = "Background";

// Memoized post card component
const PostCard = memo(({ 
  post, 
  index, 
  colors 
}: { 
  post: any; 
  index: number; 
  colors: any;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: Math.min(index * 0.05, 0.3) }} // Cap delay for better performance
    whileHover={{ y: -3 }}
    className={`${colors.cardBg} rounded-2xl border ${colors.border} overflow-hidden hover:shadow-xl transition-all duration-300 group`}
  >
    <Link href={`/tulisan/${post.slug}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] tracking-widest uppercase text-[#8b7355] font-medium">{post.category}</span>
          <span className="flex items-center gap-1 text-xs text-[#8b7355]">
            <Heart size={12} />
            {post.likes || 0}
          </span>
        </div>
        
        <h3 className={`font-serif text-xl mb-3 ${colors.heading} group-hover:text-[#c7b299] transition-colors leading-tight`}>
          {post.title}
        </h3>
        
        <p className={`${colors.textMuted} text-sm leading-relaxed mb-4 line-clamp-3`}>
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#8b7355]">
            <Clock size={12} />
            {post.readTime}
          </div>
          <ChevronRight size={16} className="text-[#8b7355] group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  </motion.div>
));

PostCard.displayName = "PostCard";

// Memoized trending post component
const TrendingPostCard = memo(({ post, colors }: { post: any; colors: any }) => (
  <Link href={`/tulisan/${post.slug}`} className="flex-shrink-0 w-72 p-4 rounded-xl border border-[#8b7355]/20 hover:border-[#8b7355] hover:bg-[#8b7355]/5 transition-all group">
    <div className="flex items-center justify-between mb-2">
      <span className="text-[10px] tracking-widest uppercase text-[#8b7355]">{post.category}</span>
      <span className="flex items-center gap-1 text-xs text-[#8b7355]"><Heart size={12} /> {post.likes}</span>
    </div>
    <h3 className={`font-serif text-lg ${colors.heading} group-hover:text-[#c7b299] line-clamp-2`}>{post.title}</h3>
    <div className="flex items-center gap-2 mt-3 text-xs text-[#8b7355]">
      <Clock size={12} />
      {post.readTime}
      <ChevronRight size={12} className="ml-auto group-hover:translate-x-1 transition-transform" />
    </div>
  </Link>
));

TrendingPostCard.displayName = "TrendingPostCard";

export default function TulisanPage() {
  const posts = (postsData as any).posts || [];
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState("Semua");

  const isDark = theme === "dark";

  // Memoized colors object
  const colors = useMemo(() => ({
    bg: isDark ? "bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2a] to-[#2d2d2d]" : "bg-gradient-to-br from-[#fafafa] via-[#f5f5f5] to-[#e8e8e8]",
    text: isDark ? "text-neutral-300" : "text-neutral-700",
    textMuted: isDark ? "text-neutral-400" : "text-neutral-600",
    textSubtle: isDark ? "text-neutral-600" : "text-neutral-400",
    heading: isDark ? "text-white" : "text-neutral-900",
    accent: isDark ? "#c7b299" : "#8b7355",
    accentSecondary: isDark ? "#8b7355" : "#c7b299",
    border: isDark ? "border-neutral-800/50" : "border-neutral-200/50",
    cardBg: isDark ? "bg-neutral-900/40 backdrop-blur-sm" : "bg-white/40 backdrop-blur-sm",
    featuredBg: isDark ? "bg-gradient-to-br from-[#c7b299]/20 via-neutral-900/80 to-[#0a0a0a]" 
                      : "bg-gradient-to-br from-[#c7b299]/20 via-white to-[#fafafa]",
    accentBg: isDark ? "bg-neutral-900/80" : "bg-white/80",
  }), [isDark]);

  // Memoized computed values
  const { featuredPost, regularPosts, trendingPosts, filteredPosts, showFeatured } = useMemo(() => {
    const featured = posts.find((p: any) => p.isFeatured);
    const regular = posts.filter((p: any) => !p.isFeatured);
    const trending = [...posts]
      .filter((p: any) => !p.isFeatured)
      .sort((a, b) => (b.likes || 0) - (a.likes || 0))
      .slice(0, 4);
    const show = activeCategory === "Semua" || activeCategory === "Ruang Bagi";
    
    const filtered = activeCategory === "Semua" 
      ? regular 
      : regular.filter((post: any) => post.category === activeCategory);

    return {
      featuredPost: featured,
      regularPosts: regular,
      trendingPosts: trending,
      filteredPosts: filtered,
      showFeatured: show
    };
  }, [posts, activeCategory]);

  // Memoized event handlers
  const handleCategoryClick = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  return (
    <main className={`min-h-screen ${colors.bg} ${colors.text} transition-colors duration-500`}>
      <Background isDark={isDark} />

      <div className="relative z-10">
        {/* HERO */}
        <motion.header variants={stagger} initial="hidden" animate="show" className="pt-24 pb-12 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#8b7355]"></div>
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#8b7355] font-medium">Arsip Pikiran</span>
              <div className="h-px w-12 bg-[#8b7355]"></div>
            </motion.div>

            <motion.h1 variants={fadeUp} className={`font-serif text-4xl sm:text-5xl md:text-7xl mb-6 ${colors.heading} tracking-tight`}>
              <span className="block text-[#c7b299] text-xl sm:text-2xl md:text-3xl mb-3 italic font-light">ruang bagi</span>
              Tulisan
            </motion.h1>

            <motion.p variants={fadeUp} className={`text-lg sm:text-xl ${colors.textMuted} leading-relaxed max-w-2xl mx-auto mb-8`}>
              Di antara deru waktu yang tak pernah berhenti, ada saat-saat ketika kata-kata menjadi satu-satunya tempat perlindungan.
            </motion.p>

            <motion.div variants={fadeUp}>
              <Link href="/tulis" className="inline-flex items-center gap-3 px-8 py-4 bg-[#8b7355] text-white rounded-full hover:bg-[#c7b299] transition-all duration-300 text-sm font-medium shadow-lg shadow-[#8b7355]/25">
                <PenLine size={18} />
                Tulis Ceritamu
              </Link>
            </motion.div>
          </div>
        </motion.header>

        {/* TRENDING STRIP */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`py-6 border-y ${colors.border} overflow-hidden`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-4 mb-4">
              <TrendingUp size={18} className="text-[#8b7355]" />
              <span className="text-xs tracking-widest uppercase text-[#8b7355] font-medium">Sedang Dibaca</span>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {trendingPosts.map((post: any) => (
                <TrendingPostCard key={post.slug} post={post} colors={colors} />
              ))}
            </div>
          </div>
        </motion.section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          {/* FILTER */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Filter size={14} className="text-[#8b7355]" />
              <span className={`text-xs tracking-widest uppercase ${colors.textSubtle}`}>Filter Kategori</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-4 py-2 text-xs tracking-wider rounded-full border transition-all duration-300
                    ${activeCategory === cat ? "bg-[#8b7355] text-white border-[#8b7355]" : `border-neutral-700/30 hover:border-[#8b7355] ${colors.textMuted}`}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* FEATURED */}
          {showFeatured && featuredPost && (
            <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-16">
              <div className={`relative overflow-hidden rounded-3xl ${colors.featuredBg} border ${colors.border} p-6 sm:p-10`}>
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#c7b299]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="relative z-10 max-w-3xl">
                  <div className="flex items-center gap-2 mb-6">
                    <Sparkles size={16} className="text-[#c7b299]" />
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[#c7b299] font-medium">Pembuka Ruang</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-[#8b7355] text-white text-xs rounded-full">{featuredPost.category}</span>
                    <span className={`px-3 py-1 border ${colors.border} text-xs rounded-full ${colors.textMuted}`}>{featuredPost.readTime}</span>
                  </div>

                  <p className="text-lg sm:text-xl italic text-[#c7b299] mb-4 leading-relaxed border-l-2 border-[#8b7355]/50 pl-4">
                    "{featuredPost.opening || featuredPost.hook}"
                  </p>

                  <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl mb-6 ${colors.heading} leading-tight`}>{featuredPost.title}</h2>

                  <p className={`text-lg ${colors.textMuted} leading-relaxed mb-8 max-w-2xl`}>{featuredPost.excerpt}</p>

                  <Link href={`/tulisan/${featuredPost.slug}`} className="inline-flex items-center gap-3 px-8 py-4 bg-[#8b7355] text-white rounded-full hover:bg-[#c7b299] transition-all text-sm font-medium">
                    Baca Pembukaan
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </motion.section>
          )}

          {/* POSTS GRID - Limited to 12 posts for better performance */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredPosts.slice(0, 12).map((post: any, index: number) => (
              <PostCard key={post.slug} post={post} index={index} colors={colors} />
            ))}
          </motion.div>

          {/* Load More Button */}
          {filteredPosts.length > 12 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-center mb-16">
              <button className="inline-flex items-center gap-3 px-8 py-4 border ${colors.border} rounded-full hover:${colors.accentBg} transition-all text-sm font-medium ${colors.text}">
                <ArrowRight size={18} />
                Muat Lebih Banyak
              </button>
            </motion.div>
          )}

          {/* TENTANG SECTION */}
          <motion.section initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className={`py-16 border-y ${colors.border}`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Left Side - Visual Story */}
                <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="text-center md:text-left">
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 mx-auto md:mx-0 rounded-full bg-gradient-to-br ${colors.accent} to-transparent p-1 flex items-center justify-center`}>
                      <BookOpen className="text-white" size={24} />
                    </div>
                    <h3 className={`font-serif text-2xl md:text-3xl ${colors.heading} mb-4 leading-tight`}>Tentang Tulisan</h3>
                    <p className={`text-lg ${colors.textMuted} leading-relaxed max-w-md`}>
                      Platform ini lahir dari kebutuhan akan berbagi pengalaman kerja yang sebenarnya. Setiap cerita adalah jejak yang membantu orang lain menemukan jalan mereka sendiri.
                    </p>
                  </div>
                  
                  {/* Key Features */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full ${colors.accentBg} flex items-center justify-center`}>
                        <Heart className={colors.accent} size={20} />
                      </div>
                      <div>
                        <h4 className={`font-semibold ${colors.heading} mb-1`}>Berbagi Kejujuran</h4>
                        <p className={`text-sm ${colors.textMuted}`}>Pengalaman nyata dan tulus dari berbagai sudut pandang</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full ${colors.accentBg} flex items-center justify-center`}>
                        <Sparkles className={colors.accent} size={20} />
                      </div>
                      <div>
                        <h4 className={`font-semibold ${colors.heading} mb-1`}>Membangun Komunitas</h4>
                        <p className={`text-sm ${colors.textMuted}`}>Menciptakan ruang aman untuk berbagi dan belajar bersama</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full ${colors.accentBg} flex items-center justify-center`}>
                        <TrendingUp className={colors.accent} size={20} />
                      </div>
                      <div>
                        <h4 className={`font-semibold ${colors.heading} mb-1`}>Inspirasi Harian</h4>
                        <p className={`text-sm ${colors.textMuted}`}>Cerita-cerita yang memotivasi dan memberi pencerahan</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Right Side - Stats */}
                <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }} className="text-center md:text-left">
                  <div className={`${colors.cardBg} rounded-2xl p-6 border ${colors.border}`}>
                    <h4 className={`font-semibold ${colors.heading} mb-4 text-center`}>Kumpulan Cerita</h4>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className={`text-3xl font-bold ${colors.accent}`}>{posts.length}</div>
                        <p className={`text-sm ${colors.textMuted}`}>Total Tulisan</p>
                      </div>
                      <div>
                        <div className={`text-3xl font-bold ${colors.accent}`}>{featuredPost ? 1 : 0}</div>
                        <p className={`text-sm ${colors.textMuted}`}>Cerita Unggulan</p>
                      </div>
                      <div>
                        <div className={`text-3xl font-bold ${colors.accent}`}>{trendingPosts.length}</div>
                        <p className={`text-sm ${colors.textMuted}`}>Sedang Trending</p>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-[#c7b299]/20">
                      <p className={`text-sm ${colors.textMuted} text-center italic`}>
                        "Setiap kata yang ditulis adalah kontribusi bagi mereka yang masih mencari jalan."
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* CALL TO ACTION */}
          <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="text-center">
            <div className={`${colors.cardBg} rounded-2xl p-8 border ${colors.border}`}>
              <h3 className={`font-serif text-2xl md:text-3xl ${colors.heading} mb-4`}>Ceritamu Penting</h3>
              <p className={`${colors.textMuted} mb-6 max-w-2xl mx-auto`}>
                Setiap pengalaman yang kamu bagikan bisa menjadi penerang bagi orang lain yang sedang melalui jalan serupa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/tulis" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#8b7355] text-white rounded-full hover:bg-[#c7b299] transition-all text-sm font-medium">
                  <PenLine size={18} />
                  Tulis Cerita
                </Link>
                <Link href="/tentang" className="inline-flex items-center justify-center gap-3 px-8 py-4 border ${colors.border} rounded-full hover:${colors.accentBg} transition-all text-sm font-medium ${colors.text}">
                  Tentang Platform
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </motion.section>
        </div>

        {/* FINAL CTA */}
        <section className={`px-4 sm:px-6 py-24 border-t ${colors.border}`}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-serif text-3xl sm:text-4xl italic text-[#c7b299] mb-6">"Ceritamu adalah jejak yang membantu orang lain menemukan jalan mereka sendiri"</p>
            <Link href="/tulis" className="inline-flex items-center gap-3 px-10 py-5 bg-[#8b7355] text-white rounded-full hover:bg-[#c7b299] transition-all text-base font-medium shadow-xl shadow-[#8b7355]/20">
              <PenLine size={20} />
              Mulai Menulis
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
