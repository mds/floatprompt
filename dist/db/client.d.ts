import Database from "better-sqlite3";
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
//# sourceMappingURL=client.d.ts.map