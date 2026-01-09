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
import type { FloatPromptConfig } from '../types.js';
interface NextConfig {
    output?: 'standalone' | 'export';
    distDir?: string;
    [key: string]: unknown;
}
interface FloatPromptNextOptions extends Partial<FloatPromptConfig> {
    /** Disable FloatPrompt (useful for dev) */
    disabled?: boolean;
}
/**
 * Wrap Next.js config to run FloatPrompt after build
 *
 * @param nextConfig - Your Next.js configuration
 * @param floatPromptOptions - FloatPrompt options
 * @returns Wrapped Next.js configuration
 */
export declare function withFloatPrompt(nextConfig?: NextConfig, floatPromptOptions?: FloatPromptNextOptions): NextConfig;
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
export declare function runFloatPromptNext(options?: FloatPromptNextOptions): Promise<void>;
export default withFloatPrompt;
//# sourceMappingURL=next.d.ts.map