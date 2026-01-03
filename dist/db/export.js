import * as fs from "fs";
import * as path from "path";
import { createDatabase } from "./client.js";
const MONTH_NAMES = {
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
function stripTrailingSeparator(content) {
    return content.replace(/\n---\s*$/, "").trim();
}
/**
 * Convert a log entry to markdown format.
 */
function entryToMarkdown(entry) {
    // Build sections, then join with single ---
    const sections = [];
    // Header (always present)
    sections.push(`# ${entry.title}\n\n` +
        `**Date:** ${entry.date}\n` +
        `**Status:** ${entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}`);
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
            const files = JSON.parse(entry.files_changed);
            content += "| File | Change |\n|------|--------|\n";
            for (const file of files) {
                content += `| \`${file}\` | — |\n`;
            }
        }
        catch {
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
function getEntryPath(entry) {
    const [year, month] = entry.date.split("-");
    const monthName = MONTH_NAMES[month] || month;
    const monthFolder = `${month}-${monthName}`;
    const filename = `${entry.date}-${entry.topic}.md`;
    return path.join(year, monthFolder, filename);
}
/**
 * Export all log entries to flat files.
 */
export function exportLogs(options) {
    const { dbPath, outputDir, verbose = false } = options;
    const db = createDatabase(dbPath);
    const foldersCreated = new Set();
    const entries = db
        .prepare(`SELECT id, folder_path, date, topic, status, title, decision, rationale,
              before_state, after_state, files_changed, future_agent, created_at
       FROM log_entries
       ORDER BY date, id`)
        .all();
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
export function runExport(dbPath, outputDir) {
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
//# sourceMappingURL=export.js.map