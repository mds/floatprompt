# Tool Ecosystem Session Context

**Purpose:** Boot context for continuing this work in a fresh conversation.

---

## What We're Doing

Building infrastructure for FloatPrompt tool creation:

1. **Restructuring** `.float/` folder for clarity and expansion
2. **Creating** tool building system (manual, types, /float-build)
3. **Planning** expansion tools (harvest, delta, focus, relate)

---

## Key Decisions Made

| Decision | Choice |
|----------|--------|
| Tool "archetypes" | **Types** (simpler naming) |
| Build command | **`/float-build`** |
| .float/meta/ | → **`.float/floatprompt/`** |
| meta.md | → **`index.md`** |
| floatprompt/meta/ | → **`floatprompt/internal/`** |
| Maintenance guide | **Root `MAINTENANCE.md`** |

---

## Document Map

```
2025-12-30-tool-ecosystem/
├── CONTEXT.md                    ← You are here (boot this first)
├── 2025-12-30-roadmap.md         ← Master coordination, progress tracking
├── 2025-12-30-restructure-update-plan.md  ← WS1 detailed tasks
├── 2025-12-30-tool-ecosystem-strategy.md  ← Decisions & insights
└── 2025-12-30-tool-expansion-exploration.md ← Future tools (WS4)
```

**Reading order:**
1. This file (CONTEXT.md)
2. Roadmap (master coordination)
3. Whichever workstream is active

---

## Workstreams

```
WS1: Restructure ──→ WS2: MAINTENANCE.md ──→ WS3: Tool System ──→ WS4: Expansion
    (DONE ✅)            (DONE ✅)               (DONE ✅)          (DONE ✅)
```

**Current:** WS4 complete. All workstreams done.

---

## Target Structure

```
.float/
├── system.md
├── floatprompt/           # Was meta/
│   ├── index.md           # Was meta.md
│   ├── core/              # Was floatprompt/
│   ├── types/             # NEW (6 type templates)
│   ├── tools/             # Was tools/
│   └── manual.md          # NEW
└── project/

floatprompt/
├── template.md, doc.md, os.md, update.md
└── internal/              # Was meta/ (maintainer only)

MAINTENANCE.md             # NEW (root level)
```

---

## 6 Tool Types Discovered

From analyzing production examples in `examples/more (temp)/`:

| Type | Purpose | Key Pattern |
|------|---------|-------------|
| **Pipeline** | Sequential stages | Clear input/output contracts |
| **Scorer** | Evaluation | Multi-signal weighted, thresholds |
| **Extractor** | Voice preservation | Archaeological precision |
| **Reconciler** | Gap detection | Cross-reference, surgical fixes |
| **Processor** | Transformation | Raw data → structured output |
| **Reference** | Context provider | Informs other tools, not called directly |

---

## To Continue This Work

In a fresh conversation:

1. Run `/float` to boot general project context
2. Read this file: `artifacts/2025-12-30-tool-ecosystem/CONTEXT.md`
3. Read the roadmap: `artifacts/2025-12-30-tool-ecosystem/2025-12-30-roadmap.md`
4. Say: "Continue WS1 restructure" (or whichever workstream is next)

---

## Gaps Identified

### Logging

Session logs weren't created during work — only discovered when running `/float` boot in new session. No log existed for 2025-12-30 despite 7 commits.

**Options for future:**
- Manual: Create log at end of session
- Tool: `/float-harvest` can extract from git, but that's retroactive
- Workflow: Add "update log" to workstream completion protocol

Not blocking — logged retroactively. Worth considering for next major work session.

---

## Session Origin

**Trigger question:** "Would any tools be helpful on a healthy directory?"

**Key insight:** The same MDS pattern (Map → Decide → Structure) applies to building tools themselves.

**Session date:** 2025-12-30
**Participants:** @mds, Claude Opus 4.5

---

*This context file enables session continuity across conversation boundaries.*
