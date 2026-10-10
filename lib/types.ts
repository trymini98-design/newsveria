export type Category =
  | "World"
  | "United States"
  | "Politics"
  | "Business"
  | "Technology"
  | "Artificial Intelligence"
  | "Science"
  | "Health"
  | "Entertainment"
  | "Sports"
  | "Environment"
  | "Lifestyle";

export const CATEGORIES: Category[] = [
  "World",
  "United States",
  "Politics",
  "Business",
  "Technology",
  "Artificial Intelligence",
  "Science",
  "Health",
  "Entertainment",
  "Sports",
  "Environment",
  "Lifestyle",
];

export function categorySlug(c: Category): string {
  return c.toLowerCase().replace(/\s+/g, "-");
}

export function categoryFromSlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => categorySlug(c) === slug);
}

export type StoryStatus =
  | "DISCOVERED"
  | "VERIFYING"
  | "VERIFIED"
  | "NEEDS_REVIEW"
  | "REJECTED"
  | "PUBLISHED"
  | "UPDATED"
  | "CORRECTION_REQUIRED";

export interface SourceRef {
  name: string;
  url: string;
  publishedAt?: string; // ISO
  role: "primary" | "corroboration" | "context";
}

export interface VerificationRecord {
  eventConfirmed: boolean;
  primarySourceFound: boolean;
  independentCorroboration: boolean;
  chronologyChecked: boolean;
  detailsChecked: boolean; // names, numbers, quotes, locations
  supersededChecked: boolean;
  imageChecked: boolean;
  reviewer: string; // editorial desk identifier, never a fabricated person
  notes: string;
  checkedAt: string; // ISO
}

export interface Article {
  id: string;
  slug: string;
  headline: string;
  socialHeadline: string;
  summary: string;
  body: string[]; // paragraphs; lines starting with "## " render as subheadings
  category: Category;
  tags: string[];
  author: string; // editorial desk disclosure, e.g. "NewsVeria Newsroom"
  publishedAt: string; // ISO
  updatedAt?: string; // ISO
  image: { src: string; alt: string; caption?: string; credit: string };
  sources: SourceRef[];
  status: Extract<StoryStatus, "PUBLISHED" | "UPDATED">;
  verification: VerificationRecord;
  editorPick?: boolean;
  breaking?: boolean;
}

export interface CandidateStory {
  id: string;
  topic: string;
  sourceName: string;
  sourceUrl: string;
  sourcePublishedAt?: string;
  discoveredAt: string;
  status: StoryStatus;
  claims: string[];
  decision?: string;
}
