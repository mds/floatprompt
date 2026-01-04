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
import * as path from "path";
import {
  createDatabase,
  insertDeep,
  getDeep,
  listDeep,
  updateDeep,
  markDeepStale,
  deleteDeep,
  getDeepHistory,
  getDeepVersion,
} from "../db/client.js";
import {
  getFoldersByDepth,
  getMaxDepth,
  getFolderDetails,
  updateFolderContext,
  getScopeChain,
  getFolderCountByStatus,
  getDepthDistribution,
  UpdateContext,
} from "../db/generate.js";
import { FolderStatus } from "../db/schema.js";
import {
  createRegistry,
  parseBuoyTemplate,
  buildBuoyPrompt,
  executeBuoy,
  executeBuoyBatch,
  DEFAULT_TEMPLATE_DIR,
} from "../buoys/index.js";

// ============================================================================
// Helpers
// ============================================================================

function printJson(data: unknown): void {
  console.log(JSON.stringify(data, null, 2));
}

function printError(message: string): void {
  console.error(JSON.stringify({ error: message }));
  process.exit(1);
}

function printHelp(): void {
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
  buoy        Buoy template management (list, parse, prompt)
  deep        Deep context management (topic-based context)

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
  float-db buoy list
  float-db buoy archetypes
  float-db buoy parse src/buoys/templates/context-generator.md
  float-db buoy prompt context-generator --data '{"folder_path": "/src"}'
  float-db buoy prompt context-generator --data '{"folder_path": "/src"}' --composed
  float-db buoy execute scope-detector --data '{"folder_path": "/src", ...}'
  float-db buoy batch scope-detector --data '[{...}, {...}]' --concurrency 5

DEEP SUBCOMMANDS:
  float-db deep list                          List all deep contexts
  float-db deep show <slug>                   Show deep context content
  float-db deep create <slug> --title "..." --content "..."   Create new
  float-db deep create <slug> --title "..." --file content.md Create from file
  float-db deep update <slug> --content "..." Update content (saves history)
  float-db deep stale <slug>                  Mark as stale
  float-db deep delete <slug>                 Delete (cascades to history)
  float-db deep history <slug>                Show version history
  float-db deep version <slug> <version>      Show specific version
`);
}

function parseArgs(args: string[]): {
  command: string;
  positional: string[];
  flags: Record<string, string | boolean>;
} {
  const command = args[0] || "";
  const positional: string[] = [];
  const flags: Record<string, string | boolean> = {};

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
      } else {
        flags[key] = true;
        i += 1;
      }
    } else if (arg.startsWith("-")) {
      const key = arg.slice(1);
      flags[key] = true;
      i += 1;
    } else {
      positional.push(arg);
      i += 1;
    }
  }

  return { command, positional, flags };
}

// ============================================================================
// Commands
// ============================================================================

function cmdFolders(
  dbPath: string,
  flags: Record<string, string | boolean>
): void {
  const depth = flags["depth"];
  if (depth === undefined || depth === true) {
    printError("--depth is required");
  }

  const depthNum = parseInt(depth as string, 10);
  if (isNaN(depthNum) || depthNum < 0) {
    printError("--depth must be a non-negative integer");
  }

  const status = flags["status"] as FolderStatus | undefined;
  if (status && !["pending", "current", "stale"].includes(status)) {
    printError("--status must be one of: pending, current, stale");
  }

  const db = createDatabase(dbPath);
  try {
    const folders = getFoldersByDepth(db, depthNum, status || undefined);
    printJson(folders);
  } finally {
    db.close();
  }
}

function cmdDetails(
  dbPath: string,
  projectRoot: string,
  positional: string[],
  flags: Record<string, string | boolean>
): void {
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
  } finally {
    db.close();
  }
}

function cmdUpdate(
  dbPath: string,
  positional: string[],
  flags: Record<string, string | boolean>
): void {
  const folderPath = positional[0];
  if (!folderPath) {
    printError("Folder path is required");
  }

  const jsonStr = flags["json"];
  if (!jsonStr || jsonStr === true) {
    printError("--json is required");
  }

  let context: UpdateContext;
  try {
    context = JSON.parse(jsonStr as string);
  } catch {
    printError("Invalid JSON in --json argument");
    return; // TypeScript flow
  }

  if (!context.description) {
    printError("description is required in JSON");
  }
  if (!context.content_md) {
    printError("content_md is required in JSON");
  }

  const aiModel = (flags["model"] as string) || "claude-opus-4.5";

  const db = createDatabase(dbPath);
  try {
    updateFolderContext(db, folderPath, context, aiModel);
    printJson({ success: true, path: folderPath });
  } finally {
    db.close();
  }
}

function cmdMaxDepth(
  dbPath: string,
  flags: Record<string, string | boolean>
): void {
  const status = flags["status"] as FolderStatus | undefined;
  if (status && !["pending", "current", "stale"].includes(status)) {
    printError("--status must be one of: pending, current, stale");
  }

  const db = createDatabase(dbPath);
  try {
    const maxDepth = getMaxDepth(db, status || undefined);
    printJson({ maxDepth });
  } finally {
    db.close();
  }
}

function cmdScopeChain(dbPath: string, positional: string[]): void {
  const folderPath = positional[0];
  if (!folderPath) {
    printError("Folder path is required");
  }

  const db = createDatabase(dbPath);
  try {
    const chain = getScopeChain(db, folderPath);
    printJson(chain);
  } finally {
    db.close();
  }
}

function cmdStatus(dbPath: string): void {
  const db = createDatabase(dbPath);
  try {
    const counts = getFolderCountByStatus(db);
    printJson(counts);
  } finally {
    db.close();
  }
}

function cmdDist(
  dbPath: string,
  flags: Record<string, string | boolean>
): void {
  const status = flags["status"] as FolderStatus | undefined;
  if (status && !["pending", "current", "stale"].includes(status)) {
    printError("--status must be one of: pending, current, stale");
  }

  const db = createDatabase(dbPath);
  try {
    const dist = getDepthDistribution(db, status || undefined);
    printJson(dist);
  } finally {
    db.close();
  }
}

function cmdBuoy(
  positional: string[],
  flags: Record<string, string | boolean>
): void {
  const subcommand = positional[0];

  if (!subcommand) {
    printError("Buoy subcommand required: list, archetypes, parse, prompt, execute, or batch");
  }

  const templateDir =
    (flags["templates"] as string) || DEFAULT_TEMPLATE_DIR;

  switch (subcommand) {
    case "list": {
      const registry = createRegistry();
      const result = registry.load(templateDir);

      printJson({
        buoys: registry.list().map((id) => {
          const buoy = registry.get(id)!;
          return {
            id,
            title: buoy.json.meta.title,
            archetype: buoy.json.ai.archetype,
            receives: buoy.json.input.receives,
            produces: buoy.json.output.produces,
          };
        }),
        loadErrors: result.errors,
      });
      break;
    }

    case "archetypes": {
      const registry = createRegistry();
      registry.load(templateDir);

      printJson({
        global: registry.getGlobal() !== null,
        archetypes: registry.listArchetypes().map((a) => ({
          archetype: a,
          hasGuidance: registry.getArchetype(a) !== undefined,
        })),
      });
      break;
    }

    case "parse": {
      const filePath = positional[1];
      if (!filePath) {
        printError("File path required for buoy parse");
      }

      if (!fs.existsSync(filePath)) {
        printError(`File not found: ${filePath}`);
      }

      const content = fs.readFileSync(filePath, "utf-8");
      const result = parseBuoyTemplate(content, filePath);

      if (result.success) {
        printJson({
          valid: true,
          buoy: {
            id: result.template.json.meta.id,
            title: result.template.json.meta.title,
            version: result.template.json.meta.version,
            archetype: result.template.json.ai.archetype,
            receives: result.template.json.input.receives,
            produces: result.template.json.output.produces,
            markdownLength: result.template.markdown.length,
          },
        });
      } else {
        printJson({
          valid: false,
          error: result.error,
        });
      }
      break;
    }

    case "prompt": {
      const buoyId = positional[1];
      if (!buoyId) {
        printError("Buoy ID required for buoy prompt");
      }

      const dataStr = flags["data"];
      if (!dataStr || dataStr === true) {
        printError("--data is required for buoy prompt");
      }

      let data: Record<string, unknown>;
      try {
        data = JSON.parse(dataStr as string);
      } catch {
        printError("Invalid JSON in --data argument");
        return;
      }

      const registry = createRegistry();
      registry.load(templateDir);

      const useComposed = flags["composed"] === true;

      if (useComposed) {
        // Use composed buoy (global + archetype + specific)
        const composed = registry.getComposed(buoyId);
        if (!composed) {
          printError(
            `Buoy not found: ${buoyId}. Available: ${registry.list().join(", ")}`
          );
          return;
        }

        try {
          const prompt = buildBuoyPrompt({
            template: composed.template,
            data,
            globalGuidance: composed.globalGuidance ?? undefined,
            archetypeGuidance: composed.archetypeGuidance ?? undefined,
            message: (flags["message"] as string) || undefined,
          });
          printJson(prompt);
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          printError(message);
        }
      } else {
        // Use template only (backward compatible)
        const template = registry.get(buoyId);
        if (!template) {
          printError(
            `Buoy not found: ${buoyId}. Available: ${registry.list().join(", ")}`
          );
          return;
        }

        try {
          const prompt = buildBuoyPrompt({
            template,
            data,
            message: (flags["message"] as string) || undefined,
          });
          printJson(prompt);
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          printError(message);
        }
      }
      break;
    }

    case "execute": {
      const buoyId = positional[1];
      if (!buoyId) {
        printError("Buoy ID required for buoy execute");
      }

      const dataStr = flags["data"];
      if (!dataStr || dataStr === true) {
        printError("--data is required for buoy execute");
      }

      let data: Record<string, unknown>;
      try {
        data = JSON.parse(dataStr as string);
      } catch {
        printError("Invalid JSON in --data argument");
        return;
      }

      const model = (flags["model"] as string) || undefined;
      const maxTokens = flags["max-tokens"]
        ? parseInt(flags["max-tokens"] as string, 10)
        : undefined;

      // Execute async
      (async () => {
        try {
          const result = await executeBuoy({
            buoyId,
            input: data,
            options: {
              templateDir,
              model,
              maxTokens,
            },
          });
          printJson(result);
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          printError(message);
        }
      })();
      break;
    }

    case "batch": {
      const buoyId = positional[1];
      if (!buoyId) {
        printError("Buoy ID required for buoy batch");
      }

      const dataStr = flags["data"];
      if (!dataStr || dataStr === true) {
        printError("--data is required for buoy batch (JSON array)");
      }

      let inputs: Record<string, unknown>[];
      try {
        const parsed = JSON.parse(dataStr as string);
        if (!Array.isArray(parsed)) {
          printError("--data must be a JSON array for batch execution");
          return;
        }
        inputs = parsed;
      } catch {
        printError("Invalid JSON in --data argument");
        return;
      }

      if (inputs.length === 0) {
        printError("--data array must contain at least one input");
        return;
      }

      const model = (flags["model"] as string) || undefined;
      const maxTokens = flags["max-tokens"]
        ? parseInt(flags["max-tokens"] as string, 10)
        : undefined;
      const concurrency = flags["concurrency"]
        ? parseInt(flags["concurrency"] as string, 10)
        : undefined;

      // Execute async with optional concurrency limiting
      (async () => {
        const startTime = Date.now();
        try {
          let results: Awaited<ReturnType<typeof executeBuoyBatch>>;

          if (concurrency && concurrency > 0 && concurrency < inputs.length) {
            // Chunked execution for rate limiting
            results = [];
            for (let i = 0; i < inputs.length; i += concurrency) {
              const chunk = inputs.slice(i, i + concurrency);
              const chunkResults = await executeBuoyBatch(buoyId, chunk, {
                templateDir,
                model,
                maxTokens,
              });
              results.push(...chunkResults);
            }
          } else {
            // Full parallel execution
            results = await executeBuoyBatch(buoyId, inputs, {
              templateDir,
              model,
              maxTokens,
            });
          }

          const totalTime = Date.now() - startTime;
          const successCount = results.filter((r) => r.success).length;
          const failCount = results.filter((r) => !r.success).length;

          printJson({
            summary: {
              total: results.length,
              success: successCount,
              failed: failCount,
              totalTimeMs: totalTime,
              avgTimeMs: Math.round(totalTime / results.length),
              concurrency: concurrency || "unlimited",
            },
            results,
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          printError(message);
        }
      })();
      break;
    }

    default:
      printError(`Unknown buoy subcommand: ${subcommand}`);
  }
}

function cmdDeep(
  dbPath: string,
  positional: string[],
  flags: Record<string, string | boolean>
): void {
  const subcommand = positional[0];

  if (!subcommand) {
    printError(
      "Deep subcommand required: list, show, create, update, stale, delete, history, version"
    );
  }

  const db = createDatabase(dbPath);

  try {
    switch (subcommand) {
      case "list": {
        const contexts = listDeep(db);
        printJson({
          count: contexts.length,
          contexts: contexts.map((c) => ({
            slug: c.slug,
            title: c.title,
            status: c.status,
            contentLength: c.content_md.length,
            watchCount: c.watches?.length || 0,
            updated_at: c.updated_at,
          })),
        });
        break;
      }

      case "show": {
        const slug = positional[1];
        if (!slug) {
          printError("Slug required for deep show");
        }

        const context = getDeep(db, slug);
        if (!context) {
          printError(`Deep context not found: ${slug}`);
          return;
        }

        // If --json flag, output full JSON; otherwise just content
        if (flags["json"] === true) {
          printJson(context);
        } else {
          console.log(context.content_md);
        }
        break;
      }

      case "create": {
        const slug = positional[1];
        if (!slug) {
          printError("Slug required for deep create");
        }

        const title = flags["title"];
        if (!title || title === true) {
          printError("--title is required for deep create");
        }

        let content_md: string;
        if (flags["file"] && flags["file"] !== true) {
          // Read from file
          const filePath = flags["file"] as string;
          if (!fs.existsSync(filePath)) {
            printError(`File not found: ${filePath}`);
            return;
          }
          content_md = fs.readFileSync(filePath, "utf-8");
        } else if (flags["content"] && flags["content"] !== true) {
          content_md = flags["content"] as string;
        } else {
          printError("--content or --file is required for deep create");
          return;
        }

        // Parse watches if provided
        let watches = null;
        if (flags["watches"] && flags["watches"] !== true) {
          try {
            watches = JSON.parse(flags["watches"] as string);
          } catch {
            printError("Invalid JSON in --watches");
            return;
          }
        }

        const ai_model = (flags["model"] as string) || null;

        // Check if already exists
        const existing = getDeep(db, slug);
        if (existing) {
          printError(`Deep context already exists: ${slug}. Use 'update' to modify.`);
          return;
        }

        insertDeep(db, {
          slug,
          title: title as string,
          content_md,
          watches,
          ai_model,
        });

        printJson({ success: true, slug, title });
        break;
      }

      case "update": {
        const slug = positional[1];
        if (!slug) {
          printError("Slug required for deep update");
        }

        const updates: Record<string, unknown> = {};

        if (flags["title"] && flags["title"] !== true) {
          updates.title = flags["title"];
        }

        if (flags["file"] && flags["file"] !== true) {
          const filePath = flags["file"] as string;
          if (!fs.existsSync(filePath)) {
            printError(`File not found: ${filePath}`);
            return;
          }
          updates.content_md = fs.readFileSync(filePath, "utf-8");
        } else if (flags["content"] && flags["content"] !== true) {
          updates.content_md = flags["content"];
        }

        if (flags["watches"] && flags["watches"] !== true) {
          try {
            updates.watches = JSON.parse(flags["watches"] as string);
          } catch {
            printError("Invalid JSON in --watches");
            return;
          }
        }

        if (flags["status"] && flags["status"] !== true) {
          const status = flags["status"] as string;
          if (!["current", "stale", "generating"].includes(status)) {
            printError("--status must be: current, stale, or generating");
            return;
          }
          updates.status = status;
        }

        if (flags["model"] && flags["model"] !== true) {
          updates.ai_model = flags["model"];
        }

        if (Object.keys(updates).length === 0) {
          printError("No updates provided. Use --title, --content, --file, --watches, --status, or --model");
          return;
        }

        const success = updateDeep(db, slug, updates);
        if (!success) {
          printError(`Deep context not found: ${slug}`);
          return;
        }

        printJson({ success: true, slug, updated: Object.keys(updates) });
        break;
      }

      case "stale": {
        const slug = positional[1];
        if (!slug) {
          printError("Slug required for deep stale");
        }

        const success = markDeepStale(db, slug);
        if (!success) {
          printError(`Deep context not found: ${slug}`);
          return;
        }

        printJson({ success: true, slug, status: "stale" });
        break;
      }

      case "delete": {
        const slug = positional[1];
        if (!slug) {
          printError("Slug required for deep delete");
        }

        const success = deleteDeep(db, slug);
        if (!success) {
          printError(`Deep context not found: ${slug}`);
          return;
        }

        printJson({ success: true, slug, deleted: true });
        break;
      }

      case "history": {
        const slug = positional[1];
        if (!slug) {
          printError("Slug required for deep history");
        }

        const history = getDeepHistory(db, slug);
        printJson({
          slug,
          versionCount: history.length,
          versions: history.map((v) => ({
            version: v.version,
            title: v.title,
            contentLength: v.content_md.length,
            ai_model: v.ai_model,
            created_at: v.created_at,
          })),
        });
        break;
      }

      case "version": {
        const slug = positional[1];
        const versionStr = positional[2];

        if (!slug) {
          printError("Slug required for deep version");
        }
        if (!versionStr) {
          printError("Version number required for deep version");
        }

        const version = parseInt(versionStr, 10);
        if (isNaN(version)) {
          printError("Version must be a number");
          return;
        }

        const historyEntry = getDeepVersion(db, slug, version);
        if (!historyEntry) {
          printError(`Version ${version} not found for: ${slug}`);
          return;
        }

        if (flags["json"] === true) {
          printJson(historyEntry);
        } else {
          console.log(historyEntry.content_md);
        }
        break;
      }

      default:
        printError(`Unknown deep subcommand: ${subcommand}`);
    }
  } finally {
    db.close();
  }
}

// ============================================================================
// Main
// ============================================================================

function main(): void {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    printHelp();
    process.exit(0);
  }

  const { command, positional, flags } = parseArgs(args);

  // Resolve paths
  const dbPath = (flags["db"] as string) || ".float/float.db";
  const projectRoot = (flags["root"] as string) || process.cwd();

  // Verify database exists for read commands (not needed for buoy subcommands)
  if (command !== "help" && command !== "buoy") {
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
      case "buoy":
        cmdBuoy(positional, flags);
        break;
      case "deep":
        cmdDeep(dbPath, positional, flags);
        break;
      default:
        printError(`Unknown command: ${command}`);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    printError(message);
  }
}

main();
