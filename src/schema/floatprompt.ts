import { z } from "zod";

/**
 * FloatPrompt Schema
 * Format: <fp><json>{ ... }</json><md>...</md></fp>
 * Use: Tools that modify AI behavior
 */

export const MetaSchema = z.object({
  title: z.string(),
  id: z.string(),
  type: z.enum(["system", "custom"]),
  // format: removed - system knows it's floatprompt
  // version: removed - system/package.json owns versioning
});

export const HumanSchema = z.object({
  author: z.string(),
  intent: z.string(),
  context: z.string().optional(),
});

export const AISchema = z.object({
  role: z.string(),
  // behavior, tone, pacing, approach → all go in requirements
});

export const RequirementsSchema = z.record(z.unknown());

export const FloatPromptJsonSchema = z.object({
  STOP: z.string(),
  meta: MetaSchema,
  human: HumanSchema,
  ai: AISchema,
  requirements: RequirementsSchema,
});

export type FloatPromptJson = z.infer<typeof FloatPromptJsonSchema>;
export type Meta = z.infer<typeof MetaSchema>;
export type Human = z.infer<typeof HumanSchema>;
export type AI = z.infer<typeof AISchema>;
