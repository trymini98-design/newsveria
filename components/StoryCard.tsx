import Link from "next/link";
import type { Article } from "@/lib/types";
import { formatDate } from "@/lib/store";

export default function StoryCard({ article }: { article: Article }) {
  return (
    <article className="card">
      <Link href={`/news/${article.slug}`} aria-label={article.headline}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={article.image.src} alt={article.image.alt} loading="lazy" />
      </Link>
      <div className="pad">
        <span className={article.breaking ? "kicker breaking" : "kicker"}>
          {article.breaking ? "Breaking · " : ""}
          {article.category}
        </span>
        <h3>
          <Link href={`/news/${article.slug}`}>{article.headline}</Link>
        </h3>
        <p>{article.summary}</p>
        <span className="meta">
          {article.author} · {formatDate(article.publishedAt)}
        </span>
      </div>
    </article>
  );
}
