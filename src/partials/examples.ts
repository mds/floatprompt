/**
 * Examples Partial
 * Format: Labeled code blocks
 * Use: Every system tool — shows real usage
 *
 * Design principles:
 * 1. Label + output — condition as label, output as block
 * 2. Multiple examples — show both duality states
 * 3. Realistic — actual command and response
 * 4. Terminal format — uses code blocks with > prompt
 */

export interface Example {
  label: string;                         // e.g., "Issues found:" or "Clean state:"
  command: string;                       // e.g., "/float-sync"
  output: string;                        // the terminal output (no code fence)
}

/**
 * Generate Markdown examples section
 */
export const examplesMd = (examples: Example[]): string => {
  const blocks = examples.map((ex) => `**${ex.label}**
\`\`\`
> ${ex.command}

${ex.output}
\`\`\``);

  return `## Examples

${blocks.join("\n\n")}`;
};
