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
// Schema types
export { 
// Enums
BuoyArchetypeSchema, ContextDepthSchema, BuoyTypeSchema, 
// Schema sections
BuoyMetaSchema, BuoyAISchema, BuoyInputSchema, BuoyOutputSchema, 
// Full schema
BuoyJsonSchema, } from "./schema.js";
// Parser
export { parseBuoyTemplate, isValidFloatPromptFormat, } from "./parser.js";
// Registry
export { createRegistry, loadBuoyFromFile, DEFAULT_TEMPLATE_DIR, } from "./registry.js";
// Dispatch
export { buildBuoyPrompt, validateBuoyOutput, extractJsonFromResponse, } from "./dispatch.js";
//# sourceMappingURL=index.js.map