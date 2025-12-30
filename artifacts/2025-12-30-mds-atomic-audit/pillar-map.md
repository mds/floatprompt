<fp>
<json>
{
  "STOP": "Three Pillars Map. Organizes all FloatPrompt repo contents by pillar: File, System, Package. Use this to understand where things belong.",

  "meta": {
    "title": "Pillar Map",
    "id": "mds-atomic-audit-pillar-map",
    "format": "floatprompt",
    "version": "0.11.0",
    "type": "artifact-map"
  },

  "human": {
    "author": "@mds",
    "intent": "Clarify which pillar owns each file/folder in the repo",
    "context": "Created during atomic audit to resolve confusion about repo organization"
  },

  "ai": {
    "role": "Organizational mapper",
    "behavior": "Categorize everything by pillar, surface edge cases"
  },

  "requirements": {
    "pillars": ["file", "system", "package"],
    "purpose": "Mental model for where things belong",
    "output": "Clear ownership for every root-level item"
  }
}
</json>
<md>
# Three Pillars Map

Everything in the FloatPrompt repo belongs to one of three pillars.

## The Pillars

```
┌─────────────────────────────────────────────────────────────┐
│                      FLOATPROMPT                            │
├───────────────────┬───────────────────┬─────────────────────┤
│       FILE        │      SYSTEM       │      PACKAGE        │
│                   │                   │                     │
│  The format       │  The runtime      │  The distribution   │
│  What it IS       │  How it WORKS     │  How it SHIPS       │
└───────────────────┴───────────────────┴─────────────────────┘
```

---

## FILE Pillar

**What:** The FloatPrompt format itself — specs, templates, philosophy, examples.

**Audience:** Anyone learning or using FloatPrompt.

| Item | Type | Purpose |
|------|------|---------|
| `floatprompt/` | folder | Core templates (template.md, doc.md, os.md) |
| `floatprompt/core/` | subfolder | Format templates |
| `floatprompt/tools/` | subfolder | User-facing tools (update.md, tool-sync.md) |
| `specs/floatprompt.md` | file | `<fp>` format specification |
| `specs/doc.md` | file | floatdoc YAML format specification |
| `specs/system.md` | file | FloatPrompt System architecture spec |
| `docs/` | folder | Philosophy, guides, principles |
| `docs/goals.md` | file | Goal hierarchy |
| `docs/principles.md` | file | Core principles |
| `docs/voice.md` | file | Voice preservation |
| `docs/mds-method.md` | file | MDS methodology |
| `docs/philosophy/` | subfolder | Deeper thinking |
| `docs/reference/` | subfolder | Template references |
| `examples/` | folder | Real-world FloatPrompt tools |
| `README.md` | file | Public entry point (shared with Package) |

---

## SYSTEM Pillar

**What:** The FloatPrompt System runtime — .float/ folder, buoys, commands, tools.

**Audience:** AI agents working in a FloatPrompt-enabled project.

| Item | Type | Purpose |
|------|------|---------|
| `.float/` | folder | The system itself |
| `.float/system.md` | file | Boot protocol |
| `.float/floatprompt/` | subfolder | System internals |
| `.float/floatprompt/tools/` | subfolder | /float-* command tools (10 tools) |
| `.float/floatprompt/types/` | subfolder | Tool type templates (6 types) |
| `.float/floatprompt/core/` | subfolder | Core templates (deployed copy) |
| `.float/floatprompt/manual.md` | file | Tool building reference |
| `.float/floatprompt/index.md` | file | Structural reference |
| `.float/project/` | subfolder | Project-specific data |
| `.float/project/nav/` | subfolder | Folder navigation |
| `.float/project/context/` | subfolder | Terrain maps, decisions |
| `.float/project/logs/` | subfolder | Session logs |
| `.claude/` | folder | Claude Code integration |
| `.claude/commands/` | subfolder | Command wrappers (11 commands) |
| `specs/claude/` | subfolder | Claude-specific specs |
| `specs/claude/commands.md` | file | Command system spec |
| `specs/claude/buoys.md` | file | Buoy pattern spec |
| `context/` | folder | Onboarding context files |
| `context/float-map.md` | file | Quick context |
| `context/float-context.md` | file | Standard context |
| `context/float-deepdive.md` | file | Deep context |
| `MAINTENANCE.md` | file | Internal maintenance guide |

---

## PACKAGE Pillar

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
| `README.md` | file | Public entry (shared with File) |

---

## META (Cross-Pillar)

**What:** Working documents, archives, and meta-content.

| Item | Type | Purpose |
|------|------|---------|
| `artifacts/` | folder | Working documents, session artifacts |
| `artifacts/archive/` | subfolder | Historical archive |
| `.git/` | folder | Version control |
| `.gitignore` | file | Git ignore rules |

---

## Edge Cases / Observations

### specs/ is split
- `specs/floatprompt.md`, `specs/doc.md`, `specs/system.md` → **FILE** (format specs)
- `specs/claude/` → **SYSTEM** (runtime specs)

**Possible fix:** Move `specs/claude/` to `.float/floatprompt/specs/` or `docs/claude/`?

### context/ could go either way
- Currently: Root level, acts as onboarding
- Argument for FILE: It's documentation for learning
- Argument for SYSTEM: It's consumed by AI during boot

**Current assignment:** SYSTEM (consumed at runtime)

### MAINTENANCE.md at root
- Internal doc sitting at root level
- Could move to `docs/` or `.float/floatprompt/`

**Current assignment:** SYSTEM (internal operations)

### README.md serves two masters
- FILE: Explains the format to learners
- PACKAGE: npm package landing page

**Resolution:** Keep at root, shared ownership is fine.

---

## Summary

| Pillar | Folders | Files |
|--------|---------|-------|
| **FILE** | floatprompt/, specs/ (partial), docs/, examples/ | README.md |
| **SYSTEM** | .float/, .claude/, specs/claude/, context/ | MAINTENANCE.md |
| **PACKAGE** | bin/, templates/ | package.json, LICENSE |
| **META** | artifacts/ | .gitignore |

---

## What This Enables

With this map:
1. **New files** — Know which pillar they belong to
2. **Refactoring** — Move files to correct pillar if misplaced
3. **nav/root.md** — Can reorganize by pillar
4. **Documentation** — Can explain structure clearly

---

*Map complete. No blocking issues found — mostly documentation clarity needed.*
</md>
</fp>
