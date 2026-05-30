# Component Refactoring & Style Deduplication Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate redundant styles, extract shared utilities, decouple navigation from hardcoded routes, and organize components by function.

**Architecture:** Components move into `ui/`, `layout/`, `sections/`, `cards/`, `features/` subdirectories. A new `shared.css` provides reusable utility classes. A `navigation.ts` config file becomes the single source of truth for nav items.

**Tech Stack:** Astro, CSS (global + shared utilities), TypeScript

---

## File Map

### Create
- `src/styles/shared.css` — shared utility classes
- `src/data/navigation.ts` — navigation config

### Modify
- `src/styles/global.css` — add design tokens
- `src/layouts/Layout.astro` — update import paths
- All 17 components — move + style cleanup
- All 16 pages — update import paths
- All 10 component tests — update file paths
- `src/tests/navbar.test.ts` — update path + adjust assertions
- `src/tests/bda-pages.test.ts` — update import path assertions

---

## Task 1: Create directory structure and shared.css

**Files:**
- Create: `src/styles/shared.css`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Create the component subdirectories**

```bash
mkdir -p src/components/{ui,layout,sections,cards,features}
```

- [ ] **Step 2: Create `src/styles/shared.css`**

```css
/* Shared Utility Classes */

/* Label typography — used by 8+ components */
.label-text {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.875rem;
}

/* Card base layout — used by ApplicationCard, CTACard, SDGCard */
.card-base {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: var(--color-white);
}

/* Common transition */
.transition-base {
  transition: all 0.2s ease;
}

/* Grayscale image hover effect — used by ProductCard, TeamMember */
.hover-grayscale :global(img) {
  filter: grayscale(100%);
  transition: filter 0.4s ease-in-out;
}

.hover-grayscale:hover :global(img),
.hover-grayscale:focus :global(img) {
  filter: grayscale(0%);
}

/* Border-grow hover effect — used by ProductCard, TeamMember */
.hover-border-grow {
  position: relative;
  overflow: clip;
}

.hover-border-grow::after {
  content: '';
  position: absolute;
  inset: 0;
  border: 0 solid var(--color-black);
  pointer-events: none;
  transition: all 0.2s ease-in-out;
  z-index: 2;
}

.hover-border-grow:hover::after,
.hover-border-grow:focus::after {
  border-width: 4px;
}

.hover-border-grow:hover,
.hover-border-grow:focus {
  z-index: 10;
}
```

- [ ] **Step 3: Add design tokens to `src/styles/global.css`**

Add to the `:root` block after the Typography section:

```css
  /* Font Families */
  --font-family-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

  /* Z-Index Scale */
  --z-index-dropdown: 100;
  --z-index-card-hover: 10;
  --z-index-navbar: 1000;
  --z-index-overlay: 1500;
  --z-index-mobile-panel: 2000;
```

- [ ] **Step 4: Import shared.css in Layout.astro**

Add after the existing global.css import:

```astro
import '../styles/shared.css';
```

- [ ] **Step 5: Verify build compiles**

```bash
bunx astro build
```

Expected: Build succeeds (no broken imports yet).

- [ ] **Step 6: Commit**

```bash
git add src/styles/shared.css src/styles/global.css src/layouts/Layout.astro
git commit -m "feat: add shared.css utility classes and design tokens"
```

---

## Task 2: Create navigation config

**Files:**
- Create: `src/data/navigation.ts`

- [ ] **Step 1: Create `src/data/navigation.ts`**

```ts
export interface NavItem {
  href: string;
  labelKey: string;
  descKey?: string;
}

export interface NavSection {
  labelKey: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    labelKey: 'nav.bda',
    items: [
      { href: '/bda', labelKey: 'nav.bda.overview', descKey: 'nav.bda.overview.desc' },
      { href: '/bda/workflow', labelKey: 'nav.bda.workflow', descKey: 'nav.bda.workflow.desc' },
    ],
  },
  {
    labelKey: 'nav.pipeline',
    items: [
      { href: '/pipeline', labelKey: 'nav.pipeline.overview', descKey: 'nav.pipeline.overview.desc' },
      { href: '/pipeline/bp-326', labelKey: 'nav.pipeline.bp326', descKey: 'nav.pipeline.bp326.desc' },
      { href: '/pipeline/ribh', labelKey: 'nav.pipeline.ribh', descKey: 'nav.pipeline.ribh.desc' },
      { href: '/pipeline/cd3', labelKey: 'nav.pipeline.cd3', descKey: 'nav.pipeline.cd3.desc' },
    ],
  },
];

const standaloneLinks: NavItem[] = [
  { href: '/about', labelKey: 'nav.about' },
  { href: '#', labelKey: 'nav.blog' },
];

const footerLinks: NavItem[] = [
  { href: '/about', labelKey: 'nav.about' },
  { href: '#', labelKey: 'nav.blog' },
  { href: '/bda', labelKey: 'nav.bda' },
];

function prefixLang(href: string, lang: 'en' | 'zh'): string {
  if (lang === 'zh') {
    return href === '/' ? '/zh/' : `/zh${href}`;
  }
  return href;
}

export function getNavigation(lang: 'en' | 'zh'): NavSection[] {
  return navSections.map(section => ({
    ...section,
    items: section.items.map(item => ({
      ...item,
      href: prefixLang(item.href, lang),
    })),
  }));
}

export function getStandaloneLinks(lang: 'en' | 'zh'): NavItem[] {
  return standaloneLinks.map(item => ({
    ...item,
    href: prefixLang(item.href, lang),
  }));
}

export function getFooterLinks(lang: 'en' | 'zh'): NavItem[] {
  return footerLinks.map(item => ({
    ...item,
    href: prefixLang(item.href, lang),
  }));
}
```

- [ ] **Step 2: Verify build compiles**

```bash
bunx astro build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/data/navigation.ts
git commit -m "feat: add navigation config as single source of truth"
```

---

## Task 3: Move and refactor ui/ components

**Files:**
- Move: `src/components/Button.astro` → `src/components/ui/Button.astro`
- Move: `src/components/MetricCard.astro` → `src/components/ui/MetricCard.astro`
- Move: `src/components/NavLink.astro` → `src/components/ui/NavLink.astro`
- Move: `src/components/LanguageToggle.astro` → `src/components/ui/LanguageToggle.astro`

- [ ] **Step 1: Move files**

```bash
mv src/components/Button.astro src/components/ui/Button.astro
mv src/components/MetricCard.astro src/components/ui/MetricCard.astro
mv src/components/NavLink.astro src/components/ui/NavLink.astro
mv src/components/LanguageToggle.astro src/components/ui/LanguageToggle.astro
```

- [ ] **Step 2: Refactor MetricCard — use `--color-swiss-red` directly**

In `src/components/ui/MetricCard.astro`, the `.metric-value` style already uses `var(--color-swiss-red)` without fallback — no change needed. This component is clean.

- [ ] **Step 3: Refactor NavLink — use `--z-index-dropdown` token**

In `src/components/ui/NavLink.astro`, no z-index is used. No change needed.

- [ ] **Step 4: Refactor Button — no fallbacks to remove, already clean**

No changes needed to Button styles.

- [ ] **Step 5: Refactor LanguageToggle — no fallbacks to remove, already clean**

No changes needed to LanguageToggle styles.

- [ ] **Step 6: Verify build**

```bash
bunx astro build
```

Expected: Build will fail because imports haven't been updated yet. That's expected — we'll fix imports in a later task. For now, just verify the files moved correctly.

- [ ] **Step 7: Commit**

```bash
git add src/components/ui/
git rm -r src/components/Button.astro src/components/MetricCard.astro src/components/NavLink.astro src/components/LanguageToggle.astro
git commit -m "refactor: move ui components to ui/ subdirectory"
```

---

## Task 4: Move and refactor cards/ components

**Files:**
- Move: `src/components/ApplicationCard.astro` → `src/components/cards/ApplicationCard.astro`
- Move: `src/components/ProductCard.astro` → `src/components/cards/ProductCard.astro`
- Move: `src/components/SDGCard.astro` → `src/components/cards/SDGCard.astro`
- Move: `src/components/TeamMember.astro` → `src/components/cards/TeamMember.astro`

- [ ] **Step 1: Move files**

```bash
mv src/components/ApplicationCard.astro src/components/cards/ApplicationCard.astro
mv src/components/ProductCard.astro src/components/cards/ProductCard.astro
mv src/components/SDGCard.astro src/components/cards/SDGCard.astro
mv src/components/TeamMember.astro src/components/cards/TeamMember.astro
```

- [ ] **Step 2: Refactor ApplicationCard — use shared classes**

In `src/components/cards/ApplicationCard.astro`, replace the `.app-card` style:

```css
    .app-card {
        composes: card-base from '../styles/shared.css';
        composes: transition-base from '../styles/shared.css';
        text-decoration: none;
        color: inherit;
    }
```

Wait — Astro doesn't support `composes` in scoped styles. Instead, add the shared classes to the HTML markup:

Change line 12 from:
```astro
<Tag href={href} class:list={['app-card', 'outline', { 'app-card--link': href }]}>
```
to:
```astro
<Tag href={href} class:list={['app-card', 'card-base', 'transition-base', 'outline', { 'app-card--link': href }]}>
```

Then remove the duplicate properties from `.app-card`:

```css
    .app-card {
        text-decoration: none;
        color: inherit;
    }
```

Remove the `transition` from `.app-card-arrow` since parent handles it — actually `.app-card-arrow` has its own `transform` transition, keep it.

- [ ] **Step 3: Refactor SDGCard — use shared classes, remove fallbacks**

In `src/components/cards/SDGCard.astro`, update markup:

```astro
<div class="sdg-card card-base outline">
```

Update styles — remove duplicate properties and fallbacks:

```css
  .sdg-card {
    border-radius: 0;
  }

  .label {
    font-size: 0.875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-grey-600);
  }

  .sdg-card h3 {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--color-black);
    margin: 0;
  }

  .sdg-card p {
    color: var(--color-grey-600);
    line-height: 1.6;
    margin: 0;
  }
```

Note: Removed `border: 1px solid var(--color-black, #000)` since `.outline` handles it. Removed `padding`, `display`, `flex-direction`, `gap`, `background` since `.card-base` handles them. Removed redundant fallbacks.

- [ ] **Step 4: Refactor CTACard — use shared classes, remove fallbacks**

In `src/components/cards/CTACard.astro` — wait, CTACard is in `sections/` per the directory plan. Let me re-check...

Actually, looking at the spec again, CTACard is in `sections/`. Let me move it there instead. But first, let me continue with the cards that are correct.

- [ ] **Step 5: Refactor ProductCard — use shared hover classes, remove fallbacks**

In `src/components/cards/ProductCard.astro`, update markup:

```astro
<a href={href} class="product-card grid-item outline hover-border-grow">
```

Update styles — remove redundant border-grow and fallbacks:

```css
  .product-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: minmax(300px, auto);
    text-decoration: none;
    color: inherit;
    border-radius: 0;
    background: var(--color-white);
    transition: all 0.2s ease-in-out;
  }

  .product-card::after {
    border: 0 solid var(--color-black);
  }

  .product-card:hover::after,
  .product-card:focus::after {
    border-width: 4px;
  }

  .content-side {
    padding: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.5rem;
    border-right: 1px solid var(--color-black);
  }

  .label {
    font-size: 0.875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-swiss-red);
  }

  .content-side h3 {
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    font-weight: 800;
    margin: 0;
  }

  .content-side p {
    font-size: 1.125rem;
    line-height: 1.6;
    color: var(--color-grey-800);
    margin: 0;
  }

  .image-side {
    background: var(--color-grey-100);
    align-self: stretch;
    min-height: 0;
    position: relative;
    overflow: clip;
  }

  .image-side :global(img) {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%);
    transition: filter 0.4s ease-in-out;
  }

  .product-card:hover .image-side :global(img),
  .product-card:focus .image-side :global(img) {
    filter: grayscale(0%);
  }

  .placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-grey-500);
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .product-card {
      grid-template-columns: 1fr;
    }
    .content-side {
      border-right: none;
      border-bottom: 1px solid var(--color-black);
      padding: 2rem;
    }
    .image-side {
      height: 250px;
      min-height: 250px;
    }
  }
```

Wait — I need to reconsider. The `.hover-border-grow` class uses `::after` but ProductCard already defines its own `::after` with `border: 0 solid var(--color-black)`. The shared class sets `border: 0 solid var(--color-black)` too, so they'd conflict. Let me keep the component's own `::after` and just use the class for the `position: relative; overflow: clip` part, and the hover z-index.

Actually, looking more carefully, the shared `.hover-border-grow` class defines the full `::after` pseudo-element. The component's own `::after` overrides would conflict. Let me not use `.hover-border-grow` on ProductCard and TeamMember — instead, keep their own hover styles but just remove the fallbacks. The shared class can be used by future components that need the same pattern.

- [ ] **Step 5 (revised): Refactor ProductCard — remove fallbacks only**

In `src/components/cards/ProductCard.astro`, remove all redundant fallbacks:

```css
  .product-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: minmax(300px, auto);
    text-decoration: none;
    color: inherit;
    border: 1px solid var(--color-black);
    border-radius: 0;
    background: var(--color-white);
    transition: all 0.2s ease-in-out;
    position: relative;
    overflow: clip;
  }

  .product-card:hover,
  .product-card:focus {
    z-index: 10;
  }

  .product-card::after {
    content: '';
    position: absolute;
    inset: 0;
    border: 0 solid var(--color-black);
    pointer-events: none;
    transition: all 0.2s ease-in-out;
    z-index: 2;
  }

  .product-card:hover::after,
  .product-card:focus::after {
    border-width: 4px;
  }

  .content-side {
    padding: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.5rem;
    border-right: 1px solid var(--color-black);
  }

  .label {
    font-size: 0.875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-swiss-red);
  }

  .content-side h3 {
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    font-weight: 800;
    margin: 0;
  }

  .content-side p {
    font-size: 1.125rem;
    line-height: 1.6;
    color: var(--color-grey-800);
    margin: 0;
  }

  .image-side {
    background: var(--color-grey-100);
    align-self: stretch;
    min-height: 0;
    position: relative;
    overflow: clip;
  }

  .image-side :global(img) {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%);
    transition: filter 0.4s ease-in-out;
  }

  .product-card:hover .image-side :global(img),
  .product-card:focus .image-side :global(img) {
    filter: grayscale(0%);
  }

  .placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-grey-500);
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .product-card {
      grid-template-columns: 1fr;
    }
    .content-side {
      border-right: none;
      border-bottom: 1px solid var(--color-black);
      padding: 2rem;
    }
    .image-side {
      height: 250px;
      min-height: 250px;
    }
  }
```

- [ ] **Step 6: Refactor TeamMember — remove fallbacks**

`src/components/cards/TeamMember.astro` has no redundant fallbacks (already uses `var(--color-black)` without fallback). No style changes needed.

- [ ] **Step 7: Commit**

```bash
git add src/components/cards/
git commit -m "refactor: move cards to cards/ and remove redundant fallbacks"
```

---

## Task 5: Move and refactor sections/ components

**Files:**
- Move: `src/components/Hero.astro` → `src/components/sections/Hero.astro`
- Move: `src/components/PlatformStatement.astro` → `src/components/sections/PlatformStatement.astro`
- Move: `src/components/CTACard.astro` → `src/components/sections/CTACard.astro`

- [ ] **Step 1: Move files**

```bash
mv src/components/Hero.astro src/components/sections/Hero.astro
mv src/components/PlatformStatement.astro src/components/sections/PlatformStatement.astro
mv src/components/CTACard.astro src/components/sections/CTACard.astro
```

- [ ] **Step 2: Refactor PlatformStatement — remove fallbacks**

In `src/components/sections/PlatformStatement.astro`, remove redundant fallbacks:

```css
  .platform-statement {
    margin: 4rem 0;
    max-width: 66%;
  }

  .platform-statement h2 {
    font-size: clamp(2rem, 4vw, 3.5rem);
    line-height: 1.2;
    font-weight: 300;
    color: var(--color-black);
  }

  .platform-statement h2 :global(em) {
    font-style: normal;
    font-weight: 800;
    color: var(--color-swiss-red);
  }

  @media (max-width: 768px) {
    .platform-statement {
      max-width: 100%;
    }
  }
```

- [ ] **Step 3: Refactor CTACard — use shared classes, remove fallbacks**

In `src/components/sections/CTACard.astro`, update markup:

```astro
<a href={href} class="cta-card card-base outline scroll-reveal">
```

Update styles — remove duplicate properties and fallbacks:

```css
  .cta-card {
    border-radius: 0;
    text-decoration: none;
    color: inherit;
    position: relative;
    transition: all 0.2s ease-in-out;
  }

  .cta-card:hover,
  .cta-card:focus {
    background: var(--color-black);
    color: var(--color-white);
  }

  .label {
    font-size: 0.875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-grey-600);
  }

  .cta-card:hover .label {
    color: var(--color-grey-400);
  }

  .cta-card h3 {
    font-size: 1.5rem;
    font-weight: 800;
    margin: 0;
  }

  .cta-card p {
    color: var(--color-swiss-red);
    margin: 0;
    font-weight: 600;
  }

  .icon-arrow {
    margin-top: auto;
    font-size: 1.5rem;
    font-weight: 800;
    align-self: flex-end;
  }
```

- [ ] **Step 4: Refactor Hero — update import path for Button**

In `src/components/sections/Hero.astro`, update the Button import:

```astro
import Button from '../ui/Button.astro';
```

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/
git commit -m "refactor: move sections to sections/ and clean up fallbacks"
```

---

## Task 6: Move and refactor layout/ components

**Files:**
- Move: `src/components/Navbar.astro` → `src/components/layout/Navbar.astro`
- Move: `src/components/Footer.astro` → `src/components/layout/Footer.astro`
- Move: `src/components/PipelineShell.astro` → `src/components/layout/PipelineShell.astro`
- Move: `src/components/DropdownNav.astro` → `src/components/layout/DropdownNav.astro`

- [ ] **Step 1: Move files**

```bash
mv src/components/Navbar.astro src/components/layout/Navbar.astro
mv src/components/Footer.astro src/components/layout/Footer.astro
mv src/components/PipelineShell.astro src/components/layout/PipelineShell.astro
mv src/components/DropdownNav.astro src/components/layout/DropdownNav.astro
```

- [ ] **Step 2: Refactor Navbar — use navigation config**

In `src/components/layout/Navbar.astro`, replace the hardcoded routes with the config:

Replace the frontmatter section (lines 1-13) with:

```astro
---
import { getTranslations } from '../../i18n/utils';
import { getNavigation, getStandaloneLinks } from '../../data/navigation';
import NavLink from '../ui/NavLink.astro';
import LanguageToggle from '../ui/LanguageToggle.astro';
import DropdownNav from './DropdownNav.astro';

interface Props {
    lang: 'en' | 'zh';
}

const { lang } = Astro.props;
const t = getTranslations(lang);
const navSections = getNavigation(lang);
const standalone = getStandaloneLinks(lang);
---
```

Replace the desktop nav-links section (lines 22-43) with:

```astro
            <div class="nav-links desktop-only">
                {navSections.map((section) => (
                    <DropdownNav
                        label={t(section.labelKey)}
                        lang={lang}
                        items={section.items.map((item) => ({
                            href: item.href,
                            label: t(item.labelKey),
                            description: item.descKey ? t(item.descKey) : undefined,
                        }))}
                    />
                ))}
                {standalone.map((link) => (
                    <NavLink href={link.href}>{t(link.labelKey)}</NavLink>
                ))}
            </div>
```

Replace the mobile-links section (lines 61-73) with:

```astro
    <div class="mobile-links">
        {navSections.map((section) => (
            <>
                <div class="mobile-section-label">{t(section.labelKey)}</div>
                {section.items.map((item) => (
                    <NavLink href={item.href} class="mobile-nav-item">{t(item.labelKey)}</NavLink>
                ))}
            </>
        ))}
        <div class="mobile-section-label"> </div>
        {standalone.map((link) => (
            <NavLink href={link.href} class="mobile-nav-item">{t(link.labelKey)}</NavLink>
        ))}
    </div>
```

- [ ] **Step 3: Refactor Footer — use navigation config**

In `src/components/layout/Footer.astro`, replace the frontmatter (lines 1-10) with:

```astro
---
import { getTranslations } from '../../i18n/utils';
import { getFooterLinks } from '../../data/navigation';
import NavLink from '../ui/NavLink.astro';

interface Props {
    lang: 'en' | 'zh';
}

const { lang } = Astro.props;
const t = getTranslations(lang);
const footerLinksData = getFooterLinks(lang);
---
```

Replace the footer-links section (lines 21-25) with:

```astro
            <div class="footer-links">
                {footerLinksData.map((link) => (
                    <NavLink href={link.href}>{t(link.labelKey)}</NavLink>
                ))}
            </div>
```

- [ ] **Step 4: Refactor Navbar — use z-index tokens**

In `src/components/layout/Navbar.astro`, replace hardcoded z-index values:

- Line `z-index: 1000;` → `z-index: var(--z-index-navbar);`
- Line `z-index: 1500;` → `z-index: var(--z-index-overlay);`
- Line `z-index: 2000;` → `z-index: var(--z-index-mobile-panel);`

- [ ] **Step 5: Refactor DropdownNav — use z-index token**

In `src/components/layout/DropdownNav.astro`, replace:

- `z-index: 100;` → `z-index: var(--z-index-dropdown);`

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/
git commit -m "refactor: move layout to layout/ and use navigation config"
```

---

## Task 7: Move and refactor features/ components

**Files:**
- Move: `src/components/ParticleAnimation.astro` → `src/components/features/ParticleAnimation.astro`
- Move: `src/components/WorkflowStep.astro` → `src/components/features/WorkflowStep.astro`

- [ ] **Step 1: Move files**

```bash
mv src/components/ParticleAnimation.astro src/components/features/ParticleAnimation.astro
mv src/components/WorkflowStep.astro src/components/features/WorkflowStep.astro
```

- [ ] **Step 2: Refactor WorkflowStep — use `--font-family-mono` token**

In `src/components/features/WorkflowStep.astro`, replace line 74:

```css
        font-family: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;
```

with:

```css
        font-family: var(--font-family-mono);
```

- [ ] **Step 3: Commit**

```bash
git add src/components/features/
git commit -m "refactor: move features to features/ and use mono font token"
```

---

## Task 8: Update Layout.astro imports

**Files:**
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: Update Layout.astro imports**

Change lines 3-4 from:

```astro
import Navbar from '../components/Navbar.astro';
import Footer from '../components/Footer.astro';
```

to:

```astro
import Navbar from '../components/layout/Navbar.astro';
import Footer from '../components/layout/Footer.astro';
```

- [ ] **Step 2: Verify build**

```bash
bunx astro build
```

Expected: Layout imports resolve, but page imports will still fail.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "refactor: update Layout imports to new component paths"
```

---

## Task 9: Update all page imports

**Files:**
- Modify: 16 page files across `src/pages/` and `src/pages/zh/`

- [ ] **Step 1: Update English index page**

In `src/pages/index.astro`, update imports (lines 3-8):

```astro
import Hero from '../components/sections/Hero.astro';
import ParticleAnimation from '../components/features/ParticleAnimation.astro';
import SDGCard from '../components/cards/SDGCard.astro';
import PlatformStatement from '../components/sections/PlatformStatement.astro';
import ProductCard from '../components/cards/ProductCard.astro';
import CTACard from '../components/sections/CTACard.astro';
```

- [ ] **Step 2: Update English about page**

In `src/pages/about.astro`, update import (line 3):

```astro
import TeamMember from '../components/cards/TeamMember.astro';
```

- [ ] **Step 3: Update English BDA index page**

In `src/pages/bda/index.astro`, update imports (lines 3-4):

```astro
import ApplicationCard from '../../components/cards/ApplicationCard.astro';
import MetricCard from '../../components/ui/MetricCard.astro';
```

- [ ] **Step 4: Update English BDA workflow page**

In `src/pages/bda/workflow.astro`, update import (line 3):

```astro
import WorkflowStep from '../../components/features/WorkflowStep.astro';
```

- [ ] **Step 5: Update English pipeline index page**

In `src/pages/pipeline/index.astro`, update imports (lines 3-4):

```astro
import MetricCard from '../../components/ui/MetricCard.astro';
import ProductCard from '../../components/cards/ProductCard.astro';
```

- [ ] **Step 6: Update English pipeline detail pages**

In `src/pages/pipeline/bp-326.astro`, update imports (lines 3-4):

```astro
import PipelineShell from '../../components/layout/PipelineShell.astro';
import MetricCard from '../../components/ui/MetricCard.astro';
```

In `src/pages/pipeline/cd3.astro`, update import (line 3):

```astro
import PipelineShell from '../../components/layout/PipelineShell.astro';
```

In `src/pages/pipeline/ribh.astro`, update import (line 3):

```astro
import PipelineShell from '../../components/layout/PipelineShell.astro';
```

- [ ] **Step 7: Update Chinese index page**

In `src/pages/zh/index.astro`, update imports (lines 3-8):

```astro
import Hero from '../../components/sections/Hero.astro';
import ParticleAnimation from '../../components/features/ParticleAnimation.astro';
import SDGCard from '../../components/cards/SDGCard.astro';
import PlatformStatement from '../../components/sections/PlatformStatement.astro';
import ProductCard from '../../components/cards/ProductCard.astro';
import CTACard from '../../components/sections/CTACard.astro';
```

- [ ] **Step 8: Update Chinese about page**

In `src/pages/zh/about.astro`, update import (line 3):

```astro
import TeamMember from '../../components/cards/TeamMember.astro';
```

- [ ] **Step 9: Update Chinese BDA pages**

In `src/pages/zh/bda/index.astro`, update imports (lines 3-4):

```astro
import ApplicationCard from '../../../components/cards/ApplicationCard.astro';
import MetricCard from '../../../components/ui/MetricCard.astro';
```

In `src/pages/zh/bda/workflow.astro`, update import (line 3):

```astro
import WorkflowStep from '../../../components/features/WorkflowStep.astro';
```

- [ ] **Step 10: Update Chinese pipeline pages**

In `src/pages/zh/pipeline/index.astro`, update imports (lines 3-4):

```astro
import MetricCard from '../../../components/ui/MetricCard.astro';
import ProductCard from '../../../components/cards/ProductCard.astro';
```

In `src/pages/zh/pipeline/bp-326.astro`, update imports (lines 3-4):

```astro
import PipelineShell from '../../../components/layout/PipelineShell.astro';
import MetricCard from '../../../components/ui/MetricCard.astro';
```

In `src/pages/zh/pipeline/cd3.astro`, update import (line 3):

```astro
import PipelineShell from '../../../components/layout/PipelineShell.astro';
```

In `src/pages/zh/pipeline/ribh.astro`, update import (line 3):

```astro
import PipelineShell from '../../../components/layout/PipelineShell.astro';
```

- [ ] **Step 11: Verify build**

```bash
bunx astro build
```

Expected: Build succeeds with all imports resolved.

- [ ] **Step 12: Commit**

```bash
git add src/pages/
git commit -m "refactor: update all page imports to new component paths"
```

---

## Task 10: Update test file paths

**Files:**
- Modify: `src/tests/navbar.test.ts`
- Modify: `src/tests/bda-pages.test.ts`
- Modify: `src/tests/components/ApplicationCard.test.ts`
- Modify: `src/tests/components/Button.test.ts`
- Modify: `src/tests/components/DropdownNav.test.ts`
- Modify: `src/tests/components/Hero.test.ts`
- Modify: `src/tests/components/LanguageToggle.test.ts`
- Modify: `src/tests/components/MetricCard.test.ts`
- Modify: `src/tests/components/NavLink.test.ts`
- Modify: `src/tests/components/PipelineShell.test.ts`
- Modify: `src/tests/components/WorkflowStep.test.ts`

- [ ] **Step 1: Update component test paths**

Each test uses `path.resolve(__dirname, '../../components/...')`. Update to include the new subdirectory:

- `ApplicationCard.test.ts` line 6: `'../../components/cards/ApplicationCard.astro'`
- `Button.test.ts` line 6: `'../../components/ui/Button.astro'`
- `DropdownNav.test.ts` line 6: `'../../components/layout/DropdownNav.astro'`
- `Hero.test.ts` line 6: `'../../components/sections/Hero.astro'`
- `LanguageToggle.test.ts` line 6: `'../../components/ui/LanguageToggle.astro'`
- `MetricCard.test.ts` line 6: `'../../components/ui/MetricCard.astro'`
- `NavLink.test.ts` line 6: `'../../components/ui/NavLink.astro'`
- `PipelineShell.test.ts` line 6: `'../../components/layout/PipelineShell.astro'`
- `WorkflowStep.test.ts` line 6: `'../../components/features/WorkflowStep.astro'`

- [ ] **Step 2: Update navbar.test.ts**

In `src/tests/navbar.test.ts`, update line 6:

```ts
  const navbarPath = path.resolve(__dirname, '../components/layout/Navbar.astro');
```

Update the import assertion on line 20:

```ts
    expect(navbarContent).toContain('import LanguageToggle from \'../ui/LanguageToggle.astro\'');
```

Update line 25:

```ts
    expect(navbarContent).toContain('import DropdownNav from \'./DropdownNav.astro\'');
```

- [ ] **Step 3: Update bda-pages.test.ts**

In `src/tests/bda-pages.test.ts`, update import path assertions:

Line 22:
```ts
      expect(content).toContain("import MetricCard from '../../components/ui/MetricCard.astro'");
```

Line 27:
```ts
      expect(content).toContain("import ApplicationCard from '../../components/cards/ApplicationCard.astro'");
```

Line 51:
```ts
      expect(content).toContain("import MetricCard from '../../../components/ui/MetricCard.astro'");
```

Line 56:
```ts
      expect(content).toContain("import ApplicationCard from '../../../components/cards/ApplicationCard.astro'");
```

- [ ] **Step 4: Run tests**

```bash
bunx vitest run
```

Expected: All tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/tests/
git commit -m "refactor: update test paths to match new component structure"
```

---

## Task 11: Final verification

- [ ] **Step 1: Run full test suite**

```bash
bunx vitest run
```

Expected: All tests pass.

- [ ] **Step 2: Run production build**

```bash
bunx astro build
```

Expected: Build succeeds with no errors.

- [ ] **Step 3: Run dev server and verify pages**

```bash
bunx astro dev
```

Check these pages render correctly:
- `/` (home)
- `/about`
- `/bda`
- `/bda/workflow`
- `/pipeline`
- `/pipeline/bp-326`
- `/zh/` (Chinese home)
- `/zh/about`

- [ ] **Step 4: Commit final state**

```bash
git add -A
git commit -m "refactor: complete component reorganization and style deduplication"
```
