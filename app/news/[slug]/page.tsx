import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import { articles, canonical, formatDateTime, getArticle, related, site } from "@/lib/store";
import { categorySlug } from "@/lib/types";

export const dynamic = "force-static";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  const url = canonical(`/news/${a.slug}`);
  return {
    title: a.headline,
    description: a.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: a.headline,
      description: a.summary,
      url,
      images: [{ url: a.image.src, alt: a.image.alt }],
      publishedTime: a.publishedAt,
      modifiedTime: a.updatedAt ?? a.publishedAt,
      section: a.category,
      tags: a.tags,
    },
    twitter: { card: "summary_large_image", title: a.socialHeadline, description: a.summary },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const rel = related(a);
  const url = canonical(`/news/${a.slug}`);
  const shareText = encodeURIComponent(a.socialHeadline);
  const shareUrl = encodeURIComponent(url);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: a.headline,
    description: a.summary,
    image: [a.image.src],
    datePublished: a.publishedAt,
    dateModified: a.updatedAt ?? a.publishedAt,
    author: { "@type": "Organization", name: a.author, url: site.url },
    publisher: { "@type": "NewsMediaOrganization", name: "NewsVeria", url: site.url },
    mainEntityOfPage: url,
    articleSection: a.category,
    keywords: a.tags.join(", "),
  };

  return (
    <article className="story">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <span className={a.breaking ? "kicker breaking" : "kicker"}>
        {a.breaking ? "Breaking · " : ""}
        <Link href={`/category/${categorySlug(a.category)}`} style={{ color: "inherit" }}>
          {a.category}
        </Link>
      </span>
      <h1>{a.headline}</h1>
      <p className="standfirst">{a.summary}</p>
      <div className="byline">
        <span>
          By <strong>{a.author}</strong>
        </span>
        <span>Published {formatDateTime(a.publishedAt)}</span>
        {a.updatedAt && <span>Updated {formatDateTime(a.updatedAt)}</span>}
      </div>

      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={a.image.src} alt={a.image.alt} />
        {a.image.caption && (
          <figcaption>
            {a.image.caption} <span>({a.image.credit})</span>
          </figcaption>
        )}
      </figure>

      <div className="body">
        {a.body.map((para, i) =>
          para.startsWith("## ") ? (
            <h2 key={i}>{para.slice(3)}</h2>
          ) : (
            <p key={i}>{para}</p>
          ),
        )}
      </div>

      <AdSlot placement="inarticle" />

      <div className="tags" aria-label="Tags">
        {a.tags.map((t) => (
          <span key={t}>#{t}</span>
        ))}
      </div>

      <div className="share" aria-label="Share this story">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Share on Facebook
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Share on X
        </a>
        <a
          href={`https://pinterest.com/pin/create/button/?url=${shareUrl}&description=${shareText}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Pin it
        </a>
        <a href={`mailto:?subject=${shareText}&body=${shareUrl}`}>Email</a>
      </div>

      <section className="sources" aria-label="Sources and verification">
        <h2>Sources &amp; verification</h2>
        <p>
          This story was checked against the sources below before publication. Primary sources are
          listed first; independent reporting is used to corroborate, never to copy.
        </p>
        <ul>
          {a.sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.name}
              </a>{" "}
              <span className="meta">({s.role})</span>
            </li>
          ))}
        </ul>
        <p className="meta">
          Verification completed {formatDateTime(a.verification.checkedAt)} · Status: verified for
          publication under the NewsVeria <Link href="/editorial-policy">editorial policy</Link>.
        </p>
      </section>

      {rel.length > 0 && (
        <>
          <h2 className="section-title">Related stories</h2>
          <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
            {rel.map((r) => (
              <article className="card" key={r.id}>
                <div className="pad">
                  <span className="kicker">{r.category}</span>
                  <h3>
                    <Link href={`/news/${r.slug}`}>{r.headline}</Link>
                  </h3>
                  <p>{r.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </article>
  );
}
