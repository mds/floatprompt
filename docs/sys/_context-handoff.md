<fp>
<json>
{
  "STOP": "Context Handoff. Read this first to pick up context-compiler work.",

  "meta": {
    "title": "Context Handoff",
    "id": "context-handoff"
  },

  "human": {
    "author": "@mds",
    "intent": "Enable new AI sessions to pick up context-compiler work",
    "context": "Updated 2026-01-02 after partials decision"
  },

  "ai": {
    "role": "Session bootstrapper",
    "behavior": "Read files in order, understand architecture, continue from where we left off"
  },

  "requirements": {
    "reading_order": [
      "1. This file (orientation)",
      "2. docs/sys/overview.md (how FloatPrompt works, buoys)",
      "3. docs/sys/decisions.md (ALL architecture decisions)",
      "4. docs/sys/problem.md (what we're solving)",
      "5. Look at src/ folder structure"
    ],
    "do_not_read_unless_needed": [
      "artifacts/2025-12-31-context-compiler/*.md (outdated breadcrumbs)"
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

## Current State (2026-01-02)

**Folder structure:**
```
src/
├── schema/        # Zod schemas (minimal required + optional fields)
│   ├── floatprompt.ts
│   ├── floatdoc.ts
│   └── index.ts
├── partials/      # EMPTY — ad-hoc only, see README.md
│   ├── README.md  # Documents when to use/not use
│   └── index.ts   # Empty
├── tools/         # Tool configs (one exists as example)
│   └── float-sync.ts
├── static/        # Files copied as-is (boot.md will go here)
└── cli/           # CLI code (future)
```

**Schema (locked):**
- Required: `id`, `title` only
- Optional: `STOP`, `type`, `human`, `ai`, `triggers`, `checks`, `outputs`, `requirements`
- Like HTML: required structure minimal, everything else optional

**Partials (decision locked):**
- Ad-hoc, not core architecture
- Currently empty — Schema + Tool Config is sufficient
- Add partials only when 3+ tools share identical content

**Tool pattern:**
```typescript
import type { FloatPromptJson } from "../schema/floatprompt";

export const json: FloatPromptJson = {
  id: "float-sync",
  title: "/float sync",
  triggers: [...],
  checks: [...],
  outputs: [...],
};

export const markdown = `# /float sync
...process steps...
`;

export const compile = () => `<fp><json>...</json><md>...</md></fp>`;
```

## Key Decisions (docs/sys/decisions.md)

| Decision | Summary |
|----------|---------|
| src/ → dist/ | Conventional pattern, templates/ becomes output |
| npm = install only | AI orchestrates everything else |
| boot.md | Renamed from system.md, THE instruction file |
| TypeScript native | No Handlebars, no React |
| Zod for schemas | Types + validation |
| Required structure | `id` + `title` only, everything else optional |
| Three tiers | Fullest/Fuller/Minimal (guidelines, not requirements) |
| STOP optional | For focus breaking; chained tools inherit from boot.md |
| Partials ad-hoc | No built-in partials; add when 3+ tools share content |

## Open Questions

- **boot.md content** — THE ultimate FloatPrompt that orients AI to the .float/ system
- **Buoys** — Claude Code agents branded as "buoys" in FloatPrompt. Not yet fully defined.
- **TypeScript tools** — Which tools should be actual TS functions vs markdown instructions?
- **AI execution model** — AI can use TS functions, CLI, AND spawn buoys. "Never do alone what 3-4 buoys can do together."

## What's Next

1. Decide boot.md content and structure
2. Build script to compile tools → markdown
3. Migrate remaining tools to src/tools/
4. Create src/static/boot.md

## What's Outdated

- `artifacts/2025-12-31-context-compiler/*.md` — Breadcrumbs from early planning
- Any reference to partials like duality, status, buoys, examples, footer — deleted

## The Big Picture

**AI orchestrates. Code executes. .md is the interface.**

```
npm float install → .float/ appears
/float → AI reads boot.md → AI orchestrates → code executes → .md files → AI reads
```

---

*Updated 2026-01-02 — after partials decision*
</md>
</fp>
