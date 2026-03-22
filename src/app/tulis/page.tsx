"use client";

import Link from "next/link";
import { ArrowLeft, PenLine, Send, Coffee, CheckCircle, Loader2, FileUp, X } from "lucide-react";
import { useState, useRef } from "react";

export default function TulisPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedTypes = [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
    'application/msword', // doc
    'text/plain', // txt
    'application/pdf', // pdf
    'image/jpeg', // jpg
    'image/png', // png
    'image/jpg'
  ];

  const allowedExtensions = ['.docx', '.doc', '.txt', '.pdf', '.jpg', '.jpeg', '.png'];

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles: File[] = [];
    const invalidFiles: string[] = [];

    selectedFiles.forEach(file => {
      const isValidType = allowedTypes.includes(file.type);
      const hasValidExt = allowedExtensions.some(ext => 
        file.name.toLowerCase().endsWith(ext)
      );
      
      if (isValidType || hasValidExt) {
        // Check file size (max 25MB buat Discord)
        if (file.size <= 25 * 1024 * 1024) {
          validFiles.push(file);
        } else {
          invalidFiles.push(`${file.name} (terlalu besar, max 25MB)`);
        }
      } else {
        invalidFiles.push(`${file.name} (format tidak didukung)`);
      }
    });

    if (invalidFiles.length > 0) {
      setError(`File tidak valid: ${invalidFiles.join(', ')}`);
      setTimeout(() => setError(""), 5000);
    }

    setFiles(prev => [...prev, ...validFiles]);
    
    // Reset input biar bisa pilih file yang sama lagi
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  function removeFile(index: number) {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    
    // Append files ke FormData
    files.forEach((file, index) => {
      formData.append(`file-${index}`, file);
    });
    
    // Tambah jumlah file buat info di server
    formData.append('fileCount', files.length.toString());

    try {
      const response = await fetch("/api/submit-story", {
        method: "POST",
        body: formData, // Jangan set Content-Type header biar browser yang handle multipart boundary
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal mengirim");
      }

      setIsSuccess(true);
      setFiles([]);
      e.currentTarget.reset();

    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Success State
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#0f0e0c] text-[#e8e0d5]">
        <header className="px-6 py-6 border-b border-[#8b7355]/10">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-sm text-[#8b7355] hover:text-[#e8e0d5] transition-colors"
            >
              <ArrowLeft size={16} />
              Kembali
            </Link>
            
            <div className="flex items-center gap-2">
              <Coffee size={18} className="text-[#8b7355]" />
              <span className="font-serif text-lg">Kelas Pekerja</span>
            </div>
          </div>
        </header>

        <main className="px-6 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-6 text-[#8b7355]" />
            
            <h1 className="font-serif text-3xl mb-6 text-[#f5f0e8]">
              Ceritamu Sudah Sampai
            </h1>

            <p className="text-[#a09080] leading-relaxed mb-10">
              Mungkin gak semua orang akan mengerti,  
              <br />
              tapi di sini… ada yang mau membaca.
              <br /><br />
              Terima kasih sudah berbagi.
            </p>

            <div className="flex flex-col items-center gap-4">
              <Link
                href="/buku"
                className="inline-flex items-center justify-center px-6 py-3 
                  bg-[#8b7355] text-[#0f0e0c] rounded-full
                  hover:bg-[#a08060] transition-all duration-300 text-sm"
              >
                Baca Cerita
              </Link>

              <button
                onClick={() => setIsSuccess(false)}
                className="text-[#8b7355] hover:text-[#e8e0d5] transition-colors text-sm underline underline-offset-4"
              >
                Tulis cerita lain
              </button>
            </div>

            <p className="text-xs text-[#6b5a45] mt-10">
              Cerita terpilih akan dipublikasikan di Kelas Pekerja.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0e0c] text-[#e8e0d5]">
      {/* Header */}
      <header className="px-6 py-6 border-b border-[#8b7355]/10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#8b7355] hover:text-[#e8e0d5] transition-colors"
          >
            <ArrowLeft size={16} />
            Kembali
          </Link>
          
          <div className="flex items-center gap-2">
            <Coffee size={18} className="text-[#8b7355]" />
            <span className="font-serif text-lg">Kelas Pekerja</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          {/* Intro */}
          <div className="text-center mb-12">
            <PenLine className="w-12 h-12 mx-auto mb-6 text-[#8b7355] opacity-80" />
            
            <h1 className="font-serif text-3xl md:text-4xl mb-4 text-[#f5f0e8]">
              Tulis Ceritamu
            </h1>
            
            <p className="text-[#a09080] leading-relaxed">
              Gak perlu sempurna. Gak perlu panjang. 
              <br />
              Yang penting, jujur.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-900/20 border border-red-800/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Judul */}
            <div>
              <label 
                htmlFor="title" 
                className="block text-[10px] tracking-[0.2em] uppercase text-[#8b7355] mb-2"
              >
                Judul Cerita *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                placeholder="Misal: 'Malam di Sudut Kedai'"
                className="w-full bg-[#1a1816] border border-[#8b7355]/20 rounded-lg px-4 py-3 
                  text-[#e8e0d5] placeholder-[#6b5a45]
                  focus:border-[#8b7355]/50 focus:outline-none transition-colors"
              />
            </div>

            {/* Nama */}
            <div>
              <label 
                htmlFor="author" 
                className="block text-[10px] tracking-[0.2em] uppercase text-[#8b7355] mb-2"
              >
                Nama Kamu (Boleh Samaran)
              </label>
              <input
                type="text"
                id="author"
                name="author"
                placeholder="Bisa nama asli atau inisial"
                className="w-full bg-[#1a1816] border border-[#8b7355]/20 rounded-lg px-4 py-3 
                  text-[#e8e0d5] placeholder-[#6b5a45]
                  focus:border-[#8b7355]/50 focus:outline-none transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-[10px] tracking-[0.2em] uppercase text-[#8b7355] mb-2"
              >
                Email (Opsional, untuk update)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email@kamu.com"
                className="w-full bg-[#1a1816] border border-[#8b7355]/20 rounded-lg px-4 py-3 
                  text-[#e8e0d5] placeholder-[#6b5a45]
                  focus:border-[#8b7355]/50 focus:outline-none transition-colors"
              />
            </div>

            {/* Kategori */}
            <div>
              <label 
                htmlFor="category" 
                className="block text-[10px] tracking-[0.2em] uppercase text-[#8b7355] mb-2"
              >
                Tema Cerita
              </label>
              <select
                id="category"
                name="category"
                className="w-full bg-[#1a1816] border border-[#8b7355]/20 rounded-lg px-4 py-3 
                  text-[#e8e0d5] focus:border-[#8b7355]/50 focus:outline-none transition-colors
                  appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238b7355'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1rem',
                }}
              >
                <option value="">Pilih tema...</option>
                <option value="kehidupan">Kehidupan</option>
                <option value="kerja">Kerja</option>
                <option value="malam">Malam</option>
                <option value="kopi">Kopi</option>
                <option value="proses">Proses</option>
                <option value="lainnya">Lainnya</option>
              </select>
            </div>

            {/* File Upload */}
            <div>
              <label 
                htmlFor="files" 
                className="block text-[10px] tracking-[0.2em] uppercase text-[#8b7355] mb-2"
              >
                Lampiran (Opsional)
              </label>
              
              {/* Drop Zone */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-[#1a1816] border-2 border-dashed border-[#8b7355]/30 rounded-lg px-4 py-8 
                  text-center cursor-pointer hover:border-[#8b7355]/60 hover:bg-[#1a1816]/80 transition-all"
              >
                <FileUp className="w-8 h-8 mx-auto mb-3 text-[#8b7355]" />
                <p className="text-sm text-[#e8e0d5] mb-1">
                  Klik atau drag & drop file di sini
                </p>
                <p className="text-xs text-[#6b5a45]">
                  DOCX, TXT, PDF, JPG, PNG (Max 25MB per file)
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                id="files"
                name="files"
                multiple
                accept=".docx,.doc,.txt,.pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* File List */}
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between bg-[#1a1816] border border-[#8b7355]/20 rounded-lg px-4 py-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 bg-[#8b7355]/20 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-xs text-[#8b7355] font-medium uppercase">
                            {file.name.split('.').pop()?.slice(0, 3)}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm text-[#e8e0d5] truncate">{file.name}</p>
                          <p className="text-xs text-[#6b5a45]">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="p-1 hover:bg-[#8b7355]/20 rounded transition-colors flex-shrink-0"
                      >
                        <X size={16} className="text-[#8b7355]" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cerita */}
            <div>
              <label 
                htmlFor="content" 
                className="block text-[10px] tracking-[0.2em] uppercase text-[#8b7355] mb-2"
              >
                Ceritamu *
              </label>
              <textarea
                id="content"
                name="content"
                required
                rows={10}
                placeholder="Tulis apa yang kamu rasakan. Tidak ada yang salah di sini..."
                className="w-full bg-[#1a1816] border border-[#8b7355]/20 rounded-lg px-4 py-3 
                  text-[#e8e0d5] placeholder-[#6b5a45] leading-relaxed
                  focus:border-[#8b7355]/50 focus:outline-none transition-colors resize-none"
              />
              <p className="text-xs text-[#6b5a45] mt-2">
                Bisa pendek, bisa panjang. Bebas.
              </p>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 
                  bg-[#8b7355] text-[#0f0e0c] rounded-full
                  hover:bg-[#a08060] transition-all duration-300 
                  text-sm tracking-wider font-medium
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Kirim Cerita
                  </>
                )}
              </button>
              
              <p className="text-xs text-[#6b5a45] text-center mt-4">
                Ceritamu akan direview dulu sebelum dipublikasikan.
              </p>
            </div>
          </form>

          {/* Note */}
          <div className="mt-16 pt-8 border-t border-[#8b7355]/10">
            <p className="text-sm text-[#8b7355] text-center leading-relaxed">
              &ldquo;Gak semua orang kuat. Tapi banyak yang tetap jalan. 
              Dan mungkin, dengan menulis, kita bisa jalan bareng.&rdquo;
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
