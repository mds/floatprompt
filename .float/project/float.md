<fp>
<json>
{
  "STOP": ".float/project/ folder. Your project's FloatPrompt data. This is YOUR stuff.",

  "meta": {
    "title": ".float/project/",
    "id": "float-project-folder",
    "format": "floatprompt",
    "version": "0.12.0",
    "type": "context"
  },

  "human": {
    "author": "@mds",
    "intent": "Project-specific FloatPrompt data",
    "context": "Read project.md for structural reference"
  },

  "ai": {
    "role": "Context provider",
    "behavior": "Orient reader to project data structure"
  },

  "requirements": {
    "structure": {
      "project.md": "Structural reference",
      "context/": "Terrain maps, decisions",
      "nav/": "Folder navigation files",
      "logs/": "Session history"
    }
  }
}
</json>
<md>
# .float/project/

**Your project's FloatPrompt data** — this is YOUR stuff

## Quick Reference

See `project.md` for full structural reference.

## Contents

| Item | Purpose |
|------|---------|
| `project.md` | Structural reference |
| `context/` | Terrain maps, decisions |
| `nav/` | Folder navigation files |
| `logs/` | Session history |

## Your Data

Unlike `core/`, this folder contains project-specific data that varies per repository.

---

*v0.12.0*
</md>
</fp>
