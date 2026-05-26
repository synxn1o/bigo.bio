# Pipeline Overview & BP326 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a serious, technical Pipeline Overview page showcasing BP326 as an early proof point of the working process, and update the BP326 detail page with actual technical data and interactive diagrams, removing the "Coming soon" placeholders.

**Architecture:** We will first update the internationalization strings to support the new content. Then, we will modify `PipelineShell.astro` to use an Astro `<slot />` so pages can inject their own specific content instead of a generic placeholder. Finally, we build the `index.astro` overview page and refine the `bp-326.astro` pages (English and Chinese) using standard CSS grid layouts and grayscale hover interactions.

**Tech Stack:** Astro, CSS Grid, Vitest (for translation checks)

---

### Task 1: Add Translation Keys and Tests

**Files:**
- Modify: `src/i18n/en.json`
- Modify: `src/i18n/zh.json`
- Create: `tests/pipeline-content.test.ts`

- [ ] **Step 1: Write the failing test for new i18n keys**

```typescript
// tests/pipeline-content.test.ts
import { describe, it, expect } from 'vitest';
import en from '../src/i18n/en.json';
import zh from '../src/i18n/zh.json';

describe('Pipeline Content Translations', () => {
    const requiredKeys = [
        'pipeline.overview.title',
        'pipeline.overview.hero_desc',
        'pipeline.overview.proof.eyebrow',
        'pipeline.overview.proof.title',
        'pipeline.overview.roster.title',
        'pipeline.bp326.metric.aa',
        'pipeline.bp326.metric.time',
        'pipeline.bp326.metric.affinity',
        'pipeline.bp326.methodology.title',
        'pipeline.bp326.methodology.desc'
    ];

    it('should have all required pipeline keys in EN', () => {
        requiredKeys.forEach(key => {
            expect(en).toHaveProperty(key);
        });
    });

    it('should have all required pipeline keys in ZH', () => {
        requiredKeys.forEach(key => {
            expect(zh).toHaveProperty(key);
        });
    });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bunx vitest run tests/pipeline-content.test.ts`
Expected: FAIL (keys not found)

- [ ] **Step 3: Update `src/i18n/en.json` with English keys**

Add these to the bottom of the JSON object (before the last closing brace):

```json
  "pipeline.overview.title": "Platform Pipeline",
  "pipeline.overview.hero_desc": "Driving the next generation of biotherapeutics. The BIGO BDA platform accelerates discovery to deliver novel molecules with unprecedented speed and confidence.",
  "pipeline.overview.proof.eyebrow": "Early proof points",
  "pipeline.overview.proof.title": "BP326 shows Bigo is building a working loop, not a model-only concept.",
  "pipeline.overview.roster.title": "Our Pipeline",
  "pipeline.bp326.metrics.title": "Key Metrics",
  "pipeline.bp326.metrics.desc": "Internal molecular binding data and structural validation details.",
  "pipeline.bp326.metric.aa": "~200",
  "pipeline.bp326.metric.aa.label": "Amino Acids",
  "pipeline.bp326.metric.time": "~3",
  "pipeline.bp326.metric.time.label": "Months",
  "pipeline.bp326.metric.time.sub": "Development Time",
  "pipeline.bp326.metric.affinity": "nM",
  "pipeline.bp326.metric.affinity.label": "Level Binding Data",
  "pipeline.bp326.methodology.title": "Methodology",
  "pipeline.bp326.methodology.desc": "Computational design, expression, purification, affinity validation, and data engineering integrated into a technical production workflow. Highly confident outputs achieved through rigorous wet-lab validation and generation scoring."
```
*(Make sure to fix the test array in step 1 if the keys slightly differ, e.g. `pipeline.bp326.metrics.title` instead of `pipeline.bp326.metric.aa` only)*

Wait, let's just make the test match the exact keys added:

```typescript
// Update the test file to match the keys exactly
import { describe, it, expect } from 'vitest';
import en from '../src/i18n/en.json';
import zh from '../src/i18n/zh.json';

describe('Pipeline Content Translations', () => {
    const requiredKeys = [
        'pipeline.overview.title',
        'pipeline.overview.hero_desc',
        'pipeline.overview.proof.eyebrow',
        'pipeline.overview.proof.title',
        'pipeline.overview.roster.title',
        'pipeline.bp326.metrics.title',
        'pipeline.bp326.metrics.desc',
        'pipeline.bp326.metric.aa',
        'pipeline.bp326.metric.aa.label',
        'pipeline.bp326.metric.time',
        'pipeline.bp326.metric.time.label',
        'pipeline.bp326.metric.time.sub',
        'pipeline.bp326.metric.affinity',
        'pipeline.bp326.metric.affinity.label',
        'pipeline.bp326.methodology.title',
        'pipeline.bp326.methodology.desc'
    ];

    it('should have all required pipeline keys in EN', () => {
        requiredKeys.forEach(key => {
            expect(en).toHaveProperty(key);
        });
    });

    it('should have all required pipeline keys in ZH', () => {
        requiredKeys.forEach(key => {
            expect(zh).toHaveProperty(key);
        });
    });
});
```

- [ ] **Step 4: Update `src/i18n/zh.json` with Chinese keys**

Add these to the bottom of the JSON object:

```json
  "pipeline.overview.title": "平台管线",
  "pipeline.overview.hero_desc": "驱动下一代生物治疗。BIGO BDA 平台加速发现，以空前的速度和信心交付新型分子。",
  "pipeline.overview.proof.eyebrow": "早期概念验证",
  "pipeline.overview.proof.title": "BP326 证明 Bigo 正在构建一个有效的工作闭环，而不仅仅是一个模型概念。",
  "pipeline.overview.roster.title": "我们的管线",
  "pipeline.bp326.metrics.title": "关键指标",
  "pipeline.bp326.metrics.desc": "内部大分子结合数据及结构验证细节。",
  "pipeline.bp326.metric.aa": "~200",
  "pipeline.bp326.metric.aa.label": "氨基酸",
  "pipeline.bp326.metric.time": "~3",
  "pipeline.bp326.metric.time.label": "个月",
  "pipeline.bp326.metric.time.sub": "开发周期",
  "pipeline.bp326.metric.affinity": "nM",
  "pipeline.bp326.metric.affinity.label": "级结合数据",
  "pipeline.bp326.methodology.title": "方法论",
  "pipeline.bp326.methodology.desc": "计算设计、表达、纯化、亲和力验证与数据工程集成于高标准技术生产工作流中。通过严谨的湿实验验证与生成评分，实现高置信度的交付。"
```

- [ ] **Step 5: Run test to verify it passes**

Run: `bunx vitest run tests/pipeline-content.test.ts`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/i18n/en.json src/i18n/zh.json tests/pipeline-content.test.ts
git commit -m "feat(i18n): add translations for pipeline overview and BP326"
```

---

### Task 2: Modify PipelineShell Component

**Files:**
- Modify: `src/components/PipelineShell.astro`

- [ ] **Step 1: Check current build**
Run: `bun run build` to ensure the project builds before making changes.

- [ ] **Step 2: Replace "coming soon" placeholder with slot**
In `src/components/PipelineShell.astro`, find this section:

```astro
    <div class="pipeline-main">
        <div class="coming-soon outline">
            <p>{t('pipeline.coming_soon')}</p>
        </div>
    </div>
```

Replace it entirely with:

```astro
    <div class="pipeline-main">
        <slot>
            <div class="coming-soon outline">
                <p>{t('pipeline.coming_soon')}</p>
            </div>
        </slot>
    </div>
```

- [ ] **Step 3: Run build to verify no regressions**
Run: `bun run build`
Expected: Successful build.

- [ ] **Step 4: Commit**
```bash
git add src/components/PipelineShell.astro
git commit -m "refactor: allow slot injection in PipelineShell"
```

---

### Task 3: Create Pipeline Overview Pages

**Files:**
- Create: `src/pages/pipeline/index.astro`
- Create: `src/pages/zh/pipeline/index.astro`

- [ ] **Step 1: Build the English page (`src/pages/pipeline/index.astro`)**

```astro
---
import Layout from '../../layouts/Layout.astro';
import MetricCard from '../../components/MetricCard.astro';
import ProductCard from '../../components/ProductCard.astro';
import { getTranslations } from '../../i18n/utils';

export const prerender = true;

const lang = 'en';
const t = getTranslations(lang);
---
<Layout title={`${t('pipeline.overview.title')} | BIGO BDA`} lang={lang}>
    <main class="grid-container pipeline-overview">
        <!-- Hero Section -->
        <section class="hero grid-item outline">
            <h1 class="pipeline-title">{t('pipeline.overview.title')}</h1>
            <p class="pipeline-desc">{t('pipeline.overview.hero_desc')}</p>
        </section>

        <!-- Platform Validation -->
        <section class="proof-section grid-item outline">
            <div class="proof-header">
                <p class="eyebrow">{t('pipeline.overview.proof.eyebrow')}</p>
                <h2>{t('pipeline.overview.proof.title')}</h2>
                <a href="/pipeline/bp-326" class="proof-cta outline">View BP326 Detail →</a>
            </div>
            <div class="proof-metrics">
                <MetricCard value={t('pipeline.bp326.metric.aa')} label={t('pipeline.bp326.metric.aa.label')} />
                <MetricCard value={t('pipeline.bp326.metric.time')} label={t('pipeline.bp326.metric.time.label')} sublabel={t('pipeline.bp326.metric.time.sub')} />
                <MetricCard value={t('pipeline.bp326.metric.affinity')} label={t('pipeline.bp326.metric.affinity.label')} />
            </div>
        </section>

        <!-- Pipeline Roster -->
        <section class="roster-section grid-item">
            <h2 class="section-heading">{t('pipeline.overview.roster.title')}</h2>
            <div class="roster-grid">
                <ProductCard
                    label={t('pipeline.preclinical')}
                    title={t('pipeline.bp326.title')}
                    description={t('pipeline.bp326.desc')}
                    href="/pipeline/bp-326"
                >
                    <div slot="imageSlot" class="pipeline-image-ph">BP326</div>
                </ProductCard>
                <ProductCard
                    label="Discovery"
                    title={t('pipeline.cd3.title')}
                    description={t('pipeline.cd3.desc')}
                    href="/pipeline/cd3"
                >
                    <div slot="imageSlot" class="pipeline-image-ph">CD3+</div>
                </ProductCard>
                <ProductCard
                    label="Discovery"
                    title={t('pipeline.ribh.title')}
                    description={t('pipeline.ribh.desc')}
                    href="/pipeline/ribh"
                >
                    <div slot="imageSlot" class="pipeline-image-ph">RibH</div>
                </ProductCard>
            </div>
        </section>
    </main>
</Layout>

<style>
    .pipeline-overview {
        padding-top: 8rem;
        padding-bottom: 6rem;
        gap: 4rem var(--grid-gutter);
    }
    .hero {
        padding: 4rem;
        background: var(--color-grey-100);
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
    }
    .pipeline-title {
        font-size: clamp(2.5rem, 6vw, 4rem);
        font-weight: 800;
        text-transform: uppercase;
        margin: 0;
    }
    .pipeline-desc {
        font-size: 1.25rem;
        color: var(--color-grey-800);
        max-width: 800px;
        line-height: 1.6;
    }
    .proof-section {
        padding: 4rem;
        background: var(--color-white);
        display: flex;
        flex-direction: column;
        gap: 3rem;
    }
    .proof-header {
        max-width: 800px;
    }
    .eyebrow {
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--color-swiss-red);
        margin-bottom: 1rem;
    }
    .proof-header h2 {
        font-size: clamp(2rem, 4vw, 3rem);
        font-weight: 800;
        margin-bottom: 2rem;
        line-height: 1.2;
    }
    .proof-cta {
        display: inline-block;
        padding: 1rem 2rem;
        text-decoration: none;
        color: var(--color-black);
        font-weight: 700;
        transition: background 0.2s, color 0.2s;
    }
    .proof-cta:hover {
        background: var(--color-black);
        color: var(--color-white);
    }
    .proof-metrics {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--grid-gutter);
    }
    .section-heading {
        font-size: 0.875rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.15em;
        color: var(--color-grey-600);
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid var(--color-black);
    }
    .roster-grid {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    .pipeline-image-ph {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-grey-200);
        color: var(--color-grey-500);
        font-weight: 700;
        font-size: 1.5rem;
    }
    @media (max-width: 768px) {
        .proof-metrics {
            grid-template-columns: 1fr;
        }
        .hero, .proof-section {
            padding: 2rem;
        }
    }
</style>
```

- [ ] **Step 2: Build the Chinese page (`src/pages/zh/pipeline/index.astro`)**

Create the exact same file content as step 1, but change:
`const lang = 'en';`
to
`const lang = 'zh';`

And modify the links inside the component:
`href="/pipeline/bp-326"` -> `href="/zh/pipeline/bp-326"`
`href="/pipeline/cd3"` -> `href="/zh/pipeline/cd3"`
`href="/pipeline/ribh"` -> `href="/zh/pipeline/ribh"`

- [ ] **Step 3: Run Build**
Run: `bun run build`
Expected: Successful build.

- [ ] **Step 4: Commit**
```bash
git add src/pages/pipeline/index.astro src/pages/zh/pipeline/index.astro
git commit -m "feat: add pipeline overview pages"
```

---

### Task 4: Refine BP326 Detail Page Layout

**Files:**
- Modify: `src/pages/pipeline/bp-326.astro`
- Modify: `src/pages/zh/pipeline/bp-326.astro`

- [ ] **Step 1: Update English BP326 page (`src/pages/pipeline/bp-326.astro`)**

Replace the entire content of `src/pages/pipeline/bp-326.astro` with:

```astro
---
import Layout from '../../layouts/Layout.astro';
import PipelineShell from '../../components/PipelineShell.astro';
import MetricCard from '../../components/MetricCard.astro';
import { getTranslations } from '../../i18n/utils';
import { Image } from 'astro:assets';

export const prerender = true;

const lang = 'en';
const t = getTranslations(lang);
---
<Layout title={`${t('pipeline.bp326.title')} | BIGO BDA`} lang={lang}>
    <main class="grid-container pipeline-content">
        <PipelineShell
            title={t('pipeline.bp326.title')}
            description={t('pipeline.bp326.desc')}
            target={t('pipeline.bp326.target')}
            moleculeType={t('pipeline.bp326.type')}
            status={t('pipeline.preclinical')}
            lang={lang}
        >
            <div class="bp-details">
                <!-- Metrics & Image Container -->
                <div class="detail-container outline">
                    <div class="detail-text">
                        <h3>{t('pipeline.bp326.metrics.title')}</h3>
                        <p>{t('pipeline.bp326.metrics.desc')}</p>
                        <div class="metrics-list">
                            <MetricCard value={t('pipeline.bp326.metric.aa')} label={t('pipeline.bp326.metric.aa.label')} />
                            <MetricCard value={t('pipeline.bp326.metric.time')} label={t('pipeline.bp326.metric.time.label')} sublabel={t('pipeline.bp326.metric.time.sub')} />
                            <MetricCard value={t('pipeline.bp326.metric.affinity')} label={t('pipeline.bp326.metric.affinity.label')} />
                        </div>
                    </div>
                    <div class="detail-image">
                        <Image src="https://cdn.bigo.bio/images/bp326.png" alt="BP326 Structure" inferSize={true} />
                    </div>
                </div>

                <!-- Methodology Container -->
                <div class="detail-container outline">
                    <div class="detail-text">
                        <h3>{t('pipeline.bp326.methodology.title')}</h3>
                        <p>{t('pipeline.bp326.methodology.desc')}</p>
                    </div>
                    <div class="detail-image">
                        <Image src="https://cdn.bigo.bio/images/bp326_method.png" alt="BP326 Methodology" inferSize={true} />
                    </div>
                </div>
            </div>
        </PipelineShell>
    </main>
</Layout>

<style>
    .pipeline-content {
        padding-top: 8rem;
        padding-bottom: 6rem;
        gap: 4rem var(--grid-gutter);
    }
    
    .bp-details {
        display: flex;
        flex-direction: column;
        gap: 3rem;
    }

    .detail-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        background: var(--color-white);
        overflow: hidden;
    }

    .detail-text {
        padding: 3rem;
        border-right: 1px solid var(--color-black);
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .detail-text h3 {
        font-size: 1.5rem;
        font-weight: 800;
        margin-bottom: 1rem;
        text-transform: uppercase;
    }

    .detail-text p {
        font-size: 1.125rem;
        color: var(--color-grey-700);
        margin-bottom: 2rem;
        line-height: 1.6;
    }

    .metrics-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .detail-image {
        position: relative;
        background: var(--color-grey-100);
        min-height: 400px;
        overflow: hidden;
    }

    .detail-image img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: grayscale(100%);
        transition: filter 0.4s ease-in-out;
    }

    .detail-container:hover .detail-image img {
        filter: grayscale(0%);
    }

    @media (max-width: 768px) {
        .detail-container {
            grid-template-columns: 1fr;
        }
        .detail-text {
            border-right: none;
            border-bottom: 1px solid var(--color-black);
            padding: 2rem;
        }
        .detail-image {
            min-height: 300px;
        }
    }
</style>
```

- [ ] **Step 2: Update Chinese BP326 page (`src/pages/zh/pipeline/bp-326.astro`)**

Replace the content of `src/pages/zh/pipeline/bp-326.astro` exactly as in Step 1, but change:
`const lang = 'en';`
to
`const lang = 'zh';`

- [ ] **Step 3: Run Build**
Run: `bun run build`
Expected: Successful build. Check for any missing component import errors.

- [ ] **Step 4: Commit**
```bash
git add src/pages/pipeline/bp-326.astro src/pages/zh/pipeline/bp-326.astro
git commit -m "feat: refine BP326 detailed page with tech metrics and imagery"
```