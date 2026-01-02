import { z } from "zod";

/**
 * FloatPrompt Schema
 * Format: <fp><json>{ ... }</json><md>...</md></fp>
 * Use: Structured context for AI (tools, boot files, standalone prompts)
 *
 * Design principles:
 * 1. Minimal required — just id and title
 * 2. Everything else optional — add as needed
 * 3. Like HTML — required structure, optional elements
 * 4. Tiers are guidelines — fullest/fuller/minimal based on usage
 */

// Required fields (every FloatPrompt has these)
export const RequiredSchema = z.object({
  id: z.string(),                        // how code/AI references it
  title: z.string(),                     // what humans read
});

// Optional: Focus breaking
export const StopSchema = z.string();    // mode directive, AI sees first

// Optional: Type discriminator
export const TypeSchema = z.enum(["system", "custom"]);

// Optional: Attribution
export const HumanSchema = z.object({
  author: z.string(),                    // who owns this
  intent: z.string(),                    // why it exists
  context: z.string().optional(),        // additional context
});

// Optional: Persona
export const AISchema = z.object({
  role: z.string(),                      // what AI is when using this
});

// Optional: Tool routing
export const ToolRoutingSchema = z.object({
  triggers: z.array(z.string()),         // when to use this tool
  checks: z.array(z.string()),           // what it verifies
  outputs: z.array(z.string()),          // what it produces
});

// Optional: Complex behavior
export const RequirementsSchema = z.record(z.unknown());

// Full schema (all fields, most optional)
export const FloatPromptJsonSchema = z.object({
  // Required
  id: z.string(),
  title: z.string(),

  // Optional
  STOP: StopSchema.optional(),
  type: TypeSchema.optional(),
  human: HumanSchema.optional(),
  ai: AISchema.optional(),
  triggers: z.array(z.string()).optional(),
  checks: z.array(z.string()).optional(),
  outputs: z.array(z.string()).optional(),
  requirements: RequirementsSchema.optional(),
});

// Type exports
export type FloatPromptJson = z.infer<typeof FloatPromptJsonSchema>;
export type Human = z.infer<typeof HumanSchema>;
export type AI = z.infer<typeof AISchema>;
export type ToolRouting = z.infer<typeof ToolRoutingSchema>;
