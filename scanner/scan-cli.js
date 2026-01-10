#!/usr/bin/env node
/**
 * FloatPrompt Scanner CLI
 *
 * Rust-powered merkle scanner for O(log n) change detection.
 * Replaces scan.sh with ~230x faster performance.
 *
 * Usage: node scan-cli.js [project_dir]
 */

const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');

// Load the native scanner
const { scan } = require('./index.js');

// Get project directory from args or cwd
const projectDir = process.argv[2] || process.cwd();
const floatDir = path.join(projectDir, '.float');
const dbPath = path.join(floatDir, 'float.db');

// Ensure .float directory exists
if (!fs.existsSync(floatDir)) {
  fs.mkdirSync(floatDir, { recursive: true });
}

// Initialize database if needed (schema.sql is in the plugin)
if (!fs.existsSync(dbPath)) {
  const pluginRoot = process.env.CLAUDE_PLUGIN_ROOT ||
    path.join(__dirname, '..', 'plugins', 'floatprompt');
  const schemaPath = path.join(pluginRoot, 'lib', 'schema.sql');

  if (fs.existsSync(schemaPath)) {
    // Use execFileSync with shell to redirect stdin (safer than exec)
    const schemaContent = fs.readFileSync(schemaPath, 'utf-8');
    execFileSync('sqlite3', [dbPath], {
      input: schemaContent,
      stdio: ['pipe', 'inherit', 'inherit']
    });
  } else {
    // Schema will be created by the scanner itself
    console.log('Note: schema.sql not found, scanner will create tables');
  }
}

try {
  const result = scan({
    projectDir: projectDir,
    dbPath: dbPath,
    excludePatterns: []
  });

  // Output in format similar to scan.sh
  console.log(`Scan complete: ${result.stats.folders} folders, ${result.stats.files} files indexed in .float/float.db`);
  console.log(`  Duration: ${result.stats.durationMs}ms`);
  console.log(`  Files walked: ${result.stats.filesWalked}`);
  console.log(`  Files hashed: ${result.stats.filesHashed}`);
  console.log(`  Files cached: ${result.stats.filesSkipped}`);

  if (result.changed.length > 0) {
    console.log(`  Changed: ${result.changed.length} files`);
  }
  if (result.added.length > 0) {
    console.log(`  Added: ${result.added.length} files`);
  }
  if (result.removed.length > 0) {
    console.log(`  Removed: ${result.removed.length} files`);
  }

  // Output JSON for programmatic use if --json flag
  if (process.argv.includes('--json')) {
    console.log(JSON.stringify(result, null, 2));
  }

  process.exit(0);
} catch (err) {
  console.error(`Scanner error: ${err.message}`);
  process.exit(1);
}
