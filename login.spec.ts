import { test, expect } from '@playwright/test'

test('login test', async ({ page }) => {
  await page.goto('http://localhost:3000/login')

  await page.fill('#email', 'admin01@odds.team')
  await page.fill('#password', 'Hf3tV4grPv93@uz')
  await page.click('button[type="submit"]')

  await expect(page).toHaveURL(/dashboard/)
  await expect(page.locator('h1')).toHaveText('Welcome Admin01')
})

