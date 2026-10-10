# NewsVeria

English-language global trending news website. Every published story passes a documented
fact-verification check (primary source + independent corroboration) before it goes live.

## Stack
- Next.js (App Router, TypeScript) — static generation for all public pages
- File-based content store: `content/articles.json` (published stories), `data/pipeline.json` (news queue & state machine)
- Deployment: Vercel (free `vercel.app` subdomain)
- Pipeline scheduling: external cron jobs run `scripts/discover.mjs` (discovery) and the daily report

## Editorial rules (enforced by process, not by hope)
1. No story publishes without a complete verification record (see `lib/types.ts`).
2. Original writing only — sources are cited, never copied.
3. Uncertain, sensitive or high-risk stories go to NEEDS_REVIEW and are never auto-published.
4. No fake metrics, comments or engagement numbers anywhere on the site.
5. AI assistance is disclosed in the Editorial Policy; illustrative images are credited as generated illustrations.

## Local development
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Pipeline
```bash
npm run discover     # fetch configured RSS/official feeds -> DISCOVERED candidates in data/pipeline.json
npm run healthcheck  # verify site health + report pipeline state
```
Publishing a story = adding a fully verified record to `content/articles.json` and redeploying.
Publishing is idempotent: slugs are unique, duplicates are rejected by the pipeline checks.

## Environment
Copy `.env.example` to `.env.local` and fill only what is available. Ad placements render
**only** when approved Adsterra codes are provided — never use unapproved or fabricated ad code.
