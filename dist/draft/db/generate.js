import * as fs from "fs";
import * as path from "path";
// ============================================================================
// Helper Functions
// ============================================================================
/**
 * Calculate depth from path.
 * Root '/' = 0, '/src' = 1, '/src/db' = 2
 */
function calculateDepth(folderPath) {
    if (folderPath === "/")
        return 0;
    // Count slashes (excluding trailing)
    const normalized = folderPath.endsWith("/")
        ? folderPath.slice(0, -1)
        : folderPath;
    return normalized.split("/").length - 1;
}
/**
 * Convert relative path to absolute path using project root.
 */
function toAbsolutePath(relativePath, projectRoot) {
    if (relativePath === "/")
        return projectRoot;
    return path.join(projectRoot, relativePath);
}
// ============================================================================
// Core Functions
// ============================================================================
/**
 * 1. getFoldersByDepth
 *
 * Return folders at a specific depth level for level-order processing.
 * Depth 0 = root, 1 = top-level folders, etc.
 */
export function getFoldersByDepth(db, depth, status) {
    // SQLite depth calculation matches our helper
    const query = `
    SELECT path, name, parent_path, type, is_scope, status,
           description, content_md, parent_scope_path
    FROM folders
    WHERE CASE WHEN path = '/' THEN 0
          ELSE LENGTH(path) - LENGTH(REPLACE(path, '/', ''))
          END = ?
      AND (status = ? OR ? IS NULL)
    ORDER BY path
  `;
    const rows = db.prepare(query).all(depth, status ?? null, status ?? null);
    return rows.map((row) => ({
        path: row.path,
        name: row.name,
        parent_path: row.parent_path,
        type: row.type,
        is_scope: Boolean(row.is_scope),
        status: row.status,
        description: row.description,
        content_md: row.content_md,
        parent_scope_path: row.parent_scope_path,
    }));
}
/**
 * 2. getMaxDepth
 *
 * Find the deepest folder level to know when to stop iterating.
 */
export function getMaxDepth(db, status) {
    const query = `
    SELECT MAX(
      CASE WHEN path = '/' THEN 0
      ELSE LENGTH(path) - LENGTH(REPLACE(path, '/', ''))
      END
    ) as max_depth
    FROM folders
    WHERE status = ? OR ? IS NULL
  `;
    const result = db.prepare(query).get(status ?? null, status ?? null);
    return result.max_depth ?? 0;
}
/**
 * 3. getFolderDetails
 *
 * Get full folder information for AI to generate context.
 *
 * Options:
 * - includeContents: false (default) — names + sizes only (for fleet mode)
 * - includeContents: true — include file contents (for single chat mode)
 * - projectRoot: needed for file sizes and contents (pass cwd)
 */
export function getFolderDetails(db, folderPath, options = {}) {
    const { includeContents = false, projectRoot } = options;
    // Get folder from database
    const folder = db
        .prepare(`
      SELECT path, name, parent_path, description, content_md
      FROM folders
      WHERE path = ?
    `)
        .get(folderPath);
    if (!folder) {
        throw new Error(`Folder not found: ${folderPath}`);
    }
    const depth = calculateDepth(folderPath);
    // Get files in this folder from database
    const dbFiles = db
        .prepare(`SELECT path FROM files WHERE folder_path = ? ORDER BY path`)
        .all(folderPath);
    // Build file info
    const files = [];
    for (const dbFile of dbFiles) {
        const fileName = path.basename(dbFile.path);
        const extension = path.extname(dbFile.path);
        let size = 0;
        let content;
        if (projectRoot) {
            const absolutePath = toAbsolutePath(dbFile.path, projectRoot);
            try {
                const stats = fs.statSync(absolutePath);
                size = stats.size;
                if (includeContents) {
                    content = fs.readFileSync(absolutePath, "utf-8");
                }
            }
            catch {
                // File may have been deleted since scan — skip it
                continue;
            }
        }
        const fileInfo = { name: fileName, size, extension };
        if (includeContents && content !== undefined) {
            fileInfo.content = content;
        }
        files.push(fileInfo);
    }
    // Get child folders
    const childFolders = db
        .prepare(`SELECT path FROM folders WHERE parent_path = ? ORDER BY path`)
        .all(folderPath);
    // Get parent info for context
    let parentDescription;
    let parentScopeBoot;
    if (folder.parent_path) {
        const parent = db
            .prepare(`SELECT description, is_scope, scope_boot FROM folders WHERE path = ?`)
            .get(folder.parent_path);
        if (parent) {
            parentDescription = parent.description ?? undefined;
            if (parent.is_scope && parent.scope_boot) {
                parentScopeBoot = parent.scope_boot;
            }
        }
    }
    // Get sibling names
    let siblingNames;
    if (folder.parent_path) {
        const siblings = db
            .prepare(`SELECT name FROM folders WHERE parent_path = ? AND path != ? ORDER BY name`)
            .all(folder.parent_path, folderPath);
        siblingNames = siblings.map((s) => s.name);
    }
    // Compute heuristics
    const hasPackageJson = files.some((f) => f.name === "package.json");
    const hasReadme = files.some((f) => f.name.toLowerCase().startsWith("readme"));
    return {
        path: folder.path,
        name: folder.name,
        parent_path: folder.parent_path,
        depth,
        files,
        childFolders: childFolders.map((c) => c.path),
        parentDescription,
        parentScopeBoot,
        siblingNames,
        currentDescription: folder.description ?? undefined,
        currentContentMd: folder.content_md ?? undefined,
        heuristics: {
            hasPackageJson,
            hasReadme,
            fileCount: files.length,
            childFolderCount: childFolders.length,
        },
    };
}
/**
 * 4. updateFolderContext
 *
 * Write AI-generated content to database.
 * Sets status to 'current' and records AI attribution.
 */
export function updateFolderContext(db, folderPath, context, aiModel) {
    // Validate required fields
    if (!context.description) {
        throw new Error("description is required");
    }
    if (!context.content_md) {
        throw new Error("content_md is required");
    }
    // Verify folder exists
    const exists = db
        .prepare(`SELECT 1 FROM folders WHERE path = ?`)
        .get(folderPath);
    if (!exists) {
        throw new Error(`Folder not found: ${folderPath}`);
    }
    const now = Date.now();
    const stmt = db.prepare(`
    UPDATE folders SET
      description = ?,
      content_md = ?,
      type = COALESCE(?, type),
      is_scope = COALESCE(?, is_scope),
      scope_boot = COALESCE(?, scope_boot),
      parent_scope_path = COALESCE(?, parent_scope_path),
      status = 'current',
      ai_model = ?,
      ai_updated = ?,
      updated_at = ?
    WHERE path = ?
  `);
    stmt.run(context.description, context.content_md, context.type ?? null, context.is_scope !== undefined ? (context.is_scope ? 1 : 0) : null, context.scope_boot ?? null, context.parent_scope_path ?? null, aiModel, now, now, folderPath);
}
/**
 * 5. getScopeChain
 *
 * Get boot context chain for a folder.
 * Walks up via parent_scope_path until NULL.
 */
export function getScopeChain(db, folderPath) {
    const chain = [];
    // Start from the folder itself (if it's a scope)
    let currentPath = folderPath;
    while (currentPath) {
        const folder = db
            .prepare(`SELECT path, is_scope, scope_boot, parent_scope_path FROM folders WHERE path = ?`)
            .get(currentPath);
        if (!folder)
            break;
        // If this folder is a scope, add to chain
        if (folder.is_scope) {
            chain.unshift({
                path: folder.path,
                scope_boot: folder.scope_boot,
            });
        }
        // Move to parent scope
        currentPath = folder.parent_scope_path;
    }
    return chain;
}
// ============================================================================
// Convenience Functions
// ============================================================================
/**
 * Get count of folders by status.
 * Useful for progress reporting.
 */
export function getFolderCountByStatus(db) {
    const rows = db
        .prepare(`
      SELECT status, COUNT(*) as count
      FROM folders
      GROUP BY status
    `)
        .all();
    const result = {
        pending: 0,
        current: 0,
        stale: 0,
    };
    for (const row of rows) {
        result[row.status] = row.count;
    }
    return result;
}
/**
 * Get folders at each depth level with counts.
 * Useful for understanding the traversal ahead.
 */
export function getDepthDistribution(db, status) {
    const query = `
    SELECT
      CASE WHEN path = '/' THEN 0
      ELSE LENGTH(path) - LENGTH(REPLACE(path, '/', ''))
      END as depth,
      COUNT(*) as count
    FROM folders
    WHERE status = ? OR ? IS NULL
    GROUP BY depth
    ORDER BY depth
  `;
    return db.prepare(query).all(status ?? null, status ?? null);
}
//# sourceMappingURL=generate.js.map