use std::collections::{BTreeMap, HashMap, HashSet};
use std::path::Path;

use crate::hasher;
use crate::walker::FileEntry;

/// A node in the merkle tree (folder)
#[derive(Debug, Clone)]
#[allow(dead_code)]
struct FolderNode {
    /// Path relative to project root (e.g., "/src/db")
    path: String,
    /// Hash of this folder (computed from children)
    hash: String,
    /// Child folder paths (for future tree traversal)
    child_folders: Vec<String>,
    /// Child file paths (for future tree traversal)
    child_files: Vec<String>,
}

/// Merkle tree for a project directory
/// Enables O(log n) change detection by comparing hashes from root down
pub struct MerkleTree {
    /// All folder nodes by path
    folders: HashMap<String, FolderNode>,
    /// Root hash
    root_hash: String,
}

impl MerkleTree {
    /// Build a merkle tree from file entries
    ///
    /// Algorithm:
    /// 1. Group files by folder path
    /// 2. Build folder tree structure
    /// 3. Compute hashes bottom-up (leaves first, then parents)
    ///
    /// folder_hash = SHA256(sorted([child_name + ":" + child_hash for all children]))
    pub fn build(entries: &[&FileEntry], project_dir: &Path) -> Self {
        // Group files by folder
        let mut files_by_folder: HashMap<String, Vec<&FileEntry>> = HashMap::new();
        let mut all_folders: HashSet<String> = HashSet::new();

        for entry in entries {
            let folder = normalize_folder_path(&entry.folder_path, &entry.path, project_dir);
            files_by_folder
                .entry(folder.clone())
                .or_default()
                .push(entry);

            // Also add all parent folders
            let mut current = folder.as_str();
            while !current.is_empty() && current != "/" {
                all_folders.insert(current.to_string());
                current = parent_path(current);
            }
            all_folders.insert("/".to_string());
        }

        // Add folders that have files
        for folder in files_by_folder.keys() {
            all_folders.insert(folder.clone());
        }

        // Build folder tree structure
        let mut folder_children: HashMap<String, Vec<String>> = HashMap::new();
        for folder in &all_folders {
            if folder != "/" {
                let parent = parent_path(folder);
                folder_children
                    .entry(parent.to_string())
                    .or_default()
                    .push(folder.clone());
            }
        }

        // Sort folders by depth (deepest first) for bottom-up hash computation
        let mut sorted_folders: Vec<&String> = all_folders.iter().collect();
        sorted_folders.sort_by(|a, b| {
            let depth_a = a.matches('/').count();
            let depth_b = b.matches('/').count();
            depth_b.cmp(&depth_a) // Deepest first
        });

        // Compute hashes bottom-up
        let mut folder_hashes: HashMap<String, String> = HashMap::new();
        let mut folders: HashMap<String, FolderNode> = HashMap::new();

        for folder_path in sorted_folders {
            let mut hash_input: BTreeMap<String, String> = BTreeMap::new();

            // Add file hashes
            if let Some(files) = files_by_folder.get(folder_path) {
                for file in files {
                    let name = file_name(&file.path);
                    hash_input.insert(name, file.content_hash.clone());
                }
            }

            // Add subfolder hashes
            if let Some(children) = folder_children.get(folder_path) {
                for child in children {
                    let name = folder_name(child);
                    if let Some(child_hash) = folder_hashes.get(child) {
                        hash_input.insert(name, child_hash.clone());
                    }
                }
            }

            // Compute folder hash from sorted children
            let hash_string: String = hash_input
                .iter()
                .map(|(name, hash)| format!("{}:{}", name, hash))
                .collect::<Vec<_>>()
                .join("\n");

            let folder_hash = if hash_string.is_empty() {
                // Empty folder gets a deterministic empty hash
                hasher::hash_string("empty")
            } else {
                hasher::hash_string(&hash_string)
            };

            folder_hashes.insert(folder_path.clone(), folder_hash.clone());

            let child_folders = folder_children
                .get(folder_path)
                .cloned()
                .unwrap_or_default();
            let child_files = files_by_folder
                .get(folder_path)
                .map(|files| files.iter().map(|f| f.path.clone()).collect())
                .unwrap_or_default();

            folders.insert(
                folder_path.clone(),
                FolderNode {
                    path: folder_path.clone(),
                    hash: folder_hash,
                    child_folders,
                    child_files,
                },
            );
        }

        let root_hash = folder_hashes.get("/").cloned().unwrap_or_default();

        Self { folders, root_hash }
    }

    /// Get the root hash of the tree
    pub fn root_hash(&self) -> String {
        self.root_hash.clone()
    }

    /// Get all folder hashes (path -> hash)
    pub fn folder_hashes(&self) -> Vec<(String, String)> {
        self.folders
            .values()
            .map(|f| (f.path.clone(), f.hash.clone()))
            .collect()
    }

    /// Find folders that changed compared to previous root hash
    /// Returns all folders that need to be marked stale
    ///
    /// For now, this is a simple implementation that returns all folders
    /// if the root hash changed. A more sophisticated version would
    /// traverse the tree to find exactly which folders changed.
    pub fn changed_folders(&self, previous_root_hash: &str) -> Vec<String> {
        if self.root_hash == previous_root_hash {
            return vec![];
        }

        // For now, return all folders
        // TODO: Implement proper tree traversal to find only changed folders
        self.folders.keys().cloned().collect()
    }

    /// Get a specific folder's hash
    #[allow(dead_code)]
    pub fn get_folder_hash(&self, path: &str) -> Option<String> {
        self.folders.get(path).map(|f| f.hash.clone())
    }
}

/// Normalize a folder path
fn normalize_folder_path(folder_path: &str, file_path: &str, project_dir: &Path) -> String {
    // If we have a valid folder path, use it
    if !folder_path.is_empty() && folder_path != "/" {
        return folder_path.to_string();
    }

    // Otherwise derive from file path
    let path = Path::new(file_path);
    if let Some(parent) = path.parent() {
        if let Ok(relative) = parent.strip_prefix(project_dir) {
            let s = relative.to_string_lossy();
            if s.is_empty() {
                return "/".to_string();
            }
            return format!("/{}", s);
        }
    }

    "/".to_string()
}

/// Get parent path
fn parent_path(path: &str) -> &str {
    if path == "/" || path.is_empty() {
        return "/";
    }
    match path.rfind('/') {
        Some(0) => "/",
        Some(idx) => &path[..idx],
        None => "/",
    }
}

/// Get file name from path
fn file_name(path: &str) -> String {
    Path::new(path)
        .file_name()
        .map(|s| s.to_string_lossy().to_string())
        .unwrap_or_default()
}

/// Get folder name from path
fn folder_name(path: &str) -> String {
    if path == "/" {
        return "/".to_string();
    }
    Path::new(path)
        .file_name()
        .map(|s| s.to_string_lossy().to_string())
        .unwrap_or_default()
}

#[cfg(test)]
mod tests {
    use super::*;

    fn make_entry(path: &str, folder: &str, hash: &str) -> FileEntry {
        FileEntry {
            path: path.to_string(),
            folder_path: folder.to_string(),
            mtime: 0,
            size: 0,
            content_hash: hash.to_string(),
        }
    }

    #[test]
    fn test_single_file() {
        let entries = vec![make_entry("/project/main.rs", "/", "abc123")];
        let refs: Vec<&FileEntry> = entries.iter().collect();
        let tree = MerkleTree::build(&refs, Path::new("/project"));

        assert!(!tree.root_hash().is_empty());
    }

    #[test]
    fn test_nested_folders() {
        let entries = vec![
            make_entry("/project/src/main.rs", "/src", "abc123"),
            make_entry("/project/src/lib.rs", "/src", "def456"),
            make_entry("/project/README.md", "/", "readme"),
        ];
        let refs: Vec<&FileEntry> = entries.iter().collect();
        let tree = MerkleTree::build(&refs, Path::new("/project"));

        // Should have hashes for /, /src
        assert!(tree.get_folder_hash("/").is_some());
        assert!(tree.get_folder_hash("/src").is_some());
    }

    #[test]
    fn test_deterministic_hash() {
        let entries = vec![
            make_entry("/project/a.txt", "/", "hash_a"),
            make_entry("/project/b.txt", "/", "hash_b"),
        ];
        let refs: Vec<&FileEntry> = entries.iter().collect();
        let tree1 = MerkleTree::build(&refs, Path::new("/project"));

        // Same entries, different order
        let entries2 = vec![
            make_entry("/project/b.txt", "/", "hash_b"),
            make_entry("/project/a.txt", "/", "hash_a"),
        ];
        let refs2: Vec<&FileEntry> = entries2.iter().collect();
        let tree2 = MerkleTree::build(&refs2, Path::new("/project"));

        // Should produce same hash (BTreeMap sorts)
        assert_eq!(tree1.root_hash(), tree2.root_hash());
    }

    #[test]
    fn test_parent_path() {
        assert_eq!(parent_path("/src/db"), "/src");
        assert_eq!(parent_path("/src"), "/");
        assert_eq!(parent_path("/"), "/");
    }
}
