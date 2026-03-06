import { useParams, Link } from "react-router-dom";

const BUKU = [
{
id: "1",
judul: "Seni Menyeduh Kehidupan",
penulis: "Wildan Ferdiansyah",
drive: "https://drive.google.com/file/d/17Zd1FKFK4X_vmKhITFU5lXihOmMEkezI/preview"
},
{
id: "2",
judul: "Di Balik Bar",
penulis: "Wildan Ferdiansyah",
drive: "https://drive.google.com/file/d/1N1zwGLqkbVQOzFV_fpRXJxQdawbgZGAl/preview"
},
{
id: "3",
judul: "Di Atas Cangkir Yang Sama",
penulis: "Wildan Ferdiansyah",
drive: "https://drive.google.com/file/d/1cqRI8rfb7_0MIUXLekZJtV0xTFKXr-CD/preview"
},
{
id: "4",
judul: "Kami Menulis Pelan",
penulis: "Wildan Ferdiansyah",
drive: "https://drive.google.com/file/d/1Mc6pOQ5z2xSn8Wmhf65kdgTrv5T5EzPm/preview"
}
];

export default function Reader() {

const { id } = useParams();

const buku = BUKU.find((b) => b.id === id);

if (!buku) {
return (
<div className="min-h-screen flex items-center justify-center">
Buku tidak ditemukan
</div>
);
}

return (
<div className="min-h-screen bg-[#f6f4ef] dark:bg-[#1c1c1c] text-black dark:text-white">

  <div className="max-w-4xl mx-auto px-6 py-10">

    <Link
      to="/rak"
      className="text-sm opacity-60 hover:opacity-100"
    >
      ← Kembali ke Rak
    </Link>

    <h1 className="text-3xl md:text-4xl font-serif mt-4">
      {buku.judul}
    </h1>

    <p className="opacity-60 mt-2">
      oleh {buku.penulis}
    </p>

    <div className="mt-8 rounded-xl overflow-hidden shadow-lg">

      <iframe
        src={buku.drive}
        className="w-full h-[80vh]"
        allow="autoplay"
      />

    </div>

  </div>

</div>

);
}
