# Index Page Copywriting & Content Design

**Date:** 2026-05-24
**Scope:** Content, copywriting, and section structure for the English and Chinese index pages. No visual styling — implementation should adapt to the existing design system and product guidelines.

---

## Design Decisions

- **Narrative tone:** Storyteller hook (EDA question) transitioning into Architect voice (systems-level, confident)
- **Audience:** Primarily business-side pharma/chemical executives, with enough technical credibility for scientists
- **Depth:** Teaser mode — each section is a compelling entry point that invites click-through, not a full pitch
- **Background:** Blank/white throughout, matching the current page
- **Styling:** Reuse existing design system and components. Adapt to product guidelines during implementation.

---

## Section Structure

The index page has 6 sections rendered inside the existing `Layout` (which provides `Navbar` and `Footer`).

### Section 1: Hero (no changes)

Keep the existing hero component and all its current copy exactly as-is.

- Component: `<Hero lang={lang} />`
- No content changes needed

---

### Section 2: Hook Question

Replaces the current "vision-section" div. Same container and styling as the current vision section — only the text content changes.

**Current text:**
> Operating System for Biology: From Protein Therapeutics to Biomaterials.

**New text:**
> What if designing a protein was as routine as designing a chip?

**Subtext (new — below the question, styled as a secondary line):**
> EDA made semiconductors programmable. We're building the same infrastructure for biology.

**i18n keys:**
- `hook.question` — "What if designing a protein was as routine as designing a chip?"
- `hook.subtext` — "EDA made semiconductors programmable. We're building the same infrastructure for biology."

**zh equivalents:**
- `hook.question` — "如果设计蛋白质像设计芯片一样常规？"
- `hook.subtext` — "EDA让半导体变得可编程。我们正在为生物学构建同样的基础设施。"

---

### Section 3: SDG Cards

Replaces the current "pillars-grid" div with its three pillar cards. Same grid container and card styling — outline borders, same grid layout. Only the card content changes.

**Current cards:** Drug Discovery / Vaccine Display / Industrial Enzymes
**New cards:** Three SDG-aligned impact areas

**Card 1:**
- Label: `SDG 2`
- Title: Zero Hunger
- Description: Protein nitrogen fixation replaces Haber-Bosch — sustainable agriculture without fossil-fuel-dependent fertilizers.

**Card 2:**
- Label: `SDG 9 / 12`
- Title: Green Manufacturing
- Description: Low-carbon, low-toxicity catalysis. Enzymes that work at ambient temperature, replacing energy-intensive chemical processes.

**Card 3:**
- Label: `SDG 3`
- Title: Precision Medicine
- Description: One patient, one drug. Computationally designed therapeutics tailored to individual biology.

**i18n keys:**
- `sdg.hunger.label` / `sdg.hunger.title` / `sdg.hunger.desc`
- `sdg.green.label` / `sdg.green.title` / `sdg.green.desc`
- `sdg.medicine.label` / `sdg.medicine.title` / `sdg.medicine.desc`

---

### Section 4: BDA+ Platform Statement

A new section between the SDG cards and the application products. Acts as a content divider and platform introduction.

**Copy:**
> Bigo BDA+ platform is our biomaterial development platform, allowing anyone to design and build with AI.

**Layout:** Large, lightweight display text. Spans approximately 2/3 of the screen width. 2-3 lines on desktop, near full-width on mobile. Keywords "design" and "build" visually emphasized.

**i18n keys:**
- `platform.statement` — full sentence (keywords wrapped in emphasis tags for styling)

**zh:**
- `platform.statement` — "Bigo BDA+平台是我们的生物材料开发平台，让任何人都能用AI进行设计和构建。"

---

### Section 5: Pillar Applications

Three products displayed as vertically stacked rows. Each row has a left side (text) and right side (image placeholder). Both sides are clickable and link to the respective product/pipeline page.

**Layout per row:**
- Left: Label (small) → Title (large, bold) → Description (body text)
- Right: Large image placeholder (to be replaced with actual renders from the pitch deck)
- Entire row is a clickable link

**Product 1:**
- Label: `PD-1 / SARS-CoV-2 Spike`
- Title: De Novo Protein Binders
- Description: AI-designed protein binders competing with billion-dollar antibody drugs — smaller, faster to produce, computationally optimized.
- Links to: `/pipeline/bp326` (or relevant pipeline page)
- Image: Protein binder 3D rendering (placeholder for now)

**Product 2:**
- Label: `Multimeric Antigen Architectures`
- Title: Vaccine Nanocage Display
- Description: Programmable nanoparticle scaffolds for high-density antigen display — designed for stability, immunogenicity, and rapid iteration.
- Links to: `/pipeline/ribh` (or relevant pipeline page)
- Image: Nanocage structure rendering (placeholder for now)

**Product 3:**
- Label: `Green Manufacturing Catalysts`
- Title: Industrial Enzymes
- Description: Engineered enzymes with 100x efficiency gains — ambient-temperature catalysis replacing energy-intensive chemical processes.
- Links to: `/pipeline` (or relevant page)
- Image: Enzyme fold structures with activity rates (placeholder for now)

**i18n keys:**
- `products.binders.label` / `products.binders.title` / `products.binders.desc`
- `products.nanocage.label` / `products.nanocage.title` / `products.nanocage.desc`
- `products.enzymes.label` / `products.enzymes.title` / `products.enzymes.desc`

---

### Section 6: CTA — Explore Bigo

A closing section with three linked cards inviting further exploration.

**Headline:** Explore Bigo

**Card 1:**
- Label: `Pipeline`
- Title: See what we're building
- Subtitle: BP326 · RibH · CD3+
- Links to: Pipeline overview page

**Card 2:**
- Label: `Blog`
- Title: Latest from the team
- Subtitle: Research updates and insights
- Links to: Blog page

**Card 3:**
- Label: `Team`
- Title: Who we are
- Subtitle: 8 researchers, 30+ publications
- Links to: About page

**i18n keys:**
- `explore.title` — "Explore Bigo"
- `explore.pipeline.label` / `explore.pipeline.title` / `explore.pipeline.subtitle`
- `explore.blog.label` / `explore.blog.title` / `explore.blog.subtitle`
- `explore.team.label` / `explore.team.title` / `explore.team.subtitle`

---

## Component Structure

### Reusable Components to Create

**1. SDGCard**
- Props: `label` (string), `title` (string), `description` (string)
- Replaces the current inline pillar card markup
- Same outline border styling as current pillars

**2. ProductCard**
- Props: `label` (string), `title` (string), `description` (string), `href` (string), `imageSlot` (slot)
- Left-right split layout, entire card is a link
- Reusable for any product/pipeline showcase

**3. PlatformStatement**
- Props: `children` (rich text with emphasis)
- Large lightweight display text component
- Could be reused as a section divider on other pages

**4. CTACard**
- Props: `label` (string), `title` (string), `subtitle` (string), `href` (string)
- Navigation prompt card, reusable across pages

### Existing Components to Keep

- `Hero` — unchanged
- `Button` — unchanged, used in Hero
- `Layout` — unchanged, provides Navbar + Footer

---

## Content Summary

| Section | Component | Content Source |
|---------|-----------|---------------|
| Hero | `<Hero />` (existing) | No changes |
| Hook | Inline div (replaces vision-section) | New copy |
| SDG Cards | `<SDGCard />` x3 (replaces pillars-grid) | New copy |
| Platform Statement | `<PlatformStatement />` (new section) | New copy |
| Product Applications | `<ProductCard />` x3 (new section) | New copy + image placeholders |
| CTA | `<CTACard />` x3 (new section) | New copy |

---

## Removed Content

The following current content is removed from the index page:
- `vision.title` translation key ("Operating System for Biology: From Protein Therapeutics to Biomaterials.")
- `pillars.drug.*` keys (Drug Discovery card)
- `pillars.vaccine.*` keys (Vaccine Display card)
- `pillars.enzyme.*` keys (Industrial Enzymes card)

These keys should be preserved in the JSON files for now in case other pages reference them. If confirmed unused, they can be cleaned up separately.

---

## Image Placeholders

Three image placeholders are needed for the Product Applications section. These correspond to visual assets available in the pitch deck (`docs/temp/bigo_slides-eng.pdf`):

1. **Protein Binder 3D** — Slide 15 (RibH binding protein / CD3+ binding protein renderings)
2. **Nanocage Structure** — Slide 13 center (nanocage architecture labeled "A")
3. **Enzyme Fold Structures** — Slide 13 right (multiple enzyme structures with catalytic rates)

Implementation should use placeholder divs with descriptive text, to be replaced with actual images in a follow-up task.
