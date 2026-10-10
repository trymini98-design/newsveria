import type { Metadata } from "next";
import StoryCard from "@/components/StoryCard";
import { articles, canonical } from "@/lib/store";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ q?: string }> }): Promise<Metadata> {
  const sp = await searchParams;
  const q = sp.q ?? "";
  return {
    title: q ? `Search: ${q}` : "Search",
    description: "Search verified NewsVeria stories.",
    alternates: { canonical: canonical("/search") },
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim().toLowerCase();
  const results = q
    ? articles.filter(
        (a) =>
          a.headline.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)),
      )
    : [];

  return (
    <>
      <h1 style={{ fontFamily: "Georgia, serif", fontSize: 30 }}>Search NewsVeria</h1>
      <form className="searchbox" action="/search" method="get" role="search" style={{ margin: "14px 0 22px" }}>
        <input type="search" name="q" defaultValue={sp.q ?? ""} placeholder="Search verified news…" aria-label="Search news" />
        <button type="submit">Search</button>
      </form>
      {q === "" ? (
        <p className="meta">Type a keyword to search headlines, summaries, sections and tags.</p>
      ) : results.length === 0 ? (
        <div className="empty">
          <p>No verified stories match “{sp.q}” yet.</p>
        </div>
      ) : (
        <>
          <p className="meta">
            {results.length} {results.length === 1 ? "story" : "stories"} found
          </p>
          <div className="grid">
            {results.map((a) => (
              <StoryCard key={a.id} article={a} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
