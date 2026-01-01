---
title: Technology Reassessment
type: analysis
created: 2025-12-31
status: strategic decision needed

human_author: @mds
human_intent: Challenge the Handlebars assumption with honest analysis
human_context: Asked Claude to think like a world-class computer scientist, not just use familiar tools

ai_model: Claude Opus 4.5
ai_updated: 2025-12-31
ai_notes: Handlebars may be the wrong choice. TypeScript native is likely better.
---

# Technology Reassessment

The artifact says "Handlebars now, React later." This document challenges that assumption.

## The Actual Problem

We need to:
1. **Compile templates** → static `.md` files
2. **Scan folders** → generate nav/context
3. **Validate structure** → catch drift
4. **Run interactively** (Claude Code) AND **headless** (CI/CD)

---

## Options Compared

### 1. Handlebars (Current Plan)

```handlebars
{{#each sequences}}
## {{phase}}
{{#each steps}}
- {{this}}
{{/each}}
{{/each}}

{{> footer}}
```

| Pros | Cons |
|------|------|
| Simple, proven | No type safety |
| Partials work | Logic gets ugly fast |
| Low learning curve | Another syntax to learn |
| | Limited conditionals |
| | **Dead ecosystem** — last major update years ago |

**Verdict:** Compromise choice. Works, but not ideal.

---

### 2. React/JSX

```jsx
{sequences.map(seq => (
  <>
    <h2>{seq.phase}</h2>
    {seq.steps.map(s => <li>{s}</li>)}
  </>
))}
<Footer />
```

| Pros | Cons |
|------|------|
| Components are functions | Heavier runtime |
| TypeScript support | Overkill for static gen? |
| Massive ecosystem | |
| `renderToString()` works | |

**Verdict:** Good for product/UI. Maybe overkill for build pipeline.

---

### 3. Python (Jinja2)

```jinja2
{% for seq in sequences %}
## {{ seq.phase }}
{% for step in seq.steps %}
- {{ step }}
{% endfor %}
{% endfor %}
```

| Pros | Cons |
|------|------|
| Battle-tested (Ansible, Flask) | Two languages in project |
| Better for file operations | npm ecosystem friction |
| Cleaner than Handlebars | Less natural for Claude Code |
| AI tools often Python | |

**Verdict:** Would win if FloatPrompt were an AI/ML library. Adds friction here.

---

### 4. MDX (Markdown + JSX)

```mdx
import { Duality, Footer } from './partials'

# {tool.name}

<Duality run={tool.run} check={tool.check} />

{tool.sequences.map(seq => (
  <Phase key={seq.name} {...seq} />
))}

<Footer version={system.version} />
```

| Pros | Cons |
|------|------|
| Markdown IS the output | Learning curve |
| Components for structure | Build complexity |
| Vercel/Next.js ecosystem | |
| Natural for docs | |

**Verdict:** Interesting for product. Worth considering.

---

### 5. TypeScript + Tagged Template Literals (Recommended)

```typescript
import { tool, partial } from './lib'

export default tool({
  name: 'float-sync',
  version: system.version,

  json: {
    STOP: 'Float Sync Tool...',
    meta: { ...system.meta, id: 'float-sync' },
    requirements: {
      ...partial.duality({ run: '...', check: '...' }),
      ...partial.reporting(['map', 'structure']),
    }
  },

  markdown: md`
# /float sync

${partial.dualityTable({ run, check })}

## Phases

${sequences.map(seq => md`
### ${seq.name}
${seq.steps.map(s => `- ${s}`).join('\n')}
`).join('\n')}

${partial.footer()}
  `
})
```

| Pros | Cons |
|------|------|
| **No new syntax** — just TypeScript | Slightly more verbose |
| **Type safety** — autocomplete, catch typos | |
| **Partials are functions** — no engine overhead | |
| **Full power** — loops, conditionals, async | |
| **Single language** — same as npm CLI | |
| **IDE support** — VSCode knows everything | |

**Verdict:** This is probably the right answer.

---

### 6. YAML + Code Generation

```yaml
# float-sync.tool.yaml
name: float-sync
type: integrity
version: $ref:system.version

patterns:
  - duality
  - reporting: [map, structure]

sequences:
  - phase: Discovery
    steps:
      - Read {{paths.boot}}
      - Scan {{paths.nav}}
```

| Pros | Cons |
|------|------|
| Config is pure data | Two-step process |
| Easy schema validation | Less flexible |
| Non-programmers can edit | Generator is separate concern |
| How K8s, GitHub Actions work | |

**Verdict:** Good pattern, but TypeScript gives same benefits with more power.

---

## Recommendation Matrix

| Approach | Build Pipeline | Product UI | AI/ML Focus |
|----------|----------------|------------|-------------|
| Handlebars | Okay | No | No |
| React/JSX | Overkill | **Yes** | No |
| Python/Jinja2 | Friction | No | **Yes** |
| MDX | Good | Good | No |
| **TypeScript native** | **Best** | Good | Okay |
| YAML + codegen | Good | No | Good |

---

## The Recommendation

**TypeScript with tagged template literals.**

### Why

1. **No new syntax** — it's just TypeScript you already know
2. **Type safety** — `system.version` autocompletes, typos caught at build time
3. **Partials are functions** — `partial.duality()` not `{{> duality}}`
4. **Full power when needed** — async, imports, complex conditionals
5. **Single language** — same as `bin/floatprompt.js`, same mental model
6. **IDE support** — VSCode understands everything
7. **Easy testing** — Jest/Vitest for the build pipeline

### The Build System

```typescript
// build.ts — this IS the build system
const tools = await glob('src/tools/*.ts')
for (const tool of tools) {
  const { default: config } = await import(tool)
  const output = renderTool(config)
  await writeFile(`dist/.float/tools/${config.name}.md`, output)
}
```

### Migration Path

1. Create `src/tools/` with TypeScript tool definitions
2. Create `src/partials/` with shared functions
3. Create `src/system.ts` with global config
4. Build outputs to `dist/.float/tools/*.md`
5. Migrate one tool, validate output matches current
6. Migrate remaining 14 tools
7. Delete old static `.md` files

---

## Revised Decision

| Original | Revised |
|----------|---------|
| Handlebars now | **TypeScript now** |
| React later | React for product UI only |
| Product eventually | Product when ready |

The artifact's "Handlebars as initial choice" should be reconsidered. TypeScript native is simpler, more powerful, and doesn't require learning a new syntax.

---

## Open Questions

1. Is the team comfortable with this approach?
2. Should we prototype both and compare?
3. What's the timeline for first migrated tool?
