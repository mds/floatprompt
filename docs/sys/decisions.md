# System Decisions

Decisions made during context-compiler development. Living document.

---

## Architecture

### src/ → dist/ (conventional)

**Decision:** All source lives in `src/`, all output goes to `dist/`.

```
src/
├── schema/             # TypeScript interfaces
│   ├── floatprompt.ts  # <fp><json><md> tool format
│   ├── floatdoc.ts     # YAML frontmatter doc format
│   └── index.ts        # Export all
│
├── partials/           # Template literal functions
│   ├── duality.ts
│   ├── status.ts
│   ├── buoys.ts
│   ├── footer.ts
│   └── index.ts
│
├── tools/              # Tool source configs
│   ├── float.ts
│   ├── float-sync.ts
│   └── ...
│
├── static/             # Copied as-is to dist/
│   ├── boot.md         # AI boot instructions
│   └── project/        # Scaffolded project structure
│
├── cli/                # CLI code
│   └── index.ts
│
└── build.ts            # Compile src/ → dist/

dist/                   # Build output (never edit)
├── cli/                # Compiled CLI (JS)
└── templates/
    └── .float/
        ├── boot.md         # ← copied from src/static/
        ├── tools/*.md      # ← compiled from src/tools/
        └── project/        # ← copied from src/static/
```

**Rationale:** This is how Next.js, React, and every TypeScript npm package works. Clean mental model: edit src/, build outputs.

**Implication:** Current `templates/` folder becomes `dist/templates/` (output, not source).

---

### npm = install only, AI = orchestrator

**Decision:** `npm float install` creates .float/. Everything else is AI-driven via /float commands.

**Rationale:**
- AI reads boot.md, makes decisions, delegates to code
- Code (TypeScript functions) executes mechanical work
- .md files are the interface between code and AI

**The flow:**
```
npm float install → .float/ appears
/float → AI reads boot.md → AI orchestrates → code executes → .md files → AI reads
```

---

### boot.md (not system.md)

**Decision:** Rename system.md to boot.md. It's THE instruction file for AI.

**Contains:**
- Orientation sequence (what to read first)
- Deep dive triggers (when to read context)
- Delegation rules (what AI does vs what code does)
- Buoy patterns (when/how to spawn)

**Rationale:** "boot" is clearer than "system". It's the boot sequence for AI understanding.

---

## Technology

### TypeScript native (no Handlebars, no React)

**Decision:** Use TypeScript template literals for all templating.

**Rationale:**
- Template literals are native, typed, IDE-supported
- No new syntax to learn
- Zero dependencies for templating
- Same language as CLI

---

### Zod for schemas

**Decision:** Use Zod for schema definitions (not just TypeScript interfaces).

**Rationale:**
- Industry standard for AI tooling (Vercel AI SDK uses it)
- Runtime validation (AI-generated content needs checking)
- Single source of truth (types + validation in one place)
- Infer TypeScript types from schema (`z.infer<typeof Schema>`)

**Pattern:**
```typescript
const FloatPromptSchema = z.object({
  STOP: z.string(),
  meta: z.object({ ... }),
  // ...
})

type FloatPrompt = z.infer<typeof FloatPromptSchema>
```

---

### Two formats: FloatPrompt + FloatDoc

**Decision:** Two distinct schemas.

| Format | Structure | Use |
|--------|-----------|-----|
| FloatPrompt | `<fp><json><md></fp>` | Tools (behavior) |
| FloatDoc | YAML frontmatter + markdown | Maps, context, docs |

---

### Schema → Partials → Configs (layer separation)

**Decision:** Three distinct layers, each with single responsibility.

| Layer | What It Defines | Example |
|-------|-----------------|---------|
| Schema | File structure contract (Zod) | "FloatPrompt has STOP, meta, human, ai, requirements" |
| Partials | Reusable content blocks (functions) | "Duality table looks like this..." |
| Configs | Tool-specific values | "float-sync has STOP='Verify nav files...'" |

**Rationale:**
- Schema = types + validation (Zod)
- Partials = pure functions → strings (template literals)
- Configs = typed objects that conform to schema

---

## Open Questions

- Partial breakdown (what's shared vs per-file)
- boot.md content (the actual instructions)
