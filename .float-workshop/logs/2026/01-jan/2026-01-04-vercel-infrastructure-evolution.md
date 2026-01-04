# Vercel Infrastructure Evolution

**Date:** 2026-01-04
**Status:** Locked
**Future Agent:** decision_logger

---

## Decision

Captured Vercel's infrastructure philosophy progression from Framework-Defined Infrastructure to Self-Driving Infrastructure as reference material for FloatPrompt's context-compiler vision.

---

## Key Concepts

### Framework-Defined Infrastructure (FdI)

Instead of manually writing Infrastructure as Code (IaC), the deployment system **analyzes framework code and automatically provisions the right infrastructure**.

- **Intent over configuration** — Write `getServerSideProps` → system deploys serverless functions. Switch to `getStaticProps` → it uses static file hosting
- **Framework patterns map to infra** — Middleware → edge compute, image components → image optimization, form actions → function deployments
- **Immutable deployments** — Each commit generates fresh infrastructure (viable because serverless scales to zero)

### Self-Driving Infrastructure

Evolution beyond FdI — adding an **autonomous AI agent** that manages production operations:

1. **Agentic Infrastructure (Vercel Agent)** — AI monitors deployments, investigates anomalies, root-cause analysis, code reviews in sandboxes
2. **Production-to-Code Feedback Loop** — Analyzes production data, generates PRs based on actual conditions
3. **Autonomous Operations** — Currently human-supervised, moving toward full autonomy

**Key shift:** From unidirectional (code → infra) to **bidirectional** (code ↔ infra feedback). System learns from production reality and proposes improvements back to codebase.

---

## Rationale

These concepts align with FloatPrompt's context-compiler vision:

| Vercel Concept | FloatPrompt Parallel |
|----------------|---------------------|
| Framework-Defined Infrastructure | **Folder-Defined Context** — infer context from structure, not manual configuration |
| Intent over configuration | **Scanning over declaration** — system discovers what you have, you refine what it means |
| Production-to-Code feedback | **Staleness detection + buoy updates** — buoys propose context changes based on code changes |
| Self-Driving Infrastructure | **Background buoys** — pattern-detector, decision-logger running during sessions |
| Immutable deployments | **Version history** — `deep_history` table for diffing and rollback |

Both systems share the same evolution arc: **manual → declarative → inferred → autonomous**.

---

## References

- [Framework-Defined Infrastructure](https://vercel.com/blog/framework-defined-infrastructure)
- [Self-Driving Infrastructure](https://vercel.com/blog/self-driving-infrastructure)

---

## Files Changed

None — research/reference capture only.
