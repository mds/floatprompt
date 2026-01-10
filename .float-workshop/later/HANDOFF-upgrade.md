# Handoff System: Integration Over Duplication

**Date:** 2026-01-10
**Session:** 53
**Status:** Revised — simpler approach locked

---

## Context

Original proposal: Create `.float/handoff/` folder with spec files mirroring workshop pattern.

**Rejected because:**
1. **Claude Plans already exist** — `.claude/plans/` is native infrastructure for detailed specs
2. **Too opinionated** — Imposing folder structure on users' workflows
3. **Duplication** — Creating parallel plan infrastructure serves no purpose
4. **Plugin scope** — FloatPrompt is context infrastructure, not workflow management

---

## Revised Decision

**handoff.md stays a single narrative file.**

FloatPrompt integrates with existing plan infrastructure rather than duplicating it.

---

## The Distinction

| System | Purpose | Owns |
|--------|---------|------|
| **FloatPrompt** | Context infrastructure | What you need to know |
| **Claude Plans** | Workflow infrastructure | What you're building |
| **Workshop** | Dev workflow (temporary) | How *we* work on FloatPrompt |

FloatPrompt should be **aware** of plans, not **manage** them.

---

## What FloatPrompt Already Does Well

| Component | Function |
|-----------|----------|
| `handoff.md` | Session narrative — where we are, what happened, what's next |
| `log_entries` | Decision paper trail — locked choices with rationale |
| `open_questions` | Unresolved threads — things to figure out |
| `folders` | Context per path — what each area is about |

**This is sufficient.** The gap wasn't missing spec storage — it was missing **awareness** of specs that exist elsewhere.

---

## The Enhancement

### float-capture Detects Active Plans

During capture, scan for active plans and reference them in handoff:

```bash
# Check Claude Plans
CLAUDE_PLANS=$(ls .claude/plans/*.md 2>/dev/null | head -5)

# Check for convention-based plans
REPO_PLANS=$(find . -maxdepth 3 -name "*-plan.md" -o -name "PLAN.md" 2>/dev/null | grep -v node_modules | head -5)

# Check workshop if exists
WORKSHOP_PLANS=$(ls .float-workshop/active/*.md 2>/dev/null | grep -v ACTIVE.md | head -5)
```

### handoff.md Includes Active Plans Section

When plans are detected, handoff.md includes:

```markdown
## Active Plans

| Location | File | Summary |
|----------|------|---------|
| Claude Plans | `streamed-painting-thunder.md` | Handoff architecture |
| Workshop | `RUST-plan.md` | Rust merkle scanner |

> These are detailed specs for ongoing work. Read them for full context.
```

If no plans detected, section is omitted.

### boot.sh Returns Plan Awareness

```json
{
  "active_plans": [
    {
      "location": "claude",
      "path": ".claude/plans/streamed-painting-thunder.md",
      "name": "streamed-painting-thunder.md"
    },
    {
      "location": "workshop",
      "path": ".float-workshop/active/RUST-plan.md",
      "name": "RUST-plan.md"
    }
  ],
  ...existing fields...
}
```

### /float Presents Plan Awareness

During boot, if active plans exist:

> "I see 2 active plans: one in Claude Plans (handoff architecture) and one in workshop (Rust scanner). Want me to read either for context?"

---

## What This Means

### No New Folder Structure

```
.float/
├── float.db
├── handoff.md      # Single file, stays here
└── schema.sql
```

### No New Agent

float-spec agent not needed. float-handoff just becomes **plan-aware**.

### Minimal Changes

| Component | Change |
|-----------|--------|
| float-capture.sh | Detect plans, pass to float-handoff |
| float-handoff agent | Include Active Plans section if plans exist |
| boot.sh | Return `active_plans` array |
| /float command | Present plan awareness |

### Optional Schema Addition

```sql
-- Only if we want to link decisions to plans
ALTER TABLE log_entries ADD COLUMN plan_path TEXT;
```

This links a decision to the plan it came from. Useful for querying "what decisions came from this plan?" but not essential.

---

## Implementation Steps

### Step 1: Update float-capture.sh

Add plan detection before spawning float-handoff:

```bash
# Detect active plans
CLAUDE_PLANS=""
if [ -d ".claude/plans" ]; then
  CLAUDE_PLANS=$(ls .claude/plans/*.md 2>/dev/null | tr '\n' '|')
fi

WORKSHOP_PLANS=""
if [ -d ".float-workshop/active" ]; then
  WORKSHOP_PLANS=$(ls .float-workshop/active/*.md 2>/dev/null | grep -v ACTIVE.md | tr '\n' '|')
fi

export ACTIVE_PLANS="$CLAUDE_PLANS$WORKSHOP_PLANS"
```

### Step 2: Update float-handoff Agent

Add to the agent prompt:

```markdown
### Active Plans Detection

If `ACTIVE_PLANS` environment variable is non-empty, include an "Active Plans" section:

## Active Plans

[List each plan with location and filename]

> Read these for detailed context on ongoing work.
```

### Step 3: Update boot.sh

Add plan discovery:

```bash
# Discover active plans
PLANS_JSON="[]"

# Claude plans
for f in .claude/plans/*.md 2>/dev/null; do
  [ -f "$f" ] || continue
  PLANS_JSON=$(echo "$PLANS_JSON" | jq --arg p "$f" --arg n "$(basename "$f")" \
    '. + [{"location":"claude","path":$p,"name":$n}]')
done

# Workshop plans (if exists)
for f in .float-workshop/active/*.md 2>/dev/null; do
  [ "$(basename "$f")" = "ACTIVE.md" ] && continue
  [ -f "$f" ] || continue
  PLANS_JSON=$(echo "$PLANS_JSON" | jq --arg p "$f" --arg n "$(basename "$f")" \
    '. + [{"location":"workshop","path":$p,"name":$n}]')
done
```

### Step 4: Update /float Command

Add to boot presentation:

```markdown
**If `active_plans` array is non-empty:**

Note active plans during orientation:
> "There are N active plans I can read for context: [list them]"

Offer to read if relevant to user's request.
```

---

## Verification

- [ ] float-capture detects `.claude/plans/*.md`
- [ ] float-capture detects `.float-workshop/active/*.md`
- [ ] handoff.md includes Active Plans section when plans exist
- [ ] handoff.md omits section when no plans
- [ ] boot.sh returns `active_plans` array
- [ ] /float mentions active plans during boot

---

## What We're NOT Doing

| Rejected | Why |
|----------|-----|
| `.float/handoff/` folder | Duplicates Claude Plans |
| float-spec agent | Plans managed elsewhere |
| Spec file lifecycle | Not our responsibility |
| Plan templates | Too opinionated |
| Plan archiving | User's workflow choice |

---

## Philosophy

**FloatPrompt is the memory. Plans are the work.**

- Memory persists (float.db, handoff.md, log_entries)
- Work is temporary (plans come and go)
- Memory should *know about* work, not *own* it

**Integration over duplication.**

Claude Code has plans. Git has branches. Editors have files. FloatPrompt provides context that ties them together — it doesn't replace them.

---

## Migration from Original Proposal

The spec file at `.float-workshop/logs/2026/01-jan/2026-01-10-handoff-folder-architecture.md` documented the folder approach.

**Status:** Superseded by this simpler approach.

The decision log should be updated:
```sql
UPDATE log_entries
SET status = 'superseded',
    superseded_by = [new_entry_id]
WHERE title LIKE '%Handoff Folder Architecture%';
```

---

## Future Considerations

If users consistently create plan-like artifacts in specific locations, we could:

1. **Configurable plan paths** — Let users specify where to look for plans
2. **Plan status detection** — Parse frontmatter to show plan status
3. **Plan-decision linking** — Optional `plan_path` in log_entries

But start simple. Detect and reference. Don't manage.

---

*Session 53 — Integration over duplication. Handoff stays simple.*
