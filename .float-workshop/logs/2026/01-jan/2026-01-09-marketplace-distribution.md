# Marketplace Distribution Model

**Date:** 2026-01-09
**Session:** 39
**Status:** locked

---

## Summary

Established distribution channel strategy: Claude Marketplace for the FloatPrompt plugin, npm for float-web. No namespace collision since these are entirely separate distribution systems.

---

## Decisions

### 1. Distribution Channel Split

**Decision:** Claude Marketplace for plugin (`floatprompt@mds`), npm for float-web (`floatprompt`). Different channels entirely.

**Rationale:** Claude Code plugins are NOT distributed via npm. The Marketplace is the native distribution system with `/plugin marketplace add` and `/plugin install`. This eliminates the namespace concern - npm package `floatprompt` and marketplace plugin `floatprompt@mds` live in completely separate ecosystems.

### 2. Repository Structure for Marketplace

**Decision:** Plugin lives in `plugins/floatprompt/`, marketplace.json at repo root `.claude-plugin/`, float-web in `web/`.

**Rationale:** When users install via marketplace, Claude Code copies the plugin directory to its cache. Everything must be self-contained inside `plugins/floatprompt/`. The marketplace.json file at `.claude-plugin/` points to this directory and handles discovery.

---

## Files Changed

- `.float-workshop/modes/deep-strategy.md` - Updated
- `.float-workshop/modes/deep-plugin.md` - Updated
- `.float-workshop/modes/MODES.md` - Updated
- `.float-workshop/active/floatprompt-plugin-PRD.md` - Updated
- `.float-workshop/active/floatprompt-plugin-spec.md` - Updated
- `artifacts/2026/01-jan/claude-code-plugins/marketplace.md` - Created
- `artifacts/2026/01-jan/claude-code-plugins/_claude-code-plugin-map.md` - Updated

---

*Session 39: Distribution clarity - marketplace for plugins, npm for web*
