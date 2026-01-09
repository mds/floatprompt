# FloatPrompt

Make websites AI-readable. Generate clean markdown alongside HTML.

> **Note:** This project is in active development. APIs may change.

---

## The Problem

40-70% of tokens are wasted when AI agents parse websites — navigation, ads, footers, scripts. Publishers have no "make my site AI-readable" button.

## The Solution

One command after your build:

```bash
npx floatprompt generate ./dist
```

Every page gets a `.md` sibling. Your site gets an `llms.txt` index. A `/float/` dashboard shows everything.

---

## What Gets Generated

```
dist/
├── llms.txt           # Site index for AI
├── llms-full.txt      # Complete content in one file
├── index.html
├── index.md           # ← NEW
├── about.html
├── about.md           # ← NEW
├── docs/
│   ├── api.html
│   └── api.md         # ← NEW
└── float/
    └── index.html     # Human dashboard
```

**URL pattern:** Just add `.md` to any page URL.
- `/about` → HTML for humans
- `/about.md` → Markdown for AI

---

## Installation

```bash
npm install --save-dev floatprompt
```

### Usage

**CLI (any static site):**
```bash
npx floatprompt generate ./dist
```

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

**Generic post-build:**
```json
{
  "scripts": {
    "build": "your-build && npx floatprompt generate ./dist"
  }
}
```

---

## Configuration

Zero config works for most sites. Optional `floatprompt.config.js`:

```javascript
export default {
  input: './dist',
  output: './dist',
  exclude: ['/admin/**'],
  baseUrl: 'https://example.com',
  llmsTxt: true,
  dashboard: true,
};
```

---

## How It Works

1. **DOMPurify** — Sanitizes HTML (security)
2. **Readability.js** — Extracts main content (Mozilla's library)
3. **Turndown** — Converts to markdown

No AI calls. No API keys. Pure mechanical extraction.

---

## Requirements

- Node.js 18+
- A website with a build step that outputs HTML

Works with: Next.js, Gatsby, Astro, Hugo, Jekyll, Eleventy, or any SSG.

---

## Links

- [llms.txt spec](https://llmstxt.org/)
- [Readability.js](https://github.com/mozilla/readability)

---

© 2026 [@MDS](https://mds.is) | MIT License
