/**
 * HTML to Markdown Conversion using Turndown
 *
 * Converts clean HTML from Readability into well-formatted Markdown.
 */
import TurndownService from 'turndown';
import * as turndownPluginGfm from 'turndown-plugin-gfm';
// Create and configure Turndown instance
const turndownService = new TurndownService({
    headingStyle: 'atx', // Use # style headings
    hr: '---', // Horizontal rule style
    bulletListMarker: '-', // Use - for unordered lists
    codeBlockStyle: 'fenced', // Use ``` for code blocks
    fence: '```', // Fence character
    emDelimiter: '*', // Use * for emphasis
    strongDelimiter: '**', // Use ** for strong
    linkStyle: 'inlined', // Inline links [text](url)
    linkReferenceStyle: 'full', // Full reference style if needed
});
// Add GFM support (tables, strikethrough, task lists)
turndownService.use(turndownPluginGfm.gfm);
// Custom rule: Remove empty links
turndownService.addRule('removeEmptyLinks', {
    filter: (node) => {
        return (node.nodeName === 'A' &&
            (!node.textContent || node.textContent.trim() === ''));
    },
    replacement: () => '',
});
// Custom rule: Clean up images with better alt text handling
turndownService.addRule('cleanImages', {
    filter: 'img',
    replacement: (_content, node) => {
        const img = node;
        const alt = img.getAttribute('alt') || '';
        const src = img.getAttribute('src') || '';
        const title = img.getAttribute('title');
        if (!src)
            return '';
        // Build markdown image
        if (title) {
            return `![${alt}](${src} "${title}")`;
        }
        return `![${alt}](${src})`;
    },
});
// Custom rule: Preserve figure/figcaption
turndownService.addRule('figure', {
    filter: 'figure',
    replacement: (content) => {
        return '\n\n' + content.trim() + '\n\n';
    },
});
turndownService.addRule('figcaption', {
    filter: 'figcaption',
    replacement: (content) => {
        return '*' + content.trim() + '*\n';
    },
});
/**
 * Convert HTML to Markdown
 *
 * @param html - Clean HTML content (from Readability)
 * @returns Markdown string
 */
export function toMarkdown(html) {
    if (!html || html.trim() === '') {
        return '';
    }
    let markdown = turndownService.turndown(html);
    // Clean up excessive whitespace
    markdown = markdown
        // Remove more than 2 consecutive newlines
        .replace(/\n{3,}/g, '\n\n')
        // Remove trailing whitespace on lines
        .replace(/[ \t]+$/gm, '')
        // Ensure single newline at end
        .trim() + '\n';
    return markdown;
}
/**
 * Get the Turndown service instance for custom configuration
 */
export function getTurndownService() {
    return turndownService;
}
//# sourceMappingURL=convert.js.map