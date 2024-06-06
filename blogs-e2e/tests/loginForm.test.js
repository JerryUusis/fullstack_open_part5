const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Note app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'Matti Luukkainen',
                username: 'mluukkai',
                password: 'salainen'
            }
        })
        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        const locator = await page.getByText("Log in to application");
        await expect(locator).toBeVisible();
        await expect(page.getByText("Username")).toBeVisible()
        await expect(page.getByText("Password")).toBeVisible()
        await expect(page.getByText("Submit")).toBeVisible()
    })
})