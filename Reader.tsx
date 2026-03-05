import { useParams } from "react-router-dom";
import { RAK_BUKU } from "./rak-data";

export default function Reader() {

const { id } = useParams();

const buku = RAK_BUKU.find(
(b) => b.id.toString() === id
);

if (!buku) {
return <div className="p-10">Buku tidak ditemukan.</div>;
}

return (
<div className="max-w-2xl mx-auto px-6 py-12">

  <h1 className="text-3xl font-serif mb-4">
    {buku.judul}
  </h1>

  <p className="opacity-60 mb-6">
    oleh {buku.penulis}
  </p>

  <iframe
    src={buku.link}
    className="w-full h-[80vh]"
  />

</div>

);
}
