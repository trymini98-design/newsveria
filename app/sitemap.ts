import type { MetadataRoute } from "next";
import { articles, activeCategories, site } from "@/lib/store";
import { categorySlug } from "@/lib/types";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const staticPages = ["", "/about", "/contact", "/editorial-policy", "/corrections-policy", "/privacy-policy", "/terms"];
  return [
    ...staticPages.map((p) => ({
      url: `${site.url}${p}`,
      lastModified: now,
      changeFrequency: (p === "" ? "hourly" : "monthly") as "hourly" | "monthly",
      priority: p === "" ? 1 : 0.5,
    })),
    ...activeCategories().map((c) => ({
      url: `${site.url}/category/${categorySlug(c)}`,
      lastModified: now,
      changeFrequency: "hourly" as const,
      priority: 0.7,
    })),
    ...articles.map((a) => ({
      url: `${site.url}/news/${a.slug}`,
      lastModified: a.updatedAt ?? a.publishedAt,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
  ];
}
