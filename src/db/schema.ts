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
 */

// Folders table — the things being described
export const FolderSchema = z.object({
  path: z.string(), // PRIMARY KEY: '/', '/src', '/src/auth'
  parent_path: z.string().nullable(), // NULL for root
  name: z.string(), // 'src', 'auth'

  // Map (WHERE - structure) — AI-generated
  map_summary: z.string().nullable(), // "Contains React components for UI"
  map_children: z
    .array(
      z.object({
        name: z.string(),
        type: z.enum(["file", "folder"]),
        description: z.string(),
      })
    )
    .nullable(), // Stored as JSON

  // Context (WHAT - understanding) — AI-generated
  context_what: z.string().nullable(), // "This is the authentication layer"
  context_why: z.string().nullable(), // "Separated for security isolation"
  context_patterns: z.array(z.string()).nullable(), // ["repository pattern", "DI"]

  // Staleness detection
  // source_hash = SHA-256(sorted child paths + their content hashes)
  // Not recursive — just immediate children. Staleness bubbles up naturally.
  source_hash: z.string().nullable(),
  last_scanned_at: z.number().nullable(), // Unix timestamp

  created_at: z.number(), // Unix timestamp
  updated_at: z.number(), // Unix timestamp
});

export type Folder = z.infer<typeof FolderSchema>;

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

export type LogEntry = z.infer<typeof LogEntrySchema>;

// Files table — source files being tracked
export const FileSchema = z.object({
  path: z.string(), // PRIMARY KEY: '/src/auth/login.ts'
  folder_path: z.string(), // '/src/auth'
  content_hash: z.string(), // SHA-256 of file content
  last_scanned_at: z.number(), // Unix timestamp
});

export type File = z.infer<typeof FileSchema>;

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

export type Reference = z.infer<typeof ReferenceSchema>;

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

export type OpenQuestion = z.infer<typeof OpenQuestionSchema>;

// Tags table — categorization
export const TagSchema = z.object({
  id: z.number().optional(), // PRIMARY KEY, auto-increment
  name: z.string(), // UNIQUE: 'architecture', 'naming', 'storage'
});

export type Tag = z.infer<typeof TagSchema>;

// Log entry tags table — many-to-many relationship
export const LogEntryTagSchema = z.object({
  log_entry_id: z.number(),
  tag_id: z.number(),
});

export type LogEntryTag = z.infer<typeof LogEntryTagSchema>;

/**
 * SQL DDL for creating tables
 * Use this with better-sqlite3's exec()
 */
export const CREATE_TABLES_SQL = `
-- The things being described (folders in any project)
CREATE TABLE IF NOT EXISTS folders (
  path TEXT PRIMARY KEY,
  parent_path TEXT,
  name TEXT NOT NULL,

  -- Map (WHERE - structure) — AI-generated
  map_summary TEXT,
  map_children TEXT,  -- JSON array

  -- Context (WHAT - understanding) — AI-generated
  context_what TEXT,
  context_why TEXT,
  context_patterns TEXT,  -- JSON array

  -- Staleness detection
  source_hash TEXT,
  last_scanned_at INTEGER,

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
