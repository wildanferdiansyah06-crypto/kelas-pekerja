import postsData from "@/public/data/posts.json";

export default function TulisanDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = postsData.posts?.find((p: any) => p.slug === params.slug);

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
