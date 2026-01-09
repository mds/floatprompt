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
export declare function exportLogs(options: ExportOptions): ExportResult;
/**
 * CLI entry point.
 */
export declare function runExport(dbPath: string, outputDir: string): void;
//# sourceMappingURL=export.d.ts.map