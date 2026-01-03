import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";
import { createDatabase } from "./client.js";
/**
 * Scanner for FloatPrompt context database.
 *
 * Layer 1: Mechanical discovery.
 * - Walks filesystem from rootPath
 * - Populates `folders` and `files` tables
 * - Computes content hashes for change detection
 * - Leaves map_* and context_* NULL for Layer 2 (AI generation)
 *
 * Design:
 * - Scans from rootPath (parent of .float/)
 * - Smart ignore list (node_modules, .git, dist, hidden folders)
 * - Recursive, no depth limit
 * - Populates both `folders` and `files` tables
 * - SHA-256 for content hashing
 * - Skips symlinks (avoids infinite loops)
 * - Removes deleted entries from database (DB = filesystem truth)
 */
// Default folders to ignore
const DEFAULT_IGNORE = [
    "node_modules",
    ".git",
    "dist",
    "build",
    "out",
    "coverage",
    ".float", // Don't scan our own metadata
];
// Hidden folders that ARE allowed
const ALLOWED_HIDDEN = [".claude"];
/**
 * Check if a folder should be ignored.
 */
function shouldIgnore(name, ignoreList, includeList) {
    // Explicit include overrides everything
    if (includeList.includes(name)) {
        return false;
    }
    // Check ignore list
    if (ignoreList.includes(name)) {
        return true;
    }
    // Hidden folders (starting with .) are ignored by default
    if (name.startsWith(".")) {
        // Unless they're in the allowed list
        return !ALLOWED_HIDDEN.includes(name);
    }
    return false;
}
/**
 * Compute SHA-256 hash of file content.
 */
function hashFile(filePath) {
    const content = fs.readFileSync(filePath);
    return crypto.createHash("sha256").update(content).digest("hex");
}
/**
 * Compute source_hash for a folder.
 * SHA-256 of sorted child paths + their hashes.
 */
function hashFolder(children) {
    const sorted = [...children].sort((a, b) => a.path.localeCompare(b.path));
    const data = sorted.map((c) => `${c.path}:${c.hash}`).join("\n");
    return crypto.createHash("sha256").update(data).digest("hex");
}
/**
 * Convert absolute path to relative path from root.
 * Returns '/' for the root itself.
 */
function toRelativePath(absolutePath, rootPath) {
    if (absolutePath === rootPath) {
        return "/";
    }
    const rel = path.relative(rootPath, absolutePath);
    return "/" + rel.split(path.sep).join("/");
}
/**
 * Walk the filesystem and collect folder/file info.
 */
function walkFileSystem(dirPath, rootPath, ignoreList, includeList, verbose) {
    const folders = [];
    const files = [];
    function walk(currentPath) {
        const relPath = toRelativePath(currentPath, rootPath);
        const name = path.basename(currentPath) || "/";
        const parentPath = relPath === "/" ? null : toRelativePath(path.dirname(currentPath), rootPath);
        const children = [];
        let entries;
        try {
            entries = fs.readdirSync(currentPath, { withFileTypes: true });
        }
        catch (err) {
            if (verbose) {
                console.warn(`Warning: Cannot read directory ${currentPath}: ${err}`);
            }
            return;
        }
        for (const entry of entries) {
            const entryPath = path.join(currentPath, entry.name);
            const entryRelPath = toRelativePath(entryPath, rootPath);
            // Skip symlinks
            if (entry.isSymbolicLink()) {
                if (verbose) {
                    console.log(`Skipping symlink: ${entryRelPath}`);
                }
                continue;
            }
            if (entry.isDirectory()) {
                // Check if should ignore
                if (shouldIgnore(entry.name, ignoreList, includeList)) {
                    if (verbose) {
                        console.log(`Ignoring: ${entryRelPath}`);
                    }
                    continue;
                }
                // Recurse into subdirectory
                walk(entryPath);
                // Find the folder we just processed to get its hash
                const childFolder = folders.find((f) => f.path === entryRelPath);
                if (childFolder) {
                    const childHash = hashFolder(childFolder.children);
                    children.push({ path: entryRelPath, hash: childHash });
                }
            }
            else if (entry.isFile()) {
                try {
                    const stats = fs.statSync(entryPath);
                    const contentHash = hashFile(entryPath);
                    const mtime = Math.floor(stats.mtimeMs);
                    files.push({
                        path: entryRelPath,
                        folder_path: relPath,
                        content_hash: contentHash,
                        mtime,
                    });
                    children.push({ path: entryRelPath, hash: contentHash });
                }
                catch (err) {
                    if (verbose) {
                        console.warn(`Warning: Cannot read file ${entryPath}: ${err}`);
                    }
                }
            }
        }
        folders.push({
            path: relPath,
            parent_path: parentPath,
            name,
            children,
        });
    }
    walk(dirPath);
    return { folders, files };
}
/**
 * Scan the filesystem and update the database.
 */
export function scan(options) {
    const { rootPath, dbPath, ignore = [], include = [], verbose = false, } = options;
    const ignoreList = [...DEFAULT_IGNORE, ...ignore];
    const includeList = include;
    if (verbose) {
        console.log(`Scanning: ${rootPath}`);
        console.log(`Database: ${dbPath}`);
        console.log(`Ignoring: ${ignoreList.join(", ")}`);
    }
    // Ensure .float directory exists
    const floatDir = path.dirname(dbPath);
    if (!fs.existsSync(floatDir)) {
        fs.mkdirSync(floatDir, { recursive: true });
    }
    // Create/open database
    const db = createDatabase(dbPath);
    const now = Date.now();
    // Walk filesystem
    const { folders, files } = walkFileSystem(rootPath, rootPath, ignoreList, includeList, verbose);
    if (verbose) {
        console.log(`Found: ${folders.length} folders, ${files.length} files`);
    }
    const result = {
        foldersCreated: 0,
        foldersUpdated: 0,
        foldersRemoved: 0,
        filesCreated: 0,
        filesUpdated: 0,
        filesRemoved: 0,
    };
    // Prepare statements
    const insertFolder = db.prepare(`
    INSERT INTO folders (path, parent_path, name, source_hash, last_scanned_at, created_at, updated_at)
    VALUES (@path, @parent_path, @name, @source_hash, @last_scanned_at, @created_at, @updated_at)
  `);
    const updateFolder = db.prepare(`
    UPDATE folders
    SET parent_path = @parent_path,
        name = @name,
        source_hash = @source_hash,
        last_scanned_at = @last_scanned_at,
        updated_at = @updated_at
    WHERE path = @path
  `);
    const getFolder = db.prepare(`SELECT path, source_hash FROM folders WHERE path = ?`);
    const insertFile = db.prepare(`
    INSERT INTO files (path, folder_path, content_hash, mtime, last_scanned_at)
    VALUES (@path, @folder_path, @content_hash, @mtime, @last_scanned_at)
  `);
    const updateFile = db.prepare(`
    UPDATE files
    SET folder_path = @folder_path,
        content_hash = @content_hash,
        mtime = @mtime,
        last_scanned_at = @last_scanned_at
    WHERE path = @path
  `);
    const getFile = db.prepare(`SELECT path, content_hash FROM files WHERE path = ?`);
    const getAllFolderPaths = db.prepare(`SELECT path FROM folders`);
    const getAllFilePaths = db.prepare(`SELECT path FROM files`);
    const deleteFolder = db.prepare(`DELETE FROM folders WHERE path = ?`);
    const deleteFile = db.prepare(`DELETE FROM files WHERE path = ?`);
    // Use transaction for performance
    const syncAll = db.transaction(() => {
        // Track what we've seen
        const seenFolders = new Set();
        const seenFiles = new Set();
        // Upsert folders
        for (const folder of folders) {
            seenFolders.add(folder.path);
            const sourceHash = hashFolder(folder.children);
            const existing = getFolder.get(folder.path);
            if (!existing) {
                insertFolder.run({
                    path: folder.path,
                    parent_path: folder.parent_path,
                    name: folder.name,
                    source_hash: sourceHash,
                    last_scanned_at: now,
                    created_at: now,
                    updated_at: now,
                });
                result.foldersCreated++;
                if (verbose) {
                    console.log(`Created folder: ${folder.path}`);
                }
            }
            else if (existing.source_hash !== sourceHash) {
                updateFolder.run({
                    path: folder.path,
                    parent_path: folder.parent_path,
                    name: folder.name,
                    source_hash: sourceHash,
                    last_scanned_at: now,
                    updated_at: now,
                });
                result.foldersUpdated++;
                if (verbose) {
                    console.log(`Updated folder: ${folder.path}`);
                }
            }
        }
        // Upsert files
        for (const file of files) {
            seenFiles.add(file.path);
            const existing = getFile.get(file.path);
            if (!existing) {
                insertFile.run({
                    path: file.path,
                    folder_path: file.folder_path,
                    content_hash: file.content_hash,
                    mtime: file.mtime,
                    last_scanned_at: now,
                });
                result.filesCreated++;
                if (verbose) {
                    console.log(`Created file: ${file.path}`);
                }
            }
            else if (existing.content_hash !== file.content_hash) {
                updateFile.run({
                    path: file.path,
                    folder_path: file.folder_path,
                    content_hash: file.content_hash,
                    mtime: file.mtime,
                    last_scanned_at: now,
                });
                result.filesUpdated++;
                if (verbose) {
                    console.log(`Updated file: ${file.path}`);
                }
            }
        }
        // Remove folders that no longer exist
        const existingFolders = getAllFolderPaths.all();
        for (const { path: folderPath } of existingFolders) {
            if (!seenFolders.has(folderPath)) {
                deleteFolder.run(folderPath);
                result.foldersRemoved++;
                if (verbose) {
                    console.log(`Removed folder: ${folderPath}`);
                }
            }
        }
        // Remove files that no longer exist
        const existingFiles = getAllFilePaths.all();
        for (const { path: filePath } of existingFiles) {
            if (!seenFiles.has(filePath)) {
                deleteFile.run(filePath);
                result.filesRemoved++;
                if (verbose) {
                    console.log(`Removed file: ${filePath}`);
                }
            }
        }
    });
    syncAll();
    db.close();
    return result;
}
/**
 * CLI entry point.
 */
export function runScan(rootPath, dbPath) {
    console.log(`FloatPrompt Scanner`);
    console.log(`==================`);
    const result = scan({
        rootPath,
        dbPath,
        verbose: true,
    });
    console.log(`\n--- Scan Summary ---`);
    console.log(`Folders: ${result.foldersCreated} created, ${result.foldersUpdated} updated, ${result.foldersRemoved} removed`);
    console.log(`Files: ${result.filesCreated} created, ${result.filesUpdated} updated, ${result.filesRemoved} removed`);
}
// CLI execution
const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
    const rootPath = process.argv[2] || process.cwd();
    const dbPath = process.argv[3] || ".float/float.db";
    runScan(rootPath, dbPath);
}
//# sourceMappingURL=scan.js.map