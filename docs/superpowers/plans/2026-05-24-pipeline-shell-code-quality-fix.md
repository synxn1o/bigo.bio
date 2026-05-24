# PipelineShell Code Quality Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix code quality issues in `PipelineShell.astro` by removing dead CSS and updating redundant i18n keys.

**Architecture:** Update i18n JSON files and the Astro component.

**Tech Stack:** Astro, i18n (JSON)

---

### Task 1: Update i18n keys

**Files:**
- Modify: `src/i18n/en.json`
- Modify: `src/i18n/zh.json`

- [ ] **Step 1: Add `pipeline.key_facts` to `en.json`**

```json
  "pipeline.key_facts": "Key Facts",
```

- [ ] **Step 2: Add `pipeline.key_facts` to `zh.json`**

```json
  "pipeline.key_facts": "关键信息",
```

- [ ] **Step 3: Commit i18n changes**

```bash
git add src/i18n/en.json src/i18n/zh.json
git commit -m "i18n: add pipeline.key_facts keys"
```

### Task 2: Refactor PipelineShell.astro

**Files:**
- Modify: `src/components/PipelineShell.astro`
- Test: `src/tests/components/PipelineShell.test.ts`

- [ ] **Step 1: Update sidebar heading and remove dead CSS**

In `src/components/PipelineShell.astro`:
- Change `<h2 class="facts-heading">{t('pipeline.status')}</h2>` to `<h2 class="facts-heading">{t('pipeline.key_facts')}</h2>`.
- Remove `.pipeline-content` rule from `<style>`.

- [ ] **Step 2: Update tests if necessary**

Check `src/tests/components/PipelineShell.test.ts` to see if it checks for the "Status" heading and update it to "Key Facts".

- [ ] **Step 3: Run tests**

Run: `npm test src/tests/components/PipelineShell.test.ts`
Expected: PASS

- [ ] **Step 4: Commit component changes**

```bash
git add src/components/PipelineShell.astro
git commit -m "fix(components): remove dead CSS and update redundant heading in PipelineShell"
```
