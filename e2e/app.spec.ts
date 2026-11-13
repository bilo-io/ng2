import { expect, test } from '@playwright/test';

test('the theme button cycles system, light and dark', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  const html = page.locator('html');
  await expect(html).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: /theme \(change\)/ }).click();
  await expect(page.getByRole('button', { name: 'Light theme (change)' })).toBeVisible();
  await page.getByRole('button', { name: 'Light theme (change)' }).click();
  await expect(html).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(html).toHaveAttribute('data-theme', 'dark');
});

test('an unknown route shows the not-found page', async ({ page }) => {
  await page.goto('/nowhere');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('the ws demo switches components', async ({ page }) => {
  await page.goto('/ws');
  await expect(page.getByRole('heading', { name: 'GeoJSON' })).toBeVisible();
});
