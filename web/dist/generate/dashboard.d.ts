/**
 * Dashboard Generator
 *
 * Creates /float/index.html — a human-readable overview
 * of all generated markdown files.
 */
import type { PageInfo } from '../types.js';
export interface DashboardOptions {
    /** Site title */
    siteTitle?: string;
    /** Site description */
    siteDescription?: string;
    /** Base URL */
    baseUrl?: string;
}
/**
 * Generate the dashboard HTML
 */
export declare function generateDashboard(pages: PageInfo[], options?: DashboardOptions): string;
//# sourceMappingURL=dashboard.d.ts.map