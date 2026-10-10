/**
 * AdSlot renders an advertising placement ONLY when Maria has supplied an
 * approved Adsterra code through environment configuration. Until then it
 * renders nothing at all (no placeholder boxes on the live site).
 */
export default function AdSlot({ placement }: { placement: "banner" | "inarticle" | "sidebar" }) {
  const code =
    placement === "banner"
      ? process.env.NEXT_PUBLIC_ADSTERRA_BANNER_CODE
      : placement === "inarticle"
        ? process.env.NEXT_PUBLIC_ADSTERRA_INARTICLE_CODE
        : process.env.NEXT_PUBLIC_ADSTERRA_SIDEBAR_CODE;
  if (!code) return null;
  return <div className="adslot" aria-label="Advertisement" dangerouslySetInnerHTML={{ __html: code }} />;
}
