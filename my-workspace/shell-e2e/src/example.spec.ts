import { test, expect } from '@playwright/test';

test('loads home page', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Nx Modular Monolith POC');
});

test('navigates to orders list', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Orders List' }).click();
  await expect(page.locator('h2')).toContainText('Orders');
});

test('navigates to catalog browse', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Catalog Browse' }).click();
  await expect(page.locator('h2')).toContainText('Browse Products');
});
