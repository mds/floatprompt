# CLI Batch Command

**Date:** 2026-01-04
**Status:** Locked

## Decision

Added `float-db buoy batch` CLI command for parallel buoy execution with optional concurrency limiting.

## Rationale

Test 5 (Parallel Buoy Spawning) validated that `executeBuoyBatch` works correctly with `Promise.all`. To expose this functionality via CLI and enable scripted batch operations, we added the batch command.

## Implementation

```bash
# Full parallel execution
float-db buoy batch scope-detector --data '[{...}, {...}, {...}]'

# Rate-limited execution (5 at a time)
float-db buoy batch scope-detector --data '[...]' --concurrency 5
```

### Features

| Feature | Description |
|---------|-------------|
| Parallel execution | All inputs via `Promise.all` by default |
| Concurrency limiting | `--concurrency N` chunks into batches |
| Summary stats | Total time, avg time, success/fail counts |
| Input validation | Rejects non-arrays, empty arrays |

### Output Format

```json
{
  "summary": {
    "total": 6,
    "success": 6,
    "failed": 0,
    "totalTimeMs": 5234,
    "avgTimeMs": 872,
    "concurrency": "unlimited"
  },
  "results": [...]
}
```

## Test Results

| Metric | Value |
|--------|-------|
| Parallelism ratio | 5.29x |
| API execution | Blocked by sandbox env isolation |
| Validation | All error cases tested |

## Files Changed

- `src/cli/float-db.ts` — Added `buoy batch` case handler
- `src/buoys/index.ts` — Already exports `executeBuoyBatch`

---

*Session 18: CLI batch command for parallel buoy execution*
