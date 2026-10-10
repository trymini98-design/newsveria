import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "About NewsVeria",
  description: "What NewsVeria is, who it is for, and how it works.",
};

export default function AboutPage() {
  return (
    <div className="prose">
      <h1>About NewsVeria</h1>
      <p>
        NewsVeria is an independent English-language news publication covering global trending stories
        for readers in the United States, United Kingdom, Canada, Australia and worldwide. Our name
        reflects our method: <strong>verification before publication</strong>.
      </p>
      <h2>What we do</h2>
      <p>
        We monitor official announcements, public agencies, company statements and reputable news
        wires around the clock. Every candidate story goes through a documented fact-check — primary
        source first, independent corroboration second — before an original NewsVeria report is
        written and published.
      </p>
      <h2>How we work</h2>
      <p>
        NewsVeria uses modern newsroom tooling, including AI-assisted research, drafting and image
        production, under human editorial standards. We never present AI confidence as proof, never
        copy another publisher's article, and never publish a story we cannot support with cited
        sources. Stories that cannot be verified to our standard are held or rejected — that is a
        feature, not a delay.
      </p>
      <h2>What we publish</h2>
      <p>
        World and US news, politics, business, technology and artificial intelligence, science,
        health, entertainment, sports, environment and lifestyle — opened section by section as
        verified coverage is available.
      </p>
      <h2>Corrections</h2>
      <p>
        If we get something wrong, we correct it openly. See our{" "}
        <a href="/corrections-policy">corrections policy</a> and the correction log on each affected
        story.
      </p>
    </div>
  );
}
