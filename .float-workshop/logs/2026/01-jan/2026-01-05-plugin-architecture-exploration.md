# Plugin Architecture Exploration

**Date:** 2026-01-05
**Session:** 23
**Status:** Exploring

---

## Summary

Explored FloatPrompt as a Claude Code plugin. Studied 13 official plugins, mapped old `/float-*` commands to plugin structure, and documented findings.

---

## Key Findings

### Database State Corrected

Previous sessions believed the database had empty `description` and `content_md` fields. This was incorrect:
- All 65 scanned folders have AI-generated context (ran 2026-01-04)
- The actual gap: scan is from Jan 3rd, missing 39 folders (104 exist on disk)
- Missing: `src/buoys/`, `.float-workshop/`, and subdirectories

### Plugin Architecture Mapping

FloatPrompt's architecture maps naturally to Claude Code plugins:

| FloatPrompt | Plugin Equivalent |
|-------------|-------------------|
| `/float-*` commands | Slash commands |
| Buoy teams | Agents |
| `tool_capabilities` map | Agent trigger descriptions |
| `duality` pattern | Command logic |
| `human_checkpoint` | User approval |

### Relevant Official Plugins

| Plugin | Relevance |
|--------|-----------|
| **ralph-wiggum** | Iteration loops for batch buoy execution |
| **plugin-dev** | 7 skills, 8-phase workflow for building plugins |
| **feature-dev** | 7-phase workflow parallels Map → Decide → Structure |
| **hookify** | Create hooks without coding |

### Strategic Insight

FloatPrompt was built with Claude Code's command pattern in mind. The migration to plugin format is natural, not forced. Plugin-first could be fastest path to market:
- Native distribution via plugin marketplace
- Works with Claude first (as intended)
- Core (SQLite + buoys) stays portable for other platforms later

---

## Artifacts Created

- `.float-workshop/docs/plugin-architecture.md` — Full exploration document

---

## Open Questions

1. **Plugin scope** — Full FloatPrompt or just context layer?
2. **MCP vs Bash** — SQLite as MCP server or keep CLI?
3. **Portability trade-off** — How hard to extract Claude-specific layer later?
4. **Hybrid approach** — Plugin for Claude + npm package for programmatic use?

---

## Next Steps (Decided)

**Go plugin-first.** User confirmed: old `/float-*` markdown commands already worked with Claude. TypeScript + SQLite migration was for speed/staleness/context limits. Plugin is distribution layer on top of working engine.

**Immediate:**
1. Create `.claude-plugin/plugin.json` manifest
2. Create `commands/status.md` → calls `float-db status`
3. Test with `claude --plugin-dir ./floatprompt`

**Official docs pulled:** 14 markdown files in `artifacts/claude-code-plugins/` with full specs.

---

## Files Changed

- `.float-workshop/docs/plugin-architecture.md` — Created, then updated with official structure
- `.float-workshop/protocols/boot.md` — Updated with corrected state
- `artifacts/claude-code-plugins/` — 14 doc files pulled from official docs

---

*Session 23: Exploration, not decision — Map territory before committing direction*
