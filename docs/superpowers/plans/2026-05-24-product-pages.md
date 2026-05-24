# Product Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add BDA+ and Pipeline page categories with dropdown navigation, replacing "Protein Design Studio" in the navbar.

**Architecture:** 5 new reusable components (DropdownNav, MetricCard, ApplicationCard, WorkflowStep, PipelineShell), 5 new bilingual page pairs, updated navbar with dropdown menus. All content driven by i18n keys in en.json/zh.json.

**Tech Stack:** Astro SSR, TypeScript, CSS variables (Swiss Red design system), Vitest

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `src/i18n/en.json` | Modify | Add ~30 new translation keys |
| `src/i18n/zh.json` | Modify | Add ~30 new translation keys |
| `src/components/MetricCard.astro` | Create | Reusable metric display (value + label) |
| `src/components/ApplicationCard.astro` | Create | Application path card (title + description) |
| `src/components/WorkflowStep.astro` | Create | Workflow stepper item (number + title + tool + desc) |
| `src/components/PipelineShell.astro` | Create | Pipeline page template (hero + key facts + placeholder) |
| `src/components/DropdownNav.astro` | Create | Reusable dropdown nav menu |
| `src/components/Navbar.astro` | Modify | Replace studio link with BDA+ and Pipeline dropdowns |
| `src/pages/bda/index.astro` | Create | BDA+ Overview page (en) |
| `src/pages/bda/workflow.astro` | Create | BDA+ Workflow page (en) |
| `src/pages/pipeline/bp-326.astro` | Create | BP 326 pipeline page (en) |
| `src/pages/pipeline/ribh.astro` | Create | RibH pipeline page (en) |
| `src/pages/pipeline/cd3.astro` | Create | CD3+ pipeline page (en) |
| `src/pages/zh/bda/index.astro` | Create | BDA+ Overview page (zh) |
| `src/pages/zh/bda/workflow.astro` | Create | BDA+ Workflow page (zh) |
| `src/pages/zh/pipeline/bp-326.astro` | Create | BP 326 pipeline page (zh) |
| `src/pages/zh/pipeline/ribh.astro` | Create | RibH pipeline page (zh) |
| `src/pages/zh/pipeline/cd3.astro` | Create | CD3+ pipeline page (zh) |
| `src/tests/components/MetricCard.test.ts` | Create | Component test |
| `src/tests/components/ApplicationCard.test.ts` | Create | Component test |
| `src/tests/components/WorkflowStep.test.ts` | Create | Component test |
| `src/tests/components/PipelineShell.test.ts` | Create | Component test |
| `src/tests/components/DropdownNav.test.ts` | Create | Component test |
| `src/tests/navbar.test.ts` | Modify | Update for new nav structure |

---

### Task 1: Add i18n Keys

**Files:**
- Modify: `src/i18n/en.json`
- Modify: `src/i18n/zh.json`

- [ ] **Step 1: Add English translation keys**

Add these keys to `src/i18n/en.json` (after existing keys, before closing `}`):

```json
"nav.bda": "BDA+",
"nav.bda.overview": "Overview",
"nav.bda.overview.desc": "Platform capabilities and application paths",
"nav.bda.workflow": "BDA Workflow",
"nav.bda.workflow.desc": "Design automation pipeline and feedback engine",
"nav.pipeline": "Pipeline",
"nav.pipeline.bp326": "BP 326",
"nav.pipeline.bp326.desc": "AI-designed PD-1 binder",
"nav.pipeline.ribh": "RibH",
"nav.pipeline.ribh.desc": "Nanocage vaccine display platform",
"nav.pipeline.cd3": "CD3+",
"nav.pipeline.cd3.desc": "T-cell engager binding protein",
"bda.hero.tagline": "AI-driven protein design automation — from sequence to structure to function",
"bda.metric.cycle.value": "8mo",
"bda.metric.cycle.label": "R&D Cycle",
"bda.metric.cycle.sublabel": "From 3 years",
"bda.metric.cost.value": "60-70%",
"bda.metric.cost.label": "Lower R&D Cost",
"bda.metric.industrial.value": "1.5yr",
"bda.metric.industrial.label": "Industrialization Cycle",
"bda.metric.industrial.sublabel": "From 5 years",
"bda.drug.title": "Drug Discovery",
"bda.drug.desc": "High-affinity binder candidates, structural insights, expression/purification data. From target to lead in weeks.",
"bda.vaccine.title": "Vaccine & Display",
"bda.vaccine.desc": "Antigen display design, nanocage architecture, multimeric conformations. Accelerate vaccine development.",
"bda.enzyme.title": "Industrial Enzymes",
"bda.enzyme.desc": "De novo enzyme design with 100x efficiency. Ambient production for green manufacturing.",
"bda.workflow.title": "BDA+ Workflow",
"bda.workflow.subtitle": "Design · Build · Test · Learn · Scale",
"bda.workflow.step1.title": "Structure Input",
"bda.workflow.step1.tool": "BDA UI + AF3",
"bda.workflow.step1.desc": "Get or complete target 3D structure",
"bda.workflow.step2.title": "Backbone Generation",
"bda.workflow.step2.tool": "Diffusion Model",
"bda.workflow.step2.desc": "Denoise to generate protein backbones (~1,500 candidates)",
"bda.workflow.step3.title": "Sequence Design",
"bda.workflow.step3.tool": "GNN Model",
"bda.workflow.step3.desc": "Reverse-fold assign sequences (10 per backbone)",
"bda.workflow.step4.title": "Structure Validation",
"bda.workflow.step4.tool": "AlphaFold2/3",
"bda.workflow.step4.desc": "pLDDT filter; predict binding geometry",
"bda.workflow.step5.title": "Interface Scoring",
"bda.workflow.step5.tool": "Rosetta",
"bda.workflow.step5.desc": "ΔG_bind, SASA, shape complementarity",
"bda.workflow.step6.title": "Partial Optimization",
"bda.workflow.step6.tool": "Partial Diffusion",
"bda.workflow.step6.desc": "Local resampling in lead backbone neighborhood",
"bda.feedback.title": "Feedback Engine",
"bda.feedback.cycle": "Design → Experiment → Data → Tokenizer → LLM → Better Design",
"bda.feedback.quote": "Failed data is as valuable as successful data.",
"bda.workflow.placeholder": "Concept Visualization — Coming Soon",
"pipeline.status": "Status",
"pipeline.preclinical": "Preclinical",
"pipeline.target": "Target",
"pipeline.type": "Molecule Type",
"pipeline.coming_soon": "Detailed data and results coming soon.",
"pipeline.bp326.title": "BP 326",
"pipeline.bp326.desc": "AI-designed PD-1 binder (~200 aa). Alternative to Keytruda/Pembrolizumab. 3-month design cycle.",
"pipeline.bp326.target": "PD-1",
"pipeline.bp326.type": "De novo binder",
"pipeline.ribh.title": "RibH",
"pipeline.ribh.desc": "Nanocage vaccine display platform. Self-assembling protein cage architecture.",
"pipeline.ribh.type": "Nanocage",
"pipeline.cd3.title": "CD3+",
"pipeline.cd3.desc": "T-cell engager binding protein for immuno-oncology.",
"pipeline.cd3.target": "CD3ε",
"pipeline.cd3.type": "Binding protein"
```

- [ ] **Step 2: Add Chinese translation keys**

Add these keys to `src/i18n/zh.json` (after existing keys, before closing `}`):

```json
"nav.bda": "BDA+",
"nav.bda.overview": "平台概览",
"nav.bda.overview.desc": "平台能力与应用路径",
"nav.bda.workflow": "BDA 工作流",
"nav.bda.workflow.desc": "设计自动化流程与反馈引擎",
"nav.pipeline": "管线",
"nav.pipeline.bp326": "BP 326",
"nav.pipeline.bp326.desc": "AI 设计的 PD-1 结合蛋白",
"nav.pipeline.ribh": "RibH",
"nav.pipeline.ribh.desc": "纳米笼疫苗展示平台",
"nav.pipeline.cd3": "CD3+",
"nav.pipeline.cd3.desc": "T 细胞衔接结合蛋白",
"bda.hero.tagline": "AI 驱动的蛋白质设计自动化 — 从序列到结构到功能",
"bda.metric.cycle.value": "8 个月",
"bda.metric.cycle.label": "研发周期",
"bda.metric.cycle.sublabel": "从 3 年缩短",
"bda.metric.cost.value": "60-70%",
"bda.metric.cost.label": "研发成本降低",
"bda.metric.industrial.value": "1.5 年",
"bda.metric.industrial.label": "产业化周期",
"bda.metric.industrial.sublabel": "从 5 年缩短",
"bda.drug.title": "药物发现",
"bda.drug.desc": "高亲和力结合蛋白候选物、结构解析、表达纯化数据。从靶点到先导物仅需数周。",
"bda.vaccine.title": "疫苗与展示",
"bda.vaccine.desc": "抗原展示设计、纳米笼架构、多聚体构象。加速疫苗研发。",
"bda.enzyme.title": "工业酶",
"bda.enzyme.desc": "从头酶设计，效率提升 100 倍。常温生产，绿色制造。",
"bda.workflow.title": "BDA+ 工作流",
"bda.workflow.subtitle": "设计 · 构建 · 测试 · 学习 · 扩展",
"bda.workflow.step1.title": "结构输入",
"bda.workflow.step1.tool": "BDA UI + AF3",
"bda.workflow.step1.desc": "获取或补全靶标三维结构",
"bda.workflow.step2.title": "骨架生成",
"bda.workflow.step2.tool": "扩散模型",
"bda.workflow.step2.desc": "去噪生成蛋白骨架（约 1,500 条候选）",
"bda.workflow.step3.title": "序列设计",
"bda.workflow.step3.tool": "GNN 模型",
"bda.workflow.step3.desc": "反向折叠赋序列（每骨架 10 条）",
"bda.workflow.step4.title": "结构验证",
"bda.workflow.step4.tool": "AlphaFold2/3",
"bda.workflow.step4.desc": "pLDDT 过滤；预测结合几何",
"bda.workflow.step5.title": "界面打分",
"bda.workflow.step5.tool": "Rosetta",
"bda.workflow.step5.desc": "ΔG_bind、SASA、形状互补性",
"bda.workflow.step6.title": "局部优化",
"bda.workflow.step6.tool": "部分扩散",
"bda.workflow.step6.desc": "在先导骨架邻域内局部重采样",
"bda.feedback.title": "反馈引擎",
"bda.feedback.cycle": "设计 → 实验 → 数据 → Tokenizer → LLM → 更优设计",
"bda.feedback.quote": "失败数据与成功数据同等价值。",
"bda.workflow.placeholder": "概念可视化 — 即将推出",
"pipeline.status": "状态",
"pipeline.preclinical": "临床前",
"pipeline.target": "靶点",
"pipeline.type": "分子类型",
"pipeline.coming_soon": "详细数据和结果即将推出。",
"pipeline.bp326.title": "BP 326",
"pipeline.bp326.desc": "AI 设计的 PD-1 结合蛋白（约 200 氨基酸）。Keytruda 替代方案。3 个月设计周期。",
"pipeline.bp326.target": "PD-1",
"pipeline.bp326.type": "从头结合蛋白",
"pipeline.ribh.title": "RibH",
"pipeline.ribh.desc": "纳米笼疫苗展示平台。自组装蛋白笼架构。",
"pipeline.ribh.type": "纳米笼",
"pipeline.cd3.title": "CD3+",
"pipeline.cd3.desc": "用于肿瘤免疫治疗的 T 细胞衔接结合蛋白。",
"pipeline.cd3.target": "CD3ε",
"pipeline.cd3.type": "结合蛋白"
```

- [ ] **Step 3: Run i18n tests**

Run: `npx vitest run src/tests/i18n.test.ts`
Expected: PASS (existing tests still pass, new keys don't break anything)

- [ ] **Step 4: Commit**

```bash
git add src/i18n/en.json src/i18n/zh.json
git commit -m "feat(i18n): add BDA+ and Pipeline translation keys"
```

---

### Task 2: Create MetricCard Component

**Files:**
- Create: `src/components/MetricCard.astro`
- Create: `src/tests/components/MetricCard.test.ts`

- [ ] **Step 1: Write the test**

Create `src/tests/components/MetricCard.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('MetricCard Component', () => {
  const componentPath = path.resolve(__dirname, '../../components/MetricCard.astro');

  it('should exist', () => {
    expect(fs.existsSync(componentPath)).toBe(true);
  });

  it('should accept value, label, and optional sublabel props', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('value: string');
    expect(content).toContain('label: string');
    expect(content).toContain('sublabel?: string');
  });

  it('should display the value with swiss-red color', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('var(--color-swiss-red)');
  });

  it('should use the outline class for border', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('outline');
  });

  it('should render the value, label, and sublabel', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('{value}');
    expect(content).toContain('{label}');
    expect(content).toContain('{sublabel}');
  });

  it('should use scoped styles', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('<style>');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/tests/components/MetricCard.test.ts`
Expected: FAIL (component doesn't exist yet)

- [ ] **Step 3: Create the component**

Create `src/components/MetricCard.astro`:

```astro
---
interface Props {
    value: string;
    label: string;
    sublabel?: string;
}

const { value, label, sublabel } = Astro.props;
---

<div class="metric-card outline">
    <span class="metric-value">{value}</span>
    <span class="metric-label">{label}</span>
    {sublabel && <span class="metric-sublabel">{sublabel}</span>}
</div>

<style>
    .metric-card {
        background: var(--color-white);
        padding: 3rem 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        text-align: center;
    }

    .metric-value {
        font-size: clamp(3rem, 8vw, 5rem);
        font-weight: 800;
        color: var(--color-swiss-red);
        line-height: 1;
    }

    .metric-label {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--color-grey-800);
    }

    .metric-sublabel {
        font-size: 0.875rem;
        color: var(--color-grey-600);
    }

    @media (max-width: 640px) {
        .metric-card {
            padding: 2rem 1rem;
        }

        .metric-value {
            font-size: clamp(2.5rem, 10vw, 4rem);
        }
    }
</style>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/tests/components/MetricCard.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/MetricCard.astro src/tests/components/MetricCard.test.ts
git commit -m "feat(components): add MetricCard component"
```

---

### Task 3: Create ApplicationCard Component

**Files:**
- Create: `src/components/ApplicationCard.astro`
- Create: `src/tests/components/ApplicationCard.test.ts`

- [ ] **Step 1: Write the test**

Create `src/tests/components/ApplicationCard.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('ApplicationCard Component', () => {
  const componentPath = path.resolve(__dirname, '../../components/ApplicationCard.astro');

  it('should exist', () => {
    expect(fs.existsSync(componentPath)).toBe(true);
  });

  it('should accept title, description, and optional href props', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('title: string');
    expect(content).toContain('description: string');
    expect(content).toContain('href?: string');
  });

  it('should display the title with swiss-red color', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('var(--color-swiss-red)');
  });

  it('should use the outline class for border', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('outline');
  });

  it('should render as anchor when href is provided', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('href');
  });

  it('should use scoped styles', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('<style>');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/tests/components/ApplicationCard.test.ts`
Expected: FAIL

- [ ] **Step 3: Create the component**

Create `src/components/ApplicationCard.astro`:

```astro
---
interface Props {
    title: string;
    description: string;
    href?: string;
}

const { title, description, href } = Astro.props;
const Tag = href ? 'a' : 'div';
---

<Tag href={href} class:list={['app-card', 'outline', { 'app-card--link': href }]}>
    <h3 class="app-card-title">{title}</h3>
    <p class="app-card-desc">{description}</p>
    {href && <span class="app-card-arrow">→</span>}
</Tag>

<style>
    .app-card {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        background: var(--color-white);
        text-decoration: none;
        color: inherit;
        transition: all 0.2s ease;
    }

    .app-card--link:hover {
        background-color: var(--color-grey-100);
    }

    .app-card-title {
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--color-swiss-red);
    }

    .app-card-desc {
        color: var(--color-grey-800);
        line-height: 1.6;
    }

    .app-card-arrow {
        font-size: 1.5rem;
        font-weight: 800;
        margin-top: auto;
        transition: transform 0.2s ease;
    }

    .app-card--link:hover .app-card-arrow {
        transform: translateX(4px);
    }

    @media (max-width: 640px) {
        .app-card {
            padding: 1.5rem;
        }
    }
</style>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/tests/components/ApplicationCard.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/ApplicationCard.astro src/tests/components/ApplicationCard.test.ts
git commit -m "feat(components): add ApplicationCard component"
```

---

### Task 4: Create WorkflowStep Component

**Files:**
- Create: `src/components/WorkflowStep.astro`
- Create: `src/tests/components/WorkflowStep.test.ts`

- [ ] **Step 1: Write the test**

Create `src/tests/components/WorkflowStep.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('WorkflowStep Component', () => {
  const componentPath = path.resolve(__dirname, '../../components/WorkflowStep.astro');

  it('should exist', () => {
    expect(fs.existsSync(componentPath)).toBe(true);
  });

  it('should accept step, title, tool, and description props', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('step: number');
    expect(content).toContain('title: string');
    expect(content).toContain('tool: string');
    expect(content).toContain('description: string');
  });

  it('should render a numbered step indicator', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('{step}');
  });

  it('should display the tool name in monospace style', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('monospace');
  });

  it('should use scoped styles', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('<style>');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/tests/components/WorkflowStep.test.ts`
Expected: FAIL

- [ ] **Step 3: Create the component**

Create `src/components/WorkflowStep.astro`:

```astro
---
interface Props {
    step: number;
    title: string;
    tool: string;
    description: string;
}

const { step, title, tool, description } = Astro.props;
---

<div class="workflow-step">
    <div class="step-indicator">
        <span class="step-number">{step}</span>
        <div class="step-line"></div>
    </div>
    <div class="step-content">
        <h3 class="step-title">{title}</h3>
        <span class="step-tool">{tool}</span>
        <p class="step-desc">{description}</p>
    </div>
</div>

<style>
    .workflow-step {
        display: flex;
        gap: 2rem;
    }

    .step-indicator {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
    }

    .step-number {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: var(--color-black);
        color: var(--color-white);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        font-size: 1.25rem;
    }

    .step-line {
        width: 2px;
        flex: 1;
        background: var(--color-grey-300);
        min-height: 2rem;
    }

    .workflow-step:last-child .step-line {
        display: none;
    }

    .step-content {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding-bottom: 2rem;
    }

    .step-title {
        font-size: 1.25rem;
        font-weight: 800;
    }

    .step-tool {
        font-family: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;
        font-size: 0.8rem;
        background: var(--color-grey-100);
        padding: 0.25rem 0.75rem;
        border: 1px solid var(--color-grey-300);
        display: inline-block;
        width: fit-content;
    }

    .step-desc {
        color: var(--color-grey-700);
        line-height: 1.6;
    }

    @media (max-width: 640px) {
        .workflow-step {
            gap: 1rem;
        }

        .step-number {
            width: 36px;
            height: 36px;
            font-size: 1rem;
        }

        .step-content {
            padding-bottom: 1.5rem;
        }
    }
</style>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/tests/components/WorkflowStep.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/WorkflowStep.astro src/tests/components/WorkflowStep.test.ts
git commit -m "feat(components): add WorkflowStep component"
```

---

### Task 5: Create PipelineShell Component

**Files:**
- Create: `src/components/PipelineShell.astro`
- Create: `src/tests/components/PipelineShell.test.ts`

- [ ] **Step 1: Write the test**

Create `src/tests/components/PipelineShell.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('PipelineShell Component', () => {
  const componentPath = path.resolve(__dirname, '../../components/PipelineShell.astro');

  it('should exist', () => {
    expect(fs.existsSync(componentPath)).toBe(true);
  });

  it('should accept title, description, target, moleculeType, status, and lang props', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('title: string');
    expect(content).toContain('description: string');
    expect(content).toContain('target: string');
    expect(content).toContain('moleculeType: string');
    expect(content).toContain('status: string');
    expect(content).toContain("lang: 'en' | 'zh'");
  });

  it('should use the outline class for border', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('outline');
  });

  it('should render key facts sidebar', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('{target}');
    expect(content).toContain('{moleculeType}');
    expect(content).toContain('{status}');
  });

  it('should use scoped styles', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('<style>');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/tests/components/PipelineShell.test.ts`
Expected: FAIL

- [ ] **Step 3: Create the component**

Create `src/components/PipelineShell.astro`:

```astro
---
import { getTranslations } from '../i18n/utils';

interface Props {
    title: string;
    description: string;
    target: string;
    moleculeType: string;
    status: string;
    lang: 'en' | 'zh';
}

const { title, description, target, moleculeType, status, lang } = Astro.props;
const t = getTranslations(lang);
---

<div class="pipeline-hero grid-item">
    <h1 class="pipeline-title">{title}</h1>
    <p class="pipeline-desc">{description}</p>
    <span class="status-badge outline">{status}</span>
</div>

<div class="pipeline-body grid-item">
    <aside class="key-facts outline">
        <h2 class="facts-heading">{t('pipeline.status')}</h2>
        <div class="fact">
            <span class="fact-label">{t('pipeline.target')}</span>
            <span class="fact-value">{target}</span>
        </div>
        <div class="fact">
            <span class="fact-label">{t('pipeline.type')}</span>
            <span class="fact-value">{moleculeType}</span>
        </div>
        <div class="fact">
            <span class="fact-label">{t('pipeline.status')}</span>
            <span class="fact-value">{status}</span>
        </div>
    </aside>

    <div class="pipeline-main">
        <div class="coming-soon outline">
            <p>{t('pipeline.coming_soon')}</p>
        </div>
    </div>
</div>

<style>
    .pipeline-hero {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .pipeline-title {
        font-size: clamp(3rem, 8vw, 5rem);
        font-weight: 800;
        line-height: 1;
        text-transform: uppercase;
    }

    .pipeline-desc {
        font-size: clamp(1.25rem, 3vw, 1.5rem);
        color: var(--color-grey-700);
        max-width: 700px;
        line-height: 1.5;
    }

    .status-badge {
        display: inline-block;
        padding: 0.5rem 1.5rem;
        font-weight: 700;
        font-size: 0.875rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        width: fit-content;
    }

    .pipeline-body {
        display: grid;
        grid-template-columns: 300px 1fr;
        gap: var(--grid-gutter);
    }

    .key-facts {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        background: var(--color-grey-100);
        height: fit-content;
    }

    .facts-heading {
        font-size: 1rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        padding-bottom: 0.75rem;
        border-bottom: 2px solid var(--color-black);
    }

    .fact {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .fact-label {
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--color-grey-600);
    }

    .fact-value {
        font-size: 1.125rem;
        font-weight: 600;
    }

    .coming-soon {
        padding: 4rem 2rem;
        text-align: center;
        background: var(--color-grey-100);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .coming-soon p {
        font-size: 1.125rem;
        color: var(--color-grey-600);
        font-style: italic;
    }

    @media (max-width: 1024px) {
        .pipeline-body {
            grid-template-columns: 1fr;
        }
    }

    @media (max-width: 640px) {
        .pipeline-content {
            padding-top: 6rem;
            gap: 2rem var(--grid-gutter);
        }

        .key-facts {
            padding: 1.5rem;
        }

        .coming-soon {
            padding: 2rem 1rem;
        }
    }
</style>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/tests/components/PipelineShell.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/PipelineShell.astro src/tests/components/PipelineShell.test.ts
git commit -m "feat(components): add PipelineShell template component"
```

---

### Task 6: Create DropdownNav Component and Update Navbar

**Files:**
- Create: `src/components/DropdownNav.astro`
- Create: `src/tests/components/DropdownNav.test.ts`
- Modify: `src/components/Navbar.astro`
- Modify: `src/tests/navbar.test.ts`

- [ ] **Step 1: Write the test**

Create `src/tests/components/DropdownNav.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('DropdownNav Component', () => {
  const componentPath = path.resolve(__dirname, '../../components/DropdownNav.astro');

  it('should exist', () => {
    expect(fs.existsSync(componentPath)).toBe(true);
  });

  it('should accept label, items, and lang props', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('label: string');
    expect(content).toContain('items:');
    expect(content).toContain("lang: 'en' | 'zh'");
  });

  it('should render dropdown items with href, label, and optional description', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('href');
    expect(content).toContain('{item.label}');
  });

  it('should handle mobile layout', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('@media');
  });

  it('should use scoped styles', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('<style>');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/tests/components/DropdownNav.test.ts`
Expected: FAIL

- [ ] **Step 3: Create the DropdownNav component**

Create `src/components/DropdownNav.astro`:

```astro
---
interface DropdownItem {
    href: string;
    label: string;
    description?: string;
}

interface Props {
    label: string;
    items: DropdownItem[];
    lang: 'en' | 'zh';
}

const { label, items, lang } = Astro.props;
---

<div class="dropdown-nav" role="navigation" aria-label={label}>
    <button class="dropdown-trigger" type="button" aria-expanded="false" aria-haspopup="true">
        <span class="dropdown-label">{label}</span>
        <span class="dropdown-chevron">▾</span>
    </button>
    <div class="dropdown-panel" role="menu">
        {items.map((item) => (
            <a href={item.href} class="dropdown-item" role="menuitem">
                <span class="dropdown-item-label">{item.label}</span>
                {item.description && <span class="dropdown-item-desc">{item.description}</span>}
            </a>
        ))}
    </div>
</div>

<style>
    .dropdown-nav {
        position: relative;
    }

    .dropdown-trigger {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        width: 160px;
        height: 40px;
        background: none;
        border: 1px solid var(--color-black);
        cursor: pointer;
        font-family: var(--font-family);
        font-weight: 700;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        transition: all 0.2s ease;
        margin-left: -1px;
    }

    .dropdown-trigger:hover,
    .dropdown-trigger[aria-expanded="true"] {
        background-color: var(--color-black);
        color: var(--color-white);
    }

    .dropdown-chevron {
        font-size: 0.7rem;
        transition: transform 0.2s ease;
    }

    .dropdown-trigger[aria-expanded="true"] .dropdown-chevron {
        transform: rotate(180deg);
    }

    .dropdown-panel {
        position: absolute;
        top: 100%;
        left: -1px;
        min-width: 240px;
        background: var(--color-white);
        border: 1px solid var(--color-black);
        opacity: 0;
        visibility: hidden;
        transform: translateY(-4px);
        transition: all 0.2s ease;
        z-index: 100;
        display: flex;
        flex-direction: column;
    }

    .dropdown-nav:hover .dropdown-panel,
    .dropdown-trigger[aria-expanded="true"] + .dropdown-panel {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }

    .dropdown-item {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        padding: 0.75rem 1rem;
        text-decoration: none;
        color: var(--color-black);
        transition: background-color 0.15s ease;
        border-bottom: 1px solid var(--color-grey-200);
    }

    .dropdown-item:last-child {
        border-bottom: none;
    }

    .dropdown-item:hover {
        background-color: var(--color-grey-100);
    }

    .dropdown-item-label {
        font-weight: 700;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .dropdown-item-desc {
        font-size: 0.75rem;
        color: var(--color-grey-600);
        text-transform: none;
        letter-spacing: normal;
    }

    @media (max-width: 768px) {
        .dropdown-nav {
            width: 100%;
        }

        .dropdown-trigger {
            width: 100%;
            justify-content: space-between;
            padding: 0 1rem;
            border: none;
            border-bottom: 1px solid var(--color-grey-200);
            margin-left: 0;
        }

        .dropdown-panel {
            position: static;
            border: none;
            opacity: 1;
            visibility: visible;
            transform: none;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }

        .dropdown-nav.open .dropdown-panel {
            max-height: 500px;
        }

        .dropdown-item {
            padding-left: 2rem;
        }
    }
</style>

<script>
    document.querySelectorAll('.dropdown-trigger').forEach((trigger) => {
        trigger.addEventListener('click', () => {
            const expanded = trigger.getAttribute('aria-expanded') === 'true';
            trigger.setAttribute('aria-expanded', (!expanded).toString());
            trigger.closest('.dropdown-nav')?.classList.toggle('open');
        });
    });

    document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        document.querySelectorAll('.dropdown-trigger').forEach((trigger) => {
            if (!trigger.closest('.dropdown-nav')?.contains(target)) {
                trigger.setAttribute('aria-expanded', 'false');
                trigger.closest('.dropdown-nav')?.classList.remove('open');
            }
        });
    });
</script>
```

- [ ] **Step 4: Run DropdownNav test to verify it passes**

Run: `npx vitest run src/tests/components/DropdownNav.test.ts`
Expected: PASS

- [ ] **Step 5: Update Navbar to use DropdownNav**

Replace the `nav-links` section in `src/components/Navbar.astro` (lines 21-25) with:

```astro
<div class="nav-links desktop-only">
    <DropdownNav
        label={t('nav.bda')}
        lang={lang}
        items={[
            { href: lang === 'en' ? '/bda' : '/zh/bda', label: t('nav.bda.overview'), description: t('nav.bda.overview.desc') },
            { href: lang === 'en' ? '/bda/workflow' : '/zh/bda/workflow', label: t('nav.bda.workflow'), description: t('nav.bda.workflow.desc') },
        ]}
    />
    <DropdownNav
        label={t('nav.pipeline')}
        lang={lang}
        items={[
            { href: lang === 'en' ? '/pipeline/bp-326' : '/zh/pipeline/bp-326', label: t('nav.pipeline.bp326'), description: t('nav.pipeline.bp326.desc') },
            { href: lang === 'en' ? '/pipeline/ribh' : '/zh/pipeline/ribh', label: t('nav.pipeline.ribh'), description: t('nav.pipeline.ribh.desc') },
            { href: lang === 'en' ? '/pipeline/cd3' : '/zh/pipeline/cd3', label: t('nav.pipeline.cd3'), description: t('nav.pipeline.cd3.desc') },
        ]}
    />
    <NavLink href={lang === 'en' ? '/about' : '/zh/about'}>{t('nav.about')}</NavLink>
    <NavLink href="#">{t('nav.blog')}</NavLink>
</div>
```

Also update the mobile panel (lines 43-47) to include the new nav items:

```astro
<div class="mobile-links">
    <div class="mobile-section-label">{t('nav.bda')}</div>
    <NavLink href={lang === 'en' ? '/bda' : '/zh/bda'} class="mobile-nav-item">{t('nav.bda.overview')}</NavLink>
    <NavLink href={lang === 'en' ? '/bda/workflow' : '/zh/bda/workflow'} class="mobile-nav-item">{t('nav.bda.workflow')}</NavLink>
    <div class="mobile-section-label">{t('nav.pipeline')}</div>
    <NavLink href={lang === 'en' ? '/pipeline/bp-326' : '/zh/pipeline/bp-326'} class="mobile-nav-item">{t('nav.pipeline.bp326')}</NavLink>
    <NavLink href={lang === 'en' ? '/pipeline/ribh' : '/zh/pipeline/ribh'} class="mobile-nav-item">{t('nav.pipeline.ribh')}</NavLink>
    <NavLink href={lang === 'en' ? '/pipeline/cd3' : '/zh/pipeline/cd3'} class="mobile-nav-item">{t('nav.pipeline.cd3')}</NavLink>
    <NavLink href={lang === 'en' ? '/about' : '/zh/about'} class="mobile-nav-item">{t('nav.about')}</NavLink>
    <NavLink href="#" class="mobile-nav-item">{t('nav.blog')}</NavLink>
</div>
```

Add the import at the top of the frontmatter:

```typescript
import DropdownNav from './DropdownNav.astro';
```

Add mobile section label styles:

```css
.mobile-section-label {
    font-size: 0.7rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--color-grey-500);
    padding: 0.5rem 0 0.25rem;
    border-bottom: 1px solid var(--color-grey-200);
}
```

- [ ] **Step 6: Update navbar test**

Update `src/tests/navbar.test.ts` to check for new nav structure:

```typescript
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Navbar Component', () => {
  const navbarPath = path.resolve(__dirname, '../components/Navbar.astro');
  const navbarContent = fs.readFileSync(navbarPath, 'utf8');

  it('should implement the fixed floating position', () => {
    expect(navbarContent).toContain('position: fixed');
    expect(navbarContent).toContain('top: 0');
  });

  it('should apply the backdrop-filter blur effect', () => {
    expect(navbarContent).toContain('backdrop-filter: blur(12px)');
    expect(navbarContent).toContain('-webkit-backdrop-filter: blur(12px)');
  });

  it('should include the integrated language toggle', () => {
    expect(navbarContent).toContain('import LanguageToggle from \'./LanguageToggle.astro\'');
    expect(navbarContent).toContain('<LanguageToggle lang={lang} />');
  });

  it('should import and use DropdownNav for BDA+ and Pipeline', () => {
    expect(navbarContent).toContain('import DropdownNav from \'./DropdownNav.astro\'');
    expect(navbarContent).toContain("t('nav.bda')");
    expect(navbarContent).toContain("t('nav.pipeline')");
  });

  it('should include BDA+ dropdown items', () => {
    expect(navbarContent).toContain("t('nav.bda.overview')");
    expect(navbarContent).toContain("t('nav.bda.workflow')");
  });

  it('should include Pipeline dropdown items', () => {
    expect(navbarContent).toContain("t('nav.pipeline.bp326')");
    expect(navbarContent).toContain("t('nav.pipeline.ribh')");
    expect(navbarContent).toContain("t('nav.pipeline.cd3')");
  });

  it('should have the logo defined', () => {
    expect(navbarContent).toContain('BIGO BDA');
  });
});
```

- [ ] **Step 7: Run all navbar tests**

Run: `npx vitest run src/tests/navbar.test.ts`
Expected: PASS

- [ ] **Step 8: Commit**

```bash
git add src/components/DropdownNav.astro src/tests/components/DropdownNav.test.ts src/components/Navbar.astro src/tests/navbar.test.ts
git commit -m "feat(nav): add DropdownNav component and update navbar with BDA+ and Pipeline menus"
```

---

### Task 7: Create BDA Overview Page

**Files:**
- Create: `src/pages/bda/index.astro`
- Create: `src/pages/zh/bda/index.astro`

- [ ] **Step 1: Create the English BDA Overview page**

Create `src/pages/bda/index.astro`:

```astro
---
import Layout from '../../layouts/Layout.astro';
import MetricCard from '../../components/MetricCard.astro';
import ApplicationCard from '../../components/ApplicationCard.astro';
import { getTranslations } from '../../i18n/utils';

const lang = 'en';
const t = getTranslations(lang);
---
<Layout title={`${t('nav.bda')} | BIGO BDA`} lang={lang}>
    <main class="grid-container bda-content">

        <section class="metrics-hero grid-item">
            <MetricCard
                value={t('bda.metric.cycle.value')}
                label={t('bda.metric.cycle.label')}
                sublabel={t('bda.metric.cycle.sublabel')}
            />
            <MetricCard
                value={t('bda.metric.cost.value')}
                label={t('bda.metric.cost.label')}
            />
            <MetricCard
                value={t('bda.metric.industrial.value')}
                label={t('bda.metric.industrial.label')}
                sublabel={t('bda.metric.industrial.sublabel')}
            />
        </section>

        <div class="tagline-section grid-item">
            <p class="tagline">{t('bda.hero.tagline')}</p>
        </div>

        <section class="applications-section grid-item">
            <h2 class="section-heading">Application Paths</h2>
            <div class="applications-grid">
                <ApplicationCard
                    title={t('bda.drug.title')}
                    description={t('bda.drug.desc')}
                />
                <ApplicationCard
                    title={t('bda.vaccine.title')}
                    description={t('bda.vaccine.desc')}
                />
                <ApplicationCard
                    title={t('bda.enzyme.title')}
                    description={t('bda.enzyme.desc')}
                />
            </div>
        </section>

    </main>
</Layout>

<style>
    .bda-content {
        padding-top: 8rem;
        padding-bottom: 6rem;
        gap: 4rem var(--grid-gutter);
    }

    .metrics-hero {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--grid-gutter);
    }

    .tagline-section {
        max-width: 900px;
    }

    .tagline {
        font-size: clamp(1.5rem, 4vw, 2.5rem);
        font-weight: 800;
        line-height: 1.3;
        letter-spacing: -0.01em;
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

    .applications-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--grid-gutter);
    }

    @media (max-width: 1024px) {
        .metrics-hero {
            grid-template-columns: repeat(2, 1fr);
        }

        .applications-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 640px) {
        .bda-content {
            padding-top: 6rem;
            gap: 3rem var(--grid-gutter);
        }

        .metrics-hero {
            grid-template-columns: 1fr;
        }

        .applications-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
```

- [ ] **Step 2: Create the Chinese BDA Overview page**

Create `src/pages/zh/bda/index.astro`:

```astro
---
import Layout from '../../../layouts/Layout.astro';
import MetricCard from '../../../components/MetricCard.astro';
import ApplicationCard from '../../../components/ApplicationCard.astro';
import { getTranslations } from '../../../i18n/utils';

const lang = 'zh';
const t = getTranslations(lang);
---
<Layout title={`${t('nav.bda')} | BIGO BDA`} lang={lang}>
    <main class="grid-container bda-content">

        <section class="metrics-hero grid-item">
            <MetricCard
                value={t('bda.metric.cycle.value')}
                label={t('bda.metric.cycle.label')}
                sublabel={t('bda.metric.cycle.sublabel')}
            />
            <MetricCard
                value={t('bda.metric.cost.value')}
                label={t('bda.metric.cost.label')}
            />
            <MetricCard
                value={t('bda.metric.industrial.value')}
                label={t('bda.metric.industrial.label')}
                sublabel={t('bda.metric.industrial.sublabel')}
            />
        </section>

        <div class="tagline-section grid-item">
            <p class="tagline">{t('bda.hero.tagline')}</p>
        </div>

        <section class="applications-section grid-item">
            <h2 class="section-heading">应用路径</h2>
            <div class="applications-grid">
                <ApplicationCard
                    title={t('bda.drug.title')}
                    description={t('bda.drug.desc')}
                />
                <ApplicationCard
                    title={t('bda.vaccine.title')}
                    description={t('bda.vaccine.desc')}
                />
                <ApplicationCard
                    title={t('bda.enzyme.title')}
                    description={t('bda.enzyme.desc')}
                />
            </div>
        </section>

    </main>
</Layout>

<style>
    .bda-content {
        padding-top: 8rem;
        padding-bottom: 6rem;
        gap: 4rem var(--grid-gutter);
    }

    .metrics-hero {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--grid-gutter);
    }

    .tagline-section {
        max-width: 900px;
    }

    .tagline {
        font-size: clamp(1.5rem, 4vw, 2.5rem);
        font-weight: 800;
        line-height: 1.3;
        letter-spacing: -0.01em;
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

    .applications-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--grid-gutter);
    }

    @media (max-width: 1024px) {
        .metrics-hero {
            grid-template-columns: repeat(2, 1fr);
        }

        .applications-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 640px) {
        .bda-content {
            padding-top: 6rem;
            gap: 3rem var(--grid-gutter);
        }

        .metrics-hero {
            grid-template-columns: 1fr;
        }

        .applications-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/bda/index.astro src/pages/zh/bda/index.astro
git commit -m "feat(pages): add BDA+ Overview page with metrics and application cards"
```

---

### Task 8: Create BDA Workflow Page

**Files:**
- Create: `src/pages/bda/workflow.astro`
- Create: `src/pages/zh/bda/workflow.astro`

- [ ] **Step 1: Create the English BDA Workflow page**

Create `src/pages/bda/workflow.astro`:

```astro
---
import Layout from '../../layouts/Layout.astro';
import WorkflowStep from '../../components/WorkflowStep.astro';
import { getTranslations } from '../../i18n/utils';

const lang = 'en';
const t = getTranslations(lang);
---
<Layout title={`${t('bda.workflow.title')} | BIGO BDA`} lang={lang}>
    <main class="grid-container workflow-content">

        <div class="workflow-hero grid-item">
            <h1 class="workflow-title">{t('bda.workflow.title')}</h1>
            <p class="workflow-subtitle">{t('bda.workflow.subtitle')}</p>
        </div>

        <section class="workflow-steps grid-item">
            <WorkflowStep step={1} title={t('bda.workflow.step1.title')} tool={t('bda.workflow.step1.tool')} description={t('bda.workflow.step1.desc')} />
            <WorkflowStep step={2} title={t('bda.workflow.step2.title')} tool={t('bda.workflow.step2.tool')} description={t('bda.workflow.step2.desc')} />
            <WorkflowStep step={3} title={t('bda.workflow.step3.title')} tool={t('bda.workflow.step3.tool')} description={t('bda.workflow.step3.desc')} />
            <WorkflowStep step={4} title={t('bda.workflow.step4.title')} tool={t('bda.workflow.step4.tool')} description={t('bda.workflow.step4.desc')} />
            <WorkflowStep step={5} title={t('bda.workflow.step5.title')} tool={t('bda.workflow.step5.tool')} description={t('bda.workflow.step5.desc')} />
            <WorkflowStep step={6} title={t('bda.workflow.step6.title')} tool={t('bda.workflow.step6.tool')} description={t('bda.workflow.step6.desc')} />
        </section>

        <section class="feedback-section grid-item outline">
            <h2 class="feedback-title">{t('bda.feedback.title')}</h2>
            <div class="feedback-cycle">
                <p class="cycle-text">{t('bda.feedback.cycle')}</p>
            </div>
            <blockquote class="feedback-quote">{t('bda.feedback.quote')}</blockquote>
        </section>

        <div class="placeholder-section grid-item outline">
            <p class="placeholder-text">{t('bda.workflow.placeholder')}</p>
        </div>

    </main>
</Layout>

<style>
    .workflow-content {
        padding-top: 8rem;
        padding-bottom: 6rem;
        gap: 4rem var(--grid-gutter);
    }

    .workflow-hero {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .workflow-title {
        font-size: clamp(3rem, 8vw, 5rem);
        font-weight: 800;
        line-height: 1;
        text-transform: uppercase;
    }

    .workflow-subtitle {
        font-size: clamp(1.25rem, 3vw, 1.5rem);
        color: var(--color-grey-700);
        letter-spacing: 0.05em;
    }

    .workflow-steps {
        display: flex;
        flex-direction: column;
        max-width: 700px;
    }

    .feedback-section {
        padding: 3rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background: var(--color-grey-100);
    }

    .feedback-title {
        font-size: 1.5rem;
        font-weight: 800;
    }

    .feedback-cycle {
        padding: 1.5rem;
        background: var(--color-white);
        border: 1px solid var(--color-grey-300);
    }

    .cycle-text {
        font-size: 1.125rem;
        font-weight: 600;
        letter-spacing: 0.02em;
        text-align: center;
    }

    .feedback-quote {
        font-size: 1rem;
        font-style: italic;
        color: var(--color-grey-700);
        border-left: 4px solid var(--color-black);
        padding-left: 1rem;
    }

    .placeholder-section {
        padding: 6rem 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-grey-100);
    }

    .placeholder-text {
        font-size: 1.125rem;
        color: var(--color-grey-500);
        font-style: italic;
    }

    @media (max-width: 640px) {
        .workflow-content {
            padding-top: 6rem;
            gap: 3rem var(--grid-gutter);
        }

        .feedback-section {
            padding: 2rem 1rem;
        }

        .placeholder-section {
            padding: 4rem 1rem;
        }
    }
</style>
```

- [ ] **Step 2: Create the Chinese BDA Workflow page**

Create `src/pages/zh/bda/workflow.astro`:

```astro
---
import Layout from '../../../layouts/Layout.astro';
import WorkflowStep from '../../../components/WorkflowStep.astro';
import { getTranslations } from '../../../i18n/utils';

const lang = 'zh';
const t = getTranslations(lang);
---
<Layout title={`${t('bda.workflow.title')} | BIGO BDA`} lang={lang}>
    <main class="grid-container workflow-content">

        <div class="workflow-hero grid-item">
            <h1 class="workflow-title">{t('bda.workflow.title')}</h1>
            <p class="workflow-subtitle">{t('bda.workflow.subtitle')}</p>
        </div>

        <section class="workflow-steps grid-item">
            <WorkflowStep step={1} title={t('bda.workflow.step1.title')} tool={t('bda.workflow.step1.tool')} description={t('bda.workflow.step1.desc')} />
            <WorkflowStep step={2} title={t('bda.workflow.step2.title')} tool={t('bda.workflow.step2.tool')} description={t('bda.workflow.step2.desc')} />
            <WorkflowStep step={3} title={t('bda.workflow.step3.title')} tool={t('bda.workflow.step3.tool')} description={t('bda.workflow.step3.desc')} />
            <WorkflowStep step={4} title={t('bda.workflow.step4.title')} tool={t('bda.workflow.step4.tool')} description={t('bda.workflow.step4.desc')} />
            <WorkflowStep step={5} title={t('bda.workflow.step5.title')} tool={t('bda.workflow.step5.tool')} description={t('bda.workflow.step5.desc')} />
            <WorkflowStep step={6} title={t('bda.workflow.step6.title')} tool={t('bda.workflow.step6.tool')} description={t('bda.workflow.step6.desc')} />
        </section>

        <section class="feedback-section grid-item outline">
            <h2 class="feedback-title">{t('bda.feedback.title')}</h2>
            <div class="feedback-cycle">
                <p class="cycle-text">{t('bda.feedback.cycle')}</p>
            </div>
            <blockquote class="feedback-quote">{t('bda.feedback.quote')}</blockquote>
        </section>

        <div class="placeholder-section grid-item outline">
            <p class="placeholder-text">{t('bda.workflow.placeholder')}</p>
        </div>

    </main>
</Layout>

<style>
    .workflow-content {
        padding-top: 8rem;
        padding-bottom: 6rem;
        gap: 4rem var(--grid-gutter);
    }

    .workflow-hero {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .workflow-title {
        font-size: clamp(3rem, 8vw, 5rem);
        font-weight: 800;
        line-height: 1;
        text-transform: uppercase;
    }

    .workflow-subtitle {
        font-size: clamp(1.25rem, 3vw, 1.5rem);
        color: var(--color-grey-700);
        letter-spacing: 0.05em;
    }

    .workflow-steps {
        display: flex;
        flex-direction: column;
        max-width: 700px;
    }

    .feedback-section {
        padding: 3rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background: var(--color-grey-100);
    }

    .feedback-title {
        font-size: 1.5rem;
        font-weight: 800;
    }

    .feedback-cycle {
        padding: 1.5rem;
        background: var(--color-white);
        border: 1px solid var(--color-grey-300);
    }

    .cycle-text {
        font-size: 1.125rem;
        font-weight: 600;
        letter-spacing: 0.02em;
        text-align: center;
    }

    .feedback-quote {
        font-size: 1rem;
        font-style: italic;
        color: var(--color-grey-700);
        border-left: 4px solid var(--color-black);
        padding-left: 1rem;
    }

    .placeholder-section {
        padding: 6rem 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-grey-100);
    }

    .placeholder-text {
        font-size: 1.125rem;
        color: var(--color-grey-500);
        font-style: italic;
    }

    @media (max-width: 640px) {
        .workflow-content {
            padding-top: 6rem;
            gap: 3rem var(--grid-gutter);
        }

        .feedback-section {
            padding: 2rem 1rem;
        }

        .placeholder-section {
            padding: 4rem 1rem;
        }
    }
</style>
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/bda/workflow.astro src/pages/zh/bda/workflow.astro
git commit -m "feat(pages): add BDA+ Workflow page with stepper and feedback engine"
```

---

### Task 9: Create Pipeline Pages

**Files:**
- Create: `src/pages/pipeline/bp-326.astro`
- Create: `src/pages/pipeline/ribh.astro`
- Create: `src/pages/pipeline/cd3.astro`
- Create: `src/pages/zh/pipeline/bp-326.astro`
- Create: `src/pages/zh/pipeline/ribh.astro`
- Create: `src/pages/zh/pipeline/cd3.astro`

- [ ] **Step 1: Create English BP 326 page**

Create `src/pages/pipeline/bp-326.astro`:

```astro
---
import Layout from '../../layouts/Layout.astro';
import PipelineShell from '../../components/PipelineShell.astro';
import { getTranslations } from '../../i18n/utils';

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
        />
    </main>
</Layout>

<style>
    .pipeline-content {
        padding-top: 8rem;
        padding-bottom: 6rem;
        gap: 4rem var(--grid-gutter);
    }
</style>
```

- [ ] **Step 2: Create English RibH page**

Create `src/pages/pipeline/ribh.astro`:

```astro
---
import Layout from '../../layouts/Layout.astro';
import PipelineShell from '../../components/PipelineShell.astro';
import { getTranslations } from '../../i18n/utils';

const lang = 'en';
const t = getTranslations(lang);
---
<Layout title={`${t('pipeline.ribh.title')} | BIGO BDA`} lang={lang}>
    <main class="grid-container pipeline-content">
        <PipelineShell
            title={t('pipeline.ribh.title')}
            description={t('pipeline.ribh.desc')}
            target="—"
            moleculeType={t('pipeline.ribh.type')}
            status={t('pipeline.preclinical')}
            lang={lang}
        />
    </main>
</Layout>

<style>
    .pipeline-content {
        padding-top: 8rem;
        padding-bottom: 6rem;
        gap: 4rem var(--grid-gutter);
    }
</style>
```

- [ ] **Step 3: Create English CD3 page**

Create `src/pages/pipeline/cd3.astro`:

```astro
---
import Layout from '../../layouts/Layout.astro';
import PipelineShell from '../../components/PipelineShell.astro';
import { getTranslations } from '../../i18n/utils';

const lang = 'en';
const t = getTranslations(lang);
---
<Layout title={`${t('pipeline.cd3.title')} | BIGO BDA`} lang={lang}>
    <main class="grid-container pipeline-content">
        <PipelineShell
            title={t('pipeline.cd3.title')}
            description={t('pipeline.cd3.desc')}
            target={t('pipeline.cd3.target')}
            moleculeType={t('pipeline.cd3.type')}
            status={t('pipeline.preclinical')}
            lang={lang}
        />
    </main>
</Layout>

<style>
    .pipeline-content {
        padding-top: 8rem;
        padding-bottom: 6rem;
        gap: 4rem var(--grid-gutter);
    }
</style>
```

- [ ] **Step 4: Create Chinese BP 326 page**

Create `src/pages/zh/pipeline/bp-326.astro`:

```astro
---
import Layout from '../../../layouts/Layout.astro';
import PipelineShell from '../../../components/PipelineShell.astro';
import { getTranslations } from '../../../i18n/utils';

const lang = 'zh';
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
        />
    </main>
</Layout>

<style>
    .pipeline-content {
        padding-top: 8rem;
        padding-bottom: 6rem;
        gap: 4rem var(--grid-gutter);
    }
</style>
```

- [ ] **Step 5: Create Chinese RibH page**

Create `src/pages/zh/pipeline/ribh.astro`:

```astro
---
import Layout from '../../../layouts/Layout.astro';
import PipelineShell from '../../../components/PipelineShell.astro';
import { getTranslations } from '../../../i18n/utils';

const lang = 'zh';
const t = getTranslations(lang);
---
<Layout title={`${t('pipeline.ribh.title')} | BIGO BDA`} lang={lang}>
    <main class="grid-container pipeline-content">
        <PipelineShell
            title={t('pipeline.ribh.title')}
            description={t('pipeline.ribh.desc')}
            target="—"
            moleculeType={t('pipeline.ribh.type')}
            status={t('pipeline.preclinical')}
            lang={lang}
        />
    </main>
</Layout>

<style>
    .pipeline-content {
        padding-top: 8rem;
        padding-bottom: 6rem;
        gap: 4rem var(--grid-gutter);
    }
</style>
```

- [ ] **Step 6: Create Chinese CD3 page**

Create `src/pages/zh/pipeline/cd3.astro`:

```astro
---
import Layout from '../../../layouts/Layout.astro';
import PipelineShell from '../../../components/PipelineShell.astro';
import { getTranslations } from '../../../i18n/utils';

const lang = 'zh';
const t = getTranslations(lang);
---
<Layout title={`${t('pipeline.cd3.title')} | BIGO BDA`} lang={lang}>
    <main class="grid-container pipeline-content">
        <PipelineShell
            title={t('pipeline.cd3.title')}
            description={t('pipeline.cd3.desc')}
            target={t('pipeline.cd3.target')}
            moleculeType={t('pipeline.cd3.type')}
            status={t('pipeline.preclinical')}
            lang={lang}
        />
    </main>
</Layout>

<style>
    .pipeline-content {
        padding-top: 8rem;
        padding-bottom: 6rem;
        gap: 4rem var(--grid-gutter);
    }
</style>
```

- [ ] **Step 7: Commit**

```bash
git add src/pages/pipeline/ src/pages/zh/pipeline/
git commit -m "feat(pages): add Pipeline pages for BP 326, RibH, and CD3+"
```

---

### Task 10: Build Verification

**Files:** None (verification only)

- [ ] **Step 1: Run all tests**

Run: `npx vitest run`
Expected: All tests PASS

- [ ] **Step 2: Build for production**

Run: `npx astro build`
Expected: Build succeeds with no errors

- [ ] **Step 3: Verify new routes exist in build output**

Run: `ls dist/client/bda/ dist/client/bda/workflow/ dist/client/pipeline/ dist/client/zh/bda/ dist/client/zh/pipeline/`
Expected: All directories exist with index.html files

- [ ] **Step 4: Commit any fixes if needed**

If build or tests fail, fix issues and commit:

```bash
git add -A
git commit -m "fix: resolve build issues from product pages"
```
