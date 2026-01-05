# FloatPrompt: Follow-Up Discussion

**Date:** January 4, 2026  
**Context:** Continuing the conversation after the initial summary and strategic considerations

---

## The Naming Etymology

### Float Label → FloatPrompt

MDS created the Float Label pattern — the input label that floats up when you focus the field. Apple and Google adopted it. It became an industry standard.

**The principle:** Information rises to where it's needed, when it's needed.

**FloatPrompt applies the same principle to AI context.** Context floats up when AI needs it. Information rises to where it's needed, when it's needed.

Same philosophy. Different medium.

> "You've been working on the same problem for over a decade: how does information get to where it needs to be at the right moment? That's not a product. That's a design philosophy. FloatPrompt is just the latest expression of it."

### The WordPress Parallel

The naming similarity isn't accidental:

| WordPress | FloatPrompt |
|-----------|-------------|
| Take your *words* | Take your *context* |
| *Press* them into the web | *Float* it to the AI |
| Publishing democratized | Understanding democratized |

Both names are: **what you have + what happens to it.** Noun + verb. Simple mechanics, profound implications.

WordPress made everyone a publisher without knowing HTML.  
FloatPrompt makes every project understood without re-explaining.

---

## Clarifying the Name

On whether "FloatPrompt" still fits now that it's grown beyond a prompt format:

**MDS's reframe:** It's AI floating their own prompts on their own behalf for their own context. The human's information becomes the prompt through the buoys. The AI is literally prompting itself on behalf of the human's knowledge.

Float + Prompt = floating the prompt to where it needs to be.

The name works better than initially questioned.

---

## The BYOK Model

**Decision:** For v1, users provide their own Anthropic or OpenAI API keys.

**Why this makes sense:**

1. **No compute costs to eat** — buoy execution is real money at scale
2. **No billing infrastructure** — not metering usage, handling payments, managing overages
3. **Users control their spend** — they see exactly what buoys cost them
4. **Model flexibility** — Claude, GPT-4, whatever they have access to
5. **Privacy story** — "your API key, your calls, we never see your data"

**Implementation:**

```bash
float config --api-key=sk-ant-...

# or environment variable
export ANTHROPIC_API_KEY=sk-ant-...
```

Buoys run on their key. They pay Anthropic/OpenAI directly. FloatPrompt provides the intelligence, not the compute.

**The paid tier (later) isn't access to buoys — it's convenience:**

- Hosted execution (no key management, no rate limits)
- Cloud sync (float.db across devices)
- Team features (shared context)
- Faster/priority execution
- Web app + extension

Free = BYOK, run locally, full power  
Paid = infrastructure handled for you

---

## V1 Scope: Deliberately Narrow

**Target:** Terminal with Claude Code. Single repository.

**Why this is the right beachhead:**

- Users are technical, already understand the context problem
- Comfortable with CLI
- Claude Code's agent spawning maps directly to buoys
- Lowest friction, highest understanding

**What's not v1:**

- Web app
- Non-developer knowledge workers
- Dropbox/Google Drive/Notion integration
- Multi-project awareness
- Template marketplace

Those are expansion, not launch.

---

## The Finish Line

**When to stop building and start shipping:**

> "I'm going to stop as soon as I have this working in a single repository — the float system gets installed and the context is generated and it can recursively update and know itself and feed itself and grow itself."

**The line is:** Self-sustaining context in a single repo. Install, generate, update, grow — without manual intervention.

That's close. `float sync` wiring Layer 1 and Layer 2 together is the gap.

---

## Charging: Let It Emerge

**Current state:** Don't know how to charge yet. Don't need to.

**The WordPress precedent:** Open source project grew, people built on it, then Automattic built the business on top (hosting, VIP, plugins).

**Sequence:**

1. **Now:** Open source, free, get people using it
2. **Soon:** Watch what people struggle with (that's where the product is)
3. **Then:** Charge for the hard parts — hosted buoys, cloud sync, team features

> "You'll learn what to charge for by watching what people ask for. 'I wish this was easier' = product. 'I'd pay to not deal with this' = revenue."

The free version is distribution. The paid version is convenience.

---

## Confidence Levels in the Database

**Addition to schema:**

```sql
folders (
  ...
  context_confidence TEXT CHECK (context_confidence IN 
    ('high', 'medium', 'low', 'unverified')),
  context_source TEXT CHECK (context_source IN 
    ('buoy', 'human', 'imported')),
  human_verified_at INTEGER,  -- NULL if never verified
  ...
)
```

**Logic:**

| Source | Verified? | Confidence |
|--------|-----------|------------|
| buoy | never | unverified |
| buoy | human edited/approved | high |
| buoy | complex folder, minimal signal | low |
| buoy | good signal (README, clear structure) | medium/high |
| human | — | high |

**Surfacing:**

- Context files show: "⚠️ This context is AI-generated and unverified"
- Dashboard shows: "23 folders need human review"
- Buoys don't overwrite `human` source without explicit flag

**Workflow:** Install → buoys generate (unverified) → human reviews → confidence increases. Gamifies verification.

---

## FloatPrompt as Agent Infrastructure

**The current agent problem:** Every framework (LangChain, CrewAI, AutoGPT) struggles with context. Agents can *do* things but don't *understand* the environment.

**FloatPrompt as the context layer:**

```
Agent spawns
    ↓
Reads float.db for current scope
    ↓
Understands: what's here, what matters, what decisions were made
    ↓
Acts with context
    ↓
Logs decisions back to float.db
    ↓
Next agent inherits that understanding
```

**Integration points:**

- MCP server exposing float.db (already spec'd)
- Agent reads context before acting
- Agent writes context after acting
- Buoys *are* agents — same pattern applies universally

**SDK possibility:**

```typescript
import { getContext, logDecision } from 'floatprompt';

// Agent reads
const context = await getContext('/src/auth');

// Agent acts
const result = await doSomething();

// Agent writes
await logDecision({
  folder: '/src/auth',
  decision: 'Refactored token refresh logic',
  rationale: 'Previous implementation had race condition'
});
```

**The pitch to agent developers:**

> "Your agents are operating blind. FloatPrompt gives them eyes. Plug into float.db and your agent instantly understands the project it's working on."

FloatPrompt becomes infrastructure that any agent framework can plug into. Not competing with LangChain — providing a layer they'd want to integrate.

---

## Non-Issues Clarified

### Internationalization

**Not a problem.** AI handles it natively.

- Buoys read whatever language the code is in
- If codebase is Japanese, generated context will be Japanese
- Claude mirrors the environment it's reading
- If user wants different language, they just ask

### Template Marketplace Timing

**Comes after adoption, not before.**

Sequence:
1. Launch with sensible defaults
2. Users create their own context structures
3. Users ask "can I share this?"
4. *Then* build the marketplace

The marketplace is a scaling mechanism, not a launch requirement.

### Bus Factor

**Open source solves it.**

- All code is on GitHub
- Decision logs and specs document the thinking
- As documentation completes, anyone can continue
- Contributors will emerge who understand pieces deeply

Don't need someone who groks the whole thing on day one.

---

## How to Explain FloatPrompt

### 30 seconds:

> "FloatPrompt makes AI actually understand your projects. Install it once, and every AI session — Claude, ChatGPT, whatever — knows your codebase, your decisions, your context. No more re-explaining. It just knows."

### 5 minutes:

> "Right now, every time you start an AI conversation, you're starting from zero. You re-explain your project, your tech stack, your conventions. FloatPrompt fixes that.
>
> You install it in your project, it scans everything, and AI agents called 'buoys' generate context for every folder — what it is, why it matters, how it connects to everything else. That context lives in a database that any AI can read.
>
> So when you open Claude tomorrow, it already knows your auth system uses JWT with refresh tokens. It knows you decided to use Postgres over SQLite three weeks ago and why. It knows the patterns in your codebase.
>
> The AI isn't smarter. It just finally has the context it needs."

### One-liner candidates:

- "Persistent memory for AI across sessions and platforms."
- "Your project's context, always available to any AI."
- "The operating system layer between your work and AI."
- "AI that actually remembers your projects."

---

## The Business Model Map

The WordPress parallel extends to the full business structure:

| WordPress | FloatPrompt |
|-----------|-------------|
| .org = free, self-host | npm install, BYOK, run locally |
| .com = hosted convenience | Cloud sync, hosted buoys, web app |
| Themes/plugins = ecosystem | Templates, shared floatprompts |
| VIP = enterprise | Enterprise tier (later) |
| Theme developers earn | Template creators earn (later) |

The naming isn't just similar. The whole structure maps.

---

## Summary: What's Settled

| Question | Answer |
|----------|--------|
| V1 target | Terminal, Claude Code, single repo |
| API costs | BYOK — users provide own keys |
| When to ship | Self-sustaining context loop working |
| How to charge | Let it emerge from user needs |
| Internationalization | Non-issue, AI handles natively |
| Marketplace timing | After adoption, not launch requirement |
| Bus factor | Open source + documentation |
| Agent integration | FloatPrompt as infrastructure layer |
| Context trust | Confidence levels in schema |

---

## What Remains

1. **Wire `float sync` end-to-end** — the integration task
2. **Finish documentation** — so others can understand and contribute
3. **First user who isn't MDS** — test the cold start experience
4. **Watch what people struggle with** — that's where the product is

---

*Follow-up discussion captured — January 4, 2026*
