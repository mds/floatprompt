/**
 * Buoy Execution Engine for FloatPrompt
 *
 * Executes buoys by:
 * 1. Loading the buoy template from registry
 * 2. Building the system prompt (3-layer composition via dispatch.ts)
 * 3. Calling the Claude API
 * 4. Parsing and validating the response
 * 5. Returning structured output
 *
 * ## Execution Model
 *
 * TypeScript orchestrates → Claude thinks → SQLite stores
 *
 * This module handles steps 1-4. Step 5 (storage) is handled by the caller
 * (CLI command or orchestrator).
 *
 * ## Usage
 *
 * ```typescript
 * const result = await executeBuoy({
 *   buoyId: 'context-generator',
 *   input: { folder_path: '/src/db', folder_details: {...} },
 *   options: { contextDepth: 'parent_only' }
 * });
 *
 * if (result.success) {
 *   console.log(result.output);
 * } else {
 *   console.error(result.error);
 * }
 * ```
 *
 * ## Dependencies
 *
 * Requires @anthropic-ai/sdk for API calls. Install with:
 *   npm install @anthropic-ai/sdk
 *
 * Set ANTHROPIC_API_KEY environment variable.
 */
import { ContextDepth, OutputValidation, BuiltPrompt } from "./schema.js";
/**
 * Options for buoy execution
 */
export interface ExecuteOptions {
    /** Override context depth from template default */
    contextDepth?: ContextDepth;
    /** Custom message to include in user prompt */
    message?: string;
    /** Path to templates directory (defaults to src/buoys/templates/) */
    templateDir?: string;
    /** Model to use (defaults to claude-sonnet-4-20250514) */
    model?: string;
    /** Maximum tokens for response (defaults to 4096) */
    maxTokens?: number;
}
/**
 * Result of buoy execution
 */
export interface ExecutionResult {
    /** Whether execution succeeded */
    success: boolean;
    /** Parsed output from buoy (if success) */
    output: Record<string, unknown> | null;
    /** Error message (if failure) */
    error: string | null;
    /** Validation result */
    validation: OutputValidation | null;
    /** Raw response from Claude (for debugging) */
    rawResponse?: string;
    /** Metadata about the execution */
    meta: {
        buoyId: string;
        model: string;
        durationMs: number;
    };
}
/**
 * Parameters for executeBuoy
 */
export interface ExecuteBuoyParams {
    /** Buoy template ID (e.g., 'context-generator') */
    buoyId: string;
    /** Input data matching buoy's receives contract */
    input: Record<string, unknown>;
    /** Execution options */
    options?: ExecuteOptions;
}
/**
 * Execute a buoy with the given input.
 *
 * @param params - Buoy ID, input data, and options
 * @returns ExecutionResult with success/failure and output
 *
 * @example
 * ```typescript
 * const result = await executeBuoy({
 *   buoyId: 'scope-detector',
 *   input: {
 *     folder_path: '/packages/api',
 *     folder_details: { ... },
 *     parent_context: 'Monorepo packages directory'
 *   }
 * });
 * ```
 */
export declare function executeBuoy(params: ExecuteBuoyParams): Promise<ExecutionResult>;
/**
 * Call Claude API with built prompt.
 *
 * TODO: This is currently a stub. To enable actual execution:
 * 1. Install: npm install @anthropic-ai/sdk
 * 2. Set ANTHROPIC_API_KEY environment variable
 * 3. Replace this function with actual API call
 *
 * @param prompt - Built prompt from dispatch
 * @param model - Model ID to use
 * @param maxTokens - Maximum response tokens
 * @returns Raw text response from Claude
 */
declare function callClaudeAPI(prompt: BuiltPrompt, model: string, maxTokens: number): Promise<string>;
/**
 * Execute multiple buoys in parallel.
 *
 * Useful for processing many folders at once (fleet mode).
 *
 * @param buoyId - Single buoy ID to execute for all inputs
 * @param inputs - Array of input data objects
 * @param options - Shared execution options
 * @returns Array of execution results in same order as inputs
 *
 * @example
 * ```typescript
 * const results = await executeBuoyBatch(
 *   'context-generator',
 *   [
 *     { folder_path: '/src/db', ... },
 *     { folder_path: '/src/cli', ... },
 *     { folder_path: '/src/buoys', ... }
 *   ]
 * );
 * ```
 */
export declare function executeBuoyBatch(buoyId: string, inputs: Record<string, unknown>[], options?: ExecuteOptions): Promise<ExecutionResult[]>;
export { callClaudeAPI as _callClaudeAPI };
//# sourceMappingURL=execute.d.ts.map