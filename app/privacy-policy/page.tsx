import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What data NewsVeria does and does not collect, and how advertising and analytics work.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="prose">
      <h1>Privacy policy</h1>
      <p>Last updated: 10 October 2026</p>
      <h2>What we collect</h2>
      <p>
        NewsVeria is a read-only news site. We do not operate user accounts, comment systems or
        newsletter sign-ups at this time, and we do not ask readers for personal information to read
        our stories.
      </p>
      <h2>Analytics</h2>
      <p>
        If analytics are enabled, we use them to understand aggregate readership (pages viewed,
        countries, referral sources). We do not sell personal data. Analytics are configured to avoid
        collecting unnecessary personal information.
      </p>
      <h2>Advertising</h2>
      <p>
        NewsVeria may display advertising supplied by third-party networks. Those networks may use
        cookies or similar technologies to serve and measure ads, subject to their own privacy
        policies. We never click our own ads or generate artificial impressions. You can control
        cookies in your browser settings; the site remains fully readable with cookies blocked.
      </p>
      <h2>External links</h2>
      <p>We link to primary sources and other sites. Their privacy practices are their own.</p>
      <h2>Contact</h2>
      <p>Questions about this policy: see our <a href="/contact">contact page</a>.</p>
    </div>
  );
}
