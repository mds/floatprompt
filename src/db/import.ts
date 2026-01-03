import * as fs from "fs";
import * as path from "path";
import Database from "better-sqlite3";
import { createDatabase, insertLogEntry, countLogEntries, logEntryExists } from "./client.js";

/**
 * Parse a decision log file and extract fields for log_entries table.
 *
 * Expected markdown format:
 *   # Title
 *   **Date:** YYYY-MM-DD
 *   **Status:** Locked|Open|Superseded
 *   ## Decision (optional)
 *   ## Rationale (optional)
 *   ## Before/After (optional)
 *   ## Files Changed (optional)
 *   ## Future Agent (optional)
 *
 * Filename must be: YYYY-MM-DD-topic.md
 */
export function parseDecisionFile(
  filePath: string,
  content: string
): {
  date: string;
  topic: string;
  status: "locked" | "open" | "superseded";
  title: string;
  decision: string | null;
  rationale: string | null;
  before_state: string | null;
  after_state: string | null;
  files_changed: string[] | null;
  future_agent: string | null;
} {
  const filename = path.basename(filePath);

  // Extract date and topic from filename: YYYY-MM-DD-topic.md
  const dateMatch = filename.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/);
  if (!dateMatch) {
    throw new Error(`Invalid filename format: ${filename}`);
  }
  const date = dateMatch[1];
  const topic = dateMatch[2];

  // Extract title: first # line (skip blockquotes)
  const titleMatch = content.match(/^# (.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : topic;

  // Extract status: **Status:** value
  const statusMatch = content.match(/\*\*Status:\*\*\s*(\w+)/i);
  const rawStatus = statusMatch ? statusMatch[1].toLowerCase() : "locked";
  const status = ["locked", "open", "superseded"].includes(rawStatus)
    ? (rawStatus as "locked" | "open" | "superseded")
    : "locked";

  // Extract sections by ## headers
  const sections = extractSections(content);

  // Parse Files Changed table if exists
  let filesChanged: string[] | null = null;
  if (sections["files changed"]) {
    filesChanged = parseFilesChangedTable(sections["files changed"]);
  }

  return {
    date,
    topic,
    status,
    title,
    decision: sections["decision"] || null,
    rationale: sections["rationale"] || null,
    before_state: sections["before"] || sections["before state"] || null,
    after_state: sections["after"] || sections["after state"] || null,
    files_changed: filesChanged,
    future_agent: sections["future agent"] || null,
  };
}

/**
 * Extract sections from markdown content.
 * Returns map of lowercase section name -> content.
 */
function extractSections(content: string): Record<string, string> {
  const sections: Record<string, string> = {};
  const lines = content.split("\n");

  let currentSection: string | null = null;
  let currentContent: string[] = [];

  for (const line of lines) {
    const headerMatch = line.match(/^## (.+)$/);
    if (headerMatch) {
      // Save previous section
      if (currentSection) {
        sections[currentSection] = currentContent.join("\n").trim();
      }
      currentSection = headerMatch[1].toLowerCase().trim();
      currentContent = [];
    } else if (currentSection) {
      currentContent.push(line);
    }
  }

  // Save last section
  if (currentSection) {
    sections[currentSection] = currentContent.join("\n").trim();
  }

  return sections;
}

/**
 * Parse a markdown table in Files Changed section.
 * Returns array of file paths.
 */
function parseFilesChangedTable(content: string): string[] {
  const files: string[] = [];
  const lines = content.split("\n");

  for (const line of lines) {
    // Match table rows: | `file.md` | description |
    const match = line.match(/\|\s*`([^`]+)`\s*\|/);
    if (match) {
      files.push(match[1]);
    }
  }

  return files.length > 0 ? files : null as unknown as string[];
}

/**
 * Import all decision files from a directory into the database.
 *
 * @param db - Database instance
 * @param logDir - Directory containing decision files (e.g., .float/logs/2026/01-jan/)
 * @param options - Import options
 */
export function importDecisionFiles(
  db: Database.Database,
  logDir: string,
  options: {
    skipSummaries?: boolean; // Skip summary files (01-jan.md, 2026.md, index.md)
    verbose?: boolean;
  } = {}
): { imported: number; skipped: string[]; duplicates: string[]; errors: string[] } {
  const { skipSummaries = true, verbose = false } = options;

  const result = { imported: 0, skipped: [] as string[], duplicates: [] as string[], errors: [] as string[] };

  // Summary files to skip (they're navigation, not data)
  const summaryPatterns = [
    /^\d{2}-[a-z]{3}\.md$/, // 01-jan.md (month summary)
    /^\d{4}\.md$/, // 2026.md (year summary)
    /^index\.md$/, // index.md (folder summary)
    /^logs\.md$/, // logs.md (root summary)
  ];

  const files = fs.readdirSync(logDir).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    const filePath = path.join(logDir, file);

    // Skip summary files
    if (skipSummaries && summaryPatterns.some((p) => p.test(file))) {
      result.skipped.push(file);
      if (verbose) console.log(`Skipped (summary): ${file}`);
      continue;
    }

    try {
      const content = fs.readFileSync(filePath, "utf-8");
      const parsed = parseDecisionFile(filePath, content);

      // Skip if already exists (idempotent)
      if (logEntryExists(db, parsed.date, parsed.topic)) {
        result.duplicates.push(file);
        if (verbose) console.log(`Skipped (exists): ${file}`);
        continue;
      }

      const stats = fs.statSync(filePath);
      const createdAt = Math.floor(stats.mtimeMs);

      insertLogEntry(db, {
        folder_path: "/", // System-wide decisions
        ...parsed,
        supersedes: null, // Defer FK resolution
        superseded_by: null,
        created_at: createdAt,
      });

      result.imported++;
      if (verbose) console.log(`Imported: ${file}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      result.errors.push(`${file}: ${message}`);
      if (verbose) console.error(`Error: ${file} - ${message}`);
    }
  }

  return result;
}

/**
 * Main entry point for running import from CLI.
 */
export function runImport(dbPath: string, logDir: string): void {
  console.log(`Creating database at: ${dbPath}`);
  const db = createDatabase(dbPath);

  console.log(`Importing from: ${logDir}`);
  const result = importDecisionFiles(db, logDir, { verbose: true });

  console.log("\n--- Import Summary ---");
  console.log(`Imported: ${result.imported}`);
  console.log(`Skipped (summaries): ${result.skipped.length} (${result.skipped.join(", ")})`);
  if (result.duplicates.length > 0) {
    console.log(`Skipped (exists): ${result.duplicates.length}`);
  }
  if (result.errors.length > 0) {
    console.log(`Errors: ${result.errors.length}`);
    result.errors.forEach((e) => console.log(`  - ${e}`));
  }

  console.log(`\nTotal entries in database: ${countLogEntries(db)}`);
  db.close();
}

// CLI execution (ESM compatible)
const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  const dbPath = process.argv[2] || ".float/float.db";
  const logDir = process.argv[3] || ".float/logs";

  runImport(dbPath, logDir);
}
