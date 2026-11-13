import { expect, test, type Page } from '@playwright/test';

async function chooseTheme(page: Page, name: 'Light' | 'Dark' | 'System'): Promise<void> {
  await page.getByRole('button', { name: 'Toggle theme' }).click();
  await page.getByRole('menuitemradio', { name }).click();
}

test('the theme menu sets light, dark and system, and a reload keeps the choice', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  const html = page.locator('html');
  await expect(html).not.toHaveClass(/\bdark\b/);

  await chooseTheme(page, 'Dark');
  await expect(html).toHaveClass(/\bdark\b/);
  await expect(page.getByRole('menu')).toBeHidden();
  expect(await page.evaluate(() => localStorage.getItem('ws-ui-theme'))).toBe('dark');

  await page.reload();
  await expect(html).toHaveClass(/\bdark\b/);
  await page.getByRole('button', { name: 'Toggle theme' }).click();
  await expect(page.getByRole('menuitemradio', { name: 'Dark' })).toHaveAttribute(
    'aria-checked',
    'true',
  );
  await page.keyboard.press('Escape');

  await chooseTheme(page, 'System');
  await expect(html).not.toHaveClass(/\bdark\b/);
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(html).toHaveClass(/\bdark\b/);
});

test('the saved theme applies before the app boots, so dark does not flash light', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.addInitScript(() => localStorage.setItem('ws-ui-theme', 'dark'));
  // Without the app's script only index.html's inline script can set the theme.
  await page.route(/\/main-[\w-]+\.js$/, (route) => route.abort());
  await page.goto('/');
  const html = page.locator('html');
  await expect(html).toHaveClass(/\bdark\b/);
  expect(await page.evaluate(() => document.documentElement.style.colorScheme)).toBe('dark');
});

test('reduced motion stills the brand drift', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const drift = await page
    .locator('.mui-rainbow-text')
    .first()
    .evaluate((el) => getComputedStyle(el).animationName);
  expect(drift).toBe('none');
});

test('an unknown route shows the not-found page', async ({ page }) => {
  await page.goto('/nowhere');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Home' }).last()).toBeVisible();
});

test('the ws demo switches components', async ({ page }) => {
  await page.goto('/ws');
  await expect(page.getByRole('heading', { name: 'GeoJSON' })).toBeVisible();
});
