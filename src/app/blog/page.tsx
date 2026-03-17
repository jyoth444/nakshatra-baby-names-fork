import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Clock, ChevronRight, Tag } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blogData";

export const metadata: Metadata = {
  title: "Baby Name Blog | Nakshatra Names Guide",
  description: "Read our expert guides on Indian baby names, Nakshatra naming traditions, Sanskrit name meanings, and more. Comprehensive resources for new parents.",
  alternates: { canonical: "https://nakshatranames.com/blog" },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 border-b border-orange-100">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-6 w-6 text-orange-500" />
              <span className="text-sm font-medium text-orange-600">Baby Name Resources</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Baby Name Blog
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Expert guides on Indian baby names, Nakshatra traditions, and Vedic naming wisdom
            </p>
          </div>
        </div>
      </div>

      {/* Articles */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <article className="h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-orange-200 hover:shadow-lg hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700">
                    <Tag className="h-3 w-3" />
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm text-gray-500 leading-relaxed line-clamp-3">
                  {post.description}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <time className="text-xs text-gray-400">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span className="flex items-center gap-1 text-sm font-medium text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    Read more
                    <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
