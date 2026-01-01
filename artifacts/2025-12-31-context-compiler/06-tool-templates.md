# Tool Templates

## Anatomy of a Tool Template

A tool template combines:
- Global config (system.json)
- Tool config (*.tool.json)
- Partials (shared fragments)
- Template structure (*.hbs)

---

## Complete Example: float-sync.hbs

```handlebars
<fp>
  <json>
  {
    "STOP": "{{tool.purpose}}",

    "meta": {
      "title": "{{tool.name}}",
      "version": "{{system.version}}",
      "id": "{{tool.id}}",
      "type": "{{tool.type}}"
    },

    "human": {
      "author": "{{system.author}}",
      "intent": "{{tool.intent}}"
    },

    "ai": {
      "role": "{{tool.role}}"
    },

    "requirements": {
      {{> duality patterns.duality}}
      {{> status_format}}
      {{> next_step_logic next_steps=next_steps}}
      {{#if patterns.has_buoys}}
      {{> buoys buoys=buoys limit=defaults.buoy_limit}}
      {{/if}}
      {{#if patterns.has_reporting}}
      {{> reporting sections=patterns.reporting_sections}}
      {{/if}}
    }
  }
  </json>
  <md>

  {{> tool_header tool=tool patterns=patterns}}

  {{#each sequences}}
  ## {{phase}} Phase

  {{#each steps}}
  {{@index_1}}. {{this}}
  {{/each}}

  {{/each}}

  {{#if buoys}}
  ## Buoys

  | Buoy | Scope | Returns |
  |------|-------|---------|
  {{#each buoys}}
  | {{name}} | `{{scope}}` | {{returns}} |
  {{/each}}

  {{#each buoys}}
  ### {{name}}

  **Prompt:**
  ```
  {{prompt}}
  ```

  {{/each}}
  {{/if}}

  ## Examples

  {{#each examples}}
  ### {{title}}

  **Input:** `{{input}}`

  **Output:** {{output}}

  {{/each}}

  {{> footer}}

  </md>
</fp>
```

---

## Partial Details

### tool_header.hbs

```handlebars
# {{tool.name}}

**{{tool.purpose}}**

| Mode | Behavior |
|------|----------|
| Run | {{patterns.duality.run}} |
| Check | {{patterns.duality.check}} |

**Default:** Check mode (report only)
```

### duality.hbs

```handlebars
"duality": {
  "pattern": "Run mode executes changes, Check mode reports only",
  "run": "{{run}}",
  "check": "{{check}}",
  "default": "check"
},
```

### status_format.hbs

```handlebars
"status_format": {
  "type": "json",
  "fields": {
    "status": "operational | issues_found | error",
    "tool": "{{tool.name}}",
    "mode": "run | check",
    "findings": "array",
    "next_steps": "array"
  }
},
```

### next_step_logic.hbs

```handlebars
"next_step_logic": {
  "on_success": "Report completion, suggest next tool",
  "on_issues": "List issues, recommend fixes",
  "suggested_next": [{{#each next_steps}}"{{this}}"{{#unless @last}}, {{/unless}}{{/each}}]
},
```

### buoys.hbs

```handlebars
"buoys": {
  "enabled": true,
  "max_parallel": {{limit}},
  "team": [
    {{#each buoys}}
    {
      "name": "{{name}}",
      "prompt": "{{prompt}}",
      "scope": "{{scope}}",
      "returns": "{{returns}}"
    }{{#unless @last}},{{/unless}}
    {{/each}}
  ]
},
```

### reporting.hbs

```handlebars
"reporting": {
  "tool": "float-report",
  "when": "After each phase completion",
  "sections": [{{#each sections}}"{{this}}"{{#unless @last}}, {{/unless}}{{/each}}],
  "format": "MDS log files"
},
```

### footer.hbs

```handlebars
---

*{{system.author}} · [FloatPrompt](https://floatprompt.com) v{{system.version}}*
```

---

## Custom Helpers

For complex logic, register Handlebars helpers:

```javascript
// helpers.js

Handlebars.registerHelper('index_1', function(index) {
  return index + 1;  // 1-based indexing
});

Handlebars.registerHelper('json', function(obj) {
  return JSON.stringify(obj);
});

Handlebars.registerHelper('lowercase', function(str) {
  return str.toLowerCase();
});

Handlebars.registerHelper('ifeq', function(a, b, options) {
  return a === b ? options.fn(this) : options.inverse(this);
});
```

Usage:
```handlebars
{{#ifeq tool.type "integrity"}}
This is an integrity tool.
{{/ifeq}}

Step {{index_1 @index}}: {{action}}
```

---

## Tool Types

Tools can share more structure via type:

```json
// types/integrity-tool.json
{
  "type_defaults": {
    "has_buoys": true,
    "has_reporting": true,
    "reporting_sections": ["map", "structure"],
    "role_suffix": "integrity guardian"
  }
}
```

Tool config can reference type:
```json
{
  "tool": {
    "name": "float-sync",
    "type": "integrity",
    "extends": "types/integrity-tool.json"
  }
}
```

Build process merges type defaults with tool specifics.

---

## Compiled Output

**Input:** `float-sync.tool.json` + `float-sync.hbs` + partials + `system.json`

**Output:** `.float/tools/float-sync.md`

The compiled output is a complete, standalone FloatPrompt document with:
- All variables resolved
- All partials inlined
- Valid `<fp><json><md></fp>` structure
- Ready for AI consumption

---

## Validation

Before compilation completes:

1. **JSON validity** — Parsed without errors
2. **Required fields** — STOP, meta, human, ai, requirements present
3. **Variable resolution** — No unresolved `{{variables}}`
4. **Partial resolution** — No missing partials

```javascript
function validateOutput(compiled) {
  // Extract JSON section
  const jsonMatch = compiled.match(/<json>([\s\S]*?)<\/json>/);
  if (!jsonMatch) throw new Error('Missing <json> section');

  const json = JSON.parse(jsonMatch[1]);

  // Required fields
  const required = ['STOP', 'meta', 'human', 'ai', 'requirements'];
  for (const field of required) {
    if (!json[field]) throw new Error(`Missing required field: ${field}`);
  }

  // Unresolved variables
  if (compiled.includes('{{')) {
    throw new Error('Unresolved template variables');
  }

  return true;
}
```
