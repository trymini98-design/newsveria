#!/usr/bin/env node
/**
 * NewsVeria discovery: fetches reputable public RSS feeds and records new
 * candidate stories (status DISCOVERED) in data/pipeline.json.
 * Discovery only gathers leads — popularity is not evidence. Nothing found
 * here is publishable until the verification engine checks it.
 */
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import crypto from "crypto";

const FEEDS = [
  { name: "BBC News — World", url: "https://feeds.bbci.co.uk/news/world/rss.xml" },
  { name: "BBC News — US & Canada", url: "https://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml" },
  { name: "BBC News — Business", url: "https://feeds.bbci.co.uk/news/business/rss.xml" },
  { name: "BBC News — Technology", url: "https://feeds.bbci.co.uk/news/technology/rss.xml" },
  { name: "BBC News — Science & Environment", url: "https://feeds.bbci.co.uk/news/science_and_environment/rss.xml" },
  { name: "BBC News — Health", url: "https://feeds.bbci.co.uk/news/health/rss.xml" },
  { name: "BBC News — Entertainment & Arts", url: "https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml" },
  { name: "BBC Sport", url: "https://feeds.bbci.co.uk/sport/rss.xml" },
  { name: "Al Jazeera English", url: "https://www.aljazeera.com/xml/rss/all.xml" },
  { name: "The Guardian — World", url: "https://www.theguardian.com/world/rss" },
  { name: "NPR News", url: "https://feeds.npr.org/1001/rss.xml" },
  { name: "DW News", url: "https://rss.dw.com/rdf/rss-en-all" },
  { name: "France 24", url: "https://www.france24.com/en/rss" },
  { name: "Sky News — World", url: "https://feeds.skynews.com/feeds/rss/world.xml" },
  { name: "ABC News — Top Stories", url: "https://feeds.abcnews.com/abcnews/topstories" },
  { name: "CBS News", url: "https://www.cbsnews.com/latest/rss/main" },
  { name: "CNA — Asia", url: "https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml" },
  { name: "The Verge", url: "https://www.theverge.com/rss/index.xml" },
  { name: "TechCrunch", url: "https://techcrunch.com/feed/" },
  { name: "Wired", url: "https://www.wired.com/feed/rss" },
  { name: "ESPN", url: "https://www.espn.com/espn/rss/news" },
  { name: "ScienceDaily", url: "https://www.sciencedaily.com/rss/all.xml" },
];

const file = path.join(process.cwd(), "data", "pipeline.json");
const state = JSON.parse(readFileSync(file, "utf8"));
const seen = new Set(state.candidates.map((c) => c.sourceUrl));

function pick(xml, tag) {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  if (!m) return "";
  return m[1]
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

let added = 0;
for (const feed of FEEDS) {
  try {
    const res = await fetch(feed.url, { headers: { "user-agent": "NewsVeriaDiscovery/1.0" } });
    if (!res.ok) {
      console.error(`FEED FAIL ${feed.name}: HTTP ${res.status}`);
      continue;
    }
    const xml = await res.text();
    const items = xml.split(/<item[\s>]/i).slice(1, 16);
    for (const raw of items) {
      const title = pick(raw, "title");
      const link = pick(raw, "link");
      const pub = pick(raw, "pubDate");
      if (!title || !link || seen.has(link)) continue;
      seen.add(link);
      state.candidates.push({
        id: "cand-" + crypto.createHash("sha1").update(link).digest("hex").slice(0, 12),
        topic: title,
        sourceName: feed.name,
        sourceUrl: link,
        sourcePublishedAt: pub ? new Date(pub).toISOString() : undefined,
        discoveredAt: new Date().toISOString(),
        status: "DISCOVERED",
        claims: [],
      });
      added++;
    }
  } catch (err) {
    console.error(`FEED ERROR ${feed.name}: ${err.message}`);
  }
}

state.meta.lastDiscoveryAt = new Date().toISOString();
writeFileSync(file, JSON.stringify(state, null, 2));
console.log(`Discovery complete. New candidates: ${added}. Total in queue: ${state.candidates.length}.`);
