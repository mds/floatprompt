import { z } from "zod";
/**
 * FloatDoc Schema
 * Format: YAML frontmatter + markdown
 * Use: Context files, maps, navigation — lightweight AI terrain awareness
 *
 * Design principles:
 * 1. Easily generated — half auto-injected by build system
 * 2. Just enough context — one-liners, not paragraphs
 * 3. Terrain awareness — AI reads frontmatter across files, builds mental map
 * 4. Deep dive signal — enough info to know WHEN to read fully
 */
export declare const FloatDocSchema: z.ZodObject<{
    title: z.ZodString;
    type: z.ZodString;
    status: z.ZodString;
    description: z.ZodString;
    created: z.ZodString;
    human_author: z.ZodString;
    ai_model: z.ZodString;
    ai_updated: z.ZodString;
    human_context: z.ZodOptional<z.ZodString>;
    ai_notes: z.ZodOptional<z.ZodString>;
    related: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title: string;
    type: string;
    status: string;
    description: string;
    created: string;
    human_author: string;
    ai_model: string;
    ai_updated: string;
    human_context?: string | undefined;
    ai_notes?: string | undefined;
    related?: string | undefined;
}, {
    title: string;
    type: string;
    status: string;
    description: string;
    created: string;
    human_author: string;
    ai_model: string;
    ai_updated: string;
    human_context?: string | undefined;
    ai_notes?: string | undefined;
    related?: string | undefined;
}>;
export type FloatDoc = z.infer<typeof FloatDocSchema>;
//# sourceMappingURL=floatdoc.d.ts.map