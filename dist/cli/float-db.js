#!/usr/bin/env node
/**
 * float-db CLI - Database interface for AI context generation
 *
 * Commands:
 *   float-db folders --depth N [--status S]     Get folders at depth N
 *   float-db details PATH [--include-contents]  Get folder details for AI
 *   float-db update PATH --json '{...}'         Write AI-generated context
 *   float-db max-depth [--status S]             Get maximum folder depth
 *   float-db scope-chain PATH                   Get scope chain for path
 *   float-db status                             Get folder counts by status
 *
 * All commands output JSON to stdout.
 * Errors output JSON with { "error": "message" } to stderr.
 */
import * as fs from "fs";
import { createDatabase } from "../db/client.js";
import { getFoldersByDepth, getMaxDepth, getFolderDetails, updateFolderContext, getScopeChain, getFolderCountByStatus, getDepthDistribution, } from "../db/generate.js";
// ============================================================================
// Helpers
// ============================================================================
function printJson(data) {
    console.log(JSON.stringify(data, null, 2));
}
function printError(message) {
    console.error(JSON.stringify({ error: message }));
    process.exit(1);
}
function printHelp() {
    console.log(`
float-db - Database interface for AI context generation

USAGE:
  float-db <command> [options]

COMMANDS:
  folders     Get folders at a specific depth level
  details     Get full folder details for AI analysis
  update      Write AI-generated context to database
  max-depth   Get the maximum folder depth
  scope-chain Get the scope chain for a path
  status      Get folder counts by status
  dist        Get folder count distribution by depth

OPTIONS:
  --db PATH       Database path (default: .float/float.db)
  --root PATH     Project root for file reading (default: cwd)
  --help, -h      Show this help message

EXAMPLES:
  float-db folders --depth 2 --status pending
  float-db details /src/db --include-contents
  float-db update /src/db --json '{"description": "...", "content_md": "..."}'
  float-db max-depth --status pending
  float-db scope-chain /src/db
  float-db status
`);
}
function parseArgs(args) {
    const command = args[0] || "";
    const positional = [];
    const flags = {};
    let i = 1;
    while (i < args.length) {
        const arg = args[i];
        if (arg.startsWith("--")) {
            const key = arg.slice(2);
            const next = args[i + 1];
            // Check if next arg is a value or another flag
            if (next && !next.startsWith("-")) {
                flags[key] = next;
                i += 2;
            }
            else {
                flags[key] = true;
                i += 1;
            }
        }
        else if (arg.startsWith("-")) {
            const key = arg.slice(1);
            flags[key] = true;
            i += 1;
        }
        else {
            positional.push(arg);
            i += 1;
        }
    }
    return { command, positional, flags };
}
// ============================================================================
// Commands
// ============================================================================
function cmdFolders(dbPath, flags) {
    const depth = flags["depth"];
    if (depth === undefined || depth === true) {
        printError("--depth is required");
    }
    const depthNum = parseInt(depth, 10);
    if (isNaN(depthNum) || depthNum < 0) {
        printError("--depth must be a non-negative integer");
    }
    const status = flags["status"];
    if (status && !["pending", "current", "stale"].includes(status)) {
        printError("--status must be one of: pending, current, stale");
    }
    const db = createDatabase(dbPath);
    try {
        const folders = getFoldersByDepth(db, depthNum, status || undefined);
        printJson(folders);
    }
    finally {
        db.close();
    }
}
function cmdDetails(dbPath, projectRoot, positional, flags) {
    const folderPath = positional[0];
    if (!folderPath) {
        printError("Folder path is required");
    }
    const includeContents = flags["include-contents"] === true;
    const db = createDatabase(dbPath);
    try {
        const details = getFolderDetails(db, folderPath, {
            includeContents,
            projectRoot, // Always pass — needed for file sizes even without contents
        });
        printJson(details);
    }
    finally {
        db.close();
    }
}
function cmdUpdate(dbPath, positional, flags) {
    const folderPath = positional[0];
    if (!folderPath) {
        printError("Folder path is required");
    }
    const jsonStr = flags["json"];
    if (!jsonStr || jsonStr === true) {
        printError("--json is required");
    }
    let context;
    try {
        context = JSON.parse(jsonStr);
    }
    catch {
        printError("Invalid JSON in --json argument");
        return; // TypeScript flow
    }
    if (!context.description) {
        printError("description is required in JSON");
    }
    if (!context.content_md) {
        printError("content_md is required in JSON");
    }
    const aiModel = flags["model"] || "claude-opus-4.5";
    const db = createDatabase(dbPath);
    try {
        updateFolderContext(db, folderPath, context, aiModel);
        printJson({ success: true, path: folderPath });
    }
    finally {
        db.close();
    }
}
function cmdMaxDepth(dbPath, flags) {
    const status = flags["status"];
    if (status && !["pending", "current", "stale"].includes(status)) {
        printError("--status must be one of: pending, current, stale");
    }
    const db = createDatabase(dbPath);
    try {
        const maxDepth = getMaxDepth(db, status || undefined);
        printJson({ maxDepth });
    }
    finally {
        db.close();
    }
}
function cmdScopeChain(dbPath, positional) {
    const folderPath = positional[0];
    if (!folderPath) {
        printError("Folder path is required");
    }
    const db = createDatabase(dbPath);
    try {
        const chain = getScopeChain(db, folderPath);
        printJson(chain);
    }
    finally {
        db.close();
    }
}
function cmdStatus(dbPath) {
    const db = createDatabase(dbPath);
    try {
        const counts = getFolderCountByStatus(db);
        printJson(counts);
    }
    finally {
        db.close();
    }
}
function cmdDist(dbPath, flags) {
    const status = flags["status"];
    if (status && !["pending", "current", "stale"].includes(status)) {
        printError("--status must be one of: pending, current, stale");
    }
    const db = createDatabase(dbPath);
    try {
        const dist = getDepthDistribution(db, status || undefined);
        printJson(dist);
    }
    finally {
        db.close();
    }
}
// ============================================================================
// Main
// ============================================================================
function main() {
    const args = process.argv.slice(2);
    if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
        printHelp();
        process.exit(0);
    }
    const { command, positional, flags } = parseArgs(args);
    // Resolve paths
    const dbPath = flags["db"] || ".float/float.db";
    const projectRoot = flags["root"] || process.cwd();
    // Verify database exists for read commands
    if (command !== "help") {
        if (!fs.existsSync(dbPath)) {
            printError(`Database not found: ${dbPath}`);
        }
    }
    try {
        switch (command) {
            case "folders":
                cmdFolders(dbPath, flags);
                break;
            case "details":
                cmdDetails(dbPath, projectRoot, positional, flags);
                break;
            case "update":
                cmdUpdate(dbPath, positional, flags);
                break;
            case "max-depth":
                cmdMaxDepth(dbPath, flags);
                break;
            case "scope-chain":
                cmdScopeChain(dbPath, positional);
                break;
            case "status":
                cmdStatus(dbPath);
                break;
            case "dist":
                cmdDist(dbPath, flags);
                break;
            default:
                printError(`Unknown command: ${command}`);
        }
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        printError(message);
    }
}
main();
//# sourceMappingURL=float-db.js.map