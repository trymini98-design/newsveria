import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact NewsVeria",
  description: "How to reach the NewsVeria newsroom: tips, corrections and advertising.",
};

export default function ContactPage() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  return (
    <div className="prose">
      <h1>Contact the newsroom</h1>
      <h2>News tips &amp; corrections</h2>
      <p>
        Spotted an error, or have a verifiable news tip?{" "}
        {email ? (
          <>
            Email <a href={`mailto:${email}`}>{email}</a> with the article link and the detail you
            want checked. Credible correction requests are reviewed and answered.
          </>
        ) : (
          <>
            Our newsroom inbox is being set up and the address will be published on this page before
            launch. Every published story lists its sources publicly, so readers can always check our
            reporting directly in the meantime.
          </>
        )}
      </p>
      <h2>Advertising</h2>
      <p>
        {email ? (
          <>
            Email <a href={`mailto:${email}`}>{email}</a> with “Advertising” in the subject line.
          </>
        ) : (
          <>Advertising enquiries will open at the same address once the newsroom inbox is live.</>
        )}
      </p>
      <h2>Response times</h2>
      <p>We read everything but cannot reply to every message. Corrections and safety issues are prioritised.</p>
    </div>
  );
}
