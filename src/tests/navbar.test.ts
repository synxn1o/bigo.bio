import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Navbar Component', () => {
  const navbarPath = path.resolve(__dirname, '../components/Navbar.astro');
  const navbarContent = fs.readFileSync(navbarPath, 'utf8');

  it('should implement the fixed floating position', () => {
    expect(navbarContent).toContain('position: fixed');
    expect(navbarContent).toContain('top: 0');
  });

  it('should apply the backdrop-filter blur effect', () => {
    expect(navbarContent).toContain('backdrop-filter: blur(12px)');
    expect(navbarContent).toContain('-webkit-backdrop-filter: blur(12px)');
  });

  it('should include the integrated language toggle', () => {
    expect(navbarContent).toContain('import LanguageToggle from \'./LanguageToggle.astro\'');
    expect(navbarContent).toContain('<LanguageToggle lang={lang} />');
  });

  it('should have the logo and links defined', () => {
    expect(navbarContent).toContain('BIGO BDA');
    expect(navbarContent).toContain("t('nav.blog')");
    expect(navbarContent).toContain("t('nav.studio')");
  });
});
