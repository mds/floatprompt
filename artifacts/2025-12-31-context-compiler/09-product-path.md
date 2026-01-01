# Product Path

## Handlebars Portability

The same `.hbs` templates work in three deployment contexts:

| Context | Runtime | Use Case |
|---------|---------|----------|
| **Node CLI** | `npm float build` | Current: maintainer tooling |
| **Browser** | Client-side Handlebars | Future: floatprompt.com web UI |
| **Server API** | Express + Handlebars | Future: render endpoint |

No rewrite needed. Same templates, same partials, same output.

---

## floatprompt.com Vision

### User Journey

1. User visits floatprompt.com
2. Fills form: project name, tools wanted, preferences
3. Form data becomes config JSON
4. Server renders Handlebars templates
5. User downloads zip or connects GitHub repo

### Interface Options

**Simple mode:**
- Pick tools from checklist
- Enter basic info (name, project)
- Get pre-configured floatprompt files

**Advanced mode:**
- Customize tool configs
- Add custom requirements
- Preview compiled output
- Export/import configs

### No Code for Users

Users interact with:
- Forms (project name, preferences)
- Checkboxes (which tools)
- Preview pane (see output)

Never see:
- JSON configs
- Handlebars templates
- Build process

Same power, zero complexity.

---

## Visual Builder

Drag-and-drop tool construction:

```
┌─────────────────────────────────────────┐
│  Tool Builder                           │
├─────────────────────────────────────────┤
│                                         │
│  Name: [float-custom      ]             │
│  Type: [integrity ▼]                    │
│                                         │
│  Patterns:                              │
│  ☑ Duality (run/check modes)           │
│  ☑ Buoys (parallel workers)            │
│  ☐ Reporting (MDS logs)                │
│                                         │
│  Buoy count: [3]                        │
│                                         │
│  ┌──────────────────────────────────┐   │
│  │ Preview                          │   │
│  │                                  │   │
│  │ <fp>                             │   │
│  │   <json>                         │   │
│  │   {                              │   │
│  │     "STOP": "...",               │   │
│  │     ...                          │   │
│  │                                  │   │
│  └──────────────────────────────────┘   │
│                                         │
│  [Download .md] [Copy to clipboard]     │
│                                         │
└─────────────────────────────────────────┘
```

### Under the Hood

```javascript
// Form state → config JSON
const config = {
  tool: {
    name: formData.name,
    type: formData.type,
  },
  patterns: {
    has_duality: formData.patterns.includes('duality'),
    has_buoys: formData.patterns.includes('buoys'),
    has_reporting: formData.patterns.includes('reporting'),
  },
  buoys: formData.buoyCount
};

// Config → Handlebars → Output
const template = Handlebars.compile(toolTemplate);
const output = template({ system, ...config });

// Display preview
previewPane.innerHTML = hljs.highlight(output, { language: 'markdown' }).value;
```

---

## API Possibilities

### Render Endpoint

```
POST /api/render
Content-Type: application/json

{
  "template": "float-sync",
  "config": {
    "tool": { "name": "my-sync", ... },
    "patterns": { ... }
  }
}

Response:
{
  "output": "<fp>\n  <json>...",
  "format": "floatprompt"
}
```

### Batch Render

```
POST /api/render/batch

{
  "tools": ["float-sync", "float-fix", "float-context"],
  "system": {
    "version": "0.18.0",
    "author": "@username"
  }
}

Response:
{
  "files": {
    "float-sync.md": "...",
    "float-fix.md": "...",
    "float-context.md": "..."
  }
}
```

### GitHub Integration

```
POST /api/deploy

{
  "repo": "username/my-project",
  "branch": "main",
  "path": ".float/",
  "tools": ["float-sync", "float-fix"],
  "config": { ... }
}

Response:
{
  "pr_url": "https://github.com/username/my-project/pull/42"
}
```

---

## React Upgrade Trigger

When to switch from Handlebars to React:

### Triggers

1. **TypeScript validation needed**
   - Want compile-time checking of configs
   - Complex config shapes need type safety

2. **Complex conditional logic**
   - Handlebars helpers aren't enough
   - Need full JS expressiveness

3. **Component props with defaults**
   - Want `<Tool name="x" buoys={3} />` syntax
   - Need prop types, default values

4. **Building the actual SaaS**
   - Product investment justifies React
   - Need component-based UI anyway

### Not Triggers

- "React is better" — Handlebars is sufficient now
- "Future-proofing" — Migration path is clear
- "Team knows React" — Learning Handlebars is 1 day

---

## Migration: Handlebars → React

When the time comes:

### Same Architecture

```
Config Layer:     system.json, *.tool.json  (unchanged)
Template Layer:   *.hbs → *.jsx              (syntax change)
Output Layer:     .float/**/*.md             (unchanged)
```

### Conversion Pattern

```handlebars
{{!-- duality.hbs --}}
"duality": {
  "run": "{{run}}",
  "check": "{{check}}"
},
```

```jsx
// Duality.jsx
export function Duality({ run, check }) {
  return `"duality": {
  "run": "${run}",
  "check": "${check}"
},`;
}
```

### What Stays Same

- Config files (JSON)
- Output format (`.md`)
- Build process concept
- Partial/component boundaries

### What Changes

- File extensions (`.hbs` → `.jsx`)
- Syntax (mustaches → braces)
- Runtime (Handlebars → React SSR)

---

## Business Model Implications

### Free Tier

- Web UI tool builder
- Download up to 3 tools
- Basic templates

### Pro Tier

- Unlimited tools
- Custom templates
- GitHub integration
- Team collaboration
- Priority support

### Enterprise

- Self-hosted option
- Custom tool development
- API access
- SLA

---

## Summary

The templating foundation enables:

1. **Now:** Better maintainability for FloatPrompt itself
2. **Soon:** Web UI for tool generation
3. **Later:** API for integrations
4. **Eventually:** Full SaaS product

Same templates power all of it. Investment now, compound returns later.
