import { z } from "zod";
/**
 * SQLite Schema for FloatPrompt Context Database
 *
 * Core tables:
 * - folders: The things being described (map + context)
 * - log_entries: The paper trail (decisions, changes)
 * - files: Source files being tracked (change detection)
 * - references: Cross-links for staleness detection
 * - open_questions: Unresolved items
 * - tags: Categorization
 * - log_entry_tags: Many-to-many relationship
 *
 * Schema spec locked 2026-01-03 via Q&A session.
 * See wip-schema-spec.md for rationale on each field.
 */
// Folder type enum — what kind of folder this is
export const FolderTypeSchema = z.enum([
    "folder", // Regular project folder
    "scope", // Autonomous scope (a "world")
    "log_root", // Like project-logs/
    "log_year", // Like 2026/
    "log_month", // Like 01-jan/
]);
// Folder status enum — can AI trust this context?
export const FolderStatusSchema = z.enum([
    "pending", // No AI content yet (Layer 1 only, scanner created the row)
    "current", // AI content is fresh (written after last source change)
    "stale", // Source changed since AI last wrote (needs refresh)
]);
// Folders table — 16 fields organized by purpose
export const FolderSchema = z.object({
    // === Identity (3) ===
    path: z.string(), // PRIMARY KEY: '/', '/src', '/src/auth'
    parent_path: z.string().nullable(), // NULL for root
    name: z.string(), // 'src', 'auth', '' for root
    // === Governance (2) ===
    type: FolderTypeSchema.nullable(), // AI-determined or heuristic
    status: FolderStatusSchema, // Computed/updated by system
    // === AI Content (2) ===
    description: z.string().nullable(), // Quick orientation — "what's here" (the "map")
    content_md: z.string().nullable(), // Deeper understanding — "what it means" (the "context")
    // === Scope (3) ===
    is_scope: z.boolean(), // Is this folder an autonomous scope?
    parent_scope_path: z.string().nullable(), // Pointer to parent scope (skips non-scopes)
    scope_boot: z.string().nullable(), // Boot context for this scope (only if is_scope=true)
    // === Mechanical (2) ===
    // source_hash = SHA-256(sorted child paths + their content hashes)
    // Not recursive — just immediate children. Staleness bubbles up naturally.
    source_hash: z.string().nullable(),
    last_scanned_at: z.number().nullable(), // Unix timestamp
    // === AI Attribution (2) ===
    ai_model: z.string().nullable(), // Which model wrote this (e.g., "claude-3-opus")
    ai_updated: z.number().nullable(), // When AI last wrote to this row
    // === Timestamps (2) ===
    created_at: z.number(), // Unix timestamp
    updated_at: z.number(), // Unix timestamp
});
// Log entries table — the paper trail
export const LogEntryStatusSchema = z.enum(["locked", "open", "superseded"]);
export const LogEntrySchema = z.object({
    id: z.number().optional(), // PRIMARY KEY, auto-increment
    folder_path: z.string(), // Which folder (or '/' for system-wide)
    date: z.string(), // '2026-01-02'
    topic: z.string(), // 'nav-structure'
    status: LogEntryStatusSchema,
    // AI-generated content
    title: z.string(),
    decision: z.string().nullable(),
    rationale: z.string().nullable(),
    before_state: z.string().nullable(),
    after_state: z.string().nullable(),
    // Metadata
    files_changed: z.array(z.string()).nullable(), // Stored as JSON
    future_agent: z.string().nullable(), // Which agent type would do this
    // Relations
    supersedes: z.number().nullable(), // log_entry id
    superseded_by: z.number().nullable(), // log_entry id
    created_at: z.number(), // Unix timestamp
});
// Files table — source files being tracked
export const FileSchema = z.object({
    path: z.string(), // PRIMARY KEY: '/src/auth/login.ts'
    folder_path: z.string(), // '/src/auth'
    content_hash: z.string(), // SHA-256 of file content
    mtime: z.number(), // File modification time (for two-phase change detection)
    last_scanned_at: z.number(), // Unix timestamp
});
// References table — cross-links for staleness detection
export const ReferenceSourceTypeSchema = z.enum(["folder", "log_entry"]);
export const ReferenceSchema = z.object({
    id: z.number().optional(), // PRIMARY KEY, auto-increment
    source_type: ReferenceSourceTypeSchema,
    source_id: z.string(), // path or id as string
    target_type: ReferenceSourceTypeSchema,
    target_id: z.string(), // path or id as string
    context: z.string().nullable(), // The surrounding text
});
// Open questions table — unresolved items
export const OpenQuestionSchema = z.object({
    id: z.number().optional(), // PRIMARY KEY, auto-increment
    question: z.string(),
    context: z.string().nullable(),
    folder_path: z.string().nullable(), // Related folder
    resolved_by: z.number().nullable(), // log_entry_id that answered it
    created_at: z.number(), // Unix timestamp
    resolved_at: z.number().nullable(), // Unix timestamp
});
// Tags table — categorization
export const TagSchema = z.object({
    id: z.number().optional(), // PRIMARY KEY, auto-increment
    name: z.string(), // UNIQUE: 'architecture', 'naming', 'storage'
});
// Log entry tags table — many-to-many relationship
export const LogEntryTagSchema = z.object({
    log_entry_id: z.number(),
    tag_id: z.number(),
});
/**
 * SQL DDL for creating tables
 * Use this with better-sqlite3's exec()
 */
export const CREATE_TABLES_SQL = `
-- The things being described (folders in any project)
-- Schema spec locked 2026-01-03 — 16 fields organized by purpose
CREATE TABLE IF NOT EXISTS folders (
  -- Identity (3)
  path TEXT PRIMARY KEY,
  parent_path TEXT,
  name TEXT NOT NULL,

  -- Governance (2)
  type TEXT CHECK (type IN ('folder', 'scope', 'log_root', 'log_year', 'log_month')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'current', 'stale')),

  -- AI Content (2)
  description TEXT,
  content_md TEXT,

  -- Scope (3)
  is_scope INTEGER NOT NULL DEFAULT 0,
  parent_scope_path TEXT,
  scope_boot TEXT,

  -- Mechanical (2)
  source_hash TEXT,
  last_scanned_at INTEGER,

  -- AI Attribution (2)
  ai_model TEXT,
  ai_updated INTEGER,

  -- Timestamps (2)
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

-- The paper trail (WHEN/WHY - history)
CREATE TABLE IF NOT EXISTS log_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  folder_path TEXT NOT NULL,
  date TEXT NOT NULL,
  topic TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('locked', 'open', 'superseded')),

  -- AI-generated content
  title TEXT NOT NULL,
  decision TEXT,
  rationale TEXT,
  before_state TEXT,
  after_state TEXT,

  -- Metadata
  files_changed TEXT,  -- JSON array
  future_agent TEXT,

  -- Relations
  supersedes INTEGER REFERENCES log_entries(id),
  superseded_by INTEGER REFERENCES log_entries(id),

  created_at INTEGER NOT NULL
);

-- Source files being tracked (for change detection)
CREATE TABLE IF NOT EXISTS files (
  path TEXT PRIMARY KEY,
  folder_path TEXT NOT NULL,
  content_hash TEXT NOT NULL,
  mtime INTEGER NOT NULL,
  last_scanned_at INTEGER NOT NULL
);

-- Cross-references (for staleness detection)
CREATE TABLE IF NOT EXISTS "references" (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source_type TEXT NOT NULL CHECK (source_type IN ('folder', 'log_entry')),
  source_id TEXT NOT NULL,
  target_type TEXT NOT NULL CHECK (target_type IN ('folder', 'log_entry')),
  target_id TEXT NOT NULL,
  context TEXT
);

-- Open questions (unresolved items)
CREATE TABLE IF NOT EXISTS open_questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question TEXT NOT NULL,
  context TEXT,
  folder_path TEXT,
  resolved_by INTEGER REFERENCES log_entries(id),
  created_at INTEGER NOT NULL,
  resolved_at INTEGER
);

-- Tags/themes (for categorization)
CREATE TABLE IF NOT EXISTS tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);

-- Log entry tags (many-to-many)
CREATE TABLE IF NOT EXISTS log_entry_tags (
  log_entry_id INTEGER NOT NULL REFERENCES log_entries(id),
  tag_id INTEGER NOT NULL REFERENCES tags(id),
  PRIMARY KEY (log_entry_id, tag_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_folders_parent ON folders(parent_path);
CREATE INDEX IF NOT EXISTS idx_log_entries_date ON log_entries(date);
CREATE INDEX IF NOT EXISTS idx_log_entries_folder ON log_entries(folder_path);
CREATE INDEX IF NOT EXISTS idx_log_entries_status ON log_entries(status);
CREATE INDEX IF NOT EXISTS idx_files_folder ON files(folder_path);
CREATE INDEX IF NOT EXISTS idx_references_source ON "references"(source_type, source_id);
CREATE INDEX IF NOT EXISTS idx_references_target ON "references"(target_type, target_id);
CREATE INDEX IF NOT EXISTS idx_open_questions_folder ON open_questions(folder_path);
CREATE INDEX IF NOT EXISTS idx_open_questions_resolved ON open_questions(resolved_at);
`;
//# sourceMappingURL=schema.js.map