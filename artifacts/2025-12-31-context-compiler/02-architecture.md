# Architecture

## Three-Layer System

```
┌─────────────────────────────────────────────────────┐
│                    CONFIG LAYER                      │
│                                                      │
│  system.json          Global config (version,        │
│                       author, paths)                 │
│                                                      │
│  *.tool.json          Per-tool config (purpose,      │
│                       patterns, sequences)           │
└─────────────────────────┬───────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│                   TEMPLATE LAYER                     │
│                                                      │
│  partials/            Shared fragments               │
│    duality.hbs        (duality, reporting,           │
│    reporting.hbs       status_format, footer)        │
│    footer.hbs                                        │
│                                                      │
│  tools/*.hbs          Tool templates                 │
│                       (one per tool)                 │
│                                                      │
│  outputs/*.hbs        Output templates               │
│    nav.hbs            (nav files, context files)     │
│    context.hbs                                       │
└─────────────────────────┬───────────────────────────┘
                          │
                          │ npm float build
                          ▼
┌─────────────────────────────────────────────────────┐
│                    OUTPUT LAYER                      │
│                                                      │
│  .float/tools/*.md           Compiled tools          │
│  .float/project/nav/*.md     Compiled nav files      │
│  .float/project/context/*.md Compiled context        │
└─────────────────────────┬───────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│                  AI CONSUMPTION                      │
│                                                      │
│  Claude Code / Any AI                               │
│  Reads compiled .md files                           │
│  Context is always current                          │
│  Variables resolved, relationships linked           │
└─────────────────────────────────────────────────────┘
```

---

## Two-Stage Templating

### Stage 1: Tool Templates

Tool templates compile to tool `.md` files:

```
system.json + float-sync.tool.json + float-sync.hbs
                    ↓
            npm float build
                    ↓
          .float/tools/float-sync.md
```

### Stage 2: Output Templates

Output templates compile to nav/context `.md` files:

```
folder scan + descriptions + nav.hbs
                    ↓
            npm float sync
                    ↓
        .float/project/nav/docs.md
```

**Key insight:** Tools don't just exist as templates — their OUTPUT is also templated. When `float-sync` runs, it can regenerate nav files from templates + scanned data.

---

## Variable Cascade

Variables flow from global → specific:

```
system.json
│
├── version: "0.18.0"
├── author: "@mds"
└── paths:
    ├── system: ".float/system.md"
    ├── nav: ".float/project/nav/"
    └── tools: ".float/tools/"
        │
        ▼
float-sync.hbs
│
│  {{system.version}}  →  "0.18.0"
│  {{paths.nav}}       →  ".float/project/nav/"
│
        ▼
float-sync.md (compiled)
│
│  Contains resolved values:
│  "version": "0.18.0"
│  Scan {{paths.nav}}*.md
        │
        ▼
nav/docs.hbs
│
│  {{paths.nav}}  →  ".float/project/nav/"
│
        ▼
nav/docs.md (compiled)
```

Change `version` in `system.json` → flows to all tools on rebuild.

---

## Global vs Relative Resolution

Like React imports, templates can reference global or relative:

### Global (from templates root)

```handlebars
{{> @partials/duality}}
{{> @partials/footer}}
```

Resolved from: `src/templates/partials/`

### Relative (same folder)

```handlebars
{{> ./tool-specific-partial}}
```

Resolved from: same folder as current template

### Mental Model

```javascript
// React equivalent
import { Duality } from '@/partials'       // global
import { LocalThing } from './local'       // relative
```

---

## Data Flow Diagram

```
┌──────────────┐     ┌──────────────┐
│ system.json  │     │ *.tool.json  │
│   (global)   │     │ (per-tool)   │
└──────┬───────┘     └──────┬───────┘
       │                    │
       └────────┬───────────┘
                │
                ▼
        ┌───────────────┐
        │    MERGE      │
        │  global +     │
        │  tool config  │
        └───────┬───────┘
                │
                ▼
        ┌───────────────┐
        │   TEMPLATE    │
        │  tool.hbs +   │
        │  partials     │
        └───────┬───────┘
                │
                ▼
        ┌───────────────┐
        │    OUTPUT     │
        │   tool.md     │
        └───────────────┘
```

---

## Build vs Runtime

| Phase | What Happens | When |
|-------|--------------|------|
| **Build** | Templates compile to .md | Developer runs `npm float build` |
| **Publish** | Compiled .md files packaged | `npm publish` |
| **Install** | User gets compiled .md | `npm float init` |
| **Runtime** | AI reads .md files | Claude Code session |

Users never see templates. They get compiled `.md` files. Templates are developer/maintainer concern.
