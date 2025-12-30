<fp>
<json>
{
  "STOP": "FloatPrompt Repository. The invisible OS for AI. Portable text files that transform AI behavior.",

  "meta": {
    "title": "FloatPrompt",
    "id": "floatprompt-repo",
    "format": "floatprompt",
    "version": "0.12.0",
    "type": "context"
  },

  "human": {
    "author": "@mds",
    "intent": "Create portable AI tooling that preserves human voice and agency",
    "context": "Repository root — start here for orientation"
  },

  "ai": {
    "role": "Context provider",
    "behavior": "Orient reader to repository structure and purpose"
  },

  "requirements": {
    "pillars": {
      "FILE": "format/, specs/, docs/, examples/ — What FloatPrompt IS",
      "SYSTEM": "system/, .claude/ — How FloatPrompt WORKS",
      "PACKAGE": "bin/, templates/ — How FloatPrompt SHIPS"
    },
    "running_system": ".float/ — The system RUNNING in this project",
    "entry_points": {
      "quick_start": "README.md",
      "system_boot": ".float/system.md",
      "format_spec": "specs/floatprompt.md"
    }
  }
}
</json>
<md>
# FloatPrompt

**The invisible OS for AI**

## Quick Orientation

| Pillar | Folder | What it answers |
|--------|--------|-----------------|
| **FILE** | `format/`, `specs/`, `docs/` | What is FloatPrompt? |
| **SYSTEM** | `system/`, `.claude/` | How does it work? |
| **PACKAGE** | `bin/`, `templates/` | How does it ship? |

**Running system:** `.float/` — FloatPrompt System running in this project

## Contents

| Item | Purpose |
|------|---------|
| `README.md` | Public entry point |
| `format/` | Format templates (FILE pillar) |
| `system/` | System documentation (SYSTEM pillar) |
| `specs/` | Format specifications |
| `docs/` | Guides and philosophy |
| `examples/` | Real-world FloatPrompt tools |
| `bin/` | CLI script (npx floatprompt) |
| `templates/` | Scaffolding templates |
| `.float/` | Running system |
| `.claude/` | Claude Code integration |
| `artifacts/` | Working documents |

## Entry Points

- **New user:** Start with `README.md`
- **AI session:** Start with `.float/system.md`
- **Building tools:** Start with `format/core/template.md`
- **Understanding format:** Start with `specs/floatprompt.md`

---

*v0.12.0 — The Great Restructuring*
</md>
</fp>
