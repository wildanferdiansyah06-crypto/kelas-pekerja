import postsData from "@/public/data/posts.json";

export default function Page({ params }: any) {
  const slug = params.slug;

  const post = (postsData.posts as any[]).find(
    (p) => p.slug === slug
  );

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="opacity-60">Tulisan tidak ditemukan.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-24 px-6">
      <article className="max-w-2xl mx-auto prose">
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </article>
    </main>
  );
}
