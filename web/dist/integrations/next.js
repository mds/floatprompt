/**
 * Next.js Integration
 *
 * Wraps next.config.js to automatically run FloatPrompt after build.
 *
 * @example
 * ```javascript
 * // next.config.js
 * const withFloatPrompt = require('floatprompt/next');
 *
 * module.exports = withFloatPrompt({
 *   // your Next.js config
 * });
 * ```
 */
import { FloatPrompt } from '../index.js';
/**
 * Wrap Next.js config to run FloatPrompt after build
 *
 * @param nextConfig - Your Next.js configuration
 * @param floatPromptOptions - FloatPrompt options
 * @returns Wrapped Next.js configuration
 */
export function withFloatPrompt(nextConfig = {}, floatPromptOptions = {}) {
    return {
        ...nextConfig,
        // Note: Next.js doesn't have a direct post-build hook in config.
        // The recommended approach is to use a custom build script or
        // the postbuild npm script. This wrapper is for documentation
        // and to prepare for potential future Next.js plugin APIs.
        //
        // For now, users should use:
        // "build": "next build && npx floatprompt generate ./out"
        //
        // Or with static export:
        // "build": "next build && next export && npx floatprompt generate ./out"
    };
}
/**
 * Run FloatPrompt on Next.js output directory
 *
 * Call this from a postbuild script:
 *
 * @example
 * ```javascript
 * // scripts/postbuild.mjs
 * import { runFloatPromptNext } from 'floatprompt/next';
 * await runFloatPromptNext();
 * ```
 */
export async function runFloatPromptNext(options = {}) {
    if (options.disabled) {
        console.log('FloatPrompt: Disabled, skipping');
        return;
    }
    // Default to Next.js static export directory
    const input = options.input || './out';
    const output = options.output || input;
    console.log(`FloatPrompt: Processing ${input}...`);
    const result = await FloatPrompt.generate({
        input,
        output,
        exclude: options.exclude,
        frontmatter: options.frontmatter,
        llmsTxt: options.llmsTxt ?? true,
        llmsFullTxt: options.llmsFullTxt ?? true,
        dashboard: options.dashboard ?? true,
        baseUrl: options.baseUrl || '',
        siteTitle: options.siteTitle,
        siteDescription: options.siteDescription,
    });
    console.log(`FloatPrompt: Generated ${result.markdownFilesGenerated} markdown files`);
    if (result.errors.length > 0) {
        console.log('FloatPrompt: Errors:');
        for (const error of result.errors) {
            console.log(`  ${error.file}: ${error.error}`);
        }
    }
}
// Default export for require()
export default withFloatPrompt;
//# sourceMappingURL=next.js.map