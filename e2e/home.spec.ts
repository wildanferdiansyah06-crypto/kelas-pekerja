import { test, expect } from '@playwright/test'

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/')
  
  await expect(page).toHaveTitle(/Kelas Pekerja/)
  
  const heading = page.getByRole('heading', { name: /Kelas Pekerja/i })
  await expect(heading).toBeVisible()
})

test('navigation links work', async ({ page }) => {
  await page.goto('/')
  
  await page.getByRole('link', { name: /Buku/i }).click()
  await expect(page).toHaveURL(/\/buku/)
  
  await page.getByRole('link', { name: /Beranda/i }).click()
  await expect(page).toHaveURL('/')
})

test('dark mode toggle works', async ({ page }) => {
  await page.goto('/')
  
  const themeToggle = page.getByRole('button', { name: /toggle theme/i })
  if (await themeToggle.isVisible()) {
    await themeToggle.click()
    // Check if dark mode is applied
    const html = page.locator('html')
    await expect(html).toHaveClass(/dark/)
  }
})
