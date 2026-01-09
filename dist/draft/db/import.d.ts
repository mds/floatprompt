import Database from "better-sqlite3";
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
export declare function parseDecisionFile(filePath: string, content: string): {
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
};
/**
 * Import all decision files from a directory into the database.
 *
 * @param db - Database instance
 * @param logDir - Directory containing decision files (e.g., .float/logs/2026/01-jan/)
 * @param options - Import options
 */
export declare function importDecisionFiles(db: Database.Database, logDir: string, options?: {
    skipSummaries?: boolean;
    verbose?: boolean;
}): {
    imported: number;
    skipped: string[];
    duplicates: string[];
    errors: string[];
};
/**
 * Main entry point for running import from CLI.
 */
export declare function runImport(dbPath: string, logDir: string): void;
//# sourceMappingURL=import.d.ts.map