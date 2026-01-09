/**
 * Config File Loading
 *
 * Loads floatprompt.config.js from the working directory.
 */

import { readFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import type { FloatPromptConfig } from '../types.js';

const CONFIG_FILENAMES = [
  'floatprompt.config.js',
  'floatprompt.config.mjs',
  'floatprompt.config.cjs',
];

/**
 * Load configuration from file
 *
 * @param cwd - Working directory to search
 * @returns Config object or null if not found
 */
export async function loadConfig(cwd: string): Promise<FloatPromptConfig | null> {
  for (const filename of CONFIG_FILENAMES) {
    const configPath = join(cwd, filename);

    try {
      await access(configPath);
    } catch {
      continue;
    }

    try {
      // Use dynamic import for ES modules
      const configUrl = pathToFileURL(configPath).href;
      const module = await import(configUrl);

      return module.default || module;
    } catch (error) {
      throw new Error(
        `Failed to load config from ${filename}: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  return null;
}

/**
 * Merge CLI options with config file
 *
 * CLI options take precedence over config file.
 */
export function mergeConfig(
  cliOptions: Partial<FloatPromptConfig>,
  fileConfig: FloatPromptConfig | null
): FloatPromptConfig {
  if (!fileConfig) {
    return cliOptions as FloatPromptConfig;
  }

  return {
    ...fileConfig,
    ...cliOptions,
    // Deep merge frontmatter
    frontmatter: {
      ...fileConfig.frontmatter,
      ...cliOptions.frontmatter,
    },
  };
}

/**
 * Validate config object
 */
export function validateConfig(config: FloatPromptConfig): string[] {
  const errors: string[] = [];

  if (config.input && typeof config.input !== 'string') {
    errors.push('input must be a string');
  }

  if (config.output && typeof config.output !== 'string') {
    errors.push('output must be a string');
  }

  if (config.include && !Array.isArray(config.include)) {
    errors.push('include must be an array of strings');
  }

  if (config.exclude && !Array.isArray(config.exclude)) {
    errors.push('exclude must be an array of strings');
  }

  if (config.baseUrl && typeof config.baseUrl !== 'string') {
    errors.push('baseUrl must be a string');
  }

  return errors;
}
