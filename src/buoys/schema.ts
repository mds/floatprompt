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
export type BuoyArchetype = z.infer<typeof BuoyArchetypeSchema>;

// Context depth options — how much context the buoy reads
export const ContextDepthSchema = z.enum([
  "none", // Nothing from DB
  "self_only", // Just this folder's context
  "parent_only", // This folder + immediate parent
  "scope_chain", // This folder up to scope root
  "full", // Everything relevant
]);
export type ContextDepth = z.infer<typeof ContextDepthSchema>;

// Buoy type — always "ai" for now (future: "mechanical" for TypeScript-only workers)
export const BuoyTypeSchema = z.enum(["ai"]);
export type BuoyType = z.infer<typeof BuoyTypeSchema>;

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
export type BuoyMeta = z.infer<typeof BuoyMetaSchema>;

// ai: Role and autonomy — what does this buoy do?
export const BuoyAISchema = z.object({
  role: z.string(), // 1-3 sentences describing job and purpose
  archetype: BuoyArchetypeSchema, // One of 7 buckets
  sub_archetype: z.string().nullable(), // Specific buoy type (optional)
  autonomy: z.string(), // Where judgment lives
});
export type BuoyAI = z.infer<typeof BuoyAISchema>;

// input: Contract for what buoy receives
export const BuoyInputSchema = z.object({
  receives: z.array(z.string()), // Field names the buoy expects
  defaults: z.object({
    context_depth: ContextDepthSchema, // Default context depth
  }),
});
export type BuoyInput = z.infer<typeof BuoyInputSchema>;

// output: Contract for what buoy produces
export const BuoyOutputSchema = z.object({
  produces: z.array(z.string()), // Field names the buoy returns
});
export type BuoyOutput = z.infer<typeof BuoyOutputSchema>;

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
export type BuoyJson = z.infer<typeof BuoyJsonSchema>;

// ============================================================================
// Runtime Types
// ============================================================================

// Parsed buoy template (JSON + markdown combined)
export interface BuoyTemplate {
  json: BuoyJson;
  markdown: string;
  sourcePath: string;
}

// Result of parsing a buoy file
export type ParseResult =
  | { success: true; template: BuoyTemplate }
  | { success: false; error: string };

// Options for dispatching a buoy
export interface DispatchOptions {
  template: BuoyTemplate;
  data: Record<string, unknown>;
  contextDepth?: ContextDepth;
  message?: string;
}

// Built prompt ready for AI consumption
export interface BuiltPrompt {
  systemPrompt: string;
  userMessage: string;
  meta: {
    buoyId: string;
    archetype: BuoyArchetype;
    receives: string[];
    produces: string[];
  };
}

// Buoy output validation result
export interface OutputValidation {
  valid: boolean;
  missing: string[];
}
