/**
 * llms-full.txt Generator
 *
 * Creates a single file containing all markdown content from the site.
 * Allows agents to load complete site context in one request.
 */
import type { PageInfo } from '../types.js';
export interface LlmsFullTxtOptions {
    /** Site title */
    siteTitle?: string;
    /** Site description */
    siteDescription?: string;
    /** Include frontmatter from individual pages */
    includeFrontmatter?: boolean;
}
/**
 * Generate llms-full.txt content
 *
 * Concatenates all page markdown with separators.
 */
export declare function generateLlmsFullTxt(pages: PageInfo[], options?: LlmsFullTxtOptions): string;
//# sourceMappingURL=llms-full.d.ts.map