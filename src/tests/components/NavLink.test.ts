import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('NavLink Component', () => {
  const navLinkPath = path.resolve(__dirname, '../../components/NavLink.astro');
  
  it('should exist', () => {
    expect(fs.existsSync(navLinkPath)).toBe(true);
  });

  it('should render as an anchor with href', () => {
    const content = fs.readFileSync(navLinkPath, 'utf8');
    expect(content).toContain('<a href={href}');
  });

  it('should include base class "nav-link"', () => {
    const content = fs.readFileSync(navLinkPath, 'utf8');
    expect(content).toContain('class:list={["nav-link", className]}');
  });

  it('should include expected styles for the design system', () => {
    const content = fs.readFileSync(navLinkPath, 'utf8');
    expect(content).toContain('<style>');
    expect(content).toContain('var(--color-black)');
    expect(content).toContain('var(--color-swiss-red)');
    expect(content).toContain('text-transform: uppercase;');
    expect(content).toContain('letter-spacing: 0.1em;');
    expect(content).toContain('width: var(--nav-link-width, 160px);');
    expect(content).toContain('height: var(--nav-link-height, 40px);');
  });

  it('should have hover state styles', () => {
    const content = fs.readFileSync(navLinkPath, 'utf8');
    expect(content).toContain('.nav-link:hover');
    expect(content).toContain('background-color: var(--color-swiss-red)');
    expect(content).toContain('color: var(--color-white)');
  });

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

  it('should include responsive styles', () => {
    const content = fs.readFileSync(navLinkPath, 'utf8');
    expect(content).toContain('@media (max-width: 1024px)');
    expect(content).toContain('width: 120px;');
  });
});
