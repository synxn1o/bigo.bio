# Design Specification: Landing & About Pages (Visionary Update)

## 1. Overview
This specification details the implementation of a visionary landing page update and a newly created "About" page for `bigo.bio`. The design is deeply rooted in the "Swiss Red" design system (strict grids, sharp angles, monochrome base with selective red highlights). The primary goal is high visual impact and persuasive storytelling derived from the May 2026 Pitch Deck.

## 2. Architecture & Pages

### 2.1 Landing Page (`src/pages/index.astro`)
**Goal:** Deliver a massive visual impact that prioritizes the "Operating System for Biology" narrative.

*   **Hero Component (`src/components/Hero.astro`) Redesign:**
    *   **Typography:** Massive, edge-to-edge typography leveraging the 12-column grid.
    *   **Headline:** "The <span class="text-swiss-red">next industrial revolution</span> will be written in proteins." (Only key phrases in Swiss Red).
    *   **Sub-headline:** "Bigo Biologics builds the design infrastructure for that future."
    *   **Layout:** Content aligned to the bottom-left of the viewport, pushing the visual weight downwards.
*   **Narrative Flow (Below Hero):**
    *   **Vision Block:** A large text block stating "Operating System for Biology: From Protein Therapeutics to Biomaterials."
    *   **Three Pillars Grid:** A 3-column layout outlining the application paths (Drug Discovery, Vaccine Display, Industrial Enzymes) using thin black outlines (`.outline` utility).
*   **Animation (`src/components/ParticleAnimation.astro`):**
    *   The existing particle animation will be adjusted to feel less chaotic and more "structural," symbolizing the shift from sequence (chaos) to programmable structure (order).

### 2.2 About Page (`src/pages/about.astro`)
**Goal:** Establish authority through the team's pedigree and the BDA+ mission.

*   **Header:** "About Bigo Biologics"
*   **Section 1: The Team (Authority)**
    *   **Layout:** 3 or 4-column grid for leadership profiles.
    *   **Component (`TeamMember.astro`):**
        *   Image container: Strict square, grayscale filter applied to images.
        *   Text: Name (Black, heavy weight), Title/Role (Swiss Red), Bio (Gray, succinct).
        *   Key Focus: Highlight Sun Zerong, Li Zhe (Nobel lineage/Baker Lab), and Sun Yuze.
*   **Section 2: The Mission (BDA+ Platform)**
    *   **Narrative:** "Sequence → Structure → Function"
    *   **Metrics Block:** A high-contrast grid section dedicated to the R&D advantages:
        *   "8 Months R&D Cycle"
        *   "60-70% Cost Reduction"
    *   **Workflow Diagram:** A CSS grid-based representation of the "Design · Build · Test · Learn · Scale" loop.

### 2.3 Navigation & Footer
*   **Navbar (`src/components/Navbar.astro`):**
    *   Add `NavLink` for "About" next to "Blog" in both desktop and mobile views.
*   **Footer (New Component - `src/components/Footer.astro`):**
    *   A bottom-aligned, outlined grid containing the Bigo logo, "Contact: contact@bigo.bio", and replicated nav links (About, Blog, Studio).

## 3. Data Flow & State
*   **Localization (i18n):** All new text content on the Landing Page and About Page must be extracted into `src/i18n/en.json` and `src/i18n/zh.json`.
*   **Assets:** Placeholder images for the team will be required until final headshots are provided.

## 4. Error Handling & Testing
*   **Responsive Grids:** Ensure the 12-column grid correctly collapses to 8 columns on tablets and 4 columns on mobile, especially for the dense "Team" and "Three Pillars" sections.
*   **Language Toggle:** Verify that switching languages updates all new content on both `index.astro` and `about.astro` without breaking layout heights.