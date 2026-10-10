import { readFileSync } from "fs";
import path from "path";
import type { Article, Category } from "./types";
import { categorySlug } from "./types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://newsveria.vercel.app";

export const site = {
  name: "NewsVeria",
  tagline: "Verified global news, clearly explained.",
  url: SITE_URL,
  description:
    "NewsVeria is an English-language global news publication. Every story we publish passes a documented fact-verification check against primary and independent sources.",
  author: "NewsVeria Newsroom",
};

export function canonical(pathname: string): string {
  return `${SITE_URL.replace(/\/$/, "")}${pathname}`;
}

function loadArticles(): Article[] {
  try {
    const raw = readFileSync(path.join(process.cwd(), "content", "articles.json"), "utf8");
    const parsed = JSON.parse(raw) as Article[];
    return parsed
      .filter((a) => a.status === "PUBLISHED" || a.status === "UPDATED")
      .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
  } catch {
    return [];
  }
}

export const articles: Article[] = loadArticles();

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function byCategory(category: Category): Article[] {
  return articles.filter((a) => a.category === category);
}

export function activeCategories(): Category[] {
  const used = new Set(articles.map((a) => a.category));
  return Array.from(used);
}

export function related(article: Article, count = 3): Article[] {
  return articles
    .filter((a) => a.id !== article.id)
    .sort((a, b) => {
      const sa = (a.category === article.category ? 2 : 0) + a.tags.filter((t) => article.tags.includes(t)).length;
      const sb = (b.category === article.category ? 2 : 0) + b.tags.filter((t) => article.tags.includes(t)).length;
      return sb - sa || +new Date(b.publishedAt) - +new Date(a.publishedAt);
    })
    .slice(0, count);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatDateTime(iso: string): string {
  return (
    new Date(iso).toLocaleString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    }) + " UTC"
  );
}

export { categorySlug };
