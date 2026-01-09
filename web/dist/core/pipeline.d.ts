/**
 * Core Pipeline
 *
 * DOMPurify → Readability → Turndown → Frontmatter
 *
 * The complete extraction chain that transforms HTML into clean markdown.
 */
import type { ExtractOptions, ExtractResult } from '../types.js';
/**
 * Process HTML through the complete pipeline
 *
 * @param html - Raw HTML string
 * @param options - Extraction options
 * @returns Extracted markdown with frontmatter
 */
export declare function processPipeline(html: string, options?: ExtractOptions): ExtractResult | null;
/**
 * Quick extract without frontmatter (for testing/preview)
 */
export declare function extractOnly(html: string): string | null;
//# sourceMappingURL=pipeline.d.ts.map