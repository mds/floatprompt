import Database from "better-sqlite3";
import { CREATE_TABLES_SQL } from "./schema.js";
import type { Deep, DeepWatch, DeepStatus } from "./deep-schema.js";

/**
 * Database client for FloatPrompt context database.
 *
 * Usage:
 *   const db = createDatabase('.float/float.db');
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

// ============================================================================
// Deep Context CRUD
// ============================================================================

/**
 * Insert a new deep context.
 */
export function insertDeep(
  db: Database.Database,
  deep: {
    slug: string;
    title: string;
    content_md: string;
    watches?: DeepWatch[] | null;
    status?: DeepStatus;
    ai_model?: string | null;
  }
): void {
  const now = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO deep (slug, title, content_md, watches, status, ai_model, created_at, updated_at)
    VALUES (@slug, @title, @content_md, @watches, @status, @ai_model, @created_at, @updated_at)
  `);

  stmt.run({
    slug: deep.slug,
    title: deep.title,
    content_md: deep.content_md,
    watches: deep.watches ? JSON.stringify(deep.watches) : null,
    status: deep.status || "current",
    ai_model: deep.ai_model || null,
    created_at: now,
    updated_at: now,
  });
}

/**
 * Get a deep context by slug.
 */
export function getDeep(db: Database.Database, slug: string): Deep | null {
  const row = db
    .prepare("SELECT * FROM deep WHERE slug = ?")
    .get(slug) as Record<string, unknown> | undefined;

  if (!row) return null;

  return {
    slug: row.slug as string,
    title: row.title as string,
    content_md: row.content_md as string,
    watches: row.watches ? JSON.parse(row.watches as string) : null,
    status: row.status as DeepStatus,
    ai_model: row.ai_model as string | null,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  };
}

/**
 * List all deep contexts.
 */
export function listDeep(db: Database.Database): Deep[] {
  const rows = db
    .prepare("SELECT * FROM deep ORDER BY slug")
    .all() as Record<string, unknown>[];

  return rows.map((row) => ({
    slug: row.slug as string,
    title: row.title as string,
    content_md: row.content_md as string,
    watches: row.watches ? JSON.parse(row.watches as string) : null,
    status: row.status as DeepStatus,
    ai_model: row.ai_model as string | null,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  }));
}

/**
 * Update a deep context. Saves current version to history first.
 */
export function updateDeep(
  db: Database.Database,
  slug: string,
  updates: {
    title?: string;
    content_md?: string;
    watches?: DeepWatch[] | null;
    status?: DeepStatus;
    ai_model?: string | null;
  }
): boolean {
  const existing = getDeep(db, slug);
  if (!existing) return false;

  // Save current version to history
  const maxVersion = db
    .prepare("SELECT MAX(version) as max FROM deep_history WHERE slug = ?")
    .get(slug) as { max: number | null };
  const nextVersion = (maxVersion.max || 0) + 1;

  db.prepare(`
    INSERT INTO deep_history (slug, version, title, content_md, watches, ai_model, created_at)
    VALUES (@slug, @version, @title, @content_md, @watches, @ai_model, @created_at)
  `).run({
    slug: existing.slug,
    version: nextVersion,
    title: existing.title,
    content_md: existing.content_md,
    watches: existing.watches ? JSON.stringify(existing.watches) : null,
    ai_model: existing.ai_model,
    created_at: existing.updated_at, // Use the old updated_at as version creation time
  });

  // Update current
  const now = new Date().toISOString();
  const setClause: string[] = ["updated_at = @updated_at"];
  const params: Record<string, unknown> = { slug, updated_at: now };

  if (updates.title !== undefined) {
    setClause.push("title = @title");
    params.title = updates.title;
  }
  if (updates.content_md !== undefined) {
    setClause.push("content_md = @content_md");
    params.content_md = updates.content_md;
  }
  if (updates.watches !== undefined) {
    setClause.push("watches = @watches");
    params.watches = updates.watches ? JSON.stringify(updates.watches) : null;
  }
  if (updates.status !== undefined) {
    setClause.push("status = @status");
    params.status = updates.status;
  }
  if (updates.ai_model !== undefined) {
    setClause.push("ai_model = @ai_model");
    params.ai_model = updates.ai_model;
  }

  db.prepare(`UPDATE deep SET ${setClause.join(", ")} WHERE slug = @slug`).run(
    params
  );

  return true;
}

/**
 * Mark a deep context as stale.
 */
export function markDeepStale(db: Database.Database, slug: string): boolean {
  const result = db
    .prepare("UPDATE deep SET status = 'stale', updated_at = ? WHERE slug = ?")
    .run(new Date().toISOString(), slug);
  return result.changes > 0;
}

/**
 * Delete a deep context (cascades to history).
 */
export function deleteDeep(db: Database.Database, slug: string): boolean {
  const result = db.prepare("DELETE FROM deep WHERE slug = ?").run(slug);
  return result.changes > 0;
}

/**
 * Get version history for a deep context.
 */
export function getDeepHistory(
  db: Database.Database,
  slug: string
): Array<{
  id: number;
  version: number;
  title: string;
  content_md: string;
  watches: DeepWatch[] | null;
  ai_model: string | null;
  created_at: string;
}> {
  const rows = db
    .prepare(
      "SELECT * FROM deep_history WHERE slug = ? ORDER BY version DESC"
    )
    .all(slug) as Record<string, unknown>[];

  return rows.map((row) => ({
    id: row.id as number,
    version: row.version as number,
    title: row.title as string,
    content_md: row.content_md as string,
    watches: row.watches ? JSON.parse(row.watches as string) : null,
    ai_model: row.ai_model as string | null,
    created_at: row.created_at as string,
  }));
}

/**
 * Get a specific version from history.
 */
export function getDeepVersion(
  db: Database.Database,
  slug: string,
  version: number
): {
  id: number;
  version: number;
  title: string;
  content_md: string;
  watches: DeepWatch[] | null;
  ai_model: string | null;
  created_at: string;
} | null {
  const row = db
    .prepare("SELECT * FROM deep_history WHERE slug = ? AND version = ?")
    .get(slug, version) as Record<string, unknown> | undefined;

  if (!row) return null;

  return {
    id: row.id as number,
    version: row.version as number,
    title: row.title as string,
    content_md: row.content_md as string,
    watches: row.watches ? JSON.parse(row.watches as string) : null,
    ai_model: row.ai_model as string | null,
    created_at: row.created_at as string,
  };
}

/**
 * Count deep contexts.
 */
export function countDeep(db: Database.Database): number {
  const result = db
    .prepare("SELECT COUNT(*) as count FROM deep")
    .get() as { count: number };
  return result.count;
}
