---
title: Implementation Plan
type: plan
created: 2026-01-01

human_author: @mds
human_intent: Simple modular phases for building the context compiler

ai_model: Claude Opus 4.5
ai_notes: Supersedes 05/06/08 docs. TypeScript native, no Handlebars.
---

# Implementation Plan

**Simple. Modular. TypeScript.**

---

## Phase 1: Working Folder Structure

Create the build system home.

```
src/
├── schema/              # TypeScript interfaces
│   ├── floatprompt.ts   # <fp><json><md> tool format
│   ├── floatdoc.ts      # YAML frontmatter doc format
│   ├── system.ts        # system.md shape
│   └── nav.ts           # map/context file shapes
│
├── partials/            # Template literal functions
│   ├── duality.ts
│   ├── status.ts
│   ├── buoys.ts
│   ├── reporting.ts
│   ├── footer.ts
│   └── index.ts         # Export all
│
├── tools/               # Tool configs (typed)
│   ├── float.ts
│   ├── float-sync.ts
│   ├── float-fix.ts
│   └── ...
│
├── build.ts             # Compile → templates/.float/
└── validate.ts          # Schema validation
```

**Deliverable:** Empty folder structure with placeholder files.

---

## Phase 2: Schema Definition

Define the two core formats.

### 2A: FloatPrompt (Tools)

```typescript
// src/schema/floatprompt.ts

interface FloatPrompt {
  STOP: string
  meta: {
    title: string
    id: string
    format: 'floatprompt'
    version: string
  }
  human: {
    author: string
    intent: string
    context?: string
  }
  ai: {
    role: string
    behavior: string
  }
  requirements: Record<string, unknown>
}
```

### 2B: FloatDoc (YAML frontmatter)

```typescript
// src/schema/floatdoc.ts

interface FloatDoc {
  title: string
  type: 'map' | 'context' | 'decisions' | 'log' | string
  created?: string
  generated_by?: string
  ai_updated?: string

  human_author?: string
  human_intent?: string

  ai_model?: string
  ai_notes?: string
}
```

### 2C: Tool Config

```typescript
// src/schema/tool.ts

interface ToolConfig {
  id: string
  title: string
  purpose: string

  duality: {
    condition_a: string
    action_a: string
    condition_b: string
    action_b: string
  }

  status_format: string
  next_step_logic: string

  buoys?: BuoyConfig[]
  reporting?: ReportingConfig

  examples: Example[]
}
```

**Deliverable:** TypeScript interfaces, exportable.

---

## Phase 3: Partials as Functions

Convert shared patterns to template literal functions.

### 3A: Footer (simplest)

```typescript
// src/partials/footer.ts

export const footer = (version: string) => `
---

*[FloatPrompt](https://github.com/mds/floatprompt) v${version}*
`;
```

### 3B: Duality

```typescript
// src/partials/duality.ts

import { Duality } from '../schema/tool';

export const duality = (d: Duality) => `
## Duality

| Condition | Action |
|-----------|--------|
| ${d.condition_a} | ${d.action_a} |
| ${d.condition_b} | ${d.action_b} |
`;
```

### 3C: Full List

| Partial | Input | Output |
|---------|-------|--------|
| `footer(version)` | string | Attribution line |
| `duality(config)` | Duality | Markdown table |
| `status(format)` | string | Status format block |
| `nextStep(logic)` | string | Next step section |
| `buoys(list)` | BuoyConfig[] | Buoy table + prompts |
| `reporting(config)` | ReportingConfig | Reporting JSON block |
| `examples(list)` | Example[] | Examples section |

**Deliverable:** 7 partial functions, all typed.

---

## Phase 4: One Tool (Proof)

Convert `float-sync` end-to-end.

### 4A: Create Tool Config

```typescript
// src/tools/float-sync.ts

import { ToolConfig } from '../schema/tool';

export const floatSync: ToolConfig = {
  id: 'float-sync',
  title: '/float-sync',
  purpose: 'Verify nav map files match reality',

  duality: {
    condition_a: 'Issues found',
    action_a: 'Show details, propose fixes, apply with approval',
    condition_b: 'Clean',
    action_b: 'Report OK'
  },

  // ... rest of config
};
```

### 4B: Create Tool Template

```typescript
// src/tools/float-sync.template.ts

import { floatSync } from './float-sync';
import { duality, footer, buoys } from '../partials';
import { SYSTEM } from '../system';

export const render = () => `<fp>
<json>
{
  "STOP": "${floatSync.purpose}",

  "meta": {
    "title": "${floatSync.title}",
    "id": "${floatSync.id}",
    "format": "floatprompt",
    "version": "${SYSTEM.version}"
  },

  // ... rest of JSON
}
</json>
<md>
# ${floatSync.title}

**${floatSync.purpose}**

${duality(floatSync.duality)}

${buoys(floatSync.buoys)}

${footer(SYSTEM.version)}
</md>
</fp>`;
```

### 4C: Build & Compare

```bash
npx tsx src/build.ts --tool=float-sync
diff templates/.float/tools/float-sync.md dist/float-sync.md
```

### 4D: Validate

- [ ] JSON parses
- [ ] Structure intact
- [ ] Behavior unchanged
- [ ] Diff is cosmetic only

**Deliverable:** One tool compiling from TypeScript.

---

## Phase 5: All Tools

Batch by type, same process.

| Batch | Tools | Count |
|-------|-------|-------|
| Core | float, float-sync, float-fix | 3 |
| Context | float-context, float-enhance, float-focus | 3 |
| Build | float-build, float-harvest, float-delta, float-relate | 4 |
| Orchestration | float-think, float-all | 2 |
| Utility | float-project, float-report, tool-sync | 3 |

**Process per batch:**
1. Create configs
2. Create templates
3. Build
4. Diff
5. Validate
6. Commit

**Deliverable:** 15 tools compiling from TypeScript.

---

## Phase 6: System Files

Templates for system.md and project.md.

```typescript
// src/system.template.ts

export const systemTemplate = (config: SystemConfig) => `<fp>
<json>
{
  "STOP": "FloatPrompt System Protocol...",
  "meta": {
    "title": "FloatPrompt System",
    "version": "${config.version}"
  },
  // ...
}
</json>
<md>
# FloatPrompt System
// ...
</md>
</fp>`;
```

**Deliverable:** system.md and project.md compile from source.

---

## Phase 7: Nav/Context Outputs

Templates for generated nav files.

### 7A: Map Template (FloatDoc)

```typescript
// src/outputs/map.template.ts

export const mapTemplate = (folder: FolderScan) => `---
title: ${folder.name}/
type: map
generated_by: /float-sync
ai_updated: ${today()}
---

# ${folder.name}/

${folder.description}

## Contents

| Item | Purpose |
|------|---------|
${folder.items.map(i => `| **${i.name}** | ${i.purpose} |`).join('\n')}
`;
```

### 7B: Context Template (FloatPrompt)

```typescript
// src/outputs/context.template.ts

export const contextTemplate = (folder: FolderContext) => `<fp>
<json>
{
  "STOP": "Deep context for ${folder.name}/",
  // ...
}
</json>
<md>
# ${folder.name}/ — Context

${folder.architecture}

${folder.relationships}
</md>
</fp>`;
```

**Deliverable:** Nav files can be regenerated from folder scans.

---

## Phase 8: Build CLI

Wire it all together.

```typescript
// src/build.ts

import { buildTool } from './lib/build-tool';
import { buildSystem } from './lib/build-system';
import { validateOutput } from './validate';

const tools = glob('src/tools/*.ts');

for (const tool of tools) {
  const output = buildTool(tool);
  validateOutput(output);
  write(`templates/.float/tools/${tool.id}.md`, output);
}

buildSystem();
```

### CLI Commands

```bash
npm run build              # Build all
npm run build:tools        # Tools only
npm run build:system       # System files only
npm run build:watch        # Watch mode
npm run validate           # Validate outputs
```

**Deliverable:** `npm run build` produces all `.md` files.

---

## Phase 9: Validation

Ensure outputs match schema.

```typescript
// src/validate.ts

import { z } from 'zod';

const FloatPromptSchema = z.object({
  STOP: z.string(),
  meta: z.object({
    title: z.string(),
    id: z.string(),
    format: z.literal('floatprompt'),
    version: z.string()
  }),
  human: z.object({
    author: z.string(),
    intent: z.string()
  }),
  ai: z.object({
    role: z.string()
  }),
  requirements: z.record(z.unknown())
});

export function validateOutput(content: string): boolean {
  const json = extractJson(content);
  FloatPromptSchema.parse(json);
  return true;
}
```

**Deliverable:** Build fails if output doesn't match schema.

---

## Summary

| Phase | What | Effort |
|-------|------|--------|
| 1 | Folder structure | 30 min |
| 2 | Schema definition | 1-2 hours |
| 3 | Partials | 1-2 hours |
| 4 | One tool proof | 1-2 hours |
| 5 | All tools | 3-4 hours |
| 6 | System files | 1 hour |
| 7 | Nav/context outputs | 1-2 hours |
| 8 | Build CLI | 1-2 hours |
| 9 | Validation | 1 hour |

**Total:** ~12-18 hours focused work

---

## Success Criteria

- [ ] All 15 tools compile from TypeScript
- [ ] system.md and project.md compile from TypeScript
- [ ] Nav files can regenerate from folder scans
- [ ] `npm run build` produces identical outputs
- [ ] Schema validation catches errors at build time
- [ ] No manual .md editing for standard changes

---

## Dependencies

```json
{
  "devDependencies": {
    "typescript": "^5.0.0",
    "tsx": "^4.0.0",
    "zod": "^3.0.0",
    "glob": "^10.0.0"
  }
}
```

Minimal. No Handlebars. No React. Just TypeScript.
