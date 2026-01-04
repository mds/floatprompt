import { BuoyTemplate, BuoyArchetype } from "./schema.js";
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
    errors: Array<{
        file: string;
        error: string;
    }>;
}
/**
 * Create a new buoy registry.
 *
 * The registry is a stateful object that loads and caches buoy templates.
 * Call load() to populate from a directory, then use get() to retrieve.
 */
export declare function createRegistry(): BuoyRegistry;
/**
 * Load a single buoy template from a file path.
 * Useful when you know exactly which buoy you need.
 */
export declare function loadBuoyFromFile(filePath: string): BuoyTemplate | null;
/**
 * Default template directory relative to project root.
 */
export declare const DEFAULT_TEMPLATE_DIR = "src/buoys/templates";
//# sourceMappingURL=registry.d.ts.map