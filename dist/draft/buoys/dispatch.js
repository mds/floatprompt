/**
 * Buoy Dispatch for FloatPrompt
 *
 * Builds prompts for buoy execution. Takes a buoy template and data,
 * returns system prompt and user message ready for AI consumption.
 *
 * This module handles prompt construction only. Actual AI execution
 * is handled by the caller (CLI, Task tool, fleet orchestrator).
 */
// ============================================================================
// Prompt Building
// ============================================================================
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
export function buildBuoyPrompt(options) {
    const { template, data, message, globalGuidance, archetypeGuidance } = options;
    const contextDepth = options.contextDepth ?? template.json.input.defaults.context_depth;
    // Validate data has required fields
    const missingFields = template.json.input.receives.filter((field) => !(field in data));
    if (missingFields.length > 0) {
        throw new Error(`Missing required fields for ${template.json.meta.id}: ${missingFields.join(", ")}`);
    }
    // Build system prompt from template (with optional global/archetype layers)
    const systemPrompt = buildSystemPrompt(template, globalGuidance, archetypeGuidance);
    // Build user message with data
    const userMessage = buildUserMessage(template, data, contextDepth, message);
    return {
        systemPrompt,
        userMessage,
        meta: {
            buoyId: template.json.meta.id,
            archetype: template.json.ai.archetype,
            receives: template.json.input.receives,
            produces: template.json.output.produces,
        },
    };
}
/**
 * Build system prompt from buoy template.
 * Composes 3 layers: global → archetype → specific (general to specific, like CSS cascade).
 */
function buildSystemPrompt(template, globalGuidance, archetypeGuidance) {
    const { json, markdown } = template;
    const parts = [
        `# ${json.meta.title}`,
        "",
        `**Role:** ${json.ai.role}`,
        `**Archetype:** ${json.ai.archetype}`,
        json.ai.sub_archetype ? `**Sub-archetype:** ${json.ai.sub_archetype}` : "",
        `**Autonomy:** ${json.ai.autonomy}`,
        "",
        "---",
    ];
    // Layer 1: Global guidance (if provided)
    if (globalGuidance) {
        parts.push("", "## System Guidance", "", globalGuidance.content, "", "---");
    }
    // Layer 2: Archetype guidance (if provided)
    if (archetypeGuidance) {
        parts.push("", "## Archetype Guidance", "", `*Shared patterns for all ${archetypeGuidance.archetype}s:*`, "", archetypeGuidance.content, "", "---");
    }
    // Layer 3: Specific buoy guidance
    parts.push("", "## Specific Guidance", "", markdown);
    return parts.filter(Boolean).join("\n");
}
/**
 * Build user message with data injection.
 * Includes task message, data payload, and expected outputs.
 */
function buildUserMessage(template, data, contextDepth, message) {
    return [
        message ?? "Process the following data:",
        "",
        "## Input Data",
        "",
        "```json",
        JSON.stringify(data, null, 2),
        "```",
        "",
        `**Context Depth:** ${contextDepth}`,
        "",
        "## Expected Output",
        "",
        "Return a JSON object with these fields:",
        ...template.json.output.produces.map((p) => `- \`${p}\``),
        "",
        "Wrap your response in ```json code blocks.",
    ].join("\n");
}
// ============================================================================
// Output Validation
// ============================================================================
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
export function validateBuoyOutput(output, produces) {
    const missing = produces.filter((field) => !(field in output));
    return {
        valid: missing.length === 0,
        missing,
    };
}
/**
 * Extract JSON from buoy response.
 *
 * Looks for JSON in code blocks or raw JSON in the response.
 * Returns null if no valid JSON found.
 */
export function extractJsonFromResponse(response) {
    // Try to find JSON in code block first
    const codeBlockMatch = response.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (codeBlockMatch) {
        try {
            return JSON.parse(codeBlockMatch[1].trim());
        }
        catch {
            // Fall through to try other patterns
        }
    }
    // Try to find raw JSON object
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
        try {
            return JSON.parse(jsonMatch[0]);
        }
        catch {
            return null;
        }
    }
    return null;
}
//# sourceMappingURL=dispatch.js.map