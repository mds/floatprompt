import * as fs from "fs";
import * as path from "path";
import Database from "better-sqlite3";
import { createDatabase } from "./client.js";

/**
 * Export log_entries from SQLite to flat markdown files.
 *
 * Creates human-readable folder structure:
 *   {outputDir}/YYYY/MM-mon/YYYY-MM-DD-topic.md
 *
 * This is the reverse of import.ts — SQLite is source of truth,
 * flat files are for human browsing.
 */

interface LogEntry {
  id: number;
  folder_path: string;
  date: string;
  topic: string;
  status: string;
  title: string;
  decision: string | null;
  rationale: string | null;
  before_state: string | null;
  after_state: string | null;
  files_changed: string | null;
  future_agent: string | null;
  created_at: number;
}

const MONTH_NAMES: Record<string, string> = {
  "01": "jan",
  "02": "feb",
  "03": "mar",
  "04": "apr",
  "05": "may",
  "06": "jun",
  "07": "jul",
  "08": "aug",
  "09": "sep",
  "10": "oct",
  "11": "nov",
  "12": "dec",
};

/**
 * Strip trailing --- from content (may be baked in from import).
 */
function stripTrailingSeparator(content: string): string {
  return content.replace(/\n---\s*$/, "").trim();
}

/**
 * Convert a log entry to markdown format.
 */
function entryToMarkdown(entry: LogEntry): string {
  // Build sections, then join with single ---
  const sections: string[] = [];

  // Header (always present)
  sections.push(
    `# ${entry.title}\n\n` +
    `**Date:** ${entry.date}\n` +
    `**Status:** ${entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}`
  );

  if (entry.decision) {
    sections.push(`## Decision\n\n${stripTrailingSeparator(entry.decision)}`);
  }

  if (entry.rationale) {
    sections.push(`## Rationale\n\n${stripTrailingSeparator(entry.rationale)}`);
  }

  if (entry.before_state) {
    sections.push(`## Before\n\n${stripTrailingSeparator(entry.before_state)}`);
  }

  if (entry.after_state) {
    sections.push(`## After\n\n${stripTrailingSeparator(entry.after_state)}`);
  }

  if (entry.files_changed) {
    let content = "## Files Changed\n\n";
    try {
      const files = JSON.parse(entry.files_changed) as string[];
      content += "| File | Change |\n|------|--------|\n";
      for (const file of files) {
        content += `| \`${file}\` | — |\n`;
      }
    } catch {
      content += entry.files_changed;
    }
    sections.push(content.trim());
  }

  if (entry.future_agent) {
    sections.push(`## Future Agent\n\n${stripTrailingSeparator(entry.future_agent)}`);
  }

  return sections.join("\n\n---\n\n") + "\n";
}

/**
 * Get the output path for a log entry.
 * Returns: {year}/{month}-{mon}/{date}-{topic}.md
 */
function getEntryPath(entry: LogEntry): string {
  const [year, month] = entry.date.split("-");
  const monthName = MONTH_NAMES[month] || month;
  const monthFolder = `${month}-${monthName}`;
  const filename = `${entry.date}-${entry.topic}.md`;

  return path.join(year, monthFolder, filename);
}

export interface ExportOptions {
  dbPath: string;
  outputDir: string;
  verbose?: boolean;
}

export interface ExportResult {
  exported: number;
  folders: string[];
}

/**
 * Export all log entries to flat files.
 */
export function exportLogs(options: ExportOptions): ExportResult {
  const { dbPath, outputDir, verbose = false } = options;

  const db = createDatabase(dbPath);
  const foldersCreated = new Set<string>();

  const entries = db
    .prepare(
      `SELECT id, folder_path, date, topic, status, title, decision, rationale,
              before_state, after_state, files_changed, future_agent, created_at
       FROM log_entries
       ORDER BY date, id`
    )
    .all() as LogEntry[];

  if (verbose) {
    console.log(`Found ${entries.length} log entries`);
  }

  for (const entry of entries) {
    const relativePath = getEntryPath(entry);
    const fullPath = path.join(outputDir, relativePath);
    const folder = path.dirname(fullPath);

    // Create folder if needed
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
      foldersCreated.add(folder);
      if (verbose) {
        console.log(`Created folder: ${folder}`);
      }
    }

    // Write markdown file
    const markdown = entryToMarkdown(entry);
    fs.writeFileSync(fullPath, markdown);

    if (verbose) {
      console.log(`Exported: ${relativePath}`);
    }
  }

  db.close();

  return {
    exported: entries.length,
    folders: Array.from(foldersCreated),
  };
}

/**
 * CLI entry point.
 */
export function runExport(dbPath: string, outputDir: string): void {
  console.log(`FloatPrompt Log Exporter`);
  console.log(`========================`);
  console.log(`Database: ${dbPath}`);
  console.log(`Output: ${outputDir}`);
  console.log("");

  const result = exportLogs({
    dbPath,
    outputDir,
    verbose: true,
  });

  console.log("");
  console.log(`--- Export Summary ---`);
  console.log(`Exported: ${result.exported} entries`);
  console.log(`Folders created: ${result.folders.length}`);
}

// CLI execution
const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  const dbPath = process.argv[2] || ".float/float.db";
  const outputDir = process.argv[3] || ".float/logs";

  runExport(dbPath, outputDir);
}
