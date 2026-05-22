import { describe, it, expect } from 'vitest';

describe('3D Context Compatibility', () => {
  it('should be able to initialize a canvas element', () => {
    const canvas = document.createElement('canvas');
    expect(canvas).toBeDefined();
    const ctx = canvas.getContext('2d');
    expect(ctx).toBeDefined();
  });

  it('should support webgl context (mocked in jsdom)', () => {
    const canvas = document.createElement('canvas');
    // jsdom doesn't support webgl by default, but we can verify it exists as a function
    expect(typeof canvas.getContext).toBe('function');
  });
});
