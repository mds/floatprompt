use ignore::WalkBuilder;
use std::fs;
use std::path::Path;
use std::time::SystemTime;

use crate::ScanWarning;

/// Represents a file entry from the filesystem walk
#[derive(Debug, Clone)]
pub struct FileEntry {
    /// Absolute path to the file
    pub path: String,
    /// Parent folder path (relative to project root)
    pub folder_path: String,
    /// File modification time (unix timestamp)
    pub mtime: i64,
    /// File size in bytes
    pub size: i64,
    /// Content hash (filled in later by hasher)
    pub content_hash: String,
}

/// Walk a directory and return all file entries
/// Uses the `ignore` crate to respect .gitignore
pub fn walk_directory(
    project_dir: &Path,
    exclude_patterns: &[String],
) -> (Vec<FileEntry>, Vec<ScanWarning>) {
    let mut warnings: Vec<ScanWarning> = Vec::new();

    // Build the walker with gitignore support
    let mut builder = WalkBuilder::new(project_dir);
    builder
        .hidden(false)           // Include hidden files (let gitignore decide)
        .git_ignore(true)        // Respect .gitignore
        .git_global(true)        // Respect global gitignore
        .git_exclude(true)       // Respect .git/info/exclude
        .ignore(true)            // Respect .ignore files
        .parents(true)           // Check parent directories for ignore files
        .follow_links(false);    // Don't follow symlinks (avoid loops)

    // Add custom exclude patterns
    for pattern in exclude_patterns {
        // add_ignore returns Option<Error>, Some if there was an error
        if let Some(e) = builder.add_ignore(Path::new(pattern)) {
            warnings.push(ScanWarning {
                path: pattern.clone(),
                message: format!("Invalid exclude pattern: {}", e),
                code: "INVALID_PATTERN".to_string(),
            });
        }
    }

    // Always exclude .float directory itself (we don't want to index our own DB)
    // The ignore crate doesn't have a direct way to add patterns, so we filter later

    // Collect entries in parallel
    let walk = builder.build();
    let entries: Vec<_> = walk
        .filter_map(|result| {
            match result {
                Ok(entry) => {
                    // Skip directories - we only care about files
                    if !entry.file_type().map(|ft| ft.is_file()).unwrap_or(false) {
                        return None;
                    }

                    let path = entry.path();
                    let path_str = path.to_string_lossy().to_string();

                    // Skip .float directory
                    if path_str.contains("/.float/") || path_str.contains("\\.float\\") {
                        return None;
                    }

                    // Skip node_modules, .git, etc. (ignore crate should handle this,
                    // but we add explicit checks for common cases)
                    let components: Vec<_> = path.components().collect();
                    for component in &components {
                        let name = component.as_os_str().to_string_lossy();
                        if name == "node_modules"
                            || name == ".git"
                            || name == "__pycache__"
                            || name == ".pytest_cache"
                            || name == "target"  // Rust target directory
                            || name == "dist"
                            || name == "build"
                            || name == ".next"
                            || name == ".nuxt"
                            || name == ".venv"
                            || name == "venv"
                        {
                            return None;
                        }
                    }

                    // Get file metadata
                    match fs::metadata(path) {
                        Ok(meta) => {
                            let mtime = meta
                                .modified()
                                .ok()
                                .and_then(|t| t.duration_since(SystemTime::UNIX_EPOCH).ok())
                                .map(|d| d.as_secs() as i64)
                                .unwrap_or(0);

                            let size = meta.len() as i64;

                            // Calculate folder path relative to project root
                            let folder_path = path
                                .parent()
                                .and_then(|p| p.strip_prefix(entry.path().ancestors().last().unwrap_or(path)).ok())
                                .map(|p| format!("/{}", p.to_string_lossy()))
                                .unwrap_or_else(|| "/".to_string());

                            Some(FileEntry {
                                path: path_str,
                                folder_path,
                                mtime,
                                size,
                                content_hash: String::new(), // Filled in later
                            })
                        }
                        Err(_) => {
                            // Can't handle warnings in parallel easily, skip for now
                            // In production, we'd use a concurrent queue
                            None
                        }
                    }
                }
                Err(_) => {
                    // Walk error - permission denied, etc.
                    None
                }
            }
        })
        .collect();

    (entries, warnings)
}

/// Get the relative path from project root
#[allow(dead_code)]
pub fn relative_path(path: &Path, project_dir: &Path) -> String {
    path.strip_prefix(project_dir)
        .map(|p| format!("/{}", p.to_string_lossy()))
        .unwrap_or_else(|_| path.to_string_lossy().to_string())
}

/// Get the parent folder path relative to project root
#[allow(dead_code)]
pub fn parent_folder(path: &Path, project_dir: &Path) -> String {
    path.parent()
        .map(|p| relative_path(p, project_dir))
        .unwrap_or_else(|| "/".to_string())
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::path::PathBuf;

    #[test]
    fn test_relative_path() {
        let project = PathBuf::from("/home/user/project");
        let file = PathBuf::from("/home/user/project/src/main.rs");
        assert_eq!(relative_path(&file, &project), "/src/main.rs");
    }

    #[test]
    fn test_parent_folder() {
        let project = PathBuf::from("/home/user/project");
        let file = PathBuf::from("/home/user/project/src/main.rs");
        assert_eq!(parent_folder(&file, &project), "/src");
    }
}
