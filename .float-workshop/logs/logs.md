---
type: index
folder: logs
---

# Logs

Navigation map for decisions, sessions, activity.

> **Storage evolution:** This flat file structure is Phase 1 (prototyping). SQLite is now the source of truth (Phase 2-3 complete). The `log_entries` table stores decisions; summaries are `folders` rows with `type = 'log_month'`, etc. See `ref/vision.md`.

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
