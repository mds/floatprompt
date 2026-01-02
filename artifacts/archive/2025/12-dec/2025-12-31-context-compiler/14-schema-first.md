---
title: Schema First
type: decision
created: 2025-12-31

human_author: @mds
human_intent: Define the order of work — schemas before templates

ai_model: Claude Opus 4.5
ai_notes: Critical sequencing decision for implementation
---

# Schema First

**Define shapes before building templates.**

---

## The Order

1. **Define atomic units** — Break floatprompt format into composable pieces
2. **Define schemas** — What's the shape of each piece
3. **Define partials** — Shared patterns that compose into templates
4. **Build** — Templates that use schemas + partials to produce .md

---

## Why Schema First

The schema IS the product. Templates are just mechanics.

- Schema defines what's valid
- Schema enables validation
- Schema documents the contract
- Schema is what users/AI rely on

Templates can change. Schema changes break things.

---

## What Needs Schema Definition

| Unit | Current State | Schema Defines |
|------|---------------|----------------|
| **Floatprompt wrapper** | `<fp><json><md>` | The envelope format |
| **system.md** | Exists, ad-hoc | Boot sequence, paths, version |
| **project.md** | Exists, ad-hoc | Project metadata, nav pointers |
| **Tool shape** | 16 tools, implicit patterns | STOP, meta, human, ai, requirements |
| **Nav folder** | Flat files (current) | Trifecta + extensions pattern |

---

## Atomic Units to Define

### Level 1: Wrapper
- `<fp>` — The floatprompt envelope
- `<json>` — Structured metadata
- `<md>` — Human-readable content

### Level 2: System
- `system.md` — Boot file, version, paths
- `project.md` — Project-level context

### Level 3: Navigation
- `map.md` — WHERE
- `decisions.md` — WHY
- `context.md` — WHAT
- `*.md` — Extensions

### Level 4: Tools
- Tool metadata (STOP, meta, human, ai)
- Tool requirements (patterns, buoys, reporting)
- Tool markdown (examples, tables)

### Level 5: Partials
- `duality` — run/check pattern
- `buoys` — parallel workers
- `reporting` — MDS logs
- `footer` — consistent ending
- `status_format` — JSON output shape

---

## Schema Definition Approach

**Option A: TypeScript Types**
```typescript
interface Tool {
  STOP: string
  meta: { id: string, version: string, type: ToolType }
  human: { author: string, intent: string }
  ai: { role: string, instructions: string[] }
  requirements: ToolRequirements
}
```

**Option B: JSON Schema**
```json
{
  "type": "object",
  "required": ["STOP", "meta", "human", "ai"],
  "properties": { ... }
}
```

**Option C: Zod (runtime + types)**
```typescript
const ToolSchema = z.object({
  STOP: z.string(),
  meta: z.object({ ... }),
  ...
})
```

**Leaning:** TypeScript types (Option A) with Zod for validation (Option C).

---

## Sequencing

### Phase 1: Analyze Current
- Read all 16 tools
- Extract common JSON shapes
- Identify variations
- Document implicit schema

### Phase 2: Define Core Schemas
- Floatprompt wrapper
- System schema
- Project schema
- Tool schema (base)

### Phase 3: Define Tool Variations
- Integrity tools (sync, fix, project)
- Context tools (context, focus, harvest)
- Build tools (build, enhance, relate)
- Orchestration tools (think, all)

### Phase 4: Define Partials
- Extract from schema patterns
- Create reusable functions
- Document partial interfaces

### Phase 5: Build Templates
- Use schemas as contracts
- Use partials as building blocks
- Produce .md files

---

## Validation

Schema enables validation:
- Build-time: TypeScript catches shape errors
- Runtime: Zod validates config files
- Output: Compiled .md matches expected structure

---

## Breadcrumb Note

This document captures the sequencing insight: **schema before templates**.

Future implementation should:
1. Analyze current files to discover implicit schema
2. Formalize schema as TypeScript types
3. Add runtime validation (Zod)
4. Build templates that conform to schema
5. Validate output matches schema

The schema is the contract. Everything else is implementation.
