# Astro LSP Plugin for Claude Code

## Overview

A minimal LSP plugin for Claude Code that provides Astro language support for `.astro` files using `@astrojs/language-server` as the backend.

## Architecture

### Components

1. **Plugin Metadata** (`.claude-plugin/plugin.json`) - Defines plugin name, description, and author
2. **LSP Server Configuration** - Configures the `astro-ls` command with `--stdio` argument
3. **Extension Mapping** - Maps `.astro` files to the `astro` language identifier
4. **Documentation** (README.md) - Installation and usage instructions

### Data Flow

1. Claude Code detects `.astro` file
2. Plugin activates and starts `astro-ls` language server
3. Language server provides LSP features (diagnostics, completions, hover, go-to-definition)
4. Claude Code displays results to user

## Plugin Structure

```
astro_lsp/
├── .claude-plugin/
│   └── plugin.json      # Plugin metadata
└── README.md            # Documentation
```

### Plugin Metadata (plugin.json)

```json
{
  "name": "astro-lsp",
  "description": "Astro language server for .astro files",
  "author": {
    "name": "Local Project"
  }
}
```

### LSP Server Configuration

```json
{
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
```

## Installation

### Prerequisites

- `@astrojs/language-server` installed globally: `npm install -g @astrojs/language-server`

### Installation Steps

1. The plugin is in the project's `astro_lsp/` directory
2. Install via Claude Code: `/plugin install ./astro_lsp`
3. Or add to project settings as a local plugin

### Plugin Registration

The plugin will be registered in the project's `.claude/settings.json`:

```json
{
  "enabledPlugins": {
    "astro-lsp@local": true
  }
}
```

## Usage

1. Open any `.astro` file in Claude Code
2. The Astro language server will automatically start
3. Available LSP features:
   - Diagnostics (errors, warnings)
   - Completions
   - Hover information
   - Go-to-definition
   - Find references

## Testing and Validation

### Testing Strategy

1. **Manual Testing:**
   - Open a `.astro` file in Claude Code
   - Verify the language server starts
   - Test basic LSP features (diagnostics, completions, hover)

2. **Validation Checklist:**
   - [ ] Plugin loads without errors
   - [ ] `.astro` files are recognized
   - [ ] Diagnostics appear for errors
   - [ ] Completions work for Astro components
   - [ ] Hover information shows for symbols
   - [ ] Go-to-definition works

### Error Handling

- If `astro-ls` is not installed, show clear error message
- If language server fails to start, log error and disable plugin

## Design Decisions

1. **Minimal Plugin Approach:** Focus on core LSP features only, following the pattern of existing LSP plugins (typescript-lsp, pyright-lsp)
2. **Global astro-ls Command:** Use the globally installed `astro-ls` command for simplicity
3. **Local Project Plugin:** Create as a local plugin in the project's `astro_lsp/` directory
4. **Single Language Support:** Only support `.astro` files as per user requirements

## Alternatives Considered

1. **Plugin with Installation Script:** More complex, may conflict with project-local installation
2. **Plugin with Configuration:** More flexible but not needed for basic use
3. **Full Astro Project Support:** Includes TypeScript/JavaScript files, but user only needs `.astro` support

## Dependencies

- `@astrojs/language-server` (peer dependency, must be installed globally)
- Claude Code plugin system

## Future Enhancements

- Support for TypeScript/JavaScript files in Astro projects
- Configuration options for language server
- Custom commands for Astro development
- MCP server for extended functionality
