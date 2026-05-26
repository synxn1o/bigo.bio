# Navigation & Mobile UX Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the Pipeline Overview page to the navigation menus and fix the mobile side panel's scrollability.

**Architecture:** Update i18n files, modify `Navbar.astro` to include the new links in both desktop and mobile views, and update CSS for the mobile panel.

**Tech Stack:** Astro, CSS, Vitest

---

### Task 1: Add Navigation i18n Keys

**Files:**
- Modify: `src/i18n/en.json`
- Modify: `src/i18n/zh.json`
- Modify: `tests/pipeline-content.test.ts`

- [ ] **Step 1: Update the test for required i18n keys**

Modify `tests/pipeline-content.test.ts` to include the new keys:
```typescript
    const requiredKeys = [
        // ... existing keys ...
        'nav.pipeline.overview',
        'nav.pipeline.overview.desc'
    ];
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/pipeline-content.test.ts`
Expected: FAIL

- [ ] **Step 3: Add keys to `src/i18n/en.json`**

```json
  "nav.pipeline.overview": "Overview",
  "nav.pipeline.overview.desc": "Platform capabilities and pipeline strategy"
```

- [ ] **Step 4: Add keys to `src/i18n/zh.json`**

```json
  "nav.pipeline.overview": "概览",
  "nav.pipeline.overview.desc": "平台能力与管线策略"
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run tests/pipeline-content.test.ts`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/i18n/en.json src/i18n/zh.json tests/pipeline-content.test.ts
git commit -m "feat(i18n): add pipeline overview nav labels"
```

---

### Task 2: Update Navbar Links

**Files:**
- Modify: `src/components/Navbar.astro`

- [ ] **Step 1: Add "Overview" to desktop dropdown**

In `src/components/Navbar.astro`, update the Pipeline `DropdownNav` items:
```astro
                <DropdownNav
                    label={t('nav.pipeline')}
                    lang={lang}
                    items={[
                        { href: lang === 'en' ? '/pipeline' : '/zh/pipeline', label: t('nav.pipeline.overview'), description: t('nav.pipeline.overview.desc') },
                        { href: lang === 'en' ? '/pipeline/bp-326' : '/zh/pipeline/bp-326', label: t('nav.pipeline.bp326'), description: t('nav.pipeline.bp326.desc') },
                        // ... rest of items
                    ]}
                />
```

- [ ] **Step 2: Add "Overview" to mobile panel**

In `src/components/Navbar.astro`, add the link under the Pipeline section label:
```astro
        <div class="mobile-section-label">{t('nav.pipeline')}</div>
        <NavLink href={lang === 'en' ? '/pipeline' : '/zh/pipeline'} class="mobile-nav-item">{t('nav.pipeline.overview')}</NavLink>
        <NavLink href={lang === 'en' ? '/pipeline/bp-326' : '/zh/pipeline/bp-326'} class="mobile-nav-item">{t('nav.pipeline.bp326')}</NavLink>
        <!-- ... rest of items -->
```

- [ ] **Step 3: Run build to verify no regressions**

Run: `npm run build`
Expected: Successful build.

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.astro
git commit -m "feat(nav): add pipeline overview link to navbar"
```

---

### Task 3: Fix Mobile Side Panel Scrollability

**Files:**
- Modify: `src/components/Navbar.astro`

- [ ] **Step 1: Update CSS for `#mobile-panel`**

In `src/components/Navbar.astro`, update the style block:
```css
    #mobile-panel {
        /* ... existing styles ... */
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
```

- [ ] **Step 2: Run build to verify**

Run: `npm run build`
Expected: Successful build.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.astro
git commit -m "fix(nav): make mobile side panel scrollable"
```
