# Focus

**Purpose:** Active this session — what we're working on NOW.

**Updated by:** `protocols/update-123.md`

---

## Active

### Plugin Architecture
**Doc:** [docs/plugin-architecture.md](docs/plugin-architecture.md)
**Status:** In progress (exploring)
**Summary:** Converting FloatPrompt to Claude Code native plugin. Session 23 decided plugin-first is fastest path to market. Mapping old `/float-*` commands to plugin structure. Using hybrid format (YAML frontmatter + `<fp><json><md>` body).

---

## Context

Links to reference material for current focus:

- [docs/foundation/vision.md](docs/foundation/vision.md) — The north star
- [docs/specs/buoys.md](docs/specs/buoys.md) — Buoy architecture (maps to plugin agents)
- [artifacts/claude-code-plugins/create-plugins.md](artifacts/claude-code-plugins/create-plugins.md) — Official plugin tutorial

---

## Next Actions

1. Create `.claude-plugin/plugin.json` manifest
2. Create `commands/status.md` → calls `float-db status`
3. Test with `claude --plugin-dir ./floatprompt`
4. Add more commands: `details.md`, `sync.md`, `generate.md`
