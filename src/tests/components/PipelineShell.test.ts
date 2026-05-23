import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('PipelineShell Component', () => {
  const componentPath = path.resolve(__dirname, '../../components/PipelineShell.astro');

  it('should exist', () => {
    expect(fs.existsSync(componentPath)).toBe(true);
  });

  it('should accept title, description, target, moleculeType, status, and lang props', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('title: string');
    expect(content).toContain('description: string');
    expect(content).toContain('target: string');
    expect(content).toContain('moleculeType: string');
    expect(content).toContain('status: string');
    expect(content).toContain("lang: 'en' | 'zh'");
  });

  it('should use the outline class for border', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('outline');
  });

  it('should render key facts sidebar', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('{target}');
    expect(content).toContain('{moleculeType}');
    expect(content).toContain('{status}');
  });

  it('should use scoped styles', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('<style>');
  });
});
