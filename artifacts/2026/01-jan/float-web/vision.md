---
title: FloatPrompt for Web — Vision
id: floatprompt-web-vision
format: floatprompt
status: current
created: 2026-01-08
updated: 2026-01-08

H:
  author: MDS
  intent: Define why FloatPrompt for Web exists—problem, opportunity, conviction
  background: |
    Creator of Float Label pattern (2013, now used by virtually every major tech company).
    Creator of Contrast, macOS app for color accessibility (functionality now built into most design tools).
    Creator of IIDS (International Interface Design System), 16-principle framework for systematic interface design.
    Founder of Shift Nudge, $6M+ design education business teaching systematic UI design.
    Pattern-spotter who identifies infrastructure before it becomes obvious.
    
    Already built FloatPrompt for repositories—a .float/ directory system with context documents 
    and SQLite database that gives AI persistent project understanding. This is the same 
    architecture applied to published websites.

ai:
  model: Claude Opus 4.5
  role: Research synthesis, vision articulation, collaborative development
  session_context: |
    Extended session covering: llms.txt standard (exists but manual), AGENTS.md (20K+ repos, 
    for code not websites), VOIX framework (declarative HTML elements for agents), Agentic AI 
    Foundation (formed Dec 2025, Linux Foundation), MCP protocol (becoming standard), 
    Readability.js + Turndown (proven extraction/conversion stack), token economics 
    (40-70% waste on HTML parsing), browser extensions (user-side not publisher-side).
    
    Key insight emerged: "The web becomes a context mesh."

related:
  - research.md: Full landscape synthesis, prior art, technical findings
  - architecture.md: Technical design, schema, deployment modes
  - spec.md: Boundaries, core concepts, what it is and isn't
  - floatprompt-repos: Existing .float/ system for codebases

brand:
  parent: FloatPrompt
  concept: "Markdown as prompt that floated to the surface"
  tagline: "The web becomes a context mesh"
  model: Open standard first (WordPress.org model), hosted product future consideration
---

# FloatPrompt for Web — Vision

> **The web becomes a context mesh.**

---

## The Problem

Every website is invisible to AI.

Not literally—crawlers can fetch HTML. But the process is wasteful and lossy:

- **Agents burn tokens parsing noise.** Navigation, ads, footers, JavaScript—40-70% of tokens wasted on structure, not content. Every page visit costs money in the token economy.

- **Context doesn't persist.** The same site gets re-processed across millions of agent sessions worldwide. No memory. No accumulation. Pure repetition.

- **Publishers have no path to AI visibility.** You can't control how AI understands your site. There's no "make my site AI-readable" button. You either roll a custom solution, manually maintain llms.txt files that go stale, or hope for the best.

- **Knowledge workers do manual archaeology.** When you need to give an AI context about external documentation, you scrape it yourself. Copy markdown into local files. Watch it go stale. Repeat for every source.

The web was built for browsers rendering HTML for human eyes. It was never built for AI consuming structured context.

---

### The Acute Moments

The problem crystallizes in specific situations:

**"Is my site even showing up in AI answers?"**
Publisher anxiety. You've invested in content but have no idea if LLMs can efficiently consume it, cite it, recommend it. AEO (Answer Engine Optimization) is a buzzword but there's no clear action to take.

**"I need to give my AI context about this external thing."**
You're building something. You need the Anthropic docs, the Stripe API reference, the React documentation. So you manually pull markdown, save files locally, and load them into your session. Tomorrow the docs update and your context is stale.

**"There has to be a better way."**
Every time you watch an agent struggle with a webpage—slow, expensive, error-prone—you feel the friction. The technology exists to do this cleanly. Nobody has packaged it.

---

## The Opportunity

AI is the substrate now.

Attention, investment, tooling, user behavior—everything flows toward AI-native workflows. Anything that doesn't connect to that substrate becomes invisible. If it's not about AI, people don't want to hear about it.

This creates the moment:

### The Tailwinds

**Infrastructure convergence.** The Agentic AI Foundation formed December 2025 (Linux Foundation, backed by Anthropic, OpenAI, Google, Microsoft). MCP is becoming the standard for tool integration. AGENTS.md hit 20K+ repos in months. The foundational layer is being built *right now*.

**Economic pressure.** Token costs matter. Sites that are expensive to process get deprioritized by budget-conscious agents. Clean context isn't just nice—it's economically advantaged.

**Universal need.** Every website owner, every knowledge worker, every agent builder, every AI company has this problem. The addressable market is "anyone with a website" plus "anyone using AI."

### The Unlock

**Ambient context.** Every website becomes a context endpoint that AI can consume instantly.

When this exists:

- **Context is a URL.** You're working in Claude and you type "load the Stripe docs." The AI fetches the FloatPrompt package directly. No scraping. No copy-pasting. No stale local files.

- **Publishing is serving.** Site owners run an npm build step. Markdown auto-generates alongside HTML. llms.txt maintains itself. A `/float/` dashboard appears. Done.

- **Agents get clean input.** Instead of parsing HTML, agents hit structured endpoints. 40-70% token savings. Faster, cheaper, better results.

- **Context accumulates.** A `float.db` in `/float/` tracks pages, relationships, freshness (Phase 2). Not just static files—a living context database.

- **Human UI coexists.** Copy and download buttons let humans grab markdown too. Same content, dual interface.

### The Beneficiaries

**Publishers:** Visibility in the AI layer. Content becomes citable, trainable, consumable. Competitive advantage as AI-readable becomes table stakes.

**Developers:** Drop-in solution. NPM package + CLI. One build step, done.

**Knowledge workers:** Instant context loading. "Give me the Next.js docs" just works. Always fresh.

**AI builders:** Clean input for RAG, fine-tuning, agent workflows. No scraping infrastructure needed.

**Agents:** Cheaper to operate. Better results. Structured data instead of parsed HTML.

**The ecosystem:** The web becomes queryable at a semantic level. Context flows between sites, agents, humans.

### The End State

**2-3 years:** Having a FloatPrompt layer becomes like having SSL or a sitemap. Table stakes.

Every serious website has a `/float/` endpoint and `.md` files alongside every page:
- Clean markdown of every page, auto-generated
- A `float.db` with structure, metadata, relationships, freshness signals
- An `llms.txt` index that maintains itself

Sites without it feel broken. The ones who invested early have compounding advantages in AI visibility, citations, and training data inclusion.

**10 years:** `.md` becomes as ubiquitous as `index.html`.

Just like every website has `robots.txt`, `sitemap.xml`, and `favicon.ico`, every website will have `.md` files for every page. It's not a feature—it's infrastructure. The web was built for browsers; now it's built for browsers AND AI.

The web becomes a **context mesh**. Every node is both human-readable and AI-readable. The same way HTML gave us a universal document format for browsers, FloatPrompt gives us a universal context format for AI.

**The 10-year lens:** Every architectural decision should be filtered through "will this matter in 10 years?" Build for where the web is going, not where it is.

---

## The Conviction

### Pattern Recognition

I see infrastructure before it's obvious.

**Float Label (2013).** A form interaction pattern—label floats above input when focused. Seemed trivial at the time. Now virtually every major tech company uses it. Obvious in hindsight.

**Contrast (macOS app).** Manual color accessibility checking for designers. Didn't exist before I made it. Now the functionality is built into almost every design tool. Obvious in hindsight.

**IIDS.** 16 principles for systematic interface design, continuing the Swiss design lineage into digital. A framework for how interfaces should work.

**Shift Nudge.** $6M+ teaching designers systematic thinking. Not software tutorials—judgment and decision-making frameworks.

The pattern: I spot things that seem inevitable once named, but require someone to name them and build them first.

### FloatPrompt Already Exists

This isn't a new invention. It's an extension.

**FloatPrompt for repositories** is built and working. A `.float/` directory in any codebase containing:
- Context documents (vision.md, spec.md, prd.md, design.md)
- A SQLite database (float.db) with folder structure, descriptions, decision history
- Recursive context scaffolding—every folder knows what it contains and why

AI opens any folder and instantly knows: Where am I? What exists here? Why was it built this way? What decisions were made?

No re-explaining. Context is just there.

**FloatPrompt for Web** is the same philosophy, different substrate:
- For repos: `.float/` lives in a codebase (hidden, like `.git`)
- For web: `/float/` lives on a domain (public, crawlable) + `.md` alongside every page

Same philosophy. Same database pattern. Different deployment: repos are hidden infrastructure, web is public-facing.

### Why This, Why Now

The building blocks exist. Readability.js (Mozilla, battle-tested). Turndown (industry standard). The llms.txt spec (good concept, needs automation). MCP (consumption protocol, needs content).

Nobody has assembled them into: "Add this script, your site becomes AI-readable."

The Agentic AI Foundation just formed. Standards are being set. The window for establishing the default is open.

### Why Me

I crave structure and organization—making the implicit explicit. Giving AI (and humans) a predictable, reliable way to understand what exists.

This isn't about clever. It's about **valuable**. It either helps people or it doesn't. That's the only test that matters.

---

## The Strategy

### Open Standard First (v1)

Like WordPress.org. A free, open-source implementation:
- NPM package for developers
- CLI for any build pipeline
- React/Next.js integrations for modern stacks
- Build-time generation for static sites

The ecosystem adopts it because it works, not because it's locked in.

**Self-hosted by design.** Your server, your files, your `/float/` endpoint. Maximum AEO benefit comes from same-domain hosting.

### Hosted Product (Future Consideration)

Like WordPress.com. A managed service for people who can't self-host:
- Automatic generation and hosting
- Dashboard for monitoring AI consumption
- Analytics on how agents interact with your content

**Or: Build middleware.** FloatPrompt as a service that sits between GitHub and Vercel/Netlify:
- On every push, FloatPrompt pulls your build output
- AI enrichment happens in our cloud
- Enriched files pushed back to your deploy
- Same-domain hosting (maximum AEO benefit), zero local AI setup

Similar to Algolia DocSearch, Lighthouse CI, or Sentry releases.

**Not v1 scope.** The open standard must prove itself first. Hosted service may follow if demand warrants.

### Goal

The most widely used method for making websites AI-readable.

Not the only method. The default method. The one people reach for because it's obvious and it works.

---

## The Tagline

**The web becomes a context mesh.**

Every site a node. Context flows freely. Human-readable and AI-readable, coexisting. Not a tool—infrastructure.

FloatPrompt: *Markdown as prompt, floated to the surface.*

---

*Vision: MDS + Claude Opus 4.5*  
*January 8, 2026*