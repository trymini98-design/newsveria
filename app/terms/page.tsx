import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms that govern reading and using NewsVeria.",
};

export default function TermsPage() {
  return (
    <div className="prose">
      <h1>Terms of use</h1>
      <p>Last updated: 10 October 2026</p>
      <h2>Reading NewsVeria</h2>
      <p>
        NewsVeria is provided free to read for personal, non-commercial use. We work hard to keep our
        reporting accurate, but news develops quickly and no story should be treated as professional
        advice (medical, legal, financial or otherwise).
      </p>
      <h2>Our content</h2>
      <p>
        Articles and original images on NewsVeria are our copyright unless credited otherwise. You may
        share links and short attributed excerpts. Republishing full articles or images without
        permission is not allowed. Facts and ideas themselves are free — write your own version.
      </p>
      <h2>Third-party material</h2>
      <p>
        We cite and link to sources; cited material belongs to its owners. Advertisements are the
        responsibility of the advertiser and are labelled as advertising.
      </p>
      <h2>Availability</h2>
      <p>
        We may update, correct or withdraw stories under our{" "}
        <a href="/corrections-policy">corrections policy</a>. The site is provided “as is” without
        warranties of uninterrupted availability.
      </p>
    </div>
  );
}
