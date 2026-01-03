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
export declare const FolderSchema: z.ZodObject<{
    path: z.ZodString;
    parent_path: z.ZodNullable<z.ZodString>;
    name: z.ZodString;
    map_summary: z.ZodNullable<z.ZodString>;
    map_children: z.ZodNullable<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        type: z.ZodEnum<["file", "folder"]>;
        description: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "file" | "folder";
        description: string;
        name: string;
    }, {
        type: "file" | "folder";
        description: string;
        name: string;
    }>, "many">>;
    context_what: z.ZodNullable<z.ZodString>;
    context_why: z.ZodNullable<z.ZodString>;
    context_patterns: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
    source_hash: z.ZodNullable<z.ZodString>;
    last_scanned_at: z.ZodNullable<z.ZodNumber>;
    created_at: z.ZodNumber;
    updated_at: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    path: string;
    parent_path: string | null;
    name: string;
    map_summary: string | null;
    map_children: {
        type: "file" | "folder";
        description: string;
        name: string;
    }[] | null;
    context_what: string | null;
    context_why: string | null;
    context_patterns: string[] | null;
    source_hash: string | null;
    last_scanned_at: number | null;
    created_at: number;
    updated_at: number;
}, {
    path: string;
    parent_path: string | null;
    name: string;
    map_summary: string | null;
    map_children: {
        type: "file" | "folder";
        description: string;
        name: string;
    }[] | null;
    context_what: string | null;
    context_why: string | null;
    context_patterns: string[] | null;
    source_hash: string | null;
    last_scanned_at: number | null;
    created_at: number;
    updated_at: number;
}>;
export type Folder = z.infer<typeof FolderSchema>;
export declare const LogEntryStatusSchema: z.ZodEnum<["locked", "open", "superseded"]>;
export declare const LogEntrySchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodNumber>;
    folder_path: z.ZodString;
    date: z.ZodString;
    topic: z.ZodString;
    status: z.ZodEnum<["locked", "open", "superseded"]>;
    title: z.ZodString;
    decision: z.ZodNullable<z.ZodString>;
    rationale: z.ZodNullable<z.ZodString>;
    before_state: z.ZodNullable<z.ZodString>;
    after_state: z.ZodNullable<z.ZodString>;
    files_changed: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
    future_agent: z.ZodNullable<z.ZodString>;
    supersedes: z.ZodNullable<z.ZodNumber>;
    superseded_by: z.ZodNullable<z.ZodNumber>;
    created_at: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    title: string;
    status: "locked" | "open" | "superseded";
    date: string;
    created_at: number;
    folder_path: string;
    topic: string;
    decision: string | null;
    rationale: string | null;
    before_state: string | null;
    after_state: string | null;
    files_changed: string[] | null;
    future_agent: string | null;
    supersedes: number | null;
    superseded_by: number | null;
    id?: number | undefined;
}, {
    title: string;
    status: "locked" | "open" | "superseded";
    date: string;
    created_at: number;
    folder_path: string;
    topic: string;
    decision: string | null;
    rationale: string | null;
    before_state: string | null;
    after_state: string | null;
    files_changed: string[] | null;
    future_agent: string | null;
    supersedes: number | null;
    superseded_by: number | null;
    id?: number | undefined;
}>;
export type LogEntry = z.infer<typeof LogEntrySchema>;
export declare const FileSchema: z.ZodObject<{
    path: z.ZodString;
    folder_path: z.ZodString;
    content_hash: z.ZodString;
    mtime: z.ZodNumber;
    last_scanned_at: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    path: string;
    last_scanned_at: number;
    folder_path: string;
    content_hash: string;
    mtime: number;
}, {
    path: string;
    last_scanned_at: number;
    folder_path: string;
    content_hash: string;
    mtime: number;
}>;
export type File = z.infer<typeof FileSchema>;
export declare const ReferenceSourceTypeSchema: z.ZodEnum<["folder", "log_entry"]>;
export declare const ReferenceSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodNumber>;
    source_type: z.ZodEnum<["folder", "log_entry"]>;
    source_id: z.ZodString;
    target_type: z.ZodEnum<["folder", "log_entry"]>;
    target_id: z.ZodString;
    context: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    context: string | null;
    source_type: "folder" | "log_entry";
    source_id: string;
    target_type: "folder" | "log_entry";
    target_id: string;
    id?: number | undefined;
}, {
    context: string | null;
    source_type: "folder" | "log_entry";
    source_id: string;
    target_type: "folder" | "log_entry";
    target_id: string;
    id?: number | undefined;
}>;
export type Reference = z.infer<typeof ReferenceSchema>;
export declare const OpenQuestionSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodNumber>;
    question: z.ZodString;
    context: z.ZodNullable<z.ZodString>;
    folder_path: z.ZodNullable<z.ZodString>;
    resolved_by: z.ZodNullable<z.ZodNumber>;
    created_at: z.ZodNumber;
    resolved_at: z.ZodNullable<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    context: string | null;
    created_at: number;
    folder_path: string | null;
    question: string;
    resolved_by: number | null;
    resolved_at: number | null;
    id?: number | undefined;
}, {
    context: string | null;
    created_at: number;
    folder_path: string | null;
    question: string;
    resolved_by: number | null;
    resolved_at: number | null;
    id?: number | undefined;
}>;
export type OpenQuestion = z.infer<typeof OpenQuestionSchema>;
export declare const TagSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodNumber>;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    id?: number | undefined;
}, {
    name: string;
    id?: number | undefined;
}>;
export type Tag = z.infer<typeof TagSchema>;
export declare const LogEntryTagSchema: z.ZodObject<{
    log_entry_id: z.ZodNumber;
    tag_id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    log_entry_id: number;
    tag_id: number;
}, {
    log_entry_id: number;
    tag_id: number;
}>;
export type LogEntryTag = z.infer<typeof LogEntryTagSchema>;
/**
 * SQL DDL for creating tables
 * Use this with better-sqlite3's exec()
 */
export declare const CREATE_TABLES_SQL = "\n-- The things being described (folders in any project)\nCREATE TABLE IF NOT EXISTS folders (\n  path TEXT PRIMARY KEY,\n  parent_path TEXT,\n  name TEXT NOT NULL,\n\n  -- Map (WHERE - structure) \u2014 AI-generated\n  map_summary TEXT,\n  map_children TEXT,  -- JSON array\n\n  -- Context (WHAT - understanding) \u2014 AI-generated\n  context_what TEXT,\n  context_why TEXT,\n  context_patterns TEXT,  -- JSON array\n\n  -- Staleness detection\n  source_hash TEXT,\n  last_scanned_at INTEGER,\n\n  created_at INTEGER NOT NULL,\n  updated_at INTEGER NOT NULL\n);\n\n-- The paper trail (WHEN/WHY - history)\nCREATE TABLE IF NOT EXISTS log_entries (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  folder_path TEXT NOT NULL,\n  date TEXT NOT NULL,\n  topic TEXT NOT NULL,\n  status TEXT NOT NULL CHECK (status IN ('locked', 'open', 'superseded')),\n\n  -- AI-generated content\n  title TEXT NOT NULL,\n  decision TEXT,\n  rationale TEXT,\n  before_state TEXT,\n  after_state TEXT,\n\n  -- Metadata\n  files_changed TEXT,  -- JSON array\n  future_agent TEXT,\n\n  -- Relations\n  supersedes INTEGER REFERENCES log_entries(id),\n  superseded_by INTEGER REFERENCES log_entries(id),\n\n  created_at INTEGER NOT NULL\n);\n\n-- Source files being tracked (for change detection)\nCREATE TABLE IF NOT EXISTS files (\n  path TEXT PRIMARY KEY,\n  folder_path TEXT NOT NULL,\n  content_hash TEXT NOT NULL,\n  mtime INTEGER NOT NULL,\n  last_scanned_at INTEGER NOT NULL\n);\n\n-- Cross-references (for staleness detection)\nCREATE TABLE IF NOT EXISTS \"references\" (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  source_type TEXT NOT NULL CHECK (source_type IN ('folder', 'log_entry')),\n  source_id TEXT NOT NULL,\n  target_type TEXT NOT NULL CHECK (target_type IN ('folder', 'log_entry')),\n  target_id TEXT NOT NULL,\n  context TEXT\n);\n\n-- Open questions (unresolved items)\nCREATE TABLE IF NOT EXISTS open_questions (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  question TEXT NOT NULL,\n  context TEXT,\n  folder_path TEXT,\n  resolved_by INTEGER REFERENCES log_entries(id),\n  created_at INTEGER NOT NULL,\n  resolved_at INTEGER\n);\n\n-- Tags/themes (for categorization)\nCREATE TABLE IF NOT EXISTS tags (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  name TEXT NOT NULL UNIQUE\n);\n\n-- Log entry tags (many-to-many)\nCREATE TABLE IF NOT EXISTS log_entry_tags (\n  log_entry_id INTEGER NOT NULL REFERENCES log_entries(id),\n  tag_id INTEGER NOT NULL REFERENCES tags(id),\n  PRIMARY KEY (log_entry_id, tag_id)\n);\n\n-- Indexes for performance\nCREATE INDEX IF NOT EXISTS idx_folders_parent ON folders(parent_path);\nCREATE INDEX IF NOT EXISTS idx_log_entries_date ON log_entries(date);\nCREATE INDEX IF NOT EXISTS idx_log_entries_folder ON log_entries(folder_path);\nCREATE INDEX IF NOT EXISTS idx_log_entries_status ON log_entries(status);\nCREATE INDEX IF NOT EXISTS idx_files_folder ON files(folder_path);\nCREATE INDEX IF NOT EXISTS idx_references_source ON \"references\"(source_type, source_id);\nCREATE INDEX IF NOT EXISTS idx_references_target ON \"references\"(target_type, target_id);\nCREATE INDEX IF NOT EXISTS idx_open_questions_folder ON open_questions(folder_path);\nCREATE INDEX IF NOT EXISTS idx_open_questions_resolved ON open_questions(resolved_at);\n";
//# sourceMappingURL=schema.d.ts.map