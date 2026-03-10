import postsData from "@/public/data/posts.json";

export async function generateStaticParams() {
  return (postsData.posts as any[]).map((post) => ({
    slug: post.slug,
  }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const post = (postsData.posts as any[]).find(
    (p) => p.slug === params.slug
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
