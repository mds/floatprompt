/**
 * Core Pipeline
 *
 * DOMPurify → Readability → Turndown → Frontmatter
 *
 * The complete extraction chain that transforms HTML into clean markdown.
 */

import { parseHTML } from 'linkedom';
import { sanitize } from './sanitize.js';
import { extractContent, extractJsonLd, extractMetadata } from './extract.js';
import { toMarkdown } from './convert.js';
import { generateFrontmatter, withFrontmatter } from './frontmatter.js';
import type { ExtractOptions, ExtractResult } from '../types.js';

/**
 * Pre-extract h1 and intro paragraph before Readability processing
 *
 * Readability often strips h1 elements that are inside <section> or <header>
 * elements (common in hero/header components). This function extracts them
 * before Readability runs so we can prepend them to the output.
 */
function preExtractHeroContent(html: string): { preExtractedH1: string | null; preExtractedIntro: string | null } {
  try {
    const dom = parseHTML(html);
    const h1Element = dom.document.querySelector('h1');

    if (!h1Element) {
      return { preExtractedH1: null, preExtractedIntro: null };
    }

    const h1Text = h1Element.textContent?.trim() || null;

    // Look for intro paragraph - first <p> that's a sibling or near-sibling of h1
    let introText: string | null = null;
    const h1Parent = h1Element.parentElement;

    if (h1Parent) {
      // Check for <p> sibling
      const siblingP = h1Parent.querySelector('p');
      if (siblingP) {
        introText = siblingP.textContent?.trim() || null;
      }
    }

    return { preExtractedH1: h1Text, preExtractedIntro: introText };
  } catch {
    return { preExtractedH1: null, preExtractedIntro: null };
  }
}

/**
 * Process HTML through the complete pipeline
 *
 * @param html - Raw HTML string
 * @param options - Extraction options
 * @returns Extracted markdown with frontmatter
 */
export function processPipeline(
  html: string,
  options: ExtractOptions = {}
): ExtractResult | null {
  const { url = '/', title: providedTitle, baseUrl, includeSchema = true } = options;

  // 1. Extract JSON-LD before sanitization (scripts get removed)
  const jsonLdSchemas = extractJsonLd(html);
  const schema = jsonLdSchemas[0] || undefined;

  // 2. Extract metadata before sanitization
  const metadata = extractMetadata(html);

  // 3. Sanitize HTML (remove XSS vectors, dangerous content)
  const sanitizedHtml = sanitize(html);

  // 3.5. Pre-extract h1 and intro before Readability (which often strips them)
  // Readability classifies <section> content as navigation/header, losing the h1
  const { preExtractedH1, preExtractedIntro } = preExtractHeroContent(sanitizedHtml);

  // 4. Extract main content using Readability
  const fullUrl = baseUrl ? new URL(url, baseUrl).toString() : url;
  const extracted = extractContent(sanitizedHtml, fullUrl);

  if (!extracted || !extracted.content) {
    return null;
  }

  // 5. Convert to Markdown
  let markdownContent = toMarkdown(extracted.content);

  if (!markdownContent || markdownContent.trim() === '') {
    return null;
  }

  // 5.5. Prepend pre-extracted h1 and intro if not already in content
  // This recovers content that Readability stripped from <section> elements
  if (preExtractedH1 && !markdownContent.trimStart().startsWith('# ')) {
    const intro = preExtractedIntro ? `\n\n${preExtractedIntro}` : '';
    markdownContent = `# ${preExtractedH1}${intro}\n\n${markdownContent}`;
  }

  // 6. Determine title (priority: provided > readability > og:title > <title>)
  const title =
    providedTitle ||
    extracted.title ||
    metadata.ogTitle ||
    metadata.title ||
    'Untitled';

  // 7. Determine description
  const description =
    extracted.excerpt ||
    metadata.ogDescription ||
    metadata.description ||
    undefined;

  // 8. Generate frontmatter
  const frontmatter = generateFrontmatter(
    {
      title,
      url,
      source: baseUrl ? new URL(url, baseUrl).toString() : undefined,
      generated: new Date().toISOString(),
      description,
      schema,
    },
    includeSchema
  );

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
export function extractOnly(html: string): string | null {
  const sanitizedHtml = sanitize(html);
  const extracted = extractContent(sanitizedHtml);

  if (!extracted || !extracted.content) {
    return null;
  }

  return toMarkdown(extracted.content);
}
