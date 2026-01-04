import { z } from "zod";
/**
 * Deep Context Schema for FloatPrompt
 *
 * Topic-based context storage that spans filesystem locations.
 * Complements folder-based context with concept primers.
 *
 * Spec locked 2026-01-04 — see .float-workshop/docs/deep-context.md
 */
export declare const DeepWatchTypeSchema: z.ZodEnum<["folder", "glob", "logs", "deep"]>;
export type DeepWatchType = z.infer<typeof DeepWatchTypeSchema>;
export declare const DeepWatchSchema: z.ZodObject<{
    type: z.ZodEnum<["folder", "glob", "logs", "deep"]>;
    path: z.ZodOptional<z.ZodString>;
    pattern: z.ZodOptional<z.ZodString>;
    topic_contains: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: "folder" | "glob" | "logs" | "deep";
    path?: string | undefined;
    pattern?: string | undefined;
    topic_contains?: string | undefined;
    slug?: string | undefined;
}, {
    type: "folder" | "glob" | "logs" | "deep";
    path?: string | undefined;
    pattern?: string | undefined;
    topic_contains?: string | undefined;
    slug?: string | undefined;
}>;
export type DeepWatch = z.infer<typeof DeepWatchSchema>;
export declare const DeepStatusSchema: z.ZodEnum<["current", "stale", "generating"]>;
export type DeepStatus = z.infer<typeof DeepStatusSchema>;
export declare const DeepSchema: z.ZodObject<{
    slug: z.ZodString;
    title: z.ZodString;
    content_md: z.ZodString;
    watches: z.ZodNullable<z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<["folder", "glob", "logs", "deep"]>;
        path: z.ZodOptional<z.ZodString>;
        pattern: z.ZodOptional<z.ZodString>;
        topic_contains: z.ZodOptional<z.ZodString>;
        slug: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "folder" | "glob" | "logs" | "deep";
        path?: string | undefined;
        pattern?: string | undefined;
        topic_contains?: string | undefined;
        slug?: string | undefined;
    }, {
        type: "folder" | "glob" | "logs" | "deep";
        path?: string | undefined;
        pattern?: string | undefined;
        topic_contains?: string | undefined;
        slug?: string | undefined;
    }>, "many">>;
    status: z.ZodEnum<["current", "stale", "generating"]>;
    ai_model: z.ZodNullable<z.ZodString>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    status: "current" | "stale" | "generating";
    ai_model: string | null;
    content_md: string;
    created_at: string;
    updated_at: string;
    slug: string;
    watches: {
        type: "folder" | "glob" | "logs" | "deep";
        path?: string | undefined;
        pattern?: string | undefined;
        topic_contains?: string | undefined;
        slug?: string | undefined;
    }[] | null;
}, {
    title: string;
    status: "current" | "stale" | "generating";
    ai_model: string | null;
    content_md: string;
    created_at: string;
    updated_at: string;
    slug: string;
    watches: {
        type: "folder" | "glob" | "logs" | "deep";
        path?: string | undefined;
        pattern?: string | undefined;
        topic_contains?: string | undefined;
        slug?: string | undefined;
    }[] | null;
}>;
export type Deep = z.infer<typeof DeepSchema>;
export declare const DeepHistorySchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodNumber>;
    slug: z.ZodString;
    version: z.ZodNumber;
    title: z.ZodString;
    content_md: z.ZodString;
    watches: z.ZodNullable<z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<["folder", "glob", "logs", "deep"]>;
        path: z.ZodOptional<z.ZodString>;
        pattern: z.ZodOptional<z.ZodString>;
        topic_contains: z.ZodOptional<z.ZodString>;
        slug: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "folder" | "glob" | "logs" | "deep";
        path?: string | undefined;
        pattern?: string | undefined;
        topic_contains?: string | undefined;
        slug?: string | undefined;
    }, {
        type: "folder" | "glob" | "logs" | "deep";
        path?: string | undefined;
        pattern?: string | undefined;
        topic_contains?: string | undefined;
        slug?: string | undefined;
    }>, "many">>;
    ai_model: z.ZodNullable<z.ZodString>;
    created_at: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    ai_model: string | null;
    content_md: string;
    created_at: string;
    version: number;
    slug: string;
    watches: {
        type: "folder" | "glob" | "logs" | "deep";
        path?: string | undefined;
        pattern?: string | undefined;
        topic_contains?: string | undefined;
        slug?: string | undefined;
    }[] | null;
    id?: number | undefined;
}, {
    title: string;
    ai_model: string | null;
    content_md: string;
    created_at: string;
    version: number;
    slug: string;
    watches: {
        type: "folder" | "glob" | "logs" | "deep";
        path?: string | undefined;
        pattern?: string | undefined;
        topic_contains?: string | undefined;
        slug?: string | undefined;
    }[] | null;
    id?: number | undefined;
}>;
export type DeepHistory = z.infer<typeof DeepHistorySchema>;
/**
 * SQL DDL for deep context tables
 */
export declare const CREATE_DEEP_TABLES_SQL = "\n-- Topic-based deep context (concept primers)\nCREATE TABLE IF NOT EXISTS deep (\n  slug        TEXT PRIMARY KEY,\n  title       TEXT NOT NULL,\n  content_md  TEXT NOT NULL,\n  watches     TEXT,\n  status      TEXT NOT NULL DEFAULT 'current'\n              CHECK (status IN ('current', 'stale', 'generating')),\n  ai_model    TEXT,\n  created_at  TEXT NOT NULL,\n  updated_at  TEXT NOT NULL\n);\n\n-- Version history for deep contexts\nCREATE TABLE IF NOT EXISTS deep_history (\n  id          INTEGER PRIMARY KEY AUTOINCREMENT,\n  slug        TEXT NOT NULL,\n  version     INTEGER NOT NULL,\n  title       TEXT NOT NULL,\n  content_md  TEXT NOT NULL,\n  watches     TEXT,\n  ai_model    TEXT,\n  created_at  TEXT NOT NULL,\n  FOREIGN KEY (slug) REFERENCES deep(slug) ON DELETE CASCADE\n);\n\nCREATE INDEX IF NOT EXISTS idx_deep_history_slug ON deep_history(slug);\n";
//# sourceMappingURL=deep-schema.d.ts.map