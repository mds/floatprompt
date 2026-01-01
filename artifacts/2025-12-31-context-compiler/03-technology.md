# Technology Choice

## Options Compared

| Framework | Philosophy | Syntax | Partials | Conditionals | Filters | Inheritance |
|-----------|------------|--------|----------|--------------|---------|-------------|
| **Mustache** | Logic-less | `{{var}}` | ✓ | exists-only | ✗ | ✗ |
| **Handlebars** | Mustache++ | `{{var}}` | ✓ | ✓ `#if/#each` | custom | ✗ |
| **Liquid** | CMS-oriented | `{{ var }}` | ✓ | ✓ `{% if %}` | ✓ built-in | ✗ |
| **Nunjucks** | Jinja2 for JS | `{{ var }}` | ✓ | ✓ | ✓ | ✓ `extends` |
| **EJS** | Full JS | `<%= var %>` | ✓ | ✓ (any JS) | ✓ (any JS) | ✗ |

---

## Framework Deep Dive

### Mustache

```mustache
{{version}}
{{#tools}}
  - {{name}}
{{/tools}}
{{#has_buoys}}
  {{> buoy-section}}
{{/has_buoys}}
```

- Logic-less by design
- Sections based on existence (truthy/falsy), not expressions
- Cross-language (Ruby, Python, JS, Go, etc.)
- Tiny footprint

**Limitation:** No `{{#if value > 5}}` — only "does it exist?"

### Handlebars

```handlebars
{{version}}
{{#if needsBuoys}}
  {{> buoy-team maxBuoys=4}}
{{/if}}
{{#each tools}}
  - {{this.name}}: {{this.description}}
{{/each}}
{{#unless disabled}}
  Enabled
{{/unless}}
```

- Extends Mustache syntax
- Built-in helpers: `#if`, `#each`, `#unless`, `#with`
- Partials with parameters: `{{> partial param=value}}`
- Custom helpers (write JS functions)
- Precompilation for performance

### Liquid

```liquid
{{ version }}
{% if needs_buoys %}
  {% include 'buoy-team' %}
{% endif %}
{{ name | upcase | prepend: "Tool: " }}
{% for tool in tools %}
  - {{ tool.name }}
{% endfor %}
```

- Shopify/Jekyll heritage
- Filters for transformation: `| upcase`, `| default: "x"`
- Tags for logic: `{% if %}`, `{% for %}`
- Safe (no arbitrary code execution)
- Designed for non-programmers

### Nunjucks

```nunjucks
{% extends "base-tool.njk" %}

{% block content %}
  {{ version }}
  {% if needsBuoys %}
    {% include "buoy-team.njk" %}
  {% endif %}
{% endblock %}

{% macro button(label, type="primary") %}
  <button class="{{ type }}">{{ label }}</button>
{% endmacro %}
```

- Mozilla project
- Template inheritance (`extends`, `block`)
- Macros (reusable parameterized chunks)
- Jinja2 syntax (Python developers feel at home)
- Async support

---

## Why Handlebars

### Requirements Match

| Requirement | Mustache | Handlebars | Liquid | Nunjucks |
|-------------|----------|------------|--------|----------|
| Variable substitution | ✓ | ✓ | ✓ | ✓ |
| Partials (shared fragments) | ✓ | ✓ | ✓ | ✓ |
| Conditionals beyond exists | ✗ | ✓ | ✓ | ✓ |
| Pass params to partials | ✗ | ✓ | ✓ | ✓ |
| Learning curve | Tiny | Small | Small | Medium |
| React migration path | Indirect | Direct | Indirect | Indirect |

### Decision Rationale

1. **Partials with parameters** — Need `{{> duality run="..." check="..."}}`
2. **Real conditionals** — Need `{{#if tool.has_buoys}}`, not just existence
3. **Simple enough** — Not building a CMS, don't need inheritance
4. **React-portable** — Handlebars concepts map directly to React

### What We Don't Need

- Template inheritance (Nunjucks) — Partials are enough
- Built-in filters (Liquid) — Custom helpers cover it
- Full JS (EJS) — Too powerful, invites complexity

---

## Handlebars → React Migration

When the time comes, the mapping is direct:

| Handlebars | React/JSX |
|------------|-----------|
| `{{variable}}` | `{variable}` |
| `{{#if x}}...{{/if}}` | `{x && ...}` or `{x ? ... : ...}` |
| `{{#each items}}...{{/each}}` | `{items.map(item => ...)}` |
| `{{> partial}}` | `<Component />` |
| `{{> partial param=value}}` | `<Component param={value} />` |
| `partial.hbs` | `Component.jsx` |
| `config.json` | `config.json` (unchanged) |

### Example Conversion

**Handlebars:**
```handlebars
{{#if tool.has_buoys}}
  {{> buoy-team max=tool.buoy_limit}}
{{/if}}
{{#each tool.sequences}}
  ## {{phase}}
  {{#each steps}}
  - {{action}}
  {{/each}}
{{/each}}
```

**React:**
```jsx
{tool.has_buoys && <BuoyTeam max={tool.buoy_limit} />}
{tool.sequences.map(seq => (
  <>
    <h2>{seq.phase}</h2>
    {seq.steps.map(step => <li>{step.action}</li>)}
  </>
))}
```

**What stays the same:**
- Data structure (JSON configs)
- Component/partial boundaries
- Logic (what includes what)
- Output format (.md files)

**What changes:**
- Syntax (mustaches → braces)
- File extension (.hbs → .jsx)
- Runtime (Handlebars → React SSR)

---

## When to Upgrade to React

Triggers for React migration:

1. **TypeScript validation** — Want compile-time checking of configs
2. **Complex conditionals** — Logic exceeds Handlebars helpers
3. **Component props with defaults** — Need full prop system
4. **Building floatprompt.com** — Product investment justifies it

**Not triggers:**
- "React is better" — Handlebars is sufficient for current needs
- "Future-proofing" — Migration path is clear, no need to over-invest now

---

## Decision: Handlebars

**Locked.** Handlebars is the templating choice.

- Sufficient power for current needs
- Clear migration path to React
- Partials solve the duplication problem
- Conditionals solve the "optional sections" problem
- Small learning curve, big maintenance win
