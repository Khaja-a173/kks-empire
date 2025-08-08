
import { test, expect } from '@playwright/test'

test('landing loads and CTA visible', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('link', { name: 'Book a Table' })).toBeVisible()
})

test('qr table route shows badge', async ({ page }) => {
  await page.goto('/t/t01')
  await expect(page.getByText('Table')).toBeVisible()
})
