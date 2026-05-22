import { describe, it, expect } from 'vitest';
import { getTranslations } from '../i18n/utils';

describe('Internationalization Utility', () => {
  it('should return English translations by default', () => {
    const t = getTranslations('en');
    expect(t('site.title')).toBe('BIGO BDA Platform');
  });

  it('should return Chinese translations when requested', () => {
    const t = getTranslations('zh');
    expect(t('site.title')).toBe('BIGO BDA 平台');
  });

  it('should fall back to English for missing keys (mocking a missing key)', () => {
    const t = getTranslations('zh');
    // @ts-ignore
    expect(t('missing.key')).toBe('missing.key');
  });
});
