import Link from "next/link";
import LiveClock from "@/components/LiveClock";
import { activeCategories, articles, site } from "@/lib/store";
import { categorySlug } from "@/lib/types";

export default function Header() {
  const cats = activeCategories();
  const latest = articles.slice(0, 5);
  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <LiveClock />
          <span>{site.tagline}</span>
        </div>
      </div>
      <header className="masthead">
        <div className="wrap">
          <div>
            <Link href="/" className="wordmark" aria-label="NewsVeria home">
              News<span className="accent">Veria</span>
            </Link>
            <div className="tagline">{site.tagline}</div>
          </div>
          <form className="searchbox" action="/search" method="get" role="search">
            <input type="search" name="q" placeholder="Search verified news…" aria-label="Search news" />
            <button type="submit">Search</button>
          </form>
        </div>
      </header>
      <nav className="mainnav" aria-label="Sections">
        <div className="wrap">
          <Link href="/">Home</Link>
          {cats.map((c) => (
            <Link key={c} href={`/category/${categorySlug(c)}`}>
              {c}
            </Link>
          ))}
          <Link href="/about">About</Link>
          <Link href="/editorial-policy">Editorial Policy</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </nav>
      {latest.length > 0 && (
        <div className="ticker" aria-label="Latest verified stories">
          <div className="wrap">
            <span className="label">LATEST</span>
            {latest.map((a) => (
              <Link key={a.id} href={`/news/${a.slug}`}>
                {a.headline}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
