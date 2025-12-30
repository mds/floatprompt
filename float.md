<fp>
<json>
{
  "STOP": "FloatPrompt Repository. The invisible OS for AI. Three pillars: format/, system/, package/.",

  "meta": {
    "title": "FloatPrompt",
    "id": "floatprompt-repo",
    "format": "floatprompt",
    "version": "0.12.0",
    "type": "context"
  },

  "human": {
    "author": "@mds",
    "intent": "Create portable AI tooling that preserves human voice and agency",
    "context": "Repository root — three pillars structure"
  },

  "ai": {
    "role": "Context provider",
    "behavior": "Orient reader to three-pillar repository structure"
  },

  "requirements": {
    "pillars": {
      "format/": "FILE pillar — What FloatPrompt IS (core/, specs/, docs/, examples/)",
      "system/": "SYSTEM pillar — How FloatPrompt WORKS (commands, buoys, tools)",
      "bin/": "CLI script (floatprompt)",
      "templates/": "Scaffolding templates"
    },
    "running_system": ".float/ — The system RUNNING in this project",
    "entry_points": {
      "quick_start": "README.md",
      "system_boot": ".float/system.md",
      "format_spec": "format/specs/floatprompt.md"
    }
  }
}
</json>
<md>
# FloatPrompt

**The invisible OS for AI**

## Three Pillars

```
floatprompt/
├── format/          ← FILE: What FloatPrompt IS
│   ├── core/        ← templates (template.md, doc.md, os.md)
│   ├── tools/       ← format tools (update.md)
│   ├── specs/       ← format specifications
│   ├── docs/        ← guides and philosophy
│   └── examples/    ← real-world examples
│
├── system/          ← SYSTEM: How FloatPrompt WORKS
│   ├── commands.md  ← /float command system
│   ├── buoys.md     ← parallel execution pattern
│   └── maintenance.md
│
├── bin/             ← CLI script (floatprompt)
├── templates/       ← scaffolding templates
│
├── .float/          ← Running system (dynamic)
├── .claude/         ← Claude Code integration
└── artifacts/       ← Working documents
```

## Entry Points

| Audience | Start Here |
|----------|------------|
| New user | `README.md` |
| AI session | `.float/system.md` |
| Building tools | `format/core/template.md` |
| Understanding format | `format/specs/floatprompt.md` |

---

*v0.12.0 — The Great Restructuring*
</md>
</fp>
