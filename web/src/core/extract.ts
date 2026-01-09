/**
 * Content Extraction using Mozilla Readability
 *
 * Removes navigation, ads, sidebars, footers and extracts
 * the main article content.
 */

import { Readability } from '@mozilla/readability';
import { parseHTML } from 'linkedom';

export interface ReadabilityResult {
  /** Article title */
  title: string;
  /** Article byline (author) */
  byline: string | null;
  /** Article content as HTML */
  content: string;
  /** Text content without HTML */
  textContent: string;
  /** Short excerpt */
  excerpt: string;
  /** Site name */
  siteName: string | null;
  /** Content length in characters */
  length: number;
}

/**
 * Extract main content from HTML using Readability
 *
 * @param html - Sanitized HTML string
 * @param url - Optional URL for resolving relative links
 * @returns Extracted content or null if extraction fails
 */
export function extractContent(html: string, url?: string): ReadabilityResult | null {
  // Parse HTML into DOM
  const dom = parseHTML(html);

  // Set document URL if provided (helps with relative link resolution)
  if (url) {
    try {
      // Create a base element to help with URL resolution
      const base = dom.document.createElement('base');
      base.href = url;
      dom.document.head?.appendChild(base);
    } catch {
      // Ignore URL setting errors
    }
  }

  // Create Readability instance and parse
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reader = new Readability(dom.document as any, {
    // Keep classes for potential semantic info
    keepClasses: false,
    // Character threshold for content detection
    charThreshold: 100,
  });

  const article = reader.parse();

  if (!article) {
    return null;
  }

  return {
    title: article.title || '',
    byline: article.byline,
    content: article.content || '',
    textContent: article.textContent || '',
    excerpt: article.excerpt || '',
    siteName: article.siteName,
    length: article.length || 0,
  };
}

/**
 * Extract JSON-LD schema from HTML
 *
 * @param html - HTML string (before sanitization, as scripts are removed)
 * @returns Array of JSON-LD objects found
 */
export function extractJsonLd(html: string): Record<string, unknown>[] {
  const schemas: Record<string, unknown>[] = [];

  // Match script tags with type="application/ld+json"
  const jsonLdPattern = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

  let match;
  while ((match = jsonLdPattern.exec(html)) !== null) {
    try {
      const json = JSON.parse(match[1].trim());
      if (Array.isArray(json)) {
        schemas.push(...json);
      } else {
        schemas.push(json);
      }
    } catch {
      // Skip invalid JSON-LD
    }
  }

  return schemas;
}

/**
 * Extract page metadata from HTML
 */
export function extractMetadata(html: string): {
  title: string | null;
  description: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
} {
  const dom = parseHTML(html);
  const document = dom.document;

  // Get title
  const titleEl = document.querySelector('title');
  const title = titleEl?.textContent?.trim() || null;

  // Get meta description
  const descEl = document.querySelector('meta[name="description"]');
  const description = descEl?.getAttribute('content')?.trim() || null;

  // Get Open Graph data
  const ogTitleEl = document.querySelector('meta[property="og:title"]');
  const ogTitle = ogTitleEl?.getAttribute('content')?.trim() || null;

  const ogDescEl = document.querySelector('meta[property="og:description"]');
  const ogDescription = ogDescEl?.getAttribute('content')?.trim() || null;

  return { title, description, ogTitle, ogDescription };
}
