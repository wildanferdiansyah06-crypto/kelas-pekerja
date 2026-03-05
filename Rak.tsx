import { useState, useEffect } from "react";
import { RAK_BUKU } from "./rak-data";

export default function Rak() {

const [selectedBook, setSelectedBook] = useState<any>(null);
const [darkMode, setDarkMode] = useState(false);

useEffect(() => {
const saved = localStorage.getItem("rak-dark");
if (saved === "true") setDarkMode(true);
}, []);

useEffect(() => {
localStorage.setItem("rak-dark", darkMode.toString());
}, [darkMode]);

const bg = darkMode ? "bg-[#1a1816] text-[#e8e0d5]" : "bg-[#faf8f5] text-[#2b2b2b]";
const card = darkMode ? "bg-[#2a2826]" : "bg-white";

return (
<div className={"${bg} min-h-screen px-6 py-12 transition-colors"}>

  <div className="max-w-5xl mx-auto">

    {/* HEADER */}
    <div className="flex justify-between items-center mb-10">

      <div>
        <h1 className="text-3xl font-serif mb-1">
          Rak Buku Komunitas
        </h1>

        <p className="text-sm opacity-60">
          Arsip tulisan dari mereka yang tetap bekerja dan tetap menulis.
        </p>
      </div>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="text-sm border px-3 py-1 rounded-lg opacity-70 hover:opacity-100"
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>

    </div>

    {/* GRID BUKU */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

      {RAK_BUKU.map((buku) => (

        <div
          key={buku.id}
          className="cursor-pointer group"
          onClick={() => setSelectedBook(buku)}
        >

          <div className="aspect-[3/4] overflow-hidden rounded-xl mb-3">

            <img
              src={buku.cover}
              alt={buku.judul}
              className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
            />

          </div>

          <h3 className="text-sm font-semibold leading-tight">
            {buku.judul}
          </h3>

          <p className="text-xs opacity-60 mt-1">
            {buku.penulis}
          </p>

        </div>

      ))}

    </div>

    {/* MODAL */}
    {selectedBook && (

      <div
        className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 z-50"
        onClick={() => setSelectedBook(null)}
      >

        <div
          onClick={(e) => e.stopPropagation()}
          className={`${card} max-w-md w-full rounded-2xl p-6 shadow-xl`}
        >

          <img
            src={selectedBook.cover}
            className="w-full rounded-lg mb-4"
          />

          <h2 className="text-xl font-semibold mb-2">
            {selectedBook.judul}
          </h2>

          <p className="text-sm opacity-70 mb-5">
            {selectedBook.deskripsi}
          </p>

          <div className="flex gap-3">

            <a
              href={selectedBook.link}
              target="_blank"
              className="px-4 py-2 bg-black text-white rounded-lg text-sm"
            >
              Baca Buku
            </a>

            <button
              onClick={() => setSelectedBook(null)}
              className="px-4 py-2 border rounded-lg text-sm"
            >
              Tutup
            </button>

          </div>

        </div>

      </div>

    )}

    {/* FOOTER */}
    <div className="mt-20 text-center text-sm opacity-70">

      <p>
        Ingin menambahkan buku ke rak ini?
      </p>

      <p className="mt-2">
        Hubungi pengelola Kelas Pekerja.
      </p>

    </div>

    <div className="mt-10 text-center">

      <a
        href="/"
        className="underline text-sm opacity-70 hover:opacity-100"
      >
        ← Kembali ke Beranda
      </a>

    </div>

  </div>

</div>

);
}
