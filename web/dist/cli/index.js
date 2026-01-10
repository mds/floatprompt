#!/usr/bin/env node
/**
 * FloatPrompt CLI
 *
 * Usage:
 *   floatprompt              # auto-detects output directory
 *   floatprompt ./out        # explicit path
 *   floatprompt --exclude "/admin/**"
 */
import { resolve } from 'node:path';
import { access } from 'node:fs/promises';
import { FloatPrompt } from '../index.js';
import { loadConfig, mergeConfig, validateConfig } from './config.js';
const VERSION = '0.1.0';
/** Common output directories in priority order */
const OUTPUT_DIR_CANDIDATES = [
    './out', // Next.js
    './dist', // Vite, Astro
    './build', // Create React App
    './_site', // Eleventy, Jekyll
    './public', // Hugo, Gatsby
];
function printHelp() {
    console.log(`
floatprompt — Floats your content for AI

USAGE
  floatprompt                   Auto-detect output directory and process
  floatprompt <dir>             Process HTML files in directory
  floatprompt --help            Show this help
  floatprompt --version         Show version

OPTIONS
  --output <dir>       Output directory (default: same as input)
  --exclude <glob>     Glob pattern to exclude (can be used multiple times)
  --no-llms-txt        Skip llms.txt and llms-full.txt generation
  --no-dashboard       Skip /float/ dashboard generation
  --base-url <url>     Base URL for the site
  --site-title <title> Site title (extracted from index.html if not set)
  --verbose            Show detailed output

EXAMPLES
  floatprompt
  floatprompt ./out
  floatprompt ./dist --exclude "/admin/**" --exclude "/api/**"
  floatprompt --no-dashboard

CONFIG FILE
  Create floatprompt.config.js in your project root:

    export default {
      exclude: ['/admin/**'],
      baseUrl: 'https://example.com',
    };
`);
}
/**
 * Auto-detect output directory by checking common locations
 */
async function detectOutputDir() {
    for (const dir of OUTPUT_DIR_CANDIDATES) {
        try {
            await access(resolve(process.cwd(), dir));
            return dir;
        }
        catch {
            // Directory doesn't exist, try next
        }
    }
    return null;
}
function parseArgs(args) {
    const flags = {
        exclude: [],
    };
    let inputDir;
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (arg === '--help' || arg === '-h') {
            flags.help = true;
        }
        else if (arg === '--version' || arg === '-v') {
            flags.version = true;
        }
        else if (arg === '--verbose') {
            flags.verbose = true;
        }
        else if (arg === '--output' || arg === '-o') {
            flags.output = args[++i];
        }
        else if (arg === '--exclude' || arg === '-e') {
            flags.exclude.push(args[++i]);
        }
        else if (arg === '--no-llms-txt') {
            flags.noLlmsTxt = true;
        }
        else if (arg === '--no-dashboard') {
            flags.noDashboard = true;
        }
        else if (arg === '--base-url') {
            flags.baseUrl = args[++i];
        }
        else if (arg === '--site-title') {
            flags.siteTitle = args[++i];
        }
        else if (!arg.startsWith('-')) {
            // First non-flag argument is the input directory
            // Skip 'generate' for backwards compatibility
            if (arg !== 'generate') {
                inputDir = arg;
            }
        }
    }
    return { inputDir, flags };
}
async function run() {
    const args = process.argv.slice(2);
    const { inputDir, flags } = parseArgs(args);
    // Handle --help
    if (flags.help) {
        printHelp();
        process.exit(0);
    }
    // Handle --version
    if (flags.version) {
        console.log(`floatprompt v${VERSION}`);
        process.exit(0);
    }
    // Load config file
    const cwd = process.cwd();
    let fileConfig;
    try {
        fileConfig = await loadConfig(cwd);
        if (fileConfig && flags.verbose) {
            console.log('Loaded config from floatprompt.config.js');
        }
    }
    catch (error) {
        console.error(`Error loading config: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
    }
    // Merge CLI flags with config
    const cliConfig = {
        input: inputDir,
        output: flags.output,
        exclude: flags.exclude?.length ? flags.exclude : undefined,
        llmsTxt: flags.noLlmsTxt ? false : undefined,
        llmsFullTxt: flags.noLlmsTxt ? false : undefined, // --no-llms-txt disables both
        dashboard: flags.noDashboard ? false : undefined,
        baseUrl: flags.baseUrl,
        siteTitle: flags.siteTitle,
    };
    const config = mergeConfig(cliConfig, fileConfig);
    // Validate
    const errors = validateConfig(config);
    if (errors.length > 0) {
        console.error('Invalid configuration:');
        for (const error of errors) {
            console.error(`  - ${error}`);
        }
        process.exit(1);
    }
    // Auto-detect input directory if not specified
    let resolvedInputDir = config.input;
    if (!resolvedInputDir) {
        const detected = await detectOutputDir();
        if (detected) {
            resolvedInputDir = detected;
            if (flags.verbose) {
                console.log(`Auto-detected output directory: ${detected}`);
            }
        }
        else {
            console.error('No output directory found.');
            console.error(`Looked for: ${OUTPUT_DIR_CANDIDATES.join(', ')}`);
            console.error('');
            console.error('Either specify a directory:');
            console.error('  floatprompt ./out');
            console.error('');
            console.error('Or run your build first:');
            console.error('  npm run build');
            process.exit(1);
        }
    }
    // Resolve paths
    const input = resolve(cwd, resolvedInputDir);
    const output = config.output ? resolve(cwd, config.output) : input;
    // Check input exists
    try {
        await access(input);
    }
    catch {
        console.error(`Directory not found: ${resolvedInputDir}`);
        process.exit(1);
    }
    // Run generation
    console.log(`Processing ${resolvedInputDir}...`);
    const startTime = Date.now();
    try {
        const result = await FloatPrompt.generate({
            input,
            output,
            exclude: config.exclude,
            frontmatter: config.frontmatter,
            llmsTxt: config.llmsTxt ?? true,
            llmsFullTxt: config.llmsFullTxt ?? true,
            dashboard: config.dashboard ?? true,
            baseUrl: config.baseUrl || '',
            siteTitle: config.siteTitle,
            siteDescription: config.siteDescription,
        });
        const duration = Date.now() - startTime;
        // Print summary
        if (result.pagesProcessed === 0) {
            console.log('No HTML files found');
        }
        else {
            console.log(`
Done in ${duration}ms

  Pages processed:    ${result.pagesProcessed}
  Markdown files:     ${result.markdownFilesGenerated}
  llms.txt:           ${result.llmsTxtGenerated ? '✓' : '—'}
  llms-full.txt:      ${result.llmsFullTxtGenerated ? '✓' : '—'}
  Dashboard:          ${result.dashboardGenerated ? '✓ /float/' : '—'}
`);
            if (result.errors.length > 0) {
                console.log('Errors:');
                for (const error of result.errors) {
                    console.log(`  ${error.file}: ${error.error}`);
                }
            }
            if (flags.verbose && result.pages.length > 0) {
                console.log('Pages:');
                for (const page of result.pages) {
                    console.log(`  ${page.url} → ${page.title}`);
                }
            }
        }
    }
    catch (error) {
        console.error(`Error: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
    }
}
run().catch((error) => {
    console.error(error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map