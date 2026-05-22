import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Hero Component', () => {
  const heroPath = path.resolve(__dirname, '../../components/Hero.astro');
  
  it('should exist', () => {
    expect(fs.existsSync(heroPath)).toBe(true);
  });

  it('should use translation keys', () => {
    const content = fs.readFileSync(heroPath, 'utf8');
    expect(content).toContain("{t('hero.title_part1')}");
    expect(content).toContain("{t('hero.title_highlight')}");
    expect(content).toContain("{t('hero.title_part2')}");
    expect(content).toContain("{t('hero.subtitle')}");
    expect(content).toContain("t('hero.cta.start')");
    expect(content).toContain("t('hero.cta.learn')");
  });

  it('should include poster aesthetic classes', () => {
    const content = fs.readFileSync(heroPath, 'utf8');
    expect(content).toContain('text-swiss-red');
  });

  it('should use Button component', () => {
    const content = fs.readFileSync(heroPath, 'utf8');
    expect(content).toContain("import Button from './Button.astro';");
    expect(content).toContain('<Button variant="primary"');
    expect(content).toContain('<Button variant="outline"');
  });

  it('should include expected styles', () => {
    const content = fs.readFileSync(heroPath, 'utf8');
    expect(content).toContain('.hero-container');
    expect(content).toContain('.hero-text');
    expect(content).toContain('.hero-title');
    expect(content).toContain('.hero-subtitle');
    expect(content).toContain('.hero-actions');
  });

  it('should be responsive', () => {
    const content = fs.readFileSync(heroPath, 'utf8');
    expect(content).toContain('@media (max-width: 640px)');
  });
});
