import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import { blogPosts } from "@/data/blogPosts";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return {
      title: "Blog Post Not Found | Yarn & Hook Studio",
    };
  }

  return {
    title: `${post.title} | Yarn & Hook Studio`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fffaf3] text-[#3b2f2f]">
      <Navbar />

      <article className="mx-auto max-w-3xl px-6 py-20">
        <Link
          href="/#blog"
          className="text-sm font-semibold text-[#7b4f35] hover:underline"
        >
          ← Back to Blog
        </Link>

        <p className="mt-10 text-sm font-medium text-[#a67c52]">
          {post.date}
        </p>

        <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
          {post.title}
        </h1>

        <p className="mt-6 text-lg leading-8 text-[#6b5a50]">
          {post.excerpt}
        </p>

        <div className="mt-10 rounded-3xl border border-[#ead8c7] bg-white p-8 shadow-sm">
          <p className="leading-8 text-[#6b5a50]">{post.content}</p>
        </div>
      </article>
    </main>
  );
}