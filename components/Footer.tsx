import Link from "next/link";
import { activeCategories } from "@/lib/store";
import { categorySlug } from "@/lib/types";

export default function Footer() {
  const cats = activeCategories();
  return (
    <footer>
      <div className="wrap">
        <div className="cols">
          <div>
            <h4>NewsVeria</h4>
            <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>
              An English-language global news publication. Every story we publish passes a documented
              verification check against primary and independent sources before it appears here.
            </p>
          </div>
          <div>
            <h4>Sections</h4>
            <ul>
              {cats.length === 0 && <li>Sections appear as stories are published</li>}
              {cats.map((c) => (
                <li key={c}>
                  <Link href={`/category/${categorySlug(c)}`}>{c}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Trust &amp; policies</h4>
            <ul>
              <li><Link href="/about">About us</Link></li>
              <li><Link href="/editorial-policy">Editorial policy</Link></li>
              <li><Link href="/corrections-policy">Corrections policy</Link></li>
              <li><Link href="/privacy-policy">Privacy policy</Link></li>
              <li><Link href="/terms">Terms of use</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="fine">
          © {new Date().getFullYear()} NewsVeria. Stories are original reporting based on the sources
          cited in each article. AI-assisted production is disclosed in our editorial policy.
        </div>
      </div>
    </footer>
  );
}
