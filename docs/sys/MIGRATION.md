# Migration Tracker

Dissecting `artifacts/2025-12-31-context-compiler/` to find what's worth migrating to `docs/sys/`.

**Status:** Complete — all 27 files reviewed

---

## Files to Review

| # | File | Status | Action |
|---|------|--------|--------|
| 1 | `01-foundation.md` | reviewed | skip — covered in problem.md |
| 2 | `02-architecture.md` | reviewed | skip — concepts in decisions.md, Handlebars outdated |
| 3 | `03-technology.md` | reviewed | skip — superseded by TypeScript decision |
| 4 | `04-dual-cli.md` | reviewed | skip — simplified to "npm=install, AI=orchestrate" |
| 5 | `05-implementation.md` | reviewed | skip — Handlebars implementation, superseded |
| 6 | `06-tool-templates.md` | reviewed | skip — Handlebars partials, superseded |
| 7 | `07-output-templates.md` | reviewed | skip — Handlebars, trifecta concept in ai-wants-this.md |
| 8 | `07-templating-audit.md` | reviewed | skip — historical evidence for decision |
| 9 | `08-migration.md` | reviewed | skip — Handlebars migration plan, superseded |
| 10 | `08-technology-reassessment.md` | reviewed | skip — led to TypeScript, decision locked |
| 11 | `09-product-path.md` | reviewed | skip — product speculation, Handlebars-specific |
| 12 | `09-strategic-framing.md` | reviewed | extract → problem.md |
| 13 | `10-mds-trifecta.md` | reviewed | skip — vision in ai-wants-this.md |
| 14 | `10-vision-stack.md` | reviewed | extract RAG comparison → problem.md |
| 15 | `11-validation-assessment.md` | reviewed | extract validation thesis → problem.md |
| 16 | `12-typescript-direction.md` | reviewed | skip — decision in decisions.md, implementation superseded |
| 17 | `13-when.md` | reviewed | skip — historical, implementation has begun |
| 18 | `14-schema-first.md` | reviewed | skip — implemented, src/schema/ exists |
| 19 | `15-extended-trifecta.md` | reviewed | skip — exploration, trifecta in ai-wants-this.md |
| 20 | `16-float-interview.md` | reviewed | skip — future feature idea, not implemented |
| 21 | `17-mutable-immutable.md` | reviewed | skip — concept in problem.md already |
| 22 | `18-root-map-architecture.md` | reviewed | skip — navigation detail, core in problem.md |
| 23 | `20-implementation-plan.md` | reviewed | skip — partially superseded, has time estimates |
| 24 | `context.md` | reviewed | Already marked historical |
| 25 | `decisions.md` | reviewed | Already marked historical |
| 26 | `map.md` | reviewed | Already marked historical |
| 27 | `examples/` | reviewed | skip — Handlebars examples, superseded by TypeScript |

---

## Action Legend

- **skip** — Outdated, superseded, or not worth migrating
- **extract** — Has valuable content to extract into docs/sys/
- **reference** — Keep as historical reference, add pointer from docs/sys/
- **archive** — Move to archive folder

---

## Migration Notes

(Add notes here as we discuss each file)

---

## Extracted Content

| Source | Content | Destination |
|--------|---------|-------------|
| `09-strategic-framing.md` | "recursive context system" framing | problem.md |
| `10-vision-stack.md` | RAG vs FloatPrompt comparison | problem.md |
| `11-validation-assessment.md` | Three-claim validation thesis | problem.md |

---

*Temporary file — delete after migration complete*
