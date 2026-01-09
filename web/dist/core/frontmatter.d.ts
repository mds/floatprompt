/**
 * Frontmatter Generation
 *
 * Creates YAML frontmatter for markdown files with metadata
 * and optional JSON-LD schema.
 */
export interface FrontmatterData {
    /** Page title */
    title: string;
    /** URL path */
    url: string;
    /** Source URL (full) */
    source?: string;
    /** Generation timestamp */
    generated: string;
    /** Page description */
    description?: string;
    /** JSON-LD schema (optional) */
    schema?: Record<string, unknown>;
}
/**
 * Generate YAML frontmatter string
 *
 * @param data - Frontmatter data
 * @param includeSchema - Whether to include JSON-LD schema
 * @returns YAML frontmatter string with delimiters
 */
export declare function generateFrontmatter(data: FrontmatterData, includeSchema?: boolean): string;
/**
 * Combine frontmatter with markdown content
 */
export declare function withFrontmatter(markdown: string, frontmatter: string): string;
/**
 * Parse frontmatter from markdown
 */
export declare function parseFrontmatter(markdown: string): {
    frontmatter: Record<string, unknown> | null;
    content: string;
};
//# sourceMappingURL=frontmatter.d.ts.map