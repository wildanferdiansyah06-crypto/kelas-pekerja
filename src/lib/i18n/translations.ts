export type Language = 'id' | 'en';

export interface Translations {
  nav: {
    home: string;
    books: string;
    stories: string;
    essays: string;
    quotes: string;
    about: string;
    saved: string;
    write: string;
  };
  hero: {
    tagline: string;
    title: string;
    subtitle: string;
    exploreBooks: string;
    readQuotes: string;
    featuredBooks: string;
    featuredSubtitle: string;
    viewAllBooks: string;
    recentQuotes: string;
    coffeeThoughtTitle: string;
    newQuote: string;
    statsBooks: string;
    statsReaders: string;
    statsReadTime: string;
  };
  categories: {
    all: string;
    kehidupan: string;
    cerita: string;
    renungan: string;
    proses: string;
    kopi: string;
    pekerja: string;
    filosofi: string;
    refleksi: string;
    catatanMalam: string;
  };
  booksPage: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    noBooksFound: string;
    resetFilter: string;
    readBook: string;
    preview: string;
    views: string;
    downloads: string;
    readTime: string;
    tableOfContents: string;
    startReading: string;
    downloadPdf: string;
    close: string;
    share: string;
    bookmarked: string;
    bookmark: string;
    backToShelf: string;
    chapter: string;
    nextChapter: string;
    prevChapter: string;
    readingProgress: string;
  };
  aboutPage: {
    title: string;
    subtitle: string;
    authorRole: string;
    manifestoTitle: string;
    supportTitle: string;
    supportDesc: string;
    copied: string;
    copyAccount: string;
  };
  writePage: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    storyTitleLabel: string;
    storyTitlePlaceholder: string;
    contentLabel: string;
    contentPlaceholder: string;
    submitBtn: string;
    successMsg: string;
  };
  savedPage: {
    title: string;
    subtitle: string;
    emptyState: string;
    exploreBooks: string;
  };
  footer: {
    description: string;
    quickLinks: string;
    categories: string;
    rights: string;
    builtWith: string;
  };
  common: {
    loading: string;
    error: string;
    language: string;
    themeDark: string;
    themeLight: string;
  };
}

export const translations: Record<Language, Translations> = {
  id: {
    nav: {
      home: 'Beranda',
      books: 'Buku',
      stories: 'Cerita',
      essays: 'Tulisan',
      quotes: 'Quotes',
      about: 'Tentang',
      saved: 'Simpanan',
      write: 'Tulis Cerita',
    },
    hero: {
      tagline: 'Catatan Pekerja, Filosofi Kopi, & Ruang Berpikir',
      title: 'Ruang Teduh untuk Pekerja & Penikmat Kata',
      subtitle: 'Kumpulan catatan, cerita pendek, dan filosofi hidup yang diseduh pelan di antara rutinitas dan cangkir kopi.',
      exploreBooks: 'Jelajahi Buku',
      readQuotes: 'Baca Quotes Hari Ini',
      featuredBooks: 'Buku Pilihan',
      featuredSubtitle: 'Bahan bacaan kurasi untuk menemanimu di sela-sela kesibukan',
      viewAllBooks: 'Lihat Semua Buku',
      recentQuotes: 'Kutipan Kopi & Kehidupan',
      coffeeThoughtTitle: 'Pikiran Sambil Ngopi',
      newQuote: 'Kutipan Lain',
      statsBooks: 'Buku Gratis',
      statsReaders: 'Pembaca',
      statsReadTime: 'Menit Baca',
    },
    categories: {
      all: 'Semua',
      kehidupan: 'Kehidupan',
      cerita: 'Cerita',
      renungan: 'Renungan',
      proses: 'Proses',
      kopi: 'Kopi',
      pekerja: 'Pekerja',
      filosofi: 'Filosofi',
      refleksi: 'Refleksi',
      catatanMalam: 'Catatan Malam',
    },
    booksPage: {
      title: 'Rak Buku',
      subtitle: 'Koleksi tulisan, buku elektronik, dan kumpulan catatan yang dapat dibaca secara gratis.',
      searchPlaceholder: 'Cari judul, kata kunci, atau topik...',
      noBooksFound: 'Tidak ada buku yang cocok dengan pencarian Anda.',
      resetFilter: 'Reset Filter',
      readBook: 'Baca Sekarang',
      preview: 'Pratinjau',
      views: 'kali dibaca',
      downloads: 'diunduh',
      readTime: 'waktu baca',
      tableOfContents: 'Daftar Isi & Bab',
      startReading: 'Mulai Membaca',
      downloadPdf: 'Unduh PDF',
      close: 'Tutup',
      share: 'Bagikan',
      bookmarked: 'Tersimpan',
      bookmark: 'Simpan',
      backToShelf: 'Kembali ke Rak',
      chapter: 'Bab',
      nextChapter: 'Bab Selanjutnya',
      prevChapter: 'Bab Sebelumnya',
      readingProgress: 'Kemajuan Membaca',
    },
    aboutPage: {
      title: 'Tentang Kelas Pekerja',
      subtitle: 'Ruang refleksi di antara jam kerja dan cangkir kopi yang mendingin.',
      authorRole: 'Penulis & Barista Paruh Waktu',
      manifestoTitle: 'Manifesto',
      supportTitle: 'Dukung Karya Ini',
      supportDesc: 'Jika tulisan di sini memberi ruang teduh untuk harimu, kamu bisa mendukung keberlanjutan ruang ini.',
      copied: 'Nomor Rekening Disalin!',
      copyAccount: 'Salin Rekening',
    },
    writePage: {
      title: 'Tulis Cerita & Catatan',
      subtitle: 'Bagikan cerita atau pengalaman kerjamu untuk dibaca oleh sesama pekerja.',
      nameLabel: 'Nama / Inisial',
      namePlaceholder: 'Contoh: Pekerja Shift Malam',
      emailLabel: 'Email (Opsional)',
      emailPlaceholder: 'email@contoh.com',
      storyTitleLabel: 'Judul Cerita',
      storyTitlePlaceholder: 'Tulis judul yang hangat atau berkesan...',
      contentLabel: 'Isi Cerita / Catatan',
      contentPlaceholder: 'Tuliskan ceritamu di sini...',
      submitBtn: 'Kirim Cerita',
      successMsg: 'Terima kasih! Ceritamu telah terkirim dan akan ditinjau.',
    },
    savedPage: {
      title: 'Buku & Catatan Tersimpan',
      subtitle: 'Daftar bacaan yang Anda simpan untuk dibaca kembali nanti.',
      emptyState: 'Belum ada buku atau catatan yang Anda simpan.',
      exploreBooks: 'Jelajahi Buku Sekarang',
    },
    footer: {
      description: 'Catatan harian, cerita pendek, dan perenungan tentang dunia kerja dan kehidupan yang diseduh perlahan.',
      quickLinks: 'Navigasi Cepat',
      categories: 'Kategori Popular',
      rights: 'Hak Cipta Dilindungi.',
      builtWith: 'Dibuat dengan cinta & kopi di Indonesia.',
    },
    common: {
      loading: 'Memuat...',
      error: 'Terjadi kesalahan',
      language: 'Bahasa',
      themeDark: 'Mode Gelap',
      themeLight: 'Mode Terang',
    },
  },
  en: {
    nav: {
      home: 'Home',
      books: 'Books',
      stories: 'Stories',
      essays: 'Essays',
      quotes: 'Quotes',
      about: 'About',
      saved: 'Saved',
      write: 'Write Story',
    },
    hero: {
      tagline: 'Worker Notes, Coffee Philosophy, & Thought Space',
      title: 'A Quiet Sanctuary for Workers & Word Lovers',
      subtitle: 'A collection of notes, short stories, and life philosophies slowly brewed between routines and coffee cups.',
      exploreBooks: 'Explore Books',
      readQuotes: 'Read Quotes Today',
      featuredBooks: 'Featured Books',
      featuredSubtitle: 'Curated reading material to accompany your busy days',
      viewAllBooks: 'View All Books',
      recentQuotes: 'Coffee & Life Quotes',
      coffeeThoughtTitle: 'Coffee Thoughts',
      newQuote: 'Another Quote',
      statsBooks: 'Free Books',
      statsReaders: 'Readers',
      statsReadTime: 'Reading Mins',
    },
    categories: {
      all: 'All',
      kehidupan: 'Life',
      cerita: 'Stories',
      renungan: 'Reflections',
      proses: 'Process',
      kopi: 'Coffee',
      pekerja: 'Workers',
      filosofi: 'Philosophy',
      refleksi: 'Reflection',
      catatanMalam: 'Night Notes',
    },
    booksPage: {
      title: 'Book Shelf',
      subtitle: 'A collection of writings, e-books, and curated notes available to read for free.',
      searchPlaceholder: 'Search titles, keywords, or topics...',
      noBooksFound: 'No books found matching your search.',
      resetFilter: 'Reset Filters',
      readBook: 'Read Now',
      preview: 'Preview',
      views: 'views',
      downloads: 'downloads',
      readTime: 'read time',
      tableOfContents: 'Table of Contents',
      startReading: 'Start Reading',
      downloadPdf: 'Download PDF',
      close: 'Close',
      share: 'Share',
      bookmarked: 'Saved',
      bookmark: 'Save',
      backToShelf: 'Back to Shelf',
      chapter: 'Chapter',
      nextChapter: 'Next Chapter',
      prevChapter: 'Previous Chapter',
      readingProgress: 'Reading Progress',
    },
    aboutPage: {
      title: 'About Worker Class',
      subtitle: 'A space for reflection between work hours and a cooling cup of coffee.',
      authorRole: 'Author & Part-time Barista',
      manifestoTitle: 'Manifesto',
      supportTitle: 'Support This Work',
      supportDesc: 'If writings here offer a quiet sanctuary for your day, you can support the continuity of this space.',
      copied: 'Account Number Copied!',
      copyAccount: 'Copy Account Number',
    },
    writePage: {
      title: 'Write Story & Notes',
      subtitle: 'Share your work story or experiences to be read by fellow workers.',
      nameLabel: 'Name / Initials',
      namePlaceholder: 'Example: Night Shift Worker',
      emailLabel: 'Email (Optional)',
      emailPlaceholder: 'email@example.com',
      storyTitleLabel: 'Story Title',
      storyTitlePlaceholder: 'Write a warm or memorable title...',
      contentLabel: 'Story Content / Notes',
      contentPlaceholder: 'Write your story here...',
      submitBtn: 'Submit Story',
      successMsg: 'Thank you! Your story has been submitted and will be reviewed.',
    },
    savedPage: {
      title: 'Saved Books & Notes',
      subtitle: 'Your saved reading list to read again later.',
      emptyState: 'You have not saved any books or notes yet.',
      exploreBooks: 'Explore Books Now',
    },
    footer: {
      description: 'Daily notes, short stories, and reflections on work and life slowly brewed.',
      quickLinks: 'Quick Links',
      categories: 'Popular Categories',
      rights: 'All Rights Reserved.',
      builtWith: 'Built with love & coffee in Indonesia.',
    },
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      language: 'Language',
      themeDark: 'Dark Mode',
      themeLight: 'Light Mode',
    },
  },
};
