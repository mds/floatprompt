import { z } from "zod";
/**
 * Deep Context Schema for FloatPrompt
 *
 * Topic-based context storage that spans filesystem locations.
 * Complements folder-based context with concept primers.
 *
 * Spec locked 2026-01-04 — see .float-workshop/docs/deep-context.md
 */
// Watch types — what triggers staleness
export const DeepWatchTypeSchema = z.enum([
    "folder", // Folder path changed
    "glob", // Files matching pattern changed
    "logs", // Log entries containing topic
    "deep", // Another deep context changed
]);
// Individual watch definition
export const DeepWatchSchema = z.object({
    type: DeepWatchTypeSchema,
    path: z.string().optional(), // for folder type
    pattern: z.string().optional(), // for glob type
    topic_contains: z.string().optional(), // for logs type
    slug: z.string().optional(), // for deep type
});
// Deep context status
export const DeepStatusSchema = z.enum([
    "current", // Content is fresh
    "stale", // Needs regeneration
    "generating", // Currently being generated
]);
// Full deep context row
export const DeepSchema = z.object({
    slug: z.string(), // PRIMARY KEY: 'buoys', 'vision', 'fleet'
    title: z.string(),
    content_md: z.string(),
    watches: z.array(DeepWatchSchema).nullable(),
    status: DeepStatusSchema,
    ai_model: z.string().nullable(),
    created_at: z.string(), // ISO 8601
    updated_at: z.string(), // ISO 8601
});
// History entry (version snapshot)
export const DeepHistorySchema = z.object({
    id: z.number().optional(), // Auto-increment
    slug: z.string(),
    version: z.number(),
    title: z.string(),
    content_md: z.string(),
    watches: z.array(DeepWatchSchema).nullable(),
    ai_model: z.string().nullable(),
    created_at: z.string(), // ISO 8601
});
/**
 * SQL DDL for deep context tables
 */
export const CREATE_DEEP_TABLES_SQL = `
-- Topic-based deep context (concept primers)
CREATE TABLE IF NOT EXISTS deep (
  slug        TEXT PRIMARY KEY,
  title       TEXT NOT NULL,
  content_md  TEXT NOT NULL,
  watches     TEXT,
  status      TEXT NOT NULL DEFAULT 'current'
              CHECK (status IN ('current', 'stale', 'generating')),
  ai_model    TEXT,
  created_at  TEXT NOT NULL,
  updated_at  TEXT NOT NULL
);

-- Version history for deep contexts
CREATE TABLE IF NOT EXISTS deep_history (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  slug        TEXT NOT NULL,
  version     INTEGER NOT NULL,
  title       TEXT NOT NULL,
  content_md  TEXT NOT NULL,
  watches     TEXT,
  ai_model    TEXT,
  created_at  TEXT NOT NULL,
  FOREIGN KEY (slug) REFERENCES deep(slug) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_deep_history_slug ON deep_history(slug);
`;
//# sourceMappingURL=deep-schema.js.map