# Fly-in Scroll Animations Design

> **Status:** Draft
> **Topic:** CSS View-Timeline based scroll animations for the main page and future components.

## 1. Purpose
Implement a lightweight, declarative scroll animation system that makes elements "fly in" (fade + zoom + slide up) as they enter the viewport. The system must be extensible, allowing any future element to opt-in with minimal effort.

## 2. Approach: CSS View Timelines
We are using Approach 2 (Modern CSS View Timelines) to link animation progress to scroll position without JavaScript.

### 2.1 Animation Keyframes
A single keyframe definition `reveal-fly-in`:
- `from`: `opacity: 0`, `transform: translateY(40px) scale(0.95)`
- `to`: `opacity: 1`, `transform: translateY(0) scale(1)`

### 2.2 Utility Class: `.scroll-reveal`
A global utility class in `global.css` that applies:
- `animation-name: reveal-fly-in`
- `animation-fill-mode: both`
- `animation-timeline: view()`
- `animation-range: entry 10% cover 30%` (Starts when bottom of element is 10% into view, ends at 30%)

### 2.3 Staggering Strategy
To achieve "top to bottom" and "left to right" flow:
- **Vertical:** Naturally handled by `view-timeline` as elements appear at different scroll positions.
- **Horizontal:** Targeted CSS in component styles or global overrides using `:nth-child` to shift the `animation-range` or add `animation-delay`. For the `pillars-grid`, we will apply staggered offsets to the 2nd and 3rd pillars.

## 3. Fallback & Progressive Enhancement
- Elements will be fully visible by default.
- Animation properties will be wrapped in `@supports (animation-timeline: view())` or designed to fail gracefully (defaulting to static visibility in Safari/Firefox).

## 4. Implementation Targets
- `src/pages/index.astro`: Apply to `vision-section` and `pillar` elements.
- `src/styles/global.css`: Add core animation logic.

## 5. Verification Plan
- **Visual Check:** Scroll through the home page. Elements should smoothly transition into place.
- **Support Check:** Verify elements are still visible in browsers without `view-timeline` support.
