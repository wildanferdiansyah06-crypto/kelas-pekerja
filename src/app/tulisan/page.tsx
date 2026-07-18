"use client";

import postsData from "@/public/data/posts.json";
import { motion } from "framer-motion";
import Link from "next/link";
import { PenLine, Clock, ArrowRight, Sparkles, TrendingUp, ChevronRight, Heart, BookOpen } from "lucide-react";
import { useState, useMemo, useCallback, memo } from "react";

// Memoized animation variants to prevent recreation
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const CATEGORIES = ["Semua", "Ruang Bagi", "Barista & FnB", "Retail", "Office & Korporat", "Gig Economy", "Startup", "Kreatif"];

// Memoized post card component
const PostCard = memo(({
  post,
  index,
}: {
  post: any;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: Math.min(index * 0.05, 0.3) }}
    whileHover={{ y: -4 }}
    className="glass-card rounded-2xl overflow-hidden group"
  >
    <Link href={`/tulisan/${post.slug}`}>
      <div className="p-7">
        <div className="flex items-center justify-between mb-5">
          <span
            className="text-[10px] tracking-[0.2em] uppercase font-ui font-semibold px-2.5 py-1 rounded-full border"
            style={{
              color: 'var(--kp-accent)',
              borderColor: 'rgba(212, 165, 116, 0.2)',
              background: 'rgba(212, 165, 116, 0.05)',
            }}
          >
            {post.category}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-ui" style={{ color: 'var(--kp-text-muted)' }}>
            <Heart size={12} style={{ color: 'var(--kp-accent)' }} />
            {post.likes || 0}
          </span>
        </div>

        <h3 className="font-display text-xl mb-3 group-hover:text-glow transition-all duration-300 leading-tight" style={{ color: 'var(--kp-text-primary)' }}>
          {post.title}
        </h3>

        <p className="font-body text-sm leading-relaxed mb-5 line-clamp-3" style={{ color: 'var(--kp-text-muted)' }}>
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--kp-border-medium)' }}>
          <div className="flex items-center gap-2 text-xs font-ui" style={{ color: 'var(--kp-text-muted)' }}>
            <Clock size={12} style={{ color: 'var(--kp-accent)' }} />
            {post.readTime}
          </div>
          <div className="flex items-center gap-1 text-xs font-ui font-medium group-hover:text-[var(--kp-accent)] transition-colors" style={{ color: 'var(--kp-text-muted)' }}>
            <span>Baca</span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
));

PostCard.displayName = "PostCard";

// Memoized trending post component
const TrendingPostCard = memo(({ post }: { post: any }) => (
  <Link
    href={`/tulisan/${post.slug}`}
    className="flex-shrink-0 w-72 p-5 rounded-xl glass-card group"
  >
    <div className="flex items-center justify-between mb-3">
      <span
        className="text-[10px] tracking-[0.2em] uppercase font-ui font-semibold"
        style={{ color: 'var(--kp-accent)' }}
      >
        {post.category}
      </span>
      <span className="flex items-center gap-1 text-xs font-ui" style={{ color: 'var(--kp-text-muted)' }}>
        <Heart size={12} style={{ color: 'var(--kp-accent)' }} />
        {post.likes}
      </span>
    </div>
    <h3 className="font-display text-lg group-hover:text-glow transition-all duration-300 line-clamp-2 mb-3" style={{ color: 'var(--kp-text-primary)' }}>
      {post.title}
    </h3>
    <div className="flex items-center gap-2 text-xs font-ui" style={{ color: 'var(--kp-text-muted)' }}>
      <Clock size={12} />
      {post.readTime}
      <ChevronRight size={12} className="ml-auto group-hover:translate-x-1 transition-transform" style={{ color: 'var(--kp-accent)' }} />
    </div>
  </Link>
));

TrendingPostCard.displayName = "TrendingPostCard";

export default function TulisanPage() {
  const posts = useMemo(() => (postsData as any).posts || [], []);
  const [activeCategory, setActiveCategory] = useState("Semua");

  // Memoized computed values
  const { featuredPost, trendingPosts, filteredPosts, showFeatured } = useMemo(() => {
    const featured = posts.find((p: any) => p.isFeatured);
    const regular = posts.filter((p: any) => !p.isFeatured);
    const trending = [...posts]
      .filter((p: any) => !p.isFeatured)
      .sort((a: any, b: any) => (b.likes || 0) - (a.likes || 0))
      .slice(0, 4);
    const show = activeCategory === "Semua" || activeCategory === "Ruang Bagi";

    const filtered = activeCategory === "Semua"
      ? regular
      : regular.filter((post: any) => post.category === activeCategory);

    return {
      featuredPost: featured,
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
    <div style={{ backgroundColor: 'var(--kp-bg-base)', color: 'var(--kp-text-primary)' }}>
      <div className="pt-16">

        {/* ═══════════════════════════════
            HERO
        ═══════════════════════════════ */}
        <motion.header variants={stagger} initial="hidden" animate="show" className="pt-24 pb-12 px-6 relative overflow-hidden">
          {/* Background ambient */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(212,165,116,0.05),transparent_70%)] pointer-events-none" />

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--kp-accent)] opacity-50" />
              <span className="text-[10px] tracking-[0.4em] uppercase font-ui font-medium" style={{ color: 'var(--kp-accent)' }}>
                Arsip Pikiran
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--kp-accent)] opacity-50" />
            </motion.div>

            <motion.h1 variants={fadeUp} className="typography-h1 mb-6">
              <span className="block text-xl sm:text-2xl mb-3 italic font-light" style={{ color: 'var(--kp-accent)' }}>
                ruang bagi
              </span>
              <span style={{ color: 'var(--kp-text-primary)' }}>Tulisan</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="font-body text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-8" style={{ color: 'var(--kp-text-secondary)' }}>
              Di antara deru waktu yang tak pernah berhenti, ada saat-saat ketika kata-kata menjadi satu-satunya tempat perlindungan.
            </motion.p>

            <motion.div variants={fadeUp}>
              <Link
                href="/tulis"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-ui font-semibold transition-all duration-400"
                style={{
                  background: 'linear-gradient(135deg, var(--kp-accent), #b8834e)',
                  color: '#0a0908',
                  boxShadow: '0 0 20px rgba(212, 165, 116, 0.2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 40px rgba(212, 165, 116, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(212, 165, 116, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <PenLine size={18} />
                Tulis Ceritamu
              </Link>
            </motion.div>
          </div>
        </motion.header>

        {/* ═══════════════════════════════
            TRENDING STRIP
        ═══════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="py-8 overflow-hidden border-y"
          style={{ borderColor: 'var(--kp-border)', backgroundColor: 'var(--kp-bg-surface)' }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-5">
              <TrendingUp size={16} style={{ color: 'var(--kp-accent)' }} />
              <span className="text-xs tracking-[0.2em] uppercase font-ui font-medium" style={{ color: 'var(--kp-accent)' }}>
                Sedang Dibaca
              </span>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
              {trendingPosts.map((post: any) => (
                <TrendingPostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </motion.section>

        <div className="max-w-6xl mx-auto px-6 py-12">

          {/* ═══════════════════════════════
              FILTER
          ═══════════════════════════════ */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-12">
            <div className="flex items-center justify-center gap-2 mb-5">
              <Sparkles size={14} style={{ color: 'var(--kp-accent)' }} />
              <span className="text-xs tracking-[0.2em] uppercase font-ui" style={{ color: 'var(--kp-text-muted)' }}>
                Filter Kategori
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className="px-4 py-2 text-xs tracking-wider rounded-full border font-ui transition-all duration-300"
                  style={{
                    backgroundColor: activeCategory === cat ? 'var(--kp-accent)' : 'transparent',
                    color: activeCategory === cat ? '#0a0908' : 'var(--kp-text-muted)',
                    borderColor: activeCategory === cat ? 'var(--kp-accent)' : 'rgba(212, 165, 116, 0.15)',
                    fontWeight: activeCategory === cat ? 600 : 400,
                  }}
                  onMouseEnter={(e) => {
                    if (activeCategory !== cat) {
                      e.currentTarget.style.borderColor = 'rgba(212, 165, 116, 0.4)';
                      e.currentTarget.style.color = 'var(--kp-text-primary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeCategory !== cat) {
                      e.currentTarget.style.borderColor = 'rgba(212, 165, 116, 0.15)';
                      e.currentTarget.style.color = 'var(--kp-text-muted)';
                    }
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* ═══════════════════════════════
              FEATURED POST
          ═══════════════════════════════ */}
          {showFeatured && featuredPost && (
            <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-16">
              <div className="relative overflow-hidden rounded-[2rem] glass-card p-8 sm:p-12">
                {/* Ambient glow */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(212,165,116,0.08),transparent_60%)] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="relative z-10 max-w-3xl">
                  <div className="flex items-center gap-2 mb-6">
                    <Sparkles size={16} style={{ color: 'var(--kp-accent)' }} className="animate-pulse" />
                    <span className="text-[10px] tracking-[0.3em] uppercase font-ui font-medium" style={{ color: 'var(--kp-accent)' }}>
                      Pembuka Ruang
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span
                      className="px-3 py-1 text-xs rounded-full font-ui font-semibold"
                      style={{
                        background: 'linear-gradient(135deg, var(--kp-accent), #b8834e)',
                        color: '#0a0908',
                      }}
                    >
                      {featuredPost.category}
                    </span>
                    <span
                      className="px-3 py-1 text-xs rounded-full border font-ui"
                      style={{ borderColor: 'rgba(212, 165, 116, 0.2)', color: 'var(--kp-text-muted)' }}
                    >
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <p className="font-display text-lg sm:text-xl italic leading-relaxed mb-4 pl-4 border-l-2" style={{ color: 'var(--kp-accent)', borderColor: 'rgba(212, 165, 116, 0.3)' }}>
                    &ldquo;{featuredPost.opening || featuredPost.hook}&rdquo;
                  </p>

                  <h2 className="font-display text-3xl sm:text-4xl tablet:text-5xl mb-6 leading-tight text-glow" style={{ color: 'var(--kp-text-primary)' }}>
                    {featuredPost.title}
                  </h2>

                  <p className="font-body text-lg leading-relaxed mb-8 max-w-2xl" style={{ color: 'var(--kp-text-secondary)' }}>
                    {featuredPost.excerpt}
                  </p>

                  <Link
                    href={`/tulisan/${featuredPost.slug}`}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-ui font-semibold transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, var(--kp-accent), #b8834e)',
                      color: '#0a0908',
                      boxShadow: '0 0 20px rgba(212, 165, 116, 0.15)',
                    }}
                  >
                    Baca Pembukaan
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </motion.section>
          )}

          {/* ═══════════════════════════════
              POSTS GRID
          ═══════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid tablet:grid-cols-2 laptop:grid-cols-3 gap-6 mb-16"
          >
            {filteredPosts.slice(0, 12).map((post: any, index: number) => (
              <PostCard key={post.slug} post={post} index={index} />
            ))}
          </motion.div>

          {/* Load More Button */}
          {filteredPosts.length > 12 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-center mb-16">
              <button
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-ui font-medium glass transition-all duration-300"
                style={{ color: 'var(--kp-text-primary)', border: '1px solid rgba(212, 165, 116, 0.2)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(212, 165, 116, 0.5)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(212, 165, 116, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(212, 165, 116, 0.2)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <ArrowRight size={18} />
                Muat Lebih Banyak
              </button>
            </motion.div>
          )}

          {/* ═══════════════════════════════
              TENTANG SECTION
          ═══════════════════════════════ */}
          <motion.section initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="py-20 border-y" style={{ borderColor: 'var(--kp-border)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              {/* Section Header */}
              <div className="text-center mb-12">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex items-center justify-center gap-3 mb-6">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--kp-accent)] opacity-50" />
                  <span className="text-[10px] tracking-[0.4em] uppercase font-ui font-medium" style={{ color: 'var(--kp-accent)' }}>
                    Tentang Platform
                  </span>
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--kp-accent)] opacity-50" />
                </motion.div>
                <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="typography-h2 mb-4" style={{ color: 'var(--kp-text-primary)' }}>
                  Ruang Berbagi Cerita
                </motion.h2>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="font-body text-lg max-w-2xl mx-auto" style={{ color: 'var(--kp-text-secondary)' }}>
                  Platform ini lahir dari kebutuhan akan berbagi pengalaman kerja yang sebenarnya.
                  Setiap cerita adalah jejak yang membantu orang lain menemukan jalan mereka sendiri.
                </motion.p>
              </div>

              <div className="grid laptop:grid-cols-3 gap-8 tablet:gap-12 items-stretch">
                {/* Left Side - Main Content */}
                <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 }} className="laptop:col-span-2">
                  <div className="glass-card rounded-2xl p-8 h-full">
                    <div className="flex items-center gap-4 mb-8">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(212, 165, 116, 0.1)', border: '1px solid rgba(212, 165, 116, 0.2)' }}
                      >
                        <BookOpen size={24} style={{ color: 'var(--kp-accent)' }} />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl" style={{ color: 'var(--kp-text-primary)' }}>Mengapa Tulisan Penting?</h3>
                        <p className="text-sm font-body" style={{ color: 'var(--kp-text-muted)' }}>Setiap kata memiliki kekuatan untuk mengubah</p>
                      </div>
                    </div>

                    {/* Key Features */}
                    <div className="grid tablet:grid-cols-2 gap-6">
                      {[
                        { icon: <Heart size={20} />, title: 'Berbagi Kejujuran', desc: 'Pengalaman nyata dan tulus dari berbagai sudut pandang tanpa filter' },
                        { icon: <Sparkles size={20} />, title: 'Membangun Komunitas', desc: 'Menciptakan ruang aman untuk berbagi dan belajar bersama' },
                        { icon: <TrendingUp size={20} />, title: 'Inspirasi Harian', desc: 'Cerita-cerita yang memotivasi dan memberi pencerahan' },
                        { icon: <BookOpen size={20} />, title: 'Jejak Digital', desc: 'Meninggalkan warisan yang bisa membantu generasi berikutnya' },
                      ].map((item) => (
                        <div key={item.title} className="flex gap-4">
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: 'rgba(212, 165, 116, 0.08)', color: 'var(--kp-accent)' }}
                          >
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="font-ui font-semibold mb-1 text-base" style={{ color: 'var(--kp-text-primary)' }}>{item.title}</h4>
                            <p className="text-sm font-body leading-relaxed" style={{ color: 'var(--kp-text-muted)' }}>{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Right Side - Stats */}
                <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }} className="laptop:col-span-1">
                  <div className="glass-card rounded-2xl p-8 h-full flex flex-col">
                    <h4 className="font-display text-xl text-center mb-6" style={{ color: 'var(--kp-text-primary)' }}>Statistik Cerita</h4>

                    {/* Main Stats */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      {[
                        { value: posts.length, label: 'Total Tulisan' },
                        { value: featuredPost ? 1 : 0, label: 'Cerita Unggulan' },
                        { value: trendingPosts.length, label: 'Sedang Trending' },
                        { value: CATEGORIES.length, label: 'Kategori' },
                      ].map((stat) => (
                        <div key={stat.label} className="text-center">
                          <div className="text-3xl font-display font-bold text-glow mb-1" style={{ color: 'var(--kp-accent)' }}>{stat.value}</div>
                          <p className="text-xs font-ui" style={{ color: 'var(--kp-text-muted)' }}>{stat.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Quote Section */}
                    <div className="mt-auto pt-6 border-t" style={{ borderColor: 'rgba(212, 165, 116, 0.1)' }}>
                      <p className="text-sm font-display italic text-center leading-relaxed mb-4" style={{ color: 'var(--kp-text-muted)' }}>
                        &ldquo;Setiap kata yang ditulis adalah kontribusi bagi mereka yang masih mencari jalan.&rdquo;
                      </p>
                      <div className="flex justify-center">
                        <Link
                          href="/tulis"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-ui font-semibold transition-all duration-300"
                          style={{
                            background: 'linear-gradient(135deg, var(--kp-accent), #b8834e)',
                            color: '#0a0908',
                          }}
                        >
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

          {/* ═══════════════════════════════
              CALL TO ACTION
          ═══════════════════════════════ */}
          <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="text-center">
            <div className="glass-card rounded-2xl p-10">
              <h3 className="font-display text-2xl tablet:text-3xl mb-4" style={{ color: 'var(--kp-text-primary)' }}>Ceritamu Penting</h3>
              <p className="font-body text-base mb-8 max-w-2xl mx-auto" style={{ color: 'var(--kp-text-secondary)' }}>
                Setiap pengalaman yang kamu bagikan bisa menjadi penerang bagi orang lain yang sedang melalui jalan serupa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/tulis"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm font-ui font-semibold transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, var(--kp-accent), #b8834e)',
                    color: '#0a0908',
                    boxShadow: '0 0 20px rgba(212, 165, 116, 0.15)',
                  }}
                >
                  <PenLine size={18} />
                  Tulis Cerita
                </Link>
                <Link
                  href="/tentang"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm font-ui font-medium glass transition-all duration-300"
                  style={{ color: 'var(--kp-text-primary)', border: '1px solid rgba(212, 165, 116, 0.2)' }}
                >
                  Tentang Platform
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </motion.section>
        </div>

        {/* ═══════════════════════════════
            FINAL CTA
        ═══════════════════════════════ */}
        <section className="px-6 py-24 border-t relative overflow-hidden" style={{ borderColor: 'var(--kp-border)' }}>
          {/* Ambient background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[rgba(212,165,116,0.03)] rounded-full blur-[80px] pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <div className="relative mb-8">
              <span className="absolute -top-6 -left-4 text-7xl tablet:text-8xl font-display pointer-events-none select-none" style={{ color: 'rgba(212, 165, 116, 0.08)' }}>&ldquo;</span>
              <p className="font-display text-2xl sm:text-3xl tablet:text-4xl italic leading-relaxed mb-8 text-glow" style={{ color: 'var(--kp-text-primary)' }}>
                Ceritamu adalah jejak yang membantu orang lain menemukan jalan mereka sendiri
              </p>
              <span className="absolute -bottom-8 -right-4 text-7xl tablet:text-8xl font-display pointer-events-none select-none" style={{ color: 'rgba(212, 165, 116, 0.08)' }}>&rdquo;</span>
            </div>
            <Link
              href="/tulis"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-ui font-semibold transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, var(--kp-accent), #b8834e)',
                color: '#0a0908',
                boxShadow: '0 0 30px rgba(212, 165, 116, 0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 50px rgba(212, 165, 116, 0.4)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 30px rgba(212, 165, 116, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <PenLine size={20} />
              Mulai Menulis
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
