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

// Memoized background component with deeper theme consistent with other pages
const Background = memo(({ isDark }: { isDark: boolean }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Deep gradient background */}
      {isDark ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f0e0c] via-[#1a1815] to-[#0d0c0a] opacity-100"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#c7b299]/10 via-transparent to-[#8b7355]/5"></div>
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-[#2c1810] via-[#3d2817] to-[#1a0e08] opacity-100"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#8b4513]/20 via-transparent to-[#d2691e]/10"></div>
        </>
      )}
      
      {/* Subtle illustrations */}
      <div className={`absolute top-20 left-10 w-24 h-32 ${isDark ? 'opacity-20' : 'opacity-30'} rotate-12`}>
        <div className={`w-full h-full ${isDark ? 'bg-gradient-to-br from-[#c7b299]/20 to-[#8b7355]/10' : 'bg-gradient-to-br from-[#8b4513]/30 to-[#654321]/20'} rounded-full blur-xl`}></div>
      </div>
      <div className={`absolute top-40 right-20 w-20 h-28 ${isDark ? 'opacity-15' : 'opacity-25'} -rotate-6`}>
        <div className={`w-full h-full ${isDark ? 'bg-gradient-to-tr from-[#8b7355]/15 to-[#c7b299]/8' : 'bg-gradient-to-tr from-[#a0522d]/25 to-[#8b4513]/15'} rounded-full blur-lg`}></div>
      </div>
      <div className={`absolute bottom-32 left-1/4 w-32 h-24 ${isDark ? 'opacity-10' : 'opacity-20'} rotate-45`}>
        <div className={`w-full h-full ${isDark ? 'bg-gradient-to-r from-[#8b7355]/10 to-[#c7b299]/5' : 'bg-gradient-to-r from-[#cd853f]/20 to-[#8b4513]/10'} rounded-full blur-2xl`}></div>
      </div>
      
      {/* Decorative circles */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 opacity-5">
        <div className={`w-full h-full border-2 ${isDark ? 'border-[#c7b299]/10' : 'border-[#8b4513]/20'} rounded-full animate-spin`} style={{ animationDuration: '60s' }}></div>
      </div>
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 opacity-5">
        <div className={`w-full h-full border ${isDark ? 'border-[#8b7355]/8' : 'border-[#a0522d]/15'} rounded-full animate-spin`} style={{ animationDuration: '45s', animationDirection: 'reverse' }}></div>
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

  // Memoized colors object with deeper theme consistent with other pages
  const colors = useMemo(() => ({
    bg: isDark ? "bg-gradient-to-br from-[#0f0e0c] via-[#1a1815] to-[#0d0c0a]" : "bg-gradient-to-br from-[#2c1810] via-[#3d2817] to-[#1a0e08]",
    text: isDark ? "text-[#e8e0d5]" : "text-[#d4a574]",
    textMuted: isDark ? "text-[#a8a298]" : "text-[#8b7355]",
    textSubtle: isDark ? "text-[#78716c]" : "text-[#6b5d54]",
    heading: isDark ? "text-[#faf0e6]" : "text-[#f4e4d4]",
    accent: isDark ? "#c7b299" : "#8b7355",
    accentSecondary: isDark ? "#8b7355" : "#c7b299",
    border: isDark ? "border-neutral-800/50" : "border-[#8b4513]/30",
    cardBg: isDark ? "bg-neutral-900/40 backdrop-blur-sm" : "bg-[#3d2817]/60 backdrop-blur-sm",
    featuredBg: isDark ? "bg-gradient-to-br from-[#c7b299]/20 via-neutral-900/80 to-[#0a0a0a]" : "bg-gradient-to-br from-[#8b4513]/30 via-[#3d2817]/80 to-[#2c1810]",
    accentBg: isDark ? "bg-neutral-900/80" : "bg-[#4a3426]/80",
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
    <div className={`min-h-screen ${colors.bg} ${colors.text} transition-colors duration-500`}>
      <Background isDark={isDark} />

      <div className="relative z-10 pt-16">
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

          {/* TENTANG SECTION - Improved Layout */}
          <motion.section initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className={`py-20 border-y ${colors.border}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              {/* Section Header */}
              <div className="text-center mb-12">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex items-center justify-center gap-3 mb-6">
                  <div className="h-px w-16 bg-[#d2691e]"></div>
                  <span className="text-[10px] tracking-[0.4em] uppercase text-[#d2691e] font-medium">Tentang Platform</span>
                  <div className="h-px w-16 bg-[#d2691e]"></div>
                </motion.div>
                <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className={`font-serif text-3xl md:text-4xl ${colors.heading} mb-4`}>
                  Ruang Berbagi Cerita
                </motion.h2>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className={`text-lg ${colors.textMuted} max-w-2xl mx-auto`}>
                  Platform ini lahir dari kebutuhan akan berbagi pengalaman kerja yang sebenarnya. 
                  Setiap cerita adalah jejak yang membantu orang lain menemukan jalan mereka sendiri.
                </motion.p>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-stretch">
                {/* Left Side - Main Content */}
                <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 }} className="lg:col-span-2">
                  <div className={`${colors.cardBg} rounded-2xl p-8 border ${colors.border} h-full`}>
                    <div className="flex items-center gap-4 mb-8">
                      <div className={`w-16 h-16 rounded-full ${colors.accent} p-1 flex items-center justify-center flex-shrink-0`}>
                        <BookOpen className="text-white" size={28} />
                      </div>
                      <div>
                        <h3 className={`font-serif text-2xl ${colors.heading} mb-1`}>Mengapa Tulisan Penting?</h3>
                        <p className={`text-sm ${colors.textMuted}`}>Setiap kata memiliki kekuatan untuk mengubah</p>
                      </div>
                    </div>
                    
                    {/* Key Features - Better Layout */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex gap-4">
                        <div className={`w-14 h-14 rounded-full ${colors.accentBg} flex items-center justify-center flex-shrink-0`}>
                          <Heart className={colors.accent} size={24} />
                        </div>
                        <div>
                          <h4 className={`font-semibold ${colors.heading} mb-2 text-lg`}>Berbagi Kejujuran</h4>
                          <p className={`text-sm ${colors.textMuted} leading-relaxed`}>Pengalaman nyata dan tulus dari berbagai sudut pandang tanpa filter</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className={`w-14 h-14 rounded-full ${colors.accentBg} flex items-center justify-center flex-shrink-0`}>
                          <Sparkles className={colors.accent} size={24} />
                        </div>
                        <div>
                          <h4 className={`font-semibold ${colors.heading} mb-2 text-lg`}>Membangun Komunitas</h4>
                          <p className={`text-sm ${colors.textMuted} leading-relaxed`}>Menciptakan ruang aman untuk berbagi dan belajar bersama</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className={`w-14 h-14 rounded-full ${colors.accentBg} flex items-center justify-center flex-shrink-0`}>
                          <TrendingUp className={colors.accent} size={24} />
                        </div>
                        <div>
                          <h4 className={`font-semibold ${colors.heading} mb-2 text-lg`}>Inspirasi Harian</h4>
                          <p className={`text-sm ${colors.textMuted} leading-relaxed`}>Cerita-cerita yang memotivasi dan memberi pencerahan</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className={`w-14 h-14 rounded-full ${colors.accentBg} flex items-center justify-center flex-shrink-0`}>
                          <BookOpen className={colors.accent} size={24} />
                        </div>
                        <div>
                          <h4 className={`font-semibold ${colors.heading} mb-2 text-lg`}>Jejak Digital</h4>
                          <p className={`text-sm ${colors.textMuted} leading-relaxed`}>Meninggalkan warisan yang bisa membantu generasi berikutnya</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Right Side - Stats - Better Proportions */}
                <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }} className="lg:col-span-1">
                  <div className={`${colors.cardBg} rounded-2xl p-8 border ${colors.border} h-full flex flex-col`}>
                    <h4 className={`font-semibold ${colors.heading} mb-6 text-center text-xl`}>Statistik Cerita</h4>
                    
                    {/* Main Stats */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <div className="text-center">
                        <div className={`text-4xl font-bold ${colors.accent} mb-2`}>{posts.length}</div>
                        <p className={`text-sm ${colors.textMuted}`}>Total Tulisan</p>
                      </div>
                      <div className="text-center">
                        <div className={`text-4xl font-bold ${colors.accent} mb-2`}>{featuredPost ? 1 : 0}</div>
                        <p className={`text-sm ${colors.textMuted}`}>Cerita Unggulan</p>
                      </div>
                      <div className="text-center">
                        <div className={`text-4xl font-bold ${colors.accent} mb-2`}>{trendingPosts.length}</div>
                        <p className={`text-sm ${colors.textMuted}`}>Sedang Trending</p>
                      </div>
                      <div className="text-center">
                        <div className={`text-4xl font-bold ${colors.accent} mb-2`}>{CATEGORIES.length}</div>
                        <p className={`text-sm ${colors.textMuted}`}>Kategori</p>
                      </div>
                    </div>
                    
                    {/* Quote Section */}
                    <div className="mt-auto pt-6 border-t border-[#d2691e]/20">
                      <p className={`text-sm ${colors.textMuted} text-center italic leading-relaxed`}>
                        "Setiap kata yang ditulis adalah kontribusi bagi mereka yang masih mencari jalan."
                      </p>
                      <div className="flex justify-center mt-4">
                        <Link href="/tulis" className="inline-flex items-center gap-2 px-6 py-3 bg-[#d2691e] text-white rounded-full hover:bg-[#cd853f] transition-all text-sm font-medium">
                          <PenLine size={16} />
                          Mulai Menulis
                        </Link>
                      </div>
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
            <p className="text-2xl sm:text-3xl md:text-4xl font-light italic text-[#c7b299] mb-6 leading-relaxed tracking-wide">"Ceritamu adalah jejak yang membantu orang lain menemukan jalan mereka sendiri"</p>
            <Link href="/tulis" className="inline-flex items-center gap-3 px-10 py-5 bg-[#8b7355] text-white rounded-full hover:bg-[#c7b299] transition-all text-base font-medium shadow-xl shadow-[#8b7355]/20">
              <PenLine size={20} />
              Mulai Menulis
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
