# Astro LSP Plugin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a minimal LSP plugin for Claude Code that provides Astro language support for `.astro` files using `@astrojs/language-server` as the backend.

**Architecture:** A local Claude Code plugin with LSP server configuration that starts `astro-ls` language server for `.astro` files. The plugin follows the standard Claude Code plugin structure with `.claude-plugin/plugin.json` for metadata and `.claude-plugin/marketplace.json` for LSP server configuration.

**Tech Stack:** Claude Code plugin system, @astrojs/language-server, astro-ls command

---

## File Structure

```
astro_lsp/
├── .claude-plugin/
│   ├── plugin.json          # Plugin metadata (name, description, author)
│   └── marketplace.json     # LSP server configuration
└── README.md                # Installation and usage documentation
```

### File Responsibilities

- **`.claude-plugin/plugin.json`**: Plugin metadata (name, description, author, version)
- **`.claude-plugin/marketplace.json`**: LSP server configuration (command, args, extension mapping)
- **`README.md`**: Installation instructions, prerequisites, usage guide

---

## Task 1: Create Plugin Directory Structure

**Files:**
- Create: `astro_lsp/.claude-plugin/plugin.json`
- Create: `astro_lsp/.claude-plugin/marketplace.json`
- Create: `astro_lsp/README.md`

- [ ] **Step 1: Create .claude-plugin directory**

```bash
mkdir -p /mnt/e/bigo.bio/astro_lsp/.claude-plugin
```

- [ ] **Step 2: Create plugin.json with metadata**

Create `/mnt/e/bigo.bio/astro_lsp/.claude-plugin/plugin.json`:

```json
{
  "name": "astro-lsp",
  "description": "Astro language server for .astro files",
  "version": "1.0.0",
  "author": {
    "name": "Local Project"
  }
}
```

- [ ] **Step 3: Create marketplace.json with LSP server configuration**

Create `/mnt/e/bigo.bio/astro_lsp/.claude-plugin/marketplace.json`:

```json
{
  "$schema": "https://anthropic.com/claude-code/marketplace.schema.json",
  "name": "astro-lsp-local",
  "description": "Astro language server for .astro files",
  "owner": {
    "name": "Local Project"
  },
  "plugins": [
    {
      "name": "astro-lsp",
      "source": "./",
      "description": "Astro language server for .astro files",
      "version": "1.0.0",
      "author": {
        "name": "Local Project"
      },
      "category": "development",
      "lspServers": {
        "astro": {
          "command": "astro-ls",
          "args": ["--stdio"],
          "extensionToLanguage": {
            ".astro": "astro"
          }
        }
      }
    }
  ]
}
```

- [ ] **Step 4: Create README.md with documentation**

Create `/mnt/e/bigo.bio/astro_lsp/README.md`:

```markdown
# astro-lsp

Astro language server for Claude Code, providing code intelligence features for `.astro` files.

## Supported Extensions
`.astro`

## Installation

Install the Astro language server globally via npm:

```bash
npm install -g @astrojs/language-server
```

Or with yarn:

```bash
yarn global add @astrojs/language-server
```

## Usage

1. Install the plugin in Claude Code:
   ```
   /plugin install ./astro_lsp
   ```

2. Open any `.astro` file in Claude Code

3. The Astro language server will automatically start and provide:
   - Diagnostics (errors, warnings)
   - Completions
   - Hover information
   - Go-to-definition
   - Find references

## More Information
- [@astrojs/language-server on npm](https://www.npmjs.com/package/@astrojs/language-server)
- [GitHub Repository](https://github.com/withastro/astro/tree/main/packages/language-tools/language-server)
```

- [ ] **Step 5: Verify directory structure**

```bash
ls -la /mnt/e/bigo.bio/astro_lsp/
ls -la /mnt/e/bigo.bio/astro_lsp/.claude-plugin/
```

Expected output:
```
astro_lsp/
├── .claude-plugin/
│   ├── marketplace.json
│   └── plugin.json
└── README.md
```

- [ ] **Step 6: Commit initial plugin structure**

```bash
cd /mnt/e/bigo.bio
git add astro_lsp/
git commit -m "feat: create Astro LSP plugin structure

Add minimal LSP plugin for Claude Code with astro-ls server configuration.
Includes plugin metadata, marketplace config, and README documentation."
```

---

## Task 2: Validate Plugin Configuration

**Files:**
- Read: `astro_lsp/.claude-plugin/plugin.json`
- Read: `astro_lsp/.claude-plugin/marketplace.json`

- [ ] **Step 1: Validate plugin.json structure**

```bash
cat /mnt/e/bigo.bio/astro_lsp/.claude-plugin/plugin.json | python3 -m json.tool
```

Expected: Valid JSON with name, description, version, author fields

- [ ] **Step 2: Validate marketplace.json structure**

```bash
cat /mnt/e/bigo.bio/astro_lsp/.claude-plugin/marketplace.json | python3 -m json.tool
```

Expected: Valid JSON with $schema, name, description, owner, plugins fields

- [ ] **Step 3: Validate LSP server configuration**

```bash
cat /mnt/e/bigo.bio/astro_lsp/.claude-plugin/marketplace.json | python3 -c "
import sys, json
data = json.load(sys.stdin)
plugins = data.get('plugins', [])
for p in plugins:
    lsp = p.get('lspServers', {})
    print(f'Plugin: {p[\"name\"]}')
    for server_name, config in lsp.items():
        print(f'  Server: {server_name}')
        print(f'  Command: {config[\"command\"]}')
        print(f'  Args: {config[\"args\"]}')
        print(f'  Extensions: {list(config[\"extensionToLanguage\"].keys())}')
"
```

Expected output:
```
Plugin: astro-lsp
  Server: astro
  Command: astro-ls
  Args: ['--stdio']
  Extensions: ['.astro']
```

- [ ] **Step 4: Commit validation fixes (if needed)**

If any validation issues were found and fixed:

```bash
cd /mnt/e/bigo.bio
git add astro_lsp/
git commit -m "fix: correct Astro LSP plugin configuration"
```

---

## Task 3: Test Plugin Installation

**Files:**
- Modify: `/home/dawn/.claude/settings.json` (or project settings)

- [ ] **Step 1: Check if astro-ls is available**

```bash
which astro-ls || echo "astro-ls not found in PATH"
```

If not found, install:
```bash
npm install -g @astrojs/language-server
```

- [ ] **Step 2: Test plugin installation command**

In Claude Code, run:
```
/plugin install ./astro_lsp
```

Expected: Plugin installs successfully

- [ ] **Step 3: Verify plugin appears in installed plugins**

Check `/home/dawn/.claude/plugins/installed_plugins.json` for astro-lsp entry

- [ ] **Step 4: Enable plugin in settings**

Add to project settings (`.claude/settings.json`):
```json
{
  "enabledPlugins": {
    "astro-lsp@local": true
  }
}
```

- [ ] **Step 5: Commit settings changes**

```bash
cd /mnt/e/bigo.bio
git add .claude/settings.json
git commit -m "chore: enable Astro LSP plugin in project settings"
```

---

## Task 4: Test LSP Functionality

**Files:**
- Test: Any `.astro` file in the project (e.g., `src/pages/index.astro`)

- [ ] **Step 1: Open an .astro file in Claude Code**

Open `src/pages/index.astro` or any other `.astro` file

- [ ] **Step 2: Verify language server starts**

Check Claude Code output/logs for astro-ls startup message

- [ ] **Step 3: Test diagnostics**

Introduce a syntax error in an `.astro` file and verify diagnostics appear

- [ ] **Step 4: Test completions**

Type `<` in an `.astro` file and verify completions appear

- [ ] **Step 5: Test hover information**

Hover over an Astro component and verify information appears

- [ ] **Step 6: Test go-to-definition**

Ctrl+click on an import and verify navigation works

- [ ] **Step 7: Commit test results**

```bash
cd /mnt/e/bigo.bio
git add -A
git commit -m "test: validate Astro LSP plugin functionality"
```

---

## Task 5: Final Documentation and Cleanup

**Files:**
- Modify: `astro_lsp/README.md`
- Create: `docs/superpowers/specs/2026-05-28-astro-lsp-plugin-design.md` (already done)

- [ ] **Step 1: Update README with any findings**

Update `astro_lsp/README.md` with any additional information learned during testing

- [ ] **Step 2: Verify all files are committed**

```bash
cd /mnt/e/bigo.bio
git status
```

Expected: No uncommitted changes

- [ ] **Step 3: Create final commit**

```bash
cd /mnt/e/bigo.bio
git add -A
git commit -m "docs: finalize Astro LSP plugin documentation"
```

---

## Self-Review Checklist

- [ ] All files have exact paths
- [ ] All code blocks are complete (no placeholders)
- [ ] All commands have expected outputs
- [ ] All steps are 2-5 minutes each
- [ ] No "TBD", "TODO", or "implement later"
- [ ] Types and names are consistent across tasks
- [ ] Each task produces self-contained changes
- [ ] Spec requirements are covered by tasks
