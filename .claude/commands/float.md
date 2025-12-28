# /float — FloatSystem Boot or Init

Detect and respond to FloatSystem state in the current directory.

## Execution

**Step 1: Check for existing FloatSystem**

Look for `_float/system.md` in the current working directory.

---

### If `_float/system.md` EXISTS → Boot Sequence

Execute the full orientation using local files:

1. **Read `_float/system.md`** — Load boot protocol, structure map, behavioral constraints
2. **Read `_float/index.md`** — Understand repository structure
3. **Traverse ALL `_float/index.md` files** — Verify each Contents table matches actual folder contents. Flag discrepancies.
4. **Read today's session log** (`_float/logs/YYYY-MM-DD.md`) if it exists
5. **Choose context depth** based on task complexity (if context/ folder exists)
6. **Build mental model** — What exists, what happened, current state
7. **Check integrity** — Report any issues
8. **Report ready** — Summarize and await human direction

---

### If `_float/system.md` DOES NOT EXIST → Init Sequence

Fetch the FloatSystem spec from GitHub, then create the architecture:

1. **Fetch the spec** — Read these files from `https://github.com/mds/floatprompt`:
   - `_float/system.md` — Boot loader format and conventions
   - `_float/index.md` — Navigation format
   - `docs/floatsystem.md` — Full architecture documentation

2. **Scan the current repository** — Understand existing structure, identify all directories

3. **Create root `_float/` folder** with:
   - `system.md` — Boot loader adapted to this project (use `<fp>` tags format)
   - `index.md` — Root navigation (YAML frontmatter: title, type: float, status, ai_updated)
   - `logs/` — Directory for session logs

4. **Create `_float/index.md` in each major directory** — Navigation for that folder's contents

5. **Generate structure map** — Document what exists in system.md

6. **Report complete** — Show what was created, await human review

---

## Reference

FloatSystem spec: https://github.com/mds/floatprompt

Key conventions:
- `_float/system.md` — Boot loader (root only, `<fp>` tags format)
- `_float/index.md` — Folder navigation (YAML frontmatter)
- `_float/logs/YYYY-MM-DD.md` — Session logs (root only)

---

## Output

After boot or init:

```
FloatSystem: [BOOTED | INITIALIZED]
Directory: [path]
Status: [summary]
Ready for: [what you can help with]
```

Await human direction.
