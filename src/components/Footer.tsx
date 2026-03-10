import Link from "next/link";
import { getConfig } from "@/src/lib/api";

export default async function Footer() {
  const config: any = await getConfig();

  return (
    <footer className="border-t border-[#8b7355]/10 mt-32 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">

        {/* Title */}
        <h3 className="font-serif text-2xl mb-4 opacity-90">
          {config?.site?.title || "Kelas Pekerja"}
        </h3>

        {/* Description */}
        <p className="text-sm opacity-60 max-w-md mx-auto mb-8">
          {config?.site?.description ||
            "Catatan tentang malam, kopi, dan kehidupan."}
        </p>

        {/* Navigation */}
        <div className="flex justify-center gap-6 text-sm opacity-70 mb-10">
          <Link href="/" className="hover:opacity-100 transition">
            Beranda
          </Link>

          <Link href="/buku" className="hover:opacity-100 transition">
            Buku
          </Link>

          <Link href="/tulisan" className="hover:opacity-100 transition">
            Tulisan
          </Link>

          <Link href="/tentang" className="hover:opacity-100 transition">
            Tentang
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-xs opacity-40">
          © {new Date().getFullYear()} Kelas Pekerja
        </div>

      </div>
    </footer>
  );
}
