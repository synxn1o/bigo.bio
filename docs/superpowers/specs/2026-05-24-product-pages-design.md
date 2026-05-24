# Product Pages Design Spec

**Date:** 2026-05-24
**Scope:** BDA+ category pages, Pipeline category pages, Navbar dropdown restructure

## Overview

Replace the current "Protein Design Studio" nav link with two dropdown categories: **BDA+** and **Pipeline**. Create 5 new bilingual page pairs with reusable atomic components.

---

## 1. Navigation

### Structure

```
BDA+          Pipeline          About          Blog
├─ Overview   ├─ BP 326
└─ Workflow   ├─ RibH
              └─ CD3+
```

### Component: `DropdownNav.astro`

- **Props:** `label: string`, `items: {href: string, label: string, description?: string}[]`, `lang: 'en' | 'zh'`
- **Desktop:** Click/hover reveals dropdown panel below nav link. Each item is a `NavLink` with optional description line.
- **Mobile:** Items appear indented under parent in slide-out panel.
- **Reusable:** Both BDA+ and Pipeline use the same component.

### Translation Keys

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
"nav.pipeline.cd3.desc": "T-cell engager binding protein"
```

---

## 2. BDA+ Overview Page

**Route:** `/bda` (en), `/zh/bda` (zh)

### Layout

1. **Hero Section** — 3 `MetricCard` components in a row:
   - **8mo** — R&D Cycle (from 3 years)
   - **60-70%** — Lower R&D Cost
   - **1.5yr** — Industrialization Cycle (from 5 years)

2. **Tagline** — Bold one-liner below metrics: "AI-driven protein design automation — from sequence to structure to function"

3. **Application Paths** — 3 `ApplicationCard` components in a grid:
   - **Drug Discovery:** High-affinity binder candidates, structural insights, expression/purification data. From target to lead in weeks.
   - **Vaccine & Display:** Antigen display design, nanocage architecture, multimeric conformations. Accelerate vaccine development.
   - **Industrial Enzymes:** De novo enzyme design with 100x efficiency. Ambient production for green manufacturing.

### Component: `MetricCard.astro`

- **Props:** `value: string`, `label: string`, `sublabel?: string`
- **Style:** Large bold value (swiss-red), label below (grey-800), `.outline` border
- **Reusable:** Can be used on about page, other pages

### Component: `ApplicationCard.astro`

- **Props:** `title: string`, `description: string`, `href?: string`
- **Style:** Title in swiss-red, description in grey-800, `.outline` border, sharp edges
- **Reusable:** Can be used on home page pillars section

### Design Rules

- Swiss-red used ONLY on metric values and card titles
- Rest is black/white/grey palette
- 12-column grid, generous whitespace
- Large type for hierarchy, not decoration

---

## 3. BDA+ Workflow Page

**Route:** `/bda/workflow` (en), `/zh/bda/workflow` (zh)

### Layout

1. **Hero** — Title "BDA+ Workflow" with subtitle "Design · Build · Test · Learn · Scale"

2. **Workflow Steps** — Vertical stepper with 6 `WorkflowStep` components:

   | # | Step | Tool | Description |
   |---|------|------|-------------|
   | 1 | Structure Input | BDA UI + AF3 | Get/complete target 3D structure |
   | 2 | Backbone Generation | Diffusion Model | Denoise to generate protein backbones (~1,500 candidates) |
   | 3 | Sequence Design | GNN Model | Reverse-fold assign sequences (10 per backbone) |
   | 4 | Structure Validation | AlphaFold2/3 | pLDDT filter; predict binding geometry |
   | 5 | Interface Scoring | Rosetta | ΔG_bind, SASA, shape complementarity |
   | 6 | Partial Optimization | Partial Diffusion | Local resampling in lead backbone neighborhood |

3. **Feedback Engine** — Cycle diagram (text-based): `Design → Experiment → Data → Tokenizer → LLM → Better Design`
   - Quote: "Failed data is as valuable as successful data."

4. **Concept Image Placeholder** — Full-width grey box, `.outline` border, labeled "Concept Visualization — Coming Soon"

### Component: `WorkflowStep.astro`

- **Props:** `step: number`, `title: string`, `tool: string`, `description: string`
- **Style:** Numbered circle (black fill, white text), thin vertical connector line, tool name in monospace badge
- **Reusable:** Can be used for other process displays

---

## 4. Pipeline Pages

**Routes:** `/pipeline/bp-326`, `/pipeline/ribh`, `/pipeline/cd3` (+ zh/ mirrors)

### Component: `PipelineShell.astro`

- **Props:** `title: string`, `description: string`, `target: string`, `moleculeType: string`, `status: string`, `lang: 'en' | 'zh'`
- **Layout:**
  1. Hero: large molecule name + one-line description
  2. Status badge (e.g. "Preclinical")
  3. Two-column layout:
     - Left: Key Facts sidebar (target, type, status)
     - Right: Main content area with "Details coming soon" placeholder

### Page Data

| Page | Title | Description | Target | Type | Status |
|------|-------|-------------|--------|------|--------|
| bp-326 | BP 326 | AI-designed PD-1 binder (~200 aa). Alternative to Keytruda. 3-month design cycle. | PD-1 | De novo binder | Preclinical |
| ribh | RibH | Nanocage vaccine display platform. Self-assembling protein cage architecture. | — | Nanocage | Preclinical |
| cd3 | CD3+ | T-cell engager binding protein for immuno-oncology. | CD3ε | Binding protein | Preclinical |

---

## 5. File Structure

```
src/
├── components/
│   ├── DropdownNav.astro      # NEW: Reusable dropdown nav
│   ├── MetricCard.astro        # NEW: Large metric display
│   ├── ApplicationCard.astro   # NEW: Application path card
│   ├── WorkflowStep.astro      # NEW: Workflow step stepper
│   ├── PipelineShell.astro     # NEW: Pipeline page template
│   └── (existing components unchanged)
├── pages/
│   ├── bda/
│   │   ├── index.astro         # BDA+ Overview
│   │   └── workflow.astro      # BDA+ Workflow
│   ├── pipeline/
│   │   ├── bp-326.astro
│   │   ├── ribh.astro
│   │   └── cd3.astro
│   └── zh/
│       ├── bda/
│       │   ├── index.astro
│       │   └── workflow.astro
│       └── pipeline/
│           ├── bp-326.astro
│           ├── ribh.astro
│           └── cd3.astro
├── i18n/
│   ├── en.json                 # Add ~30 new keys
│   └── zh.json                 # Add ~30 new keys
```

---

## 6. i18n Keys (Additions)

### Navigation
```json
"nav.bda": "BDA+"
"nav.bda.overview": "Overview"
"nav.bda.overview.desc": "Platform capabilities and application paths"
"nav.bda.workflow": "BDA Workflow"
"nav.bda.workflow.desc": "Design automation pipeline and feedback engine"
"nav.pipeline": "Pipeline"
"nav.pipeline.bp326": "BP 326"
"nav.pipeline.bp326.desc": "AI-designed PD-1 binder"
"nav.pipeline.ribh": "RibH"
"nav.pipeline.ribh.desc": "Nanocage vaccine display platform"
"nav.pipeline.cd3": "CD3+"
"nav.pipeline.cd3.desc": "T-cell engager binding protein"
```

### BDA+ Overview
```json
"bda.hero.tagline": "AI-driven protein design automation — from sequence to structure to function"
"bda.metric.cycle.value": "8mo"
"bda.metric.cycle.label": "R&D Cycle"
"bda.metric.cycle.sublabel": "From 3 years"
"bda.metric.cost.value": "60-70%"
"bda.metric.cost.label": "Lower R&D Cost"
"bda.metric.industrial.value": "1.5yr"
"bda.metric.industrial.label": "Industrialization Cycle"
"bda.metric.industrial.sublabel": "From 5 years"
"bda.drug.title": "Drug Discovery"
"bda.drug.desc": "High-affinity binder candidates, structural insights, expression/purification data. From target to lead in weeks."
"bda.vaccine.title": "Vaccine & Display"
"bda.vaccine.desc": "Antigen display design, nanocage architecture, multimeric conformations. Accelerate vaccine development."
"bda.enzyme.title": "Industrial Enzymes"
"bda.enzyme.desc": "De novo enzyme design with 100x efficiency. Ambient production for green manufacturing."
```

### BDA+ Workflow
```json
"bda.workflow.title": "BDA+ Workflow"
"bda.workflow.subtitle": "Design · Build · Test · Learn · Scale"
"bda.workflow.step1.title": "Structure Input"
"bda.workflow.step1.tool": "BDA UI + AF3"
"bda.workflow.step1.desc": "Get or complete target 3D structure"
"bda.workflow.step2.title": "Backbone Generation"
"bda.workflow.step2.tool": "Diffusion Model"
"bda.workflow.step2.desc": "Denoise to generate protein backbones (~1,500 candidates)"
"bda.workflow.step3.title": "Sequence Design"
"bda.workflow.step3.tool": "GNN Model"
"bda.workflow.step3.desc": "Reverse-fold assign sequences (10 per backbone)"
"bda.workflow.step4.title": "Structure Validation"
"bda.workflow.step4.tool": "AlphaFold2/3"
"bda.workflow.step4.desc": "pLDDT filter; predict binding geometry"
"bda.workflow.step5.title": "Interface Scoring"
"bda.workflow.step5.tool": "Rosetta"
"bda.workflow.step5.desc": "ΔG_bind, SASA, shape complementarity"
"bda.workflow.step6.title": "Partial Optimization"
"bda.workflow.step6.tool": "Partial Diffusion"
"bda.workflow.step6.desc": "Local resampling in lead backbone neighborhood"
"bda.feedback.title": "Feedback Engine"
"bda.feedback.cycle": "Design → Experiment → Data → Tokenizer → LLM → Better Design"
"bda.feedback.quote": "Failed data is as valuable as successful data."
"bda.workflow.placeholder": "Concept Visualization — Coming Soon"
```

### Pipeline
```json
"pipeline.status": "Status"
"pipeline.preclinical": "Preclinical"
"pipeline.target": "Target"
"pipeline.type": "Molecule Type"
"pipeline.coming_soon": "Detailed data and results coming soon."
"pipeline.bp326.title": "BP 326"
"pipeline.bp326.desc": "AI-designed PD-1 binder (~200 aa). Alternative to Keytruda/Pembrolizumab. 3-month design cycle."
"pipeline.bp326.target": "PD-1"
"pipeline.bp326.type": "De novo binder"
"pipeline.ribh.title": "RibH"
"pipeline.ribh.desc": "Nanocage vaccine display platform. Self-assembling protein cage architecture."
"pipeline.ribh.type": "Nanocage"
"pipeline.cd3.title": "CD3+"
"pipeline.cd3.desc": "T-cell engager binding protein for immuno-oncology."
"pipeline.cd3.target": "CD3ε"
"pipeline.cd3.type": "Binding protein"
```

---

## 7. Chinese Translations (zh.json additions)

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

---

## 8. Design Principles

- **Swiss-red restraint:** Only on metric values, card titles, and accent words. Never on backgrounds or large surfaces.
- **Sharp geometry:** No border-radius anywhere. `.outline` borders. Clean lines.
- **Grid discipline:** All content within 12-column grid. Generous whitespace.
- **Typography hierarchy:** Large bold headings → medium subheadings → body text. Size creates hierarchy, not color.
- **Reusable atoms:** Every new component accepts props and can be used on other pages.
- **Bilingual parity:** Every page and key exists in both en and zh.
