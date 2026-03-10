import Link from 'next/link';
import { Coffee, Heart, Instagram, Mail, MessageCircle } from 'lucide-react';
import { getConfig } from '@/src/lib/api';

export default async function Footer() {
  const config = await getConfig();

  return (
    <footer className="border-t border-[#8b7355]/10 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Main Footer Content */}
        <div className="text-center mb-12">
          <h3 className="font-serif text-2xl mb-4 opacity-90">
            {config.site.title}
          </h3>
          <p className="text-sm opacity-60 max-w-md mx-auto mb-6">
            {config.site.description}
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            {config.author.social.instagram && (
              <a
                href={`https://instagram.com/${config.author.social.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-[#8b7355]/20 
                         hover:bg-[#8b7355]/10 transition-all opacity-60 hover:opacity-100"
              >
                <Instagram size={18} />
              </a>
            )}
            {config.author.social.whatsapp && (
              <a
                href={`https://wa.me/${config.author.social.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-[#8b7355]/20 
                         hover:bg-[#8b7355]/10 transition-all opacity-60 hover:opacity-100"
              >
                <MessageCircle size={18} />
              </a>
            )}
            {config.author.social.email && (
              <a
                href={`mailto:${config.author.social.email}`}
                className="p-3 rounded-full border border-[#8b7355]/20 
                         hover:bg-[#8b7355]/10 transition-all opacity-60 hover:opacity-100"
              >
                <Mail size={18} />
              </a>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 text-xs tracking-wider opacity-40">
          <Link href="/" className="hover:opacity-100 transition-opacity">Beranda</Link>
          <Link href="/buku" className="hover:opacity-100 transition-opacity">Buku</Link>
          <Link href="/tentang" className="hover:opacity-100 transition-opacity">Tentang</Link>
          <Link href="/kontak" className="hover:opacity-100 transition-opacity">Kontak</Link>
          <Link href="/simpanan" className="hover:opacity-100 transition-opacity">Simpanan</Link>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#8b7355]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-40">
          <div className="flex items-center gap-2">
            <span>© 2026 {config.author.name}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Dibuat dengan <Coffee size={12} /> dan <Heart size={12} className="text-red-400" />
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/privasi" className="hover:opacity-100 transition-opacity">Privasi</Link>
            <Link href="/syarat" className="hover:opacity-100 transition-opacity">Syarat</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
