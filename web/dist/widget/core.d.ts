/**
 * FloatPrompt Widget Core Functions
 *
 * These functions work in the browser to fetch and copy
 * the markdown version of the current page.
 */
/**
 * Get the markdown URL for the current page
 *
 * Examples:
 *   /about → /about.md
 *   /docs/api → /docs/api.md
 *   / → /index.md
 *   /blog/ → /blog/index.md
 */
export declare function getMarkdownUrl(url?: string): string;
/**
 * Fetch the markdown content for the current page
 *
 * @param url - Optional URL path (defaults to current page)
 * @returns The markdown content, or null if not found
 */
export declare function getPageMarkdown(url?: string): Promise<string | null>;
/**
 * Copy the current page's markdown to the clipboard
 *
 * @param url - Optional URL path (defaults to current page)
 * @returns True if copied successfully, false otherwise
 */
export declare function copyPageMarkdown(url?: string): Promise<boolean>;
/**
 * Open the markdown file in a new tab
 *
 * @param url - Optional URL path (defaults to current page)
 */
export declare function viewPageMarkdown(url?: string): void;
//# sourceMappingURL=core.d.ts.map