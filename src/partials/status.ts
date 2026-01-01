/**
 * Status Output Partial
 * Format: Template string + Markdown code block
 * Use: Every system tool — consistent output format
 *
 * Design principles:
 * 1. Predictable format — AI and human know what to expect
 * 2. Minimal fields — command, directory, status, next step
 * 3. Next step included — always suggests what's next
 * 4. Results list — possible outcomes for status field
 */

export interface StatusOutput {
  command: string;                       // e.g., "sync", "fix", "boot"
  fields: string[];                      // e.g., ["Directory: [path]", "Status: [result]"]
  nextStep: string;                      // what to suggest next
  results: string[];                     // possible status outcomes
}

/**
 * Generate status_format string for JSON requirements
 */
export const statusJson = (s: StatusOutput): string => {
  const lines = [
    `FloatPrompt ${s.command} complete.`,
    ...s.fields,
    "",
    s.nextStep,
  ];
  return lines.join("\n");
};

/**
 * Generate Markdown status output section
 */
export const statusMd = (s: StatusOutput): string => {
  const template = [
    "```",
    `FloatPrompt ${s.command} complete.`,
    ...s.fields,
    "",
    s.nextStep,
    "```",
  ].join("\n");

  const resultsList = s.results.map((r) => `- "${r}"`).join("\n");

  return `## Status Output

${template}

**Results:**
${resultsList}`;
};
