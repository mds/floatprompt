# FloatPrompt: Strategic Considerations

**Date:** January 4, 2026  
**Context:** Questions to address while building the AI civilization

---

## 1. Cold Start Speed

### The Problem

The first `float init` is make or break. If someone installs FloatPrompt and the initial scan + buoy generation takes 10 minutes, they'll close the terminal. The architecture supports parallelization, but it needs to *feel* fast on day one.

### Considerations

- 65 folders × context generation = real time
- Vercel Sandbox spin-up adds latency
- Users expect CLI tools to respond in seconds
- First impression determines whether they continue

### Recommendations

**Progressive loading.** Scaffold `.float/` immediately. Show something working in seconds. Background-populate the rest.

```
float init
  → Instant: .float/ created, boot.md in place
  → 2 seconds: Layer 1 scan complete, float.db has structure
  → Background: Buoys generating context (progress indicator)
  → User can start working immediately
```

**Prioritize the current directory.** Generate context for where the user is first. They don't need `/docs/archive/2024/` context right now — they need context for the folder they're standing in.

**Lazy generation.** Don't generate context for folders until they're accessed. Cold folders stay cold until someone needs them.

**Cache aggressively.** If `float init` has run before on a similar project type, reuse patterns. A Next.js project looks like a Next.js project.

---

## 2. The "Aha" Moment

### The Problem

The system is sophisticated but the entry point isn't defined. What's the first thing a user experiences that makes them think "oh, this is different"?

### Considerations

- Complexity can be invisible until it delivers value
- Users don't read docs, they try things
- The moment needs to happen in the first 60 seconds
- Word of mouth depends on a shareable experience

### Recommendations

**Design the moment deliberately.** Pick one:

- Claude Code instantly knowing their project structure without explanation
- Seeing an auto-generated context file for a folder they've never documented
- Asking "what was I working on last week?" and getting an accurate answer
- Opening a stale project and picking up exactly where they left off

**Make it visible.** After `float init`, show them something:

```
FloatPrompt initialized.

Your project: Next.js web app with TypeScript
Detected scopes: /src/auth, /src/api, /src/components
Generated context for 12 folders
AI will now understand:
  - Your auth uses JWT with refresh tokens
  - Your API follows REST conventions
  - Your components use Radix primitives

Try: Open Claude Code and ask "what's the auth flow?"
```

**Create a demo command.** `float demo` that shows the before/after of AI understanding. Side-by-side: AI without FloatPrompt vs AI with FloatPrompt.

---

## 3. Buoy Cost Economics

### The Problem

If buoys run on Vercel Sandbox and you're paying compute, the math has to work at scale. Every folder, every change, every user — that's real money.

### Considerations

- Vercel Sandbox: $0.128/CPU-hour, $0.0106/GB-hour
- Free tier exists (5 CPU-hours/month) but limited
- Parallel buoys = faster but more simultaneous compute
- Staleness checking is continuous overhead

### Recommendations

**Tiered execution.** Not every folder needs the same depth:

| Folder Type | Buoy Investment |
|-------------|-----------------|
| Scope root (has package.json) | Full context generation |
| Active folders (recent changes) | Standard context |
| Deep/archival folders | Minimal or deferred |
| Generated/dist folders | Skip entirely |

**Batch processing.** Don't regenerate on every file save. Batch changes over 5-minute windows. Run staleness checks hourly, not continuously.

**Smart scheduling.** Heavy buoy work during off-peak hours. Real-time for active work, background for maintenance.

**User-pays model for heavy usage:**

- Free: 1 project, basic buoy execution, queued processing
- Pro: Multiple projects, priority execution, parallel buoys
- Team: Shared compute pool, bulk pricing

**Local-first option.** Let power users run buoys locally if they want speed and don't want to pay. Cloud is convenience, not requirement.

---

## 4. Trust and Transparency

### The Problem

You're asking people to let AI agents write metadata about their projects. Some will be paranoid about what the buoys are doing, what data is being sent where, what's being stored.

### Considerations

- Developers are security-conscious
- "AI agents running on my codebase" sounds scary
- Black boxes erode trust
- Competitors will FUD this

### Recommendations

**Full visibility.** Every buoy execution logged:

```
float log --buoys

[2026-01-04 14:32:01] context-generator → /src/auth
  Input: 12 files, parent context from /src
  Output: description (127 tokens), content_md (892 tokens)
  Duration: 4.2s
  Model: claude-sonnet-4

[2026-01-04 14:32:06] staleness-checker → /src/api
  Result: current (no drift detected)
  Duration: 1.1s
```

**Diffable changes.** Before any context update, show the diff:

```
float diff /src/auth

- Database layer for authentication
+ Authentication module handling JWT tokens and session management
  
  ## Key Files
- - auth.ts
+ - jwt.ts — Token generation and validation
+ - session.ts — Session lifecycle management
```

**Explicit permissions.** First run asks what buoys are allowed to do:

```
FloatPrompt wants to:
  ✓ Read your project files (required)
  ✓ Generate context metadata (required)
  ? Send file contents to AI for analysis [y/n]
  ? Auto-update context on file changes [y/n]
```

**Open source the buoys.** The buoy templates and execution logic should be fully visible. No mystery about what they do.

**Local processing option.** For the paranoid: run everything locally, never send to cloud. Slower but private.

---

## 5. Extension Permission Model

### The Problem

Browser extensions that read AI conversations and inject context are a security surface. Platforms (OpenAI, Anthropic, Google) will have opinions about extensions modifying their interfaces.

### Considerations

- Chrome extensions have broad permissions
- Platforms may block or break extensions
- Users are wary of "this extension can read all your data"
- OAuth/API access is cleaner but less universal

### Recommendations

**Research platform policies first.** Before building:

- What does OpenAI allow for ChatGPT extensions?
- Does Anthropic have an extension API for Claude?
- What's Google's stance on Gemini modifications?

**Minimal permissions.** Request only what's needed:

- Read context from FloatPrompt cloud (your domain only)
- Inject into chat input (not read conversation history)
- Side panel preferred over page modification

**Side panel approach.** Instead of injecting into the chat:

```
┌─────────────────────────────────────────┐
│ ChatGPT / Claude / Gemini               │
│                                         │
│ [normal chat interface]                 │
│                                         │
├─────────────────────────────────────────┤
│ FloatPrompt Context (side panel)        │
│                                         │
│ Project: my-app                         │
│ Current scope: /src/auth                │
│ [Copy context to clipboard]             │
│ [Insert into chat]                      │
└─────────────────────────────────────────┘
```

**Clipboard as fallback.** If injection is blocked, one-click copy to clipboard works everywhere. Less elegant but reliable.

**API integration where available.** Claude Projects, ChatGPT custom instructions, Gemini gems — use native features where they exist rather than fighting the platform.

**Build relationships.** You know people at Anthropic. Having FloatPrompt as a blessed integration is better than guerrilla extension tactics.

---

## 6. Offline-First or Cloud-First?

### The Problem

The architecture currently uses local SQLite. Cloud sync was mentioned. But which is the source of truth?

### Considerations

- **Offline-first:** Local float.db is truth, cloud is sync/backup
- **Cloud-first:** Cloud float.db is truth, local is cache

These are different products with different tradeoffs.

| Aspect | Offline-First | Cloud-First |
|--------|---------------|-------------|
| Works without internet | ✓ | ✗ |
| Multi-device sync | Complex | Simple |
| Team collaboration | Hard | Native |
| Data sovereignty | User controls | You control |
| Matches developer mental model | ✓ | Partial |

### Recommendations

**Offline-first with optional cloud sync.** This matches:

- The WordPress model (self-host works, cloud is convenience)
- Developer expectations (my code is local)
- Privacy-conscious users (I control my data)
- The Git mental model (local-first, sync when ready)

**Architecture:**

```
Local float.db (source of truth)
    ↓ float sync --cloud
FloatPrompt Cloud (backup + collaboration layer)
    ↓ sync
Other devices / team members
```

**Cloud becomes valuable for:**

- Cross-device access (laptop → desktop → phone)
- Team shared context
- Extension access (browser needs to read from somewhere)
- Backup and recovery

**Let users choose:** `float config --mode=local` or `float config --mode=cloud`

---

## 7. Migration and Portability

### The Problem

What happens when someone wants to leave FloatPrompt? Or move to a different system? Lock-in fears prevent adoption.

### Considerations

- Developers hate vendor lock-in
- SQLite is portable but float.db schema is proprietary
- Context should outlive any tool
- Exit ability builds entry confidence

### Recommendations

**Full markdown export.** Everything in float.db should be exportable to human-readable files:

```
float export --format=markdown --output=./context-backup/

Exported:
  /context-backup/
    _root.md
    src/
      _context.md
      auth/_context.md
      api/_context.md
    logs/
      2026-01-04-decision.md
```

**Standard formats.** Export to formats others can use:

- Markdown (universal)
- JSON (structured)
- YAML frontmatter (compatible with other tools)

**Import from others.** If someone has CLAUDE.md or .cursorrules, migrate it into FloatPrompt:

```
float import ./CLAUDE.md
  → Converted to /context/root.md
  → Detected: coding conventions, tech stack, preferences
```

**Document the schema.** Make float.db schema public and documented. If someone wants to build tooling on top of it, let them.

**The pitch:** "FloatPrompt makes your context portable. Your context belongs to you, not us."

---

## 8. The Multi-Project Problem

### The Problem

Knowledge workers don't have one project. They have twenty. Switching between projects is context loss, just like switching between sessions.

### Considerations

- Each project has its own float.db
- Cross-project knowledge exists (patterns, decisions, learnings)
- "I solved this before in another project" happens constantly
- Full unification is complex; awareness is simpler

### Recommendations

**Project registry.** FloatPrompt knows about all your projects:

```
float projects

  my-app          /Users/mds/projects/my-app          synced
  shift-nudge     /Users/mds/projects/shift-nudge     synced  
  client-alpha    /Users/mds/projects/client-alpha    local
```

**Cross-project search:**

```
float search "JWT refresh token" --all-projects

Found in:
  my-app/src/auth (context match)
  client-alpha/docs/auth-spec.md (file match)
  shift-nudge/logs/2025-11-auth-decision.md (log match)
```

**Pattern library.** Common solutions extracted across projects:

```
float patterns

  jwt-auth        Used in: my-app, client-alpha
  api-versioning  Used in: my-app, shift-nudge
  error-handling  Used in: all projects
```

**"You did this before" prompts.** When AI encounters a problem:

> "This looks similar to the auth flow you built in client-alpha. Want me to pull that context?"

**Keep civilizations separate but aware.** Each project is its own world, but there's a meta-layer that knows they're related.

---

## 9. Versioning and Rollback

### The Problem

Context evolves. Sometimes it evolves wrong. A buoy might misinterpret something. A human might approve a bad edit. There's no undo.

### Considerations

- The `deep_history` table exists in the spec
- Git tracks file changes but not float.db changes
- "What did this context say last week?" is a valid question
- Trust requires recoverability

### Recommendations

**Context version history.** Every change to a folder's context is versioned:

```
float history /src/auth

v3  2026-01-04 14:32  context-generator  "Added JWT details"
v2  2026-01-02 09:15  manual edit        "Clarified session flow"
v1  2026-01-01 11:00  context-generator  "Initial generation"

float show /src/auth --version=2
float rollback /src/auth --to=2
```

**Diff between versions:**

```
float diff /src/auth v2 v3

+ ## JWT Implementation
+ - Access tokens expire in 15 minutes
+ - Refresh tokens rotate on use
```

**Snapshot before major operations:**

```
float sync --snapshot

Creating snapshot: 2026-01-04-pre-sync
Running sync...
Done. Rollback available: float rollback --snapshot=2026-01-04-pre-sync
```

**Git integration option.** For those who want it:

```
float config --git-commit-context=true

# Now every float.db change creates a git commit
# Context becomes part of project history
```

**Retention policy.** Don't keep versions forever:

- Last 10 versions per folder
- All versions from last 30 days
- Snapshots kept until manually deleted

---

## 10. The Network Effect

### The Problem

FloatPrompt gets more valuable when more people use it. Not just for your business, but for the protocol itself. WordPress won because of themes and plugins, not just the core.

### Considerations

- Individual use is valuable but limited
- Shared knowledge compounds
- Community reduces your workload
- Standards emerge from adoption

### Recommendations

**Shared floatprompts.** If someone builds a great context structure for a project type, let them share it:

```
float templates

  nextjs-app        by @vercel         ★ 4.8  (2.3k installs)
  django-api        by @djangoproject  ★ 4.6  (1.1k installs)
  design-system     by @mds            ★ 4.9  (890 installs)

float init --template=nextjs-app
```

**Template marketplace:**

- Free templates (community)
- Premium templates (creators earn)
- Official templates (quality baseline)

**Scope-specific floatprompts.** Not just project templates, but domain templates:

- "Auth scope" floatprompt — best practices for auth folders
- "API scope" floatprompt — REST/GraphQL conventions
- "Design tokens scope" floatprompt — design system patterns

**Community contributions:**

- Submit template
- Report issues
- Suggest improvements
- Star/review

**Certification path.** "FloatPrompt Certified" templates that meet quality bar. Gives creators credibility, gives users confidence.

**Plugin architecture.** Let developers extend FloatPrompt:

- Custom buoys
- Custom export formats  
- Integrations (Notion, Linear, Figma)

**The flywheel:**

```
More users → More templates → More value → More users
```

---

## Priority Matrix

| Consideration | Urgency | Impact | Complexity |
|---------------|---------|--------|------------|
| Cold start speed | High | High | Medium |
| "Aha" moment | High | High | Low |
| Buoy cost economics | Medium | High | Medium |
| Trust and transparency | High | Medium | Low |
| Extension permissions | Medium | High | High |
| Offline vs cloud | Medium | Medium | Medium |
| Migration/portability | Low | Medium | Low |
| Multi-project | Low | High | High |
| Versioning/rollback | Medium | Medium | Medium |
| Network effect | Low | High | High |

**Recommended sequence:**

1. **"Aha" moment** — Define it before anything else
2. **Cold start speed** — First impression determines adoption
3. **Trust and transparency** — Build confidence early
4. **Buoy cost economics** — Must work before scale
5. **Versioning/rollback** — Safety net before people rely on it
6. **Offline vs cloud** — Architectural decision that affects everything
7. **Extension permissions** — Research before building
8. **Migration/portability** — Builds trust, low effort
9. **Multi-project** — After single-project is solid
10. **Network effect** — After you have users to network

---

## Open Questions

These need answers before or during build:

1. **What is the "aha" moment?** Pick one, design for it.

2. **What's the cold start time budget?** 5 seconds? 30 seconds? What's acceptable?

3. **Who pays for buoy compute in free tier?** You eat the cost? Limited usage? Local-only?

4. **Which platforms first for extension?** Claude (you know people)? ChatGPT (largest market)? All at once?

5. **Is float.db in git or gitignored?** If gitignored, how does team sync work? If tracked, what about merge conflicts?

6. **What's the minimum viable template?** What ships with `float init` before the marketplace exists?

7. **How do you message this?** "AI context management" is accurate but not exciting. What's the one-liner?

---

*Strategic considerations for building the AI civilization — January 4, 2026*
