import { z } from "zod";

/**
 * FloatPrompt Schema
 * Format: <fp><json>{ ... }</json><md>...</md></fp>
 * Use: Tools that modify AI behavior
 *
 * Design principles:
 * 1. Structured JSON — 5 top-level keys, predictable shape
 * 2. Minimal required fields — just what's needed for identity and behavior
 * 3. Flexible requirements — AI's playground for tool-specific logic
 * 4. Type discriminator — system vs custom determines markdown validation
 */

export const MetaSchema = z.object({
  // Identity (required)
  title: z.string(),                     // display name
  id: z.string(),                        // identifier (kebab-case)
  type: z.enum(["system", "custom"]),    // determines markdown validation strictness
  // format: removed — system knows it's floatprompt
  // version: removed — system/package.json owns versioning
});

export const HumanSchema = z.object({
  // Ownership (required)
  author: z.string(),                    // who owns this (from global config)
  intent: z.string(),                    // why it exists (one line)

  // Optional depth
  context: z.string().optional(),        // additional context
});

export const AISchema = z.object({
  // Persona (required)
  role: z.string(),                      // what AI is when using this tool
  // behavior, tone, pacing, approach → all go in requirements
});

export const RequirementsSchema = z.record(z.unknown());
// AI's playground — intentionally unstructured
// Each tool defines what it needs: phases, rules, output formats, etc.

export const FloatPromptJsonSchema = z.object({
  STOP: z.string(),                      // mode directive — AI sees this first
  meta: MetaSchema,                      // identity
  human: HumanSchema,                    // ownership
  ai: AISchema,                          // persona
  requirements: RequirementsSchema,      // tool-specific behavior
});

// Type exports
export type FloatPromptJson = z.infer<typeof FloatPromptJsonSchema>;
export type Meta = z.infer<typeof MetaSchema>;
export type Human = z.infer<typeof HumanSchema>;
export type AI = z.infer<typeof AISchema>;
