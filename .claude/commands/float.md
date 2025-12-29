# /float — FloatPrompt Command Router

Routes to the appropriate tool based on input. Tools are the source of truth.

## Routing Table

| Input | Tool | Purpose |
|-------|------|---------|
| `/float` | `.float/tools/float.md` | Boot/init |
| `/float sync` | `.float/tools/float-sync.md` | Structure integrity |
| `/float context` | `.float/tools/float-context.md` | Meaning generation |
| `/float enhance` | `.float/tools/float-enhance.md` | Quality improvement |

## Execution

Parse `$ARGUMENTS` and route:

```
if $ARGUMENTS is empty or "boot":
  → Read and execute .float/tools/float.md

if $ARGUMENTS is "sync":
  → Read and execute .float/tools/float-sync.md

if $ARGUMENTS is "context":
  → Read and execute .float/tools/float-context.md

if $ARGUMENTS is "enhance":
  → Read and execute .float/tools/float-enhance.md

else:
  → Show help (list commands below)
```

## Help Output

```
/float commands:

  /float           Boot the FloatPrompt System (or init if new)
  /float sync      Verify nav files match folders, fix with approval
  /float context   Generate or load project context
  /float enhance   Fill placeholders, improve descriptions

Run any command for details.
```

## Command Progression

```
/float           Awareness   (boot/init)
/float sync      Structure   (nav ↔ folders)
/float context   Meaning     (terrain map)
/float enhance   Quality     (make it better)
```

Each command increases depth. Use the lightest command that accomplishes the task.

## Reference

Full specification: `specs/claude/commands.md`
Buoy pattern: `specs/claude/buoys.md`
