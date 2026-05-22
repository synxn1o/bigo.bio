# NavLink Component Refactoring Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve `NavLink.astro` accessibility and flexibility by adding `:focus-visible` styles and supporting prop spreading.

**Architecture:** Update the Astro component's Props interface to extend `HTMLAttributes<'a'>`, use the spread operator in the frontmatter, and add specific CSS rules for focus states.

**Tech Stack:** Astro, TypeScript, Vitest

---

### Task 1: Update NavLink Component

**Files:**
- Modify: `src/components/NavLink.astro`

- [ ] **Step 1: Update component logic and styles**

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

<style>
    .nav-link {
        text-decoration: none;
        color: var(--color-black);
        font-weight: 700;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        transition: all 0.2s ease;
        width: 160px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--color-black);
        margin-left: -1px;
    }

    .nav-link:hover {
        background-color: var(--color-swiss-red);
        color: var(--color-white);
    }

    .nav-link:focus-visible {
        outline: 2px solid var(--color-swiss-red);
        outline-offset: 2px;
    }

    @media (max-width: 1024px) {
        .nav-link {
            width: 120px;
        }
    }
</style>
```

---

### Task 2: Update Tests

**Files:**
- Modify: `src/tests/components/NavLink.test.ts`

- [ ] **Step 1: Add tests for focus-visible and prop spreading**

```typescript
  it('should have focus-visible state styles', () => {
    const content = fs.readFileSync(navLinkPath, 'utf8');
    expect(content).toContain('.nav-link:focus-visible');
    expect(content).toContain('outline: 2px solid var(--color-swiss-red)');
    expect(content).toContain('outline-offset: 2px;');
  });

  it('should support prop spreading', () => {
    const content = fs.readFileSync(navLinkPath, 'utf8');
    expect(content).toContain('...rest');
    expect(content).toContain('{...rest}');
  });
```

- [ ] **Step 2: Run tests to verify they pass**

Run: `npm test src/tests/components/NavLink.test.ts`
Expected: PASS

---

### Task 3: Final Verification and Commit

- [ ] **Step 1: Run all tests**

Run: `npm test`
Expected: PASS

- [ ] **Step 2: Commit changes**

```bash
git add src/components/NavLink.astro src/tests/components/NavLink.test.ts docs/superpowers/specs/2025-05-23-navlink-refactoring-design.md docs/superpowers/plans/2025-05-23-navlink-refactoring.md
git commit -m "refactor: improve NavLink accessibility and flexibility"
```
