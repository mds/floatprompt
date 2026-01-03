import Database from "better-sqlite3";
import { CREATE_TABLES_SQL } from "./schema.js";

/**
 * Database client for FloatPrompt context database.
 *
 * Usage:
 *   const db = createDatabase('.float-manual/float.db');
 *   // use db for queries
 *   db.close();
 */

export function createDatabase(dbPath: string): Database.Database {
  const db = new Database(dbPath);

  // Enable foreign keys
  db.pragma("foreign_keys = ON");

  // Create tables if they don't exist
  db.exec(CREATE_TABLES_SQL);

  return db;
}

/**
 * Insert a log entry into the database.
 * Returns the inserted row's id.
 */
export function insertLogEntry(
  db: Database.Database,
  entry: {
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
  }
): number {
  const stmt = db.prepare(`
    INSERT INTO log_entries (
      folder_path, date, topic, status, title,
      decision, rationale, before_state, after_state,
      files_changed, future_agent, supersedes, superseded_by, created_at
    ) VALUES (
      @folder_path, @date, @topic, @status, @title,
      @decision, @rationale, @before_state, @after_state,
      @files_changed, @future_agent, @supersedes, @superseded_by, @created_at
    )
  `);

  const result = stmt.run({
    ...entry,
    files_changed: entry.files_changed
      ? JSON.stringify(entry.files_changed)
      : null,
  });

  return Number(result.lastInsertRowid);
}

/**
 * Get all log entries, ordered by date.
 */
export function getAllLogEntries(db: Database.Database) {
  return db
    .prepare(
      `
    SELECT id, folder_path, date, topic, status, title, decision, rationale,
           before_state, after_state, files_changed, future_agent,
           supersedes, superseded_by, created_at
    FROM log_entries
    ORDER BY date, id
  `
    )
    .all();
}

/**
 * Count log entries.
 */
export function countLogEntries(db: Database.Database): number {
  const result = db
    .prepare("SELECT COUNT(*) as count FROM log_entries")
    .get() as { count: number };
  return result.count;
}

/**
 * Check if a log entry exists by date and topic.
 */
export function logEntryExists(
  db: Database.Database,
  date: string,
  topic: string
): boolean {
  const result = db
    .prepare("SELECT 1 FROM log_entries WHERE date = ? AND topic = ?")
    .get(date, topic);
  return result !== undefined;
}
