/**
 * Directory Walker
 *
 * Finds all HTML files in a directory for processing.
 */
export interface HtmlFile {
    /** Absolute path to the file */
    absolutePath: string;
    /** Path relative to input directory */
    relativePath: string;
    /** URL path (e.g., /about for about.html) */
    urlPath: string;
    /** HTML content */
    content: string;
}
/**
 * Find all HTML files in a directory
 *
 * @param inputDir - Directory to search
 * @param include - Glob patterns to include
 * @param exclude - Glob patterns to exclude
 * @returns Array of HTML file info
 */
export declare function findHtmlFiles(inputDir: string, include?: string[], exclude?: string[]): Promise<HtmlFile[]>;
/**
 * Convert file path to URL path
 *
 * Examples:
 *   index.html -> /
 *   about.html -> /about
 *   docs/api.html -> /docs/api
 *   docs/index.html -> /docs/
 */
export declare function filePathToUrl(filePath: string): string;
/**
 * Get the markdown file path for an HTML file
 *
 * Examples:
 *   about.html -> about.md
 *   docs/api.html -> docs/api.md
 */
export declare function htmlToMarkdownPath(htmlPath: string): string;
//# sourceMappingURL=walker.d.ts.map