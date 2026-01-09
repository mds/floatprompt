/**
 * FloatPrompt Types
 */
export interface ExtractOptions {
    /** URL path of the page (e.g., /about) */
    url?: string;
    /** Page title (extracted from HTML if not provided) */
    title?: string;
    /** Base URL for resolving relative links */
    baseUrl?: string;
    /** Include JSON-LD schema in frontmatter */
    includeSchema?: boolean;
}
export interface ExtractResult {
    /** Generated markdown with frontmatter */
    markdown: string;
    /** Extracted page title */
    title: string;
    /** Extracted page description */
    description?: string;
    /** JSON-LD schema if found */
    schema?: Record<string, unknown>;
}
export interface PageInfo {
    /** URL path of the page */
    url: string;
    /** File path relative to input directory */
    filePath: string;
    /** Page title */
    title: string;
    /** Page description */
    description?: string;
    /** Full markdown content */
    markdown: string;
    /** JSON-LD schema if found */
    schema?: Record<string, unknown>;
}
export interface GenerateOptions {
    /** Input directory containing HTML files */
    input: string;
    /** Output directory (defaults to input) */
    output?: string;
    /** Glob patterns to include */
    include?: string[];
    /** Glob patterns to exclude */
    exclude?: string[];
    /** Frontmatter options */
    frontmatter?: {
        /** Include JSON-LD schema (default: true) */
        schema?: boolean;
    };
    /** Generate llms.txt (default: true) */
    llmsTxt?: boolean;
    /** Generate llms-full.txt (default: true) */
    llmsFullTxt?: boolean;
    /** Generate /float/ dashboard (default: true) */
    dashboard?: boolean;
    /** Base URL for the site */
    baseUrl?: string;
    /** Site title (extracted from index.html if not provided) */
    siteTitle?: string;
    /** Site description */
    siteDescription?: string;
}
export interface GenerateResult {
    /** Number of pages processed */
    pagesProcessed: number;
    /** Number of markdown files generated */
    markdownFilesGenerated: number;
    /** Whether llms.txt was generated */
    llmsTxtGenerated: boolean;
    /** Whether llms-full.txt was generated */
    llmsFullTxtGenerated: boolean;
    /** Whether dashboard was generated */
    dashboardGenerated: boolean;
    /** List of processed pages */
    pages: PageInfo[];
    /** Any errors encountered */
    errors: Array<{
        file: string;
        error: string;
    }>;
}
export interface FloatPromptConfig {
    input?: string;
    output?: string;
    include?: string[];
    exclude?: string[];
    frontmatter?: {
        schema?: boolean;
    };
    llmsTxt?: boolean;
    llmsFullTxt?: boolean;
    dashboard?: boolean;
    baseUrl?: string;
    siteTitle?: string;
    siteDescription?: string;
}
//# sourceMappingURL=types.d.ts.map