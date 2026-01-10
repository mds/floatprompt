use rusqlite::{params, Connection, Result, Transaction};
use std::path::Path;

use crate::cache::StoredFile;
use crate::walker::FileEntry;

/// Database wrapper for float.db operations
pub struct Database {
    conn: Connection,
}

impl Database {
    /// Open database connection with WAL mode
    pub fn open(path: &Path) -> Result<Self> {
        let conn = Connection::open(path)?;

        // Enable WAL mode for better concurrency
        conn.execute_batch(
            "PRAGMA journal_mode = WAL;
             PRAGMA synchronous = NORMAL;
             PRAGMA cache_size = 10000;
             PRAGMA temp_store = MEMORY;",
        )?;

        // Ensure tables exist (scanner might run before float init)
        Self::ensure_tables(&conn)?;

        // Migration: add size column if missing (ignore error if already exists)
        let _ = conn.execute("ALTER TABLE files ADD COLUMN size INTEGER DEFAULT 0", []);

        Ok(Self { conn })
    }

    /// Ensure required tables exist
    fn ensure_tables(conn: &Connection) -> Result<()> {
        conn.execute_batch(
            r#"
            CREATE TABLE IF NOT EXISTS files (
                path TEXT PRIMARY KEY,
                folder_path TEXT NOT NULL,
                content_hash TEXT NOT NULL,
                mtime INTEGER NOT NULL,
                size INTEGER DEFAULT 0,
                last_scanned_at INTEGER NOT NULL
            );

            CREATE TABLE IF NOT EXISTS folders (
                path TEXT PRIMARY KEY,
                parent_path TEXT,
                name TEXT NOT NULL,
                type TEXT,
                status TEXT NOT NULL DEFAULT 'pending',
                description TEXT,
                context TEXT,
                is_scope INTEGER NOT NULL DEFAULT 0,
                parent_scope_path TEXT,
                scope_boot TEXT,
                source_hash TEXT,
                last_scanned_at INTEGER,
                ai_model TEXT,
                ai_updated INTEGER,
                created_at INTEGER NOT NULL,
                updated_at INTEGER NOT NULL
            );

            CREATE TABLE IF NOT EXISTS scanner_meta (
                key TEXT PRIMARY KEY,
                value TEXT NOT NULL
            );

            CREATE INDEX IF NOT EXISTS idx_files_folder ON files(folder_path);
            CREATE INDEX IF NOT EXISTS idx_folders_parent ON folders(parent_path);
            CREATE INDEX IF NOT EXISTS idx_folders_status ON folders(status);
            "#,
        )?;
        Ok(())
    }

    /// Get the stored root hash
    pub fn get_root_hash(&self) -> Option<String> {
        self.conn
            .query_row(
                "SELECT value FROM scanner_meta WHERE key = 'root_hash'",
                [],
                |row| row.get(0),
            )
            .ok()
    }

    /// Get all stored files for mtime comparison
    pub fn get_all_files(&self) -> Result<Vec<StoredFile>> {
        let mut stmt = self.conn.prepare(
            "SELECT path, content_hash, mtime, COALESCE(size, 0) as size FROM files",
        )?;

        let files = stmt
            .query_map([], |row| {
                Ok(StoredFile {
                    path: row.get(0)?,
                    content_hash: row.get(1)?,
                    mtime: row.get(2)?,
                    size: row.get(3)?,
                })
            })?
            .filter_map(|r| r.ok())
            .collect();

        Ok(files)
    }

    /// Count total files
    pub fn count_files(&self) -> Result<u32> {
        self.conn
            .query_row("SELECT COUNT(*) FROM files", [], |row| row.get(0))
    }

    /// Count total folders
    pub fn count_folders(&self) -> Result<u32> {
        self.conn
            .query_row("SELECT COUNT(*) FROM folders", [], |row| row.get(0))
    }

    /// Execute operations in a transaction
    pub fn transaction<F, T>(&mut self, f: F) -> Result<T>
    where
        F: FnOnce(&mut DbTransaction) -> Result<T>,
    {
        let tx = self.conn.transaction()?;
        let mut db_tx = DbTransaction { tx };
        let result = f(&mut db_tx)?;
        db_tx.tx.commit()?;
        Ok(result)
    }
}

/// Transaction wrapper for batch operations
pub struct DbTransaction<'a> {
    tx: Transaction<'a>,
}

impl<'a> DbTransaction<'a> {
    /// Upsert a file entry
    pub fn upsert_file(&self, entry: &FileEntry) -> Result<()> {
        let now = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .map(|d| d.as_secs() as i64)
            .unwrap_or(0);

        self.tx.execute(
            r#"INSERT INTO files (path, folder_path, content_hash, mtime, size, last_scanned_at)
               VALUES (?1, ?2, ?3, ?4, ?5, ?6)
               ON CONFLICT(path) DO UPDATE SET
                   folder_path = excluded.folder_path,
                   content_hash = excluded.content_hash,
                   mtime = excluded.mtime,
                   size = excluded.size,
                   last_scanned_at = excluded.last_scanned_at"#,
            params![
                entry.path,
                entry.folder_path,
                entry.content_hash,
                entry.mtime,
                entry.size,
                now
            ],
        )?;
        Ok(())
    }

    /// Delete a file entry
    pub fn delete_file(&self, path: &str) -> Result<()> {
        self.tx
            .execute("DELETE FROM files WHERE path = ?1", params![path])?;
        Ok(())
    }

    /// Update folder hash (source_hash)
    pub fn update_folder_hash(&self, path: &str, hash: &str) -> Result<()> {
        let now = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .map(|d| d.as_secs() as i64)
            .unwrap_or(0);

        // First check if folder exists
        let exists: bool = self
            .tx
            .query_row(
                "SELECT 1 FROM folders WHERE path = ?1",
                params![path],
                |_| Ok(true),
            )
            .unwrap_or(false);

        if exists {
            // Update existing folder
            self.tx.execute(
                r#"UPDATE folders
                   SET source_hash = ?2, last_scanned_at = ?3, updated_at = ?3
                   WHERE path = ?1"#,
                params![path, hash, now],
            )?;
        } else {
            // Insert new folder
            let name = Path::new(path)
                .file_name()
                .map(|s| s.to_string_lossy().to_string())
                .unwrap_or_else(|| if path == "/" { "" } else { path }.to_string());

            let parent_path = if path == "/" {
                None
            } else {
                Some(
                    Path::new(path)
                        .parent()
                        .map(|p| {
                            let s = p.to_string_lossy();
                            if s.is_empty() {
                                "/".to_string()
                            } else {
                                s.to_string()
                            }
                        })
                        .unwrap_or_else(|| "/".to_string()),
                )
            };

            self.tx.execute(
                r#"INSERT INTO folders (path, parent_path, name, status, source_hash, last_scanned_at, created_at, updated_at)
                   VALUES (?1, ?2, ?3, 'pending', ?4, ?5, ?5, ?5)"#,
                params![path, parent_path, name, hash, now],
            )?;
        }

        Ok(())
    }

    /// Mark a folder as stale (needs AI refresh)
    pub fn mark_folder_stale(&self, path: &str) -> Result<()> {
        let now = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .map(|d| d.as_secs() as i64)
            .unwrap_or(0);

        // Only mark as stale if it was previously 'current' (had AI content)
        self.tx.execute(
            r#"UPDATE folders
               SET status = 'stale', updated_at = ?2
               WHERE path = ?1 AND status = 'current'"#,
            params![path, now],
        )?;
        Ok(())
    }

    /// Store the root hash
    pub fn set_root_hash(&self, hash: &str) -> Result<()> {
        self.tx.execute(
            r#"INSERT INTO scanner_meta (key, value) VALUES ('root_hash', ?1)
               ON CONFLICT(key) DO UPDATE SET value = excluded.value"#,
            params![hash],
        )?;
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use tempfile::tempdir;

    #[test]
    fn test_open_database() {
        let dir = tempdir().unwrap();
        let db_path = dir.path().join("test.db");

        let db = Database::open(&db_path).unwrap();
        assert_eq!(db.count_files().unwrap(), 0);
        assert_eq!(db.count_folders().unwrap(), 0);
    }

    #[test]
    fn test_upsert_file() {
        let dir = tempdir().unwrap();
        let db_path = dir.path().join("test.db");

        let mut db = Database::open(&db_path).unwrap();

        let entry = FileEntry {
            path: "/project/main.rs".to_string(),
            folder_path: "/".to_string(),
            mtime: 1000,
            size: 500,
            content_hash: "abc123".to_string(),
        };

        db.transaction(|tx| tx.upsert_file(&entry)).unwrap();

        assert_eq!(db.count_files().unwrap(), 1);

        let files = db.get_all_files().unwrap();
        assert_eq!(files.len(), 1);
        assert_eq!(files[0].path, "/project/main.rs");
        assert_eq!(files[0].content_hash, "abc123");
    }

    #[test]
    fn test_root_hash() {
        let dir = tempdir().unwrap();
        let db_path = dir.path().join("test.db");

        let mut db = Database::open(&db_path).unwrap();

        assert!(db.get_root_hash().is_none());

        db.transaction(|tx| tx.set_root_hash("roothash123"))
            .unwrap();

        assert_eq!(db.get_root_hash(), Some("roothash123".to_string()));
    }
}
