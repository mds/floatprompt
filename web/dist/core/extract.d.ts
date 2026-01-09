/**
 * Content Extraction using Mozilla Readability
 *
 * Removes navigation, ads, sidebars, footers and extracts
 * the main article content.
 */
export interface ReadabilityResult {
    /** Article title */
    title: string;
    /** Article byline (author) */
    byline: string | null;
    /** Article content as HTML */
    content: string;
    /** Text content without HTML */
    textContent: string;
    /** Short excerpt */
    excerpt: string;
    /** Site name */
    siteName: string | null;
    /** Content length in characters */
    length: number;
}
/**
 * Extract main content from HTML using Readability
 *
 * @param html - Sanitized HTML string
 * @param url - Optional URL for resolving relative links
 * @returns Extracted content or null if extraction fails
 */
export declare function extractContent(html: string, url?: string): ReadabilityResult | null;
/**
 * Extract JSON-LD schema from HTML
 *
 * @param html - HTML string (before sanitization, as scripts are removed)
 * @returns Array of JSON-LD objects found
 */
export declare function extractJsonLd(html: string): Record<string, unknown>[];
/**
 * Extract page metadata from HTML
 */
export declare function extractMetadata(html: string): {
    title: string | null;
    description: string | null;
    ogTitle: string | null;
    ogDescription: string | null;
};
//# sourceMappingURL=extract.d.ts.map