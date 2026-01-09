/**
 * Astro Integration
 *
 * Automatically runs FloatPrompt after Astro build.
 *
 * @example
 * ```javascript
 * // astro.config.mjs
 * import floatprompt from 'floatprompt/astro';
 *
 * export default {
 *   integrations: [floatprompt()],
 * };
 * ```
 */

import { FloatPrompt } from '../index.js';
import type { FloatPromptConfig } from '../types.js';

interface AstroIntegration {
  name: string;
  hooks: {
    'astro:build:done'?: (options: { dir: URL }) => Promise<void>;
  };
}

interface FloatPromptAstroOptions extends Partial<FloatPromptConfig> {
  /** Disable FloatPrompt (useful for dev) */
  disabled?: boolean;
}

/**
 * Astro integration for FloatPrompt
 *
 * @param options - FloatPrompt configuration options
 * @returns Astro integration object
 */
export function floatprompt(
  options: FloatPromptAstroOptions = {}
): AstroIntegration {
  return {
    name: 'floatprompt',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        if (options.disabled) {
          console.log('FloatPrompt: Disabled, skipping');
          return;
        }

        // Convert URL to path
        const outputDir = dir.pathname;

        console.log(`FloatPrompt: Processing ${outputDir}...`);

        const result = await FloatPrompt.generate({
          input: outputDir,
          output: options.output || outputDir,
          exclude: options.exclude,
          frontmatter: options.frontmatter,
          llmsTxt: options.llmsTxt ?? true,
          llmsFullTxt: options.llmsFullTxt ?? true,
          dashboard: options.dashboard ?? true,
          baseUrl: options.baseUrl || '',
          siteTitle: options.siteTitle,
          siteDescription: options.siteDescription,
        });

        console.log(
          `FloatPrompt: Generated ${result.markdownFilesGenerated} markdown files`
        );

        if (result.llmsTxtGenerated) {
          console.log('FloatPrompt: Created llms.txt');
        }

        if (result.dashboardGenerated) {
          console.log('FloatPrompt: Created /float/ dashboard');
        }

        if (result.errors.length > 0) {
          console.log('FloatPrompt: Errors:');
          for (const error of result.errors) {
            console.log(`  ${error.file}: ${error.error}`);
          }
        }
      },
    },
  };
}

// Default export
export default floatprompt;
