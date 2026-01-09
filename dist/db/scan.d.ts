export interface ScanOptions {
    rootPath: string;
    dbPath: string;
    ignore?: string[];
    include?: string[];
    verbose?: boolean;
}
export interface ScanResult {
    foldersCreated: number;
    foldersUpdated: number;
    foldersRemoved: number;
    filesCreated: number;
    filesUpdated: number;
    filesRemoved: number;
}
/**
 * Scan the filesystem and update the database.
 */
export declare function scan(options: ScanOptions): ScanResult;
/**
 * CLI entry point.
 */
export declare function runScan(rootPath: string, dbPath: string): void;
//# sourceMappingURL=scan.d.ts.map