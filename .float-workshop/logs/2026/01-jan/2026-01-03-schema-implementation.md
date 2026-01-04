# Schema Implementation Complete

**Date:** 2026-01-03
**Status:** Locked

## Decision

Implement the 16-field `folders` table schema as specified in `wip-schema-spec.md`.

## What Changed

### schema.ts
- Added `FolderTypeSchema` enum: folder, scope, log_root, log_year, log_month
- Added `FolderStatusSchema` enum: pending, current, stale
- Updated `FolderSchema` with 16 fields organized by purpose:
  - Identity (3): path, parent_path, name
  - Governance (2): type, status
  - AI Content (2): description, content_md
  - Scope (3): is_scope, parent_scope_path, scope_boot
  - Mechanical (2): source_hash, last_scanned_at
  - Attribution (2): ai_model, ai_updated
  - Timestamps (2): created_at, updated_at
- Removed old columns: map_summary, map_children, context_what, context_why, context_patterns
- Updated SQL DDL with CHECK constraints

### scan.ts
- INSERT sets `status='pending'`, `is_scope=0`
- UPDATE marks `status='stale'` when source changes and AI had written content (`ai_updated IS NOT NULL`)

### Database
- Deleted old `.float/float.db` with stale schema
- Rescanned: 65 folders, 447 files with new schema

## Rationale

The spec was locked in session 3 via Q&A. Implementation is straightforward translation — no design decisions needed.

## Files Changed
- `src/db/schema.ts`
- `src/db/scan.ts`
- `.float/float.db` (recreated)

## Future Agent
`schema_updater` — Handles schema migrations when spec changes.
