# Design Spec: Component Refactoring for Atomicity and Reusability

## Overview
Refactor the existing frontend codebase to improve reusability, extensibility, and follow the 'Swiss Red' design system more strictly. This involves extracting repetitive UI elements and logic into dedicated, atomized components.

## Goals
- **Atomization:** Break down monolithic components (Navbar) into smaller, single-responsibility units.
- **Reusability:** Create generic UI components (Button, NavLink) that can be used across the site.
- **Maintainability:** Remove inline styles and centralized component logic.
- **Consistency:** Ensure strict adherence to the 'Swiss Red' design system tokens.

## Proposed Components

### 1. Atomic UI Components
- **`Button.astro`**:
    - **Props:** `variant` ('primary' | 'outline'), `href?` (renders as `<a>` if present, else `<button>`), `class?`.
    - **Style:** Implements Swiss Red background for primary, transparent for outline. Both use 1px black border and no radius.
- **`NavLink.astro`**:
    - **Props:** `href`, `text`, `class?`.
    - **Style:** Boxed link with hover effect (Swiss Red background), consistent with the 'Swiss Red' aesthetic.
- **`LanguageToggle.astro`**:
    - **Props:** `lang` ('en' | 'zh').
    - **Logic:** Handles cookie persistence and UI for switching languages. Extracted from the current `Navbar`.

### 2. Section Components
- **`Hero.astro`**:
    - **Props:** `title`, `subtitle`, `lang`.
    - **Content:** Extracts the hero H1, description, and action buttons from `index.astro`. Uses `Button.astro`.

### 3. Compositional Refactors
- **`Navbar.astro`**:
    - Refactored to use `NavLink` for its links and `LanguageToggle` for language switching.
- **`ParticleAnimation.astro`**:
    - Clean up hex codes to use CSS variables (e.g., `var(--color-swiss-red)`).
- **`Layout.astro`**:
    - Remove the client-side cookie logic (now in `LanguageToggle`).
- **`index.astro` / `zh/index.astro`**:
    - Simplified by using `Hero.astro` and `Button.astro`.

## Architecture & Data Flow
- Components will receive `lang` as a prop to handle localized content via `getTranslations`.
- `LanguageToggle` will be responsible for setting the `preferred-lang` cookie.
- Middleware continues to handle the initial redirect based on cookies or headers.

## Testing Strategy
- **Unit Tests:** Update existing tests (`navbar.test.ts`, `design-system.test.ts`) to reflect component changes.
- **Visual Regression:** Manually verify that the "Swiss Red" look remains intact after refactoring.
- **Functionality:** Ensure language switching still persists via cookies and middleware correctly redirects.
