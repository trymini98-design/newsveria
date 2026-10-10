import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Corrections Policy",
  description: "How NewsVeria handles errors, updates and corrections.",
};

export default function CorrectionsPolicyPage() {
  return (
    <div className="prose">
      <h1>Corrections policy</h1>
      <p>
        Getting the facts right matters more to us than being first. When we make a mistake, we fix
        it transparently.
      </p>
      <h2>How corrections work</h2>
      <ul>
        <li><strong>Minor fixes</strong> (typos, formatting) are corrected silently.</li>
        <li><strong>Material errors</strong> (wrong name, figure, date, quote or claim) are corrected in the story, the story is marked “Updated”, and a correction note is added explaining what changed.</li>
        <li><strong>Serious errors</strong> that change a story's central claim will lead to the story being corrected prominently, replaced, or withdrawn with an explanation.</li>
      </ul>
      <h2>Report an error</h2>
      <p>
        Email the article link and what you believe is wrong via our <a href="/contact">contact page</a>.
        We review every credible correction request and reply to the sender.
      </p>
      <h2>Developing stories</h2>
      <p>
        Facts in a developing story can change. We update the original article and its timestamps
        rather than publishing a string of contradictory duplicates.
      </p>
    </div>
  );
}
