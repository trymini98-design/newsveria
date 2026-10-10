import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Editorial Policy",
  description: "How NewsVeria discovers, verifies and publishes news — and what we refuse to publish.",
};

export default function EditorialPolicyPage() {
  return (
    <div className="prose">
      <h1>Editorial policy</h1>
      <p>
        Accuracy and public trust come before speed, traffic and revenue at NewsVeria. This page
        explains the standards every published story must meet.
      </p>
      <h2>Verification before publication</h2>
      <ul>
        <li>We confirm the event or announcement actually happened, using the primary source (official release, agency, company statement, court record, dataset) wherever possible.</li>
        <li>We corroborate with independent, reputable reporting. Several sites repeating one unverified claim does not count as corroboration.</li>
        <li>We check chronology, names, numbers, quotations and locations, and whether a newer development has superseded the story.</li>
        <li>Confirmed facts, attributed claims, analysis and open questions are labelled as what they are inside each story.</li>
        <li>Every published article carries a public “Sources &amp; verification” section listing what we relied on.</li>
      </ul>
      <h2>What we will not publish</h2>
      <ul>
        <li>Unverified rumours, viral posts, fabricated quotes or speculative accusations.</li>
        <li>Copied or lightly rewritten articles from other publishers. Our reports are original writing built on cited facts.</li>
        <li>Stories involving unproven allegations, active emergencies, elections, legal accusations or high-impact health claims without reliable verification — these are held for review.</li>
        <li>Fake engagement signals of any kind: no invented view counts, comments or “live” statistics.</li>
      </ul>
      <h2>Images</h2>
      <p>
        Editorial images are generated illustrations or properly licensed material. Illustrative or
        AI-generated imagery is chosen to reflect the story's subject without pretending to be
        documentary photography of a real event, and is credited as such.
      </p>
      <h2>AI disclosure</h2>
      <p>
        AI tools assist our newsroom with research, drafting, editing and image production. Editorial
        decisions and factual responsibility rest with NewsVeria. We do not describe AI-assisted
        content as the work of a named human reporter, and we never invent reporters, interviews or
        eyewitnesses.
      </p>
      <h2>Updates and corrections</h2>
      <p>
        Developing stories are updated in place with an “Updated” timestamp rather than duplicated.
        Material errors are corrected under our <a href="/corrections-policy">corrections policy</a>.
      </p>
    </div>
  );
}
