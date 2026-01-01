# Foundation

## The Format

FloatPrompt uses the `<fp><json><md></fp>` structure:

```
<fp>
  <json>
  {
    "STOP": "...",
    "meta": { ... },
    "human": { ... },
    "ai": { ... },
    "requirements": { ... }
  }
  </json>
  <md>
  # Human-readable content
  ...
  </md>
</fp>
```

**Dual architecture:**
- **JSON** = Behavior (how AI should act)
- **MD** = Methodology (what AI should do)

This structure is foundational. Every floatprompt follows it. The templating system compiles TO this format, not away from it.

---

## The Problem

### Current State: 16 Static Tools

Each tool is a standalone `.md` file with copy-pasted patterns:
- `float.md`, `float-sync.md`, `float-fix.md`, `float-context.md`
- `float-enhance.md`, `float-focus.md`, `float-harvest.md`, `float-delta.md`
- `float-relate.md`, `float-build.md`, `float-project.md`, `float-report.md`
- `float-all.md`, `float-think.md`, `tool-sync.md`, `update.md`

### Duplication Inventory

| Pattern | Duplicated Across |
|---------|-------------------|
| version field | All 16 tools |
| author field | All 16 tools |
| duality pattern | All 16 tools |
| status_format | All 16 tools |
| next_step_logic | All 16 tools |
| reporting protocol | 12 tools |
| buoy patterns | 8 tools |
| footer attribution | All 16 tools |

### Recent Pain Points

- `.txt → .md` migration: 6 files, 24 replacements, 20 minutes manual work
- Version bump 0.16.0 → 0.17.0: Touch every file
- Path reference updates after restructure: Touch every file
- Pattern refinement: Change in one place, manually propagate to N files

### Drift Examples

- Nav files say X, folder contains Y
- Context files describe old structure
- Tool references outdated paths
- Version mismatches between tools

### Maintenance Burden

Every change requires:
1. Identify all files affected
2. Make same change N times
3. Hope you didn't miss one
4. No validation that changes are consistent

---

## The Insight

### Current Model

```
Human writes static .md files
        ↓
AI reads static .md files
        ↓
Files drift from reality over time
```

### Compiled Model

```
Config defines truth (version, paths, patterns)
        ↓
Templates reference config
        ↓
Build compiles templates → .md files
        ↓
AI reads fresh, consistent .md files
        ↓
Reality and documentation stay synced
```

### The Central Insight

**FloatPrompt is a context compiler, not a file format.**

The `.md` files are build artifacts, not source files. You don't edit them directly. You edit config and templates, then build.

---

## Churn Analysis

From session analysis of 0.15.0 → 0.17.0 updates:

| Component | Tools Using | Churn Level | Extraction Priority |
|-----------|-------------|-------------|---------------------|
| `version` | All 16 | HIGH | 1 (every release) |
| Path references | All 16 | HIGH | 2 (structure changes) |
| `reporting` protocol | 12 | MEDIUM | 3 (stable pattern) |
| `status_format` | All 16 | MEDIUM | 4 (evolving) |
| `duality` pattern | All 16 | LOW | 5 (structural) |
| `footer` | All 16 | LOW | 6 (rarely changes) |
| Buoy prompts | 8 | LOW | 7 (tool-specific) |

**Extraction priority = churn level.** High-churn items get extracted first.

---

## What This Enables

| Before (Static) | After (Compiled) |
|-----------------|------------------|
| Version in 16 files | Version in 1 config |
| Manual path updates | Paths from config |
| Copy-paste patterns | Shared partials |
| Nav files drift | Nav generated from scan |
| Hope for consistency | Build enforces consistency |
| 20 min for .txt→.md | 1 config change, rebuild |
