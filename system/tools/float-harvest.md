<fp>
<json>
{
  "STOP": "Float Harvest Tool. Extract decisions and patterns from session logs and git history. Mining knowledge that would otherwise evaporate.",

  "meta": {
    "title": "/float-harvest",
    "id": "float-harvest",
    "format": "floatprompt",
    "version": "0.11.0"
  },

  "human": {
    "author": "@mds",
    "intent": "Capture implicit decisions and recurring patterns before session knowledge evaporates",
    "context": "Run periodically to synthesize session logs and commits into decisions.md and patterns.md"
  },

  "ai": {
    "role": "Knowledge miner and decision extractor",
    "behavior": "Parse logs and commits, propose decisions with evidence, detect patterns, wait for approval before writing"
  },

  "requirements": {
    "duality": {
      "condition_a": "Decisions/patterns found",
      "action_a": "Present proposals with evidence, wait for approval, write to files",
      "condition_b": "Nothing to harvest",
      "action_b": "Report clean status"
    },
    "status_format": "FloatPrompt harvest.\nDirectory: [path]\nRange: [time range]\nStatus: [N decisions, M patterns | Nothing to harvest]\n\n[Proposals or Ready for: human direction]",
    "next_step_logic": "Proposals found? Show with evidence and confidence. Approved? Write to files. Otherwise: Ready for: human direction",
    "reporting": {
      "protocol": "float-report",
      "phases": ["map", "decide", "structure"],
      "async": true
    }
  }
}
</json>
<md>
# /float-harvest — Knowledge Mining

**Extract decisions and patterns from session logs and git history.**

Session knowledge evaporates between conversations. This tool mines logs and commits to capture decisions before they're lost.

## Duality

| Condition | Action |
|-----------|--------|
| Decisions/patterns found | Present proposals, wait for approval, write |
| Nothing to harvest | Report clean status |

## Input Options

```bash
/float-harvest              # Auto: --since-last-harvest
/float-harvest --week       # Last 7 days
/float-harvest --month      # Last 30 days
/float-harvest --since 2025-12-25  # Since specific date
```

## Architecture: The Mining Pattern

```
Session Logs              Git History
     │                        │
     ▼                        ▼
┌────────────┐          ┌────────────┐
│    Log     │          │   Commit   │
│   Parser   │          │   Parser   │
└─────┬──────┘          └─────┬──────┘
      │                       │
      └──────────┬────────────┘
                 ▼
         ┌────────────┐
         │  Decision  │
         │   Miner    │ ← Proposes: "Decision X was made"
         └─────┬──────┘
               │
               ▼
         ┌────────────┐
         │  Evidence  │
         │  Validator │ ← Checks: "Does evidence support?"
         └─────┬──────┘
               │
               ▼
         ┌────────────┐
         │  Pattern   │
         │  Detector  │ ← "Theme appeared N times"
         └─────┬──────┘
               │
       ┌───────┴───────┐
       ▼               ▼
 decisions.md    patterns.md
```

## Process

### 1. Gather Sources

```bash
# Find session logs in range
ls .float/project/logs/*.md

# Get commits in range
git log --since="7 days ago" --oneline
```

### 2. Parse Sources

**Log Parser (haiku):**
- Extract discussion topics
- Find "decided to..." language
- Note questions asked
- Identify blockers mentioned

**Commit Parser (haiku):**
- Extract commit message intent
- Note file paths changed
- Identify patterns (refactor, fix, add)

**Report:** Call float-report --phase=map

### 3. Mine Decisions

**Decision Miner (sonnet):**
- Cross-reference log discussions with commits
- Propose decisions in format:
  ```
  Decision: [what was decided]
  Evidence: [commit refs, log timestamps]
  Confidence: HIGH | MEDIUM | LOW
  ```

**Confidence levels:**
- **HIGH**: Log discussion + commit confirms
- **MEDIUM**: Commit only, no log discussion
- **LOW**: Inference from patterns, not explicit

**Report:** Call float-report --phase=decide

### 4. Validate Evidence

**Evidence Validator (sonnet):**
- Check proposed decisions against actual changes
- Verify commits exist and match claims
- Downgrade confidence if evidence weak

### 5. Detect Patterns

**Pattern Detector (haiku):**
- Find recurring terms (5+ mentions)
- Identify recurring questions
- Note recurring blockers
- Track theme frequency

## Output Files

### decisions.md

Appends to `.float/project/context/project-decisions.md`:

```markdown
### [Topic/Decision Title]
**Question:** Why [observed choice]?
**Answer:** [extracted rationale]
**Date:** YYYY-MM-DD
**Evidence:** commit abc1234, session log 2025-12-30 14:30
**Confidence:** HIGH
```

**Report:** Call float-report --phase=structure

### patterns.md

Creates/updates `.float/project/context/patterns.md`:

```markdown
## Recurring Themes

| Theme | Mentions | Context |
|-------|----------|---------|
| buoys | 8 | Architecture pattern |
| frontmatter | 5 | Quality concern |
| stale | 4 | Recurring problem |

## Open Questions

- How often should harvest run?
- Should mini-contexts auto-generate?

## Recurring Blockers

- Path changes require grep across all files
- Templates must mirror source structure
```

## Buoys

| Buoy | Model | Purpose |
|------|-------|---------|
| `log_parser` | haiku | Extract structured entries from session logs |
| `commit_parser` | haiku | Extract intent from commit messages |
| `decision_miner` | sonnet | Propose decisions based on evidence |
| `evidence_validator` | sonnet | Verify proposals against actual changes |
| `pattern_detector` | haiku | Find recurring themes, questions, blockers |

## Examples

**Harvest with proposals:**
```
> /float-harvest --week

FloatPrompt harvest.
Directory: /Users/mds/Documents/_Github/floatprompt
Range: 2025-12-23 to 2025-12-30

Parsing 5 session logs, 12 commits...

Proposed decisions (3):

  1. "Commands split into separate files for palette discovery"
     Evidence: commits 92d3328, a2ce06c; log 2025-12-29
     Confidence: HIGH

  2. "Frontmatter validation belongs in /float-enhance"
     Evidence: commit e87198f
     Confidence: MEDIUM (no log discussion)

  3. "Mini-contexts considered but deferred"
     Evidence: log 2025-12-30 discussion
     Confidence: LOW (discussion, not decision)

Accept? [all / 1,2 / review / skip]:
```

**After acceptance:**
```
Patterns detected:
  - "buoy" → 8 mentions (architecture pattern)
  - "frontmatter" → 5 mentions (quality concern)
  - "stale" → 4 mentions (recurring problem)

Harvest complete.
  → 2 decisions added to decisions.md
  → 3 patterns logged to patterns.md

Ready for: human direction
```

**Nothing to harvest:**
```
> /float-harvest

FloatPrompt harvest.
Directory: /Users/mds/Documents/_Github/floatprompt
Range: since last harvest (2025-12-30)

No new session logs or commits since last harvest.

Ready for: human direction
```

## Last Harvest Tracking

Stores last harvest timestamp in `.float/project/.last-harvest`:

```
2025-12-30T14:30:00Z
```

Next `--since-last-harvest` uses this as start date.

---

*[FloatPrompt](https://github.com/mds/floatprompt) — the invisible OS for AI*
</md>
</fp>
