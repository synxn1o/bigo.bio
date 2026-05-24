# Scroll Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a declarative, flexible scroll-reveal animation system using CSS View Timelines.

**Architecture:** A global utility class `.scroll-reveal` in `global.css` that leverages `@keyframes` and `animation-timeline: view()` to animate elements as they enter the viewport. Staggering is handled via `:nth-child` offsets.

**Tech Stack:** CSS (View Timelines, Keyframes), Astro.

---

### Task 1: Define Global Animation Logic

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Add the `@keyframes` for fly-in**

```css
@keyframes reveal-fly-in {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
```

- [ ] **Step 2: Add the `.scroll-reveal` utility class with `@supports` check**

```css
/* Scroll Reveal Utility */
@supports (animation-timeline: view()) {
  .scroll-reveal {
    animation-name: reveal-fly-in;
    animation-fill-mode: both;
    animation-timeline: view();
    animation-range: entry 10% cover 30%;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "style: add global scroll-reveal animation utility"
```

---

### Task 2: Apply to Main Page Elements

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Apply `.scroll-reveal` to the vision section**

Search for `<div class="vision-section grid-item">` and add the class.

- [ ] **Step 2: Apply `.scroll-reveal` to all pillars**

Search for `<div class="pillar outline">` and add the class to all three instances.

- [ ] **Step 3: Implement staggering for the pillars in the `<style>` block**

Add the following to the `.pillars-grid` or relevant section in the `<style>` tag:

```css
    @supports (animation-timeline: view()) {
        .pillar:nth-child(2) {
            animation-range: entry 15% cover 35%;
        }
        .pillar:nth-child(3) {
            animation-range: entry 20% cover 40%;
        }
    }
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: apply scroll-reveal animations to home page"
```

---

### Task 3: Verification

- [ ] **Step 1: Build the project to ensure no CSS/Astro errors**

Run: `npm run build`
Expected: Successful build.

- [ ] **Step 2: Visual Inspection (Manual)**

Since I cannot "see" the scroll, I will verify the CSS output in a build artifact or ensure the code logic is sound.

---
