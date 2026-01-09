/**
 * FloatPrompt for Web
 *
 * Generate clean markdown files alongside HTML pages,
 * making websites AI-readable.
 *
 * @example
 * ```typescript
 * import { FloatPrompt } from 'floatprompt';
 *
 * // Process entire directory
 * await FloatPrompt.generate({
 *   input: './dist',
 *   output: './dist',
 * });
 *
 * // Process single page
 * const markdown = await FloatPrompt.extract(htmlString, {
 *   url: '/about',
 *   title: 'About Us',
 * });
 * ```
 */
import type { ExtractOptions, ExtractResult, GenerateOptions, GenerateResult } from './types.js';
export type { ExtractOptions, ExtractResult, GenerateOptions, GenerateResult, PageInfo, FloatPromptConfig, } from './types.js';
/**
 * FloatPrompt API
 */
export declare const FloatPrompt: {
    /**
     * Extract markdown from a single HTML string
     *
     * @param html - HTML content to process
     * @param options - Extraction options
     * @returns Extracted markdown with frontmatter, or null if extraction fails
     */
    extract(html: string, options?: ExtractOptions): ExtractResult | null;
    /**
     * Generate markdown files for an entire directory
     *
     * @param options - Generation options
     * @returns Summary of what was generated
     */
    generate(options: GenerateOptions): Promise<GenerateResult>;
};
export default FloatPrompt;
//# sourceMappingURL=index.d.ts.map