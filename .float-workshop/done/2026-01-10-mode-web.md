# Web Mode

**Role:** You're working on the FloatPrompt npm package — makes websites AI-readable.

**Activate when:** Testing, debugging, or extending the npm package.

**Exit when:** Done with web work. No need to switch modes — just stop using this context.

---

## Load

| Document | Path | What It Provides |
|----------|------|------------------|
| PRD | `artifacts/2026/01-jan/float-web/prd.md` | Implementation spec — features, CLI, integrations (historical) |
| Vision | `artifacts/2026/01-jan/float-web/vision.md` | Why this exists — problem, opportunity (historical) |
| Architecture | `artifacts/2026/01-jan/float-web/architecture.md` | Technical design — pipeline, schema (historical) |
| Research | `artifacts/2026/01-jan/float-web/research.md` | Prior art, library choices (historical) |

**Note:** These docs were written before the unified naming decision. They reference "FloatPrompt for Web" — it's just "FloatPrompt" now. The npm package is the web touchpoint.

---

## Hold

**What it is:**
- NPM package: `floatprompt`
- Makes any website AI-readable
- Generates `.md` alongside `.html`, plus `llms.txt`, `/float/` dashboard

**The pipeline:**
```
HTML → DOMPurify (sanitize) → Readability.js (extract) → Turndown (convert) → Markdown
```

**Key commands:**
```bash
# Install (auto-adds postbuild hook to package.json)
npm install floatprompt

# Manual run (auto-detects output dir)
floatprompt

# Explicit path
floatprompt ./out

# Programmatic
import { FloatPrompt } from 'floatprompt';
await FloatPrompt.generate({ input: './out' });
```

**Status:** Published v1.0.1. Install-and-forget — postinstall adds `postbuild: floatprompt` automatically.

---

## Relationship to Plugin

| Touchpoint | Distribution | Purpose |
|------------|--------------|---------|
| **npm package** (this) | `npm install floatprompt` | Make websites AI-readable |
| **Claude plugin** | `/plugin install floatprompt@mds` | Persistent context for codebases |

Same brand, same philosophy, different substrates. Distribution channel disambiguates.

---

## Current Location

Source code: `web/`
```
web/
├── src/
│   ├── cli/           # CLI + postinstall auto-setup
│   ├── core/          # pipeline, sanitize, extract, convert
│   ├── generate/      # walker, llms-txt, llms-full, dashboard
│   ├── widget/        # React component + vanilla JS button
│   └── integrations/  # next.js, astro (future)
├── dist/              # Compiled output (published to npm)
└── test/              # Test fixtures
```

---

## What's Next

1. Test on real Next.js site (mds.is or similar)
2. Verify auto-setup works (postinstall adds postbuild hook)
3. Verify output (.md files, llms.txt, llms-full.txt, /float/)
4. Optional: Add widget to site (`import { FloatButton } from 'floatprompt/react'`)

---

*Web Mode — lightweight reference for FloatPrompt npm package work*
