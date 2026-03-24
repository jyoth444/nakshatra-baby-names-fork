import type { MetadataRoute } from "next";
import { NAKSHATRA_DATA } from "@/lib/nakshatraData";
import { getAllResultIds } from "@/utils/astrology";
import { allNames, getAllStartingLetters } from "@/lib/nameUtils";
import { BLOG_POSTS } from "@/lib/blogData";

const BASE_URL = "https://nakshatranames.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // ── Static core pages ──────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/calculate-nakshatra`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/search`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  // ── Blog posts ─────────────────────────────────────────────────────────────
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // ── Nakshatra pages (27) ───────────────────────────────────────────────────
  const nakshatraPages: MetadataRoute.Sitemap = NAKSHATRA_DATA.map((n) => ({
    url: `${BASE_URL}/nakshatra/${n.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // ── Result pages (108: 27 nakshatras × 4 padas) ───────────────────────────
  const resultPages: MetadataRoute.Sitemap = getAllResultIds().map(({ id }) => ({
    url: `${BASE_URL}/result/${id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // ── Letter pages ──────────────────────────────────────────────────────────
  const letterPages: MetadataRoute.Sitemap = getAllStartingLetters().map((letter) => ({
    url: `${BASE_URL}/names/${letter.toLowerCase()}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  // ── Individual name pages (up to 9844) ────────────────────────────────────
  // Batch into chunks for performance — sitemap spec allows 50,000 URLs
  const namePages: MetadataRoute.Sitemap = allNames.map((name) => ({
    url: `${BASE_URL}/name/${name.name.toLowerCase()}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...blogPages,
    ...nakshatraPages,
    ...resultPages,
    ...letterPages,
    ...namePages,
  ];
}
