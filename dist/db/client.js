import Database from "better-sqlite3";
import { CREATE_TABLES_SQL } from "./schema.js";
/**
 * Database client for FloatPrompt context database.
 *
 * Usage:
 *   const db = createDatabase('.float/float.db');
 *   // use db for queries
 *   db.close();
 */
export function createDatabase(dbPath) {
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
export function insertLogEntry(db, entry) {
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
export function getAllLogEntries(db) {
    return db
        .prepare(`
    SELECT id, folder_path, date, topic, status, title, decision, rationale,
           before_state, after_state, files_changed, future_agent,
           supersedes, superseded_by, created_at
    FROM log_entries
    ORDER BY date, id
  `)
        .all();
}
/**
 * Count log entries.
 */
export function countLogEntries(db) {
    const result = db
        .prepare("SELECT COUNT(*) as count FROM log_entries")
        .get();
    return result.count;
}
/**
 * Check if a log entry exists by date and topic.
 */
export function logEntryExists(db, date, topic) {
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
export function insertDeep(db, deep) {
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
export function getDeep(db, slug) {
    const row = db
        .prepare("SELECT * FROM deep WHERE slug = ?")
        .get(slug);
    if (!row)
        return null;
    return {
        slug: row.slug,
        title: row.title,
        content_md: row.content_md,
        watches: row.watches ? JSON.parse(row.watches) : null,
        status: row.status,
        ai_model: row.ai_model,
        created_at: row.created_at,
        updated_at: row.updated_at,
    };
}
/**
 * List all deep contexts.
 */
export function listDeep(db) {
    const rows = db
        .prepare("SELECT * FROM deep ORDER BY slug")
        .all();
    return rows.map((row) => ({
        slug: row.slug,
        title: row.title,
        content_md: row.content_md,
        watches: row.watches ? JSON.parse(row.watches) : null,
        status: row.status,
        ai_model: row.ai_model,
        created_at: row.created_at,
        updated_at: row.updated_at,
    }));
}
/**
 * Update a deep context. Saves current version to history first.
 */
export function updateDeep(db, slug, updates) {
    const existing = getDeep(db, slug);
    if (!existing)
        return false;
    // Save current version to history
    const maxVersion = db
        .prepare("SELECT MAX(version) as max FROM deep_history WHERE slug = ?")
        .get(slug);
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
    const setClause = ["updated_at = @updated_at"];
    const params = { slug, updated_at: now };
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
    db.prepare(`UPDATE deep SET ${setClause.join(", ")} WHERE slug = @slug`).run(params);
    return true;
}
/**
 * Mark a deep context as stale.
 */
export function markDeepStale(db, slug) {
    const result = db
        .prepare("UPDATE deep SET status = 'stale', updated_at = ? WHERE slug = ?")
        .run(new Date().toISOString(), slug);
    return result.changes > 0;
}
/**
 * Delete a deep context (cascades to history).
 */
export function deleteDeep(db, slug) {
    const result = db.prepare("DELETE FROM deep WHERE slug = ?").run(slug);
    return result.changes > 0;
}
/**
 * Get version history for a deep context.
 */
export function getDeepHistory(db, slug) {
    const rows = db
        .prepare("SELECT * FROM deep_history WHERE slug = ? ORDER BY version DESC")
        .all(slug);
    return rows.map((row) => ({
        id: row.id,
        version: row.version,
        title: row.title,
        content_md: row.content_md,
        watches: row.watches ? JSON.parse(row.watches) : null,
        ai_model: row.ai_model,
        created_at: row.created_at,
    }));
}
/**
 * Get a specific version from history.
 */
export function getDeepVersion(db, slug, version) {
    const row = db
        .prepare("SELECT * FROM deep_history WHERE slug = ? AND version = ?")
        .get(slug, version);
    if (!row)
        return null;
    return {
        id: row.id,
        version: row.version,
        title: row.title,
        content_md: row.content_md,
        watches: row.watches ? JSON.parse(row.watches) : null,
        ai_model: row.ai_model,
        created_at: row.created_at,
    };
}
/**
 * Count deep contexts.
 */
export function countDeep(db) {
    const result = db
        .prepare("SELECT COUNT(*) as count FROM deep")
        .get();
    return result.count;
}
//# sourceMappingURL=client.js.map