# Workshop Restructure Spec

**Date:** 2026-01-04
**Status:** Ready to execute

---

## The Change

```
BEFORE:                              AFTER:
.float-wip/                          .float-workshop/
├── wip-boot.md                      ├── protocols/
├── wip-reconcile.md                 │   ├── boot.md
├── wip-buoys.md                     │   ├── handoff.md
├── wip-vision.md                    │   └── log.md
├── wip-generate-spec.md             ├── docs/
├── wip-comments.md                  │   ├── buoys.md
├── wip-workshop.md                  │   ├── vision.md
└── wip-logs/                        │   ├── generate-spec.md
    ├── wip-logs.md ─────────────────│   ├── comments.md
    └── 2026/01-jan/                 │   └── workshop.md
                                     └── logs/
                                         ├── logs.md  ← (map, split from wip-logs.md)
                                         └── 2026/01-jan/
```

---

## Why

1. **Redundancy** — `wip-` prefix on every file inside `wip/` folder is redundant
2. **Organization** — Group by purpose (protocols vs docs) not status
3. **Naming** — `workshop` describes function, `wip` describes status

---

## File Moves

| From | To |
|------|-----|
| `.float-wip/wip-boot.md` | `.float-workshop/protocols/boot.md` |
| `.float-wip/wip-reconcile.md` | `.float-workshop/protocols/handoff.md` |
| `.float-wip/wip-logs/wip-logs.md` | **SPLIT:** `.float-workshop/protocols/log.md` + `.float-workshop/logs/logs.md` |
| `.float-wip/wip-buoys.md` | `.float-workshop/docs/buoys.md` |
| `.float-wip/wip-vision.md` | `.float-workshop/docs/vision.md` |
| `.float-wip/wip-generate-spec.md` | `.float-workshop/docs/generate-spec.md` |
| `.float-wip/wip-comments.md` | `.float-workshop/docs/comments.md` |
| `.float-wip/wip-workshop.md` | `.float-workshop/docs/workshop.md` |
| `.float-wip/wip-logs/2026/` | `.float-workshop/logs/2026/` |

---

## Decision: Historical References in Logs

**Status:** LOCKED

**Question:** Should we update `wip-` references in historical log entries (e.g., `logs/2026/01-jan/*.md`)?

**Decision:** **NO — Leave historical references as-is.**

**Rationale:**
1. Historical logs are a **record of what was true at the time**
2. Updating them would falsify history
3. The context of "wip-boot.md" in a Jan 2 entry makes sense — that's what it was called then
4. Anyone reading historical logs understands naming evolves
5. Only update **protocol files** and **active docs**, not archived decision logs

**What gets updated:**
- `protocols/boot.md`, `protocols/handoff.md`, `protocols/log.md`
- `docs/*.md`
- `logs/2026/01-jan/01-jan.md` (the month summary — living document)

**What stays unchanged:**
- Individual decision files: `logs/2026/01-jan/2026-01-02-*.md`, `2026-01-03-*.md`, etc.
- These are historical records, not active references

---

## Blast Radius: Internal References

### protocols/boot.md (formerly wip-boot.md)

**Line-by-line references to update:**

| Line | Context | Old | New |
|------|---------|-----|-----|
| 34 | JSON `paper_trail` | `wip-logs/YYYY/MM-mon/` | `logs/YYYY/MM-mon/` |
| 60 | Last Session | `wip-buoys.md` | `docs/buoys.md` |
| 76 | Read first | `wip-buoys.md` | `docs/buoys.md` |
| 185 | Narrative | `imported from wip-logs/` | `imported from logs/` |
| 206 | What Remains | `This wip-boot.md` | `This boot.md` |
| 215-230 | **FOLDER STRUCTURE DIAGRAM** | Entire block | Rewrite (see below) |
| 244 | Completed | `wip-schema-spec.md` | `docs/schema-spec.md` (archived) |
| 302-309 | Drill-Down Files table | All `wip-*` refs | New paths |
| 304 | Drill-Down | `(WORKING DOC)` | `(LOCKED)` — text is stale |
| 319-326 | Archived files | `wip-logs/.../` | `logs/.../` |
| 333 | Session Protocol | `wip-logs/YYYY/MM-mon/` | `logs/YYYY/MM-mon/` |
| 338 | When ending | `wip-reconcile.md` | `protocols/handoff.md` |
| 341 | When ending | `wip-* files` | `protocols/* and docs/* files` |

**Folder structure diagram (lines 215-230) — FULL REWRITE:**

```
.float-workshop/
├── protocols/
│   ├── boot.md        ← THIS FILE (session boot)
│   ├── handoff.md     ← Session handoff protocol
│   └── log.md         ← Decision logging protocol
├── docs/
│   ├── buoys.md       ← LOCKED buoy schema
│   ├── vision.md      ← THE vision document
│   ├── generate-spec.md ← Layer 2 spec (reference)
│   ├── comments.md    ← TypeScript commenting standards
│   └── workshop.md    ← Workshop concept (parked)
└── logs/
    ├── logs.md        ← Map of all logs (split from wip-logs.md)
    └── 2026/01-jan/

.float/
└── float.db           ← THE database (Layer 1 complete)

src/db/                ← TypeScript implementation (production-ready)
```

Also update JSON block:
- `"id": "context-compiler-boot"` — keep as-is (ID doesn't change)

### protocols/handoff.md (formerly wip-reconcile.md)

**Line-by-line references to update:**

| Line | Context | Old | New |
|------|---------|-----|-----|
| 4 | JSON STOP | `Updates wip-boot, reconciles wip-* files` | `Updates boot.md, reconciles protocol and doc files` |
| 8 | JSON id | `"id": "wip-reconcile"` | `"id": "handoff"` |
| 23 | JSON phase | `list all wip-* files` | `list all protocol and doc files` |
| 25 | JSON phase | `Update wip-boot.md` | `Update boot.md` |
| 26 | JSON phase | `across wip-* files` | `across protocol and doc files` |
| 58 | Bash comment | `# List all wip-* files` | `# List all protocol and doc files` |
| 59 | Bash | `ls .float-wip/wip-*.md` | `ls .float-workshop/protocols/*.md .float-workshop/docs/*.md` |
| 62 | Action | `wip-* files may be added` | `protocol and doc files may be added` |
| 68-70 | Known patterns | `wip-boot.md`, `wip-*.md`, `wip-reconcile.md` | New names |
| 74 | Discovery | `ls .float-wip/wip-*.md` | See line 59 |
| 83 | Goal | `wip-* folder` | `protocols/ and docs/ folders` |
| 87 | Archive when | `A wip-* file should be archived` | `A doc file should be archived` |
| 88-89 | Archive examples | `wip-phase3.md`, `wip-overview.md` | Keep as historical examples |
| 94 | How to Archive | `wip-logs/YYYY/MM-mon/` | `logs/YYYY/MM-mon/` |
| 96 | Bash git mv | `git mv wip-phase3.md wip-logs/...` | `git mv docs/phase3.md logs/...` |
| 100-112 | Example markdown block | Contains `wip-phase3.md`, `wip-overview.md`, `wip-vision.md` | Update examples |
| 118-121 | What to Keep | `wip-boot.md`, `wip-reconcile.md`, `wip-vision.md` | New names |
| 126 | Section title | `## Phase 3: Update wip-boot.md` | `## Phase 3: Update boot.md` |
| 150-151 | Example | `wip-schema-spec.md`, `wip-vision.md` | `docs/schema-spec.md`, `docs/vision.md` |
| 166 | Example | `wip-schema-spec.md` | `docs/schema-spec.md` |
| 171 | Example | `wip-phase4-qa.md` | `docs/phase4-qa.md` |
| 178-180 | Bad example | `wip-boot.md`, `wip-vision.md`, `wip-phase4-qa.md` | New names |
| 190 | Example | `wip-generate-spec` | `docs/generate-spec` |
| 223 | Section title | `## Phase 4: Cross-reference wip-* Files` | `## Phase 4: Cross-reference Files` |
| 254-261 | Log decisions | `wip-logs.md`, `wip-logs/wip-logs.md` | `log.md`, `protocols/log.md` |
| 292-296 | Checklist | `wip-logs/`, `wip-boot.md`, `wip-* files` | New paths |
| 301, 310 | Self-ref | `wip-reconcile.md` | `handoff.md` |
| 315 | Bash grep | `.float-wip/*.md` | `.float-workshop/protocols/*.md .float-workshop/docs/*.md` |
| 328-331 | Agent table | `wip-* files`, `wip-boot.md` | New patterns |
| 341-372 | Example session | Multiple `wip-` refs | **Add note: "Example from before restructure"** or rewrite |

### protocols/log.md (formerly wip-logs/wip-logs.md)

**Line-by-line references to update:**

| Line | Context | Old | New |
|------|---------|-----|-----|
| 29 | JSON add_decision | `Update this file (wip-logs.md)` | `Update logs.md only if new year` |
| 37 | JSON summaries.root | `wip-logs.md — Map + open questions` | `logs.md — Map + open questions` |
| 42-44 | JSON naming | `"convention": "File matches folder name"` | **UPDATE RATIONALE** (see below) |
| 43 | JSON naming.examples | `["wip-logs/wip-logs.md", ...]` | `["logs/logs.md", "logs/2026/2026.md", "logs/2026/01-jan/01-jan.md"]` |
| 66 | Markdown | `See wip-vision.md` | `See docs/vision.md` |
| 94 | Protocol step | `Update wip-logs.md only if new year` | `Update log.md only if new year` |

**Naming convention solution:**

Split the current `wip-logs.md` into TWO files:

| File | Purpose | Naming |
|------|---------|--------|
| `protocols/log.md` | HOW to log decisions (the protocol) | Protocol file |
| `logs/logs.md` | WHAT's in the logs (map + open questions) | Matches folder name ✓ |

This preserves the "file matches folder" convention:
- `logs/logs.md` — matches ✓
- `logs/2026/2026.md` — matches ✓
- `logs/2026/01-jan/01-jan.md` — matches ✓

**Content split:**
- `protocols/log.md` gets: JSON requirements (structure, protocol, naming, future_agents), "## Protocol" section
- `logs/logs.md` gets: "## Map" (year links), "## Open Questions", footer notes

**Update to file moves table:**

| From | To |
|------|-----|
| `.float-wip/wip-logs/wip-logs.md` | **SPLIT** into `protocols/log.md` AND `logs/logs.md` |

Also update JSON block:
- `"id": "logs-archive"` → `"id": "log-protocol"` (for clarity)
- Keep `"collection": "logs/"` (relative path still works from new location)

### docs/vision.md, docs/buoys.md, etc.

| Old Reference | New Reference |
|---------------|---------------|
| `wip-boot.md` | `protocols/boot.md` |
| `wip-*.md` references | Corresponding new paths |

### logs/2026/01-jan/01-jan.md

| Old Reference | New Reference |
|---------------|---------------|
| `.float-wip/` | `.float-workshop/` |

(File links within logs/ are relative, should still work)

---

## Execution Order

```bash
# 1. Create folder structure
mkdir -p .float-workshop/protocols
mkdir -p .float-workshop/docs
mkdir -p .float-workshop/logs

# 2. Move protocol files
cp .float-wip/wip-boot.md .float-workshop/protocols/boot.md
cp .float-wip/wip-reconcile.md .float-workshop/protocols/handoff.md
# NOTE: wip-logs.md is SPLIT — see step 2b

# 2b. Split wip-logs.md into protocol + summary
# Extract protocol sections → protocols/log.md
# Extract map/questions → logs/logs.md
# (Manual edit required — see "Content split" section)

# 3. Move doc files
cp .float-wip/wip-buoys.md .float-workshop/docs/buoys.md
cp .float-wip/wip-vision.md .float-workshop/docs/vision.md
cp .float-wip/wip-generate-spec.md .float-workshop/docs/generate-spec.md
cp .float-wip/wip-comments.md .float-workshop/docs/comments.md
cp .float-wip/wip-workshop.md .float-workshop/docs/workshop.md

# 4. Move logs (preserve structure)
cp -r .float-wip/wip-logs/2026 .float-workshop/logs/

# 5. Update internal references (see blast radius tables)

# 6. Verify all references resolve

# 7. Remove old folder
rm -rf .float-wip
```

---

## Reference Updates (Find/Replace)

### Global replacements (all files)

| Find | Replace |
|------|---------|
| `.float-wip/` | `.float-workshop/` |
| `wip-boot.md` | `protocols/boot.md` |
| `wip-reconcile.md` | `protocols/handoff.md` |
| `wip-logs/wip-logs.md` | `protocols/log.md` |
| `wip-logs.md` (standalone) | `protocols/log.md` |
| `wip-buoys.md` | `docs/buoys.md` |
| `wip-vision.md` | `docs/vision.md` |
| `wip-generate-spec.md` | `docs/generate-spec.md` |
| `wip-comments.md` | `docs/comments.md` |
| `wip-workshop.md` | `docs/workshop.md` |
| `wip-logs/2026/` | `logs/2026/` |
| `wip-logs/` | `logs/` |

### Pattern replacements

| Find Pattern | Replace Pattern |
|--------------|-----------------|
| `wip-logs/YYYY/MM-mon/` | `logs/YYYY/MM-mon/` |
| `ls .float-wip/wip-*.md` | `ls .float-workshop/protocols/*.md .float-workshop/docs/*.md` |

---

## Files to Update

Priority order (dependencies flow down):

1. **protocols/boot.md** — Entry point, most references
2. **protocols/handoff.md** — References boot and log protocol
3. **protocols/log.md** — Protocol (split from wip-logs.md)
4. **logs/logs.md** — NEW file (map, split from wip-logs.md)
5. **docs/buoys.md** — References boot
6. **docs/vision.md** — May reference other docs
7. **docs/generate-spec.md** — May reference other docs
8. **docs/workshop.md** — References the wip pattern
9. **logs/2026/01-jan/01-jan.md** — One reference to `.float-wip/`

---

## Verification

After restructure, run:

```bash
# Check for any remaining wip- references in protocols and docs
grep -r "wip-" .float-workshop/protocols/ .float-workshop/docs/
# Should return 0 results

# Check for any remaining .float-wip references
grep -r "\.float-wip" .float-workshop/
# Should return 0 results

# Check logs for expected historical references (these are OK)
grep -r "wip-" .float-workshop/logs/
# Will return results — this is expected and correct (historical records)
```

**Expected grep results:**
- `protocols/*.md` — 0 matches (all updated)
- `docs/*.md` — 0 matches (all updated)
- `logs/logs.md` — 0 matches (new file, clean)
- `logs/2026/01-jan/01-jan.md` — 0 matches (living document, updated)
- `logs/2026/01-jan/2026-01-02-*.md` — matches OK (historical)
- `logs/2026/01-jan/2026-01-03-*.md` — matches OK (historical)
- `logs/2026/01-jan/2026-01-04-*.md` — matches OK (historical, including this spec)

---

## Commit Message

```
Restructure .float-wip → .float-workshop

New structure groups by purpose:
- protocols/ — boot, handoff, log (run these processes)
- docs/ — buoys, vision, generate-spec, etc. (read for reference)
- logs/ — decision archive

Removes redundant wip- prefix from all filenames.
```

---

*Spec created 2026-01-04 — Ready for execution in separate session*
