# FloatPrompt Maintenance

Guide for maintaining the FloatPrompt system itself.

---

## Before Any System Change

Use this checklist for changes that affect multiple files or core structure.

### 1. Check Scope

| Scope | Approach |
|-------|----------|
| Single file fix | Just do it |
| 2-3 file update | Just do it with care |
| Major restructure | Use `system/tools/update.md` |
| Version migration | Use `system/tools/update.md` |
| Cross-cutting change | Use `system/tools/update.md` |

**Rule of thumb:** If you need to think about execution order, create an update plan first.

### 2. Create Update Plan (if needed)

Use `system/tools/update.md` methodology:

1. **Change Specification** — Current state vs target state
2. **Impact Zone Assessment** — Find ALL affected files (not just obvious ones)
3. **Validation Framework** — Define success criteria before executing
4. **Execution Checklist** — Phased, ordered, with dependencies
5. **Approval Gate** — Human approval before execution

Store plans in `artifacts/` with date prefix: `2025-12-30-change-name-plan.md`

### 3. Review Existing Tools

Before creating new functionality, check if existing tools already cover it:

```bash
# Check current tools
ls .float/core/tools/

# Check what each does
grep "STOP" .float/core/tools/*.md
```

### 4. Get Approval

For significant changes:
- Document the plan in artifacts/
- Wait for human approval before executing
- The plan proposes, human approves, then execute together

### 5. Execute in Phases

Follow the execution checklist. Common phase pattern:

1. Create new structure
2. Move files
3. Update internal references
4. Update external references (commands, deployment)
5. Update templates
6. Update documentation
7. Cleanup and validate

### 6. Validate

Run validation after each phase and at completion:

```bash
# Boot check
/float

# Structure integrity
/float-sync

# Reference integrity
/float-fix

# Tool consistency
/float-tools
```

### 7. Clean Up

- Mark plan as completed
- Update artifacts with results
- Archive completed work to `artifacts/archive/`

---

## Tools for Maintenance

### Operational Commands

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `/float` | Boot, health check | Start of session, quick status |
| `/float-sync` | Structure integrity | After adding/removing files |
| `/float-fix` | Reference integrity | After renaming/moving files |
| `/float-context` | Deep understanding | Before complex work |
| `/float-enhance` | Quality improvement | Fill gaps, complete frontmatter |

### Maintainer Tools

| Tool | Purpose | When to Use |
|------|---------|-------------|
| `/float-tools` | Tool consistency | Before releases, after updating tools |
| `system/tools/update.md` | Change planning | Major restructures, migrations |

### Working with Artifacts

```
artifacts/
├── YYYY-MM-DD-topic/          # Working folder for active work
│   ├── CONTEXT.md             # Boot context for fresh sessions
│   ├── YYYY-MM-DD-plan.md     # Detailed plans
│   └── YYYY-MM-DD-*.md        # Related documents
└── archive/YYYY/MM-mon/       # Completed work
```

---

## Common Mistakes

### 1. Changing Paths Without Grepping

**Wrong:** Rename a folder, update the obvious files, miss 10 others.

**Right:**
```bash
# Find ALL references before changing
grep -r "old/path" --include="*.md" --include="*.js"

# Check templates too
grep -r "old/path" templates/
```

### 2. Forgetting templates/ Mirrors .float/

The `templates/` folder is what `float init` deploys. It must mirror the source structure.

| Source | Template |
|--------|----------|
| `.float/float.md` | `templates/.float/float.md` |
| `.float/core/index.md` | `templates/.float/core/index.md` |
| `.float/project.md` | `templates/.float/project.md` |

**After any .float/ structure change, update templates/ too.**

### 3. Skipping Validation

Don't just assume changes worked. Run:

```bash
/float          # Does it boot?
/float-sync     # Structure OK?
/float-tools    # Tools consistent?
```

### 4. Updating Without a Plan

Major changes without a plan lead to:
- Missed files
- Broken references
- Inconsistent state
- Lost context between sessions

**Use `system/tools/update.md` for anything non-trivial.**

### 5. Forgetting bin/floatprompt.js

The deployment script has hardcoded paths and file lists. After:
- Adding new tools → Update tool lists
- Adding new commands → Update command lists
- Changing paths → Update all path references

```javascript
// Check these arrays in bin/floatprompt.js
const toolFiles = ['float.md', ...];
const commandFiles = ['float.md', ...];
```

### 6. Not Spawning Validation Buoys

After completing a workstream, spawn validation buoys to:
- Verify the work (domain-specific checks)
- Update documentation (plans, CONTEXT.md, roadmap)

See "Workstream Completion Protocol" in the active roadmap.

---

## File Reference

### Core Files (rarely change)

| File | Purpose |
|------|---------|
| `.float/float.md` | Boot loader, structure map |
| `.float/core/index.md` | FloatPrompt system reference |
| `.float/project.md` | Project-specific reference |

### Tools (update together)

| File | Purpose |
|------|---------|
| `.float/core/tools/float*.md` | Tool implementations |
| `.claude/commands/float*.md` | Command wrappers |
| `bin/floatprompt.js` | Deployment script |

### Templates (mirror source)

| File | Mirrors |
|------|---------|
| `templates/.float/float.md` | `.float/float.md` |
| `templates/.float/core/index.md` | `.float/core/index.md` |
| `templates/.float/project.md` | `.float/project.md` |

---

## Version Bumping

When releasing a new version:

1. Update version in ALL tools (must match):
   ```bash
   grep -h '"version"' .float/core/tools/float*.md
   ```

2. Update `package.json` version

3. Run `/float-tools` to verify sync

4. Update CHANGELOG (if exists)

---

## Quick Reference

```bash
# Before major change
/float-tools                    # Check tool consistency
grep -r "pattern" .             # Find all references

# After changes
/float                          # Boot check
/float-sync                     # Structure check
/float-fix                      # Reference check
/float-tools                    # Tool check

# Planning
# Use system/tools/update.md methodology
# Store plans in artifacts/
```

---

*Maintenance guide for FloatPrompt system internals*
