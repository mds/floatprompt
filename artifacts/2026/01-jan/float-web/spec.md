---
title: FloatPrompt for Web — Spec
id: floatprompt-web-spec
format: floatprompt
status: current
created: 2026-01-08

H:
  author: MDS
  intent: Define boundaries, core concepts, and success criteria

ai:
  model: Claude Opus 4.5
  session_context: |
    Built from vision.md, research.md, and architecture.md.
    Key decisions locked: NPM/CLI only, developers with build pipelines,
    self-hosted, .md alongside HTML, /float/ for dashboard.

related:
  - vision.md: Why this exists
  - research.md: Landscape synthesis
  - architecture.md: Technical design
  - prd.md: Detailed requirements (next)
---

# FloatPrompt for Web — Spec

> **What it is and isn't. The boundaries.**

---

## What This Is

**One sentence:**
FloatPrompt is an NPM package that generates clean markdown files alongside your HTML pages, making your website AI-readable.

**One paragraph:**
FloatPrompt takes any website that goes through a build step and adds a `.md` file next to every `.html` file. It auto-generates `llms.txt` (the emerging standard for AI-friendly site indexes) and creates a `/float/` dashboard for humans to browse the markdown. The output is self-hosted on your domain—no external service, maximum AEO benefit. One command after your build, and your site becomes part of the context mesh.

---

## What This Is NOT

**Not a hosted service (v1).**
You run it. You host it. Your domain, your files. A hosted option may come later, but v1 is self-hosted only.

**Not a scraper or crawler.**
FloatPrompt doesn't fetch external sites. It processes your own HTML files that already exist in your build output.

**Not a replacement for your content.**
The `.md` files are generated *from* your HTML. Your HTML remains the source of truth for humans. The markdown is for AI.

**Not a CMS plugin (v1).**
WordPress, Webflow, Squarespace users can't use v1 directly. This is for developers with build pipelines.

**Not an AI product.**
FloatPrompt is mechanical extraction (DOMPurify → Readability.js → Turndown). No AI calls, no API keys, no LLM required. AI polish is a future consideration, not v1.

**Not a standard.**
FloatPrompt implements the `llms.txt` standard and complements `sitemap.xml`. It doesn't propose a new standard—it makes existing standards easy to adopt.

---

## Why This Matters (Token Economics)

**40-70% of tokens are wasted on HTML parsing.**

When an AI agent reads a webpage, most of the context window goes to:
- Navigation menus
- Footer links
- Sidebar widgets
- Script tags
- CSS classes
- Ad containers

Clean markdown eliminates this waste. Same content, fraction of the tokens.

**The economic advantage:**
- Lower inference costs for agents
- More room in context window for actual content
- Faster processing
- Better results (signal not buried in noise)

Sites that serve clean context are cheaper to process. In a world of budget-conscious agents, that's competitive advantage.

---

## Core Concepts

### The Pattern

```
/about           ← HTML page (for humans)
/about.md        ← Markdown version (for AI)
```

Every page gets a `.md` sibling. Just add `.md` to any URL. This is the pattern Anthropic uses on their docs.

### Key Terms

| Term | Definition |
|------|------------|
| **FloatPrompt** | The umbrella brand. Context tells you the use case (web, repos, tooling). |
| **Build pipeline** | Any workflow with a build command (`npm run build`, `hugo build`, etc.). |
| **llms.txt** | Emerging standard for AI-friendly site indexes. A markdown file at `/llms.txt`. |
| **llms-full.txt** | Complete site content in one file. Concatenation of all `.md` files. |
| **/float/** | Dashboard directory. Contains human-readable overview + `float.db` (Phase 2). |
| **float.db** | SQLite database storing page metadata. Phase 2 feature. |
| **Context mesh** | The vision: every website is a node, context flows between sites, agents, humans. |

### The Hierarchy

```
/llms.txt              ← Index (per standard)
/llms-full.txt         ← Complete content (per standard)
/*.md                  ← Page-level markdown (alongside HTML)
/float/                ← Dashboard + extras
/float/index.html      ← Human-readable overview
/float/float.db        ← SQLite database (Phase 2)
```

---

## Target User

**v1 is for developers who deploy websites through a build pipeline.**

If your workflow includes a build command (`npm run build`, `hugo build`, `astro build`), FloatPrompt integrates as a post-build step.

**This includes:**
- Next.js / React sites
- Astro sites
- Hugo / Jekyll / Eleventy blogs
- Documentation sites (Docusaurus, VitePress, GitBook exports)
- Marketing sites with any SSG
- Portfolio sites

**This excludes (for v1):**
- Webflow / Framer / Squarespace (no build step, no self-hosting)
- WordPress (possible with plugin, not v1 scope)
- Fully dynamic apps with no static pages

**Future expansion:**
```
v1: Developers (NPM/CLI)
v2: CMS plugins (WordPress, etc.)
v3: Hosted service (non-technical users)
```

---

## What Gets Generated

### Per Page

```yaml
---
title: About Us
url: /about
generated: 2026-01-08T14:30:00Z
source: https://example.com/about
schema:                              # Optional, configurable
  "@type": Organization
  name: Example Corp
---

# About Us

[Clean markdown content extracted from the page...]
```

### Site-Wide

| File | Purpose |
|------|---------|
| `/llms.txt` | Brief index of all pages (per standard) |
| `/llms-full.txt` | Complete markdown of entire site |
| `/float/index.html` | Human dashboard |
| `/float/float.db` | SQLite database (Phase 2) |

### Images

Images reference their source URLs—no downloading, no embedding:

```markdown
![Product screenshot](https://example.com/images/product.png)
```

Works as long as images are publicly accessible on your domain.

---

## Agent Discovery

How do AI crawlers find your markdown?

### Meta Tags

```html
<link rel="alternate" type="text/markdown" href="/about.md" />
```

FloatPrompt adds this to each page, pointing to its `.md` counterpart.

### robots.txt

```
User-agent: *
Allow: /*.md
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /float/
```

Explicit permission for crawlers to access markdown files.

### HTTP Headers (Optional)

```
Link: </about.md>; rel="alternate"; type="text/markdown"
```

For sites that want header-level signaling.

---

## Deployment Modes

### Primary: Post-Build CLI

```bash
# After your build completes
npx floatprompt generate ./dist
```

### Framework Integrations

```javascript
// next.config.js
const withFloatPrompt = require('floatprompt/next');
module.exports = withFloatPrompt({ /* config */ });
```

```javascript
// astro.config.mjs
import floatprompt from 'floatprompt/astro';
export default { integrations: [floatprompt()] };
```

### Generic Post-Build

```json
{
  "scripts": {
    "build": "your-build && npx floatprompt generate ./dist"
  }
}
```

---

## Configuration

### Defaults (Zero Config)

FloatPrompt works with zero configuration for 80% of sites:

```bash
npx floatprompt generate ./dist
```

- Scans all `.html` files
- Generates `.md` alongside each
- Creates `llms.txt` and `llms-full.txt` at root
- Creates `/float/index.html` dashboard

### Optional Configuration

```javascript
// floatprompt.config.js
export default {
  // Input/output
  input: './dist',
  output: './dist',
  
  // Filtering
  include: ['**/*.html'],
  exclude: ['/admin/**', '/api/**'],
  
  // Frontmatter
  frontmatter: {
    schema: true,      // Include JSON-LD in frontmatter (default: true)
  },
  
  // Output options
  llmsTxt: true,       // Generate /llms.txt (default: true)
  llmsFullTxt: true,   // Generate /llms-full.txt (default: true)
  dashboard: true,     // Generate /float/index.html (default: true)
};
```

---

## Success Criteria

### Technical

| Metric | Target |
|--------|--------|
| Generation speed | < 100ms per page |
| Bundle size | < 50KB gzipped (core) |
| Framework support | Next.js, Astro, Hugo, Jekyll, Eleventy |
| Content accuracy | Markdown matches page content 95%+ |
| Zero dependencies on external services | ✓ |

### Adoption Milestones

| Milestone | Metric |
|-----------|--------|
| **Phase 1: Dogfooding** | We use FloatPrompt on our own websites |
| **Phase 2: Traction** | 10,000 npm downloads |
| **Phase 3: Recognition** | 10,000 GitHub stars |

### User Success

> "I ran one command after my build, and now my site has clean markdown for every page, an llms.txt index, and a dashboard showing everything. It took 30 seconds."

---

## Phased Delivery

### Phase 1: Core (MVP)

**Ships:**
- `.md` generation alongside HTML
- `llms.txt` and `llms-full.txt` at root
- `/float/index.html` dashboard
- NPM package + CLI
- Next.js and Astro integrations
- Bare-bones UI component (copy/download)

**Doesn't ship:**
- `float.db` database
- API endpoint
- AI polish
- Server middleware

### Phase 2: Database Layer

**Adds:**
- `/float/float.db` (SQLite)
- Structured queries
- Change detection via content hash
- Incremental regeneration

### Phase 3: Extended Features

**Adds:**
- API endpoint (`/float/api/`)
- MCP resource compatibility
- "Open in Claude/ChatGPT/Gemini" deep links
- Additional framework integrations

---

## The Layers

FloatPrompt evolves through three layers of capability:

| Layer | Model | What Happens |
|-------|-------|--------------|
| **Layer 1: Mechanical** | Self-hosted | You run `npx floatprompt generate`. Pure extraction (DOMPurify → Readability → Turndown), no AI, files written to your server. |
| **Layer 2: AI Enrichment** | Self-hosted + optional AI | Same as Layer 1, but with local AI polish via your own API key. Summaries, cleanup, improved descriptions. You control it. |
| **Layer 3: Hosted Build Service** | FloatPrompt servers → your site | FloatPrompt servers do the AI enrichment and push results back to your flat file system. Maximum convenience, still same-domain hosting. |

### Layer 1: Mechanical (v1)

What ships first. Fast, cheap, reliable. No AI dependencies.

```bash
npx floatprompt generate ./dist
```

### Layer 2: AI Enrichment (Future)

Optional AI polish for users who want richer output:

```bash
npx floatprompt generate ./dist --enrich --api-key $OPENAI_KEY
```

- Clean up conversion artifacts
- Generate better summaries
- Improve heading structure
- Add semantic descriptions

Still self-hosted. You bring your own API key.

### Layer 3: Hosted Build Service (Future)

FloatPrompt as build middleware—sits between GitHub and Vercel/Netlify/Cloudflare:

```
GitHub (push)
    │
    ▼
FloatPrompt Build Service
    │  ├── Pull build output
    │  ├── Mechanical extraction
    │  ├── AI enrichment
    │  └── Generate enriched .md + float.db
    │
    ▼
Vercel / Netlify / Cloudflare
    │
    ▼
Your domain (enriched files deployed)
```

**How it could work:**

1. **GitHub Action / Webhook** — On push, triggers FloatPrompt
2. **FloatPrompt processes** — Extraction + AI enrichment in the cloud
3. **Output options:**
   - Commit enriched files back to repo → Vercel deploys
   - Push directly to your CDN
   - Return as build artifact your CI includes

**Similar patterns:**
- Algolia DocSearch (indexes your docs on deploy)
- Lighthouse CI (runs after build)
- Sentry releases

**The value:**
> "Connect your repo. Every deploy gets AI-enriched markdown. Same-domain hosting, zero local AI setup."

---

## Explicit Non-Goals (v1)

| Non-Goal | Reason |
|----------|--------|
| Hosted service | Self-hosted provides maximum AEO benefit |
| Server middleware | Build-time covers 80%+ of use cases |
| AI polish | Mechanical extraction is sufficient for v1 |
| CMS plugins | Developers first, plugins follow |
| Multi-language i18n | Complexity, defer to Phase 2+ |
| Version history | Not needed for v1 |
| Real-time generation | Build-time is the model |

---

## The 10-Year Lens

Every decision in this spec was filtered through: **"Will this matter in 10 years?"**

- `.md` alongside HTML → Yes, this becomes as standard as `index.html`
- `llms.txt` at root → Yes, AI-readable indexes become expected
- Self-hosted first → Yes, same-domain content has lasting AEO value
- NPM/CLI → Yes, developers still run build commands
- No hosted service (v1) → Correct, build the foundation first

The goal isn't to build a product. It's to establish infrastructure.

---

## Open Questions (Deferred)

| Question | Status |
|----------|--------|
| How to handle SPAs with client-side routing? | Pre-render required. Guidance in docs. |
| Multi-language sites? | Defer to Phase 2. Each language gets its own `.md`. |
| Very large sites (10K+ pages)? | Incremental generation in Phase 2. |
| Monetization? | Open source first. Hosted service is future consideration. |

---

*Spec: MDS + Claude Opus 4.5*
*January 8, 2026*

