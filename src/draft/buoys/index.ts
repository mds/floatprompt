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
  BuoyArchetypeSchema,
  ContextDepthSchema,
  BuoyTypeSchema,
  // Schema sections
  BuoyMetaSchema,
  BuoyAISchema,
  BuoyInputSchema,
  BuoyOutputSchema,
  // Full schema
  BuoyJsonSchema,
  // Types
  type BuoyArchetype,
  type ContextDepth,
  type BuoyType,
  type BuoyMeta,
  type BuoyAI,
  type BuoyInput,
  type BuoyOutput,
  type BuoyJson,
  type BuoyTemplate,
  type ParseResult,
  type DispatchOptions,
  type BuiltPrompt,
  type OutputValidation,
  // Composition types (3-layer: global → archetype → specific)
  type GlobalGuidance,
  type ArchetypeGuidance,
  type ComposedBuoy,
} from "./schema.js";

// Parser
export {
  parseBuoyTemplate,
  isValidFloatPromptFormat,
} from "./parser.js";

// Registry
export {
  createRegistry,
  loadBuoyFromFile,
  DEFAULT_TEMPLATE_DIR,
  type BuoyRegistry,
  type LoadResult,
} from "./registry.js";

// Dispatch
export {
  buildBuoyPrompt,
  validateBuoyOutput,
  extractJsonFromResponse,
} from "./dispatch.js";

// Execution
export {
  executeBuoy,
  executeBuoyBatch,
  type ExecuteOptions,
  type ExecutionResult,
  type ExecuteBuoyParams,
} from "./execute.js";
