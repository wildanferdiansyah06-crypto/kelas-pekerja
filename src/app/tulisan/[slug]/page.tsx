"use client";

import postsData from "@/public/data/posts.json";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useTheme } from "@/src/components/ThemeProvider";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useBookmarks } from "@/src/hooks/useBookmarks";
import { useLikes } from "@/src/hooks/useLikes";
import { 
  PenLine, 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  Heart,
  Share2,
  Bookmark,
  ChevronRight,
  Zap,
  TrendingUp,
  Check,
  Link2,
  Twitter,
  Facebook,
  Linkedin,
  X
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export default function TulisanDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();
  const { theme } = useTheme();
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const [showNextModal, setShowNextModal] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { isLiked, toggleLike } = useLikes();
  
  const { scrollYProgress } = useScroll();

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
    cardBg: isDark ? "bg-neutral-900/90" : "bg-white/90",
    quoteBg: isDark ? "bg-[#8b7355]/10" : "bg-[#8b7355]/5",
    grainOpacity: isDark ? "opacity-[0.03]" : "opacity-[0.02]",
    stickyBg: isDark ? "bg-[#0a0a0a]/95" : "bg-[#fafafa]/95",
    highlight: isDark ? "bg-[#8b7355]/20" : "bg-[#8b7355]/10",
  };

  const posts = (postsData as any).posts || [];
  const postIndex = posts.findIndex((p: any) => p.slug === slug);
  const post = posts[postIndex];

  const nextPost = posts[postIndex + 1] || posts[0];

  const sameCategory = posts.filter((p: any) => 
    p.category === post?.category && p.slug !== slug
  ).slice(0, 3);
  
  const trending = posts
    .filter((p: any) => p.slug !== slug && !sameCategory.find((s: any) => s.slug === p.slug))
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  // Set like count from post data
  useEffect(() => {
    if (post) {
      setLikeCount(post.likes || 0);
    }
  }, [post]);

  // Scroll tracking
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const progress = Math.round(latest * 100);
    setReadProgress(progress);
    setShowStickyCta(latest > 0.15 && latest < 0.85);
    
    if (latest > 0.9 && !showNextModal) {
      setShowNextModal(true);
    }
  });

  // Like handler
  const handleLike = useCallback(() => {
    if (!post) return;
    
    toggleLike({
      id: post._id || slug,
      type: 'post',
      title: post.title,
      slug: post.slug
    });
    
    setLikeCount(prev => isLiked(post._id || slug) ? prev - 1 : prev + 1);
  }, [post, slug, isLiked, toggleLike]);

  // Bookmark handler
  const handleBookmark = useCallback(() => {
    if (!post) return;
    
    toggleBookmark({
      id: post._id || slug,
      type: 'post',
      title: post.title,
      slug: post.slug
    });
  }, [post, slug, toggleBookmark]);

  // Share handlers
  const handleNativeShare = useCallback(async () => {
    const shareData = {
      title: post?.title,
      text: post?.hook,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      } catch {
        console.log('Share cancelled');
      }
    } else {
      setShowShareMenu(true);
    }
  }, [post]);

  const copyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setShareSuccess(true);
    setShowShareMenu(false);
    setTimeout(() => setShareSuccess(false), 2000);
  }, []);

  const shareToTwitter = useCallback(() => {
    const text = encodeURIComponent(`${post?.title} — ${post?.hook}`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    setShowShareMenu(false);
  }, [post]);

  const shareToFacebook = useCallback(() => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    setShowShareMenu(false);
  }, []);

  const shareToLinkedIn = useCallback(() => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    setShowShareMenu(false);
  }, [post]);

  if (!post) {
    return (
      <main className={`${colors.bg} ${colors.text} flex items-center justify-center`}>
        <div className="text-center">
          <p className="font-serif text-2xl italic mb-4">Tulisan tidak ditemukan</p>
          <Link href="/tulisan" className="text-[#8b7355] hover:text-[#c7b299]">Kembali</Link>
        </div>
      </main>
    );
  }

  return (
    <main className={`${colors.bg} ${colors.text} transition-colors duration-500`}>
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#8b7355] z-[60] origin-left" style={{ scaleX: scrollYProgress }} />
      
      {/* Reading Progress % */}
      <div className={`fixed top-4 right-4 z-[60] px-3 py-1 rounded-full text-xs font-medium
        ${colors.cardBg} backdrop-blur border ${colors.border} hidden sm:block`}>
        {readProgress}%
      </div>

      {/* Grain */}
      <div className={`fixed inset-0 ${colors.grainOpacity} pointer-events-none z-0`} style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />

      {/* Share Success Toast */}
      {shareSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[70] px-6 py-3 bg-[#8b7355] text-white rounded-full text-sm font-medium shadow-lg"
        >
          <span className="flex items-center gap-2">
            <Check size={16} />
            Link disalin!
          </span>
        </motion.div>
      )}

      {/* Share Menu Modal */}
      {showShareMenu && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowShareMenu(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`${colors.cardBg} rounded-2xl p-6 max-w-sm w-full border ${colors.border}`}
            onClick={e => e.stopPropagation()}
          >
            <h3 className={`font-serif text-xl mb-6 ${colors.heading}`}>Bagikan Cerita</h3>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={shareToTwitter} className="flex items-center gap-3 p-4 rounded-xl border border-neutral-700/30 hover:border-[#8b7355] hover:bg-[#8b7355]/5 transition-all">
                <Twitter size={20} className="text-sky-500" />
                <span className="text-sm">Twitter</span>
              </button>
              <button onClick={shareToFacebook} className="flex items-center gap-3 p-4 rounded-xl border border-neutral-700/30 hover:border-[#8b7355] hover:bg-[#8b7355]/5 transition-all">
                <Facebook size={20} className="text-blue-600" />
                <span className="text-sm">Facebook</span>
              </button>
              <button onClick={shareToLinkedIn} className="flex items-center gap-3 p-4 rounded-xl border border-neutral-700/30 hover:border-[#8b7355] hover:bg-[#8b7355]/5 transition-all">
                <Linkedin size={20} className="text-blue-700" />
                <span className="text-sm">LinkedIn</span>
              </button>
              <button onClick={copyLink} className="flex items-center gap-3 p-4 rounded-xl border border-neutral-700/30 hover:border-[#8b7355] hover:bg-[#8b7355]/5 transition-all">
                <Link2 size={20} className="text-[#8b7355]" />
                <span className="text-sm">Copy Link</span>
              </button>
            </div>
            <button 
              onClick={() => setShowShareMenu(false)}
              className={`w-full mt-4 py-3 text-sm ${colors.textMuted} hover:text-[#8b7355] transition-colors`}
            >
              Tutup
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Sticky Bottom CTA */}
      <motion.div 
        initial={false}
        animate={{ y: showStickyCta ? 0 : 100 }}
        className={`fixed bottom-0 left-0 right-0 z-50 px-4 py-3 
          ${colors.stickyBg} backdrop-blur-xl border-t ${colors.border}`}
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => router.push(`/tulisan/${nextPost.slug}`)}
            className="flex items-center gap-2 text-sm text-[#8b7355] hover:text-[#c7b299] text-left"
          >
            <span className="line-clamp-1 max-w-[150px] sm:max-w-xs">{nextPost.title}</span>
            <ArrowRight size={16} />
          </button>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-all
                ${isLiked(post?._id || slug) ? 'bg-red-500/10 text-red-500' : 'hover:bg-neutral-800/10'}`}
            >
              <Heart size={16} fill={isLiked(post?._id || slug) ? "currentColor" : "none"} />
              <span className="hidden sm:inline">{likeCount}</span>
            </button>
            <Link 
              href="/tulis" 
              className="flex items-center gap-2 px-4 py-2 bg-[#8b7355] text-white rounded-full text-sm font-medium hover:bg-[#c7b299] transition-colors"
            >
              <PenLine size={14} />
              <span className="hidden sm:inline">Tulis</span>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Next Article Modal */}
      {showNextModal && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
        >
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`${colors.cardBg} rounded-3xl p-6 max-w-lg w-full border ${colors.border} shadow-2xl`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs tracking-widest uppercase text-[#8b7355]">Selesai Membaca</span>
                <h3 className={`font-serif text-xl mt-1 ${colors.heading}`}>Lanjut ke cerita berikutnya?</h3>
              </div>
              <button 
                onClick={() => setShowNextModal(false)}
                className={`p-2 rounded-full hover:bg-neutral-800/10 ${colors.textSubtle}`}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className={`p-4 rounded-xl ${colors.highlight} border border-[#8b7355]/20 mb-6`}>
              <p className="text-sm text-[#8b7355] mb-2">Rekomendasi:</p>
              <h4 className={`font-serif text-lg ${colors.heading} mb-1`}>{nextPost.title}</h4>
              <p className={`text-sm ${colors.textMuted} line-clamp-2`}>{nextPost.hook}</p>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => router.push(`/tulisan/${nextPost.slug}`)}
                className="flex-1 py-3 bg-[#8b7355] text-white rounded-xl font-medium hover:bg-[#c7b299] transition-colors"
              >
                Baca Sekarang
              </button>
              <Link 
                href="/tulis"
                className={`flex-1 py-3 border ${colors.border} rounded-xl text-center font-medium hover:border-[#8b7355] hover:text-[#8b7355] transition-colors`}
              >
                Tulis Cerita
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}

      <div className="relative z-10 pb-24">
        {/* Sticky Header */}
        <motion.nav className={`fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 py-3 
          ${colors.stickyBg} backdrop-blur-xl border-b ${colors.border}`}>
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <Link href="/tulisan" className="flex items-center gap-2 text-sm text-[#8b7355] hover:text-[#c7b299]">
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Arsip</span>
            </Link>
            
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2 py-1 bg-[#8b7355]/10 text-[#8b7355] rounded-full">
                {post.category}
              </span>
              <span className={colors.textSubtle}>{post.readTime}</span>
            </div>

            <div className="flex items-center gap-1">
              <button 
                onClick={handleBookmark}
                className={`p-2 rounded-full transition-colors ${isBookmarked(post?._id || slug) ? 'text-[#8b7355]' : colors.textSubtle} hover:bg-neutral-800/10`}
              >
                <Bookmark size={16} fill={isBookmarked(post?._id || slug) ? "currentColor" : "none"} />
              </button>
              <button 
                onClick={handleNativeShare}
                className={`p-2 rounded-full hover:bg-neutral-800/10 ${colors.textSubtle}`}
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </motion.nav>

        {/* HERO */}
        <header className="pt-24 sm:pt-28 pb-8 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <motion.div variants={stagger} initial="hidden" animate="show">
              
              {/* Meta Pills */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2 mb-6">
                <span className="px-3 py-1.5 bg-[#8b7355] text-white text-xs font-medium rounded-full">
                  {post.category}
                </span>
                <span className={`px-3 py-1.5 ${colors.highlight} text-[#8b7355] text-xs rounded-full border border-[#8b7355]/20`}>
                  {post.duration}
                </span>
                <span className={`flex items-center gap-1 px-3 py-1.5 ${colors.cardBg} border ${colors.border} text-xs rounded-full ${colors.textMuted}`}>
                  <Clock size={12} />
                  {post.readTime}
                </span>
                <span className={`flex items-center gap-1 px-3 py-1.5 ${colors.cardBg} border ${colors.border} text-xs rounded-full ${colors.textMuted}`}>
                  <Heart size={12} />
                  {likeCount} suka
                </span>
              </motion.div>

              {/* Killer Opening */}
              <motion.div variants={fadeUp} className="mb-8 relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[#8b7355] to-transparent rounded-full"></div>
                <p className="text-xl sm:text-2xl leading-relaxed text-[#c7b299] font-serif italic pl-4">
                  "{post.opening}"
                </p>
              </motion.div>

              {/* Title */}
              <motion.h1 variants={fadeUp} className={`font-serif text-3xl sm:text-4xl md:text-5xl ${colors.heading} leading-[1.1] mb-6 tracking-tight`}>
                {post.title}
              </motion.h1>

              {/* Hook */}
              <motion.p variants={fadeUp} className={`text-lg sm:text-xl ${colors.textMuted} leading-relaxed mb-8`}>
                {post.hook}
              </motion.p>

              {/* Author */}
              <motion.div variants={fadeUp} className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${isDark ? 'bg-neutral-800' : 'bg-neutral-200'} flex items-center justify-center text-xl`}>
                  {post.category.includes("Barista") ? "☕" : 
                   post.category.includes("Retail") ? "🛍️" : 
                   post.category.includes("Office") ? "💼" : 
                   post.category.includes("Gig") ? "🛵" :
                   post.category.includes("Startup") ? "🚀" :
                   post.category.includes("Kreatif") ? "🎨" : "✍️"}
                </div>
                <div>
                  <p className={`font-medium ${colors.heading}`}>{post.role}</p>
                  <p className={`text-sm ${colors.textSubtle}`}>{post.workplace} • {post.date}</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </header>

        {/* CONTENT */}
        <article className="px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-8 sm:space-y-10">
              {post.content?.map((block: any, index: number) => {
                if (block.type === "paragraph") {
                  return (
                    <motion.p key={index} variants={fadeUp} className={`text-lg sm:text-[1.125rem] ${colors.text} leading-[1.9] tracking-[-0.01em]`}>
                      {block.text}
                    </motion.p>
                  );
                }
                if (block.type === "quote") {
                  return (
                    <motion.blockquote key={index} variants={fadeUp} className="relative my-12 sm:my-16 py-8">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 text-6xl text-[#8b7355]/10 font-serif">"</div>
                      <p className="relative font-serif text-2xl sm:text-3xl italic text-[#c7b299] leading-[1.4] text-center px-4">
                        {block.text}
                      </p>
                    </motion.blockquote>
                  );
                }
                return null;
              })}
            </motion.div>

            {/* Reactions */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center justify-center gap-4 my-16 py-8 border-y border-dashed border-[#8b7355]/20">
              <span className={`text-sm ${colors.textSubtle}`}>Cerita ini bermanfaat?</span>
              <div className="flex gap-2">
                <button 
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all
                    ${isLiked(post?._id || slug) ? 'border-red-500/50 bg-red-500/10 text-red-500' : 'border-[#8b7355]/30 text-[#8b7355] hover:bg-[#8b7355]/10'}`}
                >
                  <Heart size={16} fill={isLiked(post?._id || slug) ? "currentColor" : "none"} />
                  <span>{isLiked(post?._id || slug) ? 'Tersimpan' : 'Suka'}</span>
                </button>
                <button 
                  onClick={handleNativeShare}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#8b7355]/30 text-[#8b7355] hover:bg-[#8b7355]/10 transition-all"
                >
                  <Share2 size={16} />
                  <span>Bagikan</span>
                </button>
              </div>
            </motion.div>

            {/* Impact */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#8b7355]/10 to-transparent border border-[#8b7355]/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#8b7355]/20 flex items-center justify-center flex-shrink-0">
                  <Zap size={18} className="text-[#8b7355]" />
                </div>
                <div>
                  <h4 className={`text-sm font-semibold tracking-wider uppercase mb-2 ${colors.textSubtle}`}>Kenapa ini penting</h4>
                  <p className={`text-base sm:text-lg ${colors.textMuted} leading-relaxed`}>{post.impact}</p>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="text-center py-12 mb-16">
              <p className="font-serif text-2xl sm:text-3xl italic text-[#c7b299] mb-4">"Gue juga pernah ngalamin hal serupa..."</p>
              <p className={`text-sm ${colors.textMuted} mb-6 max-w-md mx-auto`}>Ceritamu bisa jadi pengingat buat pekerja lain bahwa mereka gak sendiri</p>
              <Link href="/tulis" className="inline-flex items-center gap-2 px-8 py-4 bg-[#8b7355] text-white rounded-full hover:bg-[#c7b299] transition-all text-sm font-medium shadow-lg shadow-[#8b7355]/25">
                <PenLine size={18} />
                Tulis Ceritamu
              </Link>
            </motion.div>
          </div>
        </article>

        {/* SAME CATEGORY */}
        {sameCategory.length > 0 && (
          <section className={`px-4 sm:px-6 py-16 ${isDark ? 'bg-neutral-900/50' : 'bg-neutral-100/50'} border-y ${colors.border}`}>
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs tracking-[0.2em] uppercase text-[#8b7355] font-medium">Dari Dunia Kerja yang Sama</span>
                  <h2 className={`font-serif text-2xl sm:text-3xl mt-2 ${colors.heading}`}>Lebih banyak cerita {post.category}</h2>
                </div>
                <Link href={`/tulisan?category=${post.category}`} className="hidden sm:flex items-center gap-1 text-sm text-[#8b7355] hover:text-[#c7b299]">
                  Lihat semua <ChevronRight size={16} />
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sameCategory.map((relatedPost: any, index: number) => (
                  <motion.div key={relatedPost.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                    <Link href={`/tulisan/${relatedPost.slug}`} className="group block h-full">
                      <div className={`h-full p-5 rounded-2xl border ${colors.border} hover:border-[#8b7355] hover:shadow-xl hover:shadow-[#8b7355]/10 transition-all duration-300 ${colors.cardBg}`}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-2 h-2 rounded-full bg-[#8b7355]"></span>
                          <span className="text-[10px] tracking-widest uppercase text-[#8b7355]">{relatedPost.readTime}</span>
                        </div>
                        <h3 className={`font-serif text-lg mb-2 ${colors.heading} group-hover:text-[#c7b299] transition-colors leading-snug line-clamp-2`}>{relatedPost.title}</h3>
                        <p className={`text-sm ${colors.textMuted} line-clamp-2 mb-4`}>{relatedPost.hook}</p>
                        <div className="flex items-center gap-2 text-xs text-[#8b7355] group-hover:text-[#c7b299] font-medium">
                          <span>Baca cerita</span>
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TRENDING */}
        <section className="px-4 sm:px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp size={20} className="text-[#8b7355]" />
              <div>
                <span className="text-xs tracking-[0.2em] uppercase text-[#8b7355] font-medium">Sedang Ramai Dibaca</span>
                <h2 className={`font-serif text-2xl ${colors.heading}`}>Yang lain juga baca</h2>
              </div>
            </div>

            <div className="space-y-4">
              {trending.map((trendPost: any, index: number) => (
                <motion.div key={trendPost.slug} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                  <Link href={`/tulisan/${trendPost.slug}`} className="group flex items-start gap-4 p-4 rounded-xl hover:bg-neutral-800/5 transition-colors border border-transparent hover:border-[#8b7355]/20">
                    <span className="text-3xl font-serif text-[#8b7355]/30 font-bold w-8">{String(index + 1).padStart(2, "0")}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] tracking-widest uppercase text-[#8b7355]">{trendPost.category}</span>
                        <span className={colors.textSubtle}>•</span>
                        <span className={`text-xs ${colors.textSubtle}`}>{trendPost.readTime}</span>
                      </div>
                      <h4 className={`font-medium text-lg ${colors.heading} group-hover:text-[#c7b299] transition-colors`}>{trendPost.title}</h4>
                      <p className={`text-sm ${colors.textMuted} mt-1 line-clamp-1`}>{trendPost.hook}</p>
                    </div>
                    <ArrowRight size={20} className={`${colors.textSubtle} group-hover:text-[#8b7355] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1`} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="px-4 sm:px-6 py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#8b7355]/30 via-[#8b7355]/10 to-transparent"></div>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#8b7355] flex items-center justify-center text-2xl">✍️</div>
              <p className="font-serif text-3xl sm:text-5xl italic text-[#c7b299] mb-6 leading-tight">"Ceritamu mungkin yang mereka cari hari ini"</p>
              <p className={`text-lg ${colors.textMuted} mb-10 max-w-xl mx-auto`}>Setiap pengalaman kerja itu berharga. Jangan biarkan hilang begitu saja.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/tulis" className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#8b7355] text-white rounded-full hover:bg-[#c7b299] transition-all text-base font-medium shadow-2xl shadow-[#8b7355]/40 hover:shadow-[#c7b299]/40 hover:-translate-y-1">
                  <PenLine size={20} />
                  Tulis Ceritamu Sekarang
                </Link>
                <button onClick={() => router.push(`/tulisan/${nextPost.slug}`)} className={`inline-flex items-center justify-center gap-3 px-10 py-5 border-2 ${colors.border} rounded-full hover:border-[#8b7355] hover:text-[#8b7355] transition-all text-base font-medium`}>
                  Baca Cerita Lain
                  <ArrowRight size={20} />
                </button>
              </div>
              
              <p className={`mt-8 text-xs ${colors.textSubtle}`}>Anonim • Tanpa login • Langsung terbit</p>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}
