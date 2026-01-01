/**
 * Float Sync Tool Config
 * Format: FloatPrompt JSON + Markdown
 * Use: Compile to .float/tools/float-sync.md
 *
 * Design principles:
 * 1. Partials for shared content — duality, status, buoys, footer
 * 2. Tool-specific content inline — process steps, what it checks
 * 3. Single source of truth — change partial, all tools update
 * 4. Type-safe — TypeScript enforces structure
 */

import type { FloatPromptJson } from "../schema/floatprompt";
import type { Duality, StatusOutput, BuoyDefinition, Example } from "../partials";
import {
  dualityJson,
  dualityMd,
  statusJson,
  statusMd,
  buoysJson,
  buoysMd,
  examplesMd,
  footer,
} from "../partials";

// Tool identity
const meta = {
  title: "/float sync",
  id: "float-sync",
  type: "system" as const,
};

const human = {
  author: "@mds",
  intent: "Keep structure files synchronized with actual folder contents",
  context: "Run when /float reports issues or after major file changes",
};

const ai = {
  role: "Structure integrity guardian",
};

// Duality definition
const duality: Duality = {
  condition_a: "Issues found",
  action_a: "Show details, propose fixes, apply with approval",
  condition_b: "Clean",
  action_b: "Report OK",
};

// Status output definition
const status: StatusOutput = {
  command: "sync",
  fields: ["Directory: [path]", "Status: [result]"],
  nextStep: "[Next step recommendation]",
  results: [
    "Clean — no changes needed",
    "Fixed 3 issues",
    "Fixed 3 issues, 5 descriptions pending",
  ],
};

// Buoy definitions
const buoys: BuoyDefinition[] = [
  {
    key: "check_buoy",
    description: "Verify one nav file vs folder (parallel, one per nav file)",
    prompt: `Verify .float/project/nav/{folder}.md against actual {folder}/ contents:
1. Read the nav file and parse the Contents table
2. List actual files in {folder}/ (exclude: dotfiles, node_modules, .git, dist, build)
3. List actual subfolders in {folder}/
4. Compare nav entries to actual contents
5. Return JSON: {
     navFile: string,
     status: "ok" | "issues",
     missing: string[],
     stale: string[],
     missingSubfolders: string[],
     staleSubfolders: string[]
   }`,
  },
  {
    key: "structural_buoy",
    description: "Create missing core/index.md or float-project.md",
    prompt: `Create missing structural reference file:
1. Determine which file is missing: core/index.md or float-project.md
2. Read templates/.float/tools/ or templates/.float/project.md
3. Copy template to appropriate location
4. Update created date to today
5. Return confirmation`,
  },
  {
    key: "nav_buoy",
    description: "Update file table in one nav file",
    prompt: `Update .float/project/nav/{folder}.md:
1. Add these files to Contents table: [list]
2. Remove these files from Contents table: [list]
3. Add these subfolders: [list]
4. Remove these subfolders: [list]
5. Preserve existing descriptions for unchanged rows
6. Use "[needs description]" for new entries
7. Maintain alphabetical order
8. Update ai_updated timestamp
9. Return the updated file content`,
  },
  {
    key: "system_buoy",
    description: "Update structure map in system.md",
    prompt: `Update structure map in .float/float.md:
1. Add these folders to structure map: [list]
2. Remove these folders: [list]
3. Preserve existing annotations and comments
4. Maintain tree formatting
5. Return the updated structure map section`,
  },
  {
    key: "scaffold_buoy",
    description: "Create one new nav file",
    prompt: `Create .float/project/nav/{folder}.md for a new folder:
1. List all files in {folder}/ (exclude dotfiles, etc.)
2. List all subfolders in {folder}/
3. Create nav file with full floatprompt doc metadata
4. Add heading and description of folder purpose
5. Add Contents table with "[needs description]" for each file
6. Add Subfolders table if subfolders exist
7. Return the complete nav file content`,
  },
  {
    key: "log_buoy",
    description: "Append to session log",
    prompt: `Append to .float/project/logs/{date}.md:
1. Create file if it doesn't exist (with date header)
2. Add entry at top (newest first):
   ## HH:MM — {action}
   - {change 1}
   - {change 2}
3. Keep entries concise (one line per change)
4. Return confirmation`,
  },
];

// Example usage
const examples: Example[] = [
  {
    label: "Issues found:",
    command: "/float-sync",
    output: `Sync Issues Found:

docs/:
  Missing: new-guide.md
  Stale: old-doc.md

Proposed Fixes:
1. Add to nav/docs.md: new-guide.md [needs description]
2. Remove from nav/docs.md: old-doc.md

Apply changes? (y/n): y

FloatPrompt sync complete.
Directory: /Users/mds/projects/my-app
Status: Fixed 2 issues, 1 description pending

Next: /float-think`,
  },
  {
    label: "Clean state:",
    command: "/float-sync",
    output: `FloatPrompt sync complete.
Directory: /Users/mds/projects/my-app
Status: Clean — no changes needed

Next: /float-think`,
  },
];

// Build JSON section
export const json: FloatPromptJson = {
  STOP: "Float Sync Tool. Verify nav files match reality and fix discrepancies.",
  meta,
  human,
  ai,
  requirements: {
    duality: dualityJson(duality),
    status_format: statusJson(status),
    next_step_logic:
      "Always suggest /float-think as next step. Float-think will analyze results and decide if float-enhance is needed.",
    buoys: buoysJson(buoys),
    reporting: {
      protocol: "float-report",
      phases: ["map", "decide", "structure"],
      async: true,
    },
  },
};

// Build Markdown section
export const markdown = `# /float sync — Structure Integrity Tool

**Verify nav files match reality and fix discrepancies.**

This command ensures \`.float/project/nav/*.md\` files accurately reflect actual folder contents.

${dualityMd(duality)}

## What It Checks

1. **Structural references** — \`core/index.md\` and \`float-project.md\` exist
2. **Nav coverage** — Every visible project folder has a nav file
3. **Table accuracy** — Files listed in nav match actual folder contents
4. **Subfolder accuracy** — Subfolders listed in nav match actual subfolders
5. **Structure map** — system.md structure map matches reality

## Process

### 1. Detect (Shell-Assisted)

Use shell commands for fast detection:

\`\`\`bash
# Check structural reference files exist
test -f .float/tools/ && echo "index.md OK" || echo "index.md MISSING"
test -f .float/project.md && echo "project.md OK" || echo "project.md MISSING"

# List actual files in folder
ls docs/

# Parse nav file entries
grep "^\\| \\*\\*" .float/project/nav/docs.md

# Find missing nav files
ls -d */ | grep -v -E '^(node_modules|dist|build|\\.git|\\.float)/$'
\`\`\`

Compare shell output with nav file contents to identify:
- **Missing structural refs** — \`core/index.md\` or \`float-project.md\` doesn't exist
- **Missing** — In folder but not in nav
- **Stale** — In nav but not in folder
- **New folders** — Folders without nav files

**Report:** Call float-report --phase=map with findings

### 2. Report

Show issues with details.

### 3. Propose

Offer fixes with approval prompt.

### 4. Wait for Approval

| Response | Action |
|----------|--------|
| \`y\` or \`yes\` | Apply all proposed changes |
| \`n\` or \`no\` | Cancel, no changes made |
| Specific feedback | Address feedback, re-propose |

### 5. Fix via Buoys

Spawn targeted buoys for fixes. **Parallelization:** Independent fixes run in parallel.

### 6. Validate

Orchestrator checks buoy work:
- Verify changes were applied correctly
- Re-run detection to confirm clean state
- Report any remaining issues

**Report:** Call float-report --phase=structure with results

### 7. Log

Append activity to session log via Log Buoy.

${statusMd(status)}

## Next Step Logic

**Always suggest \`/float-think\` as the next step:**

\`\`\`
Next: /float-think
\`\`\`

Float-think will analyze the sync results and decide if float-enhance is needed for placeholders.

${buoysMd(buoys)}

## Exclusions

These are never flagged as issues:

- Dotfiles (\`.DS_Store\`, \`.gitignore\`, etc.)
- \`.float/\` folder itself
- \`node_modules/\`, \`dist/\`, \`build/\`, \`.git/\`
- Lock files (\`*.lock\`, \`package-lock.json\`)

## AI Discretion

**The 3+ Rule:** Spawn buoys when 3+ parallel operations needed. Below threshold, direct execution OK.

| Operations | Approach |
|------------|----------|
| 1-2 | Direct execution acceptable |
| 3+ | Spawn fleet for parallelization |

**Descriptions:** AI judges obvious vs complex — write directly or use \`[needs description]\` placeholders.

Outcomes matter, method is flexible.

${examplesMd(examples)}

${footer()}`;

// Final compiled output (for build script)
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
