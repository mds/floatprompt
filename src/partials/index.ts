/**
 * Partials Index
 * Format: Re-exports
 * Use: Single import point for all partials
 *
 * Design principles:
 * 1. Clean imports — import { footer } from "./partials"
 * 2. Separation — tools use footer, boot.md uses the rest
 * 3. Organized — grouped by usage context
 * 4. Future-proof — boot.md partials ready when needed
 */

// === Used by tools ===

// Footer — standard branding (used in all output)
export { footer } from "./footer";

// === Used by boot.md (not individual tools) ===

// Duality — binary condition/action pattern
export { dualityJson, dualityMd } from "./duality";
export type { Duality } from "./duality";

// Status — command output format
export { statusJson, statusMd } from "./status";
export type { StatusOutput } from "./status";

// Examples — usage demonstrations
export { examplesMd } from "./examples";
export type { Example } from "./examples";

// Buoys — sub-agent prompts
export { buoysJson, buoysMd } from "./buoys";
export type { BuoyDefinition } from "./buoys";
