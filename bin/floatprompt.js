#!/usr/bin/env node

import { existsSync, mkdirSync, writeFileSync, readFileSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageRoot = join(__dirname, '..');

// Parse CLI arguments
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`floatprompt - The invisible OS for AI

Usage: npx floatprompt [options]

Options:
  -h, --help     Show this help message
  -v, --version  Show version number

Creates a complete FloatPrompt System in the current directory.
Learn more: https://github.com/mds/floatprompt`);
  process.exit(0);
}

if (args.includes('--version') || args.includes('-v')) {
  const pkg = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8'));
  console.log(pkg.version);
  process.exit(0);
}

// Check if already initialized
const cwd = process.cwd();
const floatDir = join(cwd, '_float');

if (existsSync(floatDir)) {
  console.log(`FloatPrompt System already initialized.
Run /float in Claude Code to boot.`);
  process.exit(0);
}

// Create directory structure
const dirs = [
  '_float',
  '.float/nav',
  '.float/logs',
  '.float/context',
  '.float/tools',
  '.float/core',
  '.claude',
  '.claude/commands'
];

const created = [];

try {
  for (const dir of dirs) {
    const fullPath = join(cwd, dir);
    if (!existsSync(fullPath)) {
      mkdirSync(fullPath, { recursive: true });
    }
  }

  // Copy template files
  const templateSystem = join(packageRoot, 'templates', '_float', 'system.md');
  const templateRoot = join(packageRoot, 'templates', '_float', 'nav', 'root.md');

  copyFileSync(templateSystem, join(cwd, '_float', 'system.md'));
  created.push('.float/system.md');

  copyFileSync(templateRoot, join(cwd, '_float', 'nav', 'root.md'));
  created.push('.float/nav/root.md');

  // Create .gitkeep files for empty directories
  writeFileSync(join(cwd, '_float', 'logs', '.gitkeep'), '');
  created.push('.float/logs/');

  writeFileSync(join(cwd, '_float', 'context', '.gitkeep'), '');
  created.push('.float/context/');

  // Copy tools
  const contextCreator = join(packageRoot, '_float', 'tools', 'context-creator.md');
  copyFileSync(contextCreator, join(cwd, '_float', 'tools', 'context-creator.md'));
  created.push('.float/tools/context-creator.md');

  // Copy core files
  const coreFiles = ['prompt.md', 'doc.md', 'os.md'];
  for (const file of coreFiles) {
    const src = join(packageRoot, 'core', file);
    const dest = join(cwd, '_float', 'core', file);
    copyFileSync(src, dest);
    created.push(`.float/core/${file}`);
  }

  // Copy Claude command
  const floatCommand = join(packageRoot, '.claude', 'commands', 'float.md');
  copyFileSync(floatCommand, join(cwd, '.claude', 'commands', 'float.md'));
  created.push('.claude/commands/float.md');

  // Success output
  console.log(`FloatPrompt System initialized.

Created:
  ${created.join('\n  ')}

Run /float in Claude Code to boot.`);

} catch (error) {
  console.error(`Error: ${error.message}`);
  console.error('Check file permissions and try again.');
  process.exit(1);
}
