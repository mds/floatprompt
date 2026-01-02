# System Decisions

Decisions made during context-compiler development. Living document.

**Note:** Newer decisions supersede older ones. Superseded decisions are ~~struck through~~ but kept for historical context.

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

### FloatDoc: Lightweight terrain awareness

**Decision:** FloatDoc is 8 required fields — 4 for terrain awareness, 4 for attribution.

**Design principles:**
1. Easily generated — half auto-injected by build system
2. Just enough context — one-liners, not paragraphs
3. Terrain awareness — AI reads frontmatter across files, builds mental map
4. Deep dive signal — enough info to know WHEN to read fully

**Schema:**
```yaml
# Terrain awareness (human-written)
title: API Auth Flow
type: context
status: current
description: JWT authentication, token refresh, error handling

# Attribution (auto-generated by build)
created: 2025-01-01
human_author: @mds
ai_model: Claude Opus 4.5
ai_updated: 2025-01-01
```

**Optional depth:** `human_context`, `ai_notes`, `related`

**Key insight:** `description` is the routing signal. AI reads it and decides "should I read the full file?" One line that summarizes what's inside.

**Difference from FloatPrompt:**
- FloatPrompt = behavioral (modifies AI behavior) → structured JSON
- FloatDoc = contextual (terrain awareness) → flat YAML frontmatter

---

### Code commenting pattern

**Decision:** All TypeScript files follow a consistent commenting structure.

**Pattern:**
```typescript
/**
 * Component Name
 * Format: what format/structure this defines
 * Use: when/why to use this
 *
 * Design principles:
 * 1. First principle
 * 2. Second principle
 * 3. Third principle
 * 4. Fourth principle
 */

export const Schema = z.object({
  // Section name (context about this group)
  field: z.string(),                     // what it is
  field: z.string(),                     // what it is

  // Section name (context about this group)
  field: z.string(),                     // what it is
});

// Type exports
export type X = z.infer<typeof Schema>;
```

**Rules:**
- Docblock at top with name, format, use, and 4 design principles
- Section comments group related fields
- Inline comments aligned at column 42
- Type exports grouped at end

**See:** `docs/sys/comments.md` for full documentation.

---

### ~~Partials: Shared content blocks~~ (SUPERSEDED)

> **Superseded by:** "Partials are ad-hoc, not core architecture" (below)

~~**Decision:** Five core partials generate both JSON and Markdown for system tools.~~

| ~~Partial~~ | ~~JSON Output~~ | ~~Markdown Output~~ |
|---------|-------------|-----------------|
| ~~`duality`~~ | ~~`{ condition_a, action_a, condition_b, action_b }`~~ | ~~`## Duality` table~~ |
| ~~`status`~~ | ~~`status_format` string~~ | ~~`## Status Output` section~~ |
| ~~`buoys`~~ | ~~`{ key: description }` object~~ | ~~`## Buoy Prompts` section~~ |
| ~~`examples`~~ | ~~(none — markdown only)~~ | ~~`## Examples` section~~ |
| ~~`footer`~~ | ~~(none — markdown only)~~ | ~~Footer with tagline~~ |

~~**Rationale:**~~
- ~~Single source of truth — define once, use in JSON and Markdown~~
- ~~Type-safe — TypeScript catches errors~~
- ~~Composable — tool configs import what they need~~
- ~~Testable — pure functions, easy to unit test~~

**Why superseded:** These patterns aren't universal. Duality, status, buoys are CLI-tool specific. YAGNI — add partials only when 3+ tools share identical content.

---

### No extra abstraction layer

**Decision:** Three layers are enough: Schema → Partials → Configs. No intermediate "theme" or "config" layer needed.

**Considered:**
- Adding a layer between schema and output for project-level config, themes, or generation preferences
- Per-file override configs for generated content

**Rejected because:**
- Web development precedents (Jekyll, Hugo, Tailwind, Next.js) all use the same pattern: flat config + partials + source files
- No major framework has an intermediate abstraction layer
- Tool configs already serve as the "data" layer that fills the schema
- Adding complexity without solving a real problem

**What we have (matches industry standard):**

| Layer | Purpose | Precedent |
|-------|---------|-----------|
| Schema (Zod) | Structure validation | Content models |
| Project config | Constants (author, version) | `tailwind.config.js`, `next.config.js` |
| Partials | Reusable formatting | `_includes/`, components |
| Tool configs | Per-file content | `pages/`, content files |
| Build output | Compiled result | `dist/`, `_site/`, `.next/` |

**For generated files (nav, context):**
- No per-file source needed
- Schema + template + folder scan = output
- Human additions (descriptions) persist in the generated file; regeneration merges/preserves

**Do not revisit.** Validated against Jekyll, Hugo, Tailwind, Next.js patterns.

---

### Pattern recognition over explicit memory

**Decision:** AI recognizes patterns rather than remembering explicit instructions. TypeScript enforces consistency at build time.

**The architecture:**
- **boot.md** = comprehensive brain (explains patterns once)
- **Tools** = simple, consistent structures (pattern recognition)
- **TypeScript** = the enforcer (partials ensure identical shape)
- **AI** = pattern recognizer (learns from one, applies everywhere)

**Why this works:**
- Context windows fill up, older content gets compressed
- But structure itself is a reminder (seeing `.float/project/nav/` reminds AI of nav files)
- Compiled consistency means AI doesn't need to "remember" — it recognizes
- Build system is the memory, not the AI's context

**Implication:** Tools don't need redundant explanations. boot.md explains conventions once; tools just instantiate them.

---

### Tools are mini FloatPrompts

**Decision:** Tools use FloatPrompt format but are much smaller and focused.

**Structure:**
```xml
<fp>
<json>
{
  "STOP": "Verify nav files match reality",
  "meta": { "id": "float-sync", "title": "/float-sync" },
  "triggers": ["nav out of sync", "after file changes"],
  "checks": ["nav coverage", "table accuracy"],
  "outputs": ["updated nav", "sync report"]
}
</json>
<md>
## Process
1. Scan folders
2. Compare to nav
3. Propose fixes
4. Apply with approval
</md>
</fp>
```

**What tools contain:**
- JSON: identity + routing (STOP, meta, triggers, checks, outputs)
- Markdown: just process steps (the one thing that needs prose)

**What tools DON'T contain (boot.md has these):**
- Duality table (boot.md explains the pattern)
- Examples (boot.md shows canonical examples)
- Buoy prompts (boot.md defines buoy patterns)
- Detailed behavioral instructions

**Rationale:**
- Same format = consistency
- Smaller = faster to read, less context
- Process steps need prose, everything else is structured
- Pattern recognition > explicit instructions per tool

---

### FloatPrompt tiers: Immutable format, emergent content

**Decision:** The format is immutable. The content is emergent based on usage. Three tiers provide guidelines, not strict requirements.

**Immutable (never changes):**
```xml
<fp>
<json>{ ... }</json>
<md>...</md>
</fp>
```
The wrapper is the format. That's it.

**Emergent (determined by usage):**

| Tier | Context | Typical Fields |
|------|---------|----------------|
| **Fullest** (Boot/Orchestrator) | Standalone, foundational | STOP, meta, human, ai, requirements, boot_sequence, principles |
| **Fuller** (Standalone tools) | No boot context, self-contained | STOP, meta, human, ai, process |
| **Minimal** (Chained tools) | Assumes boot context | id, triggers, checks, outputs |

**Examples:**

**Tier 1 — Fullest (boot.md):**
```json
{
  "STOP": "FloatPrompt System Protocol...",
  "meta": { "id": "float-system", "title": "FloatPrompt System" },
  "human": { "author": "@mds", "intent": "Boot protocol..." },
  "ai": { "role": "System navigator..." },
  "requirements": {
    "boot_sequence": ["Read float.md", "Read project.md", ...],
    "principles": { "pilot": "Human decides, AI executes" }
  }
}
```

**Tier 2 — Fuller (standalone tool):**
```json
{
  "STOP": "Portfolio coaching tool...",
  "meta": { "id": "portfolio-coach", "title": "Portfolio Coach" },
  "human": { "author": "@mds", "intent": "Guide portfolio creation" },
  "ai": { "role": "Creative coach" }
}
```

**Tier 3 — Minimal (chained tool):**
```json
{
  "id": "float-sync",
  "triggers": ["nav out of sync", "after file changes"],
  "checks": ["nav coverage", "table accuracy"],
  "outputs": ["updated nav", "sync report"]
}
```

**The principle:**
- Guidelines, not requirements
- Usage determines what fields you need
- Add fields as needed, don't include what you don't need
- AI learns the patterns, recognizes the tier

---

### Tools are minimal, no partials needed

**Decision:** Tools are minimal configs. No partials required.

**Before (each tool is self-contained):**
```typescript
// src/tools/float-sync.ts - ~150 lines
const duality: Duality = { ... }
const status: StatusOutput = { ... }
const buoys: BuoyDefinition[] = [ ... ]
const examples: Example[] = [ ... ]
// Generates ~300 line .md file
```

**After (minimal tool):**
```typescript
// src/tools/float-sync.ts - ~60 lines
export const json = {
  id: "float-sync",
  title: "/float sync",
  triggers: [...],
  checks: [...],
  outputs: [...],
};

export const markdown = `# /float sync
...process steps...
`;
```

**What goes in boot.md:**
- Pattern explanations (duality, buoys, etc.)
- Behavioral rules
- Boot sequence

**What goes in tools:**
- Routing info (triggers, checks, outputs)
- Process steps (markdown)

**Rationale:** Schema + Tool Config is sufficient. Partials are ad-hoc when 3+ tools share identical content.

---

### FloatPrompt required structure

**Decision:** Minimal required structure, everything else optional.

**Required (like `<html><head><title><body>`):**

```xml
<fp>
<json>
{
  "id": "thing-id",
  "title": "Thing Title"
}
</json>
<md>
Content here.
</md>
</fp>
```

- `<fp>` wrapper — always, even in files (like `<html>` in .html files)
- `id` — how code/AI references it
- `title` — what humans read
- `<json>` + `<md>` — always together

**Optional (add as needed):**

| Field | When to use |
|-------|-------------|
| `STOP` | Focus breaking (boot.md, standalone tools) |
| `meta.type` | When build needs to distinguish system/custom |
| `human` | Standalone tools, attribution needed |
| `ai` | When persona/role matters |
| `triggers`, `checks`, `outputs` | Tools (routing info) |
| `requirements` | Complex behavior |

**Rationale:** Like HTML — required structure is minimal, optional elements added based on what you're building.

---

### Partials are ad-hoc, not core architecture

**Decision:** No built-in partials. Add only when needed.

**Rationale:**
- Schema + Tool Config is sufficient
- Most patterns aren't universal (duality, status, buoys are CLI-tool specific)
- Other frameworks (Next.js, etc.) don't have speculative abstraction layers
- YAGNI — build when needed, not speculatively

**When to use partials:**
- 3+ tools share **identical** content
- Changing one should change all
- Content is mechanical, not creative

**When NOT to use:**
- Speculatively ("we might need this")
- For content that appears once

**Implementation:**
- `src/partials/` folder exists but is empty
- `README.md` documents the decision
- Add partials ad-hoc when repetition is found

---

## Execution Model

### AI orchestrates, code executes

**Decision:** AI (Claude Code) is the orchestrator. It delegates to TypeScript functions, CLI commands, and buoys (subagents) as needed. AI also does cognitive work (judgment, generation).

**The architecture:**
```
AI (orchestrator)
├── TypeScript functions — speed, predictability, mechanical work
├── CLI commands — system operations (git, shell)
├── Buoys (subagents) — parallel work, spawned for tasks
└── Own cognition — judgment, generation, decisions
```

| Mode | When to use | Example |
|------|-------------|---------|
| **TypeScript** | Mechanical, deterministic | Scan folders, parse frontmatter, write files |
| **CLI** | System operations | `git status`, file operations |
| **Buoys** | Parallel work | Check 10 nav files simultaneously |
| **Cognition** | Judgment, creativity | Generate descriptions, decide naming |

**The buoy principle:**
> Never do alone what 3-4 buoys can do together.

AI should parallelize whenever possible. Buoys are cheap — spawn many.

**Before (markdown-only):**
```
/float-sync → AI reads markdown → AI does everything alone → slow, serial
```

**After (AI orchestrates):**
```
/float-sync → AI reads boot.md → AI spawns buoys for parallel checks
           → AI calls TS functions for mechanical work
           → AI does cognitive work (descriptions, judgment)
           → AI writes results
```

**What this means for src/:**
```
src/
├── schema/          # Zod schemas (validation)
├── tools/           # TS functions AI can call
│   ├── scan.ts      # Scan folders (mechanical)
│   ├── parse.ts     # Parse frontmatter (mechanical)
│   ├── compare.ts   # Diff nav vs reality (mechanical)
│   └── write.ts     # Write files (mechanical)
├── cli/             # Entry points
│   └── index.ts     # float init, float sync
└── output/          # Markdown generators
    └── templates.ts # Produces .md files
```

**boot.md is the OS:**
- Teaches AI how to operate in `.float/`
- When to use TS vs CLI vs buoys vs cognition
- The "instruction manual" for the invisible OS

**Rationale:**
- AI understands context — knows when to use each tool
- Buoys enable parallelization — massive speedup
- TypeScript provides reliability — deterministic, testable
- AI cognition provides quality — descriptions, decisions
- Adaptability — AI can change approach mid-task

**Do not revisit.** AI orchestrates. Code/CLI/Buoys execute. AI also thinks.

---

### Agents build, local understands

**Decision:** Cloud agents build/maintain the system. Local Claude Code understands the system during human sessions.

**The separation:**

| Mode | Who | What |
|------|-----|------|
| **Cloud (agents)** | Automated agents in sandboxes | Build and maintain .float/ — sync, fix, context generation |
| **Local (session)** | Claude Code + human | Read maintained context, help human build |

**The invisible OS vision:**
```
Agents run continuously → .float/ stays fresh → context always current
Human opens session → Claude Code reads boot.md → instant understanding
Human builds → AI has full context → no re-explaining
```

**Tool design implications:**

| Principle | Why |
|-----------|-----|
| Small, focused, single-purpose | Agents are cheap, spawn many |
| Composable | Orchestrator combines granular tools |
| Stateless | No shared context between agents |
| Return structured data | Not prose — JSON for orchestration |

**Think cloud (unlimited agents), deploy local (sequential fallback):**
```typescript
// Works both ways
async function scanFolder(path: string): Promise<FolderScan> { ... }

// Local: sequential
for (const folder of folders) await scanFolder(folder);

// Cloud: parallel
await Promise.all(folders.map(f => sandbox.exec(() => scanFolder(f))));
```

**Do not revisit.** This shapes all tool design.

---

## Open Questions

### boot.md content

What does boot.md contain now that agents build and local understands?

- Orients Claude Code to read .float/ context
- Explains what agents have built/maintained
- Does NOT contain tool instructions (agents run tools, not Claude Code)
- Focus: "here's the context, here's how to navigate it"

### Vercel infrastructure

- Vercel AI SDK for structured AI calls?
- Vercel Sandbox for agent execution?
- Or provider-agnostic approach?

### Trigger mechanism

How do agents know when to run?

- Git webhooks (on push)?
- Scheduled (cron)?
- Manual (`float sync` CLI)?
- All of the above?
