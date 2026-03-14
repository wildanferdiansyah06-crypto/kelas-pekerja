import Link from "next/link";
import { getConfig } from "@/src/lib/api";

export default async function Footer() {
  let config: any = {};

  try {
    config = await getConfig();
  } catch (error) {
    console.error("Failed to load config:", error);
  }

  return (
    <footer className="border-t border-[#8b7355]/10 mt-32 py-16 px-6 bg-[#faf8f5] dark:bg-[#1a1816] transition-colors duration-500">
      <div className="max-w-4xl mx-auto text-center">

        {/* Title */}
        <h3 className="font-serif text-2xl mb-4 text-[#8b7355] opacity-90">
          {config?.site?.title || "Kelas Pekerja"}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#6b5a45] dark:text-[#bfae9c] max-w-md mx-auto mb-8 leading-relaxed">
          {config?.site?.description ||
            "Catatan tentang malam, kopi, dan kehidupan."}
        </p>

        {/* Navigation */}
        <div className="flex justify-center gap-6 text-sm text-[#4a3f35] dark:text-[#cbb8a5] mb-10">
          <Link href="/" className="hover:text-[#8b7355] transition-colors duration-200">
            Beranda
          </Link>

          <Link href="/buku" className="hover:text-[#8b7355] transition-colors duration-200">
            Buku
          </Link>

          <Link href="/tulisan" className="hover:text-[#8b7355] transition-colors duration-200">
            Tulisan
          </Link>

          <Link href="/tentang" className="hover:text-[#8b7355] transition-colors duration-200">
            Tentang
          </Link>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-sm text-[#6b5a45] dark:text-[#bfae9c] mb-10">

          <a
            href="https://wa.me/6289636357091"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#25D366] transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
            </svg>
            <span>0896-3635-7091</span>
          </a>

          <a
            href="mailto:wildanferdiansyah06@gmail.com"
            className="flex items-center gap-2 hover:text-[#EA4335] transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>wildanferdiansyah06@gmail.com</span>
          </a>

          <a
            href="https://instagram.com/_iamwildan_"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#E4405F] transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07..." />
            </svg>
            <span>@_iamwildan_</span>
          </a>

        </div>

        {/* Copyright */}
        <div className="text-xs text-[#8b7355]/60 dark:text-[#bfae9c]/60">
          © {new Date().getFullYear()} Kelas Pekerja
        </div>

      </div>
    </footer>
  );
}
