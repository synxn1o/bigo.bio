import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('DropdownNav Component', () => {
  const componentPath = path.resolve(__dirname, '../../components/DropdownNav.astro');

  it('should exist', () => {
    expect(fs.existsSync(componentPath)).toBe(true);
  });

  it('should accept label, items, and lang props', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('label: string');
    expect(content).toContain('items:');
    expect(content).toContain("lang: 'en' | 'zh'");
  });

  it('should render dropdown items with href, label, and optional description', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('href');
    expect(content).toContain('{item.label}');
  });

  it('should handle mobile layout', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('@media');
  });

  it('should use scoped styles', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('<style>');
  });
});
