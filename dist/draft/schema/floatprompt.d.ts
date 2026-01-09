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
export declare const RequiredSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    title: string;
}, {
    id: string;
    title: string;
}>;
export declare const StopSchema: z.ZodString;
export declare const TypeSchema: z.ZodEnum<["system", "custom"]>;
export declare const HumanSchema: z.ZodObject<{
    author: z.ZodString;
    intent: z.ZodString;
    context: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    author: string;
    intent: string;
    context?: string | undefined;
}, {
    author: string;
    intent: string;
    context?: string | undefined;
}>;
export declare const AISchema: z.ZodObject<{
    role: z.ZodString;
}, "strip", z.ZodTypeAny, {
    role: string;
}, {
    role: string;
}>;
export declare const ToolRoutingSchema: z.ZodObject<{
    triggers: z.ZodArray<z.ZodString, "many">;
    checks: z.ZodArray<z.ZodString, "many">;
    outputs: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    triggers: string[];
    checks: string[];
    outputs: string[];
}, {
    triggers: string[];
    checks: string[];
    outputs: string[];
}>;
export declare const RequirementsSchema: z.ZodRecord<z.ZodString, z.ZodUnknown>;
export declare const FloatPromptJsonSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    STOP: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<["system", "custom"]>>;
    human: z.ZodOptional<z.ZodObject<{
        author: z.ZodString;
        intent: z.ZodString;
        context: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        author: string;
        intent: string;
        context?: string | undefined;
    }, {
        author: string;
        intent: string;
        context?: string | undefined;
    }>>;
    ai: z.ZodOptional<z.ZodObject<{
        role: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        role: string;
    }, {
        role: string;
    }>>;
    triggers: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    checks: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    outputs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    requirements: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    title: string;
    type?: "custom" | "system" | undefined;
    ai?: {
        role: string;
    } | undefined;
    triggers?: string[] | undefined;
    checks?: string[] | undefined;
    outputs?: string[] | undefined;
    STOP?: string | undefined;
    human?: {
        author: string;
        intent: string;
        context?: string | undefined;
    } | undefined;
    requirements?: Record<string, unknown> | undefined;
}, {
    id: string;
    title: string;
    type?: "custom" | "system" | undefined;
    ai?: {
        role: string;
    } | undefined;
    triggers?: string[] | undefined;
    checks?: string[] | undefined;
    outputs?: string[] | undefined;
    STOP?: string | undefined;
    human?: {
        author: string;
        intent: string;
        context?: string | undefined;
    } | undefined;
    requirements?: Record<string, unknown> | undefined;
}>;
export type FloatPromptJson = z.infer<typeof FloatPromptJsonSchema>;
export type Human = z.infer<typeof HumanSchema>;
export type AI = z.infer<typeof AISchema>;
export type ToolRouting = z.infer<typeof ToolRoutingSchema>;
//# sourceMappingURL=floatprompt.d.ts.map