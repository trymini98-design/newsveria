import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StoryCard from "@/components/StoryCard";
import { articles, byCategory, canonical } from "@/lib/store";
import { CATEGORIES, categoryFromSlug, categorySlug } from "@/lib/types";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: categorySlug(c) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = categoryFromSlug(slug);
  if (!cat) return {};
  return {
    title: `${cat} News`,
    description: `Verified ${cat.toLowerCase()} news from NewsVeria — checked against primary and independent sources before publication.`,
    alternates: { canonical: canonical(`/category/${slug}`) },
  };
}

const PER_PAGE = 12;

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const cat = categoryFromSlug(slug);
  if (!cat) notFound();
  const all = byCategory(cat);
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const items = all.slice(0, page * PER_PAGE);
  const hasMore = all.length > items.length;

  return (
    <>
      <nav aria-label="Breadcrumb" className="meta" style={{ marginTop: 6 }}>
        <a href="/">Home</a> › <span>{cat}</span>
      </nav>
      <h1 style={{ fontFamily: "Georgia, serif", fontSize: 32 }}>{cat} News</h1>
      {all.length === 0 ? (
        <div className="empty">
          <p>
            No verified {cat.toLowerCase()} stories have been published yet. This section opens as soon
            as coverage passes our verification checks.
          </p>
        </div>
      ) : (
        <>
          <div className="grid">
            {items.map((a) => (
              <StoryCard key={a.id} article={a} />
            ))}
          </div>
          {hasMore && (
            <div className="loadmore">
              <a className="btn" href={`/category/${slug}?page=${page + 1}`}>
                Load more stories
              </a>
            </div>
          )}
        </>
      )}
    </>
  );
}
