# Fix Pipeline Hardcoded Strings Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove hardcoded "Discovery" and "View BP326 Detail →" strings from pipeline overview pages by moving them to i18n files and updating components and tests.

**Architecture:** Update i18n JSON files, update Astro pages to use translation utility, and update validation tests.

**Tech Stack:** Astro, TypeScript, Vitest.

---

### Task 1: Update i18n JSON files

**Files:**
- Modify: `src/i18n/en.json`
- Modify: `src/i18n/zh.json`

- [ ] **Step 1: Add new keys to `src/i18n/en.json`**

```json
{
  ...
  "pipeline.discovery": "Discovery",
  "pipeline.overview.proof.cta": "View BP326 Detail →"
}
```

- [ ] **Step 2: Add new keys to `src/i18n/zh.json`**

```json
{
  ...
  "pipeline.discovery": "早期发现",
  "pipeline.overview.proof.cta": "查看 BP326 详情 →"
}
```

### Task 2: Update Astro Pages

**Files:**
- Modify: `src/pages/pipeline/index.astro`
- Modify: `src/pages/zh/pipeline/index.astro`

- [ ] **Step 1: Update `src/pages/pipeline/index.astro` to use i18n keys**

Replace:
```astro
<a href="/pipeline/bp-326" class="proof-cta outline">View BP326 Detail →</a>
...
<ProductCard
    label="Discovery"
    title={t('pipeline.cd3.title')}
    desc={t('pipeline.cd3.desc')}
    href="/pipeline/cd3"
/>
...
<ProductCard
    label="Discovery"
    title={t('pipeline.ribh.title')}
    desc={t('pipeline.ribh.desc')}
    href="/pipeline/ribh"
/>
```
With:
```astro
<a href="/pipeline/bp-326" class="proof-cta outline">{t('pipeline.overview.proof.cta')}</a>
...
<ProductCard
    label={t('pipeline.discovery')}
    title={t('pipeline.cd3.title')}
    desc={t('pipeline.cd3.desc')}
    href="/pipeline/cd3"
/>
...
<ProductCard
    label={t('pipeline.discovery')}
    title={t('pipeline.ribh.title')}
    desc={t('pipeline.ribh.desc')}
    href="/pipeline/ribh"
/>
```

- [ ] **Step 2: Update `src/pages/zh/pipeline/index.astro` to use i18n keys**

(Same replacements as above, using `t('pipeline.overview.proof.cta')` and `t('pipeline.discovery')`)

### Task 3: Update Tests

**Files:**
- Modify: `tests/pipeline-content.test.ts`

- [ ] **Step 1: Add new keys to `requiredKeys` array in `tests/pipeline-content.test.ts`**

```typescript
    const requiredKeys = [
        ...
        'pipeline.discovery',
        'pipeline.overview.proof.cta'
    ];
```

- [ ] **Step 2: Run tests to verify they pass**

Run: `npm test tests/pipeline-content.test.ts`
Expected: ALL PASS

### Task 4: Final Verification and Commit

- [ ] **Step 1: Verify pages render correctly (if possible, or check for build errors)**
- [ ] **Step 2: Commit changes**

```bash
git add src/i18n/en.json src/i18n/zh.json src/pages/pipeline/index.astro src/pages/zh/pipeline/index.astro tests/pipeline-content.test.ts
git commit -m "fix(pipeline): remove hardcoded strings from overview pages"
```
