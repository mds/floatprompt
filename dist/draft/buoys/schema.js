import { z } from "zod";
/**
 * Buoy Schema for FloatPrompt AI Workers
 *
 * Buoys are AI workers that handle tasks requiring judgment.
 * Each buoy has a role, archetype, input contract, and output contract.
 *
 * Schema structure:
 * - meta: Identity (id, title, type, version)
 * - ai: Role and autonomy (role, archetype, sub_archetype, autonomy)
 * - input: What buoy receives (receives[], defaults)
 * - output: What buoy produces (produces[])
 *
 * Schema spec locked 2026-01-04 (Session 9).
 * See .float-workshop/docs/buoys.md for full architecture.
 */
// ============================================================================
// Enums
// ============================================================================
// The 7 buoy archetypes — what kind of work this buoy does
export const BuoyArchetypeSchema = z.enum([
    "generator", // Create content (context, summaries, explanations)
    "validator", // Check correctness (staleness, quality, integrity)
    "fixer", // Repair problems (refs, paths, conflicts, sync)
    "mapper", // Internal connections (relationships, patterns, dependencies)
    "integrator", // External systems (Git, GitHub, CI/CD, IDE)
    "orchestrator", // Coordinate buoys (spawn, merge, prioritize, decide)
    "recorder", // Record activity (decisions, harvests, metrics, archives)
]);
// Context depth options — how much context the buoy reads
export const ContextDepthSchema = z.enum([
    "none", // Nothing from DB
    "self_only", // Just this folder's context
    "parent_only", // This folder + immediate parent
    "scope_chain", // This folder up to scope root
    "full", // Everything relevant
]);
// Buoy type — always "ai" for now (future: "mechanical" for TypeScript-only workers)
export const BuoyTypeSchema = z.enum(["ai"]);
// ============================================================================
// Schema Sections
// ============================================================================
// meta: Identity — who is this buoy?
export const BuoyMetaSchema = z.object({
    id: z.string(), // kebab-case identifier (e.g., "context-generator")
    title: z.string(), // Human-readable name (e.g., "Context Generator")
    type: BuoyTypeSchema, // Always "ai" for now
    version: z.string(), // Semver (e.g., "0.1.0")
});
// ai: Role and autonomy — what does this buoy do?
export const BuoyAISchema = z.object({
    role: z.string(), // 1-3 sentences describing job and purpose
    archetype: BuoyArchetypeSchema, // One of 7 buckets
    sub_archetype: z.string().nullable(), // Specific buoy type (optional)
    autonomy: z.string(), // Where judgment lives
});
// input: Contract for what buoy receives
export const BuoyInputSchema = z.object({
    receives: z.array(z.string()), // Field names the buoy expects
    defaults: z.object({
        context_depth: ContextDepthSchema, // Default context depth
    }),
});
// output: Contract for what buoy produces
export const BuoyOutputSchema = z.object({
    produces: z.array(z.string()), // Field names the buoy returns
});
// ============================================================================
// Full Buoy Schema
// ============================================================================
// Complete buoy JSON structure (the <json> block in FloatPrompt format)
export const BuoyJsonSchema = z.object({
    meta: BuoyMetaSchema,
    ai: BuoyAISchema,
    input: BuoyInputSchema,
    output: BuoyOutputSchema,
});
//# sourceMappingURL=schema.js.map