<fp>
<json>
{
  "STOP": "Logs Archive. This governs how decisions/sessions/activity are logged. Read protocol before adding.",

  "id": "logs-archive",
  "title": "Logs Archive",

  "human": {
    "author": "@mds",
    "intent": "Manual prototype of recursive archive — will become automated"
  },

  "requirements": {
    "structure": {
      "hierarchy": "Collection → Series → File → Item",
      "mapping": {
        "collection": "logs/",
        "series": "YYYY/",
        "file": "MM-mon/",
        "item": "YYYY-MM-DD-topic.md"
      }
    },
    "protocol": {
      "add_decision": [
        "Create YYYY-MM-DD-topic.md in current month",
        "Update month's MM-mon.md with summary",
        "Update year's YYYY.md if new theme",
        "Update this file (wip-logs.md) only if new year"
      ],
      "decision_format": {
        "required": ["Date", "Status", "Decision"],
        "optional": ["Rationale", "Before/After", "Supersedes", "Files Changed", "Future Agent"]
      }
    },
    "summaries": {
      "root": "wip-logs.md — Map + open questions",
      "year": "YYYY.md — Themes + month links",
      "month": "MM-mon.md — Richest, all locked decisions listed"
    },
    "naming": {
      "convention": "File matches folder name (self-describing)",
      "examples": ["wip-logs/wip-logs.md", "2026/2026.md", "01-jan/01-jan.md"],
      "rationale": "When file is open in tab, you know exactly where it is"
    },
    "future_agents": {
      "purpose": "Document which agent type would best handle each log task — informs agent architecture",
      "agent_types": {
        "decision_logger": "Creates decision files (SQLite rows) — needs: judgment, writing",
        "parity_checker": "Finds stale references via SQLite queries — needs: SQL, pattern matching",
        "parity_fixer": "Updates multiple records for consistency — needs: edit, replace, judgment",
        "summary_writer": "PARTIALLY OBSOLETE — aggregation summaries become queries, original summaries still AI-generated"
      },
      "log_format": {
        "files_changed": "List of files touched",
        "work_type": "What kind of work (decision, parity, structure)",
        "suggested_agent": "Which agent type would do this"
      }
    }
  }
}
</json>
<md>
# Logs

> **Storage evolution:** This flat file structure is Phase 1 (prototyping). SQLite becomes the source of truth in Phase 2-3. The `log_entries` table replaces the folder hierarchy. See `wip-sqlite.md`.

Navigation map and open questions. Decisions, sessions, activity — all here.

---

## Map

| Year | Summary |
|------|---------|
| [2026](2026/) | Context-compiler development, foundational architecture |

---

## Open Questions

- **boot.md content** — What does production boot.md contain?
- **Vercel infrastructure** — AI SDK + Sandbox (locked 2026-01-02)
- **Trigger mechanism** — Webhooks, cron, manual, all?

---

## Protocol

When adding decisions:
1. Create `YYYY-MM-DD-topic.md` in current month folder
2. Update month's `MM-mon.md` with summary (e.g., `01-jan.md`)
3. Update year's `YYYY.md` if new theme emerges (e.g., `2026.md`)
4. Update `wip-logs.md` only if new year

**Naming:** File matches folder name. Self-describing — you always know where you are.

---

## Future Agents

We're manually doing work that agents will eventually automate. Document which agent would best handle each task.

| Agent Type | Capabilities | Work Examples |
|------------|--------------|---------------|
| **decision_logger** | judgment, writing, SQL | Create log entries in SQLite |
| **parity_checker** | SQL queries, pattern matching | Find stale references via JOIN queries |
| **parity_fixer** | SQL updates, judgment | Update multiple records for consistency |
| **summary_writer** | ~~compression, judgment~~ | **PARTIALLY OBSOLETE** — aggregation summaries become queries |

**Note:** With SQLite, `summary_writer` for aggregation (01-jan.md, 2026.md) is eliminated — those become queries. Original summary generation (AI describing a folder) is still needed.

**When logging decisions, include:**
- `Files Changed` — What files were touched
- `Future Agent` — Which agent type would do this work

This builds the spec for agent architecture by observing what we do manually.

---

*Manual prototype of recursive archive. Eventually: TypeScript + agents.*

*Renamed from decisions/ on 2026-01-02 — "logs" is the umbrella term.*
</md>
</fp>
