use std::collections::{HashMap, HashSet};

use crate::walker::FileEntry;

/// Stored file metadata from database
#[derive(Debug, Clone)]
pub struct StoredFile {
    pub path: String,
    pub content_hash: String,
    pub mtime: i64,
    pub size: i64,
}

/// Result of checking a file against the cache
pub enum CacheResult {
    /// File unchanged (mtime + size match), returns cached hash
    Unchanged(String),
    /// File changed (mtime or size different), needs re-hashing
    Changed,
    /// New file (not in cache), needs hashing
    New,
}

/// mtime-based cache for avoiding unnecessary file hashing
/// This is the key insight from Git's index - only hash files that might have changed
pub struct MtimeCache {
    /// Map of path -> stored file metadata
    stored: HashMap<String, StoredFile>,
}

impl MtimeCache {
    /// Create a new cache from stored file data
    pub fn new(stored_files: Vec<StoredFile>) -> Self {
        let stored: HashMap<String, StoredFile> = stored_files
            .into_iter()
            .map(|f| (f.path.clone(), f))
            .collect();

        Self { stored }
    }

    /// Check if a file needs to be hashed
    ///
    /// Returns:
    /// - Unchanged(hash) if mtime + size match cached values
    /// - Changed if mtime or size differ
    /// - New if file not in cache
    pub fn check(&self, entry: &FileEntry) -> CacheResult {
        match self.stored.get(&entry.path) {
            Some(stored) => {
                // Compare mtime and size
                // If both match, trust the cached hash
                if entry.mtime == stored.mtime && entry.size == stored.size {
                    CacheResult::Unchanged(stored.content_hash.clone())
                } else {
                    CacheResult::Changed
                }
            }
            None => CacheResult::New,
        }
    }

    /// Find files that were in the cache but not in current paths (deleted files)
    pub fn find_removed(&self, current_paths: &HashSet<String>) -> Vec<String> {
        self.stored
            .keys()
            .filter(|path| !current_paths.contains(*path))
            .cloned()
            .collect()
    }

    /// Get the number of stored files
    #[allow(dead_code)]
    pub fn len(&self) -> usize {
        self.stored.len()
    }

    /// Check if cache is empty
    #[allow(dead_code)]
    pub fn is_empty(&self) -> bool {
        self.stored.is_empty()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn make_entry(path: &str, mtime: i64, size: i64) -> FileEntry {
        FileEntry {
            path: path.to_string(),
            folder_path: "/".to_string(),
            mtime,
            size,
            content_hash: String::new(),
        }
    }

    fn make_stored(path: &str, mtime: i64, size: i64, hash: &str) -> StoredFile {
        StoredFile {
            path: path.to_string(),
            content_hash: hash.to_string(),
            mtime,
            size,
        }
    }

    #[test]
    fn test_cache_unchanged() {
        let stored = vec![make_stored("/src/main.rs", 1000, 500, "abc123")];
        let cache = MtimeCache::new(stored);

        let entry = make_entry("/src/main.rs", 1000, 500);
        match cache.check(&entry) {
            CacheResult::Unchanged(hash) => assert_eq!(hash, "abc123"),
            _ => panic!("Expected Unchanged"),
        }
    }

    #[test]
    fn test_cache_changed_mtime() {
        let stored = vec![make_stored("/src/main.rs", 1000, 500, "abc123")];
        let cache = MtimeCache::new(stored);

        let entry = make_entry("/src/main.rs", 2000, 500); // Different mtime
        match cache.check(&entry) {
            CacheResult::Changed => {}
            _ => panic!("Expected Changed"),
        }
    }

    #[test]
    fn test_cache_changed_size() {
        let stored = vec![make_stored("/src/main.rs", 1000, 500, "abc123")];
        let cache = MtimeCache::new(stored);

        let entry = make_entry("/src/main.rs", 1000, 600); // Different size
        match cache.check(&entry) {
            CacheResult::Changed => {}
            _ => panic!("Expected Changed"),
        }
    }

    #[test]
    fn test_cache_new() {
        let stored = vec![make_stored("/src/main.rs", 1000, 500, "abc123")];
        let cache = MtimeCache::new(stored);

        let entry = make_entry("/src/new.rs", 1000, 500);
        match cache.check(&entry) {
            CacheResult::New => {}
            _ => panic!("Expected New"),
        }
    }

    #[test]
    fn test_find_removed() {
        let stored = vec![
            make_stored("/src/main.rs", 1000, 500, "abc123"),
            make_stored("/src/deleted.rs", 1000, 500, "def456"),
        ];
        let cache = MtimeCache::new(stored);

        let current: HashSet<String> = vec!["/src/main.rs".to_string()].into_iter().collect();
        let removed = cache.find_removed(&current);

        assert_eq!(removed.len(), 1);
        assert!(removed.contains(&"/src/deleted.rs".to_string()));
    }
}
