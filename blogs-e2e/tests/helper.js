const loginWith = async (page, username, password) => {
    const usernameInput = page.getByTestId("username-input");
    const passwordInput = page.getByTestId("password-input");
    const submitButton = page.getByText("Submit");
    await usernameInput.fill(username);
    await passwordInput.fill(password);
    await submitButton.click();
}

const createBlog = async (page, title, author, text) => {
    const titleInput = await page.getByTestId("title-input");
    const authorInput = await page.getByTestId("author-input");
    const urlInput = await page.getByTestId("url-input");

    await titleInput.fill(title);
    await authorInput.fill(author);
    await urlInput.fill(text);
}

module.exports = { loginWith, createBlog }