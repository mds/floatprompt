/**
 * Directory Walker
 *
 * Finds all HTML files in a directory for processing.
 */

import { glob } from 'glob';
import { readFile } from 'node:fs/promises';
import { join, relative, dirname, basename, extname } from 'node:path';

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
export async function findHtmlFiles(
  inputDir: string,
  include: string[] = ['**/*.html'],
  exclude: string[] = []
): Promise<HtmlFile[]> {
  const files: HtmlFile[] = [];

  // Find all matching files
  for (const pattern of include) {
    const matches = await glob(pattern, {
      cwd: inputDir,
      ignore: [
        ...exclude,
        '**/node_modules/**',
        '**/float/**', // Don't process our own output
      ],
      nodir: true,
      absolute: false,
    });

    for (const relativePath of matches) {
      const absolutePath = join(inputDir, relativePath);

      // Read file content
      let content: string;
      try {
        content = await readFile(absolutePath, 'utf-8');
      } catch {
        // Skip files we can't read
        continue;
      }

      // Generate URL path
      const urlPath = filePathToUrl(relativePath);

      files.push({
        absolutePath,
        relativePath,
        urlPath,
        content,
      });
    }
  }

  // Deduplicate by absolute path
  const seen = new Set<string>();
  return files.filter((file) => {
    if (seen.has(file.absolutePath)) {
      return false;
    }
    seen.add(file.absolutePath);
    return true;
  });
}

/**
 * Convert file path to URL path
 *
 * Examples:
 *   index.html -> /
 *   about.html -> /about
 *   docs/api.html -> /docs/api
 *   docs/index.html -> /docs/
 */
export function filePathToUrl(filePath: string): string {
  // Normalize path separators
  const normalized = filePath.replace(/\\/g, '/');

  // Remove .html extension
  const withoutExt = normalized.replace(/\.html$/i, '');

  // Handle index files
  if (withoutExt === 'index') {
    return '/';
  }

  if (withoutExt.endsWith('/index')) {
    return '/' + withoutExt.slice(0, -6) + '/';
  }

  return '/' + withoutExt;
}

/**
 * Get the markdown file path for an HTML file
 *
 * Examples:
 *   about.html -> about.md
 *   docs/api.html -> docs/api.md
 */
export function htmlToMarkdownPath(htmlPath: string): string {
  const dir = dirname(htmlPath);
  const name = basename(htmlPath, extname(htmlPath));
  const mdName = name + '.md';

  if (dir === '.') {
    return mdName;
  }

  return join(dir, mdName);
}
