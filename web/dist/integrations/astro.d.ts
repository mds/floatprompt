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
import type { FloatPromptConfig } from '../types.js';
interface AstroIntegration {
    name: string;
    hooks: {
        'astro:build:done'?: (options: {
            dir: URL;
        }) => Promise<void>;
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
export declare function floatprompt(options?: FloatPromptAstroOptions): AstroIntegration;
export default floatprompt;
//# sourceMappingURL=astro.d.ts.map