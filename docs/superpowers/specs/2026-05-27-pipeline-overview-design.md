# Pipeline Overview & BP326 Page Refinement Design

## 1. Goal
Add a new Pipeline Overview page based on the teaser preview document, demonstrating that BIGO is building a working loop (using BP326 as a proof point), and refine the detailed BP326 pipeline page to remove placeholders and display actual metrics and technical diagrams.

## 2. Constraints & Style
- **Visual Style**: Swiss red design with reusable components (e.g., `ApplicationCard`, `MetricCard`, `ProductCard`). Use greyscale design for the majority of the page, reserving Swiss red for accents and key highlights (do not overuse).
- **Tone**: Serious, technical production page. 
- **Terminology restriction**: Do NOT mention the term "BDA+ loop" anywhere on the BP326 detail page or the Pipeline Overview page.

## 3. Page Structure: Pipeline Overview (`src/pages/pipeline/index.astro`)
The Pipeline Overview page will follow a narrative flow rather than just a simple grid:

1.  **Hero Section**: 
    - Large title (e.g., "Pipeline Overview" or "Platform Pipeline").
    - A serious, high-level statement about the potential of the BIGO BDA platform to accelerate discovery and deliver novel molecules.
2.  **Platform Validation (Proof Points)**:
    - Focuses on BP326 as a validation of the platform process.
    - Headline: "Early proof points: BP326 shows Bigo is building a working loop, not a model-only concept."
    - Displays high-level metrics (~200 aa binder, ~3 months, nM binding data).
    - Uses a `MetricCard` or similar greyscale layout with a red accent.
    - Includes a CTA linking to the detailed BP326 product page for more info.
3.  **Pipeline Roster**:
    - A clean, technical list/grid of the active pipeline.
    - Items: BP326 (Preclinical), CD3 (Discovery), RibH (Discovery).

*(Note: Ensure corresponding Chinese translations in `src/pages/zh/pipeline/index.astro` and `src/i18n` are structured.)*

## 4. Page Structure: BP326 Detail Page (`src/pages/pipeline/bp-326.astro`)
Refine the existing page layout within `PipelineShell.astro` (which currently has a "Coming soon" placeholder).

1.  **Hero & Key Facts**: Keep the existing `PipelineShell` header (Title, Description, Status Badge) and the left-aligned "Key Facts" sidebar.
2.  **Key Metrics Container** (Replaces "Coming soon"):
    - A 2-column container.
    - **Left**: Key metrics extracted from the teaser (e.g., ~200 amino acids, ~3 months development, nM level binding data).
    - **Right**: The protein structure image (`src/images/bp326.png`).
3.  **Methodology Container**:
    - A 2-column container below the metrics.
    - **Left**: Detailed description of the technical production workflow (computational design, expression, purification, affinity validation, and data engineering).
    - **Right**: The method diagram (`src/images/bp326_method.png`).

### 4.1 Image Interactivity
For the `bp326.png` and `bp326_method.png` images inside the containers:
- Use a CSS filter to make them 100% grayscale by default.
- On mouse hover (`:hover`), smoothly transition to full color (`filter: grayscale(0%)`), matching the interactivity established in `ProductCard.astro`.

## 5. Components to Create or Modify
- Create `src/pages/pipeline/index.astro` and its `zh` counterpart.
- Modify `src/components/PipelineShell.astro` to accept `slot` content for the main area instead of hardcoding the "Coming soon" placeholder.
- Implement the layout for `bp-326.astro` using the slot in `PipelineShell`.