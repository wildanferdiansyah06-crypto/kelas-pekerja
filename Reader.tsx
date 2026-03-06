import { useParams, Link } from "react-router-dom";
import { BUKU } from "./rak-data";

export default function Reader() {

const { id } = useParams();

const buku = BUKU.find((b) => String(b.id) === id);

if (!buku) {
return (
<div className="min-h-screen flex items-center justify-center">
Buku tidak ditemukan
</div>
);
}

return (
<div className="min-h-screen bg-[#f6f4ef] dark:bg-[#1c1c1c] text-black dark:text-white">

  <div className="max-w-5xl mx-auto px-6 py-8">

    <Link
      to="/rak"
      className="text-sm opacity-70 hover:opacity-100"
    >
      ← Kembali ke Rak
    </Link>

    <h1 className="text-3xl md:text-4xl font-serif mt-4">
      {buku.judul}
    </h1>

    <p className="opacity-60 mt-1">
      oleh {buku.penulis}
    </p>

    <div className="mt-6 rounded-xl overflow-hidden shadow-lg">

      <iframe
        src={buku.file}
        className="w-full h-[85vh]"
      />

    </div>

  </div>

</div>

);
}
