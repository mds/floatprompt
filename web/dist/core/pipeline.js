/**
 * Core Pipeline
 *
 * DOMPurify → Readability → Turndown → Frontmatter
 *
 * The complete extraction chain that transforms HTML into clean markdown.
 */
import { sanitize } from './sanitize.js';
import { extractContent, extractJsonLd, extractMetadata } from './extract.js';
import { toMarkdown } from './convert.js';
import { generateFrontmatter, withFrontmatter } from './frontmatter.js';
/**
 * Process HTML through the complete pipeline
 *
 * @param html - Raw HTML string
 * @param options - Extraction options
 * @returns Extracted markdown with frontmatter
 */
export function processPipeline(html, options = {}) {
    const { url = '/', title: providedTitle, baseUrl, includeSchema = true } = options;
    // 1. Extract JSON-LD before sanitization (scripts get removed)
    const jsonLdSchemas = extractJsonLd(html);
    const schema = jsonLdSchemas[0] || undefined;
    // 2. Extract metadata before sanitization
    const metadata = extractMetadata(html);
    // 3. Sanitize HTML (remove XSS vectors, dangerous content)
    const sanitizedHtml = sanitize(html);
    // 4. Extract main content using Readability
    const fullUrl = baseUrl ? new URL(url, baseUrl).toString() : url;
    const extracted = extractContent(sanitizedHtml, fullUrl);
    if (!extracted || !extracted.content) {
        return null;
    }
    // 5. Convert to Markdown
    const markdownContent = toMarkdown(extracted.content);
    if (!markdownContent || markdownContent.trim() === '') {
        return null;
    }
    // 6. Determine title (priority: provided > readability > og:title > <title>)
    const title = providedTitle ||
        extracted.title ||
        metadata.ogTitle ||
        metadata.title ||
        'Untitled';
    // 7. Determine description
    const description = extracted.excerpt ||
        metadata.ogDescription ||
        metadata.description ||
        undefined;
    // 8. Generate frontmatter
    const frontmatter = generateFrontmatter({
        title,
        url,
        source: baseUrl ? new URL(url, baseUrl).toString() : undefined,
        generated: new Date().toISOString(),
        description,
        schema,
    }, includeSchema);
    // 9. Combine frontmatter with content
    const markdown = withFrontmatter(markdownContent, frontmatter);
    return {
        markdown,
        title,
        description,
        schema,
    };
}
/**
 * Quick extract without frontmatter (for testing/preview)
 */
export function extractOnly(html) {
    const sanitizedHtml = sanitize(html);
    const extracted = extractContent(sanitizedHtml);
    if (!extracted || !extracted.content) {
        return null;
    }
    return toMarkdown(extracted.content);
}
//# sourceMappingURL=pipeline.js.map