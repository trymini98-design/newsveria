#!/usr/bin/env node
/**
 * NewsVeria health check: reports pipeline state and, when SITE_URL is set,
 * verifies the production site responds. Prints machine-readable JSON last.
 */
import { readFileSync } from "fs";
import path from "path";

const pipeline = JSON.parse(readFileSync(path.join(process.cwd(), "data", "pipeline.json"), "utf8"));
const articles = JSON.parse(readFileSync(path.join(process.cwd(), "content", "articles.json"), "utf8"));

const byStatus = {};
for (const c of pipeline.candidates) byStatus[c.status] = (byStatus[c.status] ?? 0) + 1;

const report = {
  at: new Date().toISOString(),
  publishedArticles: articles.length,
  candidatesByStatus: byStatus,
  lastDiscoveryAt: pipeline.meta?.lastDiscoveryAt ?? null,
  lastPublishedAt: pipeline.meta?.lastPublishedAt ?? null,
  site: null,
};

const url = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;
if (url) {
  try {
    const res = await fetch(url, { redirect: "follow" });
    const html = await res.text();
    report.site = { url, status: res.status, hasBrand: html.includes("NewsVeria") };
  } catch (err) {
    report.site = { url, status: 0, error: err.message };
  }
}

console.log(
  `Published: ${report.publishedArticles} | Queue: ${JSON.stringify(byStatus)} | Last discovery: ${report.lastDiscoveryAt ?? "never"}`,
);
if (report.site) console.log(`Site ${report.site.url}: HTTP ${report.site.status}${report.site.hasBrand === false ? " (brand check FAILED)" : ""}`);
console.log("REPORT_JSON " + JSON.stringify(report));
