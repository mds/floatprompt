import { z } from "zod";
/**
 * Buoy Schema for FloatPrompt AI Workers
 *
 * Buoys are AI workers that handle tasks requiring judgment.
 * Each buoy has a role, archetype, input contract, and output contract.
 *
 * Schema structure:
 * - meta: Identity (id, title, type, version)
 * - ai: Role and autonomy (role, archetype, sub_archetype, autonomy)
 * - input: What buoy receives (receives[], defaults)
 * - output: What buoy produces (produces[])
 *
 * Schema spec locked 2026-01-04 (Session 9).
 * See .float-workshop/docs/buoys.md for full architecture.
 */
export declare const BuoyArchetypeSchema: z.ZodEnum<["generator", "validator", "fixer", "mapper", "integrator", "orchestrator", "recorder"]>;
export type BuoyArchetype = z.infer<typeof BuoyArchetypeSchema>;
export declare const ContextDepthSchema: z.ZodEnum<["none", "self_only", "parent_only", "scope_chain", "full"]>;
export type ContextDepth = z.infer<typeof ContextDepthSchema>;
export declare const BuoyTypeSchema: z.ZodEnum<["ai"]>;
export type BuoyType = z.infer<typeof BuoyTypeSchema>;
export declare const BuoyMetaSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    type: z.ZodEnum<["ai"]>;
    version: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    title: string;
    type: "ai";
    version: string;
}, {
    id: string;
    title: string;
    type: "ai";
    version: string;
}>;
export type BuoyMeta = z.infer<typeof BuoyMetaSchema>;
export declare const BuoyAISchema: z.ZodObject<{
    role: z.ZodString;
    archetype: z.ZodEnum<["generator", "validator", "fixer", "mapper", "integrator", "orchestrator", "recorder"]>;
    sub_archetype: z.ZodNullable<z.ZodString>;
    autonomy: z.ZodString;
}, "strip", z.ZodTypeAny, {
    role: string;
    archetype: "generator" | "validator" | "fixer" | "mapper" | "integrator" | "orchestrator" | "recorder";
    sub_archetype: string | null;
    autonomy: string;
}, {
    role: string;
    archetype: "generator" | "validator" | "fixer" | "mapper" | "integrator" | "orchestrator" | "recorder";
    sub_archetype: string | null;
    autonomy: string;
}>;
export type BuoyAI = z.infer<typeof BuoyAISchema>;
export declare const BuoyInputSchema: z.ZodObject<{
    receives: z.ZodArray<z.ZodString, "many">;
    defaults: z.ZodObject<{
        context_depth: z.ZodEnum<["none", "self_only", "parent_only", "scope_chain", "full"]>;
    }, "strip", z.ZodTypeAny, {
        context_depth: "none" | "self_only" | "parent_only" | "scope_chain" | "full";
    }, {
        context_depth: "none" | "self_only" | "parent_only" | "scope_chain" | "full";
    }>;
}, "strip", z.ZodTypeAny, {
    receives: string[];
    defaults: {
        context_depth: "none" | "self_only" | "parent_only" | "scope_chain" | "full";
    };
}, {
    receives: string[];
    defaults: {
        context_depth: "none" | "self_only" | "parent_only" | "scope_chain" | "full";
    };
}>;
export type BuoyInput = z.infer<typeof BuoyInputSchema>;
export declare const BuoyOutputSchema: z.ZodObject<{
    produces: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    produces: string[];
}, {
    produces: string[];
}>;
export type BuoyOutput = z.infer<typeof BuoyOutputSchema>;
export declare const BuoyJsonSchema: z.ZodObject<{
    meta: z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        type: z.ZodEnum<["ai"]>;
        version: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        title: string;
        type: "ai";
        version: string;
    }, {
        id: string;
        title: string;
        type: "ai";
        version: string;
    }>;
    ai: z.ZodObject<{
        role: z.ZodString;
        archetype: z.ZodEnum<["generator", "validator", "fixer", "mapper", "integrator", "orchestrator", "recorder"]>;
        sub_archetype: z.ZodNullable<z.ZodString>;
        autonomy: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        role: string;
        archetype: "generator" | "validator" | "fixer" | "mapper" | "integrator" | "orchestrator" | "recorder";
        sub_archetype: string | null;
        autonomy: string;
    }, {
        role: string;
        archetype: "generator" | "validator" | "fixer" | "mapper" | "integrator" | "orchestrator" | "recorder";
        sub_archetype: string | null;
        autonomy: string;
    }>;
    input: z.ZodObject<{
        receives: z.ZodArray<z.ZodString, "many">;
        defaults: z.ZodObject<{
            context_depth: z.ZodEnum<["none", "self_only", "parent_only", "scope_chain", "full"]>;
        }, "strip", z.ZodTypeAny, {
            context_depth: "none" | "self_only" | "parent_only" | "scope_chain" | "full";
        }, {
            context_depth: "none" | "self_only" | "parent_only" | "scope_chain" | "full";
        }>;
    }, "strip", z.ZodTypeAny, {
        receives: string[];
        defaults: {
            context_depth: "none" | "self_only" | "parent_only" | "scope_chain" | "full";
        };
    }, {
        receives: string[];
        defaults: {
            context_depth: "none" | "self_only" | "parent_only" | "scope_chain" | "full";
        };
    }>;
    output: z.ZodObject<{
        produces: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        produces: string[];
    }, {
        produces: string[];
    }>;
}, "strip", z.ZodTypeAny, {
    ai: {
        role: string;
        archetype: "generator" | "validator" | "fixer" | "mapper" | "integrator" | "orchestrator" | "recorder";
        sub_archetype: string | null;
        autonomy: string;
    };
    meta: {
        id: string;
        title: string;
        type: "ai";
        version: string;
    };
    input: {
        receives: string[];
        defaults: {
            context_depth: "none" | "self_only" | "parent_only" | "scope_chain" | "full";
        };
    };
    output: {
        produces: string[];
    };
}, {
    ai: {
        role: string;
        archetype: "generator" | "validator" | "fixer" | "mapper" | "integrator" | "orchestrator" | "recorder";
        sub_archetype: string | null;
        autonomy: string;
    };
    meta: {
        id: string;
        title: string;
        type: "ai";
        version: string;
    };
    input: {
        receives: string[];
        defaults: {
            context_depth: "none" | "self_only" | "parent_only" | "scope_chain" | "full";
        };
    };
    output: {
        produces: string[];
    };
}>;
export type BuoyJson = z.infer<typeof BuoyJsonSchema>;
export interface BuoyTemplate {
    json: BuoyJson;
    markdown: string;
    sourcePath: string;
}
export type ParseResult = {
    success: true;
    template: BuoyTemplate;
} | {
    success: false;
    error: string;
};
export interface DispatchOptions {
    template: BuoyTemplate;
    data: Record<string, unknown>;
    contextDepth?: ContextDepth;
    message?: string;
}
export interface BuiltPrompt {
    systemPrompt: string;
    userMessage: string;
    meta: {
        buoyId: string;
        archetype: BuoyArchetype;
        receives: string[];
        produces: string[];
    };
}
export interface OutputValidation {
    valid: boolean;
    missing: string[];
}
//# sourceMappingURL=schema.d.ts.map