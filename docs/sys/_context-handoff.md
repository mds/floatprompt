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

**Folder structure:**
```
src/
├── schema/        # ✅ Zod schemas (minimal required + optional fields)
├── partials/      # ✅ Template functions (footer for tools, rest for boot.md)
│   ├── footer.ts     # Used by tools
│   ├── duality.ts, status.ts, buoys.ts, examples.ts  # For boot.md
│   └── index.ts
├── tools/         # ✅ Minimal tool configs
│   └── float-sync.ts  # ~70 lines, minimal structure
├── static/        # Files copied as-is (boot.md)
└── cli/           # CLI code
```

**Schema simplified (2026-01-01):**
- Required: `id`, `title` only
- Optional: `STOP`, `type`, `human`, `ai`, `triggers`, `checks`, `outputs`, `requirements`
- Like HTML: required structure minimal, everything else optional elements

**Partials separated:**
- `footer` — used by tools (branding)
- `duality`, `status`, `buoys`, `examples` — for boot.md (patterns explained once)

**Minimal tool pattern:**
```typescript
export const json = {
  id: "float-sync",
  title: "/float sync",
  triggers: [...],
  checks: [...],
  outputs: [...],
};
// + markdown with process steps
```

**Next step:** Build script to compile tools → markdown.

## Key Decisions (docs/sys/decisions.md)

| Decision | Summary |
|----------|---------|
| src/ → dist/ | Conventional pattern, templates/ becomes output |
| npm = install only | AI orchestrates everything else |
| boot.md | Renamed from system.md, THE instruction file |
| TypeScript native | No Handlebars, no React |
| Zod for schemas | Types + validation, Vercel AI SDK pattern |
| Required structure | `id` + `title` only, everything else optional |
| Three tiers | Fullest/Fuller/Minimal (guidelines, not requirements) |
| STOP optional | For focus breaking; chained tools inherit from boot.md |
| Partials separation | footer for tools, rest for boot.md |
| FloatDoc: 8 fields | 4 terrain + 4 attribution, description is routing signal |

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

1. ~~Create `src/schema/floatprompt.ts`~~ ✅ Done
2. ~~Create `src/schema/floatdoc.ts`~~ ✅ Done
3. ~~Look at real system tools (`.float/tools/*.md`) to extract partials~~ ✅ Done
4. ~~Create partials: duality, status, examples, buoys, footer~~ ✅ Done
5. ~~Create one tool config (`src/tools/float-sync.ts`) using partials~~ ✅ Done
6. Build script to compile tools → markdown
7. Migrate remaining tools to src/tools/
8. Create src/static/boot.md (the AI instruction file)

## The Big Picture

**AI orchestrates. Code executes. .md is the interface.**

```
npm float install → .float/ appears
/float → AI reads boot.md → AI orchestrates → code executes → .md files → AI reads
```

---

*Created 2026-01-01 — updated after required structure decisions*
</md>
</fp>
