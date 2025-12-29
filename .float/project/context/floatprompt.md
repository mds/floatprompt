---
title: FloatPrompt Context
type: context
generated: 2025-12-29 15:00
generator: context-creator
renamed: 2025-12-29

human_refinements: |
  (none yet)
---

# FloatPrompt

FloatPrompt is the invisible OS for AI — a structured text format for portable AI collaboration. Three components work together: **floatprompt doc** (YAML frontmatter for document context), **FloatPrompt** (tools that modify AI behavior via `<fp>` tags), and **FloatPrompt System** (`.float/` folders for project-wide awareness). The goal: preserve human voice and intelligence while enabling reliable AI collaboration across any platform.

## Key Files

| File | Why It Matters |
|------|----------------|
| `.float/system.md` | Boot protocol — read first, always. Defines all conventions. |
| `.float/project/context/floatprompt.md` | This file — terrain map for AI understanding |
| `core/os.md` | Full FloatPrompt OS (35KB) — the complete system with guided creation |
| `core/prompt.md` | Template for creating new FloatPrompt tools |
| `core/doc.md` | Tool for adding YAML frontmatter to documents |
| `docs/philosophy/manifesto.md` | The "why" — vision, principles, the promise |
| `docs/goals.md` | Goal hierarchy: Voice > Behavior > Artifacts |
| `docs/principles.md` | Core constraints: Recognition, Slowness, Archaeology |
| `context/float-deepdive.md` | How to build full understanding (5 loops, 23 files) |

## Reading Order

For new AI sessions, read in this order:

1. `.float/system.md` — Boot protocol, structure map, behavioral constraints
2. `.float/project/context/floatprompt.md` — This file (terrain map, relationships)
3. `.float/project/nav/*.md` — All 10 navigation files for folder structure
4. `docs/goals.md` — Goal hierarchy (strict: voice > behavior > artifacts)
5. `docs/principles.md` — Core principles (recognition, slowness, archaeology)
6. `core/prompt.md` — The template (see how tools are built)
7. One example from `examples/` — See theory in practice

For deep understanding, follow `context/float-deepdive.md` (5 loops, 23+ files).

## Domain Map

```
Philosophy (why it exists)
├── docs/philosophy/manifesto.md    — Vision and promise
├── docs/goals.md                   — Goal hierarchy
├── docs/principles.md              — Behavioral constraints
└── docs/voice.md                   — Voice preservation rules

Format (what it is)
├── specs/floatprompt.md            — <fp> tag structure
├── specs/doc.md                    — YAML frontmatter format
└── specs/system.md                 — .float/ folder architecture

Templates (how to build)
├── core/prompt.md                  — Basic template
├── core/doc.md                     — Document context tool
└── core/os.md                      — Full OS with guided creation

Methodology (how to work)
├── docs/mds-method.md              — Map → Decide → Structure → Loop
└── context/float-*.md              — Context depth options

Examples (proof it works)
├── examples/ai portfolio coach/    — Complex multi-phase tool (729 lines)
├── examples/design feedback.../    — Simple surgical extractor (86 lines)
└── examples/shortform script.../   — Pipeline tool (chains from extractor)

System (meta layer)
├── .float/system.md                      — Boot loader
├── .float/meta/                          — FloatPrompt internals
│   ├── core/                             — Templates (prompt, doc, os)
│   └── tools/                            — Commands (float-*.md)
└── .float/project/                       — Your project's data
    ├── context/floatprompt.md            — This terrain map
    ├── nav/*.md                          — Folder navigation
    └── logs/*.md                         — Session history

Archive
└── artifacts/                      — Historical archive (160+ files)
```

## Core Patterns

### Goal Hierarchy (strict, never compromise)

1. **PRIMARY**: Human Intelligence, Voice & Agency Preservation
2. **SECONDARY**: Precise AI Instruction Execution
3. **TERTIARY**: Human Task Completion Through Reliable Collaboration

### MDS Methodology

```
Map → Decide → Structure → Loop
```

- **Map**: Understand before acting
- **Decide**: What matters, what to focus on
- **Structure**: Build the artifact
- **Loop**: Iterate as needed

Depth scales with complexity. Simple tasks skip elaborate mapping.

### Voice Preservation

- Preserve: phrasing, rhythm, tone, hesitations, quirks
- Avoid: em dashes, corporate speak, over-polishing
- Test: "Does it sound like the human or like AI wrote it?"

### Three Components

| Component | Purpose | Modifies Behavior? |
|-----------|---------|-------------------|
| **floatprompt doc** | Document context (YAML frontmatter) | No |
| **FloatPrompt** | Portable tools (`<fp>` tags) | Yes |
| **FloatPrompt System** | Project awareness (`.float/`) | Yes (via boot) |

## Conventions

- **File format**: All FloatPrompt system files use `.md`
- **Boot loader**: `.float/system.md` (read first, always)
- **Structure**: `meta/` for system internals, `project/` for your project
- **Navigation**: Centralized in `.float/project/nav/*.md` (one file per major folder)
- **Logs**: `.float/project/logs/YYYY-MM-DD.md` (newest entries first)
- **Version**: Currently 0.9.0

## Historical Note

The `artifacts/2025/` folder contains 150+ files documenting the evolution of FloatPrompt. Current specifications live in `specs/`. Artifacts are archaeology — useful for understanding design decisions but may not reflect current state.

## What Makes This Project Unique

1. **Voice preservation is sacred** — "First, do not rewrite"
2. **Portable across platforms** — Same tools work on Claude, ChatGPT, Cursor, Gemini
3. **Self-documenting** — The `.float/` folder gives any AI instant awareness
4. **Recursive** — FloatPrompt is used to build and maintain FloatPrompt
5. **Human authority** — Pilot principle: human decides, AI executes

---

*Generated by Context Buoy using .float/meta/tools/float-context.md*
