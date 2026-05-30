import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('WorkflowStep Component', () => {
  const componentPath = path.resolve(__dirname, '../../components/features/WorkflowStep.astro');

  it('should exist', () => {
    expect(fs.existsSync(componentPath)).toBe(true);
  });

  it('should accept step, title, tool, and description props', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('step: number');
    expect(content).toContain('title: string');
    expect(content).toContain('tool: string');
    expect(content).toContain('description: string');
  });

  it('should render a numbered step indicator', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('{step}');
  });

  it('should display the tool name in monospace style', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('font-family-mono');
  });

  it('should use scoped styles', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('<style>');
  });
});
