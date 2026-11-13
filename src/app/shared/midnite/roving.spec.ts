import { rovingIndex } from './roving';

describe('rovingIndex', () => {
  it('moves and wraps with Up and Down, and jumps with Home and End', () => {
    expect(rovingIndex('ArrowDown', 0, 2)).toBe(1);
    expect(rovingIndex('ArrowDown', 2, 2)).toBe(0);
    expect(rovingIndex('ArrowUp', 0, 2)).toBe(2);
    expect(rovingIndex('Home', 2, 2)).toBe(0);
    expect(rovingIndex('End', 0, 2)).toBe(2);
  });

  it('takes Left and Right only when horizontal', () => {
    expect(rovingIndex('ArrowRight', 0, 2)).toBeUndefined();
    expect(rovingIndex('ArrowRight', 0, 2, true)).toBe(1);
    expect(rovingIndex('ArrowLeft', 0, 2, true)).toBe(2);
  });

  it('treats no active item as the first', () => {
    expect(rovingIndex('ArrowDown', -1, 2)).toBe(1);
    expect(rovingIndex('ArrowUp', -1, 2)).toBe(2);
    expect(rovingIndex('Enter', 0, 2)).toBeUndefined();
  });
});
