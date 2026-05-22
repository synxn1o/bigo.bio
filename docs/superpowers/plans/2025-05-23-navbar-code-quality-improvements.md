# Navbar Code Quality Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve code quality, accessibility, and CSS maintainability in `Navbar.astro` and `NavLink.astro`.

**Architecture:**
- Use standard HTML `type="button"` for all button elements.
- Refactor CSS to use variables for flexible component overrides, removing `!important` and brittle `:global` overrides.

**Tech Stack:** Astro, CSS Variables.

---

### Task 1: Refactor NavLink to use CSS Variables

**Files:**
- Modify: `src/components/NavLink.astro`

- [ ] **Step 1: Update NavLink.astro styles**

```astro
<style>
    .nav-link {
        text-decoration: none;
        color: var(--color-black);
        font-weight: 700;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        transition: all 0.2s ease;
        width: var(--nav-link-width, 160px);
        height: var(--nav-link-height, 40px);
        padding: var(--nav-link-padding, 0);
        justify-content: var(--nav-link-justify, center);
        display: flex;
        align-items: center;
        border: 1px solid var(--color-black);
        margin-left: -1px;
    }

    .nav-link:hover {
        background-color: var(--color-swiss-red);
        color: var(--color-white);
    }

    .nav-link:focus-visible {
        outline: 2px solid var(--color-swiss-red);
        outline-offset: 2px;
    }

    @media (max-width: 1024px) {
        .nav-link {
            --nav-link-width: 120px;
        }
    }
</style>
```

- [ ] **Step 2: Commit changes**

```bash
git add src/components/NavLink.astro
git commit -m "refactor(ui): use CSS variables for NavLink dimensions"
```

---

### Task 2: Update Navbar Buttons and CSS Overrides

**Files:**
- Modify: `src/components/Navbar.astro`

- [ ] **Step 1: Add type="button" to buttons**

```astro
<!-- ... -->
                <button id="mobile-toggle" type="button" class="mobile-only outline" aria-label="Toggle Menu">
<!-- ... -->
<div id="mobile-panel" class="outline">
    <button id="close-panel" type="button" aria-label="Close Menu">✕</button>
<!-- ... -->
```

- [ ] **Step 2: Refactor CSS overrides in Navbar.astro**

Replace the `:global` block with:

```css
    .mobile-nav-item {
        --nav-link-width: 100%;
        --nav-link-height: auto;
        --nav-link-padding: 1rem;
        --nav-link-justify: flex-start;
        margin-left: 0;
        font-size: 1.25rem;
    }
```

- [ ] **Step 3: Run tests to verify everything is still working**

Run: `npm run test src/tests/navbar.test.ts src/tests/components/NavLink.test.ts`
Expected: PASS

- [ ] **Step 4: Commit changes**

```bash
git add src/components/Navbar.astro
git commit -m "refactor(ui): improve Navbar accessibility and CSS maintainability"
```
