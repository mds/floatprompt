import { DispatchOptions, BuiltPrompt, OutputValidation } from "./schema.js";
/**
 * Buoy Dispatch for FloatPrompt
 *
 * Builds prompts for buoy execution. Takes a buoy template and data,
 * returns system prompt and user message ready for AI consumption.
 *
 * This module handles prompt construction only. Actual AI execution
 * is handled by the caller (CLI, Task tool, fleet orchestrator).
 */
/**
 * Build prompts for buoy dispatch.
 *
 * Creates system prompt (from template markdown) and user message (data + task).
 * Validates that required input fields are present.
 *
 * @param options - Dispatch options with template, data, and optional overrides
 * @returns BuiltPrompt with systemPrompt, userMessage, and metadata
 * @throws Error if required input fields are missing
 */
export declare function buildBuoyPrompt(options: DispatchOptions): BuiltPrompt;
/**
 * Validate buoy output against expected produces.
 *
 * Checks that all required output fields are present in the response.
 * Does not validate types or content — that's the caller's responsibility.
 *
 * @param output - The parsed output object from buoy response
 * @param produces - Array of expected field names (from template)
 * @returns OutputValidation with valid flag and list of missing fields
 */
export declare function validateBuoyOutput(output: Record<string, unknown>, produces: string[]): OutputValidation;
/**
 * Extract JSON from buoy response.
 *
 * Looks for JSON in code blocks or raw JSON in the response.
 * Returns null if no valid JSON found.
 */
export declare function extractJsonFromResponse(response: string): Record<string, unknown> | null;
//# sourceMappingURL=dispatch.d.ts.map