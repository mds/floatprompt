# Session 46: Boot Architecture Decisions

**Date:** 2026-01-09
**Session:** 46
**Status:** locked

---

## Summary

Locked boot architecture for the FloatPrompt plugin. float.db anchors to git root, AI discovers context emergently, agents live in dedicated .md files with shell orchestration, and boot.md uses rich JSON behavioral anchors.

---

## Decisions

### 1. Git Root Anchor

**Decision:** float.db always lives at git repository root via `git rev-parse --show-toplevel`
**Rationale:** Prevents orphan databases in subdirectories. One float.db per project, regardless of where `/float` is invoked.

### 2. Emergent Orientation

**Decision:** AI discovers what's in float.db and synthesizes natural response
**Rationale:** Not rigid templates. Context is emergent from the data. AI queries the database and forms understanding dynamically rather than following prescribed output formats.

### 3. Agent Separation

**Decision:** Prompts live in dedicated .md files (float-log.md, float-enrich.md), shell handles orchestration
**Rationale:** Clean separation of concerns. Markdown files contain the behavioral specification (what the agent does), shell scripts handle lifecycle (when and how to invoke). Easier to edit, test, and version.

### 4. boot.md with JSON Anchors

**Decision:** boot.md uses `<fp><json><md>` format with rich behavioral specification
**Rationale:** JSON provides machine-readable behavioral anchors (triggers, skills, defaults), markdown provides human-readable context. The combination allows both precise control and natural language explanation.

### 5. related_files Field

**Decision:** Added `related_files` column to log_entries schema
**Rationale:** Boot context needs to know which files are relevant to prior session handoffs. This complements `files_read` and `files_changed` for richer session continuity.

---

## Files Changed

- `plugins/floatprompt/lib/schema.sql` — Updated (related_files column)
- `plugins/floatprompt/agents/float-log.md` — Created
- `plugins/floatprompt/agents/float-enrich.md` — Created
- `plugins/floatprompt/hooks/float-handoff.sh` — Created
- `plugins/floatprompt/commands/float.md` — Created
- `plugins/floatprompt/templates/boot.md` — Created
- `plugins/floatprompt/templates/Float.md` — Removed (superseded by boot.md)

---

## Open: Distribution

**Status:** To be figured out

**Goal:** Distribute FloatPrompt plugin via:
1. **Anthropic Marketplace** (preferred) — `/plugin install floatprompt`
2. **GitHub** — `/plugin install github:mds/floatprompt`

**Questions to resolve:**
- What's the process for submitting to Anthropic's marketplace?
- Does the plugin need to live in its own repo, or can it be a subfolder?
- Any approval/review process?
- Versioning strategy for marketplace updates?

**Current state:** Plugin lives at `plugins/floatprompt/` in this repo. Code will ultimately be on GitHub.

---

*Session 46: Boot architecture locked*
