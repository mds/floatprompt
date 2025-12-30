<fp>
<json>
{
  "STOP": "Restructure Proposal. Best guess at what moves/renames during the great restructuring. Questions at the end need human decisions.",

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
    "status": "Draft - awaiting human decisions",
    "depends_on": ["pillar-map.md"],
    "questions_count": 5
  }
}
</json>
<md>
# Restructure Proposal

Best guess at what moves, renames, or changes — based on the three pillars.

## Summary

| Change Type | Count |
|-------------|-------|
| Definite moves | 1 |
| Possible moves | 2 |
| Renames | 1 |
| No change needed | Most things |

**Key insight:** The structure is mostly sound. The issues are edge cases and documentation clarity, not fundamental reorganization.

---

## Definite Changes

### 1. `specs/claude/` → Move to SYSTEM pillar

**Current:** `specs/claude/` (lives in FILE pillar folder)
**Problem:** It's SYSTEM content (buoys, commands) in a FILE location
**Proposal:** Move to `.float/floatprompt/specs/`

```
Before:
specs/
├── floatprompt.md    # FILE (format spec)
├── doc.md            # FILE (format spec)
├── system.md         # FILE (architecture doc)
└── claude/           # SYSTEM (runtime specs) ← wrong pillar
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

**Confidence:** 90% — This is clearly misplaced.

---

## Possible Changes (Need Decision)

### 2. `context/` — Stay at root or move?

**Current:** Root level, contains onboarding context files
**Tension:**
- FILE argument: It's documentation for humans learning FloatPrompt
- SYSTEM argument: It's consumed by AI at runtime during boot

**Options:**
- **A) Stay at root** — It's onboarding material, visible to newcomers
- **B) Move to `docs/context/`** — Group with other FILE pillar docs
- **C) Move to `.float/project/context/`** — Merge with runtime context

**Confidence:** 50% — Could go either way.

---

### 3. `MAINTENANCE.md` — Stay at root or move?

**Current:** Root level, internal maintenance guide
**Tension:** Internal doc sitting at top level with public-facing files

**Options:**
- **A) Stay at root** — Easy to find for maintainers
- **B) Move to `docs/`** — Group with FILE pillar
- **C) Move to `.float/floatprompt/`** — It's about system maintenance

**Confidence:** 60% — Leaning toward move, but not critical.

---

## Naming Clarity

### 4. `floatprompt/` at root — Rename?

**Current:**
- `floatprompt/` at root (core templates)
- `.float/floatprompt/` (system internals)

**Problem:** Same name, different purposes. Potential confusion.

**Options:**
- **A) Keep as is** — Context makes it clear (root vs .float/)
- **B) Rename root to `templates/`** — But we already have `templates/` for npm scaffolding
- **C) Rename root to `format/`** — "The format specification templates"
- **D) Rename root to `core/`** — "Core FloatPrompt templates"

**Confidence:** 40% — Not sure if this is actually a problem in practice.

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

## Questions for Human

### Q1: specs/claude/ move
Move `specs/claude/` to `.float/floatprompt/specs/`?
- Yes, it's clearly SYSTEM content
- No, keep all specs together for discoverability

### Q2: context/ location
Where should `context/` live?
- A) Stay at root (visible onboarding)
- B) Move to `docs/context/` (FILE pillar)
- C) Move to `.float/project/context/` (SYSTEM pillar, merge with runtime)

### Q3: MAINTENANCE.md location
Where should `MAINTENANCE.md` live?
- A) Stay at root
- B) Move to `docs/`
- C) Move to `.float/floatprompt/`

### Q4: Root floatprompt/ naming
Rename `floatprompt/` at root to avoid confusion with `.float/floatprompt/`?
- A) Keep as `floatprompt/` (context is enough)
- B) Rename to `format/`
- C) Rename to `core/`
- D) Other suggestion

### Q5: Anything else?
Are there structural issues I missed that should be addressed in the restructuring?

---

*Draft proposal. Awaiting human decisions on Q1-Q5.*
</md>
</fp>
