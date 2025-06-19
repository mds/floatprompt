# FloatPrompt

> **The invisible AI operating system in a text file**

**FloatPrompt** is a portable AI instruction protocol. Upload a single `.fp` file to any AI system and instantly upgrade its collaboration, context, and precision.

## 🚀 Quick Start

1. **Get the latest template:**
   - Use the file in `dist/floatprompt@latest.fp` after building from source.
   - Or ask a project maintainer for the latest `.fp` file.

2. **Upload to any AI system and use:**
   ```
   Natural language: "Run floatprompt on [my content]"
   CLI shortcuts:    float map content
                     float extract --mode=voice  
                     float build my-tool
   ```

3. **Get better, more precise AI collaboration.**

4. **Organize your work** using the [workspace structure](./workspace/) with examples and best practices.

## 🛠️ Build From Source

```bash
npm install
npm run build
```

**Build Features:**
- **Shared Component Architecture**: `src/shared/` components used across multiple FloatPrompts
- **YAML Injection System**: Eliminates duplication using shared components as single source of truth
- **Template Variable Processing**: Dynamic values like `{{VERSION}}` and `{{BUILD_DATE}}`
- **Synchronized Versioning**: Both core system and applications use same version metadata
- **Automatic Archiving**: Previous versions stored in `dist/archive/`
- **Compliance Validation**: Ensures 100% header.yaml (52 fields) and config.yaml (51 fields) specification compliance

**Output**: `dist/floatprompt-@latest.fp` and `dist/voice-guide-creator.fp`

## 📦 What's in a FloatPrompt?

- `.fp` files = complete, executable FloatPrompt documents (for AI upload)
  - Must include a `<floatprompt>...</floatprompt>` wrapper and YAML frontmatter
  - Ready for direct AI upload and execution
- `.md` files = building blocks, templates, and documentation (for editing and assembly)

_For advanced details on the `.fp` file format, see `docs/fp.md`._

## 📚 Documentation

### Core Documentation
- **[Goals](docs/goals.md)** - Primary objectives and decision hierarchy
- **[Voice Guide](docs/voice.md)** - Surgical precision writing methodology
- **[Manifesto](docs/manifesto.md)** - Vision and philosophy
- **[Safety](docs/safety.md)** - Built-in safety systems and friction management

### Technical Documentation
- **[FloatPrompt Format](docs/fp.md)** - File format specification
- **[Principles](docs/principles.md)** - Core system principles
- **[Naming](docs/naming.md)** - Naming conventions
- **[Discovery](docs/discovery.md)** - Research findings and cognitive efficiency analysis

### Development Workflow
- **[Workspace Usage](workspace/_USAGE.md)** - Workspace structure and usage guide
- **[Build System](scripts/build.mjs)** - Modular build system with shared components

## 🧠 How It Works

- **Upload the `.fp` file** to any AI system that supports file input.
- **Give your instructions**—the AI will follow your intent, structure, and voice with zero drift.
- **Build your own**: Edit the modular components in `src/sys/` and shared components in `src/shared/`, then run the build script.

## ⚠️ Alpha Notice

FloatPrompt is in active development.  
Features, file structure, and instructions may change frequently.

## 📄 License

[Creative Commons Attribution 4.0](LICENSE)

## Key Features

- **Zero-drift AI collaboration** through structured behavioral preservation
- **Voice preservation** that maintains your exact thinking patterns
- **Portable intelligence** that works across any AI platform
- **Archaeological extraction** that preserves rather than paraphrases
- **Complete voice foundation system** through enhanced voice-guide-creator with synthesis capabilities
- **Modular voice architecture** enabling infinite specialized tool development
- **Built-in safety system** through automatic friction classification and response selection
- **Intuitive metaphor guidance** using building/hallway/small room spatial concepts for friction-appropriate responses

---
© 2025 [@MDS](https://mds.is) | CC BY 4.0