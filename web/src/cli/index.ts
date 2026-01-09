#!/usr/bin/env node
/**
 * FloatPrompt CLI
 *
 * Usage:
 *   npx floatprompt generate ./dist
 *   npx floatprompt generate ./dist --output ./public
 *   npx floatprompt generate ./dist --exclude "/admin/**"
 */

import { resolve } from 'node:path';
import { access } from 'node:fs/promises';
import { FloatPrompt } from '../index.js';
import { loadConfig, mergeConfig, validateConfig } from './config.js';
import type { GenerateOptions } from '../types.js';

const VERSION = '0.1.0';

interface CliFlags {
  output?: string;
  exclude?: string[];
  noLlmsTxt?: boolean;
  noDashboard?: boolean;
  baseUrl?: string;
  siteTitle?: string;
  verbose?: boolean;
  help?: boolean;
  version?: boolean;
}

function printHelp(): void {
  console.log(`
floatprompt — Generate clean markdown files alongside HTML pages

USAGE
  floatprompt generate <dir>    Process HTML files in directory
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
  floatprompt generate ./dist
  floatprompt generate ./dist --output ./public
  floatprompt generate ./dist --exclude "/admin/**" --exclude "/api/**"
  floatprompt generate ./dist --no-dashboard

CONFIG FILE
  Create floatprompt.config.js in your project root:

    export default {
      input: './dist',
      exclude: ['/admin/**'],
      baseUrl: 'https://example.com',
    };
`);
}

function parseArgs(args: string[]): { command?: string; inputDir?: string; flags: CliFlags } {
  const flags: CliFlags = {
    exclude: [],
  };
  let command: string | undefined;
  let inputDir: string | undefined;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--help' || arg === '-h') {
      flags.help = true;
    } else if (arg === '--version' || arg === '-v') {
      flags.version = true;
    } else if (arg === '--verbose') {
      flags.verbose = true;
    } else if (arg === '--output' || arg === '-o') {
      flags.output = args[++i];
    } else if (arg === '--exclude' || arg === '-e') {
      flags.exclude!.push(args[++i]);
    } else if (arg === '--no-llms-txt') {
      flags.noLlmsTxt = true;
    } else if (arg === '--no-dashboard') {
      flags.noDashboard = true;
    } else if (arg === '--base-url') {
      flags.baseUrl = args[++i];
    } else if (arg === '--site-title') {
      flags.siteTitle = args[++i];
    } else if (!arg.startsWith('-')) {
      if (!command) {
        command = arg;
      } else if (!inputDir) {
        inputDir = arg;
      }
    }
  }

  return { command, inputDir, flags };
}

async function run(): Promise<void> {
  const args = process.argv.slice(2);
  const { command, inputDir, flags } = parseArgs(args);

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

  // Require generate command
  if (command !== 'generate') {
    if (command) {
      console.error(`Unknown command: ${command}`);
    } else {
      console.error('No command specified');
    }
    console.error('Run "floatprompt --help" for usage');
    process.exit(1);
  }

  // Load config file
  const cwd = process.cwd();
  let fileConfig;
  try {
    fileConfig = await loadConfig(cwd);
    if (fileConfig && flags.verbose) {
      console.log('Loaded config from floatprompt.config.js');
    }
  } catch (error) {
    console.error(`Error loading config: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }

  // Merge CLI flags with config
  const cliConfig = {
    input: inputDir,
    output: flags.output,
    exclude: flags.exclude?.length ? flags.exclude : undefined,
    llmsTxt: flags.noLlmsTxt ? false : undefined,
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

  // Require input directory
  if (!config.input) {
    console.error('No input directory specified');
    console.error('Usage: floatprompt generate <dir>');
    process.exit(1);
  }

  // Resolve paths
  const input = resolve(cwd, config.input);
  const output = config.output ? resolve(cwd, config.output) : input;

  // Check input exists
  try {
    await access(input);
  } catch {
    console.error(`Directory not found: ${config.input}`);
    process.exit(1);
  }

  // Run generation
  console.log(`Processing ${config.input}...`);

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
    } as GenerateOptions);

    const duration = Date.now() - startTime;

    // Print summary
    if (result.pagesProcessed === 0) {
      console.log('No HTML files found');
    } else {
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
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
