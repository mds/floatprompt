<fp>
<json>
{
  "STOP": ".float/ folder. The FloatPrompt System running in this project. Read system.md first.",

  "meta": {
    "title": ".float/",
    "id": "float-folder",
    "format": "floatprompt",
    "version": "0.12.0",
    "type": "context"
  },

  "human": {
    "author": "@mds",
    "intent": "Root of the running FloatPrompt System",
    "context": "This is not a pillar — it's the system itself running"
  },

  "ai": {
    "role": "Context provider",
    "behavior": "Direct reader to system.md for boot protocol"
  },

  "requirements": {
    "boot_file": "system.md",
    "structure": {
      "core/": "FloatPrompt internals (templates, tools)",
      "project/": "Project-specific data (nav, context, logs)"
    }
  }
}
</json>
<md>
# .float/

**The FloatPrompt System** — running in this project

## Start Here

Read `system.md` first. It's the boot loader.

## Structure

```
.float/
├── system.md       # Boot loader (read first)
├── core/           # FloatPrompt internals
│   ├── format/     # Format templates
│   └── tools/      # /float command tools
└── project/        # Project-specific data
    ├── context/    # Terrain maps, decisions
    ├── nav/        # Folder navigation
    └── logs/       # Session history
```

## Depth Layering

- `core/index.md` + `project/project.md` = "what's here" (structure)
- `system.md` = "how it works" (behavior)

---

*v0.12.0*
</md>
</fp>
