const { test, expect, beforeEach, describe } = require('@playwright/test');
const { loginWith } = require("./helper");

describe('Blog app', () => {
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
        const usernameInput = page.getByTestId("username-input");
        const passwordInput = page.getByTestId("password-input");
        const submitButton = page.getByText("Submit");
        expect(usernameInput).toBeVisible();
        expect(passwordInput).toBeVisible();
        expect(submitButton).toBeVisible();
    })
    describe("Login", () => {
        test("succeeds with correct credentials", async ({ page }) => {
            await loginWith(page, "mluukkai", "salainen");
            await expect(page.getByText("mluukkai logged in")).toBeVisible();
            await expect(page.getByText("new note")).toBeVisible();
        })
        test("fails with incorrect credentials", async ({ page }) => {
            await loginWith(page, "wrong", "credentials");
            const notification = page.getByTestId("notification")
            await expect(notification).toBeVisible()
            await expect(notification).toHaveText("Login failed");
            await expect(notification).toHaveCSS("border", "2px solid rgb(255, 0, 0)");
        })
    })
})