# Language Toggle Redirection Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve the language switcher to redirect to the current page in the target language (preserving search params and hashes) instead of always returning to index.

**Architecture:** Client-side interception using JavaScript. The script will dynamically calculate the target URL by swapping or adding locale prefixes in `window.location`.

**Tech Stack:** Astro, Vanilla JavaScript.

---

### Task 1: Update LanguageToggle.astro Logic (COMPLETED)

**Files:**
- Modify: `src/components/LanguageToggle.astro`

- [x] **Step 1: Update the script to handle dynamic redirection**

Update the `<script>` tag in `src/components/LanguageToggle.astro` to intercept clicks, calculate the target path, and redirect.

```html
<script>
    const LOCALES = ['en', 'zh'];
    const DEFAULT_LOCALE = 'en';

    document.querySelectorAll('.lang-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetLang = (e.currentTarget as HTMLElement).getAttribute('data-lang');
            if (!targetLang) return;

            // Set preference cookie
            document.cookie = `preferred-lang=${targetLang}; path=/; max-age=31536000`;

            const currentPath = window.location.pathname;
            const currentSearch = window.location.search;
            const currentHash = window.location.hash;

            let newPath = currentPath;

            // 1. Strip existing locale prefix
            // Assuming prefix is always at the start like /zh/ or is just /zh
            for (const locale of LOCALES) {
                if (locale === DEFAULT_LOCALE) continue;
                const prefix = `/${locale}`;
                if (currentPath.startsWith(prefix + '/') || currentPath === prefix) {
                    newPath = currentPath.replace(prefix, '') || '/';
                    break;
                }
            }

            // 2. Add target locale prefix if not default
            if (targetLang !== DEFAULT_LOCALE) {
                const prefix = `/${targetLang}`;
                newPath = prefix + (newPath === '/' ? '/' : newPath);
            }

            // 3. Normalize path (ensure no double slashes)
            newPath = newPath.replace(/\/+/g, '/');

            // 4. Redirect
            window.location.href = `${newPath}${currentSearch}${currentHash}`;
        });
    });
</script>
```

- [x] **Step 2: Commit changes**

```bash
git add src/components/LanguageToggle.astro
git commit -m "feat: implement dynamic language redirection in LanguageToggle"
```

---

### Task 2: Verification (COMPLETED)

**Files:**
- Test: `src/tests/components/LanguageToggle.test.ts`

- [x] **Step 1: Check existing tests for regressions**

Run: `bun test src/tests/components/LanguageToggle.test.ts`
Expected: PASS (or updated to reflect `e.preventDefault()`)

- [x] **Step 2: Manual Verification**

1. Start dev server: `bun run dev`
2. Navigate to `/about`
3. Click "中文". Verify URL is `/zh/about`.
4. Navigate to `/zh/pipeline/cd3?id=test#metrics`
5. Click "EN". Verify URL is `/pipeline/cd3?id=test#metrics`.
6. Click "中文" on `/`. Verify URL is `/zh/`.
