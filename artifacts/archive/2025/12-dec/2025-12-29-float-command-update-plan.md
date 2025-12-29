---
title: Float Command Update Plan
type: plan
status: executed
created: 2025-12-29

human_author: MDS
human_intent: Make /float tools self-contained, remove broken spec references
human_context: Tools must work for npx users who don't have specs/ folder

ai_model: Claude Opus 4.5
ai_updated: 2025-12-29
ai_notes: Executed successfully. 9 files updated, v0.1.3 ready for publish.
---

# Float Command Update Plan

**Problem:** `/float` tools reference specs that don't ship with `npx floatprompt`. Users get broken references.

**Solution:** Make each tool self-contained, like `core/os.md` pattern.

---

## Full Audit Results

### CRITICAL BUG: npx floatprompt CRASHES

```
bin/floatprompt.js line 189:
  copyFileSync(.float/tools/context-creator.md, ...)

But context-creator.md was RENAMED to float-context.md.
File doesn't exist. Init crashes.
```

### What Currently Ships

| Source | Destination | Status |
|--------|-------------|--------|
| `templates/.float/system.md` | `.float/system.md` | OK |
| `templates/.float/nav/root.md` | `.float/nav/root.md` | OK |
| `.float/tools/context-creator.md` | `.float/tools/context-creator.md` | **BROKEN** (file doesn't exist) |
| `core/prompt.md` | `.float/core/prompt.md` | OK |
| `core/doc.md` | `.float/core/doc.md` | OK |
| `core/os.md` | `.float/core/os.md` | OK |
| `.claude/commands/float.md` | `.claude/commands/float.md` | Has broken refs |

### What SHOULD Ship (but doesn't)

```
.float/tools/
  ├── float.md           ← NOT COPIED
  ├── float-sync.md      ← NOT COPIED
  ├── float-context.md   ← NOT COPIED
  └── float-enhance.md   ← NOT COPIED
```

### Broken References in Shipped Files

| File | Broken Reference |
|------|------------------|
| `.claude/commands/float.md` | `specs/claude/commands.md` |
| `.claude/commands/float.md` | `specs/claude/buoys.md` |
| `.float/tools/float.md` | Footer: `specs/claude/commands.md` |
| `.float/tools/float-sync.md` | Footer: `specs/claude/commands.md` |
| `.float/tools/float-context.md` | Footer: `specs/claude/commands.md` |
| `.float/tools/float-enhance.md` | Footer: `specs/claude/commands.md` |

### Good External Links (keep as-is)

| File | Link | Status |
|------|------|--------|
| `core/os.md` | `github.com/mds/floatprompt/docs/use.md` | Valid |
| `core/os.md` | `floatprompt.com` | Valid |
| `core/prompt.md` | `floatprompt.com` (comment) | Valid |

---

## Guiding Principle

> The tools ARE the documentation for npx users. Specs are for maintainers.

Like `core/os.md` (690 lines, completely self-contained) — tools should operate without external references.

---

## Files to Update

### 1. `.claude/commands/float.md` (Router)

**Current:**
```markdown
## Reference

Full specification: `specs/claude/commands.md`
Buoy pattern: `specs/claude/buoys.md`
```

**Change:** Remove Reference section entirely. Router doesn't need it — it just routes to tools.

---

### 2. `.float/tools/float.md` (Boot)

**Current footer:**
```markdown
*Part of the Float Command System — specs/claude/commands.md*
```

**Change:** Remove footer. Tool is self-contained.

---

### 3. `.float/tools/float-sync.md` (Sync)

**Current:**
- Lists 5 buoy types with detailed prompts
- Footer references specs/claude/commands.md
- No mention of 3+ rule or AI discretion

**Changes:**

1. **Remove footer** (broken reference)

2. **Add AI Discretion section** after "Exclusions":
```markdown
## AI Discretion

**The 3+ Rule:** Spawn buoys when 3+ parallel operations needed. Below threshold, direct execution OK.

- **1-2 operations:** Direct execution acceptable
- **3+ operations:** Spawn fleet for parallelization
- **Descriptions:** AI judges obvious vs complex — write directly or use placeholders

Outcomes matter, method is flexible.
```

3. **Keep buoy prompts** — they describe WHAT to do, discretion is WHEN

---

### 4. `.float/tools/float-context.md` (Context)

**Current footer:**
```markdown
*Part of the Float Command System — specs/claude/commands.md*
```

**Change:** Remove footer. Tool is self-contained.

---

### 5. `.float/tools/float-enhance.md` (Enhance)

**Current footer:**
```markdown
*Part of the Float Command System — specs/claude/commands.md*
```

**Change:** Remove footer. Tool is self-contained.

---

## What NOT to Change

- **Buoy prompts in float-sync.md** — Keep them. They describe behavior patterns.
- **Tool structure** — Already good. Just removing broken refs.
- **specs/claude/*.md in repo** — Keep for maintainers. Just not referenced from tools.

---

## Verification

After changes:

1. **No broken references:** `grep -r "specs/claude" .float/` returns nothing
2. **No broken references:** `grep -r "specs/claude" .claude/` returns nothing
3. **Tools operational:** Each tool can execute without external files
4. **3+ rule present:** `float-sync.md` contains discretion guidance

---

## CRITICAL: bin/floatprompt.js is broken

**Current state:**
- Copies `context-creator.md` — file was RENAMED to `float-context.md`
- Does NOT copy any of the 4 float tools — users don't get them!

**What npx users currently get:**
```
.float/tools/
  └── context-creator.md  ← STALE (file doesn't exist in repo)
```

**What they should get:**
```
.float/tools/
  ├── float.md
  ├── float-sync.md
  ├── float-context.md
  └── float-enhance.md
```

### bin/floatprompt.js Changes Required

**Init section (lines 188-191):** Replace context-creator with all 4 tools:
```javascript
// Copy tools
const toolFiles = ['float.md', 'float-sync.md', 'float-context.md', 'float-enhance.md'];
for (const file of toolFiles) {
  const src = join(packageRoot, '.float', 'tools', file);
  const dest = join(cwd, '.float', 'tools', file);
  copyFileSync(src, dest);
  created.push(`.float/tools/${file}`);
}
```

**Update section (lines 58-61):** Same fix:
```javascript
// Update tools
const toolFiles = ['float.md', 'float-sync.md', 'float-context.md', 'float-enhance.md'];
for (const file of toolFiles) {
  const src = join(packageRoot, '.float', 'tools', file);
  const dest = join(cwd, '.float', 'tools', file);
  copyFileSync(src, dest);
  updated.push(`.float/tools/${file}`);
}
```

---

## CRITICAL: templates/.float/system.md

This file gets copied during init. Needs TWO changes:

1. **Add "FloatPrompt Source" section**

2. **Update structure map** (currently shows stale context-creator.md):
```
# Before:
│   ├── tools/         # System tools
│   │   └── context-creator.md

# After:
│   ├── tools/         # System tools
│   │   ├── float.md
│   │   ├── float-sync.md
│   │   ├── float-context.md
│   │   └── float-enhance.md
```

---

## Summary

| File | Action |
|------|--------|
| `bin/floatprompt.js` | Fix tool copying (4 files instead of stale context-creator) |
| `templates/.float/system.md` | Add FloatPrompt Source section |
| `.float/system.md` | Add FloatPrompt Source section |
| `.claude/commands/float.md` | Remove Reference section |
| `.float/tools/float.md` | Replace footer with repo link |
| `.float/tools/float-sync.md` | Replace footer + add AI Discretion section |
| `.float/tools/float-context.md` | Replace footer with repo link |
| `.float/tools/float-enhance.md` | Replace footer with repo link |

**8 files total. bin/floatprompt.js fix is critical — /float commands currently don't work for npx users.**

---

## Architecture: Self-Contained + Linked Back

**The pattern:** Tools are self-contained AND reference the source repo for deeper context.

Like a car:
- Runs without the owner's manual
- But there's a sticker: "Full manual at floatprompt.com"

### Implementation

**Add to `.float/system.md`:**
```markdown
## FloatPrompt Source

This system was scaffolded by [floatprompt](https://github.com/mds/floatprompt).

For full documentation, specs, and examples:
- GitHub: https://github.com/mds/floatprompt
- Docs: https://floatprompt.com
```

**Add footer to each tool file:**
```markdown
---
*[FloatPrompt](https://github.com/mds/floatprompt) — the invisible OS for AI*
```

This replaces the broken `specs/claude/commands.md` reference with a working link to the source.

### What This Achieves

| Layer | Content | Location |
|-------|---------|----------|
| **Operational** | Everything needed to run | `.float/` (ships with npx) |
| **Reference** | Deep specs, philosophy, examples | floatprompt repo (linked) |

Users can:
1. Use tools immediately (self-contained)
2. Go deeper when curious (follow links)

### Updated File Changes

| File | Changes |
|------|---------|
| `.float/system.md` | Add "FloatPrompt Source" section with repo link |
| `.claude/commands/float.md` | Remove Reference section |
| `.float/tools/float.md` | Replace footer with repo link |
| `.float/tools/float-sync.md` | Replace footer, add AI Discretion section |
| `.float/tools/float-context.md` | Replace footer with repo link |
| `.float/tools/float-enhance.md` | Replace footer with repo link |

---

## Version Bump

These changes fix a broken npm package. Should bump version:
- Current: Check package.json
- Suggested: Patch bump (0.1.x → 0.1.x+1) since it's a fix

---

## Execution Order

1. **bin/floatprompt.js** — Fix critical tool copying issue
2. **templates/.float/system.md** — Add source section
3. **.float/system.md** — Add source section
4. **.claude/commands/float.md** — Remove broken references
5. **.float/tools/*.md** — Update all 4 footers (+ AI Discretion in sync)
6. **package.json** — Bump version
7. **Verify** — Run grep checks
8. **Log** — Update session log
9. **Publish** — npm publish (separate step)

---

## Execution Summary

**Status:** ✅ Executed 2025-12-29

**Files updated (9):**
1. `bin/floatprompt.js` — Fixed tool copying
2. `templates/.float/system.md` — Added source section + fixed structure map
3. `.float/system.md` — Added source section
4. `.claude/commands/float.md` — Removed broken refs, added footer
5. `.float/tools/float.md` — Replaced footer
6. `.float/tools/float-sync.md` — Replaced footer + added AI Discretion
7. `.float/tools/float-context.md` — Replaced footer
8. `.float/tools/float-enhance.md` — Replaced footer
9. `package.json` — Bumped 0.1.2 → 0.1.3

**Verification passed:**
- No broken `specs/claude` references in shipped files
- All 4 tool files exist
- Version bumped

**Next:** `npm publish` to release v0.1.3
