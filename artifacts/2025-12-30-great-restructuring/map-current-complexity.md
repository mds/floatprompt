<fp>
<json>
{
  "STOP": "Map of Current Complexity. Analysis of FloatPrompt's three pillars, what's muddled, and how it relates to orchestration work.",

  "meta": {
    "title": "Map: Current Complexity",
    "id": "mds-atomic-audit-map",
    "format": "floatprompt",
    "version": "0.11.0",
    "type": "artifact-map"
  },

  "human": {
    "author": "@mds",
    "intent": "Understand current state before deciding path forward",
    "context": "MDS methodology - Map phase of audit"
  },

  "ai": {
    "role": "Complexity analyst",
    "behavior": "Document what exists, identify overlaps, surface questions"
  },

  "requirements": {
    "three_pillars": {
      "file": "FloatPrompt format, specs, philosophy",
      "system": ".float/ folder, buoys, tools, commands",
      "package": "npx floatprompt, deployment, templates"
    },
    "paths_forward": ["Build now", "Restructure first", "Lightweight cleanup"],
    "next_phase": "decide"
  }
}
</json>
<md>
# Map: Current Complexity

Mapping where we are and how it relates to the orchestration work.

## The Three Pillars

Everything FloatPrompt does falls into three categories:

```
┌─────────────────────────────────────────────────────────────┐
│                      FLOATPROMPT                            │
├───────────────────┬───────────────────┬─────────────────────┤
│       FILE        │      SYSTEM       │      PACKAGE        │
│                   │                   │                     │
│ • <fp> format     │ • .float/ folder  │ • npx floatprompt   │
│ • floatdoc YAML   │ • tools           │ • bin/floatprompt.js│
│ • specs/          │ • buoys           │ • templates/        │
│ • philosophy docs │ • commands        │ • deployment logic  │
│                   │ • project context │                     │
└───────────────────┴───────────────────┴─────────────────────┘
```

**Current state:** These are muddled in the repo structure.

## What Lives Where (Current)

### Root Level (messy)

| Item | Pillar | Notes |
|------|--------|-------|
| README.md | File + Package | Mixed audience |
| MAINTENANCE.md | System | Internal, should it be here? |
| floatprompt/ | File | Core templates (template, doc, os) |
| specs/ | File + System | specs/claude/* is system stuff |
| docs/ | File | Philosophy, goals, principles |
| .float/ | System | The system itself |
| .claude/ | System | Claude Code integration |
| bin/ | Package | Deployment script |
| templates/ | Package | npx init scaffolding |
| examples/ | File | Example floatprompts |
| context/ | ? | Onboarding — which pillar? |
| artifacts/ | ? | Working docs — which pillar? |

### Inside .float/ (cleaner but complex)

```
.float/
├── system.md              # Boot protocol
├── floatprompt/           # System internals
│   ├── index.md
│   ├── core/              # Templates (redundant with root floatprompt/?)
│   ├── tools/             # 10 tools
│   ├── types/             # 6 type templates
│   └── manual.md
└── project/               # Project-specific
    ├── nav/
    ├── logs/
    └── context/
```

## Naming Stutter Problem

Current paths that feel redundant:

| Path | Issue |
|------|-------|
| `floatprompt/core/template.md` | floatprompt appears in package name AND folder |
| `.float/floatprompt/core/` | .float has floatprompt subfolder |
| `specs/floatprompt.md` | Spec about floatprompt format |

Not broken, but cognitively heavy.

## Orchestration Adds More Complexity

The `2025-12-30-float-orchestration/` work proposes:

| New Thing | What It Adds |
|-----------|--------------|
| float-report.md | New tool + logging infrastructure |
| float-project.md | New tool + project.md becomes active |
| float-all.md | Orchestration tool |
| logs/{date}/{tool}/ | New folder structure |
| Buoy teams | Orchestrator → Workers → Validator pattern |
| MDS output | map.md, decide.md, structure.md per tool run |

**Question:** Build this on current foundation, or restructure first?

## Ideas From Brain Dump

### /float-think (meta-orchestrator)

```
User runs /float-think
        │
        ▼
AI cycles through all float-* tools
        │
        ▼
Decides which tools are needed for task
        │
        ▼
Spawns buoys to run selected tools
        │
        ▼
Gap buoy identifies missing functionality
        │
        ▼
Repair buoy updates tools if gaps found
```

**Relationship to orchestration:** This is BIGGER than float-all. Float-all is fixed sequence. Float-think is intelligent selection.

### /float-context + git history

```
/float-context
        │
        ├── Reads nav files
        ├── Reads context files
        └── IF git repo exists:
            └── Read last N commits
                (amount emergent based on what git buoy finds)
```

**Relationship to orchestration:** Enhances existing tool, not new tool.

## Three Possible Paths

### Path A: Build Orchestration Now

- Accept current complexity
- Add float-report, float-project, float-all
- Document well, keep going
- Risk: Complexity compounds

### Path B: Restructure First ("The Great Restructuring")

- Pause orchestration
- Separate three pillars clearly
- New git branch for clean break
- Then add orchestration on clean foundation
- Risk: Momentum lost, scope creep

### Path C: Lightweight Cleanup + Orchestration

- Small restructure (clarify root folder only)
- Keep .float/ as-is (it's actually pretty clean)
- Proceed with orchestration
- Full restructure later if needed
- Risk: Half-measures

## Overlap Analysis

| Orchestration Decision | Audit Concern | Conflict? |
|------------------------|---------------|-----------|
| float-project.md | Root folder mess | No — lives in .float/floatprompt/tools/ |
| float-report.md | More complexity | Yes — adds new tool + folder structure |
| Buoy teams | Buoy docs scattered | Yes — where do buoy docs live? |
| MDS output | logs/ structure | No — contained in .float/project/logs/ |
| float-all | Complexity | Yes — orchestration of orchestration |

## Buoy Documentation Gap

Current buoy docs:
- `specs/claude/buoys.md` — main spec
- Scattered in tool files — each tool mentions its buoys

**Question:** Should buoys have their own home?

Options:
1. Keep in specs/claude/ (current)
2. Move to .float/floatprompt/buoys/
3. Create docs/buoys.md for conceptual, keep specs for technical

## Root Folder Clarity Proposal

```
floatprompt/                    # REPO ROOT
│
├── FILE PILLAR ──────────────────────────────
│   ├── floatprompt/            # Core file templates
│   ├── specs/                  # Formal specifications
│   │   ├── floatprompt.md      # File format spec
│   │   ├── doc.md              # floatdoc spec
│   │   └── system.md           # System spec
│   ├── docs/                   # Philosophy & guides
│   └── examples/               # Example files
│
├── SYSTEM PILLAR ────────────────────────────
│   ├── .float/                 # The system itself
│   ├── .claude/                # Claude Code integration
│   ├── context/                # Onboarding context
│   └── specs/claude/           # Claude-specific specs (buoys, commands)
│
├── PACKAGE PILLAR ───────────────────────────
│   ├── bin/                    # CLI script
│   ├── templates/              # npx init templates
│   ├── package.json
│   └── MAINTENANCE.md          # Internal maintenance
│
└── META ─────────────────────────────────────
    ├── README.md               # Public entry point
    ├── artifacts/              # Working documents
    └── archive/                # Historical
```

**Note:** This is conceptual grouping, not necessarily folder moves.

## Key Questions for @mds

1. **Is the three-pillar framing correct?** (File, System, Package)

2. **Which path?** (A: Build now, B: Restructure first, C: Lightweight cleanup)

3. **Where should buoy docs live?**

4. **Is float-think the real end goal?** (vs float-all as stepping stone)

5. **Does the orchestration work conflict with this audit, or complement it?**

---

*Map complete. Ready for: Decide phase*
</md>
</fp>
