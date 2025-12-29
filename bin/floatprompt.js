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
const floatDir = join(cwd, '.float');

if (existsSync(floatDir)) {
  console.log(`FloatPrompt System already initialized.
Run /float in Claude Code to boot.`);
  process.exit(0);
}

// Create directory structure
const dirs = [
  '.float',
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
  const templateSystem = join(packageRoot, 'templates', '.float', 'system.md');
  const templateRoot = join(packageRoot, 'templates', '.float', 'nav', 'root.md');

  copyFileSync(templateSystem, join(cwd, '.float', 'system.md'));
  created.push('.float/system.md');

  // Create empty decisions.md in context/
  const decisionsContent = `---
title: Decision History
type: decisions
ai_updated: ${new Date().toISOString().split('T')[0]}
---

# Decision History

Captured rationale for project decisions. AI appends entries during context building.

## Format

\`\`\`
### [Topic]
**Question:** Why [observed choice]?
**Answer:** [human's response]
**Date:** YYYY-MM-DD
\`\`\`

---

<!-- Entries below -->
`;
  writeFileSync(join(cwd, '.float', 'context', 'decisions.md'), decisionsContent);
  created.push('.float/context/decisions.md');

  copyFileSync(templateRoot, join(cwd, '.float', 'nav', 'root.md'));
  created.push('.float/nav/root.md');

  // Create .gitkeep files for empty directories
  writeFileSync(join(cwd, '.float', 'logs', '.gitkeep'), '');
  created.push('.float/logs/');

  writeFileSync(join(cwd, '.float', 'context', '.gitkeep'), '');
  created.push('.float/context/');

  // Copy tools
  const contextCreator = join(packageRoot, '.float', 'tools', 'context-creator.md');
  copyFileSync(contextCreator, join(cwd, '.float', 'tools', 'context-creator.md'));
  created.push('.float/tools/context-creator.md');

  // Copy core files
  const coreFiles = ['prompt.md', 'doc.md', 'os.md'];
  for (const file of coreFiles) {
    const src = join(packageRoot, 'core', file);
    const dest = join(cwd, '.float', 'core', file);
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
