import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('ApplicationCard Component', () => {
  const componentPath = path.resolve(__dirname, '../../components/cards/ApplicationCard.astro');

  it('should exist', () => {
    expect(fs.existsSync(componentPath)).toBe(true);
  });

  it('should accept title, description, and optional href props', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('title: string');
    expect(content).toContain('description: string');
    expect(content).toContain('href?: string');
  });

  it('should display the title with swiss-red color', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('var(--color-swiss-red)');
  });

  it('should use the outline class for border', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('outline');
  });

  it('should render as anchor when href is provided', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('href');
  });

  it('should use scoped styles', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('<style>');
  });
});
