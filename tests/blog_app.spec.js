const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()

    expect(page.getByText('username')).toBeDefined()
    expect(page.getByPlaceholder('enter username here')).toBeDefined()

    expect(page.getByText('username')).toBeDefined()
    expect(page.getByPlaceholder('enter password here')).toBeDefined()

    expect(page.getByRole('button', { name: 'login' })).toBeDefined()
  })
})
