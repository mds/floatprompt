/**
 * Config File Loading
 *
 * Loads floatprompt.config.js from the working directory.
 */
import type { FloatPromptConfig } from '../types.js';
/**
 * Load configuration from file
 *
 * @param cwd - Working directory to search
 * @returns Config object or null if not found
 */
export declare function loadConfig(cwd: string): Promise<FloatPromptConfig | null>;
/**
 * Merge CLI options with config file
 *
 * CLI options take precedence over config file.
 */
export declare function mergeConfig(cliOptions: Partial<FloatPromptConfig>, fileConfig: FloatPromptConfig | null): FloatPromptConfig;
/**
 * Validate config object
 */
export declare function validateConfig(config: FloatPromptConfig): string[];
//# sourceMappingURL=config.d.ts.map