import { describe, it, expect } from 'vitest';

// Simple mock for detection logic with cookie support
function detectLanguage(acceptLanguage: string | null, cookieValue: string | undefined) {
  if (cookieValue === 'en') return null;
  if (cookieValue === 'zh') return '/zh/';
  
  if (acceptLanguage && acceptLanguage.toLowerCase().includes('zh')) {
    return '/zh/';
  }
  return null;
}

describe('Middleware Language Detection', () => {
  it('should redirect to /zh/ if Chinese is preferred in headers and no cookie', () => {
    const header = 'zh-CN,zh;q=0.9,en;q=0.8';
    expect(detectLanguage(header, undefined)).toBe('/zh/');
  });

  it('should NOT redirect if English is preferred in headers', () => {
    const header = 'en-US,en;q=0.9';
    expect(detectLanguage(header, undefined)).toBe(null);
  });

  it('should respect "en" cookie even if headers prefer "zh"', () => {
    const header = 'zh-CN,zh;q=0.9';
    expect(detectLanguage(header, 'en')).toBe(null);
  });

  it('should respect "zh" cookie even if headers prefer "en"', () => {
    const header = 'en-US,en;q=0.9';
    expect(detectLanguage(header, 'zh')).toBe('/zh/');
  });
});
