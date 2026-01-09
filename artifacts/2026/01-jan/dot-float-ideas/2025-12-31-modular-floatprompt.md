# Modular FloatPrompt Exploration

**Status:** Strategizing / Experimenting
**Date:** 2025-12-31

## The Problem

Current floatprompts are monolithic single files. This creates:
1. **Duplication** — 14 tools share patterns, copy-pasted
2. **Implicit relationships** — tool connections live in your head
3. **Requirements bloat** — the `requirements` object is becoming a junk drawer
4. **Update friction** — change duality pattern → update 14 files

## The Idea: Composition

What if floatprompts composed from pieces?

### Basic Modular Format

```
<fp>
  <json>
    {{stop.json}}
    {{floatprompt.json}}
    {{meta.json}}
    {{human.json}}
    {{ai.json}}
    {{requirements.json}}
    {{specialized.json}}
  </json>
  <md>
    {{ai-summary.md}}
    {{guidance.md}}
    {{goals.md}}
    {{context.md}}
    {{output.md}}
    {{warnings.md}}
    {{credit.md}}
  </md>
</fp>
```

See: `templates/.float/templates/floatprompt-modular.md`

### Global vs Relative (React Mental Model)

**Global fragments** (shared across floatprompts):
```
.float/
  fragments/
    requirements/
      duality.json
      voice-preservation.json
      mds-method.json
    ai/
      archaeologist.json
      guardian.json
    meta/
      floatprompt-tool.json
```

**Relative fragments** (local to this floatprompt):
```
.float/tools/float-sync/
  stop.json
  meta.json
  requirements.json  # tool-specific only
  body.md
```

**Resolution pattern:**
- `{{@fragments/requirements/duality.json}}` = global (from .float root)
- `{{./meta.json}}` = relative to this floatprompt

Like React:
```jsx
import { useDuality } from '@/hooks'      // global
import { localHelper } from './utils'     // relative
```

## The React Direction

Could actually use React/JSX to compose floatprompts:

```jsx
// float-sync.fp.jsx

import { FloatPrompt, Json, Md } from '@floatprompt/core'
import { Duality, BuoyTeam, Reporting } from '@/fragments/requirements'
import { IntegrityGuardian } from '@/fragments/ai'
import { ToolMeta } from '@/fragments/meta'

export default function FloatSync() {
  return (
    <FloatPrompt>
      <Json>
        <Stop>Verify nav files match folder structure</Stop>
        <ToolMeta
          title="float-sync"
          id="float-sync"
          version="0.17.0"
        />
        <Human author="@mds" intent="Structure integrity validation" />
        <IntegrityGuardian />
        <Duality
          run="Verify nav ↔ folders"
          check="Report drift only"
        />
        <BuoyTeam max={4} />
        <Reporting sections={['map', 'structure']} />
        <Requirements>
          {/* tool-specific */}
        </Requirements>
      </Json>
      <Md>
        <Body src="./body.md" />
      </Md>
    </FloatPrompt>
  )
}
```

### What React Gives You

1. **TypeScript** — type-safe floatprompts, autocomplete, validation at build time
2. **Props** — `<Duality run="..." check="..." />` instead of copy-paste JSON
3. **Composition** — import/export, the whole React model
4. **Conditionals** — `{needsBuoys && <BuoyTeam />}`
5. **Loops** — map over tool configs to generate multiple floatprompts
6. **Ecosystem** — npm, bundlers, testing, all of it

### Tool Types as Components

```jsx
// fragments/types/IntegrityTool.jsx
export function IntegrityTool({ children, duality, buoys, reporting }) {
  return (
    <>
      <Duality {...duality} />
      <BuoyTeam {...buoys} />
      <Reporting {...reporting} />
      {children}
    </>
  )
}

// Usage in float-sync.fp.jsx:
<IntegrityTool
  duality={{ run: "Verify", check: "Report" }}
  buoys={{ max: 4 }}
  reporting={{ sections: ['map'] }}
>
  <MySpecificRequirements />
</IntegrityTool>
```

### Build Step

```bash
npx float build

# Compiles:
#   float-sync.fp.jsx → .float/tools/float-sync.md
#   float-fix.fp.jsx  → .float/tools/float-fix.md
#   ...
```

**Source** (maintainer reality): `.fp.jsx` files with composition
**Distribution** (user/AI reality): compiled single `.md` files

## Product Implications

This could be the **floatprompt.com** product:
- Visual component builder
- Drag-and-drop composition
- Exports to portable `.md` files
- No-code for users, full-code for power users

## Open Questions

1. **Is React overkill?** — Could achieve similar with simpler templating (Handlebars, Liquid)
2. **TypeScript types** — Define the floatprompt schema as TS interfaces?
3. **Validation** — How to validate composed floatprompt before build?
4. **AI understanding** — Can AI work with `.fp.jsx` source, or only compiled?
5. **Migration** — Path from current monolithic to modular?

## Practical Assessment (from session)

### What Actually Churns

Analyzed the 16 tools after 0.15.0 → 0.17.0 update:

| Component | Tools Using | Churn Level |
|-----------|-------------|-------------|
| `version` | All 16 | HIGH (every release) |
| Path references | All 16 | HIGH (structure changes) |
| `reporting` protocol | 12 | MEDIUM (stable pattern) |
| `status_format` | All 16 | MEDIUM (evolving) |
| `duality` pattern | All 16 | LOW (structural) |
| `footer.md` | All 16 | LOW (rarely changes) |
| Buoy prompts | 8 | LOW |

**Extraction priority:**
1. Version (highest churn)
2. Path references (structure changes)
3. Reporting protocol (12 tools)
4. Status format (evolving)

### Complexity Spectrum

| Approach | Complexity | Maintenance Win | When |
|----------|------------|-----------------|------|
| **Hybrid** (version + paths only) | Low | Medium | Now |
| **Template** (Handlebars/INJECT) | Medium | High | Next |
| **React/JSX** | High | Highest | Product |

### Build Integration Point

```
Development:
  components/ + templates/ → build → tools/

Publishing:
  npm publish (includes compiled tools/)

User install:
  npx float init → copies tools/ to .float/tools/
```

Users never see components. They get compiled single-file tools.

### Immediate Path (Option C: Hybrid)

Minimal change, solve biggest pain:

```
templates/.float/
├── shared/
│   ├── version.txt            # "0.18.0"
│   └── paths.json             # {"system": ".float/system.md", ...}
└── tools/
    └── ... (mostly self-contained, but read from shared/)
```

Build step only touches version/paths. Could be a simple sed script in package.json:

```json
"scripts": {
  "build:tools": "VERSION=$(cat shared/version.txt) && sed -i '' \"s/0\\.17\\.0/$VERSION/g\" tools/*.md"
}
```

## Not Deciding Yet

This is exploration. The current single-file format works. This explores what "better updateability and portability" could mean at scale.

**Session insight:** The React direction is the product vision (floatprompt.com). The hybrid approach is the immediate relief.

---

*Artifact created 2025-12-31 from conversation about modular floatprompt architecture*
