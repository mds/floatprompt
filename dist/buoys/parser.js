import { BuoyJsonSchema } from "./schema.js";
/**
 * FloatPrompt Format Parser for Buoy Templates
 *
 * Parses the <fp><json>...</json><md>...</md></fp> format used by buoy templates.
 * Extracts JSON block, validates against schema, and returns parsed template.
 *
 * See .float-workshop/docs/buoys.md for format specification.
 */
// ============================================================================
// Extraction Helpers
// ============================================================================
/**
 * Extract JSON block from FloatPrompt format.
 * Looks for content between <json> and </json> tags.
 */
function extractJson(content) {
    const jsonMatch = content.match(/<json>([\s\S]*?)<\/json>/);
    return jsonMatch ? jsonMatch[1].trim() : null;
}
/**
 * Extract markdown block from FloatPrompt format.
 * Looks for content between <md> and </md> tags.
 */
function extractMarkdown(content) {
    const mdMatch = content.match(/<md>([\s\S]*?)<\/md>/);
    return mdMatch ? mdMatch[1].trim() : null;
}
// ============================================================================
// Core Parser
// ============================================================================
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
export function parseBuoyTemplate(content, sourcePath) {
    // Check for <fp> wrapper
    if (!content.includes("<fp>") || !content.includes("</fp>")) {
        return { success: false, error: "Missing <fp> wrapper" };
    }
    // Extract JSON block
    const jsonStr = extractJson(content);
    if (!jsonStr) {
        return { success: false, error: "Missing <json> block" };
    }
    // Extract markdown block
    const markdown = extractMarkdown(content);
    if (!markdown) {
        return { success: false, error: "Missing <md> block" };
    }
    // Parse JSON
    let jsonData;
    try {
        jsonData = JSON.parse(jsonStr);
    }
    catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        return { success: false, error: `Invalid JSON: ${message}` };
    }
    // Validate against schema
    const result = BuoyJsonSchema.safeParse(jsonData);
    if (!result.success) {
        const issues = result.error.issues
            .map((i) => `${i.path.join(".")}: ${i.message}`)
            .join("; ");
        return { success: false, error: `Schema validation failed: ${issues}` };
    }
    return {
        success: true,
        template: {
            json: result.data,
            markdown,
            sourcePath,
        },
    };
}
/**
 * Validate that a string is valid FloatPrompt format without full parsing.
 * Useful for quick validation before expensive operations.
 */
export function isValidFloatPromptFormat(content) {
    return (content.includes("<fp>") &&
        content.includes("</fp>") &&
        content.includes("<json>") &&
        content.includes("</json>") &&
        content.includes("<md>") &&
        content.includes("</md>"));
}
//# sourceMappingURL=parser.js.map