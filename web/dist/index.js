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
import { writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { processPipeline } from './core/pipeline.js';
import { findHtmlFiles, htmlToMarkdownPath } from './generate/walker.js';
import { generateLlmsTxt } from './generate/llms-txt.js';
import { generateLlmsFullTxt } from './generate/llms-full.js';
import { generateDashboard } from './generate/dashboard.js';
/**
 * FloatPrompt API
 */
export const FloatPrompt = {
    /**
     * Extract markdown from a single HTML string
     *
     * @param html - HTML content to process
     * @param options - Extraction options
     * @returns Extracted markdown with frontmatter, or null if extraction fails
     */
    extract(html, options = {}) {
        return processPipeline(html, {
            url: options.url || '/',
            title: options.title,
            baseUrl: options.baseUrl,
            includeSchema: options.includeSchema ?? true,
        });
    },
    /**
     * Generate markdown files for an entire directory
     *
     * @param options - Generation options
     * @returns Summary of what was generated
     */
    async generate(options) {
        const { input, output = input, include = ['**/*.html'], exclude = [], frontmatter = { schema: true }, llmsTxt = true, llmsFullTxt = true, dashboard = true, baseUrl = '', siteTitle, siteDescription, } = options;
        const result = {
            pagesProcessed: 0,
            markdownFilesGenerated: 0,
            llmsTxtGenerated: false,
            llmsFullTxtGenerated: false,
            dashboardGenerated: false,
            pages: [],
            errors: [],
        };
        // Find all HTML files
        const htmlFiles = await findHtmlFiles(input, include, exclude);
        if (htmlFiles.length === 0) {
            return result;
        }
        // Process each file
        const pages = [];
        for (const file of htmlFiles) {
            try {
                const extracted = processPipeline(file.content, {
                    url: file.urlPath,
                    baseUrl,
                    includeSchema: frontmatter.schema ?? true,
                });
                if (extracted) {
                    const pageInfo = {
                        url: file.urlPath,
                        filePath: file.relativePath,
                        title: extracted.title,
                        description: extracted.description,
                        markdown: extracted.markdown,
                        schema: extracted.schema,
                    };
                    pages.push(pageInfo);
                    // Write markdown file
                    const mdPath = htmlToMarkdownPath(file.relativePath);
                    const mdFullPath = join(output, mdPath);
                    await mkdir(dirname(mdFullPath), { recursive: true });
                    await writeFile(mdFullPath, extracted.markdown, 'utf-8');
                    result.markdownFilesGenerated++;
                }
                result.pagesProcessed++;
            }
            catch (error) {
                result.errors.push({
                    file: file.relativePath,
                    error: error instanceof Error ? error.message : String(error),
                });
            }
        }
        result.pages = pages;
        // Determine site title from index page if not provided
        const resolvedSiteTitle = siteTitle ||
            pages.find((p) => p.url === '/')?.title ||
            'Website';
        // Generate llms.txt
        if (llmsTxt && pages.length > 0) {
            const llmsTxtContent = generateLlmsTxt(pages, {
                siteTitle: resolvedSiteTitle,
                siteDescription,
                baseUrl,
            });
            await writeFile(join(output, 'llms.txt'), llmsTxtContent, 'utf-8');
            result.llmsTxtGenerated = true;
        }
        // Generate llms-full.txt
        if (llmsFullTxt && pages.length > 0) {
            const llmsFullContent = generateLlmsFullTxt(pages, {
                siteTitle: resolvedSiteTitle,
                siteDescription,
            });
            await writeFile(join(output, 'llms-full.txt'), llmsFullContent, 'utf-8');
            result.llmsFullTxtGenerated = true;
        }
        // Generate dashboard
        if (dashboard && pages.length > 0) {
            const dashboardContent = generateDashboard(pages, {
                siteTitle: resolvedSiteTitle,
                siteDescription,
                baseUrl,
            });
            const floatDir = join(output, 'float');
            await mkdir(floatDir, { recursive: true });
            await writeFile(join(floatDir, 'index.html'), dashboardContent, 'utf-8');
            result.dashboardGenerated = true;
        }
        return result;
    },
};
// Default export
export default FloatPrompt;
//# sourceMappingURL=index.js.map