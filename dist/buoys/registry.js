import * as fs from "fs";
import * as path from "path";
import { parseBuoyTemplate } from "./parser.js";
// ============================================================================
// Registry Factory
// ============================================================================
/**
 * Create a new buoy registry.
 *
 * The registry is a stateful object that loads and caches buoy templates.
 * Call load() to populate from a directory, then use get() to retrieve.
 */
export function createRegistry() {
    const buoys = new Map();
    return {
        buoys,
        load(dir) {
            const result = { loaded: [], errors: [] };
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
                }
                else {
                    result.errors.push({ file, error: parseResult.error });
                }
            }
            return result;
        },
        get(id) {
            return buoys.get(id);
        },
        list() {
            return Array.from(buoys.keys()).sort();
        },
        getByArchetype(archetype) {
            return Array.from(buoys.values()).filter((b) => b.json.ai.archetype === archetype);
        },
        has(id) {
            return buoys.has(id);
        },
        count() {
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
export function loadBuoyFromFile(filePath) {
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
//# sourceMappingURL=registry.js.map