# FloatPrompt for Web — PRD

**Status:** Ready
**Version:** 1.0 (v1 scope)
**Last Updated:** 2026-01-08

---

## Core Problem

40-70% of tokens are wasted when AI agents parse websites — navigation, ads, footers, scripts. Publishers have no "make my site AI-readable" button. The llms.txt standard exists but requires manual creation and maintenance.

---

## Overview

FloatPrompt for Web is an NPM package that generates clean markdown files alongside HTML pages, making websites AI-readable. Run one command after your build, and every page gets a `.md` sibling, your site gets an `llms.txt` index, and a `/float/` dashboard shows everything.

**Domain:** Any website with a build pipeline (Next.js, Astro, Hugo, Jekyll, Eleventy)
**Source of Truth:** Your HTML files. Markdown is derived content, regenerated on each build.

---

## Users

| User Type | Description | Primary Actions |
|-----------|-------------|-----------------|
| SSG Developer | Uses Next.js, Astro, Hugo, Jekyll, Eleventy | Run post-build command, configure via config file |
| Docs Maintainer | Maintains documentation sites | Generate llms.txt automatically, reduce manual maintenance |
| Portfolio Dev | Personal/portfolio sites with build step | Make portfolio AI-discoverable |

**When this tool adds value:**
- You have a build pipeline (`npm run build`, `hugo build`, etc.)
- You want AI agents to consume your content efficiently
- You want llms.txt without manual maintenance

**When it's overkill:**
- No build step (pure static HTML you edit by hand)
- Dynamic-only app with no static pages
- Content changes in real-time (needs server middleware, not v1)

---

## Technical Stack

| Component | Technology | Notes |
|-----------|------------|-------|
| Runtime | Node.js 18+ | ESM package |
| Sanitization | DOMPurify ^3.x | ~15KB, removes XSS vectors |
| Extraction | @mozilla/readability ^0.5.x | ~15KB, battle-tested |
| Conversion | turndown ^7.x | ~10KB, industry standard |
| GFM Support | turndown-plugin-gfm ^1.x | ~2KB, tables/strikethrough |
| DOM Parsing | linkedom ^0.16.x | ~200KB, lighter than jsdom |
| Build | TypeScript, esbuild | |

**Bundle size targets:**
- Core: < 50KB gzipped
- With UI component: < 55KB gzipped

---

## Configuration

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| None | — | Zero config by default | — |

**Config file (optional):** `floatprompt.config.js`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `input` | string | `'./dist'` | Input directory |
| `output` | string | Same as input | Output directory |
| `include` | string[] | `['**/*.html']` | Glob patterns to include |
| `exclude` | string[] | `[]` | Glob patterns to exclude |
| `frontmatter.schema` | boolean | `true` | Include JSON-LD in frontmatter |
| `llmsTxt` | boolean | `true` | Generate llms.txt |
| `llmsFullTxt` | boolean | `true` | Generate llms-full.txt |
| `dashboard` | boolean | `true` | Generate /float/index.html |

**Philosophy:** Zero configuration for v1. `npx floatprompt generate ./dist` just works.

---

## Features

### Pipeline

| ID | Feature | Behavior | Acceptance Criteria |
|----|---------|----------|---------------------|
| PIPE-001 | HTML sanitization | DOMPurify sanitizes input HTML before extraction | XSS vectors removed; `<script>`, `onclick`, `javascript:` URLs stripped |
| PIPE-002 | Content extraction | Readability.js extracts main content | Navigation, ads, sidebars, footers removed; article title and content preserved |
| PIPE-003 | Markdown conversion | Turndown converts clean HTML to markdown | Headers, paragraphs, lists, links, images convert correctly |
| PIPE-004 | GFM support | turndown-plugin-gfm handles tables and strikethrough | Tables render as GFM tables; ~~strikethrough~~ works |
| PIPE-005 | Frontmatter generation | YAML frontmatter added to each .md file | Contains title, url, generated timestamp, source URL |
| PIPE-006 | JSON-LD extraction | Schema.org/JSON-LD extracted to frontmatter | If page has JSON-LD, it appears in `schema:` field (configurable) |

> **Key insight:** The pipeline is purely mechanical — no AI calls, no API keys. Fast, cheap, reliable.

---

### Output Files

| ID | Feature | Behavior | Acceptance Criteria |
|----|---------|----------|---------------------|
| OUTPUT-001 | .md alongside .html | For each `.html` file, generate `.md` sibling | `/about.html` → `/about.md`; same directory structure |
| OUTPUT-002 | llms.txt | Generate brief site index at root | Lists all pages with titles and paths; follows llms.txt spec |
| OUTPUT-003 | llms-full.txt | Generate complete content file at root | Concatenation of all .md files; single-request context load |
| OUTPUT-004 | Dashboard | Generate `/float/index.html` | Human-readable list of all .md files; copy/download actions |

**Output structure:**
```
dist/
├── llms.txt
├── llms-full.txt
├── index.html
├── index.md
├── about.html
├── about.md
├── docs/
│   ├── getting-started.html
│   ├── getting-started.md
│   └── ...
└── float/
    └── index.html
```

---

### CLI Interface

| ID | Feature | Behavior | Acceptance Criteria |
|----|---------|----------|---------------------|
| CLI-001 | Generate command | `npx floatprompt generate <dir>` processes all HTML | Exits 0 on success; prints summary of files generated |
| CLI-002 | Output flag | `--output <dir>` specifies output directory | Files written to specified directory |
| CLI-003 | Exclude patterns | `--exclude <glob>` skips matching files | `/admin/**` excludes admin pages |
| CLI-004 | Skip llms.txt | `--no-llms-txt` skips llms.txt generation | No llms.txt or llms-full.txt created |
| CLI-005 | Skip dashboard | `--no-dashboard` skips /float/ generation | No /float/ directory created |
| CLI-006 | Config file | Reads `floatprompt.config.js` if present | Config values override defaults |

**Usage examples:**
```bash
# Basic usage
npx floatprompt generate ./dist

# Custom output directory
npx floatprompt generate ./dist --output ./public

# Exclude admin pages
npx floatprompt generate ./dist --exclude "/admin/**"

# Minimal output (no dashboard)
npx floatprompt generate ./dist --no-dashboard
```

---

### Programmatic API

| ID | Feature | Behavior | Acceptance Criteria |
|----|---------|----------|---------------------|
| API-001 | generate() | `FloatPrompt.generate(options)` processes directory | Returns promise; resolves with summary object |
| API-002 | extract() | `FloatPrompt.extract(html, options)` processes single page | Returns markdown string with frontmatter |

**Usage:**
```javascript
import { FloatPrompt } from 'floatprompt';

// Process entire directory
await FloatPrompt.generate({
  input: './dist',
  output: './dist',
  exclude: ['/admin/**']
});

// Process single page
const markdown = await FloatPrompt.extract(htmlString, {
  url: '/about',
  title: 'About Us'
});
```

---

### Framework Integrations

| ID | Feature | Behavior | Acceptance Criteria |
|----|---------|----------|---------------------|
| INTEG-001 | Next.js wrapper | `withFloatPrompt(config)` wraps next.config.js | Runs after build; generates .md files |
| INTEG-002 | Astro integration | `floatprompt()` integration for astro.config.mjs | Runs after build; generates .md files |

**Next.js:**
```javascript
// next.config.js
const withFloatPrompt = require('floatprompt/next');

module.exports = withFloatPrompt({
  // your Next.js config
});
```

**Astro:**
```javascript
// astro.config.mjs
import floatprompt from 'floatprompt/astro';

export default {
  integrations: [floatprompt()]
};
```

**Generic (any SSG):**
```json
{
  "scripts": {
    "build": "your-build-command && npx floatprompt generate ./dist"
  }
}
```

---

### Human UI Component

| ID | Feature | Behavior | Acceptance Criteria |
|----|---------|----------|---------------------|
| UI-001 | Copy to clipboard | Button copies page markdown to clipboard | Clipboard contains full markdown with frontmatter |
| UI-002 | View as Markdown | Link opens .md file in new tab | Browser displays raw markdown |
| UI-003 | Download | Button downloads {page-slug}.md | File downloads with correct filename |

**Usage:**
```javascript
import { FloatPromptUI } from 'floatprompt';

// Default floating button
FloatPromptUI.init({
  position: 'bottom-right',
  theme: 'auto'
});

// Or attach to custom element
FloatPromptUI.init({ render: false });
document.getElementById('my-btn').onclick = () => {
  FloatPromptUI.copyToClipboard();
};
```

---

### Agent Discovery

| ID | Feature | Behavior | Acceptance Criteria |
|----|---------|----------|---------------------|
| SIGNAL-001 | Meta tags | Add `<link rel="alternate" type="text/markdown">` to HTML | Meta tag points to corresponding .md file |
| SIGNAL-002 | robots.txt rules | Document recommended robots.txt additions | README includes `Allow: /*.md` example |

**Meta tag (injected or documented):**
```html
<link rel="alternate" type="text/markdown" href="/about.md" />
```

**robots.txt (documented, not auto-generated):**
```
User-agent: *
Allow: /*.md
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /float/
```

---

## UI Philosophy

- Minimal footprint (~5KB)
- Unobtrusive — small button or custom integration
- No branding requirements
- Works without JavaScript (links to .md files work regardless)

---

## Error Handling

| Scenario | Behavior |
|----------|----------|
| Input directory doesn't exist | Exit 1 with clear error: "Directory not found: ./dist" |
| No HTML files found | Exit 0 with warning: "No HTML files found in ./dist" |
| Readability fails on a page | Log warning, skip page, continue processing others |
| Invalid HTML (parse error) | Log warning, skip page, continue processing others |
| Disk write fails | Exit 1 with error: "Failed to write: /path/to/file.md" |
| Config file invalid | Exit 1 with error: "Invalid config: [specific issue]" |

**Philosophy:** Fail gracefully on individual files, fail hard on systemic issues. Never silently produce incomplete output.

---

## Out of Scope (v1)

| Excluded | Rationale |
|----------|-----------|
| Hosted service | Self-hosted provides maximum AEO benefit |
| Server middleware | Build-time covers 80%+ of use cases |
| AI polish/enrichment | Mechanical extraction is sufficient for v1 |
| CMS plugins (WordPress, etc.) | Developers with build pipelines first |
| float.db database | Phase 2 feature |
| API endpoint (/float/api/) | Phase 2/3 feature |
| MCP resource compatibility | Phase 3 feature |
| "Open in Claude/ChatGPT" deep links | Phase 3 feature |
| Image downloading/embedding | Reference source URLs only |
| SPA client-side routing | Pre-render required; document in README |
| Multi-language i18n | Phase 2; each language gets its own .md |
| Very large sites (10K+ pages) | Phase 2 incremental generation |
| Meta tag injection | Document pattern; user adds to templates |
| robots.txt modification | Document pattern; user adds manually |

---

## Future Layers (Don't Build, Don't Block)

v1 is **Layer 1: Mechanical**. Two future layers are planned:

| Layer | What | Implication for v1 |
|-------|------|-------------------|
| **Layer 2: AI Enrichment** | `--enrich --api-key $KEY` adds AI polish | Pipeline should have hooks for post-processing |
| **Layer 3: Hosted Build Service** | FloatPrompt servers process and push back | `generate()` should be callable from server context |

**Do not build these features.** But design with awareness they're coming — keep the pipeline modular, keep the API context-agnostic.

---

## Implementation Order

1. **Project scaffold** — package.json, TypeScript config, ESLint, test setup
2. **Core pipeline** — DOMPurify → Readability → Turndown chain
3. **Frontmatter generation** — YAML frontmatter with schema extraction
4. **Single file processing** — `FloatPrompt.extract(html, options)`
5. **Directory walker** — Find all .html files, process each
6. **llms.txt generation** — Build index from processed pages
7. **llms-full.txt generation** — Concatenate all markdown
8. **/float/index.html dashboard** — Human-readable overview
9. **CLI interface** — `npx floatprompt generate` with flags
10. **Config file support** — Load floatprompt.config.js
11. **Next.js integration** — `withFloatPrompt` wrapper
12. **Astro integration** — Integration plugin
13. **UI component** — Copy/download buttons
14. **Documentation** — README, examples, migration guide

**Follow this sequence.** Each step should be completable and verifiable before the next begins.

---

## Success Criteria

### Must Have (v1 ship-blocking)

- [ ] `npx floatprompt generate ./dist` runs without error
- [ ] .md file generated alongside each .html file
- [ ] llms.txt generated at root with page index
- [ ] llms-full.txt generated at root with all content
- [ ] /float/index.html dashboard generated
- [ ] < 100ms per page average generation time
- [ ] < 50KB gzipped bundle size (core)
- [ ] Markdown matches original page content 95%+

### Should Have (v1 quality bar)

- [ ] Next.js integration works out of the box
- [ ] Astro integration works out of the box
- [ ] Zero-config works for 80% of sites tested
- [ ] Config file overrides work correctly
- [ ] Error messages are clear and actionable

### Nice to Have (if time permits)

- [ ] UI component for copy/download
- [ ] Verbose/debug mode (`--verbose`)
- [ ] Dry-run mode (`--dry-run`)
- [ ] Hugo integration
- [ ] Jekyll integration

---

## Key Deliverables

| Deliverable | Type | Priority | Status | Notes |
|-------------|------|----------|--------|-------|
| Core pipeline | Library | P0 | Not Started | DOMPurify → Readability → Turndown |
| CLI | Binary | P0 | Not Started | `npx floatprompt generate` |
| llms.txt generator | Library | P0 | Not Started | Per llms.txt spec |
| Dashboard generator | Library | P0 | Not Started | /float/index.html |
| Next.js integration | Plugin | P1 | Not Started | `withFloatPrompt` |
| Astro integration | Plugin | P1 | Not Started | Integration |
| UI component | Library | P2 | Not Started | Copy/download |
| Documentation | Docs | P1 | Not Started | README + examples |

---

## Design Progress

| Component | Status | Location |
|-----------|--------|----------|
| Architecture | Done | `architecture.md` |
| Technical spec | Done | `spec.md` |
| Vision | Done | `vision.md` |
| Research | Done | `research.md` |
| PRD | Done | This file |
| Core pipeline | Not Started | — |
| CLI | Not Started | — |
| Integrations | Not Started | — |

---

## Open Questions

| Question | Status | Resolution |
|----------|--------|------------|
| NPM package name available? | Open | Check `floatprompt` availability |
| How to handle SPAs? | Resolved | Pre-render required; document in README |
| Multi-language sites? | Resolved | Each language gets its own .md; defer to Phase 2 |
| Image handling? | Resolved | Reference source URLs, no downloading |
| Meta tag injection? | Resolved | Document pattern, user adds to templates |
| robots.txt modification? | Resolved | Document pattern, user adds manually |

---

## References

| File | Contains | When to Reference |
|------|----------|-------------------|
| `vision.md` | Problem, opportunity, conviction | Understanding the "why" |
| `research.md` | Landscape synthesis, prior art, library choices | Technical decisions |
| `architecture.md` | Technical design, pipeline details, output structure | Implementation details |
| `spec.md` | Boundaries, non-goals, success criteria | What NOT to build |

---

## Setup Instructions

1. Clone repository
2. `npm install`
3. `npm run build` — Compile TypeScript
4. `npm link` — Make CLI available locally
5. Test: `npx floatprompt generate ./test-site`

---

## Build-Ready Checklist

- [x] Core problem is clear
- [x] All features have acceptance criteria
- [x] Technical stack is defined
- [x] Configuration variables documented
- [x] Implementation order makes sense
- [x] Out of scope is explicit
- [ ] No open questions blocking v1 (NPM name check pending)

**Build-ready:** Yes (pending NPM name verification)

---

*This PRD is optimized for Claude Code. Extract features to `features.json` for progress tracking.*
