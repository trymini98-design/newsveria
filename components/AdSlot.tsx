"use client";

/**
 * AdSlot renders an advertising placement ONLY when Maria has supplied an
 * approved Adsterra code through environment configuration. Until then it
 * renders nothing at all (no placeholder boxes on the live site).
 *
 * Adsterra codes are script pairs (an `atOptions` inline script + an
 * invoke.js loader). Scripts injected via innerHTML never execute, so the
 * stored snippet is parsed and its scripts are re-created as real DOM
 * script elements, which do run.
 */
import { useEffect, useRef } from "react";

export default function AdSlot({ placement }: { placement: "banner" | "inarticle" | "sidebar" }) {
  const code =
    placement === "banner"
      ? process.env.NEXT_PUBLIC_ADSTERRA_BANNER_CODE
      : placement === "inarticle"
        ? process.env.NEXT_PUBLIC_ADSTERRA_INARTICLE_CODE
        : process.env.NEXT_PUBLIC_ADSTERRA_SIDEBAR_CODE;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!code || !ref.current) return;
    const container = ref.current;
    container.innerHTML = "";

    const keyMatch = code.match(/'key'\s*:\s*'([^']+)'/);
    const srcMatch = code.match(/src=["'](https:[^"']*invoke\.js)["']/);
    const heightMatch = code.match(/'height'\s*:\s*(\d+)/);
    const widthMatch = code.match(/'width'\s*:\s*(\d+)/);

    if (keyMatch && srcMatch) {
      const height = heightMatch ? parseInt(heightMatch[1], 10) : 90;
      const width = widthMatch ? parseInt(widthMatch[1], 10) : 728;
      const opts = document.createElement("script");
      opts.text = `atOptions = {'key':'${keyMatch[1]}','format':'iframe','height':${height},'width':${width},'params':{}};`;
      container.appendChild(opts);
      const loader = document.createElement("script");
      loader.src = srcMatch[1];
      loader.async = true;
      container.appendChild(loader);
    } else {
      // Unknown snippet shape: re-create any script tags so they execute.
      const tpl = document.createElement("template");
      tpl.innerHTML = code;
      tpl.content.querySelectorAll("script").forEach((old) => {
        const s = document.createElement("script");
        if (old.getAttribute("src")) s.src = old.getAttribute("src") as string;
        else s.text = old.textContent || "";
        container.appendChild(s);
      });
    }
  }, [code]);

  if (!code) return null;
  return <div className="adslot" aria-label="Advertisement" ref={ref} />;
}
