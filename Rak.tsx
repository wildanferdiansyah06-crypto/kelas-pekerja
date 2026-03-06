import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, X } from "lucide-react";
import { BUKU } from "./rak-data";

export default function Rak() {

const [selectedBook, setSelectedBook] = useState<any>(null);

const closeModal = () => {
setSelectedBook(null);
};

return (
<div className="min-h-screen bg-[#f6f4ef] dark:bg-[#1c1c1c] text-black dark:text-white">

  <div className="max-w-5xl mx-auto px-5 py-8">

    {/* HEADER */}
    <div className="flex items-center justify-between mb-8">

      <Link
        to="/"
        className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100"
      >
        <ArrowLeft size={16} />
        Beranda
      </Link>

    </div>

    {/* TITLE */}
    <div className="mb-10">

      <h1 className="text-3xl md:text-4xl font-serif">
        Rak Buku
      </h1>

      <p className="opacity-60 mt-2 text-sm max-w-md">
        Tempat buku-buku kecil yang lahir dari malam panjang,
        kopi hangat, dan mereka yang tetap menulis meski lelah bekerja.
      </p>

    </div>

    {/* GRID */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

      {BUKU.map((buku) => (

        <button
          key={buku.id}
          onClick={() => setSelectedBook(buku)}
          className="text-left group"
        >

          <div className="bg-white dark:bg-[#2a2a2a] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition flex flex-col">

            {/* COVER */}
            <div className="aspect-[3/4] overflow-hidden">

              <img
                src={buku.cover}
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />

            </div>

            {/* INFO */}
            <div className="p-3">

              <h3 className="text-sm font-medium leading-snug">
                {buku.judul}
              </h3>

              <p className="text-xs opacity-60 mt-1">
                {buku.penulis}
              </p>

            </div>

          </div>

        </button>

      ))}

    </div>

  </div>

  {/* MODAL */}
  {selectedBook && (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">

      <div className="bg-white dark:bg-[#1f1f1f] max-w-lg w-full rounded-xl overflow-hidden shadow-xl">

        {/* IMAGE */}
        <div className="h-48 overflow-hidden">

          <img
            src={selectedBook.cover}
            className="w-full h-full object-cover"
          />

        </div>

        {/* CONTENT */}
        <div className="p-6">

          <div className="flex justify-between items-start mb-3">

            <h2 className="text-xl font-serif">
              {selectedBook.judul}
            </h2>

            <button onClick={closeModal}>
              <X size={18} />
            </button>

          </div>

          <p className="text-sm opacity-60 mb-4">
            oleh {selectedBook.penulis}
          </p>

          <p className="text-sm leading-relaxed opacity-80 mb-4">
            {selectedBook.preview}
          </p>

          <div className="flex items-center gap-4 text-xs opacity-60 mb-6">

            <span>{selectedBook.halaman} halaman</span>
            <span>•</span>
            <span>{selectedBook.readTime}</span>

          </div>

          <Link
            to={`/buku/${selectedBook.id}`}
            className="flex items-center justify-center gap-2 bg-black text-white dark:bg-white dark:text-black py-2 rounded-lg text-sm hover:opacity-90 transition"
          >
            <BookOpen size={16} />
            Baca Buku
          </Link>

        </div>

      </div>

    </div>

  )}

</div>

);
}
