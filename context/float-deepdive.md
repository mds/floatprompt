---
title: FloatPrompt Deep Dive
type: context
status: current
created: 2025-12-28

human_author: MDS
human_intent: Provide complete context path for full FloatPrompt understanding
human_context: 23+ files, ~15 minutes, 5 MDS loops

ai_model: Claude Opus 4
ai_updated: 2025-12-28
ai_notes: |
  Full context path based on actual session where this was developed
  Includes real examples and historical context
---

# FloatPrompt Deep Dive

**Complete context for full operational understanding.** 23+ files, ~15 minutes, 5 MDS loops.

---

## When to Use

- Building complex floatprompt tools
- System evolution or maintenance
- Strategic work requiring full context
- Deep collaboration sessions
- Learning FloatPrompt thoroughly

---

## The Loops

```
Loop 1: Boot
├── Map: Read system.md, index.md
├── Decide: Follow boot sequence
└── Structure: Initial awareness

Loop 2: Verify
├── Map: Traverse all index files
├── Decide: Check integrity
└── Structure: Confirmed project state

Loop 3: Deepen
├── Map: Read template, OS, manifesto
├── Decide: Focus on philosophy
└── Structure: Understood the "why"

Loop 4: Ground
├── Map: Read real examples
├── Decide: See the spectrum
└── Structure: Practical understanding

Loop 5: Complete
├── Map: What's still fuzzy?
├── Decide: Fill specific gaps
└── Structure: Full context achieved
```

---

## Loop 1: Boot (3 files)

| # | File | What You'll Learn |
|---|------|-------------------|
| 1 | `_float/system.md` | Boot protocol, structure map, behavioral constraints |
| 2 | `_float/nav/root.md` | Repository structure, file format overview |
| 3 | `_float/logs/YYYY-MM-DD.md` | Current project state, recent activity |

**Outcome:** Understood boot protocol and current state.

---

## Loop 2: Verify (8 files)

Read all `_float/nav/*.md` files (centralized navigation):

| # | File | What You'll Learn |
|---|------|-------------------|
| 4 | `_float/nav/docs.md` | Reading order, key concepts |
| 5 | `_float/nav/context.md` | Onboarding document purpose |
| 6 | `_float/nav/dev.md` | Update workflow |
| 7 | `_float/nav/experimental.md` | Legacy build system |
| 8 | `_float/nav/artifacts.md` | Historical archive |
| 9 | `_float/nav/core.md` | Core template files |
| 10 | `_float/nav/examples.md` | Real examples |

**Outcome:** Verified structure, confirmed integrity.

---

## Loop 3: Deepen (6 files)

| # | File | What You'll Learn |
|---|------|-------------------|
| 13 | `docs/goals.md` | Goal hierarchy: voice > behavior > artifacts |
| 14 | `docs/principles.md` | Recognition before action, slow is smooth |
| 15 | `context/float-context.md` | Three-component distinction |
| 16 | `core/prompt.md` | The template with placeholders |
| 17 | `docs/philosophy/manifesto.md` | *Why* FloatPrompt exists |
| 18 | `core/os.md` | Full OS with Map/Decide/Structure modes |

**Outcome:** Understood the template, OS, and philosophical foundation.

---

## Loop 4: Ground (3 files)

Read real examples to see theory in practice:

| # | File | What You'll Learn |
|---|------|-------------------|
| 19 | `examples/ai portfolio coach/ai-portfolio-coach-v1.txt` | Complex coach (729 lines, multi-phase, HTML output) |
| 20 | `examples/design feedback extractor/design_feedback_extractor.txt` | Simple extractor (86 lines, surgical, archaeological) |
| 21 | `examples/shortform script writer/.../shortform-script-writer.txt` | Writer that chains from extractor (200 lines) |

**Outcome:** Saw the full spectrum from simple to complex.

---

## Loop 5: Complete (3 files)

Fill remaining gaps:

| # | File | What You'll Learn |
|---|------|-------------------|
| 22 | `core/doc.md` | FloatDoc tool, field ownership model |
| 23 | `docs/voice.md` | Voice preservation rules, what to avoid |
| 24 | `docs/mds-method.md` | Universal methodology, loop structure |

**Outcome:** Complete operational understanding.

---

## Context Domains Achieved

| Domain | Status | Source Files |
|--------|--------|--------------|
| Architecture | Complete | 1, 2, 15 |
| Philosophy | Complete | 13, 14, 17 |
| Methodology | Complete | 18, 24 |
| Voice Preservation | Complete | 18, 23 |
| File Formats | Complete | 15, 16, 22 |
| Real Examples | Complete | 19, 20, 21 |
| Project State | Complete | 3, 4-12 |

---

## The Test

After each loop, ask:

> "Do I understand enough to do what I need to do?"

- **Yes** → Proceed to action
- **No** → Continue to next loop
- **Partially** → Loop on specific gaps

---

## Result

After all 5 loops, you have:

- **Full architecture understanding** (FloatDoc, FloatPrompt, FloatSystem)
- **Deep philosophy** (why it exists, what it protects)
- **Methodology mastery** (MDS loops, friction pipeline)
- **Voice preservation rules** (what to preserve, what to avoid)
- **Practical grounding** (real examples at different complexity levels)
- **Project state awareness** (current activity, historical evolution)

---

## Shortcuts

**If time-constrained:**
- Use `float-map.md` for 6-file quick orientation
- Skip Loop 2 (index traversal) if you trust the structure
- Skip Loop 4 (examples) if you don't need practical grounding

**If focused on specific domain:**
- Voice preservation only: Files 14, 18, 23
- Tool building only: Files 16, 18, 19-21
- Philosophy only: Files 13, 14, 17

---

## Key Insights

1. **Boot sequence works.** Following `_float/system.md` produces comprehensive understanding.

2. **Examples ground theory.** The Portfolio Coach (729 lines) shows what "depth scales with complexity" actually means.

3. **The manifesto connects everything.** Understanding *why* FloatPrompt exists reframes all technical decisions.

4. **Voice preservation is the core constraint.** Every architectural choice serves not diminishing human expression.

5. **MDS is universal.** Map → Decide → Structure applies to building tools, context, and understanding.

---

© 2025 @MDS

