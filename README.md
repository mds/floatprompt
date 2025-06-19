# FloatPrompt

> **The invisible OS for AI in a text file**

Upload a single `.fp` file to any AI system and instantly upgrade its collaboration, context, and precision.

## ⚡ Ready to Use

**Download and upload to any AI system:**
- **[floatprompt-0.10.1-alpha.fp](./dist/floatprompt-0.10.1-alpha.fp)** (87KB) - Complete system (start here)
- **[voice-guide-creator.fp](./dist/voice-guide-creator.fp)** (17KB) - Extract your voice patterns as true source for AI collaboration (advanced)

## 🚀 Why FloatPrompt?

**Transform unorganized content into structured intelligence:**

- **Map complex content** - Extract insights from documents, conversations, brainstorms
- **Preserve your voice** - Maintain thinking patterns without AI flattening
- **Transfer context** - Move understanding between AI systems without degradation
- **Build voice guides** - Extract your authentic voice patterns as the true source for AI to learn your thinking style
- **Archaeological extraction** - Structure what exists rather than hallucinating

**Real impact:** 4:1 token compression while maintaining strategic understanding. 90% reduction in AI model context reconstruction overhead in experimental chat threads.

## 🎯 Use Cases

**Upload FloatPrompt to any AI chat interface, then chat normally with FloatPrompt as your invisible OS:**

```
float map content          # Extract structure from messy documents
float extract --mode=voice # Preserve writing patterns for AI training  
float build my-tool        # Create specialized applications
```

**Workflow:** Upload `.fp` file → Chat normally → FloatPrompt operates as invisible OS managing context, voice preservation, and precision collaboration behind the scenes.

## 🛠️ Build From Source

```bash
npm install
npm run build
```

**Features:**
- **Shared components** - `src/shared/` used across multiple FloatPrompts
- **YAML injection** - Eliminates duplication using shared components
- **Template variables** - Dynamic `{{VERSION}}` and `{{BUILD_DATE}}`
- **Synchronized versioning** - Core system and applications use same metadata
- **Automatic archiving** - Previous versions in `dist/archive/`
- **Compliance validation** - 100% header.yaml (52 fields) and config.yaml (51 fields)

**Output**: `dist/floatprompt-@latest.fp` and `dist/voice-guide-creator.fp`

## 📦 File Types

- `.fp` files = complete, executable documents for AI upload
- `.md` files = building blocks, templates, documentation for editing

_Advanced format details: `docs/fp.md`_

## 📚 Documentation

**Core:**
- **[Goals](docs/goals.md)** - Objectives and decision hierarchy
- **[Voice Guide](docs/voice.md)** - Surgical precision writing
- **[Manifesto](docs/manifesto.md)** - Vision and philosophy
- **[Safety](docs/safety.md)** - Safety systems and friction management

**Technical:**
- **[Format](docs/fp.md)** - File specification
- **[Principles](docs/principles.md)** - Core system principles
- **[Naming](docs/naming.md)** - Conventions
- **[Discovery](docs/discovery.md)** - Research and cognitive efficiency

**Development:**
- **[Workspace](workspace/_USAGE.md)** - Structure and usage
- **[Build System](scripts/build.mjs)** - Modular build with shared components

## 🧠 How It Works

Upload the `.fp` file to any AI system and it becomes your invisible OS. Chat normally—FloatPrompt manages intent, structure, and voice preservation with zero drift behind the scenes. Build your own by editing `src/sys/` and `src/shared/` components.

## ⚠️ Alpha Notice

Experimental technology in active development. Performance metrics based on limited testing. Features and structure may change.

## 📄 License

[Creative Commons Attribution 4.0](LICENSE)

## Key Features

- **Zero-drift collaboration** - Structured behavioral preservation (experimental validation)
- **Voice preservation** - Maintains exact thinking patterns
- **Portable intelligence** - Works across any AI platform
- **Archaeological extraction** - Preserves rather than paraphrases
- **Voice foundation system** - Enhanced voice-guide-creator with synthesis
- **Modular architecture** - Infinite specialized tool development
- **Built-in safety** - Automatic friction classification and response selection
- **Intuitive metaphors** - Building/hallway/room spatial concepts for responses

---
© 2025 [@MDS](https://mds.is) | CC BY 4.0