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
        "Update month index.md with summary",
        "Update year index.md if new theme",
        "Update this index only if new year"
      ],
      "decision_format": {
        "required": ["Date", "Status", "Decision"],
        "optional": ["Rationale", "Before/After", "Supersedes"]
      }
    },
    "summaries": {
      "root": "Map + open questions (this file)",
      "year": "Themes + month links",
      "month": "Richest — all locked decisions listed"
    }
  }
}
</json>
<md>
# Logs

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
2. Update month's `index.md` with summary
3. Update year's `index.md` if new theme emerges
4. Update this index only if new year

---

*Manual prototype of recursive archive. Eventually: TypeScript + agents.*

*Renamed from decisions/ on 2026-01-02 — "logs" is the umbrella term.*
</md>
</fp>
