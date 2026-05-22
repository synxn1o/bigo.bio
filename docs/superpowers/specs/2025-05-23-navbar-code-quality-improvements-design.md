# Navbar Code Quality Improvements Design

**Goal:** Improve the code quality, accessibility, and maintainability of `src/components/Navbar.astro` and `src/components/NavLink.astro`.

**Architecture:**
- Use standard HTML `type="button"` for all button elements in `Navbar.astro`.
- Refactor `NavLink.astro` to use CSS variables for its dimensions and padding, allowing for cleaner overrides.
- Replace `:global` and `!important` overrides in `Navbar.astro` with CSS variable overrides for `NavLink` components.

**Changes:**

### 1. `src/components/NavLink.astro`
Introduce CSS variables for:
- `--nav-link-width` (default 160px, 120px on tablets)
- `--nav-link-height` (default 40px)
- `--nav-link-padding` (default 0)
- `--nav-link-justify` (default center)

```css
.nav-link {
    /* ... existing styles ... */
    width: var(--nav-link-width, 160px);
    height: var(--nav-link-height, 40px);
    padding: var(--nav-link-padding, 0);
    justify-content: var(--nav-link-justify, center);
    display: flex;
    align-items: center;
    border: 1px solid var(--color-black);
    margin-left: -1px;
}
```

### 2. `src/components/Navbar.astro`
- Add `type="button"` to `#mobile-toggle` and `#close-panel`.
- Clean up styles:
```css
/* Mobile Specific Styles in Navbar.astro */
.mobile-nav-item {
    --nav-link-width: 100%;
    --nav-link-height: auto;
    --nav-link-padding: 1rem;
    --nav-link-justify: flex-start;
    margin-left: 0; /* Override the margin-left: -1px from NavLink */
}
```

**Testing Strategy:**
- Verify that the mobile menu still functions correctly.
- Ensure the layout of both desktop and mobile navigation remains consistent with the current design.
- Run existing tests: `npm run test src/tests/navbar.test.ts` and `src/tests/components/NavLink.test.ts`.
