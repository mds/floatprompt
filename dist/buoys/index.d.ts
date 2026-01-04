/**
 * FloatPrompt Buoy System
 *
 * Buoys are AI workers that handle tasks requiring judgment.
 * This module provides the infrastructure for loading, parsing,
 * and dispatching buoy templates.
 *
 * Core exports:
 * - Schema types (BuoyJson, BuoyTemplate, etc.)
 * - Parser (parseBuoyTemplate)
 * - Registry (createRegistry)
 * - Dispatch (buildBuoyPrompt, validateBuoyOutput)
 *
 * See .float-workshop/docs/buoys.md for architecture documentation.
 */
export { BuoyArchetypeSchema, ContextDepthSchema, BuoyTypeSchema, BuoyMetaSchema, BuoyAISchema, BuoyInputSchema, BuoyOutputSchema, BuoyJsonSchema, type BuoyArchetype, type ContextDepth, type BuoyType, type BuoyMeta, type BuoyAI, type BuoyInput, type BuoyOutput, type BuoyJson, type BuoyTemplate, type ParseResult, type DispatchOptions, type BuiltPrompt, type OutputValidation, type GlobalGuidance, type ArchetypeGuidance, type ComposedBuoy, } from "./schema.js";
export { parseBuoyTemplate, isValidFloatPromptFormat, } from "./parser.js";
export { createRegistry, loadBuoyFromFile, DEFAULT_TEMPLATE_DIR, type BuoyRegistry, type LoadResult, } from "./registry.js";
export { buildBuoyPrompt, validateBuoyOutput, extractJsonFromResponse, } from "./dispatch.js";
export { executeBuoy, executeBuoyBatch, type ExecuteOptions, type ExecutionResult, type ExecuteBuoyParams, } from "./execute.js";
//# sourceMappingURL=index.d.ts.map