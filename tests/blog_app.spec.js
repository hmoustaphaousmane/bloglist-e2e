const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // empty the db here
    await request.post('/api/testing/reset')

    // create a user for the backend here
    await request.post('/api/users', {
      data: {
        username: 'test',
        name: 'Test User',
        password: 'password'
      }
    })

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

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'test', 'password')

      await expect(page.getByText('Test User logged in')).toBeVisible()

      expect(page.getByRole('button', { name: 'logout' })).toBeDefined()
      expect(page.getByRole('button', { name: 'create new blog' })).toBeDefined()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'test', 'wrongPassword')

      // await expect(page.getByText('Wrong username or password')).toBeVisible()
      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('Wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
    
      await expect(page.getByText('Test User logged in')).not.toBeVisible()
    })
  })
})
