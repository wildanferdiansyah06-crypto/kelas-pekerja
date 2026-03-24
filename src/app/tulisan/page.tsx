"use client";

import postsData from "@/public/data/posts.json";
import { motion } from "framer-motion";
import { useTheme } from "@/src/components/ThemeProvider";
import Link from "next/link";
import { PenLine, Clock, ArrowRight, Filter, Sparkles, TrendingUp, ChevronRight, Heart } from "lucide-react";
import { useState, useMemo } from "react";

const fadeUp = {
 hidden: { opacity: 0, y: 30 },
 show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
 hidden: {},
 show: { transition: { staggerChildren: 0.1 } },
};

const CATEGORIES = ["Semua", "Ruang Bagi", "Barista & FnB", "Retail", "Office & Korporat", "Gig Economy", "Startup", "Kreatif"];

export default function TulisanPage() {
 const posts = (postsData as any).posts || [];
 const { theme } = useTheme();
 const [activeCategory, setActiveCategory] = useState("Semua");
 const [hoveredPost, setHoveredPost] = useState<string | null>(null);

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
   featuredBg: isDark ? "bg-gradient-to-br from-[#8b7355]/30 via-neutral-900/80 to-[#0a0a0a]" 
                     : "bg-gradient-to-br from-[#8b7355]/20 via-white to-[#fafafa]",
   grainOpacity: isDark ? "opacity-[0.03]" : "opacity-[0.02]",
 };

 const featuredPost = posts.find((p: any) => p.isFeatured);
 const regularPosts = posts.filter((p: any) => !p.isFeatured);
 
 const filteredPosts = useMemo(() => {
   if (activeCategory === "Semua") return regularPosts;
   return regularPosts.filter((post: any) => post.category === activeCategory);
 }, [regularPosts, activeCategory]);

 const trendingPosts = [...posts]
   .filter((p: any) => !p.isFeatured)
   .sort((a, b) => (b.likes || 0) - (a.likes || 0))
   .slice(0, 4);

 const showFeatured = activeCategory === "Semua" || activeCategory === "Ruang Bagi";

 return (
   <main className={`min-h-screen ${colors.bg} ${colors.text} transition-colors duration-500`}>
     {/* Grain */}
     <div className={`fixed inset-0 ${colors.grainOpacity} pointer-events-none z-0`} style={{
       backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
     }} />

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
       <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={`py-6 border-y ${colors.border} overflow-hidden`}>
         <div className="max-w-6xl mx-auto px-4 sm:px-6">
           <div className="flex items-center gap-4 mb-4">
             <TrendingUp size={18} className="text-[#8b7355]" />
             <span className="text-xs tracking-widest uppercase text-[#8b7355] font-medium">Sedang Dibaca</span>
           </div>
           <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
             {trendingPosts.map((post: any) => (
               <Link key={post.slug} href={`/tulisan/${post.slug}`} className="flex-shrink-0 w-72 p-4 rounded-xl border border-[#8b7355]/20 hover:border-[#8b7355] hover:bg-[#8b7355]/5 transition-all group">
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
             ))}
           </div>
         </div>
       </motion.section>

       <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
         {/* FILTER */}
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-12">
           <div className="flex items-center justify-center gap-2 mb-4">
             <Filter size={14} className="text-[#8b7355]" />
             <span className={`text-xs tracking-widest uppercase ${colors.textSubtle}`}>Filter Kategori</span>
           </div>
           <div className="flex flex-wrap justify-center gap-2">
             {CATEGORIES.map((cat) => (
               <button
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
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
           <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-16">
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

         {/* DIVIDER */}
         {showFeatured && featuredPost && (
           <div className={`flex items-center justify-center gap-4 mb-12 ${colors.textSubtle}`}>
             <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#c7b299]"></div>
             <div className="w-2 h-2 rotate-45 bg-[#c7b299]"></div>
             <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#c7b299]"></div>
           </div>
         )}

         {/* HEADER LIST */}
         <div className={`flex items-baseline justify-between mb-8 border-b ${colors.border} pb-4`}>
           <h2 className={`font-serif text-2xl ${colors.heading} italic`}>{activeCategory === "Semua" ? "Semua Cerita" : activeCategory}</h2>
           <span className={`text-xs tracking-widest uppercase ${colors.textSubtle}`}>{filteredPosts.length} tulisan</span>
         </div>

         {/* POSTS GRID */}
         <motion.div variants={stagger} initial="hidden" animate="show" className="grid md:grid-cols-2 gap-6">
           {filteredPosts.length === 0 ? (
             <motion.div variants={fadeUp} className={`col-span-2 text-center py-24 ${colors.textSubtle}`}>
               {regularPosts.length === 0 ? (
                 <>
                   <p className="font-serif text-3xl italic mb-4 text-[#c7b299]">"Keheningan menunggu..."</p>
                   <p className="mb-8">Belum ada kata yang berani keluar.</p>
                   <Link href="/tulis" className="inline-flex items-center gap-3 px-8 py-4 bg-[#8b7355] text-white rounded-full hover:bg-[#c7b299] text-sm font-medium">
                     <PenLine size={18} />
                     Jadi yang Pertama
                   </Link>
                 </>
               ) : (
                 <>
                   <p className="font-serif text-xl italic mb-4">Belum ada cerita di kategori ini</p>
                   <button onClick={() => setActiveCategory("Semua")} className="text-[#8b7355] hover:text-[#c7b299] text-sm">Lihat semua kategori →</button>
                 </>
               )}
             </motion.div>
           ) : (
             filteredPosts.map((post: any) => (
               <motion.article key={post.slug} variants={fadeUp} onMouseEnter={() => setHoveredPost(post.slug)} onMouseLeave={() => setHoveredPost(null)}>
                 <Link href={`/tulisan/${post.slug}`} className="block h-full">
                   <div className={`h-full p-6 sm:p-8 rounded-2xl border ${colors.border} hover:border-[#8b7355] transition-all duration-300 ${colors.cardBg} ${hoveredPost === post.slug ? 'shadow-xl shadow-[#8b7355]/10' : ''}`}>
                     
                     <div className="flex flex-wrap items-center gap-3 mb-4">
                       <span className="px-3 py-1 text-[10px] tracking-widest uppercase bg-[#8b7355]/10 text-[#8b7355] rounded-full">{post.category}</span>
                       <span className={`flex items-center gap-1 text-xs ${colors.textSubtle}`}><Clock size={12} />{post.readTime}</span>
                       <span className="flex items-center gap-1 text-xs text-[#8b7355]"><Heart size={12} /> {post.likes}</span>
                     </div>

                     <p className={`text-sm italic mb-3 text-[#c7b299] line-clamp-2`}>"{post.opening || post.hook}"</p>

                     <h3 className={`font-serif text-xl sm:text-2xl mb-3 ${colors.heading} leading-tight group-hover:text-[#c7b299] transition-colors`}>{post.title}</h3>

                     <p className={`text-sm ${colors.textMuted} line-clamp-2 mb-4 leading-relaxed`}>{post.excerpt}</p>

                     <div className="flex items-center justify-between pt-4 border-t border-[#8b7355]/10">
                       <span className={`text-xs ${colors.textSubtle}`}>{post.role}</span>
                       <span className="inline-flex items-center gap-1 text-xs text-[#8b7355] font-medium group-hover:translate-x-1 transition-transform">
                         Baca selengkapnya <ArrowRight size={14} />
                       </span>
                     </div>
                   </div>
                 </Link>
               </motion.article>
             ))
           )}
         </motion.div>

         {/* INFINITE LOOP CTA */}
         {filteredPosts.length > 0 && (
           <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-16 text-center">
             <div className={`inline-flex flex-col sm:flex-row items-center gap-4 p-6 sm:p-8 rounded-3xl border ${colors.border} ${colors.cardBg}`}>
               <div className="text-left">
                 <p className={`font-serif text-lg italic text-[#c7b299] mb-1`}>Sudah baca semua?</p>
                 <p className={`text-sm ${colors.textMuted}`}>Atau punya cerita sendiri yang perlu dibagi?</p>
               </div>
               <Link href="/tulis" className="flex items-center gap-2 px-6 py-3 bg-[#8b7355] text-white rounded-full hover:bg-[#c7b299] transition-colors text-sm font-medium whitespace-nowrap">
                 <PenLine size={16} />
                 Tulis Sekarang
               </Link>
             </div>
           </motion.div>
         )}
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
