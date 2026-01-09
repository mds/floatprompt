/**
 * Frontmatter Generation
 *
 * Creates YAML frontmatter for markdown files with metadata
 * and optional JSON-LD schema.
 */

import { stringify as yamlStringify } from 'yaml';

export interface FrontmatterData {
  /** Page title */
  title: string;
  /** URL path */
  url: string;
  /** Source URL (full) */
  source?: string;
  /** Generation timestamp */
  generated: string;
  /** Page description */
  description?: string;
  /** JSON-LD schema (optional) */
  schema?: Record<string, unknown>;
}

/**
 * Generate YAML frontmatter string
 *
 * @param data - Frontmatter data
 * @param includeSchema - Whether to include JSON-LD schema
 * @returns YAML frontmatter string with delimiters
 */
export function generateFrontmatter(
  data: FrontmatterData,
  includeSchema = true
): string {
  const frontmatter: Record<string, unknown> = {
    title: data.title,
    url: data.url,
    generated: data.generated,
  };

  if (data.source) {
    frontmatter.source = data.source;
  }

  if (data.description) {
    frontmatter.description = data.description;
  }

  if (includeSchema && data.schema && Object.keys(data.schema).length > 0) {
    // Simplify schema for frontmatter (extract key fields)
    frontmatter.schema = simplifySchema(data.schema);
  }

  const yaml = yamlStringify(frontmatter, {
    lineWidth: 0,        // Don't wrap lines
    minContentWidth: 0,
    singleQuote: false,
  });

  return `---\n${yaml}---\n`;
}

/**
 * Simplify JSON-LD schema for frontmatter
 * Extracts the most useful fields without verbose nested structures
 */
function simplifySchema(schema: Record<string, unknown>): Record<string, unknown> {
  const simplified: Record<string, unknown> = {};

  // Keep essential fields
  const keepFields = [
    '@type',
    'name',
    'description',
    'author',
    'datePublished',
    'dateModified',
    'headline',
    'image',
    'url',
    'price',
    'priceCurrency',
    'availability',
    'brand',
    'category',
    'rating',
    'aggregateRating',
  ];

  for (const field of keepFields) {
    if (schema[field] !== undefined) {
      const value = schema[field];

      // Simplify nested objects
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        const obj = value as Record<string, unknown>;
        // For author, organization, etc., just keep name
        if (obj.name) {
          simplified[field] = obj.name;
        } else if (obj['@type']) {
          simplified[field] = obj;
        }
      } else {
        simplified[field] = value;
      }
    }
  }

  return simplified;
}

/**
 * Combine frontmatter with markdown content
 */
export function withFrontmatter(markdown: string, frontmatter: string): string {
  return frontmatter + '\n' + markdown;
}

/**
 * Parse frontmatter from markdown
 */
export function parseFrontmatter(markdown: string): {
  frontmatter: Record<string, unknown> | null;
  content: string;
} {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
  const match = markdown.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: null, content: markdown };
  }

  try {
    // Dynamic import yaml for parsing
    const yaml = match[1];
    const lines = yaml.split('\n');
    const result: Record<string, unknown> = {};

    for (const line of lines) {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.slice(0, colonIndex).trim();
        const value = line.slice(colonIndex + 1).trim();
        result[key] = value;
      }
    }

    return {
      frontmatter: result,
      content: markdown.slice(match[0].length),
    };
  } catch {
    return { frontmatter: null, content: markdown };
  }
}
