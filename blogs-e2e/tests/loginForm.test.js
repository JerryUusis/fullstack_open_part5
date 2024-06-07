const { test, expect, beforeEach, describe } = require('@playwright/test');
const { loginWith, createBlog, createInitialBlogs } = require("./helper");

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
        await createInitialBlogs(request);
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
            await expect(page.getByText("new blog")).toBeVisible();
        })
        test("fails with incorrect credentials", async ({ page }) => {
            await loginWith(page, "wrong", "credentials");
            const notification = page.getByTestId("notification")
            await expect(notification).toBeVisible()
            await expect(notification).toHaveText("Login failed");
            await expect(notification).toHaveCSS("border", "2px solid rgb(255, 0, 0)");
        })
    })
    describe("When logged in with initial blogs", () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, "mluukkai", "salainen");
            const button = await page.getByText("new blog");
            await button.click()
        })
        test("initial blog is visible", async ({ page }) => {
            const initialBlog = await page.getByText("initial blog");
            const loggedInUser = await page.getByText("mluukkai logged in")
            await expect(loggedInUser).toBeVisible()
            await expect(initialBlog).toBeVisible();
        })
        test("new blog can be created", async ({ page }) => {
            await createBlog(page, "new title", "new author", "www.newblog.com");
            const initialBlog = await page.getByTestId("blog-0");

            const notification = await page.getByTestId("notification");
            const newBlog = await page.getByTestId("blog-1");
            const newBlogTitle = await page.getByTestId("blog-1-title");

            await expect(notification).toBeVisible();
            await expect(notification).toHaveCSS("border", "2px solid rgb(0, 128, 0)");
            await expect(initialBlog).toBeVisible();
            await expect(newBlog).toBeVisible();
            await expect(newBlogTitle).toHaveText("new title");
        })
        test("new blog can be liked", async ({ page }) => {
            await createBlog(page, "new title", "new author", "www.newblog.com");
            const newBlog = await page.getByTestId("blog-1");
            newBlog.waitFor();

            const newBlogViewButton = newBlog.locator("button", { hasText: "view" })
            await newBlogViewButton.click();

            const newBlogLikeButton = await page.getByTestId("blog-1-like-button");
            await newBlogLikeButton.click();

            const likes = await page.getByTestId("blog-1-likes");
            expect(likes).toHaveText("1");
        })
        test("new blog can be deleted", async ({ page }) => {
            // Will answer "true" to window.confirm query when remove button is clicked
            page.on("dialog", async dialog => {
                if (dialog.type() === "confirm") {
                    await dialog.accept();
                }
            })
            await createBlog(page, "test title", "test author", "www.testurl.com");

            const newBlog = await page.getByTestId("blog-1");
            newBlog.waitFor();

            const newBlogViewButton = newBlog.locator("button", { hasText: "view" })
            await newBlogViewButton.click();

            const newBlogRemoveButton = await newBlog.locator("button", { hasText: "remove" });
            await newBlogRemoveButton.click();

            // Wait until newBlog has been removed from the page
            await newBlog.waitFor({ state: "detached" });
            expect(newBlog).not.toBeVisible();
        })
        test("logged in user should see remove button only for blogs they added", async ({ page }) => {
            await createBlog(page, "new title", "new author", "www.newblog.com");
            const newBlog = await page.getByTestId("blog-1");
            newBlog.waitFor();
            const initialBlog = await page.getByTestId("blog-0");

            const initialBlogViewButton = await initialBlog.locator("button", { hasText: "view" });
            await initialBlogViewButton.click();

            const newBlogViewButton = newBlog.locator("button", { hasText: "view" })
            await newBlogViewButton.click();

            const initialBlogRemoveButton = await initialBlog.locator("button", { hasText: "remove" });
            const newBlogRemoveButton = await newBlog.locator("button", { hasText: "remove" });

            await expect(newBlogRemoveButton).toBeVisible();
            await expect(initialBlogRemoveButton).not.toBeVisible();
        })
    })
})