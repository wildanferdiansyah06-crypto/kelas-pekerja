import postsData from "@/public/data/posts.json";

export default function TulisanPage() {
  const posts = postsData.posts || [];

  return (
    <main className="min-h-screen py-24 px-6 bg-[#0c0c0c] text-neutral-200">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <header className="mb-20 text-center">
          <p className="text-xs tracking-[0.4em] uppercase opacity-40 mb-4">
            Arsip
          </p>

          <h1 className="font-serif text-4xl md:text-5xl mb-6 text-white">
            Tulisan
          </h1>

          <p className="text-lg opacity-60 leading-relaxed max-w-xl mx-auto">
            Catatan pendek tentang kopi, kerja, dan kehidupan yang berjalan pelan.
            Tulisan-tulisan kecil yang lahir dari malam yang sunyi, dari
            percakapan dengan diri sendiri, dan dari hari-hari yang sering
            terasa terlalu biasa untuk diceritakan.
          </p>
        </header>

        {/* Intro reflektif */}
        <section className="mb-24 space-y-6 text-lg leading-[1.9] opacity-70">
          <p className="first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:mt-[-4px] first-letter:text-[#c7b299]">
            Tidak semua tulisan lahir dari inspirasi besar. Beberapa hanya
            muncul dari kelelahan yang tidak tahu harus dibawa ke mana.
            Dari malam yang terlalu panjang. Dari secangkir kopi yang
            perlahan mendingin di atas meja.
          </p>

          <p>
            Di sini, tulisan tidak harus sempurna. Tidak harus penting bagi
            dunia. Cukup jujur. Cukup menjadi tempat di mana pikiran yang
            biasanya kita pendam bisa bernapas sebentar.
          </p>

          <blockquote className="border-l-2 border-[#8b7355] pl-6 italic font-serif text-xl text-[#c7b299]">
            Karena terkadang menulis bukan tentang menemukan jawaban,
            tetapi tentang memahami pertanyaan yang kita bawa sepanjang hari.
          </blockquote>
        </section>

        {/* List Tulisan */}
        <section className="space-y-16">
          {posts.length === 0 ? (
            <p className="opacity-50 text-center">
              Belum ada tulisan di sini.
            </p>
          ) : (
            posts.map((post: any) => (
              <article
                key={post.slug}
                className="border-b border-neutral-800 pb-10"
              >
                <h2 className="font-serif text-2xl md:text-3xl mb-3 text-white hover:opacity-80 transition">
                  {post.title}
                </h2>

                <p className="text-lg opacity-70 leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-4 text-sm opacity-40">
                  {post.date && <span>{post.date}</span>}
                  {post.readTime && <span>• {post.readTime} menit</span>}
                </div>
              </article>
            ))
          )}
        </section>

        {/* Penutup */}
        <footer className="mt-24 pt-12 border-t border-neutral-900 text-center">
          <p className="font-serif italic text-[#c7b299] opacity-70">
            Ditulis perlahan, seperti menyeduh kopi di pagi yang tenang.
          </p>
        </footer>

      </div>
    </main>
  );
}
