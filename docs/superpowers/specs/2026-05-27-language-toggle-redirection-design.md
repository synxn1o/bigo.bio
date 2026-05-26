# Design Doc: Language Toggle Redirection

Improve the language switcher to redirect users to the current page in the target language instead of always returning to the index page.

## Problem Statement
The current `LanguageToggle.astro` component has hardcoded `href` values (`/` and `/zh/`). This forces users back to the homepage every time they switch languages, losing their current context (page, search parameters, and URL hashes).

## Success Criteria
- Switching languages preserves the current page path.
- Switching languages preserves all URL search parameters (e.g., `?id=123`).
- Switching languages preserves URL hashes (e.g., `#section-1`).
- The solution is extendable to future languages with minimal code changes.
- No changes to existing CSS/styling.

## Architecture
We will use **Client-side Interception** (Approach 2). A JavaScript script within the `LanguageToggle.astro` component will intercept clicks on language links and calculate the target URL dynamically.

### Logic Flow
1. **Identify Locales:** Hardcode supported locales (currently `en`, `zh`).
2. **Intercept Click:** Listen for clicks on `.lang-link`.
3. **Analyze Current URL:** Get `window.location.pathname`, `search`, and `hash`.
4. **Transform Path:**
   - Strip any existing locale prefix from the pathname (e.g., `/zh/about` becomes `/about`).
   - If the target language is not the default (`en`), prepend the locale prefix (e.g., `/about` becomes `/zh/about`).
   - Ensure trailing slashes are handled correctly (e.g., `/zh/` becomes `/`).
5. **Redirect:** Combine the new path with the original `search` and `hash` and set `window.location.href`.

## Implementation Details
- Update the `<script>` tag in `src/components/LanguageToggle.astro`.
- Keep the `<a>` tags but update their behavior to prevent default navigation and trigger the custom redirect.
- Preserve the cookie-setting logic for `preferred-lang`.

## Testing Plan
- **Manual Verification:**
  - Navigate to `/about` and switch to `zh`. Verify it goes to `/zh/about`.
  - Navigate to `/zh/pipeline/cd3?view=detail#metrics` and switch to `en`. Verify it goes to `/pipeline/cd3?view=detail#metrics`.
  - Verify switching on the homepage (`/` or `/zh/`) still works correctly.
- **Automated Testing:**
  - Update or add tests in `src/tests/components/LanguageToggle.test.ts` (if applicable) to verify the component's link structure or data attributes.
