---
title: Float Context Specification
type: spec
status: draft
created: 2025-12-29

human_author: MDS
human_intent: Specify auto-generated context file for AI terrain mapping
human_context: Companion to nav/*.md — structure vs understanding

ai_model: Claude Opus 4.5
ai_updated: 2025-12-29
ai_notes: |
  Updated to v0.7.0 structure with _float/context/ and _float/tools/ subfolders.
  Context Buoy generates terrain map during /float or /float sync.
  Default filename is project.md but emergent naming allowed.
---

# Float Context Specification

**Auto-generated terrain map for AI understanding.** Complements nav/*.md structure with meaning, relationships, and reading order.

---

## The Gap

| File | Purpose | Answers |
|------|---------|---------|
| `_float/system.md` | Boot protocol | How should I behave? |
| `_float/nav/*.md` | Structure | What exists? |
| `_float/context/project.md` | Understanding | Why does it exist? How does it connect? |
| `_float/logs/*.md` | State | What happened recently? |

**nav/*.md** = Index (files and folders)
**context/project.md** = Terrain map (meaning and relationships)

Without context, AI knows the structure but not the story.

---

## Philosophy

### Emergent, Not Prescribed

The Context Buoy discovers what matters. Different repositories have different shapes:

- A library might emphasize: API surface, examples, migration paths
- A product might emphasize: features, user flows, architecture
- A content repo might emphasize: categories, reading order, key pieces

The format adapts to what the buoy finds.

### Auto-Generated, Human-Refinable

**Default:** Context Buoy generates `context/project.md` automatically during `/float` or `/float sync`

**Optional:** Human can instruct AI to:
- Go deeper on specific areas
- Add custom sections
- Create specialized context for different audiences (new contributors, maintainers, etc.)

### Organized for Growth

Lives at `_float/context/project.md`. Default is one file for the whole project.

For larger projects, additional domain-specific context files can be added as siblings:
- `_float/context/frontend.md`
- `_float/context/api.md`
- `_float/context/infrastructure.md`

---

## File Location

```
_float/
├── system.md      # Boot protocol
├── context/       # Terrain maps
│   └── project.md # Project-wide context (default)
├── tools/         # System tools
│   └── context-creator.md
├── nav/           # Structure indexes
│   ├── root.md
│   ├── docs.md
│   └── ...
└── logs/          # Session history
    └── YYYY-MM-DD.md
```

---

## Context Buoy

A buoy type that generates `_float/context/project.md` using `_float/tools/context-creator.md`.

### When It Runs

| Trigger | Behavior |
|---------|----------|
| `/float` (init) | Generate initial project.md for new FloatPrompt System |
| `/float` (boot) | Check if project.md exists, generate if missing |
| `/float sync` | Regenerate project.md if structure changed significantly |
| Human request | "Update context" or "Go deeper on X" |

### What It Does

1. **Scan** — Read all nav/*.md files and key project files
2. **Discover** — Identify patterns, relationships, reading order
3. **Generate** — Write emergent context/project.md (or choose better name if project suggests one)
4. **Report** — Show what was discovered

### Buoy Prompt

```
Generate _float/context/project.md for this project:

1. Read _float/system.md and all _float/nav/*.md files
2. Read _float/tools/context-creator.md for generation protocol
3. Identify key files that define the project (README, main entry points, core docs)
4. Discover relationships between folders/files
5. Determine optimal reading order for new AI sessions
6. Note any patterns, conventions, or important context

Output format is emergent — let the project shape the content.
Filename is 'project.md' by default, but choose better name if project suggests one.

Include at minimum:
- What this project IS (one paragraph)
- Key files and why they matter
- Reading order for AI onboarding
- Domain relationships

Mark anything uncertain with TODO.
```

---

## File Format

### Frontmatter

```yaml
---
title: Project Context
type: context
generated: YYYY-MM-DD HH:MM
generator: context-buoy

human_refinements: |
  (Optional) Human additions or corrections
---
```

### Content Structure (Emergent)

The Context Buoy generates sections based on what it discovers. Common patterns:

```markdown
# {Project Name} Context

{One paragraph: what this project IS}

## Key Files

| File | Why It Matters |
|------|----------------|
| `path/to/file` | {significance} |

## Reading Order

For new AI sessions, read in this order:

1. `_float/system.md` — Boot protocol
2. `{key file}` — {why first}
3. `{key file}` — {why second}
...

## Domain Map

{How folders/concepts relate to each other}

## Patterns

{Conventions, naming, architecture patterns discovered}

## {Emergent Section}

{Whatever else the buoy discovers that matters}
```

### What NOT to Include

- File lists (that's nav/*.md's job)
- Exhaustive documentation
- Implementation details
- Anything that duplicates nav/*.md

**context.md is a map, not an atlas.**

---

## Boot Sequence Update

With context, the boot sequence becomes:

```
1. Read _float/system.md              → Protocol
2. Read _float/context/project.md     → Understanding
3. Read _float/nav/*.md               → Structure
4. Read _float/logs/today.md          → State
5. Build mental model
6. Execute human requests
```

Context before structure. Understand the terrain before indexing the files.

---

## Integration with /float Commands

### /float (Boot)

```
FloatPrompt operational.
Directory: /path/to/project
Context: Loaded (generated 2025-12-29)
Status: No issues found
Ready for: [human direction]
```

If context is missing:

```
FloatPrompt operational.
Directory: /path/to/project
Context: None (generating...)
  → Context Buoy: Scanning project...
  → Context Buoy: Generated _float/context/project.md
Status: No issues found
Ready for: [human direction]
```

### /float sync

Context Buoy runs alongside Check Buoys:

```
Spawning fleet (9 buoys)...
  → Context Buoy: Updating _float/context/project.md
  → Check Buoy: nav/root.md vs /
  → Check Buoy: nav/docs.md vs docs/
  ...
```

---

## Human Refinement

Humans can add to or refine context:

### Adding Custom Context

```
> "Add context about the plugin architecture"
```

AI updates context with new section, preserving existing content.

### Going Deeper

```
> "Create a deep dive context for the core/ folder"
```

AI generates more detailed context for specific area.

### Multiple Audiences

```
> "Add a section for new contributors"
```

AI adds audience-specific guidance.

### Protecting Human Additions

Human refinements are tracked in frontmatter:

```yaml
human_refinements: |
  Added plugin architecture section (2025-12-29)
  Expanded reading order with rationale
```

Context Buoy preserves sections marked as human-added during regeneration.

---

## Future Considerations

### Context Diffs

Track what changed between context generations:

```
Context updated:
  + New section: API v2 migration
  ~ Modified: Reading order (added new entry point)
  - Removed: Deprecated patterns
```

---

## Example Output

For the FloatPrompt repository itself:

```markdown
---
title: FloatPrompt Context
type: context
generated: 2025-12-29 14:30
generator: context-buoy
---

# FloatPrompt Context

FloatPrompt is the invisible OS for AI — a structured text format for portable AI collaboration. Three components: floatprompt doc (YAML frontmatter for context), FloatPrompt (tools that modify AI behavior), and FloatPrompt System (_float/ folders for project awareness).

## Key Files

| File | Why It Matters |
|------|----------------|
| `_float/system.md` | Boot protocol — read first, always |
| `core/os.md` | Full FloatPrompt OS (35KB) — the complete system |
| `core/prompt.md` | Template for creating tools |
| `docs/philosophy/manifesto.md` | The "why" — vision and principles |
| `context/float-deepdive.md` | How to build full understanding |

## Reading Order

For new AI sessions:

1. `_float/system.md` — Boot protocol, structure map
2. `_float/nav/*.md` — All navigation files
3. `docs/goals.md` + `docs/principles.md` — Goal hierarchy and constraints
4. `context/float-context.md` — Three-component distinction
5. `core/prompt.md` — The template
6. One example from `examples/` — See theory in practice

## Domain Map

```
Philosophy (why)     → docs/philosophy/, docs/goals.md, docs/principles.md
Format (what)        → docs/floatprompt.md, docs/doc.md, docs/system.md
Templates (how)      → core/prompt.md, core/doc.md, core/os.md
Examples (proof)     → examples/*/
System (meta)        → _float/
```

## Patterns

- **Goal hierarchy is strict**: Voice > Behavior > Artifacts
- **Depth scales with complexity**: Simple tools are surgical, complex tools guide through phases
- **MDS methodology**: Map → Decide → Structure → Loop
- **Voice preservation**: First, do not rewrite

## Historical Note

The `artifacts/2025/` folder contains 150+ files documenting evolution. Current specs live in `docs/`. Artifacts are archaeology.
```

---

## Summary

| Aspect | Decision |
|--------|----------|
| Location | `_float/context/project.md` |
| Tool | `_float/tools/context-creator.md` |
| Generation | Context Buoy (auto) |
| Format | Emergent based on discovery |
| Naming | `project.md` default, emergent allowed |
| Scope | Project-wide, domain files as siblings |
| Human input | Optional refinement and direction |
| Boot order | After system.md, before nav/*.md |

**context gives AI the story, not just the structure.**

---

Created by @mds and Claude Opus 4.5
