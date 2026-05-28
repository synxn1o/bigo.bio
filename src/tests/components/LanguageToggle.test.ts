import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('LanguageToggle Component', () => {
  const componentPath = path.resolve(__dirname, '../../components/ui/LanguageToggle.astro');
  
  it('should exist', () => {
    expect(fs.existsSync(componentPath)).toBe(true);
  });

  it('should render links for EN and 中文', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('EN</a>');
    expect(content).toContain('中文</a>');
    expect(content).toContain('data-lang="en"');
    expect(content).toContain('data-lang="zh"');
  });

  it('should handle active state based on lang prop', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain("class={`lang-link ${lang === 'en' ? 'active' : ''}`}");
    expect(content).toContain("class={`lang-link ${lang === 'zh' ? 'active' : ''}`}");
  });

  it('should include expected styles', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('.lang-toggle');
    expect(content).toContain('.lang-link');
    expect(content).toContain('var(--color-white)');
    expect(content).toContain('var(--color-black)');
  });

  it('should have focus-visible state styles for accessibility', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('.lang-link:focus-visible');
    expect(content).toContain('outline: 2px solid var(--color-swiss-red)');
  });

  it('should include client-side script for cookie persistence', () => {
    const content = fs.readFileSync(componentPath, 'utf8');
    expect(content).toContain('<script>');
    expect(content).toContain('document.cookie = `preferred-lang=${targetLang}; path=/; max-age=31536000`');
  });
});
