import * as fs from "fs";
import * as path from "path";
import {
  BuoyTemplate,
  BuoyArchetype,
  GlobalGuidance,
  ArchetypeGuidance,
  ComposedBuoy,
} from "./schema.js";
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

  /** Load all buoy templates from a directory (also loads global and archetypes) */
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

  /** Get global guidance (if loaded) */
  getGlobal: () => GlobalGuidance | null;

  /** Get archetype guidance by archetype name */
  getArchetype: (archetype: BuoyArchetype) => ArchetypeGuidance | undefined;

  /** List all loaded archetypes */
  listArchetypes: () => BuoyArchetype[];

  /** Get composed buoy (template + global + archetype) */
  getComposed: (id: string) => ComposedBuoy | undefined;
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
  const archetypes = new Map<BuoyArchetype, ArchetypeGuidance>();
  let global: GlobalGuidance | null = null;

  return {
    buoys,

    load(dir: string): LoadResult {
      const result: LoadResult = { loaded: [], errors: [] };

      if (!fs.existsSync(dir)) {
        result.errors.push({ file: dir, error: "Directory not found" });
        return result;
      }

      // Load buoy templates
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

      // Load global.md from parent directory (graceful if missing)
      const globalPath = path.join(dir, "../global.md");
      if (fs.existsSync(globalPath)) {
        const content = fs.readFileSync(globalPath, "utf-8");
        global = { content, sourcePath: globalPath };
      }

      // Load archetypes from sibling directory (graceful if missing)
      const archetypesDir = path.join(dir, "../archetypes");
      if (fs.existsSync(archetypesDir)) {
        const archetypeNames: BuoyArchetype[] = [
          "generator",
          "validator",
          "fixer",
          "mapper",
          "integrator",
          "orchestrator",
          "recorder",
        ];

        for (const name of archetypeNames) {
          const filePath = path.join(archetypesDir, `${name}.md`);
          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, "utf-8");
            archetypes.set(name, {
              archetype: name,
              content,
              sourcePath: filePath,
            });
          }
          // Missing archetype files are NOT errors (graceful degradation)
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

    getGlobal(): GlobalGuidance | null {
      return global;
    },

    getArchetype(archetype: BuoyArchetype): ArchetypeGuidance | undefined {
      return archetypes.get(archetype);
    },

    listArchetypes(): BuoyArchetype[] {
      return Array.from(archetypes.keys());
    },

    getComposed(id: string): ComposedBuoy | undefined {
      const template = buoys.get(id);
      if (!template) return undefined;

      return {
        template,
        globalGuidance: global,
        archetypeGuidance: archetypes.get(template.json.ai.archetype) || null,
      };
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
