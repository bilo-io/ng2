import { expect, test, type Page } from '@playwright/test';
import { mockMapServices } from './map-fixtures';

test.beforeEach(async ({ page }) => {
  await mockMapServices(page);
});

async function openPanel(page: Page): Promise<void> {
  const toggle = page.getByRole('button', { name: /^Map/ });
  if ((await toggle.getAttribute('aria-expanded')) === 'false') await toggle.click();
}

test('the map page loads a theme that follows the app', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/map');
  const map = page.locator('ws-map');
  await expect(map).toHaveAttribute('data-map-theme', 'dark');
  await expect(map).toHaveAttribute('data-style', 'Fixture Dark Matter');
  await expect(page.locator('ws-map canvas')).toBeVisible();
});

test('each theme swaps the map style', async ({ page }) => {
  await page.goto('/map');
  await openPanel(page);
  const map = page.locator('ws-map');
  const expected: [string, string][] = [
    ['Light', 'Fixture Positron'],
    ['Dark', 'Fixture Dark Matter'],
    ['Street', 'Fixture Liberty'],
    ['Colour', 'Fixture Voyager'],
    ['Satellite', 'Satellite (Esri World Imagery)'],
  ];
  for (const [label, styleName] of expected) {
    await page.getByRole('radio', { name: label, exact: true }).check();
    await expect(map).toHaveAttribute('data-style', styleName);
  }
  await expect(page.getByRole('switch', { name: 'Place labels' })).toBeVisible();
});

test('3D view tilts the map and the choice survives a reload', async ({ page }) => {
  await page.goto('/map');
  await openPanel(page);
  const map = page.locator('ws-map');
  await expect(map).toHaveAttribute('data-style', /Fixture/);
  await page.getByRole('switch', { name: '3D view' }).click();
  await expect(map).toHaveAttribute('data-three-d', 'true');
  await expect.poll(async () => Number(await map.getAttribute('data-pitch')), { timeout: 10_000 }).toBeGreaterThan(45);

  await page.reload();
  await expect(map).toHaveAttribute('data-three-d', 'true');
});

test('the pages have no horizontal scroll', async ({ page }) => {
  for (const path of ['/', '/map', '/ws', '/nowhere']) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, path).toBeLessThanOrEqual(0);
  }
});
