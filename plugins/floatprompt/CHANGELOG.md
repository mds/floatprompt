# Changelog

> **Note:** This file is temporary development logging and will be deleted before release. The real changelog lives in `log_entries` (float.db) and git commits. This exists only to track rapid iteration during initial development.

All notable changes to the FloatPrompt plugin.

## [1.1.1] - 2026-01-10

### Session 60
- **Research session skip** — Skip agents entirely when no files changed, saves ~$0.34/capture
- README parity audit: fixed version, updated float-capture.md section, fixed agent phase numbers
- **Two-tier capture system** — PreCompact/SessionEnd now mechanical-only (facts), manual `/float-capture` runs full agent pipeline (understanding)
- Renamed `float-capture.sh` → `capture.sh`
- Key message: "PreCompact saves facts. Manual capture saves understanding."

### Session 58
- **Session continuity fix** — Two-stage agent execution (entry writers → entry readers)
- Observability logging to `/tmp/float-agents-*.log`
- Removed Write tool from float-handoff (uses Bash heredoc)
- Added open questions resolution to float-decisions

## [1.1.0] - 2026-01-10

### Session 56
- **Phase 6: Distribution** — Added marketplace.json, restructured plugin.json to .claude-plugin/
- Rewrote float-log agent: UPDATE-first approach ensures enrichment completes

### Session 54
- Fixed claude CLI syntax in float-capture.sh (`-p` → positional arg + `--print`)

### Session 53
- Added Rust merkle scanner (~230x faster than bash)
- Bundled scanner in lib/scanner/ with platform detection
- Updated scan.sh to use Rust scanner with bash fallback

## [1.0.0] - 2026-01-09

### Session 51
- Added boot.sh for single-command boot queries (JSON output)
- Simplified float.md boot procedure to use boot.sh
- Split float-log into float-log + float-decisions (parallel agents)
- Restructured boot procedure into 4 explicit steps
- Added transcript truncation (last 500 lines) for agent efficiency
- Fleshed out float-context skill with proactive triggers

### Session 49
- Added agents, skills to plugin.json; created templates/handoff.md
- Created float-context skill for proactive context lookups
- Added First-Run Permissions section to float.md
- Fixed agent spawning (YAML frontmatter stripping in float-capture.sh)

### Session 48
- Consolidated float.md + boot.md into single comprehensive command
- Added MDS methodology, role framing, enrichment loop to float.md

### Session 45
- Added Philosophy & Methodology section: goals, MDS method, workshop README
- Added AI Wants This, Vision (Working Spec) to Core Concepts
- Expanded Related Documentation: 34 verified references across 7 categories
- Created README.md with full documentation
- Enhanced scan.sh: files table with SHA-256 hashes
- Fixed plugin.json schema validation (author, commands, hooks)
- Enhanced float-capture.sh: folder-level logging

### Session 44
- Initial plugin structure: all core components

### Session 43
- Schema created, float.db initialized
