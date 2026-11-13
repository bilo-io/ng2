/**
 * The roving-focus step shared by the theme menu and ws-tabs: Up/Down (and Left/Right
 * when `horizontal`) move and wrap, Home and End jump to the ends. `current` of -1 (no
 * item active yet) counts as the first item. Returns undefined for any other key.
 */
export function rovingIndex(
  key: string,
  current: number,
  last: number,
  horizontal = false,
): number | undefined {
  const from = Math.max(current, 0);
  const forward = key === 'ArrowDown' || (horizontal && key === 'ArrowRight');
  const back = key === 'ArrowUp' || (horizontal && key === 'ArrowLeft');
  if (forward) return from >= last ? 0 : from + 1;
  if (back) return from <= 0 ? last : from - 1;
  if (key === 'Home') return 0;
  if (key === 'End') return last;
  return undefined;
}
