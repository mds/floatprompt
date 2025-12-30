<fp>
<json>
{
  "STOP": "Restructure Proposal. Decisions locked and pending for the great restructuring.",

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
    "behavior": "Propose changes, flag uncertainties, ask clarifying questions"
  },

  "requirements": {
    "status": "In progress - some decisions locked, some pending",
    "depends_on": ["pillar-map.md"],
    "decisions_locked": 4,
    "decisions_pending": 1
  }
}
</json>
<md>
# Restructure Proposal

What moves, renames, or changes during the great restructuring.

---

## Decisions Locked

### 1. `specs/claude/` → Move to SYSTEM pillar ✓

**Decision:** Move to `.float/floatprompt/specs/`

```
Before:
specs/
├── floatprompt.md    # FILE (format spec)
├── doc.md            # FILE (format spec)
├── system.md         # FILE (architecture doc)
└── claude/           # SYSTEM ← wrong pillar
    ├── commands.md
    └── buoys.md

After:
specs/
├── floatprompt.md    # FILE
├── doc.md            # FILE
└── system.md         # FILE

.float/floatprompt/specs/   # NEW
├── commands.md       # SYSTEM
└── buoys.md          # SYSTEM
```

**Rationale:** SYSTEM content belongs in SYSTEM pillar.

---

### 2. `MAINTENANCE.md` → Move to SYSTEM pillar as tool ✓

**Decision:** Move to `.float/floatprompt/maintenance.md` as floatprompt tool

**Rationale:** It's about system maintenance, should be a behavioral tool not plain docs.

---

### 3. Root `context/` → Replaced by FLOAT.md system ✓

**Decision:** Eliminate root `context/` folder. Content absorbed into FLOAT.md files.

**Rationale:** The new FLOAT.md system provides context at every folder level, making a separate `context/` folder redundant.

---

### 4. FLOAT.md System ✓ (NEW)

**Decision:** Every folder gets a `FLOAT.md` file for context/onboarding.

| Folder Type | Format | Purpose |
|-------------|--------|---------|
| Project folders | floatprompt doc (YAML) | Context about the folder |
| System folders (`.float/*`) | floatprompt tool (`<fp>`) | Behavioral instructions |

**Structure:**
```
any-project/
├── FLOAT.md              ← doc: project root context
├── src/
│   └── FLOAT.md          ← doc: src folder context
├── docs/
│   └── FLOAT.md          ← doc: docs folder context
└── .float/
    ├── FLOAT.md          ← TOOL: system root behavior
    ├── floatprompt/
    │   └── FLOAT.md      ← TOOL: internals behavior
    └── project/
        └── FLOAT.md      ← TOOL: project data behavior
```

**Relationship to nav files:**
- `.float/project/nav/*.md` = quick maps (what's here)
- `FLOAT.md` in each folder = deep context (understand this)

**Rationale:** Context lives with the code. No more confusion about root `context/` vs `.float/project/context/`.

---

## Decisions Pending

### 5. Naming collision: `floatprompt/` vs `.float/floatprompt/`

**Current:**
- `floatprompt/` at root = FILE pillar (format templates)
- `.float/floatprompt/` = SYSTEM pillar (system internals)

**Problem:** Same name, different purposes.

**Options:**
- A) Keep both as `floatprompt/` — context clarifies
- B) Rename root to `format/`
- C) Rename `.float/floatprompt/` to `.float/core/` or `.float/engine/`

**Trade-off:**
- Renaming root = only affects this repo
- Renaming `.float/floatprompt/` = affects all user projects

**Status:** Awaiting decision.

---

## No Change Needed

| Item | Pillar | Why it's fine |
|------|--------|---------------|
| `.float/` | SYSTEM | Well-structured after v0.11.0 |
| `.claude/` | SYSTEM | Correct location |
| `docs/` | FILE | Correct location |
| `examples/` | FILE | Correct location |
| `bin/` | PACKAGE | Correct location |
| `templates/` | PACKAGE | Correct location |
| `package.json` | PACKAGE | Correct location |
| `README.md` | FILE+PACKAGE | Shared ownership is fine |
| `artifacts/` | Workspace | Not a pillar, stays at root |

---

## Summary

| Decision | Status |
|----------|--------|
| specs/claude/ → .float/floatprompt/specs/ | ✓ Locked |
| MAINTENANCE.md → .float/floatprompt/maintenance.md (tool) | ✓ Locked |
| Root context/ → absorbed into FLOAT.md system | ✓ Locked |
| FLOAT.md in every folder | ✓ Locked |
| Naming collision (floatprompt/) | ⏳ Pending |

---

*Updated: 2025-12-30*
</md>
</fp>
