# BIGO BDA Platform

A promotional landing page for BIGO BDA, built with Astro and deployed on Cloudflare Workers.

## 🚀 Overview

bigo.bio is the digital front door for the company, highlighting visionary protein therapeutics and programmable biomaterials.

### Key Features
- **"Swiss Red" Design System:** Clean, professional aesthetic with strict right-angle geometry and modular grid.
- **Internationalization (i18n):** Native support for English and Simplified Chinese with automatic detection and manual overrides.
- **Atomic Architecture:** Pragmatic atomic design for reusable UI components.
- **3D Context Ready:** Extendable architecture for future 3D molecule rendering.

## 🛠️ Project Structure

```text
/
├── docs/               # Project documentation and design specs
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components (Button, NavLink, etc.)
│   ├── i18n/           # Translation files and utilities
│   ├── layouts/        # Page layouts
│   ├── pages/          # Astro routes
│   └── styles/         # Global CSS and design tokens
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project:

| Command | Action |
| :--- | :--- |
| `bun install` | Installs dependencies |
| `bun run dev` | Starts local dev server |
| `bun run build` | Build for production |
| `bun run test` | Run the full test suite with Vitest |

## 📖 Documentation

For more detailed information, check the [docs/](./docs/) directory:
- [Product Definition](./docs/product.md)
- [Design Guidelines](./docs/product-guidelines.md)
- [Component Documentation](./docs/components.md)
- [Tech Stack](./docs/tech-stack.md)
