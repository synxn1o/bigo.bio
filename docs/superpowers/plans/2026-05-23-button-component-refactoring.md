# Button Component Refactoring Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve `src/components/Button.astro` quality: accessibility (focus-visible), hover consistency, best practices (default type="button"), and attribute leakage prevention.

**Architecture:** Refactor the component to use a more robust element selection and attribute handling logic. Update CSS to include focus-visible styles and consistent hover states.

**Tech Stack:** Astro, Vitest

---

### Task 1: Update Tests for New Requirements

**Files:**
- Modify: `src/tests/components/Button.test.ts`

- [ ] **Step 1: Add failing tests for accessibility and best practices**

```typescript
  it('should include :focus-visible styles for accessibility', () => {
    const content = fs.readFileSync(buttonPath, 'utf8');
    expect(content).toContain('.btn:focus-visible');
    expect(content).toContain('outline: 2px solid var(--color-swiss-red)');
  });

  it('should ensure btn-primary hover border color consistency', () => {
    const content = fs.readFileSync(buttonPath, 'utf8');
    expect(content).toContain('.btn-primary:hover');
    expect(content).toContain('border-color: var(--color-black)');
  });

  it('should default to type="button" for <button> elements', () => {
    const content = fs.readFileSync(buttonPath, 'utf8');
    expect(content).toContain('type = \'button\'');
    expect(content).toContain('type={href ? undefined : type}');
  });

  it('should prevent href leakage to <button> elements', () => {
    const content = fs.readFileSync(buttonPath, 'utf8');
    expect(content).toContain('href={href}');
    // Check that Element usage is careful with href
    expect(content).toContain('const Element = href ? \'a\' : \'button\'');
  });
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test src/tests/components/Button.test.ts`
Expected: FAIL (various missing content expectations)

### Task 2: Implement Component Improvements

**Files:**
- Modify: `src/components/Button.astro`

- [ ] **Step 1: Refactor component logic for attributes**

```astro
---
const { variant = 'primary', href, class: className, type = 'button', ...rest } = Astro.props;
const Element = href ? 'a' : 'button';
---
<Element 
    href={href} 
    type={href ? undefined : type}
    class:list={['btn', variant === 'primary' ? 'btn-primary' : 'btn-outline', className]} 
    {...rest}
>
    <slot />
</Element>
```

- [ ] **Step 2: Update CSS for focus-visible and hover consistency**

```css
    .btn:focus-visible {
        outline: 2px solid var(--color-swiss-red);
        outline-offset: 2px;
    }

    .btn-primary:hover {
        background-color: var(--color-black);
        border-color: var(--color-black);
    }
```

- [ ] **Step 3: Run tests to verify they pass**

Run: `npm test src/tests/components/Button.test.ts`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/Button.astro src/tests/components/Button.test.ts
git commit -m "refactor: improve Button component accessibility and best practices"
```
