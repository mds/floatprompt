# Unified Naming Decision

**Date:** 2026-01-09
**Session:** 40
**Status:** locked

---

## Summary

Established unified naming: **FloatPrompt** is the single brand name. Distribution channel disambiguates touchpoints. No separate product names needed.

---

## Decisions

### 1. One Brand, Multiple Touchpoints

**Decision:** FloatPrompt is the name for everything. No "FloatPrompt for Web" or "FloatPrompt for Repos."

**Rationale:** Like Stripe is Stripe whether you use the npm package, API, or dashboard. The distribution channel tells you which touchpoint:

| Touchpoint | Distribution | What It Does |
|------------|--------------|--------------|
| npm package | `npm install floatprompt` | Makes websites AI-readable |
| Claude plugin | `/plugin install floatprompt@mds` | Persistent context for codebases |
| Format files | Copy/paste | Portable AI tools (origin story) |

### 2. Workshop → .float/ Evolution

**Decision:** `.float-workshop/` is temporary scaffolding. It will become `.float/` when the plugin ships.

**Rationale:** Workshop is the manual prototype proving the patterns. The plugin automates those patterns. Once the plugin works well, workshop concepts (modes, decision logs, session continuity) live in `.float/` via float.db and native plugin components.

### 3. Directory Naming

**Decision:**
- Source code stays in `/web/` (not renamed to `/float/`)
- Output directory on user sites is `/float/`
- Hidden directory in codebases is `.float/`

**Rationale:** Source folder describes what it is to developers (`/web/` = web product source). Output folder is the brand presence (`/float/`). No confusion between source and output.

### 4. Buoys Question Deferred

**Decision:** Not decided this session. "Buoys as workers" vs "agents" is still open.

**Rationale:** User said "let's not answer these other questions right now." Can revisit later.

---

## Files Changed

- `.float-workshop/modes/deep-strategy.md` - Updated product naming to touchpoint model
- `.float-workshop/modes/deep-plugin.md` - Updated references
- `.float-workshop/modes/web.md` - Updated references, marked PRDs as historical
- `.float-workshop/modes/MODES.md` - Updated Available Modes table

---

*Session 40: Unified naming — FloatPrompt is the name, distribution disambiguates*
