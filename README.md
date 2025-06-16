# FloatPrompt

> **The invisible AI operating system in a text file**

**FloatPrompt** is a portable AI instruction protocol. Upload a single `.fp` file to any AI system and instantly upgrade its collaboration, context, and precision.

---

## �� Quick Start

1. **Get the latest template:**
   - Use the file in `dist/floatprompt-{version}.fp` after building from source.
   - Or ask a project maintainer for the latest `.fp` file.

2. **Upload to any AI system and say:**
   ```
   "Run floatprompt on [my content]"
   ```

3. **Get better, more precise AI collaboration.**

---

## 🛠️ Build From Source

```bash
npm install
npm run build
```

- The build outputs `dist/floatprompt-{version}.fp`
- Previous versions are automatically archived in `dist/archive/`

---

## 📦 What's in a FloatPrompt?

- `.fp` files = complete, executable FloatPrompt documents (for AI upload)
  - Must include a `<floatprompt>...</floatprompt>` wrapper and YAML frontmatter
  - Ready for direct AI upload and execution
- `.md` files = building blocks, templates, and documentation (for editing and assembly)

_For advanced details on the `.fp` file format, see `src/docs/fp.md`._

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
