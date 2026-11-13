import type { Page } from '@playwright/test';

/** Style names the fixtures answer with, by host and path. */
const STYLES: [RegExp, string][] = [
  [/positron-gl-style/, 'Fixture Positron'],
  [/dark-matter-gl-style/, 'Fixture Dark Matter'],
  [/voyager-gl-style/, 'Fixture Voyager'],
  [/openfreemap\.org\/styles\/liberty/, 'Fixture Liberty'],
];

const TILE_HOSTS = [
  'https://server.arcgisonline.com/**',
  'https://elevation-tiles-prod.s3.amazonaws.com/**',
  'https://nominatim.openstreetmap.org/**',
];

/**
 * Keeps the map tests off the network: each basemap style comes back as a tiny
 * style with a known name, and tile, elevation and geocoder requests get a 404.
 */
export async function mockMapServices(page: Page): Promise<void> {
  await page.route(/basemaps\.cartocdn\.com|tiles\.openfreemap\.org/, (route) => {
    const url = route.request().url();
    const match = STYLES.find(([pattern]) => pattern.test(url));
    if (!match) return route.fulfill({ status: 404 });
    return route.fulfill({
      contentType: 'application/json',
      headers: { 'access-control-allow-origin': '*' },
      body: JSON.stringify({
        version: 8,
        name: match[1],
        center: [0, 0],
        zoom: 1,
        sources: {},
        layers: [{ id: 'background', type: 'background', paint: { 'background-color': '#ccc' } }],
      }),
    });
  });
  for (const host of TILE_HOSTS) {
    await page.route(host, (route) =>
      route.fulfill({ status: 404, headers: { 'access-control-allow-origin': '*' } }),
    );
  }
}
