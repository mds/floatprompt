/**
 * llms.txt Generator
 *
 * Creates the llms.txt index file following the llms.txt specification.
 * https://llmstxt.org/
 */
import type { PageInfo } from '../types.js';
export interface LlmsTxtOptions {
    /** Site title */
    siteTitle?: string;
    /** Site description */
    siteDescription?: string;
    /** Base URL */
    baseUrl?: string;
}
/**
 * Generate llms.txt content
 *
 * Format follows the llms.txt spec:
 * - Title as H1
 * - Description as blockquote
 * - Sections grouping related pages
 * - Links to markdown files
 */
export declare function generateLlmsTxt(pages: PageInfo[], options?: LlmsTxtOptions): string;
//# sourceMappingURL=llms-txt.d.ts.map