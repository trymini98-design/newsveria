import Link from "next/link";
import StoryCard from "@/components/StoryCard";
import AdSlot from "@/components/AdSlot";
import { articles, activeCategories, byCategory, formatDate } from "@/lib/store";
import { categorySlug } from "@/lib/types";

export const dynamic = "force-static";

export default function HomePage() {
  if (articles.length === 0) {
    return (
      <>
        <div className="empty" style={{ marginTop: 20 }}>
          <h1 style={{ fontFamily: "Georgia, serif", marginTop: 0 }}>NewsVeria is preparing its first edition</h1>
          <p>
            Our newsroom publishes only stories that pass a documented verification check against primary
            and independent sources. The first verified stories will appear here shortly — we would rather
            be accurate than first with something unproven.
          </p>
          <p>
            Read <Link href="/editorial-policy">how we verify</Link> and{" "}
            <Link href="/about">what NewsVeria is</Link>.
          </p>
        </div>
      </>
    );
  }

  const lead = articles.find((a) => a.editorPick) ?? articles[0];
  const side = articles.filter((a) => a.id !== lead.id).slice(0, 3);
  const latest = articles.filter((a) => a.id !== lead.id && !side.includes(a)).slice(0, 9);
  const topStories = articles.slice(0, 6);
  const cats = activeCategories();

  return (
    <>
      <section className="lead" aria-label="Lead story">
        <div className="lead-main">
          <Link href={`/news/${lead.slug}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={lead.image.src} alt={lead.image.alt} />
          </Link>
          <span className={lead.breaking ? "kicker breaking" : "kicker"}>
            {lead.breaking ? "Breaking · " : ""}
            {lead.category}
          </span>
          <h1>
            <Link href={`/news/${lead.slug}`} style={{ color: "inherit" }}>
              {lead.headline}
            </Link>
          </h1>
          <p style={{ color: "var(--ink-soft)", fontSize: 18 }}>{lead.summary}</p>
          <span className="meta">
            {lead.author} · {formatDate(lead.publishedAt)}
          </span>
        </div>
        <div className="lead-side">
          {side.map((a) => (
            <StoryCard key={a.id} article={a} />
          ))}
        </div>
      </section>

      <AdSlot placement="banner" />

      {latest.length > 0 && (
        <>
          <h2 className="section-title">Latest verified news</h2>
          <div className="grid">
            {latest.map((a) => (
              <StoryCard key={a.id} article={a} />
            ))}
          </div>
        </>
      )}

      <div className="two-col" style={{ marginTop: 8 }}>
        <div>
          {cats.map((c) => {
            const items = byCategory(c).slice(0, 3);
            if (items.length === 0) return null;
            return (
              <section key={c} aria-label={c}>
                <h2 className="section-title">
                  <Link href={`/category/${categorySlug(c)}`} style={{ color: "inherit" }}>
                    {c}
                  </Link>
                </h2>
                <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
                  {items.map((a) => (
                    <StoryCard key={a.id} article={a} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
        <aside>
          <h2 className="section-title">Top stories</h2>
          <ol className="list-plain">
            {topStories.map((a) => (
              <li key={a.id}>
                <Link href={`/news/${a.slug}`} style={{ color: "var(--ink)", fontWeight: 600 }}>
                  {a.headline}
                </Link>
                <div className="meta">
                  {a.category} · {formatDate(a.publishedAt)}
                </div>
              </li>
            ))}
          </ol>
          <div style={{ marginTop: 20 }}>
            <AdSlot placement="sidebar" />
          </div>
        </aside>
      </div>
    </>
  );
}
