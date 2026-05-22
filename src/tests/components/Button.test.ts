import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Button Component', () => {
  const buttonPath = path.resolve(__dirname, '../../components/Button.astro');
  
  it('should exist', () => {
    expect(fs.existsSync(buttonPath)).toBe(true);
  });

  it('should handle primary and outline variants', () => {
    const content = fs.readFileSync(buttonPath, 'utf8');
    expect(content).toContain("variant = 'primary'");
    expect(content).toContain("variant === 'primary' ? \"bg-swiss-red text-white\" : \"bg-transparent text-black hover:bg-black hover:text-white\"");
  });

  it('should render as an anchor if href is provided', () => {
    const content = fs.readFileSync(buttonPath, 'utf8');
    expect(content).toContain("const Element = href ? 'a' : 'button'");
    expect(content).toContain("<Element href={href}");
  });

  it('should include base classes for Swiss Red design system', () => {
    const content = fs.readFileSync(buttonPath, 'utf8');
    expect(content).toContain("outline");
    expect(content).toContain("font-bold");
    expect(content).toContain("cursor-pointer");
    expect(content).toContain("transition-all");
    expect(content).toContain("uppercase");
  });

  it('should support custom classes via class:list', () => {
    const content = fs.readFileSync(buttonPath, 'utf8');
    expect(content).toContain("class:list={[baseClasses, variantClasses, className]}");
  });
});
