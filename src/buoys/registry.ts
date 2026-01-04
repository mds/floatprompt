import * as fs from "fs";
import * as path from "path";
import { BuoyTemplate, BuoyArchetype } from "./schema.js";
import { parseBuoyTemplate } from "./parser.js";

/**
 * Buoy Registry for FloatPrompt
 *
 * Discovers and loads buoy templates from a directory.
 * Provides lookup by id, archetype, and listing capabilities.
 *
 * Usage:
 *   const registry = createRegistry();
 *   registry.load('src/buoys/templates');
 *   const buoy = registry.get('context-generator');
 */

// ============================================================================
// Types
// ============================================================================

export interface BuoyRegistry {
  /** Map of buoy id to template */
  buoys: Map<string, BuoyTemplate>;

  /** Load all buoy templates from a directory */
  load: (dir: string) => LoadResult;

  /** Get a buoy template by id */
  get: (id: string) => BuoyTemplate | undefined;

  /** List all registered buoy ids */
  list: () => string[];

  /** Get all buoys of a specific archetype */
  getByArchetype: (archetype: BuoyArchetype) => BuoyTemplate[];

  /** Check if a buoy exists */
  has: (id: string) => boolean;

  /** Get count of registered buoys */
  count: () => number;
}

export interface LoadResult {
  loaded: string[];
  errors: Array<{ file: string; error: string }>;
}

// ============================================================================
// Registry Factory
// ============================================================================

/**
 * Create a new buoy registry.
 *
 * The registry is a stateful object that loads and caches buoy templates.
 * Call load() to populate from a directory, then use get() to retrieve.
 */
export function createRegistry(): BuoyRegistry {
  const buoys = new Map<string, BuoyTemplate>();

  return {
    buoys,

    load(dir: string): LoadResult {
      const result: LoadResult = { loaded: [], errors: [] };

      if (!fs.existsSync(dir)) {
        result.errors.push({ file: dir, error: "Directory not found" });
        return result;
      }

      const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

      for (const file of files) {
        const filePath = path.join(dir, file);
        const content = fs.readFileSync(filePath, "utf-8");
        const parseResult = parseBuoyTemplate(content, filePath);

        if (parseResult.success) {
          const id = parseResult.template.json.meta.id;
          buoys.set(id, parseResult.template);
          result.loaded.push(id);
        } else {
          result.errors.push({ file, error: parseResult.error });
        }
      }

      return result;
    },

    get(id: string): BuoyTemplate | undefined {
      return buoys.get(id);
    },

    list(): string[] {
      return Array.from(buoys.keys()).sort();
    },

    getByArchetype(archetype: BuoyArchetype): BuoyTemplate[] {
      return Array.from(buoys.values()).filter(
        (b) => b.json.ai.archetype === archetype
      );
    },

    has(id: string): boolean {
      return buoys.has(id);
    },

    count(): number {
      return buoys.size;
    },
  };
}

// ============================================================================
// Convenience Functions
// ============================================================================

/**
 * Load a single buoy template from a file path.
 * Useful when you know exactly which buoy you need.
 */
export function loadBuoyFromFile(filePath: string): BuoyTemplate | null {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const content = fs.readFileSync(filePath, "utf-8");
  const result = parseBuoyTemplate(content, filePath);

  return result.success ? result.template : null;
}

/**
 * Default template directory relative to project root.
 */
export const DEFAULT_TEMPLATE_DIR = "src/buoys/templates";
