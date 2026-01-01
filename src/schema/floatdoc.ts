import { z } from "zod";

/**
 * FloatDoc Schema
 * Format: YAML frontmatter + markdown
 * Use: Context files, maps, documentation
 */

export const FloatDocSchema = z.object({
  // Document metadata
  title: z.string(),
  type: z.string(),
  status: z.string(),
  created: z.string(), // YYYY-MM-DD or YYYY-MM
  related: z.string().optional(), // comma-separated paths

  // Human attribution
  human_author: z.string(),
  human_intent: z.string(),
  human_context: z.string().optional(),

  // AI attribution
  ai_model: z.string().optional(),
  ai_updated: z.string().optional(), // YYYY-MM-DD
  ai_notes: z.string().optional(),
});

export type FloatDoc = z.infer<typeof FloatDocSchema>;
