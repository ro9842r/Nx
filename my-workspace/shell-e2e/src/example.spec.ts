import { test, expect } from '@playwright/test';

test('loads home page', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Nx Modular Monolith POC');
});

test('runs login to dashboard flow', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Users Auth' }).click();
  await expect(page.locator('h2')).toContainText('Login');

  await page.getByPlaceholder('Email').fill('flow@demo.com');
  await page.getByPlaceholder('Password').fill('strongpass123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.locator('p')).toContainText('Logged in.');

  await page.goto('/');
  await page.getByRole('link', { name: 'Dashboard' }).click();
  await expect(page.locator('h2')).toContainText('Dashboard');
});

test('runs browse to detail flow', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Catalog Browse' }).click();
  await expect(page.locator('h2')).toContainText('Browse Products');

  await page.goto('/');
  await page.getByRole('link', { name: 'Catalog Detail' }).click();
  await expect(page.locator('h2')).toContainText('Product Detail');
});

test('runs order list to checkout flow', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Orders List' }).click();
  await expect(page.locator('h2')).toContainText('Orders');

  await page.goto('/');
  await page.getByRole('link', { name: 'Orders Checkout' }).click();
  await expect(page.locator('h2')).toContainText('Checkout');
});
