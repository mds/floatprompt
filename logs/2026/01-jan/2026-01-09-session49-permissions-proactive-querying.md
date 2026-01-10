# Session 49: Permissions and Proactive Querying

**Date:** 2026-01-09
**Session:** 49
**Status:** locked

---

## Summary

Accepted sqlite3 permission prompts as acceptable UX (with settings.json auto-approve option), established proactive context retrieval as core AI behavior, and formalized skills structure in the plugin.

---

## Decisions

### 1. Permission Prompts Acceptable

**Decision:** Do not restructure plugin architecture to avoid sqlite3 permission prompts. Instead, offer to auto-approve via settings.json update.

**Rationale:** Preserves float.db queryability as the core value proposition. The alternative (wrapping sqlite3 in a way that avoids prompts) would add complexity without meaningful benefit. Users who want seamless operation can opt into auto-approve.

### 2. Proactive Context Retrieval

**Decision:** AI should query float.db BEFORE working on unfamiliar code, not wait to be asked or stumble.

**Rationale:** The plugin's value comes from AI having memory and judgment. If AI doesn't proactively use the context database, it's just another cold-start experience. Added prescriptive guidance to float.md "Ongoing Behavior" section and created float-context skill for explicit lookups.

### 3. Skills Structure

**Decision:** Skills live in `skills/skill-name/SKILL.md` (not commands/). Model-invoked based on description, not slash commands. Added to plugin.json: `"skills": "./skills/"`.

**Rationale:** Skills are different from commands - they're capabilities the AI invokes automatically based on context, not user-triggered actions. The folder structure makes this distinction clear.

---

## Files Changed

- `plugins/floatprompt/commands/float.md` - Updated with proactive retrieval guidance in Ongoing Behavior
- `plugins/floatprompt/hooks/float-capture.sh` - Updated (context)
- `plugins/floatprompt/skills/float-context/SKILL.md` - Created for explicit context lookups
- `plugins/floatprompt/plugin.json` - Added skills path reference

---

*Session 49: Permission acceptance, proactive retrieval, skills formalization*
