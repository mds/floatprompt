---
title: FloatPrompt for Web — Architecture
id: floatprompt-web-architecture
format: floatprompt
status: current
created: 2026-01-08
updated: 2026-01-08

H:
  author: MDS
  intent: Technical architecture for publisher-side context layer

ai:
  model: Claude Opus 4.5
  session_context: |
    Refined through extended discussion. Key decisions:
    - .md files alongside HTML (like Anthropic's docs), not in /float/pages/
    - llms.txt standard compliance at root
    - /float/ for dashboard and extras only
    - Self-hosted via NPM/CLI (no hosted service)
    - Vision: .md becomes as ubiquitous as index.html

related:
  - research.md: Landscape synthesis, prior art, technical findings
  - vision.md: Problem, opportunity, conviction
  - spec.md: Boundaries, core concepts, what it is and isn't
---

# FloatPrompt for Web — Architecture

> **The web becomes a context mesh.**

Every webpage gets a `.md` counterpart. As standard as `index.html`.

---

## The Vision (10 Years Out)

Just like every website has:
- `index.html`
- `robots.txt`
- `sitemap.xml`
- `favicon.ico`

Every website will have:
- `.md` file for every page
- `llms.txt` index

**FloatPrompt makes this trivial to adopt today.**

---

## The Pattern (Anthropic's Approach)

Anthropic's Claude Code docs already do this:

```
/docs/en/discover-plugins      ← HTML page
/docs/en/discover-plugins.md   ← Markdown version (add .md)
```

**Simple. Intuitive. No separate folder hierarchy.**

FloatPrompt generates this pattern for any website.

---

## Output Structure

```bash
npx floatprompt generate ./dist
```

**Generates:**

```
example.com/
├── llms.txt                   ← Brief index (standard, at root)
├── llms-full.txt              ← Complete content (standard, at root)
├── index.html                 ← Your homepage
├── index.md                   ← Markdown of homepage
├── about.html                 ← Your about page
├── about.md                   ← Markdown of about page
├── docs/
│   ├── getting-started.html
│   ├── getting-started.md     ← Markdown alongside HTML
│   ├── api.html
│   └── api.md
└── float/                     ← Dashboard + extras (optional)
    ├── index.html             ← Human-readable dashboard
    └── float.db               ← SQLite database (Phase 2)
```

**URL mapping:**
- `example.com/about` → HTML for humans
- `example.com/about.md` → Markdown for AI (just add `.md`)

---

## The Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                         HTML Page                                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    0. Sanitization                               │
│                      (DOMPurify)                                 │
│                                                                  │
│   - Remove malicious scripts, XSS vectors                       │
│   - Clean potentially dangerous HTML                            │
│   - Output: Safe HTML                                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    1. Content Extraction                         │
│                      (Readability.js)                            │
│                                                                  │
│   - Remove navigation, ads, sidebars, footers                   │
│   - Extract article title, byline, main content                 │
│   - Output: Clean HTML                                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   2. Markdown Conversion                         │
│                        (Turndown)                                │
│                                                                  │
│   - Convert clean HTML to Markdown                              │
│   - Handle tables, code blocks, lists                           │
│   - Preserve semantic structure                                 │
│   - Images: Reference source URLs (no downloading)              │
│   - Output: Raw Markdown                                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    3. Cleanup & Frontmatter                      │
│                       (No AI required)                           │
│                                                                  │
│   - Normalize whitespace                                        │
│   - Fix heading hierarchy                                       │
│   - Extract JSON-LD/Schema.org → frontmatter (configurable)     │
│   - Add frontmatter (title, source URL, generated date)         │
│   - Output: Clean Markdown with metadata                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      4. Write Files                              │
│                                                                  │
│   - page.md alongside page.html                                 │
│   - llms.txt at root                                            │
│   - llms-full.txt at root                                       │
│   - /float/index.html (dashboard)                               │
└─────────────────────────────────────────────────────────────────┘
```

---

## llms.txt (Standard Compliance)

Per the llms.txt spec, generated at root:

```markdown
# Example.com

> Brief site description from meta tags.

## Documentation
- [Getting Started](/docs/getting-started.md): How to begin
- [API Reference](/docs/api.md): Complete API documentation

## Pages
- [About](/about.md): About this site
- [Contact](/contact.md): Get in touch

## FloatPrompt
Structured AI context: [/float/](/float/)

## Full Content
Complete markdown: [/llms-full.txt](/llms-full.txt)

---
Generated by FloatPrompt
```

**llms-full.txt** — Concatenation of all `.md` files for agents that want everything in one request.

---

## /float/ Directory

The `/float/` directory is for extras, not page content:

```
/float/
├── index.html        ← Human dashboard
└── float.db          ← SQLite database (Phase 2)
```

### Dashboard (`/float/index.html`)

A human-readable page that shows:
- All available `.md` files
- Site structure
- Copy/download for entire site
- Last generated timestamp

### Database (`/float/float.db`) — Phase 2

SQLite database for structured queries:

**`pages` table:**

| Field | Type | Description |
|-------|------|-------------|
| `url` | TEXT PK | Page URL (`/docs/api`) |
| `title` | TEXT | Page title |
| `description` | TEXT | One-line summary |
| `content_md` | TEXT | Full markdown |
| `content_hash` | TEXT | SHA-256 (change detection) |
| `last_generated` | INTEGER | Timestamp |

**`site` table:**

| Field | Type | Description |
|-------|------|-------------|
| `domain` | TEXT | Site domain |
| `title` | TEXT | Site title |
| `total_pages` | INTEGER | Page count |
| `last_generated` | INTEGER | Last full generation |

---

## Human UI Component

Bare-bones UI included with the package:

### Reference: Anthropic's Pattern

```
┌─────────────────────────────────────────┐
│ Copy page                             ▼ │
├─────────────────────────────────────────┤
│ 📋 Copy page                            │
│    Copy page as Markdown for LLMs       │
│                                         │
│ [M↓] View as Markdown                 ↗ │
│    View this page as plain text         │
│                                         │
│ ✳️ Open in Claude                      ↗ │
│    Ask questions about this page        │
└─────────────────────────────────────────┘
```

### Default (v1)

```
┌──────────────┐ ┌──────────────┐
│ Copy Page  ▼ │ │   Download   │
└──────────────┘ └──────────────┘
```

**Copy Page dropdown:**
- Copy markdown to clipboard
- View as Markdown (opens `.md` file)

**Download:** Downloads `{page-slug}.md`

### "Open in..." Deep Links (Future)

```javascript
const deepLinks = {
  claude: (mdUrl) => 
    `https://claude.ai/new?q=${encodeURIComponent(`Read from ${mdUrl} so I can ask questions about it.`)}`,
  
  chatgpt: (mdUrl) => 
    `https://chatgpt.com/?q=${encodeURIComponent(`Read from ${mdUrl} and help me understand it.`)}`,
  
  gemini: (mdUrl) => 
    `https://gemini.google.com/app?q=${encodeURIComponent(`Read ${mdUrl} so I can ask questions.`)}`
};
```

### Usage

```javascript
import { FloatPromptUI } from 'floatprompt';

// Add to your page
FloatPromptUI.init({
  position: 'bottom-right',
  theme: 'auto'
});
```

Or attach to custom buttons:

```javascript
FloatPromptUI.init({ render: false });

document.getElementById('my-btn').onclick = () => {
  FloatPromptUI.copyToClipboard();
};
```

---

## Deployment

### NPM Package (Primary)

```bash
npm install floatprompt
```

**CLI usage:**

```bash
# Generate for entire site
npx floatprompt generate ./dist

# Generate for specific directory
npx floatprompt generate ./dist/docs --output ./dist/docs
```

**Programmatic usage:**

```javascript
import { FloatPrompt } from 'floatprompt';

// Generate for entire site
await FloatPrompt.generate({
  input: './dist',
  output: './dist'  // .md files alongside .html
});

// Extract single page
const markdown = await FloatPrompt.extract(html, {
  url: '/docs/api',
  title: 'API Reference'
});
```

### Build Integration

**Next.js:**

```javascript
// next.config.js
const withFloatPrompt = require('floatprompt/next');

module.exports = withFloatPrompt({
  // your config
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

**Post-build script (any SSG):**

```json
{
  "scripts": {
    "build": "your-build-command && npx floatprompt generate ./dist"
  }
}
```

---

## Technical Stack

### Core Dependencies

| Library | Purpose | Size |
|---------|---------|------|
| `dompurify` | HTML sanitization (security) | ~15KB |
| `@mozilla/readability` | Content extraction | ~15KB |
| `turndown` | HTML → Markdown | ~10KB |
| `turndown-plugin-gfm` | GFM support (tables) | ~2KB |
| `linkedom` | DOM parsing (Node.js) | ~200KB |
| `better-sqlite3` | SQLite (Phase 2) | Native |

**Security note:** DOMPurify sanitizes HTML before Readability processes it, preventing XSS attacks and malicious content from appearing in generated markdown.

### Package Size

- Core (no SQLite): ~30KB gzipped
- With UI component: ~35KB gzipped
- CLI: Separate, includes all dependencies

---

## Navigation & Structure

### Source of Truth

Navigation comes from existing sources (no duplication):

1. **`sitemap.xml`** — If exists, parse it
2. **Internal links** — Crawl and build hierarchy
3. **File structure** — `/docs/api.html` → `/docs/api.md`

### In Each Markdown File

**With JSON-LD schema (default):**
```yaml
---
title: Widget Pro
url: /products/widget
generated: 2026-01-08T14:30:00Z
source: https://example.com/products/widget
schema:
  "@type": Product
  name: Widget Pro
  price: "$99"
  availability: InStock
---

# Widget Pro

[Page content...]
```

**Minimal frontmatter (schema: false):**
```yaml
---
title: API Reference
url: /docs/api
generated: 2026-01-08T14:30:00Z
source: https://example.com/docs/api
---

# API Reference

[Page content...]
```

**Configuration:**
```javascript
await FloatPrompt.generate({
  input: './dist',
  frontmatter: {
    schema: true   // Include JSON-LD (default: true)
  }
});
```

**No navigation in individual files.** The `llms.txt` and `/float/index.html` serve as the site map.

---

## Image Handling

Images reference their source URLs:

```markdown
![Product screenshot](https://example.com/images/product.png)
```

- No downloading
- No embedding
- Just reference the original
- Works as long as images are publicly accessible

---

## Phased Rollout

### Phase 1: Core (MVP)

**What ships:**
- `.md` generation alongside HTML
- `llms.txt` and `llms-full.txt` at root
- `/float/index.html` dashboard
- NPM package + CLI
- Bare-bones UI component

**What doesn't ship:**
- `float.db` database
- API endpoint
- AI polish

### Phase 2: Database Layer

**Adds:**
- `/float/float.db` (SQLite)
- Structured queries
- Change detection via content hash
- Incremental regeneration

### Phase 3: Extended Features

**Adds:**
- API endpoint (`/float/api/`)
- MCP resource compatibility (expose as MCP resource)
- "Open in..." deep links for AI providers

---

## The Layers

FloatPrompt evolves through three layers of capability:

| Layer | Model | What Happens |
|-------|-------|--------------|
| **Layer 1: Mechanical** | Self-hosted | Pure extraction (DOMPurify → Readability → Turndown), no AI, files on your server. |
| **Layer 2: AI Enrichment** | Self-hosted + optional AI | Same extraction, plus AI polish via your own API key. |
| **Layer 3: Hosted Build Service** | FloatPrompt servers → your site | We do the AI enrichment, push results to your flat file system. |

### Layer 1: Mechanical (v1)

What ships first. Fast, cheap, reliable.

```bash
npx floatprompt generate ./dist
```

No AI calls. No API keys. Pure mechanical extraction.

### Layer 2: AI Enrichment (Future)

Optional AI polish for richer output:

```bash
npx floatprompt generate ./dist --enrich --api-key $OPENAI_KEY
```

- Clean up conversion artifacts
- Generate better summaries
- Improve heading structure
- Add semantic descriptions

Still self-hosted. You bring your own API key.

### Layer 3: Hosted Build Service (Future)

FloatPrompt as build middleware—sits between GitHub and your hosting provider:

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

**How it works:**

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

## Agent Signaling

How crawlers discover the markdown:

### Meta Tags

```html
<head>
  <link rel="alternate" type="text/markdown" href="/about.md" />
</head>
```

### robots.txt

```
User-agent: *
Allow: /*.md
Allow: /llms.txt
Allow: /llms-full.txt
Allow: /float/
```

### HTTP Headers (Optional)

```
Link: </about.md>; rel="alternate"; type="text/markdown"
```

---

## What FloatPrompt Does NOT Do

- **Host content** — Self-hosted only. Your server, your files.
- **Replace sitemap.xml** — Complements it with llms.txt
- **Download images** — References source URLs
- **Require AI** — Pure mechanical extraction (AI polish is future/optional)
- **Create complex folder hierarchies** — `.md` alongside `.html`, simple

---

## Future Standards to Watch

### VOIX Framework

Research proposal from TU Darmstadt (Nov 2025) for declaring *actions* to AI agents via HTML elements:
- `<tool>` — Declares available actions
- `<context>` — Provides application state

**Relationship to FloatPrompt:**
- FloatPrompt = "Here's what this page *says*" (content)
- VOIX = "Here's what you can *do* on this page" (actions)

**Status:** Research proposal, not adopted. Worth monitoring. If it becomes a standard, FloatPrompt could complement it — content + actions together.

---

## Success Metrics

### Technical

- [ ] Generation < 100ms per page
- [ ] Bundle < 50KB gzipped (core)
- [ ] Works with Next.js, Astro, Hugo, Jekyll, Eleventy
- [ ] Markdown matches page content 95%+

### Adoption

- [ ] One command to generate: `npx floatprompt generate ./dist`
- [ ] Zero config default works for 80% of sites
- [ ] Clear migration path: Phase 1 → 2 → 3

---

*Architecture: MDS + Claude Opus 4.5*
*January 8, 2026*
