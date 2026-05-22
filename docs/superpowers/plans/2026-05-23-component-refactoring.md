# Component Refactoring for Atomicity and Reusability Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the frontend codebase into reusable, atomized components following the 'Swiss Red' design system.

**Architecture:** Extraction of UI logic into atomic components (Button, NavLink, LanguageToggle) and section components (Hero). Use props for language and variants, and composition in the Navbar.

**Tech Stack:** Astro, TypeScript, CSS (Vanilla), Vitest.

---

### Task 1: Create Button Component

**Files:**
- Create: `src/components/Button.astro`
- Test: `src/tests/components/Button.test.ts` (New test file)

- [ ] **Step 1: Write unit tests for Button variants**

```typescript
import { describe, it, expect } from 'vitest';
// Note: We'll use simple string checks for Astro components in these tests
// or verify the rendered HTML if using a library like linkedom/jsdom

describe('Button', () => {
  it('should render a primary button with correct classes', () => {
    // Expected behavior: <button class="bg-swiss-red outline ...">
  });
  it('should render as an anchor if href is provided', () => {
    // Expected behavior: <a href="..." ...>
  });
});
```

- [ ] **Step 2: Implement the Button component**

```astro
---
interface Props {
	variant?: 'primary' | 'outline';
    href?: string;
    class?: string;
}

const { variant = 'primary', href, class: className, ...rest } = Astro.props;

const Element = href ? 'a' : 'button';
const baseClasses = "outline font-bold cursor-pointer transition-all duration-200 py-3 px-6 text-base tracking-wider uppercase inline-flex items-center justify-center";
const variantClasses = variant === 'primary' ? "bg-swiss-red text-white" : "bg-transparent text-black hover:bg-black hover:text-white";
---

<Element href={href} class:list={[baseClasses, variantClasses, className]} {...rest}>
    <slot />
</Element>
```

- [ ] **Step 3: Run existing design-system tests to ensure no regressions**

Run: `bun run test src/tests/design-system.test.ts`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/Button.astro
git commit -m "feat(ui): add atomic Button component"
```

### Task 2: Create NavLink Component

**Files:**
- Create: `src/components/NavLink.astro`

- [ ] **Step 1: Implement the NavLink component**

```astro
---
interface Props {
    href: string;
    class?: string;
}

const { href, class: className } = Astro.props;
---

<a href={href} class:list={["nav-link", className]}>
    <slot />
</a>

<style>
    .nav-link {
        text-decoration: none;
        color: var(--color-black);
        font-weight: 700;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        transition: all 0.2s ease;
        width: 160px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--color-black);
        margin-left: -1px;
    }

    .nav-link:hover {
        background-color: var(--color-swiss-red);
        color: var(--color-white);
    }

    @media (max-width: 1024px) {
        .nav-link {
            width: 120px;
        }
    }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/NavLink.astro
git commit -m "feat(ui): add atomic NavLink component"
```

### Task 3: Create LanguageToggle Component

**Files:**
- Create: `src/components/LanguageToggle.astro`

- [ ] **Step 1: Implement the LanguageToggle component**

```astro
---
interface Props {
    lang: 'en' | 'zh';
}

const { lang } = Astro.props;
---

<div class="lang-toggle outline">
    <a href="/" class={`lang-link ${lang === 'en' ? 'active' : ''}`} data-lang="en">EN</a>
    <span class="separator"></span>
    <a href="/zh/" class={`lang-link ${lang === 'zh' ? 'active' : ''}`} data-lang="zh">中文</a>
</div>

<style>
    .lang-toggle {
        display: flex;
        align-items: center;
        background-color: var(--color-white);
        font-size: 0.8rem;
        font-weight: 700;
        height: 40px;
    }

    .lang-link {
        text-decoration: none;
        color: var(--color-grey-500);
        width: 50px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
    }

    .lang-link.active {
        color: var(--color-white);
        background-color: var(--color-black);
    }

    .separator {
        width: 1px;
        height: 20px;
        background-color: var(--color-black);
    }
</style>

<script>
    document.querySelectorAll('.lang-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const lang = (e.currentTarget as HTMLElement).getAttribute('data-lang');
            if (lang) {
                document.cookie = `preferred-lang=${lang}; path=/; max-age=31536000`;
            }
        });
    });
</script>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/LanguageToggle.astro
git commit -m "feat(i18n): extract LanguageToggle component"
```

### Task 4: Refactor Navbar and Layout

**Files:**
- Modify: `src/components/Navbar.astro`
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: Update Navbar to use NavLink and LanguageToggle**

```astro
---
import { getTranslations } from '../i18n/utils';
import NavLink from './NavLink.astro';
import LanguageToggle from './LanguageToggle.astro';

interface Props {
    lang: 'en' | 'zh';
}

const { lang } = Astro.props;
const t = getTranslations(lang);
---

<nav class="navbar outline">
    <div class="grid-container">
        <div class="nav-content">
            <div class="nav-logo">
                <a href={lang === 'en' ? '/' : '/zh/'} class="logo-link">BIGO BDA</a>
            </div>
            
            <div class="nav-links desktop-only">
                <NavLink href="#">{t('nav.blog')}</NavLink>
                <NavLink href="#">{t('nav.studio')}</NavLink>
            </div>

            <div class="nav-actions">
                <LanguageToggle lang={lang} />
                <button id="mobile-toggle" class="mobile-only outline" aria-label="Toggle Menu">
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                    <span class="hamburger-line"></span>
                </button>
            </div>
        </div>
    </div>
</nav>
<!-- ... rest of mobile panel and script unchanged ... -->
```

- [ ] **Step 2: Remove script from Layout.astro (moved to LanguageToggle)**

```astro
---
// ... imports ...
---
<!doctype html>
<html lang={lang}>
    <!-- ... head ... -->
	<body>
        <Navbar lang={lang} />
		<slot />
        <!-- REMOVED SCRIPT HERE -->
	</body>
</html>
```

- [ ] **Step 3: Run navbar tests**

Run: `bun run test src/tests/navbar.test.ts`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.astro src/layouts/Layout.astro
git commit -m "refactor(ui): compose Navbar with atomic components and clean up Layout"
```

### Task 5: Create Hero Component and Refactor Pages

**Files:**
- Create: `src/components/Hero.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/pages/zh/index.astro`
- Modify: `src/components/ParticleAnimation.astro`

- [ ] **Step 1: Implement the Hero component**

```astro
---
import Button from './Button.astro';
import { getTranslations } from '../i18n/utils';

interface Props {
    lang: 'en' | 'zh';
}

const { lang } = Astro.props;
const t = getTranslations(lang);
---

<div class="hero-container">
    <div class="hero-text">
        <h1 class="text-swiss-red hero-title">{t('hero.title')}</h1>
        <p class="hero-subtitle">{t('hero.subtitle')}</p>
        <div class="hero-actions">
            <Button variant="primary">{t('hero.cta.start') || 'GET STARTED'}</Button>
            <Button variant="outline">{t('hero.cta.learn') || 'LEARN MORE'}</Button>
        </div>
    </div>
</div>

<style>
    .hero-container {
        margin-top: 10rem;
        display: flex;
        flex-direction: column;
        gap: 4rem;
    }

    .hero-text {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .hero-title {
        font-size: clamp(2rem, 8vw, 3.5rem);
        line-height: 1.1;
        font-weight: 800;
        max-width: 800px;
        overflow-wrap: break-word;
        word-wrap: break-word;
        hyphens: auto;
    }

    .hero-subtitle {
        font-size: clamp(1rem, 4vw, 1.25rem);
        max-width: 600px;
        color: var(--color-grey-800);
    }

    .hero-actions {
        display: flex;
        gap: 1rem;
    }

    @media (max-width: 640px) {
        .hero-container {
            margin-top: 6rem;
        }
    }
</style>
```

- [ ] **Step 2: Update index.astro to use Hero component**

```astro
---
import Layout from '../layouts/Layout.astro';
import ParticleAnimation from '../components/ParticleAnimation.astro';
import Hero from '../components/Hero.astro';
import { getTranslations } from '../i18n/utils';

const lang = 'en';
const t = getTranslations(lang);
---
<Layout title={t('site.title')} lang={lang}>
	<main class="grid-container" style="padding-bottom: 4rem;">
        <div class="grid-item">
            <Hero lang={lang} />
            <div style="margin-top: 4rem;">
                <ParticleAnimation />
            </div>
        </div>
	</main>
</Layout>
```

- [ ] **Step 3: Update zh/index.astro (similar refactor)**

- [ ] **Step 4: Update ParticleAnimation.astro hex to CSS Variable**

```typescript
// src/components/ParticleAnimation.astro script
draw() {
    this.ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-swiss-red').trim() || '#E60000';
    // ...
}
```

- [ ] **Step 5: Run all tests**

Run: `bun run test`
Expected: ALL PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/Hero.astro src/pages/index.astro src/pages/zh/index.astro src/components/ParticleAnimation.astro
git commit -m "refactor(ui): extract Hero section and clean up pages"
```
