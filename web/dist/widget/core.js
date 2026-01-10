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
export function getMarkdownUrl(url) {
    const path = url || window.location.pathname;
    // Root path
    if (path === '/' || path === '') {
        return '/index.md';
    }
    // Path ending with slash (directory index)
    if (path.endsWith('/')) {
        return `${path}index.md`;
    }
    // Path ending with .html
    if (path.endsWith('.html')) {
        return path.replace(/\.html$/, '.md');
    }
    // Regular path
    return `${path}.md`;
}
/**
 * Fetch the markdown content for the current page
 *
 * @param url - Optional URL path (defaults to current page)
 * @returns The markdown content, or null if not found
 */
export async function getPageMarkdown(url) {
    const mdUrl = getMarkdownUrl(url);
    try {
        const response = await fetch(mdUrl);
        if (!response.ok) {
            console.warn(`FloatPrompt: Markdown not found at ${mdUrl}`);
            return null;
        }
        return await response.text();
    }
    catch (error) {
        console.error('FloatPrompt: Error fetching markdown:', error);
        return null;
    }
}
/**
 * Copy the current page's markdown to the clipboard
 *
 * @param url - Optional URL path (defaults to current page)
 * @returns True if copied successfully, false otherwise
 */
export async function copyPageMarkdown(url) {
    const markdown = await getPageMarkdown(url);
    if (!markdown) {
        return false;
    }
    try {
        await navigator.clipboard.writeText(markdown);
        return true;
    }
    catch (error) {
        console.error('FloatPrompt: Error copying to clipboard:', error);
        // Fallback for older browsers
        try {
            const textarea = document.createElement('textarea');
            textarea.value = markdown;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            return true;
        }
        catch {
            return false;
        }
    }
}
/**
 * Open the markdown file in a new tab
 *
 * @param url - Optional URL path (defaults to current page)
 */
export function viewPageMarkdown(url) {
    const mdUrl = getMarkdownUrl(url);
    window.open(mdUrl, '_blank');
}
//# sourceMappingURL=core.js.map