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
export declare const json: FloatPromptJson;
export declare const markdown = "# /float sync\n\nVerify nav files match reality and fix discrepancies.\n\n## Process\n\n1. **Detect** \u2014 Shell commands to compare nav files vs actual folders\n2. **Report** \u2014 Show issues with details\n3. **Propose** \u2014 Offer fixes with approval prompt\n4. **Wait** \u2014 Get user approval (y/n/feedback)\n5. **Fix** \u2014 Apply changes (spawn buoys if 3+ parallel ops)\n6. **Validate** \u2014 Re-run detection, confirm clean state\n7. **Log** \u2014 Append to session log\n\n## Exclusions\n\nNever flagged: dotfiles, `.float/`, `node_modules/`, `dist/`, `build/`, `.git/`, lock files.\n";
export declare const compile: () => string;
//# sourceMappingURL=float-sync.d.ts.map