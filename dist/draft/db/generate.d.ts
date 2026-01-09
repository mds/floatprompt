import Database from "better-sqlite3";
import { FolderStatus, FolderType } from "./schema.js";
/**
 * Layer 2: AI Context Generation Functions
 *
 * These functions support level-order traversal for populating folder context.
 * AI calls these via CLI wrapper (float-db) to:
 * 1. Query folders needing context (by depth level)
 * 2. Get folder details for AI to analyze
 * 3. Write AI-generated content back to database
 *
 * Design decisions (locked 2026-01-03):
 * - O1: Functions here, exposed via CLI wrapper
 * - O2: AI calls via Bash + CLI (no MCP overhead)
 * - O3: Database `status` field IS progress tracking
 *
 * See wip-generate-spec.md for full specification.
 */
/** Row shape returned by getFoldersByDepth */
export interface FolderRow {
    path: string;
    name: string;
    parent_path: string | null;
    type: FolderType | null;
    is_scope: boolean;
    status: FolderStatus;
    description: string | null;
    content_md: string | null;
    parent_scope_path: string | null;
}
/** File info returned by getFolderDetails */
export interface FileInfo {
    name: string;
    size: number;
    extension: string;
    content?: string;
}
/** Heuristics for scope detection */
export interface FolderHeuristics {
    hasPackageJson: boolean;
    hasReadme: boolean;
    fileCount: number;
    childFolderCount: number;
}
/** Full folder details for AI analysis */
export interface FolderDetails {
    path: string;
    name: string;
    parent_path: string | null;
    depth: number;
    files: FileInfo[];
    childFolders: string[];
    parentDescription?: string;
    parentScopeBoot?: string;
    siblingNames?: string[];
    currentDescription?: string;
    currentContentMd?: string;
    heuristics: FolderHeuristics;
}
/** Options for getFolderDetails */
export interface GetFolderDetailsOptions {
    includeContents?: boolean;
    projectRoot?: string;
}
/** Context to update (from AI) */
export interface UpdateContext {
    description: string;
    content_md: string;
    type?: FolderType;
    is_scope?: boolean;
    scope_boot?: string;
    parent_scope_path?: string;
}
/** Scope chain entry */
export interface ScopeChainEntry {
    path: string;
    scope_boot: string | null;
}
/**
 * 1. getFoldersByDepth
 *
 * Return folders at a specific depth level for level-order processing.
 * Depth 0 = root, 1 = top-level folders, etc.
 */
export declare function getFoldersByDepth(db: Database.Database, depth: number, status?: FolderStatus): FolderRow[];
/**
 * 2. getMaxDepth
 *
 * Find the deepest folder level to know when to stop iterating.
 */
export declare function getMaxDepth(db: Database.Database, status?: FolderStatus): number;
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
export declare function getFolderDetails(db: Database.Database, folderPath: string, options?: GetFolderDetailsOptions): FolderDetails;
/**
 * 4. updateFolderContext
 *
 * Write AI-generated content to database.
 * Sets status to 'current' and records AI attribution.
 */
export declare function updateFolderContext(db: Database.Database, folderPath: string, context: UpdateContext, aiModel: string): void;
/**
 * 5. getScopeChain
 *
 * Get boot context chain for a folder.
 * Walks up via parent_scope_path until NULL.
 */
export declare function getScopeChain(db: Database.Database, folderPath: string): ScopeChainEntry[];
/**
 * Get count of folders by status.
 * Useful for progress reporting.
 */
export declare function getFolderCountByStatus(db: Database.Database): Record<FolderStatus, number>;
/**
 * Get folders at each depth level with counts.
 * Useful for understanding the traversal ahead.
 */
export declare function getDepthDistribution(db: Database.Database, status?: FolderStatus): {
    depth: number;
    count: number;
}[];
//# sourceMappingURL=generate.d.ts.map