# Component Refactoring & Style Deduplication

## Goal

Refactor the component system to eliminate redundant styles, improve reusability, and organize components by function.

## Component Directory Structure

```
src/components/
  ui/
    Button.astro
    MetricCard.astro
    NavLink.astro
    LanguageToggle.astro
  layout/
    Navbar.astro
    Footer.astro
    PipelineShell.astro
    DropdownNav.astro
  sections/
    Hero.astro
    PlatformStatement.astro
    CTACard.astro
  cards/
    ApplicationCard.astro
    ProductCard.astro
    SDGCard.astro
    TeamMember.astro
  features/
    ParticleAnimation.astro
    WorkflowStep.astro
```

## New Files

### `src/styles/shared.css`

Shared utility classes extracted from repeated patterns across components:

- `.label-text` — `font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.875rem` (used by 8 components)
- `.card-base` — `padding: 2rem; display: flex; flex-direction: column; gap: 1rem; background: var(--color-white)` (used by ApplicationCard, CTACard, SDGCard)
- `.hover-grayscale` — `filter: grayscale(100%); transition: filter 0.4s ease-in-out` + hover state (used by ProductCard, TeamMember)
- `.hover-border-grow` — border expansion hover effect via `::after` pseudo-element (used by ProductCard, TeamMember)
- `.transition-base` — `transition: all 0.2s ease` (used by 7 components)

### `src/data/navigation.ts`

Single source of truth for navigation items:

```ts
export interface NavItem {
  href: string;       // path without locale prefix
  labelKey: string;   // i18n translation key
  descKey: string;    // i18n translation key for description
}

export interface NavSection {
  labelKey: string;
  items: NavItem[];
}

export function getNavigation(lang: 'en' | 'zh'): NavSection[];
export function getFooterLinks(lang: 'en' | 'zh'): NavItem[];
```

## Style Cleanup Per Component

### Remove redundant CSS variable fallbacks

These variables are always defined in `:root`, so fallbacks are unnecessary:

- CTACard: `var(--color-black, #000)` → `var(--color-black)`, etc.
- ProductCard: `var(--color-grey-100, #f5f5f5)` → `var(--color-grey-100)`, etc.
- SDGCard: `var(--color-black, #000)` → `var(--color-black)`, etc.
- PlatformStatement: `var(--color-swiss-red, #ff0000)` → `var(--color-swiss-red)`, etc.

### Remove duplicate border declarations

CTACard, ProductCard, SDGCard all have `class="outline"` in markup but redeclare `border: 1px solid` in CSS. Remove the CSS border since `.outline` handles it.

### Use shared classes

Replace inline duplicate styles with shared classes from `shared.css`:

- ApplicationCard, CTACard, SDGCard: use `.card-base`
- ProductCard, TeamMember: use `.hover-grayscale` and `.hover-border-grow`
- Button, CTACard, DropdownNav, NavLink, PipelineShell, SDGCard, ProductCard, TeamMember: use `.label-text` where applicable
- ApplicationCard, Button, CTACard, DropdownNav, LanguageToggle, TeamMember, ProductCard: use `.transition-base`

### Add design tokens to `global.css`

- `--font-family-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace`
- `--z-index-dropdown: 100`
- `--z-index-navbar: 1000`
- `--z-index-overlay: 1500`
- `--z-index-mobile-panel: 2000`

## Import Path Updates

All 16 page files need updated import paths:

| Old path | New path |
|----------|----------|
| `'../components/Hero.astro'` | `'../components/sections/Hero.astro'` |
| `'../components/ParticleAnimation.astro'` | `'../components/features/ParticleAnimation.astro'` |
| `'../components/SDGCard.astro'` | `'../components/cards/SDGCard.astro'` |
| `'../components/PlatformStatement.astro'` | `'../components/sections/PlatformStatement.astro'` |
| `'../components/ProductCard.astro'` | `'../components/cards/ProductCard.astro'` |
| `'../components/CTACard.astro'` | `'../components/sections/CTACard.astro'` |
| `'../components/TeamMember.astro'` | `'../components/cards/TeamMember.astro'` |
| `'../components/ApplicationCard.astro'` | `'../components/cards/ApplicationCard.astro'` |
| `'../components/MetricCard.astro'` | `'../components/ui/MetricCard.astro'` |
| `'../components/WorkflowStep.astro'` | `'../components/features/WorkflowStep.astro'` |
| `'../components/PipelineShell.astro'` | `'../components/layout/PipelineShell.astro'` |

## Cross-component imports

Components that import other components also need path updates:

- Layout.astro → Navbar, Footer (already correct via relative paths within same dir after move)
- Navbar.astro → NavLink, LanguageToggle, DropdownNav (update to sibling paths in layout/)
- Footer.astro → NavLink (update to `../ui/NavLink.astro`)

## Verification

1. Run `bunx astro build` to verify no broken imports
2. Run `bunx vitest run` to verify tests pass
3. Run `bunx astro dev` and visually verify all pages render correctly
