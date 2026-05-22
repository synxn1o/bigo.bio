# Components

This project follows a pragmatic atomic design approach, extracting reusable UI elements into self-contained Astro components.

## UI Components (Atoms)

### [Button.astro](../src/components/Button.astro)
A versatile button/anchor component that follows the Swiss Red design system.

- **Props:**
  - `variant`: `'primary'` (Swiss Red bg) or `'outline'` (Transparent bg, black border). Defaults to `'primary'`.
  - `href`: Optional. If provided, renders as an `<a>` tag.
  - `type`: Optional. Defaults to `'button'` when rendering as a `<button>`.
  - `class`: Optional custom classes.
- **Features:**
  - Strict right-angle geometry.
  - High-contrast `:focus-visible` state.
  - Automated transition between `<a>` and `<button>`.

### [NavLink.astro](../src/components/NavLink.astro)
A boxed link component used for navigation.

- **Props:**
  - `href`: The destination URL.
  - `class`: Optional custom classes.
- **Features:**
  - Hover effect with Swiss Red background.
  - Configurable dimensions via CSS variables (`--nav-link-width`, `--nav-link-height`).
  - Supports prop spreading for standard anchor attributes.

### [LanguageToggle.astro](../src/components/LanguageToggle.astro)
A functional toggle for switching between English and Simplified Chinese.

- **Props:**
  - `lang`: Current active language (`'en'` or `'zh'`).
- **Features:**
  - Client-side cookie persistence for `preferred-lang`.
  - Accessible `aria-current` state.

## Section Components (Molecules/Organisms)

### [Hero.astro](../src/components/Hero.astro)
The hero section used on the landing pages.

- **Props:**
  - `lang`: Current language for localized content.
- **Features:**
  - Composes `Button.astro` for call-to-action buttons.
  - Responsive layout (adjusts margin-top on mobile).

### [Navbar.astro](../src/components/Navbar.astro)
The global navigation bar.

- **Props:**
  - `lang`: Current language for localized content.
- **Features:**
  - Composes `NavLink.astro` and `LanguageToggle.astro`.
  - Fixed floating design with backdrop-blur.
  - Integrated mobile drawer menu.
