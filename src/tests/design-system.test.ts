import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Swiss Red Design System Foundation', () => {
  const cssPath = path.resolve(__dirname, '../styles/global.css');
  const cssContent = fs.readFileSync(cssPath, 'utf8');

  it('should define core Swiss Red tokens', () => {
    expect(cssContent).toContain('--color-swiss-red: #E60000');
    expect(cssContent).toContain('--color-black: #000000');
  });

  it('should enforce strict right-angle geometry (0 border-radius)', () => {
    expect(cssContent).toContain('border-radius: 0 !important');
  });

  it('should implement the modular grid system classes', () => {
    expect(cssContent).toContain('.grid-container');
    expect(cssContent).toContain('.grid-item');
    expect(cssContent).toContain('display: grid');
  });

  it('should provide the thin-line outline utility', () => {
    expect(cssContent).toContain('.outline');
    expect(cssContent).toContain('border: 1px solid var(--color-black)');
  });
});
