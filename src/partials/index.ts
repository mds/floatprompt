/**
 * Partials Index
 * Format: Re-exports
 * Use: Single import point for all partials
 *
 * Design principles:
 * 1. Clean imports — import { dualityMd, statusMd } from "./partials"
 * 2. All exports — types and functions
 * 3. Organized — grouped by partial
 * 4. Future-proof — easy to add more partials
 */

// Duality — binary condition/action table
export { dualityJson, dualityMd } from "./duality";
export type { Duality } from "./duality";

// Status — command output format
export { statusJson, statusMd } from "./status";
export type { StatusOutput } from "./status";

// Footer — standard branding
export { footer } from "./footer";

// Examples — usage demonstrations
export { examplesMd } from "./examples";
export type { Example } from "./examples";

// Buoys — sub-agent prompts
export { buoysJson, buoysMd } from "./buoys";
export type { BuoyDefinition } from "./buoys";
