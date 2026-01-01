# System Decisions

Decisions made during context-compiler development. Living document.

---

## For Future AI Sessions

**Update this file as you make decisions.** This is the paper trail.

When you lock a decision during a session:
1. Add a new `### Decision Name` section
2. Include: what was decided, alternatives considered, rationale
3. Use the format: Decision → Before/After (if applicable) → Rationale
4. Mark "Do not revisit" if the decision is final

This keeps context across sessions. The next Claude (or human) needs to know what's locked and why.

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

---

### Meta fields: id required, format/version removed

**Decision:** `meta` contains only `title` and `id`. No `format` or `version` per file.

**Before (AI-chat era):**
```json
"meta": {
  "title": "Float Sync",
  "id": "float-sync",
  "format": "floatprompt",
  "version": "0.17.0"
}
```

**After (build system era):**
```json
"meta": {
  "title": "Float Sync",
  "id": "float-sync"
}
```

**Rationale:**
- TypeScript files don't declare `format: typescript, version: 5.3`
- The build system knows what format it's building
- `package.json` owns versioning at the system level
- Individual files just need identity (title + id)

**Pattern:** System-level concerns stay at system level. Files contain only what's unique to them.

---

### Requirements stays loose

**Decision:** `requirements` is `Record<string, unknown>` — intentionally unstructured.

**Rationale:**
- FloatPrompt provides just enough structure for predictability (STOP, meta, human, ai)
- `requirements` is the AI's playground for emergent, tool-specific behavior
- Each tool invents what it needs — no shared schema enforced
- Structure where it matters, freedom where creativity lives

---

### AI section: just `role`

**Decision:** `ai` contains only `role`. All other behavioral fields go in `requirements`.

**Before (inconsistent):**
```json
"ai": {
  "role": "Navigator",
  "behavior": "Read structure first...",
  "tone": "Warm and direct",
  "pacing": "Progressive"
}
```

**After (clean separation):**
```json
"ai": {
  "role": "Navigator"
},
"requirements": {
  "behavior": "Read structure first...",
  "tone": "Warm and direct"
}
```

**Rationale:**
- `role` is the only field that appears consistently across all tools
- `behavior` and `requirements` overlap — both are instructions
- One identity field (`role`), one instructions bucket (`requirements`)
- No ambiguity about where things go
- Existing tools with `ai.behavior` migrate during build

**The clean separation:**
| Section | Purpose |
|---------|---------|
| `STOP` | Mode directive |
| `meta` | Identity (title, id) |
| `human` | Ownership (author, intent) |
| `ai` | Persona (role) |
| `requirements` | Everything else |

---

### Meta type: "system" vs "custom"

**Decision:** `meta.type` determines markdown structure validation.

```typescript
meta: {
  title: string,
  id: string,
  type: "system" | "custom",
}
```

**System type** (strict markdown):
- Required sections: Duality, Status Output, Examples
- Common sections: Process, Next Step Logic, Buoy Prompts
- Used for: `.float/tools/*`, boot files, infrastructure

**Custom type** (flexible markdown):
- Suggested sections: Quick Start, Goals, Context, Output, Warnings
- Not enforced — tools can have Phases, Frameworks, anything
- Used for: User tools, coaching tools, creative methodologies

**Rationale:**
- Validation of system tools showed consistent pattern (Duality table, Status Output, etc.)
- Custom tools vary wildly — Portfolio Coach has phases, Script Writer has frameworks
- Build system enforces structure for system tools, allows creativity for custom tools
- One schema, two validation modes

---

## Open Questions

- Partial breakdown (what's shared vs per-file)
- boot.md content (the actual instructions)
