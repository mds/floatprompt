# Principles

Core design principles for FloatPrompt.

---

## Standalone + Chainable

Every tool, protocol, and buoy:

1. **Works independently** — single responsibility, testable in isolation
2. **Composes with others** — Unix philosophy, chain for complex behavior

```
# Standalone
claude -p "run update-logs"
float-db status

# Chained
handoff.md → update-logs → update-state
float-db scan && float-db generate
```

**Why:** Flexibility. Debug one piece. Swap components. Orchestrate as needed.

---

## AI-Native

Files designed for AI agents to read, update, and hand off:

- Lean pointers with summaries (not verbose prose)
- Self-describing folder structure
- Clear entry points (boot.md, _2_focus.md)
- Machine-readable where helpful (JSON, YAML frontmatter)

---

## Simplicity Over Bureaucracy

Avoid Jira-style bloat:

- No priorities beyond ordering
- No time estimates
- No assignees (AI or human picks up work)
- No tags/labels beyond folder structure
- State in 3 files, not 30 ticket types

**Heuristic:** If it needs a form to create, it's too complex.

---

## Progressive Disclosure

Context scaffolds from general to specific:

```
boot.md (project-level)
  → foundation/ (vision, principles)
    → specs/ (implementation details)
      → folder context (local knowledge)
```

Read what you need, when you need it.

---

## Paper Trail

All decisions logged:

- Session logs in `logs/YYYY/MM-mmm/`
- Decisions become specs when locked
- Nothing important lives only in conversation

---

*Added 2026-01-05*
