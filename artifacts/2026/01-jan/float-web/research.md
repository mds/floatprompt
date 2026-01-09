---
title: FloatPrompt for Web — Research Synthesis
id: floatprompt-web-research
format: floatprompt
status: current
created: 2026-01-08
updated: 2026-01-08

H:
  author: MDS
  intent: Capture all research findings so future sessions don't start cold

ai:
  model: Claude Opus 4.5
  session: Extended research session covering AEO landscape, existing standards, technical building blocks, future protocols
  
related:
  - vision.md
  - architecture.md
  - spec.md
---

# Research Synthesis

> **Purpose:** Everything we found about the landscape. Prior art, gaps, technical building blocks, future direction. A fresh AI session reading this can skip the research phase and move directly to building.

---

## Executive Summary

**The gap:** No turnkey solution exists for publishers to make their websites AI-readable. The building blocks exist (Readability.js, Turndown, llms.txt spec) but nothing combines them into a "just add this script" solution that auto-generates clean markdown, serves it to agents, and provides a human UI.

**The moment:** The Agentic AI Foundation formed December 2025 (Linux Foundation, backed by Anthropic, OpenAI, Google, Microsoft). MCP is becoming standard. AGENTS.md hit 20K+ repos in months. The infrastructure layer for AI-web interaction is being built *right now*.

**The opportunity:** Publisher-side context layer. What llms.txt proposed but automated. What browser extensions do but inverted (publisher pushes, not user pulls). The web becomes a context mesh.

---

## Prior Art: What Exists

### llms.txt

**What it is:** A proposed standard by Jeremy Howard (Answer.AI, fast.ai) for a markdown file at `/llms.txt` that provides LLM-friendly content. A curated index pointing to detailed markdown files.

**Specification:** https://llmstxt.org/

**Format:** Markdown with specific structure—title, description, links to detailed docs.

**Adoption:**
- Mintlify rolled out llms.txt across thousands of docs sites (Nov 2025), including Anthropic's documentation
- Yoast SEO and AIOSEO have built-in generators for WordPress
- Cloudflare, Vercel, Astro, Cursor have implemented it

**Critical limitation:** Manual creation and maintenance. Nothing auto-generates it from existing content.

**Crawler adoption:** Semrush testing (Aug-Oct 2025) showed *zero visits* from GPTBot, ClaudeBot, PerplexityBot, or Google-Extended to llms.txt files. Traditional crawlers (Googlebot, Bingbot) visited but didn't treat it with special importance.

**Verdict:** Good concept, aspirational adoption, but not yet a functioning standard that AI crawlers actively use.

---

### llms-full.txt

**What it is:** Extension of llms.txt—a single markdown file containing the full text content of an entire site. Machine-readable, no HTML cruft.

**Purpose:** One URL that gives an agent complete site context.

**Limitation:** Must be manually created and maintained. Large sites = massive files.

---

### AGENTS.md

**What it is:** OpenAI-originated standard for providing AI coding agents with project-specific instructions. A README for agents.

**Specification:** https://agents.md/

**Adoption:** 20,000+ GitHub repositories as of late 2025. Supported by Cursor, Codex, Jules (Google), Factory, Aider.

**Structure:** Standard markdown. Sections for build commands, testing instructions, coding conventions, PR guidelines. Nested files in subdirectories for package-specific instructions.

**Key insight:** "The closest AGENTS.md to the edited file wins"—hierarchical, context-aware.

**Stewardship:** Now under Agentic AI Foundation (Linux Foundation).

**Limitation:** Designed for code repositories, not published websites. Different problem space.

**Relevance:** Proves appetite for "instructions for AI" as a standard pattern. The web equivalent doesn't exist yet.

---

### VOIX Framework

**What it is:** Research proposal from TU Darmstadt (Nov 2025) for making websites explicitly declare capabilities to AI agents via new HTML elements.

**Paper:** "Building the Web for Agents: A Declarative Framework for Agent-Web Interaction"

**Core concept:** Two new HTML elements:
- `<tool>` — Declares available actions (name, parameters, description)
- `<context>` — Provides current application state

**Performance data:** VOIX completes tasks in 0.91-14.38 seconds vs. 4.25 seconds to 21+ minutes for vision-based agents. One benchmark: rotating a triangle took 1 second (VOIX) vs. 90 seconds (Perplexity Comet).

**Security benefit:** Agents only see explicitly declared tools/context. No prompt injection through visual UI manipulation.

**Architecture:** Browser extension mediates between LLM and page. Works with cloud or local models (tested with Qwen3-235B-A22B).

**Status:** Research proposal, not adopted standard. But signals where the industry is heading.

**Relevance:** Complementary to markdown approach. VOIX = actions/state. FloatPrompt = content/context.

---

### Model Context Protocol (MCP)

**What it is:** Anthropic-originated open protocol for connecting AI models to external data sources and tools. The "USB-C for AI."

**Adoption:** Broad adoption throughout 2025. Thousands of MCP servers available.

**What it does:**
- **Resources:** Read-only data endpoints (fetch documents, database records)
- **Tools:** Actions the model can invoke (functions with side effects)
- **Prompts:** Reusable conversation templates

**Stewardship:** Donated to Agentic AI Foundation (Linux Foundation) December 2025.

**Relevance:** MCP is how agents *consume* context. FloatPrompt is how publishers *serve* context. Complementary layers.

**Existing MCP servers for web content:**
- `mcp-server-fetch` — Fetches web pages, converts HTML to markdown
- `website-to-markdown-mcp` — Configured website fetching
- `mcpdoc` (LangChain) — Exposes llms.txt to IDEs

**Gap:** These are consumer-side. Publisher still has to create the clean content.

---

### Agent-to-Agent Protocol (A2A)

**What it is:** Google-originated protocol for inter-agent communication. Complements MCP (which is agent-to-tool).

**Status:** Donated to Agentic AI Foundation. Designed to work with MCP.

**Relevance:** Part of the emerging standard stack. Not directly relevant to FloatPrompt but context for where the ecosystem is heading.

---

### Readability.js

**What it is:** Mozilla's open-source library for extracting main content from web pages. Powers Firefox Reader Mode.

**Repository:** https://github.com/mozilla/readability

**What it does:**
- Removes navigation, ads, sidebars, footers
- Extracts article title, byline, content, excerpt
- Returns clean HTML of main content

**Battle-tested:** Used by Firefox for years. Reliable across diverse site structures.

**Usage:** Requires DOM (browser or jsdom/linkedom in Node).

**Output:** Clean HTML (not markdown). Needs Turndown for markdown conversion.

**Relevance:** The extraction layer. Proven, reliable, open source.

---

### Turndown

**What it is:** JavaScript library for converting HTML to Markdown.

**Repository:** https://github.com/mixmark-io/turndown

**What it does:**
- Takes HTML string or DOM node
- Returns markdown string
- Configurable rules for different elements
- Plugin system for extensions (GFM tables, strikethrough, etc.)

**Usage:** Browser and Node.js. ~10KB gzipped.

**Relevance:** The conversion layer. Industry standard. Used by MarkDownload extension and most HTML-to-markdown tools.

---

### Browser Extensions (User-Side)

**MarkDownload:** Firefox/Chrome extension that clips websites to markdown files. Uses Readability.js + Turndown. User-initiated.

**Webpage to Markdown:** Chrome extension for one-click conversion.

**Pattern:** These are *pull* tools—user extracts content. Not *push* tools—publisher serves content.

**Gap:** No equivalent for publishers to proactively serve markdown.

---

### Structured Data (JSON-LD / Schema.org)

**What it is:** Machine-readable metadata embedded in HTML. Used by search engines for rich results.

**Relevance to AI:**
- LLMs can parse JSON-LD during inference
- Web Data Commons extracts structured data from Common Crawl for LLM training
- Schema markup helps models understand entities and relationships

**Limitation:** Metadata only, not full content. Complements but doesn't replace content extraction.

**Key finding:** "AI crawlers like GPTBot, ClaudeBot, and PerplexityBot don't execute JavaScript, unlike Googlebot." Server-side rendering required for AI visibility.

---

## The Gap Analysis

| Need | Existing Solution | Limitation |
|------|-------------------|------------|
| Clean markdown from HTML | Readability + Turndown | Requires integration, no turnkey |
| Site index for AI | llms.txt | Manual creation, no auto-generation |
| Instructions for AI | AGENTS.md | For repos, not websites |
| Serve context to agents | MCP servers | Consumer-side, publisher must create content |
| Human copy/download | Browser extensions | User-side, not publisher-side |
| Auto-updating context | Nothing | Manual maintenance everywhere |
| Context database | Nothing for web | FloatPrompt repos has float.db |

**The missing piece:** A publisher-side tool that:
1. Auto-generates `.md` files alongside HTML (Readability + Turndown)
2. Creates and maintains `llms.txt` automatically at root
3. Provides human UI (copy/download buttons)
4. Creates `/float/` dashboard for site overview
5. Accumulates context in a database (`/float/float.db`) — Phase 2
6. Regenerates as site content changes

**Note:** See `architecture.md` for resolved decisions on structure, deployment, and phasing.

---

## Token Economics

### The Cost of HTML Parsing

**Finding:** "Poor data serialization consumes 40% to 70% of available tokens through unnecessary formatting overhead." (The New Stack, Dec 2025)

**Implication:** Agents parsing raw HTML waste nearly half their context window on cruft.

### Compression Potential

**LLMLingua (Microsoft Research):** Achieves up to 20x prompt compression with minimal performance loss.

**LLMLingua-2:** 3-6x faster, better on out-of-domain data.

**Implication:** Clean, structured content isn't just easier to read—it's economically valuable. Sites serving pre-compressed context cost less to process.

### The Economic Argument

Every agent interaction with a website has a token cost. If 50% of tokens are wasted on HTML structure, that's:
- Direct cost to whoever's paying for inference
- Reduced effective context window
- Slower processing
- Worse results (signal buried in noise)

Clean markdown = more value per token = economic advantage for publishers who serve it.

---

## The Agentic Web Future

### Agentic AI Foundation

**Announced:** December 2025

**Host:** Linux Foundation

**Founders:** OpenAI, Anthropic, Block

**Major supporters:** Microsoft, Google, AWS, Bloomberg, Cloudflare

**Seed projects:**
- **MCP (Anthropic):** Tool and data integration protocol
- **AGENTS.md (OpenAI):** Instructions for coding agents
- **Goose (Block):** Open-source agentic workflow framework

**Mission:** Prevent fragmentation. Ensure AI agents are interoperable, secure, vendor-neutral.

**Significance:** The HTTP/Linux moment for AI agents. Open standards being established *now*.

---

### Industry Trajectory

**OpenAI Operator (Jan 2025):** Browser-based agent for web tasks.

**Google Project Jarvis:** Chrome-integrated agent for automation.

**ChatGPT Agent (Jul 2025):** Virtual computer for web browsing, code execution.

**Perplexity Comet:** AI-native browser.

**Pattern:** Every major player is building agents that interact with websites. But they're all doing it by *parsing human UIs*—expensive, brittle, slow.

---

### The "Agentic Web Interface" Concept

**From research literature:** "The shift from human-designed UIs to agent-optimized interfaces is central to Agentic Web Research. Modern approaches move away from screen scraping or brute-force DOM parsing toward declarative, standardized web affordance protocols."

**Key paper:** "Agentic Web: Weaving the Next Web with AI Agents" (UC Berkeley, UCL, Shanghai Jiao Tong, et al.)

**Core argument:** The web needs a parallel layer optimized for agents. Human UI + Agent Interface, coexisting.

---

### Prediction: 2-3 Years Out

1. **Agent-readable becomes table stakes.** Like mobile-responsive in 2015. Sites without it feel broken.

2. **llms.txt or equivalent becomes standard.** Either the current spec gets adopted or something better emerges. Auto-generation becomes expected.

3. **Context endpoints replace scraping.** Instead of agents parsing HTML, they hit structured endpoints.

4. **Token economy shapes behavior.** Sites that are cheap to process get prioritized by agents with budget constraints.

5. **AEO matures into infrastructure.** Answer Engine Optimization stops being a marketing tactic and becomes a technical requirement.

6. **The context mesh emerges.** Every site is a node. Context flows between sites, agents, humans. The web becomes queryable at a semantic level.

---

## Technical Building Blocks

### Recommended Stack

> **Note:** Final stack decisions in `architecture.md`.

**HTML sanitization:** DOMPurify
- Security layer before processing
- Removes XSS vectors, malicious scripts

**Content extraction:** Readability.js (@mozilla/readability)
- Battle-tested, maintained, handles edge cases
- Returns clean HTML with title, byline, content

**Markdown conversion:** Turndown (mixmark-io/turndown)
- Industry standard, configurable
- Plugin for GFM (tables, strikethrough)

**DOM parsing (Node.js):** linkedom (preferred)
- Lighter (~200KB vs ~2MB for jsdom)
- Fast, sufficient for content extraction

**Database:** SQLite (`/float/float.db`) — Phase 2
- Single file, portable
- Same pattern as FloatPrompt repos

**Optional AI polish:** Future consideration
- Clean up conversion artifacts
- Improve structure and headings

### Deployment Modes

> **Note:** See `architecture.md` for final deployment decisions. We simplified to NPM/CLI with build integrations.

**v1 Scope:**

1. **NPM package + CLI (primary)**
   - `npm install floatprompt`
   - `npx floatprompt generate ./dist`
   - Build-time generation

2. **Framework integrations**
   - Next.js, Astro plugins
   - Post-build script for any SSG

**Future consideration:**

3. **Server middleware** — For dynamic sites (deferred)

4. **Hosted service** — For platforms that can't self-host (deferred)

---

## Open Questions (Resolved)

> **Note:** These questions were resolved during architecture development. See `architecture.md` for decisions.

1. **Where does /float/ live?** 
   - ✅ **Resolved:** `/float/` at root (no dot, public/crawlable). `.md` files alongside HTML.

2. **What signals to agents?**
   - ✅ **Resolved:** Meta tags, robots.txt entries, HTTP headers. All of the above.

3. **How to handle SPAs?**
   - ⏳ **Deferred:** Pre-render required. Build-time generation is primary path.

4. **Authentication/rate limiting?**
   - ✅ **Resolved:** Public by default. API rate limiting in Phase 3.

5. **Versioning/freshness?**
   - ✅ **Resolved:** Content hash in frontmatter and float.db. Timestamps included.

6. **What's in float.db for web?**
   - ✅ **Resolved:** Pages table (url, title, description, content_md, content_hash, last_generated). Phase 2.

---

## Sources and Links

### Standards and Specs
- llms.txt: https://llmstxt.org/
- AGENTS.md: https://agents.md/
- MCP: https://modelcontextprotocol.io/
- Schema.org: https://schema.org/

### Libraries
- DOMPurify: https://github.com/cure53/DOMPurify
- Readability.js: https://github.com/mozilla/readability
- Turndown: https://github.com/mixmark-io/turndown
- linkedom: https://github.com/WebReflection/linkedom
- LLMLingua: https://github.com/microsoft/LLMLingua

### Research
- VOIX paper: https://arxiv.org/html/2511.11287
- Agentic Web paper: Referenced in emergentmind.com/topics/agentic-web-research

### Tools
- MarkDownload: https://github.com/deathau/markdownload
- mcpdoc: https://github.com/langchain-ai/mcpdoc

### Industry
- Agentic AI Foundation announcement: Linux Foundation, December 2025
- Semrush llms.txt analysis: https://www.semrush.com/blog/llms-txt/

---

*Research conducted: January 8, 2026*
*Updated: January 8, 2026 (aligned with architecture decisions)*
*Model: Claude Opus 4.5*
*For: MDS / FloatPrompt*