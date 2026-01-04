<fp>
<json>
{
  "STOP": "Logs Map. Navigate to decisions, sessions, activity.",

  "id": "logs-map",
  "title": "Logs",

  "human": {
    "author": "@mds",
    "intent": "Central navigation for all logged decisions"
  }
}
</json>
<md>
# Logs

> **Storage evolution:** This flat file structure is Phase 1 (prototyping). SQLite is now the source of truth (Phase 2-3 complete). The `log_entries` table stores decisions; summaries are `folders` rows with `type = 'log_month'`, etc. See `docs/vision.md`.

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

*Renamed from decisions/ on 2026-01-02 — "logs" is the umbrella term.*

*Updated 2026-01-03 — SQLite is now source of truth, summaries are folder rows.*
</md>
</fp>
