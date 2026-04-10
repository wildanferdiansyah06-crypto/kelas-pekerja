'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#faf8f5] dark:bg-[#1a1816]">
      <div className="text-center px-6">
        <h2 className="font-serif text-3xl md:text-4xl text-[#2c1810] dark:text-[#e8e0d5] mb-4">
          Tulisan Tidak Ditemukan
        </h2>
        <p className="text-[#8b7355] dark:text-[#a8a298] mb-8 max-w-md mx-auto">
          Maaf, tulisan yang Anda cari tidak dapat dimuat. Silakan coba lagi atau kembali ke daftar tulisan.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-[#8b7355] text-white rounded-lg hover:bg-[#6b5a45] transition-colors"
          >
            Coba Lagi
          </button>
          <Link
            href="/tulisan"
            className="px-6 py-3 border border-[#8b7355] text-[#8b7355] dark:text-[#c7b299] dark:border-[#c7b299] rounded-lg hover:bg-[#8b7355]/10 transition-colors"
          >
            Lihat Semua Tulisan
          </Link>
        </div>
      </div>
    </div>
  )
}
