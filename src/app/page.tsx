✅ Home page (page.tsx) completed

-100 transition-all"
            >
              <span>Lihat Semua Buku</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Random Coffee Thought */}
      <RandomCoffeeThought />

      {/* Stats Section */}
      <section className="py-24 px-6 border-t border-[#8b7355]/10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-serif text-[#8b7355]">{allBooks.total}</div>
              <div className="text-xs uppercase tracking-wider opacity-40">Buku</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-serif text-[#8b7355]">44</div>
              <div className="text-xs uppercase tracking-wider opacity-40">Catatan</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-serif text-[#8b7355]">2.5k+</div>
              <div className="text-xs uppercase tracking-wider opacity-40">Pembaca</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-serif text-[#8b7355]">∞</div>
              <div className="text-xs uppercase tracking-wider opacity-40">Kopi</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <Coffee className="w-12 h-12 mx-auto mb-6 text-[#8b7355] opacity-60" />
          <h3 className="font-serif text-2xl md:text-3xl mb-4 opacity-90">
            Siap untuk menemani harimu?
          </h3>
          <p className="text-sm opacity-60 mb-8">
            Mulai dengan buku pertama, atau dapatkan inspirasi random dari catatan kami.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/buku"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 
                       bg-[#8b7355] text-white rounded-full
                       hover:bg-[#6b5635] transition-all text-sm tracking-wider"
            >
              <BookOpen size={18} />
              <span>Mulai Membaca</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
