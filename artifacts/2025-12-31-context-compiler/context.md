<fp>
  <json>
  {
    "STOP": "Context Compiler — WHAT it is and how it works",

    "meta": {
      "title": "Context Compiler — Context",
      "type": "context",
      "id": "context-compiler-2025-12-31",
      "status": "strategic exploration",
      "created": "2025-12-31",
      "related": ["artifacts/2025-12-31-modular-floatprompt.md"]
    },

    "human": {
      "author": "@mds",
      "intent": "Deep understanding of the context compiler concept",
      "mindset": "Breadcrumbs and decision captures, not specs"
    },

    "ai": {
      "role": "Deep WHAT for future implementation sessions",
      "central_insight": "The build system is invisible. The schema is the product.",
      "must_understand": [
        "FloatPrompt compiles context, .md files are build artifacts not source",
        "Users never see the build system — they see .md files",
        "Schema and contracts are the real product",
        "Stability enables verticals (legal, research, docs)",
        "Technology choice is downstream of stability requirements"
      ],
      "trifecta_role": "This is the WHAT file. See map.md for WHERE, decisions.md for WHY."
    }
  }
  </json>
  <md>

# Context Compiler — Context

**WHAT the context compiler is and how it works.**

For navigation, see `map.md`. For rationale, see `decisions.md`.

---

## The Central Insight

FloatPrompt is not a file format. It's a **context compilation pipeline**.

```
Config + Templates → Build → .md files → AI consumption
```

The `.md` files are build artifacts, not source files.

---

## What It Is

A templating system that replaces static `.md` maintenance with compiled context generation.

**Before (current):**
- 16 tool files with copy-pasted patterns
- Version bump = edit 16 files manually
- Pattern fix = edit 16 files manually
- Drift is inevitable

**After (context compiler):**
- Config files define tool properties
- Templates define structure
- Partials/functions handle shared patterns
- Build produces `.md` files
- One change propagates everywhere

---

## How It Works

### Three Layers

```
┌─────────────────────────────────────┐
│  Config Layer                       │
│  system.json, *.tool.json           │
│  Data: version, paths, tool props   │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│  Template Layer                     │
│  *.ts (TypeScript functions)        │
│  Partials: duality, buoys, footer   │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│  Output Layer                       │
│  .float/**/*.md                     │
│  Tools, nav files, context files    │
└─────────────────────────────────────┘
```

### Two Execution Contexts

| Context | Command | Use Case |
|---------|---------|----------|
| **npm** | `npm float build` | CI/CD, scripts, headless |
| **/slash** | `/float-build` | Interactive, AI judgment |

Same templates power both. Different interfaces.

---

## What It Enables

1. **Version in one place** → flows to all tools
2. **Path change** → one edit, rebuild
3. **Pattern update** → one function, all tools updated
4. **New tool** → config + template, done
5. **Type errors** → caught at build time

---

## The Product Vision

**The build system is invisible.**

Users see `.md` files. They don't know or care how they're generated.

The real product is:
- The **schema** (what config shapes are valid)
- The **contracts** (what templates produce)
- The **stability** (what users can rely on)

Technology (TypeScript, Handlebars, whatever) is implementation detail.

---

## Breadcrumb Warning

**These are breadcrumbs, not specs.**

All documents in this artifact capture thinking at a point in time:
- `03-technology.md` said Handlebars
- `08-technology-reassessment.md` challenged that
- `12-typescript-direction.md` leans TypeScript

This evolution is intentional. Future implementation uses these as context, not contracts.

---

## Status

Decision captures complete. Ready for future implementation when the time comes.

See `13-when.md` for implementation triggers.

  </md>
</fp>
