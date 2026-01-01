---
title: TypeScript Direction
type: decision
created: 2025-12-31
status: leaning (not locked)

human_author: @mds
human_intent: Lock the technology lean and sketch the shape for future implementation
human_context: All documents in this artifact are breadcrumbs — captures of thinking, not specs

ai_model: Claude Opus 4.5
ai_updated: 2025-12-31
ai_notes: This resolves the Handlebars vs TypeScript question from earlier docs
---

# TypeScript Direction

**Status:** Leaning, not locked.

**Note:** All documents in this artifact folder are breadcrumbs — captures of ideas and thinking as they evolved. They are not specifications. Future implementation should use these as context, not as contracts.

---

## The Evolution

| Document | Position | Thinking |
|----------|----------|----------|
| `03-technology.md` | Handlebars, locked | Simple, partials work, React-portable |
| `08-technology-reassessment.md` | TypeScript probably better | No new syntax, type safety, same language as CLI |
| `09-strategic-framing.md` | Use TypeScript | Build system is invisible, use what you maintain |

The lean shifted as the strategic framing clarified: **users never see the build system**. Technology choice is about maintainer experience, not user experience.

---

## Why TypeScript Native

The key insight from `08-technology-reassessment.md`:

> Partials are just functions. No engine overhead. No new syntax.

| Handlebars | TypeScript |
|------------|------------|
| `{{> duality run="..." check="..."}}` | `partial.duality({ run: "...", check: "..." })` |
| `{{#each items}}...{{/each}}` | `items.map(item => ...)` |
| `{{#if x}}...{{/if}}` | `x && ...` or `x ? ... : ...` |
| Learn new syntax | Already know it |
| No type safety | Full type safety |
| Handlebars runtime | Just functions |

**Same power, less complexity, better tooling.**

---

## The Shape (Sketch)

Not a spec. Just enough to see the direction.

### Config stays JSON

```json
// system.json
{
  "version": "0.18.0",
  "author": "@mds",
  "paths": { ... }
}

// float-sync.tool.json
{
  "name": "float-sync",
  "purpose": "Verify nav files match folders",
  "patterns": { "duality": true, "buoys": true }
}
```

### Templates become TypeScript

```typescript
// float-sync.tool.ts
import { tool, partial } from './lib'
import system from './system.json'
import config from './float-sync.tool.json'

export default tool({
  ...config,

  json: {
    STOP: config.purpose,
    meta: { ...system.meta, id: config.name },
    requirements: {
      ...partial.duality(config.patterns.duality),
      ...partial.reporting(config.patterns.reporting),
    }
  },

  markdown: md`
# ${config.name}

${partial.dualityTable(config.patterns.duality)}

${partial.footer(system)}
  `
})
```

### Partials are functions

```typescript
// partials/duality.ts
export function duality({ run, check }) {
  return {
    duality: {
      pattern: "Run mode executes, Check mode reports",
      run,
      check,
      default: "check"
    }
  }
}

export function dualityTable({ run, check }) {
  return `| Mode | Behavior |
|------|----------|
| Run | ${run} |
| Check | ${check} |`
}
```

### Build is trivial

```typescript
// build.ts
const tools = await glob('src/tools/*.tool.ts')
for (const tool of tools) {
  const { default: config } = await import(tool)
  const output = renderTool(config)
  await writeFile(`dist/.float/tools/${config.name}.md`, output)
}
```

---

## What's Still Open

These are implementation decisions, not strategic:

- Exact config schema shape
- Build tooling (esbuild? tsx? ts-node?)
- How to handle the `md` tagged template literal
- Partial organization
- Validation approach

Future implementation will figure these out. The direction is set.

---

## What This Enables

Same as before, just with TypeScript:

1. Version in one place → flows to all tools
2. Path change → one edit, rebuild
3. Pattern update → one function, all tools updated
4. New tool → config + template, done
5. Type errors caught at build time

---

## The Lean

**TypeScript native.**

Not locked until implementation proves it works. But this is the direction.

If implementation hits blockers, Handlebars remains a fallback — the examples in this artifact still work.

---

## Breadcrumb Note

This document, like all others in this artifact, captures thinking at a point in time. It's context for future implementation, not a contract. The implementer (human or AI) should:

1. Read these breadcrumbs for context
2. Make implementation decisions as needed
3. Update or supersede documents as things evolve

The artifact is archaeology of thinking, not architecture of building.
