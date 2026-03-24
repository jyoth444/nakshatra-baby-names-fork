import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, Tag, ChevronRight } from "lucide-react";
import { BLOG_POSTS, getBlogPostBySlug } from "@/lib/blogData";
import AdSlot from "@/components/shared/AdSlot";
import EmailCapture from "@/components/shared/EmailCapture";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Nakshatra Names Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
    alternates: { canonical: `https://nakshatranames.com/blog/${params.slug}` },
  };
}

// Simple markdown-like renderer for the content
function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      elements.push(<br key={key++} />);
    } else if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="mt-8 mb-4 text-2xl font-bold text-gray-900">
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={key++} className="mt-6 mb-3 text-xl font-semibold text-gray-800">
          {trimmed.slice(4)}
        </h3>
      );
    } else if (trimmed.startsWith("- **")) {
      const match = trimmed.match(/^- \*\*(.+?)\*\* – (.+)$/);
      if (match) {
        elements.push(
          <li key={key++} className="my-1 text-gray-700">
            <strong className="text-gray-900">{match[1]}</strong> – {match[2]}
          </li>
        );
      } else {
        elements.push(<li key={key++} className="my-1 text-gray-700">{trimmed.slice(2)}</li>);
      }
    } else if (trimmed.startsWith("- ")) {
      elements.push(
        <li key={key++} className="my-1 text-gray-700">
          {trimmed.slice(2)}
        </li>
      );
    } else if (/^\d+\./.test(trimmed)) {
      elements.push(
        <li key={key++} className="my-1 text-gray-700">
          {trimmed.replace(/^\d+\.\s*/, "")}
        </li>
      );
    } else if (trimmed.startsWith("**")) {
      const text = trimmed.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      elements.push(
        <p
          key={key++}
          className="my-3 text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      );
    } else {
      const text = trimmed.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      elements.push(
        <p
          key={key++}
          className="my-3 text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      );
    }
  }

  return elements;
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== params.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-500 flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" />
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/blog" className="hover:text-orange-500">Blog</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gray-900 truncate max-w-[200px]">{post.title}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Article Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1 text-sm font-medium text-orange-700">
              <Tag className="h-3.5 w-3.5" />
              {post.category}
            </span>
            <span className="text-sm text-gray-400 flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl leading-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-xl text-gray-500 leading-relaxed">{post.description}</p>
          <time className="mt-4 block text-sm text-gray-400">
            Published{" "}
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </header>

        {/* Article Content */}
        <article className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="prose-like">{renderContent(post.content)}</div>
        </article>

        {/* Ad slot — after article */}
        <div className="mt-8">
          <AdSlot format="horizontal" slot="3456789012" />
        </div>

        {/* Email capture */}
        <div className="mt-8">
          <EmailCapture variant="banner" />
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 p-8 text-white text-center">
          <h2 className="text-2xl font-bold">Find the Perfect Name for Your Baby</h2>
          <p className="mt-2 text-orange-100">
            Browse 10,000+ Indian baby names by Nakshatra, letter, or meaning
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/search"
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-orange-600 hover:bg-orange-50 transition-colors"
            >
              Search Names
            </Link>
            <Link
              href="/nakshatra/ashwini"
              className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
            >
              Browse by Nakshatra
            </Link>
          </div>
        </div>

        {/* Other Posts */}
        {otherPosts.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">More Articles</h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {otherPosts.map((other) => (
                <Link
                  key={other.slug}
                  href={`/blog/${other.slug}`}
                  className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:border-orange-200 hover:shadow-md transition-all"
                >
                  <span className="text-xs font-medium text-orange-600">{other.category}</span>
                  <h3 className="mt-2 text-sm font-semibold text-gray-900 group-hover:text-orange-600 transition-colors leading-snug">
                    {other.title}
                  </h3>
                  <p className="mt-2 text-xs text-gray-400">{other.readTime}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
