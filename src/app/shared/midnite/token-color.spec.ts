import { tokenColor } from './token-color';

describe('tokenColor', () => {
  const root = document.documentElement;
  afterEach(() => {
    root.style.removeProperty('--primary');
    root.style.removeProperty('--brand-rainbow-0');
  });

  it('wraps a bare HSL triplet in hsl()', () => {
    root.style.setProperty('--primary', '240 5.9% 10%');
    expect(tokenColor('--primary')).toBe('hsl(240 5.9% 10%)');
  });

  it('passes a full colour through', () => {
    root.style.setProperty('--brand-rainbow-0', 'hsl(217 84% 43%)');
    expect(tokenColor('--brand-rainbow-0')).toBe('hsl(217 84% 43%)');
  });

  it('returns an empty string for an unknown token', () => {
    expect(tokenColor('--nope')).toBe('');
  });
});
