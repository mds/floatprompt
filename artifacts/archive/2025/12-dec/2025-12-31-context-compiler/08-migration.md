# Migration

## Current Inventory

### 16 Static Tools

```
.float/tools/
├── float.md
├── float-sync.md
├── float-fix.md
├── float-context.md
├── float-enhance.md
├── float-focus.md
├── float-harvest.md
├── float-delta.md
├── float-relate.md
├── float-build.md
├── float-project.md
├── float-report.md
├── float-all.md
├── float-think.md
├── tool-sync.md
└── update.md
```

Each is a standalone `.md` file with copy-pasted patterns.

---

## Migration Strategy

### Phase 1: Extract Shared Patterns → Partials

**Goal:** Create partials from repeated patterns.

**Order by churn (highest first):**

1. **footer.hbs** — Simple, low risk, validates process
2. **duality.hbs** — Used by all, clear pattern
3. **status_format.hbs** — Used by all
4. **next_step_logic.hbs** — Used by all
5. **reporting.hbs** — Used by 12 tools
6. **buoys.hbs** — Used by 8 tools
7. **tool_header.hbs** — Composite of above

**Process for each partial:**
1. Extract pattern from one tool
2. Identify variables (what changes per tool)
3. Create `.hbs` partial with variables
4. Document expected input shape

### Phase 2: Convert One Tool as Proof

**Goal:** Validate full pipeline works.

**Candidate:** `float-sync.md`
- Well-understood behavior
- Uses most patterns (duality, buoys, reporting)
- Can validate output matches current

**Process:**
1. Create `float-sync.tool.json` (extract config)
2. Create `float-sync.hbs` (template with partials)
3. Build and compare output to current `.md`
4. Diff should be minimal/cosmetic
5. Run `/float-sync` with compiled version
6. Validate behavior unchanged

### Phase 3: Convert Remaining Tools

**Batch by type:**

**Integrity tools:**
- float-sync
- float-fix
- float-project

**Context tools:**
- float-context
- float-focus
- float-harvest

**Build tools:**
- float-build
- float-enhance
- float-relate
- float-delta

**Orchestration tools:**
- float.md (boot)
- float-all
- float-think

**Utility tools:**
- float-report
- tool-sync
- update

**Process for each batch:**
1. Create tool configs (`.tool.json`)
2. Create templates (`.hbs`)
3. Build and diff
4. Validate behavior
5. Commit batch

### Phase 4: Convert Output Templates

**Goal:** Nav and context files become generated.

**Process:**
1. Create `nav-folder.hbs` template
2. Create scan logic (folder → data shape)
3. Generate nav file, compare to current
4. Repeat for context files

---

## Validation Checklist

For each converted tool:

- [ ] **Structure valid** — `<fp><json><md></fp>` intact
- [ ] **JSON parses** — No syntax errors
- [ ] **Required fields** — STOP, meta, human, ai, requirements present
- [ ] **Variables resolved** — No `{{unresolved}}` in output
- [ ] **Diff acceptable** — Changes are cosmetic, not behavioral
- [ ] **Behavior unchanged** — Tool works same as before
- [ ] **Partials work** — Shared patterns render correctly

---

## Rollback Plan

**Before migration:**
- Create branch: `git checkout -b templating-migration`
- Current `.md` files remain in `main`

**If issues:**
- Compiled outputs are in `dist/`
- Source `.md` files untouched in `main`
- Can revert branch, no data loss

**Confidence checkpoint:**
- After Phase 2 (one tool), evaluate
- If issues, stop and reassess
- If smooth, continue to Phase 3

---

## Migration Timeline

**Not time-boxed.** This is effort, not calendar.

| Phase | Effort | Dependencies |
|-------|--------|--------------|
| Phase 1: Partials | 2-3 hours | None |
| Phase 2: One tool | 1-2 hours | Phase 1 |
| Phase 3: All tools | 4-6 hours | Phase 2 |
| Phase 4: Outputs | 2-3 hours | Phase 3 |

**Total:** ~10-14 hours of focused work.

Can be spread across sessions. Each phase is a commit checkpoint.

---

## Post-Migration

### New Workflow

**Before:**
```
Edit .float/tools/float-sync.md directly
Manually update 15 other files if pattern changes
Hope nothing drifted
```

**After:**
```
Edit src/templates/tools/float-sync.tool.json (config)
Edit src/templates/tools/float-sync.hbs (if structure changes)
Edit src/templates/partials/duality.hbs (if pattern changes)
Run: npm float build
All tools updated consistently
```

### Maintenance Reduction

| Task | Before | After |
|------|--------|-------|
| Version bump | Edit 16 files | Edit system.json |
| Path change | Find/replace across files | Edit system.json |
| Pattern fix | Edit 16 files | Edit 1 partial |
| New tool | Copy/paste, edit | Config + template |

---

## Success Criteria

Migration complete when:

1. All 16 tools compile from templates
2. `npm float build` produces identical (or improved) outputs
3. All `/float-*` commands work unchanged
4. Nav files can be regenerated from scan
5. No manual `.md` editing required for standard changes
6. CI validates compiled outputs match templates
