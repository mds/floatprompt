import Database from "better-sqlite3";
import type { Deep, DeepWatch, DeepStatus } from "./deep-schema.js";
/**
 * Database client for FloatPrompt context database.
 *
 * Usage:
 *   const db = createDatabase('.float/float.db');
 *   // use db for queries
 *   db.close();
 */
export declare function createDatabase(dbPath: string): Database.Database;
/**
 * Insert a log entry into the database.
 * Returns the inserted row's id.
 */
export declare function insertLogEntry(db: Database.Database, entry: {
    folder_path: string;
    date: string;
    topic: string;
    status: "locked" | "open" | "superseded";
    title: string;
    decision: string | null;
    rationale: string | null;
    before_state: string | null;
    after_state: string | null;
    files_changed: string[] | null;
    future_agent: string | null;
    supersedes: number | null;
    superseded_by: number | null;
    created_at: number;
}): number;
/**
 * Get all log entries, ordered by date.
 */
export declare function getAllLogEntries(db: Database.Database): unknown[];
/**
 * Count log entries.
 */
export declare function countLogEntries(db: Database.Database): number;
/**
 * Check if a log entry exists by date and topic.
 */
export declare function logEntryExists(db: Database.Database, date: string, topic: string): boolean;
/**
 * Get log entries with optional filters.
 */
export declare function getLogEntries(db: Database.Database, filters?: {
    folder_path?: string;
    topic?: string;
    status?: "locked" | "open" | "superseded";
    limit?: number;
}): unknown[];
/**
 * Get the latest log entry for a given topic.
 * Useful for session continuity (topic = 'session-handoff').
 */
export declare function getLatestLogEntry(db: Database.Database, topic: string): unknown | undefined;
/**
 * Insert a new deep context.
 */
export declare function insertDeep(db: Database.Database, deep: {
    slug: string;
    title: string;
    content_md: string;
    watches?: DeepWatch[] | null;
    status?: DeepStatus;
    ai_model?: string | null;
}): void;
/**
 * Get a deep context by slug.
 */
export declare function getDeep(db: Database.Database, slug: string): Deep | null;
/**
 * List all deep contexts.
 */
export declare function listDeep(db: Database.Database): Deep[];
/**
 * Update a deep context. Saves current version to history first.
 */
export declare function updateDeep(db: Database.Database, slug: string, updates: {
    title?: string;
    content_md?: string;
    watches?: DeepWatch[] | null;
    status?: DeepStatus;
    ai_model?: string | null;
}): boolean;
/**
 * Mark a deep context as stale.
 */
export declare function markDeepStale(db: Database.Database, slug: string): boolean;
/**
 * Delete a deep context (cascades to history).
 */
export declare function deleteDeep(db: Database.Database, slug: string): boolean;
/**
 * Get version history for a deep context.
 */
export declare function getDeepHistory(db: Database.Database, slug: string): Array<{
    id: number;
    version: number;
    title: string;
    content_md: string;
    watches: DeepWatch[] | null;
    ai_model: string | null;
    created_at: string;
}>;
/**
 * Get a specific version from history.
 */
export declare function getDeepVersion(db: Database.Database, slug: string, version: number): {
    id: number;
    version: number;
    title: string;
    content_md: string;
    watches: DeepWatch[] | null;
    ai_model: string | null;
    created_at: string;
} | null;
/**
 * Count deep contexts.
 */
export declare function countDeep(db: Database.Database): number;
//# sourceMappingURL=client.d.ts.map