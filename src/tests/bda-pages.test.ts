import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('BDA Overview Pages', () => {
  const enPagePath = path.resolve(__dirname, '../pages/bda/index.astro');
  const zhPagePath = path.resolve(__dirname, '../pages/zh/bda/index.astro');

  describe('English BDA Overview Page', () => {
    it('should exist', () => {
      expect(fs.existsSync(enPagePath)).toBe(true);
    });

    const content = fs.readFileSync(enPagePath, 'utf8');

    it('should use Layout component', () => {
      expect(content).toContain("import Layout from '../../layouts/Layout.astro'");
      expect(content).toContain("<Layout");
    });

    it('should use MetricCard component', () => {
      expect(content).toContain("import MetricCard from '../../components/ui/MetricCard.astro'");
      expect(content).toContain("<MetricCard");
    });

    it('should use ApplicationCard component', () => {
      expect(content).toContain("import ApplicationCard from '../../components/ApplicationCard.astro'");
      expect(content).toContain("<ApplicationCard");
    });

    it('should use correct translations', () => {
      expect(content).toContain("t('bda.metric.cycle.value')");
      expect(content).toContain("t('bda.hero.tagline')");
      expect(content).toContain("t('bda.drug.title')");
    });
  });

  describe('Chinese BDA Overview Page', () => {
    it('should exist', () => {
      expect(fs.existsSync(zhPagePath)).toBe(true);
    });

    const content = fs.readFileSync(zhPagePath, 'utf8');

    it('should use Layout component', () => {
      expect(content).toContain("import Layout from '../../../layouts/Layout.astro'");
      expect(content).toContain("<Layout");
    });

    it('should use MetricCard component', () => {
      expect(content).toContain("import MetricCard from '../../../components/ui/MetricCard.astro'");
      expect(content).toContain("<MetricCard");
    });

    it('should use ApplicationCard component', () => {
      expect(content).toContain("import ApplicationCard from '../../../components/ApplicationCard.astro'");
      expect(content).toContain("<ApplicationCard");
    });

    it('should use correct translations', () => {
      expect(content).toContain("t('bda.metric.cycle.value')");
      expect(content).toContain("t('bda.hero.tagline')");
      expect(content).toContain("t('bda.drug.title')");
    });

    it('should have localized heading', () => {
      expect(content).toContain("应用路径");
    });
  });
});
