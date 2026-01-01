# Templating Audit

Live audit of what Handlebars would handle across 15 tools.

---

## 1. Simple Variables ({{variable}})

| Variable | Count | Example |
|----------|-------|---------|
| `{{system.version}}` | 15 | `"version": "0.15.0"` |
| `{{system.author}}` | 15 | `"author": "@mds"` |
| `{{system.format}}` | 15 | `"format": "floatprompt"` |
| `{{system.repo}}` | 15 | `github.com/mds/floatprompt` |
| `{{system.tagline}}` | 15 | `the invisible OS for AI` |

**75 hardcoded values → 5 variables**

---

## 2. Path Variables ({{paths.*}})

| Path | References | Hardcoded Value |
|------|------------|-----------------|
| `{{paths.boot}}` | 26 | `.float/float.md` |
| `{{paths.nav}}` | 12 | `.float/project/nav/` |
| `{{paths.context}}` | 14 | `.float/project/context/` |
| `{{paths.logs}}` | 6 | `.float/project/logs/` |
| `{{paths.tools}}` | ~10 | `.float/tools/` |
| `{{paths.project}}` | ~8 | `.float/project/` |

**76 path references → 6 variables**

---

## 3. Partials ({{> partial}})

| Partial | Tools Using | Lines Saved |
|---------|-------------|-------------|
| `{{> duality}}` | 15 | 8-12 |
| `{{> status_format}}` | 15 | 4-6 |
| `{{> next_step_logic}}` | 13 | 3-5 |
| `{{> reporting}}` | 13 | 6-8 |
| `{{> containment}}` | 8 | 4-6 |
| `{{> footer}}` | 15 | 1 |
| `{{> meta_block}}` | 15 | 8 |
| `{{> human_block}}` | 15 | 4 |
| `{{> ai_block}}` | 15 | 3 |

**600+ duplicated lines → 9 partials**

---

## 4. Conditional Partials ({{#if}})

| Condition | Tools | Use |
|-----------|-------|-----|
| `{{#if has_buoys}}` | 4 | Include buoy section |
| `{{#if has_reporting}}` | 13 | Include reporting block |
| `{{#if has_containment}}` | 8 | Include containment principle |
| `{{#if has_phases}}` | 10 | Include phase sections |

---

## 5. Loops ({{#each}})

| Loop | Source | Output |
|------|--------|--------|
| `{{#each buoys}}` | tool.buoys[] | Buoy table + prompts |
| `{{#each sequences}}` | tool.sequences[] | Phase sections |
| `{{#each examples}}` | tool.examples[] | Example blocks |
| `{{#each next_steps}}` | tool.next_steps[] | Next command suggestions |

---

## 6. Generated Maps (Build-time)

| Map | Source | Output |
|-----|--------|--------|
| `{{> nav_table folder}}` | `ls {folder}/` | File table |
| `{{> subfolder_list folder}}` | `ls -d {folder}/*/` | Subfolder links |
| `{{> tool_list}}` | `ls .float/tools/*.md` | Tool inventory |
| `{{> command_table}}` | tools with commands | Command reference |

---

## 7. Cross-References (Computed)

| Reference | Computation |
|-----------|-------------|
| `{{tools.count}}` | Count of tools |
| `{{nav.count}}` | Count of nav files |
| `{{tools.with_buoys}}` | Filter by has_buoys |
| `{{tools.names}}` | Array for routing |

---

## Summary

| Category | Items | Manual Work Eliminated |
|----------|-------|------------------------|
| Simple variables | 5 | 75 per version bump |
| Path variables | 6 | 76 per restructure |
| Partials | 9 | 600+ lines duplication |
| Conditionals | 4 | Pattern consistency |
| Loops | 4 | Repetitive sections |
| Generated maps | 4 | Nav files, tool lists |
| Cross-references | 4 | Counts, filters |

---

## Pain Points Observed

During `/float-context` and `/float-sync` execution:

| Issue | Cause | Templating Fix |
|-------|-------|----------------|
| Context says v0.14.0, tools at v0.15.0-0.17.0 | Manual version updates | `{{system.version}}` |
| References `system.md`, file is `float.md` | Manual path updates | `{{paths.boot}}` |
| Only 2 nav files exist, 5 folders need them | Manual nav creation | Generated from scan |
| Footer repeated 15× identically | Copy-paste | `{{> footer}}` |

---

## The Big Wins

1. **Version bump**: 1 change → 15 files
2. **Path rename**: 1 change → 76 references
3. **Pattern update**: 1 partial → all tools
4. **New tool**: JSON config → full tool generated
5. **Nav sync**: Folder scan → nav file generated
6. **Consistency**: Build fails if partial missing
