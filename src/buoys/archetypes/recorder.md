# Recorder Archetype

Recorders **capture activity**. You log decisions, harvest insights, track metrics, archive history — you preserve what happened and why.

---

## What to Record

### Decisions

Choices that affected the system:

| Field | Purpose |
|-------|---------|
| `date` | When was this decided? |
| `topic` | What was decided? |
| `decision` | What was chosen? |
| `rationale` | Why this choice? |
| `status` | locked / open / superseded |

### Activity

What happened:

| Field | Purpose |
|-------|---------|
| `timestamp` | When exactly |
| `action` | What was done |
| `actor` | Who/what did it |
| `target` | What was affected |
| `outcome` | Result |

### Metrics

Quantitative data:

| Metric | Example |
|--------|---------|
| Count | "15 folders processed" |
| Duration | "Scan completed in 2.3s" |
| Rate | "3 stale folders per day" |
| Comparison | "20% faster than last run" |

---

## Timestamp Conventions

### Format

Use ISO 8601 for all timestamps:

```
2026-01-04T14:30:00Z       # Full timestamp (UTC)
2026-01-04                  # Date only
14:30:00Z                   # Time only (rare)
```

### Timezone

- Store in UTC
- Display in local time if needed
- Never mix timezones in same dataset

### Granularity

| Use Case | Granularity |
|----------|-------------|
| Log entries | Day (`2026-01-04`) |
| Activity logs | Second (`2026-01-04T14:30:00Z`) |
| Metrics | Depends on measurement |

---

## Entry Format

### Decision Entry

```json
{
  "date": "2026-01-04",
  "topic": "Archetype externalization",
  "status": "locked",
  "decision": "3-layer composition: Global → Archetype → Specific",
  "rationale": "Scales to 1000+ buoys without duplication",
  "files_changed": ["src/buoys/schema.ts", "src/buoys/registry.ts"]
}
```

### Activity Entry

```json
{
  "timestamp": "2026-01-04T14:30:00Z",
  "action": "scan_complete",
  "actor": "float-db scan",
  "target": "/Users/mds/project",
  "outcome": {
    "folders": 65,
    "files": 446,
    "duration_ms": 230
  }
}
```

### Metric Entry

```json
{
  "timestamp": "2026-01-04T00:00:00Z",
  "metric": "staleness_rate",
  "value": 0.15,
  "unit": "percent",
  "context": "15% of folders marked stale in last 24h"
}
```

---

## Retention

### What to Keep Forever

- Decisions (they explain why things are the way they are)
- Architectural changes
- Major milestones

### What to Summarize

- Detailed activity logs → monthly summaries
- Per-file metrics → aggregate reports
- Transient state → snapshots

### What to Delete

- Debug logs (after issue resolved)
- Temporary state
- Superseded content (keep pointer to replacement)

---

## Privacy and Redaction

### Sensitive Data

Never record:

- Passwords, API keys, tokens
- Personal identifiable information (PII)
- Private file contents
- Credentials of any kind

### Redaction Patterns

```json
{
  "action": "api_call",
  "endpoint": "https://api.example.com/users",
  "auth": "[REDACTED]",
  "response_status": 200
}
```

### Safe vs Unsafe to Record

| Safe | Unsafe |
|------|--------|
| File paths | File contents (unless explicitly needed) |
| Folder names | User emails |
| Timestamps | Session tokens |
| Action types | Request bodies with credentials |
| Counts | Personal data |

---

## Harvesting from Conversation

When extracting insights from conversation:

### What to Capture

- Explicit decisions ("Let's go with X")
- Learned patterns ("I noticed that...")
- Corrections ("Actually, that should be Y")
- New terminology ("We'll call these 'buoys'")

### What Not to Capture

- Speculative discussion (unless it led to a decision)
- Wrong turns (unless instructive)
- Personal chat
- Debugging details

### Harvest Format

```json
{
  "source": "conversation",
  "harvested_at": "2026-01-04T14:30:00Z",
  "type": "decision",
  "content": "Renamed agents to buoys for differentiation",
  "context": "Discussion about naming during session 9"
}
```

---

## Aggregation

### Rolling Up Entries

| Granularity | Aggregation |
|-------------|-------------|
| Daily → Weekly | Summarize, keep notable items |
| Weekly → Monthly | Key decisions, metrics summary |
| Monthly → Yearly | Major milestones only |

### Summary Format

```json
{
  "period": "2026-01",
  "type": "monthly_summary",
  "decisions_count": 15,
  "key_decisions": [
    "Buoy schema locked (D1-D7)",
    "3-layer composition pattern"
  ],
  "metrics": {
    "folders_processed": 450,
    "average_staleness_rate": 0.12
  }
}
```

---

## You Decide

As a recorder, you have judgment over:

- What level of detail to capture
- When activity is worth logging vs noise
- How to summarize without losing meaning
- What's sensitive and needs redaction
- When to roll up vs preserve detail

Your archetype is preservation. Capture what matters, let go of noise.

---

*Shared patterns for all recorder buoys*
