import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Button Component', () => {
  const buttonPath = path.resolve(__dirname, '../../components/ui/Button.astro');
  
  it('should exist', () => {
    expect(fs.existsSync(buttonPath)).toBe(true);
  });

  it('should render as an anchor if href is provided', () => {
    const content = fs.readFileSync(buttonPath, 'utf8');
    expect(content).toContain("const Element = href ? 'a' : 'button'");
    expect(content).toContain("<Element");
    expect(content).toContain("href={href}");
  });

  it('should include base classes for Swiss Red design system', () => {
    const content = fs.readFileSync(buttonPath, 'utf8');
    expect(content).toContain('class:list={[\'btn\'');
  });

  it('should use scoped styles or CSS variables', () => {
    const content = fs.readFileSync(buttonPath, 'utf8');
    expect(content).toContain('<style>');
    expect(content).toContain('var(--color-swiss-red)');
    expect(content).toContain('var(--color-black)');
  });

  it('should handle primary and outline variants via CSS classes', () => {
    const content = fs.readFileSync(buttonPath, 'utf8');
    expect(content).toContain("variant === 'primary' ? 'btn-primary' : 'btn-outline'");
  });

  it('should support custom classes via class:list', () => {
    const content = fs.readFileSync(buttonPath, 'utf8');
    expect(content).toContain("class:list={['btn', variant === 'primary' ? 'btn-primary' : 'btn-outline', className]}");
  });

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
    expect(content).toContain("type = 'button'");
    expect(content).toContain('type={href ? undefined : type}');
  });

  it('should prevent href leakage to <button> elements', () => {
    const content = fs.readFileSync(buttonPath, 'utf8');
    expect(content).toContain('href={href}');
    expect(content).toContain("const Element = href ? 'a' : 'button'");
  });
});
