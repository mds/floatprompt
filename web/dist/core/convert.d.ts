/**
 * HTML to Markdown Conversion using Turndown
 *
 * Converts clean HTML from Readability into well-formatted Markdown.
 */
import TurndownService from 'turndown';
/**
 * Convert HTML to Markdown
 *
 * @param html - Clean HTML content (from Readability)
 * @returns Markdown string
 */
export declare function toMarkdown(html: string): string;
/**
 * Get the Turndown service instance for custom configuration
 */
export declare function getTurndownService(): TurndownService;
//# sourceMappingURL=convert.d.ts.map