import { ParseResult } from "./schema.js";
/**
 * Parse a buoy template file in FloatPrompt format.
 *
 * Expected format:
 * ```
 * <fp>
 * <json>
 * { "meta": {...}, "ai": {...}, "input": {...}, "output": {...} }
 * </json>
 * <md>
 * # Title
 * ## What You Receive
 * ## What You Produce
 * ## Guidance
 * ## You Decide
 * </md>
 * </fp>
 * ```
 *
 * @param content - Raw file content
 * @param sourcePath - Path to source file (for error messages and metadata)
 * @returns ParseResult with success/failure and template or error
 */
export declare function parseBuoyTemplate(content: string, sourcePath: string): ParseResult;
/**
 * Validate that a string is valid FloatPrompt format without full parsing.
 * Useful for quick validation before expensive operations.
 */
export declare function isValidFloatPromptFormat(content: string): boolean;
//# sourceMappingURL=parser.d.ts.map