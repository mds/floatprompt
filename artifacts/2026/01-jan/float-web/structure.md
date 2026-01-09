---
title: FloatPrompt for Web — Structure
id: floatprompt-web-structure
format: floatprompt
status: current
created: 2026-01-08

H:
  author: MDS
  intent: Visualize folder structures for maintainer and user

ai:
  model: Claude Opus 4.5

related:
  - prd.md: Build spec with features
  - architecture.md: Technical design
---

# FloatPrompt for Web — Structure

> **Two perspectives:** What the maintainer builds, what the user gets.

---

## Maintainer — Source Code Structure

```
floatprompt-web/
├── package.json                 # name: "floatprompt", bin: "floatprompt"
├── tsconfig.json
├── .eslintrc.js
├── README.md
│
├── src/
│   ├── index.ts                 # Main exports: FloatPrompt, FloatPromptUI
│   │
│   ├── core/
│   │   ├── pipeline.ts          # DOMPurify → Readability → Turndown chain
│   │   ├── sanitize.ts          # DOMPurify wrapper
│   │   ├── extract.ts           # Readability wrapper
│   │   ├── convert.ts           # Turndown wrapper + GFM plugin
│   │   └── frontmatter.ts       # YAML generation + JSON-LD extraction
│   │
│   ├── generate/
│   │   ├── walker.ts            # Directory traversal, find .html files
│   │   ├── llms-txt.ts          # Generate llms.txt index
│   │   ├── llms-full.ts         # Generate llms-full.txt concatenation
│   │   └── dashboard.ts         # Generate /float/index.html
│   │
│   ├── cli/
│   │   ├── index.ts             # CLI entry point
│   │   ├── commands/
│   │   │   └── generate.ts      # `floatprompt generate` command
│   │   └── config.ts            # Load floatprompt.config.js
│   │
│   ├── integrations/
│   │   ├── next.ts              # withFloatPrompt() for Next.js
│   │   └── astro.ts             # Integration for Astro
│   │
│   └── ui/
│       ├── component.ts         # FloatPromptUI class
│       └── styles.css           # Minimal UI styles
│
├── dist/                        # Compiled output (gitignored)
│   ├── index.js
│   ├── index.d.ts
│   ├── cli/
│   ├── next.js                  # floatprompt/next entry
│   └── astro.js                 # floatprompt/astro entry
│
├── test/
│   ├── fixtures/
│   │   ├── simple-site/         # Test HTML files
│   │   ├── next-export/
│   │   └── astro-build/
│   ├── pipeline.test.ts
│   ├── generate.test.ts
│   └── cli.test.ts
│
└── examples/
    ├── basic/                   # Minimal example
    ├── nextjs/                  # Next.js integration example
    └── astro/                   # Astro integration example
```

---

## User — Before and After

### Before (User's build output)

```
dist/
├── index.html
├── about.html
├── contact.html
├── docs/
│   ├── getting-started.html
│   ├── api-reference.html
│   └── examples.html
├── blog/
│   ├── index.html
│   ├── post-one.html
│   └── post-two.html
└── assets/
    ├── style.css
    └── logo.png
```

### After `npx floatprompt generate ./dist`

```
dist/
├── llms.txt                     # ← NEW: Site index for AI
├── llms-full.txt                # ← NEW: All content in one file
│
├── index.html
├── index.md                     # ← NEW
├── about.html
├── about.md                     # ← NEW
├── contact.html
├── contact.md                   # ← NEW
│
├── docs/
│   ├── getting-started.html
│   ├── getting-started.md       # ← NEW
│   ├── api-reference.html
│   ├── api-reference.md         # ← NEW
│   ├── examples.html
│   └── examples.md              # ← NEW
│
├── blog/
│   ├── index.html
│   ├── index.md                 # ← NEW
│   ├── post-one.html
│   ├── post-one.md              # ← NEW
│   ├── post-two.html
│   └── post-two.md              # ← NEW
│
├── float/                       # ← NEW: Dashboard directory
│   └── index.html               # Human-readable overview
│
└── assets/                      # Unchanged (not HTML)
    ├── style.css
    └── logo.png
```

---

## Generated Files Summary

| File | Location | Purpose |
|------|----------|---------|
| `{page}.md` | Alongside `{page}.html` | AI-readable version of each page |
| `llms.txt` | Root | Brief site index (per llms.txt spec) |
| `llms-full.txt` | Root | Complete site content in one file |
| `/float/index.html` | `/float/` | Human dashboard for browsing/copying |

---

## URL Mapping

| Human URL | AI URL |
|-----------|--------|
| `example.com/about` | `example.com/about.md` |
| `example.com/docs/api-reference` | `example.com/docs/api-reference.md` |
| `example.com/blog/post-one` | `example.com/blog/post-one.md` |
| — | `example.com/llms.txt` |
| — | `example.com/llms-full.txt` |
| — | `example.com/float/` |

**Pattern:** Just add `.md` to any page URL.

---

## Sample File Contents

### llms.txt

```markdown
# Example.com

> Documentation and blog for Example product.

## Documentation
- [Getting Started](/docs/getting-started.md): How to begin using Example
- [API Reference](/docs/api-reference.md): Complete API documentation
- [Examples](/docs/examples.md): Code examples and tutorials

## Blog
- [Post One](/blog/post-one.md): Introduction to new features
- [Post Two](/blog/post-two.md): Best practices guide

## Pages
- [Home](/index.md): Welcome to Example
- [About](/about.md): About our team
- [Contact](/contact.md): Get in touch

## Full Content
Complete markdown: [/llms-full.txt](/llms-full.txt)

---
Generated by FloatPrompt
```

---

### about.md

```markdown
---
title: About Us
url: /about
generated: 2026-01-08T14:30:00Z
source: https://example.com/about
schema:
  "@type": Organization
  name: Example Corp
  description: We build great products
---

# About Us

We are a team of passionate developers building tools that make the web better.

## Our Mission

To create software that developers love to use.

## The Team

- **Jane Doe** — CEO
- **John Smith** — CTO
- **Alice Johnson** — Lead Engineer
```

---

### /float/index.html

```html
<!DOCTYPE html>
<html>
<head>
  <title>FloatPrompt Dashboard — example.com</title>
  <style>/* minimal styles */</style>
</head>
<body>
  <h1>example.com</h1>
  <p>9 pages · Generated 2026-01-08</p>

  <h2>Pages</h2>
  <ul>
    <li><a href="/index.md">Home</a> <button>Copy</button></li>
    <li><a href="/about.md">About Us</a> <button>Copy</button></li>
    <li><a href="/contact.md">Contact</a> <button>Copy</button></li>
  </ul>

  <h2>Documentation</h2>
  <ul>
    <li><a href="/docs/getting-started.md">Getting Started</a></li>
    <li><a href="/docs/api-reference.md">API Reference</a></li>
    <li><a href="/docs/examples.md">Examples</a></li>
  </ul>

  <h2>Blog</h2>
  <ul>
    <li><a href="/blog/post-one.md">Post One</a></li>
    <li><a href="/blog/post-two.md">Post Two</a></li>
  </ul>

  <h2>Download All</h2>
  <p><a href="/llms-full.txt">llms-full.txt</a> (complete site content)</p>

  <footer>Generated by FloatPrompt</footer>
</body>
</html>
```

---

## Source Code Modules

| Module | Purpose | Key Exports |
|--------|---------|-------------|
| `src/core/pipeline.ts` | Main extraction chain | `processPipeline(html)` |
| `src/core/sanitize.ts` | DOMPurify wrapper | `sanitize(html)` |
| `src/core/extract.ts` | Readability wrapper | `extractContent(html)` |
| `src/core/convert.ts` | Turndown + GFM | `toMarkdown(html)` |
| `src/core/frontmatter.ts` | YAML + JSON-LD | `generateFrontmatter(meta)` |
| `src/generate/walker.ts` | Find HTML files | `walkDirectory(dir)` |
| `src/generate/llms-txt.ts` | Build index | `generateLlmsTxt(pages)` |
| `src/generate/llms-full.ts` | Concatenate | `generateLlmsFullTxt(pages)` |
| `src/generate/dashboard.ts` | HTML dashboard | `generateDashboard(pages)` |
| `src/cli/index.ts` | CLI entry | Binary entry point |
| `src/integrations/next.ts` | Next.js | `withFloatPrompt(config)` |
| `src/integrations/astro.ts` | Astro | `default integration` |
| `src/ui/component.ts` | Browser UI | `FloatPromptUI` |

---

*Structure: MDS + Claude Opus 4.5*
*January 8, 2026*
