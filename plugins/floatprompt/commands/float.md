---
name: float
description: Boot FloatPrompt session. Orients AI with persistent context from float.db.
---

# /float — Boot FloatPrompt

**One command. AI operates everything else.**

---

## Step 1: Find Project Root

FloatPrompt lives at the **git repository root**, not in subdirectories.

```bash
REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
FLOAT_DB="$REPO_ROOT/.float/float.db"
```

**If user is in a subdirectory:**
- Recognize it naturally (e.g., `/src/auth` doesn't look like a project root)
- Surface this: "You're in `/src/auth`. I found the project root at `/path/to/repo`. FloatPrompt should live there."
- Ask before creating: "Initialize FloatPrompt at the repo root?"

**Signs of a project root:** Has `.git/`, `package.json`, `Cargo.toml`, `pyproject.toml`, `README.md`
**Signs of NOT root:** Named `src`, `lib`, `auth`, `components` — parent has the root indicators

---

## Step 2: Check for float.db

### If `.float/float.db` EXISTS → Boot with context

1. **Read orientation:** Internalize `.float/boot.md` (JSON anchors + reference)

2. **Query session context:**
```sql
-- Last session handoff
sqlite3 "$FLOAT_DB" "SELECT title, decision, rationale, before_state, after_state, future_agent, related_files
FROM log_entries WHERE topic='session-handoff'
ORDER BY created_at DESC LIMIT 1"

-- Open questions
sqlite3 "$FLOAT_DB" "SELECT question, context, folder_path FROM open_questions WHERE resolved_at IS NULL"

-- Recent decisions
sqlite3 "$FLOAT_DB" "SELECT date, folder_path, title FROM log_entries
WHERE status='locked' ORDER BY created_at DESC LIMIT 3"

-- Staleness check
sqlite3 "$FLOAT_DB" "SELECT path FROM folders WHERE status='stale' LIMIT 5"
```

3. **Synthesize naturally:**
   - What happened last session (before → after)
   - What's suggested next (future_agent, rationale options)
   - Open questions (if any)
   - Stale folders (if any)
   - Ask: "Want to pick up where you left off?"

**Emergent, not templated.** Discover what's in the database and surface what's relevant.

---

### If `.float/float.db` DOESN'T EXIST → Initialize

1. **Verify location** (Step 1 above)

2. **Ask before creating:**
   - "No FloatPrompt found. Initialize at `[repo root]`?"
   - Wait for confirmation

3. **Initialize:**
```bash
# Run Layer 1 scan
${CLAUDE_PLUGIN_ROOT}/lib/scan.sh "$REPO_ROOT"

# Copy boot.md template
cp ${CLAUDE_PLUGIN_ROOT}/templates/boot.md "$REPO_ROOT/.float/boot.md"
```

4. **Report:** "FloatPrompt initialized. X folders, Y files indexed."

5. **Offer enrichment (don't presume):**
   - "Would you like to enrich your context database? This teaches AI about each folder so future sessions start with full understanding."
   - Takes ~2-3 minutes for a typical project
   - Options: Yes / No / Later
   - If **Yes** → spawn float-enrich agents (parallel batches of ~20 folders)
   - If **No/Later** → continue with pending folders (enrichment happens organically or at session end)

6. **Educate about capture:**
   - "FloatPrompt will attempt to capture your work automatically when context fills up (PreCompact). If you're hitting milestones — completing a feature, making a key decision — run `/float-capture` to save explicitly."
   - "The goal: build, enrich, and preserve your context across all your working sessions."

7. **Read orientation:** Internalize `.float/boot.md`

8. **Ready to work:** "What are we working on?"

---

## Step 3: Ongoing Behavior

After boot, you have persistent context. Use it.

**Query folder context** when entering new areas:
```sql
sqlite3 "$FLOAT_DB" "SELECT description, context FROM folders WHERE path='/src/auth'"
```

**Check for decisions** on topics you're working on:
```sql
sqlite3 "$FLOAT_DB" "SELECT * FROM log_entries WHERE folder_path LIKE '/src/auth%' AND status='locked'"
```

**Capture attempts are automatic.** PreCompact hook fires when context fills up, capturing:
- Session handoff (what happened, what's next)
- Folder context updates
- Decisions and rationale
- Open questions

**Just work.** Run `/float-capture` at milestones to save explicitly.

---

## The Philosophy

You're part of a **compounding context system**.

- **Boot** with what previous sessions learned
- **Work** with full understanding
- **Capture** happens automatically
- **Next session** starts richer than this one

**Be the AI you wish you'd inherited context from.**

---

## Session Protocol

1. `/float` boots with context (this command)
2. Work together
3. `/float-capture` at milestones to save explicitly (recommended)
4. PreCompact attempts automatic capture when context fills up
5. Next `/float` picks up where you left off
