-- FloatPrompt Database Schema
-- Creates .float/float.db for persistent context
-- Schema locked 2026-01-09 (Session 43)

-- The things being described (folders in any project)
-- 16 fields organized by purpose
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
  context TEXT,

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

-- The paper trail (decisions, session handoffs)
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
  trigger TEXT,        -- Hook that created this entry: PreCompact, SessionEnd, manual
  files_read TEXT,     -- JSON array: files AI read for understanding
  files_changed TEXT,  -- JSON array: files AI modified
  related_files TEXT,  -- JSON array: files conceptually relevant to this work
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

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_folders_parent ON folders(parent_path);
CREATE INDEX IF NOT EXISTS idx_folders_scope ON folders(parent_scope_path);
CREATE INDEX IF NOT EXISTS idx_folders_status ON folders(status);
CREATE INDEX IF NOT EXISTS idx_log_entries_date ON log_entries(date);
CREATE INDEX IF NOT EXISTS idx_log_entries_folder ON log_entries(folder_path);
CREATE INDEX IF NOT EXISTS idx_log_entries_topic ON log_entries(topic);
CREATE INDEX IF NOT EXISTS idx_log_entries_status ON log_entries(status);
CREATE INDEX IF NOT EXISTS idx_files_folder ON files(folder_path);
CREATE INDEX IF NOT EXISTS idx_references_source ON "references"(source_type, source_id);
CREATE INDEX IF NOT EXISTS idx_references_target ON "references"(target_type, target_id);
CREATE INDEX IF NOT EXISTS idx_open_questions_folder ON open_questions(folder_path);
CREATE INDEX IF NOT EXISTS idx_open_questions_resolved ON open_questions(resolved_at);
CREATE INDEX IF NOT EXISTS idx_deep_history_slug ON deep_history(slug);
