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

  it('should import and use DropdownNav for BDA+ and Pipeline', () => {
    expect(navbarContent).toContain('import DropdownNav from \'./DropdownNav.astro\'');
    expect(navbarContent).toContain("t('nav.bda')");
    expect(navbarContent).toContain("t('nav.pipeline')");
  });

  it('should include BDA+ dropdown items', () => {
    expect(navbarContent).toContain("t('nav.bda.overview')");
    expect(navbarContent).toContain("t('nav.bda.workflow')");
  });

  it('should include Pipeline dropdown items', () => {
    expect(navbarContent).toContain("t('nav.pipeline.bp326')");
    expect(navbarContent).toContain("t('nav.pipeline.ribh')");
    expect(navbarContent).toContain("t('nav.pipeline.cd3')");
  });

  it('should have the logo defined', () => {
    expect(navbarContent).toContain('BIGO BDA');
  });
});
