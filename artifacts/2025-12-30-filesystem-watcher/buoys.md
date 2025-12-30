<fp>
<json>
{
  "STOP": "Watcher Buoy Specifications. Scout Buoy, Map Buoy, and Think Buoy — the AI agent chain for filesystem watcher.",

  "meta": {
    "title": "Watcher Buoy Specifications",
    "id": "watcher-buoys",
    "format": "floatprompt",
    "version": "0.1.0"
  },

  "human": {
    "author": "@mds",
    "intent": "Specify the three buoys that form the AI decision chain for the filesystem watcher",
    "context": "Part of filesystem-watcher artifact exploration"
  },

  "ai": {
    "role": "Buoy specification reference",
    "behavior": "Understand each buoy's purpose, inputs, outputs, and prompts"
  },

  "requirements": {
    "chain": "Scout → Map → Think → Act",
    "model_config": "Configurable per buoy, start lightweight and escalate",
    "logging": "Every buoy decision logged to paper trail"
  }
}
</json>
<md>
# Watcher Buoy Specifications

**Three AI buoys form the decision chain: scout-map → Map Buoy → Think Buoy.**

Each buoy has a focused responsibility. Together they assess changes, determine impact, and decide action.

---

## Naming Convention

| Name | Type | Description |
|------|------|-------------|
| scout-detect | Code function | Mechanical detection, runs on every change |
| scout-map | AI buoy (lightweight) | Assesses non-trivial changes, produces report |
| Map Buoy | AI buoy (full) | Determines blast radius, semantic relationships |
| Think Buoy | AI buoy (full) | Decides actions, invokes commands |
| /float-* | Commands | Text tools invoked by buoys or humans |

**Pattern:**
- `lowercase-hyphen` = code function or lightweight AI
- `Title Case Buoy` = full AI agent
- `/float-*` = command (slash prefix)

---

## Scout (Two Phases)

Scout has two phases: code detection and AI mapping.

### scout-detect (Code Phase)

**Purpose:** Gather raw data about a filesystem change. Filter trivial changes.

Pure code. No AI. Runs on every filesystem event.

**Trivial changes (filtered out, no AI):**
- Ignored files (.DS_Store, node_modules, etc.)
- Files with no references to/from .float/
- Pure whitespace changes

**Non-trivial changes (passed to scout-map):**
- Files referenced by nav/*.md
- Files with frontmatter
- Changes to .float/ itself

### scout-map (AI Phase)

**Purpose:** Assess a non-trivial change and produce a report for Map Buoy.

Fast, lightweight AI. Only runs when scout-detect flags a non-trivial change.

### Input

From scout-detect (code layer):

```json
{
  "event": "modify",
  "path": "src/auth.ts",
  "timestamp": "2025-12-30T14:32:00Z",
  "file_type": "typescript",
  "size_delta": 245,
  "references_to": ["nav/src.md"],
  "referenced_by": ["docs/safety.md", "nav/src.md"],
  "broken_refs": [],
  "frontmatter": null
}
```

### Output

scout-map Report:

```json
{
  "change_id": "chg_20251230_143200_auth",
  "summary": "Modified src/auth.ts (TypeScript, +245 bytes)",
  "affected_files": {
    "direct": ["nav/src.md"],
    "potential": ["docs/safety.md"]
  },
  "staleness_flags": {
    "nav_description": "likely_stale",
    "references": "ok",
    "version": "ok"
  },
  "urgency": "normal",
  "needs_map": true
}
```

### Prompt

```
You are scout-map. Your job is to assess a filesystem change quickly.

CHANGE DATA (from scout-detect):
{raw_change_data}

TASKS:
1. Summarize what changed in one line
2. Identify files directly affected (referenced_by)
3. Identify files potentially affected (same domain, related concepts)
4. Flag staleness concerns:
   - nav_description: Will the nav file description still be accurate?
   - references: Are any references now broken?
   - version: Any version strings that might be outdated?
5. Assess urgency: normal | elevated | critical
6. Always pass to Map Buoy (chain of command)

OUTPUT: JSON scout-map report

Be fast. Be accurate. Map Buoy will determine the full blast radius.
```

### Model

Configurable. Start with Haiku for speed.

---

## Map Buoy

**Purpose:** Determine the blast radius and semantic relationships.

### Role

The analyst. Map Buoy takes scout-map's report and goes deeper — understanding not just mechanical links but semantic relationships. "This file talks about authentication" even if no direct reference exists.

### Input

scout-map Report + additional context:

```json
{
  "scout_map_report": { ... },
  "nav_files": ["nav/src.md contents..."],
  "related_content": ["docs/safety.md contents (excerpt)..."]
}
```

### Output

Map Report:

```json
{
  "change_id": "chg_20251230_143200_auth",
  "blast_radius": {
    "certain": ["nav/src.md"],
    "probable": [],
    "possible": ["docs/safety.md"]
  },
  "relationships": [
    {
      "file": "nav/src.md",
      "relationship": "direct_reference",
      "action_needed": "update_description"
    },
    {
      "file": "docs/safety.md",
      "relationship": "conceptual_mention",
      "action_needed": "review_only"
    }
  ],
  "confidence": "routine",
  "recommended_commands": ["/float-sync"],
  "scope": "nav/src.md"
}
```

### Confidence Levels

| Level | Meaning | Think Buoy Behavior |
|-------|---------|---------------------|
| routine | Pattern recognized, mechanical update | Execute immediately |
| significant | Multiple files, coordination needed | Plan carefully |
| needs-judgment | Unclear impact, may need human | Deep analysis |

### Prompt

```
You are Map Buoy. Your job is to determine the full impact of a change.

SCOUT-MAP REPORT:
{scout_map_report}

NAV FILE CONTENT:
{nav_file_content}

RELATED FILE EXCERPTS:
{related_excerpts}

TASKS:
1. Determine blast radius:
   - certain: Will definitely need update
   - probable: Likely needs update
   - possible: Might be affected, low confidence

2. Analyze relationships:
   - direct_reference: File explicitly references changed file
   - structural_dependency: File describes structure that changed
   - conceptual_mention: File discusses same concepts

3. For each relationship, determine action_needed:
   - update_description: Nav description is stale
   - update_reference: Path or link needs fixing
   - review_only: Flag for human, don't auto-update
   - none: No action needed

4. Set confidence: routine | significant | needs-judgment

5. Recommend float-* commands and scope

OUTPUT: JSON map report

Think semantically. A file about "security" relates to "auth.ts" even without direct links.
```

### Model

Configurable. Start with Haiku, escalate to Sonnet for needs-judgment cases.

---

## Think Buoy

**Purpose:** Decide what actions to take and execute them.

### Role

The decision maker. Think Buoy reads the Map Buoy report and decides:
- Which float-* commands to invoke
- In what order
- With what scope
- And logs the decision with rationale

### Input

Map Report:

```json
{
  "map_report": { ... }
}
```

### Output

Decision + Execution:

```json
{
  "change_id": "chg_20251230_143200_auth",
  "decision": {
    "actions": [
      {
        "command": "/float-sync",
        "scope": "nav/src.md",
        "reason": "Direct reference, description likely stale"
      }
    ],
    "deferred": [
      {
        "file": "docs/safety.md",
        "reason": "Conceptual mention only, low confidence",
        "action": "log_for_review"
      }
    ]
  },
  "rationale": "Single file update, routine pattern. Safety doc mention is conceptual, not structural.",
  "executed": [
    {
      "command": "/float-sync nav/src.md",
      "result": "success",
      "changes": ["Updated description for auth.ts"]
    }
  ]
}
```

### Decision Logic

```
IF confidence == "routine":
    Execute recommended commands immediately
    Log decision

IF confidence == "significant":
    Plan execution order
    Execute commands sequentially
    Verify each step before proceeding
    Log decision

IF confidence == "needs-judgment":
    Analyze deeply
    Consider asking human (if threshold met)
    Execute with caution
    Log decision with detailed rationale
```

### Prompt

```
You are Think Buoy. Your job is to decide and execute actions.

MAP REPORT:
{map_report}

AVAILABLE COMMANDS:
- /float-sync: Structure integrity (nav ↔ folders)
- /float-fix: Content integrity (references ↔ reality)
- /float-enhance: Quality improvement (descriptions, gaps)
- /float-context: Terrain maps (context files)
- /float-plan: Chunk large changes

TASKS:
1. Review Map Buoy's assessment and recommendations
2. Decide which commands to execute
3. Determine scope for each command
4. Provide rationale for decisions
5. Execute commands
6. Log results

RULES:
- Always log your decision with rationale
- For routine confidence: execute and log
- For significant confidence: plan carefully, verify steps
- For needs-judgment: analyze deeply, flag uncertainty
- Never execute without logging
- Deferred items go to paper trail for human review

OUTPUT: JSON decision record

You are the final decision maker. Be decisive but accountable.
```

### Model

Configurable. Start with Sonnet for better reasoning.

---

## Buoy Communication

### Chain Flow

```
Filesystem Event
    │
    │ raw event
    ▼
scout-detect (code)
    │
    │ Trivial? → Done
    │ Non-trivial? ↓
    ▼
scout-map (AI)
    │
    │ scout-map report
    ▼
Map Buoy
    │
    │ map report
    ▼
Think Buoy
    │
    │ decision + execution
    ▼
Decision Log
```

### Re-triggering

Think Buoy can re-trigger earlier buoys:

```
Think detects command failed
    │
    │ "Re-scout this file"
    ▼
scout-map (re-run)
    │
    │ updated scout-map report
    ▼
Map Buoy (re-run)
    │
    │ updated map report
    ▼
Think Buoy (retry decision)
```

### Batching

Multiple changes can be batched:

```
Change 1 → scout-detect → scout-map Report 1 ─┐
Change 2 → scout-detect → scout-map Report 2 ─┼─→ Map Buoy (batched) → Think Buoy
Change 3 → scout-detect → scout-map Report 3 ─┘
```

Map and Think can process multiple scout-map reports together for efficiency.

---

## Configuration

```json
{
  "buoys": {
    "scout": {
      "model": "claude-3-5-haiku-20241022",
      "timeout_ms": 5000
    },
    "map": {
      "model": "claude-3-5-haiku-20241022",
      "escalate_model": "claude-sonnet-4-20250514",
      "timeout_ms": 10000
    },
    "think": {
      "model": "claude-sonnet-4-20250514",
      "timeout_ms": 30000
    }
  }
}
```

---

## Error Handling

| Component | Failure Mode | Response |
|-----------|--------------|----------|
| scout-detect | Error | Log, skip this change, continue watching |
| scout-map | Timeout | Log, skip this change |
| scout-map | API error | Retry once, then queue for later |
| Map Buoy | Timeout | Fall back to scout-map assessment only |
| Map Buoy | API error | Retry once, use scout-map report for Think |
| Think Buoy | Timeout | Queue decision for retry |
| Think Buoy | API error | Log partial state, alert for manual review |

---

## Logging

Every buoy logs its activity:

```markdown
## 2025-12-30 14:32:00 — scout-detect
Event: src/auth.ts modified
References: nav/src.md, docs/safety.md
Trivial: no
Passed to: scout-map

## 2025-12-30 14:32:01 — scout-map
Change: src/auth.ts modified
Assessment: nav/src.md likely stale
Urgency: normal
Passed to: Map Buoy

## 2025-12-30 14:32:02 — Map Buoy
Blast radius: nav/src.md (certain), docs/safety.md (possible)
Confidence: routine
Recommended: /float-sync nav/src.md

## 2025-12-30 14:32:03 — Think Buoy
Decision: Execute /float-sync nav/src.md
Rationale: Direct reference, routine pattern
Result: Success
```

---

*Buoy specifications for the filesystem watcher.*
</md>
</fp>
