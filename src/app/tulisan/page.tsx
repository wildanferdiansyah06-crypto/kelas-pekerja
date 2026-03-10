import postsData from "@/public/data/posts.json";

export default function TulisanPage() {
  const posts = postsData.posts || [];

  return (
    <main className="min-h-screen py-24 px-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Tulisan</h1>

        {posts.map((post: any) => (
          <article key={post.slug} className="border-b pb-6">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="opacity-70">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
