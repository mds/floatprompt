<fp>
<json>
{
  "STOP": "Decision Rationale. Why each restructuring decision was made. Read this to understand the thinking, not just the outcome.",

  "meta": {
    "title": "Decision Rationale",
    "id": "great-restructuring-decisions",
    "format": "floatprompt",
    "version": "0.11.0",
    "type": "artifact-decisions"
  },

  "human": {
    "author": "@mds",
    "intent": "Capture the WHY behind each decision for future context",
    "context": "Created via structured Q&A to ensure decisions are understood, not just recorded"
  },

  "ai": {
    "role": "Decision documenter",
    "behavior": "Explain reasoning, trade-offs, and key insights that led to each decision"
  },

  "requirements": {
    "decisions_count": 9,
    "key_insight": "Nothing named floatprompt/ in folders — like JS projects don't have javascript/ folders",
    "mental_models": ["three pillars", "JavaScript analogy", "purpose over format naming"]
  }
}
</json>
<md>
# Decision Rationale

Why each restructuring decision was made. This captures the reasoning, not just the outcomes.

---

## The Core Insight

**Question:** Why rename `floatprompt/` to `format/`?

**Answer:** "Nothing should be NAMED floatprompt in the folder... like JavaScript projects don't have a `javascript/` folder — there are just `.js` files in a `scripts/` folder."

This insight unlocked everything:
- Folders are named by **purpose** (format, system, bin)
- Files **contain** the FloatPrompt format (`.md` with `<fp>` tags)
- The format name doesn't need to be the folder name

---

## Decision 1: `floatprompt/` → `format/`

**Question:** What should the root `floatprompt/` folder be called?

**Options considered:**
- Keep as `floatprompt/`
- Rename to `format/`
- Rename to `core/`
- Rename to `src/`

**Decision:** `format/`

**Rationale:** This folder contains the format specification and templates — it's about WHAT FloatPrompt IS. The name `format/` describes its purpose. Using `floatprompt/` would be like having a `javascript/` folder in a JS project.

---

## Decision 2: New `system/` folder

**Question:** Where should SYSTEM pillar documentation live?

**Previous state:** Scattered across `specs/claude/`, root `MAINTENANCE.md`, various places.

**Decision:** Create new `system/` folder at root.

**Rationale:** The three pillars need folder representation:
- FILE → `format/`
- SYSTEM → `system/`
- PACKAGE → `bin/`, `templates/`

Having a dedicated `system/` folder makes the pillar structure visible in the repo root.

---

## Decision 3: `specs/claude/` → `system/`

**Question:** Where should `specs/claude/` (commands.md, buoys.md) live?

**Options considered:**
- Keep in `specs/claude/`
- Move to `.float/floatprompt/specs/`
- Move to `system/`

**Decision:** Move to `system/`

**Rationale:** These files are SYSTEM pillar content (how the runtime works), not FILE pillar content (format specs). They were in the wrong pillar. Moving to `system/` puts SYSTEM content in the SYSTEM folder.

---

## Decision 4: `MAINTENANCE.md` → `system/maintenance.md` (as tool)

**Question:** Where should `MAINTENANCE.md` live and what format?

**Options considered:**
- Keep at root as plain markdown
- Move to `docs/`
- Move to `system/` as floatprompt doc
- Move to `system/` as floatprompt tool

**Decision:** Move to `system/maintenance.md` as floatprompt tool (`<fp>`)

**Rationale:**
1. It's about system maintenance → belongs in `system/`
2. It's behavioral (tells AI how to maintain) → should be a tool, not just a doc
3. "FloatPrompt files work best when AI doesn't have much context... but the verbosity doesn't truly matter other than eating up context"

---

## Decision 5: `.float/floatprompt/` → `.float/core/`

**Question:** Should `.float/floatprompt/` be renamed?

**Decision:** Yes, rename to `.float/core/`

**Rationale:** "Nothing named floatprompt/ in folders" applies everywhere, including inside `.float/`. This is the "core" of the running system — name it by purpose.

---

## Decision 6: `.float/floatprompt/core/` → `.float/core/format/`

**Question:** What should the templates folder inside `.float/` be called?

**Previous:** `.float/floatprompt/core/` (contained template.md, doc.md, os.md)

**Decision:** `.float/core/format/`

**Rationale:** Mirrors the repo structure. The repo has `format/` for format templates, so `.float/` should have `format/` for the deployed copies. Consistency between source and deployed structure.

---

## Decision 7: `.float/floatprompt/types/` → `.float/core/tools/types/`

**Question:** Where should tool types live?

**Previous:** `.float/floatprompt/types/` (sibling of `tools/`)

**Decision:** `.float/core/tools/types/`

**Rationale:** "Types inside of tools since it is 'types of tools'". Types are a subcategory of tools, not a sibling concept. Nesting reflects the relationship.

---

## Decision 8: Root `context/` → Eliminated (FLOAT.md system)

**Question:** Where should root `context/` files live?

**Previous:** Root `context/` folder with float-map.md, float-context.md, float-deepdive.md

**Options considered:**
- Keep at root
- Move to `docs/context/`
- Move to `.float/project/context/`
- Eliminate and replace with FLOAT.md system

**Decision:** Eliminate. Content absorbed into FLOAT.md files.

**Rationale:** The discussion revealed that `context/` was confusingly named (same name as `.float/project/context/` but different purpose). The FLOAT.md system solves this by putting context IN each folder rather than in a separate location.

---

## Decision 9: FLOAT.md in every folder

**Question:** How should folder context/onboarding work?

**Options considered:**
- Keep centralized nav files only
- Add `.float.md` (hidden) in each folder
- Add `FLOAT.md` (visible) in each folder

**Decision:** `FLOAT.md` in every folder

**Format rules:**
- Project folders → floatprompt doc (YAML frontmatter)
- System folders (`.float/*`) → floatprompt tool (`<fp><json><md>`)

**Rationale:**
1. Visible (`FLOAT.md`) is better than hidden (`.float.md`) for discoverability
2. Context lives WITH the code, not in a separate location
3. System folders need behavioral instructions (tool), project folders need context (doc)
4. Replaces confusing root `context/` folder

---

## Key Mental Models

### The Three Pillars

Everything belongs to one of three pillars:

| Pillar | Question | Folder |
|--------|----------|--------|
| FILE | What is FloatPrompt? | `format/` |
| SYSTEM | How does it work? | `system/` |
| PACKAGE | How does it ship? | `bin/`, `templates/` |

`.float/` is special — it's the system RUNNING, not a pillar folder.

### The JavaScript Analogy

"What would JavaScript do?"

- JS projects don't have `javascript/` folders
- They have `scripts/`, `src/`, `lib/` — named by purpose
- Files have `.js` extension — the format is in the file, not the folder name

Apply to FloatPrompt:
- Don't have `floatprompt/` folders
- Have `format/`, `system/`, `bin/` — named by purpose
- Files are `.md` with `<fp>` tags inside — the format is in the file

### Purpose Over Format Naming

**Wrong:** Name folders after the format (`floatprompt/`, `javascript/`)
**Right:** Name folders after their purpose (`format/`, `scripts/`)

The format is FloatPrompt. The files use that format. The folders describe what's in them.

---

## Trade-offs Considered

### Renaming root vs renaming .float/

**Trade-off:** Renaming `floatprompt/` only affects this repo. Renaming `.float/floatprompt/` affects all user projects.

**Decision:** Rename both. The clarity is worth it, and users benefit from the cleaner structure.

### FLOAT.md visibility

**Trade-off:** `FLOAT.md` (visible) adds files to every folder. `.float.md` (hidden) is cleaner but less discoverable.

**Decision:** Visible. Discoverability matters more than cleanliness. Like `README.md`, `FLOAT.md` signals "start here".

### Types as sibling vs nested

**Trade-off:** `types/` as sibling is flatter structure. `tools/types/` is deeper but more semantically correct.

**Decision:** Nested. "Types of tools" belongs inside `tools/`. Semantic accuracy beats flatness.

---

## Summary

The restructuring follows one core principle: **folders are named by purpose, not by format name**.

This principle, combined with the three pillars model and the JavaScript analogy, led to all 9 decisions. A fresh Claude reading this folder should understand not just WHAT changed, but WHY it changed.

---

*Decisions documented: 2025-12-30*
</md>
</fp>
