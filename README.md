# FloatPrompt

> **The invisible AI operating system in a text file**

**FloatPrompt** is a portable AI instruction protocol. Upload a single `.fp` file to any AI system and instantly upgrade its collaboration, context, and precision.

---

## 🚀 Quick Start

1. **Get the latest template:**
   - Use the file in `dist/floatprompt-{version}.fp` after building from source.
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

---

## 🛠️ Build From Source

```bash
npm install
npm run build
```

**Build Features:**
- **YAML Injection System**: Eliminates duplication using shared components as single source of truth
- **Template Variable Processing**: Dynamic values like `{{VERSION}}` and `{{BUILD_DATE}}`
- **Automatic Archiving**: Previous versions stored in `dist/archive/`
- **Compliance Validation**: Ensures 100% header.yaml (52 fields) and config.yaml (51 fields) specification compliance

**Output**: `dist/floatprompt-{version}.fp`

---

## 📦 What's in a FloatPrompt?

- `.fp` files = complete, executable FloatPrompt documents (for AI upload)
  - Must include a `<floatprompt>...</floatprompt>` wrapper and YAML frontmatter
  - Ready for direct AI upload and execution
- `.md` files = building blocks, templates, and documentation (for editing and assembly)

_For advanced details on the `.fp` file format, see `src/docs/fp.md`._

---

## 📚 Documentation

### Core Documentation
- **[Goals](src/docs/goals.md)** - Primary objectives and decision hierarchy
- **[Voice Guide](src/docs/voice.md)** - Surgical precision writing methodology
- **[Manifesto](src/docs/manifesto.md)** - Vision and philosophy
- **[Safety](src/docs/safety.md)** - Built-in safety systems and friction management

### Technical Documentation
- **[FloatPrompt Format](src/docs/fp.md)** - File format specification
- **[Principles](src/docs/principles.md)** - Core system principles
- **[Naming](src/docs/naming.md)** - Naming conventions

### Development Workflow
- **[Update Development README](dev/update-readme.md)** - Complete development workflow guide
- **[Update Creator](dev/update-creator.fp)** - Tool for creating structured updates
- **[Update Protocol](dev/update-protocol.fp)** - Tool for executing system updates

---

## 🧠 How It Works

- **Upload the `.fp` file** to any AI system that supports file input.
- **Give your instructions**—the AI will follow your intent, structure, and voice with zero drift.
- **Build your own**: Edit the modular components in `src/template/` and run the build script.

---

## ⚠️ Alpha Notice

FloatPrompt is in active development.  
Features, file structure, and instructions may change frequently.

---

## 📄 License

[Creative Commons Attribution 4.0](LICENSE)

---

**Built with 🤖 by [@mds](https://twitter.com/mds)**

## Key Features

- **Zero-drift AI collaboration** through structured behavioral preservation
- **Voice preservation** that maintains your exact thinking patterns
- **Portable intelligence** that works across any AI platform
- **Archaeological extraction** that preserves rather than paraphrases
- **Built-in safety system** through automatic friction classification and response selection
- **Intuitive metaphor guidance** using building/hallway/small room spatial concepts for friction-appropriate responses
