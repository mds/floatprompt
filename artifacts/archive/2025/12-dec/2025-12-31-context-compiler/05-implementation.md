# Implementation

## Directory Structure

```
floatprompt/
│
├── src/
│   └── templates/                    # SOURCE (maintainer reality)
│       │
│       ├── system.json               # Global config
│       │
│       ├── partials/                 # Shared fragments
│       │   ├── duality.hbs
│       │   ├── status_format.hbs
│       │   ├── next_step_logic.hbs
│       │   ├── buoys.hbs
│       │   ├── reporting.hbs
│       │   ├── tool_header.hbs
│       │   └── footer.hbs
│       │
│       ├── tools/                    # Tool templates
│       │   ├── float.tool.json
│       │   ├── float.hbs
│       │   ├── float-sync.tool.json
│       │   ├── float-sync.hbs
│       │   ├── float-fix.tool.json
│       │   ├── float-fix.hbs
│       │   └── ... (16 tools)
│       │
│       └── outputs/                  # Output templates
│           ├── nav-folder.hbs
│           ├── context-map.hbs
│           └── mds-trifecta/
│               ├── map.hbs
│               ├── decisions.hbs
│               └── structure.hbs
│
├── dist/                             # BUILD OUTPUT
│   └── .float/
│       ├── tools/*.md
│       └── project/
│           ├── nav/*.md
│           └── context/*.md
│
├── bin/
│   └── float.js                      # CLI entry point
│       ├── commands/
│       │   ├── build.js
│       │   ├── sync.js
│       │   ├── validate.js
│       │   └── init.js
│       └── lib/
│           ├── compiler.js           # Handlebars compilation
│           ├── scanner.js            # Folder scanning
│           └── config.js             # Config loading
│
├── templates/                        # USER-FACING (for npm float init)
│   └── .float/
│       └── ... (compiled outputs copied here)
│
└── package.json
```

---

## Config Schemas

### system.json (Global)

```json
{
  "system": {
    "version": "0.18.0",
    "author": "@mds",
    "format": "floatprompt",
    "repository": "https://github.com/mds/floatprompt"
  },
  "paths": {
    "system": ".float/system.md",
    "project": ".float/project/project.md",
    "nav": ".float/project/nav/",
    "context": ".float/project/context/",
    "tools": ".float/tools/",
    "logs": ".float/project/logs/"
  },
  "defaults": {
    "ai_model": "Claude",
    "buoy_limit": 5,
    "reporting_enabled": true
  }
}
```

### Tool Config (float-sync.tool.json)

```json
{
  "tool": {
    "name": "float-sync",
    "id": "float-sync",
    "purpose": "Verify nav files match folder structure",
    "type": "integrity",
    "intent": "Structure integrity validation",
    "role": "Structure integrity guardian"
  },

  "patterns": {
    "duality": {
      "run": "Verify nav ↔ folders, report drift, offer fixes",
      "check": "Report drift only, no modifications"
    },
    "has_buoys": true,
    "has_reporting": true,
    "reporting_sections": ["map", "structure"]
  },

  "buoys": [
    {
      "name": "nav_scanner",
      "prompt": "Scan nav files and compare to actual folder structure",
      "scope": "{{paths.nav}}*.md",
      "returns": "List of drift items"
    },
    {
      "name": "folder_scanner",
      "prompt": "Scan actual folders and list contents",
      "scope": "Top-level project folders",
      "returns": "Folder inventory"
    }
  ],

  "sequences": [
    {
      "phase": "Discovery",
      "steps": [
        "Read {{paths.system}} for boot context",
        "Glob {{paths.nav}}*.md for nav inventory",
        "Scan actual folder structure"
      ]
    },
    {
      "phase": "Analysis",
      "steps": [
        "Compare nav entries to folder contents",
        "Identify drift (missing, extra, stale)",
        "Classify severity"
      ]
    },
    {
      "phase": "Resolution",
      "steps": [
        "Report drift to human",
        "Propose fixes (if run mode)",
        "Apply approved fixes"
      ]
    }
  ],

  "next_steps": ["float-fix", "float-context"],

  "examples": [
    {
      "title": "Check mode",
      "input": "/float-sync",
      "output": "Drift report, no changes"
    },
    {
      "title": "Run mode",
      "input": "/float-sync run",
      "output": "Drift report + fixes applied"
    }
  ]
}
```

---

## Partials Inventory

| Partial | Description | Used By |
|---------|-------------|---------|
| `duality.hbs` | Run/check mode pattern | All 16 tools |
| `status_format.hbs` | JSON output structure | All 16 tools |
| `next_step_logic.hbs` | Routing suggestions | All 16 tools |
| `buoys.hbs` | Buoy spawning pattern | 8 tools |
| `reporting.hbs` | float-report integration | 12 tools |
| `tool_header.hbs` | STOP + duality table | All 16 tools |
| `footer.hbs` | Attribution line | All 16 tools |

### Partial: duality.hbs

```handlebars
"duality": {
  "pattern": "Run mode executes changes, Check mode reports only",
  "run": "{{run}}",
  "check": "{{check}}",
  "default": "check"
},
```

### Partial: reporting.hbs

```handlebars
"reporting": {
  "tool": "float-report",
  "when": "After each phase",
  "sections": [{{#each sections}}"{{this}}"{{#unless @last}}, {{/unless}}{{/each}}]
},
```

### Partial: footer.hbs

```handlebars
---
*{{system.author}} · [FloatPrompt](https://floatprompt.com) v{{system.version}}*
```

---

## Build Process

### Pseudocode

```javascript
const Handlebars = require('handlebars');
const glob = require('glob');
const fs = require('fs');
const path = require('path');

// 1. Load global config
const system = JSON.parse(fs.readFileSync('src/templates/system.json'));

// 2. Register partials
const partials = glob.sync('src/templates/partials/*.hbs');
for (const partial of partials) {
  const name = path.basename(partial, '.hbs');
  const content = fs.readFileSync(partial, 'utf8');
  Handlebars.registerPartial(name, content);
}

// 3. Compile each tool
const tools = glob.sync('src/templates/tools/*.tool.json');
for (const toolConfig of tools) {
  const tool = JSON.parse(fs.readFileSync(toolConfig));
  const templatePath = toolConfig.replace('.tool.json', '.hbs');
  const template = Handlebars.compile(fs.readFileSync(templatePath, 'utf8'));

  // Merge configs
  const data = {
    system: system.system,
    paths: system.paths,
    defaults: system.defaults,
    tool: tool.tool,
    patterns: tool.patterns,
    buoys: tool.buoys,
    sequences: tool.sequences,
    next_steps: tool.next_steps,
    examples: tool.examples
  };

  // Render
  const output = template(data);

  // Write
  const outputPath = `dist/.float/tools/${tool.tool.name}.md`;
  fs.writeFileSync(outputPath, output);
}
```

### npm Scripts

```json
{
  "scripts": {
    "build": "node bin/float.js build",
    "build:tools": "node bin/float.js build --tools-only",
    "build:watch": "nodemon --watch src/templates -e hbs,json --exec 'npm run build'",
    "prepublish": "npm run build"
  }
}
```

---

## Config Loading Priority

```
1. Default config (built into package)
2. Project .floatrc.json (if exists)
3. Environment variables (FLOAT_*)
4. Command line flags (--config, --version)
```

Allows override at each level.
