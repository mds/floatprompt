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
  -u, --update   Update FloatPrompt System files (keeps nav, logs, context)

Creates a complete FloatPrompt System in the current directory.
Learn more: https://github.com/mds/floatprompt`);
  process.exit(0);
}

if (args.includes('--version') || args.includes('-v')) {
  const pkg = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8'));
  console.log(pkg.version);
  process.exit(0);
}

const cwd = process.cwd();
const floatDir = join(cwd, '.float');

// Handle --update flag
if (args.includes('--update') || args.includes('-u')) {
  if (!existsSync(floatDir)) {
    console.error('Error: No FloatPrompt System found. Run npx floatprompt first to initialize.');
    process.exit(1);
  }

  const pkg = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8'));
  const updated = [];

  try {
    // Ensure directories exist
    const dirs = ['.float/meta/tools', '.float/meta/core', '.claude/commands'];
    for (const dir of dirs) {
      const fullPath = join(cwd, dir);
      if (!existsSync(fullPath)) {
        mkdirSync(fullPath, { recursive: true });
      }
    }

    // Update tools
    const toolFiles = ['float.md', 'float-sync.md', 'float-context.md', 'float-enhance.md', 'float-fix.md'];
    for (const file of toolFiles) {
      const src = join(packageRoot, '.float', 'meta', 'tools', file);
      const dest = join(cwd, '.float', 'meta', 'tools', file);
      copyFileSync(src, dest);
      updated.push(`.float/meta/tools/${file}`);
    }

    // Update core files (source is core/ at package root, dest is .float/meta/core/)
    const coreFiles = ['prompt.md', 'doc.md', 'os.md'];
    for (const file of coreFiles) {
      const src = join(packageRoot, 'core', file);
      const dest = join(cwd, '.float', 'meta', 'core', file);
      copyFileSync(src, dest);
      updated.push(`.float/meta/core/${file}`);
    }

    // Update Claude command
    const floatCommand = join(packageRoot, '.claude', 'commands', 'float.md');
    copyFileSync(floatCommand, join(cwd, '.claude', 'commands', 'float.md'));
    updated.push('.claude/commands/float.md');

    // Update version file
    writeFileSync(join(cwd, '.float', '.version'), pkg.version);

    console.log(`FloatPrompt System updated to v${pkg.version}.

Updated:
  ${updated.join('\n  ')}

Preserved:
  .float/project/nav/*
  .float/project/logs/*
  .float/project/context/*
  .float/system.md

Run /float in Claude Code to boot.`);
    process.exit(0);

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

// Check if already initialized
if (existsSync(floatDir)) {
  const pkg = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8'));
  const versionFile = join(floatDir, '.version');
  const installedVersion = existsSync(versionFile)
    ? readFileSync(versionFile, 'utf8').trim()
    : 'unknown';

  if (installedVersion !== pkg.version && installedVersion !== 'unknown') {
    console.log(`FloatPrompt System initialized (v${installedVersion}).
Latest version: v${pkg.version} available.
Run npx floatprompt --update to upgrade.`);
  } else if (installedVersion === 'unknown') {
    console.log(`FloatPrompt System already initialized.
Run npx floatprompt --update to ensure you have the latest version.`);
  } else {
    console.log(`FloatPrompt System already initialized (v${installedVersion}).
Run /float in Claude Code to boot.`);
  }
  process.exit(0);
}

// Create directory structure
const dirs = [
  '.float',
  '.float/meta',
  '.float/meta/tools',
  '.float/meta/core',
  '.float/project',
  '.float/project/nav',
  '.float/project/logs',
  '.float/project/context',
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
  writeFileSync(join(cwd, '.float', 'project', 'context', 'decisions.md'), decisionsContent);
  created.push('.float/project/context/decisions.md');

  copyFileSync(templateRoot, join(cwd, '.float', 'project', 'nav', 'root.md'));
  created.push('.float/project/nav/root.md');

  // Create .gitkeep files for empty directories
  writeFileSync(join(cwd, '.float', 'project', 'logs', '.gitkeep'), '');
  created.push('.float/project/logs/');

  // Copy tools
  const toolFiles = ['float.md', 'float-sync.md', 'float-context.md', 'float-enhance.md', 'float-fix.md'];
  for (const file of toolFiles) {
    const src = join(packageRoot, '.float', 'meta', 'tools', file);
    const dest = join(cwd, '.float', 'meta', 'tools', file);
    copyFileSync(src, dest);
    created.push(`.float/meta/tools/${file}`);
  }

  // Copy core files (source is core/ at package root, dest is .float/meta/core/)
  const coreFiles = ['prompt.md', 'doc.md', 'os.md'];
  for (const file of coreFiles) {
    const src = join(packageRoot, 'core', file);
    const dest = join(cwd, '.float', 'meta', 'core', file);
    copyFileSync(src, dest);
    created.push(`.float/meta/core/${file}`);
  }

  // Copy Claude command
  const floatCommand = join(packageRoot, '.claude', 'commands', 'float.md');
  copyFileSync(floatCommand, join(cwd, '.claude', 'commands', 'float.md'));
  created.push('.claude/commands/float.md');

  // Write version file
  const pkg = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8'));
  writeFileSync(join(cwd, '.float', '.version'), pkg.version);

  // Success output
  console.log(`FloatPrompt System initialized (v${pkg.version}).

Created:
  ${created.join('\n  ')}

Run /float in Claude Code to boot.`);

} catch (error) {
  console.error(`Error: ${error.message}`);
  console.error('Check file permissions and try again.');
  process.exit(1);
}
