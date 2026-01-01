<fp>
<json>
{
  "STOP": "Context Handoff. Read this first to pick up context-compiler work.",

  "meta": {
    "title": "Context Handoff",
    "id": "context-handoff",
    "format": "floatprompt",
    "version": "0.1.0"
  },

  "human": {
    "author": "@mds",
    "intent": "Enable new AI sessions to pick up context-compiler work",
    "context": "Created 2026-01-01 at end of deep planning session"
  },

  "ai": {
    "role": "Session bootstrapper",
    "behavior": "Read files in order, understand architecture, continue implementation"
  },

  "requirements": {
    "reading_order": [
      "1. This file (orientation)",
      "2. docs/sys/decisions.md (current architecture)",
      "3. artifacts/2025-12-31-context-compiler/map.md (strategic overview)",
      "4. artifacts/2025-12-31-context-compiler/decisions.md (locked tech decisions)",
      "5. Look at src/ folder structure (where we are)"
    ],
    "do_not_read_unless_needed": [
      "artifacts/2025-12-31-context-compiler/20-implementation-plan.md (partially outdated)",
      "artifacts/2025-12-31-context-compiler/*.md (breadcrumbs, not specs)"
    ],
    "session_protocol": [
      "Update docs/sys/decisions.md as you make decisions",
      "This is the paper trail for cross-session consistency",
      "See 'For Future AI Sessions' section in decisions.md for format"
    ]
  }
}
</json>
<md>
# Context Handoff

**Read this first to pick up context-compiler work.**

## What We're Building

FloatPrompt is a **context compilation pipeline**:

```
src/ (TypeScript) → build → dist/templates/.float/ → npm float install → user project
```

The `.md` files are build artifacts. Users see markdown. We maintain TypeScript.

## Current State

**Folder structure created:**
```
src/
├── schema/        # Zod schemas (FloatPrompt, FloatDoc)
├── partials/      # Template literal functions
├── tools/         # Tool configs
├── static/        # Files copied as-is (boot.md)
└── cli/           # CLI code
```

**Next step:** Create Zod schemas from existing specs.

## Key Decisions (docs/sys/decisions.md)

| Decision | Summary |
|----------|---------|
| src/ → dist/ | Conventional pattern, templates/ becomes output |
| npm = install only | AI orchestrates everything else |
| boot.md | Renamed from system.md, THE instruction file |
| TypeScript native | No Handlebars, no React |
| Zod for schemas | Types + validation, Vercel AI SDK pattern |
| Schema → Partials → Configs | Three-layer separation |

## Reading Order

1. **docs/sys/decisions.md** — Current architecture (FRESHEST)
2. **artifacts/2025-12-31-context-compiler/map.md** — Strategic orientation
3. **artifacts/2025-12-31-context-compiler/decisions.md** — Locked tech decisions
4. **docs/specs/floatprompt.md** — FloatPrompt format spec
5. **docs/specs/float-doc.md** — FloatDoc format spec

## What's Outdated

- `20-implementation-plan.md` — Uses old folder structure, pre-Zod decision
- Numbered docs in context-compiler — Breadcrumbs, not specs

## Next Actions

1. Create `src/schema/floatprompt.ts` (Zod schema from spec)
2. Create `src/schema/floatdoc.ts` (Zod schema from spec)
3. Look at one real tool to understand partials needed
4. Build from there

## The Big Picture

**AI orchestrates. Code executes. .md is the interface.**

```
npm float install → .float/ appears
/float → AI reads boot.md → AI orchestrates → code executes → .md files → AI reads
```

---

*Created 2026-01-01 — end of deep planning session*
</md>
</fp>
