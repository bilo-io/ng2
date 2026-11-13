/**
 * A design token as a colour string MapLibre can paint with, read from the page's
 * current theme. Bare HSL triplets (`--primary: 240 5.9% 10%`) are wrapped in
 * `hsl()`; tokens that already hold a colour (`--brand-rainbow-0`) pass through.
 * Returns '' when the token is not defined.
 */
export function tokenColor(name: `--${string}`, root: Element = document.documentElement): string {
  const value = getComputedStyle(root).getPropertyValue(name).trim();
  if (!value) return '';
  return value.includes('(') || value.startsWith('#') ? value : `hsl(${value})`;
}

/**
 * The colour for pins and routes drawn over the map: the brand blue, falling back to
 * `--primary` if brand.css is missing. Read it again when the theme changes.
 */
export function overlayColor(root: Element = document.documentElement): string {
  return tokenColor('--brand-rainbow-0', root) || tokenColor('--primary', root);
}
