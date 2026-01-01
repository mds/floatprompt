/**
 * Buoys Partial
 * Format: JSON object + Markdown section with prompts
 * Use: System tools that spawn sub-agents
 *
 * Design principles:
 * 1. JSON keys — short identifiers for buoy types
 * 2. JSON values — brief description for requirements
 * 3. Full prompts — detailed prompts in markdown section
 * 4. Parallel execution — buoys designed for concurrent spawning
 */

export interface BuoyDefinition {
  key: string;                           // e.g., "check_buoy"
  description: string;                   // brief description for JSON
  prompt: string;                        // full prompt for markdown (no code fence)
}

/**
 * Generate buoys object for JSON requirements
 */
export const buoysJson = (
  buoys: BuoyDefinition[]
): Record<string, string> => {
  const result: Record<string, string> = {};
  for (const buoy of buoys) {
    result[buoy.key] = buoy.description;
  }
  return result;
};

/**
 * Generate Markdown buoy prompts section
 */
export const buoysMd = (buoys: BuoyDefinition[]): string => {
  const sections = buoys.map(
    (b) => `### ${formatBuoyName(b.key)}

\`\`\`
${b.prompt}
\`\`\``
  );

  return `## Buoy Prompts

${sections.join("\n\n")}`;
};

/**
 * Convert snake_case key to Title Case name
 * e.g., "check_buoy" → "Check Buoy"
 */
const formatBuoyName = (key: string): string =>
  key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
