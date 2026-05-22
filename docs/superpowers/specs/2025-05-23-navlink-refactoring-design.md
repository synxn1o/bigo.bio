# Design Spec: NavLink Component Refactoring

## 1. Overview
The `NavLink.astro` component needs to be improved for accessibility and flexibility.

## 2. Goals
- **Accessibility**: Add `:focus-visible` styles to provide clear visual feedback for keyboard navigation.
- **Flexibility**: Support prop spreading to allow standard HTML anchor attributes (like `target`, `rel`, `aria-label`, etc.) to be passed to the underlying `<a>` element.

## 3. Proposed Changes

### 3.1 Component Logic (`NavLink.astro`)
Update the frontmatter to accept additional props using the spread operator.

```astro
---
import type { HTMLAttributes } from 'astro/types';

interface Props extends HTMLAttributes<'a'> {
    href: string;
    class?: string;
}

const { href, class: className, ...rest } = Astro.props;
---

<a href={href} class:list={["nav-link", className]} {...rest}>
    <slot />
</a>
```

### 3.2 Component Styles (`NavLink.astro`)
Add the `:focus-visible` pseudo-class to the `<style>` block.

```css
    .nav-link:focus-visible {
        outline: 2px solid var(--color-swiss-red);
        outline-offset: 2px;
    }
```

## 4. Testing Strategy
- **Unit Tests**: Update `src/tests/components/NavLink.test.ts` to verify:
    - `:focus-visible` style exists in the component.
    - Prop spreading works (e.g., checking if `{...rest}` is present in the template).
- **Manual Verification**: Verify that the component still renders correctly and that the hover state is maintained.

## 5. Success Criteria
- [ ] `NavLink.astro` supports additional anchor attributes.
- [ ] Keyboard focus is clearly visible via `:focus-visible`.
- [ ] Existing functionality (hover, responsive styles) is preserved.
