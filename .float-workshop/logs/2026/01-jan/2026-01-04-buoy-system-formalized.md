# Buoy System Formalized in TypeScript

**Date:** 2026-01-04
**Status:** Locked
**Session:** 14

---

## Decision

Formalize the buoy system in TypeScript with:
- Zod schemas matching the locked buoy spec from `docs/buoys.md`
- FloatPrompt format parser for `<fp><json>...<md>...</fp>`
- Registry for buoy discovery and loading
- Dispatch function for building prompts
- CLI commands for buoy management

Move buoy templates from `.float-workshop/buoys/` to `src/buoys/templates/` (production location).

---

## Rationale

1. **Test 2A validated** — Generated context works. Now need infrastructure to scale.
2. **Tests 3-5 require buoys** — Staleness detection, scope detection, parallel spawning all need the buoy system.
3. **TypeScript enables tooling** — CLI commands, validation, dispatch all benefit from types.
4. **Production location** — Buoys are code, not workshop artifacts.

---

## What Was Built

```
src/buoys/
├── schema.ts      # Zod schemas for buoy JSON structure
├── parser.ts      # FloatPrompt format parser
├── registry.ts    # Buoy discovery and loading
├── dispatch.ts    # Prompt building for buoy execution
├── index.ts       # Public API exports
└── templates/
    ├── context-generator.md   # Generator buoy (moved)
    └── staleness-checker.md   # Validator buoy (NEW)
```

### CLI Commands Added

- `float-db buoy list` — List available buoys with metadata
- `float-db buoy parse <file>` — Validate a buoy file
- `float-db buoy prompt <id> --data '{}'` — Build prompt for testing

---

## Key Types

```typescript
type BuoyArchetype = "generator" | "validator" | "fixer" | "mapper" |
                     "integrator" | "orchestrator" | "recorder";

type ContextDepth = "none" | "self_only" | "parent_only" | "scope_chain" | "full";

interface BuoyJson {
  meta: { id, title, type, version };
  ai: { role, archetype, sub_archetype, autonomy };
  input: { receives: string[], defaults: { context_depth } };
  output: { produces: string[] };
}

interface BuoyTemplate {
  json: BuoyJson;
  markdown: string;
  sourcePath: string;
}
```

---

## Files Changed

- Created: `src/buoys/schema.ts`
- Created: `src/buoys/parser.ts`
- Created: `src/buoys/registry.ts`
- Created: `src/buoys/dispatch.ts`
- Created: `src/buoys/index.ts`
- Created: `src/buoys/templates/staleness-checker.md`
- Moved: `.float-workshop/buoys/context-generator.md` → `src/buoys/templates/context-generator.md`
- Updated: `src/cli/float-db.ts` (added buoy commands)

---

## Future Agent

**Work type:** Infrastructure implementation
**Suggested agent:** N/A (human-driven design session)

---

*Buoy system infrastructure now enables Tests 3-5 and fleet mode design.*
