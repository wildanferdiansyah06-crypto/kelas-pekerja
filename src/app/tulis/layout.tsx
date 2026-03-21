import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tulis Cerita — Kelas Pekerja",
  description: "Gak semua hal harus dipendam sendiri. Tulis ceritamu di sini.",
};

export default function TulisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
