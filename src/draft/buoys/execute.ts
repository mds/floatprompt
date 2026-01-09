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

import {
  ContextDepth,
  OutputValidation,
  BuiltPrompt,
} from "./schema.js";
import {
  createRegistry,
  DEFAULT_TEMPLATE_DIR,
  type BuoyRegistry,
} from "./registry.js";
import {
  buildBuoyPrompt,
  validateBuoyOutput,
  extractJsonFromResponse,
} from "./dispatch.js";

// ============================================================================
// Types
// ============================================================================

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

// ============================================================================
// Execution
// ============================================================================

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
export async function executeBuoy(
  params: ExecuteBuoyParams
): Promise<ExecutionResult> {
  const { buoyId, input, options = {} } = params;
  const startTime = Date.now();
  const model = options.model ?? "claude-sonnet-4-20250514";

  // Step 1: Load buoy from registry
  const registry = createRegistry();
  const templateDir = options.templateDir ?? DEFAULT_TEMPLATE_DIR;
  registry.load(templateDir);

  const composed = registry.getComposed(buoyId);
  if (!composed) {
    return {
      success: false,
      output: null,
      error: `Buoy not found: ${buoyId}. Available: ${registry.list().join(", ")}`,
      validation: null,
      meta: {
        buoyId,
        model,
        durationMs: Date.now() - startTime,
      },
    };
  }

  // Step 2: Build prompt using dispatch
  let prompt: BuiltPrompt;
  try {
    prompt = buildBuoyPrompt({
      template: composed.template,
      data: input,
      globalGuidance: composed.globalGuidance ?? undefined,
      archetypeGuidance: composed.archetypeGuidance ?? undefined,
      contextDepth: options.contextDepth,
      message: options.message,
    });
  } catch (err) {
    return {
      success: false,
      output: null,
      error: `Prompt build failed: ${err instanceof Error ? err.message : String(err)}`,
      validation: null,
      meta: {
        buoyId,
        model,
        durationMs: Date.now() - startTime,
      },
    };
  }

  // Step 3: Call Claude API
  let rawResponse: string;
  try {
    rawResponse = await callClaudeAPI(prompt, model, options.maxTokens ?? 4096);
  } catch (err) {
    return {
      success: false,
      output: null,
      error: `API call failed: ${err instanceof Error ? err.message : String(err)}`,
      validation: null,
      meta: {
        buoyId,
        model,
        durationMs: Date.now() - startTime,
      },
    };
  }

  // Step 4: Parse response
  const parsed = extractJsonFromResponse(rawResponse);
  if (!parsed) {
    return {
      success: false,
      output: null,
      error: "Failed to parse JSON from response",
      validation: null,
      rawResponse,
      meta: {
        buoyId,
        model,
        durationMs: Date.now() - startTime,
      },
    };
  }

  // Step 5: Validate output
  const validation = validateBuoyOutput(
    parsed,
    composed.template.json.output.produces
  );

  if (!validation.valid) {
    return {
      success: false,
      output: parsed,
      error: `Missing required output fields: ${validation.missing.join(", ")}`,
      validation,
      rawResponse,
      meta: {
        buoyId,
        model,
        durationMs: Date.now() - startTime,
      },
    };
  }

  // Success!
  return {
    success: true,
    output: parsed,
    error: null,
    validation,
    rawResponse,
    meta: {
      buoyId,
      model,
      durationMs: Date.now() - startTime,
    },
  };
}

// ============================================================================
// Claude API Integration
// ============================================================================

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
async function callClaudeAPI(
  prompt: BuiltPrompt,
  model: string,
  maxTokens: number
): Promise<string> {
  // Check for Anthropic SDK
  // If not available, throw helpful error
  try {
    // Dynamic import to avoid hard dependency
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const AnthropicModule = await import("@anthropic-ai/sdk" as any);
    const Anthropic = AnthropicModule.default;

    const client = new Anthropic();

    const message = await client.messages.create({
      model,
      max_tokens: maxTokens,
      system: prompt.systemPrompt,
      messages: [{ role: "user", content: prompt.userMessage }],
    });

    // Extract text from response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const textBlock = message.content.find((block: any) => block.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("No text content in response");
    }

    return textBlock.text;
  } catch (err) {
    if (
      err instanceof Error &&
      err.message.includes("Cannot find module")
    ) {
      throw new Error(
        "Anthropic SDK not installed. Run: npm install @anthropic-ai/sdk\n" +
          "Then set ANTHROPIC_API_KEY environment variable."
      );
    }
    throw err;
  }
}

// ============================================================================
// Batch Execution
// ============================================================================

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
export async function executeBuoyBatch(
  buoyId: string,
  inputs: Record<string, unknown>[],
  options?: ExecuteOptions
): Promise<ExecutionResult[]> {
  // Execute all in parallel
  const promises = inputs.map((input) =>
    executeBuoy({ buoyId, input, options })
  );

  return Promise.all(promises);
}

// ============================================================================
// Export for index.ts
// ============================================================================

export { callClaudeAPI as _callClaudeAPI }; // Export for testing
