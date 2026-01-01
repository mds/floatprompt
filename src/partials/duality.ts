/**
 * Duality Partial
 * Format: JSON object + Markdown table
 * Use: Every system tool — shows two operational modes
 *
 * Design principles:
 * 1. Binary states — issues found vs clean
 * 2. Action-oriented — what happens in each state
 * 3. Consistent structure — same format across all tools
 * 4. Quick scan — AI reads once, understands behavior
 */

export interface Duality {
  condition_a: string;                   // first condition (usually "issues found")
  action_a: string;                      // what to do in first state
  condition_b: string;                   // second condition (usually "clean")
  action_b: string;                      // what to do in second state
}

/**
 * Generate JSON duality object for requirements section
 */
export const dualityJson = (d: Duality): Duality => d;

/**
 * Generate Markdown duality table
 */
export const dualityMd = (d: Duality): string => `## Duality

| Condition | Action |
|-----------|--------|
| ${d.condition_a} | ${d.action_a} |
| ${d.condition_b} | ${d.action_b} |`;
