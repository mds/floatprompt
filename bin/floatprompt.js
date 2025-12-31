#!/usr/bin/env node

import { existsSync, mkdirSync, writeFileSync, readFileSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageRoot = join(__dirname, '..');

// Parse CLI arguments
const args = process.argv.slice(2);
const command = args[0];
const flags = args.filter(a => a.startsWith('-'));

const pkg = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8'));

// Help text
const helpText = `float v${pkg.version} - FloatPrompt: The invisible OS for AI

Usage: float <command>

Commands:
  init     Create FloatPrompt System in current directory
  update   Update system, tools, templates (preserves nav, logs, context)

Options:
  -h, --help     Show this help message
  -v, --version  Show version number

Examples:
  float init      # New project setup
  float update    # Get latest tools

Learn more: https://github.com/mds/floatprompt`;

if (flags.includes('--help') || flags.includes('-h')) {
  console.log(helpText);
  process.exit(0);
}

if (flags.includes('--version') || flags.includes('-v')) {
  console.log(pkg.version);
  process.exit(0);
}

const cwd = process.cwd();
const floatDir = join(cwd, '.float');

// No command given - smart default
if (!command || command.startsWith('-')) {
  if (existsSync(floatDir)) {
    // System exists - show status
    const versionFile = join(floatDir, '.version');
    const installedVersion = existsSync(versionFile)
      ? readFileSync(versionFile, 'utf8').trim()
      : 'unknown';

    if (installedVersion !== pkg.version) {
      console.log(`FloatPrompt v${installedVersion} installed (v${pkg.version} available)

Run: float update`);
    } else {
      console.log(`FloatPrompt v${installedVersion} installed

Run /float in Claude Code to boot.`);
    }
  } else {
    // No system - show help
    console.log(helpText);
  }
  process.exit(0);
}

// Handle 'update' command
if (command === 'update') {
  if (!existsSync(floatDir)) {
    console.error('Error: No FloatPrompt System found. Run `float init` first.');
    process.exit(1);
  }

  const updated = [];

  try {
    // Ensure directories exist
    const dirs = ['.float/tools', '.float/tools/types', '.float/templates', '.claude/commands'];
    for (const dir of dirs) {
      const fullPath = join(cwd, dir);
      if (!existsSync(fullPath)) {
        mkdirSync(fullPath, { recursive: true });
      }
    }

    // Update tools (source: templates/.float/tools/)
    const toolFiles = ['float.md', 'float-sync.md', 'float-context.md', 'float-enhance.md', 'float-fix.md', 'float-build.md', 'float-harvest.md', 'float-delta.md', 'float-focus.md', 'float-relate.md', 'float-report.md', 'float-project.md', 'float-all.md', 'float-think.md', 'tool-sync.md', 'manual.md'];
    for (const file of toolFiles) {
      const src = join(packageRoot, 'templates', '.float', 'tools', file);
      const dest = join(cwd, '.float', 'tools', file);
      copyFileSync(src, dest);
      updated.push(`.float/tools/${file}`);
    }

    // Update type templates (source: templates/.float/tools/types/)
    const typeFiles = ['pipeline.md', 'scorer.md', 'extractor.md', 'reconciler.md', 'processor.md', 'reference.md'];
    for (const file of typeFiles) {
      const src = join(packageRoot, 'templates', '.float', 'tools', 'types', file);
      const dest = join(cwd, '.float', 'tools', 'types', file);
      copyFileSync(src, dest);
      updated.push(`.float/tools/types/${file}`);
    }

    // Update templates (source: templates/.float/templates/)
    const templateFiles = ['floatprompt.md', 'float-doc.md', 'float-os.md'];
    for (const file of templateFiles) {
      const src = join(packageRoot, 'templates', '.float', 'templates', file);
      const dest = join(cwd, '.float', 'templates', file);
      copyFileSync(src, dest);
      updated.push(`.float/templates/${file}`);
    }

    // Update project.md (structural reference)
    const projectSrc = join(packageRoot, 'templates', '.float', 'project.md');
    copyFileSync(projectSrc, join(cwd, '.float', 'project.md'));
    updated.push('.float/project.md');

    // Update float.md (boot loader)
    const systemSrc = join(packageRoot, 'templates', '.float', 'float.md');
    copyFileSync(systemSrc, join(cwd, '.float', 'float.md'));
    updated.push('.float/float.md');

    // Update Claude commands (source: templates/.claude/commands/)
    const commandFiles = ['float.md', 'float-sync.md', 'float-fix.md', 'float-context.md', 'float-enhance.md', 'float-build.md', 'float-harvest.md', 'float-delta.md', 'float-focus.md', 'float-relate.md', 'float-report.md', 'float-project.md', 'float-all.md', 'float-think.md'];
    for (const file of commandFiles) {
      const src = join(packageRoot, 'templates', '.claude', 'commands', file);
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

Run /float in Claude Code to boot.`);
    process.exit(0);

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

// Handle 'init' command
if (command !== 'init') {
  // Unknown command
  console.error(`Unknown command: ${command}

${helpText}`);
  process.exit(1);
}

// Init: check if already exists
if (existsSync(floatDir)) {
  const versionFile = join(floatDir, '.version');
  const installedVersion = existsSync(versionFile)
    ? readFileSync(versionFile, 'utf8').trim()
    : 'unknown';

  console.log(`FloatPrompt already initialized (v${installedVersion}).

To update: float update
To boot: /float in Claude Code`);
  process.exit(0);
}

// Create directory structure
const dirs = [
  '.float',
  '.float/tools',
  '.float/tools/types',
  '.float/templates',
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
  const templateSystem = join(packageRoot, 'templates', '.float', 'float.md');
  const templateProject = join(packageRoot, 'templates', '.float', 'project.md');
  const templateRoot = join(packageRoot, 'templates', '.float', 'project', 'nav', 'root.md');

  copyFileSync(templateSystem, join(cwd, '.float', 'float.md'));
  created.push('.float/float.md');

  copyFileSync(templateProject, join(cwd, '.float', 'project.md'));
  created.push('.float/project.md');

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
  writeFileSync(join(cwd, '.float', 'project', 'context', 'project-decisions.md'), decisionsContent);
  created.push('.float/project/context/project-decisions.md');

  copyFileSync(templateRoot, join(cwd, '.float', 'project', 'nav', 'root.md'));
  created.push('.float/project/nav/root.md');

  // Create .gitkeep files for empty directories
  writeFileSync(join(cwd, '.float', 'project', 'logs', '.gitkeep'), '');
  created.push('.float/project/logs/');

  // Copy tools (source: templates/.float/tools/)
  const toolFiles = ['float.md', 'float-sync.md', 'float-context.md', 'float-enhance.md', 'float-fix.md', 'float-build.md', 'float-harvest.md', 'float-delta.md', 'float-focus.md', 'float-relate.md', 'float-report.md', 'float-project.md', 'float-all.md', 'float-think.md', 'tool-sync.md', 'manual.md'];
  for (const file of toolFiles) {
    const src = join(packageRoot, 'templates', '.float', 'tools', file);
    const dest = join(cwd, '.float', 'tools', file);
    copyFileSync(src, dest);
    created.push(`.float/tools/${file}`);
  }

  // Copy type templates (source: templates/.float/tools/types/)
  const typeFiles = ['pipeline.md', 'scorer.md', 'extractor.md', 'reconciler.md', 'processor.md', 'reference.md'];
  for (const file of typeFiles) {
    const src = join(packageRoot, 'templates', '.float', 'tools', 'types', file);
    const dest = join(cwd, '.float', 'tools', 'types', file);
    copyFileSync(src, dest);
    created.push(`.float/tools/types/${file}`);
  }

  // Copy templates (source: templates/.float/templates/)
  const templateFiles = ['floatprompt.md', 'float-doc.md', 'float-os.md'];
  for (const file of templateFiles) {
    const src = join(packageRoot, 'templates', '.float', 'templates', file);
    const dest = join(cwd, '.float', 'templates', file);
    copyFileSync(src, dest);
    created.push(`.float/templates/${file}`);
  }

  // Copy Claude commands (source: templates/.claude/commands/)
  const commandFiles = ['float.md', 'float-sync.md', 'float-fix.md', 'float-context.md', 'float-enhance.md', 'float-build.md', 'float-harvest.md', 'float-delta.md', 'float-focus.md', 'float-relate.md', 'float-report.md', 'float-project.md', 'float-all.md', 'float-think.md'];
  for (const file of commandFiles) {
    const src = join(packageRoot, 'templates', '.claude', 'commands', file);
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
