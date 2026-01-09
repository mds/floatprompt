---
title: [Project Name] — Tech Stack
updated: YYYY-MM-DD
status: current
---

# [Project Name] — Tech Stack

> Technology choices and rationale. Reference this when setting up the project or evaluating alternatives.

---

## Core Stack

| Layer | Technology | Version | Rationale |
|-------|------------|---------|-----------|
| Runtime | [e.g., Node.js] | [e.g., 20.x LTS] | [Why this choice] |
| Framework | [e.g., Next.js] | [e.g., 14.x] | [Why this choice] |
| Language | [e.g., TypeScript] | [e.g., 5.x] | [Why this choice] |
| Database | [e.g., SQLite] | [e.g., 3.x] | [Why this choice] |
| Hosting | [e.g., Vercel] | — | [Why this choice] |

---

## Key Libraries

| Purpose | Library | Version | Notes |
|---------|---------|---------|-------|
| [e.g., Markdown rendering] | [e.g., react-markdown] | [e.g., ^9.0] | [Any gotchas or config notes] |
| [e.g., Syntax highlighting] | [e.g., rehype-highlight] | | |
| [e.g., Schema validation] | [e.g., zod] | | |
| [e.g., Date handling] | [e.g., date-fns] | | |
| [e.g., HTTP client] | [e.g., ky] | | |

---

## Dev Dependencies

| Purpose | Tool | Notes |
|---------|------|-------|
| Linting | [e.g., ESLint + Prettier] | [Config location or preset] |
| Testing | [e.g., Vitest] | |
| Type checking | [e.g., tsc --noEmit] | |
| Build | [e.g., next build] | |

---

## External Services

| Service | Purpose | Auth Method | Docs |
|---------|---------|-------------|------|
| [e.g., Dropbox API] | [e.g., File storage] | [e.g., OAuth token] | [URL] |
| [e.g., Vercel] | [e.g., Hosting] | [e.g., Git integration] | |

---

## Environment Variables

| Variable | Required | Description | Where to get it |
|----------|----------|-------------|-----------------|
| [VAR_NAME] | Yes/No | [What it does] | [e.g., Dropbox App Console] |

---

## Constraints & Decisions

### Chosen

| Decision | Rationale |
|----------|-----------|
| [e.g., SQLite over PostgreSQL] | [e.g., Single-file, no server, good enough for v1 scale] |
| [e.g., App Router over Pages Router] | [e.g., Future direction of Next.js, better for RSC] |

### Explicitly Avoided

| Technology | Why Not |
|------------|---------|
| [e.g., Prisma] | [e.g., Overhead not justified for simple schema] |
| [e.g., Redux] | [e.g., React Server Components reduce need for client state] |

---

## Gotchas & Warnings

- **[Gotcha 1]:** [What to watch out for and how to handle it]
- **[Gotcha 2]:** [What to watch out for and how to handle it]

---

## Upgrade Path

| Component | Current | Target | Blocking Issues |
|-----------|---------|--------|-----------------|
| [e.g., Next.js] | [14.x] | [15.x] | [e.g., None, ready when stable] |
| [e.g., Node.js] | [20.x] | [22.x] | [e.g., Waiting for LTS] |

---

## Quick Setup

```bash
# Clone and install
git clone [repo]
cd [project]
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your values

# Run development server
npm run dev
```

---

*Last reviewed: [Date]*
