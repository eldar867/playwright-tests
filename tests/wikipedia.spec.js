import { test, expect } from '@playwright/test';

test('Wikipedia search and navigation', async ({ page }) => {
  await page.goto('/wiki/Main_Page');
  await expect(page.getByText('Welcome to Wikipedia')).toBeVisible();

  const searchInput = page.getByRole('searchbox', { name: 'Search Wikipedia' });
  await searchInput.fill('Playwright automation testing framework');
  await searchInput.press('Enter');

  await page.waitForURL(/.*Special:Search.*/);

  await page.locator('.mw-search-result-heading').first().getByRole('link').click();

  await page.waitForURL(/.*wikipedia\.org\/wiki\/.*/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});