import Link from "next/link";
import Navbar from "@/components/Navbar";
import { blogPosts } from "@/data/blogPosts";

export const metadata = {
  title: "Blog | Yarn & Hook Studio",
  description:
    "Read crochet care tips, handmade gift ideas, color guides, and Yarn & Hook Studio stories.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#fffaf3] text-[#3b2f2f]">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#a67c52]">
            Blog
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            Crochet stories, care tips, and gift ideas
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#6b5a50]">
            Simple guides and stories about handmade crochet care, custom
            orders, color choices, and cozy gifting ideas.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-3xl border border-[#ead8c7] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-sm font-medium text-[#a67c52]">
                {post.date}
              </p>

              <h2 className="mt-4 text-xl font-bold">{post.title}</h2>

              <p className="mt-3 leading-7 text-[#6b5a50]">{post.excerpt}</p>

              <Link
                href={`/blog/${post.slug}`}
                className="mt-5 inline-block text-sm font-semibold text-[#7b4f35] hover:underline"
              >
                Read More →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}