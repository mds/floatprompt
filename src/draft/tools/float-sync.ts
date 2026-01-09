/**
 * Float Sync Tool
 * Format: Minimal FloatPrompt (tier 3 — chained tool)
 * Use: Compile to .float/tools/float-sync.md
 *
 * Design principles:
 * 1. Minimal JSON — just routing info (id, title, triggers, checks, outputs)
 * 2. Process in markdown — the one thing that needs prose
 * 3. Inherits from boot.md — duality, examples, buoys defined there
 * 4. No STOP — boot.md already set focus
 */

import type { FloatPromptJson } from "../schema/floatprompt.js";

// Tool config (minimal)
export const json: FloatPromptJson = {
  id: "float-sync",
  title: "/float sync",
  triggers: [
    "nav out of sync",
    "after major file changes",
    "/float reports structure issues",
  ],
  checks: [
    "structural references exist",
    "nav coverage for all folders",
    "table entries match actual files",
    "subfolder entries match reality",
  ],
  outputs: [
    "updated nav files",
    "sync report",
    "session log entry",
  ],
};

// Process steps (markdown)
export const markdown = `# /float sync

Verify nav files match reality and fix discrepancies.

## Process

1. **Detect** — Shell commands to compare nav files vs actual folders
2. **Report** — Show issues with details
3. **Propose** — Offer fixes with approval prompt
4. **Wait** — Get user approval (y/n/feedback)
5. **Fix** — Apply changes (spawn buoys if 3+ parallel ops)
6. **Validate** — Re-run detection, confirm clean state
7. **Log** — Append to session log

## Exclusions

Never flagged: dotfiles, \`.float/\`, \`node_modules/\`, \`dist/\`, \`build/\`, \`.git/\`, lock files.
`;

// Compile to FloatPrompt format
export const compile = (): string => {
  const jsonStr = JSON.stringify(json, null, 2);
  return `<fp>
<json>
${jsonStr}
</json>
<md>
${markdown}
</md>
</fp>`;
};
