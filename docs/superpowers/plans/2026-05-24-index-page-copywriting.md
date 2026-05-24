# Index Page Copywriting & Content Design Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the new copywriting and structure for the index page, introducing new components that conform strictly to the existing "Swiss Red" design system.

**Architecture:** We will first update the internationalization strings (`en.json` and `zh.json`) with the new copy. Then we'll create the four new reusable UI components (`SDGCard`, `PlatformStatement`, `ProductCard`, and `CTACard`), applying the required design constraints (no border radius, strict grid adherence, strong focus states). Finally, we'll wire these into `src/pages/index.astro` and `src/pages/zh/index.astro`.

**Tech Stack:** Astro, CSS (Vanilla, using existing CSS variables), JSON (i18n)

---

### Task 1: Update i18n Dictionaries

**Files:**
- Modify: `src/i18n/en.json`
- Modify: `src/i18n/zh.json`

- [ ] **Step 1: Update `en.json`**

Run this Node.js script to safely merge the new English translations:

```javascript
// update-en.js
import fs from 'fs';

const filePath = 'src/i18n/en.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const newKeys = {
  "hook.question": "What if designing a protein was as routine as designing a chip?",
  "hook.subtext": "EDA made semiconductors programmable. We're building the same infrastructure for biology.",
  "sdg.hunger.label": "SDG 2",
  "sdg.hunger.title": "Zero Hunger",
  "sdg.hunger.desc": "Protein nitrogen fixation replaces Haber-Bosch — sustainable agriculture without fossil-fuel-dependent fertilizers.",
  "sdg.green.label": "SDG 9 / 12",
  "sdg.green.title": "Green Manufacturing",
  "sdg.green.desc": "Low-carbon, low-toxicity catalysis. Enzymes that work at ambient temperature, replacing energy-intensive chemical processes.",
  "sdg.medicine.label": "SDG 3",
  "sdg.medicine.title": "Precision Medicine",
  "sdg.medicine.desc": "One patient, one drug. Computationally designed therapeutics tailored to individual biology.",
  "platform.statement": "Bigo BDA+ platform is our biomaterial development platform, allowing anyone to <em>design</em> and <em>build</em> with AI.",
  "products.binders.label": "PD-1 / SARS-CoV-2 Spike",
  "products.binders.title": "De Novo Protein Binders",
  "products.binders.desc": "AI-designed protein binders competing with billion-dollar antibody drugs — smaller, faster to produce, computationally optimized.",
  "products.nanocage.label": "Multimeric Antigen Architectures",
  "products.nanocage.title": "Vaccine Nanocage Display",
  "products.nanocage.desc": "Programmable nanoparticle scaffolds for high-density antigen display — designed for stability, immunogenicity, and rapid iteration.",
  "products.enzymes.label": "Green Manufacturing Catalysts",
  "products.enzymes.title": "Industrial Enzymes",
  "products.enzymes.desc": "Engineered enzymes with 100x efficiency gains — ambient-temperature catalysis replacing energy-intensive chemical processes.",
  "explore.title": "Explore Bigo",
  "explore.pipeline.label": "Pipeline",
  "explore.pipeline.title": "See what we're building",
  "explore.pipeline.subtitle": "BP326 · RibH · CD3+",
  "explore.blog.label": "Blog",
  "explore.blog.title": "Latest from the team",
  "explore.blog.subtitle": "Research updates and insights",
  "explore.team.label": "Team",
  "explore.team.title": "Who we are",
  "explore.team.subtitle": "8 researchers, 30+ publications"
};

Object.assign(data, newKeys);
fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
console.log('en.json updated');
```

Run: `node update-en.js`

- [ ] **Step 2: Update `zh.json`**

Run this Node.js script to safely merge the new Chinese translations:

```javascript
// update-zh.js
import fs from 'fs';

const filePath = 'src/i18n/zh.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const newKeys = {
  "hook.question": "如果设计蛋白质像设计芯片一样常规？",
  "hook.subtext": "EDA让半导体变得可编程。我们正在为生物学构建同样的基础设施。",
  "sdg.hunger.label": "SDG 2",
  "sdg.hunger.title": "零饥饿",
  "sdg.hunger.desc": "蛋白质固氮替代合成氨——无需依赖化石燃料肥料的可持续农业。",
  "sdg.green.label": "SDG 9 / 12",
  "sdg.green.title": "绿色制造",
  "sdg.green.desc": "低碳、低毒性催化。在常温下工作的酶，取代高能耗的化学工艺。",
  "sdg.medicine.label": "SDG 3",
  "sdg.medicine.title": "精准医疗",
  "sdg.medicine.desc": "一名患者，一种药物。为个体生物学量身定制的计算设计疗法。",
  "platform.statement": "Bigo BDA+平台是我们的生物材料开发平台，让任何人都能用AI进行<em>设计</em>和<em>构建</em>。",
  "products.binders.label": "PD-1 / SARS-CoV-2 Spike",
  "products.binders.title": "从头设计结合蛋白",
  "products.binders.desc": "AI 设计的蛋白结合物，可与价值数十亿美元的抗体药物竞争——体积更小、生产更快、经过计算优化。",
  "products.nanocage.label": "多聚体抗原架构",
  "products.nanocage.title": "疫苗纳米笼展示",
  "products.nanocage.desc": "用于高密度抗原展示的可编程纳米颗粒支架——专为稳定性、免疫原性和快速迭代而设计。",
  "products.enzymes.label": "绿色制造催化剂",
  "products.enzymes.title": "工业酶",
  "products.enzymes.desc": "效率提升 100 倍的工程酶——常温催化取代高能耗化学过程。",
  "explore.title": "探索 Bigo",
  "explore.pipeline.label": "管线",
  "explore.pipeline.title": "看看我们在构建什么",
  "explore.pipeline.subtitle": "BP326 · RibH · CD3+",
  "explore.blog.label": "博客",
  "explore.blog.title": "团队最新动态",
  "explore.blog.subtitle": "研究更新与见解",
  "explore.team.label": "团队",
  "explore.team.title": "我们是谁",
  "explore.team.subtitle": "8 名研究员，30+ 篇出版物"
};

Object.assign(data, newKeys);
fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
console.log('zh.json updated');
```

Run: `node update-zh.js`
Clean up the temporary files: `rm update-en.js update-zh.js`

- [ ] **Step 3: Commit i18n changes**

```bash
git add src/i18n/en.json src/i18n/zh.json
git commit -m "feat(i18n): add index page copywriting translations"
```

---

### Task 2: Create SDGCard Component

**Files:**
- Create: `src/components/SDGCard.astro`

- [ ] **Step 1: Write the minimal implementation**

```html
---
interface Props {
  label: string;
  title: string;
  description: string;
}

const { label, title, description } = Astro.props;
---
<div class="sdg-card outline scroll-reveal">
  <span class="label">{label}</span>
  <h3>{title}</h3>
  <p>{description}</p>
</div>

<style>
  .sdg-card {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: var(--color-white);
    border: 1px solid var(--color-black, #000);
    border-radius: 0;
  }

  .label {
    font-size: 0.875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-swiss-red, #ff0000);
  }

  .sdg-card h3 {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--color-black, #000);
    margin: 0;
  }

  .sdg-card p {
    color: var(--color-grey-800, #333);
    line-height: 1.6;
    margin: 0;
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SDGCard.astro
git commit -m "feat(ui): create SDGCard component"
```

---

### Task 3: Create PlatformStatement Component

**Files:**
- Create: `src/components/PlatformStatement.astro`

- [ ] **Step 1: Write the minimal implementation**

```html
---
---
<div class="platform-statement grid-item scroll-reveal">
  <h2><slot /></h2>
</div>

<style>
  .platform-statement {
    margin: 4rem 0;
    max-width: 66%;
  }

  .platform-statement h2 {
    font-size: clamp(2rem, 4vw, 3.5rem);
    line-height: 1.2;
    font-weight: 300; /* Lightweight display text */
    color: var(--color-black, #000);
  }

  /* Target the emphasized keywords passed in via slot */
  .platform-statement h2 :global(em) {
    font-style: normal;
    font-weight: 800;
    color: var(--color-swiss-red, #ff0000);
  }

  @media (max-width: 768px) {
    .platform-statement {
      max-width: 100%;
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/PlatformStatement.astro
git commit -m "feat(ui): create PlatformStatement component"
```

---

### Task 4: Create ProductCard Component

**Files:**
- Create: `src/components/ProductCard.astro`

- [ ] **Step 1: Write the minimal implementation**

```html
---
interface Props {
  label: string;
  title: string;
  description: string;
  href: string;
}

const { label, title, description, href } = Astro.props;
---
<a href={href} class="product-card grid-item outline scroll-reveal">
  <div class="content-side">
    <span class="label">{label}</span>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
  <div class="image-side">
    <slot name="imageSlot">
      <div class="placeholder">
        <span>Image Placeholder</span>
      </div>
    </slot>
  </div>
</a>

<style>
  .product-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-decoration: none;
    color: inherit;
    border: 1px solid var(--color-black, #000);
    border-radius: 0;
    background: var(--color-white);
    transition: all 0.2s ease-in-out;
  }

  .product-card:hover,
  .product-card:focus {
    outline: 4px solid var(--color-black, #000);
    outline-offset: -4px;
  }

  .content-side {
    padding: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.5rem;
    border-right: 1px solid var(--color-black, #000);
  }

  .label {
    font-size: 0.875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-swiss-red, #ff0000);
  }

  .content-side h3 {
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    font-weight: 800;
    margin: 0;
  }

  .content-side p {
    font-size: 1.125rem;
    line-height: 1.6;
    color: var(--color-grey-800, #333);
    margin: 0;
  }

  .image-side {
    background: var(--color-grey-100, #f5f5f5);
    min-height: 300px;
    display: flex;
  }

  .placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-grey-500, #999);
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .product-card {
      grid-template-columns: 1fr;
    }
    .content-side {
      border-right: none;
      border-bottom: 1px solid var(--color-black, #000);
      padding: 2rem;
    }
    .image-side {
      min-height: 250px;
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ProductCard.astro
git commit -m "feat(ui): create ProductCard component"
```

---

### Task 5: Create CTACard Component

**Files:**
- Create: `src/components/CTACard.astro`

- [ ] **Step 1: Write the minimal implementation**

```html
---
interface Props {
  label: string;
  title: string;
  subtitle: string;
  href: string;
}

const { label, title, subtitle, href } = Astro.props;
---
<a href={href} class="cta-card outline scroll-reveal">
  <span class="label">{label}</span>
  <h3>{title}</h3>
  <p>{subtitle}</p>
  <div class="icon-arrow">→</div>
</a>

<style>
  .cta-card {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: var(--color-white);
    border: 1px solid var(--color-black, #000);
    border-radius: 0;
    text-decoration: none;
    color: inherit;
    position: relative;
    transition: all 0.2s ease-in-out;
  }

  .cta-card:hover,
  .cta-card:focus {
    background: var(--color-black, #000);
    color: var(--color-white, #fff);
  }

  .label {
    font-size: 0.875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-grey-600, #666);
  }

  .cta-card:hover .label {
    color: var(--color-grey-400, #999);
  }

  .cta-card h3 {
    font-size: 1.5rem;
    font-weight: 800;
    margin: 0;
  }

  .cta-card p {
    color: var(--color-swiss-red, #ff0000);
    margin: 0;
    font-weight: 600;
  }

  .icon-arrow {
    margin-top: auto;
    font-size: 1.5rem;
    font-weight: 800;
    align-self: flex-end;
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/CTACard.astro
git commit -m "feat(ui): create CTACard component"
```

---

### Task 6: Refactor English Index Page

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Replace content**

Import the new components at the top of `src/pages/index.astro`:
```javascript
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
import ParticleAnimation from '../components/ParticleAnimation.astro';
import SDGCard from '../components/SDGCard.astro';
import PlatformStatement from '../components/PlatformStatement.astro';
import ProductCard from '../components/ProductCard.astro';
import CTACard from '../components/CTACard.astro';
import { getTranslations } from '../i18n/utils';
```

Replace the `.vision-section` and `.pillars-grid` elements with the new structured content:

```html
        <div class="vision-section grid-item scroll-reveal">
            <h2 class="vision-title">{t('hook.question')}</h2>
            <p class="vision-subtext">{t('hook.subtext')}</p>
        </div>

        <div class="pillars-grid grid-item">
            <SDGCard 
                label={t('sdg.hunger.label')} 
                title={t('sdg.hunger.title')} 
                description={t('sdg.hunger.desc')} 
            />
            <SDGCard 
                label={t('sdg.green.label')} 
                title={t('sdg.green.title')} 
                description={t('sdg.green.desc')} 
            />
            <SDGCard 
                label={t('sdg.medicine.label')} 
                title={t('sdg.medicine.title')} 
                description={t('sdg.medicine.desc')} 
            />
        </div>

        <PlatformStatement set:html={t('platform.statement')} />

        <div class="products-stack grid-item">
            <ProductCard 
                label={t('products.binders.label')}
                title={t('products.binders.title')}
                description={t('products.binders.desc')}
                href="/pipeline/bp326"
            >
                <div slot="imageSlot" class="placeholder"><span>Protein Binder 3D Render Placeholder</span></div>
            </ProductCard>

            <ProductCard 
                label={t('products.nanocage.label')}
                title={t('products.nanocage.title')}
                description={t('products.nanocage.desc')}
                href="/pipeline/ribh"
            >
                <div slot="imageSlot" class="placeholder"><span>Nanocage Structure Placeholder</span></div>
            </ProductCard>

            <ProductCard 
                label={t('products.enzymes.label')}
                title={t('products.enzymes.title')}
                description={t('products.enzymes.desc')}
                href="/pipeline"
            >
                <div slot="imageSlot" class="placeholder"><span>Enzyme Fold Structures Placeholder</span></div>
            </ProductCard>
        </div>

        <div class="explore-section grid-item scroll-reveal">
            <h2 class="explore-title">{t('explore.title')}</h2>
            <div class="pillars-grid">
                <CTACard 
                    label={t('explore.pipeline.label')}
                    title={t('explore.pipeline.title')}
                    subtitle={t('explore.pipeline.subtitle')}
                    href="/pipeline"
                />
                <CTACard 
                    label={t('explore.blog.label')}
                    title={t('explore.blog.title')}
                    subtitle={t('explore.blog.subtitle')}
                    href="/blog"
                />
                <CTACard 
                    label={t('explore.team.label')}
                    title={t('explore.team.title')}
                    subtitle={t('explore.team.subtitle')}
                    href="/about"
                />
            </div>
        </div>
```

Update CSS. Remove `.pillar`, `.pillar h3`, `.pillar p` styles and add the new styles:

```css
    .vision-subtext {
        font-size: clamp(1.25rem, 2vw, 1.5rem);
        color: var(--color-grey-600);
        margin-top: 1rem;
        max-width: 800px;
        line-height: 1.5;
    }

    .products-stack {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        margin: 4rem 0;
    }

    .explore-section {
        margin-top: 4rem;
    }

    .explore-title {
        font-size: 2rem;
        font-weight: 800;
        margin-bottom: 2rem;
    }
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat(pages): integrate new copywriting and components into en index"
```

---

### Task 7: Refactor Chinese Index Page

**Files:**
- Modify: `src/pages/zh/index.astro`

- [ ] **Step 1: Replace content**

Import the new components identically, adjusting for the deeper path:
```javascript
import Layout from '../../layouts/Layout.astro';
import Hero from '../../components/Hero.astro';
import ParticleAnimation from '../../components/ParticleAnimation.astro';
import SDGCard from '../../components/SDGCard.astro';
import PlatformStatement from '../../components/PlatformStatement.astro';
import ProductCard from '../../components/ProductCard.astro';
import CTACard from '../../components/CTACard.astro';
import { getTranslations } from '../../i18n/utils';
```

Replace the `.vision-section` and `.pillars-grid` elements with the exact same structure as Task 6 (since Astro handles translations through `t()`):

```html
        <div class="vision-section grid-item scroll-reveal">
            <h2 class="vision-title">{t('hook.question')}</h2>
            <p class="vision-subtext">{t('hook.subtext')}</p>
        </div>

        <div class="pillars-grid grid-item">
            <SDGCard 
                label={t('sdg.hunger.label')} 
                title={t('sdg.hunger.title')} 
                description={t('sdg.hunger.desc')} 
            />
            <SDGCard 
                label={t('sdg.green.label')} 
                title={t('sdg.green.title')} 
                description={t('sdg.green.desc')} 
            />
            <SDGCard 
                label={t('sdg.medicine.label')} 
                title={t('sdg.medicine.title')} 
                description={t('sdg.medicine.desc')} 
            />
        </div>

        <PlatformStatement set:html={t('platform.statement')} />

        <div class="products-stack grid-item">
            <ProductCard 
                label={t('products.binders.label')}
                title={t('products.binders.title')}
                description={t('products.binders.desc')}
                href="/pipeline/bp326"
            >
                <div slot="imageSlot" class="placeholder"><span>Protein Binder 3D Render Placeholder</span></div>
            </ProductCard>

            <ProductCard 
                label={t('products.nanocage.label')}
                title={t('products.nanocage.title')}
                description={t('products.nanocage.desc')}
                href="/pipeline/ribh"
            >
                <div slot="imageSlot" class="placeholder"><span>Nanocage Structure Placeholder</span></div>
            </ProductCard>

            <ProductCard 
                label={t('products.enzymes.label')}
                title={t('products.enzymes.title')}
                description={t('products.enzymes.desc')}
                href="/pipeline"
            >
                <div slot="imageSlot" class="placeholder"><span>Enzyme Fold Structures Placeholder</span></div>
            </ProductCard>
        </div>

        <div class="explore-section grid-item scroll-reveal">
            <h2 class="explore-title">{t('explore.title')}</h2>
            <div class="pillars-grid">
                <CTACard 
                    label={t('explore.pipeline.label')}
                    title={t('explore.pipeline.title')}
                    subtitle={t('explore.pipeline.subtitle')}
                    href="/pipeline"
                />
                <CTACard 
                    label={t('explore.blog.label')}
                    title={t('explore.blog.title')}
                    subtitle={t('explore.blog.subtitle')}
                    href="/blog"
                />
                <CTACard 
                    label={t('explore.team.label')}
                    title={t('explore.team.title')}
                    subtitle={t('explore.team.subtitle')}
                    href="/about"
                />
            </div>
        </div>
```

Update CSS identically to Task 6: remove `.pillar`, `.pillar h3`, `.pillar p` styles and add the new `.vision-subtext`, `.products-stack`, `.explore-section`, `.explore-title` styles.

- [ ] **Step 2: Commit**

```bash
git add src/pages/zh/index.astro
git commit -m "feat(pages): integrate new copywriting and components into zh index"
```

---
