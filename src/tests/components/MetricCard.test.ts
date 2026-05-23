import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('MetricCard Component', () => {
  const componentPath = path.resolve(__dirname, '../../components/MetricCard.astro');

  it('should exist', () => {
    expect(fs.existsSync(componentPath)).toBe(true);
  });

  it('should accept value, label, and optional sublabel props', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('value: string');
    expect(content).toContain('label: string');
    expect(content).toContain('sublabel?: string');
  });

  it('should display the value with swiss-red color', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('var(--color-swiss-red)');
  });

  it('should use the outline class for border', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('outline');
  });

  it('should render the value, label, and sublabel', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('{value}');
    expect(content).toContain('{label}');
    expect(content).toContain('{sublabel}');
  });

  it('should use scoped styles', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('<style>');
  });
});
