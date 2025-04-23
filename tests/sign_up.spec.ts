import { test, expect } from '@playwright/test'

test('empty email validation', async ({ page }) => {
  await page.goto('/users/sign_up')
  await page.getByTestId('email-input').fill('')
  await page.getByTestId('password-input').fill('BN8qJmeCuCg2zhx#')
  await page.getByTestId('password-confirmation-input').fill('BN8qJmeCuCg2zhx#')
  await page.getByTestId('signup-button').click()
  await expect(page.getByTestId('email-error-icon')).toBeVisible()
  await expect(page.getByTestId('email-error-message')).toHaveText("can't be blank")
})

test('empty password validation', async ({ page }) => {
  await page.goto('/users/sign_up')
  await page.getByTestId('email-input').fill('somsak2@odds.team')
  await page.getByTestId('password-input').fill('')
  await page.getByTestId('password-confirmation-input').fill('BN8qJmeCuCg2zhx#')
  await page.getByTestId('signup-button').click()
  await expect(page.getByTestId('password-error-icon')).toBeVisible()
  await expect(page.getByTestId('password-error-message')).toHaveText("can't be blank")
})

test('password confirmation mismatch', async ({ page }) => {
  await page.goto('/users/sign_up')
  await page.getByTestId('email-input').fill('somsak2@odds.team')
  await page.getByTestId('password-input').fill('BN8qJmeCuCg2zhx#')
  await page.getByTestId('password-confirmation-input').fill('')
  await page.getByTestId('signup-button').click()
  await expect(page.getByTestId('password_confirmation-error-icon')).toBeVisible()
  await expect(page.getByTestId('password_confirmation-error-message')).toHaveText("doesn't match Password")
})

test('duplicate email validation', async ({ page }) => {
  await page.goto('/users/sign_up')
  await page.getByTestId('email-input').fill('somsak@odds.team')
  await page.getByTestId('password-input').fill('BN8qJmeCuCg2zhx#')
  await page.getByTestId('password-confirmation-input').fill('BN8qJmeCuCg2zhx#')
  await page.getByTestId('signup-button').click()
  await expect(page.getByTestId('email-error-icon')).toBeVisible()
  await expect(page.getByTestId('email-error-message')).toHaveText('has already been taken')
})

test('invalid email format', async ({ page }) => {
  await page.goto('/users/sign_up')
  await page.getByTestId('email-input').fill('somsakodds.team')
  await page.getByTestId('password-input').fill('BN8qJmeCuCg2zhx#')
  await page.getByTestId('password-confirmation-input').fill('BN8qJmeCuCg2zhx#')
  await page.getByTestId('signup-button').click()
  await expect(page).toHaveURL('/users/sign_up')
})

test('short password validation', async ({ page }) => {
  await page.goto('/users/sign_up')
  await page.getByTestId('email-input').fill('somsak3@odds.team')
  await page.getByTestId('password-input').fill('1234')
  await page.getByTestId('password-confirmation-input').fill('1234')
  await page.getByTestId('signup-button').click()
  await expect(page.getByTestId('password-error-icon')).toBeVisible()
  await expect(page.getByTestId('password-error-message')).toHaveText('is too short (minimum is 8 characters)')
})

test('password complexity validation - missing special character', async ({ page }) => {
  await page.goto('/users/sign_up')
  await page.getByTestId('email-input').fill('somsak3@odds.team')
  await page.getByTestId('password-input').fill('123456Tt')
  await page.getByTestId('password-confirmation-input').fill('123456Tt')
  await page.getByTestId('signup-button').click()
  await expect(page.getByTestId('password-error-icon')).toBeVisible()
  await expect(page.getByTestId('password-error-message')).toHaveText('must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*)')
})

test('password complexity validation - missing uppercase', async ({ page }) => {
  await page.goto('/users/sign_up')
  await page.getByTestId('email-input').fill('somsak3@odds.team')
  await page.getByTestId('password-input').fill('123456t@')
  await page.getByTestId('password-confirmation-input').fill('123456t@')
  await page.getByTestId('signup-button').click()
  await expect(page.getByTestId('password-error-icon')).toBeVisible()
  await expect(page.getByTestId('password-error-message')).toHaveText('must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*)')
})

test('password complexity validation - missing digit', async ({ page }) => {
  await page.goto('/users/sign_up')
  await page.getByTestId('email-input').fill('somsak3@odds.team')
  await page.getByTestId('password-input').fill('somsakTES@')
  await page.getByTestId('password-confirmation-input').fill('somsakTES@')
  await page.getByTestId('signup-button').click()
  await expect(page.getByTestId('password-error-icon')).toBeVisible()
  await expect(page.getByTestId('password-error-message')).toHaveText('must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*)')
})

test('successful sign up', async ({ page }) => {
  await page.goto('/users/sign_up')
  await page.getByTestId('email-input').fill('somsak@odds.team')
  await page.getByTestId('password-input').fill('BN8qJmeCuCg2zhx#')
  await page.getByTestId('password-confirmation-input').fill('BN8qJmeCuCg2zhx#')
  await page.getByTestId('signup-button').click()
  await expect(page.getByTestId('flash-notice')).toBeVisible()
  await expect(page.getByTestId('flash-message')).toHaveText('Successfully!')
  await expect(page).toHaveURL('/')
})
