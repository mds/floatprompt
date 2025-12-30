<fp>
<json>
{
  "STOP": "Restructure Proposal. All decisions locked for the great restructuring.",

  "meta": {
    "title": "Restructure Proposal",
    "id": "great-restructuring-proposal",
    "format": "floatprompt",
    "version": "0.11.0",
    "type": "artifact-proposal"
  },

  "human": {
    "author": "@mds",
    "intent": "Define what changes during the great restructuring",
    "context": "Based on three pillars analysis (FILE, SYSTEM, PACKAGE)"
  },

  "ai": {
    "role": "Restructure planner",
    "behavior": "Record locked decisions, prepare for execution"
  },

  "requirements": {
    "status": "All decisions locked - ready for execution",
    "depends_on": ["pillar-map.md"],
    "decisions_locked": 9,
    "decisions_pending": 0
  }
}
</json>
<md>
# Restructure Proposal

All decisions locked for the great restructuring.

---

## The Mental Model

**The Three Pillars as Folders:**

| Pillar | Folder | Contains |
|--------|--------|----------|
| FILE | `format/` | What FloatPrompt IS (format specs, templates) |
| SYSTEM | `system/` | How FloatPrompt WORKS (system documentation) |
| PACKAGE | `bin/`, `templates/` | How FloatPrompt SHIPS |

**Separately:**
- `.float/` = The system RUNNING in this project (spawned by /float, not a pillar folder)

**Key insight:** Nothing should be NAMED `floatprompt/` in folders. The format is FloatPrompt, the files are `.md` with `<fp>` tags inside. Folders are named by PURPOSE.

---

## Decisions Locked

### 1. Root `floatprompt/` → `format/` ✓

**Current:** `floatprompt/` at root (FILE pillar content)
**New:** `format/`

**Rationale:** Folder names describe purpose, not format name. Like JavaScript projects don't have a `javascript/` folder.

---

### 2. New `system/` folder ✓

**Current:** SYSTEM pillar docs scattered (specs/claude/, etc.)
**New:** `system/` folder at root

**Contains:**
- Documentation about how `.float/` works
- Specs for commands, buoys, etc.
- System-level documentation

---

### 3. `specs/claude/` → `system/` ✓

**Current:** `specs/claude/` (SYSTEM content in FILE location)
**New:** `system/specs/` or just `system/`

```
Before:
specs/
├── floatprompt.md    # FILE
├── doc.md            # FILE
├── system.md         # FILE
└── claude/           # SYSTEM ← wrong pillar
    ├── commands.md
    └── buoys.md

After:
specs/
├── floatprompt.md    # FILE
├── doc.md            # FILE
└── system.md         # FILE

system/               # NEW - SYSTEM pillar
├── commands.md
└── buoys.md
```

---

### 4. `MAINTENANCE.md` → `system/maintenance.md` as tool ✓

**Current:** `MAINTENANCE.md` at root (plain markdown)
**New:** `system/maintenance.md` as floatprompt tool (`<fp>`)

**Rationale:** It's system maintenance docs, belongs in SYSTEM pillar, should be behavioral.

---

### 5. `.float/floatprompt/` → `.float/core/` ✓

**Current:** `.float/floatprompt/`
**New:** `.float/core/`

**Rationale:** Nothing named `floatprompt/` in folders. This is the "core" of the running system.

---

### 6. `.float/floatprompt/core/` → `.float/core/format/` ✓

**Current:** `.float/floatprompt/core/` (templates)
**New:** `.float/core/format/`

**Rationale:** Mirrors repo `format/` folder. Contains format templates.

---

### 7. `.float/floatprompt/types/` → `.float/core/tools/types/` ✓

**Current:** `.float/floatprompt/types/` (sibling of tools/)
**New:** `.float/core/tools/types/`

**Rationale:** Types are "types of tools" — they belong inside tools/.

---

### 8. Root `context/` → Replaced by FLOAT.md system ✓

**Current:** `context/` folder at root with onboarding files
**New:** Eliminated. Content absorbed into FLOAT.md files.

**Rationale:** FLOAT.md system provides context at every folder level.

---

### 9. FLOAT.md in every folder ✓

**Decision:** Every folder gets a `FLOAT.md` file.

| Folder Type | Format | Purpose |
|-------------|--------|---------|
| Project folders | floatprompt doc (YAML) | Context about the folder |
| System folders (`.float/*`) | floatprompt tool (`<fp>`) | Behavioral instructions |

---

## Final Structure

### Repo Root (After)

```
floatprompt/                    (repo)
├── FLOAT.md                    ← doc: repo context
│
├── format/                     ← FILE pillar (was floatprompt/)
│   ├── FLOAT.md
│   ├── core/
│   │   ├── template.md
│   │   ├── doc.md
│   │   └── os.md
│   └── tools/
│       ├── update.md
│       └── tool-sync.md
│
├── system/                     ← SYSTEM pillar (NEW)
│   ├── FLOAT.md
│   ├── commands.md             (from specs/claude/)
│   ├── buoys.md                (from specs/claude/)
│   └── maintenance.md          (from root, as tool)
│
├── specs/                      ← FILE pillar (format specs only)
│   ├── FLOAT.md
│   ├── floatprompt.md
│   ├── doc.md
│   └── system.md
│
├── docs/                       ← FILE pillar
│   └── FLOAT.md
│
├── examples/                   ← FILE pillar
│   └── FLOAT.md
│
├── bin/                        ← PACKAGE pillar
├── templates/                  ← PACKAGE pillar
├── package.json
│
├── artifacts/                  ← Workspace (not a pillar)
│
└── .float/                     ← Running system (spawned, not pillar)
    ├── system.md
    ├── FLOAT.md                ← TOOL
    ├── core/                   ← was floatprompt/
    │   ├── FLOAT.md            ← TOOL
    │   ├── index.md
    │   ├── manual.md
    │   ├── format/             ← was core/
    │   │   ├── template.md
    │   │   ├── doc.md
    │   │   └── os.md
    │   └── tools/
    │       ├── float.md
    │       ├── float-sync.md
    │       ├── float-fix.md
    │       ├── float-context.md
    │       ├── float-enhance.md
    │       ├── float-build.md
    │       ├── float-harvest.md
    │       ├── float-delta.md
    │       ├── float-focus.md
    │       ├── float-relate.md
    │       └── types/          ← was sibling
    │           ├── extractor.md
    │           ├── pipeline.md
    │           ├── processor.md
    │           ├── reconciler.md
    │           ├── reference.md
    │           └── scorer.md
    └── project/
        ├── FLOAT.md            ← TOOL
        ├── project.md
        ├── context/
        ├── nav/
        └── logs/
```

---

## Renames Summary

| Current | New |
|---------|-----|
| `floatprompt/` | `format/` |
| `specs/claude/` | `system/` |
| `MAINTENANCE.md` | `system/maintenance.md` |
| `context/` | (eliminated, → FLOAT.md) |
| `.float/floatprompt/` | `.float/core/` |
| `.float/floatprompt/core/` | `.float/core/format/` |
| `.float/floatprompt/types/` | `.float/core/tools/types/` |

---

## Files to Update

After the renames, these files will need path updates:
- `bin/floatprompt.js` — deployment paths
- `.claude/commands/*.md` — tool paths
- `README.md` — documentation
- `docs/*.md` — references
- `specs/*.md` — references
- All nav files in `.float/project/nav/`
- `templates/` — mirror new structure

---

## Execution Plan

1. Create new folders (`format/`, `system/`)
2. Move files to new locations
3. Rename `.float/floatprompt/` → `.float/core/`
4. Move types/ inside tools/
5. Create FLOAT.md files in each folder
6. Update all references (bin, commands, docs, nav)
7. Update templates/ to match
8. Run /float-fix to validate
9. Test `npx floatprompt init`

---

**Status:** All decisions locked. Ready for execution.

*Updated: 2025-12-30*
</md>
</fp>
