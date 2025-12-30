<fp>
<json>
{
  "STOP": "Three Pillars Map (Final). Organizes FloatPrompt repo by pillar after all restructuring decisions locked.",

  "meta": {
    "title": "Pillar Map (Final)",
    "id": "great-restructuring-pillar-map",
    "format": "floatprompt",
    "version": "0.11.0",
    "type": "artifact-map"
  },

  "human": {
    "author": "@mds",
    "intent": "Define final pillar structure after all decisions locked",
    "context": "Updated to reflect format/, system/, and FLOAT.md decisions"
  },

  "ai": {
    "role": "Organizational mapper",
    "behavior": "Show final structure, no more edge cases"
  },

  "requirements": {
    "pillars": ["file", "system", "package"],
    "key_insight": "Nothing named floatprompt/ in folders — folders named by PURPOSE",
    "output": "Clear ownership for every item"
  }
}
</json>
<md>
# Three Pillars Map (Final)

Everything in the FloatPrompt repo belongs to one of three pillars.

**Key insight:** Nothing named `floatprompt/` in folders. Folders are named by PURPOSE. Files contain the FloatPrompt format.

## The Pillars

```
┌─────────────────────────────────────────────────────────────┐
│                      FLOATPROMPT                            │
├───────────────────┬───────────────────┬─────────────────────┤
│       FILE        │      SYSTEM       │      PACKAGE        │
│     format/       │     system/       │   bin/ templates/   │
│                   │                   │                     │
│  What it IS       │  How it WORKS     │  How it SHIPS       │
└───────────────────┴───────────────────┴─────────────────────┘

        .float/ = The system RUNNING (spawned, not a pillar)
```

---

## FILE Pillar — `format/`

**What:** The FloatPrompt format itself — specs, templates, philosophy, examples.

**Folder:** `format/` (was `floatprompt/`)

**Audience:** Anyone learning or using FloatPrompt.

| Item | Type | Purpose |
|------|------|---------|
| `format/` | folder | FILE pillar root |
| `format/FLOAT.md` | file | Folder context (floatprompt doc) |
| `format/core/` | subfolder | Format templates |
| `format/core/template.md` | file | The FloatPrompt template |
| `format/core/doc.md` | file | floatprompt doc tool |
| `format/core/os.md` | file | Full FloatPrompt OS |
| `format/tools/` | subfolder | Format-level tools |
| `format/tools/update.md` | file | Update planning tool |
| `format/tools/tool-sync.md` | file | Tool consistency checker |
| `specs/` | folder | Format specifications |
| `specs/FLOAT.md` | file | Folder context |
| `specs/floatprompt.md` | file | `<fp>` format specification |
| `specs/doc.md` | file | floatdoc YAML format specification |
| `specs/system.md` | file | FloatPrompt System architecture spec |
| `docs/` | folder | Philosophy, guides, principles |
| `docs/FLOAT.md` | file | Folder context |
| `examples/` | folder | Real-world FloatPrompt tools |
| `examples/FLOAT.md` | file | Folder context |
| `README.md` | file | Public entry point (shared with Package) |

---

## SYSTEM Pillar — `system/`

**What:** Documentation about how FloatPrompt System works.

**Folder:** `system/` (NEW — was scattered across specs/claude/, root)

**Audience:** Developers building with/on FloatPrompt System.

| Item | Type | Purpose |
|------|------|---------|
| `system/` | folder | SYSTEM pillar root |
| `system/FLOAT.md` | file | Folder context (floatprompt doc) |
| `system/commands.md` | file | Command system spec (from specs/claude/) |
| `system/buoys.md` | file | Buoy pattern spec (from specs/claude/) |
| `system/maintenance.md` | file | Maintenance tool (from MAINTENANCE.md, as `<fp>`) |
| `.claude/` | folder | Claude Code integration |
| `.claude/commands/` | subfolder | Command wrappers |

**Note:** `.float/` is the system RUNNING, not SYSTEM pillar documentation.

---

## PACKAGE Pillar — `bin/`, `templates/`

**What:** npm package distribution — how FloatPrompt ships to users.

**Audience:** Package maintainers and npx users.

| Item | Type | Purpose |
|------|------|---------|
| `package.json` | file | npm package config |
| `bin/` | folder | CLI entry point |
| `bin/floatprompt.js` | file | npx floatprompt script |
| `templates/` | folder | Scaffolding for new projects |
| `templates/.float/` | subfolder | Template .float/ structure |
| `LICENSE` | file | MIT license |
| `README.md` | file | Public entry (shared with FILE) |

---

## The Running System — `.float/`

**What:** FloatPrompt System running in THIS project. Spawned by `/float` commands. Not a pillar — it's the system itself.

| Item | Type | Purpose |
|------|------|---------|
| `.float/` | folder | Running system root |
| `.float/system.md` | file | Boot protocol |
| `.float/FLOAT.md` | file | System context (floatprompt tool) |
| `.float/core/` | subfolder | System internals (was floatprompt/) |
| `.float/core/FLOAT.md` | file | Internals context (floatprompt tool) |
| `.float/core/index.md` | file | Structural reference |
| `.float/core/manual.md` | file | Tool building guide |
| `.float/core/format/` | subfolder | Format templates (was core/) |
| `.float/core/tools/` | subfolder | /float-* command tools (10 tools) |
| `.float/core/tools/types/` | subfolder | Tool type templates (was sibling) |
| `.float/project/` | subfolder | Project-specific data |
| `.float/project/FLOAT.md` | file | Project context (floatprompt tool) |
| `.float/project/context/` | subfolder | Terrain maps, decisions |
| `.float/project/nav/` | subfolder | Folder navigation |
| `.float/project/logs/` | subfolder | Session logs |

---

## Workspace — `artifacts/`

**What:** Working documents, session artifacts. Not a pillar.

| Item | Type | Purpose |
|------|------|---------|
| `artifacts/` | folder | Active working documents |
| `artifacts/archive/` | subfolder | Historical archive |
| `.git/` | folder | Version control |
| `.gitignore` | file | Git ignore rules |

---

## FLOAT.md System

Every folder gets a `FLOAT.md` file using **full `<fp><json><md>` format**:

| Aspect | Specification |
|--------|---------------|
| Format | Always `<fp><json><md>` |
| JSON | STOP, meta, human, ai, requirements |
| Markdown | Quick context, contents, purpose |

**Why full `<fp>` format everywhere:**
- Better AI hooks via structured JSON
- "STOP" field gives immediate context signal
- Consistent format across ALL folders
- No doc vs tool distinction needed

This replaces the old root `context/` folder. Context now lives WITH the code.

---

## Summary

| Pillar | Folder | Contains |
|--------|--------|----------|
| **FILE** | `format/`, `specs/`, `docs/`, `examples/` | What FloatPrompt IS |
| **SYSTEM** | `system/`, `.claude/` | How FloatPrompt WORKS |
| **PACKAGE** | `bin/`, `templates/` | How FloatPrompt SHIPS |
| **Running** | `.float/` | The system itself (spawned) |
| **Workspace** | `artifacts/` | Working documents |

---

## What Changed

| Before | After | Rationale |
|--------|-------|-----------|
| `floatprompt/` | `format/` | Folders named by purpose |
| `specs/claude/` | `system/` | SYSTEM content in SYSTEM pillar |
| `MAINTENANCE.md` | `system/maintenance.md` | System maintenance belongs in system/ |
| `context/` | (eliminated) | FLOAT.md system replaces it |
| `.float/floatprompt/` | `.float/core/` | No "floatprompt/" folder names |
| `.float/.../core/` | `.float/core/format/` | Mirrors repo structure |
| `.float/.../types/` | `.float/core/tools/types/` | Types are types of tools |

---

*Final map. All decisions locked. Ready for execution.*
</md>
</fp>
