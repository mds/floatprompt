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
    const dirs = ['.float/core/tools', '.float/core/format', '.float/core/tools/types', '.claude/commands'];
    for (const dir of dirs) {
      const fullPath = join(cwd, dir);
      if (!existsSync(fullPath)) {
        mkdirSync(fullPath, { recursive: true });
      }
    }

    // Update tools (source: system/claude/tools/)
    const toolFiles = ['float.md', 'float-sync.md', 'float-context.md', 'float-enhance.md', 'float-fix.md', 'float-build.md', 'float-harvest.md', 'float-delta.md', 'float-focus.md', 'float-relate.md'];
    for (const file of toolFiles) {
      const src = join(packageRoot, 'system', 'claude', 'tools', file);
      const dest = join(cwd, '.float', 'core', 'tools', file);
      copyFileSync(src, dest);
      updated.push(`.float/core/tools/${file}`);
    }

    // Update type templates (source: system/claude/tools/types/)
    const typeFiles = ['pipeline.md', 'scorer.md', 'extractor.md', 'reconciler.md', 'processor.md', 'reference.md'];
    for (const file of typeFiles) {
      const src = join(packageRoot, 'system', 'claude', 'tools', 'types', file);
      const dest = join(cwd, '.float', 'core', 'tools', 'types', file);
      copyFileSync(src, dest);
      updated.push(`.float/core/tools/types/${file}`);
    }

    // Update manual (source: system/manual.md)
    const manualSrc = join(packageRoot, 'system', 'manual.md');
    copyFileSync(manualSrc, join(cwd, '.float', 'core', 'manual.md'));
    updated.push('.float/core/manual.md');

    // Update format core files (source is format/core/ at package root)
    const formatCoreFiles = ['template.md', 'doc.md', 'os.md'];
    for (const file of formatCoreFiles) {
      const src = join(packageRoot, 'format', 'core', file);
      const dest = join(cwd, '.float', 'core', 'format', file);
      copyFileSync(src, dest);
      updated.push(`.float/core/format/${file}`);
    }

    // Update format tool files (source is format/tools/ at package root)
    const formatToolFiles = ['update.md'];
    for (const file of formatToolFiles) {
      const src = join(packageRoot, 'format', 'tools', file);
      const dest = join(cwd, '.float', 'core', 'format', file);
      copyFileSync(src, dest);
      updated.push(`.float/core/format/${file}`);
    }

    // Update index.md (structural reference)
    const indexSrc = join(packageRoot, 'templates', '.float', 'core', 'index.md');
    copyFileSync(indexSrc, join(cwd, '.float', 'core', 'index.md'));
    updated.push('.float/core/index.md');

    // Update project.md (structural reference)
    const projectSrc = join(packageRoot, 'templates', '.float', 'project', 'project.md');
    copyFileSync(projectSrc, join(cwd, '.float', 'project', 'project.md'));
    updated.push('.float/project/project.md');

    // Update Claude commands
    const commandFiles = ['float.md', 'float-sync.md', 'float-fix.md', 'float-context.md', 'float-enhance.md', 'float-build.md', 'float-harvest.md', 'float-delta.md', 'float-focus.md', 'float-relate.md'];
    for (const file of commandFiles) {
      const src = join(packageRoot, '.claude', 'commands', file);
      const dest = join(cwd, '.claude', 'commands', file);
      copyFileSync(src, dest);
      updated.push(`.claude/commands/${file}`);
    }

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
  '.float/core',
  '.float/core/tools',
  '.float/core/tools/types',
  '.float/core/format',
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
  const templateRoot = join(packageRoot, 'templates', '.float', 'project', 'nav', 'root.md');

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

  // Copy tools (source: system/claude/tools/)
  const toolFiles = ['float.md', 'float-sync.md', 'float-context.md', 'float-enhance.md', 'float-fix.md', 'float-build.md', 'float-harvest.md', 'float-delta.md', 'float-focus.md', 'float-relate.md'];
  for (const file of toolFiles) {
    const src = join(packageRoot, 'system', 'claude', 'tools', file);
    const dest = join(cwd, '.float', 'core', 'tools', file);
    copyFileSync(src, dest);
    created.push(`.float/core/tools/${file}`);
  }

  // Copy type templates (source: system/claude/tools/types/)
  const typeFiles = ['pipeline.md', 'scorer.md', 'extractor.md', 'reconciler.md', 'processor.md', 'reference.md'];
  for (const file of typeFiles) {
    const src = join(packageRoot, 'system', 'claude', 'tools', 'types', file);
    const dest = join(cwd, '.float', 'core', 'tools', 'types', file);
    copyFileSync(src, dest);
    created.push(`.float/core/tools/types/${file}`);
  }

  // Copy manual (source: system/manual.md)
  const manualSrc = join(packageRoot, 'system', 'manual.md');
  copyFileSync(manualSrc, join(cwd, '.float', 'core', 'manual.md'));
  created.push('.float/core/manual.md');

  // Copy format core files (source is format/core/ at package root)
  const formatCoreFiles = ['template.md', 'doc.md', 'os.md'];
  for (const file of formatCoreFiles) {
    const src = join(packageRoot, 'format', 'core', file);
    const dest = join(cwd, '.float', 'core', 'format', file);
    copyFileSync(src, dest);
    created.push(`.float/core/format/${file}`);
  }

  // Copy format tool files (source is format/tools/ at package root)
  const formatToolFiles = ['update.md'];
  for (const file of formatToolFiles) {
    const src = join(packageRoot, 'format', 'tools', file);
    const dest = join(cwd, '.float', 'core', 'format', file);
    copyFileSync(src, dest);
    created.push(`.float/core/format/${file}`);
  }

  // Copy index.md (structural reference)
  const indexSrc = join(packageRoot, 'templates', '.float', 'core', 'index.md');
  copyFileSync(indexSrc, join(cwd, '.float', 'core', 'index.md'));
  created.push('.float/core/index.md');

  // Copy project.md (structural reference)
  const projectSrc = join(packageRoot, 'templates', '.float', 'project', 'project.md');
  copyFileSync(projectSrc, join(cwd, '.float', 'project', 'project.md'));
  created.push('.float/project/project.md');

  // Copy Claude commands
  const commandFiles = ['float.md', 'float-sync.md', 'float-fix.md', 'float-context.md', 'float-enhance.md', 'float-build.md', 'float-harvest.md', 'float-delta.md', 'float-focus.md', 'float-relate.md'];
  for (const file of commandFiles) {
    const src = join(packageRoot, '.claude', 'commands', file);
    const dest = join(cwd, '.claude', 'commands', file);
    copyFileSync(src, dest);
    created.push(`.claude/commands/${file}`);
  }

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
