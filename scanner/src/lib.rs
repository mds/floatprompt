use napi::bindgen_prelude::*;
use napi_derive::napi;
use std::path::Path;

mod cache;
mod db;
mod hasher;
mod merkle;
mod walker;

use cache::MtimeCache;
use db::Database;
use merkle::MerkleTree;
use walker::FileEntry;

/// Options for scanning a project directory
#[napi(object)]
#[derive(Debug, Clone)]
pub struct ScanOptions {
    /// Root directory to scan
    pub project_dir: String,
    /// Path to float.db
    pub db_path: String,
    /// Additional patterns to exclude (optional)
    pub exclude_patterns: Option<Vec<String>>,
}

/// Warning from scan (non-fatal issues)
#[napi(object)]
#[derive(Debug, Clone)]
pub struct ScanWarning {
    pub path: String,
    pub message: String,
    pub code: String,
}

/// Statistics from the scan
#[napi(object)]
#[derive(Debug, Clone)]
pub struct ScanStats {
    /// Total folders in DB after scan
    pub folders: u32,
    /// Total files in DB after scan
    pub files: u32,
    /// Files stat'd during walk
    pub files_walked: u32,
    /// Files actually hashed (mtime changed)
    pub files_hashed: u32,
    /// Files skipped (mtime unchanged, used cache)
    pub files_skipped: u32,
    /// Total scan time in milliseconds
    pub duration_ms: u32,
}

/// Result of scanning a project
#[napi(object)]
#[derive(Debug, Clone)]
pub struct ScanResult {
    /// Paths with different hashes
    pub changed: Vec<String>,
    /// New paths not in DB
    pub added: Vec<String>,
    /// Paths in DB but not on disk
    pub removed: Vec<String>,
    /// Scan statistics
    pub stats: ScanStats,
    /// New root hash
    pub root_hash: String,
    /// Previous root hash (empty string if first scan)
    pub previous_root_hash: String,
    /// True if root hash matches (no changes at all)
    pub unchanged: bool,
    /// Non-fatal warnings
    pub warnings: Vec<ScanWarning>,
}

/// Main scan function - called from Node.js
#[napi]
pub fn scan(options: ScanOptions) -> Result<ScanResult> {
    let start = std::time::Instant::now();

    let project_dir = Path::new(&options.project_dir);
    let db_path = Path::new(&options.db_path);

    // Open database (creates if not exists, WAL mode)
    let mut database = Database::open(db_path)
        .map_err(|e| Error::from_reason(format!("Failed to open database: {}", e)))?;

    // Get previous root hash
    let previous_root_hash = database.get_root_hash().unwrap_or_default();

    // Load stored file metadata for mtime comparison
    let stored_files = database.get_all_files()
        .map_err(|e| Error::from_reason(format!("Failed to load files: {}", e)))?;

    let cache = MtimeCache::new(stored_files);

    // Phase 1: Walk filesystem
    let exclude_patterns = options.exclude_patterns.unwrap_or_default();
    let (entries, walk_warnings) = walker::walk_directory(project_dir, &exclude_patterns);

    let files_walked = entries.len() as u32;

    // Phase 2 & 3: Compare mtimes and hash only changed files
    let mut to_update: Vec<FileEntry> = Vec::new();
    let mut new_files: Vec<FileEntry> = Vec::new();
    let mut unchanged_entries: Vec<FileEntry> = Vec::new();
    let mut files_hashed = 0u32;
    let mut files_skipped = 0u32;

    for mut entry in entries {
        match cache.check(&entry) {
            cache::CacheResult::Unchanged(cached_hash) => {
                // mtime + size unchanged, use cached hash
                entry.content_hash = cached_hash;
                unchanged_entries.push(entry);
                files_skipped += 1;
            }
            cache::CacheResult::Changed => {
                // mtime or size changed, need to re-hash
                entry.content_hash = hasher::hash_file(&entry.path);
                to_update.push(entry);
                files_hashed += 1;
            }
            cache::CacheResult::New => {
                // New file, need to hash
                entry.content_hash = hasher::hash_file(&entry.path);
                new_files.push(entry);
                files_hashed += 1;
            }
        }
    }

    // Find removed files
    let current_paths: std::collections::HashSet<_> =
        to_update.iter()
            .chain(new_files.iter())
            .chain(unchanged_entries.iter())
            .map(|e| e.path.clone())
            .collect();

    let removed: Vec<String> = cache.find_removed(&current_paths);

    // Phase 4: Build merkle tree
    let all_entries: Vec<&FileEntry> = to_update.iter()
        .chain(new_files.iter())
        .chain(unchanged_entries.iter())
        .collect();

    let tree = MerkleTree::build(&all_entries, project_dir);
    let root_hash = tree.root_hash();

    // Phase 5: Early exit if nothing changed
    let unchanged = root_hash == previous_root_hash && removed.is_empty();

    if unchanged {
        let duration_ms = start.elapsed().as_millis() as u32;
        return Ok(ScanResult {
            changed: vec![],
            added: vec![],
            removed: vec![],
            stats: ScanStats {
                folders: database.count_folders().unwrap_or(0),
                files: database.count_files().unwrap_or(0),
                files_walked,
                files_hashed: 0,
                files_skipped,
                duration_ms,
            },
            root_hash,
            previous_root_hash,
            unchanged: true,
            warnings: walk_warnings,
        });
    }

    // Phase 6: Update database
    database.transaction(|tx| {
        // Update changed files
        for entry in &to_update {
            tx.upsert_file(entry)?;
        }

        // Insert new files
        for entry in &new_files {
            tx.upsert_file(entry)?;
        }

        // Remove deleted files
        for path in &removed {
            tx.delete_file(path)?;
        }

        // Update folder hashes and mark stale
        for (folder_path, folder_hash) in tree.folder_hashes() {
            tx.update_folder_hash(&folder_path, &folder_hash)?;
        }

        // Mark changed folders as stale
        for folder_path in tree.changed_folders(&previous_root_hash) {
            tx.mark_folder_stale(&folder_path)?;
        }

        // Store new root hash
        tx.set_root_hash(&root_hash)?;

        Ok(())
    }).map_err(|e| Error::from_reason(format!("Database transaction failed: {}", e)))?;

    let duration_ms = start.elapsed().as_millis() as u32;

    let changed: Vec<String> = to_update.iter().map(|e| e.path.clone()).collect();
    let added: Vec<String> = new_files.iter().map(|e| e.path.clone()).collect();

    Ok(ScanResult {
        changed,
        added,
        removed,
        stats: ScanStats {
            folders: database.count_folders().unwrap_or(0),
            files: database.count_files().unwrap_or(0),
            files_walked,
            files_hashed,
            files_skipped,
            duration_ms,
        },
        root_hash,
        previous_root_hash,
        unchanged: false,
        warnings: walk_warnings,
    })
}
