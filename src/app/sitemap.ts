import { MetadataRoute } from "next";
import booksData from "@/public/data/books.json";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kelaspekerja.id";

  const staticPages = [
    "",
    "/buku",
    "/tentang",
    "/simpanan",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const bookPages = (booksData.books as any[]).map((book) => ({
    url: `${baseUrl}/buku/${book.slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...bookPages];
}
