# Technology Stack

## Infrastructure & Backend
- **Platform:** Cloudflare Workers
- **Deployment & Tooling:** Wrangler
- **Package Manager:** Bun
- **Language:** TypeScript

## Frontend
- **Framework:** Astro (SSR mode, deployed to Cloudflare Workers via @astrojs/cloudflare adapter).
- **Architecture:** Pragmatic Atomic Design (Atoms, Molecules, Organisms) for UI reusability.
- **Testing:** Vitest with JSDoc environment.
- **Internationalization:** Astro native i18n with custom middleware for cookie-based manual override.